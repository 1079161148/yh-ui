# Progress

Used to display the progress status of the current operation. It combines the strengths of various UIs and pioneers dual-state progress, multi-ring nesting, and high-performance circular animation effects.

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const percentage = ref(20)
const secondary = ref(45)
const multiPercentages = ref([85, 70, 55, 40])

onMounted(() => {
  const timer = setInterval(() => {
    percentage.value = (percentage.value % 100) + 1
    secondary.value = Math.min(100, (percentage.value + 25))
    multiPercentages.value = multiPercentages.value.map(p => (p + 1) % 100)
  }, 300)
})

const tsBasic = `<template>
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</template>`

const tsCircle = `<template>
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="25" />
    <yh-progress type="circle" :percentage="100" status="success" />
    <yh-progress type="dashboard" :percentage="75" status="warning" />
  </div>
</template>`

const tsGradient = `<template>
  <div class="demo-progress-row">
    <!-- SVG Gradient -->
    <yh-progress 
      type="circle" 
      :percentage="80" 
      :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" 
    />
    <!-- Circular rotation animation -->
    <yh-progress 
      type="circle" 
      :percentage="70" 
      status="success" 
      animated 
    />
    <!-- Gradient array -->
    <yh-progress 
      type="dashboard" 
      :percentage="50" 
      :color="['#409eff', '#67c23a']" 
    />
  </div>
</template>`

const tsMulti = `<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
const multiPercentages = ref([85, 70, 55, 40])
<\/script>`

const tsStriped = `<template>
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</template>`

const tsSecondary = `<template>
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</template>`

const tsTextInside = `<template>
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</template>`

const tsCustomContent = `<template>
  <div class="demo-progress">
    <!-- External custom content -->
    <yh-progress :percentage="50">
      <span style="margin-left: 10px; color: #909399; font-size: 13px">Content</span>
    </yh-progress>
    
    <!-- Internal custom content -->
    <yh-progress :stroke-width="20" :percentage="70" text-inside>
      <span style="font-size: 12px">Content</span>
    </yh-progress>
    
    <div class="demo-progress-row">
      <!-- Circular custom content (overrides default icon) -->
      <yh-progress type="circle" :percentage="100" status="success">
        <svg viewBox="0 0 1024 1024" width="28" height="28">
           <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />
        </svg>
      </yh-progress>
      
      <!-- Dashboard layered content -->
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
</template>`

const tsSteps = `<template>
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</template>`

const tsIndeterminate = `<template>
  <yh-progress indeterminate :duration="2" />
</template>`

const tsNuxt = `<template>
  <!-- Direct use, supports auto-import -->
  <yh-progress :percentage="50" striped striped-flow />
</template>`
</script>

## Basic Usage

Linear progress bar, supporting multiple built-in semantic colors and automatic status icons.

<DemoBlock title="Basic Usage" :ts-code="tsBasic">
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</DemoBlock>

## Percentage Inside

Percentage does not occupy extra space, suitable for file uploads and other scenarios. You can change the height of the progress bar with `stroke-width` and use the `text-inside` attribute to place percentages inside the bar.

<DemoBlock title="Inner Percentage" :ts-code="tsTextInside">
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</DemoBlock>

## Custom Content

Add custom content via the default slot. For circular progress, scoped slots are also supported to retrieve real-time progress.

<DemoBlock title="Custom Content Demo" :ts-code="tsCustomContent">
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

Enable via `type="circle"` or `dashboard`. Supports **rotation animation** and custom **SVG gradients**.

<DemoBlock title="Visual Enhancement" :ts-code="tsGradient">
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="80" :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" />
    <yh-progress type="circle" :percentage="70" status="success" animated />
    <yh-progress type="dashboard" :percentage="50" :color="['#409eff', '#67c23a']" />
  </div>
</DemoBlock>

## Multi-ring Nesting (Premium)

By passing an array to `percentage`, you can achieve a multi-ring nesting effect similar to the Apple Watch.

<DemoBlock title="Multi-ring Race" :ts-code="tsMulti">
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

Enable `striped` to add a design sense, and `striped-flow` to make the progress bar "move".

<DemoBlock title="Dynamic Striped" :ts-code="tsStriped">
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</DemoBlock>

## Advanced Features

### 1. Secondary Percentage
Supports the `secondary-percentage` attribute. Perfect for video playback buffering.

<DemoBlock title="Secondary State Demo" :ts-code="tsSecondary">
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</DemoBlock>

### 2. Stepped Progress (Steps)
The `steps` property allows the progress bar to be split by physical scales.

<DemoBlock title="Scale Segments" :ts-code="tsSteps">
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</DemoBlock>

### 3. Indeterminate State
When exact values cannot be predicted (e.g., scanning, connecting).

<DemoBlock title="Loading Status" :ts-code="tsIndeterminate">
  <yh-progress indeterminate :duration="2" />
</DemoBlock>

## Use in Nuxt

The component is perfectly adapted for Nuxt 3, supporting auto-import and unique SSR gradient IDs.

<DemoBlock title="Nuxt Adaptation" :ts-code="tsNuxt">
  <yh-progress :percentage="50" striped striped-flow />
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Progress type | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| percentage | percentage | `number \| number[]` | `0` |
| secondary-percentage | Secondary percentage (for buffering effect) | `number` | `0` |
| status | Built-in status, automatically matches color and icon | `'success' \| 'exception' \| 'warning' \| 'info'` | — |
| stroke-width | Progress bar width | `number` | `6` |
| text-inside | Whether to show text inside (line type only) | `boolean` | `false` |
| width | Circular canvas width | `number` | `126` |
| show-text | Whether to show progress text/icon | `boolean` | `true` |
| color | Progress color, supports function/array gradient/object gradient | `string \| function \| string[] \| Record<string, string>` | — |
| define-background-color | Background track color | `string` | — |
| icon | Custom status icon | `string` | — |
| animated | Enables circular rotation animation | `boolean` | `false` |
| steps | Number of segments | `number` | `0` |
| stroke-linecap | Progress bar end shape | `'butt' \| 'round' \| 'square'` | `'round'` |
| format | Custom text formatting function | `function(percentage)` | — |
| striped | Enables striped style | `boolean` | `false` |
| striped-flow | Enables striped flow animation | `boolean` | `false` |
| indeterminate | Enables indeterminate slide mode | `boolean` | `false` |
| duration | Animation cycle duration (s) | `number` | `3` |

### Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Custom content for the center or right side of the progress bar | `{ percentage: number }` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-progress-bar-bg` | Track background | `var(--yh-fill-color-darker)` |
| `--yh-progress-duration` | Default animation cycle | `3s` |

<style scoped>
.demo-progress { display: flex; flex-direction: column; gap: 20px; width: 100%; }
.demo-progress-row { display: flex; gap: 24px; align-items: center; justify-content: center; padding: 20px; flex-wrap: wrap; }
</style>
