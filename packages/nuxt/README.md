# @yh-ui/nuxt

YH-UI 的 Nuxt 3/4 模块。它负责注册组件、自动导入 Hooks 和全局方法、注入发布后的 CSS，并处理 Nuxt SSR 下常见的样式、ID 和依赖转译问题。

[Nuxt Guide](https://1079161148.github.io/yh-ui/guide/nuxt) | [GitHub](https://github.com/1079161148/yh-ui)

## Highlights

- 零手写导入：`YhButton`、`YhTable`、`YhAiChat` 等组件可以直接在页面和组件中使用。
- Composable 自动导入：`useNamespace`、`useZIndex`、`useLocale`、`useVirtualScroll`、`useAiChat`、`useSKU` 等自动可用。
- 全局方法自动导入：`YhMessage`、`YhNotification`、`YhMessageBox`、`YhLoading`、`useAddressParser` 等常用能力直接调用。
- SSR 友好：运行时插件隔离请求状态，依赖自动 transpile，样式通过发布 CSS 入口注入。
- 可配置前缀：默认使用 `Yh` 前缀，也可以通过 `prefix` 调整组件注册名。
- 支持 Nuxt `^3.11.0` 和 `^4.0.0-rc.1`。

## Install

```bash
pnpm add @yh-ui/nuxt
```

## Setup

```ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true,
    buildTranspile: true,
    prefix: 'Yh',
    ssrOptimization: {
      componentCache: true
    }
  }
})
```

## Use Components Directly

```vue
<template>
  <YhButton type="primary">Create</YhButton>
  <YhInput v-model="keyword" clearable placeholder="Search" />
  <YhTable :data="rows" :columns="columns" />
</template>

<script setup lang="ts">
const keyword = ref('')
const rows = ref([{ id: 1, name: 'YH-UI' }])
const columns = [{ prop: 'name', label: 'Name' }]
</script>
```

## Module Options

| Option                           | Type      | Default | Description                               |
| -------------------------------- | --------- | ------- | ----------------------------------------- |
| `importStyle`                    | `boolean` | `true`  | Inject `@yh-ui/components/style.css`      |
| `buildTranspile`                 | `boolean` | `true`  | Add YH-UI packages to Nuxt transpile list |
| `prefix`                         | `string`  | `'Yh'`  | Component name prefix                     |
| `ssrOptimization.componentCache` | `boolean` | `true`  | Enable SSR component cache hints          |

## License

MIT
