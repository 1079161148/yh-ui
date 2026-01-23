# Icon 图标

语义化的矢量图形。

## 基础用法

使用 `name` 属性来指定图标。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; font-size: 24px; color: var(--yh-text-color-primary);">
    <yh-icon name="success" color="var(--yh-color-success)" />
    <yh-icon name="warning" color="var(--yh-color-warning)" />
    <yh-icon name="error" color="var(--yh-color-danger)" />
    <yh-icon name="info" color="var(--yh-color-info)" />
    <yh-icon name="plus" />
    <yh-icon name="search" />
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref } from 'vue'
const isConnected = ref(true)

const tsBasic = `<template>
  <yh-icon name="success" color="var(--yh-color-success)" />
  <yh-icon name="warning" color="var(--yh-color-warning)" />
  <yh-icon name="error" color="var(--yh-color-danger)" />
  <yh-icon name="info" color="var(--yh-color-info)" />
  <yh-icon name="plus" />
  <yh-icon name="search" />
</template>`
const jsBasic = tsBasic

const tsSize = `<template>
  <yh-icon name="settings" :size="16" />
  <yh-icon name="settings" :size="24" />
  <yh-icon name="settings" :size="32" />
  <yh-icon name="settings" size="3em" />
</template>`
const jsSize = tsSize

const tsSpin = `<template>
  <yh-icon name="loading" spin :size="24" />
  <yh-icon name="settings" spin :size="24" />
</template>`
const jsSpin = tsSpin

const tsCustom = `<template>
  <!-- 直接传入 SVG 字符串 -->
  <yh-icon 
    svg='<path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'
    color="#f56c6c"
    :size="24"
  />
</template>`
const jsCustom = tsCustom

// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="display: flex; gap: 20px; font-size: 24px;">
    <!-- 基础图标，自动导入 -->
    <yh-icon name="user" color="var(--yh-color-primary)" />
    
    <!-- 加载动画图标 -->
    <yh-icon name="loading" spin color="var(--yh-color-info)" />
    
    <!-- 配合 Nuxt 状态 -->
    <yh-icon :name="isConnected ? 'success' : 'error'" :color="isConnected ? 'var(--yh-color-success)' : 'var(--yh-color-danger)'" />
    <yh-button size="small" @click="isConnected = !isConnected">切换演示状态</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhIcon
const isConnected = ref(true)
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

## 不同尺寸

可以通过 `size` 属性来控制图标大小。支持数字（像素）和字符串（CSS 单位）。

<DemoBlock title="不同尺寸" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; gap: 20px; align-items: center; color: var(--yh-text-color-primary);">
    <yh-icon name="settings" :size="16" />
    <yh-icon name="settings" :size="24" />
    <yh-icon name="settings" :size="32" />
    <yh-icon name="settings" size="3em" />
  </div>
</DemoBlock>

## 旋转动画

使用 `spin` 属性可以让图标旋转起来，常用于加载状态。

<DemoBlock title="旋转动画" :ts-code="tsSpin" :js-code="jsSpin">
  <div style="display: flex; gap: 20px; color: var(--yh-text-color-primary);">
    <yh-icon name="loading" spin :size="24" />
    <yh-icon name="settings" spin :size="24" />
  </div>
</DemoBlock>

## 自定义 SVG

支持通过 `svg` 属性直接传入 SVG 的 path 内容或者使用默认插槽。

<DemoBlock title="自定义 SVG" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="display: flex; gap: 20px; color: var(--yh-text-color-primary);">
    <yh-icon 
      svg='<path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'
      color="#f56c6c"
      :size="24"
    />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Icon 组件在 Nuxt 3/4 中集成非常简单。由于 Icon 底层基于轻量的内联 SVG 渲染，SSR 阶段即可生成完整的矢量图形代码。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 20px; font-size: 24px; color: var(--yh-text-color-primary);">
    <yh-icon name="user" color="var(--yh-color-primary)" />
    <yh-icon name="loading" spin color="var(--yh-color-info)" />
    <yh-icon :name="isConnected ? 'success' : 'error'" :color="isConnected ? 'var(--yh-color-success)' : 'var(--yh-color-danger)'" />
    <yh-button size="small" @click="isConnected = !isConnected">切换演示状态</yh-button>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 内置图标在服务端直接渲染为精简的 SVG 路径，无首屏网络请求
- ✅ 尺寸 (size) 和颜色 (color) 通过内联样式在服务端正确定位
- ✅ 加载动画 (spin) 通过 CSS 动画在服务端即保持运动状态（或首屏即准备就绪）
- ✅ 自动导入支持，提升开发效率

::: tip 矢量优势
相比于字体图标（Icon Font），YH-UI 的 SVG Icon 方案更符合现代 Web 标准，且能完美避开 SSR 中常见的字体加载闪烁（FOIT/FOUT）问题。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称（内置图标集） | `string` | — |
| svg | 自定义 SVG 内容 (不含 `<svg>` 标签) | `string` | — |
| size | 图标尺寸 | `number \| string` | — |
| color | 图标颜色 | `string` | `currentColor` |
| spin | 是否循环旋转 | `boolean` | `false` |
| rotate | 旋转角度 | `number` | `0` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义 SVG 内容 |
