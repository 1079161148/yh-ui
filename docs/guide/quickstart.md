# 快速开始

本节将引导您如何在最短时间内让 YH-UI 在您的项目中运行起来。

## 1. 完整引入

最简单的方式是在入口文件中直接全局注册所有组件。这种方式开发体验最佳，但会使得初始包体积较大。

```ts
// main.ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'

// 引入全局样式
import '@yh-ui/yh-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)

// 注册插件
app.use(YhUI)
app.mount('#app')
```

## 2. 手动按需引入

借助 Vue 3 的 **Composition API**，您可以仅在需要的页面中引入组件包，享受极致的 Tree Shaking 优化。

```vue
<!-- App.vue -->
<script setup lang="ts">
import { YhButton } from '@yh-ui/yh-ui'
</script>

<template>
  <yh-button type="primary">Hello YH-UI</yh-button>
</template>
```

## 3. 全局配置

YH-UI 提供了一个全局配置方法 `createYhUI`，允许您自定义库的行为（如默认组件尺寸、Z-Index 等）。

```ts
// main.ts
import { createApp } from 'vue'
import { createYhUI } from '@yh-ui/yh-ui'
import App from './App.vue'

const app = createApp(App)

const yhUI = createYhUI({
  // 全局定义组件的默认尺寸：'small' | 'default' | 'large'
  size: 'default',
  // 弹窗类组件的基准 z-index
  zIndex: 3000,
  // 样式类名前缀 (默认 "yh")
  namespace: 'yh'
})

app.use(yhUI)
app.mount('#app')
```

## 4. 在 Nuxt 3 中使用 (推荐)

如果您使用的是 Nuxt 3 框架，我们提供了专属的模块支持，只需单步安装即可享受自动按需加载和 SSR 优化。

👉 [查看 Nuxt 集成指南](/guide/nuxt)

## 🏁 下一步

恭喜！您已经成功运行了 YH-UI。接下来：

- 🛠️ [浏览组件库](/components/button) - 探索所有可用组件。
- 🎨 [定制主题](/guide/theming) - 打造您专属的设计风格。
- ⚡ [性能优化](/guide/design) - 学习如何进一步优化应用。
