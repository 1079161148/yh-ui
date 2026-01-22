# InputTag 标签输入框

<script setup lang="ts">
import { ref } from 'vue'

const tags1 = ref(['Vue', 'React'])
const tags2 = ref(['标签一', '标签二'])
const tags3 = ref([])
const tags4 = ref(['JavaScript', 'TypeScript'])
const tags5 = ref(['标签一'])
const tags6 = ref(['大标签', '默认标签'])
const tags7 = ref(['success', 'warning'])
const tagsCollapse = ref(['234324', '123213123', '12312312', '12312313', '12313123'])
const tagsDrag = ref(['可拖拽1', '可拖拽2', '可拖拽3', '可拖拽4'])
const tagsSlot = ref(['自定义标签1', '自定义标签2'])

// 代码示例
const tsBasic = `<template>
  <yh-input-tag v-model="tags" placeholder="请输入标签" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Vue', 'React'])
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-input-tag v-model="tags" disabled />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['标签一', '标签二'])
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsMax = `<template>
  <yh-input-tag v-model="tags" :max="5" placeholder="最多输入5个标签" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref([])
<\/script>`

const jsMax = tsMax.replace('lang="ts"', '')

const tsClearable = `<template>
  <yh-input-tag v-model="tags" clearable placeholder="可清空" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['JavaScript', 'TypeScript'])
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsCollapse = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- 基础折叠 -->
    <div>
      <p>use collapse-tags:</p>
      <yh-input-tag v-model="tags" collapse-tags />
    </div>

    <!-- 折叠 + Tooltip -->
    <div>
      <p>use collapse-tags-tooltip:</p>
      <yh-input-tag v-model="tags" collapse-tags collapse-tags-tooltip />
    </div>

    <!-- 最大折叠数量 -->
    <div>
      <p>use max-collapse-tags:</p>
      <yh-input-tag v-model="tags" collapse-tags :max-collapse-tags="3" />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['234324', '123213123', '12312312', '12312313', '12313123'])
<\/script>`

const jsCollapse = tsCollapse.replace('lang="ts"', '')


const tsDraggable = `<template>
  <yh-input-tag v-model="tags" draggable placeholder="可拖拽排序" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['可拖拽1', '可拖拽2', '可拖拽3', '可拖拽4'])
<\/script>`

const jsDraggable = tsDraggable.replace('lang="ts"', '')

const tsPrefixSuffix = `<template>
  <yh-input-tag v-model="tags" prefix="标签:" />
  <yh-input-tag v-model="tags" suffix="个" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Vue', 'React'])
<\/script>`

const jsPrefixSuffix = tsPrefixSuffix.replace('lang="ts"', '')

const tsTagEffect = `<template>
  <yh-input-tag v-model="tags" tag-effect="light" type="primary" />
  <yh-input-tag v-model="tags" tag-effect="dark" type="success" />
  <yh-input-tag v-model="tags" tag-effect="plain" type="warning" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['标签1', '标签2'])
<\/script>`

const jsTagEffect = tsTagEffect.replace('lang="ts"', '')

const tsSlot = `<template>
  <yh-input-tag v-model="tags">
    <template #tag="{ tag, index, close }">
      <span class="custom-tag">
        #{{ index + 1 }} {{ tag }}
        <span @click="close">×</span>
      </span>
    </template>
  </yh-input-tag>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['自定义1', '自定义2'])
