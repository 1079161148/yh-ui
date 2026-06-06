# TimePicker 时间选择器

用于选择或输入任意时间点，支持滚轮面板、时间范围、12 小时制、禁用时间和底部操作栏。


<script setup lang="ts">
import { ref } from 'vue'

const timeBasic = ref('')
const timeDisabled = ref('14:30:00')
const timeClearable = ref('09:15:30')
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')
const time12Hours = ref('')
const timeNoSeconds = ref('')
const timeArrow = ref('')
const timeStep = ref('')
const timeDisabledTime = ref('')
const timeRange = ref<[string, string] | null>(null)
const timeRangeOrder = ref<[string, string] | null>(['10:00:00', '08:00:00'])
const timeFull = ref('')
const nuxtTime = ref('')

const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => (hour === 12 ? [0, 15, 30, 45] : []),
  disabledSeconds: () => []
}

const tsBasic = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" placeholder="选择时间" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" disabled placeholder="禁用状态" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('14:30:00')
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsClearable = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('09:15:30')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="max-width: 220px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-picker v-model="large" size="large" placeholder="大型" />
    <yh-time-picker v-model="defaultVal" placeholder="默认" />
    <yh-time-picker v-model="small" size="small" placeholder="小型" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const ts12Hours = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      use12-hours
      format="hh:mm:ss A"
      placeholder="12 小时制"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const js12Hours = ts12Hours.replace('lang="ts"', '')

const tsNoSeconds = `<template>
  <div style="max-width: 180px;">
    <yh-time-picker
      v-model="time"
      :show-seconds="false"
      format="HH:mm"
      placeholder="时:分"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsNoSeconds = tsNoSeconds.replace('lang="ts"', '')

const tsArrow = `<template>
  <div style="max-width: 200px;">
    <yh-time-picker v-model="time" arrow-control placeholder="箭头控制" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsArrow = tsArrow.replace('lang="ts"', '')

const tsStep = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      :hour-step="2"
      :minute-step="15"
      :second-step="30"
      placeholder="自定义步长"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      小时步长：2，分钟步长：15，秒步长：30
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsStep = tsStep.replace('lang="ts"', '')

const tsDisabledTime = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      :disabled-time="disabledTimeConfig"
      placeholder="限制可选时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用 00:00-05:59、22:00-23:59，以及 12 点的部分分钟
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')

const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => (hour === 12 ? [0, 15, 30, 45] : []),
  disabledSeconds: () => []
}
<\/script>`

const jsDisabledTime = tsDisabledTime.replace('lang="ts"', '').replace(': number', '')

const tsRange = `<template>
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeRange ? timeRange.join(' - ') : '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const timeRange = ref<[string, string] | null>(null)
<\/script>`

const jsRange = tsRange.replace('lang="ts"', '').replace('<[string, string] | null>', '')

const tsRangeOrder = `<template>
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      order-on-confirm
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeRange ? timeRange.join(' - ') : '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const timeRange = ref<[string, string] | null>(['10:00:00', '08:00:00'])
<\/script>`

const jsRangeOrder = tsRangeOrder.replace('lang="ts"', '').replace('<[string, string] | null>', '')

const tsFull = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      clearable
      :show-seconds="true"
      :show-footer="true"
      :show-now="true"
      now-text="现在"
      confirm-text="确定"
      cancel-text="取消"
      placeholder="完整功能演示"
      @change="handleChange"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')

const handleChange = (value: string) => {
  console.log('时间变化：', value)
}

const handleConfirm = (value: string) => {
  console.log('确认时间：', value)
}
<\/script>`

const jsFull = tsFull.replace('lang="ts"', '').replace(': string', '')

const tsNuxt = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" placeholder="Nuxt 自动导入" />
  </div>
</template>

<script setup lang="ts">
const time = ref('')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

::: tip TimePicker 与 TimeSelect
- **TimePicker**：通过滚轮面板选择任意时间点。
- **TimeSelect**：从预设的固定时间列表中选择。
:::

## 基础用法

点击输入框打开面板，选择时、分、秒。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeBasic" placeholder="选择时间" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeBasic || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 禁用状态

设置 `disabled` 后不可交互。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeDisabled" disabled placeholder="禁用状态" />
  </div>
</DemoBlock>

## 可清空

设置 `clearable` 后，在有值且悬停或聚焦时显示清空按钮。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeClearable" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeClearable || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 不同尺寸

通过 `size` 切换 `large`、默认和 `small` 三种尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 220px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-picker v-model="timeLarge" size="large" placeholder="大型" />
    <yh-time-picker v-model="timeDefault" placeholder="默认" />
    <yh-time-picker v-model="timeSmall" size="small" placeholder="小型" />
  </div>
