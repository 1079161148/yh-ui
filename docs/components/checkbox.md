# Checkbox 复选框

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Demo 状态
const checked1 = ref(true)
const checked2 = ref(false)
const checkedDisabled1 = ref(false)
const checkedDisabled2 = ref(true)
const customValue = ref('yes')
const indeterminate = ref(true)
const checkAll = ref(false)
const checkedCities = ref(['上海', '北京'])
const cities = ['上海', '北京', '广州', '深圳']
const checkedList = ref(['选项A'])
const disabledChecked = ref(true)
const borderChecked = ref(true)
const borderUnchecked = ref(false)
const sizeChecked = ref(true)

// 确保客户端正确初始化 VitePress 的服务端渲染（SSR）机制可能导致 ref() 的初始值在客户端 hydration 时被意外重置为默认值（false）
onMounted(() => {
  checked1.value = true
  checkedDisabled2.value = true
  borderChecked.value = true
  sizeChecked.value = true
  customValue.value = 'yes'
})

// 全选处理
const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? [...cities] : []
  indeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  indeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

// TypeScript 代码示例
const tsBasic = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checked1">选项一</yh-checkbox>
    <yh-checkbox v-model="checked2">选项二</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checked1 = ref(true)
const checked2 = ref(false)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checkedDisabled1" disabled>未选中禁用</yh-checkbox>
    <yh-checkbox v-model="checkedDisabled2" disabled>选中禁用</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checkedDisabled1 = ref(false)
const checkedDisabled2 = ref(true)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsGroup = `<template>
  <yh-checkbox-group v-model="checkedList">
    <yh-checkbox value="选项A">选项A</yh-checkbox>
    <yh-checkbox value="选项B">选项B</yh-checkbox>
    <yh-checkbox value="选项C">选项C</yh-checkbox>
    <yh-checkbox value="选项D" disabled>禁用</yh-checkbox>
  </yh-checkbox-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checkedList = ref(['选项A'])
<\/script>`

const jsGroup = tsGroup.replace('lang="ts"', '')

const tsIndeterminate = `<template>
  <yh-checkbox
    v-model="checkAll"
    :indeterminate="indeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </yh-checkbox>
  <yh-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <yh-checkbox v-for="city in cities" :key="city" :value="city">
      {{ city }}
    </yh-checkbox>
  </yh-checkbox-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const checkAll = ref(false)
const indeterminate = ref(true)
const checkedCities = ref(['上海', '北京'])
const cities = ['上海', '北京', '广州', '深圳']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? [...cities] : []
  indeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  indeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
<\/script>`

const jsIndeterminate = tsIndeterminate.replace('lang="ts"', '').replace(': boolean', '').replace(': string[]', '')

const tsBorder = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="borderChecked" border>边框模式</yh-checkbox>
    <yh-checkbox v-model="borderUnchecked" border>未选中边框</yh-checkbox>
    <yh-checkbox v-model="borderChecked" border disabled>禁用边框</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const borderChecked = ref(true)
const borderUnchecked = ref(false)
<\/script>`

const jsBorder = tsBorder.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-checkbox v-model="sizeChecked" size="large" border>大尺寸</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" border>默认尺寸</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" size="small" border>小尺寸</yh-checkbox>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const sizeChecked = ref(true)
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsMinMax = `<template>
  <yh-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <yh-checkbox v-for="city in cities" :key="city" :value="city">
      {{ city }}
    </yh-checkbox>
  </yh-checkbox-group>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const checkedCities = ref(['上海'])
const cities = ['上海', '北京', '广州', '深圳']
<\/script>`

const jsMinMax = tsMinMax.replace('lang="ts"', '')

const tsTrueValue = `<template>
  <yh-checkbox
    v-model="customValue"
    true-value="yes"
    false-value="no"
  >
    自定义值 (当前值: {{ customValue }})
  </yh-checkbox>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const customValue = ref('yes')
