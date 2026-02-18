# Loading

A mask layer displayed when loading data. Features flagship acrylic visual effects and perfectly adapts to Nuxt 3/4.

<script setup lang="ts">
import { ref, h, getCurrentInstance } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import { YhLoading } from '../../../packages/components/src/loading'

// --- Showcase State ---
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

const openPremium = (type: any) => {
  const instance = YhLoading.service({
    fullscreen: true,
    spinnerType: type,
    text: `Applying ${type} premium style...`,
    glass: true,
    color: ['#00d2ff', '#3a7bd5']
  })
  setTimeout(() => instance.close(), 2000)
}

const openPremiumColored = (type: any, colors: string[]) => {
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

// --- Snippets ---
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
import { YhLoading } from 'yh-ui'

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
import { YhLoading } from 'yh-ui'

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
import { YhLoading } from 'yh-ui'

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
import { YhLoading } from 'yh-ui'

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
import { YhLoading } from 'yh-ui'

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

`Loading` is the directive and service encapsulation provided by YH-UI, while `Spin` is its core UI component.

-   **Underlying Core (`Spin`)**: Responsible for the visual presentation and text arrangement of loading animations (SVG/Dot/Chaser/Gear). It is a pure Vue component.
-   **High-level Encapsulation (`Loading`)**: An enhanced solution built on `Spin`, providing **directives** and **command-style services**, specifically for handling full-screen masks, scroll locking, dynamic mounting, etc.

## Usage

### Regional Loading (Directive Version)

Use the `v-yh-loading` directive to quickly cover a host element with a loading mask.

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

Through modifiers `.fullscreen`, `.lock`, `.glass`, and extension attributes `yh-loading-*`, more complex loading interactions can be achieved.

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

Using `YhLoading.service` in `script setup` is the most efficient way to call it.

<DemoBlock title="Composition API Call" :ts-code="tsComposition" :js-code="jsComposition">
  <yh-button @click="openCustomSpinner">Click to trigger full screen loading</yh-button>
</DemoBlock>

### Options API

In non-`setup` environments, you can call it via `$loading` on the prototype.

<DemoBlock title="Options API Call" :ts-code="tsPremium" :js-code="jsPremium">
  <yh-button @click="openFullScreen">Click to demo global mounting</yh-button>
</DemoBlock>

## Usage in Axios

In actual projects, by combining Axios interceptors with a "reference counting" solution, Loading states for multiple concurrent requests can be handled perfectly, ensuring smooth loading effects.

<DemoBlock title="Network Request Interception Example" :ts-code="tsAxios" :js-code="jsAxios">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    This counter strategy ensures: only the first request opens Loading, and it is not closed until the last concurrent request completes, effectively preventing interface flickering.
  </p>
</DemoBlock>

## Flagship Loading Styles

Inspired by the dynamic designs of [loading.io](https://loading.io/#editor).

<DemoBlock title="Premium Animations" :ts-code="tsPremium" :js-code="jsPremium">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremium('chaser')">Chaser</yh-button>
    <yh-button @click="openPremium('gear')">Gear</yh-button>
    <yh-button @click="openPremium('dual-ring')">Dual Ring</yh-button>
    <yh-button @click="openPremium('rect')">Rect</yh-button>
  </div>
</DemoBlock>

### Custom Color Schemes

Supports single colors, gradient color arrays, or CSS variables.

<DemoBlock title="Multi-color Animations" :ts-code="tsPremium" :js-code="jsPremium">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="openPremiumColored('chaser', ['#ff4e50', '#f9d423'])">Sunset</yh-button>
    <yh-button @click="openPremiumColored('gear', ['#56ab2f', '#a8e063'])">New Green</yh-button>
    <yh-button @click="openPremiumColored('rect', ['#8e2de2', '#4a00e0'])">Deep Blue</yh-button>
    <yh-button @click="openPremiumColored('dual-ring', ['#f80759', '#bc4e9c'])">Neon</yh-button>
  </div>
</DemoBlock>

### Fully Custom Expansion (VNode/Component)

YH-UI allows skipping built-in styles and injecting any Vue component or VNode through the `spinner` property for complete autonomous control over Loading content.

<DemoBlock title="Custom VNode Demo" :ts-code="tsCustomSpinner" :js-code="jsCustomSpinner">
  <yh-button @click="openCustomVNodeLoading">Click to show custom VNode loading</yh-button>
</DemoBlock>

## Application Context

Now Loading accepts a `context` as the second parameter of the message constructor, allowing you to inject the current application context into Loading, which will allow it to inherit all properties of the application.

::: tip
If you register the YhLoading component globally, it will automatically inherit the application context.
:::

<DemoBlock title="Application Context Injection" :ts-code="tsContext" :js-code="jsContext">
  <p style="font-size: 14px; color: var(--yh-text-color-secondary);">
    By passing appContext, components mounted inside Loading can access globally registered plugins (like Pinia, Router) and global components.
  </p>
</DemoBlock>

## API

### LoadingOptions (Service Config)

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| target | Mounting target. Supports DOM or CSS selector | `string | HTMLElement` | `document.body` |
| body | Whether to insert mask into body element (same as target: body) | `boolean` | `false` |
| fullscreen | Whether full screen (`position: fixed`) | `boolean` | `true` |
| lock | Whether to lock host element scrolling | `boolean` | `false` |
| text | Loading text | `string` | - |
| glass | Whether to enable flagship mode (acrylic glass effect) | `boolean` | `false` |
| background | Mask layer background color | `string` | - |
| customClass | Custom mask layer class name | `string` | - |
| spinner | Custom icon/component (takes precedence over `spinnerType`) | `string | Component | VNode` | - |
| spinnerType | Loading animation type. Options: `circle`, `chaser`, `gear`, `dual-ring`, `rect` | `LoadingSpinnerType` | `circle` |
| color | Loading icon color, supports gradient color arrays or CSS variables | `string | string[] | object` | - |
| dot | Whether to use dot loading style (Antd style) | `boolean` | `false` |

### Directive Attributes (v-yh-loading)

| Name | Description | Type |
| --- | --- | --- |
| `yh-loading-text` | Loading text | `string` |
| `yh-loading-background` | Mask background color | `string` |
| `yh-loading-custom-class` | Custom class name | `string` |
| `yh-loading-glass` | Whether to enable acrylic effect | `boolean` |
| `yh-loading-dot` | Whether to use dot mode | `boolean` |
| `yh-loading-color` | Icon color | `string` |
| `yh-loading-type` | Animation type (`circle`, `chaser`, etc.) | `LoadingSpinnerType` |

### Directive Modifiers

| Name | Description |
| --- | --- |
| `.fullscreen` | Equivalent to `fullscreen: true` |
| `.lock` | Equivalent to `lock: true` |
| `.glass` | Equivalent to `glass: true` |

### LoadingInstance (Service Instance Methods)

| Prop | Description | Type |
| --- | --- | --- |
| `service` | Create and show loading mask | `(options: LoadingOptions, appContext?: AppContext) => LoadingInstance` |
| `close` | Close and destroy mask instance | `() => void` |
| `visible` | (Readonly) Get current mask visibility status | `boolean` |

### Slots (Available when injected via spinner property)

When using `<yh-spin>` or referencing the component alone, the following slots are supported:
- `default`: Mask host content
- `tip`: Custom text content
- `icon`: Replace built-in loading icon

## Theme Variables (CSS Variables)

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-bg-color-overlay` | Base mask background color | `rgba(255, 255, 255, 0.7)` |
| `--yh-spin-blur-radius` | Acrylic blur radius | `20px` |
| `--yh-loading-z-index` | Mask z-index | `2000` |

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