</DemoBlock>

## 12 小时制

设置 `use12-hours` 后，显示值会按 AM/PM 格式渲染。

<DemoBlock title="12 小时制" :ts-code="ts12Hours" :js-code="js12Hours">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time12Hours"
      use12-hours
      format="hh:mm:ss A"
      placeholder="12 小时制"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ time12Hours || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 隐藏秒选择

将 `show-seconds` 设为 `false` 可只保留时分列。

<DemoBlock title="隐藏秒选择" :ts-code="tsNoSeconds" :js-code="jsNoSeconds">
  <div style="max-width: 180px;">
    <yh-time-picker
      v-model="timeNoSeconds"
      :show-seconds="false"
      format="HH:mm"
      placeholder="时:分"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeNoSeconds || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 箭头控制模式

设置 `arrow-control` 后，时间列使用上下切换按钮。

<DemoBlock title="箭头控制模式" :ts-code="tsArrow" :js-code="jsArrow">
  <div style="max-width: 200px;">
    <yh-time-picker v-model="timeArrow" arrow-control placeholder="箭头控制" />
  </div>
</DemoBlock>

## 步长设置

使用 `hour-step`、`minute-step`、`second-step` 控制可选增量。

<DemoBlock title="步长设置" :ts-code="tsStep" :js-code="jsStep">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeStep"
      :hour-step="2"
      :minute-step="15"
      :second-step="30"
      placeholder="自定义步长"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      小时步长：2，分钟步长：15，秒步长：30
    </p>
  </div>
</DemoBlock>

## 禁用时间

通过 `disabled-time` 禁用特定的小时、分钟或秒。

<DemoBlock title="禁用时间" :ts-code="tsDisabledTime" :js-code="jsDisabledTime">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeDisabledTime"
      :disabled-time="disabledTimeConfig"
      placeholder="限制可选时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用 00:00-05:59、22:00-23:59，以及 12 点的部分分钟
    </p>
  </div>
</DemoBlock>

## 时间范围选择

设置 `is-range` 后，可在同一个组件中选择开始和结束时间。

<DemoBlock title="时间范围选择" :ts-code="tsRange" :js-code="jsRange">
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeRange ? timeRange.join(' - ') : '未选择' }}
    </p>
  </div>
</DemoBlock>

## 范围自动排序

设置 `order-on-confirm` 后，确认时若结束时间早于开始时间，会自动交换顺序。

<DemoBlock title="范围自动排序" :ts-code="tsRangeOrder" :js-code="jsRangeOrder">
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRangeOrder"
      is-range
      order-on-confirm
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeRangeOrder ? timeRangeOrder.join(' - ') : '未选择' }}
    </p>
  </div>
</DemoBlock>

## 完整功能演示

该示例组合了清空、底部操作区和自定义按钮文案。

<DemoBlock title="完整功能演示" :ts-code="tsFull" :js-code="jsFull">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeFull"
      clearable
      :show-seconds="true"
      :show-footer="true"
      :show-now="true"
      now-text="现在"
      confirm-text="确定"
      cancel-text="取消"
      placeholder="完整功能演示"
    />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

