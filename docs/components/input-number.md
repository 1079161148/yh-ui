# InputNumber 数字输入框

<script setup lang="ts">
import { ref } from 'vue'

// 每个示例使用独立的变量，避免互相影响
const num1 = ref(1)
const num2 = ref(1)
const num3 = ref(5)
const num4 = ref(1)
const num5 = ref(1)
const num6 = ref(1.5)
const num7 = ref(1)
// 前缀后缀示例 - 独立变量
const numPrefix = ref(100)
const numSuffix = ref(50)
const numPrefixSuffix = ref(10)
// 可清空示例 - 独立变量
const numClearable = ref(50)
// 验证示例 - 独立变量
const numValidator = ref(50)

// 验证函数
const validateNum = (value) => {
  if (value === undefined) return true
  if (value < 0) return '不能为负数'
  if (value > 100) return '不能大于100'
  return true
}

// 代码示例
const tsBasic = `<template>
  <yh-input-number v-model="num" :min="1" :max="10" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-input-number v-model="num" disabled />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsStep = `<template>
  <yh-input-number v-model="num" :step="2" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(5)
<\/script>`

const jsStep = tsStep.replace('lang="ts"', '')

const tsPrecision = `<template>
  <yh-input-number v-model="num" :precision="2" :step="0.1" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1.5)
<\/script>`

const jsPrecision = tsPrecision.replace('lang="ts"', '')

const tsControlsPosition = `<template>
  <div style="display: flex; gap: 16px;">
    <yh-input-number v-model="num" />
    <yh-input-number v-model="num" controls-position="right" />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsControlsPosition = tsControlsPosition.replace('lang="ts"', '')


const tsSizes = `<template>
  <yh-input-number v-model="num" size="large" />
  <yh-input-number v-model="num" />
  <yh-input-number v-model="num" size="small" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsPrefixSuffix = `<template>
  <yh-input-number v-model="numPrice" prefix="¥" />
  <yh-input-number v-model="numPercent" suffix="%" />
  <yh-input-number v-model="numUsd" prefix="$" suffix="USD" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const numPrice = ref(100)
const numPercent = ref(50)
const numUsd = ref(10)
<\/script>`

const jsPrefixSuffix = tsPrefixSuffix.replace('lang="ts"', '')

const tsClearable = `<template>
  <yh-input-number v-model="num" clearable />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(50)
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsValidator = `<template>
  <yh-input-number v-model="num" :validator="validateNum" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const num = ref(50)

const validateNum = (value: number | undefined) => {
  if (value === undefined) return true
  if (value < 0) return '不能为负数'
  if (value > 100) return '不能大于100'
  return true
}
<\/script>`

const jsValidator = tsValidator.replace('lang="ts"', '').replace(': number | undefined', '')
</script>

仅允许输入标准的数字值，可定义范围。

## 基础用法

使用 `v-model` 绑定变量，可以使用 `min` 和 `max` 属性限制输入值的范围。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-input-number v-model="num1" :min="1" :max="10" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">当前值: {{ num1 }}</p>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性禁用输入框。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-input-number v-model="num2" disabled />
</DemoBlock>

## 步数

使用 `step` 属性控制步长。

<DemoBlock title="步数" :ts-code="tsStep" :js-code="jsStep">
  <yh-input-number v-model="num3" :step="2" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">步长为 2</p>
</DemoBlock>

## 精度

使用 `precision` 属性控制数值精度。

<DemoBlock title="精度" :ts-code="tsPrecision" :js-code="jsPrecision">
  <yh-input-number v-model="num6" :precision="2" :step="0.1" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">精度为 2 位小数</p>
</DemoBlock>

## 按钮位置

使用 `controls-position` 属性可以将控制按钮放置在右侧。

<DemoBlock title="按钮位置" :ts-code="tsControlsPosition" :js-code="jsControlsPosition">
  <div style="display: flex; gap: 16px;">
    <yh-input-number v-model="num5" />
    <yh-input-number v-model="num5" controls-position="right" />
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性可以控制输入框的尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-input-number v-model="num7" size="large" />
    <yh-input-number v-model="num7" />
    <yh-input-number v-model="num7" size="small" />
  </div>
</DemoBlock>

## 前缀和后缀

使用 `prefix` 和 `suffix` 属性可以添加前缀和后缀文本。

<DemoBlock title="前缀和后缀" :ts-code="tsPrefixSuffix" :js-code="jsPrefixSuffix">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-input-number v-model="numPrefix" prefix="¥" />
    <yh-input-number v-model="numSuffix" suffix="%" />
    <yh-input-number v-model="numPrefixSuffix" prefix="$" suffix="USD" />
  </div>
</DemoBlock>

## 可清空

使用 `clearable` 属性可以启用清空按钮。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-input-number v-model="numClearable" clearable />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">鼠标悬停时显示清空按钮</p>
</DemoBlock>

## 自定义验证

使用 `validator` 属性可以自定义验证规则。

<DemoBlock title="自定义验证" :ts-code="tsValidator" :js-code="jsValidator">
  <yh-input-number v-model="numValidator" :validator="validateNum" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">验证范围: 0 ~ 100</p>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `number` | — |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number` | `1` |
| step-strictly | 是否只能输入步长的倍数 | `boolean` | `false` |
| precision | 数值精度 | `number` | — |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| controls | 是否显示控制按钮 | `boolean` | `true` |
| controls-position | 控制按钮位置 | `'' \| 'right'` | `''` |
| prefix | 前缀文本 | `string` | — |
| suffix | 后缀文本 | `string` | — |
| prefix-icon | 前缀图标 | `Component` | — |
| suffix-icon | 后缀图标 | `Component` | — |
| clearable | 是否可清空 | `boolean` | `false` |
| validator | 自定义验证函数 | `(value: number \| undefined) => boolean \| string` | — |
| placeholder | 输入框占位符 | `string` | — |
| value-on-clear | 清空时的值 | `number \| null \| 'min' \| 'max'` | `null` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值变化时触发 | `(currentValue: number \| undefined, oldValue: number \| undefined) => void` |
| input | 输入时触发 | `(value: number \| undefined) => void` |
| focus | 聚焦时触发 | `(event: FocusEvent) => void` |
| blur | 失焦时触发 | `(event: FocusEvent) => void` |
| clear | 清空时触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 自定义前缀内容 |
| suffix | 自定义后缀内容 |
| decrease-icon | 自定义减少按钮图标 |
| increase-icon | 自定义增加按钮图标 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使输入框获取焦点 | `() => void` |
| blur | 使输入框失去焦点 | `() => void` |
| clear | 清空值 | `() => void` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-input-number-width` | 输入框宽度 | `150px` |
| `--yh-input-number-height` | 输入框高度 | `var(--yh-component-size-default)` |
| `--yh-input-number-font-size` | 字体大小 | `var(--yh-font-size-base)` |
| `--yh-input-number-bg-color` | 背景颜色 | `var(--yh-fill-color-blank)` |
| `--yh-input-number-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-input-number-btn-color` | 按钮颜色 | `var(--yh-text-color-secondary)` |
