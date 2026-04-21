# Loading

Service and directive entry for displaying loading masks. It is built on top of `YhSpin` and is primarily used through `YhLoading.service(...)` and the `v-yh-loading` directive.

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import { YhLoading } from '../../../packages/components/src/loading'
import type { LoadingSpinnerType } from '../../../packages/components/src/spin'

const loadingBasic = ref(true)
const loadingFullscreen = ref(false)
const loadingAttr = ref(true)

const openFullScreen = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: 'Synchronizing global core data...',
    lock: true
  })
  setTimeout(() => instance.close(), 2000)
}

const openGlassFullScreen = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    glass: true,
    text: 'Acrylic Glass Immersive Loading',
    background: 'rgba(255, 255, 255, 0.1)'
  })
  setTimeout(() => instance.close(), 2000)
}

const openCustomSpinner = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: 'Custom colors and gradients',
    color: ['#00d2ff', '#3a7bd5'],
    glass: true
  })
  setTimeout(() => instance.close(), 2000)
}

const openPremium = (type: LoadingSpinnerType) => {
  const instance = YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    text: `Applying ${type} premium style...`,
    glass: true,
    color: ['#00d2ff', '#3a7bd5']
  })
  setTimeout(() => instance.close(), 2000)
}

const openPremiumColored = (type: LoadingSpinnerType, colors: string[]) => {
  const instance = YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    text: 'Loading with brilliant colors...',
    glass: true,
    color: colors
  })
  setTimeout(() => instance.close(), 2000)
}

const openCustomVNodeLoading = () => {
  const instance = YhLoading.service({
    fullscreen: true,
    text: 'Custom VNode Extension Demo',
    glass: true,
    spinner: h('div', { class: 'custom-logo-loading' }, [
      h('div', { class: 'logo-inner' }, 'YH')
    ])
  })
  setTimeout(() => instance.close(), 2500)
}

const openDirectiveFullscreen = () => {
  loadingFullscreen.value = true
  setTimeout(() => {
    loadingFullscreen.value = false
  }, 2000)
}

const tsBasic = `<${_T}>
  <yh-button @click="loading = !loading" style="margin-bottom: 16px;">
    Toggle Loading State
  </yh-button>
  <div 
    v-yh-loading="loading" 
    yh-loading-text="Reading container data..."
    style="height: 180px; border: 1px solid var(--yh-border-color-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page);"
  >
    <div style="color: var(--yh-text-color-secondary)">This is container content</div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</${_S}>`

const tsDirectiveFullscreen = `<${_T}>
  <yh-button @click="openLoading">
    Full Screen Loading (.fullscreen.lock)
  </yh-button>

  <div v-yh-loading.fullscreen.lock="loading"></div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const openLoading = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
</${_S}>`

const tsDirectiveAttributes = `<${_T}>
  <div 
    v-yh-loading="loading"
    yh-loading-text="Loading fast for you..."
    yh-loading-type="chaser"
    yh-loading-color="#00d2ff"
    yh-loading-background="rgba(0, 0, 0, 0.8)"
    style="height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a;"
  >
    <div style="color: #666">This is a dark container background</div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</${_S}>`

const tsDirectiveGlass = `<${_T}>
  <div 
    v-yh-loading="true"
    yh-loading-glass
    yh-loading-text="Acrylic Glass Directive Mask"
    class="demo-rich-container"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  >
    <div class="demo-card">
      <h4>System Core Dashboard</h4>
      <p>Rendering real-time data stream through acrylic glass filter...</p>
    </div>
  </div>
</${_T}>`

const tsDirectiveDot = `<${_T}>
  <div 
    v-yh-loading="true"
    yh-loading-dot
    yh-loading-text="Loading container..."
    class="demo-rich-container"
    style="background: var(--yh-bg-color-page);"
  >
    <div class="demo-card" style="background: var(--yh-bg-color);">
      <h4>Asset Management Queue</h4>
      <p>Dot loading mode for lightweight container feedback</p>
    </div>
  </div>
</${_T}>`

