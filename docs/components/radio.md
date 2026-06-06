# Radio 单选框

`YhRadio`、`YhRadioGroup` 和 `YhRadioButton` 用于在一组选项中进行单选，支持独立使用、分组使用、`options` 列表渲染、按钮样式以及主题变量覆盖。

<script setup lang="ts">
import { ref } from 'vue'

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
const radioOptions = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三', disabled: true }
]
const radioByOptions = ref('1')
const nuxtRadio = ref('1')
const nuxtTab = ref('New York')

const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-radio-group v-model="nuxtRadio">
      <yh-radio value="1">选项 1</yh-radio>
      <yh-radio value="2">选项 2</yh-radio>
    </yh-radio-group>

    <yh-radio-group v-model="nuxtTab" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nuxtRadio = ref('1')
const nuxtTab = ref('New York')
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const tsBasic = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1">选项一</yh-radio>
    <yh-radio value="2">选项二</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsDisabled = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>整组禁用：</p>
      <yh-radio-group v-model="radio" disabled>
        <yh-radio value="1">选项一</yh-radio>
        <yh-radio value="2">选项二</yh-radio>
      </yh-radio-group>
    </div>
    <div>
      <p>单项禁用：</p>
      <yh-radio-group v-model="radio">
        <yh-radio value="1">选项一</yh-radio>
        <yh-radio value="2" disabled>选项二</yh-radio>
        <yh-radio value="3">选项三</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsBorder = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" border>选项一</yh-radio>
    <yh-radio value="2" border>选项二</yh-radio>
    <yh-radio value="3" border disabled>禁用</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsSizes = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio value="1" size="large" border>大尺寸</yh-radio>
    <yh-radio value="2" border>默认尺寸</yh-radio>
    <yh-radio value="3" size="small" border>小尺寸</yh-radio>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsSingle = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-radio v-model="radio" value="1">选项一</yh-radio>
    <yh-radio v-model="radio" value="2">选项二</yh-radio>
    <yh-radio v-model="radio" value="3">选项三</yh-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsGroupSize = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio" size="large">
      <yh-radio value="1" border>大尺寸</yh-radio>
      <yh-radio value="2" border>大尺寸</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio">
      <yh-radio value="1" border>默认尺寸</yh-radio>
      <yh-radio value="2" border>默认尺寸</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio" size="small">
      <yh-radio value="1" border>小尺寸</yh-radio>
      <yh-radio value="2" border>小尺寸</yh-radio>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
<\/script>`

const tsOptions = `<template>
  <yh-radio-group v-model="radio" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
const options = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三', disabled: true }
]
<\/script>`

const tsRadioButton = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const tsRadioButtonCustom = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio" fill="#67C23A" text-color="#fff">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
      <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
      <yh-radio-button value="Chicago">Chicago</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const tsRadioButtonDisabled = `<template>
  <yh-radio-group v-model="radio">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const tsRadioButtonSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio" size="large">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radio" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('New York')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')
const jsDisabled = tsDisabled.replace('lang="ts"', '')
const jsBorder = tsBorder.replace('lang="ts"', '')
const jsSizes = tsSizes.replace('lang="ts"', '')
const jsSingle = tsSingle.replace('lang="ts"', '')
const jsGroupSize = tsGroupSize.replace('lang="ts"', '')
const jsOptions = tsOptions.replace('lang="ts"', '')
const jsRadioButton = tsRadioButton.replace('lang="ts"', '')
const jsRadioButtonCustom = tsRadioButtonCustom.replace('lang="ts"', '')
const jsRadioButtonDisabled = tsRadioButtonDisabled.replace('lang="ts"', '')
const jsRadioButtonSizes = tsRadioButtonSizes.replace('lang="ts"', '')
</script>

在一组选项中选择唯一值。

## 基础用法

标准单选场景下使用 `YhRadioGroup` 包裹多个 `YhRadio`。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-radio-group v-model="radio1">
    <yh-radio value="1">选项一</yh-radio>
    <yh-radio value="2">选项二</yh-radio>
  </yh-radio-group>
</DemoBlock>

## 禁用状态

既可以禁用整组，也可以禁用某一项。

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
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">单项禁用：</p>
      <yh-radio-group v-model="radio2">
        <yh-radio value="1">选项一</yh-radio>
        <yh-radio value="2" disabled>选项二</yh-radio>
        <yh-radio value="3">选项三</yh-radio>
      </yh-radio-group>
    </div>
  </div>
</DemoBlock>

## 独立使用

`YhRadio` 也可以脱离分组独立使用，直接绑定 `v-model`。

<DemoBlock title="独立使用" :ts-code="tsSingle" :js-code="jsSingle">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-radio v-model="radio3" value="1">选项一</yh-radio>
    <yh-radio v-model="radio3" value="2">选项二</yh-radio>
    <yh-radio v-model="radio3" value="3">选项三</yh-radio>
  </div>
</DemoBlock>

## 边框样式

设置 `border` 后会渲染带边框的单选框样式。

