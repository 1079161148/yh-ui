<p align="center">
  <img src="./docs/public/logo.svg" width="120" height="120" alt="YH-UI Logo">
</p>

<h1 align="center">YH-UI</h1>

<p align="center">
  基于 Vue 3.5+ 的现代企业级组件库 · 行业领先主题系统 · 67 种国际化语言 · 原生 Nuxt 3 支持 · 工业级 AI UI 套件
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
  <a href="https://1079161148.github.io/yh-ui/">📖 官方文档</a> ·
  <a href="https://1079161148.github.io/yh-ui/guide/quickstart">🚀 快速开始</a> ·
  <a href="https://github.com/1079161148/yh-ui/releases">📝 更新日志</a> ·
  <a href="https://github.com/1079161148/yh-ui/issues">🐛 提交问题</a>
</p>

---

## ✨ 为什么选择 YH-UI？

YH-UI 不仅仅是一个组件库，它是为现代高性能 Web 应用、AI 驱动的应用以及工业级管理系统量身定制的一站式解决方案。

| 特性                | YH-UI                            | Element Plus | Naive UI |
| ------------------- | -------------------------------- | ------------ | -------- |
| **主题预设**        | **12 种系统内置主题**            | 1 种         | 有限     |
| **AI 交互套件**     | ✅ **16+ 工业级 AI 原生组件**    | ❌           | ❌       |
| **国际化语言**      | **67 种（覆盖全球主要市场）**    | 43 种        | 25 种    |
| **工业级图表**      | ✅ **Gantt / Flow 深度渲染**     | ❌           | ❌       |
| **Nuxt 3 原生支持** | ✅ **官方端到端适配模块**        | ❌           | ❌       |
| **色盲友好模式**    | ✅ **4 种辅助算法**              | ❌           | ❌       |
| **Table 生产力**    | ✅ **虚拟滚动 / 导出 / 打印**    | 部分         | 部分     |
| **电商专项**        | ✅ **SKU 选择器 / 智能收货地址** | ❌           | ❌       |

---

## 🌟 核心亮点

### 🎨 行业领先的“全场景”主题系统

全自动颜色算法适配，支持色盲辅助、密度调节、暗色模式及丝滑的跨主题切换动画。

```ts
import { createYhTheme } from '@yh-ui/yh-ui'

const theme = createYhTheme({
  preset: 'purple', // 12 种预设主题
  algorithm: 'vibrant', // 4 种颜色算法
  density: 'compact', // 3 档密度 (Default, Compact, Loose)
  colorBlindMode: 'protanopia', // 色盲友好模式 (Protanopia, Deuteranopia, Tritanopia)
  followSystem: true, // 跟随系统主题
  transition: true // 启用跨主题微动画
})
```

### 🤖 工业级 AI 交互能力 (Next-Gen AI UI)

深度内置 AI 会话场景，支持 WebSocket/Stream 渲染、Mermaid 生成、代码运行及思考链可视化。

```vue
<template>
  <yh-ai-provider :token="apiKey">
    <yh-ai-chat :messages="messages" />
    <!-- 思考链展示组件 -->
    <yh-ai-thought-chain :steps="steps" />
  </yh-ai-provider>
</template>
```

### 📊 超高性能 Table 与甘特图 (Heavy Data Pro)

专为大数据场景优化，Table 支持百万级虚拟滚动、列拖拽及完美的 XLSX/PDF 导出。Gantt 支持多模式切换及任务依赖驱动。

```vue
<yh-table
  :virtual-config="{ enabled: true, rowHeight: 40 }"
  :toolbar-config="{ export: true, print: true }"
/>
<!-- 工业级甘特图 -->
<yh-gantt-chart :tasks="tasks" view-mode="Day" />
```

---

## 📦 安装

```bash
# pnpm（强烈推荐）
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
import '@yh-ui/yh-ui/css' // 引入全局样式
import App from './App.vue'

const app = createApp(App)
app.use(YhUI)
app.mount('#app')
```

### 自动导入 (推荐)

配合 `unplugin-vue-components` 实现极致的按需加载与 Tree-shaking。

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

`YhUIResolver()` 默认会按需自动注入组件对应的 CSS 样式，不需要额外安装 Sass。

---

## 📁 核心架构

```
yh-ui/
├── packages/
│   ├── components/    # 组件库核心 (77+ 组件)
│   ├── hooks/         # 工业级 Composition Hooks
│   ├── icons/         # 高性能图标系统
│   ├── locale/        # 67 语言国际化包
│   ├── nuxt/          # Nuxt 3 原生官方模块
│   ├── theme/         # 动态主题引擎
│   └── yh-ui/         # 主入口整合包
├── docs/              # 基于 VitePress 的文档中心
├── playground/        # Vue 3 演练场
└── playground-nuxt/   # Nuxt 3 演练场
```

---

## 🛠 开发与构建指南

我们使用 `pnpm monorepo` 架构，所有命令均在根目录执行。

### 初始环境

```bash
# 1. 安装项目所有依赖
pnpm install

# 2. 自动链接包依赖
pnpm postinstall
```

### 启动研发服务

```bash
# 启动组件开发演练场 (Playground)
pnpm dev

# 启动文档站点研发预览 (中英双语)
pnpm docs:dev
```

### 构建指令

```bash
# 1. 全量构建所有 NPM 包 (组件库、Hooks、Utils、Nuxt 模块等)
pnpm build

# 2. 单独构建指定子包 (以组件库为例)
pnpm -C packages/components build

# 3. 静态构建文档站点
pnpm docs:build
```

### 质量保证

```bash
# 执行 ESLint 静态检查与修复
pnpm lint
pnpm lint:fix

# 执行 TypeScript 类型递归检查
pnpm typecheck

# 运行单元测试 (Vitest)
pnpm test

# 生成全量测试覆盖率报告
pnpm test:coverage
```

### 版本发布流程

```bash
# 1. 自动执行版本更迭 (Patch/Minor/Major)
pnpm version:patch

# 2. 标准化提交、打标签并推送到远端
pnpm release

# 3. 发布到 NPM 私服或官方库
pnpm publish:all
```

---

## 🤝 贡献与反馈

欢迎提交 PR 或 Issue。在开始之前，请确保您的代码通过了：

- ✅ `pnpm typecheck`
- ✅ `pnpm test`
- ✅ `pnpm lint`

---

## 📄 LICENSE

[MIT](./LICENSE) License © 2024-present YH-UI Team

## Compatibility & Support

- Vue: `>= 3.5.0`
- Node.js: `>= 18.12.0`
- Nuxt: `>= 3.11.0` or `^4.0.0-rc.1` via `@yh-ui/nuxt`
- Browsers: modern Chrome / Edge / Firefox / Safari only, no Internet Explorer support
- SSR: supported for mainstream component usage and Nuxt integration; browser-API-heavy capabilities should still be evaluated as dedicated integrations

See the detailed support matrix in [docs/guide/compatibility.md](C:\Users\1\.codex\worktrees\f2c3\YH-UI\docs\guide\compatibility.md) and the current size guardrail in [PACKAGE_SIZE_BASELINE.md](C:\Users\1\.codex\worktrees\f2c3\YH-UI\PACKAGE_SIZE_BASELINE.md).
