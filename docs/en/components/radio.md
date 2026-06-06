# Radio

`YhRadio`, `YhRadioGroup`, and `YhRadioButton` are used to pick a single value from a set of choices. They support standalone usage, grouped usage, option list rendering, button style mode, and token-based theming.

<script setup lang="ts">
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
const radioDisabled = ref('1')
const radioBorder = ref('1')
const radioSize = ref('1')
const radioButton1 = ref('New York')
const radioButton2 = ref('New York')
const radioButton3 = ref('New York')
const radioButtonSize = ref('New York')
const radioOptions = [
  { value: '1', label: 'Option One' },
  { value: '2', label: 'Option Two' },
  { value: '3', label: 'Option Three', disabled: true }
]
const radioByOptions = ref('1')
const nuxtRadio = ref('1')
const nuxtTab = ref('New York')

const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-radio-group v-model="nuxtRadio">
      <yh-radio value="1">Option 1</yh-radio>
      <yh-radio value="2">Option 2</yh-radio>
    </yh-radio-group>

    <yh-radio-group v-model="nuxtTab" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nuxtRadio = ref('1')
const nuxtTab = ref('New York')
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const tsBasic = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1">Option One</yh-radio>
    <yh-radio value="2">Option Two</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsDisabled = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>Disable entire group:</p>
      <yh-radio-group v-model="radio" disabled>
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2">Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p>Disable individual:</p>
      <yh-radio-group v-model="radio">
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2" disabled>Option Two</yh-radio>
        <yh-radio value="3">Option Three</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsBorder = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" border>Option One</yh-radio>
    <yh-radio value="2" border>Option Two</yh-radio>
    <yh-radio value="3" border disabled>Disabled</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsSizes = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" size="large" border>Large</yh-radio>
    <yh-radio value="2" border>Default</yh-radio>
    <yh-radio value="3" size="small" border>Small</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsSingle = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-radio v-model="radio" value="1">Option One</yh-radio>
    <yh-radio v-model="radio" value="2">Option Two</yh-radio>
    <yh-radio v-model="radio" value="3">Option Three</yh-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsGroupSize = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio" size="large">
      <yh-radio value="1" border>Large</yh-radio>
      <yh-radio value="2" border>Large</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio">
      <yh-radio value="1" border>Default</yh-radio>
      <yh-radio value="2" border>Default</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio" size="small">
      <yh-radio value="1" border>Small</yh-radio>
      <yh-radio value="2" border>Small</yh-radio>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsOptions = `<template>
  <yh-radio-group v-model="radio" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
const options = [
  { value: '1', label: 'Option One' },
  { value: '2', label: 'Option Two' },
  { value: '3', label: 'Option Three', disabled: true }
]
<\/script>`

const tsRadioButton = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const tsRadioButtonCustom = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio" fill="#67C23A" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const tsRadioButtonDisabled = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const tsRadioButtonSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio" size="large">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')
const jsDisabled = tsDisabled.replace('lang="ts"', '')
const jsBorder = tsBorder.replace('lang="ts"', '')
const jsSizes = tsSizes.replace('lang="ts"', '')
const jsSingle = tsSingle.replace('lang="ts"', '')
const jsGroupSize = tsGroupSize.replace('lang="ts"', '')
const jsOptions = tsOptions.replace('lang="ts"', '')
const jsRadioButton = tsRadioButton.replace('lang="ts"', '')
const jsRadioButtonCustom = tsRadioButtonCustom.replace('lang="ts"', '')
const jsRadioButtonDisabled = tsRadioButtonDisabled.replace('lang="ts"', '')
const jsRadioButtonSizes = tsRadioButtonSizes.replace('lang="ts"', '')
</script>

Select a single option from a set of mutually exclusive choices.

## Basic Usage

Use `YhRadioGroup` with multiple `YhRadio` children for standard single-choice selection.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-radio-group v-model="radio1">
    <yh-radio value="1">Option One</yh-radio>
    <yh-radio value="2">Option Two</yh-radio>
  </yh-radio-group>
</DemoBlock>

## Disabled State

You can disable the whole group or a single radio item.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Disable entire group:</p>
      <yh-radio-group v-model="radioDisabled" disabled>
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2">Option Two</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Disable individual:</p>
      <yh-radio-group v-model="radio2">
        <yh-radio value="1">Option One</yh-radio>
        <yh-radio value="2" disabled>Option Two</yh-radio>
        <yh-radio value="3">Option Three</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## Standalone Usage

`YhRadio` can also be used without a group by binding `v-model` directly.

