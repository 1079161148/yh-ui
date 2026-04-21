<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ─── Basic Usage ─────────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <div style="height: 56px;">
    <yh-submit-bar
      :price="30.50"
      button-text="Submit Order"
      @submit="onSubmit"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const onSubmit = () => {
  alert('Order submitted. Amount: 30.50')
}
</${_S}>`

const jsBasic = toJs(tsBasic)
const onSubmit = () => { alert('Order submitted. Amount: 30.50') }

// ─── Shopping Cart Mode ──────────────────────────────────────────────────────
const cartChecked = ref(false)
const cartPrice = ref(99900)
const cartCount = ref(2)

const tsCart = `<${_T}>
  <div style="height: 56px;">
    <yh-submit-bar
      v-model:checked="cartChecked"
      :price="cartPrice"
      :selected-count="cartCount"
      button-text="Checkout"
      show-checkbox
      cent-unit
      @submit="onSubmit"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const cartChecked = ref(false)
const cartPrice = ref(99900)
const cartCount = ref(2)

const onSubmit = () => {
  console.log('Checkout action')
}
</${_S}>`

const jsCart = toJs(tsCart)

// ─── State Control ───────────────────────────────────────────────────────────
const tsState = `<${_T}>
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <!-- Loading State -->
    <yh-submit-bar
      :price="30.50"
      button-text="Submit Order"
      loading
      style="margin-bottom: 30px; position: static;"
    />
    <!-- Disabled State with Top Tip -->
    <yh-submit-bar
      :price="30.50"
      button-text="Submit Order"
      disabled
      tip="Your delivery address is out of range, cannot place an order."
      style="position: static;"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`

const jsState = toJs(tsState)

// ─── Advanced Slots ──────────────────────────────────────────────────────────
const tsAdvanced = `<${_T}>
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <yh-submit-bar :price="30.50" style="position: static;">
      <!-- Top Tip Custom Slot -->
      <template #tip>
        <div style="display: flex; align-items: center; gap: 4px;">
          <yh-icon name="info" style="color: #ff4d4f;" />
          <span style="color: #ff4d4f; font-weight: 500; font-size: 12px;">Flash sale is ending soon, checkout now!</span>
        </div>
      </template>
      <!-- Left Content -->
      <template #left>
        <span style="font-size: 13px; color: var(--yh-text-color-secondary); margin-left: 14px;">Additional Freight $5.00</span>
      </template>
      <!-- Button Text Customization -->
      <template #button>
        <span style="font-size: 16px; font-weight: 600; font-style: italic;">Buy Now</span>
      </template>
    </yh-submit-bar>
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`

const jsAdvanced = toJs(tsAdvanced)

// --- Nuxt Demo State (Decoupled) ---
const nuxtPrice = ref(128.50)
const onSubmitNuxt = () => { alert('Nuxt SSR Submit: $128.50') }

const tsNuxt = `<${_T}>
  <div style="height: 56px;">
    <yh-submit-bar
      :price="nuxtPrice"
      button-text="Nuxt Submit"
      @submit="onSubmitNuxt"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const nuxtPrice = ref(128.50)
const onSubmitNuxt = () => {
  alert('Nuxt SSR Submit: $128.50')
}
</${_S}>`

const jsNuxt = toJs(tsNuxt)
</script>

# SubmitBar

Used at the bottom of e-commerce checkout pages or shopping carts to display total amounts, selected items, and a submit button. It supports safe area insets and "select all" features.

## Basic Usage

Displays the total amount and handle the checkout button click. Requires `height: 56px` or a wrapping container to take up normal document flow space, not needed if sticking to bottom.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 56px;">
    <yh-submit-bar
      :price="30.50"
      button-text="Submit Order"
      @submit="onSubmit"
    />
  </div>
</DemoBlock>

## Shopping Cart Mode (with Checkbox)

Includes a "select all" checkbox, suitable for shopping cart pages. By configuring the `cent-unit` property, you can directly pass backend amounts calculated in "cents".

<DemoBlock title="Shopping Cart" :ts-code="tsCart" :js-code="jsCart">
  <div style="height: 56px;">
    <yh-submit-bar
      v-model:checked="cartChecked"
      :price="cartPrice"
      :selected-count="cartCount"
      button-text="Checkout"
      show-checkbox
      cent-unit
      @submit="onSubmit"
    />
  </div>
</DemoBlock>

## Disabled and Loading State

The component has built-in `disabled` and `loading` states, and supports displaying prominent warning/tip banners using the `tip` property (e.g. out of delivery range).

<DemoBlock title="State Control & Tip Banner" :ts-code="tsState" :js-code="jsState">
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <yh-submit-bar
      :price="30.50"
      button-text="Submit Order"
      loading
      style="margin-bottom: 30px; position: static;"
    />
    <yh-submit-bar
      :price="30.50"
      button-text="Submit Order"
      disabled
      tip="Your delivery address is out of range, cannot place an order."
      style="position: static;"
    />
  </div>
</DemoBlock>

## Advanced Slot Customization

You can use the `#tip`, `#left`, `#button`, and `#right` slots to implement an extremely customized shopping checkout bar layout.

