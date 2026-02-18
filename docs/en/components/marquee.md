<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const marqueePlay = ref(true)
const cycleCount = ref(0)
const handleCycle = () => {
  cycleCount.value++
}

const tsBasic = `<${_T}>
  <yh-marquee>
    <div v-for="i in 10" :key="i" class="marquee-item">
      🔥 Inspiration {{ i }}
    </div>
  </yh-marquee>
</${_T}>

<${_St} scoped>
.marquee-item {
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
}
</${_St}>`

const jsBasic = toJs(tsBasic)

const tsVertical = `<${_T}>
  <div class="vertical-container">
    <yh-marquee direction="vertical" :duration="8" gap="12px">
      <div v-for="i in 5" :key="i" class="marquee-message">
        Announcement #{{ i }}: System maintenance tonight
      </div>
    </yh-marquee>
  </div>
</${_T}>

<${_St} scoped>
.vertical-container {
  height: 180px;
  width: 100%;
  border: 1px solid var(--yh-border-color);
  border-radius: 8px;
  overflow: hidden;
}
.marquee-message {
  width: 100%;
  height: 60px;
  background: var(--yh-bg-color-page);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
</${_St}>`

const jsVertical = toJs(tsVertical)

const tsGradient = `<${_T}>
  <yh-marquee gradient gradient-width="80px" gap="40px">
    <div v-for="i in 8" :key="i" class="user-item">
      <img :src="\`https://api.dicebear.com/7.x/pixel-art/svg?seed=\${i}\`" class="avatar" />
      <span class="username">User {{i}}</span>
    </div>
  </yh-marquee>
</${_T}>

<${_St} scoped>
.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.avatar {
  width: 50px;
  border-radius: 50%;
  border: 2px solid #eee;
}
.username {
  font-size: 12px;
  color: #666;
}
</${_St}>`

const jsGradient = toJs(tsGradient)

const tsCustom = `<${_T}>
  <div class="stock-container">
    <yh-marquee 
      :duration="25" 
      gap="40px" 
      pause-on-hover 
      gradient 
      gradient-color="#000"
      gradient-width="60px"
    >
      <div v-for="item in stockData" :key="item.name" class="stock-item">
        <span class="name">{{ item.name }}</span>
        <span :class="['price', item.trend]">{{ item.price }}</span>
        <span :class="['change', item.trend]">
          {{ item.trend === 'up' ? '▲' : '▼' }} {{ item.change }}
        </span>
      </div>
    </yh-marquee>
  </div>
</${_T}>

<${_S} setup lang="ts">
const stockData = [
  { name: 'AAPL', price: '189.43', change: '+1.2%', trend: 'up' },
  { name: 'TSLA', price: '238.45', change: '-2.4%', trend: 'down' },
  { name: 'NVDA', price: '495.22', change: '+5.1%', trend: 'up' },
  { name: 'MSFT', price: '374.07', change: '+0.8%', trend: 'up' },
  { name: 'AMZN', price: '145.20', change: '+1.5%', trend: 'up' },
  { name: 'GOOGL', price: '132.40', change: '-0.3%', trend: 'down' }
]
</${_S}>

<${_St} scoped>
.stock-container {
  background: #000;
  padding: 15px;
  border-radius: 4px;
}
.stock-item {
  display: flex;
  gap: 12px;
  align-items: center;
}
.name {
  color: #fff;
  font-weight: bold;
  font-family: monospace;
}
.price {
  font-weight: bold;
}
.price.up { color: #52c41a; }
.price.down { color: #f5222d; }
.change {
  font-size: 13px;
}
.change.up { color: #b7eb8f; }
.change.down { color: #ffa39e; }
</${_St}>`

const jsCustom = toJs(tsCustom)

