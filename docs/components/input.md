# Input 输入框

<script setup lang="ts">
import { ref } from 'vue'

// Demo 状态
const inputBase = ref('')
const inputDisabled = ref('')
const inputClearable = ref('')
const inputPassword = ref('')
const inputIcon1 = ref('')
const inputIcon2 = ref('')
const inputTextarea = ref('')
const inputAutosize1 = ref('')
const inputAutosize2 = ref('')
const inputComposite1 = ref('')
const inputComposite2 = ref('')
const inputComposite3 = ref('')
const inputLength1 = ref('')
const inputLength2 = ref('')
const inputSizeLarge = ref('')
const inputSizeDefault = ref('')
const inputSizeSmall = ref('')
const inputFormatter = ref('')

const formatNumber = (value: string | number) => {
  if (!value) return ''
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parseNumber = (value: string) => {
  return value.replace(/,/g, '')
}

// TypeScript 代码示例
const tsBasic = `<template>
  <yh-input v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`

const jsBasic = `<template>
  <yh-input v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
<\/script>`

const tsDisabled = `<template>
  <yh-input placeholder="禁用状态" disabled />
</template>`

const jsDisabled = tsDisabled

const tsClearable = `<template>
  <yh-input v-model="value" placeholder="可清空" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`

const jsClearable = `<template>
  <yh-input v-model="value" placeholder="可清空" clearable />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
<\/script>`

const tsPassword = `<template>
  <yh-input
    v-model="password"
    type="password"
    placeholder="请输入密码"
    show-password
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const password = ref('')
<\/script>`

const jsPassword = `<template>
  <yh-input
    v-model="password"
    type="password"
    placeholder="请输入密码"
    show-password
  />
</template>

<script setup>
import { ref } from 'vue'
const password = ref('')
<\/script>`

const tsIcon = `<template>
  <yh-input placeholder="请输入搜索内容" prefix-icon="🔍" />
  <yh-input placeholder="请输入日期" suffix-icon="📅" />
</template>`

const jsIcon = tsIcon

const tsTextarea = `<template>
  <yh-input
    v-model="textarea"
    type="textarea"
    placeholder="请输入内容"
    :rows="3"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const textarea = ref('')
<\/script>`

const jsTextarea = `<template>
  <yh-input
    v-model="textarea"
    type="textarea"
    placeholder="请输入内容"
    :rows="3"
  />
</template>

<script setup>
import { ref } from 'vue'
const textarea = ref('')
<\/script>`

const tsAutosize = `<template>
  <yh-input
    v-model="textarea1"
    type="textarea"
    autosize
    placeholder="自动调整高度"
  />
  <yh-input
    v-model="textarea2"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4 }"
    placeholder="限制高度范围"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const textarea1 = ref('')
const textarea2 = ref('')
<\/script>`

const jsAutosize = `<template>
  <yh-input
    v-model="textarea1"
    type="textarea"
    autosize
    placeholder="自动调整高度"
  />
  <yh-input
    v-model="textarea2"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4 }"
    placeholder="限制高度范围"
  />
</template>

<script setup>
import { ref } from 'vue'
const textarea1 = ref('')
const textarea2 = ref('')
<\/script>`

const tsComposite = `<template>
  <yh-input placeholder="请输入域名">
    <template #prepend>https://</template>
  </yh-input>

  <yh-input placeholder="请输入域名">
    <template #append>.com</template>
  </yh-input>

  <yh-input placeholder="请输入域名">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </yh-input>
</template>`

const jsComposite = tsComposite

const tsWordLimit = `<template>
  <yh-input
    v-model="text"
    placeholder="最多输入10个字符"
    :maxlength="10"
    show-word-limit
  />
  <yh-input
    v-model="textarea"
    type="textarea"
    placeholder="最多输入100个字符"
    :maxlength="100"
    show-word-limit
    :rows="3"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
const textarea = ref('')
<\/script>`

const jsWordLimit = `<template>
  <yh-input
    v-model="text"
    placeholder="最多输入10个字符"
    :maxlength="10"
    show-word-limit
  />
  <yh-input
    v-model="textarea"
    type="textarea"
    placeholder="最多输入100个字符"
    :maxlength="100"
    show-word-limit
    :rows="3"
  />
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
const textarea = ref('')
<\/script>`

const tsSizes = `<template>
  <yh-input size="large" placeholder="大型输入框" />
  <yh-input placeholder="默认输入框" />
  <yh-input size="small" placeholder="小型输入框" />
</template>`

const jsSizes = tsSizes

const tsFormatter = `<template>
  <yh-input
    v-model="value"
    placeholder="输入数字"
    :formatter="formatNumber"
    :parser="parseNumber"
  />
  <p>实际值：{{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const formatNumber = (val: string | number) => {
  if (!val) return ''
  return String(val).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')
}

const parseNumber = (val: string) => {
  return val.replace(/,/g, '')
}
<\/script>`

const jsFormatter = `<template>
  <yh-input
    v-model="value"
    placeholder="输入数字"
    :formatter="formatNumber"
    :parser="parseNumber"
  />
  <p>实际值：{{ value }}</p>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

const formatNumber = (val) => {
  if (!val) return ''
  return String(val).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')
}

const parseNumber = (val) => {
  return val.replace(/,/g, '')
}
<\/script>`
</script>

通过鼠标或键盘输入内容，是最基础的表单域包装。

## 基础用法

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 400px;">
    <yh-input v-model="inputBase" placeholder="请输入内容" />
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性指定是否禁用 input 组件。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 400px;">
    <yh-input v-model="inputDisabled" placeholder="禁用状态" disabled />
  </div>
</DemoBlock>

## 可清空

使用 `clearable` 属性可得到一个可清空的输入框。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 400px;">
    <yh-input v-model="inputClearable" placeholder="可清空" clearable />
  </div>
</DemoBlock>

## 密码框

使用 `show-password` 属性可得到一个可切换显示隐藏的密码框。

<DemoBlock title="密码框" :ts-code="tsPassword" :js-code="jsPassword">
  <div style="max-width: 400px;">
    <yh-input v-model="inputPassword" type="password" placeholder="请输入密码" show-password />
  </div>
</DemoBlock>

## 带图标的输入框

通过 `prefix-icon` 和 `suffix-icon` 属性可以在输入框首部和尾部增加显示图标。

<DemoBlock title="带图标" :ts-code="tsIcon" :js-code="jsIcon">
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <yh-input v-model="inputIcon1" placeholder="请输入搜索内容" prefix-icon="🔍" />
    <yh-input v-model="inputIcon2" placeholder="请输入日期" suffix-icon="📅" />
  </div>
</DemoBlock>

## 文本域

用于输入多行文本信息，通过将 `type` 属性设置为 `textarea` 可切换为文本域。

<DemoBlock title="文本域" :ts-code="tsTextarea" :js-code="jsTextarea">
  <div style="max-width: 400px;">
    <yh-input v-model="inputTextarea" type="textarea" placeholder="请输入内容" :rows="3" />
  </div>
</DemoBlock>

## 可自适应文本高度的文本域

通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整。

<DemoBlock title="自动高度" :ts-code="tsAutosize" :js-code="jsAutosize">
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="自动调整高度" />
    <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="限制高度范围" />
  </div>
</DemoBlock>

## 复合型输入框

可以在输入框前后添加一个元素，通常是标签或按钮。

<DemoBlock title="复合输入框" :ts-code="tsComposite" :js-code="jsComposite">
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <yh-input v-model="inputComposite1" placeholder="请输入域名">
      <template #prepend>https://</template>
    </yh-input>
    <yh-input v-model="inputComposite2" placeholder="请输入域名">
      <template #append>.com</template>
    </yh-input>
    <yh-input v-model="inputComposite3" placeholder="请输入域名">
      <template #prepend>https://</template>
      <template #append>.com</template>
    </yh-input>
  </div>
</DemoBlock>

## 输入长度限制

使用 `maxlength` 属性限制最大输入长度。使用 `show-word-limit` 来显示字数统计。

<DemoBlock title="字数限制" :ts-code="tsWordLimit" :js-code="jsWordLimit">
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <yh-input v-model="inputLength1" placeholder="最多输入10个字符" :maxlength="10" show-word-limit />
    <yh-input v-model="inputLength2" type="textarea" placeholder="最多输入100个字符" :maxlength="100" show-word-limit :rows="3" />
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性改变输入框大小。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <yh-input v-model="inputSizeLarge" size="large" placeholder="大型输入框" />
    <yh-input v-model="inputSizeDefault" placeholder="默认输入框" />
    <yh-input v-model="inputSizeSmall" size="small" placeholder="小型输入框" />
  </div>
</DemoBlock>

## 格式化输入

使用 `formatter` 属性格式化显示内容，使用 `parser` 属性解析输入内容更新绑定值。

<DemoBlock title="格式化" :ts-code="tsFormatter" :js-code="jsFormatter">
  <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
    <yh-input v-model="inputFormatter" placeholder="输入数字" :formatter="formatNumber" :parser="parseNumber" />
    <p style="margin: 0; color: #909399; font-size: 12px;">实际值：{{ inputFormatter }}</p>
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number` | — |
| type | 类型 | `'text' \| 'password' \| 'textarea' \| 'number' \| 'email' \| 'url' \| 'tel' \| 'search'` | `'text'` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | 占位文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| show-password | 是否显示切换密码图标 | `boolean` | `false` |
| show-word-limit | 是否显示字数统计 | `boolean` | `false` |
| maxlength | 最大输入长度 | `number \| string` | — |
| minlength | 最小输入长度 | `number \| string` | — |
| prefix-icon | 前置图标 | `string \| Component` | — |
| suffix-icon | 后置图标 | `string \| Component` | — |
| autofocus | 自动获取焦点 | `boolean` | `false` |
| autocomplete | 原生 autocomplete 属性 | `string` | `'off'` |
| name | 原生 name 属性 | `string` | — |
| id | 输入框 id | `string` | — |
| tabindex | 输入框 tabindex | `string \| number` | — |
| rows | 文本域行数 (type="textarea" 时有效) | `number` | `2` |
| resize | 是否允许调整大小 (type="textarea" 时有效) | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | — |
| formatter | 格式化函数（用于显示） | `(value: string \| number) => string` | — |
| parser | 解析函数（用于更新值） | `(value: string) => string` | — |
| clear-icon | 清除图标 | `string \| Component` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 在 Input 值改变时触发 | `(value: string) => void` |
| change | 在失去焦点或按下回车时触发 | `(value: string) => void` |
| focus | 在 Input 获得焦点时触发 | `(event: FocusEvent) => void` |
| blur | 在 Input 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 在点击清除按钮时触发 | `() => void` |
| keydown | 在按下键盘时触发 | `(event: KeyboardEvent) => void` |
| keyup | 在释放键盘时触发 | `(event: KeyboardEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |
| clearIcon | 自定义清除图标 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 输入框 DOM 元素 | `Ref<HTMLInputElement \| HTMLTextAreaElement>` |
| wrapperRef | 包裹元素 | `Ref<HTMLElement>` |
| focus | 使 input 获取焦点 | `() => void` |
| blur | 使 input 失去焦点 | `() => void` |
| select | 选中 input 中的文字 | `() => void` |
| clear | 清空输入框内容 | `() => void` |

## 主题变量

Input 组件使用以下 CSS 变量，你可以通过覆盖这些变量来自定义样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-input-text-color` | 文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-input-bg-color` | 背景颜色 | `var(--yh-fill-color-blank)` |
| `--yh-input-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-input-placeholder-color` | 占位符颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-input-hover-border-color` | 悬停边框色 | `var(--yh-border-color-dark)` |
| `--yh-input-focus-border-color` | 聚焦边框色 | `var(--yh-color-primary)` |
| `--yh-input-disabled-bg-color` | 禁用背景色 | `var(--yh-fill-color-light)` |
| `--yh-input-disabled-border-color` | 禁用边框色 | `var(--yh-border-color-light)` |
| `--yh-input-disabled-text-color` | 禁用文字色 | `var(--yh-text-color-disabled)` |
