param([int]$FirstPage = 75, [int]$LastPage = 130)
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
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage((New-Object Windows.Globalization.Language 'ru'))
$directory = Join-Path (Get-Location) 'var/namedays-research'
$pdf = Join-Path $directory 'russian-names.pdf'
for ($page = $FirstPage; $page -le $LastPage; $page++) {
    $output = Join-Path $directory ('russian-page-' + $page)
    $jsonPath = $output + '.json'
    if (Test-Path -LiteralPath $jsonPath) { continue }
    & pdftoppm.exe -f $page -l $page -scale-to 2000 -png -singlefile $pdf $output
    if ($LASTEXITCODE -ne 0) { throw 'PDF page rendering failed' }
    $file = Await-Result ([Windows.Storage.StorageFile]::GetFileFromPathAsync($output + '.png')) ([Windows.Storage.StorageFile])
    $stream = Await-Result ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $decoder = Await-Result ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Await-Result ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $result = Await-Result ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    $lines = @($result.Lines | ForEach-Object { @{ text = $_.Text; words = @($_.Words | ForEach-Object { @{ text = $_.Text; x = $_.BoundingRect.X; y = $_.BoundingRect.Y } }) } })
    @{ page = $page; text = $result.Text; lines = $lines } | ConvertTo-Json -Depth 6 -Compress | Set-Content -LiteralPath $jsonPath -Encoding UTF8
    $bitmap.Dispose()
    $stream.Dispose()
    Write-Output ('OCR page ' + $page)
}
