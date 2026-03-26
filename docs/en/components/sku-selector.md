# SKU Selector

A core e-commerce component for product detail pages. It provides **Text / Image / Color** display modes, inventory-linked selection based on a SKU matrix, selected-spec summary, and full CSS theming support.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// ============================================================================
// ── 1. Text Mode ─────────────────────────────────────────────────────────────
// ============================================================================
const basicSelected = ref<Array<string | number>>([])
const basicCurrentSku = ref<{ price: number; stock: number } | null>(null)
const basicSpecs = ref([
  {
    id: 1, name: 'Color', mode: 'text' as const,
    values: [
      { id: 101, name: 'Cardinal Red' },
      { id: 102, name: 'Galaxy Blue' },
      { id: 103, name: 'Winter White' }
    ]
  },
  {
    id: 2, name: 'Size', mode: 'text' as const,
    values: [
      { id: 201, name: 'S', tag: 'Hot' },
      { id: 202, name: 'M' },
      { id: 203, name: 'L' }
    ]
  }
])
const basicSkus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [101, 202], price: 120, stock: 5 },
  { id: 1003, specValueIds: [102, 201], price: 110, stock: 0 },
  { id: 1004, specValueIds: [102, 202], price: 130, stock: 8 }
])
const handleBasicChange = (sku: { price: number; stock: number } | null) => {
  basicCurrentSku.value = sku
}

const tsBasic = `<${_T}>
  <yh-sku-selector
    v-model="selectedIds"
    :specs="specs"
    :skus="skus"
    @change="handleChange"
  />
  <div style="margin-top: 20px; padding: 16px; background: var(--yh-bg-color-soft); border-radius: 8px;">
    <p v-if="currentSku">Price: <yh-price :value="currentSku.price" /></p>
    <p v-else style="color: var(--yh-text-color-secondary);">Please select all specs</p>
    <p>Stock: {{ currentSku?.stock ?? '--' }}</p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const currentSku = ref<{ price: number; stock: number } | null>(null)
const specs = ref([
  {
    id: 1, name: 'Color',
    values: [
      { id: 101, name: 'Cardinal Red' },
      { id: 102, name: 'Galaxy Blue' },
      { id: 103, name: 'Winter White' }
    ]
  },
  {
    id: 2, name: 'Size',
    values: [
      { id: 201, name: 'S', tag: 'Hot' },
      { id: 202, name: 'M' },
      { id: 203, name: 'L' }
    ]
  }
])
const skus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [101, 202], price: 120, stock: 5 },
  { id: 1003, specValueIds: [102, 201], price: 110, stock: 0 },
  { id: 1004, specValueIds: [102, 202], price: 130, stock: 8 }
])
const handleChange = (sku) => { currentSku.value = sku }
</${_S}>`
const jsBasic = toJs(tsBasic)


// ============================================================================
// ── 2. Image Mode ────────────────────────────────────────────────────────────
// ============================================================================
const imageSelected = ref<Array<string | number>>([])
const imageSpecs = ref([
  {
    id: 1, name: 'Color', mode: 'image' as const,
    values: [
      { id: 101, name: 'Red',   image: 'https://picsum.photos/80/80?random=1' },
      { id: 102, name: 'Blue',  image: 'https://picsum.photos/80/80?random=2' },
      { id: 103, name: 'White', image: 'https://picsum.photos/80/80?random=3' }
    ]
  },
  {
    id: 2, name: 'Size', mode: 'text' as const,
    values: [{ id: 201, name: 'S' }, { id: 202, name: 'M' }, { id: 203, name: 'L' }]
  }
])
const imageSkus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [102, 201], price: 110, stock: 0 },
  { id: 1003, specValueIds: [103, 201], price: 90,  stock: 3 }
])

