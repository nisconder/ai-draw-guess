@echo off
chcp 65001 >nul
title AI文字描述猜词游戏 - 启动

echo ======================================
echo   AI文字描述猜词游戏
echo   Powered by ZhipuAI GLM-4
echo ======================================
echo.

REM 检查是否在项目目录
if not exist "package.json" (
    echo [错误] 未找到package.json文件
    echo 请确保在项目根目录中运行此脚本
    echo 当前目录: %CD%
    echo.
    pause
    exit /b 1
)

echo [步骤 1/3] 正在检查依赖...
if not exist "node_modules" (
    echo [信息] 未找到node_modules，开始安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo [成功] 依赖安装完成
) else (
    echo [成功] 依赖已存在，跳过安装
)

echo.
echo [步骤 2/3] 正在启动开发服务器...
echo.
echo [提示] 服务器启动后，请在浏览器中打开: http://localhost:3000
echo.
echo [提示] 按 Ctrl+C 可以停止服务器
echo.
echo [提示] 获取智谱AI API密钥: https://open.bigmodel.cn/
echo.
echo ======================================
echo.

npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [错误] 服务器启动失败
    echo 可能的原因:
    echo 1. 端口3000已被占用
    echo 2. Node.js版本不兼容
    echo 3. 依赖安装不完整
    echo.
    echo [解决方法]
    echo 1. 关闭其他使用3000端口的应用
    echo 2. 运行 node --version 检查Node.js版本
    echo 3. 删除node_modules文件夹后重新运行此脚本
    echo.
)

pause
