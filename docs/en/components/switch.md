<script setup lang="ts">
import { ref, h, defineComponent } from 'vue'

// Icon components
const CheckIcon = defineComponent({
  name: 'CheckIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.656 706.944z' })
    ])
  }
})

const CloseIcon = defineComponent({
  name: 'CloseIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z' })
    ])
  }
})

const ViewIcon = defineComponent({
  name: 'ViewIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M512 160c320 0 512 352 512 352s-192 352-512 352S0 512 0 512s192-352 512-352zM149.76 512c41.28 74.88 124.16 192 362.24 192s320.96-117.12 362.24-192c-41.28-74.88-124.16-192-362.24-192S190.08 437.12 149.76 512zM512 592a80 80 0 110-160 80 80 0 010 160z' })
    ])
  }
})

const HideIcon = defineComponent({
  name: 'HideIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6s-16 3.2-22.4 9.6l-96 96c-57.6-35.2-128-57.6-214.4-57.6-320 0-512 352-512 352s73.6 134.4 192 246.4l-80 80c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6s16-3.2 22.4-9.6l688-688c6.4-6.4 9.6-12.8 9.6-22.4zM512 672c-89.6 0-160-70.4-160-160 0-25.6 6.4-48 16-70.4l214.4 214.4c-22.4 9.6-44.8 16-70.4 16zM1024 512s-73.6-134.4-192-246.4l-80 80c41.6 41.6 73.6 89.6 96 134.4-41.28 74.88-124.16 192-362.24 192-25.6 0-51.2-3.2-73.6-6.4l-64 64c44.8 12.8 89.6 22.4 137.6 22.4 320 0 512-352 512-352l-38.4-70.4-57.6 57.6c19.2 22.4 35.2 48 54.4 76.8z' })
    ])
  }
})

// Basic Usage
const basicValue = ref(true)

// Size
const sizeValue = ref(true)

// Text Description
const textValue1 = ref(false)
const textValue2 = ref(true)
const textValue3 = ref(true)

// Icons
const iconValue1 = ref(true)
const iconValue2 = ref(true)

// Extended value types
const extendValue = ref('100')

// Disabled
const disabledValue1 = ref(true)
const disabledValue2 = ref(false)

// Loading
const loadingValue1 = ref(true)
const loadingValue2 = ref(false)

// Prevent Switch
const beforeChangeValue1 = ref(false)
const beforeChangeValue2 = ref(false)
const loading1 = ref(false)
const loading2 = ref(false)

const beforeChange1 = () => {
  loading1.value = true
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      loading1.value = false
      resolve(true)
    }, 1000)
  })
}

const beforeChange2 = () => {
  loading2.value = true
  return new Promise<boolean>((_, reject) => {
    setTimeout(() => {
      loading2.value = false
      reject(new Error('rejected'))
    }, 1000)
  })
}

// Custom Action Icons
const actionIconValue1 = ref(true)
const actionIconValue2 = ref(false)

// Nuxt Usage Example
const nuxtSwitch = ref(true)

// Nuxt code sample
const tsNuxt = `<template>
  <div style="display: flex; gap: 16px;">
    <!-- Basic Switch, auto-imported -->
    <yh-switch v-model="nuxtSwitch" />
    
    <!-- With Text Description -->
    <yh-switch v-model="nuxtSwitch" active-text="ON" inactive-text="OFF" />
  </div>
</template>

<script setup lang="ts">
// No manual import needed for Switch component
const nuxtSwitch = ref(true)
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Code samples
const tsBasic = `<template>
  <yh-switch v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsSize = `<template>
  <yh-switch v-model="value" size="large" />
  <yh-switch v-model="value" />
  <yh-switch v-model="value" size="small" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

const tsText = `<template>
  <yh-switch v-model="value1" active-text="ON" inactive-text="OFF" />
  <yh-switch v-model="value2" active-text="Yes" inactive-text="No" inline-prompt />
  <yh-switch v-model="value3" active-text="Y" inactive-text="N" inline-prompt />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(false)
const value2 = ref(true)
const value3 = ref(true)
<\/script>`

const jsText = tsText.replace('lang="ts"', '')

const tsIcons = `<template>
  <yh-switch v-model="value1" :active-icon="CheckIcon" :inactive-icon="CloseIcon" />
  <yh-switch v-model="value2" inline-prompt :active-icon="CheckIcon" :inactive-icon="CloseIcon" />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const CheckIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.656 706.944z' })
    ])
  }
}

const CloseIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z' })
    ])
  }
}

