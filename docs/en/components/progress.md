# Progress

`YhProgress` displays operation progress in line, circle, and dashboard modes. It also supports multi-ring percentages, buffered tracks, striped animation, indeterminate loading, and slot-based custom content.

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const percentage = ref(20)
const secondary = ref(45)
const multiPercentages = ref([85, 70, 55, 40])

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    percentage.value = (percentage.value % 100) + 1
    secondary.value = Math.min(100, percentage.value + 25)
    multiPercentages.value = multiPercentages.value.map((p) => (p + 1) % 100)
  }, 300)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const tsBasic = `<${_T}>
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</${_T}>`

const tsTextInside = `<${_T}>
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</${_T}>`

const tsCustomContent = `<${_T}>
  <div class="demo-progress">
    <yh-progress :percentage="50">
      <span style="margin-left: 10px; color: #909399; font-size: 13px">Content</span>
    </yh-progress>
    <yh-progress :stroke-width="20" :percentage="70" text-inside>
      <span style="font-size: 12px">Content</span>
    </yh-progress>
    <div class="demo-progress-row">
      <yh-progress type="circle" :percentage="100" status="success">
        <svg viewBox="0 0 1024 1024" width="28" height="28">
          <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />
        </svg>
      </yh-progress>
      <yh-progress type="dashboard" :percentage="80">
        <template #default="{ percentage }">
          <div style="text-align: center">
            <div style="font-size: 20px; color: #303133">{{ percentage }}%</div>
            <div style="font-size: 12px; color: #909399">Progressing</div>
          </div>
        </template>
      </yh-progress>
    </div>
  </div>
</${_T}>`

const tsCircle = `<${_T}>
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="25" />
    <yh-progress type="circle" :percentage="100" status="success" />
    <yh-progress type="dashboard" :percentage="75" status="warning" />
  </div>
</${_T}>`

const tsGradient = `<${_T}>
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="80" :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" />
    <yh-progress type="circle" :percentage="70" status="success" animated />
    <yh-progress type="dashboard" :percentage="50" :color="['#409eff', '#67c23a']" />
  </div>
</${_T}>`

const tsMulti = `<${_T}>
  <div class="demo-progress-row">
    <yh-progress
      type="circle"
      :percentage="multiPercentages"
      :color="['#409eff', '#67c23a', '#e6a23c', '#f56c6c']"
      :stroke-width="12"
      :width="200"
    >
      <div style="text-align:center">
        <div style="font-size:12px; opacity:0.6">Multi-dimensional Data</div>
        <div style="font-weight:bold; font-size:16px">Multi-ring Race</div>
      </div>
    </yh-progress>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const multiPercentages = ref([85, 70, 55, 40])
</${_S}>`

const tsStriped = `<${_T}>
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</${_T}>`

const tsSecondary = `<${_T}>
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</${_T}>`

const tsSteps = `<${_T}>
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</${_T}>`

const tsIndeterminate = `<${_T}>
  <yh-progress indeterminate :duration="2" />
</${_T}>`

const tsNuxt = `<${_T}>
  <yh-progress :percentage="50" striped striped-flow />
</${_T}>`

const jsBasic = toJs(tsBasic)
const jsTextInside = toJs(tsTextInside)
const jsCustomContent = toJs(tsCustomContent)
const jsCircle = toJs(tsCircle)
const jsGradient = toJs(tsGradient)
const jsMulti = toJs(tsMulti)
const jsStriped = toJs(tsStriped)
const jsSecondary = toJs(tsSecondary)
const jsSteps = toJs(tsSteps)
const jsIndeterminate = toJs(tsIndeterminate)
const jsNuxt = toJs(tsNuxt)
</script>

## Basic Usage

The default line mode supports semantic status styles and built-in status icons.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</DemoBlock>

## Percentage Inside

Use `text-inside` to move the progress text into the bar.

<DemoBlock title="Percentage Inside" :ts-code="tsTextInside" :js-code="jsTextInside">
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</DemoBlock>

## Custom Content

The default slot can replace the built-in label area. In all modes the slot receives the current `percentage`.

<DemoBlock title="Custom Content" :ts-code="tsCustomContent" :js-code="jsCustomContent">
  <div class="demo-progress">
    <yh-progress :percentage="50">
      <span style="margin-left: 10px; color: #909399; font-size: 13px">Content</span>
    </yh-progress>
    <yh-progress :stroke-width="20" :percentage="70" text-inside>
      <span style="font-size: 12px">Content</span>
    </yh-progress>
    <div class="demo-progress-row">
      <yh-progress type="circle" :percentage="100" status="success">
        <svg viewBox="0 0 1024 1024" width="28" height="28">
          <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />
        </svg>
      </yh-progress>
      <yh-progress type="dashboard" :percentage="80">
        <template #default="{ percentage }">
          <div style="text-align: center">
            <div style="font-size: 20px; color: #303133">{{ percentage }}%</div>
            <div style="font-size: 12px; color: #909399">Progressing</div>
          </div>
        </template>
      </yh-progress>
    </div>
  </div>
