# TimeSelect 时间选择

`YhTimeSelect` 用于从预定义的时间列表中选择固定时段，适合预约、排班、营业时间等固定时间槽场景。


<script setup lang="ts">
import { ref } from 'vue'

const timeBasic = ref('')
const timeDisabled = ref('09:00')
const timeClearable = ref('10:30')
const startTime = ref('')
const endTime = ref('')
const timeRange = ref('')
const timeDisabledHours = ref('')
const timeMinMax = ref('')
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')
const timeFormat = ref('')
const timeCustom = ref('')
const timeFull = ref('')
const nuxtTime = ref('')

const customOptions = [
  { value: '08:00', label: '清晨 08:00' },
  { value: '09:00', label: '上午 09:00' },
  { value: '12:00', label: '中午 12:00' },
  { value: '14:00', label: '下午 14:00' },
  { value: '18:00', label: '傍晚 18:00' },
  { value: '20:00', label: '晚上 20:00' }
]

const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="nuxtTime"
      start="08:30"
      step="00:15"
      end="18:30"
      placeholder="Nuxt 自动导入"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nuxtTime = ref('09:00')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const tsBasic = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="00:00"
      end="23:30"
      step="00:30"
      placeholder="选择时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ value || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" disabled placeholder="禁用状态" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('09:00')
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsClearable = `<template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ value || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('10:30')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsTimeRange = `<template>
  <div style="display: flex; align-items: center; gap: 16px; max-width: 500px;">
    <yh-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="开始时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
    <span style="color: #909399;">至</span>
    <yh-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
  </div>
  <p style="margin-top: 8px; color: #909399; font-size: 12px;">
    已选时间段：{{ startTime || '--' }} 至 {{ endTime || '--' }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const startTime = ref('')
const endTime = ref('')
<\/script>`

const jsTimeRange = tsTimeRange.replace('lang="ts"', '')

const tsFixedRange = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="选择服务时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      时间段：09:00 - 21:00，每 30 分钟一个选项
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsFixedRange = tsFixedRange.replace('lang="ts"', '')

const tsDisabledHours = `<template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="08:00"
      end="20:00"
      step="00:30"
      :disabled-hours="[['12:00', '13:30'], ['18:00', '19:00']]"
      placeholder="午休和晚餐时间不可选"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用时段：12:00-13:30，18:00-19:00
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsDisabledHours = tsDisabledHours.replace('lang="ts"', '')

const tsMinMax = `<template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="06:00"
      end="22:00"
      step="00:30"
      min-time="09:00"
      max-time="18:00"
      placeholder="工作时间 09:00-18:00"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      可选范围：09:00 - 18:00
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsMinMax = tsMinMax.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="large" size="large" placeholder="大型" />
    <yh-time-select v-model="defaultVal" placeholder="默认" />
    <yh-time-select v-model="small" size="small" placeholder="小型" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsFormat = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="08:30"
      step="00:15"
      end="18:30"
      format="HH:mm"
      placeholder="自定义格式"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ value || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsFormat = tsFormat.replace('lang="ts"', '')

const tsCustomOptions = `<template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" :options="options" placeholder="选择时间段" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ value || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: '08:00', label: '清晨 08:00' },
  { value: '09:00', label: '上午 09:00' },
  { value: '12:00', label: '中午 12:00' },
  { value: '14:00', label: '下午 14:00' },
  { value: '18:00', label: '傍晚 18:00' },
  { value: '20:00', label: '晚上 20:00' }
]
<\/script>`

const jsCustomOptions = tsCustomOptions.replace('lang="ts"', '')

const tsFull = `<template>
  <div style="max-width: 320px;">
    <yh-time-select
      v-model="value"
      start="00:00"
      end="23:59"
      step="00:15"
      clearable
      editable
      include-end-time
      placeholder="选择任意时间（15 分钟间隔）"
      @change="handleChange"
      @clear="handleClear"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前选择：{{ value || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const handleChange = (val: string | undefined) => {
  console.log('时间变化：', val)
}

const handleClear = () => {
  console.log('已清空')
}
<\/script>`

const jsFull = tsFull.replace('lang="ts"', '').replace(': string | undefined', '')
</script>

::: tip TimePicker 与 TimeSelect
- **TimePicker**：通过滚轮面板选择任意时间点。
- **TimeSelect**：从规则生成或自定义数据提供的固定时间选项中选择。
:::

## 基础用法

通过 `start`、`end` 和 `step` 配置可选时间列表。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeBasic"
      start="00:00"
      end="23:30"
      step="00:30"
      placeholder="选择时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeBasic || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 禁用状态

设置 `disabled` 后整个控件不可交互。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeDisabled" disabled placeholder="禁用状态" />
  </div>
</DemoBlock>

## 可清空

设置 `clearable` 后，在有值时显示清空按钮。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeClearable" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeClearable || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 时间范围联动

通过两个 `YhTimeSelect` 配合 `min-time` 和 `max-time` 实现范围联动。

<DemoBlock title="时间范围联动" :ts-code="tsTimeRange" :js-code="jsTimeRange">
  <div style="display: flex; align-items: center; gap: 16px; max-width: 500px;">
    <yh-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="开始时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
    <span style="color: #909399;">至</span>
    <yh-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
  </div>
  <p style="margin-top: 8px; color: #909399; font-size: 12px;">
    已选时间段：{{ startTime || '--' }} 至 {{ endTime || '--' }}
  </p>
</DemoBlock>

## 固定时间范围

使用 `start`、`end` 和 `step` 设置固定的可选时段。

<DemoBlock title="固定时间范围" :ts-code="tsFixedRange" :js-code="jsFixedRange">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeRange"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="选择服务时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      时间段：09:00 - 21:00，每 30 分钟一个选项
    </p>
  </div>
</DemoBlock>

## 禁用时间段

使用 `disabled-hours` 标记不可选时间段。

<DemoBlock title="禁用时间段" :ts-code="tsDisabledHours" :js-code="jsDisabledHours">
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="timeDisabledHours"
      start="08:00"
      end="20:00"
      step="00:30"
      :disabled-hours="[['12:00', '13:30'], ['18:00', '19:00']]"
      placeholder="午休和晚餐时间不可选"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用时段：12:00-13:30，18:00-19:00
    </p>
  </div>
</DemoBlock>

## minTime 与 maxTime 限制

使用 `min-time` 和 `max-time` 限制可选范围之外的选项。

<DemoBlock title="minTime 与 maxTime 限制" :ts-code="tsMinMax" :js-code="jsMinMax">
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="timeMinMax"
      start="06:00"
      end="22:00"
      step="00:30"
      min-time="09:00"
      max-time="18:00"
      placeholder="工作时间 09:00-18:00"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      可选范围：09:00 - 18:00
    </p>
  </div>
</DemoBlock>

## 不同尺寸

通过 `size` 切换 `large`、默认和 `small`。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="timeLarge" size="large" placeholder="大型" />
    <yh-time-select v-model="timeDefault" placeholder="默认" />
    <yh-time-select v-model="timeSmall" size="small" placeholder="小型" />
  </div>
</DemoBlock>

## 时间格式

设置 `format` 可以控制规则生成选项的展示标签。

<DemoBlock title="时间格式" :ts-code="tsFormat" :js-code="jsFormat">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeFormat"
      start="08:30"
      step="00:15"
      end="18:30"
      format="HH:mm"
      placeholder="自定义格式"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeFormat || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 自定义时间选项

使用 `options` 传入完整的自定义选项列表，优先级高于 `start`、`end`、`step`。

<DemoBlock title="自定义时间选项" :ts-code="tsCustomOptions" :js-code="jsCustomOptions">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeCustom" :options="customOptions" placeholder="选择时间段" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值：{{ timeCustom || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 完整功能演示

该示例组合了可编辑过滤、清空、自定义步长和结束时间选项。

<DemoBlock title="完整功能演示" :ts-code="tsFull" :js-code="jsFull">
  <div style="max-width: 320px;">
    <yh-time-select
      v-model="timeFull"
      start="00:00"
      end="23:59"
      step="00:15"
      clearable
      editable
      include-end-time
      placeholder="选择任意时间（15 分钟间隔）"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前选择：{{ timeFull || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

在 Nuxt 中接入 YH-UI 模块后可直接使用 `YhTimeSelect`。规则生成的选项列表和当前值可以参与 SSR 渲染，弹层定位、输入过滤和滚动同步会在客户端激活后继续工作。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="nuxtTime"
      start="08:30"
      step="00:15"
      end="18:30"
      placeholder="Nuxt 自动导入"
    />
  </div>
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| editable | 输入框是否可编辑并支持过滤 | `boolean` | `true` |
| clearable | 是否允许清空 | `boolean` | `true` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `undefined` |
| placeholder | 占位文本 | `string` | `''` |
| name | 原生输入框名称 | `string` | `undefined` |
| effect | 下拉面板主题风格 | `'dark' \| 'light'` | `'light'` |
| prefix-icon | 已声明的前缀图标属性。当前模板仍固定渲染默认时钟图标，未消费该 prop | `string \| Component` | `undefined` |
| clear-icon | 已声明的清空图标属性。当前模板仍固定渲染默认清空图标，未消费该 prop | `string \| Component` | `undefined` |
| start | 用于生成选项的开始时间 | `string` | `'09:00'` |
| end | 用于生成选项的结束时间 | `string` | `'18:00'` |
| step | 用于生成选项的时间间隔 | `string` | `'00:30'` |
| min-time | 最小可选时间 | `string` | `undefined` |
| max-time | 最大可选时间 | `string` | `undefined` |
| value-on-clear | 清空时回传的值，未设置时回退到 `undefined` | `string` | `undefined` |
| format | 规则生成选项的展示格式 | `string` | `'HH:mm'` |
| popper-class | 下拉面板自定义类名 | `string` | `undefined` |
| popper-style | 已声明的下拉面板样式属性。当前实现未将该 prop 合并到面板样式中 | `string \| Record<string, string>` | `undefined` |
| teleported | 是否将面板传送到 `body` | `boolean` | `true` |
| include-end-time | 兼容性保留字段。当前实现会始终包含精确的结束时间选项 | `boolean` | `false` |
| validate-event | 值变化和失焦时是否触发表单校验 | `boolean` | `true` |
| options | 自定义时间选项列表 | `YhTimeSelectOption[]` | `undefined` |
| disabled-hours | 禁用时间段列表 | `string[][]` | `undefined` |
| theme-overrides | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `(value: string \| undefined) => void` |
| change | 选中值变化时触发 | `(value: string \| undefined) => void` |
| focus | 输入框聚焦时触发 | `(event: FocusEvent) => void` |
| blur | 输入框失焦时触发 | `(event: FocusEvent) => void` |
| clear | 点击清空按钮时触发 | `() => void` |
| visible-change | 面板显示状态变化时触发 | `(visible: boolean) => void` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| prefix | 输入框前缀内容 | - |
| empty | 没有可用选项时的占位内容 | - |
| option | 自定义选项内容 | `{ option: YhTimeSelectOption }` |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 让输入框获得焦点 | `() => void` |
| blur | 让输入框失去焦点 | `() => void` |
| inputRef | 内部输入框引用 | `Ref<HTMLInputElement \| undefined>` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhTimeSelectProps` | TimeSelect props 类型 |
| `YhTimeSelectEmits` | TimeSelect emits 类型 |
| `YhTimeSelectSlots` | TimeSelect slots 类型 |
| `YhTimeSelectExpose` | TimeSelect expose 类型 |
| `YhTimeSelectSize` | 尺寸联合类型 |
| `YhTimeSelectOption` | 时间选项项类型 |
| `YhTimeSelectInstance` | 组件实例类型 |

### 主题变量

`YhTimeSelect` 支持 `themeOverrides`。当前样式文件直接消费以下组件级 CSS 变量，其余边框、背景和文字颜色继续复用全局主题令牌。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-time-select-height` | 控件高度 | `var(--yh-component-size-default, 32px)` |
| `--yh-time-select-font-size` | 输入框和选项字体大小 | `var(--yh-font-size-base, 14px)` |
| `--yh-time-select-icon-size` | 前后缀图标尺寸 | `14px` |
| `--yh-time-select-prefix-margin` | 前缀图标左侧间距 | `12px` |
| `--yh-time-select-display-padding` | 展示文本左侧内边距 | `38px` |

## 使用场景

### 预约系统

```vue
<template>
  <yh-form :model="form">
    <yh-form-item label="预约日期">
      <yh-date-picker v-model="form.date" />
    </yh-form-item>
    <yh-form-item label="预约时间">
      <yh-time-select
        v-model="form.time"
        start="09:00"
        end="17:00"
        step="00:30"
        :disabled-hours="[['12:00', '13:00']]"
        placeholder="选择预约时间"
      />
    </yh-form-item>
  </yh-form>
</template>
```

### 营业时间设置

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <yh-time-select
      v-model="openTime"
      :max-time="closeTime"
      start="00:00"
      end="23:59"
      step="00:30"
      placeholder="开门时间"
    />
    <span>-</span>
    <yh-time-select
      v-model="closeTime"
      :min-time="openTime"
      start="00:00"
      end="23:59"
      step="00:30"
      placeholder="关门时间"
    />
  </div>
</template>
```

### 排班系统

```vue
<template>
  <yh-time-select
    v-model="shiftTime"
    :options="[
      { value: '08:00', label: '早班 (08:00-16:00)' },
      { value: '16:00', label: '中班 (16:00-00:00)' },
      { value: '00:00', label: '夜班 (00:00-08:00)' }
    ]"
    placeholder="选择班次"
  />
</template>
```

