# AiSources 知识库溯源

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const mockSources = [
  { id: 1, title: 'Vue 3 响应式原理', source: 'vuejs.org', url: 'https://vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 引入了基于 Proxy 的响应式系统，这是对 Vue 2 中基于 Object.defineProperty 实现的重写……' },
  { id: 2, title: '深入理解 ref 与 reactive', source: '掘金 · 前端周报', fileType: 'web', score: 0.87, excerpt: 'ref 用于基本类型，reactive 用于对象，两者的内部实现机制有所不同……' },
  { id: 3, title: 'Vue3 最佳实践指南.pdf', source: '内部知识库', fileType: 'pdf', score: 0.72, excerpt: '第三章 组合式 API 最佳实践：在大型项目中，建议将业务逻辑封装为独立的 useXxx Hook……' },
  { id: 4, title: '性能优化清单.xlsx', source: '技术文档库', fileType: 'xlsx', score: 0.63 },
  { id: 5, title: 'Pinia 状态管理方案', source: 'pinia.vuejs.org', fileType: 'web', score: 0.59 },
  { id: 6, title: '前端架构设计文档.docx', source: '企业 Wiki', fileType: 'doc', score: 0.45 }
]

const tsInline = `<${_T}>
  <div style="max-width: 600px;">
    <div style="padding: 12px 16px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 12px; line-height: 1.8;">
      Vue 3 的响应式系统基于 ES Proxy 实现，相较于 Vue 2 的 Object.defineProperty，可以监听数组变化和动态属性。
      <YhTooltip placement="top" :content="mockSources[0].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[1]</sup>
      </YhTooltip>
      在大型项目中，建议将相关状态抽取为 useXxx Hook 复用。
      <YhTooltip placement="top" :content="mockSources[2].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[3]</sup>
      </YhTooltip>
    </div>
    <yh-ai-sources :sources="sources" mode="inline" />
  </div>
</${_T}>

<${_S} setup lang="ts">
const sources = [
  { id: 1, title: 'Vue 3 响应式原理', source: 'vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 引入了基于 Proxy 的响应式系统...' },
  { id: 2, title: '深入理解 ref 与 reactive', source: '掘金 · 前端周报', fileType: 'web', score: 0.87, excerpt: 'ref 用于基本类型，reactive 用于对象...' },
  { id: 3, title: 'Vue3 最佳实践指南.pdf', source: '内部知识库', fileType: 'pdf', score: 0.72, excerpt: '第三章 组合式 API 最佳实践...' }
]
</${_S}>`

const tsCard = `<${_T}>
  <div style="max-width: 560px;">
    <yh-ai-sources :sources="sources" mode="card" :max-visible="3" />
  </div>
</${_T}>

<${_S} setup lang="ts">
const sources = [
  { id: 1, title: 'Vue 3 响应式原理', source: 'vuejs.org', url: 'https://vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 引入了基于 Proxy 的响应式系统，这是对 Vue 2 中基于 Object.defineProperty 实现的重写……' },
  { id: 2, title: '深入理解 ref 与 reactive', source: '掘金 · 前端周报', fileType: 'web', score: 0.87, excerpt: 'ref 用于基本类型，reactive 用于对象，两者的内部实现机制有所不同……' },
  { id: 3, title: 'Vue3 最佳实践指南.pdf', source: '内部知识库', fileType: 'pdf', score: 0.72, excerpt: '第三章 组合式 API 最佳实践……' },
  { id: 4, title: '性能优化清单.xlsx', source: '技术文档库', fileType: 'xlsx', score: 0.63 },
  { id: 5, title: 'Pinia 状态管理方案', source: 'pinia.vuejs.org', fileType: 'web', score: 0.59 }
]
</${_S}>`

const tsBadge = `<${_T}>
  <div style="max-width: 600px;">
    <div style="padding: 12px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 10px; line-height: 2;">
      基于以下文档分析：
      <yh-ai-sources :sources="sources" mode="badge" style="display: inline-flex;" />
      Vue 3 的响应式系统是其核心特性之一……
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
const sources = [
  { id: 1, title: 'Vue 3 响应式原理', fileType: 'web', score: 0.95 },
  { id: 2, title: 'ref 与 reactive 区别', fileType: 'pdf', score: 0.87 }
]
</${_S}>`
</script>

## inline 内联模式

适合嵌入在对话气泡下方，鼠标悬停可预览摘要。

<DemoBlock :ts-code="tsInline" :js-code="toJs(tsInline)">
  <div style="max-width: 600px;">
    <div style="padding: 12px 16px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 12px; line-height: 1.8;">
      Vue 3 的响应式系统基于 ES Proxy 实现，相较于 Vue 2 的 Object.defineProperty，可以监听数组变化和动态属性。
      <YhTooltip placement="top" :content="mockSources[0].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[1]</sup>
      </YhTooltip>
      在大型项目中，建议将相关状态抽取为 useXxx Hook 复用。
      <YhTooltip placement="top" :content="mockSources[2].excerpt">
        <sup style="cursor:pointer; color: var(--yh-color-primary);">[3]</sup>
      </YhTooltip>
    </div>
    <yh-ai-sources :sources="[
      { id: 1, title: 'Vue 3 响应式原理', source: 'vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 引入了基于 Proxy 的响应式系统，这是对 Vue 2 中基于 Object.defineProperty 实现的重写……' },
      { id: 2, title: '深入理解 ref 与 reactive', source: '掘金', fileType: 'web', score: 0.87, excerpt: 'ref 用于基本类型，reactive 用于对象，两者的内部实现机制有所不同……' },
      { id: 3, title: 'Vue3 最佳实践指南.pdf', source: '内部知识库', fileType: 'pdf', score: 0.72, excerpt: '第三章 组合式 API 最佳实践……' }
    ]" mode="inline" />
  </div>
