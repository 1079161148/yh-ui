<script setup lang="ts">
import { ref } from 'vue'
import { YhMessage } from '../../../packages/components/src/message'

// --- Fully aligned code example strings (ensuring users can copy and use directly) ---
const tsBasic = `<template>
  <yh-popconfirm title="Are you sure you want to perform this action?" @confirm="onConfirm">
    <yh-button type="danger">Basic Usage</yh-button>
  </yh-popconfirm>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'
const onConfirm = () => YhMessage.success('Operation successful')
<\/script>`

const tsPlacement = `<template>
  <div class="demo-placement-container">
    <div class="top">
      <yh-popconfirm title="Tooltip" placement="top-start"><yh-button>top-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="top"><yh-button>top</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="top-end"><yh-button>top-end</yh-button></yh-popconfirm>
    </div>
    <div class="middle">
      <div class="left">
        <yh-popconfirm title="Tooltip" placement="left-start"><yh-button>left-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="left"><yh-button>left</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="left-end"><yh-button>left-end</yh-button></yh-popconfirm>
      </div>
      <div class="right">
        <yh-popconfirm title="Tooltip" placement="right-start"><yh-button>right-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="right"><yh-button>right</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="right-end"><yh-button>right-end</yh-button></yh-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <yh-popconfirm title="Tooltip" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="bottom"><yh-button>bottom</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popconfirm>
    </div>
  </div>
</template>`

const tsPersonalized = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popconfirm 
      title="Are you sure you want to reset the configuration?" 
      confirm-button-text="Reset"
      cancel-button-text="Keep"
      confirm-button-type="danger"
      icon="warning"
      icon-color="#f56c6c"
    >
      <yh-button type="danger" plain>Custom Configuration</yh-button>
    </yh-popconfirm>

    <yh-popconfirm title="Tooltip" hide-icon>
      <yh-button plain>No Icon Mode</yh-button>
    </yh-popconfirm>

    <yh-popconfirm title="Are you sure you want to delete?" hide-cancel>
      <yh-button type="info" plain>Hide Cancel</yh-button>
    </yh-popconfirm>
  </div>
</template>`

const tsAdvanced = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popconfirm title="Button Reversed" swap-buttons confirm-button-text="Next">
      <yh-button>Reversed Button Layout</yh-button>
    </yh-popconfirm>

    <yh-popconfirm 
      title="Don't Ask Again" 
      show-dont-ask-again 
      @confirm="onConfirm"
    >
      <yh-button type="warning">Don't Ask Again Feature</yh-button>
    </yh-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const onConfirm = (isSet: boolean) => {
  if (isSet === true) {
    YhMessage.success('Recorded: Will not ask again')
  } else {
    YhMessage.success('Confirm operation successful')
  }
}
<\/script>`

const tsAsync = `<template>
  <yh-popconfirm 
    title="Data syncing" 
    :before-confirm="onBeforeConfirm"
  >
    <yh-button type="primary">Async Interception Example</yh-button>
  </yh-popconfirm>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'
const onBeforeConfirm = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      YhMessage.success('Async sync completed')
      resolve(true)
    }, 2000)
  })
}
<\/script>`

const tsSlots = `<template>
  <yh-popconfirm width="280">
    <yh-button type="primary">Advanced Content Slot</yh-button>
    
    <template #title>
      <div style="display: flex; align-items: center; gap: 6px; font-weight: bold;">
        <yh-icon name="warning" color="#faad14" />
        System Update Notification
      </div>
    </template>

    <template #description>
      <div style="margin-top: 8px;">
        <p style="margin-bottom: 8px; font-size: 13px;">Version v2.2.0 detected. It is recommended to upgrade immediately for better acrylic background experience.</p>
        <div style="display: flex; gap: 8px;">
          <yh-tag size="small" type="info">v2.1</yh-tag>
          <span>→</span>
          <yh-tag size="small" type="success">v2.2.0</yh-tag>
        </div>
      </div>
    </template>
  </yh-popconfirm>
</template>`

const tsArrow = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popconfirm title="Show arrow by default">
      <yh-button>Show Arrow</yh-button>
    </yh-popconfirm>

    <yh-popconfirm title="Arrow hidden" :show-arrow="false">
      <yh-button type="info" plain>Hide Arrow</yh-button>
    </yh-popconfirm>
  </div>
</template>`

const tsTheme = `<template>
  <yh-popconfirm 
    title="Brand Color Preview" 
    description="Easily align brand visuals with custom CSS variables."
    :popper-style="{
      '--yh-tooltip-bg-color': '#f5f3ff',
      '--yh-popconfirm-title': '#5b21b6',
      '--yh-popconfirm-desc': '#7c3aed',
      '--yh-tooltip-border-color': '#ddd6fe'
    }"
  >
    <yh-button type="primary" plain>Brand Theme Example</yh-button>
  </yh-popconfirm>
