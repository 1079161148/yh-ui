# Checkbox

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Demo state
const checked1 = ref(true)
const checked2 = ref(false)
const checkedDisabled1 = ref(false)
const checkedDisabled2 = ref(true)
const customValue = ref('yes')
const indeterminate = ref(true)
const checkAll = ref(false)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
const checkedList = ref(['Option A'])
const disabledChecked = ref(true)
const borderChecked = ref(true)
const borderUnchecked = ref(false)
const sizeChecked = ref(true)

// Nuxt usage example
const nuxtChecked = ref(false)
const nuxtItems = ref(['Option 1'])

const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <!-- Single checkbox, auto-imported -->
    <yh-checkbox v-model="nuxtChecked">Agree to Terms</yh-checkbox>
    
    <!-- Checkbox group -->
    <yh-checkbox-group v-model="nuxtItems">
      <yh-checkbox value="Option 1">Option 1</yh-checkbox>
      <yh-checkbox value="Option 2">Option 2</yh-checkbox>
    </yh-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhCheckbox and YhCheckboxGroup
const nuxtChecked = ref(false)
const nuxtItems = ref(['Option 1'])
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Ensure correct client-side initialization
onMounted(() => {
  checked1.value = true
  checkedDisabled2.value = true
  borderChecked.value = true
  sizeChecked.value = true
  customValue.value = 'yes'
})

// Select all handling
const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? [...cities] : []
  indeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  indeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

// TypeScript code examples
const tsBasic = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checked1">Option 1</yh-checkbox>
    <yh-checkbox v-model="checked2">Option 2</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checked1 = ref(true)
const checked2 = ref(false)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checkedDisabled1" disabled>Unchecked Disabled</yh-checkbox>
    <yh-checkbox v-model="checkedDisabled2" disabled>Checked Disabled</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checkedDisabled1 = ref(false)
const checkedDisabled2 = ref(true)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsGroup = `<template>
  <yh-checkbox-group v-model="checkedList">
    <yh-checkbox value="Option A">Option A</yh-checkbox>
    <yh-checkbox value="Option B">Option B</yh-checkbox>
    <yh-checkbox value="Option C">Option C</yh-checkbox>
    <yh-checkbox value="Option D" disabled>Disabled</yh-checkbox>
  </yh-checkbox-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checkedList = ref(['Option A'])
<\/script>`

const jsGroup = tsGroup.replace('lang="ts"', '')

const tsIndeterminate = `<template>
  <yh-checkbox
    v-model="checkAll"
    :indeterminate="indeterminate"
    @change="handleCheckAllChange"
  >
    Select All
  </yh-checkbox>
  <yh-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <yh-checkbox v-for="city in cities" :key="city" :value="city">
      {{ city }}
    </yh-checkbox>
  </yh-checkbox-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const checkAll = ref(false)
const indeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? [...cities] : []
  indeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  indeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
<\/script>`

const jsIndeterminate = tsIndeterminate.replace('lang="ts"', '').replace(': boolean', '').replace(': string[]', '')

const tsBorder = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="borderChecked" border>Border Mode</yh-checkbox>
    <yh-checkbox v-model="borderUnchecked" border>Unchecked Border</yh-checkbox>
    <yh-checkbox v-model="borderChecked" border disabled>Disabled Border</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const borderChecked = ref(true)
