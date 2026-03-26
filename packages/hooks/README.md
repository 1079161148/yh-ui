# @yh-ui/hooks

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI Composable Hooks</h3>

<p align="center">
  为 YH-UI 组件库提供底层 Composition API Hooks，覆盖 AI 对话、虚拟滚动、SKU、倒计时等高频业务场景。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/hooks">
    <img src="https://img.shields.io/npm/v/@yh-ui/hooks.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/hooks">
    <img src="https://img.shields.io/npm/dm/@yh-ui/hooks.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/hooks.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- 🧩 **15 个开箱即用 Hook** — 覆盖组件内核、业务场景、工具能力全维度
- 🔒 **完整 TypeScript 支持** — 所有 composable 均有精确类型推导，杜绝 `any`
- ⚡ **性能优先** — 纯函数式、响应式惰性计算，按需激活，零额外开销
- 🌐 **SSR 友好** — 所有 DOM 操作均有 `isClient` 防护，完美兼容 Nuxt 3
- 🌍 **i18n 内置** — `useLocale` 与 `@yh-ui/locale` 深度集成，67 种语言开箱即用
- 🎯 **Tree-shaking** — 每个 Hook 均可单独导入，不引入冗余代码

---

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yh-ui/hooks

# npm
npm install @yh-ui/hooks

# yarn
yarn add @yh-ui/hooks
```

> **注意**：`@yh-ui/hooks` 是 `@yh-ui/yh-ui` 的子包，若你已安装主包则无需单独安装。

---

## 🔨 快速开始

### 完整导入

```ts
import { useCountdown, useSKU, useVirtualScroll } from '@yh-ui/hooks'
```

### 按需导入（推荐）

```ts
// 只导入需要的 Hook，完美支持 Tree-shaking
import { useCountdown } from '@yh-ui/hooks/use-countdown'
import { useSKU } from '@yh-ui/hooks/use-sku'
```

---

## 📚 Hook 一览

| Hook               | 说明                                        | SSR |
| ------------------ | ------------------------------------------- | --- |
| `useAI`            | AI 对话流式能力，支持 abort、重试           | ✅  |
| `useCache`         | 响应式缓存管理（LRU/TTL/持久化）            | ✅  |
| `useClickOutside`  | 点击元素外部事件监听                        | ✅  |
| `useConfig`        | 读取全局 YH-UI 配置                         | ✅  |
| `useCountdown`     | 高精度倒计时（支持暂停/恢复/重置）          | ✅  |
| `useEventListener` | 自动清理的事件监听绑定                      | ✅  |
| `useFormItem`      | 表单项上下文集成（validate/resetField）     | ✅  |
| `useId`            | 稳定唯一 ID 生成（兼容 Vue 3.5 `useId`）    | ✅  |
| `useLocale`        | i18n 国际化文本获取                         | ✅  |
| `useNamespace`     | BEM 类名生成（`yh-button__icon--disabled`） | ✅  |
| `useScrollLock`    | 页面/元素滚动锁定                           | ✅  |
| `useSKU`           | 电商 SKU 矩阵计算（规格路径算法）           | ✅  |
| `useVirtualScroll` | 大数据虚拟滚动计算                          | ✅  |
| `useZIndex`        | 全局 z-index 层级管理                       | ✅  |
| `storage`          | localStorage/sessionStorage 响应式封装      | ✅  |

---

## 🚀 详细使用示例

### `useCountdown` — 倒计时

```vue
<script setup lang="ts">
import { useCountdown } from '@yh-ui/hooks'

const { remaining, isRunning, start, pause, resume, reset } = useCountdown({
  duration: 60, // 秒
  interval: 1000, // 更新间隔 ms
  onFinish: () => console.log('倒计时结束！')
})
</script>

<template>
  <div>
    <span>剩余：{{ remaining }}s</span>
    <button @click="start">开始</button>
    <button @click="pause">暂停</button>
    <button @click="resume">继续</button>
    <button @click="reset">重置</button>
  </div>
</template>
```

### `useSKU` — 电商 SKU 矩阵

```vue
<script setup lang="ts">
import { useSKU } from '@yh-ui/hooks'

