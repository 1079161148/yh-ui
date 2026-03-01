# AiAgentCard

<script setup lang="ts">
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import { ref } from 'vue'

const agents = ref([
  {
    id: '1',
    name: 'ChatGPT-4o',
    model: 'gpt-4o',
    avatar: 'robot',
    description: 'Most powerful multimodal AI assistant supporting image, audio, and video understanding.',
    status: 'online',
    verified: true,
    capabilities: [
      { label: 'Chat', icon: 'chat', type: 'primary' },
      { label: 'Code', icon: 'code', type: 'success' },
      { label: 'Image', icon: 'image', type: 'info' },
      { label: 'Analysis', type: 'warning' }
    ],
    stats: { uses: 12400, rating: 4.8, reviewCount: 2130, responseTime: 420 }
  },
  {
    id: '2',
    name: 'DeepSeek-R1',
    model: 'deepseek-r1',
    avatar: 'sparkles',
    description: 'Top reasoning model specializing in math, logic and deep analysis tasks.',
    status: 'online',
    verified: true,
    capabilities: [
      { label: 'Reasoning', type: 'danger' },
      { label: 'Coding', icon: 'code', type: 'success' },
      { label: 'Math', type: 'warning' }
    ],
    stats: { uses: 8900, rating: 4.9, reviewCount: 1560 }
  }
])

const agent = ref({
  id: 'demo',
  name: 'Knowledge Assistant',
  model: 'RAG-GPT-4',
  description: 'Smart Q&A assistant based on enterprise private knowledge base, supports PDF, Word and more.',
  avatar: 'document',
  verified: true,
  status: 'online',
  capabilities: [
    { label: 'RAG', type: 'primary' },
    { label: 'Multi-format', type: 'info' }
  ],
  stats: { uses: 5300, rating: 4.7 }
})

const tsBasic = `<${_T}>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-ai-agent-card
      v-for="agent in agents"
      :key="agent.id"
      :data="agent"
      style="width: 280px;"
      @click="handleClick"
      @use="handleUse"
      @favorite="handleFavorite"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const agents = ref([
  {
    id: '1',
    name: 'ChatGPT-4o',
    model: 'gpt-4o',
    avatar: 'robot',
    description: 'Most powerful multimodal AI assistant supporting image, audio, and video understanding.',
    status: 'online',
    verified: true,
    capabilities: [
      { label: 'Chat', icon: 'chat', type: 'primary' },
      { label: 'Code', icon: 'code', type: 'success' },
      { label: 'Image', icon: 'image', type: 'info' },
      { label: 'Analysis', type: 'warning' }
    ],
    stats: { uses: 12400, rating: 4.8, reviewCount: 2130, responseTime: 420 }
  },
  {
    id: '2',
    name: 'DeepSeek-R1',
    model: 'deepseek-r1',
    avatar: 'sparkles',
    description: 'Top reasoning model specializing in math, logic and deep analysis tasks.',
    status: 'online',
    verified: true,
    capabilities: [
      { label: 'Reasoning', type: 'danger' },
      { label: 'Coding', icon: 'code', type: 'success' },
      { label: 'Math', type: 'warning' }
    ],
    stats: { uses: 8900, rating: 4.9, reviewCount: 1560 }
  }
])

const handleClick = (agent) => console.log('click', agent.name)
const handleUse = (agent) => alert('Connecting: ' + agent.name)
const handleFavorite = (agent, favorited) => console.log(agent.name, favorited ? 'favorited' : 'unfavorited')
</${_S}>`

const tsLayouts = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px;">
    <!-- Horizontal layout -->
    <yh-ai-agent-card :data="agent" layout="horizontal" />
    <!-- Compact layout -->
    <yh-ai-agent-card :data="agent" layout="compact" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const agent = ref({
  id: 'demo',
  name: 'Knowledge Assistant',
  model: 'RAG-GPT-4',
  description: 'Smart Q&A assistant based on enterprise private knowledge base, supports PDF, Word and more.',
  avatar: 'document',
  verified: true,
  status: 'online',
  capabilities: [
    { label: 'RAG', type: 'primary' },
    { label: 'Multi-format', type: 'info' }
  ],
  stats: { uses: 5300, rating: 4.7 }
})
</${_S}>`

const tsLoading = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`
</script>

