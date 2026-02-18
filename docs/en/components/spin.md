<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const pending = ref(true)
const showGlass = ref(false)
const showFullScreen = ref(false)
const isLoading = ref(false)

const triggerLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const triggerFullScreen = () => {
  showFullScreen.value = true
  setTimeout(() => {
    showFullScreen.value = false
  }, 3000)
}

const tsBasic = `<template>
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-spin size="small" />
    <yh-spin />
    <yh-spin size="large" />
    <yh-spin :size="64" />
  </div>
</template>`

const jsBasic = tsBasic

const tsDot = `<template>
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-spin dot size="small" />
    <yh-spin dot />
    <yh-spin dot size="large" />
  </div>
</template>`

const jsDot = tsDot

const tsType = `<template>
  <div style="display: flex; gap: 48px; flex-wrap: wrap; align-items: center;">
    <yh-spin type="circle" tip="Circle (default)" />
    <yh-spin type="chaser" tip="Chaser" />
    <yh-spin type="gear" tip="Gear" />
    <yh-spin type="dual-ring" tip="Dual Ring" />
    <yh-spin type="rect" tip="Rect" />
  </div>
</template>`

const jsType = tsType

const tsTip = `<template>
  <div style="display: flex; gap: 48px;">
    <yh-spin tip="Loading..." />
    <yh-spin vertical tip="Optimizing resources..." />
  </div>
</template>`

const jsTip = tsTip

const tsColor = `<template>
  <div style="display: flex; gap: 48px; align-items: center;">
    <yh-spin color="#f56c6c" tip="Urgent Processing" />
    <yh-spin color="#67c23a" tip="Syncing" />
    <!-- More vivid gradient with larger size -->
    <yh-spin 
      size="large"
      color="linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" 
      tip="Aurora Gradient" 
    />
    <yh-spin 
      dot
      size="large"
      color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
      tip="Warm Dot" 
    />
  </div>
</template>`

const jsColor = tsColor

const tsGlass = `<template>
  <div style="border: 1px solid var(--yh-border-color); border-radius: 12px; overflow: hidden; background: var(--yh-bg-color-page);">
    <!-- Control Bar -->
    <div style="padding: 16px; border-bottom: 1px solid var(--yh-border-color); display: flex; gap: 12px; background: var(--yh-bg-color);">
      <yh-button type="primary" size="small" @click="showGlass = true">Enable Local Mask</yh-button>
      <yh-button size="small" @click="triggerFullScreen">Enable Fullscreen Mask</yh-button>
    </div>

    <!-- Content Area - Wrapped with Spin -->
    <yh-spin :show="showGlass" glass tip="Secure encryption rendering...">
      <div style="padding: 24px; position: relative; min-height: 150px;">
        <!-- Close Button -->
        <div v-if="showGlass" style="position: absolute; top: 12px; right: 12px; z-index: 2001;">
          <yh-button size="small" @click="showGlass = false">Close Mask</yh-button>
        </div>

        <div style="color: var(--yh-text-color-primary);">
          <h4 style="margin-top: 0;">Business Secret Protection Area</h4>
          <p style="font-size: 14px; color: var(--yh-text-color-secondary); line-height: 1.6; margin-bottom: 0;">
            This is a local container with Glass mode applied. During sensitive operations (such as key generation, financial exports),
            enabling Gaussian blur mask can effectively prevent background content leakage and lock operations in the current area.
          </p>
        </div>
      </div>
    </yh-spin>

    <!-- Fullscreen Teleport Demo -->
    <Teleport to="body">
      <yh-spin :show="showFullScreen" glass tip="Performing fullscreen lock verification..." style="position: fixed;" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showGlass = ref(false)
const showFullScreen = ref(false)

const triggerFullScreen = () => {
  showFullScreen.value = true
  setTimeout(() => {
    showFullScreen.value = false
  }, 3000)
}
<\/script>`

const jsGlass = tsGlass.replace('lang="ts"', '')

const tsDelay = `<template>
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-button @click="triggerLoading">Start Simulated Request</yh-button>
    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>No delay: </span>
        <yh-spin :show="isLoading" size="small" />
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>500ms delay: </span>
        <yh-spin :show="isLoading" :delay="500" size="small" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isLoading = ref(false)
const triggerLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000) // Simulate fast request
}
<\/script>`

const jsDelay = tsDelay.replace('lang="ts"', '')

const tsContainer = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-spin :show="loading" tip="Loading data...">
      <div style="padding: 32px; border: 1px solid var(--yh-border-color); border-radius: 12px; background: var(--yh-bg-color);">
        <h4 style="margin: 0 0 16px 0;">Data Dashboard</h4>
        <p>This is content wrapped by Spin. Toggle the button below to control the loading state visibility.</p>
        <p>When loading is enabled, the content area will automatically apply Gaussian blur filter and show loading animation.</p>
      </div>
    </yh-spin>
    
    <div>
      <yh-button type="primary" @click="loading = !loading">
        Toggle Loading: {{ loading ? 'Close' : 'Open' }}
      </yh-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const jsContainer = tsContainer.replace('lang="ts"', '')

