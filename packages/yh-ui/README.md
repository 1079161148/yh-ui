# @yh-ui/yh-ui

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="120" height="120" alt="YH-UI Logo">
</p>

<h1 align="center">YH-UI</h1>

<p align="center">
  基于 Vue 3.5+ 的现代企业级组件库 · 行业领先主题系统 · 67 种国际化语言 · 原生 Nuxt 3 支持
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/yh-ui">
    <img src="https://img.shields.io/npm/v/@yh-ui/yh-ui.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://github.com/1079161148/yh-ui/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/1079161148/yh-ui/ci.yml?style=flat-square&label=CI&colorB=67c23a" alt="CI Status">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/yh-ui">
    <img src="https://img.shields.io/npm/dm/@yh-ui/yh-ui.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/yh-ui.svg?style=flat-square" alt="license">
  </a>
</p>

<p align="center">
  <a href="https://1079161148.github.io/yh-ui/">📖 文档</a> ·
  <a href="https://1079161148.github.io/yh-ui/guide/quickstart">🚀 快速开始</a> ·
  <a href="https://github.com/1079161148/yh-ui/releases">📝 更新日志</a>
</p>

---

## ✨ 为什么选择 YH-UI？

| 特性            | YH-UI               | Element Plus | Naive UI |
| --------------- | ------------------- | ------------ | -------- |
| 预设主题数      | **12 种**           | 1 种         | 有限     |
| 色盲友好模式    | ✅ **4 种**         | ❌           | ❌       |
| 国际化语言数    | **67 种**           | 43 种        | 25 种    |
| Nuxt 3 原生模块 | ✅ **官方级**       | ❌           | ❌       |
| WCAG 无障碍     | ✅ **自动校验**     | 手动         | 手动     |
| 主题切换动画    | ✅                  | ❌           | ❌       |
| 密度配置        | ✅ **3 档**         | ❌           | ❌       |
| Table 虚拟滚动  | ✅                  | 部分         | 部分     |
| Table 打印/导出 | ✅ **CSV/XLSX/PDF** | ❌           | ❌       |
| **AI 交互套件** | ✅ **16 个组件**    | ❌           | ❌       |
| 工业级甘特图    | ✅                  | ❌           | ❌       |
| 节点流程编辑器  | ✅                  | ❌           | ❌       |

---

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yh-ui/yh-ui

# npm
npm install @yh-ui/yh-ui

# yarn
yarn add @yh-ui/yh-ui
```

**环境要求**：Node.js `>=18.0.0`，Vue `>=3.5.0`

---

## 🔨 快速开始

### 完整引入

```ts
// main.ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css' // 引入样式（含主题变量）
import App from './App.vue'

const app = createApp(App)
app.use(YhUI)
app.mount('#app')
```

### 按需引入（推荐，完美 Tree-shaking）

```vue
<script setup lang="ts">
import { YhButton, YhInput, YhTable } from '@yh-ui/yh-ui'
</script>

<template>
  <YhButton type="primary" @click="submit">提交</YhButton>
  <YhInput v-model="keyword" clearable placeholder="请输入..." />
</template>
```

### 自动导入（配合 unplugin-vue-components）

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { YhUIResolver } from '@yh-ui/yh-ui/resolver'

export default {
  plugins: [
    Components({
      resolvers: [YhUIResolver()]
    })
  ]
}
```

---

## 🎨 主题系统

```ts
import { createYhTheme } from '@yh-ui/yh-ui'

const theme = createYhTheme({
  preset: 'purple', // 12 种预设主题
  algorithm: 'vibrant', // 4 种颜色算法
  density: 'compact', // 3 档密度：compact | default | comfortable
  colorBlindMode: 'protanopia', // 4 种色盲友好模式
  followSystem: true, // 跟随系统暗色
  transition: true, // 丝滑切换动画
  persist: true // 持久化到 localStorage
})

app.use(theme)
```

在组件中动态切换：

