# @yh-ui/locale

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI 国际化语言包</h3>

<p align="center">
  67 种语言 · 开箱即用 · 按需加载 · 动态切换 · 完整类型推导
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/locale">
    <img src="https://img.shields.io/npm/v/@yh-ui/locale.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/locale">
    <img src="https://img.shields.io/npm/dm/@yh-ui/locale.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/locale.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- 🌍 **67 种语言** — 业内最全的 Vue 组件库语言支持（对比：Element Plus 43 种，Naive UI 25 种）
- 📦 **按需加载** — 每个语言包独立文件，只打包使用的语言
- ⚡ **运行时切换** — 基于 Vue 响应式系统，切换语言无需刷新页面
- 🔒 **完整类型推导** — `t()` 翻译函数支持 key 类型检查，防止拼写错误
- 🌐 **SSR 兼容** — 可在 Nuxt 3 服务端正确渲染

---

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yh-ui/locale

# npm
npm install @yh-ui/locale
```

> **注意**：通常通过 `@yh-ui/yh-ui` 主包安装，无需单独安装。

---

## 🔨 快速开始

### 在主应用中配置

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import zhCN from '@yh-ui/locale/lang/zh-CN'
import App from './App.vue'

const app = createApp(App)
app.use(YhUI, { locale: zhCN })
app.mount('#app')
```

### 通过 ConfigProvider 动态切换（推荐）

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhConfigProvider } from '@yh-ui/yh-ui'
import zhCN from '@yh-ui/locale/lang/zh-CN'
import enUS from '@yh-ui/locale/lang/en'
import jaJP from '@yh-ui/locale/lang/ja'
import type { Language } from '@yh-ui/locale'

const localeMap = { 'zh-CN': zhCN, en: enUS, ja: jaJP }
const currentLocale = ref<Language>(zhCN)
</script>

<template>
  <YhConfigProvider :locale="currentLocale">
    <!-- 所有子组件自动使用当前语言 -->
    <YhTable :data="data" :columns="columns" />
    <YhPagination :total="100" />
    <YhDatePicker />
  </YhConfigProvider>

  <div>
    <button @click="currentLocale = localeMap['zh-CN']">中文</button>
    <button @click="currentLocale = localeMap['en']">English</button>
    <button @click="currentLocale = localeMap['ja']">日本語</button>
  </div>
</template>
```

### 在 Nuxt 3 中使用

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    locale: 'zh-CN' // 设置默认语言
  }
})
```

---

## 🌍 支持语言列表（67 种）

| 语言             | 导入路径                   | 语言代码 |
| ---------------- | -------------------------- | -------- |
| 简体中文         | `@yh-ui/locale/lang/zh-CN` | `zh-CN`  |
| 繁體中文         | `@yh-ui/locale/lang/zh-TW` | `zh-TW`  |
| English          | `@yh-ui/locale/lang/en`    | `en`     |
| 日本語           | `@yh-ui/locale/lang/ja`    | `ja`     |
| 한국어           | `@yh-ui/locale/lang/ko`    | `ko`     |
| Français         | `@yh-ui/locale/lang/fr`    | `fr`     |
| Deutsch          | `@yh-ui/locale/lang/de`    | `de`     |
| Español          | `@yh-ui/locale/lang/es`    | `es`     |
| Português        | `@yh-ui/locale/lang/pt`    | `pt`     |
| Italiano         | `@yh-ui/locale/lang/it`    | `it`     |
| Русский          | `@yh-ui/locale/lang/ru`    | `ru`     |
| العربية          | `@yh-ui/locale/lang/ar`    | `ar`     |
| हिन्दी           | `@yh-ui/locale/lang/hi`    | `hi`     |
| Türkçe           | `@yh-ui/locale/lang/tr`    | `tr`     |
| Polski           | `@yh-ui/locale/lang/pl`    | `pl`     |
| Nederlands       | `@yh-ui/locale/lang/nl`    | `nl`     |
| Svenska          | `@yh-ui/locale/lang/sv`    | `sv`     |
| ภาษาไทย          | `@yh-ui/locale/lang/th`    | `th`     |
| Tiếng Việt       | `@yh-ui/locale/lang/vi`    | `vi`     |
| Bahasa Indonesia | `@yh-ui/locale/lang/id`    | `id`     |
| ...              | ...                        | 共 67 种 |

查看完整列表：[docs/guide/i18n](https://1079161148.github.io/yh-ui/guide/i18n)

---

## 🔌 在自定义 Hook 中使用

```ts
import { useLocale } from '@yh-ui/hooks'

const { t, locale } = useLocale()

// 获取翻译文本
t('common.confirm') // '确认' 或 'Confirm'（根据当前语言）
t('table.emptyText') // '暂无数据'

// 读取当前语言
console.log(locale.value.name) // 'zh-CN'
```

---

## 🛠 自定义语言包

如果内置语言包的翻译不满足需求，可以覆盖或扩展：

```ts
import zhCN from '@yh-ui/locale/lang/zh-CN'
import type { Language } from '@yh-ui/locale'

const myLocale: Language = {
  ...zhCN,
  name: 'zh-CN-custom',
  common: {
    ...zhCN.common,
    confirm: '好的',
    cancel: '算了'
  }
}

app.use(YhUI, { locale: myLocale })
```

---

## ⚙️ TypeScript 类型

```ts
import type { Language, LocaleContext } from '@yh-ui/locale'

// Language: 完整的语言包类型
// LocaleContext: provide/inject 上下文类型
```

---

## ⚠️ 注意事项

- **RTL 语言**：阿拉伯语（`ar`）等 RTL 语言需配合 `YhConfigProvider` 的 `direction="rtl"` 属性使用
- **按需打包**：每个语言包独立文件，Vite/Webpack 会自动做 Tree-shaking，仅打包你导入的语言
- **SSR**：服务端渲染时语言包会正常加载，无 DOM 依赖，完全 SSR 安全

---

## 🔗 相关资源

- [📖 国际化文档](https://1079161148.github.io/yh-ui/guide/i18n)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
