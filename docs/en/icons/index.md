# Icon Collection Introduction

A high-performance icon library based on [Iconify](https://icon-sets.iconify.design/), supporting 100+ icon sets with on-demand loading and zero runtime overhead.

## Features

- 🚀 **High Performance** - Uses unplugin-icons for build-time on-demand loading.
- 📦 **Compact Size** - Maximized Tree-shaking; only the icons you use are bundled.
- 🎨 **100+ Icon Sets** - Integrates with the Iconify ecosystem, offering over 200,000 icons.
- 🔧 **Full Compatibility** - Maintains compatibility with the existing `YhIcon` component API.
- 🌳 **SSR Support** - Supports Server-Side Rendering.

## Basic Usage

Specify an icon using the `icon` property in the format `prefix:icon-name`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; font-size: 24px; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:home" />
    <Icon icon="ep:search" />
    <Icon icon="lucide:check" />
    <Icon icon="tabler:user" />
    <Icon icon="ri:settings" />
  </div>
</DemoBlock>

## Different Sizes

Use the `size` property to set the icon dimension, supporting both numbers and strings.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; gap: 20px; align-items: center; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:home" :size="16" />
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:home" :size="32" />
    <Icon icon="mdi:home" size="2em" />
  </div>
</DemoBlock>

## Custom Colors

Use the `color` property to set the icon color.

<DemoBlock title="Custom Colors" :ts-code="tsColors" :js-code="jsColors">
  <div style="display: flex; gap: 20px; font-size: 24px;">
    <Icon icon="mdi:heart" color="#f56c6c" :size="24" />
    <Icon icon="mdi:star" color="#e6a23c" :size="24" />
    <Icon icon="mdi:account" color="#409eff" :size="24" />
    <Icon icon="mdi:check-circle" color="#67c23a" :size="24" />
  </div>
</DemoBlock>

## Spin Animation

Use the `spin` property to rotate the icon, which is commonly used for loading states.

<DemoBlock title="Spin Animation" :ts-code="tsSpin" :js-code="jsSpin">
  <div style="display: flex; gap: 20px; font-size: 24px; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:loading" spin :size="24" />
    <Icon icon="ep:loading" spin :size="24" />
    <Icon icon="lucide:loader-2" spin :size="24" />
  </div>
</DemoBlock>

## Rotation Angle

Use the `rotate` property to set a static rotation angle for the icon.

<DemoBlock title="Rotation Angle" :ts-code="tsRotate" :js-code="jsRotate">
  <div style="display: flex; gap: 20px; align-items: center; font-size: 24px; color: var(--yh-text-color-primary);">
    <Icon icon="mdi:arrow-right" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="180" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="270" :size="24" />
  </div>
</DemoBlock>

## Why Iconify?

### Issues with Traditional Methods

| Method | Disadvantage |
|------|------|
| Icon Font | Requires extra font file requests, SSR-unfriendly, difficult to control colors. |
| SVG Files | Each icon is a separate file, making management difficult. |
| Built-in Component Icons | Limited number of icons, difficult to extend. |

### Advantages of Iconify

- **On-demand Loading**: Bundles only the icons you use, minimizing bundle size.
- **Unified API**: Different icon sets use the same interface.
- **Massive Selection**: Over 200,000 icons available.
- **Tree-shaking**: Automatically removes unused icons.

## Usage

### Installation

```bash
npm install @yh-ui/icons
```

### Usage in Vue

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

## Recommended Icon Sets

Common icon set prefixes:

| Prefix | Icon Set | Icon Count |
|------|--------|----------|
| `mdi` | Material Design Icons | 6000+ |
| `ep` | Element Plus | 200+ |
| `lucide` | Lucide | 1500+ |
| `tabler` | Tabler Icons | 3000+ |
| `ri` | Remix Icon | 2000+ |
| `bi` | Bootstrap Icons | 1500+ |
| `fxemoji` | Firefox Emoji | 1000+ |

For more icon sets, please visit the [Iconify Icon Library](https://icon-sets.iconify.design/).

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// Basic Usage
const tsBasic = `<template>
  <Icon icon="mdi:home" />
  <Icon icon="ep:search" />
  <Icon icon="lucide:check" />
  <Icon icon="tabler:user" />
  <Icon icon="ri:settings" />
</template>`
const jsBasic = tsBasic

// Different Sizes
const tsSizes = `<template>
  <Icon icon="mdi:home" :size="16" />
  <Icon icon="mdi:home" :size="24" />
  <Icon icon="mdi:home" :size="32" />
  <Icon icon="mdi:home" size="2em" />
</template>`
const jsSizes = tsSizes

// Custom Colors
const tsColors = `<template>
  <Icon icon="mdi:heart" color="#f56c6c" :size="24" />
  <Icon icon="mdi:star" color="#e6a23c" :size="24" />
  <Icon icon="mdi:account" color="#409eff" :size="24" />
  <Icon icon="mdi:check-circle" color="#67c23a" :size="24" />
</template>`
const jsColors = tsColors

// Spin Animation
const tsSpin = `<template>
  <Icon icon="mdi:loading" spin :size="24" />
  <Icon icon="ep:loading" spin :size="24" />
  <Icon icon="lucide:loader-2" spin :size="24" />
</template>`
const jsSpin = tsSpin

// Rotation Angle
const tsRotate = `<template>
  <Icon icon="mdi:arrow-right" :size="24" />
  <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
  <Icon icon="mdi:arrow-right" :rotate="180" :size="24" />
  <Icon icon="mdi:arrow-right" :rotate="270" :size="24" />
</template>`
const jsRotate = tsRotate
</script>