const tsDirectiveCustomClass = `<${_T}>
  <div 
    v-yh-loading="true"
    yh-loading-custom-class="my-custom-mask"
    yh-loading-text="Custom Style Mask"
    class="demo-rich-container"
    style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);"
  >
    <div class="demo-card">
      <h4>Deep Customization</h4>
      <p>Applying special filter via my-custom-mask class...</p>
    </div>
  </div>
</${_T}>

<${_St}>
.my-custom-mask {
  background-color: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(4px) sepia(1) hue-rotate(180deg) !important;
}
</${_St}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</${_S}>`

const tsComposition = `<${_S} setup lang="ts">
import { YhLoading } from '@yh-ui/yh-ui'

const openLoading = () => {
  const loading = YhLoading.service({
    fullscreen: true,
    text: 'Custom colors and gradients',
    color: ['#00d2ff', '#3a7bd5'],
    glass: true
  })
  setTimeout(() => loading.close(), 2000)
}
</${_S}>

<${_T}>
  <yh-button @click="openLoading">Click to trigger full screen loading</yh-button>
</${_T}>`

const tsPremium = `<${_T}>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremium('chaser')">Chaser</yh-button>
    <yh-button @click="openPremium('gear')">Gear</yh-button>
    <yh-button @click="openPremium('dual-ring')">Dual Ring</yh-button>
    <yh-button @click="openPremium('rect')">Rect</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { YhLoading } from '@yh-ui/yh-ui'

const openPremium = (type) => {
  YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    glass: true
  })
}
</${_S}>`

const tsCustomSpinner = `<${_S} setup lang="ts">
import { h } from 'vue'
import { YhLoading } from '@yh-ui/yh-ui'

const openCustom = () => {
  YhLoading.service({
    spinner: h('div', { class: 'custom-logo-loading' }, [
      h('div', { class: 'logo-inner' }, 'YH')
    ]),
    glass: true
  })
}
</${_S}>

<${_T}>
  <yh-button @click="openCustom">Show custom VNode</yh-button>
</${_T}>`

const tsAxios = `import axios from 'axios'
import { YhLoading } from '@yh-ui/yh-ui'

let loadingInstance = null
let requestCount = 0

const showLoading = () => {
  if (requestCount === 0) {
    loadingInstance = YhLoading.service({
      lock: true,
      text: 'Loading data...',
      glass: true
    })
  }
  requestCount++
}

const hideLoading = () => {
  requestCount--
  if (requestCount <= 0) {
    loadingInstance?.close()
    loadingInstance = null
  }
}

const service = axios.create({ baseURL: '/api', timeout: 5000 })

service.interceptors.request.use(config => {
  showLoading()
  return config
}, error => {
  hideLoading()
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  hideLoading()
  return response
}, error => {
  hideLoading()
  return Promise.reject(error)
})`

