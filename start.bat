@echo off
chcp 65001 >nul
title Survival Rush
cls

:: Colored banner via PowerShell
powershell -NoProfile -Command ^
"Write-Host ''; ^
Write-Host '  ===========================================' -ForegroundColor Magenta; ^
Write-Host '               SURVIVAL RUSH                  ' -ForegroundColor White; ^
Write-Host '                   v2.0                        ' -ForegroundColor Magenta; ^
Write-Host '      5 AI Engines    Combo Heal    Endless    '; ^
Write-Host '  ===========================================' -ForegroundColor Magenta; ^
Write-Host ''"

echo  [1/3] Environment Check
echo  ----------------------------------------------

where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo   [OK] Node.js    %%i
) else (
    echo   [X]  Node.js    MISSING
    echo        Download: https://nodejs.org/
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo   [OK] npm        v%%i
) else (
    echo   [X]  npm        MISSING
    pause
    exit /b 1
)

if exist "package.json" (echo   [OK] package.json) else (echo   [X]  package.json  MISSING)
if exist "app\page.tsx" (echo   [OK] app/page.tsx) else (echo   [X]  app/page.tsx  MISSING)
echo.

echo  [2/3] Dependencies
echo  ----------------------------------------------

if exist "node_modules" (
    echo   [OK] Already installed
) else (
    echo   [..] Installing...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo   [X]  Install failed
        pause
        exit /b 1
    )
    echo   [OK] Install complete
)
echo.

echo  [3/3] Starting Server
echo  ----------------------------------------------
echo.
echo    Open : http://localhost:3000
echo    Key  : Enter in game UI ^(Settings ^> API Config^)
echo    Stop : Ctrl+C
echo.
echo  ===========================================
echo.

npm run dev
if %errorlevel% neq 0 (
    echo.
    echo   Server failed to start
    pause
)