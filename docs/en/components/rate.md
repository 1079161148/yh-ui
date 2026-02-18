# Rate

Used for rating things.

<script setup lang="ts">
import { ref } from 'vue'

// Demo states
const val1 = ref(3)
const val2 = ref(4)
const val3 = ref(3)
const valHalf = ref(3.5)
const val4 = ref(3)
const val5 = ref(3.7)
const val6 = ref(3)
const val7 = ref(3.7)
const val8 = ref(3.5)

// Nuxt example
const nuxtRate = ref(4)

// Nuxt demo code
const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <!-- Rate component, auto-imported -->
    <yh-rate v-model="nuxtRate" />
    
    <!-- Combined with Nuxt data display -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 14px; color: var(--yh-text-color-regular);">Average Score:</span>
      <yh-rate :model-value="4.5" disabled show-score />
    </div>
  </div>
</template>

<script setup lang="ts">
// No need to manually import Rate component
const nuxtRate = ref(4)
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// TypeScript examples
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

The rating starts with three levels by default, and color arrays can be used to differentiate scores and emotional tendencies.

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

Use the `size` property to set the size of the rating component.

<DemoBlock title="Different Sizes" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val3" size="large" />
    <yh-rate v-model="val3" size="default" />
    <yh-rate v-model="val3" size="small" />
  </div>
</DemoBlock>

## Allow Half Selection

Set the `allow-half` property to allow half-star selection.

<DemoBlock title="Allow Half Selection" :ts-code="tsHalf" :js-code="jsHalf">
  <yh-rate v-model="valHalf" allow-half />
</DemoBlock>

## Auxiliary Text

Set the `show-text` property to display auxiliary text, or `show-score` to display the score.

<DemoBlock title="Auxiliary Text" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val4" show-text />
    <yh-rate v-model="val5" show-score score-template="{value} pts" />
  </div>
</DemoBlock>

## Clearable

Use the `clearable` property to reset the value to 0 when re-clicking the same value.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-rate v-model="val6" clearable />
</DemoBlock>

## Read-only

Set the `disabled` property to enable read-only mode, commonly used for displaying scores.

<DemoBlock title="Read-only" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-rate v-model="val7" disabled show-score text-color="#ff9900" />
</DemoBlock>

## Custom Icon

Customize the icon via the `icon` slot.

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

The Rate component fully supports Nuxt 3/4 SSR rendering. When used in a Nuxt project, the component is automatically imported.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-rate v-model="nuxtRate" />
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 14px; color: var(--yh-text-color-regular);">Average Score:</span>
      <yh-rate :model-value="4.5" disabled show-score />
    </div>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Star display and half-selection (`allow-half`) are fully supported.
- ✅ Custom text and score display render accurately in SSR.
- ✅ Color configurations (`colors` array) support server-side calculation.
- ✅ Styles remain consistent across different sizes.

::: tip SSR Safety
During server-side rendering, the Rate component generates static star bit maps or SVG paths, ensuring that users can see the full rating status before JavaScript loads.
:::

## API

### Rate Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model / model-value | Binding value | `number` | `0` |
| max | Maximum value | `number` | `5` |
| disabled | Whether it is read-only | `boolean` | `false` |
| allow-half | Whether half-selection is allowed | `boolean` | `false` |
| clearable | Whether to allow resetting by clicking the current value | `boolean` | `false` |
| show-text | Whether to display auxiliary text, overrides score | `boolean` | `false` |
| show-score | Whether to display current score; active only when `show-text` is false | `boolean` | `false` |
| text-color | Auxiliary text color | `string` | `'#1f2d3d'` |
| texts | Array of auxiliary texts | `string[]` | `['Disappointing', 'Poor', 'Fair', 'Good', 'Excellent']` |
| colors | Active rating colors; supports string or array (for <=2, <=4, and 5) | `string \| string[]` | `'#F7BA2A'` |
| void-color | Color for unselected status | `string` | `'#C6D1DE'` |
| disabled-void-color | Unselected color when disabled | `string` | `'#EFF2F7'` |
| size | Size of rating icons | `'large' \| 'default' \| 'small'` | `'default'` |
| score-template | Display template for scores | `string` | `'{value}'` |

### Rate Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when the value changes | `(value: number) => void` |

### Rate Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| icon | Custom icon | `{ index: number, width: string, activeColor: string, voidColor: string }` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-rate-void-color` | Unselected color | `#c6d1de` |
| `--yh-rate-fill-color` | Selected color | `#f7ba2a` |
| `--yh-rate-disabled-void-color` | Unselected color when disabled | `#eff2f7` |
| `--yh-rate-text-color` | Auxiliary text color | `#1f2d3d` |
| `--yh-rate-font-size` | Auxiliary text size | `14px` |
| `--yh-rate-icon-margin` | Icon spacing | `6px` |
