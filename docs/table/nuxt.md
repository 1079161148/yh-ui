# Table 表格 - Nuxt 集成指南

`YH-UI` 表格组件完美兼容 Nuxt 3。本章节将介绍如何在 Nuxt 项目中优雅地引入和使用表格组件，并解决 SSR（服务端渲染）相关的常见问题。

## 快速上手

在 Nuxt 3 中使用 `YH-UI` 表格的最佳方式是通过 **插件 (Plugins)** 模式进行全局注册。

### 1. 安装依赖

确保你的项目中已安装了 `yh-ui`：

```bash
npm install yh-ui
# 或
pnpm add yh-ui
```

### 2. 创建插件

在 `plugins` 目录下创建 `yh-ui.ts` 文件：

```ts
// plugins/yh-ui.ts
import { defineNuxtPlugin } from '#app'
import YhUI from 'yh-ui'
import 'yh-ui/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(YhUI)
})
```

### 3. 配置自动导入 (可选)

如果你希望在 Nuxt 中利用自动导入功能，可以在 `nuxt.config.ts` 中配置：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['yh-ui/dist/index.css'],
  build: {
    transpile: ['yh-ui']
  }
})
```

## 在页面中使用

插件配置完成后，你可以在任何 `.vue` 页面或组件中直接使用 `<yh-table>`。

```vue
<template>
  <div class="container">
    <yh-table :data="tableData" :columns="columns" border />
  </div>
</template>

<script setup lang="ts">
const tableData = ref([
  { id: 1, name: 'Nuxt User', role: 'Developer' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'role', label: '角色' }
]
</script>
```

## SSR 兼容性说明

### Client-Only 组件

表格组件中某些涉及 DOM 操作的功能（如 **虚拟滚动**、**拖拽排序**、**导出/打印**）依赖浏览器环境。虽然组件内部已做了环境判断，但为了最佳性能和避免水合（Hydration）错误，建议在这些场景下使用 `<ClientOnly>` 包裹：

```vue
<template>
  <ClientOnly>
    <yh-table 
      :data="data" 
      :columns="columns"
      :virtual-config="{ enabled: true }"
    />
    <template #fallback>
      <!-- 加载中的占位内容 -->
      <div class="loading-placeholder">加载中...</div>
    </template>
  </ClientOnly>
</template>
```

### 指令冲突

如果使用了 `yh-tooltip` 或类似的指令，确保 Nuxt 能够正确转译相关包。已在 `transpile` 配置中添加 `'yh-ui'` 即可解决大部分问题。

## 样式自定义

在 Nuxt 3 中，你可以通过修改全局 CSS 变量来定制表格主题：

```css
/* assets/css/main.css */
:root {
  --yh-color-primary: #00dc82; /* Nuxt Green */
  --yh-table-header-bg: #f8fafc;
}
```

然后在 `nuxt.config.ts` 中引入该文件。

## 常见问题

### 1. 自动导入不生效？
请确保在 `build.transpile` 中包含 `yh-ui`，这能保证 Nuxt 能够正确解析组件库的 ESM 导出。

### 2. Hydration Mismatch 警告？
通常发生在使用随机生成的模拟数据时。请确保 `v-for` 使用的 `key` 在服务端和客户端保持一致，或者使用 `<ClientOnly>`。

### 3. 图标库丢失？
`YH-UI` 的表格图标依赖内置图标库，如果图标无法正常显示，请检查 `yh-ui/dist/index.css` 是否已正确引入。