## Basic Usage

Display agent name, model, description, capability tags and statistics with click/use/favorite interactions.

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-ai-agent-card
      v-for="item in agents"
      :key="item.id"
      :data="item"
      style="width: 280px;"
    />
  </div>
</DemoBlock>

## Layout Variants

Supports `vertical` (default), `horizontal`, and `compact` layouts.

<DemoBlock :ts-code="tsLayouts" :js-code="toJs(tsLayouts)">
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px;">
    <!-- Horizontal layout -->
    <yh-ai-agent-card :data="agent" layout="horizontal" />
    <!-- Compact layout -->
    <yh-ai-agent-card :data="agent" layout="compact" />
  </div>
</DemoBlock>

## Skeleton Loading

Use `:loading="true"` to show the skeleton screen.

<DemoBlock :ts-code="tsLoading" :js-code="toJs(tsLoading)">
  <div style="display: flex; gap: 16px;">
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
  </div>
</DemoBlock>

## API

### Props

| Prop             | Type                                      | Default      | Description                         |
| ---------------- | ----------------------------------------- | ------------ | ----------------------------------- |
| `data`           | `AgentData`                               | required     | Agent data object                   |
| `layout`         | `'vertical' \| 'horizontal' \| 'compact'` | `'vertical'` | Card layout direction               |
| `showActions`    | `boolean`                                 | `true`       | Show action buttons                 |
| `showStats`      | `boolean`                                 | `true`       | Show statistics                     |
| `favoritable`    | `boolean`                                 | `true`       | Enable favorite                     |
| `selected`       | `boolean`                                 | `false`      | Selected state (highlighted border) |
| `loading`        | `boolean`                                 | `false`      | Skeleton loading state              |
| `themeOverrides` | `ComponentThemeVars`                      | -            | Theme override variables            |

### AgentData

| Field          | Type                              | Description                      |
| -------------- | --------------------------------- | -------------------------------- |
| `id`           | `string`                          | Unique identifier                |
| `name`         | `string`                          | Agent name                       |
| `avatar`       | `string`                          | Avatar URL or icon name          |
| `model`        | `string`                          | Model name                       |
| `description`  | `string`                          | Description text                 |
| `capabilities` | `AgentCapability[]`               | Capability tag list              |
| `stats`        | `AgentStats`                      | Statistics (usage, rating, etc.) |
| `verified`     | `boolean`                         | Official verified badge          |
| `status`       | `'online' \| 'offline' \| 'busy'` | Online status                    |
| `favorited`    | `boolean`                         | Initial favorite state           |

### Events

| Event      | Args                                    | Description        |
| ---------- | --------------------------------------- | ------------------ |
| `click`    | `(data: AgentData)`                     | Card clicked       |
| `use`      | `(data: AgentData)`                     | Use button clicked |
| `favorite` | `(data: AgentData, favorited: boolean)` | Favorite toggled   |
| `share`    | `(data: AgentData)`                     | Share clicked      |

### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `avatar`  | Custom avatar content                               |
| `actions` | Custom action button area (scoped: `{ data, use }`) |
| `default` | Extra content at card bottom (scoped: `{ data }`)   |

## Theme Variables

| Variable                          | Description           |
| --------------------------------- | --------------------- |
| `--yh-ai-agent-card-bg`           | Card background color |
| `--yh-ai-agent-card-border-color` | Card border color     |
| `--yh-ai-agent-card-avatar-size`  | Avatar area size      |

## Usage in Nuxt

```vue
<!-- pages/agents.vue -->
<script setup lang="ts">
const { data: agents } = await useFetch('/api/agents')
</script>

<template>
  <div class="agent-grid">
    <YhAiAgentCard
      v-for="agent in agents"
      :key="agent.id"
      :data="agent"
      @use="navigateTo(`/chat?agentId=${agent.id}`)"
    />
  </div>
</template>
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: { importStyle: true }
})
```
