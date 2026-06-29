# 快速开始指南

## 🚀 立即开始

### Windows用户

1. **一键启动**
   ```bash
   双击运行 start.bat
   ```
   （自动检测环境、安装依赖、启动服务器）

2. **访问游戏**
   打开浏览器访问 http://localhost:3000

### Linux/Mac用户

1. **一键启动**
   ```bash
   ./start.sh
   ```
   （自动检测环境、安装依赖、启动服务器）

2. **访问游戏**
   打开浏览器访问 http://localhost:3000

## 📝 手动启动

### 1. 安装依赖
```bash
npm install
```

### 2. 配置 API 密钥

> 💡 **快捷方式**：启动游戏后，直接在首页展开「⚙️ API 配置」面板选择提供商并输入密钥即可，无需编辑 `.env.local` 文件。密钥保存在浏览器本地。

你也可以通过环境变量方式配置（适用于部署场景）：

```bash
# Windows PowerShell
Copy-Item .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

编辑 `.env.local`，填入你的真实密钥（至少配置一个即可）：

```dotenv
# ZHIPU_API_KEY=your_zhipu_key
# DEEPSEEK_API_KEY=your_deepseek_key
# QWEN_API_KEY=your_qwen_key
# KIMI_API_KEY=your_kimi_key
# OPENAI_API_KEY=your_openai_key
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 打开浏览器
访问 http://localhost:3000

## 🔑 获取API密钥

本项目支持 5 个 AI 提供商，配置**至少一个**即可：

- **智谱 AI** — 访问 https://open.bigmodel.cn/ 获取密钥
- **DeepSeek** — 访问 https://platform.deepseek.com/ 获取密钥
- **通义千问** — 访问 https://dashscope.console.aliyun.com/ 获取密钥
- **月之暗面** — 访问 https://platform.moonshot.cn/ 获取密钥
- **OpenAI** — 访问 https://platform.openai.com/api-keys 获取密钥

## 🎮 游戏玩法

1. 打开浏览器，在首页展开「⚙️ API 配置」输入密钥（或已通过 `.env.local` 配置）
2. 选择难度（休闲60s/5命、普通45s/3命、挑战30s/1命）
3. 点击"开始游戏"
4. AI会生成文字描述和类别提示
5. 根据描述猜测对应的词语
6. 输入答案并提交
7. 答对得基础10分 + 速度加分（最高+5），答错或超时损失1条命
8. 连续答对触发连击，连击≥3可恢复1条命
9. 生命归零游戏结束，解锁成就、提升段位
10. 如果AI描述生成失败，系统会自动重试1次

## ⚡ 常见问题

### Q: 端口被占用怎么办？
A: 服务器会自动尝试使用下一个端口（如3001），或者在`.env`文件中设置：
```
PORT=3002
```

### Q: 依赖安装失败？
A: 尝试以下步骤：
```bash
npm cache clean --force
rm -rf node_modules package-lock.json  # Linux/Mac
rmdir /s /q node_modules  # Windows
npm install
```

### Q: API密钥无效？
A:
1. 确认API密钥格式正确
2. 检查账户余额
3. 确认密钥未过期

### Q: 构建失败？
A:
1. 确认Node.js版本 >= 18.0.0
2. 运行 `node --version` 检查
3. 运行 `npm --version` 检查npm版本

## 📚 更多帮助

- [完整README](README.md)
- [故障排除指南](TROUBLESHOOTING.md)
- [查看所有API提供商](README.md#-配置-api-密钥)

## 🎯 成功标志

当你看到以下内容时，说明项目已成功启动：

```
▲ Next.js 14.2.35
- Local:        http://localhost:3000

✓ Ready in X.Xs
```

## 🔍 验证安装

运行以下命令验证环境：
```bash
node --version    # 应显示 v18.0.0 或更高版本
npm --version     # 应显示 8.0.0 或更高版本
```

## 🛠️ 开发命令

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm start         # 运行生产版本
npm run lint      # 代码检查
```

## 🎉 享受游戏！

项目已成功配置并测试通过。现在开始你的AI文字描述猜词之旅吧！
