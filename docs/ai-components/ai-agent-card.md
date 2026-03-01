# AiAgentCard 智能体名片

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const agents = ref([
  {
    id: '1',
    name: 'ChatGPT-4o',
    model: 'gpt-4o',
    avatar: 'robot',
    description: '最强大的多模态 AI 助手，支持图文音视频理解与生成。',
    status: 'online',
    verified: true,
    capabilities: [
      { label: '对话', icon: 'chat', type: 'primary' },
      { label: '代码', icon: 'code', type: 'success' },
      { label: '图像', icon: 'image', type: 'info' },
      { label: '分析', type: 'warning' }
    ],
    stats: { uses: 12400, rating: 4.8, reviewCount: 2130, responseTime: 420 }
  },
  {
    id: '2',
    name: 'DeepSeek-R1',
    model: 'deepseek-r1',
    avatar: 'sparkles',
    description: '国产顶级推理模型，擅长数理逻辑、编程和深度分析任务。',
    status: 'online',
    verified: true,
    capabilities: [
      { label: '推理', type: 'danger' },
      { label: '编程', icon: 'code', type: 'success' },
      { label: '数学', type: 'warning' }
    ],
    stats: { uses: 8900, rating: 4.9, reviewCount: 1560 }
  }
])

const agent = ref({
  id: 'demo',
  name: '知识库助手',
  model: 'RAG-GPT-4',
  description: '基于企业私有知识库的智能问答助手，支持 PDF、Word 等多种格式。',
  avatar: 'document',
  verified: true,
  status: 'online',
  capabilities: [
    { label: 'RAG 检索', type: 'primary' },
    { label: '多格式', type: 'info' }
  ],
  stats: { uses: 5300, rating: 4.7 }
})

const tsBasic = `<${_T}>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-ai-agent-card
      v-for="agent in agents"
      :key="agent.id"
      :data="agent"
      style="width: 280px;"
      @click="handleClick"
      @use="handleUse"
      @favorite="handleFavorite"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const agents = ref([
  {
    id: '1',
    name: 'ChatGPT-4o',
    model: 'gpt-4o',
    avatar: 'robot',
    description: '最强大的多模态 AI 助手，支持图文音视频理解与生成。',
    status: 'online',
    verified: true,
    capabilities: [
      { label: '对话', icon: 'chat', type: 'primary' },
      { label: '代码', icon: 'code', type: 'success' },
      { label: '图像', icon: 'image', type: 'info' },
      { label: '分析', type: 'warning' }
    ],
    stats: { uses: 12400, rating: 4.8, reviewCount: 2130, responseTime: 420 }
  },
  {
    id: '2',
    name: 'DeepSeek-R1',
    model: 'deepseek-r1',
    avatar: 'sparkles',
    description: '国产顶级推理模型，擅长数理逻辑、编程和深度分析任务。',
    status: 'online',
    verified: true,
    capabilities: [
      { label: '推理', type: 'danger' },
      { label: '编程', icon: 'code', type: 'success' },
      { label: '数学', type: 'warning' }
    ],
    stats: { uses: 8900, rating: 4.9, reviewCount: 1560 }
  }
])

const handleClick = (agent) => console.log('click', agent.name)
const handleUse = (agent) => alert('正在接入: ' + agent.name)
const handleFavorite = (agent, favorited) => console.log(agent.name, favorited ? '收藏' : '取消收藏')
</${_S}>`

const tsLayouts = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px;">
    <!-- 水平布局 -->
    <yh-ai-agent-card :data="agent" layout="horizontal" />
    <!-- 紧凑布局 -->
    <yh-ai-agent-card :data="agent" layout="compact" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const agent = ref({
  id: 'demo',
  name: '知识库助手',
  model: 'RAG-GPT-4',
  description: '基于企业私有知识库的智能问答助手，支持 PDF、Word 等多种格式。',
  avatar: 'document',
  verified: true,
  status: 'online',
  capabilities: [
    { label: 'RAG 检索', type: 'primary' },
    { label: '多格式', type: 'info' }
  ],
  stats: { uses: 5300, rating: 4.7 }
})
</${_S}>`

const tsLoading = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`

</script>

## 基础用法

展示智能体名称、模型、描述、能力标签和统计数据，支持点击、使用、收藏等交互。

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-ai-agent-card
      v-for="item in agents"
      :key="item.id"
      :data="item"
      style="width: 280px;"
    />
  </div>
</DemoBlock>

## 布局变体

支持 `vertical`（默认竖向）、`horizontal`（横向）、`compact`（紧凑）三种布局。

<DemoBlock :ts-code="tsLayouts" :js-code="toJs(tsLayouts)">
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px;">
    <!-- 水平布局 -->
    <yh-ai-agent-card :data="agent" layout="horizontal" />
    <!-- 紧凑布局 -->
    <yh-ai-agent-card :data="agent" layout="compact" />
  </div>
