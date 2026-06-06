# AiConversations

<script setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ── 1. Basic Usage Demo State ──
const basicActiveId = ref('1')
const basicConversations = ref([
  { id: '1', title: 'Vue 3 Component Guide', updatedAt: Date.now() - 1000 * 60 * 60 },
  { id: '2', title: 'Performance Optimization', updatedAt: Date.now() - 1000 * 60 * 60 * 24, excerpt: 'Crucial for modern web development...' }
])

const handleBasicCreate = () => {
  const newId = Date.now().toString()
  basicConversations.value.unshift({
    id: newId,
    title: 'New Chat ' + newId.slice(-4),
    updatedAt: Date.now()
  })
  basicActiveId.value = newId
}

const handleBasicDelete = (item: AiConversation) => {
  basicConversations.value = basicConversations.value.filter(c => c.id !== item.id)
}

const handleBasicEdit = (item: AiConversation, newTitle: string) => {
  const conv = basicConversations.value.find(c => c.id === item.id)
  if (conv) conv.title = newTitle
}

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

// ── 2. Custom Theme Demo State ──
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

const activeId = ref('1')
const conversations = ref([
  { id: '1', title: 'Dark Theme Chat', updatedAt: Date.now() }
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

const themeOverrides = {
  activeBgColor: '#1a1a1a',
  activeTextColor: '#ffffff',
  hoverBgColor: '#f5f5f5'
}
</${_S}>`

// ── 3. Pinning & Grouping Demo State ──
const pinningActiveId = ref('1')
const pinningConversations = ref([
  { id: '1', title: 'Pinned Conversation', updatedAt: Date.now(), pinned: true },
  { id: '2', title: 'Regular Conversation', updatedAt: Date.now() - 1000 * 60 }
])

const handlePinningPin = (item: AiConversation, pinned: boolean) => {
  const conv = pinningConversations.value.find(c => c.id === item.id)
  if (conv) conv.pinned = pinned
}

const handlePinningDelete = (item: AiConversation) => {
  pinningConversations.value = pinningConversations.value.filter(c => c.id !== item.id)
}

const tsPinning = `<${_T}>
  <div style="width: 300px; height: 400px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="conversations" 
      v-model:activeId="activeId"
      @pin="handlePin"
      @delete="handleDelete"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'

const activeId = ref('1')
const conversations = ref([
  { id: '1', title: 'Pinned Conversation', updatedAt: Date.now(), pinned: true },
  { id: '2', title: 'Regular Conversation', updatedAt: Date.now() - 1000 * 60 }
])

const handlePin = (item: AiConversation, pinned: boolean) => {
  const conv = conversations.value.find(c => c.id === item.id)
  if (conv) conv.pinned = pinned
}

const handleDelete = (item: AiConversation) => {
  conversations.value = conversations.value.filter(c => c.id !== item.id)
}
</${_S}>`

// ── 4. Virtual Scroll Demo State ──
const virtualActiveId = ref('0')
const virtualConversations = ref(
  Array.from({ length: 1000 }).map((_, i) => ({
    id: String(i),
    title: 'History Record #' + i,
    updatedAt: Date.now() - i * 1000 * 60 * 60,
    pinned: i < 2
  }))
)

const handleVirtualPin = (item: AiConversation, pinned: boolean) => {
  const conv = virtualConversations.value.find(c => c.id === item.id)
  if (conv) {
    conv.pinned = pinned
    // Sort: pinned first, then by date desc
    virtualConversations.value.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
  }
}

const handleVirtualDelete = (item: AiConversation) => {
  virtualConversations.value = virtualConversations.value.filter(c => c.id !== item.id)
}

const tsVirtual = `<${_T}>
  <div style="width: 300px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="hugeData" 
      v-model:activeId="activeId"
      :virtual-scroll="true"
      :virtual-scroll-height="400"
      :grouped="false"
      @pin="handlePin"
      @delete="handleDelete"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'

const activeId = ref('0')
const hugeData = ref(
  Array.from({ length: 1000 }).map((_, i) => ({
    id: String(i),
    title: 'History Record #' + i,
    updatedAt: Date.now() - i * 1000 * 60 * 60,
    pinned: i < 2
  }))
)

const handlePin = (item: AiConversation, pinned: boolean) => {
  const conv = hugeData.value.find(c => c.id === item.id)
  if (conv) {
    conv.pinned = pinned
    hugeData.value.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
  }
}

const handleDelete = (item: AiConversation) => {
  hugeData.value = hugeData.value.filter(c => c.id !== item.id)
}
</${_S}>`
</script>

`AiConversations` is a sidebar component tailored for AI chat sessions, offering full interactive capabilities for creating, switching, renaming, and deleting conversations.

## Basic Usage

Demonstrates basic list rendering and interactions.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="width: 300px; height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="basicConversations" 
      v-model:activeId="basicActiveId"
      @create="handleBasicCreate"
      @delete="handleBasicDelete"
      @edit="handleBasicEdit"
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

## Pinning & Grouping

Supported grouping by time by default, and pinning conversations.

<DemoBlock title="Pinning & Grouping" :ts-code="tsPinning" :js-code="toJs(tsPinning)">
  <div style="width: 300px; height: 400px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="pinningConversations" 
      v-model:activeId="pinningActiveId"
      @pin="handlePinningPin"
      @delete="handlePinningDelete"
    />
  </div>
</DemoBlock>

## Virtual Scroll

Use `virtual-scroll` to improve performance for massive history items.

<DemoBlock title="Virtual Scroll" :ts-code="tsVirtual" :js-code="toJs(tsVirtual)">
  <div style="width: 300px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="virtualConversations" 
      v-model:activeId="virtualActiveId"
      :virtual-scroll="true"
      :virtual-scroll-height="400"
      :grouped="false"
      @pin="handleVirtualPin"
      @delete="handleVirtualDelete"
    />
  </div>
</DemoBlock>

## API

### Props

| Name                       | Description                                | Type                       | Default |
| -------------------------- | ------------------------------------------ | -------------------------- | ------- |
| data                       | List data                                  | `AiConversation[]`         | `[]`    |
| activeId                   | Currently active ID                        | `string`                   | `''`    |
| loading                    | Shows loading state                        | `boolean`                  | `false` |
| theme-overrides            | Theme variables override                   | `AiConversationsThemeVars` | —       |
| grouped                    | Whether to group conversations by time     | `boolean`                  | `true`  |
| virtual-scroll             | Enable virtual scroll                      | `boolean`                  | `false` |
| virtual-scroll-height      | Container height for virtual scroll        | `number`                   | `400`   |
| virtual-scroll-item-height | Item height for virtual scroll             | `number`                   | `50`    |
| virtual-scroll-overscan    | Number of items to render outside viewport | `number`                   | `3`     |

### Events

| Name            | Description                         | Callback Parameters                                |
| --------------- | ----------------------------------- | -------------------------------------------------- |
| update:activeId | Emitted when selection changes      | `(id: string) => void`                             |
| create          | Emitted when clicking Add button    | `() => void`                                       |
| delete          | Emitted when clicking Delete button | `(item: AiConversation) => void`                   |
| edit            | Emitted when finishing title edit   | `(item: AiConversation, newTitle: string) => void` |
| click           | Emitted when clicking list item     | `(item: AiConversation) => void`                   |
| pin             | Emitted when clicking Pin button    | `(item: AiConversation, pinned: boolean) => void`  |

### Slots

| Name        | Description                   | Slot Scope          |
| ----------- | ----------------------------- | ------------------- |
| add-icon    | Custom icon for Add button    | —                   |
| add-text    | Custom text for Add button    | —                   |
| group-label | Custom text for group labels  | `{ label: string }` |
| edit-icon   | Custom icon for Edit button   | —                   |
| delete-icon | Custom icon for Delete button | —                   |
| empty       | Layout when list is empty     | —                   |

### Methods

| Name          | Description             | Parameters        |
| ------------- | ----------------------- | ----------------- |
| scrollToItem  | Scroll to item by ID    | `(id: string)`    |
| scrollToIndex | Scroll to item by index | `(index: number)` |

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
