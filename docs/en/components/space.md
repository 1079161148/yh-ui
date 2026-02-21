# Space

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-space>
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
  </yh-space>
<\/template>`

const jsBasic = tsBasic

const tsVertical = `<template>
  <yh-space direction="vertical">
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
  </yh-space>
<\/template>`

const jsVertical = tsVertical

const tsSize = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-space size="mini">
      <yh-button>Mini 4px</yh-button>
      <yh-button>Mini 4px</yh-button>
    </yh-space>
    <yh-space size="small">
      <yh-button>Small 8px</yh-button>
      <yh-button>Small 8px</yh-button>
    </yh-space>
    <yh-space size="medium">
      <yh-button>Medium 16px</yh-button>
      <yh-button>Medium 16px</yh-button>
    </yh-space>
    <yh-space size="large">
      <yh-button>Large 24px</yh-button>
      <yh-button>Large 24px</yh-button>
    </yh-space>
    <yh-space :size="40">
      <yh-button>Custom 40px</yh-button>
      <yh-button>Custom 40px</yh-button>
    </yh-space>
  </div>
<\/template>`

const jsSize = tsSize

const tsAlignment = `<template>
  <div style="padding: 20px; border: 1px solid #ccc;">
    <yh-space align="center">
      <span>Centered:</span>
      <yh-button>Button</yh-button>
      <div style="height: 60px; width: 60px; background: #eee; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
<\/template>`

const jsAlignment = tsAlignment

const tsJustify = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-space justify="start" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>Start</yh-button>
      <yh-button>Start</yh-button>
    </yh-space>
    <yh-space justify="center" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>Center</yh-button>
      <yh-button>Center</yh-button>
    </yh-space>
    <yh-space justify="end" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>End</yh-button>
      <yh-button>End</yh-button>
    </yh-space>
    <yh-space justify="space-between" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>Between</yh-button>
      <yh-button>Between</yh-button>
    </yh-space>
  </div>
<\/template>`

const jsJustify = tsJustify

const tsWrap = `<template>
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 20" :key="i">Button {{ i }}</yh-button>
  </yh-space>
<\/template>`

const jsWrap = tsWrap

const tsSpacer = `<template>
  <yh-space :size="20">
    <template #spacer>
      <span style="color: #ccc;">|</span>
    </template>
    <yh-button text>Home</yh-button>
    <yh-button text>Products</yh-button>
    <yh-button text>About</yh-button>
  </yh-space>
<\/template>`

const jsSpacer = tsSpacer

const tsFill = `<template>
  <yh-space fill direction="vertical">
    <yh-button>Fill Button 1</yh-button>
    <yh-button>Fill Button 2</yh-button>
    <yh-button>Fill Button 3</yh-button>
  </yh-space>
