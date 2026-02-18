# Button

<script setup lang="ts">
import { ref } from 'vue'

// TypeScript code examples
const tsBasic = `<template>
  <yh-button>Default</yh-button>
  <yh-button type="primary">Primary</yh-button>
  <yh-button type="success">Success</yh-button>
  <yh-button type="warning">Warning</yh-button>
  <yh-button type="danger">Danger</yh-button>
  <yh-button type="info">Info</yh-button>
<\/template>`

const jsBasic = tsBasic

const tsPlain = `<template>
  <yh-button plain>Plain</yh-button>
  <yh-button type="primary" plain>Primary</yh-button>
  <yh-button type="success" plain>Success</yh-button>
  <yh-button type="warning" plain>Warning</yh-button>
  <yh-button type="danger" plain>Danger</yh-button>
  <yh-button type="info" plain>Info</yh-button>
<\/template>`

const jsPlain = tsPlain

const tsRound = `<template>
  <yh-button round>Round</yh-button>
  <yh-button type="primary" round>Primary</yh-button>
  <yh-button type="success" round>Success</yh-button>
  <yh-button type="warning" round>Warning</yh-button>
  <yh-button type="danger" round>Danger</yh-button>
  <yh-button type="info" round>Info</yh-button>
<\/template>`

const jsRound = tsRound

const tsCircle = `<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="primary" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="success" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="warning" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="danger" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="info" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
<\/template>`

const jsCircle = tsCircle

const tsDisabled = `<template>
  <yh-button disabled>Disabled</yh-button>
  <yh-button type="primary" disabled>Primary</yh-button>
  <yh-button type="success" disabled>Success</yh-button>
<\/template>`

const jsDisabled = tsDisabled

const tsLoading = `<template>
  <yh-button loading>Loading</yh-button>
  <yh-button type="primary" loading>Loading</yh-button>
  <yh-button type="success" loading>Loading</yh-button>
<\/template>`

const jsLoading = tsLoading

const tsSizes = `<template>
  <yh-button size="large">Large</yh-button>
  <yh-button>Default</yh-button>
  <yh-button size="small">Small</yh-button>
<\/template>`

const jsSizes = tsSizes

const tsText = `<template>
  <yh-button text>Text</yh-button>
  <yh-button type="primary" text>Primary</yh-button>
  <yh-button type="success" text>Success</yh-button>
<\/template>`

const jsText = tsText

const tsLink = `<template>
  <yh-button link>Link</yh-button>
  <yh-button type="primary" link>Primary Link</yh-button>
  <yh-button type="danger" link>Danger Link</yh-button>
<\/template>`

const jsLink = tsLink

const tsBlock = `<template>
  <yh-button type="primary" block>Block Button</yh-button>
<\/template>`

const jsBlock = tsBlock

const tsCustomColor = `<template>
  <yh-button color="#6366f1">Indigo</yh-button>
  <yh-button color="#8b5cf6">Purple</yh-button>
  <yh-button color="#ec4899">Pink</yh-button>
  <yh-button color="#6366f1" plain>Indigo Plain</yh-button>
<\/template>`

const jsCustomColor = tsCustomColor

const tsIconPosition = `<template>
  <div style="display: flex; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
    <!-- Left icon (default) -->
    <yh-button type="primary">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Left Icon
    </yh-button>

    <!-- Right icon -->
    <yh-button type="success" icon-position="right">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Right Icon
    </yh-button>

    <!-- Top icon (vertical layout) -->
    <yh-button type="warning" icon-position="top">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Top Icon
    </yh-button>

    <!-- Bottom icon (vertical layout) -->
    <yh-button type="danger" icon-position="bottom">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Bottom Icon
    </yh-button>

    <!-- Suffix icon (suffixIcon slot) -->
    <yh-button type="info">
      Content
      <template #suffixIcon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
<\/template>`

const jsIconPosition = tsIconPosition

// Nuxt usage example
const tsNuxt = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <!-- Auto-imported, use directly -->
    <yh-button type="primary" @click="nuxtHandleClick">
      Submit Form
    </yh-button>
    
    <!-- Combined with Nuxt async operations -->
    <yh-button :loading="nuxtPending" @click="nuxtFetchData">
      {{ nuxtPending ? 'Loading...' : 'Fetch Data' }}
    </yh-button>
  </div>
