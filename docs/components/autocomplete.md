# Autocomplete 自动补全输入框

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// --- 基础用法 (Demo 1) ---
const value1 = ref('')
const suggestions1 = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]
const querySearch1 = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? suggestions1.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : suggestions1
  cb(results)
}

// --- 自定义模板 (Demo 2) ---
const value2 = ref('')
const restaurants2 = [
  { value: '三全鲜食', address: '长宁区新渔路144号' },
  { value: '海底捞火锅', address: '上海市普陀区真北路988号' },
  { value: '肯德基', address: '上海市徐汇区虹桥路1号' },
  { value: '麦当劳', address: '上海市浦东新区陆家嘴环路1000号' }
]
const querySearch2 = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? restaurants2.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : restaurants2
  cb(results)
}
const handleSelect2 = (item: any) => {
  console.log('选中:', item)
}

// --- 远程搜索 (Demo 3) ---
const value3 = ref('')
const remoteSearch3 = (queryString: string, cb: (suggestions: any[]) => void) => {
  if (!queryString) {
    cb([])
    return
  }
  setTimeout(() => {
    const results = suggestions1.filter(item =>
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}

// --- 禁用状态 (Demo 4) ---
const value4 = ref('')

// --- 可清空 (Demo 5) ---
const value5 = ref('YH-UI')

// --- 不同尺寸 (Demo 6) ---
const large6 = ref('Vue.js')
const default6 = ref('Svelte')
const small6 = ref('Solid')

// --- 自定义插槽 (Demo 7) ---
const value7 = ref('')
const querySearch7 = (queryString: string, cb: (suggestions: any[]) => void) => {
  setTimeout(() => cb([]), 1000)
}

// --- 代码示例字符串 ---
const tsBasic = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const suggestions = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]

const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? suggestions.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : suggestions
  cb(results)
}
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsCustom = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="请输入餐厅名"
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

const value = ref('')
const restaurants = [
  { value: '三全鲜食', address: '长宁区新渔路144号' },
  { value: '海底捞火锅', address: '上海市普陀区真北路988号' },
  { value: '肯德基', address: '上海市徐汇区虹桥路1号' },
  { value: '麦当劳', address: '上海市浦东新区陆家嘴环路1000号' }
]

const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? restaurants.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : restaurants
  cb(results)
}

