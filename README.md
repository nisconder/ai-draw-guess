# 🔥 生存竞速 (Survival Rush) — AI 文字描述生存挑战

> 生存模式 · 连击回血 · 五大AI引擎 · 无尽挑战

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

生存竞速是一款基于 AI 文字描述的猜词生存游戏。你拥有有限的生命值，AI 会生成生动的文字描述，你需要猜出对应的词语。答对得分，答错或超时则损失一条命。连续答对触发连击，连击达到一定次数还能回血。这是一场考验知识储备和反应速度的生存挑战。

## ✨ 功能特点

- ❤️ **生存模式** — 5 条命，答错或超时扣 1 条，命用完游戏结束
- 🔗 **连击系统** — 连续答对累计连击数，连击越高越刺激
- 💚 **连击回血** — 连击达到阈值时恢复 1 条命，绝境翻盘
- ⚡ **速度加分** — 回答越快得分越高，最快可获得额外 +5 分
- 🎚️ **三种难度** — 休闲 (60s/5命)、普通 (45s/3命)、挑战 (30s/1命)
- 🤖 **五大AI引擎** — 支持智谱AI、DeepSeek、通义千问、月之暗面、OpenAI
- 📚 **丰富词库** — 100+ 词汇，覆盖 15+ 类别，3 级难度阶梯
- 🏆 **成就系统** — 10 个成就待解锁，从初出茅庐到登峰造极
- 👑 **段位系统** — 6 大段位：青铜 → 白银 → 黄金 → 钻石 → 大师 → 传说
- 💥 **视觉冲击** — 屏幕闪烁、震动、心跳爆炸、连击脉冲、彩带飘落、打字机效果
- 📜 **历史记录** — 本地保存每局战绩，随时回顾成长轨迹
- 📱 **响应式设计** — 手机到桌面，全平台流畅体验
- 🛡️ **错误隔离** — Error Boundary 隔离故障，不影响游戏继续

## 🚀 快速开始

**Windows 用户：** 双击 `start.bat`，自动检测环境 + 安装依赖 + 启动服务器。

