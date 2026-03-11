# Installation

## Environment Requirements

- Vue 3.5+
- TypeScript 5.x
- Node.js 18+

## Installation Methods

### pnpm (Recommended)

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

## Installing Model Providers

The `ai` package does not include model providers. You need to install the corresponding `@ai-sdk/*` package based on the model you are using:

```bash
# OpenAI (GPT-4o, GPT-4, etc.)
pnpm add @ai-sdk/openai

# Anthropic (Claude)
pnpm add @ai-sdk/anthropic

# Google Gemini
pnpm add @ai-sdk/google

# DeepSeek
pnpm add @ai-sdk/deepseek

# Qwen (Tongyi Qianwen)
pnpm add @ai-sdk/qwen

# Wenxin Yiyan (Baidu)
pnpm add @ai-sdk/baidu

# Ollama (Local Models)
pnpm add @ai-sdk/ollama

# LM Studio
pnpm add @ai-sdk/lmstudio
```

## Quick Configuration

### Basic Configuration

```typescript
import { createOpenAI } from '@ai-sdk/openai'

// Create OpenAI provider
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL // Optional, custom API endpoint
})
```

### Usage in Vue Components

```typescript
import { useAIChat } from '@yh-ui/ai-sdk'

const { messages, input, isLoading, sendMessage } = useAIChat({
  api: '/api/chat', // Your backend streaming endpoint
  initialMessages: [{ role: 'assistant', content: 'Hello! How can I help you today?' }]
})
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes the following configuration:

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
We recommend using `bundler` as the `moduleResolution` to maintain consistency with Vite projects.
:::
