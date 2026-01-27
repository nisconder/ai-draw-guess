# 快速开始指南

## 最简单的方式

### Windows用户:

**方式1: 快速启动（推荐）**
```
双击运行: quick-start.bat
```

**方式2: 简单启动**
```
双击运行: start-simple.bat
```

**方式3: 先检查环境**
```
双击运行: check-simple.bat
```

**方式4: 验证项目**
```
双击运行: verify-simple.bat
```

**方式5: 手动启动**
```
1. 打开命令行，进入项目文件夹
2. 输入: npm install
3. 输入: npm run dev
4. 打开浏览器: http://localhost:3000
```

### Linux/Mac用户:

**方式1: 简单启动**
```
运行: ./start.sh
```

**方式2: 手动启动**
```
npm install
npm run dev
```

## 获取API密钥

1. 访问: https://open.bigmodel.cn/
2. 注册或登录
3. 生成API密钥（免费）

## 游戏玩法

1. 打开浏览器: http://localhost:3000
2. 输入智谱AI API密钥
3. 点击"开始游戏"
4. AI生成文字描述
5. 猜测词语
6. 提交答案
7. 完成5轮

## 常用命令

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm start         # 运行生产版本
```

## 常见问题

### 端口3000被占用?
服务器会自动尝试3001端口。

### 安装失败?
```bash
npm cache clean --force
# 删除node_modules文件夹
npm install
```

### 构建失败?
检查Node.js版本（需要18+）:
```bash
node --version
```

## 成功标志

你应该看到:
```
▲ Next.js 14.2.35
- Local: http://localhost:3000

✓ Ready in X.Xs
```

## 环境检查

```bash
node --version   # 应显示 v18.0.0 或更高
npm --version    # 应显示 8.0.0 或更高
```

## 更多帮助

- [README](README.md) - 完整说明
- [故障排除](TROUBLESHOOTING.md) - 详细问题解决
- [项目状态](PROJECT_STATUS.md) - 项目详细信息
- [英文指南](START_GUIDE_EN.md) - English version

## 开始游戏！

项目已配置完成并测试通过，现在开始游戏吧！

---

## 文件说明

- `quick-start.bat` - 最简单的启动方式（推荐）
- `start-simple.bat` - 简单启动脚本
- `check-simple.bat` - 检查环境脚本
- `verify-simple.bat` - 验证项目脚本

## 注意事项

- 需要智谱AI API密钥（免费获取）
- GLM-4-Flash模型免费使用
- 确保网络连接正常
- 建议使用Node.js 18.x或更高版本

---

祝你游戏愉快！
