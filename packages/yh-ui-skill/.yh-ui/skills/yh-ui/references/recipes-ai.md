# Deep Recipe: YhAi Components

Use this recipe for AI chat, copilots, assistant panels, generated artifacts, citations, attachments, and code-heavy AI answers.

## Default Choice

- Use `YhAiChat` for a complete chat surface.
- Compose `YhAiBubbleList`, `YhAiBubble`, `YhAiSender`, `YhAiSources`, `YhAiAttachments`, and `YhAiActionGroup` for custom products.
- Use `@yh-ui/ai-sdk/vue` for Vue chat state.
- Keep provider secrets in server routes.

## Source-Aligned API Highlights

- `YhAiChat`: `messages`, `loading`, `suggestions`, `virtualScroll`, `virtualHeight`, `estimatedItemHeight`; emits `send`, `update:messages`, `clear`; slots `header`, `message`, `loading`, `sender`.
- `YhAiBubble`: `content`, `markdown`, `role`, `placement`, `loading`, `typing`, `streaming`, `citations`, `multimodal`, `structuredData`, `enableSanitizer`; slots `avatar`, `header`, `default`, `footer`.
- `YhAiSender`: `modelValue`, `placeholder`, `disabled`, `loading`, `clearable`, `commands`, `mentionOptions`, `attachments`; emits `update:modelValue`, `send`, `change`, `clear`, `command`, `remove-attachment`, `upload`; slots `prefix`, `actions`, `submit`.

## Pattern: Custom Chat

```vue
<script setup lang="ts">
import { YhAiAttachments, YhAiBubble, YhAiSender, YhAiSources } from '@yh-ui/components'
import { useAIChat } from '@yh-ui/ai-sdk/vue'

const { messages, input, isLoading, sendMessage, stop } = useAIChat({
  api: '/api/chat'
})
</script>

<template>
  <section class="chat-shell">
    <YhAiBubble
      v-for="message in messages"
      :key="message.id"
      :role="message.role"
      :content="message.content"
      :loading="message.status === 'loading'"
      streaming
    />

    <YhAiSources v-if="messages.at(-1)?.sources?.length" :sources="messages.at(-1).sources" />
    <YhAiAttachments
      v-if="messages.at(-1)?.attachments?.length"
      :items="messages.at(-1).attachments"
    />

    <YhAiSender v-model="input" :loading="isLoading" @send="sendMessage" @cancel="stop" />
  </section>
</template>
```

## Security And UX Rules

- Never expose provider keys through `VITE_*` env vars or browser code.
- Treat model output as untrusted content; keep sanitizer enabled unless the server sanitizes output.
- Do not display hidden chain-of-thought text. Use `YhAiThoughtChain` for explicit user-facing reasoning steps.
- Use `YhAiSources` for citations and `YhAiArtifacts` for rich generated outputs.
- Use `YhAiCodeBlock`, `YhAiCodeEditor`, and `YhAiCodeRunner` for code-centric responses instead of raw `<pre>` blocks when interaction matters.