<DemoBlock title="Standalone Usage" :ts-code="tsSingle" :js-code="jsSingle">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-radio v-model="radio3" value="1">Option One</yh-radio>
    <yh-radio v-model="radio3" value="2">Option Two</yh-radio>
    <yh-radio v-model="radio3" value="3">Option Three</yh-radio>
  </div>
</DemoBlock>

## With Border

Use `border` to render bordered radios.

<DemoBlock title="With Border" :ts-code="tsBorder" :js-code="jsBorder">
  <yh-radio-group v-model="radioBorder">
    <yh-radio value="1" border>Option One</yh-radio>
    <yh-radio value="2" border>Option Two</yh-radio>
    <yh-radio value="3" border disabled>Disabled</yh-radio>
  </yh-radio-group>
</DemoBlock>

## Different Sizes

`size` is supported by both standalone radios and group inheritance.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-radio v-model="radioSize" value="1" size="large" border>Large</yh-radio>
    <yh-radio v-model="radioSize" value="2" border>Default</yh-radio>
    <yh-radio v-model="radioSize" value="3" size="small" border>Small</yh-radio>
  </div>
</DemoBlock>

<DemoBlock title="Inherited Group Size" :ts-code="tsGroupSize" :js-code="jsGroupSize">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio1" size="large">
      <yh-radio value="1" border>Large</yh-radio>
      <yh-radio value="2" border>Large</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio1">
      <yh-radio value="1" border>Default</yh-radio>
      <yh-radio value="2" border>Default</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio1" size="small">
      <yh-radio value="1" border>Small</yh-radio>
      <yh-radio value="2" border>Small</yh-radio>
    </yh-radio-group>
  </div>
</DemoBlock>

## Render by Options

`YhRadioGroup` can render radios from the `options` prop when you do not need custom slot content.

<DemoBlock title="Render by Options" :ts-code="tsOptions" :js-code="jsOptions">
  <yh-radio-group v-model="radioByOptions" :options="radioOptions" />
</DemoBlock>

## Button Style

Use `YhRadioButton` for segmented button-like choices.

<DemoBlock title="Button Style" :ts-code="tsRadioButton" :js-code="jsRadioButton">
  <yh-radio-group v-model="radioButton1">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

## Button Colors

When using radio buttons, `fill` and `text-color` from the group control the checked visual state.

<DemoBlock title="Button Colors" :ts-code="tsRadioButtonCustom" :js-code="jsRadioButtonCustom">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radioButton2">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButton2" fill="#67C23A" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

## Button Disabled and Sizes

<DemoBlock title="Button Disabled" :ts-code="tsRadioButtonDisabled" :js-code="jsRadioButtonDisabled">
  <yh-radio-group v-model="radioButton3">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

<DemoBlock title="Button Sizes" :ts-code="tsRadioButtonSizes" :js-code="jsRadioButtonSizes">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radioButtonSize" size="large">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButtonSize">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButtonSize" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, `YhRadio`, `YhRadioGroup`, and `YhRadioButton` can be used directly in Nuxt 3/4 pages and components. The checked state renders correctly in SSR and continues to work after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-radio-group v-model="nuxtRadio">
      <yh-radio value="1">Option 1</yh-radio>
      <yh-radio value="2">Option 2</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="nuxtTab" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

## API

### Radio Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Bound value in standalone mode | `YhRadioValueType` | `undefined` |
| `value` | Current radio value. In practice, the change path emits `value`; omitting it can lead to `undefined` being emitted even though checked-state comparison falls back to `label`. | `YhRadioValueType` | `undefined` |
| `name` | Native `name` attribute | `string` | `undefined` |
| `label` | Fallback text when the default slot is not used | `string` | `undefined` |
| `size` | Radio size | `'large' \| 'default' \| 'small'` | `undefined` |
| `disabled` | Disable the radio | `boolean` | `false` |
| `border` | Show bordered style | `boolean` | `false` |
| `id` | Native `id` attribute | `string` | `undefined` |
| `tabindex` | Native `tabindex` attribute | `string \| number` | `undefined` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### Radio Events

| Event | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the standalone bound value changes | `(value: YhRadioValueType) => void` |
| `change` | Triggered when the standalone bound value changes | `(value: YhRadioValueType) => void` |

### Radio Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `default` | Radio label content | - |

### Radio Expose

| Name | Description | Type |
| --- | --- | --- |
| `ref` | Native radio input element reference | `HTMLInputElement \| undefined` |
| `focus` | Focus the radio input | `() => void` |
| `blur` | Blur the radio input | `() => void` |

