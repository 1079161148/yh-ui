# Radio 单选框

<script setup lang="ts">
import { ref } from 'vue'

// Demo 状态
const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
const radioDisabled = ref('1')
const radioBorder = ref('1')
const radioSize = ref('1')
const radioButton1 = ref('New York')
const radioButton2 = ref('New York')
const radioButton3 = ref('New York')
const radioButtonSize = ref('New York')

// TypeScript 代码示例
const tsBasic = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1">选项一</yh-radio>
    <yh-radio value="2">选项二</yh-radio>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-radio-group v-model="radio" disabled>
    <yh-radio value="1">选项一</yh-radio>
    <yh-radio value="2">选项二</yh-radio>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsBorder = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" border>选项一</yh-radio>
    <yh-radio value="2" border>选项二</yh-radio>
    <yh-radio value="3" border disabled>禁用</yh-radio>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsBorder = tsBorder.replace('lang="ts"', '')

const tsSizes = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" size="large" border>大尺寸</yh-radio>
    <yh-radio value="2" border>默认尺寸</yh-radio>
    <yh-radio value="3" size="small" border>小尺寸</yh-radio>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsSingle = `<template>
  <yh-radio v-model="radio" value="1">选项一</yh-radio>
  <yh-radio v-model="radio" value="2">选项二</yh-radio>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsSingle = tsSingle.replace('lang="ts"', '')

const tsGroupSize = `<template>
  <yh-radio-group v-model="radio" size="large">
    <yh-radio value="1" border>选项一</yh-radio>
    <yh-radio value="2" border>选项二</yh-radio>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('1')
<\/script>`

const jsGroupSize = tsGroupSize.replace('lang="ts"', '')

// RadioButton 代码示例
const tsRadioButton = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButton = tsRadioButton.replace('lang="ts"', '')

const tsRadioButtonCustom = `<template>
  <yh-radio-group v-model="radio" fill="#67C23A" text-color="#fff">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButtonCustom = tsRadioButtonCustom.replace('lang="ts"', '')

const tsRadioButtonDisabled = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButtonDisabled = tsRadioButtonDisabled.replace('lang="ts"', '')

const tsRadioButtonSizes = `<template>
  <yh-radio-group v-model="radio" size="large">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
  </yh-radio-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('New York')
<\/script>`

const jsRadioButtonSizes = tsRadioButtonSizes.replace('lang="ts"', '')
</script>

在一组备选项中进行单选。

## 基础用法

单选框组由 `yh-radio-group` 包裹一组 `yh-radio`，绑定 `v-model` 即可实现单选功能。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-radio-group v-model="radio1">
    <yh-radio value="1">选项一</yh-radio>
    <yh-radio value="2">选项二</yh-radio>
  </yh-radio-group>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">当前选中值: {{ radio1 }}</p>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性来控制单选框的禁用状态。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">整组禁用：</p>
      <yh-radio-group v-model="radioDisabled" disabled>
        <yh-radio value="1">选项一</yh-radio>
        <yh-radio value="2">选项二</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">单个禁用：</p>
      <yh-radio-group v-model="radio2">
        <yh-radio value="1">选项一</yh-radio>
        <yh-radio value="2" disabled>选项二（禁用）</yh-radio>
        <yh-radio value="3">选项三</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## 单独使用

Radio 也可以单独使用，不使用 RadioGroup 包裹。

<DemoBlock title="单独使用" :ts-code="tsSingle" :js-code="jsSingle">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-radio v-model="radio3" value="1">选项一</yh-radio>
    <yh-radio v-model="radio3" value="2">选项二</yh-radio>
    <yh-radio v-model="radio3" value="3">选项三</yh-radio>
  </div>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">当前选中值: {{ radio3 }}</p>
</DemoBlock>

## 带边框

使用 `border` 属性可以渲染为带有边框的单选框。

<DemoBlock title="带边框" :ts-code="tsBorder" :js-code="jsBorder">
  <yh-radio-group v-model="radioBorder">
    <yh-radio value="1" border>选项一</yh-radio>
    <yh-radio value="2" border>选项二</yh-radio>
    <yh-radio value="3" border disabled>禁用</yh-radio>
  </yh-radio-group>
</DemoBlock>

## 不同尺寸

