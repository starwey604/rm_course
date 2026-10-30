@echo off
powershell.exe -NoProfile -Command "3057..3066 | ForEach-Object { try { $r=Invoke-WebRequest -Uri ('http://127.0.0.1:'+$_+'/__cone_demo') -UseBasicParsing -TimeoutSec 1; if($r.Content -eq 'CONE-CJ1-2026') { Invoke-WebRequest -Uri ('http://127.0.0.1:'+$_+'/__stop') -UseBasicParsing -TimeoutSec 2 | Out-Null } } catch {} }"
