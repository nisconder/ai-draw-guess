@echo off
chcp 65001 >nul
title Survival Rush - Quick Start

echo.
echo   ===========================================
echo               SURVIVAL RUSH
echo              Quick Start
echo   ===========================================
echo.

echo   [..] Installing dependencies...
call npm install >nul 2>&1
if %errorlevel% neq 0 (
    echo   [X]  Install failed
    pause
    exit /b 1
)
echo   [OK] Dependencies ready
echo.
echo   [..] Starting server...
echo        Open : http://localhost:3000
echo        Key  : Settings ^> API Config
echo        Stop : Ctrl+C
echo   ===========================================
echo.

call npm run dev