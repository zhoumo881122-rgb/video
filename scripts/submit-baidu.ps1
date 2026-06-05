param(
  [string]$Site = "video.skyba.cn",
  [Parameter(Mandatory = $true)]
  [string]$Token,
  [string]$UrlsFile = "urls.txt"
)

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$urlsPath = Join-Path $root $UrlsFile

if (-not (Test-Path -LiteralPath $urlsPath)) {
  throw "URLs file not found: $urlsPath"
}

$endpoint = "http://data.zz.baidu.com/urls?site=$Site&token=$Token"
$body = Get-Content -LiteralPath $urlsPath -Raw

Invoke-RestMethod `
  -Uri $endpoint `
  -Method Post `
  -ContentType "text/plain" `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
