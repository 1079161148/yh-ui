# YH-UI

<p align="center">
  <img src="./docs/public/logo.svg" width="120" height="120" alt="YH-UI Logo">
</p>

<h1 align="center">YH-UI</h1>

<p align="center">
  一个现代化的 Vue 3 组件库
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/yh-ui"><img src="https://img.shields.io/npm/v/yh-ui.svg" alt="npm version"></a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/yh-ui.svg" alt="license"></a>
  <a href="https://www.npmjs.com/package/yh-ui"><img src="https://img.shields.io/npm/dm/yh-ui.svg" alt="npm downloads"></a>
</p>

---

## ✨ 特性

- 🚀 **高性能** - 基于 Vue 3 Composition API，支持 Tree-shaking
- 🎨 **灵活定制** - 完善的 CSS 变量系统，支持运行时主题切换
- 📦 **开箱即用** - 丰富的组件库，API 设计简洁直观
- 🔧 **TypeScript** - 完整的类型定义，享受完善的类型提示
- 🌍 **国际化** - 内置国际化支持，轻松切换多语言
- 📱 **响应式** - 支持桌面端和移动端

## 📦 安装

```bash
# pnpm (推荐)
pnpm add yh-ui

# npm
npm install yh-ui

# yarn
yarn add yh-ui
```

## 🔨 使用

### 完整引入

```ts
import { createApp } from 'vue'
import YhUI from 'yh-ui'
import 'yh-ui/css'
import App from './App.vue'

const app = createApp(App)
app.use(YhUI)
app.mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { YhButton } from 'yh-ui'
</script>

<template>
  <yh-button type="primary">Hello YH-UI</yh-button>
</template>
```

## 📚 文档

访问 [yh-ui.dev](https://yh-ui.dev) 查看完整文档。

## 🛠 开发

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 启动文档站点
pnpm docs:dev

# 构建
pnpm build

# 运行测试
pnpm test
```

## 📁 项目结构

```
yh-ui/
├── packages/              # 核心包
│   ├── components/        # 组件库
│   ├── hooks/             # Composition Hooks
│   ├── theme/             # 主题系统
│   ├── utils/             # 工具函数
│   └── yh-ui/             # 主包
├── docs/                  # VitePress 文档
├── playground/            # 开发测试环境
└── typings/               # 全局类型定义
```

## 🤝 贡献

欢迎参与贡献！请阅读 [贡献指南](./CONTRIBUTING.md) 了解详情。

## 📄 开源协议

[MIT](./LICENSE) License © 2024-present YH-UI Team
