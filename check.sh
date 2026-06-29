#!/bin/bash

echo "======================================"
echo "  🔥 生存竞速 — 环境检测"
echo "======================================"
echo ""

echo "检查 Node.js..."
if command -v node &> /dev/null; then
    echo "✓ Node.js $(node --version)"
    if [[ "$(node --version)" < "v18.0.0" ]]; then
        echo "  [警告] 推荐 Node.js 18.x+"
    fi
else
    echo "✗ Node.js 未安装 → https://nodejs.org/"
    exit 1
fi
echo ""

echo "检查 npm..."
if command -v npm &> /dev/null; then
    echo "✓ npm v$(npm --version)"
else
    echo "✗ npm 未安装"
    exit 1
fi
echo ""

echo "检查项目文件..."
for file in "package.json" "app/page.tsx" "app/api/generate-description/route.ts"; do
    if [ -f "$file" ]; then echo "✓ $file"; else echo "✗ $file 缺失"; fi
done
echo ""

if [ -d "node_modules" ]; then echo "✓ 依赖已安装"; else echo "○ 依赖未安装"; fi
echo ""

echo "======================================"
echo "  检测完成"
echo "======================================"
echo ""

read -p "启动服务器？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
else
    echo "手动启动: npm run dev"
fi
