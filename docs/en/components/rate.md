# Rate

Used for rating things.

<script setup lang="ts">
import { ref } from 'vue'

const val1 = ref(3)
const val2 = ref(4)
const val3 = ref(3)
const valHalf = ref(3.5)
const val4 = ref(3)
const val5 = ref(3.7)
const val6 = ref(3)
const val7 = ref(3.7)
const val8 = ref(3.5)
const nuxtRate = ref(4)

const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-rate v-model="nuxtRate" />
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 14px; color: var(--yh-text-color-regular);">Average Score:</span>
      <yh-rate :model-value="4.5" disabled show-score />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const nuxtRate = ref(4)
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const tsBasic = `<template>
  <div class="demo-rate-block">
    <span>Default:</span>
    <yh-rate v-model="value1" />
  </div>
  <div class="demo-rate-block">
    <span>Custom colors:</span>
    <yh-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(3)
const value2 = ref(4)
<\/script>

<style scoped>
.demo-rate-block {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
<\/style>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsSize = `<template>
  <yh-rate v-model="value" size="large" />
  <yh-rate v-model="value" size="default" />
  <yh-rate v-model="value" size="small" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

const tsHalf = `<template>
  <yh-rate v-model="value" allow-half />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3.5)
<\/script>`

const jsHalf = tsHalf.replace('lang="ts"', '')

const tsText = `<template>
  <yh-rate v-model="value1" show-text />
  <yh-rate v-model="value2" show-score score-template="{value} pts" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(3)
const value2 = ref(3.7)
<\/script>`

const jsText = tsText.replace('lang="ts"', '')

const tsClearable = `<template>
  <yh-rate v-model="value" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-rate v-model="value" disabled show-score text-color="#ff9900" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3.7)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsCustom = `<template>
  <yh-rate v-model="value" colors="#f56c6c" allow-half>
    <template #icon="{ width, activeColor }">
      <div class="custom-rate-icon">
         <span class="custom-rate-icon-void">★</span>
         <div class="custom-rate-icon-active" :style="{ width, color: activeColor }">
           <span>★</span>
         </div>
      </div>
    </template>
  </yh-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3.5)
<\/script>

<style scoped>
.custom-rate-icon {
  position: relative;
  width: 1em;
  height: 1em;
  line-height: 1em;
}
.custom-rate-icon-void {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  color: #eee;
}
.custom-rate-icon-active {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  overflow: hidden;
}
.custom-rate-icon-active span {
  display: block;
  width: 1em;
}
<\/style>`

const jsCustom = tsCustom.replace('lang="ts"', '')
</script>

## Basic Usage

The component uses a five-point rating scale by default, and `colors` can be used to customize the active icon color.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; align-items: center;">
      <span style="margin-right: 10px; width: 120px;">Default:</span>
      <yh-rate v-model="val1" />
    </div>
    <div style="display: flex; align-items: center;">
      <span style="margin-right: 10px; width: 120px;">Custom colors:</span>
      <yh-rate v-model="val2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
    </div>
  </div>
</DemoBlock>

## Different Sizes

Use the `size` prop to switch between `large`, `default`, and `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val3" size="large" />
    <yh-rate v-model="val3" size="default" />
    <yh-rate v-model="val3" size="small" />
  </div>
</DemoBlock>

## Allow Half Selection

Set `allow-half` to enable half-step ratings.

<DemoBlock title="Allow Half Selection" :ts-code="tsHalf" :js-code="jsHalf">
  <yh-rate v-model="valHalf" allow-half />
</DemoBlock>

## Auxiliary Text

Use `show-text` to display helper text or `show-score` to render the numeric value.

<DemoBlock title="Auxiliary Text" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val4" show-text />
    <yh-rate v-model="val5" show-score score-template="{value} pts" />
  </div>
</DemoBlock>

## Clearable

Use `clearable` to reset the value to `0` when clicking the current score again.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-rate v-model="val6" clearable />
</DemoBlock>

## Read-only

Set `disabled` to enable read-only display mode.

<DemoBlock title="Read-only" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-rate v-model="val7" disabled show-score text-color="#ff9900" />
</DemoBlock>

## Custom Icon

Use the `icon` slot to replace the built-in rating icon.

<DemoBlock title="Custom Icon" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-rate v-model="val8" colors="#f56c6c" allow-half>
    <template #icon="{ width, activeColor }">
      <div class="demo-custom-icon">
         <span class="demo-custom-icon-void">★</span>
         <div class="demo-custom-icon-active" :style="{ width, color: activeColor }">
           <span>★</span>
         </div>
      </div>
    </template>
  </yh-rate>
</DemoBlock>

<style scoped>
.demo-custom-icon {
  position: relative;
  width: 1em;
  height: 1em;
  line-height: 1em;
}
.demo-custom-icon-void {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  color: #eee;
}
.demo-custom-icon-active {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  overflow: hidden;
}
.demo-custom-icon-active span {
  display: block;
  width: 1em;
}
</style>

## Use in Nuxt

`YhRate` works in Nuxt 3/4 after registering `@yh-ui/nuxt`.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-rate v-model="nuxtRate" />
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 14px; color: var(--yh-text-color-regular);">Average Score:</span>
      <yh-rate :model-value="4.5" disabled show-score />
    </div>
  </div>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Binding value | `number` | `0` |
| `max` | Maximum value | `number` | `5` |
| `disabled` | Whether it is read-only | `boolean` | `false` |
| `allow-half` | Whether half-selection is allowed | `boolean` | `false` |
| `icon` | Custom selected icon | `string \| Component` | `''` |
| `void-icon` | Custom unselected icon | `string \| Component` | `''` |
| `disabled-void-icon` | Custom unselected icon when disabled | `string \| Component` | `''` |
| `colors` | Active rating colors | `string \| string[] \| Record<number, string>` | `'#F7BA2A'` |
| `void-color` | Color for unselected status | `string` | `'#C6D1DE'` |
| `disabled-void-color` | Unselected color when disabled | `string` | `'#EFF2F7'` |
| `show-score` | Whether to display the current score | `boolean` | `false` |
| `show-text` | Whether to display auxiliary text | `boolean` | `false` |
| `text-color` | Auxiliary text color | `string` | `'#1f2d3d'` |
| `texts` | Array of auxiliary texts | `string[]` | `[]` |
| `score-template` | Display template for scores | `string` | `'{value}'` |
| `size` | Size of rating icons | `'large' \| 'default' \| 'small'` | `'default'` |
| `clearable` | Whether clicking the current value resets the rating | `boolean` | `false` |
| `theme-overrides` | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the bound value changes | `(value: number) => void` |
| `change` | Triggered when the value changes | `(value: number) => void` |

### Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| `icon` | Custom icon | `{ index: number, width: string, activeColor: string, voidColor: string }` |

### Expose

This component does not expose public instance methods or properties.

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-rate-void-color` | Unselected color | `#c6d1de` |
| `--yh-rate-fill-color` | Selected color | `#f7ba2a` |
| `--yh-rate-disabled-void-color` | Unselected color when disabled | `#eff2f7` |
| `--yh-rate-text-color` | Auxiliary text color | `#1f2d3d` |
| `--yh-rate-font-size` | Auxiliary text size | `14px` |
| `--yh-rate-icon-margin` | Icon spacing | `6px` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhRateProps` | Component props type |
| `YhRateEmits` | Component emits type |
| `YhRateSlots` | Component slots type |
| `YhRateSize` | Size union type |
| `YhRateInstance` | Component instance type |