const handleSelect = (item: any) => {
  console.log('选中:', item)
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

const jsCustom = toJs(tsCustom)

const tsRemote = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="remoteSearch"
    placeholder="请输入内容 (远程搜素)"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const remoteSearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  if (!queryString) {
    cb([])
    return
  }
  // 模拟远程搜索
  setTimeout(() => {
    const suggestions = [
      { value: 'Vue.js' },
      { value: 'React' },
      { value: 'Angular' },
      { value: 'Svelte' },
      { value: 'Solid' }
    ]
    const results = suggestions.filter(item => 
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}
</${_S}>`

const jsRemote = toJs(tsRemote)

const tsDisabled = `<${_T}>
  <yh-autocomplete v-model="value" disabled placeholder="禁用状态" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</${_S}>`

const jsDisabled = toJs(tsDisabled)

const tsClearable = `<${_T}>
  <yh-autocomplete v-model="value" clearable placeholder="可清空" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('YH-UI')
</${_S}>`

const jsClearable = toJs(tsClearable)

const tsSizes = `<${_T}>
  <div class="flex-column gap-4">
    <yh-autocomplete 
      v-model="large" 
      :fetch-suggestions="querySearch"
      size="large" 
      placeholder="大型 (40px)" 
    />
    <yh-autocomplete 
      v-model="defaultValue" 
      :fetch-suggestions="querySearch"
      placeholder="默认 (32px)" 
    />
    <yh-autocomplete 
      v-model="small" 
      :fetch-suggestions="querySearch"
      size="small" 
      placeholder="小型 (24px)" 
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const large = ref('Vue.js')
const defaultValue = ref('Svelte')
const small = ref('Solid')

const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  const suggestions = [
    { value: 'Vue.js' },
    { value: 'React' },
    { value: 'Angular' },
    { value: 'Svelte' },
    { value: 'Solid' }
  ]
  const results = queryString
    ? suggestions.filter(item => 
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : suggestions
  cb(results)
}
</${_S}>`

const jsSizes = toJs(tsSizes)

const tsSlots = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="尝试搜索无匹配项"
  >
    <${_T} #loading>
      <div class="custom-loading">正在拼命加载中...</div>
    </${_T}>
    <${_T} #empty>
      <div class="custom-empty">哎呀，什么也没搜到</div>
    </${_T}>
  </yh-autocomplete>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  // 模拟延时空数据
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

const jsSlots = toJs(tsSlots)

// Nuxt 使用示例
const nuxtValue = ref('')
const nuxtSuggestions = (q: string, cb: any) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}

const tsNuxt = `<${_T}>
  <div style="max-width: 300px;">
    <!-- 自动注册，直接使用 -->
    <yh-autocomplete
      v-model="nuxtValue"
      :fetch-suggestions="nuxtSuggestions"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
// 无需手动导入 YhAutocomplete
const nuxtValue = ref('')
const nuxtSuggestions = (q: string, cb: any) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}
</${_S}>`

const jsNuxt = toJs(tsNuxt)
</script>

根据输入内容提供对应的输入建议。

## 基础用法

通过 `fetch-suggestions` 属性设置获取建议列表的方法。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value1"
      :fetch-suggestions="querySearch1"
      placeholder="请输入内容"
    />
  </div>
  <template #description>
    绑定的变量为：<code>{{ value1 }}</code>
  </template>
</DemoBlock>

## 自定义模板

使用 `default` 插槽自定义建议项的显示内容。

<DemoBlock title="自定义模板" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value2"
      :fetch-suggestions="querySearch2"
      placeholder="请输入餐厅名"
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

通过模拟延时从服务器获取建议数据。

<DemoBlock title="远程搜索" :ts-code="tsRemote" :js-code="jsRemote">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value3"
      :fetch-suggestions="remoteSearch3"
      placeholder="请输入内容 (远程搜素)"
    />
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性禁用输入框。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value4" disabled placeholder="禁用状态" />
  </div>
</DemoBlock>

## 可清空

使用 `clearable` 属性可快速清空内容。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value5" clearable placeholder="可清空" />
  </div>
</DemoBlock>

## 不同尺寸

支持 `large`、`default` 和 `small` 三种尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 300px; display: flex; flex-direction: column; gap: 16px;">
    <yh-autocomplete v-model="large6" :fetch-suggestions="querySearch1" size="large" placeholder="大型 (40px)" />
    <yh-autocomplete v-model="default6" :fetch-suggestions="querySearch1" placeholder="默认 (32px)" />
    <yh-autocomplete v-model="small6" :fetch-suggestions="querySearch1" size="small" placeholder="小型 (24px)" />
  </div>
</DemoBlock>

## 自定义插槽

可以使用 `loading` 和 `empty` 插槽来自定义加载中和无数据时的内容。

<DemoBlock title="自定义插槽" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value7"
      :fetch-suggestions="querySearch7"
      placeholder="尝试搜索无匹配项"
    >
      <template #loading>
        <div style="padding: 10px; color: var(--yh-color-primary); text-align: center;">正在拼命加载中...</div>
      </template>
      <template #empty>
        <div style="padding: 10px; color: var(--yh-color-danger); text-align: center;">哎呀，什么也没搜到</div>
      </template>
    </yh-autocomplete>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Autocomplete 组件在 Nuxt 3/4 环境下运行良好。由于支持自动导入，你只需直接编写组件名即可。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="nuxtValue"
      :fetch-suggestions="nuxtSuggestions"
      placeholder="Nuxt 自动导入演示"
    />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 输入框的初始状态（包含 `v-model` 值）在服务端正确渲染
- ✅ 尺寸（size）、占位符（placeholder）支持 SSR
- ✅ 前后缀插槽在 SSR 阶段即已生成 HTML
- ⚠️ 候选建议列表（Dropdown）仅在客户端交互（输入或聚焦）时弹出，不影响首屏 HTML 结构
- 💡 搜索防抖和下拉定位在客户端激活（Hydration）后生效

::: tip SSR 安全性
Autocomplete 组件内部封装了 `YhInput` 和 `Popper` 系统，通过 `useId` 确保了首屏渲染时 Input 与下拉关联 ID 的稳定性，完美避免了 SSR 下常见的 ID 冲突警报。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string` | — |
| placeholder | 占位文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| fetch-suggestions | 获取建议的方法 | `(query: string, callback: (suggestions: any[]) => void) => void` | — |
| trigger-on-focus | 是否在聚焦时触发建议 | `boolean` | `true` |
| debounce | 防抖延迟 (ms) | `number` | `300` |
| placement | 下拉框位置 | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` |
| value-key | 建议对象中用于显示的键名 | `string` | `'value'` |
| highlight-first-item | 是否默认高亮第一项 | `boolean` | `false` |
| teleported | 是否将下拉框插入到 body | `boolean` | `true` |
| fit-input-width | 下拉框宽度是否与输入框一致 | `boolean` | `true` |
| prefix-icon | 前置图标 | `string \| Component` | — |
| suffix-icon | 后置图标 | `string \| Component` | — |
| name | 原生 name 属性 | `string` | — |
| autofocus | 自动聚焦 | `boolean` | `false` |
| autocomplete | 原生 autocomplete 属性 | `string` | `'off'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入值变化时触发 | `(value: string) => void` |
| change | 值改变时触发 | `(value: string) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清空按钮时触发 | `() => void` |
| select | 选中建议项时触发 | `(item: any) => void` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| default | 自定义建议项内容 | `{ item: any }` |
| prefix | 输入框前缀内容 | — |
| suffix | 输入框后缀内容 | — |
| prepend | 输入框前置内容 | — |
| append | 输入框后置内容 | — |
| loading | 正在加载中的内容 | — |
| empty | 无匹配数据时的内容 | — |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | `() => void` |
| blur | 使 input 失去焦点 | `() => void` |
| close | 关闭建议列表 | `() => void` |
| highlight | 高亮指定项 | `(index: number) => void` |

## 主题变量

Autocomplete 组件使用以下 CSS 变量，你可以通过覆盖这些变量来自定义样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-autocomplete-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-autocomplete-hover-border-color` | 悬停边框色 | `var(--yh-border-color-hover)` |
| `--yh-autocomplete-focus-border-color` | 聚焦边框色 | `var(--yh-color-primary)` |
| `--yh-autocomplete-disabled-bg-color` | 禁用背景色 | `var(--yh-fill-color-light)` |