使用 `size` 属性来设置单选框的尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-radio v-model="radioSize" value="1" size="large" border>大尺寸</yh-radio>
    <yh-radio v-model="radioSize" value="2" border>默认尺寸</yh-radio>
    <yh-radio v-model="radioSize" value="3" size="small" border>小尺寸</yh-radio>
  </div>
</DemoBlock>

## 组统一尺寸

在 `yh-radio-group` 上设置 `size` 属性可以统一控制组内所有单选框的尺寸。

<DemoBlock title="组统一尺寸" :ts-code="tsGroupSize" :js-code="jsGroupSize">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Large:</p>
      <yh-radio-group v-model="radio1" size="large">
        <yh-radio value="1" border>选项一</yh-radio>
        <yh-radio value="2" border>选项二</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Default:</p>
      <yh-radio-group v-model="radio1">
        <yh-radio value="1" border>选项一</yh-radio>
        <yh-radio value="2" border>选项二</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Small:</p>
      <yh-radio-group v-model="radio1" size="small">
        <yh-radio value="1" border>选项一</yh-radio>
        <yh-radio value="2" border>选项二</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## 按钮样式

使用 `yh-radio-button` 组件可以实现按钮形态的单选框。

<DemoBlock title="按钮样式" :ts-code="tsRadioButton" :js-code="jsRadioButton">
  <yh-radio-group v-model="radioButton1">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

## 按钮样式自定义颜色

通过 `fill` 和 `text-color` 属性可以自定义按钮选中时的填充色和文字颜色。

<DemoBlock title="按钮样式自定义颜色" :ts-code="tsRadioButtonCustom" :js-code="jsRadioButtonCustom">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radioButton2">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButton2" fill="#67C23A" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButton2" fill="#8B5CF6" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

## 按钮样式禁用

<DemoBlock title="按钮样式禁用" :ts-code="tsRadioButtonDisabled" :js-code="jsRadioButtonDisabled">
  <yh-radio-group v-model="radioButton3">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

## 按钮样式不同尺寸

<DemoBlock title="按钮样式不同尺寸" :ts-code="tsRadioButtonSizes" :js-code="jsRadioButtonSizes">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Large:</p>
      <yh-radio-group v-model="radioButtonSize" size="large">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Default:</p>
      <yh-radio-group v-model="radioButtonSize">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">Small:</p>
      <yh-radio-group v-model="radioButtonSize" size="small">
        <yh-radio-button value="New York">New York</yh-radio-button>
        <yh-radio-button value="Washington">Washington</yh-radio-button>
        <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## API

### Radio Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number \| boolean` | — |
| value | 单选框的值 | `string \| number \| boolean` | — |
| label | 显示的文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| border | 是否显示边框 | `boolean` | `false` |
| size | 单选框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| name | 原生 name 属性 | `string` | — |

### Radio Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发 | `(value: string \| number \| boolean) => void` |

### Radio Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

### RadioButton Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number \| boolean` | — |
| value | 单选按钮的值 | `string \| number \| boolean` | — |
| label | 显示的文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 单选按钮尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| name | 原生 name 属性 | `string` | — |

### RadioButton Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发 | `(value: string \| number \| boolean) => void` |

### RadioButton Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

### RadioGroup Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number \| boolean` | — |
| size | 单选框组尺寸 | `'large' \| 'default' \| 'small'` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | — |
| text-color | 按钮激活时的文字颜色 | `string` | `#fff` |
| fill | 按钮激活时的填充色和边框色 | `string` | `var(--yh-color-primary)` |

### RadioGroup Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发 | `(value: string \| number \| boolean) => void` |

### RadioGroup Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

## 主题变量

### Radio 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-radio-font-size` | 字体大小 | `var(--yh-font-size-base)` |
| `--yh-radio-text-color` | 文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-radio-input-size` | 单选框大小 | `14px` |
| `--yh-radio-checked-dot-color` | 选中圆点色 | `var(--yh-color-primary)` |
| `--yh-radio-disabled-bg-color` | 禁用背景色 | `var(--yh-fill-color-light)` |

### RadioButton 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-radio-button-font-size` | 字体大小 | `var(--yh-font-size-base)` |
| `--yh-radio-button-text-color` | 文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-radio-button-checked-bg-color` | 选中背景色 | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-text-color` | 选中文字色 | `var(--yh-fill-color-blank)` |
| `--yh-radio-button-disabled-bg-color` | 禁用背景色 | `var(--yh-fill-color-light)` |
