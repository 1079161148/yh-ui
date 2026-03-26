# @yh-ui/theme

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI 行业领先主题系统</h3>

<p align="center">
  12 种预设主题 · 4 种颜色算法 · 色盲友好模式 · 3 档密度配置 · 丝滑切换动画 · 跟随系统暗色
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/theme">
    <img src="https://img.shields.io/npm/v/@yh-ui/theme.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/theme">
    <img src="https://img.shields.io/npm/dm/@yh-ui/theme.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/theme.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 为什么选择 YH-UI 主题系统？

| 能力             | YH-UI       | Element Plus | Naive UI |
| ---------------- | ----------- | ------------ | -------- |
| 预设主题数       | **12 种**   | 1 种         | 有限     |
| 颜色算法         | **4 种**    | ❌           | ❌       |
| 色盲友好模式     | **4 种** ✅ | ❌           | ❌       |
| 密度配置         | **3 档** ✅ | ❌           | ❌       |
| 主题切换动画     | ✅ 丝滑     | ❌           | ❌       |
| 跟随系统暗色     | ✅          | 手动         | 手动     |
| 偏好持久化       | ✅          | ❌           | ❌       |
| CSS 变量设计令牌 | ✅ 完整     | 部分         | 部分     |

---

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yh-ui/theme

# npm
npm install @yh-ui/theme
```

> **注意**：`@yh-ui/theme` 是 `@yh-ui/yh-ui` 的子包，通常无需单独安装。

---

## 🔨 快速开始

### 在 Vue 应用中使用

```ts
import { createApp } from 'vue'
import { createYhTheme } from '@yh-ui/theme'
import App from './App.vue'

const app = createApp(App)

const theme = createYhTheme({
  preset: 'purple', // 12 种预设主题
  algorithm: 'vibrant', // 颜色算法
  density: 'default', // 密度档位
  followSystem: true, // 跟随系统暗色模式
  transition: true, // 开启切换动画
  persist: true // 持久化到 localStorage
})

app.use(theme)
app.mount('#app')
```

### 在组件中动态切换

```vue
<script setup lang="ts">
import { useTheme } from '@yh-ui/theme'

const { preset, isDark, density, setPreset, toggleDark, setDensity } = useTheme()
</script>

<template>
  <div>
    <!-- 切换主题预设 -->
    <button @click="setPreset('ocean')">Ocean 主题</button>
    <button @click="setPreset('violet')">Violet 主题</button>

    <!-- 切换暗色 -->
    <button @click="toggleDark()">{{ isDark ? '切换亮色' : '切换暗色' }}</button>

    <!-- 切换密度 -->
    <button @click="setDensity('compact')">紧凑</button>
    <button @click="setDensity('default')">默认</button>
    <button @click="setDensity('comfortable')">宽松</button>
  </div>
</template>
```

---

## 🎨 预设主题列表

| 主题名      | 说明               |
| ----------- | ------------------ |
| `default`   | 科技蓝（默认）     |
| `purple`    | 优雅紫             |
| `ocean`     | 深海蓝             |
| `violet`    | 紫罗兰             |
| `rose`      | 玫瑰红             |
| `amber`     | 琥珀金             |
| `emerald`   | 翡翠绿             |
| `slate`     | 石板灰（极简中性） |
| `cyberpunk` | 赛博朋克（霓虹风） |
| `sakura`    | 樱花粉             |
| `forest`    | 深林绿             |
| `nordic`    | 北欧冷色           |

---

## ⚙️ 配置项

### `createYhTheme(options)`

| 选项             | 类型                                                                | 默认值      | 说明                                |
| ---------------- | ------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `preset`         | `ThemePreset`                                                       | `'default'` | 预设主题名                          |
| `algorithm`      | `'default' \| 'vibrant' \| 'soft' \| 'dark'`                        | `'default'` | 颜色生成算法                        |
| `density`        | `'compact' \| 'default' \| 'comfortable'`                           | `'default'` | 密度档位                            |
| `colorBlindMode` | `'protanopia' \| 'deuteranopia' \| 'tritanopia' \| 'achromatopsia'` | `undefined` | 色盲友好模式                        |
| `followSystem`   | `boolean`                                                           | `false`     | 是否跟随系统暗色偏好                |
| `transition`     | `boolean`                                                           | `true`      | 是否开启主题切换 transition 动画    |
| `persist`        | `boolean`                                                           | `false`     | 是否将用户偏好持久化到 localStorage |
| `namespace`      | `string`                                                            | `'yh'`      | CSS 变量命名空间前缀                |

### `useTheme()` 返回值

| 属性/方法                 | 类型                  | 说明             |
| ------------------------- | --------------------- | ---------------- |
| `preset`                  | `Ref<ThemePreset>`    | 当前主题预设     |
| `isDark`                  | `Ref<boolean>`        | 是否为暗色模式   |
| `density`                 | `Ref<Density>`        | 当前密度         |
| `algorithm`               | `Ref<Algorithm>`      | 当前颜色算法     |
| `colorBlindMode`          | `Ref<ColorBlindMode>` | 当前色盲模式     |
| `setPreset(preset)`       | `Function`            | 切换主题预设     |
| `toggleDark()`            | `Function`            | 切换暗色/亮色    |
| `setDensity(density)`     | `Function`            | 设置密度档位     |
| `setAlgorithm(algorithm)` | `Function`            | 设置颜色算法     |
| `setColorBlindMode(mode)` | `Function`            | 设置色盲友好模式 |
| `resetTheme()`            | `Function`            | 重置为默认主题   |

---

## 🎨 CSS 设计令牌（Design Tokens）

主题系统通过 CSS 自定义属性（CSS Variables）实现，可在任意样式中使用：

```scss
// 主色系
--yh-color-primary
--yh-color-primary-light-3
--yh-color-primary-dark-2

// 文字颜色
--yh-text-color-primary
--yh-text-color-regular
--yh-text-color-secondary
--yh-text-color-placeholder

// 背景颜色
--yh-bg-color
--yh-bg-color-page
--yh-bg-color-overlay

// 边框
--yh-border-color
--yh-border-color-light
--yh-border-radius-base

// 间距（密度相关）
--yh-spacing-xs
--yh-spacing-sm
--yh-spacing-md
--yh-spacing-lg

// 组件尺寸
--yh-component-size-small
--yh-component-size-default
--yh-component-size-large
```

在自定义组件中使用：

```scss
.my-card {
  background: var(--yh-bg-color);
  border: 1px solid var(--yh-border-color);
  border-radius: var(--yh-border-radius-base);
  color: var(--yh-text-color-primary);
  padding: var(--yh-spacing-md);
}
```

---

## 🌙 暗色模式

YH-UI 主题系统提供两种暗色模式激活方式：

### 方式一：受控切换

```ts
const { toggleDark, isDark } = useTheme()
toggleDark() // 手动切换
```

### 方式二：跟随系统（推荐）

```ts
createYhTheme({ followSystem: true })
// 自动响应 prefers-color-scheme: dark
```

---

## ⚠️ 注意事项

1. **主题包含 CSS 文件**：需要在入口统一引入样式，`@yh-ui/yh-ui/css` 会自动包含主题样式
2. **SSR**：服务端不存在 `localStorage`，`persist: true` 时需配合 Nuxt Cookie 持久化
3. **色盲模式**：启用色盲模式后，颜色算法将强制切换以保证 WCAG 对比度合规
4. **命名空间**：自定义 `namespace` 时，CSS 变量前缀会相应变更，需同步修改样式引用

---

## 🔗 相关资源

- [📖 官方文档 — 主题系统](https://1079161148.github.io/yh-ui/guide/theming)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
