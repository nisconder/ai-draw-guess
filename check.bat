@echo off
chcp 65001 >nul
title AI文字描述猜词游戏 - 环境检测

echo ======================================
echo   AI文字描述猜词游戏 - 环境检测
echo ======================================
echo.

REM 检查Node.js
echo 检查 Node.js...
where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo √ Node.js 已安装: %NODE_VERSION%
) else (
    echo ✗ Node.js 未安装
    echo   请访问 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)
echo.

REM 检查npm
echo 检查 npm...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo √ npm 已安装: v%NPM_VERSION%
) else (
    echo ✗ npm 未安装
    echo   npm 通常随 Node.js 一起安装
    pause
    exit /b 1
)
echo.

REM 检查项目文件
echo 检查项目文件...
if exist "package.json" (echo √ package.json) else (echo ✗ package.json 缺失)
if exist "next.config.js" (echo √ next.config.js) else (echo ✗ next.config.js 缺失)
if exist "tsconfig.json" (echo √ tsconfig.json) else (echo ✗ tsconfig.json 缺失)
if exist "app\page.tsx" (echo √ app\page.tsx) else (echo ✗ app\page.tsx 缺失)
if exist "app\api\generate-description\route.ts" (echo √ app\api\generate-description\route.ts) else (echo ✗ app\api\generate-description\route.ts 缺失)
echo.

REM 检查node_modules
echo 检查 node_modules...
if exist "node_modules" (
    echo √ 依赖已安装
) else (
    echo ○ 依赖未安装（首次运行需要安装）
)
echo.

echo ======================================
echo   环境检测完成
echo ======================================
echo.

REM 询问是否启动
set /p START="是否启动开发服务器？(y/n): "
if /i "%START%"=="y" (
    echo.
    echo 正在启动开发服务器...
    echo.
    npm run dev
) else (
    echo.
    echo 可以手动运行: npm run dev
)
echo.
pause