const tsImage = `<${_T}>
  <yh-sku-selector
    v-model="selectedIds"
    :specs="imageSpecs"
    :skus="skus"
    :image-size="80"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const imageSpecs = ref([
  {
    id: 1, name: 'Color', mode: 'image',
    values: [
      { id: 101, name: 'Red',   image: 'https://picsum.photos/80/80?random=1' },
      { id: 102, name: 'Blue',  image: 'https://picsum.photos/80/80?random=2' },
      { id: 103, name: 'White', image: 'https://picsum.photos/80/80?random=3' }
    ]
  },
  {
    id: 2, name: 'Size', mode: 'text',
    values: [{ id: 201, name: 'S' }, { id: 202, name: 'M' }, { id: 203, name: 'L' }]
  }
])
const skus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [102, 201], price: 110, stock: 0 },
  { id: 1003, specValueIds: [103, 201], price: 90,  stock: 3 }
])
</${_S}>`
const jsImage = toJs(tsImage)


// ============================================================================
// ── 3. Color Swatch Mode ─────────────────────────────────────────────────────
// ============================================================================
const colorSelected = ref<Array<string | number>>([])
const colorSpecs = ref([
  {
    id: 1, name: 'Color', mode: 'color' as const,
    values: [
      { id: 101, name: 'Cardinal Red',   color: '#e74c3c' },
      { id: 102, name: 'Galaxy Blue',    color: '#3498db' },
      { id: 103, name: 'Winter White',   color: '#ecf0f1' },
      { id: 104, name: 'Obsidian Black', color: '#2c3e50' }
    ]
  }
])
const colorSkus = ref([
  { id: 1001, specValueIds: [101], price: 100, stock: 5 },
  { id: 1002, specValueIds: [102], price: 100, stock: 0 },
  { id: 1003, specValueIds: [103], price: 100, stock: 8 },
  { id: 1004, specValueIds: [104], price: 100, stock: 3 }
])

const tsColor = `<${_T}>
  <yh-sku-selector v-model="selectedIds" :specs="colorSpecs" :skus="skus" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const colorSpecs = ref([
  {
    id: 1, name: 'Color', mode: 'color',
    values: [
      { id: 101, name: 'Cardinal Red',  color: '#e74c3c' },
      { id: 102, name: 'Galaxy Blue',   color: '#3498db' },
      { id: 103, name: 'Winter White',  color: '#ecf0f1' },
      { id: 104, name: 'Obsidian Black',color: '#2c3e50' }
    ]
  }
])
const skus = ref([
  { id: 1001, specValueIds: [101], price: 100, stock: 5 },
  { id: 1002, specValueIds: [102], price: 100, stock: 0 },
  { id: 1003, specValueIds: [103], price: 100, stock: 8 },
  { id: 1004, specValueIds: [104], price: 100, stock: 3 }
])
</${_S}>`
const jsColor = toJs(tsColor)


// ============================================================================
// ── 4. Summary ───────────────────────────────────────────────────────────────
// ============================================================================
const summarySelected = ref<Array<string | number>>([])
const summarySpecs = ref([
  { id: 1, name: 'Color', values: [{ id: 101, name: 'Red' }, { id: 102, name: 'Blue' }] },
  { id: 2, name: 'Size',  values: [{ id: 201, name: 'S' }, { id: 202, name: 'M' }] }
])
const summarySkus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [102, 201], price: 110, stock: 2 }
])

const tsSummary = `<${_T}>
  <yh-sku-selector
    v-model="selectedIds"
    :specs="specs"
    :skus="skus"
    show-selected-summary
    summary-prefix="Selected"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const specs = ref([
  { id: 1, name: 'Color', values: [{ id: 101, name: 'Red' }, { id: 102, name: 'Blue' }] },
  { id: 2, name: 'Size',  values: [{ id: 201, name: 'S' }, { id: 202, name: 'M' }] }
])
const skus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [102, 201], price: 110, stock: 2 }
])
</${_S}>`
const jsSummary = toJs(tsSummary)


