# DatePicker 日期选择器

`YhDatePicker` 是统一的日期输入组件，支持日、周、月、季度、年以及范围选择，同时支持内联面板、自定义单元格内容、快捷预设和主题变量覆盖。

<script setup lang="ts">
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const demoType = ref('date')
const demoShape = ref('round')
const demoValue = ref(null)
const demoTypes = [
  { value: 'date', label: '日期' },
  { value: 'datetime', label: '日期时间' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月份' },
  { value: 'quarter', label: '季度' },
  { value: 'year', label: '年份' },
  { value: 'daterange', label: '日期范围' },
  { value: 'monthrange', label: '月份范围' }
]
watch(demoType, () => {
  demoValue.value = null
})

const d1 = ref('')
const d2 = ref('')
const d3 = ref('')
const d4 = ref('2026-01-24')
const d5 = ref('2026-01-24')
const s1 = ref('')
const s2 = ref('')
const s3 = ref('')
const d6 = ref(null)
const d7 = ref(null)
const d8 = ref('')
const d9 = ref('')
const d10 = ref(null)
const r1 = ref(null)
const r2 = ref(null)
const dv1 = ref(new Date())
const dv2 = ref(new Date())
const dv3 = ref(null)
const defaultDate = new Date(2025, 0, 1)

const presets = [
  { label: '今天', value: new Date() },
  { label: '昨天', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: '一周前', value: () => dayjs().subtract(1, 'week').toDate() }
]

const disabledDate = (date: Date) => dayjs(date).isBefore(dayjs(), 'day')

const cellRender = (date: Date) => {
  const day = dayjs(date).format('MM-DD')
  const holidays: Record<string, string> = {
    '01-01': '元旦',
    '01-20': '大寒',
    '02-16': '除夕',
    '02-17': '春节',
    '02-14': '情人节'
  }

  if (holidays[day]) {
    const isHoliday = day === '02-16' || day === '02-17'
    return {
      text: holidays[day],
      className: isHoliday ? 'is-holiday' : 'is-solar-term'
    }
  }

  return ''
}

const formatValue = (val: unknown, type: string) => {
  if (!val) return '未选择'

  const fmt = (v: unknown) => {
    const d = dayjs(v as string | number | Date)
    if (!d.isValid()) return '...'
    if (type.includes('year')) return d.format('YYYY')
    if (type.includes('month')) return d.format('YYYY-MM')
    if (type.includes('quarter')) return `${d.year()} Q${Math.floor(d.month() / 3) + 1}`
    if (type === 'week') return d.format('YYYY [第]w[周]')
    if (type.includes('datetime')) return d.format('YYYY-MM-DD HH:mm:ss')
    return d.format('YYYY-MM-DD')
  }

  return Array.isArray(val) ? `${fmt(val[0])} 至 ${fmt(val[1])}` : fmt(val)
}

const showcaseTS = `<${_T}>
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">选择模式：</span>
        <yh-radio-group v-model="type" size="small">
          <yh-radio-button v-for="t in types" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
      <div class="ctrl-row">
        <span class="label">单元格形状：</span>
        <yh-radio-group v-model="shape" size="small">
          <yh-radio-button value="round">圆形</yh-radio-button>
          <yh-radio-button value="square">方形</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="demo-viewport">
      <yh-date-picker :key="type + shape" v-model="value" :type="type" :cell-shape="shape" panel-only />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const type = ref('date')
const shape = ref('round')
const value = ref(null)
const types = [
  { value: 'date', label: '日期' },
  { value: 'datetime', label: '日期时间' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月份' },
  { value: 'quarter', label: '季度' },
  { value: 'year', label: '年份' },
  { value: 'daterange', label: '日期范围' },
  { value: 'monthrange', label: '月份范围' }
]
</${_S}>`

const baseTS = `<${_T}>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="选择日期" />
    <yh-date-picker v-model="d2" type="month" placeholder="选择月份" />
    <yh-date-picker v-model="d3" type="year" placeholder="选择年份" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const d1 = ref('')
const d2 = ref('')
const d3 = ref('')
</${_S}>`

const statusTS = `<${_T}>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d4" disabled placeholder="禁用状态" />
    <yh-date-picker v-model="d5" readonly placeholder="只读状态" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const d4 = ref('2026-01-24')
const d5 = ref('2026-01-24')
</${_S}>`

const sizeTS = `<${_T}>
  <div class="yh-demo-row">
    <yh-date-picker v-model="s1" size="large" placeholder="大尺寸" />
    <yh-date-picker v-model="s2" placeholder="默认尺寸" />
    <yh-date-picker v-model="s3" size="small" placeholder="小尺寸" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const s1 = ref('')
const s2 = ref('')
const s3 = ref('')
</${_S}>`

const shapeTS = `<${_T}>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="圆形单元格" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="方形单元格" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const d8 = ref('')
const d9 = ref('')
</${_S}>`

const rangeTS = `<${_T}>
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const r1 = ref(null)
const r2 = ref(null)
</${_S}>`

const presetsTS = `<${_T}>
  <yh-date-picker v-model="d6" :presets="presets" placeholder="打开面板使用预设" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const d6 = ref(null)
const presets = [
  { label: '今天', value: new Date() },
  { label: '昨天', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: '一周前', value: () => dayjs().subtract(1, 'week').toDate() }
]
</${_S}>`

const disabledTS = `<${_T}>
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="今天之前不可选" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const d7 = ref(null)
const disabledDate = (date: Date) => dayjs(date).isBefore(dayjs(), 'day')
</${_S}>`

const customTS = `<${_T}>
  <div class="yh-demo-column">
    <yh-date-picker v-model="dv1" placeholder="自定义清除图标">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z" />
        </svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH:mm:ss" placeholder="日期时间" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="默认面板锚点" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const dv1 = ref(new Date())
const dv2 = ref(new Date())
const dv3 = ref(null)
const defaultDate = new Date(2025, 0, 1)
</${_S}>`

const renderTS = `<${_T}>
  <yh-date-picker
    v-model="value"
    :cell-render="cellRender"
    placeholder="渲染节日和节气"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(null)
const cellRender = (date: Date) => {
  const day = dayjs(date).format('MM-DD')
  const holidays = {
    '01-01': '元旦',
    '01-20': '大寒',
    '02-16': '除夕',
    '02-17': '春节',
    '02-14': '情人节'
  }

  if (holidays[day]) {
    const isHoliday = day === '02-16' || day === '02-17'
    return {
      text: holidays[day],
      className: isHoliday ? 'is-holiday' : 'is-solar-term'
    }
  }

  return ''
}
</${_S}>

<${_St} scoped>
.is-holiday { color: var(--yh-color-danger); font-weight: 700; }
.is-solar-term { color: #0ea5e9; }
</${_St}>`

const nuxtTS = `<${_T}>
  <yh-date-picker v-model="date" placeholder="Nuxt 自动导入" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const date = ref('')
</${_S}>`

const showcaseJS = toJs(showcaseTS)
const baseJS = toJs(baseTS)
const statusJS = toJs(statusTS)
const sizeJS = toJs(sizeTS)
const shapeJS = toJs(shapeTS)
const rangeJS = toJs(rangeTS)
const presetsJS = toJs(presetsTS)
const disabledJS = toJs(disabledTS)
const customJS = toJs(customTS)
const renderJS = toJs(renderTS)
const nuxtJS = toJs(nuxtTS)
</script>

## 展示模式

设置 `panel-only` 后可以直接以内联方式渲染日期面板，适合仪表盘、侧栏筛选或自定义布局场景。

<DemoBlock title="展示模式" :ts-code="showcaseTS" :js-code="showcaseJS">
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">选择模式：</span>
        <yh-radio-group v-model="demoType" size="small">
          <yh-radio-button v-for="t in demoTypes" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
      <div class="ctrl-row">
        <span class="label">单元格形状：</span>
        <yh-radio-group v-model="demoShape" size="small">
          <yh-radio-button value="round">圆形</yh-radio-button>
          <yh-radio-button value="square">方形</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>

    <div class="demo-viewport">
      <yh-date-picker :key="demoType + demoShape" v-model="demoValue" :type="demoType" :cell-shape="demoShape" panel-only />
    </div>

    <div class="demo-result">
      <span class="dot"></span>
      <span class="label">已选：</span>
      <span class="val">{{ formatValue(demoValue, demoType) }}</span>
    </div>
  </div>
</DemoBlock>

## 基础用法

通过 `type` 可以切换不同的选择模式。

<DemoBlock title="基础用法" :ts-code="baseTS" :js-code="baseJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="选择日期" />
    <yh-date-picker v-model="d2" type="month" placeholder="选择月份" />
    <yh-date-picker v-model="d3" type="year" placeholder="选择年份" />
  </div>
</DemoBlock>

## 高级配置

结合插槽和扩展属性，可以定制图标、默认面板锚点以及日期时间格式。

<DemoBlock title="高级配置" :ts-code="customTS" :js-code="customJS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="dv1" placeholder="自定义清除图标">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z" />
        </svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH:mm:ss" placeholder="日期时间" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="默认面板锚点" />
  </div>
</DemoBlock>

## 单元格形状

使用 `cell-shape` 在圆形和方形单元格之间切换。

<DemoBlock title="单元格形状" :ts-code="shapeTS" :js-code="shapeJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="圆形单元格" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="方形单元格" />
  </div>
</DemoBlock>

## 自定义单元格内容

轻量标记场景可以使用 `cell-render`，如果需要完全接管单元格渲染，则使用 `date-cell` 插槽。

<DemoBlock title="自定义单元格内容" :ts-code="renderTS" :js-code="renderJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d10" :cell-render="cellRender" placeholder="渲染节日和节气" style="width: 280px" />
  </div>
</DemoBlock>

## 禁用与只读

`disabled` 会完全禁止交互，`readonly` 会保留当前值显示但不允许打开面板。

<DemoBlock title="禁用与只读" :ts-code="statusTS" :js-code="statusJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d4" disabled placeholder="禁用状态" />
    <yh-date-picker v-model="d5" readonly placeholder="只读状态" />
  </div>
</DemoBlock>

## 不同尺寸

组件遵循统一尺寸体系：`large`、`default`、`small`。

<DemoBlock title="不同尺寸" :ts-code="sizeTS" :js-code="sizeJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="s1" size="large" placeholder="大尺寸" />
    <yh-date-picker v-model="s2" placeholder="默认尺寸" />
    <yh-date-picker v-model="s3" size="small" placeholder="小尺寸" />
  </div>
</DemoBlock>

## 快捷预设

通过 `presets` 可以在面板中提供快捷选择操作。

<DemoBlock title="快捷预设" :ts-code="presetsTS" :js-code="presetsJS">
  <yh-date-picker v-model="d6" :presets="presets" placeholder="打开面板使用预设" />
</DemoBlock>

## 禁用日期

使用 `disabled-date` 控制哪些日期不可选。

<DemoBlock title="禁用日期" :ts-code="disabledTS" :js-code="disabledJS">
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="今天之前不可选" />
</DemoBlock>

## 范围选择

`daterange`、`monthrange` 等范围类型会使用双值模型。

<DemoBlock title="范围选择" :ts-code="rangeTS" :js-code="rangeJS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

安装 `@yh-ui/nuxt` 后，可以在 Nuxt 3/4 中直接使用 `YhDatePicker`。输入框壳层可以正常参与 SSR，面板仍依赖客户端交互打开。

<DemoBlock title="在 Nuxt 中使用" :ts-code="nuxtTS" :js-code="nuxtJS">
  <yh-date-picker v-model="d1" placeholder="Nuxt 自动导入" />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 绑定值 | `YhDatePickerValue \| YhDatePickerRangeValue` | `null` |
| `type` | 选择模式 | `'date' \| 'datetime' \| 'year' \| 'month' \| 'week' \| 'quarter' \| 'daterange' \| 'datetimerange' \| 'monthrange' \| 'yearrange' \| 'quarterrange'` | `'date'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读，开启后不会打开面板 | `boolean` | `false` |
| `clearable` | 有值时是否显示清除按钮 | `boolean` | `true` |
| `size` | 组件尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| `placeholder` | 非范围模式占位文本，不传时使用语言包文案 | `string` | `undefined` |
| `start-placeholder` | 范围开始占位文本，不传时使用语言包文案 | `string` | `undefined` |
| `end-placeholder` | 范围结束占位文本，不传时使用语言包文案 | `string` | `undefined` |
| `format` | 输入框显示格式 | `string` | `''` |
| `value-format` | 绑定值输出格式 | `string` | `''` |
| `date-format` | 面板日期格式 | `string` | `'YYYY-MM-DD'` |
| `time-format` | 面板和底部时间显示格式 | `string` | `'HH:mm:ss'` |
| `range-separator` | 范围输入框分隔符 | `string` | `'-'` |
| `first-day-of-week` | 一周的第一天，取值 `1` 到 `7` | `number` | `7` |
| `disabled-date` | 禁用日期函数 | `(date: Date) => boolean` | `undefined` |
| `presets` | 面板中的快捷预设项 | `YhDatePickerPreset[]` | `[]` |
| `preset-position` | 预设区域位置保留配置，当前实现仍固定渲染在面板下方 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'bottom'` |
| `show-footer` | 是否显示底部区域 | `boolean` | `true` |
| `status` | 视觉状态 | `'success' \| 'warning' \| 'error'` | `undefined` |
| `order-on-confirm` | 范围选择时结束值早于开始值时是否自动排序 | `boolean` | `false` |
| `prefix-icon` | 自定义前缀图标组件或字符串 | `string \| Component` | `''` |
| `clear-icon` | 自定义清除图标组件或字符串 | `string \| Component` | `''` |
| `default-value` | 打开面板时的默认锚点日期 | `Date \| Date[]` | `undefined` |
| `panel-only` | 是否只渲染面板，不显示输入框壳层 | `boolean` | `false` |
| `default-time` | 日期时间模式下的默认时间值 | `Date \| Date[]` | `undefined` |
| `popper-class` | 浮层面板附加类名 | `string` | `''` |
| `teleported` | 是否将面板传送到 `body` | `boolean` | `true` |
| `validate-event` | 值变化后是否触发表单校验 | `boolean` | `true` |
| `name` | 原生表单字段名 | `string` | `''` |
| `id` | 原生表单字段 id | `string` | `''` |
| `cell-shape` | 日期单元格形状 | `'round' \| 'square'` | `'round'` |
| `cell-render` | 自定义日期单元格文本渲染函数 | `(date: Date) => string \| { text: string; className?: string }` | `undefined` |
| `theme-overrides` | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### Events

当前实现中，运行时实际会触发以下事件：

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 绑定值变化时触发 | `(value: YhDatePickerValue \| YhDatePickerRangeValue) => void` |
| `change` | 值更新后触发 | `(value: YhDatePickerValue \| YhDatePickerRangeValue) => void` |
| `clear` | 清除按钮重置值后触发 | `() => void` |
| `confirm` | 点击确认按钮时触发 | `(value: YhDatePickerValue \| YhDatePickerRangeValue) => void` |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| `prefix-icon` | 自定义前缀图标内容 | - |
| `clear-icon` | 自定义清除图标内容 | - |
| `extra` | 面板额外内容，渲染在预设和底部区域之前 | - |
| `date-cell` | 自定义日期单元格内容 | `{ cell: CalendarCell }` |
| `footer` | 自定义底部区域内容 | - |

### Expose

当前实现未暴露公开实例方法或属性。

### 类型导出

| 类型 | 说明 |
| --- | --- |
| `YhDatePickerProps` | 组件 Props 类型 |
| `YhDatePickerEmits` | 组件 Emits 类型声明 |
| `YhDatePickerSlots` | 组件 Slots 类型声明 |
| `YhDatePickerPreset` | 预设项类型 |
| `YhDatePickerValue` | 单值类型 |
| `YhDatePickerRangeValue` | 范围值类型 |
| `YhDatePickerPanelView` | 面板视图类型 |
| `YhDatePickerInstance` | 组件实例类型 |

### 主题变量

`YhDatePicker` 在样式中实际消费以下组件级 CSS 变量，同时支持 `themeOverrides` 覆盖。

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-date-picker-width` | 默认宽度 | `220px` |
| `--yh-date-picker-range-width` | 范围模式宽度 | `400px` |
| `--yh-date-picker-primary` | 主色 | `var(--yh-color-primary)` |
| `--yh-date-picker-primary-rgb` | 主色 RGB 令牌 | `var(--yh-color-primary-rgb)` |
| `--yh-date-picker-text-main` | 主文本颜色 | `var(--yh-text-color-primary)` |
| `--yh-date-picker-text-secondary` | 次文本颜色 | `var(--yh-text-color-secondary)` |
| `--yh-date-picker-border` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-date-picker-panel-shadow` | 面板阴影 | `var(--yh-shadow-lg)` |
| `--yh-date-picker-item-hover` | 悬停背景色 | `var(--yh-fill-color-light)` |
| `--yh-date-picker-range-bg` | 范围选中背景色 | `var(--yh-color-primary-light-9)` |
| `--yh-date-picker-panel-width` | 面板宽度 | `380px` |
| `--yh-date-picker-panel-bg` | 面板背景色 | `var(--yh-bg-color-overlay)` |
| `--yh-date-picker-hover-bg` | 悬停态背景色 | `var(--yh-date-picker-item-hover)` |
| `--yh-date-picker-active-bg` | 激活单元格背景色 | `var(--yh-date-picker-primary)` |
| `--yh-date-picker-active-color` | 激活单元格文字颜色 | `var(--yh-color-white)` |

<style scoped>
.demo-showcase {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.demo-ctrl {
  background: var(--yh-fill-color-light);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.ctrl-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ctrl-row .label {
  font-size: 13px;
  font-weight: 600;
  color: var(--yh-text-color-secondary);
  min-width: 96px;
}

.demo-viewport {
  padding: 40px;
  background: var(--yh-fill-color-extra-light);
  border-radius: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.02);
}

.demo-result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fff;
  border-radius: 50px;
  border: 1px solid var(--yh-border-color-lighter);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.demo-result .dot {
  width: 8px;
  height: 8px;
  background: var(--yh-color-primary);
  border-radius: 50%;
  animation: blink 2s infinite;
}

.demo-result .label {
  color: var(--yh-text-color-secondary);
  font-size: 14px;
  font-weight: 500;
}

.demo-result .val {
  color: var(--yh-color-primary);
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
}

.yh-demo-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.yh-demo-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 440px;
}

@keyframes blink {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

:deep(.is-holiday) {
  color: var(--yh-color-danger) !important;
  font-weight: 700;
}

:deep(.is-solar-term) {
  color: #0ea5e9 !important;
}
</style>
