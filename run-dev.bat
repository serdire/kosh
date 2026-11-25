@echo off
set "PATH=D:\Project\.nodejs;%PATH%"
cd /d "D:\Project\kosh"

echo Starting Kosh Mock Backend on port 8080...
start /b "" "D:\Project\.nodejs\node.exe" "D:\Project\kosh\dev-api.js"

echo Starting Kosh Frontend Vite Server on port 5173...
cd /d "D:\Project\kosh\frontend"
"D:\Project\.nodejs\npm.cmd" run dev -- --host
