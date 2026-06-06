# Notes & FAQ

## Common Questions

### 1. API Key Security

```typescript
// ✅ Recommended: Environment variables
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// ❌ Avoid: Hardcoding
const openai = createOpenAI({
  apiKey: 'sk-xxx' // Don't do this!
})
```

### 2. Streaming Response Backend Requirements

`useAIChat` requires the backend to implement a streaming endpoint:

```typescript
// Backend example (Express)
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

### 3. CORS Configuration

When calling external APIs in browser environment, CORS needs to be configured:

```typescript
// Backend add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
```

### 4. SSR Compatibility

Some features (like localStorage) are not available in SSR environment:

```typescript
import { isBrowser } from '@yh-ui/ai-sdk'

if (isBrowser) {
  // Execute only in browser
  const cache = createLocalStorageCache()
}
```

### 5. Model Selection Guide

| Scenario         | Recommended Models             |
| ---------------- | ------------------------------ |
| General Chat     | GPT-4o / Claude 3.5            |
| Code Generation  | GPT-4 / Claude 3.5             |
| Cost-Sensitive   | GPT-3.5 Turbo / Claude 3 Haiku |
| Local Deployment | Ollama (Llama, Mistral)        |

## Error Handling

```typescript
import { generateText, AISDKError } from '@yh-ui/ai-sdk'

try {
  const result = await generateText({
    /* ... */
  })
} catch (error) {
  if (error instanceof AISDKError) {
    console.error('AI SDK Error:', error.message)
    console.error('Error Code:', error.code)
  }
}
```

## Performance Optimization

1. **Streaming Responses**: Prefer using `streamText` over `generateText`
2. **Caching**: Use cache for identical requests to reduce API calls
3. **Model Selection**: Choose appropriate model based on task complexity
4. **Rate Limiting**: Configure rate limiting appropriately to avoid hitting API limits

## Feedback & Support

- Issue Reporting: https://github.com/your-org/yh-ui/issues
- Documentation Corrections: PRs welcome
