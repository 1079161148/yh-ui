# AiConversations

<script setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'


const tsBasic = `<${_T}>
  <div style="width: 300px; height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="conversations" 
      v-model:activeId="activeId"
      @create="handleCreate"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'


const activeId = ref('1')
const conversations = ref([
  { id: '1', title: 'Vue 3 Component Guide', updatedAt: Date.now() - 1000 * 60 * 60 },
  { id: '2', title: 'Performance Optimization', updatedAt: Date.now() - 1000 * 60 * 60 * 24, excerpt: 'Crucial for modern web development...' }
])

const handleCreate = () => {
  const newId = Date.now().toString()
  conversations.value.unshift({
    id: newId,
    title: 'New Chat ' + newId.slice(-4),
    updatedAt: Date.now()
  })
  activeId.value = newId
}

const handleDelete = (item: AiConversation) => {
  conversations.value = conversations.value.filter(c => c.id !== item.id)
}

const handleEdit = (item: AiConversation, newTitle: string) => {
  const conv = conversations.value.find(c => c.id === item.id)
  if (conv) conv.title = newTitle
}
</${_S}>`

const tsTheme = `<${_T}>
  <div style="width: 300px; height: 300px;">
    <yh-ai-conversations 
      :data="conversations" 
      v-model:activeId="activeId"
      :theme-overrides="themeOverrides"
      @create="handleCreate"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'

const themeActiveId = ref('1')
const themeConversations = ref([
  { id: '1', title: 'Dark Theme Chat', updatedAt: Date.now() }
])

const handleThemeCreate = () => {
  const newId = Date.now().toString()
  themeConversations.value.unshift({
    id: newId,
    title: 'New Chat ' + newId.slice(-4),
    updatedAt: Date.now()
  })
  themeActiveId.value = newId
}

const handleThemeDelete = (item: AiConversation) => {
  themeConversations.value = themeConversations.value.filter(c => c.id !== item.id)
}

const handleThemeEdit = (item: AiConversation, newTitle: string) => {
  const conv = themeConversations.value.find(c => c.id === item.id)
  if (conv) conv.title = newTitle
}

const themeOverrides = {
  activeBgColor: '#1a1a1a',
  activeTextColor: '#ffffff',
  hoverBgColor: '#f5f5f5'
}
</${_S}>`

const activeId = ref('1')
const conversations = ref([
  { id: '1', title: 'Vue 3 Component Guide', updatedAt: Date.now() - 1000 * 60 * 60 },
  { id: '2', title: 'Performance Optimization', updatedAt: Date.now() - 1000 * 60 * 60 * 24, excerpt: 'Crucial for modern web development...' }
])

const handleCreate = () => {
  const newId = Date.now().toString()
  conversations.value.unshift({
    id: newId,
    title: 'New Chat ' + newId.slice(-4),
    updatedAt: Date.now()
  })
  activeId.value = newId
}

const handleDelete = (item: AiConversation) => {
  conversations.value = conversations.value.filter(c => c.id !== item.id)
}

const handleEdit = (item: AiConversation, newTitle: string) => {
  const conv = conversations.value.find(c => c.id === item.id)
  if (conv) conv.title = newTitle
}

const handleThemeCreate = () => {
  const newId = Date.now().toString()
  themeConversations.value.unshift({
    id: newId,
    title: 'New Chat ' + newId.slice(-4),
    updatedAt: Date.now()
  })
  themeActiveId.value = newId
}

const handleThemeDelete = (item: AiConversation) => {
  themeConversations.value = themeConversations.value.filter(c => c.id !== item.id)
}

const handleThemeEdit = (item: AiConversation, newTitle: string) => {
  const conv = themeConversations.value.find(c => c.id === item.id)
  if (conv) conv.title = newTitle
}

const themeActiveId = ref('1')
const themeConversations = ref([
  { id: '1', title: 'Dark Theme Chat', updatedAt: Date.now() }
])

const themeOverrides = {
  activeBgColor: '#1a1a1a',
  activeTextColor: '#ffffff',
  hoverBgColor: '#f5f5f5'
}
</script>

`AiConversations` is a sidebar component tailored for AI chat sessions, offering full interactive capabilities for creating, switching, renaming, and deleting conversations.

## Basic Usage

Demonstrates basic list rendering and interactions.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="width: 300px; height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="conversations" 
      v-model:activeId="activeId"
      @create="handleCreate"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</DemoBlock>

## Custom Theme

Use `theme-overrides` to customize component styles.

<DemoBlock title="Custom Theme" :ts-code="tsTheme" :js-code="toJs(tsTheme)">
  <div style="width: 300px; height: 300px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="themeConversations" 
      v-model:activeId="themeActiveId"
      :theme-overrides="themeOverrides"
      @create="handleThemeCreate"
      @delete="handleThemeDelete"
      @edit="handleThemeEdit"
    />
  </div>
</DemoBlock>

## API

### Props

| Name            | Description              | Type                       | Default |
| --------------- | ------------------------ | -------------------------- | ------- |
| data            | List data                | `AiConversation[]`         | `[]`    |
| activeId        | Currently active ID      | `string`                   | `''`    |
| loading         | Shows loading state      | `boolean`                  | `false` |
| theme-overrides | Theme variables override | `AiConversationsThemeVars` | —       |

### Events

| Name            | Description                         | Callback Parameters                                |
| --------------- | ----------------------------------- | -------------------------------------------------- |
| update:activeId | Emitted when selection changes      | `(id: string) => void`                             |
| create          | Emitted when clicking Add button    | `() => void`                                       |
| delete          | Emitted when clicking Delete button | `(item: AiConversation) => void`                   |
| edit            | Emitted when finishing title edit   | `(item: AiConversation, newTitle: string) => void` |
| click           | Emitted when clicking list item     | `(item: AiConversation) => void`                   |

### Slots

| Name        | Description                   | Slot Scope |
| ----------- | ----------------------------- | ---------- |
| add-icon    | Custom icon for Add button    | —          |
| add-text    | Custom text for Add button    | —          |
| edit-icon   | Custom icon for Edit button   | —          |
| delete-icon | Custom icon for Delete button | —          |
| empty       | Layout when list is empty     | —          |

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component will be automatically imported.

For detailed configuration, please see [Nuxt Integration](/guide/nuxt).

## Theme Variables

| Variable Name                             | Description                  | Default Value                     |
| ----------------------------------------- | ---------------------------- | --------------------------------- |
| `--yh-ai-conversations-bg-color`          | Container background color   | `var(--yh-bg-color)`              |
| `--yh-ai-conversations-border-color`      | Border color                 | `var(--yh-border-color)`          |
| `--yh-ai-conversations-header-padding`    | Header padding               | `16px`                            |
| `--yh-ai-conversations-item-padding`      | Item padding                 | `12px 16px`                       |
| `--yh-ai-conversations-hover-bg-color`    | Item hover background color  | `var(--yh-bg-color-page)`         |
| `--yh-ai-conversations-active-bg-color`   | Active item background color | `var(--yh-color-primary-light-9)` |
| `--yh-ai-conversations-active-text-color` | Active item text color       | `var(--yh-color-primary)`         |
| `--yh-ai-conversations-title-font-size`   | Title font size              | `14px`                            |
| `--yh-ai-conversations-time-font-size`    | Time font size               | `12px`                            |
