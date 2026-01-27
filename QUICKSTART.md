# 快速开始指南

## 🚀 立即开始

### Windows用户

1. **环境检测**
   ```bash
   双击运行 check.bat
   ```

2. **启动游戏**
   ```bash
   双击运行 start.bat
   ```

3. **访问游戏**
   打开浏览器访问 http://localhost:3000

### Linux/Mac用户

1. **环境检测**
   ```bash
   ./check.sh
   ```

2. **启动游戏**
   ```bash
   ./start.sh
   ```

3. **访问游戏**
   打开浏览器访问 http://localhost:3000

## 📝 手动启动

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 打开浏览器
访问 http://localhost:3000

## 🔑 获取API密钥

1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/)
2. 注册或登录账号
3. 进入控制台
4. 生成API密钥（免费）

## 🎮 游戏玩法

1. 在游戏界面输入智谱AI API密钥
2. 点击"开始游戏"
3. AI会生成文字描述和类别提示
4. 根据描述猜测对应的词语
5. 输入答案并提交
6. 答对得10分，完成5轮挑战

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
- [智谱AI文档](https://open.bigmodel.cn/dev/api)

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
