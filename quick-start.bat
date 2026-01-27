@echo off
chcp 437 >nul

echo ======================================
echo   AI Game Quick Start
echo ======================================
echo.

echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Starting development server...
echo.
echo Open browser: http://localhost:3000
echo Get API key: https://open.bigmodel.cn/
echo.
echo Press Ctrl+C to stop server
echo.
echo ======================================
echo.

call npm run dev
