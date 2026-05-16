# @yh-ui/yh-ui

YH-UI 的完整入口包，面向 Vue 3.5+ 项目提供组件、主题、Hooks、工具函数和国际化能力。它适合希望一次安装就获得完整设计系统能力的应用，也保留了按需导入和自动导入的使用方式。

[Documentation](https://1079161148.github.io/yh-ui/) | [Releases](https://github.com/1079161148/yh-ui/releases) | [GitHub](https://github.com/1079161148/yh-ui)

## Highlights

- 完整 Vue 3 组件体系：基础组件、表单、反馈、导航、数据展示、业务组件、AI 组件和 Table 能力都从同一入口导出。
- 面向真实业务的自有能力：AI 对话界面、思维链展示、附件卡片、代码块、业务地址解析、SKU、优惠券、抽奖、瀑布流、甘特图等不止停留在基础 UI。
- 主题系统内置：预设主题、暗色模式、密度、色盲友好模式、CSS 变量和运行时切换可以统一管理。
- 国际化就绪：语言包由 `@yh-ui/locale` 提供，可通过 `YhConfigProvider` 或插件安装参数注入。
- TypeScript 友好：组件、Hooks、工具函数、主题和语言包都提供类型声明。
- 支持现代构建方式：ESM、按需导入、自动导入 resolver、Nuxt 模块和 SSR 场景。

## Install

```bash
pnpm add @yh-ui/yh-ui
```

Peer requirements: Vue `>=3.5.0`, Node.js `>=18.0.0`.

## Full Import

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'

createApp(App).use(YhUI).mount('#app')
```

## On-Demand Import

```vue
<script setup lang="ts">
import { YhButton, YhInput, YhTable } from '@yh-ui/yh-ui'
</script>

<template>
  <YhButton type="primary">Submit</YhButton>
  <YhInput clearable placeholder="Search" />
  <YhTable :data="rows" :columns="columns" />
</template>
```

## Auto Import

```ts
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

The resolver can inject component styles automatically, so most Vite projects can use components without hand-written style imports.

## Theme

```ts
import { ThemePlugin } from '@yh-ui/yh-ui'

app.use(ThemePlugin, {
  preset: 'default',
  followSystem: true,
  persist: true,
  algorithm: 'vibrant'
})
```

## Locale

```ts
import YhUI from '@yh-ui/yh-ui'
import zhCn from '@yh-ui/locale/lang/zh-cn'

app.use(YhUI, { locale: zhCn })
```

## Package Scope

This package re-exports the public APIs from:

| Package             | What it provides                                           |
| ------------------- | ---------------------------------------------------------- |
| `@yh-ui/components` | Vue components, AI UI, table, business widgets             |
| `@yh-ui/hooks`      | Composition API utilities used by components and apps      |
| `@yh-ui/theme`      | Theme manager, tokens, dark mode and runtime CSS variables |
| `@yh-ui/locale`     | Locale files and language types                            |
| `@yh-ui/utils`      | Shared type, DOM, style and common utilities               |

Install specialized packages such as `@yh-ui/nuxt`, `@yh-ui/request`, `@yh-ui/flow`, `@yh-ui/icons`, or `@yh-ui/ai-sdk` when you want a smaller or more focused integration.

## License

MIT
