# Price

Core component for e-commerce to display product prices in a standardized way. Supports amount splitting, range display, thousand separators, and animated number updates.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

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

Standard price display with two decimal places and the default currency symbol. You can also move the symbol behind the number or enable the approximate mark.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="1234.56" />
    <yh-price :value="1234.56" :precision="0" />
    <yh-price :value="1234.56" symbol-position="after" symbol="USD" />
    <yh-price :value="1234.56" approx />
  </div>
</DemoBlock>

## Price Range

Use `max-value` to render a price range, which is common in SKU listings and product collections.

<DemoBlock title="Price Range" :ts-code="tsRange" :js-code="jsRange">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="99" :max-value="199" />
    <yh-price :value="9.9" :max-value="12.5" size="large" bold />
  </div>
</DemoBlock>

## E-commerce Expansion

Combine tags, original-price display, unit labels, and gradient text to match richer retail card layouts.

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

Built-in presets are available for `small`, `default`, and `large`. You can still customize the final size with CSS or theme variables.

<DemoBlock title="Size Comparison" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; align-items: baseline; gap: 20px;">
    <yh-price :value="99" size="small" />
    <yh-price :value="99" size="default" />
    <yh-price :value="99" size="large" />
    <yh-price :value="99" style="font-size: 40px; color: #ff4d4f;" />
  </div>
</DemoBlock>

## More Features

Standard struck-through prices and thousand separators are built in, so common retail price patterns can be composed without extra markup.

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

## Use in Nuxt

`YhPrice` can be used directly in Nuxt 3/4 after registering `@yh-ui/nuxt`. If you enable `animated`, update the bound value on the client when you want the animation to start after hydration.

<DemoBlock title="Nuxt Integration" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-price :value="getPrice" animated />
</DemoBlock>

## API

### Props

| Property        | Description                                      | Type                                                        | Default     |
| --------------- | ------------------------------------------------ | ----------------------------------------------------------- | ----------- |
| value           | Current price value                              | `number \| string`                                          | `0`         |
| max-value       | Maximum price used for range display             | `number \| string`                                          | `undefined` |
| symbol          | Currency symbol                                  | `string`                                                    | `'¥'`       |
| symbol-position | Currency symbol position                         | `'before' \| 'after'`                                       | `'before'`  |
| precision       | Decimal precision                                | `number`                                                    | `2`         |
| line-through    | Whether to render the main price as struck through | `boolean`                                                 | `false`     |
| size            | Built-in size preset                             | `'small' \| 'default' \| 'large' \| string`                 | `'default'` |
| split           | Whether to split integer and decimal font sizes  | `boolean`                                                   | `true`      |
| decimal-scale   | Decimal font-size ratio                          | `number`                                                    | `0.8`       |
| thousandth      | Whether to insert thousand separators            | `boolean`                                                   | `true`      |
| bold            | Whether to apply bold weight                     | `boolean`                                                   | `false`     |
| prefix          | Prefix text                                      | `string`                                                    | `''`        |
| suffix          | Suffix text                                      | `string`                                                    | `''`        |
| unit            | Unit label, such as `/kg`                        | `string`                                                    | `''`        |
| delete-value    | Secondary original price value                   | `number \| string`                                          | `undefined` |
| delete-label    | Label shown before the deleted price             | `string`                                                    | `''`        |
| tag             | Tag text shown before the price                  | `string`                                                    | `''`        |
| tag-type        | Tag visual type                                  | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'`  |
| approx          | Whether to prepend an approximate mark           | `boolean`                                                   | `false`     |
| animated        | Whether to animate value changes                 | `boolean`                                                   | `false`     |
| gradient        | Gradient text mode                               | `boolean \| string[]`                                       | `false`     |
| theme-overrides | Component-level theme variable overrides         | `Record<string, string>`                                    | `{}`        |

### Events

This component does not expose component events.

### Slots

| Slot   | Description                    | Parameters |
| ------ | ------------------------------ | ---------- |
| tag    | Custom tag content             | `-`      |
| prefix | Custom prefix content          | `-`      |
| symbol | Custom currency symbol content | `-`      |
| unit   | Custom unit content            | `-`      |
| suffix | Custom suffix content          | `-`      |

### Expose

This component does not expose public instance methods or properties.

## Theme Variables

| Variable                   | Description            | Default                  |
| -------------------------- | ---------------------- | ------------------------ |
| `--yh-price-color`         | Primary price color    | `var(--yh-color-danger)` |
| `--yh-price-font-family`   | Price font family      | `var(--yh-font-family)`  |
| `--yh-price-integer-size`  | Base integer font size | `1.25em`                 |
| `--yh-price-symbol-size`   | Base symbol font size  | `0.75em`                 |
| `--yh-price-decimal-scale` | Decimal part scale     | `0.8`                    |
| `--yh-price-tag-bg`        | Badge background color | `var(--yh-color-danger)` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhPriceProps` | Component props type |
| `YhPriceSlots` | Component slots type |
| `YhPriceInstance` | Component instance type |
