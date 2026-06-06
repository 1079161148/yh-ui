# AI Components And AI SDK

Use `@yh-ui/components` for AI UI and `@yh-ui/ai-sdk` for chat, streaming, provider adapters, tools, cache, and conversation state.

## Core UI Components

| Component           | Use case                                |
| ------------------- | --------------------------------------- |
| `YhAiChat`          | Complete chat surface                   |
| `YhAiBubble`        | Message bubble and streaming content    |
| `YhAiSender`        | User input and send/cancel interactions |
| `YhAiProvider`      | AI context boundary                     |
| `YhAiBubbleList`    | Conversation message list               |
| `YhAiThoughtChain`  | Reasoning or step display               |
| `YhAiThinking`      | Thinking state                          |
| `YhAiActionGroup`   | Message-level actions                   |
| `YhAiCodeBlock`     | Code answer rendering                   |
| `YhAiCodeEditor`    | Editable code                           |
| `YhAiCodeRunner`    | Code execution UI                       |
| `YhAiArtifacts`     | Rich generated artifacts                |
| `YhAiAttachments`   | Attached files                          |
| `YhAiFileCard`      | File message card                       |
| `YhAiMention`       | Mention-style prompt input              |
| `YhAiMermaid`       | Mermaid diagram rendering               |
| `YhAiSources`       | Citations and references                |
| `YhAiConversations` | Conversation list                       |
| `YhAiPrompts`       | Prompt suggestions                      |
| `YhAiAgentCard`     | Agent marketplace/profile card          |
| `YhAiVoiceTrigger`  | Voice input trigger                     |
| `YhAiEditorSender`  | Editor-like sender surface              |

## Chat Hook

```vue
<script setup lang="ts">
import { YhAiBubble, YhAiSender } from '@yh-ui/components'
import { useAIChat } from '@yh-ui/ai-sdk/vue'

const { messages, input, isLoading, sendMessage, stop } = useAIChat({
  api: '/api/chat'
})
</script>

<template>
  <YhAiBubble
    v-for="message in messages"
    :key="message.id"
    :role="message.role"
    :content="message.content"
    streaming
  />
  <YhAiSender v-model="input" :loading="isLoading" @send="sendMessage" @cancel="stop" />
</template>
```

## Provider Adapter

```ts
import { createProviderAdapter, getProviderPreset } from '@yh-ui/ai-sdk/vue'

const preset = getProviderPreset('deepseek')

const provider = createProviderAdapter({
  ...preset,
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultModel: 'deepseek-chat'
})
```

## Security Rules

- Never expose provider keys in Vite `VITE_*` variables or browser code.
- Put provider calls in server routes and stream sanitized output to the client.
- Treat user prompts and model output as untrusted content when rendering custom HTML.

## Modern AI Best Practices

- Compose small surfaces: bubble list, sender, sources, attachments, and actions should be separate when the user needs control.
- Use `YhAiChat` only when the user wants a complete chat component.
- Show tool or reasoning state with `YhAiThoughtChain` or `YhAiThinking`; do not fake hidden chain-of-thought text.
- Render citations with `YhAiSources` and artifacts with `YhAiArtifacts` instead of plain links when the UI needs trust and traceability.
- Use `createYHFunctionTool` for tool definitions and keep business execution server-side when it touches private data.
