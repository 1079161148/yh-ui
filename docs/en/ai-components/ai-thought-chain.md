# AiThoughtChain

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
<yh-ai-thought-chain title="Analyzing code..." status="thinking" :content="chainContent" />

<yh-ai-thought-chain title="Thinking complete" status="complete" content="Finished in 3s with optimal results." />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const chainContent = ref("1. Analyze AST\\n2. Search for redundancy\\n3. Execute optimization suggestions.")
</${_S}>`

const chainContent = ref("1. Analyze AST\n2. Search for redundancy\n3. Execute optimization suggestions.")

const tsTimeline = `<${_T}>
<yh-ai-thought-chain 
  :items="thoughtSteps" 
  :line-gradient="true"
  dot-size="default"
/>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const thoughtSteps = ref([
  { title: 'Analysis', content: 'Understanding requirements...', status: 'success', progress: 25 },
  { title: 'Context Search', content: 'Searching local modules...', status: 'success', progress: 50 },
  { title: 'Generation', content: 'Building refactor suggestions...', status: 'thinking', progress: 75 },
  { title: 'Verification', status: 'none', progress: 90 }
])
</${_S}>`

const thoughtSteps = ref([
  { title: 'Analysis', content: 'Understanding requirements...', status: 'success', progress: 25 },
  { title: 'Context Search', content: 'Searching local modules...', status: 'success', progress: 50 },
  { title: 'Generation', content: 'Building refactor suggestions...', status: 'thinking', progress: 75 },
  { title: 'Verification', status: 'none', progress: 90 }
])

const tsAdvanced = `<${_T}>
<yh-ai-thought-chain
  :items="thoughtSteps"
  show-progress
  draggable
  editable
  :markdown="true"
/>
</${_T}>

<${_S} setup lang="ts">
import type { AiThoughtItem } from '@yh-ui/components'
import { ref } from 'vue'

const thoughtSteps = ref<AiThoughtItem[]>([
  {
    title: 'Problem Understanding',
    content: '1. Read user requirements\\n2. Extract key constraints',
    status: 'success',
    expanded: true
  },
  {
    title: 'Context Lookup',
    content: 'Search related modules and dependencies in the project.',
    status: 'success'
  },
  {
    title: 'Plan Generation',
    content: 'Construct multiple solution candidates and compare trade-offs.',
    status: 'thinking'
  }
])
</${_S}>`

const tsEvents = `<${_T}>
<yh-ai-thought-chain
  :items="steps"
  editable
  draggable
  @node-click="handleNodeClick"
  @node-delete="handleDelete"
  @node-add="handleAdd"
  @reorder="handleReorder"
/>
</${_T}>

<${_S} setup lang="ts">
import type { AiThoughtItem } from '@yh-ui/components'
import { ref } from 'vue'

const steps = ref<AiThoughtItem[]>([
  { title: 'Step 1', content: 'Understand the problem', status: 'success' },
  { title: 'Step 2', content: 'Collect context', status: 'success' },
  { title: 'Step 3', content: 'Generate plan', status: 'thinking' }
])

const handleNodeClick = (item: AiThoughtItem, index: number) => {
  console.log('node-click', index, item)
}

const handleDelete = (item: AiThoughtItem, index: number) => {
  steps.value.splice(index, 1)
}

const handleAdd = (index: number) => {
  steps.value.splice(index + 1, 0, {
    title: 'New Step',
    content: 'This is a newly added reasoning step.',
    status: 'none'
  })
}

