# 故障排除指南

## 1. 端口被占用

### 问题描述
```
Error: listen EADDRINUSE: address already in use :::3000
```

### 解决方法

#### 方法1: 关闭占用端口的进程
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

#### 方法2: 更改端口
创建 `.env` 文件，添加：
```
PORT=3001
```

## 2. 依赖安装失败

### 问题描述
```
npm ERR! code ENOENT
npm ERR! syscall open
```

### 解决方法

#### 清除缓存并重新安装
```bash
npm cache clean --force
rm -rf node_modules package-lock.json  # Linux/Mac
# 或
rmdir /s /q node_modules  # Windows

npm install
```

## 3. TypeScript错误

### 问题描述
```
TypeScript error in app/page.tsx
```

### 解决方法

#### 更新TypeScript配置
```bash
npx tsc --init
```

## 4. API调用失败

### 问题描述
```
API密钥无效或网络错误
```

### 解决方法

#### 检查API密钥
1. 确认已配置至少一个API密钥
2. 💡 也可以在游戏首页展开「⚙️ API 配置」面板直接输入密钥，无需编辑 `.env.local` 文件
3. 如果使用 `.env.local`，确保环境变量名正确（`ZHIPU_API_KEY` / `DEEPSEEK_API_KEY` / `QWEN_API_KEY` / `KIMI_API_KEY` / `OPENAI_API_KEY`）
4. 检查账户余额和额度
5. 确认API密钥未过期

#### 测试API连接（替换YOUR_API_KEY为实际密钥）

**智谱AI：**
```bash
curl -X POST "https://open.bigmodel.cn/api/paas/v4/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "glm-4-flash", "messages": [{"role": "user", "content": "你好"}]}'
```

**DeepSeek：**
```bash
curl -X POST "https://api.deepseek.com/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "deepseek-chat", "messages": [{"role": "user", "content": "你好"}]}'
```

**OpenAI：**
```bash
curl -X POST "https://api.openai.com/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "你好"}]}'
```

详细配置请参考 `.env.example` 文件中的注释说明。

## 5. Node.js版本问题

### 问题描述
```
Error: Node.js version too old
```

### 解决方法

#### 检查Node.js版本
```bash
node --version
```

#### 升级Node.js
- 访问 https://nodejs.org/
- 下载并安装LTS版本（推荐Node.js 18.x或更高）

#### 使用nvm管理版本（推荐）
```bash
# 安装nvm（Windows）
# 下载: https://github.com/coreybutler/nvm-windows

# 安装nvm（Linux/Mac）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装最新LTS版本
nvm install --lts
nvm use --lts
```

## 6. 网络连接问题

### 问题描述
```
fetch failed
connect ECONNREFUSED
```

### 解决方法

#### 检查网络连接
```bash
# 检查是否能访问你配置的AI提供商API
# 智谱AI: ping open.bigmodel.cn
# DeepSeek: ping api.deepseek.com
# 通义千问: ping dashscope.aliyuncs.com
# OpenAI: ping api.openai.com
```

#### 配置代理（如果需要）
在 `.env` 文件中添加：
```
HTTP_PROXY=http://proxy-server:port
HTTPS_PROXY=http://proxy-server:port
```

#### 使用国内镜像（如果访问困难）
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

## 7. 文件权限问题

### 问题描述
```
Error: EACCES: permission denied
```

### 解决方法

#### Linux/Mac
```bash
sudo npm install
# 或
chmod -R 755 node_modules
```

#### Windows
以管理员身份运行命令提示符或PowerShell

## 8. 浏览器控制台错误

### 常见错误

#### Network Error
- 检查服务器是否正在运行
- 检查端口是否正确
- 查看浏览器网络标签中的请求详情

#### 500 Internal Server Error
- 检查服务器终端中的错误日志
- 检查API密钥是否正确
- 检查网络连接

#### CORS Error
检查 `next.config.js` 配置：
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
}
```

## 9. 性能问题

### 问题描述
页面加载缓慢或卡顿

### 解决方法

#### 清除浏览器缓存
- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Command+Option+E

#### 开启生产模式
```bash
npm run build
npm start
```

## 10. 重新开始

### 如果所有方法都失败了

#### 完全重置项目
```bash
# 删除所有生成文件
rm -rf node_modules .next package-lock.json  # Linux/Mac
# 或
rmdir /s /q node_modules .next  # Windows

# 重新安装
npm install
npm run dev
```

## 获取帮助

如果以上方法都无法解决问题，请：

1. 查看完整的错误信息
2. 检查服务器终端的日志输出
3. 打开浏览器开发者工具查看控制台错误
4. 访问 [Next.js文档](https://nextjs.org/docs)
5. 查看AI提供商文档：
   - [智谱AI文档](https://open.bigmodel.cn/dev/api)
   - [DeepSeek文档](https://platform.deepseek.com/api-docs)
   - [通义千问文档](https://help.aliyun.com/zh/model-studio/)
   - [月之暗面文档](https://platform.moonshot.cn/docs)
   - [OpenAI文档](https://platform.openai.com/docs)

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行生产版本
npm start

# 检查代码
npm run lint

# 查看Node.js版本
node --version

# 查看npm版本
npm --version

# 清除npm缓存
npm cache clean --force
```
