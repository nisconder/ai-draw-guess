@echo off
title Project Verification

echo ======================================
echo   Project Verification
echo ======================================
echo.

echo [1/5] Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js not installed
    echo Please visit: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo OK: Node.js %%i

echo [2/5] Checking npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm not installed
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo OK: npm v%%i

echo [3/5] Checking project files...
if not exist "package.json" echo ERROR: package.json missing & pause & exit /b 1
if not exist "next.config.js" echo ERROR: next.config.js missing & pause & exit /b 1
if not exist "tsconfig.json" echo ERROR: tsconfig.json missing & pause & exit /b 1
if not exist "app\page.tsx" echo ERROR: app\page.tsx missing & pause & exit /b 1
if not exist "app\api\generate-description\route.ts" echo ERROR: app\api\generate-description\route.ts missing & pause & exit /b 1
echo OK: All files present

echo [4/5] Checking dependencies...
if not exist "node_modules" (
    echo INFO: Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Dependency installation failed
        pause
        exit /b 1
    )
)
echo OK: Dependencies ready

echo [5/5] Verifying project build...
call npm run build >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    echo Please check code for errors
    pause
    exit /b 1
)
echo OK: Build successful

echo.
echo ======================================
echo   All Checks Passed!
echo ======================================
echo.
echo Project is ready!
echo.
echo Run command to start:
echo   npm run dev
echo.
echo Or use startup script:
echo   start-simple.bat
echo.
echo Then open: http://localhost:3000
echo.
echo Get API key: https://open.bigmodel.cn/
echo.
pause