const stockData = [
  { name: 'AAPL', price: '189.43', change: '+1.2%', trend: 'up' },
  { name: 'TSLA', price: '238.45', change: '-2.4%', trend: 'down' },
  { name: 'NVDA', price: '495.22', change: '+5.1%', trend: 'up' },
  { name: 'MSFT', price: '374.07', change: '+0.8%', trend: 'up' },
  { name: 'AMZN', price: '145.20', change: '+1.5%', trend: 'up' },
  { name: 'GOOGL', price: '132.40', change: '-0.3%', trend: 'down' }
]

const tsControl = `<${_T}>
  <div class="control-wrapper">
    <div class="header">
      <yh-button size="small" @click="marqueePlay = !marqueePlay">
        {{ marqueePlay ? 'Click to Pause' : 'Click to Play' }}
      </yh-button>
      <span class="counter">
        Total Cycles: <strong>{{ cycleCount }}</strong>
      </span>
    </div>

    <yh-marquee 
      :play="marqueePlay" 
      pause-on-hover 
      @cycle-complete="handleCycle"
    >
      <div v-for="i in 5" :key="i" class="experiment-item">
        Interaction Item {{ i }}
      </div>
    </yh-marquee>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const marqueePlay = ref(true)
const cycleCount = ref(0)
const handleCycle = () => {
  cycleCount.value++
}
</${_S}>

<${_St} scoped>
.control-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.header {
  display: flex;
  gap: 12px;
  align-items: center;
}
.counter {
  font-size: 14px;
  color: #666;
}
.experiment-item {
  padding: 10px 30px;
  background: #f0f7ff;
  color: #0070f3;
  border-radius: 20px;
  font-weight: bold;
}
</${_St}>`

const jsControl = toJs(tsControl)

const tsNuxt = `<${_T}>
  <ClientOnly>
    <yh-marquee>Nuxt 3 SSR Compatibility Demo</yh-marquee>
  </ClientOnly>
</${_T}>`

const jsNuxt = toJs(tsNuxt)

const tsSpeed = `<${_T}>
  <div class="speed-container">
    <yh-marquee :speed="40" gap="20px">
      <div v-for="i in 3" :key="i" class="speed-item-short">Short Item {{ i }}</div>
    </yh-marquee>
    <yh-marquee :speed="40" gap="20px">
      <div v-for="i in 10" :key="i" class="speed-item-long">This is a very long long long long long content item {{ i }}</div>
    </yh-marquee>
  </div>
</${_T}>

<${_St} scoped>
.speed-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.speed-item-short { padding: 10px 20px; background: #e6f7ff; border-radius: 4px; }
.speed-item-long { padding: 10px 20px; background: #f6ffed; border-radius: 4px; }
</${_St}>`

const jsSpeed = toJs(tsSpeed)

const tsDelay = `<${_T}>
  <yh-marquee :speed="60" :delay="1" :loop-delay="2" pause-on-hidden>
    <div v-for="i in 6" :key="i" class="delay-card">
      <yh-icon name="info" />
      <span>Announcement: Message #{{ i }}, paused for 2s for reading</span>
    </div>
  </yh-marquee>
</${_T}>

<${_St} scoped>
.delay-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  color: #856404;
}
</${_St}>`

const jsDelay = toJs(tsDelay)
</script>

# Marquee

High-performance, seamless scrolling marquee component. Driven by CSS animations, supports horizontal/vertical scrolling, dynamic content filling, and ultimate interaction experience.

## Basic Usage

The simplest infinite horizontal scrolling.

<DemoBlock title="Basic Infinite Scroll" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-marquee>
    <div v-for="i in 10" :key="i" class="marquee-item">
      🔥 Inspiration {{ i }}
    </div>
  </yh-marquee>
</DemoBlock>

<style scoped>
.marquee-item {
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
}
</style>

## Vertical Display

Set `direction="vertical"` for vertical scrolling. Note: A specific height is usually required for the container in vertical mode.

<DemoBlock title="Vertical Scrolling" :ts-code="tsVertical" :js-code="jsVertical">
  <div class="vertical-container">
    <yh-marquee direction="vertical" :duration="8" gap="12px">
      <div v-for="i in 5" :key="i" class="marquee-message">
        Announcement #{{ i }}: System maintenance tonight
      </div>
    </yh-marquee>
  </div>