**手动启动：**

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器，在首页展开「⚙️ API 配置」输入密钥
# http://localhost:3000
```

> 💡 **快捷体验**：启动后直接在游戏首页的「⚙️ API 配置」面板中选择提供商并输入密钥即可开始，无需编辑 `.env.local` 文件。密钥保存在浏览器本地，不会上传到服务器。

## 🔑 配置 API 密钥

💡 **最简单的方式**：启动游戏后，在首页展开「⚙️ API 配置」面板，选择提供商并输入密钥即可开始。密钥保存在浏览器本地，不会上传到服务器。

你也可以通过环境变量方式配置（适用于部署和服务器端使用）。本项目支持 5 个 AI 提供商，全部兼容 OpenAI API 格式。你只需要配置**至少一个**即可游玩。

| 提供商 | 环境变量 | 获取地址 |
|--------|----------|----------|
| 智谱 AI (ZhipuAI) | `ZHIPU_API_KEY` | https://open.bigmodel.cn/ |
| DeepSeek | `DEEPSEEK_API_KEY` | https://platform.deepseek.com/ |
| 通义千问 (Qwen) | `QWEN_API_KEY` | https://dashscope.console.aliyun.com/ |
| 月之暗面 (Kimi) | `KIMI_API_KEY` | https://platform.moonshot.cn/ |
| OpenAI | `OPENAI_API_KEY` | https://platform.openai.com/api-keys |

所有密钥仅在服务端读取，**不会暴露给前端**。

## 🎮 游戏玩法

### 选择难度

| 难度 | 时间限制 | 初始生命 | 连击回血阈值 | 说明 |
|------|----------|----------|--------------|------|
| 🟢 休闲 | 60 秒 | 5 条 | 5 连击 | 宽松计时，轻松上手 |
| 🟡 普通 | 45 秒 | 3 条 | 4 连击 | 标准难度，平衡体验 |
| 🔴 挑战 | 30 秒 | 1 条 | 3 连击 | 紧张计时，高难度挑战 |

### 游戏流程

1. 选择难度，游戏开始
2. AI 生成一个词语的生动描述（不直接说出词语）
3. 在输入框中输入你的猜测，按回车提交
4. **答对**：得分 + 连击数 + 速度加分，进入下一词
5. **答错或超时**：损失 1 条命，连击中断，进入下一词
6. 连击达到阈值：**恢复 1 条命**（连击不中断）
7. 生命值归零：游戏结束，查看战绩与成就

### 计分规则

- 基础分：答对 +10 分
- 速度加分：剩余时间越多，额外加分越高（最高 +5）
- 连击无额外加分，但连击回血是生存关键

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 库**: React 18
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 3
- **AI 服务**: OpenAI 兼容 API (5 个提供商)

## 📂 项目结构

```
ai-draw-guess/
├── app/
│   ├── api/generate-description/
│   │   └── route.ts            # AI 描述生成 API（支持 5 个提供商）
│   ├── globals.css              # 19 组冲击感关键帧动画
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 生存竞速游戏主页面
├── components/ (14 个组件)
│   ├── ScreenOverlay.tsx        # 全屏闪屏效果
│   ├── ScreenShake.tsx          # 屏幕震动效果
│   ├── HeartsDisplay.tsx        # 生命值心形显示（含爆炸动画）
│   ├── ComboIndicator.tsx       # 连击数指示器（含脉冲动画）
│   ├── TimerBar.tsx             # 倒计时进度条
│   ├── WordCard.tsx             # 描述文字卡片（打字机效果）
│   ├── InputArea.tsx            # 猜词输入框
│   ├── AnswerFeedback.tsx       # 正误反馈（正确/错误/超时）
│   ├── GameOverScreen.tsx       # 游戏结束画面
│   ├── StartScreen.tsx          # 开始页面（难度选择）
│   ├── AchievementBanner.tsx    # 成就弹出横幅
│   ├── RankBadge.tsx            # 段位徽章
│   ├── HistoryPanel.tsx         # 历史战绩面板
│   └── ErrorBoundary.tsx        # 错误边界
├── lib/
│   ├── types.ts                 # 游戏类型定义
│   ├── words.ts                 # 100+ 词库（含分类和难度）
│   ├── env.ts                   # 多提供商环境配置
│   ├── api-client.ts            # 统一 API 客户端（5 个提供商）
│   ├── game-difficulty.ts       # 3 种难度预设
│   ├── achievements.ts          # 10 个成就 + 6 段位系统
│   └── storage.ts               # LocalStorage 持久化
└── public/                      # 静态资源
```

## 🏆 成就与段位

### 10 个成就

| 成就 | 名称 | 解锁条件 |
|------|------|----------|
| 🔰 | 初出茅庐 | 完成第一局游戏 |
| 🔥 | 三连击 | 单局达到 3 连击 |
| 🔥🔥 | 五连击 | 单局达到 5 连击 |
| 🔥🔥🔥 | 十连击 | 单局达到 10 连击 |
| ⚡ | 秒答 | 3 秒内答对 |
| 💪 | 起死回生 | 从 1 命恢复到 3 命以上 |
| 🛡️ | 无伤 | 整局不丢命（至少 10 词） |
| 🏅 | 百词斩 | 累计答对 100 词 |
| 🎯 | 精准 | 单局准确率 ≥90%（至少 10 词） |
| 👑 | 登峰造极 | 达到传说段位 |

### 6 大段位

累计总分决定段位，段位越高越荣耀：

| 段位 | 图标 | 所需总分 |
|------|------|----------|
| 青铜 | 🥉 | ≥ 0 |
| 白银 | 🥈 | ≥ 500 |
| 黄金 | 🥇 | ≥ 1,500 |
| 钻石 | 💎 | ≥ 3,000 |
| 大师 | 🏆 | ≥ 5,000 |
| 传说 | 👑 | ≥ 10,000 |

## 🌟 API 说明

AI 描述生成本质上是调用大语言模型的对话补全接口，所有提供商均兼容 OpenAI API 格式。

### 请求格式

```typescript
const response = await fetch('/api/generate-description', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    word: '苹果',
    provider: 'zhipu'   // 可选：zhipu / deepseek / qwen / kimi / openai
  })
})

const data = await response.json()
// data.description => AI 生成的文字描述
```

### 错误处理

API 返回标准 HTTP 状态码和错误信息：

| 状态码 | 含义 |
|--------|------|
| 400 | 请求参数错误 |
| 429 | 请求频率过高 |
| 502 | API 密钥无效或服务异常 |
| 504 | AI 服务响应超时 |
| 500 | 其他服务器错误 |

## 📝 开发命令

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm start         # 运行生产版本
npm run lint      # 代码检查
```

## 🚀 部署

### Vercel 部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nisconder/ai-draw-guess)

### 其他平台

支持部署到任何支持 Next.js 的平台：
- Netlify
- Cloudflare Pages
- Railway
- Render

## ⚠️ 注意事项

- 需要至少配置一个 AI 提供商的 API 密钥（可通过游戏首页的「⚙️ API 配置」面板输入，或在 `.env.local` 中配置）
- API 密钥仅在服务端使用，前端无法访问
- 每次描述生成消耗 API 调用次数
- 建议在 API 额度范围内合理使用
- 确保网络连接正常

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 开源协议

本项目采用 [MIT](LICENSE) 开源协议

## 📮 联系方式

- 项目主页: [GitHub](https://github.com/nisconder/ai-draw-guess)
- 问题反馈: [Issues](https://github.com/nisconder/ai-draw-guess/issues)

## 🙏 致谢

- [智谱 AI](https://open.bigmodel.cn/) — GLM-4-Flash 模型支持
- [DeepSeek](https://platform.deepseek.com/) — 极致性价比
- [通义千问](https://dashscope.console.aliyun.com/) — 阿里云大模型
- [月之暗面](https://platform.moonshot.cn/) — Kimi 强推理
- [OpenAI](https://platform.openai.com/) — GPT-4o-mini
- [Next.js](https://nextjs.org/) — React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) — 实用优先的 CSS 框架
- [TypeScript](https://www.typescriptlang.org/) — 类型安全的 JavaScript

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

</div>