const tsCustom = `<template>
  <yh-spin :show="true">
    <template #tip>
      <div style="color: #409eff; font-family: monospace;">
        [SYSTEM] Scanning disk... 80%
      </div>
    </template>
  </yh-spin>
</template>`

const jsCustom = tsCustom

const tsNuxt = `<template>
  <!-- Nuxt auto-import support -->
  <yh-spin :show="pending" tip="Request in progress..." />
</template>

<script setup lang="ts">
// Use with Nuxt's useLazyFetch or useFetch
const { pending, data } = await useLazyFetch('/api/data')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

# Spin

Loading feedback for pages, cards, or local areas. YH-UI's Spin adopts a minimalist design, supporting standard SVG animations and providing a dynamic dot (Dot) mode.

## Basic Usage

Provides standard SVG animation with multiple size options, and also supports passing explicit pixel values.

<DemoBlock title="Size Options" :ts-code="tsBasic" :js-code="jsBasic">
<div style="display: flex; gap: 32px; align-items: center; padding: 10px 0;">
<yh-spin size="small" />
<yh-spin />
<yh-spin size="large" />
<yh-spin :size="64" />
</div>
</DemoBlock>

## Dot Mode

Inspired by excellent component libraries' 4-dot rotation mode, with more dynamic and rhythmic visuals.

<DemoBlock title="Dot Mode" :ts-code="tsDot" :js-code="jsDot">
<div style="display: flex; gap: 32px; align-items: center; padding: 10px 0;">
<yh-spin dot size="small" />
<yh-spin dot />
<yh-spin dot size="large" />
</div>
</DemoBlock>

## Premium Animations

In addition to the basic circle animation, YhSpin also provides various premium SVG animations to meet different visual aesthetic needs.

<DemoBlock title="Animation Types" :ts-code="tsType" :js-code="jsType">
<div style="display: flex; gap: 48px; flex-wrap: wrap; align-items: center; padding: 10px 0;">
<yh-spin type="circle" tip="Circle (default)" />
<yh-spin type="chaser" tip="Chaser" />
<yh-spin type="gear" tip="Gear" />
<yh-spin type="dual-ring" tip="Dual Ring" />
<yh-spin type="rect" tip="Rect" />
</div>
</DemoBlock>

## Description Text and Layout

Supports adding description text with horizontal or vertical layout.

<DemoBlock title="Description Text" :ts-code="tsTip" :js-code="jsTip">
<div style="display: flex; gap: 48px; padding: 10px 0;">
<yh-spin tip="Loading..." />
<yh-spin vertical tip="Optimizing resources..." />
</div>
</DemoBlock>

## Color Customization

Supports custom colors, and can even pass CSS gradient values for more advanced visual effects.

<DemoBlock title="Color Customization" :ts-code="tsColor" :js-code="jsColor">
<div style="display: flex; gap: 48px; align-items: center; padding: 10px 0;">
<yh-spin color="#f56c6c" tip="Urgent Processing" />
<yh-spin color="#67c23a" tip="Syncing" />
<yh-spin 
size="large"
color="linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" 
tip="Aurora Gradient" 
/>
<yh-spin 
dot
size="large"
color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
tip="Warm Dot" 
/>
</div>
</DemoBlock>

## Glass Mask Mode

The `glass` prop enables Gaussian blur mask effect for fullscreen or local areas, commonly used for state locking after important page operations.

<DemoBlock title="Glass Mask" :ts-code="tsGlass" :js-code="jsGlass">
<div style="border: 1px solid var(--yh-border-color); border-radius: 12px; overflow: hidden; background: var(--yh-bg-color-page);">
<div style="padding: 16px; border-bottom: 1px solid var(--yh-border-color); display: flex; gap: 12px; background: var(--yh-bg-color);">
<yh-button type="primary" size="small" @click="showGlass = true">Enable Local Mask</yh-button>
<yh-button size="small" @click="triggerFullScreen">Enable Fullscreen Mask</yh-button>
</div>
<yh-spin :show="showGlass" glass tip="Secure encryption rendering...">
<div style="padding: 24px; position: relative; min-height: 150px;">
<div v-if="showGlass" style="position: absolute; top: 12px; right: 12px; z-index: 2001;">
<yh-button size="small" @click="showGlass = false">Close Mask</yh-button>
</div>
<div style="color: var(--yh-text-color-primary);">
<h4 style="margin-top: 0;">Business Secret Protection Area</h4>
<p style="font-size: 14px; color: var(--yh-text-color-secondary); line-height: 1.6; margin-bottom: 0;">
This is a local container with Glass mode applied. During sensitive operations (such as key generation, financial exports),
enabling Gaussian blur mask can effectively prevent background content leakage and lock operations in the current area.
</p>
</div>
</div>
</yh-spin>
<Teleport to="body">
<yh-spin :show="showFullScreen" glass tip="Performing fullscreen lock verification..." style="position: fixed;" />
</Teleport>
</div>
</DemoBlock>

## Delayed Display (Anti-flicker)

For some extremely fast requests (e.g., < 100ms), immediately showing loading animation may cause visual "flickering" discomfort. Use the `delay` prop to set delayed display time.

<DemoBlock title="Delayed Display" :ts-code="tsDelay" :js-code="jsDelay">
<div style="display: flex; gap: 32px; align-items: center; padding: 10px 0;">
<yh-button @click="triggerLoading">Start Simulated Request</yh-button>
<div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span>No delay: </span>
<yh-spin :show="isLoading" size="small" />
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span>500ms delay: </span>
<yh-spin :show="isLoading" :delay="500" size="small" />
</div>
</div>
</div>
</DemoBlock>

## Container Mode (Advanced Usage)

Spin can be used as a container component to wrap other content. When `show` is `true`, the container automatically enters loading state and applies Gaussian blur.

<DemoBlock title="Container Mode" :ts-code="tsContainer" :js-code="jsContainer">
<div style="display: flex; flex-direction: column; gap: 16px; padding: 10px 0;">
<yh-spin :show="loading" tip="Loading data...">
<div style="padding: 32px; border: 1px solid var(--yh-border-color); border-radius: 12px; background: var(--yh-bg-color);">
<h4 style="margin: 0 0 16px 0;">Data Dashboard</h4>
<p>This is content wrapped by Spin. Toggle the button below to control the loading state visibility.</p>
<p>When loading is enabled, the content area will automatically apply Gaussian blur filter and show loading animation.</p>
</div>
</yh-spin>
<div>
<yh-button type="primary" @click="loading = !loading">
Toggle Loading: {{ loading ? 'Close' : 'Open' }}
</yh-button>
</div>
</div>
</DemoBlock>

## Custom Slots

The `tip` slot allows complete customization of the description text area content.

<DemoBlock title="Slot Customization" :ts-code="tsCustom" :js-code="jsCustom">
<div style="padding: 10px 0;">
<yh-spin :show="true">
<template #tip>
<div style="color: #409eff; font-family: monospace;">
[SYSTEM] Scanning disk... 80%
</div>
</template>
</yh-spin>
</div>
</DemoBlock>

## Use in Nuxt

`Spin` is fully compatible with Nuxt 3/4 environments. In Nuxt projects, components are automatically imported, and you can easily implement fullscreen or local loading effects with async APIs like `useFetch`.

<DemoBlock title="Nuxt Usage Example" :ts-code="tsNuxt" :js-code="jsNuxt">
<div style="padding: 10px 0;">
<yh-spin :show="pending" tip="Request in progress..." />
</div>
</DemoBlock>

::: tip SSR Rendering
Spin component does not render Spinner animation during SSR until client-side hydration is complete, ensuring it does not affect first-screen parsing performance.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| show | Whether to show loading state | `boolean` | `true` |
| tip | Description text | `string` | - |
| size | Size, supports keywords or custom px value | `'small' \| 'default' \| 'large' \| number` | `'default'` |
| vertical | Whether to arrange icon and text vertically | `boolean` | `false` |
| delay | Delay display time (ms), anti-flicker | `number` | `0` |
| glass | Whether to enable fullscreen glass mask mode | `boolean` | `false` |
| dot | Whether to use dot animation | `boolean` | `false` |
| type | Loading animation style type. Options: `circle`, `chaser`, `gear`, `dual-ring`, `rect` | `LoadingSpinnerType` | `'circle'` |
| color | Custom color (supports hex, RGB, CSS gradient string or gradient config object) | `string \| string[] \| Record<string, string>` | - |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| show | Triggered when loading state shows | - |
| hide | Triggered when loading state hides | - |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Wrapped content. If this slot exists, Spin runs in container mode |
| tip | Custom description text area |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| visible | Whether the animation is currently visible | `ComputedRef<boolean>` |

### Theme Variables (CSS Variables)

The component supports customization via the following variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-spin-color` | Base color of loading icon | `var(--yh-color-primary)` |
| `--yh-spin-blur-radius` | Blur radius in container mode | `8px` |
| `--yh-spin-mask-bg` | Mask background in container mode | `rgba(255, 255, 255, 0.4)` |
| `--yh-spin-mask-bg-dark` | Mask background in dark mode | `rgba(0, 0, 0, 0.3)` |
| `--yh-spin-gradient` | CSS background value in gradient mode | - |

