#!/bin/bash

echo "======================================"
echo "  AI文字描述猜词游戏"
echo "  Powered by ZhipuAI GLM-4"
echo "======================================"
echo ""
echo "正在安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "依赖安装失败，请检查网络连接"
    exit 1
fi

echo ""
echo "依赖安装完成！"
echo ""
echo "正在启动开发服务器..."
echo "请在浏览器中打开 http://localhost:3000"
echo ""
echo "获取智谱AI API密钥: https://open.bigmodel.cn/"
echo ""

npm run dev
