# @yh-ui/nuxt

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI Nuxt 模块</h3>

<p align="center">
  开箱即用的 Nuxt 3/4 集成 · 组件自动导入 · SSR/Hydration 完全兼容 · 零配置启用
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/nuxt">
    <img src="https://img.shields.io/npm/v/@yh-ui/nuxt.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/nuxt">
    <img src="https://img.shields.io/npm/dm/@yh-ui/nuxt.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/nuxt.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- ✅ **完整 SSR 支持** — 工业级验证，解决所有 Hydration Mismatch 问题
- 🔄 **组件自动导入** — 所有 YhXxx 组件无需手动 `import`，开箱即用
- 🪝 **Composable 自动导入** — `useNamespace`、`useLocale`、`useZIndex` 等自动可用
- 🎨 **样式自动注入** — 主题样式在正确的时机注入，避免 FOUC
- 🌍 **i18n 配置** — 一行配置默认语言，支持 67 种语言
- 🔒 **TypeScript 完整类型** — 模块配置选项均有类型提示
- ⚡ **Nuxt 3 & 4 兼容** — 支持最新 Nuxt 4.x RC

---

## 📦 安装

```bash
pnpm add @yh-ui/nuxt

# npm
npm install @yh-ui/nuxt
```

**依赖要求**：Nuxt `>=3.11.0 || ^4.0.0-rc.1`，Node.js `>=18.0.0`

---

## 🔨 快速开始

### 第 1 步：注册模块

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],

  yhUI: {
    importStyle: true, // 默认即为 true：自动注入 CSS 样式
    locale: 'zh-CN' // 默认语言，支持 67 种语言代码
  }
})
```

开启 `importStyle` 时，Nuxt 模块内部实际注入的是公开 CSS 入口 `@yh-ui/components/style`，不会依赖应用侧的 Sass 环境。

### 第 2 步：直接使用组件

注册模块后，**所有 YhXxx 组件和 composable 自动导入**，无需任何额外配置：

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <YhButton type="primary" size="large">开始使用</YhButton>
    <YhInput v-model="keyword" clearable placeholder="搜索..." />
    <YhTable :data="tableData" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
// 无需 import！
const keyword = ref('')
const tableData = ref([{ id: 1, name: 'YH-UI' }])
const columns = [{ prop: 'name', label: '名称' }]
</script>
```

### Composable 自动导入

```vue
<script setup lang="ts">
// 以下 composable 均无需 import，直接使用
const ns = useNamespace('my-component') // BEM 类名
const id = useId() // 稳定唯一 ID
const { nextZIndex } = useZIndex() // z-index 管理
const { t } = useLocale() // i18n 翻译
</script>
```

### 使用全局方法

```vue
<script setup lang="ts">
const showSuccess = () => {
  YhMessage.success('操作成功！')
}

const showNotification = () => {
  YhNotification({
    title: '系统通知',
    message: '您有一条新消息',
    type: 'info'
  })
}
</script>
```

---

## ⚙️ 配置选项

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true, // 是否自动注入 CSS 样式；默认 true
    locale: 'zh-CN' // 默认语言代码
  }
})
```

| 选项          | 类型      | 默认值    | 说明                        |
| ------------- | --------- | --------- | --------------------------- |
| `importStyle` | `boolean` | `true`    | 是否自动注入 YH-UI CSS 样式 |
| `locale`      | `string`  | `'zh-CN'` | 默认语言代码（67 种可选）   |

`importStyle` 为 `true` 时，实际注入路径为 `@yh-ui/components/style`。

---

## 🌐 SSR 问题说明

本模块已系统性地处理 Nuxt SSR 中的常见问题：

| 问题                             | 解决方案                                           |
| -------------------------------- | -------------------------------------------------- |
| ID 不一致导致 Hydration Mismatch | 使用 Vue 3.5 原生 `useId()`，服务端/客户端生成一致 |
| z-index 状态污染                 | 通过 provide/inject 为每个请求隔离计数器           |
| DOM 操作在服务端报错             | 所有 DOM 访问均使用 `isClient` 防护                |
| 样式注入时机不对（FOUC）         | 在 Nuxt 正确的生命周期钩子注入样式                 |

---

## 🔄 自动导入的组件（部分）

以下组件开箱即用，无需手动 `import`：

```
YhButton          YhInput           YhInputNumber     YhInputTag
YhSelect          YhOption          YhCascader        YhCascaderPanel
YhCheckbox        YhCheckboxGroup   YhRadio           YhRadioGroup
YhSwitch          YhRate            YhSlider          YhDatePicker
YhTimePicker      YhColorPicker     YhUpload          YhTransfer
YhTreeSelect      YhForm            YhFormItem        YhFormSchema
YhTable           YhTree            YhList            YhCard
YhBadge           YhTag             YhAvatar          YhImage
YhDialog          YhDrawer          YhTooltip         YhPopover
YhPopconfirm      YhMessage         YhNotification    YhAlert
YhProgress        YhSkeleton        YhLoading         YhPagination
YhMenu            YhTabs            YhBreadcrumb      YhSteps
YhRow             YhCol             YhDivider         YhSpace
YhIcon            YhConfigProvider  YhChart           YhGantt
YhAiBubble        YhAiSender        YhAiProvider      ... 共 77+ 个
```

## 🪝 自动导入的 Composable

```
useNamespace    useId         useZIndex     useLocale
useFormItem     useConfig     useCache      useClickOutside
useEventListener useScrollLock useCountdown useSKU
useVirtualScroll useAI
```

---

## ⚠️ 注意事项

1. **样式引入顺序**：若与其他 CSS 框架共存，注意样式的加载顺序，避免优先级冲突
2. **Flow 组件**：`@yh-ui/flow` 流程图组件依赖浏览器 Canvas API，需用 `<ClientOnly>` 包裹
3. **Nuxt 4 兼容**：Nuxt 4.x 对 `auto-imports` 规则有变化，本模块已做对应适配

---

## 🔗 相关资源

- [📖 Nuxt 集成文档](https://1079161148.github.io/yh-ui/guide/nuxt)
- [🎮 Nuxt Playground](https://github.com/1079161148/yh-ui/tree/main/playground-nuxt)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
