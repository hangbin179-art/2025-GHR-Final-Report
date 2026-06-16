@echo off
REM ── 2025 글로벌 식량위기 대응사업 대시보드 실행 스크립트 ──
REM 이 파일을 더블클릭하면 대시보드가 실행됩니다.
REM 브라우저에서 http://localhost:5180 으로 접속하세요.

set "PATH=%~dp0.node\node-v24.16.0-win-x64;%PATH%"
cd /d "%~dp0"
echo.
echo  대시보드를 시작합니다...  잠시 후 브라우저에서 아래 주소로 접속하세요:
echo.
echo      http://localhost:5180
echo.
echo  (종료하려면 이 창에서 Ctrl + C 를 누르세요)
echo.
call npm run dev
pause
