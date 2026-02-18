# InputNumber

Allows input of standard numeric values within a defined range.

<script setup lang="ts">
import { ref } from 'vue'

// Independent variables for each example
const num1 = ref(1)
const num2 = ref(1)
const num3 = ref(5)
const num4 = ref(1)
const num5 = ref(1)
const num6 = ref(1.5)
const num7 = ref(1)
// Prefix/Suffix example
const numPrefix = ref(100)
const numSuffix = ref(50)
const numPrefixSuffix = ref(10)
// Clearable example
const numClearable = ref(50)
// Validation example
const numValidator = ref(50)

// Nuxt usage example
const nuxtNum = ref(1)

const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <!-- InputNumber, auto-imported -->
    <yh-input-number v-model="nuxtNum" :min="1" :max="100" />
  </div>
</template>

<script setup lang="ts">
// No need to import InputNumber component
const nuxtNum = ref(1)
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Validation function
const validateNum = (value: number | undefined) => {
  if (value === undefined) return true
  if (value < 0) return 'Cannot be negative'
  if (value > 100) return 'Cannot exceed 100'
  return true
}

// Code examples
const tsBasic = `<template>
  <yh-input-number v-model="num" :min="1" :max="10" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-input-number v-model="num" disabled />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsStep = `<template>
  <yh-input-number v-model="num" :step="2" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(5)
<\/script>`

const jsStep = tsStep.replace('lang="ts"', '')

const tsPrecision = `<template>
  <yh-input-number v-model="num" :precision="2" :step="0.1" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1.5)
<\/script>`

const jsPrecision = tsPrecision.replace('lang="ts"', '')

const tsControlsPosition = `<template>
  <div style="display: flex; gap: 16px;">
    <yh-input-number v-model="num" />
    <yh-input-number v-model="num" controls-position="right" />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsControlsPosition = tsControlsPosition.replace('lang="ts"', '')

const tsSizes = `<template>
  <yh-input-number v-model="num" size="large" />
  <yh-input-number v-model="num" />
  <yh-input-number v-model="num" size="small" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsPrefixSuffix = `<template>
  <yh-input-number v-model="numPrice" prefix="¥" />
  <yh-input-number v-model="numPercent" suffix="%" />
  <yh-input-number v-model="numUsd" prefix="$" suffix="USD" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const numPrice = ref(100)
const numPercent = ref(50)
const numUsd = ref(10)
<\/script>`

const jsPrefixSuffix = tsPrefixSuffix.replace('lang="ts"', '')

const tsClearable = `<template>
  <yh-input-number v-model="num" clearable />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(50)
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsValidator = `<template>
  <yh-input-number v-model="num" :validator="validateNum" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(50)

const validateNum = (value: number | undefined) => {
  if (value === undefined) return true
  if (value < 0) return 'Cannot be negative'
  if (value > 100) return 'Cannot exceed 100'
  return true
}
<\/script>`

const jsValidator = tsValidator.replace('lang="ts"', '').replace(': number | undefined', '')
</script>

## Basic Usage

Bind a variable with `v-model`, and use `min` and `max` attributes to limit the input range.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-input-number v-model="num1" :min="1" :max="10" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Current value: {{ num1 }}</p>
</DemoBlock>

## Disabled State

Use the `disabled` attribute to disable the input field.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-input-number v-model="num2" disabled />
</DemoBlock>

## Step

Use the `step` attribute to control the step size.

<DemoBlock title="Step" :ts-code="tsStep" :js-code="jsStep">
  <yh-input-number v-model="num3" :step="2" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Step size is 2</p>
</DemoBlock>

## Precision

Use the `precision` attribute to control numeric precision.

<DemoBlock title="Precision" :ts-code="tsPrecision" :js-code="jsPrecision">
  <yh-input-number v-model="num6" :precision="2" :step="0.1" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Precision set to 2 decimal places</p>
</DemoBlock>

## Controls Position

