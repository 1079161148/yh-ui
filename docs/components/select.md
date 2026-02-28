# Select 选择器

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// 基础用法
const selectBasic = ref('')
const basicOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]

// 禁用选项
const selectDisabledOption = ref('')
const disabledOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二', disabled: true },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四', disabled: true },
  { value: 'option5', label: '选项五' }
]

// 禁用状态
const selectDisabled = ref('option1')

// 可清空
const selectClearable = ref('option1')

// 多选
const selectMultiple = ref([])

// 折叠标签
const selectCollapse = ref(['option1', 'option2', 'option3'])

// 可搜索
const selectFilterable = ref('')

// 远程搜索
const selectRemote = ref('')
const remoteOptions = ref([])
const remoteLoading = ref(false)
const remoteMethod = (query: string) => {
  if (query) {
    remoteLoading.value = true
    setTimeout(() => {
      remoteOptions.value = basicOptions.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      remoteLoading.value = false
    }, 500)
  } else {
    remoteOptions.value = []
  }
}

// 创建条目
const selectCreate = ref([])

// 虚拟滚动
const selectVirtual = ref('')
const virtualOptions = Array.from({ length: 10000 }, (_, i) => ({
  value: `option${i}`,
  label: `选项 ${i + 1}`
}))

// 自定义虚拟滚动参数
const selectVirtualCustom = ref('')
const selectVirtualNormal = ref('')
const selectVirtualCustomValue1 = ref('')
const selectVirtualCustomValue2 = ref('')
const selectVirtualCustomValue3 = ref('')

// 不同尺寸
const selectLarge = ref('')
const selectDefault = ref('')
const selectSmall = ref('')

// Nuxt 使用示例
const nuxtValue = ref('')
const nuxtOptions = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' }
]

const tsNuxt = `<${_T}>
  <div style="max-width: 240px;">
    <!-- 组件自动导入，直接使用 -->
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt 自动导入" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhSelect
const nuxtValue = ref('')
const nuxtOptions = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' }
]
</${_S}>`

const jsNuxt = toJs(tsNuxt)

// 代码示例
const tsBasic = `<${_T}>
  <yh-select v-model="value" :options="options" placeholder="请选择" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsDisabledOption = `<${_T}>
  <yh-select v-model="value" :options="options" placeholder="请选择" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二', disabled: true },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四', disabled: true },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsDisabledOption = toJs(tsDisabledOption)

const tsDisabled = `<${_T}>
  <yh-select v-model="value" :options="options" disabled placeholder="请选择" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsDisabled = toJs(tsDisabled)

const tsClearable = `<${_T}>
  <yh-select v-model="value" :options="options" clearable placeholder="请选择" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsClearable = toJs(tsClearable)

const tsMultiple = `<${_T}>
  <yh-select v-model="value" :options="options" multiple placeholder="请选择" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsMultiple = toJs(tsMultiple)

const tsCollapse = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    multiple
    collapse-tags
    :max-collapse-tags="2"
    placeholder="请选择"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref(['option1', 'option2', 'option3'])
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsCollapse = toJs(tsCollapse)

const tsFilterable = `<${_T}>
  <yh-select v-model="value" :options="options" filterable placeholder="请选择" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsFilterable = toJs(tsFilterable)

const tsRemote = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="请输入关键词"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string; label: string }[]>([])
const loading = ref(false)

// 模拟远程数据源
const allOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    // 模拟网络请求延迟
    setTimeout(() => {
      options.value = allOptions.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      loading.value = false
    }, 500)
  } else {
    options.value = []
  }
}
</${_S}>`

const jsRemote = toJs(tsRemote)

const tsCreate = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    multiple
    filterable
    allow-create
    placeholder="请选择或输入"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsCreate = toJs(tsCreate)

const tsVirtual = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    virtual-scroll
    filterable
    placeholder="10000 个选项"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = Array.from({ length: 10000 }, (_, i) => ({
  value: \`option\${i}\`,
  label: \`选项 \${i + 1}\`
}))
</${_S}>`

const jsVirtual = toJs(tsVirtual)

const tsVirtualCustom = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 240px;">
    <!-- 普通模式 -->
    <yh-select v-model="value1" :options="options" placeholder="普通模式" />

    <!-- 虚拟滚动模式 -->
    <yh-select
      v-model="value2"
      :options="largeOptions"
      virtual-scroll
      placeholder="虚拟滚动模式 (10000选项)"
    />

    <!-- 自定义虚拟滚动参数 -->
    <yh-select
      v-model="value3"
      :options="largeOptions"
      virtual-scroll
      :item-height="40"
      :height="300"
      placeholder="自定义参数 (行高40px, 高度300px)"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

// 普通选项
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
]

