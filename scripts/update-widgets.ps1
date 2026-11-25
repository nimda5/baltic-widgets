param(
    [ValidateSet('Auto','Prices','Current','Daily','Weekly','Monthly','Full')]
    [string]$Profile = 'Auto',
    [switch]$Force,
    [switch]$Plan,
    [switch]$NoPublish,
    [switch]$VirsiBrowser
)

# Auto runs only tasks whose cadence has elapsed. Full is the explicit backfill.
# No Windows scheduled task is installed by this script.
$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
$runStartedUtc = [DateTime]::UtcNow
$failure = $null
try {
    if (-not $Plan -and -not $NoPublish) {
        $publicationArguments = @('scripts/run-published-update.mjs', "--profile=$($Profile.ToLowerInvariant())")
        if ($Force) { $publicationArguments += '--force' }
        if ($VirsiBrowser) { $publicationArguments += '--virsi-browser' }
        & node @publicationArguments
        if ($LASTEXITCODE -ne 0) { throw 'Update or publication failed; see the preserved publication checkout and artifacts reports.' }
        return
    }
    $updateArguments = @('run', 'update', '--', "--profile=$($Profile.ToLowerInvariant())")
    if ($Force) { $updateArguments += '--force' }
    if ($Plan) { $updateArguments += '--plan' }
    if ($VirsiBrowser) { $updateArguments += '--virsi-browser' }
    Write-Host "Update profile: $Profile"
    & npm.cmd @updateArguments
    if ($LASTEXITCODE -ne 0) { throw 'Update failed' }
    if ($Plan) { return }

    # Source failures retain cached data. They remain visible before publication.
    $report = Get-Content 'artifacts/update-report.json' -Encoding UTF8 -Raw | ConvertFrom-Json
    foreach ($sourceError in $report.errors) { Write-Warning $sourceError }

    & npm.cmd test
    if ($LASTEXITCODE -ne 0) { throw 'Project checks failed' }
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Static build failed' }
    Write-Host 'Updated and built locally. Publication skipped.'
} catch {
    $failure = $_.Exception.Message
    throw
} finally {
    # Print after tests/build/publication, even if one of those steps failed.
    try {
        $summaryErrors = @()
        if (-not $Plan -and (Test-Path 'artifacts/update-report.json')) {
            $reportFile = Get-Item 'artifacts/update-report.json'
            if ($reportFile.LastWriteTimeUtc -ge $runStartedUtc) {
                try {
                    $finalReport = Get-Content $reportFile.FullName -Encoding UTF8 -Raw | ConvertFrom-Json
                    $summaryErrors += @($finalReport.errors)
                    if ($finalReport.fuel_coverage) {
                        $coverage = $finalReport.fuel_coverage
                        Write-Host ''
                        Write-Host "=== FINAL FUEL COVERAGE: $($coverage.status) ($($coverage.available)/$($coverage.network_fuel_pairs)) ==="
                        foreach ($gap in $coverage.gaps) {
                            $lastPrice = if ($gap.last_published) { $gap.last_published } else { 'not reported' }
                            Write-Host "- $($gap.country) / $($gap.network) / $($gap.fuel): $($gap.reason); last price: $lastPrice"
                        }
                        Write-Host 'Details: artifacts/update-report.json'
                    }
                } catch { $summaryErrors += "Could not read update report: $($_.Exception.Message)" }
            }
        }
        if (-not $Plan -and -not $NoPublish -and (Test-Path 'artifacts/publication-report.json')) {
            $publicationFile = Get-Item 'artifacts/publication-report.json'
            if ($publicationFile.LastWriteTimeUtc -ge $runStartedUtc) {
                try {
                    $publicationReport = Get-Content $publicationFile.FullName -Encoding UTF8 -Raw | ConvertFrom-Json
                    if ($publicationReport.error) { $summaryErrors += "Publication: $($publicationReport.error)" }
                } catch { $summaryErrors += "Could not read publication report: $($_.Exception.Message)" }
            }
        }
        if ($failure) { $summaryErrors += $failure }
        $summaryErrors = @($summaryErrors | Where-Object { $_ } | Select-Object -Unique)
        if ($summaryErrors.Count) {
            Write-Host ''
            Write-Host '=== UPDATE ERROR SUMMARY ===' -ForegroundColor Yellow
            foreach ($message in $summaryErrors) { Write-Host "- $message" -ForegroundColor Yellow }
            Write-Host 'Reports: artifacts/update-report.json; artifacts/publication-report.json (when publishing)'
            Write-Host '=== END UPDATE ERROR SUMMARY ===' -ForegroundColor Yellow
        }
    } finally { Pop-Location }
}
