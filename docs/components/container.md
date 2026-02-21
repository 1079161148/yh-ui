# Container 布局容器

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-container>
    <yh-header>Header</yh-header>
    <yh-main>Main</yh-main>
  </yh-container>
<\/template>`

const jsBasic = tsBasic

const tsAside = `<template>
  <yh-container>
    <yh-aside width="200px">Aside</yh-aside>
    <yh-main>Main</yh-main>
  </yh-container>
<\/template>`

const jsAside = tsAside

const tsFull = `<template>
  <yh-container>
    <yh-header height="60px">Header</yh-header>
    <yh-container>
      <yh-aside width="200px">Aside</yh-aside>
      <yh-main>Main</yh-main>
    </yh-container>
    <yh-footer height="60px">Footer</yh-footer>
  </yh-container>
<\/template>`

const jsFull = tsFull

// Nuxt 使用示例
const tsNuxt = `<template>
  <!-- 典型 Nuxt 后台管理布局，文件：layouts/default.vue -->
  <yh-container style="height: 100vh;">
    <yh-header height="64px">
      <div style="display: flex; align-items: center; height: 100%;">
        <yh-typography-title :level="4" style="margin: 0; flex: 1;">My App</yh-typography-title>
        <yh-button text @click="toggleAside">
          {{ collapsed ? '展开侧边栏' : '收起侧边栏' }}
        </yh-button>
      </div>
    </yh-header>
    <yh-container>
      <yh-aside v-if="!collapsed" width="220px">
        <nav style="padding: 16px;">
          <p v-for="item in navItems" :key="item.path">
            <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
          </p>
        </nav>
      </yh-aside>
      <yh-main>
        <!-- 渲染当前路由页面内容 -->
        <NuxtPage />
      </yh-main>
    </yh-container>
    <yh-footer height="48px">
      <p style="margin: 0; text-align: center; line-height: 48px;">&copy; 2024 YH-UI</p>
    </yh-footer>
  </yh-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 组件在 Nuxt 中自动导入，无需手动注册
const collapsed = ref(false)
const toggleAside = () => {
  collapsed.value = !collapsed.value
}

const navItems = [
  { path: '/', label: '首页' },
  { path: '/dashboard', label: '仪表盘' },
  { path: '/settings', label: '设置' },
]
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Demo 状态
const collapsed = ref(false)
const toggleAside = () => {
  collapsed.value = !collapsed.value
}

const demoStyle = {
  border: '1px solid var(--yh-border-color, #dcdfe6)',
  borderRadius: '4px',
  overflow: 'hidden'
}
const headerStyle = {
  background: '#b3c0d1',
  color: '#333',
  textAlign: 'center' as const,
  lineHeight: '60px'
}
const asideStyle = {
  background: '#d3dce6',
  color: '#333',
  textAlign: 'center' as const,
  lineHeight: '200px'
}
const mainStyle = {
  background: '#e9eef3',
  color: '#333',
  textAlign: 'center' as const,
  padding: '40px',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const footerStyle = {
  background: '#b3c0d1',
  color: '#333',
  textAlign: 'center' as const,
  lineHeight: '60px'
}
</script>

用于布局的容器组件，方便快速搭建页面的基本结构。采用 Flex 布局，包含 Container、Header、Aside、Main、Footer 五个子组件。

## 常见页面布局

### Header + Main

<DemoBlock title="Header + Main" :ts-code="tsBasic" :js-code="jsBasic">
  <div :style="demoStyle">
    <yh-container>
      <yh-header :style="headerStyle">Header</yh-header>
      <yh-main :style="mainStyle">Main</yh-main>
    </yh-container>
  </div>
</DemoBlock>

### Aside + Main

<DemoBlock title="Aside + Main" :ts-code="tsAside" :js-code="jsAside">
  <div :style="demoStyle">
    <yh-container>
      <yh-aside width="200px" :style="asideStyle">Aside</yh-aside>
      <yh-main :style="mainStyle">Main</yh-main>
    </yh-container>
  </div>
</DemoBlock>

### 完整布局

Header + Aside + Main + Footer 的经典后台布局。Container 组件会自动检测子元素是否包含 Header 或 Footer，如果包含则自动切换为垂直方向布局。

<DemoBlock title="完整布局" :ts-code="tsFull" :js-code="jsFull">
  <div :style="demoStyle">
    <yh-container>
      <yh-header :style="headerStyle">Header</yh-header>
      <yh-container>
        <yh-aside width="200px" :style="asideStyle">Aside</yh-aside>
        <yh-main :style="mainStyle">Main</yh-main>
      </yh-container>
      <yh-footer :style="footerStyle">Footer</yh-footer>
    </yh-container>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Container 组件完全支持 Nuxt 3/4 的 SSR 渲染。以下示例展示了在 Nuxt 的 `layouts/default.vue` 中搭建带侧边栏折叠的后台管理布局，内容区使用 `<NuxtPage />` 渲染当前路由页面。

<DemoBlock title="Nuxt 中使用（layouts/default.vue）" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div :style="demoStyle">
    <yh-container>
      <yh-header :style="{ ...headerStyle, padding: '0 20px', display: 'flex', alignItems: 'center' }">
        <yh-typography-title :level="4" style="margin: 0; flex: 1; color: #333;">My App</yh-typography-title>
        <yh-button text @click="toggleAside">{{ collapsed ? '展开侧边栏' : '收起侧边栏' }}</yh-button>
      </yh-header>
      <yh-container>
        <yh-aside v-if="!collapsed" width="220px" :style="{ ...asideStyle, lineHeight: 'normal', padding: '16px 0' }">
          <div v-for="item in ['首页', '仪表盘', '设置']" :key="item" style="padding: 10px 20px; cursor: pointer;">
            {{ item }}
          </div>
        </yh-aside>
        <yh-main :style="mainStyle">
          <yh-typography-text type="secondary">当前路由内容（NuxtPage）</yh-typography-text>
        </yh-main>
      </yh-container>
      <yh-footer :style="footerStyle">&copy; 2024 YH-UI</yh-footer>
    </yh-container>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 所有 Props 和样式完全支持
- ✅ Flex 布局方向自动检测正常工作
- ✅ 插槽内容完整渲染
- ✅ 结合 `NuxtPage` 页面容器使用
- ✅ `NuxtLink` 路由链接完整支持
- ✅ 支持响应式侧边栏折叠

::: tip SSR 安全性
Container 所有子组件均已通过 SSR 测试，确保服务端和客户端渲染完全一致，Hydration 无错误。
:::

## API

### Container Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | 自动检测（含 Header/Footer 时为 vertical） |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Header Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 头部高度 | `string` | `'60px'` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Aside Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 侧边栏宽度 | `string` | `'200px'` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Main Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Footer Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 底部高度 | `string` | `'60px'` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Slots

所有子组件均支持 `default` 默认插槽。

## 主题变量

Container 组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-header-padding` | 头部内边距 | `0 20px` |
| `--yh-header-bg-color` | 头部背景色 | `transparent` |
| `--yh-header-border-bottom` | 头部底部边框 | `none` |
| `--yh-aside-bg-color` | 侧边栏背景色 | `transparent` |
| `--yh-aside-border-right` | 侧边栏右侧边框 | `none` |
| `--yh-main-padding` | 主区域内边距 | `20px` |
| `--yh-main-bg-color` | 主区域背景色 | `transparent` |
| `--yh-footer-padding` | 底部内边距 | `0 20px` |
| `--yh-footer-bg-color` | 底部背景色 | `transparent` |
| `--yh-footer-border-top` | 底部顶部边框 | `none` |
