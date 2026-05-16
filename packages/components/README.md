# @yh-ui/components

YH-UI 的 Vue 3 组件包。它不仅包含按钮、表单、弹层、导航这类基础组件，也覆盖 AI 交互、复杂表格、业务展示和电商场景，适合直接搭建中后台、运营工具、AI 产品和复杂业务页面。

[Documentation](https://1079161148.github.io/yh-ui/) | [Components](https://1079161148.github.io/yh-ui/components/button) | [Releases](https://github.com/1079161148/yh-ui/releases)

## Highlights

- 覆盖面完整：Layout、Form、Data Display、Feedback、Navigation、ConfigProvider、Typography、Table、AI Components 和业务组件统一导出。
- AI 组件是内建能力：`YhAiChat`、`YhAiBubble`、`YhAiSender`、`YhAiThoughtChain`、`YhAiArtifacts`、`YhAiAttachments`、`YhAiMermaid`、`YhAiSources` 等组件可以直接组合成 AI 工作台。
- Table 面向高密度业务：列配置、选择、排序、工具栏、导出、打印、虚拟滚动等能力和 YH-UI 主题体系统一。
- 自有业务组件：`YhSmartAddress`、`YhSkuSelector`、`YhProductCard`、`YhCouponCard`、`YhLuckyDraw`、`YhCategoryNav`、`YhGanttChart` 等用于减少重复业务封装。
- 主题响应：组件消费 `@yh-ui/theme` 的 CSS 变量，支持暗色、密度、预设主题和运行时切换。
- TypeScript 和 SSR 友好：组件导出类型声明，核心 DOM 访问经过客户端保护，适合 Vite 和 Nuxt 场景。

## Install

```bash
pnpm add @yh-ui/components
```

For the complete package with styles, hooks, theme and locale included, use:

```bash
pnpm add @yh-ui/yh-ui
```

## Usage

```ts
import { createApp } from 'vue'
import { YhButton, YhTable } from '@yh-ui/components'
import '@yh-ui/components/style.css'

const app = createApp(App)
app.component('YhButton', YhButton)
app.component('YhTable', YhTable)
app.mount('#app')
```

## Auto Import

```ts
import Components from 'unplugin-vue-components/vite'
import { YhUIResolver } from '@yh-ui/components/resolver'

export default {
  plugins: [
    Components({
      resolvers: [YhUIResolver()]
    })
  ]
}
```

## Component Families

| Area       | Examples                                                                          |
| ---------- | --------------------------------------------------------------------------------- |
| Basic      | `YhButton`, `YhIcon`, `YhTypographyTitle`, `YhSpace`, `YhDivider`                 |
| Form       | `YhForm`, `YhInput`, `YhSelect`, `YhDatePicker`, `YhUpload`, `YhTransfer`         |
| Data       | `YhTable`, `YhTree`, `YhCalendar`, `YhWaterfall`, `YhCountdown`, `YhGanttChart`   |
| Feedback   | `YhMessage`, `YhNotification`, `YhDialog`, `YhDrawer`, `YhLoading`, `YhResult`    |
| Navigation | `YhMenu`, `YhTabs`, `YhSteps`, `YhBreadcrumb`, `YhDropdown`, `YhPagination`       |
| AI         | `YhAiChat`, `YhAiBubble`, `YhAiSender`, `YhAiThoughtChain`, `YhAiProvider`        |
| Business   | `YhSmartAddress`, `YhSkuSelector`, `YhProductCard`, `YhCouponCard`, `YhLuckyDraw` |

## AI Example

```vue
<script setup lang="ts">
import { YhAiBubble, YhAiSender } from '@yh-ui/components'
</script>

<template>
  <YhAiBubble role="assistant" content="Hello from YH-UI" />
  <YhAiSender placeholder="Ask anything" />
</template>
```

## License

MIT
