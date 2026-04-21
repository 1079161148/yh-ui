# Autocomplete 自动补全输入框

`YhAutocomplete` 会根据当前输入值提供候选建议，适用于搜索框、地址补全、快捷命令检索等场景。

<script setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const value1 = ref('')
const suggestions1: YhAutocompleteSuggestion[] = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]
const querySearch1 = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? suggestions1.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : suggestions1
  cb(results)
}

const value2 = ref('')
const restaurants2: YhAutocompleteSuggestion[] = [
  { value: '三全鲜食', address: '长宁区新渔路 144 号' },
  { value: '海底捞火锅', address: '普陀区真北路 988 号' },
  { value: '肯德基', address: '徐汇区虹桥路 1 号' },
  { value: '麦当劳', address: '浦东新区陆家嘴环路 1000 号' }
]
const querySearch2 = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? restaurants2.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : restaurants2
  cb(results)
}
const handleSelect2 = (item: YhAutocompleteSuggestion) => {
  console.log('选中项：', item)
}

const value3 = ref('')
const remoteSearch3 = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  if (!queryString) {
    cb([])
    return
  }
  setTimeout(() => {
    const results = suggestions1.filter((item) =>
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}

const value4 = ref('')
const value5 = ref('YH-UI')
const large6 = ref('Vue.js')
const default6 = ref('Svelte')
const small6 = ref('Solid')

const value7 = ref('')
const querySearch7 = (
  _queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  setTimeout(() => cb([]), 1000)
}

const nuxtValue = ref('')
const nuxtSuggestions = (_q: string, cb: (suggestions: YhAutocompleteSuggestion[]) => void) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}

const tsBasic = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const suggestions: YhAutocompleteSuggestion[] = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]

const querySearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? suggestions.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : suggestions
  cb(results)
}
</${_S}>`

const tsCustom = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="请输入餐厅名称"
    @select="handleSelect"
  >
    <${_T} #default="{ item }">
      <div class="custom-item">
        <span class="name">{{ item.value }}</span>
        <span class="addr">{{ item.address }}</span>
      </div>
    </${_T}>
  </yh-autocomplete>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const restaurants: YhAutocompleteSuggestion[] = [
  { value: '三全鲜食', address: '长宁区新渔路 144 号' },
  { value: '海底捞火锅', address: '普陀区真北路 988 号' },
  { value: '肯德基', address: '徐汇区虹桥路 1 号' },
  { value: '麦当劳', address: '浦东新区陆家嘴环路 1000 号' }
]

const querySearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? restaurants.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : restaurants
  cb(results)
}

const handleSelect = (item: YhAutocompleteSuggestion) => {
  console.log('选中项：', item)
}
</${_S}>

<${_St} scoped>
.custom-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  font-size: 14px;
}
.addr {
  font-size: 12px;
  color: #999;
}
</${_St}>`

const tsRemote = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="remoteSearch"
    placeholder="远程搜索"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')

const remoteSearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  if (!queryString) {
    cb([])
    return
  }
  setTimeout(() => {
    const suggestions: YhAutocompleteSuggestion[] = [
      { value: 'Vue.js' },
      { value: 'React' },
      { value: 'Angular' },
      { value: 'Svelte' },
      { value: 'Solid' }
    ]
    const results = suggestions.filter((item) =>
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}
</${_S}>`

const tsDisabled = `<${_T}>
  <yh-autocomplete v-model="value" disabled placeholder="禁用状态" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</${_S}>`

const tsClearable = `<${_T}>
  <yh-autocomplete v-model="value" clearable placeholder="可清空" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('YH-UI')
</${_S}>`

const tsSizes = `<${_T}>
  <div class="flex-column gap-4">
    <yh-autocomplete
      v-model="large"
      :fetch-suggestions="querySearch"
      size="large"
      placeholder="大尺寸"
    />
    <yh-autocomplete
      v-model="defaultValue"
      :fetch-suggestions="querySearch"
      placeholder="默认尺寸"
    />
    <yh-autocomplete
      v-model="small"
      :fetch-suggestions="querySearch"
      size="small"
      placeholder="小尺寸"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const large = ref('Vue.js')
const defaultValue = ref('Svelte')
const small = ref('Solid')

const querySearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const suggestions: YhAutocompleteSuggestion[] = [
    { value: 'Vue.js' },
    { value: 'React' },
    { value: 'Angular' },
    { value: 'Svelte' },
    { value: 'Solid' }
  ]
  const results = queryString
    ? suggestions.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : suggestions
  cb(results)
}
</${_S}>`

const tsSlots = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="试试输入无匹配关键词"
  >
    <${_T} #loading>
      <div class="custom-loading">正在加载...</div>
    </${_T}>
    <${_T} #empty>
      <div class="custom-empty">没有匹配结果</div>
    </${_T}>
  </yh-autocomplete>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const querySearch = (
  _queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  setTimeout(() => cb([]), 1000)
}
</${_S}>

<${_St} scoped>
.custom-loading, .custom-empty {
  padding: 10px;
  text-align: center;
}
.custom-loading { color: var(--yh-color-primary); }
.custom-empty { color: var(--yh-color-danger); }
</${_St}>`

const tsNuxt = `<${_T}>
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value"
      :fetch-suggestions="suggestions"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const suggestions = (_q: string, cb: (suggestions: YhAutocompleteSuggestion[]) => void) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsCustom = toJs(tsCustom)
const jsRemote = toJs(tsRemote)
const jsDisabled = toJs(tsDisabled)
const jsClearable = toJs(tsClearable)
const jsSizes = toJs(tsSizes)
const jsSlots = toJs(tsSlots)
const jsNuxt = toJs(tsNuxt)
</script>

## 基础用法

通过 `fetch-suggestions` 提供候选列表获取逻辑。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value1"
      :fetch-suggestions="querySearch1"
      placeholder="请输入内容"
    />
  </div>
  <template #description>
    当前绑定值：<code>{{ value1 }}</code>
  </template>
</DemoBlock>

## 自定义建议项模板

默认插槽可自定义每一条候选项的展示内容。

<DemoBlock title="自定义建议项模板" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value2"
      :fetch-suggestions="querySearch2"
      placeholder="请输入餐厅名称"
      @select="handleSelect2"
    >
      <template #default="{ item }">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>{{ item.value }}</span>
          <span style="color: #999; font-size: 12px;">{{ item.address }}</span>
        </div>
      </template>
    </yh-autocomplete>
  </div>
</DemoBlock>

## 远程搜索

可以在 `fetch-suggestions` 中发起异步请求，并在回调执行后刷新下拉建议列表。

<DemoBlock title="远程搜索" :ts-code="tsRemote" :js-code="jsRemote">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value3"
      :fetch-suggestions="remoteSearch3"
      placeholder="远程搜索"
    />
  </div>
</DemoBlock>

## 禁用状态

设置 `disabled` 后，输入框与候选面板都不会响应交互。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value4" disabled placeholder="禁用状态" />
  </div>
</DemoBlock>

## 可清空

开启 `clearable` 后，在输入框存在值且悬停或聚焦时会出现清空按钮。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value5" clearable placeholder="可清空" />
  </div>
</DemoBlock>

## 不同尺寸

支持 `large`、默认和 `small` 三种尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 300px; display: flex; flex-direction: column; gap: 16px;">
    <yh-autocomplete
      v-model="large6"
      :fetch-suggestions="querySearch1"
      size="large"
      placeholder="大尺寸"
    />
    <yh-autocomplete
      v-model="default6"
      :fetch-suggestions="querySearch1"
      placeholder="默认尺寸"
    />
    <yh-autocomplete
      v-model="small6"
      :fetch-suggestions="querySearch1"
      size="small"
      placeholder="小尺寸"
    />
  </div>
</DemoBlock>

## 加载态与空态插槽

通过 `loading` 和 `empty` 插槽可自定义下拉面板的非数据态展示。

<DemoBlock title="加载态与空态插槽" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value7"
      :fetch-suggestions="querySearch7"
      placeholder="试试输入无匹配关键词"
    >
      <template #loading>
        <div style="padding: 10px; color: var(--yh-color-primary); text-align: center;">
          正在加载...
        </div>
      </template>
      <template #empty>
        <div style="padding: 10px; color: var(--yh-color-danger); text-align: center;">
          没有匹配结果
        </div>
      </template>
    </yh-autocomplete>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

接入 `@yh-ui/nuxt` 后，可直接在页面中使用 `YhAutocomplete`。输入框本体可以参与 SSR 渲染，下拉候选面板会在客户端交互时再挂载；如果开启 `teleported`，下拉层会被插入到 `body`。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="nuxtValue"
      :fetch-suggestions="nuxtSuggestions"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value / v-model` | 当前输入值 | `string` | `undefined` |
| `placeholder` | 占位文案 | `string` | `undefined` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否允许清空 | `boolean` | `false` |
| `size` | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `undefined` |
| `fetch-suggestions` | 候选建议获取函数 | `(query: string, callback: (suggestions: AutocompleteSuggestion[]) => void) => void` | `undefined` |
| `trigger-on-focus` | 聚焦时是否立即触发建议获取 | `boolean` | `true` |
| `debounce` | 建议请求防抖时长，单位毫秒 | `number` | `300` |
| `placement` | 下拉面板位置 | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` |
| `value-key` | 建议对象中作为显示值的字段名 | `string` | `'value'` |
| `popper-class` | 下拉面板自定义类名 | `string` | `undefined` |
| `teleported` | 是否将下拉面板挂载到 `body` | `boolean` | `true` |
| `fit-input-width` | 下拉面板宽度是否跟随输入框 | `boolean` | `true` |
| `highlight-first-item` | 是否默认高亮第一项 | `boolean` | `false` |
| `prefix-icon` | 前缀图标组件或图标名 | `string \| Component` | `undefined` |
| `suffix-icon` | 后缀图标组件或图标名 | `string \| Component` | `undefined` |
| `validate-event` | 是否触发表单校验 | `boolean` | `true` |
| `autofocus` | 是否自动聚焦 | `boolean` | `false` |
| `name` | 原生 `name` 属性 | `string` | `undefined` |
| `autocomplete` | 原生 `autocomplete` 属性 | `string` | `'off'` |
| `theme-overrides` | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值变化时触发 | `(value: string) => void` |
| `input` | 输入过程中触发 | `(value: string) => void` |
| `change` | 输入值提交变化时触发 | `(value: string) => void` |
| `focus` | 输入框获取焦点时触发 | `(event: FocusEvent) => void` |
| `blur` | 输入框失去焦点时触发 | `(event: FocusEvent) => void` |
| `clear` | 点击清空按钮时触发 | `() => void` |
| `select` | 选中候选项时触发 | `(item: AutocompleteSuggestion) => void` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义候选项内容 | `{ item: AutocompleteSuggestion }` |
| `prefix` | 输入框前缀内容 | `-` |
| `suffix` | 输入框后缀内容 | `-` |
| `prepend` | 输入框包裹层前置内容 | `-` |
| `append` | 输入框包裹层后置内容 | `-` |
| `loading` | 自定义加载态内容 | `-` |
| `empty` | 自定义空态内容 | `-` |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `focus` | 让输入框获取焦点 | `() => void` |
| `blur` | 让输入框失去焦点 | `() => void` |
| `close` | 关闭候选面板 | `() => void` |
| `highlight` | 高亮指定索引的候选项 | `(index: number) => void` |
| `inputRef` | 原生输入框引用 | `HTMLInputElement \| undefined` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhAutocompleteSize` | 尺寸联合类型 |
| `YhAutocompletePlacement` | 下拉位置联合类型 |
| `YhAutocompleteSuggestion` | 候选项数据类型 |
| `YhAutocompleteProps` | `YhAutocomplete` 的 props 类型 |
| `YhAutocompleteEmits` | `YhAutocomplete` 的 emits 类型 |
| `YhAutocompleteSlots` | `YhAutocomplete` 的 slots 类型 |
| `YhAutocompleteExpose` | 组件暴露实例类型 |
| `YhAutocompleteInstance` | 组件实例类型 |

### 主题变量

`YhAutocomplete` 当前没有额外暴露组件级专属 CSS 变量，主要消费全局输入框、边框、填充和文本相关令牌；如需统一调整，可结合 `themeOverrides` 与全局主题变量一起使用。