在 Nuxt 中接入 YH-UI 模块后可直接使用 `YhTimePicker`。输入框、初始值和占位符可以参与 SSR 渲染，弹层定位、滚动同步和 `focus` / `open` 等实例方法会在客户端激活后生效。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="nuxtTime" placeholder="Nuxt 自动导入" />
  </div>
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `YhTimePickerValue \| YhTimePickerRangeValue` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| editable | 输入框是否可编辑 | `boolean` | `true` |
| clearable | 是否允许清空 | `boolean` | `true` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `undefined` |
| placeholder | 单选模式占位文本 | `string` | `''` |
| start-placeholder | 范围模式开始输入框占位文本 | `string` | `''` |
| end-placeholder | 范围模式结束输入框占位文本 | `string` | `''` |
| name | 原生 `input` 的 `name` | `string` | `undefined` |
| is-range | 是否启用范围选择 | `boolean` | `false` |
| format | 显示格式 | `string` | `'HH:mm:ss'` |
| value-format | 输出字符串值时使用的格式，未传时回退到 `format` | `string` | `undefined` |
| prefix-icon | 已声明的前缀图标属性。当前模板仍固定渲染默认时钟图标，未消费该 prop | `string \| Component` | `undefined` |
| clear-icon | 已声明的清空图标属性。当前模板仍固定渲染默认清空图标，未消费该 prop | `string \| Component` | `undefined` |
| use12-hours | 是否启用 12 小时制 | `boolean` | `false` |
| show-seconds | 是否显示秒列 | `boolean` | `true` |
| hour-step | 小时步长 | `number` | `1` |
| minute-step | 分钟步长 | `number` | `1` |
| second-step | 秒步长 | `number` | `1` |
| disabled-time | 禁用时间配置 | `YhTimePickerDisabledTimeConfig` | `undefined` |
| popper-class | 弹层自定义类名 | `string` | `undefined` |
| popper-style | 已声明的弹层样式属性。当前实现未将该 prop 合并到面板样式中 | `string \| Record<string, string>` | `undefined` |
| teleported | 是否将弹层传送到 `body` | `boolean` | `true` |
| validate-event | 值变化和失焦时是否触发表单校验 | `boolean` | `true` |
| popper-offset | 输入框与弹层之间的偏移量 | `number` | `4` |
| range-separator | 范围分隔文案 | `string` | `'-'` |
| default-value | 当前没有值时，面板打开后使用的初始时间 | `YhTimePickerValue \| YhTimePickerRangeValue` | `undefined` |
| hour-options | 自定义小时选项 | `number[]` | `undefined` |
| minute-options | 自定义分钟选项 | `number[]` | `undefined` |
| second-options | 自定义秒选项 | `number[]` | `undefined` |
| hide-on-blur | 失焦时是否关闭面板 | `boolean` | `true` |
| confirm-text | 确认按钮文案，为空时回退到语言包 | `string` | `''` |
| cancel-text | 取消按钮文案，为空时回退到语言包 | `string` | `''` |
| now-text | 当前时间按钮文案，为空时回退到语言包 | `string` | `''` |
| show-footer | 是否显示底部操作区 | `boolean` | `true` |
| show-now | 是否显示“现在”按钮 | `boolean` | `true` |
| arrow-control | 是否启用箭头控制模式 | `boolean` | `false` |
| tabindex | 原生 `tabindex` | `number \| string` | `0` |
| id | 单选模式下原生 `input` 的 `id`。范围模式下两个输入框不会消费该 prop | `string` | `undefined` |
| order-on-confirm | 范围模式下确认时是否自动排序 | `boolean` | `false` |
| theme-overrides | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `(value: YhTimePickerValue \| YhTimePickerRangeValue) => void` |
| change | 值确认变更时触发 | `(value: YhTimePickerValue \| YhTimePickerRangeValue) => void` |
| focus | 输入框获得焦点时触发 | `(event: FocusEvent) => void` |
| blur | 输入框失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清空按钮时触发 | `() => void` |
| visible-change | 面板显示状态变化时触发 | `(visible: boolean) => void` |
| confirm | 点击确认按钮时触发 | `(value: YhTimePickerValue \| YhTimePickerRangeValue) => void` |
| cancel | 点击取消按钮时触发 | `() => void` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| prefix | 输入框前缀内容 | - |
| suffix | 类型中已声明的后缀插槽，当前模板未渲染该插槽 | - |
| rangeSeparator | 自定义范围分隔内容 | - |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 让输入框获得焦点 | `() => void` |
| blur | 让输入框失去焦点 | `() => void` |
| open | 打开面板 | `() => void` |
| close | 关闭面板 | `() => void` |
| inputRef | 单选模式输入框引用。范围模式下该引用不会指向起止输入框 | `Ref<HTMLInputElement \| undefined>` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhTimePickerProps` | TimePicker props 类型 |
| `YhTimePickerEmits` | TimePicker emits 类型 |
| `YhTimePickerSlots` | TimePicker slots 类型 |
| `YhTimePickerExpose` | TimePicker expose 类型 |
| `YhTimePickerSize` | 尺寸联合类型 |
| `YhTimePickerValue` | 单值时间类型 |
| `YhTimePickerRangeValue` | 时间范围类型 |
| `YhTimePickerDisabledTimeConfig` | 禁用时间配置类型 |
| `YhTimePickerState` | 面板内部时间状态类型 |
| `YhTimePickerInstance` | 组件实例类型 |

### 主题变量

`YhTimePicker` 支持 `themeOverrides`。当前样式文件直接消费以下组件级 CSS 变量，其余边框、阴影、文字颜色等由全局主题令牌提供。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-time-picker-width` | 单选模式宽度 | `220px` |
| `--yh-time-picker-range-width` | 范围模式宽度 | `360px` |
| `--yh-time-picker-active-color` | 激活项文字颜色 | `var(--yh-color-primary)` |
| `--yh-time-picker-active-bg` | 激活项背景色 | `var(--yh-color-primary-light-9)` |
| `--yh-time-picker-hover-bg` | 选项悬停背景色 | `var(--yh-fill-color-light)` |
| `--yh-time-picker-panel-bg` | 弹层背景色 | `var(--yh-bg-color)` |
| `--yh-time-picker-border-radius` | 弹层圆角 | `var(--yh-radius-md)` |

