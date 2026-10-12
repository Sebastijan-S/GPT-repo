$ErrorActionPreference = 'Stop'
$sourceRoot = 'E:\Sync\SN Ingenia\sningenia-main'
$outputRoot = 'C:\Users\Cebo\Documents\ChatGPT\Ingenia-site\02-evidence'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null
$paths = @('','index.html','sr/','sr/index.html','privacy.html','sr/privacy.html','robots.txt','sitemap.xml','script.js','analytics.js','styles.css','images/logo-header.svg','images/thumbnail1.webp','images/thumbnail2.webp','images/thumbnail3.webp','images/thumbnail4.webp','images/profilepicture1.webp','images/case1.webp','images/case2.webp','images/case3.webp','images/case4.webp')
$results = foreach ($path in $paths) {
  $url = 'https://www.sningenia.com/' + $path
  $watch = [System.Diagnostics.Stopwatch]::StartNew()
  $response = Invoke-WebRequest -Uri $url -TimeoutSec 30 -SkipHttpErrorCheck
  $watch.Stop()
  $name = if (!$path) { 'root.html' } else { $path.Replace('/','_') }
  $bytes = if ($response.Content -is [byte[]]) {$response.Content} else {[System.Text.Encoding]::UTF8.GetBytes($response.Content)}
  [System.IO.File]::WriteAllBytes((Join-Path $outputRoot $name), $bytes)
  $localPath = Join-Path $sourceRoot $(if (!$path) {'index.html'} elseif ($path.EndsWith('/')) {$path+'index.html'} else {$path})
  $liveHash = [Convert]::ToHexString([System.Security.Cryptography.SHA256]::HashData($bytes))
  $localHash = if (Test-Path -LiteralPath $localPath) {(Get-FileHash -LiteralPath $localPath -Algorithm SHA256).Hash} else {$null}
  [pscustomobject]@{url=$url;status=[int]$response.StatusCode;bytes=$bytes.Length;elapsedMs=$watch.ElapsedMilliseconds;sha256=$liveHash;localSha256=$localHash;equal=($liveHash -eq $localHash);headers=$response.Headers}
}
$results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $outputRoot 'public-responses.json') -Encoding utf8
$results | Select-Object url,status,bytes,elapsedMs,equal | Format-Table -AutoSize
$redirects = foreach ($url in @('http://www.sningenia.com/','http://sningenia.com/','https://sningenia.com/','https://www.sningenia.com/sr','https://www.sningenia.com/audit-missing-20261011')) {
  $response = Invoke-WebRequest -Uri $url -MaximumRedirection 0 -SkipHttpErrorCheck -ErrorAction SilentlyContinue
  [pscustomobject]@{url=$url;status=[int]$response.StatusCode;location=$response.Headers.Location;headers=$response.Headers}
}
$redirects | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $outputRoot 'redirects.json') -Encoding utf8
$redirects | Select-Object url,status,location | Format-Table -AutoSize
Resolve-DnsName www.sningenia.com | Select-Object Name,Type,NameHost,IPAddress | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $outputRoot 'dns.json')