</DemoBlock>

## card 卡片模式

展示完整的来源详情，支持 `maxVisible` 控制默认显示数量，超出可展开。

<DemoBlock :ts-code="tsCard" :js-code="toJs(tsCard)">
  <div style="max-width: 560px;">
    <yh-ai-sources :sources="[
      { id: 1, title: 'Vue 3 响应式原理', source: 'vuejs.org', url: 'https://vuejs.org', fileType: 'web', score: 0.95, excerpt: 'Vue 3 引入了基于 Proxy 的响应式系统……' },
      { id: 2, title: '深入理解 ref 与 reactive', source: '掘金', fileType: 'web', score: 0.87, excerpt: 'ref 用于基本类型……' },
      { id: 3, title: 'Vue3 最佳实践指南.pdf', source: '内部知识库', fileType: 'pdf', score: 0.72, excerpt: '第三章 组合式 API……' },
      { id: 4, title: '性能优化清单.xlsx', source: '技术文档库', fileType: 'xlsx', score: 0.63 },
      { id: 5, title: 'Pinia 状态管理方案', source: 'pinia.vuejs.org', fileType: 'web', score: 0.59 }
    ]" mode="card" :max-visible="3" />
  </div>
</DemoBlock>

## badge 角标模式

极简角标，点击弹出侧边抽屉展示详情，适合不占版面的场景。

<DemoBlock :ts-code="tsBadge" :js-code="toJs(tsBadge)">
  <div style="max-width: 600px;">
    <div style="padding: 12px; background: var(--yh-fill-color-light); border-radius: 8px; margin-bottom: 10px; line-height: 2;">
      基于以下文档分析：
      <yh-ai-sources :sources="[
        { id: 1, title: 'Vue 3 响应式原理', fileType: 'web', score: 0.95 },
        { id: 2, title: 'ref 与 reactive 区别', fileType: 'pdf', score: 0.87 }
      ]" mode="badge" style="display: inline-flex;" />
      Vue 3 的响应式系统是其核心特性之一……
    </div>
  </div>
</DemoBlock>

## API

### Props

| 属性             | 类型                            | 默认值     | 说明                 |
| ---------------- | ------------------------------- | ---------- | -------------------- |
| `sources`        | `AiSourceItem[]`                | `[]`       | 来源数据列表         |
| `mode`           | `'inline' \| 'card' \| 'badge'` | `'inline'` | 展示模式             |
| `maxVisible`     | `number`                        | `5`        | 默认显示数量         |
| `showScore`      | `boolean`                       | `true`     | 是否显示相关度分数   |
| `showFileType`   | `boolean`                       | `true`     | 是否显示文件类型图标 |
| `themeOverrides` | `ComponentThemeVars`            | -          | 主题覆盖             |

### AiSourceItem

| 字段       | 类型                                                    | 说明                           |
| ---------- | ------------------------------------------------------- | ------------------------------ |
| `id`       | `string \| number`                                      | 唯一标识（同时显示为来源编号） |
| `title`    | `string`                                                | 来源标题                       |
| `url`      | `string`                                                | 来源 URL                       |
| `source`   | `string`                                                | 来源网站/文档名                |
| `score`    | `number`                                                | 匹配相关度（0-1）              |
| `excerpt`  | `string`                                                | 摘要/引用片段                  |
| `fileType` | `'web' \| 'pdf' \| 'doc' \| 'xlsx' \| 'code' \| string` | 文件类型                       |

### Events

| 事件名  | 参数                     | 说明         |
| ------- | ------------------------ | ------------ |
| `click` | `(source: AiSourceItem)` | 点击来源项   |
| `open`  | `(source: AiSourceItem)` | 点击查看原文 |

## 主题变量

| CSS 变量                       | 说明         | 默认值                            |
| ------------------------------ | ------------ | --------------------------------- |
| `--yh-ai-sources-badge-bg`     | 角标背景色   | `var(--yh-color-primary-light-9)` |
| `--yh-ai-sources-badge-color`  | 角标文字色   | `var(--yh-color-primary)`         |
| `--yh-ai-sources-card-bg`      | 卡片背景色   | `var(--yh-bg-color)`              |
| `--yh-ai-sources-drawer-width` | 侧边抽屉宽度 | `380px`                           |
| `--yh-ai-sources-score-high`   | 高相关度颜色 | `var(--yh-color-success)`         |
| `--yh-ai-sources-score-mid`    | 中相关度颜色 | `var(--yh-color-primary)`         |

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

## 在 Nuxt 中使用

### 安装配置

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: { importStyle: true }
})
```

### RAG 检索场景完整示例

```vue
<!-- components/AiReply.vue -->
<script setup lang="ts">
import type { AiSourceItem } from '@yh-ui/components'

const props = defineProps<{
  content: string
  sources?: AiSourceItem[]
}>()

const handleOpenSource = (source: AiSourceItem) => {
  // 打开溯源文档
  window.open(source.url, '_blank')
}
</script>

<template>
  <div class="ai-reply">
    <div class="ai-reply__content">{{ content }}</div>
    <!-- 展示 RAG 溯源 -->
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

### SSR 注意事项

`badge` 模式的侧边抽屉使用了 `<Teleport to="body">`，在 SSR 环境下需要配合 `<ClientOnly>` 使用：

```vue
<ClientOnly>
  <YhAiSources :sources="sources" mode="badge" />
</ClientOnly>
```
