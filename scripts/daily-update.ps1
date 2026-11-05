$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    & npm.cmd run update
    if ($LASTEXITCODE -ne 0) { throw 'Data update failed' }
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Static build failed' }
    & npm.cmd run publish:data
    if ($LASTEXITCODE -ne 0) { throw 'Data publication failed' }
} finally { Pop-Location }
