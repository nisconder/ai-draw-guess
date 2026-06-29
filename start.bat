@echo off
chcp 65001 >nul
title Survival Rush - Start

echo ======================================
echo   Survival Rush - Sheng Cun Jing Su
echo   5 AI Engines - Combo Heal - Endless
echo ======================================
echo.

if not exist "package.json" (
    echo [ERROR] package.json not found
    echo Run this script from project root
    pause
    exit /b 1
)

echo [1/3] Checking dependencies...
if not exist "node_modules" (
    echo Installing...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Dependency install failed
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
) else (
    echo [OK] Dependencies exist
)

echo.
echo [2/3] Starting dev server...
echo.
echo    Open: http://localhost:3000
echo    Enter API key in game UI: Settings -> API Config
echo    Press Ctrl+C to stop
echo.
echo ======================================
echo.

npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Start failed
    echo Possible: port 3000 busy / old Node.js / broken deps
    echo Fix: close port 3000 or delete node_modules and retry
)
pause
