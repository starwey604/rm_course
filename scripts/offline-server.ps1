param([int]$Port=3057,[switch]$NoBrowser)
$ErrorActionPreference='Stop'
$webRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'web'))
if(-not (Test-Path -LiteralPath (Join-Path $webRoot 'index.html'))){throw 'Missing web/index.html. Extract the complete demo package first.'}
$listener=$null
for($attempt=0;$attempt -lt 10;$attempt++){
  try{
    $candidate=[Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback,$Port)
    $candidate.Start();$listener=$candidate;break
  }catch{
    $existing=$null
    try{$existing=Invoke-WebRequest -Uri "http://127.0.0.1:$Port/__cone_demo" -UseBasicParsing -TimeoutSec 2}catch{}
    if($existing -and $existing.Content -eq 'CONE-CJ1-2026'){
      if(-not $NoBrowser){Start-Process "http://127.0.0.1:$Port/1"};exit
    }
    $Port++
  }
}
if(-not $listener){throw 'No available local port.'}
$url="http://127.0.0.1:$Port/1"
if(-not $NoBrowser){Start-Process $url}
Write-Output "CONE demo: $url"
$mime=@{'.html'='text/html; charset=utf-8';'.js'='text/javascript; charset=utf-8';'.mjs'='text/javascript; charset=utf-8';'.css'='text/css; charset=utf-8';'.json'='application/json';'.svg'='image/svg+xml';'.png'='image/png';'.jpg'='image/jpeg';'.ico'='image/x-icon';'.woff'='font/woff';'.woff2'='font/woff2';'.ttf'='font/ttf'}
$running=$true
try{
  while($running){
    $client=$listener.AcceptTcpClient()
    try{
      $stream=$client.GetStream();$stream.ReadTimeout=2500
      $reader=[IO.StreamReader]::new($stream,[Text.Encoding]::ASCII,$false,4096,$true)
      $line=$reader.ReadLine()
      if(-not $line){continue}
      do{$header=$reader.ReadLine()}while($header)
      $method,$target,$protocol=$line.Split(' ')
      $path=[Uri]::UnescapeDataString(($target -split '\?',2)[0])
      $status='200 OK';$type='text/plain; charset=utf-8'
      if($path -eq '/__cone_demo'){$bytes=[Text.Encoding]::UTF8.GetBytes('CONE-CJ1-2026')}
      elseif($path -eq '/__stop'){$bytes=[Text.Encoding]::UTF8.GetBytes('CONE demo stopped. You can close this tab.');$running=$false}
      else{
        $relative=$path.TrimStart('/').Replace('/',[IO.Path]::DirectorySeparatorChar)
        $file=[IO.Path]::GetFullPath((Join-Path $webRoot $relative))
        if(-not ($file -eq $webRoot -or $file.StartsWith($webRoot+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase))){$status='403 Forbidden';$bytes=[Text.Encoding]::UTF8.GetBytes('Forbidden')}
        else{
          if((Test-Path -LiteralPath $file -PathType Container) -or -not [IO.Path]::GetExtension($file)){$file=Join-Path $webRoot 'index.html'}
          if(Test-Path -LiteralPath $file -PathType Leaf){$bytes=[IO.File]::ReadAllBytes($file);$ext=[IO.Path]::GetExtension($file).ToLowerInvariant();$type=if($mime.ContainsKey($ext)){$mime[$ext]}else{'application/octet-stream'}}
          else{$status='404 Not Found';$bytes=[Text.Encoding]::UTF8.GetBytes('Not Found')}
        }
      }
      $head=[Text.Encoding]::ASCII.GetBytes("HTTP/1.1 $status`r`nContent-Type: $type`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n")
      $stream.Write($head,0,$head.Length)
      if($method -ne 'HEAD'){$stream.Write($bytes,0,$bytes.Length)}
      $stream.Flush()
    }catch{}finally{$client.Dispose()}
  }
}finally{$listener.Stop()}

