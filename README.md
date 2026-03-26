<p align="center">
  <img src="./docs/public/logo.svg" width="120" height="120" alt="YH-UI Logo">
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
  <a href="https://codecov.io/gh/1079161148/yh-ui">
    <img src="https://img.shields.io/codecov/c/github/1079161148/yh-ui?style=flat-square&colorB=67c23a" alt="Coverage">
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
| WCAG 无障碍校验 | ✅ **自动**         | 手动         | 手动     |
| 主题切换动画    | ✅                  | ❌           | ❌       |
| 密度配置        | ✅ **3 档**         | ❌           | ❌       |
| 颜色算法        | ✅ **4 种**         | ❌           | ❌       |
| Table 虚拟滚动  | ✅                  | 部分         | 部分     |
| Table 打印/导出 | ✅ **CSV/XLSX/PDF** | ❌           | ❌       |
| **AI 交互基础** | ✅ **完整套件**     | ❌           | ❌       |

## 🌟 核心亮点

### 🎨 行业领先的主题系统

```ts
import { createYhTheme } from '@yh-ui/yh-ui'

const theme = createYhTheme({
  preset: 'purple', // 12 种预设主题
  algorithm: 'vibrant', // 4 种颜色算法
  density: 'compact', // 3 档密度
  colorBlindMode: 'protanopia', // 色盲友好模式
  followSystem: true, // 跟随系统暗色
  transition: true, // 丝滑切换动画
  persist: true // 持久化偏好
})
```

### 🌍 67 种国际化语言（全球最多）

```ts
import YhUI from '@yh-ui/yh-ui'
import zhCN from '@yh-ui/yh-ui/locale/zh-CN'

app.use(YhUI, { locale: zhCN })
```

### 📊 企业级 Table（媲美 vxe-table）

```vue
<yh-table
  :data="tableData"
  :columns="columns"
  :virtual-config="{ enabled: true, rowHeight: 40 }"
  :drag-config="{ row: true, column: true }"
  :toolbar-config="{ export: true, print: true, columnSetting: true }"
  :selection-config="{ type: 'checkbox' }"
  :summary-config="{ method: sumMethod }"
/>
```

### 🔌 原生 Nuxt 3 支持

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true,
    locale: 'zh-CN'
  }
})
```

### 🤖 工业级 AI 组件套件 (Next-Gen AI UI)

```vue
<template>
  <yh-ai-provider :token="apiKey">
    <yh-ai-chat :messages="messages" />
  </yh-ai-provider>
</template>
```

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

## 🔨 快速开始

### 完整引入

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
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
  <yh-button type="primary">Hello YH-UI</yh-button>
  <yh-input v-model="value" clearable show-word-limit :maxlength="100" />
</template>
```

### 自动导入（配合 unplugin-vue-components）

```ts
// vite.config.ts
import { YhUIResolver } from '@yh-ui/yh-ui/resolver'
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    Components({
      resolvers: [YhUIResolver()]
    })
  ]
}
```

---

## 📁 项目结构

```
yh-ui/
├── packages/
│   ├── components/    # 77 个组件 (含 16 个 AI 组件)
│   ├── hooks/         # 11 个 Composition Hooks
│   ├── icons/         # 图标系统
│   ├── locale/        # 67 种国际化语言包
│   ├── nuxt/          # Nuxt 3 原生模块
│   ├── theme/         # 行业领先主题系统
│   ├── utils/         # 工具函数
│   └── yh-ui/         # 主包入口
├── docs/              # VitePress 文档站点（中/英双语）
├── playground/        # Vue 开发测试环境
├── playground-nuxt/   # Nuxt 开发测试环境
└── .github/workflows/ # CI/CD 自动化流水线
```

---

## 🛠 开发

```bash
# 安装依赖
pnpm install

# 启动组件开发
pnpm dev

# 启动文档站点
E:\YH-UI\packages\hooks\src\use-sku

# 运行单元测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 构建所有包
pnpm build

# 类型检查
pnpm typecheck

# 代码格式化
pnpm format
```

---

## 🤝 贡献

欢迎参与贡献！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feat/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feat/amazing-feature`)
5. 提交 Pull Request

请确保 PR 满足：

- ✅ 所有测试通过（`pnpm test`）
- ✅ 类型检查无误（`pnpm typecheck`）
- ✅ 代码规范通过（`pnpm lint`）
- ✅ 新功能附带测试用例

---

## 📄 开源协议

[MIT](./LICENSE) License © 2024-present YH-UI Team
