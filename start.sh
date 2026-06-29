#!/bin/bash

echo "======================================"
echo "  🔥 生存竞速 (Survival Rush)"
echo "  五大AI引擎 · 连击回血 · 无尽挑战"
echo "======================================"
echo ""

echo "[1/3] 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "安装中..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[错误] 依赖安装失败"
        exit 1
    fi
    echo "[完成] 依赖已安装"
else
    echo "[完成] 依赖已存在"
fi

echo ""
echo "[2/3] 启动开发服务器..."
echo "  打开浏览器: http://localhost:3000"
echo "  首次使用请在首页展开「⚙️ API 配置」输入密钥"
echo "  按 Ctrl+C 停止服务器"
echo ""
echo "======================================"

npm run dev
