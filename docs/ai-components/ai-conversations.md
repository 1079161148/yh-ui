# AiConversations 会话记录

<script setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ── 1. 基础用法 Demo 状态 ──
const basicActiveId = ref('1')
const basicConversations = ref([
  { id: '1', title: 'Vue 3 组件开发指南', updatedAt: Date.now() - 1000 * 60 * 60 },
  { id: '2', title: '如何优化 Web 性能', updatedAt: Date.now() - 1000 * 60 * 60 * 24, excerpt: '性能优化是前端开发中至关重要的一环...' }
])

const handleBasicCreate = () => {
  const newId = Date.now().toString()
  basicConversations.value.unshift({
    id: newId,
    title: '新对话 ' + newId.slice(-4),
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
  { id: '1', title: 'Vue 3 组件开发指南', updatedAt: Date.now() - 1000 * 60 * 60 },
  { id: '2', title: '如何优化 Web 性能', updatedAt: Date.now() - 1000 * 60 * 60 * 24, excerpt: '性能优化是前端开发中至关重要的一环...' }
])

const handleCreate = () => {
  const newId = Date.now().toString()
  conversations.value.unshift({
    id: newId,
    title: '新对话 ' + newId.slice(-4),
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

// ── 2. 自定义主题 Demo 状态 ──
const themeActiveId = ref('1')
const themeConversations = ref([
  { id: '1', title: '深色主题会话', updatedAt: Date.now() }
])

const handleThemeCreate = () => {
  const newId = Date.now().toString()
  themeConversations.value.unshift({
    id: newId,
    title: '新对话 ' + newId.slice(-4),
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
  { id: '1', title: '深色主题会话', updatedAt: Date.now() }
])

const handleCreate = () => {
  const newId = Date.now().toString()
  conversations.value.unshift({
    id: newId,
    title: '新对话 ' + newId.slice(-4),
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

// ── 3. 置顶与分组 Demo 状态 ──
const pinningActiveId = ref('1')
const pinningConversations = ref([
  { id: '1', title: '置顶的对话', updatedAt: Date.now(), pinned: true },
  { id: '2', title: '普通对话', updatedAt: Date.now() - 1000 * 60 }
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
  { id: '1', title: '置顶的对话', updatedAt: Date.now(), pinned: true },
  { id: '2', title: '普通对话', updatedAt: Date.now() - 1000 * 60 }
])

const handlePin = (item: AiConversation, pinned: boolean) => {
  const conv = conversations.value.find(c => c.id === item.id)
  if (conv) conv.pinned = pinned
}

const handleDelete = (item: AiConversation) => {
  conversations.value = conversations.value.filter(c => c.id !== item.id)
}
</${_S}>`

// ── 4. 虚拟滚动 Demo 状态 ──
const virtualActiveId = ref('0')
const virtualConversations = ref(
  Array.from({ length: 1000 }).map((_, i) => ({
    id: String(i),
    title: '对话历史记录 #' + i,
    updatedAt: Date.now() - i * 1000 * 60 * 60,
    pinned: i < 2
  }))
)

const handleVirtualPin = (item: AiConversation, pinned: boolean) => {
  const conv = virtualConversations.value.find(c => c.id === item.id)
  if (conv) {
    conv.pinned = pinned
    // 重新排序：pinned 优先，其次按时间倒序
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
    title: '对话历史记录 #' + i,
    updatedAt: Date.now() - i * 1000 * 60 * 60,
    pinned: i < 2
  }))
)

const handlePin = (item: AiConversation, pinned: boolean) => {
  const conv = hugeData.value.find(c => c.id === item.id)
  if (conv) {
    conv.pinned = pinned
    // 置顶时重新排序：pinned 优先，其次按时间倒序
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

`AiConversations` 是一个专为 AI 会话设计的侧边栏列表组件，提供了会话的新增、切换、重命名和删除等完整交互能力。

## 基础用法

展示了会话列表的基本渲染和交互。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
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

## 自定义主题

通过 `theme-overrides` 属性可以轻松定制组件的局部样式。

<DemoBlock title="自定义主题" :ts-code="tsTheme" :js-code="toJs(tsTheme)">
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

## 置顶与时间分组

组件默认支持按时间分组展示，并支持置顶对话功能。

<DemoBlock title="置顶与分组" :ts-code="tsPinning" :js-code="toJs(tsPinning)">
  <div style="width: 300px; height: 400px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-conversations 
      :data="pinningConversations" 
      v-model:activeId="pinningActiveId"
      @pin="handlePinningPin"
      @delete="handlePinningDelete"
    />
  </div>
</DemoBlock>

## 虚拟滚动

处理海量历史对话记录时，通过开启 `virtual-scroll` 提升性能。

<DemoBlock title="虚拟滚动" :ts-code="tsVirtual" :js-code="toJs(tsVirtual)">
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

| 参数                       | 说明                   | 类型                       | 默认值  |
| -------------------------- | ---------------------- | -------------------------- | ------- |
| data                       | 会话列表数据           | `AiConversation[]`         | `[]`    |
| activeId                   | 当前选中的会话 ID      | `string`                   | `''`    |
| loading                    | 是否正在加载           | `boolean`                  | `false` |
| theme-overrides            | 主题变量覆盖           | `AiConversationsThemeVars` | —       |
| grouped                    | 是否按时间分组显示对话 | `boolean`                  | `true`  |
| virtual-scroll             | 是否启用虚拟滚动       | `boolean`                  | `false` |
| virtual-scroll-height      | 虚拟滚动容器高度       | `number`                   | `400`   |
| virtual-scroll-item-height | 虚拟滚动每项高度       | `number`                   | `50`    |
| virtual-scroll-overscan    | 虚拟滚动缓冲区数量     | `number`                   | `3`     |

### Events

| 事件名          | 说明               | 参数                                               |
| --------------- | ------------------ | -------------------------------------------------- |
| update:activeId | 选中项改变时触发   | `(id: string) => void`                             |
| create          | 点击新增按钮时触发 | `() => void`                                       |
| delete          | 点击删除按钮时触发 | `(item: AiConversation) => void`                   |
| edit            | 完成标题编辑时触发 | `(item: AiConversation, newTitle: string) => void` |
| click           | 点击会话项时触发   | `(item: AiConversation) => void`                   |
| pin             | 点击置顶按钮时触发 | `(item: AiConversation, pinned: boolean) => void`  |

### Slots

| 插槽名      | 说明               | 参数                |
| ----------- | ------------------ | ------------------- |
| add-icon    | 自定义新增按钮图标 | —                   |
| add-text    | 自定义新增按钮文本 | —                   |
| group-label | 自定义分组标签文本 | `{ label: string }` |
| edit-icon   | 自定义编辑按钮图标 | —                   |
| delete-icon | 自定义删除按钮图标 | —                   |
| empty       | 列表为空时的展示   | —                   |

### Methods

| 方法名        | 说明             | 参数              |
| ------------- | ---------------- | ----------------- |
| scrollToItem  | 滚动到指定 ID 项 | `(id: string)`    |
| scrollToIndex | 滚动到指定索引项 | `(index: number)` |

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4。在 Nuxt 项目中，组件会被自动按需导入。

有关详细配置，请阅读 [Nuxt 集成文档](/guide/nuxt)。

## 主题变量

| 变量名                                    | 说明             | 默认值                            |
| ----------------------------------------- | ---------------- | --------------------------------- |
| `--yh-ai-conversations-bg-color`          | 容器背景色       | `var(--yh-bg-color)`              |
| `--yh-ai-conversations-border-color`      | 边框颜色         | `var(--yh-border-color)`          |
| `--yh-ai-conversations-header-padding`    | 头部内边距       | `16px`                            |
| `--yh-ai-conversations-item-padding`      | 项目内边距       | `12px 16px`                       |
| `--yh-ai-conversations-hover-bg-color`    | 悬停时的背景色   | `var(--yh-bg-color-page)`         |
| `--yh-ai-conversations-active-bg-color`   | 选中时的背景色   | `var(--yh-color-primary-light-9)` |
| `--yh-ai-conversations-active-text-color` | 选中时的文字颜色 | `var(--yh-color-primary)`         |
| `--yh-ai-conversations-title-font-size`   | 标题字体大小     | `14px`                            |
| `--yh-ai-conversations-time-font-size`    | 时间字体大小     | `12px`                            |
