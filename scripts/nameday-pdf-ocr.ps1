param([Parameter(Mandatory=$true)][string]$Pdf, [string]$Language = 'en-US')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime] | Out-Null
$asyncMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
function Await-Result($Operation, [Type]$ResultType) {
    $task = $asyncMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
    $task.Wait()
    return $task.Result
}
$sourcePdf = (Resolve-Path -LiteralPath $Pdf).Path
$sourceHash = (Get-FileHash -LiteralPath $sourcePdf -Algorithm SHA256).Hash.ToLowerInvariant()
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage((New-Object Windows.Globalization.Language $Language))
if ($null -eq $engine) { throw "Windows OCR language unavailable: $Language" }
$projectRoot = Split-Path -Parent $PSScriptRoot
$cacheRoot = Join-Path (Split-Path -Parent $projectRoot) 'var/namedays-sources'
$outputDirectory = Join-Path (Join-Path (Join-Path $cacheRoot 'ocr') $sourceHash) $Language
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$pdfMetadata = & pdfinfo.exe $sourcePdf
if ($LASTEXITCODE -ne 0) { throw 'pdfinfo failed' }
$pageCount = [int]([regex]::Match(($pdfMetadata -join "`n"), '(?m)^Pages:\s+(\d+)').Groups[1].Value)
if ($pageCount -lt 1) { throw 'Cannot determine PDF page count' }
$allPages = @()
for ($pageNumber = 1; $pageNumber -le $pageCount; $pageNumber++) {
    $prefix = Join-Path $outputDirectory ('page-' + $pageNumber)
    $jsonPath = $prefix + '.json'
    if (Test-Path -LiteralPath $jsonPath) {
        $cachedPage = Get-Content -Raw -LiteralPath $jsonPath | ConvertFrom-Json
        if ($cachedPage.pdf_page -ne $pageNumber) { throw 'Cached OCR page mismatch' }
        $allPages += $cachedPage
        continue
    }
    & pdftoppm.exe -f $pageNumber -l $pageNumber -scale-to 2000 -png -singlefile $sourcePdf $prefix
    if ($LASTEXITCODE -ne 0) { throw 'PDF page rendering failed' }
    $file = Await-Result ([Windows.Storage.StorageFile]::GetFileFromPathAsync($prefix + '.png')) ([Windows.Storage.StorageFile])
    $stream = Await-Result ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $bitmap = $null
    try {
        $decoder = Await-Result ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bitmap = Await-Result ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $result = Await-Result ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
        $record = @{ pdf_page = $pageNumber; text = $result.Text }
        $record | ConvertTo-Json -Compress | Set-Content -LiteralPath $jsonPath -Encoding UTF8
        $allPages += $record
    } finally {
        if ($null -ne $bitmap) { $bitmap.Dispose() }
        $stream.Dispose()
    }
    Remove-Item -LiteralPath ($prefix + '.png')
    if ($pageNumber % 10 -eq 0) { Write-Output "OCR $pageNumber / $pageCount" }
}
$indexPath = Join-Path $outputDirectory 'pages.json'
@{ sha256 = $sourceHash; extraction = "Windows OCR $Language; discovery only, inspect original spelling"; pages = $allPages } | ConvertTo-Json -Depth 5 -Compress | Set-Content -LiteralPath $indexPath -Encoding UTF8
Write-Output $indexPath
