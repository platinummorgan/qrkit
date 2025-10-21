$token = 'michael9michael9michael9michael9'
$base = 'https://qrnow-ar57xqtp3-michaels-projects-4c786e88.vercel.app'
$paths = @('/','/privacy','/terms','/faq','/contact','/guides','/guides/wifi-qr-codes')

foreach ($p in $paths) {
  try {
    # Build a safe URI with query string
    $query = "?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=$token"
    $raw = $base.TrimEnd('/') + $p + $query
    $uri = [System.Uri]::new($raw)

    $resp = Invoke-WebRequest -Uri $uri -UseBasicParsing -ErrorAction Stop
    $c = $resp.Content
    $matches = [regex]::Matches($c, '(.{0,120}adsbygoogle.{0,120})', 'Singleline')
    if ($matches.Count -eq 0) {
      Write-Output "$p -> adsbygoogle matches: 0"
    } else {
      Write-Output "----- $p -> adsbygoogle matches: $($matches.Count) -----"
      foreach ($m in $matches) {
        $snippet = $m.Groups[1].Value -replace "\r?\n", ' '
        Write-Output $snippet
        Write-Output ""
      }
    }
  }
  catch {
    Write-Output "$p -> ERROR: $($_.Exception.Message)"
  }
}