const value1 = ref(true)
const value2 = ref(true)
<\/script>`

const jsIcons = tsIcons.replace('lang="ts"', '')

const tsValue = `<template>
  <yh-switch v-model="value" active-value="100" inactive-value="0" />
  <span>Value: {{ value }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref("100")
<\/script>`

const jsValue = tsValue.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-switch v-model="value1" disabled />
  <yh-switch v-model="value2" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
const value2 = ref(false)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsLoading = `<template>
  <yh-switch v-model="value1" loading />
  <yh-switch v-model="value2" loading />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
const value2 = ref(false)
<\/script>`

const jsLoading = tsLoading.replace('lang="ts"', '')

const tsBeforeChange = `<template>
  <yh-switch v-model="value1" :loading="loading1" :before-change="beforeChange1" />
  <yh-switch v-model="value2" :loading="loading2" :before-change="beforeChange2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(false)
const value2 = ref(false)
const loading1 = ref(false)
const loading2 = ref(false)

const beforeChange1 = () => {
  loading1.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false
      resolve(true)
    }, 1000)
  })
}

const beforeChange2 = () => {
  loading2.value = true
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false
      reject(new Error('rejected'))
    }, 1000)
  })
}
<\/script>`

const jsBeforeChange = tsBeforeChange.replace('lang="ts"', '')

const tsActionIcons = `<template>
  <yh-switch v-model="value1" :active-action-icon="ViewIcon" :inactive-action-icon="HideIcon" />
  <yh-switch v-model="value2" :active-action-icon="CheckIcon" :inactive-action-icon="CloseIcon" />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const CheckIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.656 706.944z' })
    ])
  }
}

const CloseIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z' })
    ])
  }
}

const ViewIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M512 160c320 0 512 352 512 352s-192 352-512 352S0 512 0 512s192-352 512-352zM149.76 512c41.28 74.88 124.16 192 362.24 192s320.96-117.12 362.24-192c-41.28-74.88-124.16-192-362.24-192S190.08 437.12 149.76 512zM512 592a80 80 0 110-160 80 80 0 010 160z' })
    ])
  }
}

const HideIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6s-16 3.2-22.4 9.6l-96 96c-57.6-35.2-128-57.6-214.4-57.6-320 0-512 352-512 352s73.6 134.4 192 246.4l-80 80c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6s16-3.2 22.4-9.6l688-688c6.4-6.4 9.6-12.8 9.6-22.4zM512 672c-89.6 0-160-70.4-160-160 0-25.6 6.4-48 16-70.4l214.4 214.4c-22.4 9.6-44.8 16-70.4 16zM1024 512s-73.6-134.4-192-246.4l-80 80c41.6 41.6 73.6 89.6 96 134.4-41.28 74.88-124.16 192-362.24 192-25.6 0-51.2-3.2-73.6-6.4l-64 64c44.8 12.8 89.6 22.4 137.6 22.4 320 0 512-352 512-352l-38.4-70.4-57.6 57.6c19.2 22.4 35.2 48 54.4 76.8z' })
    ])
  }
}

