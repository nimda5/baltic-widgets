param(
    [ValidateSet('Auto','Prices','Current','Daily','Weekly','Monthly','Full')]
    [string]$Profile = 'Auto',
    [switch]$Force,
    [switch]$Plan,
    [switch]$NoPublish
)

# Auto runs only tasks whose cadence has elapsed. Full is the explicit backfill.
# No Windows scheduled task is installed by this script.
$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    if (-not $Plan -and -not $NoPublish) {
        $publicationArguments = @('scripts/run-published-update.mjs', "--profile=$($Profile.ToLowerInvariant())")
        if ($Force) { $publicationArguments += '--force' }
        & node @publicationArguments
        if ($LASTEXITCODE -ne 0) { throw 'Update or publication failed; see the preserved publication checkout and artifacts reports.' }
        return
    }
    $updateArguments = @('run', 'update', '--', "--profile=$($Profile.ToLowerInvariant())")
    if ($Force) { $updateArguments += '--force' }
    if ($Plan) { $updateArguments += '--plan' }
    Write-Host "Update profile: $Profile"
    & npm.cmd @updateArguments
    if ($LASTEXITCODE -ne 0) { throw 'Update failed' }
    if ($Plan) { return }

    # Source failures retain cached data. They remain visible before publication.
    $report = Get-Content 'artifacts/update-report.json' -Raw | ConvertFrom-Json
    foreach ($sourceError in $report.errors) { Write-Warning $sourceError }

    & npm.cmd test
    if ($LASTEXITCODE -ne 0) { throw 'Project checks failed' }
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Static build failed' }
    Write-Host 'Updated and built locally. Publication skipped.'
} finally { Pop-Location }