<\/template>`

const jsFill = tsFill

// Nuxt usage example
const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <!-- Basic spacing, auto-imported -->
    <yh-space>
      <yh-button>Nuxt Button 1</yh-button>
      <yh-button>Nuxt Button 2</yh-button>
      <yh-button>Nuxt Button 3</yh-button>
    </yh-space>

    <!-- Combined with Nuxt reactive layout -->
    <yh-space wrap :size="gap">
      <yh-button v-for="item in items" :key="item">{{ item }}</yh-button>
    </yh-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhSpace / YhButton
const gap = ref(16)
const items = ref(['Home', 'Products', 'Services', 'About Us'])
<\/script>`.replace(/\\\//g, '/')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

Set the spacing between components.

## Basic Usage

Set the spacing between components. Default direction is horizontal, spacing size is `small` (8px).

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-space>
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
  </yh-space>
</DemoBlock>

## Vertical Layout

Set `direction` to `vertical` for vertical layout.

<DemoBlock title="Vertical Layout" :ts-code="tsVertical" :js-code="jsVertical">
  <yh-space direction="vertical">
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
  </yh-space>
</DemoBlock>

## Different Sizes

Set spacing size via `size` prop. Supported values are `mini` (4px), `small` (8px), `medium` (16px), `large` (24px), a custom number (px), or an array `[horizontal, vertical]`.

<DemoBlock title="Different Sizes" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-space size="mini">
      <yh-button>Mini 4px</yh-button>
      <yh-button>Mini 4px</yh-button>
    </yh-space>
    <yh-space size="small">
      <yh-button>Small 8px</yh-button>
      <yh-button>Small 8px</yh-button>
    </yh-space>
    <yh-space size="medium">
      <yh-button>Medium 16px</yh-button>
      <yh-button>Medium 16px</yh-button>
    </yh-space>
    <yh-space size="large">
      <yh-button>Large 24px</yh-button>
      <yh-button>Large 24px</yh-button>
    </yh-space>
    <yh-space :size="40">
      <yh-button>Custom 40px</yh-button>
      <yh-button>Custom 40px</yh-button>
    </yh-space>
  </div>
</DemoBlock>

## Alignment

Set cross-axis alignment via `align` prop.

<DemoBlock title="Alignment" :ts-code="tsAlignment" :js-code="jsAlignment">
  <div style="padding: 20px; border: 1px solid var(--yh-border-color-light);">
    <yh-space align="center">
      <span>Centered:</span>
      <yh-button>Button</yh-button>
      <div style="height: 60px; width: 60px; background: var(--yh-fill-color-light); border-radius: 4px; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
</DemoBlock>

## Justify

Set main-axis alignment via `justify` prop. Works best with `fill` prop enabled.

<DemoBlock title="Justify" :ts-code="tsJustify" :js-code="jsJustify">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-space justify="start" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>Start</yh-button>
      <yh-button>Start</yh-button>
    </yh-space>
    <yh-space justify="center" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>Center</yh-button>
      <yh-button>Center</yh-button>
    </yh-space>
    <yh-space justify="end" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>End</yh-button>
      <yh-button>End</yh-button>
    </yh-space>
    <yh-space justify="space-between" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>Between</yh-button>
      <yh-button>Between</yh-button>
    </yh-space>
  </div>
</DemoBlock>

## Wrap

Set whether to wrap automatically via `wrap` prop.

<DemoBlock title="Wrap" :ts-code="tsWrap" :js-code="jsWrap">
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 20" :key="i">Button {{ i }}</yh-button>
  </yh-space>
</DemoBlock>

## Fill Container

Use the `fill` prop to make the space component fill the parent container width.

<DemoBlock title="Fill Container" :ts-code="tsFill" :js-code="jsFill">
  <yh-space fill direction="vertical">
    <yh-button>Fill Button 1</yh-button>
    <yh-button>Fill Button 2</yh-button>
    <yh-button>Fill Button 3</yh-button>
  </yh-space>
</DemoBlock>

## Spacer

Pass separator text via `spacer` prop, or customize via `#spacer` slot.

<DemoBlock title="Spacer" :ts-code="tsSpacer" :js-code="jsSpacer">
  <yh-space :size="20">
    <template #spacer>
      <span style="color: var(--yh-text-color-placeholder);">|</span>
    </template>
    <yh-button text>Home</yh-button>
    <yh-button text>Products</yh-button>
    <yh-button text>About</yh-button>
  </yh-space>
</DemoBlock>

## Use in Nuxt

The Space component fully supports Nuxt 3/4 SSR rendering. The spacing layout is calculated on the server, ensuring the correct spacing effect is presented on the first screen without waiting for client-side activation.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <yh-space>
      <yh-button>Nuxt Button 1</yh-button>
      <yh-button>Nuxt Button 2</yh-button>
      <yh-button>Nuxt Button 3</yh-button>
    </yh-space>
    <yh-space wrap :size="16">
      <yh-button>Home</yh-button>
      <yh-button>Products</yh-button>
      <yh-button>Services</yh-button>
      <yh-button>About Us</yh-button>
    </yh-space>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Spacing direction (direction), size (size), and alignment (align) take effect on initial render
- ✅ Auto wrap (wrap) and fill supported in SSR
- ✅ Spacer content renders correctly on the server
- 💡 Dynamic spacing changes will be automatically completed through the reactive system after client-side activation

::: tip Nuxt Auto Import
After installing the `@yh-ui/nuxt` module, the `YhSpace` component is auto-registered, no manual import needed.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Spacing direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | Spacing size | `'mini' \| 'small' \| 'medium' \| 'large' \| number \| [SpaceSize, SpaceSize]` | `'small'` |
| align | Cross-axis alignment | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` |
| justify | Main-axis alignment | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| wrap | Whether to wrap (horizontal only) | `boolean` | `false` |
| fill | Whether to fill parent container | `boolean` | `false` |
| spacer | Spacer text | `string \| number` | — |
| theme-overrides | Theme override variables | `ComponentThemeVars` | — |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Child elements in the space |
| spacer | Custom spacer content |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-space-spacer-padding` | Spacer padding | `2px` |