const handleReorder = (items: AiThoughtItem[]) => {
  steps.value = items
}
</${_S}>`

</script>

`AiThoughtChain` visualizes the reasoning steps of an AI model. It supports **single-node** and **multi-node timeline** modes, with drag-and-drop reordering, per-node progress, and Markdown-powered text rendering.

## Basic Usage

Single node mode, similar to `AiThinking` but with a side border. Great for inline reasoning blocks.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-thought-chain title="Analyzing code..." status="thinking" :content="chainContent" />
  <yh-ai-thought-chain title="Thinking complete" status="complete" content="Finished in 3s with optimal results." />
</div>
</DemoBlock>

## Multi-node Timeline & Progress (Smooth Animation)

When you pass an `items` list, the component switches to timeline mode and renders each reasoning step in order. You can attach `status` and `progress` to each node and show an aggregated progress bar at the top.

> [!TIP]
> **Smooth Interaction**: The component features a built-in smooth expand/collapse animation powered by CSS Grid. When you click a node to toggle its details, the content area slides naturally without jarring layout shifts.

<DemoBlock title="Timeline Mode" :ts-code="tsTimeline" :js-code="toJs(tsTimeline)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain :items="thoughtSteps" :line-gradient="true" show-progress />
</div>
</DemoBlock>

## Editable & Draggable Nodes

Enable `draggable` and `editable` to support **drag-and-drop reordering**, **deleting steps**, and **inserting new steps**. Node content is rendered with Markdown by default to better express complex reasoning.

<DemoBlock title="Editable Thought Chain" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain
    :items="thoughtSteps"
    show-progress
    draggable
    editable
  />
</div>
</DemoBlock>

## Events & Interaction

With editing and drag features enabled, you can react to user actions via events and keep external state in sync:

<DemoBlock title="Interaction Events" :ts-code="tsEvents" :js-code="toJs(tsEvents)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain
    :items="thoughtSteps"
    editable
    draggable
  />
</div>
</DemoBlock>

## Nuxt Support

Thought chain interactions are fully Nuxt 3/4 SSR compatible. Component state hydration is handled at mount.

For more information, see [Nuxt Integration Guide](/en/guide/nuxt).

## API

### Props

| Name            | Description                                                  | Type                                                                      | Default     |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------- | ----------- |
| title           | Title (single-node mode)                                     | `string`                                                                  | —           |
| content         | Content (single-node mode)                                   | `string`                                                                  | —           |
| status          | Overall status (works with both single and multi-node modes) | `'thinking' \| 'loading' \| 'success' \| 'complete' \| 'error' \| 'none'` | `'none'`    |
| items           | Reasoning steps; enables timeline mode when provided         | `AiThoughtItem[]`                                                         | `[]`        |
| autoCollapse    | Auto-collapse single-node content once status becomes done   | `boolean`                                                                 | `true`      |
| dot-size        | Node dot size                                                | `'small' \| 'default' \| 'large'`                                         | `'default'` |
| line-gradient   | Whether the vertical line uses a gradient                    | `boolean`                                                                 | `false`     |
| show-progress   | Whether to show a global progress bar on top                 | `boolean`                                                                 | `false`     |
| draggable       | Enable drag-and-drop reordering of steps                     | `boolean`                                                                 | `false`     |
| editable        | Enable node operations (add / delete), usually with drag     | `boolean`                                                                 | `false`     |
| markdown        | Render `content` / `description` using Markdown              | `boolean`                                                                 | `true`      |
| theme-overrides | Instance-level theme overrides (from `@yh-ui/theme`)         | `ComponentThemeVars`                                                      | —           |

### AiThoughtItem Structure

| Name                  | Description                             | Type                      |
| --------------------- | --------------------------------------- | ------------------------- |
| title                 | Step title                              | `string`                  |
| content / description | Detailed step text                      | `string`                  |
| status                | Step status                             | `AiThoughtStatus`         |
| expanded              | Whether details are expanded by default | `boolean`                 |
| icon                  | Custom icon name                        | `string`                  |
| id                    | Unique identifier for drag / updates    | `string`                  |
| extra                 | Extra business payload                  | `Record<string, unknown>` |
| progress              | Step progress percentage `0-100`        | `number`                  |
| clickable             | Whether the step content is clickable   | `boolean`                 |

### Events

| Name         | Description                          | Payload                                |
| ------------ | ------------------------------------ | -------------------------------------- |
| update:items | Fired when the items list is updated | `(items: AiThoughtItem[])`             |
| node-click   | Fired when a node content is clicked | `(item: AiThoughtItem, index: number)` |
| node-delete  | Fired when the delete button is used | `(item: AiThoughtItem, index: number)` |
| node-add     | Fired when a new node is requested   | `(index: number)`                      |
| reorder      | Fired after drag-and-drop reordering | `(items: AiThoughtItem[])`             |

### Slots

| Name    | Description                        |
| ------- | ---------------------------------- |
| default | Custom content for single-node use |

## Theme Variables

AiThoughtChain is deeply integrated with the design system:

**AI ThoughtChain CSS Variables**

| Variable Name                        | Default Value                    |
| ------------------------------------ | -------------------------------- |
| `--yh-ai-thought-chain-line-color`   | `var(--yh-border-color-lighter)` |
| `--yh-ai-thought-chain-active-color` | `var(--yh-color-primary)`        |
