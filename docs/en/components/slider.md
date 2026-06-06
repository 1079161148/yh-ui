# Slider

Allows selecting a value within a fixed range by dragging one or two handles.

<script setup lang="ts">
import { ref } from 'vue'

const val1 = ref(0)
const val2 = ref(50)
const val5 = ref(42)
const val8 = ref(15)
const valV1 = ref(30)
const valV2 = ref([20, 50])
const valM = ref(37)
const valS = ref(45)
const nuxtSlider1 = ref(30)
const nuxtSlider2 = ref([20, 50])

const marks = ref({
  0: '0 C',
  37: '37 C',
  50: { label: '50%' },
  100: '100 C'
})

const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px 0;">
    <yh-slider v-model="nuxtSlider1" />
    <yh-slider v-model="nuxtSlider2" range />
  </div>
</template>

<script setup lang="ts">
const nuxtSlider1 = ref(30)
const nuxtSlider2 = ref([20, 50])
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

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
  0: '0 C',
  37: '37 C',
  50: { label: '50%' },
  100: '100 C'
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

The most common single-value slider usage.

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

Set `show-input` to display an input box for precise numeric editing. This mode is available in non-range mode only.

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

Set `vertical` to `true` to enable vertical mode. In vertical mode, `height` should also be provided.

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

Use `marks` to render labeled positions across the slider track.

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

Use the `thumb` slot to customize the handle. The component also supports a `mark` slot for custom mark content.

<DemoBlock title="Custom Slots" :ts-code="tsSlot" :js-code="jsSlot">
  <div class="yh-demo-wrapper">
    <p class="slot-desc">
      Slots let you customize the slider thumb and marks without changing the core interaction behavior.
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

## Use in Nuxt

`YhSlider` supports Nuxt SSR. Initial values, marks, and layout render on the server, while dragging and tooltip interaction continue on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px 0;">
    <yh-slider v-model="nuxtSlider1" />
    <yh-slider v-model="nuxtSlider2" range />
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Bound value | `number \| [number, number]` | `0` |
| min | Minimum value | `number` | `0` |
| max | Maximum value | `number` | `100` |
| step | Step size | `number` | `1` |
| show-input | Whether to show an input box in non-range mode | `boolean` | `false` |
| show-input-controls | Whether the input box shows control buttons | `boolean` | `true` |
| size | Slider size | `'' \| 'large' \| 'default' \| 'small'` | `''` |
| input-size | Input box size | `'' \| 'large' \| 'default' \| 'small'` | `''` |
| show-stops | Whether discrete stops are shown | `boolean` | `false` |
| show-tooltip | Whether the tooltip is shown while interacting | `boolean` | `true` |
| format-tooltip | Tooltip formatter | `(val: number) => string \| number` | `undefined` |
| disabled | Whether the slider is disabled | `boolean` | `false` |
| range | Whether range selection is enabled | `boolean` | `false` |
| vertical | Whether vertical mode is enabled | `boolean` | `false` |
| height | Height used in vertical mode | `string` | `''` |
| label | Screen reader label | `string` | `undefined` |
| debounce | Debounce delay for input changes in milliseconds | `number` | `300` |
| tooltip-class | Custom tooltip class name | `string` | `undefined` |
| placement | Tooltip placement | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` |
| marks | Mark definitions keyed by numeric values within `[min, max]` | `Record<number, string \| { style?: CSSProperties; label: string }>` | `undefined` |
| validate-event | Whether form validation is triggered when the value changes | `boolean` | `true` |
| range-start-label | Custom aria-label for the start handle in range mode | `string` | `undefined` |
| range-end-label | Custom aria-label for the end handle in range mode | `string` | `undefined` |
| button-class | Custom class name applied to slider buttons | `string` | `undefined` |
| color | Custom main color for the active track and handles | `string` | `undefined` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggered when the bound value changes | `(val: number \| [number, number]) => void` |
| change | Triggered when the final value is committed | `(val: number \| [number, number]) => void` |
| input | Triggered continuously while the value changes | `(val: number \| [number, number]) => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| thumb | Custom slider thumb | `{ value: number }` |
| mark | Custom mark content | `{ mark: string }` |
| default | Reserved bottom slot content | `-` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| sliderRef | Root slider element ref | `Ref<HTMLElement \| undefined>` |
| firstValue | Current primary handle value | `Ref<number>` |
| secondValue | Current secondary handle value in range mode | `Ref<number>` |

## Theme Variables

`YhSlider` supports `themeOverrides`. The component stylesheet directly consumes the following slider-specific CSS variables, and the `color` prop also writes the main active color variables at runtime.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-slider-main-color` | Main active color | `var(--yh-color-primary)` |
| `--yh-slider-main-color-rgb` | RGB value of the main active color | `64, 158, 255` |
| `--yh-slider-secondary-color` | Secondary active color for gradients and range bars | `var(--yh-color-primary)` |
| `--yh-slider-bg-color` | Runway background color | `var(--yh-border-color-light)` |
| `--yh-slider-hover-bg-color` | Runway hover background color | `var(--yh-border-color-dark)` |
| `--yh-slider-button-size` | Thumb size | `16px` |
| `--yh-slider-button-border` | Thumb border width | `2px` |
| `--yh-slider-runway-height` | Runway thickness | `6px` |
| `--yh-slider-transition` | Transition token | `var(--yh-transition-base)` |
| `--yh-slider-height` | Component height | `32px` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhSliderProps` | Component props type |
| `YhSliderEmits` | Component emits type |
| `YhSliderSlots` | Component slots type |
| `YhSliderExpose` | Component expose type |
| `YhSliderInstance` | Component instance type |

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