<DemoBlock title="Advanced Slots" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <yh-submit-bar :price="30.50" style="position: static;">
      <!-- Top Tip Custom Slot -->
      <template #tip>
        <div style="display: flex; align-items: center; gap: 4px;">
          <yh-icon name="info" style="color: #ff4d4f;" />
          <span style="color: #ff4d4f; font-weight: 500; font-size: 12px;">Flash sale is ending soon, checkout now!</span>
        </div>
      </template>
      <!-- Left Content -->
      <template #left>
        <span style="font-size: 13px; color: var(--yh-text-color-secondary); margin-left: 14px;">Additional Freight $5.00</span>
      </template>
      <!-- Button Text Customization -->
      <template #button>
        <span style="font-size: 16px; font-weight: 600; font-style: italic;">Buy Now</span>
      </template>
    </yh-submit-bar>
  </div>
</DemoBlock>

## Use in Nuxt

This component is fully compatible with Nuxt 3/4 SSR rendering.

<DemoBlock title="Nuxt Usage" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="height: 56px; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
    <yh-submit-bar
      :price="nuxtPrice"
      button-text="Nuxt Submit"
      @submit="onSubmitNuxt"
    />
  </div>
</DemoBlock>

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    // 默认已自动按需引入，无需特殊配置
    // options...
  }
})
```

## API

### Props

| Parameter              | Description                                | Type                     | Default     |
| ---------------------- | ------------------------------------------ | ------------------------ | ----------- |
| price                  | Amount                                     | `number`                 | `0`         |
| currency               | Currency symbol                            | `string`                 | `¥`         |
| cent-unit              | Whether price is in cent unit              | `boolean`                | `false`     |
| decimal-length         | Decimal length to keep                     | `number`                 | `2`         |
| label                  | Prefix label for the total text            | `string`                 | `'Total:'`  |
| button-text            | Submit button text                         | `string`                 | —           |
| button-type            | Button type (`primary` `danger` etc)       | `SubmitBarButtonType`    | `'primary'` |
| show-checkbox          | Whether to display the select-all checkbox | `boolean`                | `false`     |
| checked                | Check state, supports `v-model:checked`    | `boolean`                | `false`     |
| indeterminate          | Indeterminate half-checked state           | `boolean`                | `false`     |
| selected-count         | Number of items selected                   | `number`                 | `0`         |
| tip                    | Top tip text                               | `string`                 | —           |
| disabled               | Whether the button is disabled             | `boolean`                | `false`     |
| loading                | Whether to show loading state              | `boolean`                | `false`     |
| safe-area-inset-bottom | Whether to enable bottom safe area inset   | `boolean`                | `true`      |
| theme-overrides        | Custom theme overriding object             | `Record<string, string>` | `{}`        |

### Events

| Event Name     | Description                                         | Callback Parameters |
| -------------- | --------------------------------------------------- | ------------------- |
| submit         | Triggered when submit button clicked                | `(e: MouseEvent)`   |
| update:checked | Triggered when checkbox state bidirectional changes | `(val: boolean)`    |
| check-change   | Triggered when checkbox actively toggled            | `(val: boolean)`    |

### Slots

| Slot Name | Description                                       | Parameters |
| --------- | ------------------------------------------------- | ---------- |
| default   | Default slot                                      | -          |
| tip       | Custom top tip banner content                     | -          |
| left      | Custom content next to select-all checkbox        | -          |
| right     | Custom content next to submit button              | -          |
| price     | Completely override the middle price display area | -          |
| button    | Override the submit button style and structure    | -          |

### Expose

This component does not expose public instance methods or properties.

### Theme Variables

Easily customize visually by passing `theme-overrides` prop.

| Variable Name                   | Description                          | Default Value                        |
| ------------------------------- | ------------------------------------ | ------------------------------------ |
| `--yh-submit-bar-bg`            | Component background color           | `var(--yh-bg-color)`                 |
| `--yh-submit-bar-border`        | Top border color                     | `var(--yh-border-color-lighter)`     |
| `--yh-submit-bar-height`        | Component height                     | `56px`                               |
| `--yh-submit-bar-price-color`   | Reddish main price color             | `var(--yh-color-danger)`             |
| `--yh-submit-bar-price-size`    | Number size of exact integer portion | `22px`                               |
| `--yh-submit-bar-label-color`   | "Total:" label color                 | `var(--yh-text-color-regular)`       |
| `--yh-submit-bar-btn-radius`    | Button radius                        | `var(--yh-radius-large)`             |
| `--yh-submit-bar-btn-min-width` | Button container min width           | `108px`                              |
| `--yh-submit-bar-tip-bg`        | Tip banner background                | `var(--yh-color-warning-light-9)`    |
| `--yh-submit-bar-tip-color`     | Tip banner text color                | `var(--yh-color-warning)`            |
| `--yh-submit-bar-shadow`        | Bottom fixed shadow                  | `0 -2px 12px var(--yh-shadow-color)` |
| `--yh-submit-bar-z-index`       | Submitting z-index fixing layer      | `200`                                |

### Type Exports

| Name | Description |
| --- | --- |
| `YhSubmitBarProps` | Component props type |
| `YhSubmitBarEmits` | Component emits type |
| `YhSubmitBarSlots` | Component slots type |
| `YhSubmitBarButtonType` | Button type union |
| `YhSubmitBarInstance` | Component instance type |