const tsContext = `<${_S} setup lang="ts">
import { getCurrentInstance } from 'vue'
import { YhLoading } from '@yh-ui/yh-ui'

const { appContext } = getCurrentInstance()!

YhLoading.service({}, appContext)
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsDirectiveFullscreen = toJs(tsDirectiveFullscreen)
const jsDirectiveAttributes = toJs(tsDirectiveAttributes)
const jsDirectiveGlass = toJs(tsDirectiveGlass)
const jsDirectiveDot = toJs(tsDirectiveDot)
const jsDirectiveCustomClass = toJs(tsDirectiveCustomClass)
const jsComposition = toJs(tsComposition)
const jsPremium = toJs(tsPremium)
const jsCustomSpinner = toJs(tsCustomSpinner)
const jsAxios = toJs(tsAxios)
const jsContext = toJs(tsContext)
</script>

## Relationship between Loading and Spin

`Loading` is the directive and service layer built on top of `Spin`, while `Spin` is the lower-level visual loading component.

- `Spin` is responsible for rendering icons, tips, and loading animation layouts.
- `Loading` adds service mounting, fullscreen masking, scroll locking, directive support, and temporary host management.

## Usage

### Regional Loading (Directive Version)

Use the `v-yh-loading` directive to cover a host element with a loading mask.

<DemoBlock title="Basic Usage" inverse :ts-code="tsBasic" :js-code="jsBasic">
  <yh-button @click="loadingBasic = !loadingBasic" style="margin-bottom: 16px;">
    Toggle Loading State
  </yh-button>
  <div 
    v-yh-loading="loadingBasic" 
    yh-loading-text="Reading container data..."
    style="height: 180px; border: 1px solid var(--yh-border-color-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page);"
  >
    <div style="color: var(--yh-text-color-secondary)">This is container content</div>
  </div>
</DemoBlock>

### Advanced Directive Usage

Directive modifiers such as `.fullscreen`, `.lock`, and `.glass`, together with the `yh-loading-*` attributes, provide richer loading interactions.

<DemoBlock title="Directive Fullscreen and Locking" :ts-code="tsDirectiveFullscreen" :js-code="jsDirectiveFullscreen">
  <yh-button @click="openDirectiveFullscreen">Click to demo .fullscreen.lock</yh-button>
  <div v-yh-loading.fullscreen.lock="loadingFullscreen"></div>
</DemoBlock>

<DemoBlock title="Directive Extension Attributes" :ts-code="tsDirectiveAttributes" :js-code="jsDirectiveAttributes">
  <yh-button @click="loadingAttr = !loadingAttr" style="margin-bottom: 16px;">
    Toggle local custom directive
  </yh-button>
  <div 
    v-yh-loading="loadingAttr"
    yh-loading-text="Loading fast for you..."
    yh-loading-type="chaser"
    yh-loading-color="#00d2ff"
    yh-loading-background="rgba(0, 0, 0, 0.8)"
    style="height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a;"
  >
    <div style="color: #666">This is a dark container background</div>
  </div>
</DemoBlock>

<DemoBlock title="Directive Flagship Glass Mode" :ts-code="tsDirectiveGlass" :js-code="jsDirectiveGlass">
  <div 
    v-yh-loading="true"
    yh-loading-glass
    yh-loading-text="Acrylic glass directive mask"
    class="demo-rich-container"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  >
    <div class="demo-card">
      <h4 style="margin:0">System Core Dashboard</h4>
      <p style="margin:8px 0 0; font-size:14px;">Rendering real-time data stream through acrylic glass filter...</p>
    </div>
  </div>
</DemoBlock>

<DemoBlock title="Directive Dot Mode" :ts-code="tsDirectiveDot" :js-code="jsDirectiveDot">
  <div 
    v-yh-loading="true"
    yh-loading-dot
    yh-loading-text="Loading container..."
    class="demo-rich-container"
    style="background: var(--yh-bg-color-page);"
  >
    <div class="demo-card" style="background: var(--yh-bg-color);">
      <h4 style="margin:0">Asset Management Queue</h4>
      <p style="margin:8px 0 0; font-size:14px;">Dot loading mode for lightweight container feedback</p>
    </div>
  </div>
</DemoBlock>

<DemoBlock title="Directive Custom Class Name" :ts-code="tsDirectiveCustomClass" :js-code="jsDirectiveCustomClass">
  <div 
    v-yh-loading="true"
    yh-loading-custom-class="my-custom-mask"
    yh-loading-text="Custom style mask"
    class="demo-rich-container"
    style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);"
  >
    <div class="demo-card">
      <h4 style="margin:0">Deep Customization</h4>
      <p style="margin:8px 0 0; font-size:14px;">Applying special filter via my-custom-mask class...</p>
    </div>
  </div>
</DemoBlock>

### Composition API (Recommended)

Use `YhLoading.service` inside `setup` to open and close loading masks imperatively.

<DemoBlock title="Composition API Call" :ts-code="tsComposition" :js-code="jsComposition">
  <yh-button @click="openCustomSpinner">Click to trigger full screen loading</yh-button>
</DemoBlock>

### Options API

After installing the plugin, the service is also available through `$loading`.

<DemoBlock title="Options API Call" :ts-code="tsPremium" :js-code="jsPremium">
  <yh-button @click="openFullScreen">Click to demo global mounting</yh-button>
</DemoBlock>

## Use in Nuxt

`YhLoading` works in Nuxt 3/4 after registering `@yh-ui/nuxt`. Call the service from client-side interaction handlers or lifecycle hooks, and use the directive directly in templates for container masks.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt']
})
```

