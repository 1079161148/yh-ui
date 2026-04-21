<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const tsBasic = `<template>
  <yh-popover
    title="Card Title"
    content="This is a wonderful card content description, supporting automatic line wrapping and acrylic glassmorphism background."
  >
    <yh-button>Basic Usage</yh-button>
  </yh-popover>
</template>`

const jsBasic = tsBasic

const tsPlacement = `<template>
  <div class="demo-placement-container">
    <div class="top">
      <yh-popover title="Tooltip" placement="top-start"><yh-button>top-start</yh-button></yh-popover>
      <yh-popover title="Tooltip" placement="top"><yh-button>top</yh-button></yh-popover>
      <yh-popover title="Tooltip" placement="top-end"><yh-button>top-end</yh-button></yh-popover>
    </div>
    <div class="middle">
      <div class="left">
        <yh-popover title="Tooltip" placement="left-start"><yh-button>left-start</yh-button></yh-popover>
        <yh-popover title="Tooltip" placement="left"><yh-button>left</yh-button></yh-popover>
        <yh-popover title="Tooltip" placement="left-end"><yh-button>left-end</yh-button></yh-popover>
      </div>
      <div class="right">
        <yh-popover title="Tooltip" placement="right-start"><yh-button>right-start</yh-button></yh-popover>
        <yh-popover title="Tooltip" placement="right"><yh-button>right</yh-button></yh-popover>
        <yh-popover title="Tooltip" placement="right-end"><yh-button>right-end</yh-button></yh-popover>
      </div>
    </div>
    <div class="bottom">
      <yh-popover title="Tooltip" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popover>
      <yh-popover title="Tooltip" placement="bottom"><yh-button>bottom</yh-button></yh-popover>
      <yh-popover title="Tooltip" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popover>
    </div>
  </div>
</template>`

const jsPlacement = tsPlacement

const tsAligned = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popover
      title="Structured Display"
      description="This is a structured display description similar to Popconfirm, supporting icons and segmented descriptions."
      icon="info-filled"
      icon-color="#409eff"
    >
      <yh-button type="primary" plain>Feature Alignment Example</yh-button>
    </yh-popover>

    <yh-popover
      title="Warning Alert"
      description="Illegal operation detected. Please check your account permissions."
      icon="warning-filled"
      icon-color="#f56c6c"
    >
      <yh-button type="danger" plain>Alert Style</yh-button>
    </yh-popover>
  </div>
</template>`

const jsAligned = tsAligned

const tsTriggers = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popover trigger="hover" title="Hover" content="Triggers on mouse hover"><yh-button plain>Hover</yh-button></yh-popover>
    <yh-popover trigger="click" title="Click" content="Triggers on click"><yh-button plain>Click</yh-button></yh-popover>
    <yh-popover trigger="focus" title="Focus" content="Triggers on element focus"><yh-button plain>Focus</yh-button></yh-popover>
    <yh-popover trigger="contextmenu" title="ContextMenu" content="Triggers on right-click"><yh-button plain>Right Click</yh-button></yh-popover>
  </div>
</template>`

const jsTriggers = tsTriggers

const tsSlots = `<template>
  <yh-popover width="300">
    <yh-button type="primary">Advanced Slot Content</yh-button>

    <template #header>
      <div style="display: flex; align-items: center; gap: 8px; font-weight: bold; color: var(--yh-primary-color)">
        <yh-icon name="user" />
        User Info Details
      </div>
    </template>

    <template #content>
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <img src="https://avatars.githubusercontent.com/u/1?v=4" style="width: 48px; height: 48px; border-radius: 50%" />
        <div>
          <p style="font-weight: 600; margin-bottom: 4px;">Senior Front-end Engineer</p>
          <p style="font-size: 13px; color: #86868b">Senior Frontend Architect, focusing on component library performance optimization and engineering construction.</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div style="display: flex; gap: 12px;">
        <yh-button size="small" type="primary">Learn More</yh-button>
        <yh-button size="small">Cancel</yh-button>
      </div>
    </template>
  </yh-popover>
</template>`

const jsSlots = tsSlots

const tsManual = `<template>
  <yh-popover v-model:visible="visible" title="Manual Control" content="Click the button to control card visibility.">
    <yh-button @click="visible = !visible">
      Toggle: {{ visible ? 'Hide' : 'Show' }}
    </yh-button>
  </yh-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>`

const jsManual = tsManual.replace('lang="ts"', '')

const tsNuxt = `<template>
  <yh-popover
    title="Nuxt Auto Import"
    content="In Nuxt projects, components are automatically imported, you can use them directly without any configuration."
  >
    <yh-button type="primary">Nuxt Example</yh-button>
  </yh-popover>
</template>`

