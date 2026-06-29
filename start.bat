@echo off
title 🔥 生存竞速 (Survival Rush)  — 启动
chcp 65001 >nul

echo ======================================
echo   🔥 生存竞速 (Survival Rush)
echo   五大AI引擎 · 连击回血 · 无尽挑战
echo ======================================
echo.

if not exist "package.json" (
    echo [错误] 未找到 package.json 文件
    echo 请确保在项目根目录中运行此脚本
    pause
    exit /b 1
)

echo [1/3] 检查依赖...
if not exist "node_modules" (
    echo 安装中...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo [完成] 依赖已安装
) else (
    echo [完成] 依赖已存在
)

echo.
echo [2/3] 启动开发服务器...
echo.
echo   打开浏览器: http://localhost:3000
echo   首次使用请在首页展开「⚙️ API 配置」输入密钥
echo   按 Ctrl+C 停止服务器
echo.
echo ======================================
echo.

npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [错误] 启动失败
    echo 可能原因: 端口占用 / Node.js 版本过低 / 依赖不完整
    echo 解决: 关闭占用 3000 端口的程序 或 删除 node_modules 重试
)
pause
