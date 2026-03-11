# 安装

## 环境要求

- Vue 3.5+
- TypeScript 5.x
- Node.js 18+

## 安装方式

### pnpm（推荐）

```bash
pnpm add @yh-ui/ai-sdk ai @langchain/core
```

### npm

```bash
npm install @yh-ui/ai-sdk ai @langchain/core
```

### yarn

```bash
yarn add @yh-ui/ai-sdk ai @langchain/core
```

## 安装模型 Provider

`ai` 包本身不包含模型提供商，需要根据使用的模型安装对应的 `@ai-sdk/*` 包：

```bash
# OpenAI (GPT-4o, GPT-4, etc.)
pnpm add @ai-sdk/openai

# Anthropic (Claude)
pnpm add @ai-sdk/anthropic

# Google Gemini
pnpm add @ai-sdk/google

# DeepSeek
pnpm add @ai-sdk/deepseek

# 通义千问
pnpm add @ai-sdk/qwen

# 文心一言
pnpm add @ai-sdk/baidu

# Ollama (本地模型)
pnpm add @ai-sdk/ollama

# LM Studio
pnpm add @ai-sdk/lmstudio
```

## 快速配置

### 基础配置

```typescript
import { createOpenAI } from '@ai-sdk/openai'

// 创建 OpenAI provider
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL // 可选，自定义 API 地址
})
```

### 在 Vue 组件中使用

```typescript
import { useAIChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage } = useAIChat({
  api: '/api/chat', // 你的后端流式接口
  initialMessages: [{ role: 'assistant', content: '你好！有什么可以帮助你的？' }]
})
```

## TypeScript 配置

确保 `tsconfig.json` 包含以下配置：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true
  }
}
```

::: tip
推荐使用 `bundler` 作为 `moduleResolution`，与 Vite 项目保持一致。
:::
