@echo off
title Survival Rush - Quick Start

echo ======================================
echo   Survival Rush - Sheng Cun Jing Su
echo   One-click Install + Start
echo ======================================
echo.

echo [1/2] Installing dependencies...
call npm install

echo.
echo [2/2] Starting dev server...
echo    Open: http://localhost:3000
echo    Enter API key in game UI: Settings - API Config
echo    Press Ctrl+C to stop
echo.

call npm run dev
