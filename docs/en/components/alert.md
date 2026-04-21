# Alert

`YhAlert` is used to display important notices and feedback. It supports semantic states, scrolling announcements, auto close, and a custom action area.

<script setup lang="ts">
import { ref } from 'vue'

const showAlert = ref(true)
const resetAlert = () => {
  showAlert.value = false
  setTimeout(() => {
    showAlert.value = true
  }, 300)
}

const tsBasic = `<template>
  <div class="demo-list">
    <yh-alert title="Success alert message" type="success" />
    <yh-alert title="Info alert message" type="info" />
    <yh-alert title="Warning alert message" type="warning" />
    <yh-alert title="Error alert message" type="error" />
  </div>
</template>`

const tsClosable = `<template>
  <div class="demo-list">
    <yh-alert title="Not closable by default" type="success" />
    <yh-alert title="Enable close button" type="info" closable />
    <yh-alert title="Custom close text" type="warning" closable close-text="Got it" />
    <yh-alert title="Show icon" type="error" show-icon closable />
  </div>
</template>`

const tsScrollable = `<template>
  <yh-alert
    type="error"
    scrollable
    :scroll-speed="5"
    description="[Fast Notice] The current environment is under heavy load. Please optimize rendering performance."
  />

  <yh-alert
    type="success"
    show-icon
    scrollable
    :pause-on-hover="true"
    description="This notice scrolls automatically. It supports a marquee effect, hover pause, and configurable speed."
  />
</template>`

const tsProgress = `<template>
  <yh-alert
    v-if="visible"
    title="Auto dismiss warning"
    type="warning"
    :duration="5000"
    show-icon
    show-progress
    closable
  >
    This alert closes automatically after 5 seconds and shows a countdown progress bar.
  </yh-alert>
  <yh-button @click="reset">Replay demo</yh-button>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
const reset = () => {
  visible.value = false
  setTimeout(() => visible.value = true, 300)
}
<` + `/script>`

const tsGlass = `<template>
  <div class="glass-container">
    <yh-alert
      title="Glass Effect"
      type="info"
      effect="glass"
      show-icon
      closable
    >
      Useful when the alert needs stronger visual layering with blur and translucent background.
    </yh-alert>
  </div>
</template>`