// ============================================================================
// ── 5. Nuxt ──────────────────────────────────────────────────────────────────
// ============================================================================
const nuxtSelected = ref<Array<string | number>>([])
const nuxtSpecs = ref([
  { id: 1, name: 'Color', values: [{ id: 101, name: 'White' }, { id: 102, name: 'Black' }] }
])
const nuxtSkus = ref([
  { id: 1001, specValueIds: [101], price: 80, stock: 10 },
  { id: 1002, specValueIds: [102], price: 80, stock: 5 }
])

const tsNuxt = `<${_T}>
  <yh-sku-selector v-model="selectedIds" :specs="specs" :skus="skus" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const specs = ref([
  { id: 1, name: 'Color', values: [{ id: 101, name: 'White' }, { id: 102, name: 'Black' }] }
])
const skus = ref([
  { id: 1001, specValueIds: [101], price: 80, stock: 10 },
  { id: 1002, specValueIds: [102], price: 80, stock: 5 }
])
</${_S}>`
const jsNuxt = toJs(tsNuxt)

</script>

## Basic Usage

Automatically computes selectable states from selected values. Combinations with zero stock are automatically disabled.

<DemoBlock title="SKU Matrix & Inventory Sync" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-sku-selector
    v-model="basicSelected"
    :specs="basicSpecs"
    :skus="basicSkus"
    @change="handleBasicChange"
  />
  <div style="margin-top: 20px; padding: 16px; background: var(--yh-bg-color-soft); border-radius: 8px;">
    <p v-if="basicCurrentSku">Price: <yh-price :value="basicCurrentSku.price" /></p>
    <p v-else style="color: var(--yh-text-color-secondary);">Please select all specs</p>
    <p>Stock: {{ basicCurrentSku?.stock ?? '--' }}</p>
  </div>
</DemoBlock>

## Image Preview Mode

Pass an `image` field in the spec value with `mode: 'image'` on the spec to render clickable image swatches.

<DemoBlock title="Image Preview Mode" :ts-code="tsImage" :js-code="jsImage">
  <yh-sku-selector
    v-model="imageSelected"
    :specs="imageSpecs"
    :skus="imageSkus"
    :image-size="80"
  />
</DemoBlock>

## Color Swatch Mode

Set `mode: 'color'` and pass a `color` field on each value to render color pickers for fashion/lifestyle products.

<DemoBlock title="Color Swatch Mode" :ts-code="tsColor" :js-code="jsColor">
  <yh-sku-selector
    v-model="colorSelected"
    :specs="colorSpecs"
    :skus="colorSkus"
  />
</DemoBlock>

## Selected Summary

Enable `show-selected-summary` to display a summary of the currently selected specs above the selector, common in e-commerce detail pages.

<DemoBlock title="Selected Spec Summary" :ts-code="tsSummary" :js-code="jsSummary">
  <yh-sku-selector
    v-model="summarySelected"
    :specs="summarySpecs"
    :skus="summarySkus"
    show-selected-summary
    summary-prefix="Selected"
  />
</DemoBlock>

## Usage in Nuxt

`YhSkuSelector` is fully SSR-compatible with Nuxt 3. No extra configuration needed when using the `yh-ui/nuxt` module.

