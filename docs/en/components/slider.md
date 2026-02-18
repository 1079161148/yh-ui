# Slider

Allows selecting a value within a fixed range by dragging a handle.

<script setup lang="ts">
import { ref } from 'vue'

// Basic Usage
const val1 = ref(0)
const val2 = ref(50)
const val5 = ref(42)

// With Input
const val8 = ref(15)

// Vertical Mode
const valV1 = ref(30)
const valV2 = ref([20, 50])

// Marks
const valM = ref(37)
const marks = ref({
  0: '0°C',
  37: '37°C',
  50: { label: '50%' },
  100: '100°C'
})

// Custom Slots
const valS = ref(45)

// Nuxt Usage Example
const nuxtSlider1 = ref(30)
const nuxtSlider2 = ref([20, 50])

// Nuxt code sample
const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px 0;">
    <!-- Basic Slider, auto-imported -->
    <yh-slider v-model="nuxtSlider1" />
    
    <!-- Range Selection -->
    <yh-slider v-model="nuxtSlider2" range />
  </div>
</template>

<script setup lang="ts">
// No need to import Slider component manualy
const nuxtSlider1 = ref(30)
const nuxtSlider2 = ref([20, 50])
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// DemoBlock code strings
const tsBasic = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Default</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val1" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Custom Initial Value</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val2" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Disabled</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val5" disabled />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const val1 = ref(0)
const val2 = ref(50)
const val5 = ref(42)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')


