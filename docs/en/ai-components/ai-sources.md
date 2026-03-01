# AiSources Knowledge Base Attribution

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const mockSources = [
  { id: 1, title: 'Vue 3 Reactivity Principle', source: 'vuejs.org', url: 'https://vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 introduced a reactivity system based on Proxy, which is a complete rewrite of the Object.defineProperty-based system in Vue 2...' },
  { id: 2, title: 'In-depth Understanding of ref and reactive', source: 'Juejin · Frontend Weekly', fileType: 'web', score: 0.87, excerpt: 'ref is used for primitive types, reactive is used for objects, and the internal implementation mechanisms of the two are different...' },
  { id: 3, title: 'Vue3 Best Practices Guide.pdf', source: 'Internal Knowledge Base', fileType: 'pdf', score: 0.72, excerpt: 'Chapter 3 Composition API Best Practices: In large projects, it is recommended to encapsulate business logic as independent useXxx Hooks...' },
  { id: 4, title: 'Performance Optimization Checklist.xlsx', source: 'Technical Documentation Library', fileType: 'xlsx', score: 0.63 },
  { id: 5, title: 'Pinia State Management Solution', source: 'pinia.vuejs.org', fileType: 'web', score: 0.59 },
  { id: 6, title: 'Frontend Architecture Design Document.docx', source: 'Enterprise Wiki', fileType: 'doc', score: 0.45 }
]

const tsInline = `<${_T}>
  <div style="max-width: 600px;">
    <div style="padding: 12px 16px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 12px; line-height: 1.8;">
      The reactivity system in Vue 3 is based on ES Proxy, which can monitor array changes and dynamic properties compared to Vue 2's Object.defineProperty.
      <YhTooltip placement="top" :content="mockSources[0].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[1]</sup>
      </YhTooltip>
      In large projects, it is recommended to extract related states into useXxx Hooks for reuse.
      <YhTooltip placement="top" :content="mockSources[2].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[3]</sup>
      </YhTooltip>
    </div>
    <yh-ai-sources :sources="sources" mode="inline" />
  </div>
</${_T}>

<${_S} setup lang="ts">
const sources = [
  { id: 1, title: 'Vue 3 Reactivity Principle', source: 'vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 introduced a reactivity system based on Proxy...' },
  { id: 2, title: 'In-depth Understanding of ref and reactive', source: 'Juejin', fileType: 'web', score: 0.87, excerpt: 'ref is used for primitive types, reactive is used for objects...' },
  { id: 3, title: 'Vue3 Best Practices Guide.pdf', source: 'Internal Knowledge Base', fileType: 'pdf', score: 0.72, excerpt: 'Chapter 3 Composition API Best Practices...' }
]
</${_S}>`

const tsCard = `<${_T}>
  <div style="max-width: 560px;">
    <yh-ai-sources :sources="sources" mode="card" :max-visible="3" />
  </div>
</${_T}>

<${_S} setup lang="ts">
const sources = [
  { id: 1, title: 'Vue 3 Reactivity Principle', source: 'vuejs.org', url: 'https://vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 introduced a reactivity system based on Proxy, which is a complete rewrite of the Object.defineProperty-based system in Vue 2...' },
  { id: 2, title: 'In-depth Understanding of ref and reactive', source: 'Juejin', fileType: 'web', score: 0.87, excerpt: 'ref is used for primitive types, reactive is used for objects...' },
  { id: 3, title: 'Vue3 Best Practices Guide.pdf', source: 'Internal Knowledge Base', fileType: 'pdf', score: 0.72, excerpt: 'Chapter 3 Composition API Best Practices...' },
  { id: 4, title: 'Performance Optimization Checklist.xlsx', source: 'Technical Documentation Library', fileType: 'xlsx', score: 0.63 },
  { id: 5, title: 'Pinia State Management Solution', source: 'pinia.vuejs.org', fileType: 'web', score: 0.59 }
]
</${_S}>`

const tsBadge = `<${_T}>
  <div style="max-width: 600px;">
    <div style="padding: 12px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 10px; line-height: 2;">
      Based on the following document analysis:
      <yh-ai-sources :sources="sources" mode="badge" style="display: inline-flex;" />
      The reactivity system of Vue 3 is one of its core features...
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
const sources = [
  { id: 1, title: 'Vue 3 Reactivity Principle', fileType: 'web', score: 0.95 },
  { id: 2, title: 'Difference between ref and reactive', fileType: 'pdf', score: 0.87 }
]
</${_S}>`
</script>

## inline mode

Suitable for embedding below conversation bubbles, hover to preview summary.

<DemoBlock :ts-code="tsInline" :js-code="toJs(tsInline)">
  <div style="max-width: 600px;">
    <div style="padding: 12px 16px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 12px; line-height: 1.8;">
      The reactivity system in Vue 3 is based on ES Proxy, which can monitor array changes and dynamic properties compared to Vue 2's Object.defineProperty.
      <YhTooltip placement="top" :content="mockSources[0].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[1]</sup>
      </YhTooltip>
      In large projects, it is recommended to extract related states into useXxx Hooks for reuse.
      <YhTooltip placement="top" :content="mockSources[2].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[3]</sup>
      </YhTooltip>
    </div>
    <yh-ai-sources :sources="[
      { id: 1, title: 'Vue 3 Reactivity Principle', source: 'vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 introduced a reactivity system based on Proxy, which is a complete rewrite of the Object.defineProperty-based system in Vue 2...' },
      { id: 2, title: 'In-depth Understanding of ref and reactive', source: 'Juejin', fileType: 'web', score: 0.87, excerpt: 'ref is used for primitive types, reactive is used for objects...' },
      { id: 3, title: 'Vue3 Best Practices Guide.pdf', source: 'Internal Knowledge Base', fileType: 'pdf', score: 0.72, excerpt: 'Chapter 3 Composition API Best Practices...' }
    ]" mode="inline" />
  </div>
