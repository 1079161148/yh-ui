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

- ✅ Single checkbox and checkbox groups fully supported
- ✅ All visual states (checked, disabled, border, etc.) are consistent in SSR
- ✅ Indeterminate state styling supported

::: tip SSR Safety
The Checkbox component has passed comprehensive SSR testing, ensuring server-rendered results are consistent with client-side hydrated structures, avoiding Hydration warnings.
:::

## API

### Checkbox Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| number \| boolean` | — |
| value | Value when checked (used in checkbox-group) | `string \| number \| boolean` | — |
| label | Display text (if no default slot) | `string` | — |
| true-value | Value when checked | `string \| number \| boolean` | `true` |
| false-value | Value when unchecked | `string \| number \| boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| indeterminate | Set indeterminate state (style only) | `boolean` | `false` |
| border | Whether to show border | `boolean` | `false` |
| size | Checkbox size | `'large' \| 'default' \| 'small'` | `'default'` |
| name | Native name attribute | `string` | — |
| checked | Whether currently checked | `boolean` | — |
| id | Input id | `string` | — |
| tabindex | Input tabindex | `string \| number` | — |

### Checkbox Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when binding value changes | `(value: string \| number \| boolean) => void` |

### Checkbox Slots

| Slot Name | Description |
| --- | --- |
| default | Custom default content |

### Checkbox Expose

| Name | Description | Type |
| --- | --- | --- |
| ref | Native input element | `Ref<HTMLInputElement>` |
| checked | Whether checked | `boolean` |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |

### CheckboxGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `Array<string \| number \| boolean>` | `[]` |
| size | Checkbox group size | `'large' \| 'default' \| 'small'` | — |
| disabled | Whether disabled | `boolean` | `false` |
| min | Minimum number of checkable items | `number` | — |
| max | Maximum number of checkable items | `number` | — |
| text-color | Active text color | `string` | — |
| fill | Active fill and border color | `string` | — |
| tag | Custom element tag | `string \| Component` | `'div'` |

### CheckboxGroup Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when binding value changes | `(value: Array<string \| number \| boolean>) => void` |

### CheckboxGroup Slots

| Slot Name | Description |
| --- | --- |
| default | Custom default content |

## Theme Variables

The Checkbox component uses the following CSS variables for style customization:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-checkbox-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-checkbox-text-color` | Text color | `var(--yh-text-color-regular)` |
| `--yh-checkbox-input-size` | Checkbox size | `14px` |
| `--yh-checkbox-input-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-checkbox-input-bg-color` | Background color | `var(--yh-fill-color-blank)` |
| `--yh-checkbox-checked-bg-color` | Checked background | `var(--yh-color-primary)` |
| `--yh-checkbox-checked-border-color` | Checked border | `var(--yh-color-primary)` |
| `--yh-checkbox-checked-icon-color` | Checked icon color | `var(--yh-fill-color-blank)` |
| `--yh-checkbox-disabled-bg-color` | Disabled background | `var(--yh-fill-color-light)` |
| `--yh-checkbox-disabled-text-color` | Disabled text color | `var(--yh-text-color-placeholder)` |
