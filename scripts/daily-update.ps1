param([switch]$NoPublish, [switch]$Force, [switch]$Plan)
# Compatibility command: shared Auto profile, no unnecessary catalogue requests.
& "$PSScriptRoot\update-widgets.ps1" -Profile Auto -NoPublish:$NoPublish -Force:$Force -Plan:$Plan