### RadioButton Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Bound value in standalone mode | `YhRadioValueType` | `undefined` |
| `value` | Current radio button value. If omitted, checked-state and emitted value both fall back to `label`. | `YhRadioValueType` | `undefined` |
| `name` | Native `name` attribute | `string` | `undefined` |
| `label` | Fallback text when the default slot is not used | `string` | `undefined` |
| `size` | Radio button size | `'large' \| 'default' \| 'small'` | `undefined` |
| `disabled` | Disable the radio button | `boolean` | `false` |
| `id` | Native `id` attribute | `string` | `undefined` |
| `tabindex` | Native `tabindex` attribute | `string \| number` | `undefined` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### RadioButton Events

| Event | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the standalone bound value changes | `(value: YhRadioValueType) => void` |
| `change` | Triggered when the standalone bound value changes | `(value: YhRadioValueType) => void` |

### RadioButton Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `default` | Radio button label content | - |

### RadioButton Expose

| Name | Description | Type |
| --- | --- | --- |
| `ref` | Native radio input element reference | `HTMLInputElement \| undefined` |
| `focus` | Focus the radio button input | `() => void` |
| `blur` | Blur the radio button input | `() => void` |

### RadioGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Bound value | `YhRadioValueType` | `undefined` |
| `options` | Optional option list rendered by the group | `YhRadioGroupOption[]` | `undefined` |
| `size` | Group size inherited by child radios | `'large' \| 'default' \| 'small'` | `undefined` |
| `disabled` | Disable the whole group | `boolean` | `false` |
| `name` | Native `name` attribute passed to child radios | `string` | `undefined` |
| `validate-event` | Trigger form validation when the group value changes | `boolean` | `true` |
| `text-color` | Checked text color in radio button mode | `string` | `undefined` |
| `fill` | Checked background and border color in radio button mode | `string` | `undefined` |
| `tag` | Wrapper tag or component | `string \| Component` | `'div'` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### RadioGroup Events

| Event | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the group value changes | `(value: YhRadioValueType) => void` |
| `change` | Triggered when the group value changes | `(value: YhRadioValueType) => void` |

### RadioGroup Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `default` | Custom group content | - |

When the default slot is empty and `options` is provided, the group renders `YhRadio` items from `options`.

### RadioGroup Expose

This component does not expose public instance methods or properties.

### Type Exports

| Type | Description |
| --- | --- |
| `YhRadioProps` | Radio props type |
| `YhRadioEmits` | Radio emits type |
| `YhRadioSlots` | Radio slots type |
| `YhRadioExpose` | Radio expose type |
| `YhRadioGroupProps` | Radio group props type |
| `YhRadioGroupEmits` | Radio group emits type |
| `YhRadioGroupOption` | Radio group option item type |
| `YhRadioButtonProps` | Radio button props type |
| `YhRadioButtonEmits` | Radio button emits type |
| `YhRadioButtonExpose` | Radio button expose type |
| `YhRadioValueType` | Shared value type |
| `YhRadioInstance` | Radio instance type |
| `YhRadioGroupInstance` | Radio group instance type |
| `YhRadioButtonInstance` | Radio button instance type |

### Theme Variables

`YhRadio`, `YhRadioGroup`, and `YhRadioButton` support `themeOverrides`. `YhRadioGroup.themeOverrides` is also inherited by child radios through injection.

Radio-related dedicated CSS variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-radio-size` | Radio control size | `14px` |
| `--yh-radio-input-border` | Radio border color | `var(--yh-border-color)` |
| `--yh-radio-checked-bg-color` | Checked background color | `var(--yh-color-primary)` |
| `--yh-radio-checked-border-color` | Checked border color | `var(--yh-color-primary)` |
| `--yh-radio-checked-icon-color` | Checked icon color token | `var(--yh-color-primary)` |
| `--yh-radio-text-color` | Label text color | `var(--yh-text-color-regular)` |

Radio button dedicated CSS variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-radio-button-font-size` | Button font size | `var(--yh-font-size-base)` |
| `--yh-radio-button-text-color` | Button text color | `var(--yh-text-color-regular)` |
| `--yh-radio-button-bg-color` | Button background color | `var(--yh-fill-color-blank)` |
| `--yh-radio-button-border-color` | Button border color | `var(--yh-border-color)` |
| `--yh-radio-button-hover-text-color` | Hover text color | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-bg-color` | Checked background color | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-border-color` | Checked border color | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-text-color` | Checked text color | `#ffffff` |
| `--yh-radio-button-disabled-bg-color` | Disabled background color | `var(--yh-fill-color-light)` |
| `--yh-radio-button-disabled-border-color` | Disabled border color | `var(--yh-border-color-light)` |
| `--yh-radio-button-disabled-text-color` | Disabled text color | `var(--yh-text-color-placeholder)` |
