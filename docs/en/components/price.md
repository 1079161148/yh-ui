# Price

Core component for e-commerce to display product prices in a standardized way. Supports amount splitting (large integer, small decimal), thousandth separators, and increment animations.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="1234.56" />
    <yh-price :value="1234.56" :precision="0" />
    <yh-price :value="1234.56" symbol-position="after" symbol="USD" />
    <yh-price :value="1234.56" approx />
  </div>
</${_T}>`

const jsBasic = toJs(tsBasic)

const tsRange = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="99" :max-value="199" />
    <yh-price :value="9.9" :max-value="12.5" size="large" bold />
  </div>
</${_T}>`
const jsRange = toJs(tsRange)

const tsEcommerce = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- Membership Scene -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <yh-price :value="168" tag="VIP Price" tag-type="danger" size="large" bold />
      <yh-price :value="299" delete-value="299" delete-label="MSRP" />
    </div>

    <!-- Unit Scene -->
    <yh-price :value="5.8" unit="/ kg" />
    
    <!-- Gradient Text -->
    <yh-price :value="8888" :gradient="['#ff4d4f', '#722ed1']" size="large" bold />
  </div>
</${_T}>`
const jsEcommerce = toJs(tsEcommerce)

const tsSizes = `<${_T}>
  <div style="display: flex; align-items: baseline; gap: 20px;">
    <yh-price :value="99" size="small" />
    <yh-price :value="99" size="default" />
    <yh-price :value="99" size="large" />
    <yh-price :value="99" style="font-size: 40px; color: #ff4d4f;" />
  </div>
</${_T}>`
const jsSizes = toJs(tsSizes)

const tsFeatures = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <span style="font-size: 14px; color: #999;">Strikethrough: </span>
      <yh-price :value="299" line-through />
    </div>
    <div>
      <span style="font-size: 14px; color: #999;">Thousandth: </span>
      <yh-price :value="1234567.89" thousandth />
    </div>
  </div>
</${_T}>`
const jsFeatures = toJs(tsFeatures)

const tsNuxt = `<${_T}>
  <yh-price :value="getPrice" animated />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'
const getPrice = ref(0)
onMounted(() => {
  getPrice.value = 888.88
})
</${_S}>`
const jsNuxt = toJs(tsNuxt)

const getPrice = ref(888.88)

</script>

## Basic Usage

Standard price display with 2 decimal places and currency symbol. Supports `approx` symbol (~).

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="1234.56" />
    <yh-price :value="1234.56" :precision="0" />
    <yh-price :value="1234.56" symbol-position="after" symbol="USD" />
    <yh-price :value="1234.56" approx />
  </div>
</DemoBlock>

## Price Range

Use `max-value` for displaying price intervals common in SKU listings.

<DemoBlock title="Price Range" :ts-code="tsRange" :js-code="jsRange">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="99" :max-value="199" />
    <yh-price :value="9.9" :max-value="12.5" size="large" bold />
  </div>
</DemoBlock>

## E-commerce Expansion

Integrated membership tags, stock units, original price comparisons, and trendy gradient text.

<DemoBlock title="E-commerce Scene" :ts-code="tsEcommerce" :js-code="jsEcommerce">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <yh-price :value="168" tag="VIP Price" tag-type="danger" size="large" bold />
      <yh-price :value="299" delete-value="299" delete-label="MSRP" />
    </div>
    <yh-price :value="5.8" unit="/ kg" />
    <yh-price :value="8888" :gradient="['#ff4d4f', '#722ed1']" size="large" bold />
  </div>
</DemoBlock>

## Sizes

Built-in presets for `small`, `default`, and `large`. Full control via CSS or theme variables.

<DemoBlock title="Size Comparison" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; align-items: baseline; gap: 20px;">
    <yh-price :value="99" size="small" />
    <yh-price :value="99" size="default" />
    <yh-price :value="99" size="large" />
    <yh-price :value="99" style="font-size: 40px; color: #ff4d4f;" />
  </div>
</DemoBlock>

## More Features

Standard strikethrough prices and thousandth separators.

<DemoBlock title="Features" :ts-code="tsFeatures" :js-code="jsFeatures">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <span style="font-size: 14px; color: #999;">Strikethrough: </span>
      <yh-price :value="299" line-through />
    </div>
    <div>
      <span style="font-size: 14px; color: #999;">Thousandth: </span>
      <yh-price :value="1234567.89" thousandth />
    </div>
  </div>
</DemoBlock>

## Nuxt Support

`YhPrice` supports high-performance numerical animations in Nuxt 3 environments.

<DemoBlock title="Nuxt Integration" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-price :value="getPrice" animated />
</DemoBlock>

## API

### Props

| Property        | Description                      | Type                                                        | Default     |
| --------------- | -------------------------------- | ----------------------------------------------------------- | ----------- |
| value           | Price value                      | `number \| string`                                          | `0`         |
| max-value       | Max price for range mode         | `number \| string`                                          | `undefined` |
| symbol          | Currency symbol                  | `string`                                                    | `'¥'`       |
| symbol-position | Symbol position                  | `'before' \| 'after'`                                       | `'before'`  |
| precision       | Decimal precision                | `number`                                                    | `2`         |
| line-through    | Enable strikethrough             | `boolean`                                                   | `false`     |
| size            | Size preset                      | `'small' \| 'default' \| 'large' \| string`                 | `'default'` |
| split           | Split integer and decimal digits | `boolean`                                                   | `true`      |
| decimal-scale   | Decimal size scale (0-1)         | `number`                                                    | `0.8`       |
| thousandth      | Enable thousandth separator      | `boolean`                                                   | `true`      |
| bold            | Bold font weight                 | `boolean`                                                   | `false`     |
| approx          | Enable approx symbol (~)         | `boolean`                                                   | `false`     |
| prefix          | Prefix text                      | `string`                                                    | `''`        |
| suffix          | Suffix text                      | `string`                                                    | `''`        |
| unit            | Price unit (e.g., /kg)           | `string`                                                    | `''`        |
| delete-value    | Original price value             | `number \| string`                                          | `undefined` |
| delete-label    | Label for original price         | `string`                                                    | `''`        |
| tag             | Badge label (e.g., Member)       | `string`                                                    | `''`        |
| tag-type        | Badge theme                      | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'`  |
| animated        | Enable increment animation       | `boolean`                                                   | `false`     |
| gradient        | Enable gradient text effect      | `boolean \| string[]`                                       | `false`     |
| theme-overrides | Style overrides                  | `object`                                                    | —           |

### Slots

| Slot   | Description          | Parameters |
| ------ | -------------------- | ---------- |
| prefix | Prefix slot          | —          |
| suffix | Suffix slot          | —          |
| symbol | Currency symbol slot | —          |
| tag    | Badge area slot      | —          |
| unit   | Unit area slot       | —          |

## Theme Variables

| Variable                   | Description            | Default                  |
| -------------------------- | ---------------------- | ------------------------ |
| `--yh-price-color`         | Primary price color    | `var(--yh-color-danger)` |
| `--yh-price-integer-size`  | Base integer font size | `1.25em`                 |
| `--yh-price-symbol-size`   | Base symbol font size  | `0.75em`                 |
| `--yh-price-decimal-scale` | Decimal part scale     | `0.8`                    |
| `--yh-price-tag-bg`        | Badge background color | `var(--yh-color-danger)` |
