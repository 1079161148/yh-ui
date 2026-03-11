# 可观测性

YH-UI 提供 OTel（OpenTelemetry）与 LangSmith 集成，便于监控与调试。

## createTracer - 追踪器

```typescript
import { createTracer } from '@yh-ui/ai-sdk'

const tracer = createTracer({
  name: 'my-ai-app',
  version: '1.0.0',
  exporter: 'console' // 开发环境
})

// 创建Span
const span = tracer.startSpan('generate-text')
span.setAttribute('model', 'gpt-4')
span.setAttribute('input.prompt', 'Hello')

try {
  const result = await generateText({
    /* ... */
  })
  span.setAttribute('output.text', result.text)
  span.setAttribute('output.tokens', result.usage.completionTokens)
} catch (error) {
  span.setAttribute('error', true)
  span.setAttribute('error.message', error.message)
} finally {
  span.end()
}
```

## createOTelConsoleExporter - 控制台导出（开发）

```typescript
import { createTracer, createOTelConsoleExporter } from '@yh-ui/ai-sdk'

const tracer = createTracer({
  name: 'my-ai-app',
  exporter: createOTelConsoleExporter()
})
```

## createLangSmithExporter - LangSmith 导出（生产）

```typescript
import { createTracer, createLangSmithExporter } from '@yh-ui/ai-sdk'

const tracer = createTracer({
  name: 'my-ai-app',
  exporter: createLangSmithExporter({
    apiKey: process.env.LANGSMITH_API_KEY,
    projectName: 'my-ai-app',
    sampleRate: 0.1 // 采样率 10%
  })
})
```

## createObservabilityManager - 统一管理

```typescript
import {
  createTracer,
  createOTelConsoleExporter,
  createLangSmithExporter,
  createObservabilityManager
} from '@yh-ui/ai-sdk'

const consoleExporter = createOTelConsoleExporter()
const langSmithExporter = createLangSmithExporter({
  apiKey: process.env.LANGSMITH_API_KEY
})

const observability = createObservabilityManager({
  exporters: [consoleExporter, langSmithExporter],
  flushInterval: 5000 // 5秒刷新一次
})

// 统一导出
await observability.export(tracer.getSpans())
```

## 自动追踪

```typescript
import { withTracing } from '@yh-ui/ai-sdk'

// 自动追踪函数
const tracedGenerate = withTracing(generateText, {
  name: 'generate-text',
  attributes: { model: 'gpt-4' }
})

// 调用时会自动创建 span
const result = await tracedGenerate({
  /* ... */
})
```

::: tip
LangSmith 是 LangChain 官方提供的监控平台，可查看：

- 请求/响应日志
- Token 消耗统计
- 延迟分析
- 工具调用追踪
  :::
