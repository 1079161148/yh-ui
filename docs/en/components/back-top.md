# BackTop

Used for long pages. Clicking the button smoothly scrolls back to the top of the page.

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-back-top :visibility-height="100" />
  <div class="demo-info">
    <span class="dot"></span>
    Scroll down the page to see the button in the bottom right corner
  </div>
</template>`

const tsProgress = `<template>
  <yh-back-top :visibility-height="100" />
  <div class="demo-info">
    <span class="dot"></span>
    Watch the ring progress change around the button
  </div>
</template>`

const tsCustom = `<template>
  <yh-back-top :bottom="100" :right="100" progress-color="#ec4899">
    <div class="custom-bt">UP</div>
  </yh-back-top>
  <div class="demo-info">Observe the pink progress bar at the bottom right</div>
</template>

<` + `style scoped>
.custom-bt {
  width: 44px;
  height: 44px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: #ec4899;
  font-weight: bold;
  font-size: 12px;
}
<` + `/style>`

const tsNuxt = `<template>
  <yh-back-top :visibility-height="100" />
  <div class="demo-info">
    <span class="dot"></span>
    Works out-of-the-box in Nuxt projects with SSR static fault tolerance
  </div>
</template>`

</script>

## Basic Usage

The simplest usage, shown by default after scrolling 200px.

<DemoBlock title="Basic Usage" :ts-code="tsBasic">
  <div class="demo-info">
    <span class="dot"></span>
    Scroll down the page to see the button in the bottom right corner
  </div>
  <yh-back-top :visibility-height="100" />
</DemoBlock>

## Progress Indicator (Advanced)

`YhBackTop` features an industry-leading progress ring. Through the dynamic ring bar around the button, users can intuitively perceive the current physical position relative to the top of the article.

<DemoBlock title="Progress Preview" :ts-code="tsProgress">
  <div class="demo-info">
    <span class="dot"></span>
    Watch the ring progress change around the button
  </div>
</DemoBlock>

## Custom Content & Styles

Customize button content through slots and adjust display position and progress bar color through props.

<DemoBlock title="Custom Content" :ts-code="tsCustom">
  <yh-back-top :bottom="100" :right="100" progress-color="#ec4899">
    <div class="custom-bt">UP</div>
  </yh-back-top>
  <div class="demo-info">Observe the pink progress bar at the bottom right</div>
</DemoBlock>

## Advanced Features

### 1. Kinetic Progress Ring
By syncing the page scroll height with the SVG ring circumference at high frequency, an immersive "scroll equals feedback" experience is achieved. The ring uses `stroke-dashoffset` linear mapping, ensuring the ultimate balance between performance and visuals.

### 2. Smart Viewport Adaptation
Not limited to `window` global scrolling. When placed inside a container with `overflow: scroll` combined with the `target` prop, it can precisely control the return logic for local areas.

### 3. Cubic Easing Animation
Built-in `Cubic Easing` function makes the scroll-back action more aligned with physical perception, giving more "weight" than simple linear displacement.

## Use in Nuxt

`YhBackTop` is perfectly adapted for Nuxt auto-import.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt">
  <div class="demo-info">
    <span class="dot"></span>
    Works out-of-the-box in Nuxt projects with SSR static fault tolerance
  </div>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| visibility-height | Only shown when scroll height reaches this value | `number` | `200` |
| target | Container selector, not needed for full-screen scrolling | `string` | — |
| right | Distance from the right | `number` | `40` |
| bottom | Distance from the bottom | `number` | `40` |
| show-progress | Whether to show the progress ring | `boolean` | `true` |
| progress-color | Progress ring color | `string` | `var(--yh-color-primary)` |
| duration | Scroll-back animation duration (ms) | `number` | `400` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| click | Triggered when button is clicked | `(evt: MouseEvent)` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-back-top-bg-color` | Background color | `#ffffff` |
| `--yh-back-top-text-color` | Text/icon color | `var(--yh-color-primary)` |

<style scoped>
.demo-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: var(--yh-fill-color-light);
  border-radius: 12px;
  font-size: 14px;
  color: var(--yh-text-color-secondary);
}
.demo-info .dot { width: 8px; height: 8px; background: var(--yh-color-primary); border-radius: 50%; }

.custom-bt {
  width: 44px;
  height: 44px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: #ec4899;
  font-weight: bold;
  font-size: 12px;
}
</style>