</template>`

const tsNuxt = `<template>
  <yh-popconfirm title="Nuxt SSR Friendly Confirm">
    <yh-button type="success" plain>Nuxt 3 Ready</yh-button>
  </yh-popconfirm>
</template>`

const jsBasic = tsBasic.replace(/lang="ts"/g, '').replace(/<script setup>/g, '<script setup>')
const jsPlacement = tsPlacement
const jsPersonalized = tsPersonalized
const jsAdvanced = tsAdvanced.replace(/lang="ts"/g, '')
const jsAsync = tsAsync.replace(/lang="ts"/g, '')
const jsSlots = tsSlots
const jsArrow = tsArrow
const jsTheme = tsTheme
const jsNuxt = tsNuxt

// --- Actual environment logic (syncing names and text content) ---
const onConfirm = (isSet: boolean) => {
  if (isSet === true) {
    YhMessage.success('Recorded: Will not ask again')
  } else {
    YhMessage.success('Confirm operation successful')
  }
}

const onBeforeConfirm = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      YhMessage.success('Async sync completed')
      resolve(true)
    }, 2000)
  })
}
</script>

# Popconfirm

Displays a popover with confirmation content on click. Commonly used for dangerous prompts, important toggles, and other scenarios.

## Basic Usage

Configure simple prompt information via `title`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 10px 0;">
    <yh-popconfirm title="Are you sure you want to perform this action?" @confirm="() => onConfirm(false)">
      <yh-button type="danger">Basic Usage</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## Placement

Supports 12 directions of popup positioning, controlled via the `placement` prop.

<DemoBlock title="Placement" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div class="demo-placement-container">
    <div class="top">
      <yh-popconfirm title="Tooltip" placement="top-start"><yh-button>top-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="top"><yh-button>top</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="top-end"><yh-button>top-end</yh-button></yh-popconfirm>
    </div>
    <div class="middle">
      <div class="left">
        <yh-popconfirm title="Tooltip" placement="left-start"><yh-button>left-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="left"><yh-button>left</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="left-end"><yh-button>left-end</yh-button></yh-popconfirm>
      </div>
      <div class="right">
        <yh-popconfirm title="Tooltip" placement="right-start"><yh-button>right-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="right"><yh-button>right</yh-button></yh-popconfirm>
        <yh-popconfirm title="Tooltip" placement="right-end"><yh-button>right-end</yh-button></yh-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <yh-popconfirm title="Tooltip" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="bottom"><yh-button>bottom</yh-button></yh-popconfirm>
      <yh-popconfirm title="Tooltip" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popconfirm>
    </div>
  </div>
</DemoBlock>

<style>
.demo-placement-container { display: flex; flex-direction: column; align-items: center; padding: 20px 0; }
.demo-placement-container .top, .demo-placement-container .bottom { display: flex; gap: 10px; }
.demo-placement-container .middle { display: flex; justify-content: space-between; width: 450px; margin: 10px 0; }
.demo-placement-container .left, .demo-placement-container .right { display: flex; flex-direction: column; gap: 10px; width: 100px; }
</style>

## Custom Configuration

Freely customize button text, type, or hide specific elements.

<DemoBlock title="Custom Configuration" :ts-code="tsPersonalized" :js-code="jsPersonalized">
  <div style="padding: 10px 0; display: flex; gap: 16px;"><yh-popconfirm title="Are you sure you want to reset?" confirm-button-text="Reset" cancel-button-text="Keep" confirm-button-type="danger" icon="warning" icon-color="#f56c6c"><yh-button type="danger" plain>Custom Configuration</yh-button></yh-popconfirm><yh-popconfirm title="Tooltip" hide-icon><yh-button plain>No Icon</yh-button></yh-popconfirm><yh-popconfirm title="Are you sure you want to delete?" hide-cancel><yh-button type="info" plain>Hide Cancel</yh-button></yh-popconfirm></div>
</DemoBlock>

## Advanced Features

YH-UI's unique "button position swap" and "don't ask again" state feedback.

<DemoBlock title="Advanced Features" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="padding: 10px 0; display: flex; gap: 16px;"><yh-popconfirm title="Button Reversed" swap-buttons confirm-button-text="Next"><yh-button>Reversed Button Layout</yh-button></yh-popconfirm><yh-popconfirm title="Don't Ask Again" show-dont-ask-again @confirm="onConfirm"><yh-button type="warning">Don't Ask Again Feature</yh-button></yh-popconfirm></div>
</DemoBlock>

## Async Close

Easily implement API interception logic by combining with the `before-confirm` prop.

<DemoBlock title="Async Interception" :ts-code="tsAsync" :js-code="jsAsync">
  <div style="padding: 10px 0;">
    <yh-popconfirm title="Data syncing" :before-confirm="onBeforeConfirm">
      <yh-button type="primary">Async Interception Example</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## Custom Slots

Use `title` and `description` slots to customize complex rich text content.

<DemoBlock title="Complex Content Slot" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="padding: 10px 0;">
    <yh-popconfirm width="280">
      <yh-button type="primary">Advanced Content Slot</yh-button>
      <template #title>
        <div style="display: flex; align-items: center; gap: 6px; font-weight: bold;">
          <yh-icon name="warning" color="#faad14" />
          System Update Notification
        </div>
      </template>
      <template #description>
        <div style="margin-top: 8px;">
          <p style="margin-bottom: 8px; font-size: 13px;">Version v2.2.0 detected. It is recommended to upgrade immediately for better acrylic background experience.</p>
          <div style="display: flex; gap: 8px;">
            <yh-tag size="small" type="info">v2.1</yh-tag>
            <span>→</span>
            <yh-tag size="small" type="success">v2.2.0</yh-tag>
          </div>
        </div>
      </template>
    </yh-popconfirm>
  </div>
</DemoBlock>

## Hide Arrow

Control whether the popover displays the indicator arrow via the `show-arrow` prop.

<DemoBlock title="Arrow Display" :ts-code="tsArrow" :js-code="jsArrow">
  <div style="padding: 10px 0; display: flex; gap: 16px;">
    <yh-popconfirm title="Show arrow by default">
      <yh-button>Show Arrow</yh-button>
    </yh-popconfirm>
    <yh-popconfirm title="Arrow hidden" :show-arrow="false">
      <yh-button type="info" plain>Hide Arrow</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## Theme Appearance

Easily customize component styling by modifying CSS variables. For example, use `popper-style` to override local theme variables.

<DemoBlock title="Theme Customization" :ts-code="tsTheme" :js-code="jsTheme">
  <div style="padding: 10px 0;">
    <yh-popconfirm 
      title="Brand Color Preview" 
      description="Easily align brand visuals with custom CSS variables."
      :popper-style="{
        '--yh-tooltip-bg-color': '#f5f3ff',
        '--yh-popconfirm-title': '#5b21b6',
        '--yh-popconfirm-desc': '#7c3aed',
        '--yh-tooltip-border-color': '#ddd6fe'
      }"
    >
      <yh-button type="primary" plain>Brand Theme Example</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## Use in Nuxt

`YhPopconfirm` fully supports Nuxt 3. Thanks to the Tooltip-based ultra-fast positioning engine, it maintains excellent performance in SSR environments.

<DemoBlock title="Nuxt Demo" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="padding: 10px 0;">
    <yh-popconfirm title="Nuxt 3 Ready">
      <yh-button type="success" plain>Nuxt Example Button</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

Simply add the module configuration in `nuxt.config.ts`:
```ts
export default defineNuxtConfig({ modules: ['@yh-ui/nuxt'] })
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | string | - |
| description | Description content | string | - |
| confirm-button-text | Confirm button text | string | `Confirm` |
| cancel-button-text | Cancel button text | string | `Cancel` |
| confirm-button-type | Confirm button type | string | `primary` |
| cancel-button-type | Cancel button type | string | `default` |
| icon | Icon name | string | `warning` |
| icon-color | Icon color | string | `#faad14` |
| hide-icon | Whether to hide icon | boolean | `false` |
| hide-cancel | Whether to hide cancel button | boolean | `false` |
| width | Width | string / number | `180` |
| placement | Popup position | `TooltipPlacement` | `'top'` |
| visible | Manual control visibility | `boolean \| null` | `null` |
| offset | Offset [skidding, distance] | array | `[0, 12]` |
| disabled | Whether to disable | boolean | `false` |
| show-arrow | Whether to show arrow | boolean | `true` |
| teleported | Whether to mount to body | boolean | `true` |
| z-index | Z-index | number | `2000` |
| popper-class | Custom popover class | string | - |
| popper-style | Custom popover style | object | `{}` |
| before-confirm | Lifecycle hook before confirm | function | - |
| swap-buttons | Whether to swap button positions | boolean | `false` |
| show-dont-ask-again | Whether to show "don't ask again" checkbox | boolean | `false` |
| dont-ask-again-text | Text for "don't ask again" | string | `Don't ask again` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Trigger element for popover |
| icon | Custom icon |
| title | Custom title |
| description | Custom description content |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| confirm | Triggered when confirm button is clicked | `(isSet: boolean)` |
| cancel | Triggered when cancel button is clicked | - |
| update:visible | Triggered when visibility changes | `(visible: boolean)` |

### Theme Variables (CSS Variables)

| Variable | Default | Description |
| --- | --- | --- |
| `--yh-popconfirm-title` | `#1d1d1f` | Title text color |
| `--yh-popconfirm-desc` | `#424245` | Description text color |
| `--yh-tooltip-bg-color` | `rgba(255, 255, 255, 0.88)` | Popover background color |
| `--yh-tooltip-border-color` | `rgba(0, 0, 0, 0.08)` | Popover border color |
