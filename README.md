# AI文字描述猜词游戏 📝

> Powered by ZhipuAI GLM-4 | Developed with ❤️ by Vibe Coding

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ZhipuAI](https://img.shields.io/badge/ZhipuAI-GLM--4-FF6B35?style=for-the-badge)](https://open.bigmodel.cn/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

一个基于Next.js和智谱AI的文字描述猜测游戏。AI会使用智谱AI的GLM-4模型生成生动的文字描述，玩家需要根据描述猜测出对应的词语。

> 💡 **首次使用？** 查看 [快速开始指南](QUICKSTART.md) 立即开始！

## ✨ 功能特点

- 🤖 **AI生成生动文字描述** - 使用智谱AI GLM-4-Flash模型
- 🎯 **5轮游戏挑战** - 每局5个随机词汇
- ⏱️ **每轮60秒倒计时** - 增加游戏紧张感
- 🏆 **实时计分系统** - 答对得10分
- 💡 **类别提示辅助** - 帮助玩家快速定位
- 📱 **响应式设计** - 支持手机、平板和桌面
- 🎨 **精美渐变界面** - 现代化的UI设计
- 🌐 **纯前端架构** - 无需后端服务器

## 🚀 快速开始

### 方式1: 一键启动（Windows）

```bash
# 双击运行
quick-start.bat
```

### 方式2: 手动启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器
# http://localhost:3000
```

## 🔑 获取API密钥

1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/)
2. 注册/登录账号（免费）
3. 在API密钥页面生成新的API密钥
4. 在游戏界面输入密钥开始游戏

## 🎮 游戏玩法

1. 输入你的智谱AI API密钥
2. 点击"开始游戏"
3. AI会生成一个生动形象的文字描述，并提供类别提示
4. 在输入框中输入你的猜测（词语）
5. 点击"提交答案"或按回车键
6. 答对得10分，继续下一轮
7. 完成5轮后查看最终得分和准确率

## 🛠️ 技术栈

- **前端框架**: Next.js 14
- **UI库**: React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **AI服务**: 智谱AI API (GLM-4-Flash)

## 📂 项目结构

```
ai-draw-guess/
├── app/
│   ├── api/
│   │   └── generate-description/
│   │       └── route.ts       # AI描述生成API
│   ├── globals.css             # 全局样式
│   ├── layout.tsx              # 布局组件
│   └── page.tsx                # 主游戏页面
├── public/                     # 静态资源
├── quick-start.bat             # Windows快速启动脚本
├── next.config.js              # Next.js配置
├── package.json                # 项目依赖
├── tailwind.config.js          # Tailwind CSS配置
└── tsconfig.json              # TypeScript配置
```

## 🎨 界面展示

### 游戏主页
- 精美的渐变背景设计
- 简洁明了的操作界面
- 响应式布局适配各种设备

### 游戏界面
- 实时分数和轮次显示
- AI生成的生动文字描述
- 类别提示辅助猜测
- 倒计时提醒

## 📊 游戏词汇

当前包含20个词汇，涵盖多个类别：
- 水果、宠物、天体
- 交通工具、植物、动物
- 电子产品、家具、服饰
- 等等...

可在 `app/page.tsx` 中的 `wordList` 数组自定义词汇。

## 🔧 自定义配置

### 修改词汇库

```typescript
const wordList = [
  { word: '苹果', hint: '水果' },
  { word: '猫咪', hint: '宠物' },
  // 添加更多词汇...
]
```

### 调整游戏参数

```typescript
totalRounds: 5,  // 游戏总轮数
timeLeft: 60,    // 每轮倒计时（秒）
```

## 🌟 API说明

### 使用的模型
- **GLM-4-Flash**: 智谱AI的轻量级大语言模型，适合快速响应和文本生成任务

### API调用
```typescript
// 调用智谱AI生成描述
const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'glm-4-flash',
    messages: [
      {
        role: 'system',
        content: '你是一个绘画描述专家。请用简洁、生动、形象的语言描述一个物体或概念...'
      },
      {
        role: 'user',
        content: `请描述"${word}"，不要直接说出它的名字。`
      }
    ],
    temperature: 0.7,
    max_tokens: 200
  })
})
```

## 📖 文档

- [快速开始指南](HOW_TO_USE.md)
- [详细使用说明](START_GUIDE.md)
- [故障排除指南](TROUBLESHOOTING.md)
- [项目状态报告](PROJECT_STATUS.md)

## 🚀 部署

### Vercel部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ai-draw-guess)

### 其他平台

支持部署到任何支持Next.js的平台：
- Netlify
- Cloudflare Pages
- Railway
- Render

## ⚠️ 注意事项

- 需要有效的智谱AI API密钥
- GLM-4-Flash模型是免费使用的
- 每次描述生成都会消耗API调用次数
- 建议在API额度范围内合理使用
- 确保网络连接正常

## 🐛 故障排除

如遇问题，请查看 [故障排除指南](TROUBLESHOOTING.md)

常见问题：
- 端口被占用 → 服务器会自动尝试下一个端口
- API密钥无效 → 确认密钥格式和账户余额
- 依赖安装失败 → 尝试清除缓存后重新安装

## 📝 开发命令

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm start         # 运行生产版本
npm run lint      # 代码检查
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 开源协议

本项目采用 [MIT](LICENSE) 开源协议

## 👨‍💻 关于 Vibe Coding

**Vibe Coding** 是一个专注于创新技术的开发团队，致力于打造高质量的开源项目。

本项目由 Vibe Coding 团队开发，使用智谱AI的GLM-4模型为用户提供有趣的AI互动体验。

## 📮 联系方式

- 项目主页: [GitHub](https://github.com/YOUR_USERNAME/ai-draw-guess)
- 问题反馈: [Issues](https://github.com/YOUR_USERNAME/ai-draw-guess/issues)

## 🙏 致谢

- [智谱AI](https://open.bigmodel.cn/) - 提供强大的AI模型支持
- [Next.js](https://nextjs.org/) - 优秀的React框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用的CSS框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

Made with ❤️ by [Vibe Coding](https://github.com/Vibe-Coding)

</div>
