# 快速开始

本节将引导您如何在最短时间内让 YH-UI 在您的项目中运行起来。

## 1. 完整引入

最简单的方式是在入口文件中直接全局注册所有组件。这种方式开发体验最好，但会使初始包体积较大。

```ts
// main.ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'

// 引入全局样式
import '@yh-ui/yh-ui/css'
import App from './App.vue'

const app = createApp(App)

// 注册插件
app.use(YhUI)
app.mount('#app')
```

## 2. 手动按需引入

借助 Vue 3 的 **Composition API**，您可以只在需要的页面中引入组件，享受 Tree Shaking 优化。

```vue
<!-- App.vue -->
<script setup lang="ts">
import { YhButton } from '@yh-ui/yh-ui'
</script>

<template>
  <yh-button type="primary">Hello YH-UI</yh-button>
</template>
```

如果您使用完整安装，推荐统一通过 `@yh-ui/yh-ui/css` 引入样式入口；这是当前发布包对外稳定的样式别名。

## 3. 全局配置

YH-UI 提供 `createYhUI` 用于插件安装。运行时的全局配置，例如 `theme`、`locale`、`size`、`zIndex`，仍然由 `YhConfigProvider` 读取。

```ts
// main.ts
import { createApp } from 'vue'
import { createYhUI } from '@yh-ui/yh-ui'
import App from './App.vue'

const app = createApp(App)

const yhUI = createYhUI()

app.use(yhUI)
app.mount('#app')
```

## 4. 在 Nuxt 3/4 中使用（推荐）

如果您使用的是 Nuxt 3/4，请安装并注册 `@yh-ui/nuxt`，即可获得模块集成、自动导入和样式入口注入。

👉 [查看 Nuxt 集成指南](/guide/nuxt)

## 下一步

恭喜！您已经成功运行了 YH-UI。接下来：

- [浏览组件库](/components/button) - 探索所有可用组件。
- [定制主题](/guide/theming) - 打造您专属的设计风格。
- [设计规范](/guide/design) - 查看库中实际使用的主题变量与设计令牌。
