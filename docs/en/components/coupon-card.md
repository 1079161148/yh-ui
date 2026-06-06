# Coupon Card

Standard component for displaying coupon information. It supports cutout variants, status display, optional selection mode, and e-commerce style badge, progress, and rules sections.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      title="Store-wide Coupon"
      description="Applicable to all items"
      amount="50"
      threshold="Min spend 500"
      :valid-period="'2024.01.01 - 2024.12.31'"
      :action-text="'Claim Now'"
    />
  </div>
</${_T}>`
const jsBasic = toJs(tsBasic)

const tsStatus = `<${_T}>
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      status="used"
      title="Used Coupon"
      amount="100"
      threshold="Min spend 1000"
      :action-text="'Used'"
    />
    <yh-coupon-card
      status="expired"
      title="Expired Coupon"
      amount="20"
      threshold="Min spend 200"
      :action-text="'Expired'"
    />
  </div>
</${_T}>`
const jsStatus = toJs(tsStatus)

const isSelected = ref(false)
const tsSelectable = `<${_T}>
  <div style="width: 340px;">
    <yh-coupon-card
      v-model:selected="isSelected"
      selectable
      title="Selectable Coupon"
      amount="30"
      threshold="Min spend 300"
    />
    <p style="margin-top: 12px; font-size: 14px;">
      Selected: {{ isSelected ? 'Yes' : 'No' }}
    </p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const isSelected = ref(false)
</${_S}>`
const jsSelectable = toJs(tsSelectable)

const tsAdvanced = `<${_T}>
  <div style="display: grid; gap: 24px; width: 340px;">
    <!-- Badge Mode -->
    <yh-coupon-card
      badge="Special"
      badge-type="danger"
      title="Flash Double"
      amount="100"
      threshold="Min spend 1000"
      :valid-period="'Today Only'"
    />

    <!-- Progress Mode -->
    <yh-coupon-card
      title="Limited Subsidy"
      amount="50"
      threshold="No Threshold"
      :percent="85"
      percent-text="Claimed 85%"
      :valid-period="'2024.01.01 - 2024.12.31'"
    />

    <!-- Rules Collapse Mode -->
    <yh-coupon-card
      title="Super VIP Coupon"
      amount="30"
      threshold="Min spend 300"
      :valid-period="'Long term valid'"
      rules="1. Only for Super VIP accounts\\n2. Applicable to self-operated items\\n3. Cannot stack with red packets"
    />
  </div>
</${_T}>`
const jsAdvanced = toJs(tsAdvanced)
const tsNuxt = `<${_T}>
  <yh-coupon-card
    title="Nuxt Coupon"
    amount="10"
    action-text="Claim Now"
  />