</DemoBlock>

## Circle and Dashboard

Switch `type` to `circle` or `dashboard` to render radial progress.

<DemoBlock title="Circle and Dashboard" :ts-code="tsCircle" :js-code="jsCircle">
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="25" />
    <yh-progress type="circle" :percentage="100" status="success" />
    <yh-progress type="dashboard" :percentage="75" status="warning" />
  </div>
</DemoBlock>

<DemoBlock title="Gradient and Animation" :ts-code="tsGradient" :js-code="jsGradient">
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="80" :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" />
    <yh-progress type="circle" :percentage="70" status="success" animated />
    <yh-progress type="dashboard" :percentage="50" :color="['#409eff', '#67c23a']" />
  </div>
</DemoBlock>

## Multi-ring Nesting

When `percentage` is an array, the component renders multiple concentric rings in order.

<DemoBlock title="Multi-ring Nesting" :ts-code="tsMulti" :js-code="jsMulti">
  <div class="demo-progress-row">
    <yh-progress
      type="circle"
      :percentage="multiPercentages"
      :color="['#409eff', '#67c23a', '#e6a23c', '#f56c6c']"
      :stroke-width="12"
      :width="200"
    >
      <div style="text-align:center">
        <div style="font-size:12px; opacity:0.6">Multi-dimensional Data</div>
        <div style="font-weight:bold; font-size:16px">Multi-ring Race</div>
      </div>
    </yh-progress>
  </div>
</DemoBlock>

## Striped and Flow

`striped` adds texture to line mode, and `striped-flow` animates that texture with the configured `duration`.

<DemoBlock title="Striped and Flow" :ts-code="tsStriped" :js-code="jsStriped">
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</DemoBlock>

## Advanced Features

### Secondary Percentage

Use `secondary-percentage` to show a buffered track behind the main value.

<DemoBlock title="Secondary Percentage" :ts-code="tsSecondary" :js-code="jsSecondary">
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</DemoBlock>

### Steps

Use `steps` to divide the line progress bar into fixed segments.

<DemoBlock title="Steps" :ts-code="tsSteps" :js-code="jsSteps">
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</DemoBlock>

### Indeterminate

Use `indeterminate` when the exact progress cannot be determined yet.

<DemoBlock title="Indeterminate" :ts-code="tsIndeterminate" :js-code="jsIndeterminate">
  <yh-progress indeterminate :duration="2" />
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, `YhProgress` can be used directly in Nuxt 3/4 pages and components.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-progress :percentage="50" striped striped-flow />
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `type` | Progress mode | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| `percentage` | Current progress value, or an array in multi-ring mode | `number \| number[]` | `0` |
| `secondary-percentage` | Secondary buffered progress | `number` | `0` |
| `status` | Semantic status style | `'success' \| 'exception' \| 'warning' \| 'info'` | `undefined` |
| `stroke-width` | Stroke thickness | `number` | `6` |
| `text-inside` | Render text inside the line bar | `boolean` | `false` |
| `width` | Width of circle and dashboard modes | `number` | `126` |
| `show-text` | Show text or status icon | `boolean` | `true` |
| `color` | Custom color, color function, array, or gradient map | `string \| ((percentage: number) => string) \| string[] \| Record<string, string>` | `''` |
| `icon` | Custom icon class name | `string` | `''` |
| `animated` | Rotate the active circular path | `boolean` | `false` |
| `define-background-color` | Custom track color | `string` | `''` |
| `format` | Custom formatter for the default text content | `(percentage: number) => string` | `undefined` |
| `stroke-linecap` | Stroke line cap style | `'butt' \| 'round' \| 'square'` | `'round'` |
| `striped` | Enable striped line styling | `boolean` | `false` |
| `striped-flow` | Animate striped line styling | `boolean` | `false` |
| `indeterminate` | Enable indeterminate line animation | `boolean` | `false` |
| `duration` | Animation duration in seconds | `number` | `3` |
| `steps` | Number of visible steps in line mode | `number` | `0` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### Events

This component does not expose component events.

### Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `default` | Replaces the built-in label area | `{ percentage: number }` |

### Expose

This component does not expose public instance methods or properties.

### Type Exports

| Type | Description |
| --- | --- |
| `YhProgressProps` | Component props type |
| `YhProgressSlots` | Component slots type |
| `YhProgressType` | Progress type union |
| `YhProgressStatus` | Progress status union |
| `YhProgressInstance` | Component instance type |

### Theme Variables

`YhProgress` supports `themeOverrides`. In component styles, the only dedicated component CSS variable currently consumed is the animation duration token below; colors and backgrounds mainly come from global theme tokens.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-progress-duration` | Duration used by striped, indeterminate, and circle animations | `3s` |

<style scoped>
.demo-progress {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.demo-progress-row {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}
</style>
