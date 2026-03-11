# 注意事项

## 常见问题

### 1. API Key 安全

```typescript
// ✅ 推荐：环境变量
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// ❌ 避免：硬编码
const openai = createOpenAI({
  apiKey: 'sk-xxx' // 不要这样做！
})
```

### 2. 流式响应后端要求

`useAIChat` 需要后端实现流式接口：

```typescript
// 后端示例 (Express)
app.post('/api/chat', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: req.body.messages,
    stream: true
  })

  for await (const chunk of stream) {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`)
  }

  res.end()
})
```

### 3. CORS 配置

浏览器环境下调用外部 API 时需要配置 CORS：

```typescript
// 后端添加 CORS 头
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
```

### 4. SSR 兼容

部分功能（如 localStorage）在 SSR 环境下不可用：

```typescript
import { isBrowser } from '@yh-ui/ai-sdk'

if (isBrowser) {
  // 仅在浏览器执行
  const cache = createLocalStorageCache()
}
```

### 5. 模型选择建议

| 场景     | 推荐模型                       |
| -------- | ------------------------------ |
| 通用对话 | GPT-4o / Claude 3.5            |
| 代码生成 | GPT-4 / Claude 3.5             |
| 成本敏感 | GPT-3.5 Turbo / Claude 3 Haiku |
| 本地部署 | Ollama (Llama, Mistral)        |

## 错误处理

```typescript
import { generateText, AISDKError } from '@yh-ui/ai-sdk'

try {
  const result = await generateText({
    /* ... */
  })
} catch (error) {
  if (error instanceof AISDKError) {
    console.error('AI SDK 错误:', error.message)
    console.error('错误代码:', error.code)
  }
}
```

## 性能优化

1. **流式响应**：优先使用 `streamText` 替代 `generateText`
2. **缓存**：相同请求使用缓存减少 API 调用
3. **模型选择**：根据任务复杂度选择合适模型
4. **限流**：合理配置限流避免触发 API 限制

## 反馈与支持

- 问题反馈：https://github.com/your-org/yh-ui/issues
- 文档纠错：欢迎提交 PR