</${_T}>`
const jsNuxt = toJs(tsNuxt)

</script>

## Basic Usage

Displays core coupon info. Supports `circle` (default), `indent`, and `scallop` variants.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      title="Store-wide Coupon"
      description="Applicable to all items"
      amount="50"
      threshold="Min spend 500"
      :valid-period="'2024.01.01 - 2024.12.31'"
      :action-text="'Claim Now'"
    />
  </div>
</DemoBlock>

## Status Management

Supports `available`, `used`, `expired`, and `locked` states.

<DemoBlock title="States" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      status="used"
      title="Used Coupon"
      amount="100"
      threshold="Min spend 1000"
      :action-text="'Used'"
    />
    <yh-coupon-card
      status="expired"
      title="Expired Coupon"
      amount="20"
      threshold="Min spend 200"
      :action-text="'Expired'"
    />
  </div>
</DemoBlock>

## Selection Mode

Enable `selectable` mode for checkout pages using `v-model:selected`.

<DemoBlock title="Selectable Mode" :ts-code="tsSelectable" :js-code="jsSelectable">
  <div style="width: 340px;">
    <yh-coupon-card
      v-model:selected="isSelected"
      selectable
      title="Selectable Coupon"
      amount="30"
      threshold="Min spend 300"
    />
    <p style="margin-top: 12px; font-size: 14px;">
      Selected: {{ isSelected ? 'Yes' : 'No' }}
    </p>
  </div>
</DemoBlock>

## Advanced Features

Enhanced features for modern e-commerce scenarios: badges, progress bars, and rules drawer.

<DemoBlock title="Advanced Features" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="display: grid; gap: 24px; width: 340px;">
    <yh-coupon-card
      badge="Special"
      badge-type="danger"
      title="Flash Double"
      amount="100"
      threshold="Min spend 1000"
      :valid-period="'Today Only'"
      :action-text="'Double Now'"
    />
    <yh-coupon-card
      title="Limited Subsidy"
      amount="50"
      threshold="No Threshold"
      :percent="85"
      percent-text="Claimed 85%"
      :valid-period="'2024.01.01 - 2024.12.31'"
      :action-text="'Claim'"
    />
    <yh-coupon-card
      title="Super VIP Coupon"
      amount="30"
      threshold="Min spend 300"
      :valid-period="'Long term valid'"
      rules="1. Only for Super VIP accounts\n2. Applicable to self-operated items\n3. Cannot stack with red packets"
      :action-text="'Convert'"
    />
  </div>
</DemoBlock>

## Usage in Nuxt

`YhCouponCard` works directly in Nuxt 3/4 projects. When `yh-ui/nuxt` is enabled, the component can be used without manual registration.

<DemoBlock title="Nuxt Integration" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="width: 340px;">
    <yh-coupon-card
      title="Nuxt Coupon"
      amount="10"
      action-text="Claim Now"
    />
  </div>
</DemoBlock>
## API

### Props

| Property        | Description                    | Type                                              | Default         |
| --------------- | ------------------------------ | ------------------------------------------------- | --------------- |
| title           | Coupon title                   | `string`                                          | `''`            |
| description     | Description text               | `string`                                          | `''`            |
| amount          | Amount value                   | `string \| number`                                | `''`            |
| symbol          | Currency symbol                | `string`                                          | `'¥'`           |
| threshold       | Minimum spend                  | `string \| number`                                | `''`            |
| valid-period    | Validity period                | `string`                                          | `''`            |
| status          | State                          | `'available' \| 'used' \| 'expired' \| 'locked'`  | `'available'`   |
| variant         | Cutout variant                 | `'circle' \| 'indent' \| 'scallop'`               | `'circle'`      |
| selectable      | Enable selectable mode         | `boolean`                                         | `false`         |
| selected        | Selected state (v-model)       | `boolean`                                         | `false`         |
| action-text     | Action button text             | `string`                                          | `''`            |
| badge           | Badge text                     | `string`                                          | `''`            |
| badge-type      | Badge color type               | `'danger' \| 'warning' \| 'primary' \| 'success'` | `'danger'`      |
| percent         | Progress percentage (0-100)    | `number`                                          | `undefined`     |
| percent-text    | Tip text near progress bar     | `string`                                          | `''`            |
| rules           | Usage rules text at bottom     | `string`                                          | `''`            |
| rule-title      | Custom title for rules section | `string`                                          | `''`            |
| disabled        | Whether disabled styling is applied | `boolean`                                    | `false`         |
| theme-overrides | Theme variable overrides       | `Record<string, string>`                          | `{}`            |

### Events

| Event Name      | Description                  | Parameters                |
| --------------- | ---------------------------- | ------------------------- |
| click           | Fired when card is clicked   | `(e: MouseEvent) => void` |
| action          | Fired when button is clicked | `(e: MouseEvent) => void` |
| update:selected | Selected state change event  | `(val: boolean) => void`  |

### Slots

| Slot        | Description             | Parameters |
| ----------- | ----------------------- | ---------- |
| title       | Custom coupon title     | `-`        |
| description | Custom description area | `-`        |
| action      | Custom action area      | `-`        |
| badge       | Custom badge content    | `-`        |
| seal        | Custom status seal      | `{ status: CouponStatus }` |
| rules       | Custom rules section    | `-`        |

### Expose

This component does not expose public instance methods or properties.

## Theme Variables

| Variable                    | Description                  | Default                      |
| --------------------------- | ---------------------------- | ---------------------------- |
| `--yh-coupon-bg`            | Card background color        | `var(--yh-bg-color-overlay)` |
| `--yh-coupon-primary-color` | Accent color (amount/button) | `var(--yh-color-primary)`    |
| `--yh-coupon-amount-size`   | Amount font size             | `28px`                       |

### Type Exports

| Name | Description |
| --- | --- |
| `YhCouponCardProps` | Component props type |
| `YhCouponCardEmits` | Component emits type |
| `YhCouponCardSlots` | Component slots type |
| `YhCouponStatus` | Coupon status union type |
| `YhCouponCardInstance` | Component instance type |
