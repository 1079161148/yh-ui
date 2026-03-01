# AiPrompts

<script setup lang="ts">
import { ref } from 'vue'
import type { AiPromptItem } from '@yh-ui/components'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <yh-ai-prompts 
    title="💡 Suggestions"
    :items="items"
    @click="handleClick"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiPromptItem } from '@yh-ui/components'

const items = ref([
  { content: 'Write a Vue 3 component', description: 'Composition API component' },
  { content: 'How to implement debounce?', description: 'Functional programming patterns' },
  { content: 'Explain RAG to me', description: 'Principles of Augmented Generation' }
])

const handleClick = (item: AiPromptItem | string) => {
  console.log('Clicked prompt:', item)
}
</${_S}>`

const tsVertical = `<${_T}>
  <div style="width: 400px;">
    <yh-ai-prompts 
      layout="vertical"
      title="🚀 Quick Actions"
      :items="verticalItems"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const verticalItems = [
  { content: 'Reset Conversation', description: 'Clear history and start over' },
  { content: 'Export Chat', description: 'Generate Markdown and download' }
]
</${_S}>`

const tsTheme = `<${_T}>
  <yh-ai-prompts 
    title="🎨 Custom Theme"
    :items="themeItems"
    :theme-overrides="themeOverrides"
  />
</${_T}>

<${_S} setup lang="ts">
const themeItems = [
  { content: 'Custom Blue Theme', description: 'Applied via themeOverrides' }
]

const themeOverrides = {
  itemHoverBgColor: '#e6f7ff',
  activeBorderColor: '#1890ff',
  iconColor: '#1890ff'
}
</${_S}>`

const items = ref([
  { content: 'Write a Vue 3 component', description: 'Composition API component' },
  { content: 'How to implement debounce?', description: 'Functional programming patterns' },
  { content: 'Explain RAG to me', description: 'Principles of Augmented Generation' }
])

const vItems = [
  { content: 'Reset Conversation', description: 'Clear history and start over' },
  { content: 'Export Chat', description: 'Generate Markdown and download' }
]

const themeItems = [
  { content: 'Custom Blue Theme', description: 'Applied via themeOverrides' }
]

const themeOverrides = {
  itemHoverBgColor: '#e6f7ff',
  activeBorderColor: '#1890ff',
  iconColor: '#1890ff'
}

const handleClick = (item: AiPromptItem | string) => {
  console.log('Clicked prompt:', item)
}
</script>

`AiPrompts` provides elegant cards or list layouts for suggestions and quick actions.

## Basic Usage

Horizontal prompt cards.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-ai-prompts 
    title="💡 Suggestions"
    :items="items"
    @click="handleClick"
  />
</DemoBlock>

## Vertical Layout

Vertical layout is recommended when space is limited.

<DemoBlock title="Vertical Layout" :ts-code="tsVertical" :js-code="toJs(tsVertical)">
  <div style="width: 400px;">
    <yh-ai-prompts 
      layout="vertical"
      title="🚀 Quick Actions"
      :items="vItems"
      @click="handleClick"
    />
  </div>
</DemoBlock>

## Custom Theme

Use `theme-overrides` to personalize component styles.

<DemoBlock title="Custom Theme" :ts-code="tsTheme" :js-code="toJs(tsTheme)">
  <yh-ai-prompts 
    title="🎨 Custom Theme"
    :items="themeItems"
    :theme-overrides="themeOverrides"
    @click="handleClick"
  />
</DemoBlock>

## API

### Props

| Name            | Description                                      | Type                         | Default        |
| --------------- | ------------------------------------------------ | ---------------------------- | -------------- |
| items           | Prompt data list                                 | `(AiPromptItem \| string)[]` | `[]`           |
| layout          | Layout mode: `horizontal` `vertical` `waterfall` | `string`                     | `'horizontal'` |
| title           | Top header text                                  | `string`                     | `''`           |
| theme-overrides | Theme variables override                         | `AiPromptsThemeVars`         | —              |

### Events

| Name  | Description                  | Callback Parameters                      |
| ----- | ---------------------------- | ---------------------------------------- |
| click | Emitted when item is clicked | `(item: AiPromptItem \| string) => void` |

### Slots

| Name  | Description           | Slot Scope                                        |
| ----- | --------------------- | ------------------------------------------------- |
| title | Custom title area     | —                                                 |
| item  | Custom item rendering | `{ item: AiPromptItem \| string, index: number }` |
| icon  | Custom internal icon  | `{ icon: string }`                                |

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component will be automatically imported.

For detailed configuration, please see [Nuxt Integration](/guide/nuxt).

## Theme Variables

| Variable Name                         | Description                 | Default Value                     |
| ------------------------------------- | --------------------------- | --------------------------------- |
| `--yh-ai-prompts-bg-color`            | Container background color  | `var(--yh-bg-color)`              |
| `--yh-ai-prompts-border-color`        | Border color                | `var(--yh-border-color)`          |
| `--yh-ai-prompts-border-radius`       | Border radius               | `var(--yh-border-radius-base)`    |
| `--yh-ai-prompts-header-font-size`    | Header font size            | `14px`                            |
| `--yh-ai-prompts-item-min-height`     | Item minimum height         | `48px`                            |
| `--yh-ai-prompts-active-border-color` | Active/hover border color   | `var(--yh-color-primary)`         |
| `--yh-ai-prompts-item-hover-bg-color` | Item hover background color | `var(--yh-color-primary-light-9)` |
| `--yh-ai-prompts-hover-text-color`    | Item hover text color       | `var(--yh-color-primary)`         |
| `--yh-ai-prompts-icon-size`           | Icon size                   | `20px`                            |
| `--yh-ai-prompts-icon-color`          | Icon color                  | `var(--yh-color-primary)`         |
