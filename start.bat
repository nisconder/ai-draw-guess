@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: VT100 escape sequences for colors
for /f %%a in ('echo prompt $E^| cmd') do set "ESC=%%a"
set "GREEN=%ESC%[32m"
set "YELLOW=%ESC%[33m"
set "RED=%ESC%[31m"
set "CYAN=%ESC%[36m"
set "MAGENTA=%ESC%[35m"
set "WHITE=%ESC%[37m"
set "BOLD=%ESC%[1m"
set "RESET=%ESC%[0m"
set "PASS=%GREEN%[PASS]%RESET%"
set "WARN=%YELLOW%[WARN]%RESET%"
set "FAIL=%RED%[FAIL]%RESET%"
set "INFO=%CYAN%[ .. ]%RESET%"

title Survival Rush

cls
echo.
echo %BOLD%%MAGENTA%  -----------------------------------------------%RESET%
echo %BOLD%%WHITE%           SURVIVAL RUSH%RESET%
echo %BOLD%%MAGENTA%           Sheng Cun Jing Su%RESET%
echo %WHITE%       5 AI Engines - Combo Heal - Endless%RESET%
echo %BOLD%%MAGENTA%  -----------------------------------------------%RESET%
echo.

:: ============================================
:: Step 1 - Environment Check
:: ============================================
echo %BOLD%[1/3] Environment Check%RESET%
echo %CYAN%-----------------------------------------------%RESET%

where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo %GREEN%  Node.js    %%i%RESET%
) else (
    echo %RED%  Node.js    NOT FOUND - https://nodejs.org/%RESET%
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo %GREEN%  npm        v%%i%RESET%
) else (
    echo %RED%  npm        NOT FOUND%RESET%
    pause
    exit /b 1
)

if exist "package.json" (echo %GREEN%  package.json%RESET%) else (echo %RED%  package.json  MISSING%RESET%)
if exist "app\page.tsx" (echo %GREEN%  app/page.tsx%RESET%) else (echo %RED%  app/page.tsx  MISSING%RESET%)

echo.

:: ============================================
:: Step 2 - Dependencies
:: ============================================
echo %BOLD%[2/3] Dependencies%RESET%
echo %CYAN%-----------------------------------------------%RESET%

if exist "node_modules" (
    echo %GREEN%  Dependencies already installed%RESET%
) else (
    echo %YELLOW%  Installing dependencies...%RESET%
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo %RED%  Install failed%RESET%
        pause
        exit /b 1
    )
    echo %GREEN%  Install complete%RESET%
)

echo.

:: ============================================
:: Step 3 - Start Server
:: ============================================
echo %BOLD%[3/3] Starting Server%RESET%
echo %CYAN%-----------------------------------------------%RESET%
echo.
echo   %WHITE%Open: http://localhost:3000%RESET%
echo   %WHITE%First time? Expand [API Config] to enter your key%RESET%
echo   %WHITE%Stop:   Ctrl+C%RESET%
echo.
echo %BOLD%%MAGENTA%  -----------------------------------------------%RESET%
echo.

npm run dev

if %errorlevel% neq 0 (
    echo.
    echo %RED%  Server failed to start%RESET%
    echo %YELLOW%  Possible: port 3000 busy / old Node.js / broken deps%RESET%
    pause
)
endlocal
