# Icon

Semantic vector graphics.

## Basic Usage

Use the `name` attribute to specify the icon.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
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
  <!-- Pass SVG string directly -->
  <yh-icon 
    svg='<path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'
    color="#f56c6c"
    :size="24"
  />
</template>`
const jsCustom = tsCustom

// Nuxt usage example
const tsNuxt = `<template>
  <div style="display: flex; gap: 20px; font-size: 24px;">
    <!-- Basic icon, auto-imported -->
    <yh-icon name="user" color="var(--yh-color-primary)" />
    
    <!-- Loading animation icon -->
    <yh-icon name="loading" spin color="var(--yh-color-info)" />
    
    <!-- Use with Nuxt state -->
    <yh-icon :name="isConnected ? 'success' : 'error'" :color="isConnected ? 'var(--yh-color-success)' : 'var(--yh-color-danger)'" />
    <yh-button size="small" @click="isConnected = !isConnected">Toggle Demo State</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhIcon
const isConnected = ref(true)
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

## Different Sizes

You can control the icon size via the `size` attribute. Supports numbers (pixels) and strings (CSS units).

<DemoBlock title="Different Sizes" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; gap: 20px; align-items: center; color: var(--yh-text-color-primary);">
    <yh-icon name="settings" :size="16" />
    <yh-icon name="settings" :size="24" />
    <yh-icon name="settings" :size="32" />
    <yh-icon name="settings" size="3em" />
  </div>
</DemoBlock>

## Spin Animation

The `spin` attribute can be used to make the icon rotate, commonly used for loading states.

<DemoBlock title="Spin Animation" :ts-code="tsSpin" :js-code="jsSpin">
  <div style="display: flex; gap: 20px; color: var(--yh-text-color-primary);">
    <yh-icon name="loading" spin :size="24" />
    <yh-icon name="settings" spin :size="24" />
  </div>
</DemoBlock>

## Custom SVG

Supports passing SVG path content directly via the `svg` attribute or using the default slot.

<DemoBlock title="Custom SVG" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="display: flex; gap: 20px; color: var(--yh-text-color-primary);">
    <yh-icon 
      svg='<path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'
      color="#f56c6c"
      :size="24"
    />
  </div>
</DemoBlock>

## Use in Nuxt

Icon component integration in Nuxt 3/4 is very simple. Since the Icon is based on lightweight inline SVG rendering, the complete vector graphics code can be generated during the SSR phase.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 20px; font-size: 24px; color: var(--yh-text-color-primary);">
    <yh-icon name="user" color="var(--yh-color-primary)" />
    <yh-icon name="loading" spin color="var(--yh-color-info)" />
    <yh-icon :name="isConnected ? 'success' : 'error'" :color="isConnected ? 'var(--yh-color-success)' : 'var(--yh-color-danger)'" />
    <yh-button size="small" @click="isConnected = !isConnected">Toggle Demo State</yh-button>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Built-in icons are rendered directly on the server as concise SVG paths, no network requests on first screen.
- ✅ Size and color are correctly positioned on the server via inline styles.
- ✅ Spin animation is kept in motion (or ready on first screen) on the server via CSS animation.
- ✅ Auto-import support enhances development efficiency.

::: tip Vector Benefits
Compared to icon fonts, YH-UI's SVG Icon solution is more in line with modern web standards and avoids common font loading flicker (FOIT/FOUT) issues in SSR.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| name | Icon name (built-in set) | `string` | — |
| svg | Custom SVG content (excluding `<svg>` tag) | `string` | — |
| size | Icon size | `number \| string` | — |
| color | Icon color | `string` | `currentColor` |
| spin | Whether to spin in a loop | `boolean` | `false` |
| rotate | Rotation angle | `number` | `0` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Custom SVG content |
