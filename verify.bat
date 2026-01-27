@echo off
chcp 65001 >nul
title 项目验证

echo ======================================
echo   AI文字描述猜词游戏 - 项目验证
echo ======================================
echo.

REM 检查Node.js
echo [1/5] 检查 Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ Node.js 未安装
    echo   请访问 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo √ Node.js: %%i

REM 检查npm
echo [2/5] 检查 npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ npm 未安装
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo √ npm: %%i

REM 检查项目文件
echo [3/5] 检查项目文件...
if exist "package.json" (echo √ package.json) else (echo ✗ package.json 缺失 && pause && exit /b 1)
if exist "next.config.js" (echo √ next.config.js) else (echo ✗ next.config.js 缺失 && pause && exit /b 1)
if exist "tsconfig.json" (echo √ tsconfig.json) else (echo ✗ tsconfig.json 缺失 && pause && exit /b 1)
if exist "app\page.tsx" (echo √ app\page.tsx) else (echo ✗ app\page.tsx 缺失 && pause && exit /b 1)
if exist "app\api\generate-description\route.ts" (echo √ app\api\generate-description\route.ts) else (echo ✗ app\api\generate-description\route.ts 缺失 && pause && exit /b 1)

REM 检查依赖
echo [4/5] 检查依赖...
if exist "node_modules" (
    echo √ 依赖已安装
) else (
    echo ○ 依赖未安装，正在安装...
    call npm install
    if %errorlevel% neq 0 (
        echo ✗ 依赖安装失败
        pause
        exit /b 1
    )
    echo √ 依赖安装完成
)

REM 尝试构建
echo [5/5] 验证项目构建...
call npm run build >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ 项目构建失败
    echo   请检查代码是否有错误
    pause
    exit /b 1
)
echo √ 项目构建成功

echo.
echo ======================================
echo   ✓ 所有检查通过！
echo ======================================
echo.
echo 项目已准备就绪！
echo.
echo 运行以下命令启动游戏：
echo   npm run dev
echo.
echo 或使用启动脚本：
echo   start.bat
echo.
echo 然后在浏览器中打开：http://localhost:3000
echo.
echo 获取智谱AI API密钥：https://open.bigmodel.cn/
echo.
pause