<DemoBlock title="边框样式" :ts-code="tsBorder" :js-code="jsBorder">
  <yh-radio-group v-model="radioBorder">
    <yh-radio value="1" border>选项一</yh-radio>
    <yh-radio value="2" border>选项二</yh-radio>
    <yh-radio value="3" border disabled>禁用</yh-radio>
  </yh-radio-group>
</DemoBlock>

## 不同尺寸

`size` 同时支持单项设置和分组继承。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <yh-radio v-model="radioSize" value="1" size="large" border>大尺寸</yh-radio>
    <yh-radio v-model="radioSize" value="2" border>默认尺寸</yh-radio>
    <yh-radio v-model="radioSize" value="3" size="small" border>小尺寸</yh-radio>
  </div>
</DemoBlock>

<DemoBlock title="分组继承尺寸" :ts-code="tsGroupSize" :js-code="jsGroupSize">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radio1" size="large">
      <yh-radio value="1" border>大尺寸</yh-radio>
      <yh-radio value="2" border>大尺寸</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio1">
      <yh-radio value="1" border>默认尺寸</yh-radio>
      <yh-radio value="2" border>默认尺寸</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="radio1" size="small">
      <yh-radio value="1" border>小尺寸</yh-radio>
      <yh-radio value="2" border>小尺寸</yh-radio>
    </yh-radio-group>
  </div>
</DemoBlock>

## 使用 options 渲染

当不需要自定义插槽内容时，可以直接通过 `options` 让 `YhRadioGroup` 渲染选项。

<DemoBlock title="使用 options 渲染" :ts-code="tsOptions" :js-code="jsOptions">
  <yh-radio-group v-model="radioByOptions" :options="radioOptions" />
</DemoBlock>

## 按钮样式

使用 `YhRadioButton` 可以渲染分段按钮式单选。

<DemoBlock title="按钮样式" :ts-code="tsRadioButton" :js-code="jsRadioButton">
  <yh-radio-group v-model="radioButton1">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington">Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

## 按钮颜色

按钮样式下，`fill` 和 `text-color` 会控制选中态的背景色与文字色。

<DemoBlock title="按钮颜色" :ts-code="tsRadioButtonCustom" :js-code="jsRadioButtonCustom">
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
  </div>
</DemoBlock>

## 按钮禁用与尺寸

<DemoBlock title="按钮禁用" :ts-code="tsRadioButtonDisabled" :js-code="jsRadioButtonDisabled">
  <yh-radio-group v-model="radioButton3">
    <yh-radio-button value="New York">New York</yh-radio-button>
    <yh-radio-button value="Washington" disabled>Washington</yh-radio-button>
    <yh-radio-button value="Los Angeles">Los Angeles</yh-radio-button>
    <yh-radio-button value="Chicago">Chicago</yh-radio-button>
  </yh-radio-group>
</DemoBlock>

<DemoBlock title="按钮尺寸" :ts-code="tsRadioButtonSizes" :js-code="jsRadioButtonSizes">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-radio-group v-model="radioButtonSize" size="large">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButtonSize">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
    <yh-radio-group v-model="radioButtonSize" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

安装 `@yh-ui/nuxt` 后，可以在 Nuxt 3/4 中直接使用 `YhRadio`、`YhRadioGroup` 和 `YhRadioButton`。选中态在 SSR 下可以正常输出，并在激活后继续保持同步。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-radio-group v-model="nuxtRadio">
      <yh-radio value="1">选项 1</yh-radio>
      <yh-radio value="2">选项 2</yh-radio>
    </yh-radio-group>
    <yh-radio-group v-model="nuxtTab" size="small">
      <yh-radio-button value="New York">New York</yh-radio-button>
      <yh-radio-button value="Washington">Washington</yh-radio-button>
    </yh-radio-group>
  </div>
</DemoBlock>

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 独立模式下的绑定值 | `YhRadioValueType` | `undefined` |
| `value` | 当前单选项的值。实际变更时会直接发出 `value`；如果省略它，虽然选中判断会回退到 `label`，但变更事件仍可能发出 `undefined`。 | `YhRadioValueType` | `undefined` |
| `name` | 原生 `name` 属性 | `string` | `undefined` |
| `label` | 未使用默认插槽时的回退文本 | `string` | `undefined` |
| `size` | 单选框尺寸 | `'large' \| 'default' \| 'small'` | `undefined` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `border` | 是否显示边框样式 | `boolean` | `false` |
| `id` | 原生 `id` 属性 | `string` | `undefined` |
| `tabindex` | 原生 `tabindex` 属性 | `string \| number` | `undefined` |
| `theme-overrides` | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### Radio Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 独立模式下绑定值变化时触发 | `(value: YhRadioValueType) => void` |
| `change` | 独立模式下绑定值变化时触发 | `(value: YhRadioValueType) => void` |

### Radio Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 单选框标签内容 | - |

### Radio Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `ref` | 原生 radio 输入框引用 | `HTMLInputElement \| undefined` |
| `focus` | 聚焦输入框 | `() => void` |
| `blur` | 让输入框失焦 | `() => void` |

