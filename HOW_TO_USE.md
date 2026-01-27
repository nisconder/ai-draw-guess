# 使用说明 - 立即开始

## ✅ 问题已解决！

之前的编码问题已经修复。现在有**新的简化脚本**可以直接使用，不会出现乱码问题。

## 🚀 最简单的方式（Windows用户）

### 方式1: 一键启动（强烈推荐）
```
双击运行: quick-start.bat
```

这个脚本会：
1. 自动安装依赖
2. 启动开发服务器
3. 在浏览器打开游戏

### 方式2: 简单启动
```
双击运行: start-simple.bat
```

### 方式3: 检查环境
```
双击运行: check-simple.bat
```

### 方式4: 验证项目
```
双击运行: verify-simple.bat
```

## 📝 手动方式（所有平台）

```bash
# 1. 进入项目目录
cd ai-draw-guess

# 2. 安装依赖
npm install

# 3. 启动服务器
npm run dev

# 4. 打开浏览器访问
http://localhost:3000
```

## 🔑 获取API密钥

1. 访问: https://open.bigmodel.cn/
2. 注册或登录（免费）
3. 生成API密钥

## 🎮 开始游戏

1. 在游戏界面输入API密钥
2. 点击"开始游戏"
3. 根据AI描述猜测词语
4. 答对得10分
5. 完成5轮挑战

## 📂 脚本说明

所有新的简化脚本都使用英文，不会出现编码问题：

- **quick-start.bat** - 一键启动（推荐）
- **start-simple.bat** - 简单启动
- **check-simple.bat** - 检查环境
- **verify-simple.bat** - 验证项目

## ❓ 常见问题

### Q: 看到乱码或命令错误？
A: 使用新的 `quick-start.bat` 脚本，已修复编码问题。

### Q: 端口被占用？
A: 服务器会自动尝试3001、3002等端口。

### Q: 依赖安装失败？
A: 尝试删除node_modules文件夹后重新安装：
   ```bash
   npm cache clean --force
   npm install
   ```

### Q: 找不到node命令？
A: 确认Node.js已安装：访问 https://nodejs.org/

## 📚 更多文档

- [快速开始指南](START_GUIDE.md) - 中文详细说明
- [English Guide](START_GUIDE_EN.md) - 英文版本
- [完整README](README.md) - 项目完整说明
- [故障排除](TROUBLESHOOTING.md) - 详细问题解决
- [项目状态](PROJECT_STATUS.md) - 项目详细信息

## ✨ 项目特性

- ✅ 已修复所有编码问题
- ✅ 新增简化脚本，无编码问题
- ✅ 项目已通过构建测试
- ✅ 开发服务器可正常启动
- ✅ 智谱AI集成完成
- ✅ 20个词汇库
- ✅ 5轮游戏挑战
- ✅ 计分系统

## 🎯 成功标志

启动后你应该看到：
```
▲ Next.js 14.2.35
- Local: http://localhost:3000

✓ Ready in X.Xs
```

## 🌐 网络要求

- 需要访问智谱AI API
- 确保网络连接正常
- API调用需要几秒钟时间

## 🎉 现在开始！

直接双击 **quick-start.bat** 即可开始游戏！

---

**提示**: 所有旧的脚本（包含中文的）可能在不同系统上出现编码问题。建议使用新的简化脚本（英文），它们在所有系统上都能正常工作。

祝你游戏愉快！ 🎮
