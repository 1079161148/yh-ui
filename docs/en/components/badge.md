# Badge

<script setup lang="ts">
import { ref } from 'vue'

// Code examples
const tsBasic = `<template>
  <yh-badge :value="12">
    <yh-button>Messages</yh-button>
  </yh-badge>
  <yh-badge :value="3" type="primary">
    <yh-button>Comments</yh-button>
  </yh-badge>
  <yh-badge :value="1" type="success">
    <yh-button>Replies</yh-button>
  </yh-badge>
  <yh-badge :value="2" type="warning">
    <yh-button>Reminders</yh-button>
  </yh-badge>
<\/template>`

const jsBasic = tsBasic

const tsMax = `<template>
  <yh-badge :value="200" :max="99">
    <yh-button>Messages</yh-button>
  </yh-badge>
  <yh-badge :value="100" :max="10">
    <yh-button>Comments</yh-button>
  </yh-badge>
<\/template>`

const jsMax = tsMax

const tsDot = `<template>
  <yh-badge is-dot>
    <yh-button>Messages</yh-button>
  </yh-badge>
  <yh-badge is-dot type="success">
    <yh-button>Comments</yh-button>
  </yh-badge>
  <yh-badge is-dot type="warning">
    <yh-button icon>📧</yh-button>
  </yh-badge>
<\/template>`

const jsDot = tsDot

const tsText = `<template>
  <yh-badge value="new">
    <yh-button>Messages</yh-button>
  </yh-badge>
  <yh-badge value="hot">
    <yh-button>Comments</yh-button>
  </yh-badge>
<\/template>`

const jsText = tsText

const tsColor = `<template>
  <yh-badge :value="8" color="#8B5CF6">
    <yh-button>Purple</yh-button>
  </yh-badge>
  <yh-badge :value="8" color="#06B6D4">
    <yh-button>Cyan</yh-button>
  </yh-badge>
  <yh-badge :value="8" color="#F97316">
    <yh-button>Orange</yh-button>
  </yh-badge>
<\/template>`

const jsColor = tsColor

const tsOffset = `<template>
  <yh-badge :value="8" :offset="[10, -10]">
    <yh-button>Offset</yh-button>
  </yh-badge>
<\/template>`

const jsOffset = tsOffset

const tsShowZero = `<template>
  <yh-badge :value="0">
    <yh-button>Hide Zero</yh-button>
  </yh-badge>
  <yh-badge :value="0" show-zero>
    <yh-button>Show Zero</yh-button>
  </yh-badge>
<\/template>`

const jsShowZero = tsShowZero

const tsSlot = `<template>
  <yh-badge>
    <template #content>
      <span style="font-size: 10px;">VIP</span>
    </template>
    <yh-button>Custom Content</yh-button>
  </yh-badge>
<\/template>`

const jsSlot = tsSlot

const tsStandalone = `<template>
  <yh-badge :value="12" />
  <yh-badge :value="3" type="success" />
  <yh-badge is-dot type="warning" />
<\/template>`

const jsStandalone = tsStandalone

// Nuxt usage example
const tsNuxt = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px;">
    <!-- Basic badge, auto-imported -->
    <yh-badge :value="8">
      <yh-button>Nuxt Messages</yh-button>
    </yh-badge>
    
    <!-- Combined with Nuxt state management -->
    <yh-badge :value="unreadCount" type="danger">
      <yh-button type="primary">Unread Notifications</yh-button>
    </yh-badge>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhBadge
const unreadCount = ref(12)
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

A number or status marker that appears next to buttons or icons.

## Basic Usage

Use the `value` prop to define the displayed number, and the `type` prop to set different types.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-flex">
    <yh-badge :value="12">
      <yh-button>Messages</yh-button>
    </yh-badge>
    <yh-badge :value="3" type="primary">
      <yh-button>Comments</yh-button>
    </yh-badge>
    <yh-badge :value="1" type="success">
      <yh-button>Replies</yh-button>
    </yh-badge>
    <yh-badge :value="2" type="warning">
      <yh-button>Reminders</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Maximum Value

Use the `max` prop to set the maximum value. Values exceeding the max will display `{max}+`.

<DemoBlock title="Maximum Value" :ts-code="tsMax" :js-code="jsMax">
  <div class="yh-demo-flex">
    <yh-badge :value="200" :max="99">
      <yh-button>Messages</yh-button>
    </yh-badge>
    <yh-badge :value="100" :max="10">
      <yh-button>Comments</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Dot Badge

