@echo off
title 🔥 生存竞速 — 一键启动

echo ======================================
echo   🔥 生存竞速 (Survival Rush)
echo   一键安装 + 启动
echo ======================================
echo.

echo [1/2] 安装依赖...
call npm install

echo.
echo [2/2] 启动开发服务器...
echo   打开浏览器: http://localhost:3000
echo   首次使用请在首页展开「⚙️ API 配置」输入密钥
echo   按 Ctrl+C 停止
echo.

call npm run dev