## Usage in Axios

In real projects, combine Axios interceptors with a small reference counter so the mask only closes after the last concurrent request finishes.

<DemoBlock title="Network Request Interception Example" :ts-code="tsAxios" :js-code="jsAxios">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    This counter strategy ensures that only the first request opens Loading, and the mask stays visible until the last concurrent request completes.
  </p>
</DemoBlock>

## Flagship Loading Styles

Inspired by the motion styles of [loading.io](https://loading.io/#editor).

<DemoBlock title="Premium Animations" :ts-code="tsPremium" :js-code="jsPremium">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremium('chaser')">Chaser</yh-button>
    <yh-button @click="openPremium('gear')">Gear</yh-button>
    <yh-button @click="openPremium('dual-ring')">Dual Ring</yh-button>
    <yh-button @click="openPremium('rect')">Rect</yh-button>
  </div>
</DemoBlock>

### Custom Color Schemes

Single colors, gradient color arrays, and CSS-variable based colors are all supported.

<DemoBlock title="Multi-color Animations" :ts-code="tsPremium" :js-code="jsPremium">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremiumColored('chaser', ['#ff4e50', '#f9d423'])">Sunset</yh-button>
    <yh-button @click="openPremiumColored('gear', ['#56ab2f', '#a8e063'])">New Green</yh-button>
    <yh-button @click="openPremiumColored('rect', ['#8e2de2', '#4a00e0'])">Deep Blue</yh-button>
    <yh-button @click="openPremiumColored('dual-ring', ['#f80759', '#bc4e9c'])">Neon</yh-button>
  </div>
</DemoBlock>

### Fully Custom Expansion (VNode or Component)

Pass a custom `spinner` to replace the built-in loading renderer with your own VNode or component.

<DemoBlock title="Custom VNode Demo" :ts-code="tsCustomSpinner" :js-code="jsCustomSpinner">
  <yh-button @click="openCustomVNodeLoading">Click to show custom VNode loading</yh-button>
</DemoBlock>

## Application Context

`YhLoading.service` accepts the current app context as the second argument so content rendered inside the service can inherit global components and plugins.

::: tip
If `YhLoading` is installed globally, the service already runs with the application context created by the plugin.
:::

<DemoBlock title="Application Context Injection" :ts-code="tsContext" :js-code="jsContext">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    By passing `appContext`, components mounted inside Loading can access globally registered plugins such as Pinia or Vue Router.
  </p>
</DemoBlock>

## API

### Props

This entry does not expose configuration through component props. Use `YhLoading.service(...)` or `v-yh-loading` instead.

### Events

This entry does not expose component events.

### Slots

This entry is not used as a regular template component and does not expose standalone component slots.

### Expose

This entry does not expose component-instance `defineExpose` members. Service capabilities are returned from `YhLoading.service(...)`.

### Loading Options

| Property        | Description                                                  | Type                                           | Default           |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------- | ----------------- |
| target          | Mount target element or selector                             | `string \| HTMLElement`                        | `document.body`   |
| body            | Whether to append to the body container                      | `boolean`                                      | `false`           |
| fullscreen      | Whether to render as a fullscreen fixed mask                 | `boolean`                                      | `true`            |
| lock            | Whether to lock scrolling on the target                      | `boolean`                                      | `false`           |
| text            | Loading tip text                                             | `string`                                       | `undefined`       |
| spinner         | Custom icon, component, or VNode                             | `string \| Component \| VNode`                 | `undefined`       |
| background      | Custom mask background color                                 | `string`                                       | `undefined`       |
| customClass     | Extra class name applied to the mask                         | `string`                                       | `undefined`       |
| glass           | Whether to enable the glass-style mask                       | `boolean`                                      | `false`           |
| color           | Spinner color, gradient colors, or color token map           | `string \| string[] \| Record<string, string>` | `undefined`       |
| dot             | Whether to use the dot loading style                         | `boolean`                                      | `false`           |
| spinnerType     | Built-in loading animation type                              | `LoadingSpinnerType`                           | `'circle'`        |
| themeOverrides  | Component-level theme variable overrides                     | `ComponentThemeVars`                           | `undefined`       |

### Directive Attributes

| Name                      | Description                        | Type                 |
| ------------------------- | ---------------------------------- | -------------------- |
| `yh-loading-text`         | Loading tip text                   | `string`             |
| `yh-loading-background`   | Mask background color              | `string`             |
| `yh-loading-custom-class` | Extra custom class name            | `string`             |
| `yh-loading-glass`        | Whether to enable glass mode       | `boolean`            |
| `yh-loading-dot`          | Whether to enable dot mode         | `boolean`            |
| `yh-loading-color`        | Spinner color                      | `string`             |
| `yh-loading-type`         | Built-in spinner type              | `LoadingSpinnerType` |

### Directive Modifiers

| Name          | Description                      |
| ------------- | -------------------------------- |
| `.fullscreen` | Equivalent to `fullscreen: true` |
| `.lock`       | Equivalent to `lock: true`       |
| `.glass`      | Equivalent to `glass: true`      |

### Loading Instance

| Property | Description                    | Type         |
| -------- | ------------------------------ | ------------ |
| close    | Close and destroy the mask     | `() => void` |
| visible  | Current visible state (readonly) | `boolean` |

### Theme Variables

| Variable               | Description      | Default |
| ---------------------- | ---------------- | ------- |
| `--yh-loading-z-index` | Loading mask z-index | `2000` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhLoadingOptions` | Service options type for `YhLoading.service(...)` |
| `YhLoadingInstance` | Returned loading instance type |
| `vYhLoading` | Named directive export for `v-yh-loading` |

<style>
.custom-logo-loading {
  width: 60px; height: 60px; background: var(--yh-color-primary);
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 24px;
  box-shadow: 0 8px 16px var(--yh-color-primary-light-5);
  animation: custom-pulse 1.5s infinite ease-in-out;
}
@keyframes custom-pulse {
  0% { transform: scale(1); box-shadow: 0 4px 8px var(--yh-color-primary-light-7); }
  50% { transform: scale(1.1); box-shadow: 0 12px 24px var(--yh-color-primary-light-3); }
  100% { transform: scale(1); box-shadow: 0 4px 8px var(--yh-color-primary-light-7); }
}
.demo-rich-container {
  height: 200px; border-radius: 12px; display: flex; 
  align-items: center; justify-content: center; padding: 20px;
  border: 1px solid var(--yh-border-color); overflow: hidden;
  position: relative;
}
.demo-card {
  padding: 16px; border-radius: 8px; box-shadow: var(--yh-shadow-light);
  width: 80%; text-align: center; color: var(--yh-text-color-primary);
}
.my-custom-mask {
  background-color: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(4px) sepia(1) hue-rotate(180deg) !important;
}
.my-custom-mask .yh-spin__tip {
  color: #fff !important;
}
</style>