### RadioButton Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 独立模式下的绑定值 | `YhRadioValueType` | `undefined` |
| `value` | 当前按钮项的值；未传时选中判断和变更值都会回退到 `label`。 | `YhRadioValueType` | `undefined` |
| `name` | 原生 `name` 属性 | `string` | `undefined` |
| `label` | 未使用默认插槽时的回退文本 | `string` | `undefined` |
| `size` | 按钮尺寸 | `'large' \| 'default' \| 'small'` | `undefined` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `id` | 原生 `id` 属性 | `string` | `undefined` |
| `tabindex` | 原生 `tabindex` 属性 | `string \| number` | `undefined` |
| `theme-overrides` | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### RadioButton Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 独立模式下绑定值变化时触发 | `(value: YhRadioValueType) => void` |
| `change` | 独立模式下绑定值变化时触发 | `(value: YhRadioValueType) => void` |

### RadioButton Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 按钮标签内容 | - |

### RadioButton Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `ref` | 原生 radio 输入框引用 | `HTMLInputElement \| undefined` |
| `focus` | 聚焦输入框 | `() => void` |
| `blur` | 让输入框失焦 | `() => void` |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 绑定值 | `YhRadioValueType` | `undefined` |
| `options` | 通过配置直接渲染的选项列表 | `YhRadioGroupOption[]` | `undefined` |
| `size` | 分组尺寸，会传递给子项 | `'large' \| 'default' \| 'small'` | `undefined` |
| `disabled` | 是否禁用整个分组 | `boolean` | `false` |
| `name` | 传递给子项的原生 `name` 属性 | `string` | `undefined` |
| `validate-event` | 分组值变化时是否触发表单校验 | `boolean` | `true` |
| `text-color` | 按钮样式下的选中文字颜色 | `string` | `undefined` |
| `fill` | 按钮样式下的选中背景色和边框色 | `string` | `undefined` |
| `tag` | 外层包装标签或组件 | `string \| Component` | `'div'` |
| `theme-overrides` | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### RadioGroup Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 分组值变化时触发 | `(value: YhRadioValueType) => void` |
| `change` | 分组值变化时触发 | `(value: YhRadioValueType) => void` |

### RadioGroup Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义分组内容 | - |

当默认插槽为空且传入了 `options` 时，组件会按 `options` 自动渲染 `YhRadio` 项。

### RadioGroup Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 类型 | 说明 |
| --- | --- |
| `YhRadioProps` | Radio Props 类型 |
| `YhRadioEmits` | Radio Emits 类型 |
| `YhRadioSlots` | Radio Slots 类型 |
| `YhRadioExpose` | Radio Expose 类型 |
| `YhRadioGroupProps` | RadioGroup Props 类型 |
| `YhRadioGroupEmits` | RadioGroup Emits 类型 |
| `YhRadioGroupOption` | RadioGroup 选项项类型 |
| `YhRadioButtonProps` | RadioButton Props 类型 |
| `YhRadioButtonEmits` | RadioButton Emits 类型 |
| `YhRadioButtonExpose` | RadioButton Expose 类型 |
| `YhRadioValueType` | 共享值类型 |
| `YhRadioInstance` | Radio 实例类型 |
| `YhRadioGroupInstance` | RadioGroup 实例类型 |
| `YhRadioButtonInstance` | RadioButton 实例类型 |

### 主题变量

`YhRadio`、`YhRadioGroup` 和 `YhRadioButton` 支持 `themeOverrides`。其中 `YhRadioGroup.themeOverrides` 会通过注入被子级单选框继承。

Radio 相关专属 CSS 变量：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-radio-size` | 单选控件尺寸 | `14px` |
| `--yh-radio-input-border` | 单选边框颜色 | `var(--yh-border-color)` |
| `--yh-radio-checked-bg-color` | 选中背景色 | `var(--yh-color-primary)` |
| `--yh-radio-checked-border-color` | 选中边框色 | `var(--yh-color-primary)` |
| `--yh-radio-checked-icon-color` | 选中图标颜色令牌 | `var(--yh-color-primary)` |
| `--yh-radio-text-color` | 标签文本颜色 | `var(--yh-text-color-regular)` |

RadioButton 相关专属 CSS 变量：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-radio-button-font-size` | 按钮字体大小 | `var(--yh-font-size-base)` |
| `--yh-radio-button-text-color` | 按钮文本颜色 | `var(--yh-text-color-regular)` |
| `--yh-radio-button-bg-color` | 按钮背景色 | `var(--yh-fill-color-blank)` |
| `--yh-radio-button-border-color` | 按钮边框色 | `var(--yh-border-color)` |
| `--yh-radio-button-hover-text-color` | 悬停文字颜色 | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-bg-color` | 选中背景色 | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-border-color` | 选中边框色 | `var(--yh-color-primary)` |
| `--yh-radio-button-checked-text-color` | 选中文字颜色 | `#ffffff` |
| `--yh-radio-button-disabled-bg-color` | 禁用背景色 | `var(--yh-fill-color-light)` |
| `--yh-radio-button-disabled-border-color` | 禁用边框色 | `var(--yh-border-color-light)` |
| `--yh-radio-button-disabled-text-color` | 禁用文字颜色 | `var(--yh-text-color-placeholder)` |