// 大数据量选项
const largeOptions = Array.from({ length: 10000 }, (_, i) => ({
  value: \`option\${i}\`,
  label: \`选项 \${i + 1}\`
}))
</${_S}>`

const jsVirtualCustom = toJs(tsVirtualCustom)

const tsSizes = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-select v-model="large" :options="options" size="large" placeholder="大型" />
    <yh-select v-model="defaultVal" :options="options" placeholder="默认" />
    <yh-select v-model="small" :options="options" size="small" placeholder="小型" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四' },
  { value: 'option5', label: '选项五' }
]
</${_S}>`

const jsSizes = toJs(tsSizes)
</script>

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 240px;">
    <yh-select v-model="selectBasic" :options="basicOptions" placeholder="请选择" />
  </div>
</DemoBlock>

## 禁用选项

在选项中设置 `disabled` 属性可以禁用该选项。

<DemoBlock title="禁用选项" :ts-code="tsDisabledOption" :js-code="jsDisabledOption">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabledOption" :options="disabledOptions" placeholder="请选择" />
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性禁用整个选择器。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabled" :options="basicOptions" disabled placeholder="请选择" />
  </div>
</DemoBlock>

## 可清空单选

设置 `clearable` 属性可以清空已选项。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectClearable" :options="basicOptions" clearable placeholder="请选择" />
  </div>
</DemoBlock>

## 多选

设置 `multiple` 属性可以启用多选，此时 `v-model` 的值为当前选中值所组成的数组。

<DemoBlock title="多选" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="max-width: 360px;">
    <yh-select v-model="selectMultiple" :options="basicOptions" multiple placeholder="请选择" />
  </div>
</DemoBlock>

## 折叠标签

多选时，使用 `collapse-tags` 属性折叠标签。

<DemoBlock title="折叠标签" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCollapse" :options="basicOptions" multiple collapse-tags :max-collapse-tags="2" placeholder="请选择" />
  </div>
</DemoBlock>

## 可搜索

设置 `filterable` 属性可以启用搜索功能。

<DemoBlock title="可搜索" :ts-code="tsFilterable" :js-code="jsFilterable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectFilterable" :options="basicOptions" filterable placeholder="请选择" />
  </div>
</DemoBlock>

## 远程搜索

设置 `remote` 和 `remote-method` 属性可以从服务器搜索数据。

<DemoBlock title="远程搜索" :ts-code="tsRemote" :js-code="jsRemote">
  <div style="max-width: 240px;">
    <yh-select
      v-model="selectRemote"
      :options="remoteOptions"
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="remoteLoading"
      placeholder="请输入关键词"
    />
  </div>
</DemoBlock>

## 创建条目

设置 `allow-create` 属性允许用户创建新条目。需配合 `filterable` 使用。

<DemoBlock title="创建条目" :ts-code="tsCreate" :js-code="jsCreate">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCreate" :options="basicOptions" multiple filterable allow-create placeholder="请选择或输入" />
  </div>
</DemoBlock>

## 虚拟滚动

当选项数量较大时，可以使用虚拟滚动来优化性能。设置 `virtual-scroll` 属性启用虚拟滚动。

<DemoBlock title="虚拟滚动" :ts-code="tsVirtual" :js-code="jsVirtual">
  <div style="max-width: 240px;">
    <yh-select
      v-model="selectVirtual"
      :options="virtualOptions"
      virtual-scroll
      filterable
      placeholder="10000 个选项"
    />
  </div>
</DemoBlock>

## 虚拟滚动完整配置

通过 `item-height` 和 `height` 属性可以自定义虚拟滚动的行高和容器高度。

- `virtual-scroll`: 启用虚拟滚动
- `item-height`: 每个选项的高度（默认 34px）
- `height`: 下拉框容器高度（默认 274px）

<DemoBlock title="虚拟滚动完整配置" :ts-code="tsVirtualCustom" :js-code="jsVirtualCustom">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 240px;">
    <yh-select v-model="selectVirtualCustomValue1" :options="basicOptions" placeholder="普通模式" />
    <yh-select
      v-model="selectVirtualCustomValue2"
      :options="virtualOptions"
      virtual-scroll
      placeholder="虚拟滚动模式 (10000选项)"
    />
    <yh-select
      v-model="selectVirtualCustomValue3"
      :options="virtualOptions"
      virtual-scroll
      :item-height="40"
      :height="300"
      placeholder="自定义参数 (行高40px, 高度300px)"
    />
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性改变选择器大小。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-select v-model="selectLarge" :options="basicOptions" size="large" placeholder="大型" />
    <yh-select v-model="selectDefault" :options="basicOptions" placeholder="默认" />
    <yh-select v-model="selectSmall" :options="basicOptions" size="small" placeholder="小型" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Select 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt 自动导入" />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 基础选择功能完全支持
- ✅ 多选及折叠标签支持
- ✅ 选项分组及搜索支持
- ✅ 远程搜索支持
- ✅ 虚拟滚动（SSR 时初始化为基础模式，客户端激活后自动开启优化）
- ⚠️ DOM 方法如 `focus()`、`blur()` 必须在 `onMounted` 中调用

::: tip SSR 安全性
Select 组件已通过完整的 SSR 测试，确保服务端和客户端渲染的 HTML 结构完全一致，兼容 Nuxt 的 Hydration 流程。
:::

## API

### Props

| 属性名                | 说明                           | 类型                                                 | 默认值         |
| --------------------- | ------------------------------ | ---------------------------------------------------- | -------------- |
| model-value / v-model | 绑定值                         | `string \| number \| boolean \| array`               | —              |
| options               | 选项数据                       | `SelectOption[]`                                     | `[]`           |
| placeholder           | 占位文本                       | `string`                                             | —              |
| disabled              | 是否禁用                       | `boolean`                                            | `false`        |
| clearable             | 是否可清空                     | `boolean`                                            | `false`        |
| size                  | 输入框尺寸                     | `'large' \| 'default' \| 'small'`                    | `'default'`    |
| multiple              | 是否多选                       | `boolean`                                            | `false`        |
| multiple-limit        | 多选时最多可选数量，0 为不限制 | `number`                                             | `0`            |
| filterable            | 是否可搜索                     | `boolean`                                            | `false`        |
| filter-method         | 自定义过滤方法                 | `(query: string) => void`                            | —              |
| remote                | 是否远程搜索                   | `boolean`                                            | `false`        |
| remote-method         | 远程搜索方法                   | `(query: string) => void`                            | —              |
| loading               | 是否正在加载                   | `boolean`                                            | `false`        |
| loading-text          | 加载文本                       | `string`                                             | `'加载中...'`  |
| no-match-text         | 无匹配数据文本                 | `string`                                             | `'无匹配数据'` |
| no-data-text          | 无数据文本                     | `string`                                             | `'无数据'`     |
| allow-create          | 是否允许创建新选项             | `boolean`                                            | `false`        |
| collapse-tags         | 是否折叠标签                   | `boolean`                                            | `false`        |
| max-collapse-tags     | 最大折叠标签数                 | `number`                                             | `1`            |
| virtual-scroll        | 是否启用虚拟滚动               | `boolean`                                            | `false`        |
| item-height           | 虚拟滚动项高度                 | `number`                                             | `34`           |
| height                | 虚拟滚动容器高度               | `number`                                             | `274`          |
| teleported            | 是否将下拉框插入到 body        | `boolean`                                            | `true`         |
| fit-input-width       | 下拉框宽度是否与输入框一致     | `boolean`                                            | `true`         |
| tag-type              | 标签类型                       | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''`           |
| value-key             | 值的键名                       | `string`                                             | `'value'`      |
| label-key             | 标签的键名                     | `string`                                             | `'label'`      |

### SelectOption

| 属性名   | 说明     | 类型                          | 必填 |
| -------- | -------- | ----------------------------- | ---- |
| value    | 选项值   | `string \| number \| boolean` | 是   |
| label    | 选项标签 | `string`                      | 是   |
| disabled | 是否禁用 | `boolean`                     | 否   |

### Events

| 事件名         | 说明                     | 回调参数                      |
| -------------- | ------------------------ | ----------------------------- |
| change         | 选中值变化时触发         | `(value: any) => void`        |
| focus          | 获取焦点时触发           | `(event: FocusEvent) => void` |
| blur           | 失去焦点时触发           | `(event: FocusEvent) => void` |
| clear          | 点击清空按钮时触发       | `() => void`                  |
| visible-change | 下拉框显示/隐藏时触发    | `(visible: boolean) => void`  |
| remove-tag     | 多选模式下移除标签时触发 | `(value: any) => void`        |

### Slots

| 插槽名  | 说明           | 作用域                     |
| ------- | -------------- | -------------------------- |
| default | 自定义选项内容 | `{ option: SelectOption }` |
| prefix  | 输入框前缀内容 | —                          |
| empty   | 无数据时的内容 | —                          |

### Expose

| 属性名 | 说明               | 类型         |
| ------ | ------------------ | ------------ |
| focus  | 使 select 获取焦点 | `() => void` |
| blur   | 使 select 失去焦点 | `() => void` |

## 主题变量

Select 组件使用以下 CSS 变量，你可以通过覆盖这些变量来自定义样式：

| 变量名                           | 说明       | 默认值                         |
| -------------------------------- | ---------- | ------------------------------ |
| `--yh-select-border-color`       | 边框颜色   | `var(--yh-border-color)`       |
| `--yh-select-hover-border-color` | 悬停边框色 | `var(--yh-border-color-hover)` |
| `--yh-select-focus-border-color` | 聚焦边框色 | `var(--yh-color-primary)`      |
| `--yh-select-disabled-bg-color`  | 禁用背景色 | `var(--yh-fill-color-light)`   |
| `--yh-select-tag-bg-color`       | 标签背景色 | `var(--yh-fill-color)`         |
