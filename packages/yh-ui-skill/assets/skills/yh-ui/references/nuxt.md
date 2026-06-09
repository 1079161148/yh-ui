# Nuxt Integration

Use `@yh-ui/nuxt` for Nuxt 3/4 apps.

## Setup

```ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true,
    buildTranspile: true,
    prefix: 'Yh',
    ssrOptimization: {
      componentCache: true
    }
  }
})
```

## Usage

After module registration, ordinary pages should use YH-UI components directly:

```vue
<template>
  <YhButton type="primary">Create</YhButton>
  <YhInput v-model="keyword" clearable placeholder="Search" />
  <YhTable :data="rows" :columns="columns" />
</template>

<script setup lang="ts">
const keyword = ref('')
const rows = ref([{ id: 1, name: 'YH-UI' }])
const columns = [{ prop: 'name', label: 'Name' }]
</script>
```

## Auto-Imported Utilities

The module auto-imports common hooks and utilities such as `useNamespace`, `useZIndex`, `useLocale`, `useVirtualScroll`, `useAiChat`, `useSKU`, and `useCountdown`.

`useId` is imported as `useYhId` to avoid conflicts with Vue/Nuxt native `useId`.

## SSR Request Fetching

When fetching data during Nuxt server-side rendering (SSR), integrate `@yh-ui/request` within Nuxt's `useAsyncData` to ensure proper hydration and prevent duplicate requests on the client side:

```vue
<script setup lang="ts">
import { createRequest } from '@yh-ui/request'

const api = createRequest({ baseURL: '/api' })

// Fetch data using Nuxt's useAsyncData to support SSR hydration
const { data: users, pending, error } = await useAsyncData('users', () => api.get('/users'))
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <YhTable v-else :data="users" :columns="[{ prop: 'name', label: 'Name' }]" />
</template>
```

## AI & Private Server Routes

Never make AI provider calls (OpenAI, DeepSeek, Anthropic) directly from client code. Always proxy them through Nuxt Server Routes (`server/api/*`) using Nitro's server capabilities:

### Server Route (`server/api/chat.ts`)

```ts
import { defineEventHandler, readBody } from 'h3'
import { createProviderAdapter } from '@yh-ui/ai-sdk'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const config = useRuntimeConfig()

  const provider = createProviderAdapter({
    provider: 'deepseek',
    apiKey: config.deepseekApiKey,
    defaultModel: 'deepseek-chat'
  })

  // Return the streamed response securely from the server
  return provider.chatStream(messages)
})
```

## SSR Rules

- Use `<ClientOnly>` around browser-heavy flow editors, Monaco code editors, charts, or SVG animators.
- Do not assume `window`, `document`, `localStorage`, or browser event listeners exist during server-side compilation.
- Keep API keys and model keys on the server side; inject them via `useRuntimeConfig()` in Nitro event handlers.
- Let the module inject CSS unless the user explicitly disabled `importStyle`.