const borderUnchecked = ref(false)
<\/script>`

const jsBorder = tsBorder.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-checkbox v-model="sizeChecked" size="large" border>Large</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" border>Default</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" size="small" border>Small</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const sizeChecked = ref(true)
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsMinMax = `<template>
  <yh-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <yh-checkbox v-for="city in cities" :key="city" :value="city">
      {{ city }}
    </yh-checkbox>
  </yh-checkbox-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checkedCities = ref(['Shanghai'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
<\/script>`

const jsMinMax = tsMinMax.replace('lang="ts"', '')

const tsTrueValue = `<template>
  <yh-checkbox
    v-model="customValue"
    true-value="yes"
    false-value="no"
  >
    Custom Value (current: {{ customValue }})
  </yh-checkbox>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const customValue = ref('yes')
<\/script>`

const jsTrueValue = tsTrueValue.replace('lang="ts"', '')
</script>

Select multiple options from a set of alternatives.

## Basic Usage

Used alone, it can toggle between two states. Bind a `Boolean` variable with `v-model`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checked1">Option 1</yh-checkbox>
    <yh-checkbox v-model="checked2">Option 2</yh-checkbox>
  </div>
</DemoBlock>

## Disabled

Use the `disabled` prop to control the checkbox disabled state.

<DemoBlock title="Disabled" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checkedDisabled1" disabled>Unchecked Disabled</yh-checkbox>
    <yh-checkbox v-model="checkedDisabled2" disabled>Checked Disabled</yh-checkbox>
  </div>
</DemoBlock>

## Checkbox Group

Useful when binding multiple checkboxes to the same array.

<DemoBlock title="Checkbox Group" :ts-code="tsGroup" :js-code="jsGroup">
  <yh-checkbox-group v-model="checkedList">
    <yh-checkbox value="Option A">Option A</yh-checkbox>
    <yh-checkbox value="Option B">Option B</yh-checkbox>
    <yh-checkbox value="Option C">Option C</yh-checkbox>
    <yh-checkbox value="Option D" disabled>Disabled</yh-checkbox>
  </yh-checkbox-group>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Checked: {{ checkedList }}</p>
</DemoBlock>

## Indeterminate

The `indeterminate` prop represents the checkbox's indeterminate state, commonly used to implement a "select all" effect.

<DemoBlock title="Indeterminate (Select All)" :ts-code="tsIndeterminate" :js-code="jsIndeterminate">
  <div>
    <yh-checkbox
      v-model="checkAll"
      :indeterminate="indeterminate"
      @change="handleCheckAllChange"
    >
      Select All
    </yh-checkbox>
    <div style="margin: 16px 0;border-top: 1px solid var(--yh-border-color-light);"></div>
    <yh-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <yh-checkbox v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </yh-checkbox>
    </yh-checkbox-group>
  </div>
</DemoBlock>

## With Border

Use the `border` prop to render checkboxes with borders.

<DemoBlock title="With Border" :ts-code="tsBorder" :js-code="jsBorder">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="borderChecked" border>Border Mode</yh-checkbox>
    <yh-checkbox v-model="borderUnchecked" border>Unchecked Border</yh-checkbox>
    <yh-checkbox v-model="borderChecked" border disabled>Disabled Border</yh-checkbox>
  </div>
</DemoBlock>

## Sizes

Use the `size` prop to set checkbox sizes.

<DemoBlock title="Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-checkbox v-model="sizeChecked" size="large" border>Large</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" border>Default</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" size="small" border>Small</yh-checkbox>
  </div>
</DemoBlock>

## Limit Selection Count

Use `min` and `max` props to limit the number of items that can be checked.

<DemoBlock title="Limit Selection Count" :ts-code="tsMinMax" :js-code="jsMinMax">
  <div>
    <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">Min 1, Max 2</p>
    <yh-checkbox-group v-model="checkedCities" :min="1" :max="2">
      <yh-checkbox v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </yh-checkbox>
    </yh-checkbox-group>
  </div>
</DemoBlock>

## Custom Check Values

Use `true-value` and `false-value` props to customize the checked and unchecked values.

<DemoBlock title="Custom Check Values" :ts-code="tsTrueValue" :js-code="jsTrueValue">
  <yh-checkbox
    v-model="customValue"
    true-value="yes"
    false-value="no"
  >
    Custom Value
  </yh-checkbox>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Bound value type: {{ typeof customValue }}, value: {{ customValue }}</p>
</DemoBlock>

## Use in Nuxt

The Checkbox component fully supports SSR rendering in Nuxt 3/4. Components are auto-imported in Nuxt projects.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-checkbox v-model="nuxtChecked">Agree to Terms</yh-checkbox>
    <yh-checkbox-group v-model="nuxtItems">
      <yh-checkbox value="Option 1">Option 1</yh-checkbox>
      <yh-checkbox value="Option 2">Option 2</yh-checkbox>
    </yh-checkbox-group>
  </div>
</DemoBlock>

**SSR Notes**:

- Single checkboxes and checkbox groups can be rendered during SSR.
- Checked, disabled, border, and other visual states stay consistent after hydration.
- The indeterminate state is style-only and can also be rendered safely on the server.

::: tip SSR Safety
The Checkbox component has passed comprehensive SSR testing, ensuring server-rendered results are consistent with client-side hydrated structures, avoiding Hydration warnings.
:::

## API

### Props

#### Checkbox

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Bound value. | `YhCheckboxValueType` | `undefined` |
| value | Value used in checkbox-group mode. | `YhCheckboxValueType` | `undefined` |
| label | Display text when no default slot is provided. | `string` | `undefined` |
| true-value | Value when checked | `string \| number \| boolean` | `true` |
| false-value | Value when unchecked | `string \| number \| boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| indeterminate | Set indeterminate state (style only) | `boolean` | `false` |
| border | Whether to show border | `boolean` | `false` |
| size | Checkbox size | `'large' \| 'default' \| 'small'` | `'default'` |
| validate-event | Whether form validation is triggered on value change. | `boolean` | `true` |
| name | Native name attribute | `string` | `undefined` |
| checked | Controlled checked state | `boolean` | `undefined` |
| id | Native input id | `string` | `undefined` |
| tabindex | Native tabindex value | `string \| number` | `undefined` |
| theme-overrides | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

#### Checkbox Group

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `Array<string \| number \| boolean>` | `[]` |
| options | Optional group option list | `YhCheckboxGroupOption[]` | `undefined` |
| size | Checkbox group size | `'large' \| 'default' \| 'small'` | `undefined` |
| disabled | Whether disabled | `boolean` | `false` |
| min | Minimum number of checked items | `number` | `undefined` |
| max | Maximum number of checked items | `number` | `undefined` |
| validate-event | Whether to trigger form validation on change | `boolean` | `true` |
| text-color | Active text color for button-like usage | `string` | `undefined` |
| fill | Active fill and border color for button-like usage | `string` | `undefined` |
| tag | Wrapper element tag | `string \| Component` | `'div'` |
| theme-overrides | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

### Events

#### Checkbox

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when binding value changes | `(value: string \| number \| boolean) => void` |
| update:modelValue | Triggered when the bound value changes | `(value: string \| number \| boolean) => void` |

#### Checkbox Group

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when checked values change | `(value: Array<string \| number \| boolean>) => void` |
| update:modelValue | Triggered when the bound array changes | `(value: Array<string \| number \| boolean>) => void` |

### Slots

#### Checkbox

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Custom checkbox content. | - |

#### Checkbox Group

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Custom group content. | - |

### Expose

#### Checkbox

| Name | Description | Type |
| --- | --- | --- |
| ref | Native input element. | `HTMLInputElement \| undefined` |
| checked | Whether checked | `boolean` |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |

`YhCheckboxGroup` does not expose public instance methods or properties.

### Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-checkbox-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-checkbox-font-weight` | Font weight | `var(--yh-font-weight-medium)` |
| `--yh-checkbox-text-color` | Text color | `var(--yh-text-color-regular)` |
| `--yh-checkbox-input-height` | Checkbox input height | `14px` |
| `--yh-checkbox-input-width` | Checkbox input width | `14px` |
| `--yh-checkbox-border-radius` | Checkbox corner radius | `var(--yh-radius-sm)` |
| `--yh-checkbox-bg-color` | Checkbox input background color | `var(--yh-fill-color-blank)` |
| `--yh-checkbox-input-border` | Checkbox input border | `1px solid var(--yh-border-color)` |
| `--yh-checkbox-input-border-color-hover` | Hover border color | `var(--yh-color-primary)` |
| `--yh-checkbox-checked-bg-color` | Checked background | `var(--yh-color-primary)` |
| `--yh-checkbox-checked-icon-color` | Checked icon color | `var(--yh-fill-color-blank)` |
| `--yh-checkbox-checked-text-color` | Checked text color | `var(--yh-color-primary)` |
| `--yh-checkbox-disabled-input-fill` | Disabled input background | `var(--yh-fill-color-light)` |
| `--yh-checkbox-disabled-border-color` | Disabled border color | `var(--yh-border-color)` |
| `--yh-checkbox-disabled-icon-color` | Disabled icon color | `var(--yh-text-color-placeholder)` |
| `--yh-checkbox-disabled-checked-input-fill` | Disabled checked background | `var(--yh-border-color)` |
| `--yh-checkbox-disabled-checked-input-border-color` | Disabled checked border color | `var(--yh-border-color)` |
| `--yh-checkbox-disabled-checked-icon-color` | Disabled checked icon color | `#fff` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhCheckboxProps` | Props type for `YhCheckbox` |
| `YhCheckboxEmits` | Emits type for `YhCheckbox` |
| `YhCheckboxSlots` | Slots type for `YhCheckbox` |
| `YhCheckboxExpose` | Expose type for `YhCheckbox` |
| `YhCheckboxGroupProps` | Props type for `YhCheckboxGroup` |
| `YhCheckboxGroupEmits` | Emits type for `YhCheckboxGroup` |
| `YhCheckboxGroupOption` | Group option type |
| `YhCheckboxValueType` | Checkbox value type |
| `YhCheckboxInstance` | Public instance type for `YhCheckbox` |
| `YhCheckboxGroupInstance` | Public instance type for `YhCheckboxGroup` |
