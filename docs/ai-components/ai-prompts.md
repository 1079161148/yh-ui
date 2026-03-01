# AiPrompts 提示词推荐

<script setup lang="ts">
import { ref } from 'vue'
import type { AiPromptItem } from '@yh-ui/components'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <yh-ai-prompts 
    title="💡 猜你想问"
    :items="items"
    @click="handleClick"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiPromptItem } from '@yh-ui/components'

const items = ref([
  { content: '帮我写一个 Vue 3 组件', description: '基于 Composition API 的单文件组件' },
  { content: '如何实现防抖函数？', description: 'JavaScript 函数式编程最佳实践' },
  { content: '解释一下什么是 RAG', description: '检索增强生成的原理解析' }
])

const handleClick = (item: AiPromptItem | string) => {
  console.log('Clicked prompt:', item)
}
</${_S}>`

const tsVertical = `<${_T}>
  <div style="width: 400px;">
    <yh-ai-prompts 
      layout="vertical"
      title="🚀 快捷操作"
      :items="verticalItems"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const verticalItems = [
  { content: '重置当前会话', description: '清空历史记录并重新开始' },
  { content: '导出对话内容', description: '生成 Markdown 格式并下载' }
]
</${_S}>`

const tsTheme = `<${_T}>
  <yh-ai-prompts 
    title="🎨 自定义颜色"
    :items="themeItems"
    :theme-overrides="themeOverrides"
  />
</${_T}>

<${_S} setup lang="ts">
const themeItems = [
  { content: '自定义主题项', description: '这是通过 themeOverrides 设置的样式' }
]

const themeOverrides = {
  itemHoverBgColor: '#e6f7ff',
  activeBorderColor: '#1890ff',
  iconColor: '#1890ff'
}
</${_S}>`

const items = ref([
  { content: '帮我写一个 Vue 3 组件', description: '基于 Composition API 的单文件组件' },
  { content: '如何实现防抖函数？', description: 'JavaScript 函数式编程最佳实践' },
  { content: '解释一下什么是 RAG', description: '检索增强生成的原理解析' }
])

const vItems = [
  { content: '重置当前会话', description: '清空历史记录并重新开始' },
  { content: '导出对话内容', description: '生成 Markdown 格式并下载' }
]

const themeItems = [
  { content: '自定义主题项', description: '这是通过 themeOverrides 设置的样式' }
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

`AiPrompts` 提供了优雅的提示词或快捷操作展示能力。

## 基础用法

水平排列的提示词卡片列表。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-ai-prompts 
    title="💡 猜你想问"
    :items="items"
    @click="handleClick"
  />
</DemoBlock>

## 垂直布局

当空间受限或操作项较少时，建议使用垂直布局。

<DemoBlock title="垂直布局" :ts-code="tsVertical" :js-code="toJs(tsVertical)">
  <div style="width: 400px;">
    <yh-ai-prompts 
      layout="vertical"
      title="🚀 快捷操作"
      :items="vItems"
      @click="handleClick"
    />
  </div>
</DemoBlock>

## 自定义主题

通过 `theme-overrides` 属性可以轻松定制组件的局部样式。

<DemoBlock title="自定义主题" :ts-code="tsTheme" :js-code="toJs(tsTheme)">
  <yh-ai-prompts 
    title="🎨 自定义颜色"
    :items="themeItems"
    :theme-overrides="themeOverrides"
    @click="handleClick"
  />
</DemoBlock>

## API

### Props

| 参数            | 说明                                                   | 类型                         | 默认值         |
| --------------- | ------------------------------------------------------ | ---------------------------- | -------------- |
| items           | 提示词列表数据                                         | `(AiPromptItem \| string)[]` | `[]`           |
| layout          | 布局方式，可选值为 `horizontal` `vertical` `waterfall` | `string`                     | `'horizontal'` |
| title           | 组件顶部的标题文本                                     | `string`                     | `''`           |
| theme-overrides | 主题变量覆盖                                           | `AiPromptsThemeVars`         | —              |

### Events

| 事件名 | 说明             | 参数                                     |
| ------ | ---------------- | ---------------------------------------- |
| click  | 点击提示项时触发 | `(item: AiPromptItem \| string) => void` |

### Slots

| 插槽名 | 说明               | 参数                                              |
| ------ | ------------------ | ------------------------------------------------- |
| title  | 自定义标题区域内容 | —                                                 |
| item   | 自定义每一项的渲染 | `{ item: AiPromptItem \| string, index: number }` |
| icon   | 自定义项内部的图标 | `{ icon: string }`                                |

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4。在 Nuxt 项目中，组件会被自动按需导入。

有关详细配置，请阅读 [Nuxt 集成文档](/guide/nuxt)。

## 主题变量

| 变量名                                | 说明                | 默认值                            |
| ------------------------------------- | ------------------- | --------------------------------- |
| `--yh-ai-prompts-bg-color`            | 容器背景色          | `var(--yh-bg-color)`              |
| `--yh-ai-prompts-border-color`        | 边框颜色            | `var(--yh-border-color)`          |
| `--yh-ai-prompts-border-radius`       | 圆角大小            | `var(--yh-border-radius-base)`    |
| `--yh-ai-prompts-header-font-size`    | 标题字体大小        | `14px`                            |
| `--yh-ai-prompts-item-min-height`     | 项目最小高度        | `48px`                            |
| `--yh-ai-prompts-active-border-color` | 选中/悬停时的边框色 | `var(--yh-color-primary)`         |
| `--yh-ai-prompts-item-hover-bg-color` | 悬停时的背景色      | `var(--yh-color-primary-light-9)` |
| `--yh-ai-prompts-hover-text-color`    | 悬停时的文字颜色    | `var(--yh-color-primary)`         |
| `--yh-ai-prompts-icon-size`           | 图标大小            | `20px`                            |
| `--yh-ai-prompts-icon-color`          | 图标颜色            | `var(--yh-color-primary)`         |
