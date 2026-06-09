# Deep Recipe: YH-UI AI Components

Use this recipe when building rich AI chat applications, assistant portals, Copilot interfaces, reasoning process visualisations, interactive code environments, and AI server integrations.

## Default Choice

Combine `@yh-ui/components` (for frontend AI components) with `@yh-ui/ai-sdk/vue` (for Vue composition API chat hooks) and `@yh-ui/ai-sdk` (for server provider adapters, security filters, and tracing).

## AI Frontend Component Selection

- **`YhAiBubble`**: Renders message bubbles. It supports typed animations, markdown parsing, syntax highlighting, and custom sanitization filters.
- **`YhAiThoughtChain`**: Visualises multi-step reasoning processes (e.g. DeepSeek-R1 thinking logs).
- **`YhAiCodeRunner` / `YhAiCodeEditor`**: Provides interactive playgrounds where AI-generated code can be edited and executed directly.
- **`YhAiMermaid`**: Renders standard Mermaid graph syntax dynamically in real-time.
- **`YhAiSources`**: Shows cited articles, files, or document passages with relevance scores.

## Pattern: Interactive Chat Interface with Code Execution

This template implements streamed text answers, rendering of reasoning logs, interactive code execution inside Pyodide/python runtimes, and Mermaid diagrams:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  YhAiBubble,
  YhAiSender,
  YhAiThoughtChain,
  YhAiMermaid,
  YhAiCodeRunner
} from '@yh-ui/components'
import { useAIChat } from '@yh-ui/ai-sdk/vue'

// Custom interface for message structures
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  thinkingSteps?: Array<{ title: string; content: string; status: 'thinking' | 'done' }>
  codeToRun?: string
  mermaidSyntax?: string
}

const { messages, input, isLoading, sendMessage, stop } = useAIChat({
  api: '/api/chat',
  onResponse: () => console.log('Streaming response started')
})

const activeTab = ref<'chat' | 'runner'>('chat')
const currentCode = ref('print("Hello from YH-UI AI!")')
</script>

<template>
  <div class="ai-chat-layout">
    <div class="chat-main">
      <div class="message-feed">
        <div v-for="msg in messages" :key="msg.id" class="message-row">
          <!-- Render Reasoning Chain if available -->
          <YhAiThoughtChain
            v-if="msg.thinkingSteps && msg.thinkingSteps.length"
            :items="msg.thinkingSteps"
            title="Reasoning Chain"
            auto-collapse
          />

          <!-- Main Message Bubble -->
          <YhAiBubble
            :role="msg.role"
            :content="msg.content"
            :markdown="true"
            :enable-sanitizer="true"
            streaming
          />

          <!-- Mermaid syntax parsed and rendered dynamically -->
          <YhAiMermaid v-if="msg.mermaidSyntax" :code="msg.mermaidSyntax" class="mermaid-block" />

          <!-- Live Python/JS execution if generated code block is present -->
          <YhAiCodeRunner
            v-if="msg.codeToRun"
            :code="msg.codeToRun"
            language="python"
            autorun
            class="runner-block"
          />
        </div>
      </div>

      <YhAiSender
        v-model="input"
        :loading="isLoading"
        clearable
        placeholder="Type a message or mention prompts using /..."
        @send="sendMessage"
        @cancel="stop"
      />
    </div>
  </div>
</template>
```

## Pattern: AI Server Configuration, Tracing & Safety Filters

Configure standard LLM adapters, safety moderation filters, and telemetry tracers on the backend (`@yh-ui/ai-sdk`):

```ts
import { createProviderAdapter, createSafetyFilter, createTracer } from '@yh-ui/ai-sdk'

// 1. Setup provider adapter (DeepSeek endpoint example)
const provider = createProviderAdapter({
  provider: 'deepseek',
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultModel: 'deepseek-reasoner'
})

// 2. Setup safety and content guardrails
const guardrail = createSafetyFilter({
  blockHostileContent: true,
  censorProfanity: true,
  customBlockWords: ['private_token', 'db_password']
})

// 3. Setup telemetry and tracing
const tracer = createTracer({
  projectName: 'yh-ui-ai-ops',
  serviceName: 'assistant-service'
})

export async function processAiRequest(prompt: string, history: any[]) {
  // Check user input against safety filters
  const scanResult = await guardrail.scanInput(prompt)
  if (!scanResult.safe) {
    throw new Error(`Input violated safety rules: ${scanResult.reason}`)
  }

  // Trace the LLM execution call
  return await tracer.traceSpan('llm_generation', async () => {
    const stream = await provider.chatStream([...history, { role: 'user', content: prompt }])

    // Scan stream chunks to prevent secret leakage
    return guardrail.pipeOutput(stream)
  })
}
```

## Agent Rules

- **Client Sanitization**: Keep `:enable-sanitizer="true"` on `YhAiBubble` to ensure user inputs and raw markdown rendering cannot inject hostile scripts.
- **Explicit Reasoning**: Never hide thinking logs inside ordinary paragraph text. Always use `YhAiThoughtChain` for models that output logical step arrays.
- **Python Runtime URL**: When using python code execution in `YhAiCodeRunner`, ensure a valid Pyodide URL or remote execution API endpoint is supplied if defaults are disabled.
- **API Secret Keys**: Never output provider secret API keys inside frontend environment variables (`VITE_`). Keep adapters configured strictly inside server endpoints.
