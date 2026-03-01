# AiConversations 会话记录

<script setup lang="ts">
import { ref } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'


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
</${_S}>`

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

const themeActiveId = ref('1')
const themeConversations = ref([
  { id: '1', title: '深色主题会话', updatedAt: Date.now() }
])

const themeOverrides = {
  activeBgColor: '#1a1a1a',
  activeTextColor: '#ffffff',
  hoverBgColor: '#f5f5f5'
}
</script>

`AiConversations` 是一个专为 AI 会话设计的侧边栏列表组件，提供了会话的新增、切换、重命名和删除等完整交互能力。

## 基础用法

展示了会话列表的基本渲染和交互。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
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

## API

### Props

| 参数            | 说明              | 类型                       | 默认值  |
| --------------- | ----------------- | -------------------------- | ------- |
| data            | 会话列表数据      | `AiConversation[]`         | `[]`    |
| activeId        | 当前选中的会话 ID | `string`                   | `''`    |
| loading         | 是否正在加载      | `boolean`                  | `false` |
| theme-overrides | 主题变量覆盖      | `AiConversationsThemeVars` | —       |

### Events

| 事件名          | 说明               | 参数                                               |
| --------------- | ------------------ | -------------------------------------------------- |
| update:activeId | 选中项改变时触发   | `(id: string) => void`                             |
| create          | 点击新增按钮时触发 | `() => void`                                       |
| delete          | 点击删除按钮时触发 | `(item: AiConversation) => void`                   |
| edit            | 完成标题编辑时触发 | `(item: AiConversation, newTitle: string) => void` |
| click           | 点击会话项时触发   | `(item: AiConversation) => void`                   |

### Slots

| 插槽名      | 说明               | 参数 |
| ----------- | ------------------ | ---- |
| add-icon    | 自定义新增按钮图标 | —    |
| add-text    | 自定义新增按钮文本 | —    |
| edit-icon   | 自定义编辑按钮图标 | —    |
| delete-icon | 自定义删除按钮图标 | —    |
| empty       | 列表为空时的展示   | —    |

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