```vue
<script setup lang="ts">
import { useTheme } from '@yh-ui/yh-ui'
const { setPreset, toggleDark, setDensity, isDark } = useTheme()
</script>

<template>
  <YhButton @click="toggleDark()">{{ isDark ? '亮色' : '暗色' }}</YhButton>
  <YhButton @click="setPreset('ocean')">Ocean 主题</YhButton>
</template>
```

---

## 🌍 国际化

```ts
import YhUI from '@yh-ui/yh-ui'
import zhCN from '@yh-ui/yh-ui/locale/zh-CN'
import enUS from '@yh-ui/yh-ui/locale/en'

// 初始化时指定
app.use(YhUI, { locale: zhCN })
```

动态切换语言：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhConfigProvider } from '@yh-ui/yh-ui'
import zhCN from '@yh-ui/yh-ui/locale/zh-CN'
import enUS from '@yh-ui/yh-ui/locale/en'

const locale = ref(zhCN)
</script>

<template>
  <YhConfigProvider :locale="locale">
    <App />
  </YhConfigProvider>
  <button @click="locale = enUS">English</button>
</template>
```

---

## 📊 企业级 Table

```vue
<YhTable
  :data="tableData"
  :columns="columns"
  :virtual-config="{ enabled: true, rowHeight: 40 }"
  :drag-config="{ row: true, column: true }"
  :toolbar-config="{ export: true, print: true, columnSetting: true }"
  :selection-config="{ type: 'checkbox' }"
  :summary-config="{ method: sumMethod }"
  height="600px"
  border
  stripe
/>
```

---

## 🤖 AI 组件套件

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhAiProvider, YhAiBubble, YhAiSender } from '@yh-ui/yh-ui'
import { useAIChat } from '@yh-ui/ai-sdk/vue'

const { messages, input, isLoading, sendMessage } = useAIChat({ api: '/api/chat' })
</script>

<template>
  <YhAiProvider :token="apiKey">
    <div class="chat-container">
      <YhAiBubble
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        streaming
        stream-mode="word"
      />
    </div>
    <YhAiSender v-model="input" :loading="isLoading" @send="sendMessage" />
  </YhAiProvider>
</template>
```

---

## 🔌 Nuxt 3 集成

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true, // 自动注入样式
    locale: 'zh-CN' // 默认语言
  }
})
```

注册模块后，所有组件和 composable 自动导入，无需手动 `import`：

```vue
<template>
  <!-- 直接使用，无需导入 -->
  <YhButton type="primary">按钮</YhButton>
  <YhTable :data="data" :columns="columns" />
</template>

<script setup>
// useNamespace、useLocale 等也自动导入
const ns = useNamespace('my-comp')
</script>
```

---

## 📦 包说明

`@yh-ui/yh-ui` 是整合包，包含：

| 子包                | 说明                  |
| ------------------- | --------------------- |
| `@yh-ui/components` | 77+ 核心 UI 组件      |
| `@yh-ui/hooks`      | Composition API Hooks |
| `@yh-ui/theme`      | 主题系统              |
| `@yh-ui/utils`      | 工具函数              |

其他可选包（按需安装）：

| 包名             | 说明                |
| ---------------- | ------------------- |
| `@yh-ui/nuxt`    | Nuxt 3 模块         |
| `@yh-ui/ai-sdk`  | AI SDK 集成         |
| `@yh-ui/locale`  | 67 种语言包         |
| `@yh-ui/icons`   | 图标系统（Iconify） |
| `@yh-ui/flow`    | 流程图 / 节点编辑器 |
| `@yh-ui/request` | 企业级请求 Hooks    |

---

## 🔗 相关资源

- [📖 官方文档](https://1079161148.github.io/yh-ui/)
- [🚀 快速开始](https://1079161148.github.io/yh-ui/guide/quickstart)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)
- [📝 更新日志](https://github.com/1079161148/yh-ui/blob/main/CHANGELOG.md)
- [🐛 问题反馈](https://github.com/1079161148/yh-ui/issues)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