const tsNuxt = `<template>
  <yh-alert title="Works directly in Nuxt" type="success" show-icon />
</template>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '')
const jsBasic = toJs(tsBasic)
const jsClosable = toJs(tsClosable)
const jsScrollable = toJs(tsScrollable)
const jsProgress = tsProgress.replace('lang="ts"', '')
const jsGlass = toJs(tsGlass)
const jsNuxt = toJs(tsNuxt)
</script>

## Basic States

Use `type` to switch between success, info, warning, and error states.

<DemoBlock title="Basic States" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="demo-list">
    <yh-alert title="Success alert message" type="success" />
    <yh-alert title="Info alert message" type="info" />
    <yh-alert title="Warning alert message" type="warning" />
    <yh-alert title="Error alert message" type="error" />
  </div>
</DemoBlock>

## Close and Icons

The component is not closable by default. Enable `closable` to show the close button, and `show-icon` to display the status icon.

<DemoBlock title="Close and Icons" :ts-code="tsClosable" :js-code="jsClosable">
  <div class="demo-list">
    <yh-alert title="Not closable by default" type="success" />
    <yh-alert title="Enable close button" type="info" closable />
    <yh-alert title="Custom close text" type="warning" closable close-text="Got it" />
    <yh-alert title="Show icon" type="error" show-icon closable />
  </div>
</DemoBlock>

## Scrolling Announcement

Enable `scrollable` for long notice content, then adjust behavior with `scroll-speed` and `pause-on-hover`.

<DemoBlock title="Scrolling Announcement" :ts-code="tsScrollable" :js-code="jsScrollable">
  <div class="demo-list">
    <yh-alert
      type="error"
      scrollable
      :scroll-speed="5"
      description="[Fast Notice] The current environment is under heavy load. Please optimize rendering performance."
    />
    <yh-alert
      type="success"
      show-icon
      scrollable
      :scroll-speed="20"
      :pause-on-hover="true"
      description="This notice scrolls automatically. It supports a marquee effect, hover pause, and configurable speed."
    />
  </div>
</DemoBlock>

## Auto Close

Set `duration` to close the alert automatically. When `show-progress` is enabled, a progress bar is rendered at the bottom.

<DemoBlock title="Auto Close" :ts-code="tsProgress" :js-code="jsProgress">
  <div class="demo-column">
    <yh-alert
      v-if="showAlert"
      title="Auto dismiss warning"
      type="warning"
      :duration="5000"
      show-icon
      show-progress
      closable
    >
      This alert closes automatically after 5 seconds and shows a countdown progress bar.
    </yh-alert>
    <div style="margin-top: 10px">
      <yh-button type="primary" size="small" @click="resetAlert">Replay countdown demo</yh-button>
    </div>
  </div>
</DemoBlock>

## Theme Effect

`effect` supports `light`, `dark`, `outline`, and `glass`.

<DemoBlock title="Theme Effect" :ts-code="tsGlass" :js-code="jsGlass">
  <div class="glass-container">
    <yh-alert
      title="Glass Effect"
      type="info"
      effect="glass"
      show-icon
      closable
    >
      Useful when the alert needs stronger visual layering with blur and translucent background.
    </yh-alert>
  </div>
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, `YhAlert` can be used directly in pages. Its initial render does not rely on browser-only APIs, so static content renders correctly during SSR, while auto close and hover pause start on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-alert title="Works directly in Nuxt" type="success" show-icon />
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `title` | Title text | `string` | `''` |
| `description` | Description text | `string` | `''` |
| `type` | Alert type | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `effect` | Visual style | `'light' \| 'dark' \| 'outline' \| 'glass'` | `'light'` |
| `closable` | Whether to show the close button | `boolean` | `false` |
| `close-text` | Custom close button text | `string` | `''` |
| `close-icon` | Custom close icon component or icon name | `string \| Component` | `''` |
| `show-icon` | Whether to show the status icon | `boolean` | `false` |
| `icon` | Custom status icon component or icon name | `string \| Component` | `''` |
| `center` | Whether the content is centered | `boolean` | `false` |
| `scrollable` | Whether to enable scrolling announcement mode | `boolean` | `false` |
| `scroll-speed` | Seconds required to complete one scroll cycle | `number` | `15` |
| `pause-on-hover` | Whether hovering pauses scrolling | `boolean` | `true` |
| `duration` | Auto close duration in milliseconds. `0` disables auto close | `number` | `0` |
| `show-progress` | Whether to show the auto-close progress bar | `boolean` | `false` |
| `theme-overrides` | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| `close` | Triggered when the close button is clicked | `(event: MouseEvent)` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Description content |
| `title` | Title content |
| `icon` | Custom status icon |
| `close` | Custom close area |
| `action` | Custom action area |

### Expose

This component does not expose public instance methods or properties.

### Type Exports

| Name | Description |
| --- | --- |
| `YhAlertProps` | Props type for `YhAlert` |
| `YhAlertEmits` | Emits type for `YhAlert` |
| `YhAlertSlots` | Slots type for `YhAlert` |
| `YhAlertType` | Alert type union |
| `YhAlertEffect` | Effect style union |
| `YhAlertInstance` | Component instance type |

### Theme Variables

`YhAlert` does not expose a full set of dedicated component-scoped theme variables. The stylesheet currently relies mainly on shared theme tokens. The scrolling announcement mode additionally consumes the variable below, and the component still supports `themeOverrides`.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-alert-scroll-speed` | Animation duration for scrolling announcements | `15s` |

<style scoped>
.demo-list { display: flex; flex-direction: column; gap: 12px; }
.demo-column { display: flex; flex-direction: column; align-items: flex-start; }
.glass-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
}
</style>
