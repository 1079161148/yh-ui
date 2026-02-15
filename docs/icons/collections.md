# 图标集

YH-UI 图标集合支持 100+ 图标集，以下是常用图标集的详细介绍。

## 常用图标集对比

| 图标集 | 前缀 | 图标数量 | 风格特点 | 推荐场景 |
|--------|------|----------|----------|----------|
| Material Design Icons | `mdi` | 7000+ | Material Design 风格 | 通用应用 |
| Element Plus | `ep` | 200+ | 简洁现代 | 后台管理系统 |
| Lucide | `lucide` | 1500+ | 线条风格 | 现代 Web 应用 |
| Tabler Icons | `tabler` | 4600+ | 线条/填充 | 仪表盘/Admin |
| Remix Icon | `ri` | 2500+ | 线条风格 | 移动应用/轻量级 |
| Heroicons | `heroicons` | 600+ | 线条/填充 | Tailwind 项目 |
| Bootstrap Icons | `bi` | 2600+ | Bootstrap 风格 | Bootstrap 项目 |
| Font Awesome 6 | `fa` | 2000+ | 多种风格 | 通用 |

## 图标集详解

### Material Design Icons (mdi)

最流行的开源图标库，提供 7000+ 图标。

<DemoBlock title="Material Design Icons" :ts-code="tsMdi" :js-code="jsMdi">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:account" :size="24" />
    <Icon icon="mdi:cog" :size="24" />
    <Icon icon="mdi:heart" :size="24" />
    <Icon icon="mdi:star" :size="24" />
  </div>
</DemoBlock>

**特点**：
- 图标数量最多，覆盖面广
- 风格统一，符合 Material Design 规范
- 社区活跃，持续更新

### Element Plus (ep)

Element Plus 官方图标集，简洁现代。

<DemoBlock title="Element Plus" :ts-code="tsEp" :js-code="jsEp">
  <div class="icon-demo">
    <Icon icon="ep:search" :size="24" />
    <Icon icon="ep:edit" :size="24" />
    <Icon icon="ep:delete" :size="24" />
    <Icon icon="ep:plus" :size="24" />
    <Icon icon="ep:check" :size="24" />
  </div>
</DemoBlock>

**特点**：
- 与 Element Plus 组件风格一致
- 适合后台管理系统
- 图标数量适中

### Lucide

现代简洁的线条风格图标库。

<DemoBlock title="Lucide" :ts-code="tsLucide" :js-code="jsLucide">
  <div class="icon-demo">
    <Icon icon="lucide:home" :size="24" />
    <Icon icon="lucide:settings" :size="24" />
    <Icon icon="lucide:user" :size="24" />
    <Icon icon="lucide:search" :size="24" />
    <Icon icon="lucide:check-circle" :size="24" />
  </div>
</DemoBlock>

**特点**：
- 线条粗细统一，视觉整洁
- 适合现代简约风格项目
- 支持自定义线条粗细

### Tabler Icons

高质量 SVG 图标库，提供 4600+ 图标。

<DemoBlock title="Tabler Icons" :ts-code="tsTabler" :js-code="jsTabler">
  <div class="icon-demo">
    <Icon icon="tabler:home" :size="24" />
    <Icon icon="tabler:user" :size="24" />
    <Icon icon="tabler:settings" :size="24" />
    <Icon icon="tabler:bell" :size="24" />
    <Icon icon="tabler:calendar" :size="24" />
  </div>
</DemoBlock>

**特点**：
- 图标丰富多样
- 同时提供线条和填充两种风格
- 适合各类 Web 应用

### Remix Icon

精心设计的图标库，风格统一。

<DemoBlock title="Remix Icon" :ts-code="tsRi" :js-code="jsRi">
  <div class="icon-demo">
    <Icon icon="ri:home-line" :size="24" />
    <Icon icon="ri:user-line" :size="24" />
    <Icon icon="ri:settings-3-line" :size="24" />
    <Icon icon="ri:search-line" :size="24" />
    <Icon icon="ri:add-line" :size="24" />
  </div>
</DemoBlock>

**特点**：
- 线条风格为主
- 图标命名规范
- 适合需要精细图标的项目

### Heroicons

Tailwind CSS 官方图标库。

<DemoBlock title="Heroicons" :ts-code="tsHeroicons" :js-code="jsHeroicons">
  <div class="icon-demo">
    <Icon icon="heroicons:home" :size="24" />
    <Icon icon="heroicons:user" :size="24" />
    <Icon icon="heroicons:cog-6-tooth" :size="24" />
    <Icon icon="heroicons:bell" :size="24" />
    <Icon icon="heroicons:plus" :size="24" />
  </div>
</DemoBlock>

**特点**：
- Tailwind CSS 官方推荐
- 线条和填充两种风格可选
- 适合 Tailwind 项目

### Bootstrap Icons

Bootstrap 官方图标库。

<DemoBlock title="Bootstrap Icons" :ts-code="tsBi" :js-code="jsBi">
  <div class="icon-demo">
    <Icon icon="bi:house" :size="24" />
    <Icon icon="bi:person" :size="24" />
    <Icon icon="bi:gear" :size="24" />
    <Icon icon="bi:bell" :size="24" />
    <Icon icon="bi:plus-lg" :size="24" />
  </div>
</DemoBlock>

