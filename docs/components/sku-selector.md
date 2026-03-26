# SKU Selector 规格选择器

电商核心组件，用于商品详情页的规格选择。内置「文字 / 图片 / 色块」三种展示模态、基于 SKU 矩阵的库存联动算法、已选汇总展示及完整的主题自定义能力。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// ============================================================================
// ── 1. 基础文字 ────────────────────────────────────────────────────────────
// ============================================================================
const basicSelected = ref<Array<string | number>>([])
const basicCurrentSku = ref<{ price: number; stock: number } | null>(null)
const basicSpecs = ref([
  {
    id: 1, name: '颜色', mode: 'text' as const,
    values: [
      { id: 101, name: '中国红' },
      { id: 102, name: '星际蓝' },
      { id: 103, name: '冬日白' }
    ]
  },
  {
    id: 2, name: '尺寸', mode: 'text' as const,
    values: [
      { id: 201, name: 'S', tag: '热卖' },
      { id: 202, name: 'M' },
      { id: 203, name: 'L' }
    ]
  }
])
const basicSkus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [101, 202], price: 120, stock: 5 },
  { id: 1003, specValueIds: [102, 201], price: 110, stock: 0 },
  { id: 1004, specValueIds: [102, 202], price: 130, stock: 8 },
  { id: 1005, specValueIds: [103, 201], price: 90,  stock: 3 },
  { id: 1006, specValueIds: [103, 203], price: 95,  stock: 0 }
])
const handleBasicChange = (sku: { price: number; stock: number } | null, vals: Array<string | number>) => {
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
    <p v-if="currentSku">当前渲染价格：<yh-price :value="currentSku.price" /></p>
    <p v-else style="color: var(--yh-text-color-secondary);">当前价格：请选择完整规格</p>
    <p>当前库存: {{ currentSku?.stock ?? '--' }}</p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const currentSku = ref<{ price: number; stock: number } | null>(null)
const specs = ref([
  {
    id: 1, name: '颜色',
    values: [
      { id: 101, name: '中国红' },
      { id: 102, name: '星际蓝' },
      { id: 103, name: '冬日白' }
    ]
  },
  {
    id: 2, name: '尺寸',
    values: [
      { id: 201, name: 'S', tag: '热卖' },
      { id: 202, name: 'M' },
      { id: 203, name: 'L' }
    ]
  }
])
const skus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [101, 202], price: 120, stock: 5 },
  { id: 1003, specValueIds: [102, 201], price: 110, stock: 0 },
  { id: 1004, specValueIds: [102, 202], price: 130, stock: 8 },
  { id: 1005, specValueIds: [103, 201], price: 90,  stock: 3 },
  { id: 1006, specValueIds: [103, 203], price: 95,  stock: 0 }
])
const handleChange = (sku, vals) => {
  currentSku.value = sku
}
</${_S}>`
const jsBasic = toJs(tsBasic)


// ============================================================================
// ── 2. 图片规格 ────────────────────────────────────────────────────────────
// ============================================================================
const imageSelected = ref<Array<string | number>>([])
const imageSpecs = ref([
  {
    id: 1, name: '颜色', mode: 'image' as const,
    values: [
      { id: 101, name: '红色', image: 'https://picsum.photos/80/80?random=1' },
      { id: 102, name: '蓝色', image: 'https://picsum.photos/80/80?random=2' },
      { id: 103, name: '白色', image: 'https://picsum.photos/80/80?random=3' }
    ]
  },
  {
    id: 2, name: '尺寸', mode: 'text' as const,
    values: [
      { id: 201, name: 'S' }, { id: 202, name: 'M' }, { id: 203, name: 'L' }
    ]
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
    id: 1, name: '颜色', mode: 'image',
    values: [
      { id: 101, name: '红色', image: 'https://picsum.photos/80/80?random=1' },
      { id: 102, name: '蓝色', image: 'https://picsum.photos/80/80?random=2' },
      { id: 103, name: '白色', image: 'https://picsum.photos/80/80?random=3' }
    ]
  },
  {
    id: 2, name: '尺寸', mode: 'text',
    values: [
      { id: 201, name: 'S' }, { id: 202, name: 'M' }, { id: 203, name: 'L' }
    ]
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
// ── 3. 色块规格 ────────────────────────────────────────────────────────────
// ============================================================================
const colorSelected = ref<Array<string | number>>([])
const colorSpecs = ref([
  {
    id: 1, name: '颜色', mode: 'color' as const,
    values: [
      { id: 101, name: '中国红', color: '#e74c3c' },
      { id: 102, name: '星际蓝', color: '#3498db' },
      { id: 103, name: '月光白', color: '#ecf0f1' },
      { id: 104, name: '曜石黑', color: '#2c3e50' }
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
  <yh-sku-selector
    v-model="selectedIds"
    :specs="colorSpecs"
    :skus="skus"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const colorSpecs = ref([
  {
    id: 1, name: '颜色', mode: 'color',
    values: [
      { id: 101, name: '中国红', color: '#e74c3c' },
      { id: 102, name: '星际蓝', color: '#3498db' },
      { id: 103, name: '月光白', color: '#ecf0f1' },
      { id: 104, name: '曜石黑', color: '#2c3e50' }
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
// ── 4. 已选汇总 ────────────────────────────────────────────────────────────
// ============================================================================
const summarySelected = ref<Array<string | number>>([])
const summarySpecs = ref([
  { id: 1, name: '颜色', values: [{ id: 101, name: '中国红' }, { id: 102, name: '星际蓝' }] },
  { id: 2, name: '尺寸', values: [{ id: 201, name: 'S' }, { id: 202, name: 'M' }] }
])
const summarySkus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [101, 202], price: 120, stock: 5 },
  { id: 1003, specValueIds: [102, 201], price: 110, stock: 2 }
])

const tsSummary = `<${_T}>
  <yh-sku-selector
    v-model="selectedIds"
    :specs="specs"
    :skus="skus"
    show-selected-summary
    summary-prefix="已选"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const specs = ref([
  { id: 1, name: '颜色', values: [{ id: 101, name: '中国红' }, { id: 102, name: '星际蓝' }] },
  { id: 2, name: '尺寸', values: [{ id: 201, name: 'S' }, { id: 202, name: 'M' }] }
])
const skus = ref([
  { id: 1001, specValueIds: [101, 201], price: 100, stock: 10 },
  { id: 1002, specValueIds: [101, 202], price: 120, stock: 5 },
  { id: 1003, specValueIds: [102, 201], price: 110, stock: 2 }
])
</${_S}>`
const jsSummary = toJs(tsSummary)


// ============================================================================
// ── 5. Nuxt ────────────────────────────────────────────────────────────────
// ============================================================================
const nuxtSelected = ref<Array<string | number>>([])
const nuxtSpecs = ref([
  { id: 1, name: '颜色', values: [{ id: 101, name: '典雅白' }, { id: 102, name: '幻影黑' }] }
])
const nuxtSkus = ref([
  { id: 1001, specValueIds: [101], price: 99, stock: 10 },
  { id: 1002, specValueIds: [102], price: 99, stock: 5 }
])

const tsNuxt = `<${_T}>
  <yh-sku-selector
    v-model="selectedIds"
    :specs="specs"
    :skus="skus"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const selectedIds = ref<(string | number)[]>([])
