# 图标集合介绍

基于 [Iconify](https://icon-sets.iconify.design/) 的高性能图标库，支持 100+ 图标集，按需加载，零运行时开销。

## 特性

- 🚀 **高性能** - 使用 unplugin-icons 实现编译时按需加载
- 📦 **体积小** - Tree-shaking 极致化，只有用到的图标才会被打包
- 🎨 **100+ 图标集** - 整合 Iconify 生态，20 万+ 图标
- 🔧 **完全兼容** - 保持与现有 `YhIcon` 组件 API 兼容
- 🌳 **SSR 支持** - 支持服务端渲染

## 基础用法

使用 `icon` 属性指定图标，格式为 `前缀:图标名`。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; font-size: 24px; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:home" />
    <Icon icon="ep:search" />
    <Icon icon="lucide:check" />
    <Icon icon="tabler:user" />
    <Icon icon="ri:settings" />
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性设置图标尺寸，支持数字和字符串。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; gap: 20px; align-items: center; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:home" :size="16" />
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:home" :size="32" />
    <Icon icon="mdi:home" size="2em" />
  </div>
</DemoBlock>

## 自定义颜色

使用 `color` 属性设置图标颜色。

<DemoBlock title="自定义颜色" :ts-code="tsColors" :js-code="jsColors">
  <div style="display: flex; gap: 20px; font-size: 24px;">
    <Icon icon="mdi:heart" color="#f56c6c" :size="24" />
    <Icon icon="mdi:star" color="#e6a23c" :size="24" />
    <Icon icon="mdi:account" color="#409eff" :size="24" />
    <Icon icon="mdi:check-circle" color="#67c23a" :size="24" />
  </div>
</DemoBlock>

## 旋转动画

使用 `spin` 属性让图标旋转，常用于加载状态。

<DemoBlock title="旋转动画" :ts-code="tsSpin" :js-code="jsSpin">
  <div style="display: flex; gap: 20px; font-size: 24px; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:loading" spin :size="24" />
    <Icon icon="ep:loading" spin :size="24" />
    <Icon icon="lucide:loader-2" spin :size="24" />
  </div>
</DemoBlock>

## 旋转角度

使用 `rotate` 属性设置图标的静态旋转角度。

<DemoBlock title="旋转角度" :ts-code="tsRotate" :js-code="jsRotate">
  <div style="display: flex; gap: 20px; align-items: center; font-size: 24px; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:arrow-right" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="180" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="270" :size="24" />
  </div>
</DemoBlock>

## 为什么选择 Iconify？

### 传统方式的问题

| 方式 | 缺点 |
|------|------|
| 字体图标 (Icon Font) | 需要额外请求字体文件，SSR 不友好，颜色难控制 |
| SVG 文件 | 每个图标都是独立文件，管理困难 |
| 组件库自带图标 | 图标数量有限，扩展困难 |

### Iconify 优势

- **按需加载**：只打包使用的图标，体积最小化
- **统一 API**：不同图标集使用相同接口
- **海量图标**：20 万+ 图标可选
- **Tree-shaking**：自动移除未使用的图标

## 使用方式

### 安装

```bash
npm install @yh-ui/icons
```

### Vue 中使用

```vue
<script setup lang="ts">
import { Icon } from '@yh-ui/icons'
</script>

<template>
  <Icon icon="mdi:home" />
  <Icon icon="ep:search" />
  <Icon icon="mdi:loading" spin />
</template>
```

## 图标集推荐

常用的图标集前缀：

| 前缀 | 图标集 | 图标数量 |
|------|--------|----------|
| `mdi` | Material Design Icons | 6000+ |
| `ep` | Element Plus | 200+ |
| `lucide` | Lucide | 1500+ |
| `tabler` | Tabler Icons | 3000+ |
| `ri` | Remix Icon | 2000+ |
| `bi` | Bootstrap Icons | 1500+ |
| `fxemoji` | Firefox Emoji | 1000+ |

更多图标集请访问 [Iconify 图标库](https://icon-sets.iconify.design/)。

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// 基础用法
const tsBasic = `<template>
  <Icon icon="mdi:home" />
  <Icon icon="ep:search" />
  <Icon icon="lucide:check" />
  <Icon icon="tabler:user" />
  <Icon icon="ri:settings" />
</template>`
const jsBasic = tsBasic

// 不同尺寸
const tsSizes = `<template>
  <Icon icon="mdi:home" :size="16" />
  <Icon icon="mdi:home" :size="24" />
  <Icon icon="mdi:home" :size="32" />
  <Icon icon="mdi:home" size="2em" />
</template>`
const jsSizes = tsSizes

// 自定义颜色
const tsColors = `<template>
  <Icon icon="mdi:heart" color="#f56c6c" :size="24" />
  <Icon icon="mdi:star" color="#e6a23c" :size="24" />
  <Icon icon="mdi:account" color="#409eff" :size="24" />
  <Icon icon="mdi:check-circle" color="#67c23a" :size="24" />
</template>`
const jsColors = tsColors

// 旋转动画
const tsSpin = `<template>
  <Icon icon="mdi:loading" spin :size="24" />
  <Icon icon="ep:loading" spin :size="24" />
  <Icon icon="lucide:loader-2" spin :size="24" />
</template>`
const jsSpin = tsSpin

// 旋转角度
const tsRotate = `<template>
  <Icon icon="mdi:arrow-right" :size="24" />
  <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
  <Icon icon="mdi:arrow-right" :rotate="180" :size="24" />
  <Icon icon="mdi:arrow-right" :rotate="270" :size="24" />
</template>`
const jsRotate = tsRotate
</script>