**特点**：
- Bootstrap 官方图标
- 适合 Bootstrap 项目
- 图标风格与 Bootstrap 组件一致

### Font Awesome 6

最流行的图标字体库。

<DemoBlock title="Font Awesome 6" :ts-code="tsFa" :js-code="jsFa">
  <div class="icon-demo">
    <Icon icon="fa:home" :size="24" />
    <Icon icon="fa:user" :size="24" />
    <Icon icon="fa:cog" :size="24" />
    <Icon icon="fa:bell" :size="24" />
    <Icon icon="fa:plus" :size="24" />
  </div>
</DemoBlock>

**特点**：
- 历史悠久，生态丰富
- 提供 Free 和 Pro 版本
- 支持多种风格（Solid, Regular, Brands）

## 选择建议

### 根据项目类型选择

| 项目类型 | 推荐图标集 |
|----------|------------|
| 后台管理系统 | `ep` + `mdi` |
| 现代 Web 应用 | `lucide` + `tabler` |
| 移动应用 | `ri` + `heroicons` |
| Tailwind 项目 | `heroicons` |
| Bootstrap 项目 | `bi` |
| 通用/不确定 | `mdi` (最全) |

### 根据风格选择

| 风格 | 推荐图标集 |
|------|------------|
| Material Design | `mdi` |
| 简洁现代 | `ep`, `lucide` |
| 线条风格 | `lucide`, `ri`, `tabler` |
| 填充风格 | `mdi`, `heroicons`, `tabler` |
| Bootstrap 风格 | `bi`, `fa` |

## 图标集前缀映射

```typescript
// 常用前缀别名
const PREFIX_ALIAS = {
  // Material Design Icons
  'mdi': 'mdi',
  
  // Element Plus
  'ep': 'ep',
  'element-plus': 'ep',
  
  // Lucide
  'lucide': 'lucide',
  
  // Tabler
  'tabler': 'tabler',
  
  // Remix Icon
  'ri': 'ri',
  'remix': 'ri',
  
  // Heroicons
  'heroicons': 'heroicons',
  'hero': 'heroicons',
  
  // Bootstrap
  'bi': 'bi',
  'bootstrap': 'bi',
  
  // Font Awesome
  'fa': 'fa',
  'font-awesome': 'fa',
  
  // Carbon
  'carbon': 'carbon',
  
  // Ant Design
  'antd': 'antd',
  'ant-design': 'antd'
}
```

## 在线资源

- [Iconify 图标库](https://icon-sets.iconify.desearch/) - 浏览和搜索所有图标
- [Icônes](https://icones.js.org/) - 图标浏览器，支持预览
- [Material Design Icons](https://pictogrammers.com/library/mdi/) - MDI 图标库
- [Heroicons](https://heroicons.com/) - Heroicons 官网
- [Lucide](https://lucide.dev/) - Lucide 图标库

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// Material Design Icons
const tsMdi = `<template>
  <Icon icon="mdi:home" />
  <Icon icon="mdi:account" />
  <Icon icon="mdi:cog" />
  <Icon icon="mdi:heart" />
  <Icon icon="mdi:star" />
</template>`
const jsMdi = tsMdi

// Element Plus
const tsEp = `<template>
  <Icon icon="ep:search" />
  <Icon icon="ep:edit" />
  <Icon icon="ep:delete" />
  <Icon icon="ep:plus" />
  <Icon icon="ep:check" />
</template>`
const jsEp = tsEp

// Lucide
const tsLucide = `<template>
  <Icon icon="lucide:home" />
  <Icon icon="lucide:settings" />
  <Icon icon="lucide:user" />
  <Icon icon="lucide:search" />
  <Icon icon="lucide:check-circle" />
</template>`
const jsLucide = tsLucide

// Tabler Icons
const tsTabler = `<template>
  <Icon icon="tabler:home" />
  <Icon icon="tabler:user" />
  <Icon icon="tabler:settings" />
  <Icon icon="tabler:bell" />
  <Icon icon="tabler:calendar" />
</template>`
const jsTabler = tsTabler

// Remix Icon
const tsRi = `<template>
  <Icon icon="ri:home-line" />
  <Icon icon="ri:user-line" />
  <Icon icon="ri:settings-3-line" />
  <Icon icon="ri:search-line" />
  <Icon icon="ri:add-line" />
</template>`
const jsRi = tsRi

// Heroicons
const tsHeroicons = `<template>
  <Icon icon="heroicons:home" />
  <Icon icon="heroicons:user" />
  <Icon icon="heroicons:cog-6-tooth" />
  <Icon icon="heroicons:bell" />
  <Icon icon="heroicons:plus" />
</template>`
const jsHeroicons = tsHeroicons

// Bootstrap Icons
const tsBi = `<template>
  <Icon icon="bi:house" />
  <Icon icon="bi:person" />
  <Icon icon="bi:gear" />
  <Icon icon="bi:bell" />
  <Icon icon="bi:plus-lg" />
</template>`
const jsBi = tsBi

// Font Awesome
const tsFa = `<template>
  <Icon icon="fa:home" />
  <Icon icon="fa:user" />
  <Icon icon="fa:cog" />
  <Icon icon="fa:bell" />
  <Icon icon="fa:plus" />
</template>`
const jsFa = tsFa
</script>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 24px;
  color: var(--yh-text-color-primary);
}
</style>
