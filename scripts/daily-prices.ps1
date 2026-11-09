param([switch]$NoPublish)

$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    Write-Host 'Checking monthly name statistics...'
    & npm.cmd run update:nameday-statistics
    if ($LASTEXITCODE -ne 0) { throw 'Name statistics update failed' }

    Write-Host 'Updating current prices without historical archive downloads...'
    & npm.cmd run update:current
    if ($LASTEXITCODE -ne 0) { throw 'Current price update failed' }

    Write-Host 'Checking the project...'
    & npm.cmd test
    if ($LASTEXITCODE -ne 0) { throw 'Project checks failed' }

    Write-Host 'Building the site...'
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Static build failed' }

    if (-not $NoPublish) {
        Write-Host 'Publishing data to production...'
        & npm.cmd run publish:data
        if ($LASTEXITCODE -ne 0) { throw 'Data publication failed' }
        Write-Host 'Data pushed. GitHub Pages will deploy it automatically.'
    } else {
        Write-Host 'Update and build completed. Publication skipped.'
    }
} finally { Pop-Location }
