<script setup lang="ts">
import { YhMessage } from '../../../packages/components/src/message'

const tsBasic = `<template>
  <yh-popconfirm title="Are you sure you want to perform this action?" @confirm="onConfirm">
    <yh-button type="danger">Basic Usage</yh-button>
  </yh-popconfirm>
</template>

<script setup lang="ts">
import { YhMessage } from '@yh-ui/yh-ui'
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
import { YhMessage } from '@yh-ui/yh-ui'

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
import { YhMessage } from '@yh-ui/yh-ui'
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
          <span>-&gt;</span>
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

Includes button position swapping and the optional "don't ask again" state.

<DemoBlock title="Advanced Features" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="padding: 10px 0; display: flex; gap: 16px;"><yh-popconfirm title="Button Reversed" swap-buttons confirm-button-text="Next"><yh-button>Reversed Button Layout</yh-button></yh-popconfirm><yh-popconfirm title="Don't Ask Again" show-dont-ask-again @confirm="onConfirm"><yh-button type="warning">Don't Ask Again Feature</yh-button></yh-popconfirm></div>
</DemoBlock>

## Async Close

Use `before-confirm` to run async confirmation logic before closing the popup.

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
            <span>-&gt;</span>
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

Customize popup appearance with CSS variables passed through `popper-style`.

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

`YhPopconfirm` can be used directly in Nuxt after registering the YH-UI module. The trigger and popup content render as normal component markup, while positioning and interaction run on the client after hydration.

<DemoBlock title="Nuxt Demo" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="padding: 10px 0;">
    <yh-popconfirm title="Nuxt 3 Ready">
      <yh-button type="success" plain>Nuxt Example Button</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

Add the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({ modules: ['@yh-ui/nuxt'] })
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title text. | `string` | `''` |
| description | Description text. | `string` | `''` |
| confirm-button-text | Confirm button text. | `string` | `''` |
| cancel-button-text | Cancel button text. | `string` | `''` |
| confirm-button-type | Confirm button type. | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| cancel-button-type | Cancel button type. | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| icon | Icon name. | `string` | `'warning'` |
| icon-color | Icon color. | `string` | `'#faad14'` |
| hide-icon | Whether to hide the icon. | `boolean` | `false` |
| hide-cancel | Whether to hide the cancel button. | `boolean` | `false` |
| offset | Popper offset `[skidding, distance]`. | `[number, number]` | `[0, 12]` |
| placement | Popper placement. | `TooltipPlacement` | `'top'` |
| visible | Controlled visibility state. | `boolean \| null` | `null` |
| width | Popover width. | `string \| number` | `180` |
| disabled | Whether the trigger is disabled. | `boolean` | `false` |
| z-index | Popper z-index. | `number` | `2000` |
| show-arrow | Whether to show the popper arrow. | `boolean` | `true` |
| popper-class | Custom popper class name. | `string` | `''` |
| popper-style | Custom popper style. | `StyleValue` | `{}` |
| teleported | Whether to teleport the popup to `body`. | `boolean` | `true` |
| show-dont-ask-again | Whether to show the "don't ask again" checkbox. | `boolean` | `false` |
| dont-ask-again-text | Custom text for the "don't ask again" checkbox. | `string` | `''` |
| swap-buttons | Whether to swap confirm and cancel button positions. | `boolean` | `false` |
| before-confirm | Hook executed before confirm. Return `false` or resolve `false` to block closing. | `() => boolean \| Promise<boolean>` | `null` |
| theme-overrides | Component-level theme overrides. | `ComponentThemeVars` | `undefined` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Trigger element. |
| icon | Custom icon content. |
| title | Custom title content. |
| description | Custom description content. |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| confirm | Triggered when the confirm button is clicked. | `(dontAskAgain?: boolean) => void` |
| cancel | Triggered when the cancel button is clicked. | `() => void` |
| update:visible | Triggered when visibility changes. | `(visible: boolean) => void` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| visible | Current popup visibility state. | `Ref<boolean>` |
| toggle | Manually update the popup visibility state. | `(val: boolean) => boolean` |

### Theme Variables

`YhPopconfirm` supports `themeOverrides`. It also consumes tooltip-related variables through the popup layer.

| Variable | Default | Description |
| --- | --- | --- |
| `--yh-popconfirm-title` | `#1d1d1f` | Title text color |
| `--yh-popconfirm-desc` | `#424245` | Description text color |
| `--yh-tooltip-bg-color` | `rgba(255, 255, 255, 0.88)` | Popover background color |
| `--yh-tooltip-border-color` | `rgba(0, 0, 0, 0.08)` | Popover border color |

### Type Exports

| Name | Description |
| --- | --- |
| `YhPopconfirmProps` | Component props type |
| `YhPopconfirmEmits` | Component emits type |
| `YhPopconfirmSlots` | Component slots type |
| `YhPopconfirmExpose` | Component expose type |
| `YhPopconfirmInstance` | Component instance type |
