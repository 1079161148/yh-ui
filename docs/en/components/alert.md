# Alert

Alert component for displaying important tips or feedback information to users. Features multiple built-in state modes, innovative glassmorphism visual effects, and ultra-smooth marquee announcement functionality.

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
    <yh-alert title="Manually enable close" type="info" closable />
    <yh-alert title="Custom close text" type="warning" closable close-text="Got it" />
    <yh-alert title="Show icon" type="error" show-icon closable />
  </div>
</template>`

const tsScrollable = `<template>
  <!-- Fast mode (5s per loop) -->
  <yh-alert 
    type="error" 
    scrollable 
    :scroll-speed="5"
    description="[Fast Notice] The system has detected high environmental pressure. Please optimize your code performance!"
  />
  
  <!-- Default mode (with hover pause) -->
  <yh-alert 
    type="success" 
    show-icon 
    scrollable
    :pause-on-hover="true"
    description="This is an auto-scrolling notification: Welcome to the YH-UI enhanced Alert component, which supports marquee effects, hover pause, and dynamic speed configuration. Try hovering your mouse over it!"
  />
</template>`

const tsProgress = `<template>
  <yh-alert 
    v-if="visible"
    title="Auto-dismiss warning" 
    type="warning" 
    :duration="5000" 
    show-icon
    show-progress
    closable
  >
    This alert will automatically close after 5 seconds, with a countdown progress bar.
  </yh-alert>
  <yh-button @click="reset">Replay Demo</yh-button>
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
      title="Advanced Glassmorphism Effect" 
      type="info" 
      effect="glass"
      show-icon
      closable
    >
      This is YH-UI's premium glassmorphism theme, perfect for showcasing on backgrounds with strong visual design.
    </yh-alert>
  </div>
</template>`

const tsNuxt = `<template>
  <yh-alert title="Nuxt Out-of-the-Box" type="success" show-icon />
</template>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '')
const jsBasic = toJs(tsBasic)
const jsClosable = toJs(tsClosable)
const jsScrollable = toJs(tsScrollable)
const jsProgress = tsProgress.replace('lang="ts"', '')
const jsGlass = toJs(tsGlass)
const jsNuxt = toJs(tsNuxt)
</script>

## Display Modes

Alert supports multiple semantic states and visual themes.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="demo-list">
    <yh-alert title="Success alert message" type="success" />
    <yh-alert title="Info alert message" type="info" />
    <yh-alert title="Warning alert message" type="warning" />
    <yh-alert title="Error alert message" type="error" />
  </div>
</DemoBlock>

## Configurable Interactions

The component is not closable by default. You can enable it via the `closable` prop. It also supports showing status icons and their positions.

<DemoBlock title="Buttons & Icons" :ts-code="tsClosable" :js-code="jsClosable">
  <div class="demo-list">
    <yh-alert title="Not closable by default" type="success" />
    <yh-alert title="Manually enable close" type="info" closable />
    <yh-alert title="Custom close text" type="warning" closable close-text="Got it" />
    <yh-alert title="Show icon" type="error" show-icon closable />
  </div>
</DemoBlock>

## Text Scrolling (Scrollable)

For lengthy announcement content, enable the `scrollable` prop to achieve a marquee scrolling effect.
We use `will-change: transform` and `translate3d` hardware acceleration to optimize scrolling smoothness to the extreme.

<DemoBlock title="Scrolling Notification" :ts-code="tsScrollable" :js-code="jsScrollable">
  <div class="demo-list">
    <yh-alert 
      type="error" 
      scrollable 
      :scroll-speed="5"
      description="[Fast Mode] The system has detected high environmental pressure. Please optimize your code performance!"
    />
    <yh-alert 
      type="success" 
      show-icon 
      scrollable
      :scroll-speed="20"
      :pause-on-hover="true"
      description="This is an auto-scrolling notification: Welcome to the YH-UI enhanced Alert component, which supports marquee effects, hover pause, and dynamic speed configuration. Try hovering your mouse over it!"
    />
  </div>
</DemoBlock>

## Auto Close & Timer (Advanced)

`YhAlert` supports timed closing. When `show-progress` is enabled, a dynamic countdown progress bar appears at the bottom.

<DemoBlock title="Auto Dismiss Demo" :ts-code="tsProgress" :js-code="jsProgress">
  <div class="demo-column">
    <yh-alert 
      v-if="showAlert"
      title="Auto-dismiss warning" 
      type="warning" 
      :duration="5000" 
      show-icon
      show-progress
      closable
    >
      This alert will automatically close after 5 seconds, with a countdown progress bar.
    </yh-alert>
    <div style="margin-top: 10px">
      <yh-button type="primary" size="small" @click="resetAlert">Replay Countdown Demo</yh-button>
    </div>
  </div>
</DemoBlock>

## Advanced Features

### 1. Smart Glassmorphism
Enable via `effect="glass"`. The component will automatically apply backdrop blur and semi-transparent overlays, perfect for modern dashboards with strong visual backgrounds.

<DemoBlock title="Glassmorphism Effect" :ts-code="tsGlass" :js-code="jsGlass">
  <div class="glass-container">
    <yh-alert 
      title="Advanced Glassmorphism Effect" 
      type="info" 
      effect="glass"
      show-icon
      closable
    >
      This is YH-UI's premium glassmorphism theme, perfect for showcasing on backgrounds with strong visual design.
    </yh-alert>
  </div>
</DemoBlock>

### 2. Polymorphic Action Slot
Supports the `action` slot. You can place interactive buttons like "Retry" or "View Details" inside the alert bar, transforming alerts from one-way notifications into two-way interactions.

## Use in Nuxt

`YhAlert` is fully adapted for Nuxt 3/4. The component supports automatic import, and all animation strategies are optimized for SSR environments.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-alert title="Nuxt Out-of-the-Box" type="success" show-icon />
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | — |
| description | Description | `string` | — |
| type | Type | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| effect | Theme | `'light' \| 'dark' \| 'outline' \| 'glass'` | `'light'` |
| closable | Whether closable | `boolean` | `false` |
| close-text | Custom text for the close button | `string` | — |
| close-icon | Icon for the close button | `string \| Component` | — |
| show-icon | Whether to show the icon | `boolean` | `false` |
| center | Whether to center the content | `boolean` | `false` |
| scrollable | Whether to enable marquee scrolling | `boolean` | `false` |
| scroll-speed | Seconds to complete one scroll cycle | `number` | `15` |
| pause-on-hover | Whether to pause scrolling on hover | `boolean` | `true` |
| duration | Auto-dismiss duration in milliseconds, 0 means never | `number` | `0` |
| show-progress | Whether to show auto-close progress bar | `boolean` | `false` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Description content |
| title | Title content |
| icon | Custom icon |
| close | Custom close trigger |
| action | Custom action area (below description) |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| close | Triggered when closed | `(evt: MouseEvent)` |

## Theme Variables

You can deeply customize Alert's visual style through the following CSS variables.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-alert-padding` | Padding | `12px 16px` |
| `--yh-alert-border-radius` | Border radius | `12px` |
| `--yh-alert-title-font-size` | Title font size | `14px` |
| `--yh-alert-description-font-size` | Description font size | `13px` |
| `--yh-alert-icon-size` | Icon size | `20px` |
| `--yh-alert-scroll-speed` | Scroll speed control (S) | `15s` |

<style scoped>
.demo-list { display: flex; flex-direction: column; gap: 12px; }
.demo-column { display: flex; flex-direction: column; align-items: flex-start; }
.glass-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
}
</style>
