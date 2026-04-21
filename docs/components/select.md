# Select 选择器

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const selectBasic = ref('')
const basicOptions = [
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
]

const selectDisabledOption = ref('')
const disabledOptions = [
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2', disabled: true },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4', disabled: true },
  { value: 'option5', label: '选项 5' }
]

const selectDisabled = ref('option1')
const selectClearable = ref('option1')
const selectMultiple = ref<string[]>([])
const selectCollapse = ref(['option1', 'option2', 'option3'])
const selectFilterable = ref('')
const selectRemote = ref('')
const remoteOptions = ref<{ value: string; label: string }[]>([])
const remoteLoading = ref(false)
const selectCreate = ref<string[]>([])
const selectVirtual = ref('')
const selectVirtualCustomValue1 = ref('')
const selectVirtualCustomValue2 = ref('')
const selectVirtualCustomValue3 = ref('')
const selectLarge = ref('')
const selectDefault = ref('')
const selectSmall = ref('')
const nuxtValue = ref('')

const remoteMethod = (query: string) => {
  if (query) {
    remoteLoading.value = true
    setTimeout(() => {
      remoteOptions.value = basicOptions.filter((item) => item.label.includes(query))
      remoteLoading.value = false
    }, 500)
  } else {
    remoteOptions.value = []
  }
}

const virtualOptions = Array.from({ length: 10000 }, (_, i) => ({
  value: `option${i}`,
  label: `选项 ${i + 1}`
}))

const nuxtOptions = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' }
]

const tsNuxt = `<${_T}>
  <div style="max-width: 240px;">
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt 自动导入" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const nuxtValue = ref('')
const nuxtOptions = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' }
]
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsBasic = `<${_T}>
  <yh-select v-model="value" :options="options" placeholder="请选择" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2', disabled: true },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4', disabled: true },
  { value: 'option5', label: '选项 5' }
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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
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

