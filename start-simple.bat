@echo off
title AI Game Start

echo ======================================
echo   AI Text Guessing Game
echo   Powered by ZhipuAI
echo ======================================
echo.

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting development server...
echo Open browser: http://localhost:3000
echo.
echo Get API key: https://open.bigmodel.cn/
echo.
echo Press Ctrl+C to stop
echo.
echo ======================================
echo.

npm run dev

pause