</DemoBlock>

## card mode

Displays full attribution details, supports `maxVisible` to control default display count, expendable for more.

<DemoBlock :ts-code="tsCard" :js-code="toJs(tsCard)">
  <div style="max-width: 560px;">
    <yh-ai-sources :sources="[
      { id: 1, title: 'Vue 3 Reactivity Principle', source: 'vuejs.org', url: 'https://vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 introduced a reactivity system based on Proxy...' },
      { id: 2, title: 'In-depth Understanding of ref and reactive', source: 'Juejin', fileType: 'web', score: 0.87, excerpt: 'ref is used for primitive types...' },
      { id: 3, title: 'Vue3 Best Practices Guide.pdf', source: 'Internal Knowledge Base', fileType: 'pdf', score: 0.72, excerpt: 'Chapter 3 Composition API...' },
      { id: 4, title: 'Performance Optimization Checklist.xlsx', source: 'Technical Documentation Library', fileType: 'xlsx', score: 0.63 },
      { id: 5, title: 'Pinia State Management Solution', source: 'pinia.vuejs.org', fileType: 'web', score: 0.59 }
    ]" mode="card" :max-visible="3" />
  </div>
</DemoBlock>

## badge mode

Minimalist badge, click to pop up side drawer for details, suitable for space-constrained scenarios.

<DemoBlock :ts-code="tsBadge" :js-code="toJs(tsBadge)">
  <div style="max-width: 600px;">
    <div style="padding: 12px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 10px; line-height: 2;">
      Based on the following document analysis:
      <yh-ai-sources :sources="[
        { id: 1, title: 'Vue 3 Reactivity Principle', fileType: 'web', score: 0.95 },
        { id: 2, title: 'Difference between ref and reactive', fileType: 'pdf', score: 0.87 }
      ]" mode="badge" style="display: inline-flex;" />
      The reactivity system of Vue 3 is one of its core features...
    </div>
  </div>
</DemoBlock>

## API

### Props

| Attribute        | Type                            | Default    | Description                     |
| ---------------- | ------------------------------- | ---------- | ------------------------------- |
| `sources`        | `AiSourceItem[]`                | `[]`       | Source data list                |
| `mode`           | `'inline' \| 'card' \| 'badge'` | `'inline'` | Display mode                    |
| `maxVisible`     | `number`                        | `5`        | Default display count           |
| `showScore`      | `boolean`                       | `true`     | Whether to show relevance score |
| `showFileType`   | `boolean`                       | `true`     | Whether to show file type icon  |
| `themeOverrides` | `ComponentThemeVars`            | -          | Theme overrides                 |

### AiSourceItem

| Field      | Type                                                    | Description                             |
| ---------- | ------------------------------------------------------- | --------------------------------------- |
| `id`       | `string \| number`                                      | Unique ID (also shown as source number) |
| `title`    | `string`                                                | Source title                            |
| `url`      | `string`                                                | Source URL                              |
| `source`   | `string`                                                | Source website/doc name                 |
| `score`    | `number`                                                | Match relevance (0-1)                   |
| `excerpt`  | `string`                                                | Summary/Reference snippet               |
| `fileType` | `'web' \| 'pdf' \| 'doc' \| 'xlsx' \| 'code' \| string` | File type                               |

### Events

| Event Name | Params                   | Description                     |
| ---------- | ------------------------ | ------------------------------- |
| `click`    | `(source: AiSourceItem)` | Clicked source item             |
| `open`     | `(source: AiSourceItem)` | Clicked to view original source |

## Theme Variables

| CSS Variable                   | Description            | Default                           |
| ------------------------------ | ---------------------- | --------------------------------- |
| `--yh-ai-sources-badge-bg`     | Badge background color | `var(--yh-color-primary-light-9)` |
| `--yh-ai-sources-badge-color`  | Badge text color       | `var(--yh-color-primary)`         |
| `--yh-ai-sources-card-bg`      | Card background color  | `var(--yh-bg-color)`              |
| `--yh-ai-sources-drawer-width` | Side drawer width      | `380px`                           |
| `--yh-ai-sources-score-high`   | High relevance color   | `var(--yh-color-success)`         |
| `--yh-ai-sources-score-mid`    | Medium relevance color | `var(--yh-color-primary)`         |

```vue
<yh-ai-sources
  :sources="sources"
  mode="card"
  :theme-overrides="{
    aiSourcesCardBg: '#f0f9ff',
    aiSourcesDrawerWidth: '460px'
  }"
/>
```

## Nuxt Support

### Configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: { importStyle: true }
})
```

### RAG Retrieval Scene Example

```vue
<!-- components/AiReply.vue -->
<script setup lang="ts">
import type { AiSourceItem } from '@yh-ui/components'

const props = defineProps<{
  content: string
  sources?: AiSourceItem[]
>()

const handleOpenSource = (source: AiSourceItem) => {
  // Open original source document
  window.open(source.url, '_blank')
}
</script>

<template>
  <div class="ai-reply">
    <div class="ai-reply__content">{{ content }}</div>
    <!-- Show RAG attribution -->
    <YhAiSources
      v-if="sources && sources.length"
      :sources="sources"
      mode="inline"
      :show-score="true"
      @open="handleOpenSource"
    />
  </div>
</template>
```

### SSR Considerations

The side drawer in `badge` mode uses `<Teleport to="body">`, which needs to be used with `<ClientOnly>` in SSR environments:

```vue
<ClientOnly>
  <YhAiSources :sources="sources" mode="badge" />
</ClientOnly>
```