const allOptions = [
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
]

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      options.value = allOptions.filter((item) => item.label.includes(query))
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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
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
    <yh-select v-model="value1" :options="options" placeholder="普通模式" />

    <yh-select
      v-model="value2"
      :options="largeOptions"
      virtual-scroll
      placeholder="虚拟滚动模式（10000 项）"
    />

    <yh-select
      v-model="value3"
      :options="largeOptions"
      virtual-scroll
      :item-height="40"
      :height="300"
      placeholder="自定义参数（行高 40px，高度 300px）"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const options = [
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' }
]

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
  { value: 'option1', label: '选项 1' },
  { value: 'option2', label: '选项 2' },
  { value: 'option3', label: '选项 3' },
  { value: 'option4', label: '选项 4' },
  { value: 'option5', label: '选项 5' }
]
</${_S}>`

const jsSizes = toJs(tsSizes)
</script>

当选项较多时，使用下拉菜单展示并选择内容。

## 基础用法

适用于常规单选场景。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 240px;">
    <yh-select v-model="selectBasic" :options="basicOptions" placeholder="请选择" />
  </div>
</DemoBlock>

## 禁用选项

在选项数据中设置 `disabled` 可禁用单个选项。

<DemoBlock title="禁用选项" :ts-code="tsDisabledOption" :js-code="jsDisabledOption">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabledOption" :options="disabledOptions" placeholder="请选择" />
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 禁用整个组件。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabled" :options="basicOptions" disabled placeholder="请选择" />
  </div>
</DemoBlock>

## 可清空单选

设置 `clearable` 后可清空当前值。

<DemoBlock title="可清空单选" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectClearable" :options="basicOptions" clearable placeholder="请选择" />
  </div>
</DemoBlock>

## 多选

设置 `multiple` 后启用多选，此时 `v-model` 为数组。

<DemoBlock title="多选" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="max-width: 360px;">
    <yh-select v-model="selectMultiple" :options="basicOptions" multiple placeholder="请选择" />
  </div>
</DemoBlock>

## 折叠标签

多选模式下可通过 `collapse-tags` 折叠标签数量。

<DemoBlock title="折叠标签" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCollapse" :options="basicOptions" multiple collapse-tags :max-collapse-tags="2" placeholder="请选择" />
  </div>
</DemoBlock>

## 可搜索

设置 `filterable` 后可根据输入内容过滤选项。

<DemoBlock title="可搜索" :ts-code="tsFilterable" :js-code="jsFilterable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectFilterable" :options="basicOptions" filterable placeholder="请选择" />
  </div>
</DemoBlock>

## 远程搜索

配合 `remote` 与 `remote-method` 可以异步拉取选项。

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

## 创建选项

设置 `allow-create` 后，用户可以基于当前输入创建临时选项，通常与 `filterable` 一起使用。

<DemoBlock title="创建选项" :ts-code="tsCreate" :js-code="jsCreate">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCreate" :options="basicOptions" multiple filterable allow-create placeholder="请选择或输入" />
  </div>
</DemoBlock>

## 虚拟滚动

选项较多时可开启 `virtual-scroll` 以优化渲染性能。

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

通过 `item-height` 和 `height` 可以控制虚拟列表行高与面板高度。

- `item-height`：每项高度，默认 `34`
- `height`：下拉面板可视高度，默认 `274`

<DemoBlock title="虚拟滚动完整配置" :ts-code="tsVirtualCustom" :js-code="jsVirtualCustom">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 240px;">
    <yh-select v-model="selectVirtualCustomValue1" :options="basicOptions" placeholder="普通模式" />
    <yh-select
      v-model="selectVirtualCustomValue2"
      :options="virtualOptions"
      virtual-scroll
      placeholder="虚拟滚动模式（10000 项）"
    />
    <yh-select
      v-model="selectVirtualCustomValue3"
      :options="virtualOptions"
      virtual-scroll
      :item-height="40"
      :height="300"
      placeholder="自定义参数（行高 40px，高度 300px）"
    />
  </div>
</DemoBlock>

## 不同尺寸

通过 `size` 切换大、中、小三种尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-select v-model="selectLarge" :options="basicOptions" size="large" placeholder="大型" />
    <yh-select v-model="selectDefault" :options="basicOptions" placeholder="默认" />
    <yh-select v-model="selectSmall" :options="basicOptions" size="small" placeholder="小型" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

注册 YH-UI Nuxt 模块后可以直接使用 `YhSelect`。SSR 阶段会正常渲染选中文本和选项数据，弹层定位、远程回调以及 `focus` 等命令式能力会在客户端激活后继续工作。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt 自动导入" />
  </div>
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `YhSelectValue \| YhSelectValue[]` | `undefined` |
| options | 组件渲染的选项数据 | `YhSelectOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用组件 | `boolean` | `false` |
| clearable | 是否允许清空当前值 | `boolean` | `false` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| multiple | 是否启用多选 | `boolean` | `false` |
| multiple-limit | 多选模式最大可选数量，`0` 表示不限制 | `number` | `0` |
| filterable | 是否启用关键字过滤 | `boolean` | `false` |
| filter-method | 自定义本地过滤方法 | `(query: string) => void` | `undefined` |
| remote | 是否启用远程过滤 | `boolean` | `false` |
| remote-method | 远程搜索回调 | `(query: string) => void` | `undefined` |
| loading | 是否显示加载状态 | `boolean` | `false` |
| loading-text | 自定义加载文案，为空时回退到 locale 文案 | `string` | `''` |
| no-match-text | 无匹配结果时的空状态文案，为空时回退到 locale 文案 | `string` | `''` |
| no-data-text | 无选项数据时的空状态文案，为空时回退到 locale 文案 | `string` | `''` |
| allow-create | 是否允许基于当前输入创建选项 | `boolean` | `false` |
| collapse-tags | 多选模式下是否折叠标签 | `boolean` | `false` |
| collapse-tags-tooltip | 折叠标签时是否显示汇总提示 | `boolean` | `false` |
| max-collapse-tags | 开启 `collapse-tags` 时最多显示的标签数量 | `number` | `1` |
| popper-class | 自定义下拉面板类名 | `string` | `undefined` |
| teleported | 是否将下拉面板传送到 `body` | `boolean` | `true` |
| fit-input-width | 下拉面板宽度是否跟随输入框 | `boolean` | `true` |
| tag-type | 多选标签类型 | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''` |
| virtual-scroll | 是否启用虚拟滚动 | `boolean` | `false` |
| item-height | 虚拟列表项高度 | `number` | `34` |
| height | 虚拟列表面板可视高度 | `number` | `274` |
| validate-event | 是否在 `change` 与 `blur` 时触发表单校验 | `boolean` | `true` |
| value-key | 选项值字段名 | `string` | `'value'` |
| label-key | 选项标签字段名 | `string` | `'label'` |
| theme-overrides | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### 类型

#### Select Option

| 名称 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number \| boolean` | 是 |
| label | 选项标签 | `string` | 是 |
| disabled | 是否禁用该选项 | `boolean` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值变化时触发 | `(value: YhSelectValue \| YhSelectValue[] \| undefined) => void` |
| focus | 输入框获得焦点时触发 | `(event: FocusEvent) => void` |
| blur | 输入框失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清空图标时触发 | `() => void` |
| visible-change | 下拉面板显示状态变化时触发 | `(visible: boolean) => void` |
| remove-tag | 多选模式下移除标签时触发 | `(value: YhSelectValue) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 直接传入自定义 `YhOption` 节点时使用 | `-` |
| prefix | 输入区域前缀内容 | `-` |
| empty | 无可用选项时的内容 | `-` |
| option | 使用 `options` 数据源时的自定义选项内容 | `{ option: YhSelectOption }` |
| tag | 多选模式下的自定义标签内容 | `{ value: YhSelectValue }` |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 让输入框获得焦点 | `() => void` |
| blur | 让输入框失去焦点 | `() => void` |
| inputRef | 内部输入框实例引用 | `Ref<HTMLInputElement \| undefined>` |

### Option Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `YhSelectValue` | 必填 |
| label | 选项标签 | `string` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |

### Option Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义选项内容 | `-` |

## 主题变量

`YhSelect` 支持 `themeOverrides`。组件测试已覆盖 `themeOverrides.borderColor` 等组件级覆写输出，例如会生成 `--yh-select-border-color`。输入框、标签和下拉面板的其它视觉样式仍主要继承全局主题令牌，例如 `--yh-border-color`、`--yh-fill-color` 和 `--yh-text-color-*`。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-select-border-color` | 由 `themeOverrides.borderColor` 输出的边框颜色 | `undefined` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhSelectProps` | Select 组件 Props 类型 |
| `YhSelectEmits` | Select 组件事件类型 |
| `YhSelectSlots` | Select 组件插槽类型 |
| `YhSelectExpose` | Select 组件 Expose 类型 |
| `YhSelectOption` | 选项数据类型 |
| `YhSelectValue` | 选中值类型 |
| `YhSelectSize` | 尺寸联合类型 |
| `YhSelectTagType` | 标签类型联合类型 |
| `YhOptionProps` | Option 组件 Props 类型 |
| `YhOptionSlots` | Option 组件插槽类型 |
| `YhSelectInstance` | Select 组件实例类型 |
| `YhOptionInstance` | Option 组件实例类型 |