const jsNuxt = tsNuxt
</script>

# Popover

Displays richer content than Tooltip, commonly used for showing detailed information, form submissions, or user guidance.

## Basic Usage

Quickly configure a standard card via `title` and `content`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
<div style="padding: 10px 0;">
<yh-popover title="Card Title" content="This is a wonderful card content description, supporting automatic line wrapping and acrylic glassmorphism background."><yh-button>Basic Usage</yh-button></yh-popover>
</div>
</DemoBlock>

## Placement

Supports 12 directions of popup positioning.

<DemoBlock title="Placement" :ts-code="tsPlacement" :js-code="jsPlacement">
<div class="demo-placement-container">
<div class="top">
<yh-popover title="Tooltip" placement="top-start"><yh-button>top-start</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="top"><yh-button>top</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="top-end"><yh-button>top-end</yh-button></yh-popover>
</div>
<div class="middle">
<div class="left">
<yh-popover title="Tooltip" placement="left-start"><yh-button>left-start</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="left"><yh-button>left</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="left-end"><yh-button>left-end</yh-button></yh-popover>
</div>
<div class="right">
<yh-popover title="Tooltip" placement="right-start"><yh-button>right-start</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="right"><yh-button>right</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="right-end"><yh-button>right-end</yh-button></yh-popover>
</div>
</div>
<div class="bottom">
<yh-popover title="Tooltip" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="bottom"><yh-button>bottom</yh-button></yh-popover>
<yh-popover title="Tooltip" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popover>
</div>
</div>
</DemoBlock>

<style>
.demo-placement-container { display: flex; flex-direction: column; align-items: center; padding: 20px 0; }
.demo-placement-container .top, .demo-placement-container .bottom { display: flex; gap: 10px; }
.demo-placement-container .middle { display: flex; justify-content: space-between; width: 450px; margin: 10px 0; }
.demo-placement-container .left, .demo-placement-container .right { display: flex; flex-direction: column; gap: 10px; width: 100px; }
</style>

## Feature Alignment (Popconfirm)

Popover supports configuring structured content like Popconfirm, including icons, titles, and descriptions.

<DemoBlock title="Feature Alignment Example" :ts-code="tsAligned" :js-code="jsAligned">
<div style="padding: 10px 0; display: flex; gap: 16px;">
<yh-popover title="Structured Display" description="This is a structured display description similar to Popconfirm, supporting icons and segmented descriptions." icon="info-filled" icon-color="#409eff"><yh-button type="primary" plain>Feature Alignment Example</yh-button></yh-popover>
<yh-popover title="Warning Alert" description="Illegal operation detected. Please check your account permissions." icon="warning-filled" icon-color="#f56c6c"><yh-button type="danger" plain>Alert Style</yh-button></yh-popover>
</div>
</DemoBlock>

## Triggers

Supports multiple trigger methods: `hover`, `click`, `focus`, `contextmenu`. Also supports combinations such as `['hover', 'click']`.

<DemoBlock title="Triggers" :ts-code="tsTriggers" :js-code="jsTriggers">
<div style="padding: 10px 0; display: flex; gap: 16px;">
<yh-popover trigger="hover" title="Hover" content="Triggers on mouse hover"><yh-button plain>Hover</yh-button></yh-popover>
<yh-popover trigger="click" title="Click" content="Triggers on click"><yh-button plain>Click</yh-button></yh-popover>
<yh-popover trigger="focus" title="Focus" content="Triggers on element focus"><yh-button plain>Focus</yh-button></yh-popover>
<yh-popover trigger="contextmenu" title="ContextMenu" content="Triggers on right-click"><yh-button plain>Right Click</yh-button></yh-popover>
</div>
</DemoBlock>

## Advanced Slot Content

Supports `header`, `content`, `footer`, and `icon` slots for richer card composition.

<DemoBlock title="Advanced Slot Content" :ts-code="tsSlots" :js-code="jsSlots">
<div style="padding: 10px 0;">
<yh-popover width="300">
<yh-button type="primary">Advanced Slot Content</yh-button>
<template #header><div style="display: flex; align-items: center; gap: 8px; font-weight: bold;"><yh-icon name="user" />User Info Details</div></template>
<template #content>
<div style="display: flex; gap: 12px; align-items: flex-start;">
<img src="https://avatars.githubusercontent.com/u/1?v=4" style="width: 48px; height: 48px; border-radius: 50%" />
<div>
<p style="font-weight: 600; margin-bottom: 4px;">Senior Front-end Engineer</p>
<p style="font-size: 13px; color: #86868b">Senior Frontend Architect, focusing on component library performance optimization and engineering construction.</p>
</div>
</div>
</template>
<template #footer><div style="display: flex; gap: 12px;"><yh-button size="small" type="primary">Learn More</yh-button><yh-button size="small">Cancel</yh-button></div></template>
</yh-popover>
</div>
</DemoBlock>