Use `controls-position="right"` to place control buttons on the right.

<DemoBlock title="Controls Position" :ts-code="tsControlsPosition" :js-code="jsControlsPosition">
  <div style="display: flex; gap: 16px;">
    <yh-input-number v-model="num5" />
    <yh-input-number v-model="num5" controls-position="right" />
  </div>
</DemoBlock>

## Different Sizes

Use the `size` attribute to control the input size.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-input-number v-model="num7" size="large" />
    <yh-input-number v-model="num7" />
    <yh-input-number v-model="num7" size="small" />
  </div>
</DemoBlock>

## Prefix and Suffix

Use `prefix` and `suffix` attributes to add prefix and suffix text.

<DemoBlock title="Prefix and Suffix" :ts-code="tsPrefixSuffix" :js-code="jsPrefixSuffix">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-input-number v-model="numPrefix" prefix="¥" />
    <yh-input-number v-model="numSuffix" suffix="%" />
    <yh-input-number v-model="numPrefixSuffix" prefix="$" suffix="USD" />
  </div>
</DemoBlock>

## Clearable

Use the `clearable` attribute to enable the clear button.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-input-number v-model="numClearable" clearable />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Shows clear button on hover</p>
</DemoBlock>

## Custom Validation

Use the `validator` attribute to define custom validation rules.

<DemoBlock title="Custom Validation" :ts-code="tsValidator" :js-code="jsValidator">
  <yh-input-number v-model="numValidator" :validator="validateNum" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Validation range: 0 ~ 100</p>
</DemoBlock>

## Use in Nuxt

InputNumber fully supports Nuxt 3/4 SSR rendering. When used in a Nuxt project, the component is automatically imported.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-input-number v-model="nuxtNum" :min="1" :max="100" />
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Basic numeric input and step calculations are fully supported.
- ✅ Precision handling is formatted server-side.
- ✅ Control button styles and positions are consistently supported in SSR.
- ⚠️ Keyboard event listeners only take effect after client-side activation.

::: tip SSR Safety
InputNumber handles numeric precision and boundary constraints during the SSR phase, ensuring the values displayed on the first screen are as expected, avoiding hydration mismatches.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `number` | — |
| min | Minimum value | `number` | `-Infinity` |
| max | Maximum value | `number` | `Infinity` |
| step | Step size | `number` | `1` |
| step-strictly | Whether to restrict input to multiples of step | `boolean` | `false` |
| precision | Numeric precision | `number` | — |
| size | Size | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | Whether to disable | `boolean` | `false` |
| readonly | Whether to set read-only | `boolean` | `false` |
| controls | Whether to show control buttons | `boolean` | `true` |
| controls-position | Position of control buttons | `'' \| 'right'` | `''` |
| prefix | Prefix text | `string` | — |
| suffix | Suffix text | `string` | — |
| prefix-icon | Prefix icon | `Component` | — |
| suffix-icon | Suffix icon | `Component` | — |
| clearable | Whether it is clearable | `boolean` | `false` |
| validator | Custom validation function | `(value: number \| undefined) => boolean \| string` | — |
| placeholder | Input placeholder | `string` | — |
| value-on-clear | Value when cleared | `number \| null \| 'min' \| 'max'` | `null` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when value changes | `(currentValue: number \| undefined, oldValue: number \| undefined) => void` |
| input | Triggered on input | `(value: number \| undefined) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered on clear | `() => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| prefix | Custom prefix content |
| suffix | Custom suffix content |
| decrease-icon | Custom decrease button icon |
| increase-icon | Custom increase button icon |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |
| clear | Clear the value | `() => void` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-input-number-width` | Input width | `150px` |
| `--yh-input-number-height` | Input height | `var(--yh-component-size-default)` |
| `--yh-input-number-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-input-number-bg-color` | Background color | `var(--yh-fill-color-blank)` |
| `--yh-input-number-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-input-number-btn-color` | Button color | `var(--yh-text-color-secondary)` |