Use the `is-dot` prop to display a dot indicator.

<DemoBlock title="Dot Badge" :ts-code="tsDot" :js-code="jsDot">
  <div class="yh-demo-flex">
    <yh-badge is-dot>
      <yh-button>Messages</yh-button>
    </yh-badge>
    <yh-badge is-dot type="success">
      <yh-button>Comments</yh-button>
    </yh-badge>
    <yh-badge is-dot type="warning">
      <yh-button>📧</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Text Content

The `value` prop can also accept strings to display text content.

<DemoBlock title="Text Content" :ts-code="tsText" :js-code="jsText">
  <div class="yh-demo-flex">
    <yh-badge value="new">
      <yh-button>Messages</yh-button>
    </yh-badge>
    <yh-badge value="hot">
      <yh-button>Comments</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Custom Color

Customize the badge color through the `color` prop.

<DemoBlock title="Custom Color" :ts-code="tsColor" :js-code="jsColor">
  <div class="yh-demo-flex">
    <yh-badge :value="8" color="#8B5CF6">
      <yh-button>Purple</yh-button>
    </yh-badge>
    <yh-badge :value="8" color="#06B6D4">
      <yh-button>Cyan</yh-button>
    </yh-badge>
    <yh-badge :value="8" color="#F97316">
      <yh-button>Orange</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Offset

Customize the badge position through the `offset` prop.

<DemoBlock title="Offset" :ts-code="tsOffset" :js-code="jsOffset">
  <div style="display: flex; gap: 32px;">
    <yh-badge :value="8" :offset="[10, -10]">
      <yh-button>Offset</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Show Zero

By default, the badge is hidden when `value` is 0. Use the `show-zero` prop to force display.

<DemoBlock title="Show Zero" :ts-code="tsShowZero" :js-code="jsShowZero">
  <div style="display: flex; gap: 32px;">
    <yh-badge :value="0">
      <yh-button>Hide Zero</yh-button>
    </yh-badge>
    <yh-badge :value="0" show-zero>
      <yh-button>Show Zero</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Custom Content

Use the `#content` slot to customize the badge content.

<DemoBlock title="Custom Content" :ts-code="tsSlot" :js-code="jsSlot">
  <div style="display: flex; gap: 32px;">
    <yh-badge>
      <template #content>
        <span style="font-size: 10px;">VIP</span>
      </template>
      <yh-button>Custom Content</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## Standalone

Can be used independently without wrapping any content.

<DemoBlock title="Standalone" :ts-code="tsStandalone" :js-code="jsStandalone">
  <div class="yh-demo-flex">
    <yh-badge :value="12" />
    <yh-badge :value="3" type="success" />
    <yh-badge is-dot type="warning" />
  </div>
</DemoBlock>

## Use in Nuxt

The Badge component fully supports Nuxt 3/4 SSR rendering. During server-side rendering, badge content and position are directly included in the generated HTML, ensuring users can see real-time notification status on initial page load, enhancing user experience.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-wrap: wrap; gap: 24px;">
    <yh-badge :value="8">
      <yh-button>Nuxt Messages</yh-button>
    </yh-badge>
    <yh-badge :value="12" type="danger">
      <yh-button type="primary">Unread Notifications</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Initial value, maximum value limit (max) render correctly on the server
- ✅ Dot badge (is-dot) and standalone mode support SSR
- ✅ Custom color and offset take effect on initial page load
- 💡 Dynamic updates (e.g., real-time unread count via WebSocket) will be automatically completed through the reactive system after client-side activation

::: tip State Sync Recommendation
In the Nuxt ecosystem, it is recommended to store badge values in `useState` or `Pinia` for zero-cost state synchronization across routes and from SSR to Client.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Display value | `string \| number` | — |
| max | Maximum value, displays `{max}+` when exceeded | `number` | `99` |
| is-dot | Whether to show a dot indicator | `boolean` | `false` |
| hidden | Whether to hide the badge | `boolean` | `false` |
| type | Badge type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` |
| show-border | Whether to show border | `boolean` | `true` |
| color | Custom badge color | `string` | — |
| offset | Badge offset `[x, y]` | `[number, number]` | — |
| show-zero | Whether to show when value is 0 | `boolean` | `false` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Element wrapped by the badge |
| content | Custom badge content |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-badge-bg-color` | Background color | `var(--yh-color-danger)` |
| `--yh-badge-text-color` | Text color | `#ffffff` |
| `--yh-badge-font-size` | Font size | `var(--yh-font-size-xs)` |