const specs = ref([
  { id: 1, name: '颜色', values: [{ id: 101, name: '典雅白' }, { id: 102, name: '幻影黑' }] }
])
const skus = ref([
  { id: 1001, specValueIds: [101], price: 99, stock: 10 },
  { id: 1002, specValueIds: [102], price: 99, stock: 5 }
])
</${_S}>`
const jsNuxt = toJs(tsNuxt)

</script>

## 基础用法

支持根据选中项自动计算可选状态，库存为 0 的规格组合将自动置灰。

<DemoBlock title="规格筛选与库存联动" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-sku-selector
    v-model="basicSelected"
    :specs="basicSpecs"
    :skus="basicSkus"
    @change="handleBasicChange"
  />
  <div style="margin-top: 20px; padding: 16px; background: var(--yh-bg-color-soft); border-radius: 8px;">
    <p v-if="basicCurrentSku">当前渲染价格：<yh-price :value="basicCurrentSku.price" /></p>
    <p v-else style="color: var(--yh-text-color-secondary);">当前价格：请选择完整规格</p>
    <p>实时剩余库存: {{ basicCurrentSku?.stock ?? '--' }}</p>
  </div>
</DemoBlock>

## 图片预览模式

支持在规格值中传入 `image` 属性，渲染为预览图。

<DemoBlock title="图片预览模式" :ts-code="tsImage" :js-code="jsImage">
  <yh-sku-selector
    v-model="imageSelected"
    :specs="imageSpecs"
    :skus="imageSkus"
    :image-size="80"
  />
</DemoBlock>

## 色块模式

将 `mode` 设为 `'color'` 并为每个规格值传入 `color` 属性，即可渲染为色块选择器。

<DemoBlock title="色块规格选择" :ts-code="tsColor" :js-code="jsColor">
  <yh-sku-selector
    v-model="colorSelected"
    :specs="colorSpecs"
    :skus="colorSkus"
  />
</DemoBlock>

## 已选规格汇总

开启 `show-selected-summary` 后，会在顶部显示当前选中的规格汇总文本，适合电商详情页场景。

<DemoBlock title="已选汇总展示" :ts-code="tsSummary" :js-code="jsSummary">
  <yh-sku-selector
    v-model="summarySelected"
    :specs="summarySpecs"
    :skus="summarySkus"
    show-selected-summary
    summary-prefix="已选"
  />
</DemoBlock>

## 在 Nuxt 中使用

`YhSkuSelector` 完全兼容 Nuxt 3 SSR 环境，无需额外配置。

<DemoBlock title="Nuxt 集成" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-sku-selector
    v-model="nuxtSelected"
    :specs="nuxtSpecs"
    :skus="nuxtSkus"
  />
</DemoBlock>

```ts
// nuxt.config.ts — 已通过 yh-ui 插件自动注册，无需额外导入
export default defineNuxtConfig({
  modules: ['yh-ui/nuxt']
})
```

---

## API

### Props

| 属性名                | 说明                                | 类型                              | 默认值      |
| --------------------- | ----------------------------------- | --------------------------------- | ----------- |
| model-value / v-model | 当前选中的规格值 ID 数组            | `Array<string \| number>`         | `[]`        |
| specs                 | 规格列表                            | `SkuSpec[]`                       | `[]`        |
| skus                  | SKU 列表                            | `SkuItem[]`                       | `[]`        |
| check-stock           | 是否开启库存联动（库存为0自动置灰） | `boolean`                         | `true`      |
| disabled              | 整体禁用                            | `boolean`                         | `false`     |
| allow-unselect        | 是否允许点击已选中项来取消          | `boolean`                         | `true`      |
| size                  | 规格按钮大小                        | `'small' \| 'default' \| 'large'` | `'default'` |
| image-size            | 图片模式下图片区域尺寸（px）        | `number`                          | `80`        |
| show-selected-summary | 是否显示顶部已选规格汇总            | `boolean`                         | `false`     |
| summary-prefix        | 已选汇总文字前缀                    | `string`                          | `'已选'`    |
| theme-overrides       | CSS 主题变量覆盖                    | `Record<string, string>`          | `{}`        |

### Events

| 事件名            | 说明                                     | 回调参数                                                                  |
| ----------------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| update:modelValue | v-model 双向绑定                         | `(value: Array<string \| number>) => void`                                |
| change            | 选中结果变化，sku 为 null 表示未完整选中 | `(sku: SkuItem \| null, selectedValues: Array<string \| number>) => void` |
| select            | 点击某个规格值时触发（包含不可选的）     | `(spec: SkuSpec, value: SkuSpecValue) => void`                            |

### Slots

| 插槽名  | 说明                   | 作用域参数                                                                   |
| ------- | ---------------------- | ---------------------------------------------------------------------------- |
| label   | 自定义规格标题         | `{ spec: SkuSpec }`                                                          |
| value   | 完全自定义规格值格子   | `{ value: SkuSpecValue, spec: SkuSpec, active: boolean, disabled: boolean }` |
| summary | 自定义已选规格汇总区域 | `{ summary: string, sku: SkuItem \| null }`                                  |

### SkuSpec 类型

```ts
interface SkuSpec {
  id: string | number
  name: string
  values: SkuSpecValue[]
  /** 展示模式：'text'（默认）| 'image' | 'color' */
  mode?: 'text' | 'image' | 'color'
}
```

### SkuSpecValue 类型

```ts
interface SkuSpecValue {
  id: string | number
  name: string
  image?: string // mode='image' 时使用
  color?: string // mode='color' 时使用
  disabled?: boolean
  tag?: string // 右上角标签，如 "热卖"
  [key: string]: unknown // 支持扩展任意自定义字段
}
```

### SkuItem 类型

```ts
interface SkuItem {
  id: string | number
  specValueIds: Array<string | number>
  price: number
  stock: number
  marketPrice?: number
  image?: string
  skuNo?: string
  [key: string]: unknown // 支持任意扩展字段
}
```

## 主题变量

通过 `theme-overrides` 传入对象可以覆盖以下 CSS 变量：

| 变量名                          | 说明                | 默认值                             |
| ------------------------------- | ------------------- | ---------------------------------- |
| `--yh-sku-label-color`          | 规格标题颜色        | `var(--yh-text-color-secondary)`   |
| `--yh-sku-label-size`           | 规格标题字号        | `var(--yh-font-size-sm)`           |
| `--yh-sku-label-weight`         | 规格标题字重        | `var(--yh-font-weight-medium)`     |
| `--yh-sku-value-bg`             | 规格值默认背景      | `var(--yh-fill-color-light)`       |
| `--yh-sku-value-color`          | 规格值默认文字颜色  | `var(--yh-text-color-primary)`     |
| `--yh-sku-value-border`         | 规格值默认边框颜色  | `var(--yh-border-color-light)`     |
| `--yh-sku-value-hover-bg`       | 规格值悬浮背景      | `var(--yh-fill-color-dark)`        |
| `--yh-sku-value-active-bg`      | 选中态背景          | `var(--yh-color-primary-light-9)`  |
| `--yh-sku-value-active-color`   | 选中态文字/边框颜色 | `var(--yh-color-primary)`          |
| `--yh-sku-value-active-border`  | 选中态边框颜色      | `var(--yh-color-primary)`          |
| `--yh-sku-value-disabled-bg`    | 禁用态背景          | `var(--yh-fill-color-extra-light)` |
| `--yh-sku-value-disabled-color` | 禁用态文字颜色      | `var(--yh-text-color-disabled)`    |
| `--yh-sku-value-radius`         | 规格格子圆角        | `var(--yh-radius-base)`            |
| `--yh-sku-img-size`             | 图片规格的图片尺寸  | `80px`                             |
| `--yh-sku-color-swatch-size`    | 色块规格的色块尺寸  | `24px`                             |
| `--yh-sku-gap`                  | 规格行间距          | `var(--yh-spacing-md)`             |
