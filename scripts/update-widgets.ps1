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
    if (-not $NoPublish) {
        & npm.cmd run publish:data
        if ($LASTEXITCODE -ne 0) { throw 'Data publication failed' }
        Write-Host 'Data pushed. GitHub Pages will deploy automatically.'
    } else { Write-Host 'Updated and built locally. Publication skipped.' }
} finally { Pop-Location }