</DemoBlock>

## 骨架屏加载

通过 `:loading="true"` 展示骨架屏。

<DemoBlock :ts-code="tsLoading" :js-code="toJs(tsLoading)">
  <div style="display: flex; gap: 16px;">
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
    <yh-ai-agent-card :data="{id:'',name:''}" :loading="true" style="width: 280px;" />
  </div>
</DemoBlock>

## API

### Props

| 属性             | 类型                                      | 默认值       | 说明                   |
| ---------------- | ----------------------------------------- | ------------ | ---------------------- |
| `data`           | `AgentData`                               | 必填         | 智能体数据对象         |
| `layout`         | `'vertical' \| 'horizontal' \| 'compact'` | `'vertical'` | 卡片布局方向           |
| `showActions`    | `boolean`                                 | `true`       | 是否显示操作按钮       |
| `showStats`      | `boolean`                                 | `true`       | 是否显示统计信息       |
| `favoritable`    | `boolean`                                 | `true`       | 是否可收藏             |
| `selected`       | `boolean`                                 | `false`      | 是否选中态（边框高亮） |
| `loading`        | `boolean`                                 | `false`      | 骨架屏加载状态         |
| `themeOverrides` | `ComponentThemeVars`                      | -            | 主题覆盖变量           |

### AgentData

| 字段           | 类型                              | 说明                       |
| -------------- | --------------------------------- | -------------------------- |
| `id`           | `string`                          | 唯一标识                   |
| `name`         | `string`                          | 智能体名称                 |
| `avatar`       | `string`                          | 头像 URL 或图标名          |
| `model`        | `string`                          | 模型名称                   |
| `description`  | `string`                          | 描述文字                   |
| `capabilities` | `AgentCapability[]`               | 能力标签列表               |
| `stats`        | `AgentStats`                      | 统计数据（调用量、评分等） |
| `verified`     | `boolean`                         | 是否官方认证               |
| `status`       | `'online' \| 'offline' \| 'busy'` | 在线状态                   |
| `favorited`    | `boolean`                         | 初始收藏状态               |

### Events

| 事件名     | 参数                                    | 说明          |
| ---------- | --------------------------------------- | ------------- |
| `click`    | `(data: AgentData)`                     | 点击卡片      |
| `use`      | `(data: AgentData)`                     | 点击使用按钮  |
| `favorite` | `(data: AgentData, favorited: boolean)` | 收藏/取消收藏 |
| `share`    | `(data: AgentData)`                     | 分享          |

### Slots

| 插槽名    | 说明                                          |
| --------- | --------------------------------------------- |
| `avatar`  | 自定义头像内容                                |
| `actions` | 自定义操作按钮区域（作用域：`{ data, use }`） |
| `default` | 卡片底部额外内容（作用域：`{ data }`）        |

## 主题变量

通过 `themeOverrides` prop 或 CSS 变量对组件进行深度定制：

```vue
<yh-ai-agent-card
  :data="agent"
  :theme-overrides="{
    agentCardBg: '#1a1a2e',
    agentCardBorderColor: '#7c3aed',
    agentCardAvatarSize: '64px'
  }"
/>
```

| CSS 变量                           | 说明       | 默认值                         |
| ---------------------------------- | ---------- | ------------------------------ |
| `--yh-ai-agent-card-bg`            | 卡片背景色 | `var(--yh-bg-color)`           |
| `--yh-ai-agent-card-border-color`  | 边框颜色   | `var(--yh-border-color-light)` |
| `--yh-ai-agent-card-avatar-size`   | 头像尺寸   | `56px`                         |
| `--yh-ai-agent-card-border-radius` | 圆角大小   | `12px`                         |

## 在 Nuxt 中使用

### 安装配置

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true // 自动注入全局样式
  }
})
```

### 完整示例

```vue
<!-- pages/agents.vue -->
<script setup lang="ts">
// YhAiAgentCard 已由 @yh-ui/nuxt 自动注册，无需手动导入

const { data: agents } = await useFetch('/api/agents')

const onUseAgent = (agent) => {
  navigateTo(`/chat?agentId=${agent.id}`)
}
</script>

<template>
  <div class="agent-grid">
    <YhAiAgentCard
      v-for="agent in agents"
      :key="agent.id"
      :data="agent"
      layout="vertical"
      @use="onUseAgent"
      @favorite="(agent, fav) => updateFavorite(agent.id, fav)"
    />
  </div>
</template>

<style scoped>
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 24px;
}
</style>
```

### 与 YhAiProvider 配合使用

```vue
<!-- app.vue -->
<template>
  <YhAiProvider :user-avatar="user.avatar" :user-name="user.name" assistant-name="YH-AI">
    <NuxtPage />
  </YhAiProvider>
</template>
```
