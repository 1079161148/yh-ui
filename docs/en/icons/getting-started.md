# Quick Start

Learn how to install and configure the `@yh-ui/icons` icon library.

## Installation

```bash
# Using pnpm
pnpm add @yh-ui/icons @iconify/vue

# Using npm
npm install @yh-ui/icons @iconify/vue

# Using yarn
yarn add @yh-ui/icons @iconify/vue
```

## Configure Vite

To achieve on-demand loading and optimal performance, configure `unplugin-icons` in your `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { collections } from '@iconify/json'

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      // Automatically install icon sets
      autoInstall: true,
      // Enable required icon sets
      collections: {
        mdi: collections.get('mdi'),     // Material Design Icons
        ep: collections.get('ep'),       // Element Plus
        lucide: collections.get('lucide'), // Lucide
        tabler: collections.get('tabler'), // Tabler Icons
        ri: collections.get('ri'),       // Remix Icon
      }
    })
  ]
})
```

## Usage

### Basic Usage

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="ep:search" :size="24" />
    <Icon icon="lucide:check" :size="24" />
  </div>
</DemoBlock>

### Props

| Property | Type | Default | Description |
|------|------|--------|------|
| `name` | `string` | `''` | Icon name, supports the `prefix:icon-name` format. |
| `icon` | `string` | `''` | Icon name (equivalent to `name`, but with higher priority). |
| `size` | `number \| string` | `undefined` | Icon size, e.g., `24` or `'2em'`. |
| `color` | `string` | `undefined` | Icon color, e.g., `'#409EFF'` or `'red'`. |
| `spin` | `boolean` | `false` | Whether to show a spin animation. |
| `rotate` | `number` | `0` | Rotation angle; options include `90`, `180`, `270`. |

### Icon Name Formats

Supports multiple icon name formats:

<DemoBlock title="Icon Name Formats" :ts-code="tsNameFormat" :js-code="jsNameFormat">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:arrow-right" :size="24" />
  </div>
</DemoBlock>

### Example: Common Icons

<DemoBlock title="Common Icons" :ts-code="tsCommon" :js-code="jsCommon">
  <div class="icon-demo">
    <Icon icon="mdi:arrow-up" :size="24" />
    <Icon icon="mdi:arrow-down" :size="24" />
    <Icon icon="mdi:arrow-left" :size="24" />
    <Icon icon="mdi:arrow-right" :size="24" />
    <Icon icon="ep:search" :size="24" />
    <Icon icon="ep:edit" :size="24" />
    <Icon icon="ep:delete" :size="24" />
    <Icon icon="ep:plus" :size="24" />
    <Icon icon="lucide:check-circle" color="#67C23A" :size="24" />
    <Icon icon="lucide:alert-circle" color="#E6A23C" :size="24" />
    <Icon icon="lucide:x-circle" color="#F56C6C" :size="24" />
    <Icon icon="lucide:info" color="#409EFF" :size="24" />
  </div>
</DemoBlock>

### Custom Size and Color

<DemoBlock title="Custom Size and Color" :ts-code="tsSizeColor" :js-code="jsSizeColor">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="16" />
    <Icon icon="mdi:home" :size="32" color="#409EFF" />
    <Icon icon="mdi:home" size="2em" />
  </div>
</DemoBlock>

### Rotation and Animation

<DemoBlock title="Rotation and Animation" :ts-code="tsRotate" :js-code="jsRotate">
  <div class="icon-demo">
    <Icon icon="mdi:loading" spin :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="90" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="180" :size="24" />
    <Icon icon="mdi:arrow-right" :rotate="270" :size="24" />
  </div>
</DemoBlock>

## Advantages of On-demand Loading

### Performance Comparison

| Import Method | Bundle Size | Request Count |
|----------|----------|----------|
| Full Import (All Icons) | ~500KB+ | 0 (Built-in) |
| On-demand Loading (Used Icons Only) | ~5-20KB | 0 (At Build-time) |

### How It Works

1. **Development**: Only icons used in the code are loaded.
2. **Production**: Only the SVG code for icons actually used is bundled.
3. **Tree-shaking**: Unused icons are completely removed.

### Example Result

```typescript
// If you only use these icons
import { Icon } from '@yh-ui/icons/vue'

// After compilation, it will only include the SVG code for these 3 icons
<Icon name="mdi:home" />
<Icon name="ep:search" />
<Icon name="lucide:settings" />
```

## FAQ

### 1. Icons Not Showing?

Ensure:
1. Icon sets are enabled in `vite.config.ts`.
2. The icon name format is correct (e.g., `mdi:home`).
3. The `@iconify/vue` dependency is installed.

### 2. How to Search for Icons?

Visit the [Iconify Icon Library](https://icon-sets.iconify.design/) to search for icons.

### 3. Performance Optimization Suggestions

- Only enable the icon sets your project needs.
- Use Tree-shaking friendly import methods.
- Avoid dynamic icon name concatenation.

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// Basic Usage
const tsBasic = `<template>
  <Icon icon="mdi:home" />
  <Icon icon="ep:search" />
  <Icon icon="lucide:check" />
</template>`
const jsBasic = tsBasic

// Icon Name Formats
const tsNameFormat = `<template>
  <!-- 1. prefix:icon-name (Recommended) -->
  <Icon icon="mdi:home" />

  <!-- 2. Slash separator (Iconify compatible) -->
  <Icon icon="mdi/home" />
</template>`
const jsNameFormat = tsNameFormat

// Common Icons
const tsCommon = `<template>
  <!-- Arrow Icons -->
  <Icon icon="mdi:arrow-up" />
  <Icon icon="mdi:arrow-down" />
  <Icon icon="mdi:arrow-left" />
  <Icon icon="mdi:arrow-right" />

  <!-- Action Icons -->
  <Icon icon="ep:search" />
  <Icon icon="ep:edit" />
  <Icon icon="ep:delete" />
  <Icon icon="ep:plus" />

  <!-- Status Icons -->
  <Icon icon="lucide:check-circle" color="#67C23A" />
  <Icon icon="lucide:alert-circle" color="#E6A23C" />
  <Icon icon="lucide:x-circle" color="#F56C6C" />
  <Icon icon="lucide:info" color="#409EFF" />
</template>`
const jsCommon = tsCommon

// Custom Size and Color
const tsSizeColor = `<template>
  <!-- Small Icon -->
  <Icon icon="mdi:home" :size="16" />

  <!-- Large Icon -->
  <Icon icon="mdi:home" :size="32" color="#409EFF" />

  <!-- Using CSS Units -->
  <Icon icon="mdi:home" size="2em" />
</template>`
const jsSizeColor = tsSizeColor

// Rotation and Animation
const tsRotate = `<template>
  <!-- Spin Animation -->
  <Icon icon="mdi:loading" spin />

  <!-- Static Rotation -->
  <Icon icon="mdi:arrow-right" :rotate="90" />
  <Icon icon="mdi:arrow-right" :rotate="180" />
  <Icon icon="mdi:arrow-right" :rotate="270" />
</template>`
const jsRotate = tsRotate
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
