# @yh-ui/hooks

YH-UI 的 Vue Composition API 工具包。它沉淀了组件库内部常用的交互状态、上下文、缓存、国际化、滚动、AI 和业务计算逻辑，也可以独立用于你的 Vue 3 项目。

[Documentation](https://1079161148.github.io/yh-ui/) | [GitHub](https://github.com/1079161148/yh-ui)

## Highlights

- 组件基础能力：`useNamespace`、`useZIndex`、`useId`、`useConfig`、`useFormItem` 帮你统一命名、层级、ID 和表单上下文。
- 交互型 Hooks：`useClickOutside`、`useEventListener`、`useScrollLock`、`useVirtualScroll` 处理常见 DOM 交互并自动清理副作用。
- 业务型 Hooks：`useSKU`、`useCountdown`、`useCache`、响应式 `storage` 可直接服务电商、活动页和高频缓存场景。
- AI Hooks：`useAiChat`、`useAiStream`、`useAiConversations`、`useAiRequest`、`useAiVoice`、`useAiPersistence` 支撑 AI 对话和流式输出。
- 国际化集成：`useLocale` 和 dayjs locale helpers 让组件文本和日期语言保持一致。
- SSR 友好：涉及 DOM 的能力会在服务端环境下保护执行，适合 Nuxt。

## Install

```bash
pnpm add @yh-ui/hooks
```

## Usage

```ts
import { useCountdown, useNamespace, useVirtualScroll } from '@yh-ui/hooks'
```

## Common Hooks

| Hook               | Use case                                                     |
| ------------------ | ------------------------------------------------------------ |
| `useNamespace`     | Generate BEM-style class names with the YH-UI prefix         |
| `useZIndex`        | Allocate overlay z-index values consistently                 |
| `useVirtualScroll` | Render large lists with a small visible window               |
| `useCache`         | Reactive cache with expiration and cleanup behavior          |
| `useSKU`           | Calculate selectable SKU combinations and disabled states    |
| `useCountdown`     | Countdown state with start, pause, resume and reset          |
| `useLocale`        | Read and translate current locale messages                   |
| `useAiChat`        | Manage AI chat messages, loading state and request lifecycle |

## Example

```vue
<script setup lang="ts">
import { useCountdown } from '@yh-ui/hooks'

const { remaining, isRunning, start, pause, resume, reset } = useCountdown({
  duration: 60,
  interval: 1000
})
</script>

<template>
  <span>{{ remaining }}s</span>
  <button @click="start">Start</button>
  <button :disabled="!isRunning" @click="pause">Pause</button>
  <button @click="resume">Resume</button>
  <button @click="reset">Reset</button>
</template>
```

## License

MIT
