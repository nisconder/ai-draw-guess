#!/bin/bash

echo "======================================"
echo "  AI文字描述猜词游戏 - 环境检测"
echo "======================================"
echo ""

# 检查Node.js
echo "检查 Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js 已安装: $NODE_VERSION"
    if [[ "$NODE_VERSION" < "v18.0.0" ]]; then
        echo "  [警告] 推荐使用 Node.js 18.x 或更高版本"
    fi
else
    echo "✗ Node.js 未安装"
    echo "  请访问 https://nodejs.org/ 下载安装"
    exit 1
fi
echo ""

# 检查npm
echo "检查 npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm 已安装: v$NPM_VERSION"
else
    echo "✗ npm 未安装"
    echo "  npm 通常随 Node.js 一起安装"
    exit 1
fi
echo ""

# 检查项目文件
echo "检查项目文件..."
FILES=("package.json" "next.config.js" "tsconfig.json" "app/page.tsx" "app/api/generate-description/route.ts")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ $file 缺失"
    fi
done
echo ""

# 检查node_modules
echo "检查 node_modules..."
if [ -d "node_modules" ]; then
    echo "✓ 依赖已安装"
else
    echo "○ 依赖未安装（首次运行需要安装）"
fi
echo ""

echo "======================================"
echo "  环境检测完成"
echo "======================================"
echo ""

# 询问是否启动
read -p "是否启动开发服务器？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "正在启动开发服务器..."
    npm run dev
else
    echo "可以手动运行: npm run dev"
fi