<DemoBlock title="Nuxt Integration" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-sku-selector v-model="nuxtSelected" :specs="nuxtSpecs" :skus="nuxtSkus" />
</DemoBlock>

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['yh-ui/nuxt']
})
```

---

## API

### Props

| Prop                  | Description                            | Type                              | Default              |
| --------------------- | -------------------------------------- | --------------------------------- | -------------------- |
| model-value / v-model | Currently selected spec value IDs      | `Array<string \| number>`         | `[]`                 |
| specs                 | Spec group list                        | `SkuSpec[]`                       | `[]`                 |
| skus                  | SKU combination list                   | `SkuItem[]`                       | `[]`                 |
| check-stock           | Auto-disable items with zero inventory | `boolean`                         | `true`               |
| disabled              | Globally disable the selector          | `boolean`                         | `false`              |
| allow-unselect        | Allow clicking active item to deselect | `boolean`                         | `true`               |
| size                  | Spec button size                       | `'small' \| 'default' \| 'large'` | `'default'`          |
| image-size            | Image size in px (image mode)          | `number`                          | `80`                 |
| show-selected-summary | Display selected spec summary at top   | `boolean`                         | `false`              |
| summary-prefix        | Prefix text for summary label          | `string`                          | `'Already selected'` |
| theme-overrides       | CSS variable overrides                 | `Record<string, string>`          | `{}`                 |

### Events

| Event             | Description                                                          | Callback                                                                  |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| update:modelValue | v-model binding                                                      | `(value: Array<string \| number>) => void`                                |
| change            | Fires on every selection change; `sku` is null if not fully selected | `(sku: SkuItem \| null, selectedValues: Array<string \| number>) => void` |
| select            | Fires on click of any value (including disabled)                     | `(spec: SkuSpec, value: SkuSpecValue) => void`                            |

### Slots

| Slot    | Description                  | Scope                                                                        |
| ------- | ---------------------------- | ---------------------------------------------------------------------------- |
| label   | Custom spec title            | `{ spec: SkuSpec }`                                                          |
| value   | Fully custom spec value cell | `{ value: SkuSpecValue, spec: SkuSpec, active: boolean, disabled: boolean }` |
| summary | Custom selected summary area | `{ summary: string, sku: SkuItem \| null }`                                  |

### SkuSpec Interface

```ts
interface SkuSpec {
  id: string | number
  name: string
  values: SkuSpecValue[]
  /** Display mode: 'text' (default) | 'image' | 'color' */
  mode?: 'text' | 'image' | 'color'
}
```

### SkuSpecValue Interface

```ts
interface SkuSpecValue {
  id: string | number
  name: string
  image?: string // used when mode='image'
  color?: string // used when mode='color'
  disabled?: boolean
  tag?: string // badge label, e.g. "Hot", "New"
  [key: string]: unknown
}
```

### SkuItem Interface

```ts
interface SkuItem {
  id: string | number
  specValueIds: Array<string | number>
  price: number
  stock: number
  marketPrice?: number
  image?: string
  skuNo?: string
  [key: string]: unknown // extensible custom fields
}
```

## Theme Variables

Override the following CSS variables using `theme-overrides`:

| Variable                        | Description                    | Default                            |
| ------------------------------- | ------------------------------ | ---------------------------------- |
| `--yh-sku-label-color`          | Spec title text color          | `var(--yh-text-color-secondary)`   |
| `--yh-sku-label-size`           | Spec title font size           | `var(--yh-font-size-sm)`           |
| `--yh-sku-label-weight`         | Spec title font weight         | `var(--yh-font-weight-medium)`     |
| `--yh-sku-value-bg`             | Default spec cell background   | `var(--yh-fill-color-light)`       |
| `--yh-sku-value-color`          | Default spec cell text color   | `var(--yh-text-color-primary)`     |
| `--yh-sku-value-border`         | Default spec cell border color | `var(--yh-border-color-light)`     |
| `--yh-sku-value-hover-bg`       | Hovered spec cell background   | `var(--yh-fill-color-dark)`        |
| `--yh-sku-value-active-bg`      | Active cell background         | `var(--yh-color-primary-light-9)`  |
| `--yh-sku-value-active-color`   | Active cell text/border color  | `var(--yh-color-primary)`          |
| `--yh-sku-value-active-border`  | Active cell border color       | `var(--yh-color-primary)`          |
| `--yh-sku-value-disabled-bg`    | Disabled cell background       | `var(--yh-fill-color-extra-light)` |
| `--yh-sku-value-disabled-color` | Disabled cell text color       | `var(--yh-text-color-disabled)`    |
| `--yh-sku-value-radius`         | Spec cell border radius        | `var(--yh-radius-base)`            |
| `--yh-sku-img-size`             | Image swatch size              | `80px`                             |
| `--yh-sku-color-swatch-size`    | Color swatch size              | `24px`                             |
| `--yh-sku-gap`                  | Row spacing                    | `var(--yh-spacing-md)`             |