const skuData = [
  {
    specs: [
      { name: '颜色', value: '红色' },
      { name: '尺寸', value: 'M' }
    ],
    stock: 10
  },
  {
    specs: [
      { name: '颜色', value: '红色' },
      { name: '尺寸', value: 'L' }
    ],
    stock: 0
  },
  {
    specs: [
      { name: '颜色', value: '蓝色' },
      { name: '尺寸', value: 'M' }
    ],
    stock: 5
  }
]

const { specGroups, selectedSpecs, currentSKU, isDisabled, selectSpec } = useSKU(skuData)
</script>

<template>
  <div v-for="group in specGroups" :key="group.name">
    <h4>{{ group.name }}</h4>
    <button
      v-for="value in group.values"
      :key="value"
      :disabled="isDisabled(group.name, value)"
      :class="{ active: selectedSpecs[group.name] === value }"
      @click="selectSpec(group.name, value)"
    >
      {{ value }}
    </button>
  </div>
  <p v-if="currentSKU">库存：{{ currentSKU.stock }}</p>
</template>
```

### `useVirtualScroll` — 虚拟滚动

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useVirtualScroll } from '@yh-ui/hooks'

const containerRef = ref<HTMLElement>()
const items = Array.from({ length: 100000 }, (_, i) => ({ id: i, label: `Item ${i}` }))

const { visibleItems, totalHeight, offsetY, handleScroll } = useVirtualScroll({
  items,
  itemHeight: 40,
  containerHeight: 600,
  overscan: 5
})
</script>

<template>
  <div ref="containerRef" style="height: 600px; overflow-y: auto" @scroll="handleScroll">
    <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
      <div :style="{ transform: `translateY(${offsetY}px)` }">
        <div v-for="item in visibleItems" :key="item.id" style="height: 40px">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
```

### `useClickOutside` — 点击外部

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '@yh-ui/hooks'

const dropdownRef = ref<HTMLElement>()
const isOpen = ref(false)

useClickOutside(dropdownRef, () => {
  isOpen.value = false
})
</script>

<template>
  <div ref="dropdownRef">
    <button @click="isOpen = !isOpen">切换下拉</button>
    <ul v-if="isOpen">
      <li>选项 1</li>
      <li>选项 2</li>
    </ul>
  </div>
</template>
```

### `useLocale` — 国际化

```ts
import { useLocale } from '@yh-ui/hooks'

const { t, locale } = useLocale()
// t('common.confirm') => '确认' (zh-CN) | 'Confirm' (en)
```

### `useNamespace` — BEM 类名

```ts
import { useNamespace } from '@yh-ui/hooks'

const ns = useNamespace('button')
ns.b() // 'yh-button'
ns.e('icon') // 'yh-button__icon'
ns.m('primary') // 'yh-button--primary'
ns.em('icon', 'large') // 'yh-button__icon--large'
```

### `useEventListener` — 自动清理事件

```ts
import { ref } from 'vue'
import { useEventListener } from '@yh-ui/hooks'

const target = ref<HTMLElement>()
// 组件卸载时自动移除监听，无需手动 removeEventListener
useEventListener(target, 'scroll', (e) => {
  console.log('scrolled', e)
})
```

### `useZIndex` — z-index 管理

```ts
import { useZIndex } from '@yh-ui/hooks'

const { nextZIndex, currentZIndex } = useZIndex()
const zIndex = nextZIndex() // 2001, 2002, 2003 ...
```

---

## ⚠️ 注意事项

- **SSR 环境**：`useClickOutside`、`useEventListener`、`useScrollLock` 会在服务端自动跳过 DOM 操作，无需额外处理
- **Vue 3.5+ 推荐**：`useId` 内部优先使用 Vue 3.5 原生 `useId()`，旧版本会自动 fallback
- **独立使用**：可脱离 `@yh-ui/components` 单独使用，适合自研组件场景

---

## 🔗 相关资源

- [📖 官方文档](https://1079161148.github.io/yh-ui/)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)
- [📝 更新日志](https://github.com/1079161148/yh-ui/blob/main/CHANGELOG.md)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