</template>

<script setup lang="ts">
// No need to import Button component
const nuxtPending = ref(false)

const nuxtHandleClick = () => {
  // YhMessage is also auto-imported
  YhMessage.success('Form submitted successfully!')
}

const nuxtFetchData = () => {
  nuxtPending.value = true
  setTimeout(() => {
    nuxtPending.value = false
  }, 2000)
}
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Demo state
const nuxtPending = ref(false)
const nuxtHandleClick = () => {
  alert('Form submitted successfully!')
}
const nuxtFetchData = () => {
  nuxtPending.value = true
  setTimeout(() => {
    nuxtPending.value = false
  }, 2000)
}
</script>

Common action buttons.

## Basic Usage

Use the `type` prop to define the button type.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-flex">
    <yh-button>Default</yh-button>
    <yh-button type="primary">Primary</yh-button>
    <yh-button type="success">Success</yh-button>
    <yh-button type="warning">Warning</yh-button>
    <yh-button type="danger">Danger</yh-button>
    <yh-button type="info">Info</yh-button>
  </div>
</DemoBlock>

## Plain Button

Use the `plain` prop to set a plain button style.

<DemoBlock title="Plain Button" :ts-code="tsPlain" :js-code="jsPlain">
  <div class="yh-demo-flex">
    <yh-button plain>Plain</yh-button>
    <yh-button type="primary" plain>Primary</yh-button>
    <yh-button type="success" plain>Success</yh-button>
    <yh-button type="warning" plain>Warning</yh-button>
    <yh-button type="danger" plain>Danger</yh-button>
    <yh-button type="info" plain>Info</yh-button>
  </div>
</DemoBlock>

## Round Button

Use the `round` prop to set rounded button corners.

<DemoBlock title="Round Button" :ts-code="tsRound" :js-code="jsRound">
  <div class="yh-demo-flex">
    <yh-button round>Round</yh-button>
    <yh-button type="primary" round>Primary</yh-button>
    <yh-button type="success" round>Success</yh-button>
    <yh-button type="warning" round>Warning</yh-button>
    <yh-button type="danger" round>Danger</yh-button>
    <yh-button type="info" round>Info</yh-button>
  </div>
</DemoBlock>

## Circle Button

Use the `circle` prop to create circle buttons, typically used for icon-only buttons.

<DemoBlock title="Circle Button" :ts-code="tsCircle" :js-code="jsCircle">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="primary" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="success" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="warning" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="danger" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="info" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
</DemoBlock>

## Disabled

Use the `disabled` prop to control the disabled state.

<DemoBlock title="Disabled" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button disabled>Disabled</yh-button>
    <yh-button type="primary" disabled>Primary</yh-button>
    <yh-button type="success" disabled>Success</yh-button>
  </div>
</DemoBlock>

## Loading

Use the `loading` prop to control the loading state.

<DemoBlock title="Loading" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button loading>Loading</yh-button>
    <yh-button type="primary" loading>Loading</yh-button>
    <yh-button type="success" loading>Loading</yh-button>
  </div>
</DemoBlock>

## Sizes

Use the `size` prop to set the button size.

<DemoBlock title="Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
    <yh-button size="large">Large</yh-button>
    <yh-button>Default</yh-button>
    <yh-button size="small">Small</yh-button>
  </div>
</DemoBlock>

## Text Button

Use the `text` prop to set a text-style button.

<DemoBlock title="Text Button" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button text>Text</yh-button>
    <yh-button type="primary" text>Primary</yh-button>
    <yh-button type="success" text>Success</yh-button>
  </div>
</DemoBlock>

## Link Button

Use the `link` prop to set a link-style button.

<DemoBlock title="Link Button" :ts-code="tsLink" :js-code="jsLink">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button link>Link</yh-button>
    <yh-button type="primary" link>Primary Link</yh-button>
    <yh-button type="danger" link>Danger Link</yh-button>
  </div>
</DemoBlock>

## Block Button

Use the `block` prop to create a full-width block button.

