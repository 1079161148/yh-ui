# Observability

YH-UI provides OTel (OpenTelemetry) and LangSmith integration for monitoring and debugging.

## createTracer - Tracer

```typescript
import { createTracer } from '@yh-ui/ai-sdk'

const tracer = createTracer({
  name: 'my-ai-app',
  version: '1.0.0',
  exporter: 'console' // Development environment
})

// Create span
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

## createOTelConsoleExporter - Console Exporter (Development)

```typescript
import { createTracer, createOTelConsoleExporter } from '@yh-ui/ai-sdk'

const tracer = createTracer({
  name: 'my-ai-app',
  exporter: createOTelConsoleExporter()
})
```

## createLangSmithExporter - LangSmith Exporter (Production)

```typescript
import { createTracer, createLangSmithExporter } from '@yh-ui/ai-sdk'

const tracer = createTracer({
  name: 'my-ai-app',
  exporter: createLangSmithExporter({
    apiKey: process.env.LANGSMITH_API_KEY,
    projectName: 'my-ai-app',
    sampleRate: 0.1 // 10% sampling rate
  })
})
```

## createObservabilityManager - Unified Management

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
  flushInterval: 5000 // Flush every 5 seconds
})

// Unified export
await observability.export(tracer.getSpans())
```

## Auto Tracing

```typescript
import { withTracing } from '@yh-ui/ai-sdk'

// Auto-trace function
const tracedGenerate = withTracing(generateText, {
  name: 'generate-text',
  attributes: { model: 'gpt-4' }
})

// Calling automatically creates span
const result = await tracedGenerate({
  /* ... */
})
```

::: tip
LangSmith is the monitoring platform provided by LangChain. You can view:

- Request/Response logs
- Token consumption statistics
- Latency analysis
- Tool call tracing
  :::