## Controlled Visibility

Use `v-model:visible` to manually control component state synchronization.

<DemoBlock title="Manual Control" :ts-code="tsManual" :js-code="jsManual">
<div style="padding: 10px 0;">
<yh-popover v-model:visible="visible" title="Manual Control" content="Click the button to control card visibility."><yh-button @click="visible = !visible">Toggle: {{ visible ? 'Hide' : 'Show' }}</yh-button></yh-popover>
</div>
</DemoBlock>

## Use in Nuxt

`Popover` fully supports Nuxt 3/4 SSR rendering. When using in Nuxt projects, components are automatically imported without manual registration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="padding: 10px 0;">
    <yh-popover title="Nuxt Auto Import" content="In Nuxt projects, components are automatically imported, you can use them directly without any configuration.">
      <yh-button type="primary">Nuxt Example</yh-button>
    </yh-popover>
  </div>
</DemoBlock>

**SSR Notes**:

- Fully supports Server-Side Rendering (SSR) without hydration-specific runtime requirements in the component itself
- The popup layer is teleported to `body` by default and can be disabled with `teleported`
- Visual appearance follows the shared overlay theme tokens used by Tooltip and other floating layers

::: tip SSR Transparency
The Popover component uses Backdrop-filter acrylic effect, which automatically degrades to solid color in SSR environment until client-side activation, ensuring optimal loading performance.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | - |
| description | Description text aligned with Popconfirm | `string` | - |
| icon | Icon name aligned with Popconfirm | `string` | - |
| icon-color | Icon color | `string` | - |
| content | Content text | `string` | - |
| placement | Popup position | `Placement` | `'bottom'` |
| visible | Manual control visibility | `boolean \| null` | `null` |
| trigger | Trigger method | `PopoverTrigger \| PopoverTrigger[]` | `'click'` |
| effect | Theme style | `'light' \| 'dark' \| string` | `'light'` |
| disabled | Whether to disable | `boolean` | `false` |
| show-arrow | Whether to show arrow | `boolean` | `true` |
| show-after | Show delay in milliseconds | `number` | `0` |
| hide-after | Hide delay in milliseconds | `number` | `100` |
| offset | Popup offset | `[number, number]` | `[0, 12]` |
| width | Popup width | `string \| number` | `'auto'` |
| max-height | Maximum popup height | `string \| number` | `'none'` |
| scrollable | Whether content becomes scrollable when `max-height` is set | `boolean` | `false` |
| interactive | Whether the mouse can enter the popup without immediately hiding it | `boolean` | `true` |
| match-trigger-width | Whether the popup width should follow the trigger width | `boolean` | `false` |
| z-index | Popup z-index | `number` | `2003` |
| teleported | Whether to mount the popup to `body` | `boolean` | `true` |
| popper-class | Custom popup class | `string` | - |
| popper-style | Custom popup style | `StyleValue` | `{}` |
| transition | Transition name | `string` | `'yh-popover-fade'` |
| persistent | Whether the popup DOM stays mounted while hidden | `boolean` | `true` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| update:visible | Triggered when visibility changes | `(visible: boolean)` |
| show | Triggered when shown | - |
| hide | Triggered when hidden | - |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Trigger element |
| header | Custom header/title content |
| content | Custom body content |
| icon | Custom icon area |
| footer | Custom footer action area |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| toggle | Manually toggle visibility | `(val: boolean) => boolean` |
| visible | Current visibility state | `Ref<boolean>` |

### Theme Variables

`Popover` accepts `themeOverrides`, but source does not define a dedicated component-only CSS variable table. Its visual styles are mainly composed from shared overlay tokens such as `--yh-bg-color-overlay`, `--yh-radius-lg`, `--yh-shadow-lg`, and the shared text color tokens inherited through the underlying floating layer.

---

**Tip**: `Popover` is deeply integrated with the underlying `Tooltip` engine, with excellent performance, supporting 12-direction popup and fitting naturally into Nuxt SSR projects.

### Type Exports

| Name | Description |
| --- | --- |
| `YhPopoverProps` | Component props type |
| `YhPopoverEmits` | Component emits type |
| `YhPopoverSlots` | Component slots type |
| `YhPopoverExpose` | Component expose type |
| `YhPopoverTrigger` | Trigger union type |
| `YhPopoverInstance` | Component instance type |
