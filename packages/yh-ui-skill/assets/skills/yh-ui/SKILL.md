---
name: yh-ui
description: Use this skill when building Vue 3 or Nuxt interfaces with YH-UI, including admin screens, AI chat products, request hooks, flow editors, themes, icons, locale setup, and component selection. It helps coding agents choose real YH-UI packages/components and produce correct examples without inventing APIs.
---

# YH-UI Agent Skill

YH-UI is a Vue 3.5+ component system for product-grade applications. Use this skill to generate code that uses the actual YH-UI package boundaries, component names, and integration patterns.

## When To Use

Use this skill for:

- Vue 3 or Nuxt UI built with YH-UI.
- Selecting YH-UI components for admin, AI, ecommerce, workflow, data, theme, locale, or request tasks.
- Fixing hallucinated YH-UI imports, component names, paths, or outdated examples.
- Reviewing whether generated YH-UI code follows source-aligned package boundaries.
- Improving YH-UI code so it follows modern Vue 3 component-library practices.

Do not use this skill for:

- Non-Vue UI libraries.
- Generic prompt writing unrelated to YH-UI implementation.
- Backend-only AI workflows unless they use `@yh-ui/ai-sdk`, MCP, RAG, or provider adapters.

## Core Rules

- Prefer existing YH-UI components over hand-written base controls.
- Do not invent components, props, hooks, package paths, or theme APIs.
- Use `@yh-ui/yh-ui` for ordinary Vue apps that want the all-in-one entry.
- Use `@yh-ui/nuxt` for Nuxt apps and rely on auto-imported components/composables.
- Use `@yh-ui/components` when the user asks for component-only usage.
- Use `@yh-ui/request` for request state, SSE, pagination, queues, GraphQL, WebSocket, or HTTP cache helpers.
- Use `@yh-ui/flow` for flow charts, node editors, BPMN sketches, or AI workflow diagrams.
- Use `@yh-ui/ai-sdk` with `@yh-ui/components` for AI chat, streaming, tools, and provider adapters.
- Use `@yh-ui/theme` tokens and CSS variables instead of hard-coded visual systems.
- Keep model API keys on the server. Never put provider secrets in browser code.
- In SSR/Nuxt, wrap browser-heavy flow editors in `<ClientOnly>`.

## Agent Workflow

1. Classify the task: Vue app, Nuxt app, AI UI, request/data, flow/workflow, theme/locale, icon, or review.
2. Read `references/source-truth.md` when component/package accuracy matters.
3. Read only the specialized reference needed for the classified task.
4. Apply `references/vue-component-practices.md` for SFC structure, TypeScript, props/emits, slots, accessibility, SSR, and performance.
5. Generate code with real package imports and YH-UI components.
6. Check the result against `references/codegen-rubric.md` before answering.

## Quick Package Decision

| Task                                | Package                               |
| ----------------------------------- | ------------------------------------- |
| Full Vue component library          | `@yh-ui/yh-ui`                        |
| Component-only import               | `@yh-ui/components`                   |
| Nuxt integration                    | `@yh-ui/nuxt`                         |
| AI chat UI and streams              | `@yh-ui/components` + `@yh-ui/ai-sdk` |
| Request hooks and clients           | `@yh-ui/request`                      |
| Flow editor and workflow canvas     | `@yh-ui/flow`                         |
| Iconify runtime and icon components | `@yh-ui/icons`                        |
| Theme tokens and runtime theme      | `@yh-ui/theme`                        |
| Locale files                        | `@yh-ui/locale`                       |

## High-Frequency Patterns

### Vue Install

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'

createApp(App).use(YhUI).mount('#app')
```

### On-Demand Components

```vue
<script setup lang="ts">
import { YhButton, YhInput, YhTable } from '@yh-ui/components'
import '@yh-ui/components/style.css'
</script>

<template>
  <YhInput clearable placeholder="Search" />
  <YhButton type="primary">Submit</YhButton>
  <YhTable :data="rows" :columns="columns" />
</template>
```

### Nuxt

```ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true,
    buildTranspile: true,
    prefix: 'Yh'
  }
})
```

### AI Chat

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

### Flow Editor

```vue
<script setup lang="ts">
import { Controls, Flow, FlowBackground, Minimap } from '@yh-ui/flow'
import type { FlowEdge, FlowNode } from '@yh-ui/flow'

const nodes: FlowNode[] = [
  { id: 'start', type: 'input', label: 'Start', position: { x: 80, y: 80 } }
]
const edges: FlowEdge[] = []
</script>

<template>
  <Flow :nodes="nodes" :edges="edges" fit-view style="height: 560px">
    <Minimap />
    <Controls />
    <FlowBackground />
  </Flow>
</template>
```

## Progressive References

Read only the file needed for the task:

- Source-aligned exports and package boundaries: `references/source-truth.md`
- Agent task workflows: `references/agent-workflows.md`
- Vue component-library practices: `references/vue-component-practices.md`
- Component selection: `references/component-map.md`
- Common implementation patterns: `references/usage-patterns.md`
- Frequently used props/events: `references/api-cheatsheet.md`
- Nuxt auto-import and SSR: `references/nuxt.md`
- AI components and AI SDK: `references/ai-components.md`
- Request hooks: `references/request.md`
- Flow editor: `references/flow.md`
- Deep table recipe: `references/recipes-table.md`
- Deep form schema recipe: `references/recipes-form-schema.md`
- Deep AI recipe: `references/recipes-ai.md`
- Deep Flow recipe: `references/recipes-flow.md`
- Code generation acceptance rubric: `references/codegen-rubric.md`
- Evaluation prompts for regression testing: `references/eval-scenarios.md`

## Common Failure Guards

- Do not use old or non-existing APIs such as `createYhTheme` or `createRequestInstance`.
- Locale files use paths like `@yh-ui/locale/lang/zh-cn`.
- Nuxt users should not manually import every component in ordinary pages.
- Flow canvases need an explicit height.
- Prefer `YhConfigProvider` for runtime locale/config boundaries.
- Prefer theme CSS variables such as `var(--yh-color-primary)` in custom styles.
- If unsure whether a component exists, check `references/source-truth.md` before generating code.