const tsInput = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">With Input</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val8" show-input />
      </div>
    </div>
    <div class="demo-val-badge">Current Value: {{ val8 }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const val8 = ref(15)
<\/script>`

const jsInput = tsInput.replace('lang="ts"', '')


const tsVertical = `<template>
  <div class="yh-demo-wrapper">
    <div class="vertical-demo-container">
      <yh-slider v-model="valV1" vertical height="200px" />
      <yh-slider v-model="valV2" vertical height="200px" range />
    </div>
    <div style="text-align: center; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
      <div class="demo-val-badge">Single: {{ valV1 }}</div>
      <div class="demo-val-badge">Range: {{ valV2 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const valV1 = ref(30)
const valV2 = ref([20, 50])
<\/script>`

const jsVertical = tsVertical.replace('lang="ts"', '')


const tsMarks = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Slider Marks</span>
      <div class="yh-demo-content" style="padding: 0 20px;">
        <yh-slider v-model="valM" :marks="marks" />
      </div>
    </div>
    <div class="demo-val-badge">Current Value: {{ valM }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const valM = ref(37)
const marks = ref({
  0: '0°C',
  37: '37°C',
  50: { label: '50%' },
  100: '100°C'
})
<\/script>`

const jsMarks = tsMarks.replace('lang="ts"', '')


const tsSlot = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Custom Handle</span>
      <div class="yh-demo-content">
        <yh-slider v-model="valS">
          <template #thumb="{ value }">
            <div class="custom-thumb">{{ value }}</div>
          </template>
        </yh-slider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const valS = ref(45)
<\/script>

<style scoped>
.custom-thumb {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #409eff, #a855f7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  cursor: grab;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
}
<\/style>`

const jsSlot = tsSlot.replace('lang="ts"', '')

</script>

## Basic Usage

The most fundamental way to use the Slider.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Default</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val1" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Custom Initial Value</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val2" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Disabled</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val5" disabled />
      </div>
    </div>
  </div>
</DemoBlock>

## With Input

Use the `show-input` property to enable precise numerical input.

<DemoBlock title="With Input" :ts-code="tsInput" :js-code="jsInput">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">With Input</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val8" show-input />
      </div>
    </div>
    <div class="demo-val-badge">Current Value: {{ val8 }}</div>
  </div>
</DemoBlock>

## Vertical Mode

Set the `vertical` property to `true` to enable vertical mode. In vertical mode, the `height` property must be set.

<DemoBlock title="Vertical Mode" :ts-code="tsVertical" :js-code="jsVertical">
  <div class="yh-demo-wrapper">
    <div class="vertical-demo-container">
      <yh-slider v-model="valV1" vertical height="200px" />
      <yh-slider v-model="valV2" vertical height="200px" range />
    </div>
    <div style="text-align: center; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
      <div class="demo-val-badge">Single: {{ valV1 }}</div>
      <div class="demo-val-badge">Range: {{ valV2 }}</div>
    </div>
  </div>
</DemoBlock>

## Marks

Use the `marks` property to label ticks on the Slider.

<DemoBlock title="Marks" :ts-code="tsMarks" :js-code="jsMarks">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">Slider Marks</span>
      <div class="yh-demo-content" style="padding: 0 20px;">
        <yh-slider v-model="valM" :marks="marks" />
      </div>
    </div>
    <div class="demo-val-badge">Current Value: {{ valM }}</div>
  </div>
</DemoBlock>

## Custom Slots

Customize the slider handle via the `thumb` slot and markers via the `mark` slot. Example below:

<DemoBlock title="Custom Slots" :ts-code="tsSlot" :js-code="jsSlot">
  <div class="yh-demo-wrapper">
    <p class="slot-desc">
      <span style="font-size: 1.2em; margin-right: 8px;">✨</span>
      Slots allow you to fully customize the appearance of the Slider, such as the handle (Thumb) or scale markers (Mark).
    </p>
    <div class="yh-demo-row">
      <span class="yh-demo-label">Custom Handle</span>
      <div class="yh-demo-content">
        <yh-slider v-model="valS">
          <template #thumb="{ value }">
            <div class="custom-thumb">{{ value }}</div>
          </template>
        </yh-slider>
      </div>
    </div>
  </div>
</DemoBlock>

## Nuxt Usage

The Slider component fully supports Nuxt 3/4 SSR. When used in a Nuxt project, it is auto-imported.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px 0;">
    <yh-slider v-model="nuxtSlider1" />
    <yh-slider v-model="nuxtSlider2" range />
  </div>
</DemoBlock>

**SSR Considerations**:

- ✅ Basic sliding and range selection are fully supported.
- ✅ Step and marks render correctly on the server side.
- ✅ Vertical layout remains consistent during SSR.
- ✅ Slots (thumb/mark) support SSR rendering.
- ⚠️ Drag interaction and Tooltip visibility are only active after client-side hydration.

::: tip SSR Safety
The Slider component's style system is optimized for SSR, ensuring the runway and bar have correct visuals on initial load, eliminating jumps during hydration.
:::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `number \| [number, number]` | `0` |
| min | Minimum value | `number` | `0` |
| max | Maximum value | `number` | `100` |
| step | Step size | `number` | `1` |
| size | Slider size | `'large' \| 'default' \| 'small'` | `'default'` |
| show-input | Whether to show an input box (only for non-range mode) | `boolean` | `false` |
| show-input-controls | Whether to show control buttons in the input box | `boolean` | `true` |
| input-size | Size of the input box | `'large' \| 'default' \| 'small'` | `'default'` |
| show-stops | Whether to show discrete points | `boolean` | `false` |
| show-tooltip | Whether to show a tooltip | `boolean` | `true` |
| format-tooltip | Formatter for the tooltip text | `(val: number) => string \| number` | — |
| disabled | Whether to disable the slider | `boolean` | `false` |
| range | Whether to enable range selection | `boolean` | `false` |
| vertical | Whether to enable vertical mode | `boolean` | `false` |
| height | Height in vertical mode | `string` | — |
| label | Screen reader label | `string` | — |
| debounce | Debounce delay for input (ms) | `number` | `300` |
| tooltip-class | Custom class name for the tooltip | `string` | — |
| placement | Tooltip placement | `string` | `'top'` |
| marks | Marks; keys must be numbers within range [min, max] | `object` | — |
| validate-event | Whether to trigger form validation when value changes | `boolean` | `true` |
| range-start-label | Custom aria-label for the start of the range | `string` | — |
| range-end-label | Custom aria-label for the end of the range | `string` | — |
| button-class | Custom class for the slider button | `string` | — |
| color | Custom theme color | `string` | — |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggers when the bound value changes | `(val: number \| [number, number]) => void` |
| change | Triggers when value changes (on mouse release or track click) | `(val: number \| [number, number]) => void` |
| input | Triggers in real-time as data changes | `(val: number \| [number, number]) => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| thumb | Custom slider handle | `{ value: number }` |
| mark | Custom tick text | `{ mark: any }` |
| default | Bottom reserved slot | — |

### Theme Variables

Color variables are integrated with the global theme system and support dark mode:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-slider-main-color` | Main color (bar filling, handle border) | `var(--yh-color-primary)` |
| `--yh-slider-bg-color` | Slider runway background color | `var(--yh-border-color-light)` |
| `--yh-slider-hover-bg-color` | Runway background color on hover | `var(--yh-border-color-dark)` |
| `--yh-slider-button-size` | Handle button size | `16px` |
| `--yh-slider-button-border` | Handle button border width | `2px` |
| `--yh-slider-runway-height` | Runway height (width if vertical) | `6px` |
| `--yh-slider-height` | Overall component height (container) | `32px` |
| `--yh-slider-tooltip-bg` | Tooltip background color | `var(--yh-bg-color-overlay-dark)` |
| `--yh-slider-tooltip-text` | Tooltip text color | `var(--yh-text-color-primary-dark)` |
| `--yh-slider-mark-text-color` | Mark text color | `var(--yh-text-color-secondary)` |

<style scoped>
.yh-demo-wrapper {
  margin-bottom: 24px;
}

.slot-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.custom-thumb {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #409eff, #a855f7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  cursor: grab;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
}
</style>
