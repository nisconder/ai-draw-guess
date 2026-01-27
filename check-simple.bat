@echo off
title Environment Check

echo ======================================
echo   Environment Check
echo ======================================
echo.

echo Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js not installed
    echo Please visit: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo OK: Node.js %%i
echo.

echo Checking npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm not installed
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo OK: npm v%%i
echo.

echo Checking project files...
if exist "package.json" (echo OK: package.json) else (echo ERROR: package.json missing & pause & exit /b 1)
if exist "next.config.js" (echo OK: next.config.js) else (echo ERROR: next.config.js missing & pause & exit /b 1)
if exist "tsconfig.json" (echo OK: tsconfig.json) else (echo ERROR: tsconfig.json missing & pause & exit /b 1)
if exist "app\page.tsx" (echo OK: app\page.tsx) else (echo ERROR: app\page.tsx missing & pause & exit /b 1)
if exist "app\api\generate-description\route.ts" (echo OK: app\api\generate-description\route.ts) else (echo ERROR: app\api\generate-description\route.ts missing & pause & exit /b 1)
echo.

echo Checking node_modules...
if exist "node_modules" (
    echo OK: Dependencies installed
) else (
    echo INFO: Dependencies not installed
)
echo.

echo ======================================
echo   Check Complete
echo ======================================
echo.

set /p START="Start server? (y/n): "
if /i "%START%"=="y" (
    echo.
    echo Starting server...
    echo.
    npm run dev
) else (
    echo.
    echo Manual command: npm run dev
)
echo.
pause
