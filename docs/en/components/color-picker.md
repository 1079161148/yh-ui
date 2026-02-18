# ColorPicker

Used for selecting and setting colors. Supports multiple color modes (HEX, RGB, HSL), with alpha transparency control and predefined colors.

<script setup lang="ts">
import { ref, watch } from 'vue'

// --- Showcase state ---
const demoAlpha = ref(false)
const demoSize = ref('default')
const demoValue = ref('#6366f1')

const color1 = ref('#6366f1')
const colorAlpha = ref('rgba(99, 102, 241, 0.8)')
const colorPre = ref('#8b5cf6')
const s1 = ref('#6366f1'), s2 = ref('#ec4899')

// --- Code snippet definitions ---
const showcaseTS = `<template>
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">Alpha:</span>
        <yh-switch v-model="showAlpha" />
      </div>
      <div class="ctrl-row">
        <span class="label">Size:</span>
        <yh-radio-group v-model="size" size="small">
          <yh-radio-button value="large">Large</yh-radio-button>
          <yh-radio-button value="default">Default</yh-radio-button>
          <yh-radio-button value="small">Small</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="demo-viewport">
      <yh-color-picker v-model="value" :show-alpha="showAlpha" :size="size" />
    </div>
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const value = ref('#6366f1')
const showAlpha = ref(false)
const size = ref('default')
<` + `/script>`

const tsBasic = `<template>
  <div class="yh-demo-row">
    <yh-color-picker v-model="color1" />
    <yh-color-picker v-model="color2" size="large" />
    <yh-color-picker v-model="color3" size="small" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const color1 = ref('#6366f1')
const color2 = ref('#ec4899')
const color3 = ref('#10b981')
<` + `/script>`

const tsAlpha = `<template>
  <yh-color-picker v-model="color" show-alpha />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const color = ref('rgba(99, 102, 241, 0.8)')
<` + `/script>`

const tsPre = `<template>
  <yh-color-picker 
    v-model="color" 
    :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']" 
  />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const color = ref('#8b5cf6')
<` + `/script>`

const tsDisabled = `<template>
  <yh-color-picker v-model="color" disabled />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const color = ref('#6366f1')
<` + `/script>`

const tsNuxt = `<template>
  <div class="yh-demo-row">
    <yh-color-picker v-model="color" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
// No import needed in Nuxt, just define reactive data
const color = ref('#6366f1')
<` + `/script>`

</script>

## Showcase

ColorPicker provides a full-featured interactive demo. You can toggle alpha support and switch between sizes in real time.

<DemoBlock title="Full Showcase" :ts-code="showcaseTS">
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">Alpha:</span>
        <yh-switch v-model="demoAlpha" />
      </div>
      <div class="ctrl-row">
        <span class="label">Size:</span>
        <yh-radio-group v-model="demoSize" size="small">
          <yh-radio-button value="large">Large</yh-radio-button>
          <yh-radio-button value="default">Default</yh-radio-button>
          <yh-radio-button value="small">Small</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="demo-viewport">
       <yh-color-picker v-model="demoValue" :show-alpha="demoAlpha" :size="demoSize" />
    </div>
    <div class="demo-result">
      <span class="dot"></span>
      <span class="label">Current value:</span>
      <span class="val">{{ demoValue }}</span>
    </div>
  </div>
</DemoBlock>

## Basic Usage

Basic color picker functionality with HEX format two-way binding.

<DemoBlock title="Basic Usage" :ts-code="tsBasic">
  <div class="yh-demo-row">
    <yh-color-picker v-model="color1" />
    <yh-color-picker v-model="s1" size="large" />
    <yh-color-picker v-model="s2" size="small" />
  </div>
</DemoBlock>

## Alpha Transparency

Enable `show-alpha` to support alpha channel adjustment, automatically switching to RGBA format.

<DemoBlock title="Alpha Support" :ts-code="tsAlpha">
  <yh-color-picker v-model="colorAlpha" show-alpha />
</DemoBlock>

## Predefined Colors

Display a set of preset quick-select colors at the bottom of the panel.

<DemoBlock title="Predefined Colors" :ts-code="tsPre">
  <yh-color-picker 
    v-model="colorPre" 
    :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)']" 
  />
</DemoBlock>

## Disabled

The color picker becomes non-interactive when the `disabled` prop is set.

<DemoBlock title="Disabled" :ts-code="tsDisabled">
  <yh-color-picker v-model="color1" disabled />
</DemoBlock>

## Advanced Features

### 1. Intelligent Contrast Preview
The panel automatically calculates relative luminance between the selected color and background according to **WCAG standards**, providing real-time accessibility suggestions in the top-right corner to ensure designs meet visual accessibility requirements.

### 2. Cross-Platform EyeDropper
Based on the modern browser native `EyeDropper API`, it supports picking colors from anywhere on the screen (not limited to within the browser window), providing production-level support for professional design scenarios.

### 3. Bidirectional Input Field
The value display area at the bottom has been upgraded to a **responsive input field**. You can directly paste HEX or RGB codes from designers, and the component will instantly parse and locate the color.

## Use in Nuxt

`YhColorPicker` is perfectly adapted for Nuxt 3/4. Under the Nuxt architecture, all related APIs (including EyeDropper detection) have been optimized for Client-Only environments, ensuring zero SSR warnings.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt">
  <div class="yh-demo-row">
    <yh-color-picker v-model="color1" />
  </div>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Binding value | `string` | — |
| show-alpha | Whether to support alpha | `boolean` | `false` |
| predefine | Predefined color list | `string[]` | `[]` |
| size | Size | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | Whether disabled | `boolean` | `false` |
| popper-class | Panel custom class | `string` | — |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when a color is confirmed | `(val: string)` |
| active-change | Triggered when color changes in real-time within the panel | `(val: string)` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-color-picker-width` | Component base width | `60px` |
| `--yh-color-picker-panel-width` | Expanded panel width | `280px` |
| `--yh-color-picker-border-radius` | Border radius | `12px` |

<style scoped>
.demo-showcase {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
.demo-ctrl {
  background: var(--yh-fill-color-light);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.ctrl-row { display: flex; align-items: center; gap: 12px; }
.ctrl-row .label { font-size: 13px; font-weight: 600; color: var(--yh-text-color-secondary); min-width: 80px; }

.demo-viewport {
  padding: 40px;
  background: var(--yh-fill-color-extra-light);
  border-radius: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);
}
.demo-result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fff;
  border-radius: 50px;
  border: 1px solid var(--yh-border-color-lighter);
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}
.demo-result .dot { width: 8px; height: 8px; background: var(--yh-color-primary); border-radius: 50%; animation: blink 2s infinite; }
.demo-result .label { color: var(--yh-text-color-secondary); font-size: 14px; font-weight: 500; }
.demo-result .val { color: var(--yh-color-primary); font-weight: 700; font-family: 'JetBrains Mono', monospace; }

.yh-demo-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }

@keyframes blink { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

:deep(.is-holiday) { color: var(--yh-color-danger) !important; font-weight: bold; }
</style>