const value1 = ref(true)
const value2 = ref(false)
<\/script>`

const jsActionIcons = tsActionIcons.replace('lang="ts"', '')
</script>

# Switch

Used for toggling between two opposing states, such as "On/Off".

## Basic Usage

Bind `v-model` to a `Boolean` variable.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-switch v-model="basicValue" />
</DemoBlock>

## Size

Use the `size` property to set the dimensions of the Switch.

<DemoBlock title="Size" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; align-items: center; gap: 16px;">
    <yh-switch v-model="sizeValue" size="large" />
    <yh-switch v-model="sizeValue" />
    <yh-switch v-model="sizeValue" size="small" />
  </div>
</DemoBlock>

## Text Description

Use the `active-text` and `inactive-text` properties to set textual labels. Use `inline-prompt` to display the text inside the sliding handle area.

<DemoBlock title="Text Description" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-switch v-model="textValue1" active-text="ON" inactive-text="OFF" />
    <yh-switch v-model="textValue2" active-text="Yes" inactive-text="No" inline-prompt />
    <yh-switch v-model="textValue3" active-text="Y" inactive-text="N" inline-prompt />
  </div>
</DemoBlock>

## Custom Icons

Use the `active-icon` and `inactive-icon` properties to add icons. Use `inline-prompt` to place icons inside the sliding handle area.

<DemoBlock title="Custom Icons" :ts-code="tsIcons" :js-code="jsIcons">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="iconValue1" :active-icon="CheckIcon" :inactive-icon="CloseIcon" />
    <yh-switch v-model="iconValue2" :active-icon="CheckIcon" :inactive-icon="CloseIcon" inline-prompt />
  </div>
</DemoBlock>

## Extended Value Types

You can set `active-value` and `inactive-value` properties, which accept `Boolean`, `String`, or `Number` types.

<DemoBlock title="Extended Value Types" :ts-code="tsValue" :js-code="jsValue">
  <div style="display: flex; align-items: center; gap: 16px;">
    <yh-switch v-model="extendValue" active-value="100" inactive-value="0" />
    <span>Value: {{ extendValue }}</span>
  </div>
</DemoBlock>

## Disabled State

Set the `disabled` property to `true` to disable interaction.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="disabledValue1" disabled />
    <yh-switch v-model="disabledValue2" disabled />
  </div>
</DemoBlock>

## Loading State

Set the `loading` property to `true` to display a loading spinner.

<DemoBlock title="Loading State" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="loadingValue1" loading />
    <yh-switch v-model="loadingValue2" loading />
  </div>
</DemoBlock>

## Prevent Toggling

Use the `before-change` property. If it returns `false` or a `Promise` that rejects, the switch state will not change.

<DemoBlock title="Prevent Toggling" :ts-code="tsBeforeChange" :js-code="jsBeforeChange">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="beforeChangeValue1" :loading="loading1" :before-change="beforeChange1" />
    <yh-switch v-model="beforeChangeValue2" :loading="loading2" :before-change="beforeChange2" />
  </div>
</DemoBlock>

## Custom Action Icons

Use `active-action-icon` and `inactive-action-icon` to customize the icons inside the sliding handle (action point).

<DemoBlock title="Custom Action Icons" :ts-code="tsActionIcons" :js-code="jsActionIcons">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="actionIconValue1" :active-action-icon="ViewIcon" :inactive-action-icon="HideIcon" />
    <yh-switch v-model="actionIconValue2" :active-action-icon="CheckIcon" :inactive-action-icon="CloseIcon" />
  </div>
</DemoBlock>

## Usage in Nuxt

The Switch component fully supports Nuxt 3/4 SSR. When used in a Nuxt project, it is auto-imported.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="nuxtSwitch" />
    <yh-switch v-model="nuxtSwitch" active-text="ON" inactive-text="OFF" />
  </div>
</DemoBlock>

**SSR Considerations**:

- ✅ Basic switch state and sizing styles are fully supported.
- ✅ Text descriptions and icons render consistently during SSR.
- ✅ Extended Value types (`active-value`) are supported.
- ⚠️ Initial state remains consistent with client-side hydration after SSR.

::: tip SSR Safety
The Switch component is deeply optimized for SSR, ensuring that handle positions and colors are correctly calculated during server-side rendering for a fluid visual experience.
:::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value; must equal `active-value` or `inactive-value`. | `boolean \| string \| number` | `false` |
| disabled | Whether to disable the switch | `boolean` | `false` |
| loading | Whether to show loading state | `boolean` | `false` |
| size | Switch size | `'large' \| 'default' \| 'small'` | `'default'` |
| width | Switch total width | `number \| string` | — |
| inline-prompt | Whether to show icons/text inside the handle (max 3 chars) | `boolean` | `false` |
| active-icon | Icon displayed when status is ON (ignores `active-text`) | `string \| Component` | — |
| inactive-icon | Icon displayed when status is OFF (ignores `inactive-text`) | `string \| Component` | — |
| active-action-icon | Icon displayed inside the sliding handle when ON | `string \| Component` | — |
| inactive-action-icon | Icon displayed inside the sliding handle when OFF | `string \| Component` | — |
| active-text | Text displayed when switch is ON | `string` | — |
| inactive-text | Text displayed when switch is OFF | `string` | — |
| active-value | Value when status is ON | `boolean \| string \| number` | `true` |
| inactive-value | Value when status is OFF | `boolean \| string \| number` | `false` |
| name | Form name attribute | `string` | — |
| validate-event | Whether to trigger form validation on change | `boolean` | `true` |
| before-change | Hook before toggle; returning `false` or rejecting stops toggle | `() => Promise<boolean> \| boolean` | — |
| id | Input ID | `string` | — |
| tabindex | Input tabindex | `string \| number` | — |
| aria-label | Native input `aria-label` equivalent | `string` | — |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| change | Callback function when switch state changes | `(value: boolean \| string \| number) => void` |

### Slots

| Name | Description |
| --- | --- |
| active-action | Custom content for the sliding handle (Action) when ON |
| inactive-action | Custom content for the sliding handle (Action) when OFF |
| active | Custom content when ON (inside handle if inline-prompt, else right side) |
| inactive | Custom content when OFF (inside handle if inline-prompt, else left side) |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the Switch | `() => void` |
| checked | Whether the Switch is currently active | `ComputedRef<boolean>` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-switch-on-color` | Background color when active | `var(--yh-color-primary)` |
| `--yh-switch-off-color` | Background color when inactive | `var(--yh-border-color)` |
| `--yh-switch-width` | Total switch width | `40px` |
| `--yh-switch-height` | Total switch height | `20px` |
| `--yh-switch-button-size` | Sliding handle size | `16px` |
| `--yh-switch-font-size` | Font size | `var(--yh-font-size-base)` |
