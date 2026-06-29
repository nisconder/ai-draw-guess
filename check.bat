@echo off
chcp 65001 >nul
title Survival Rush - Env Check

echo ======================================
echo   Survival Rush - Environment Check
echo ======================================
echo.

echo Checking Node.js...
where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo [OK] Node.js %%i
) else (
    echo [X] Node.js not installed
    echo    Download: https://nodejs.org/
    pause
    exit /b 1
)
echo.

echo Checking npm...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo [OK] npm v%%i
) else (
    echo [X] npm not installed
    pause
    exit /b 1
)
echo.

echo Checking project files...
if exist "package.json" (echo [OK] package.json) else (echo [X] package.json missing)
if exist "app\page.tsx" (echo [OK] app\page.tsx) else (echo [X] app\page.tsx missing)
if exist "node_modules" (echo [OK] dependencies installed) else (echo [--] dependencies not installed)
echo.

echo ======================================
echo   Check complete
echo ======================================
echo.

set /p START="Start server? (y/n): "
if /i "%START%"=="y" (
    echo.
    npm run dev
)
pause