<DemoBlock title="Block Button" :ts-code="tsBlock" :js-code="jsBlock">
  <div style="max-width: 400px;">
    <yh-button type="primary" block>Block Button</yh-button>
  </div>
</DemoBlock>

## Custom Color

Use the `color` prop to customize button colors.

<DemoBlock title="Custom Color" :ts-code="tsCustomColor" :js-code="jsCustomColor">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button color="#6366f1">Indigo</yh-button>
    <yh-button color="#8b5cf6">Purple</yh-button>
    <yh-button color="#ec4899">Pink</yh-button>
    <yh-button color="#6366f1" plain>Indigo Plain</yh-button>
  </div>
</DemoBlock>

## Icon Position

Control the icon position relative to text with the `icon-position` prop. Supports `left` (default), `right`, `top`, `bottom`.

<DemoBlock title="Icon Position" :ts-code="tsIconPosition" :js-code="jsIconPosition">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start;">
    <yh-button type="primary">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Left Icon
    </yh-button>
    <yh-button type="success" icon-position="right">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Right Icon
    </yh-button>
    <yh-button type="warning" icon-position="top">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Top Icon
    </yh-button>
    <yh-button type="danger" icon-position="bottom">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      Bottom Icon
    </yh-button>
    <yh-button type="info">
      Content
      <template #suffixIcon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
</DemoBlock>

## Use in Nuxt

The Button component fully supports Nuxt 3/4 SSR rendering. In Nuxt projects, the component is auto-imported without manual registration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button type="primary" @click="nuxtHandleClick">
      Submit Form
    </yh-button>
    <yh-button :loading="nuxtPending" @click="nuxtFetchData">
      {{ nuxtPending ? 'Loading...' : 'Fetch Data' }}
    </yh-button>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ All props and styles fully supported
- ✅ Event bindings work correctly
- ✅ Slot content fully rendered
- ✅ Dynamic states (loading, disabled, etc.)
- ⚠️ `autofocus` only takes effect on client-side

::: tip SSR Safety
The Button component has passed comprehensive SSR testing, ensuring consistent rendering between server and client.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Button type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| size | Button size | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | Whether disabled | `boolean` | `false` |
| loading | Whether loading | `boolean` | `false` |
| plain | Whether plain style | `boolean` | `false` |
| round | Whether rounded | `boolean` | `false` |
| circle | Whether circular | `boolean` | `false` |
| text | Whether text button | `boolean` | `false` |
| link | Whether link button | `boolean` | `false` |
| block | Whether block-level button | `boolean` | `false` |
| native-type | Native type attribute | `'button' \| 'submit' \| 'reset'` | `'button'` |
| autofocus | Whether auto-focus | `boolean` | `false` |
| icon | Left icon component | `string \| Component` | — |
| suffix-icon | Right icon component | `string \| Component` | — |
| icon-position | Icon position | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |
| color | Custom button color | `string` | — |
| tag | Custom element tag | `string \| Component` | `'button'` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when button is clicked | `(event: MouseEvent) => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Button content |
| icon | Custom content (affected by icon-position) |
| suffixIcon | Independent suffix slot (fixed on the right) |
| loading | Custom loading icon |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| ref | Button DOM element reference | `HTMLButtonElement \| undefined` |
| size | Computed actual size | `ButtonSize` |
| type | Button type | `ButtonType` |
| disabled | Whether disabled | `boolean` |

## Theme Variables

The Button component supports customizing local styles by overriding the following CSS variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-button-bg-color` | Button background color | `var(--yh-fill-color-blank)` |
| `--yh-button-text-color` | Button text color | `var(--yh-text-color-regular)` |
| `--yh-button-border-color` | Button border color | `var(--yh-border-color)` |
| `--yh-button-hover-bg-color` | Hover background color | `var(--yh-color-primary-light-9)` |
| `--yh-button-hover-text-color` | Hover text color | `var(--yh-color-primary)` |
| `--yh-button-hover-border-color` | Hover border color | `var(--yh-color-primary-light-8)` |
| `--yh-button-active-bg-color` | Active/click background color | `var(--yh-color-primary-light-8)` |
| `--yh-button-active-border-color` | Active/click border color | `var(--yh-color-primary)` |
| `--yh-button-active-text-color` | Active/click text color | — |
