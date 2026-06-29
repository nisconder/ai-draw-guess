@echo off
chcp 65001 >nul
title 🔥 生存竞速 — 环境检测

echo ======================================
echo   🔥 生存竞速 — 环境检测
echo ======================================
echo.

echo 检查 Node.js...
where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo √ Node.js %%i
) else (
    echo ✗ Node.js 未安装
    echo   请访问 https://nodejs.org/
    pause
    exit /b 1
)
echo.

echo 检查 npm...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo √ npm v%%i
) else (
    echo ✗ npm 未安装
    pause
    exit /b 1
)
echo.

echo 检查项目文件...
if exist "package.json" (echo √ package.json) else (echo ✗ package.json 缺失)
if exist "app\page.tsx" (echo √ app\page.tsx) else (echo ✗ app\page.tsx 缺失)
if exist "node_modules" (echo √ 依赖已安装) else (echo ○ 依赖未安装)
echo.

echo ======================================
echo   检测完成
echo ======================================
echo.

set /p START="启动服务器？(y/n): "
if /i "%START%"=="y" (
    echo.
    npm run dev
)
pause
