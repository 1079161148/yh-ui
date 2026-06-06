# @yh-ui/theme

YH-UI 的主题和设计令牌包。它负责生成 CSS 变量、切换预设主题、管理暗色模式、密度、圆角、响应式主题和组件级覆盖，让组件库和业务页面共享同一套视觉状态。

[Theme Guide](https://1079161148.github.io/yh-ui/guide/theming) | [GitHub](https://github.com/1079161148/yh-ui)

## Highlights

- 预设主题：`default`、`dark`、`blue`、`green`、`purple`、`orange`、`rose`、`amber`、`teal`、`indigo`、`slate`、`zinc`。
- 运行时主题管理：`initTheme`、`useTheme`、`ThemeManager` 可读取、切换和持久化主题。
- 颜色算法：支持 `default`、`vibrant`、`muted`、`pastel`，可基于主色生成更完整的色板。
- 暗色和系统跟随：可手动切换，也可响应 `prefers-color-scheme`。
- 密度和可访问性：支持密度配置、色盲友好模式、对比度检查和根据背景色获取文本色。
- 组件级覆盖：可以为某个组件设置局部 token，不必改全局主题。

## Install

```bash
pnpm add @yh-ui/theme
```

## Use as Vue Plugin

```ts
import { createApp } from 'vue'
import { ThemePlugin } from '@yh-ui/theme'
import App from './App.vue'

const app = createApp(App)

app.use(ThemePlugin, {
  preset: 'blue',
  dark: false,
  followSystem: true,
  persist: true,
  algorithm: 'vibrant'
})

app.mount('#app')
```

## Use in Components

```vue
<script setup lang="ts">
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

function switchTheme() {
  theme.setPreset('purple')
  theme.setDensity('compact')
}
</script>

<template>
  <button @click="switchTheme">Switch theme</button>
</template>
```

## Direct Utilities

```ts
import {
  checkContrast,
  getTextColorForBackground,
  setThemePreset,
  toggleDarkMode
} from '@yh-ui/theme'

setThemePreset('teal')
toggleDarkMode()
checkContrast('#111827', '#ffffff')
getTextColorForBackground('#409eff')
```

## Design Tokens

The package writes YH-UI CSS variables such as:

```css
--yh-color-primary
--yh-color-success
--yh-text-color-primary
--yh-bg-color
--yh-border-color
--yh-border-radius-base
--yh-component-size-default
--yh-density-factor
```

These variables are consumed by YH-UI components and can also be used in your own CSS.

## License

MIT