<\/script>`

const jsTrueValue = tsTrueValue.replace('lang="ts"', '')
</script>

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，使用 `v-model` 绑定一个 `Boolean` 类型的变量。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checked1">选项一</yh-checkbox>
    <yh-checkbox v-model="checked2">选项二</yh-checkbox>
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性来控制复选框的禁用状态。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="checkedDisabled1" disabled>未选中禁用</yh-checkbox>
    <yh-checkbox v-model="checkedDisabled2" disabled>选中禁用</yh-checkbox>
  </div>
</DemoBlock>

## 复选框组

适用于多个勾选框绑定到同一个数组的情景。

<DemoBlock title="复选框组" :ts-code="tsGroup" :js-code="jsGroup">
  <yh-checkbox-group v-model="checkedList">
    <yh-checkbox value="选项A">选项A</yh-checkbox>
    <yh-checkbox value="选项B">选项B</yh-checkbox>
    <yh-checkbox value="选项C">选项C</yh-checkbox>
    <yh-checkbox value="选项D" disabled>禁用</yh-checkbox>
  </yh-checkbox-group>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">选中值: {{ checkedList }}</p>
</DemoBlock>

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

<DemoBlock title="中间状态（全选）" :ts-code="tsIndeterminate" :js-code="jsIndeterminate">
  <div>
    <yh-checkbox
      v-model="checkAll"
      :indeterminate="indeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </yh-checkbox>
    <div style="margin: 16px 0;border-top: 1px solid var(--yh-border-color-light);"></div>
    <yh-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <yh-checkbox v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </yh-checkbox>
    </yh-checkbox-group>
  </div>
</DemoBlock>

## 带边框

使用 `border` 属性可以渲染为带有边框的复选框。

<DemoBlock title="带边框" :ts-code="tsBorder" :js-code="jsBorder">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-checkbox v-model="borderChecked" border>边框模式</yh-checkbox>
    <yh-checkbox v-model="borderUnchecked" border>未选中边框</yh-checkbox>
    <yh-checkbox v-model="borderChecked" border disabled>禁用边框</yh-checkbox>
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性来设置复选框的尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-checkbox v-model="sizeChecked" size="large" border>大尺寸</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" border>默认尺寸</yh-checkbox>
    <yh-checkbox v-model="sizeChecked" size="small" border>小尺寸</yh-checkbox>
  </div>
</DemoBlock>

## 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

<DemoBlock title="可选项目数量的限制" :ts-code="tsMinMax" :js-code="jsMinMax">
  <div>
    <p style="margin-bottom: 12px; color: var(--yh-text-color-secondary);">最少选 1 项，最多选 2 项</p>
    <yh-checkbox-group v-model="checkedCities" :min="1" :max="2">
      <yh-checkbox v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </yh-checkbox>
    </yh-checkbox-group>
  </div>
</DemoBlock>

## 自定义选中值

使用 `true-value` 和 `false-value` 属性可以自定义复选框选中时和未选中时的值。

<DemoBlock title="自定义选中值" :ts-code="tsTrueValue" :js-code="jsTrueValue">
  <yh-checkbox
    v-model="customValue"
    true-value="yes"
    false-value="no"
  >
    自定义值
  </yh-checkbox>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">当前绑定值类型: {{ typeof customValue }}, 值: {{ customValue }}</p>
</DemoBlock>

## API

### Checkbox Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number \| boolean` | — |
| value | 选中时的值（在 checkbox-group 中使用） | `string \| number \| boolean` | — |
| label | 显示的文本（如果没有 default slot） | `string` | — |
| true-value | 选中时的值 | `string \| number \| boolean` | `true` |
| false-value | 未选中时的值 | `string \| number \| boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 设置中间状态，只负责样式控制 | `boolean` | `false` |
| border | 是否显示边框 | `boolean` | `false` |
| size | 复选框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| name | 原生 name 属性 | `string` | — |
| checked | 当前是否选中 | `boolean` | — |
| id | input id | `string` | — |
| tabindex | input tabindex | `string \| number` | — |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发 | `(value: string \| number \| boolean) => void` |

### Checkbox Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

### Checkbox Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 原生 input 元素 | `Ref<HTMLInputElement>` |
| checked | 是否选中 | `boolean` |
| focus | 使 input 获取焦点 | `() => void` |
| blur | 使 input 失去焦点 | `() => void` |

### CheckboxGroup Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `Array<string \| number \| boolean>` | `[]` |
| size | 复选框组尺寸 | `'large' \| 'default' \| 'small'` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| min | 可被勾选的最小数量 | `number` | — |
| max | 可被勾选的最大数量 | `number` | — |
| text-color | 激活时的文字颜色 | `string` | — |
| fill | 激活时的填充色和边框色 | `string` | — |
| tag | 自定义元素标签 | `string \| Component` | `'div'` |

### CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发 | `(value: Array<string \| number \| boolean>) => void` |

### CheckboxGroup Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |

## 主题变量

Checkbox 组件使用以下 CSS 变量，你可以通过覆盖这些变量来自定义样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-checkbox-font-size` | 字体大小 | `var(--yh-font-size-base)` |
| `--yh-checkbox-text-color` | 文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-checkbox-input-size` | 复选框大小 | `14px` |
| `--yh-checkbox-input-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-checkbox-input-bg-color` | 背景颜色 | `var(--yh-fill-color-blank)` |
| `--yh-checkbox-checked-bg-color` | 选中背景色 | `var(--yh-color-primary)` |
| `--yh-checkbox-checked-border-color` | 选中边框色 | `var(--yh-color-primary)` |
| `--yh-checkbox-checked-icon-color` | 选中图标色 | `var(--yh-fill-color-blank)` |
| `--yh-checkbox-disabled-bg-color` | 禁用背景色 | `var(--yh-fill-color-light)` |
| `--yh-checkbox-disabled-text-color` | 禁用文字色 | `var(--yh-text-color-placeholder)` |