</DemoBlock>

<style scoped>
.vertical-container {
  height: 180px;
  width: 100%;
  border: 1px solid var(--yh-border-color);
  border-radius: 8px;
  overflow: hidden;
}
.marquee-message {
  width: 100%;
  height: 60px;
  background: var(--yh-bg-color-page);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
</style>

## Edge Gradient

Enable the `gradient` attribute to add a gradient fade on both sides of the scroll container, making edge transitions smoother and more natural. You can customize the color and width.

<DemoBlock title="Edge Gradient Fade" :ts-code="tsGradient" :js-code="jsGradient">
  <yh-marquee gradient gradient-width="80px" gap="40px">
    <div v-for="i in 8" :key="i" class="user-item">
      <img :src="`https://api.dicebear.com/7.x/pixel-art/svg?seed=${i}`" class="avatar" />
      <span class="username">User {{i}}</span>
    </div>
  </yh-marquee>
</DemoBlock>

<style scoped>
.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.avatar {
  width: 50px;
  border-radius: 50%;
  border: 2px solid #eee;
}
.username {
  font-size: 12px;
  color: #666;
}
</style>

## Interaction and State Control

Supports pause on hover, event listening, and manual play control. Use the `play` attribute for precise animation control, and the `cycle-complete` event to capture the end of each scrolling cycle.

<DemoBlock title="Interaction Control" :ts-code="tsControl" :js-code="jsControl">
  <div class="control-wrapper">
    <div class="header">
      <yh-button size="small" @click="marqueePlay = !marqueePlay">
        {{ marqueePlay ? 'Click to Pause' : 'Click to Play' }}
      </yh-button>
      <span class="counter">Total Cycles: <strong>{{ cycleCount }}</strong></span>
    </div>
    <yh-marquee :play="marqueePlay" pause-on-hover @cycle-complete="handleCycle">
      <div v-for="i in 5" :key="i" class="experiment-item">
        Interaction Item {{ i }}
      </div>
    </yh-marquee>
  </div>
</DemoBlock>

<style scoped>
.control-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.header {
  display: flex;
  gap: 12px;
  align-items: center;
}
.counter {
  font-size: 14px;
  color: #666;
}
.experiment-item {
  padding: 10px 30px;
  background: #f0f7ff;
  color: #0070f3;
  border-radius: 20px;
  font-weight: bold;
}
</style>

## Constant Speed

In scenarios with variable content length, use `speed` (px/s) instead of `duration` to ensure different content lengths scroll at exactly the same speed, avoiding visual jitter.

<DemoBlock title="Constant Speed Demo" :ts-code="tsSpeed" :js-code="jsSpeed">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-marquee :speed="40" gap="20px">
      <div v-for="i in 3" :key="i" class="speed-item-short">Short Item {{ i }}</div>
    </yh-marquee>
    <yh-marquee :speed="40" gap="20px">
      <div v-for="i in 10" :key="i" class="speed-item-long">This is a very long long long long long content item {{ i }}</div>
    </yh-marquee>
  </div>
</DemoBlock>

<style scoped>
.speed-item-short { padding: 10px 20px; background: #e6f7ff; border-radius: 4px; }
.speed-item-long { padding: 10px 20px; background: #f6ffed; border-radius: 4px; }
</style>

## Viewport Sensing and Loop Delay

Use `pause-on-hidden` to automatically stop animation when the component leaves the viewport to save performance. Use `delay` and `loop-delay` attributes for elegant pauses before the first cycle and between each subsequent cycle.

<DemoBlock title="Loop Pause Example" :ts-code="tsDelay" :js-code="jsDelay">
  <yh-marquee :speed="60" :delay="1" :loop-delay="2" pause-on-hidden>
    <div v-for="i in 6" :key="i" class="delay-card">
      <yh-icon name="info" />
      <span>Announcement: Message #{{ i }}, paused for 2s for reading</span>
    </div>
  </yh-marquee>
</DemoBlock>

<style scoped>
.delay-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  color: #856404;
}
</style>

## Professional Case: Stock Ticker

Combine gradients and custom styles to create a professional data display.

<DemoBlock title="Stock Ticker" :ts-code="tsCustom" :js-code="jsCustom">
  <div class="stock-container">
    <yh-marquee :duration="25" gap="40px" gradient gradient-color="#000" gradient-width="60px">
      <div v-for="item in stockData" :key="item.name" class="stock-item">
        <span class="name">{{ item.name }}</span>
        <span :class="['price', item.trend]">{{ item.price }}</span>
        <span :class="['change', item.trend]">
          {{ item.trend === 'up' ? '▲' : '▼' }} {{ item.change }}
        </span>
      </div>
    </yh-marquee>
  </div>
</DemoBlock>

<style scoped>
.stock-container {
  background: #000;
  padding: 15px;
  border-radius: 4px;
}
.stock-item {
  display: flex;
  gap: 12px;
  align-items: center;
}
.name {
  color: #fff;
  font-weight: bold;
  font-family: monospace;
}
.price {
  font-weight: bold;
}
.price.up { color: #52c41a; }
.price.down { color: #f5222d; }
.change {
  font-size: 13px;
}
.change.up { color: #b7eb8f; }
.change.down { color: #ffa39e; }
</style>

## Use in Nuxt

YH-UI perfectly adapts to Nuxt 3. You can directly use it in `app.vue` or any page.

::: tip Auto-import
If you use the `@yh-ui/nuxt` module, `YhMarquee` will be automatically loaded on demand with full styles.
:::

<DemoBlock title="Nuxt Adaptation" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-marquee>Nuxt 3 SSR Compatibility Demo</yh-marquee>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Scroll direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| duration | Duration for one scrolling cycle (seconds) | `number` | `20` |
| reverse | Whether to scroll in reverse | `boolean` | `false` |
| pause-on-hover | Whether to pause on hover | `boolean` | `true` |
| pause-on-click | Whether to pause on click | `boolean` | `false` |
| gap | Gap between content items | `number \| string` | `0` |
| gradient | Whether to enable edge gradient fade | `boolean` | `false` |
| gradient-color | Gradient fade color | `string` | `'#ffffff'` |
| gradient-width | Width of the gradient fade | `number \| string` | `'40px'` |
| auto-fill | Whether to auto-fill when content is insufficient | `boolean` | `true` |
| play | Whether to play animation | `boolean` | `true` |
| loop | Loop count (0 for infinite) | `number` | `0` |
| speed | Scrolling speed (px/s), will override `duration` if set | `number` | `0` |
| delay | Delay before starting animation (seconds) | `number` | `0` |
| loop-delay | Pause duration after each cycle ends (seconds) | `number` | `0` |
| pause-on-hidden | Whether to auto-pause when component leaves viewport | `boolean` | `true` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| cycle-complete | Triggered when a cycle completes | - |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Content to be scrolled |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| calculateClones | Manually trigger clone count calculation (useful after dynamic content resize) | `() => Promise<void>` |
| containerRef | DOM ref to the outer container | `HTMLElement \| null` |
| contentRef | DOM ref to the content container | `HTMLElement \| null` |

## Theme Variables

All color variables are integrated with the global theme system and support dark mode:

| Variable | Default | Description |
| --- | --- | --- |
| `--yh-marquee-gap` | `0px` | Gap between content items |
| `--yh-marquee-duration` | `20s` | Animation duration |
| `--yh-marquee-iteration-count` | `infinite` | Animation iteration count |
| `--yh-marquee-direction` | `normal` | Animation playback direction |
| `--yh-marquee-play-state` | `running` | Animation play state |
| `--yh-marquee-gradient-color` | `var(--yh-bg-color)` | Edge gradient color (follows theme background) |
| `--yh-marquee-gradient-width` | `40px` | Edge gradient width |
| `--yh-marquee-clone-count` | `1` | Internally calculated clone multiplier (readonly) |