<\/script>`

const jsSlot = tsSlot.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags" size="large" placeholder="大尺寸" />
    <yh-input-tag v-model="tags" placeholder="默认尺寸" />
    <yh-input-tag v-model="tags" size="small" placeholder="小尺寸" />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['标签一'])
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')
</script>

用于输入和管理多个标签。

## 基础用法

使用 `v-model` 绑定标签数组。按 `Enter` 或 `,` 键确认输入并添加标签。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-input-tag v-model="tags1" placeholder="请输入标签，按回车确认" style="width: 400px;" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">当前标签: {{ tags1.join(', ') }}</p>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性禁用输入框。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-input-tag v-model="tags2" disabled style="width: 400px;" />
</DemoBlock>

## 限制数量

使用 `max` 属性限制最大标签数量。

<DemoBlock title="限制数量" :ts-code="tsMax" :js-code="jsMax">
  <yh-input-tag v-model="tags3" :max="5" placeholder="最多输入5个标签" style="width: 400px;" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">已输入 {{ tags3.length }} / 5 个标签</p>
</DemoBlock>

## 可清空

使用 `clearable` 属性启用一键清空功能。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-input-tag v-model="tags4" clearable placeholder="可清空所有标签" style="width: 400px;" />
</DemoBlock>

## 折叠标签

使用 `collapse-tags` 属性可以将多个标签折叠显示。配合 `collapse-tags-tooltip` 可以在悬停时显示所有标签。

<DemoBlock title="折叠标签" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">use collapse-tags:</p>
      <yh-input-tag v-model="tagsCollapse" collapse-tags style="width: 400px;" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">use collapse-tags-tooltip:</p>
      <yh-input-tag v-model="tagsCollapse" collapse-tags collapse-tags-tooltip style="width: 400px;" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">use max-collapse-tags:</p>
      <yh-input-tag v-model="tagsCollapse" collapse-tags :max-collapse-tags="3" style="width: 400px;" />
    </div>
  </div>
</DemoBlock>

## 可拖拽排序

使用 `draggable` 属性可以拖拽标签进行排序。

<DemoBlock title="可拖拽排序" :ts-code="tsDraggable" :js-code="jsDraggable">
  <yh-input-tag v-model="tagsDrag" draggable placeholder="可拖拽排序" style="width: 400px;" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">拖拽标签可以改变顺序</p>
</DemoBlock>

## 前缀和后缀

使用 `prefix` 和 `suffix` 属性可以添加前缀和后缀。

<DemoBlock title="前缀和后缀" :ts-code="tsPrefixSuffix" :js-code="jsPrefixSuffix">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags1" prefix="标签:" style="width: 400px;" />
    <yh-input-tag v-model="tags1" suffix="个" style="width: 400px;" />
  </div>
</DemoBlock>

## 标签效果

使用 `tag-effect` 属性可以设置标签的显示效果。

<DemoBlock title="标签效果" :ts-code="tsTagEffect" :js-code="jsTagEffect">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags5" tag-effect="light" type="primary" placeholder="Light 效果" style="width: 400px;" />
    <yh-input-tag v-model="tags5" tag-effect="dark" type="success" placeholder="Dark 效果" style="width: 400px;" />
    <yh-input-tag v-model="tags5" tag-effect="plain" type="warning" placeholder="Plain 效果" style="width: 400px;" />
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性控制输入框尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags5" size="large" placeholder="大尺寸" style="width: 400px;" />
    <yh-input-tag v-model="tags5" placeholder="默认尺寸" style="width: 400px;" />
    <yh-input-tag v-model="tags5" size="small" placeholder="小尺寸" style="width: 400px;" />
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值（标签数组） | `string[]` | `[]` |
| type | 标签类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| max | 最大标签数量 | `number` | — |
| separator | 分隔符 | `string \| string[]` | `[',', 'Enter']` |
| placeholder | 占位符 | `string` | — |
| clearable | 是否可清空 | `boolean` | `false` |
| add-on-blur | 失焦时是否添加输入的内容 | `boolean` | `true` |
| closable | 标签是否可关闭 | `boolean` | `true` |
| validate-tag | 验证函数 | `(value: string) => boolean` | — |
| trim | 是否去除首尾空格 | `boolean` | `true` |
| allow-duplicate | 是否允许重复标签 | `boolean` | `false` |
| **collapse-tags** | 是否折叠标签 | `boolean` | `false` |
| **collapse-tags-tooltip** | 折叠时是否显示 tooltip | `boolean` | `false` |
| **max-collapse-tags** | 最大折叠标签数量 | `number` | `1` |
| **draggable** | 是否可拖拽排序 | `boolean` | `false` |
| **tag-effect** | 标签效果 | `'dark' \| 'light' \| 'plain'` | `'light'` |
| prefix | 前缀文本 | `string` | — |
| suffix | 后缀文本 | `string` | — |
| prefix-icon | 前缀图标 | `Component` | — |
| suffix-icon | 后缀图标 | `Component` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 标签变化时触发 | `(value: string[]) => void` |
| input | 输入时触发 | `(value: string) => void` |
| add | 添加标签时触发 | `(tag: string) => void` |
| remove | 移除标签时触发 | `(tag: string, index: number) => void` |
| focus | 聚焦时触发 | `(event: FocusEvent) => void` |
| blur | 失焦时触发 | `(event: FocusEvent) => void` |
| clear | 清空时触发 | `() => void` |
| **drag-end** | 拖拽结束时触发 | `(tags: string[]) => void` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| prefix | 自定义前缀内容 | — |
| suffix | 自定义后缀内容 | — |
| **tag** | 自定义标签内容 | `{ tag: string, index: number, close: () => void }` |
| **clear-icon** | 自定义清除图标 | — |
| **collapse-tag** | 自定义折叠标签内容 | `{ count: number, tags: string[] }` |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使输入框获取焦点 | `() => void` |
| blur | 使输入框失去焦点 | `() => void` |
| clear | 清空所有标签 | `() => void` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-input-tag-min-height` | 最小高度 | `var(--yh-component-size-default)` |
| `--yh-input-tag-font-size` | 字体大小 | `var(--yh-font-size-base)` |
| `--yh-input-tag-bg-color` | 背景颜色 | `var(--yh-fill-color-blank)` |
| `--yh-input-tag-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-input-tag-tag-height` | 标签高度 | `22px` |
| `--yh-input-tag-gap` | 标签间距 | `4px` |
