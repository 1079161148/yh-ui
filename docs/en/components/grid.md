# Grid

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-grid :cols="3" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">1</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">2</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">3</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsBasic = tsBasic

const tsSpan = `<template>
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">span=2</div>
    </yh-grid-item>
    <yh-grid-item :span="3">
      <div class="grid-demo-item">span=3</div>
    </yh-grid-item>
    <yh-grid-item :span="1">
      <div class="grid-demo-item">span=1</div>
    </yh-grid-item>
    <yh-grid-item :span="6">
      <div class="grid-demo-item">span=6 (full row)</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsSpan = tsSpan

const tsOffset = `<template>
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">A</div>
    </yh-grid-item>
    <yh-grid-item :span="2" :offset="2">
      <div class="grid-demo-item">B (offset=2)</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsOffset = tsOffset

const tsGap = `<template>
  <yh-grid :cols="4" :gap="[8, 24]">
    <yh-grid-item v-for="i in 8" :key="i">
      <div class="grid-demo-item">{{ i }}</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsGap = tsGap

const tsCustomCols = `<template>
  <yh-grid cols="200px 1fr 200px" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">1fr</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsCustomCols = tsCustomCols

const tsSuffix = `<template>
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">Content</div>
    </yh-grid-item>
    <yh-grid-item suffix>
      <div class="grid-demo-item">Suffix</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsSuffix = tsSuffix

// Nuxt usage example
const tsNuxt = `<template>
  <div>
    <!-- Grid layout for product cards, auto-imported in Nuxt -->
    <yh-typography-title :level="3">Product List</yh-typography-title>

    <yh-grid :cols="4" :gap="16" style="margin-top: 16px;">
      <yh-grid-item v-for="item in products" :key="item.id">
        <div class="product-card">
          <yh-typography-title :level="5">{{ item.name }}</yh-typography-title>
          <yh-typography-text type="danger">$ {{ item.price }}</yh-typography-text>
        </div>
      </yh-grid-item>
    </yh-grid>
  </div>
<\/template>

<script setup lang="ts">
// Components auto-imported in Nuxt, no manual registration needed
interface Product {
  id: number
  name: string
  price: number
}

// Fetch products from API using useFetch
const { data } = await useFetch<{ items: Product[] }>('/api/products')
const products = computed(() => data.value?.items ?? [])
<\/script>

<style scoped>
.product-card {
  padding: 16px;
  border: 1px solid var(--yh-border-color, #dcdfe6);
  border-radius: 4px;
}
<\/style>`

const jsNuxt = tsNuxt
  .replace('lang="ts"', '')
  .replace(/interface Product \{[\s\S]*?\}\n\n/, '')
  .replace('<{ items: Product[] }>', '')
</script>

<style>
.grid-demo-item {
  background: var(--yh-color-primary-light-8, #d9ecff);
  color: var(--yh-color-primary, #409eff);
  padding: 16px;
  text-align: center;
  border-radius: 4px;
  font-weight: 500;
}
.grid-demo-product-card {
  padding: 16px;
  border: 1px solid var(--yh-border-color, #dcdfe6);
  border-radius: 4px;
}
</style>

Based on CSS Grid, this layout component offers powerful 2D layout capabilities compared to Row/Col Flex layouts.

## Basic Usage

Set `cols` to define columns and `gap` for spacing.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-grid :cols="3" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">1</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">2</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">3</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## Column Span

Use `span` to set how many columns a GridItem spans.

<DemoBlock title="Column Span" :ts-code="tsSpan" :js-code="jsSpan">
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">span=2</div>
    </yh-grid-item>
    <yh-grid-item :span="3">
      <div class="grid-demo-item">span=3</div>
    </yh-grid-item>
    <yh-grid-item :span="1">
      <div class="grid-demo-item">span=1</div>
    </yh-grid-item>
    <yh-grid-item :span="6">
      <div class="grid-demo-item">span=6 (full row)</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## Offset

Use `offset` to set column offset.

<DemoBlock title="Offset" :ts-code="tsOffset" :js-code="jsOffset">
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">A</div>
    </yh-grid-item>
    <yh-grid-item :span="2" :offset="2">
      <div class="grid-demo-item">B (offset=2)</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## Different Gaps

`gap` accepts an array `[rowGap, colGap]` for separate row and column gaps.

<DemoBlock title="Different Gaps" :ts-code="tsGap" :js-code="jsGap">
  <yh-grid :cols="4" :gap="[8, 24]">
    <yh-grid-item v-for="i in 8" :key="i">
      <div class="grid-demo-item">{{ i }}</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## Custom Column Template

When `cols` is a string, it's used directly as CSS `grid-template-columns` value.

<DemoBlock title="Custom Column Template" :ts-code="tsCustomCols" :js-code="jsCustomCols">
  <yh-grid cols="200px 1fr 200px" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">1fr</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## Suffix Element

Set `suffix` to pin a GridItem to the end of the row.

<DemoBlock title="Suffix Element" :ts-code="tsSuffix" :js-code="jsSuffix">
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">Content</div>
    </yh-grid-item>
    <yh-grid-item suffix>
      <div class="grid-demo-item">Suffix</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## Use in Nuxt

Grid fully supports Nuxt 3/4 SSR rendering. The example below demonstrates a product list page using Grid layout with `useFetch` for async data loading.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <yh-typography-title :level="3">Product List</yh-typography-title>
    <yh-grid :cols="4" :gap="16" style="margin-top: 16px;">
      <yh-grid-item v-for="i in 4" :key="i">
        <div class="grid-demo-product-card">
          <yh-typography-title :level="5">Product {{ i }}</yh-typography-title>
          <yh-typography-text type="danger">$ {{ (i * 99.9).toFixed(1) }}</yh-typography-text>
        </div>
      </yh-grid-item>
    </yh-grid>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ All Props and styles fully supported
- ✅ CSS Grid layout renders correctly
- ✅ Slot content renders completely
- ✅ String `cols` template mode outputs correctly
- ✅ `span`, `offset`, `suffix` positioning props work perfectly

::: tip SSR Safety
Grid component has passed complete SSR tests, ensuring consistent rendering between server and client with no Hydration errors.
:::

## API

### Grid Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| cols | Columns count or CSS template | `number \| string` | `12` |
| gap | Gap | `number \| string \| [number \| string, number \| string]` | `0` |
| colGap | Column gap (overrides gap) | `number \| string` | `0` |
| rowGap | Row gap (overrides gap) | `number \| string` | `0` |
| collapsed | Collapsed | `boolean` | `false` |
| collapsedRows | Collapsed visible rows | `number` | `1` |
| justifyItems | Horizontal alignment | `'start' \| 'end' \| 'center' \| 'stretch'` | — |
| alignItems | Vertical alignment | `'start' \| 'end' \| 'center' \| 'stretch'` | — |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### GridItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Column span | `number` | `1` |
| offset | Column offset | `number` | `0` |
| suffix | Suffix element (pinned to row end) | `boolean` | `false` |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Slots

Both Grid and GridItem support the `default` slot.

## Theme Variables

Grid component supports the following CSS variables for theme customization:

### Grid Variables

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-grid-gap` | Grid gap | `0` |
| `--yh-grid-col-gap` | Grid column gap | `var(--yh-grid-gap, 0)` |
| `--yh-grid-row-gap` | Grid row gap | `var(--yh-grid-gap, 0)` |

### GridItem Variables

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-grid-item-padding` | Item padding | `0` |
