# DatePicker 日期选择器

用于选择或输入日期的控件。支持日期、周、月、年、季度及其范围选择，具有极致的视觉美感与流畅的交互体验。

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import dayjs from 'dayjs'

// --- 状态数据 ---
const demoType = ref('date')
const demoShape = ref('round')
const demoValue = ref(null)
const demoTypes = [
  { value: 'date', label: '日期' },
  { value: 'datetime', label: '日期时间' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月' },
  { value: 'quarter', label: '季度' },
  { value: 'year', label: '年' },
  { value: 'daterange', label: '日期范围' },
  { value: 'monthrange', label: '月范围' }
]
watch(demoType, () => demoValue.value = null)

const d1 = ref(''), d2 = ref(''), d3 = ref('')
const d4 = ref('2026-01-24'), d5 = ref('2026-01-24')
const s1 = ref(''), s2 = ref(''), s3 = ref('')
const d6 = ref(null)
const d7 = ref(null)
const d8 = ref('')
const d9 = ref('')
const r1 = ref(null), r2 = ref(null)

const presets = [
  { label: '今天', value: new Date() },
  { label: '昨天', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: '一周前', value: () => dayjs().subtract(1, 'week').toDate() }
]

const disabledDate = (date: Date) => {
  return dayjs(date).isBefore(dayjs(), 'day')
}

const formatValue = (val, type) => {
  if (!val) return '未选择'
  const fmt = (v) => {
    const d = dayjs(v)
    if (!d.isValid()) return '...'
    if (type.includes('year')) return d.format('YYYY 年')
    if (type.includes('month')) return d.format('YYYY-MM')
    if (type.includes('quarter')) return `${d.year()} Q${Math.floor(d.month() / 3) + 1}`
    if (type === 'week') return d.format('YYYY 第 w 周')
    if (type.includes('datetime')) return d.format('YYYY-MM-DD HH:mm:ss')
    return d.format('YYYY-MM-DD')
  }
  return Array.isArray(val) ? `${fmt(val[0])} 至 ${fmt(val[1])}` : fmt(val)
}

// --- 代码片段定义 ---
const showcaseTS = `<template>
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">选择模式:</span>
        <yh-radio-group v-model="type" size="small">
          <yh-radio-button v-for="t in types" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
      <div class="ctrl-row">
        <span class="label">单元格形状:</span>
        <yh-radio-group v-model="shape" size="small">
          <yh-radio-button value="round">圆形 (Round)</yh-radio-button>
          <yh-radio-button value="square">方形 (Square)</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="demo-viewport">
      <yh-date-picker :key="type + shape" v-model="value" :type="type" :cell-shape="shape" panel-only />
    </div>
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const type = ref('date')
const shape = ref('round')
const value = ref(null)
const types = [
  { value: 'date', label: '日期' },
  { value: 'datetime', label: '日期时间' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月' },
  { value: 'quarter', label: '季度' },
  { value: 'year', label: '年' },
  { value: 'daterange', label: '日期范围' },
  { value: 'monthrange', label: '月范围' }
]
<` + `/script>`

const baseTS = `<template>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="选择日期" />
    <yh-date-picker v-model="d2" type="month" placeholder="选择月份" />
    <yh-date-picker v-model="d3" type="year" placeholder="选择年份" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const d1 = ref('')
const d2 = ref('')
const d3 = ref('')
<` + `/script>`

const statusTS = `<template>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d4" disabled placeholder="禁用状态" />
    <yh-date-picker v-model="d5" readonly placeholder="只读状态" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const d4 = ref('2026-01-24')
const d5 = ref('2026-01-24')
<` + `/script>`

const sizeTS = `<template>
  <div class="yh-demo-row">
    <yh-date-picker v-model="s1" size="large" placeholder="Large 40px" />
    <yh-date-picker v-model="s2" placeholder="Default 32px" />
    <yh-date-picker v-model="s3" size="small" placeholder="Small 24px" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const s1 = ref('')
const s2 = ref('')
const s3 = ref('')
<` + `/script>`

const shapeTS = `<template>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="默认圆形" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="经典方形" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const d8 = ref('')
const d9 = ref('')
<` + `/script>`

const rangeTS = `<template>
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const r1 = ref(null)
const r2 = ref(null)
<` + `/script>`

const presetsTS = `<template>
  <yh-date-picker v-model="d6" :presets="presets" placeholder="点击查看预设" />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
const d6 = ref(null)
const presets = [
  { label: '今天', value: new Date() },
  { label: '昨天', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: '一周前', value: () => dayjs().subtract(1, 'week').toDate() }
]
<` + `/script>`

const disabledTS = `<template>
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="今天之前不可选" />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
const d7 = ref(null)
const disabledDate = (date: Date) => {
  return dayjs(date).isBefore(dayjs(), 'day')
}
<` + `/script>`

const customTS = `<template>
  <div class="yh-demo-column">
    <yh-date-picker v-model="dv1" placeholder="自定义清除图标">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z" /></svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH时mm分ss秒" placeholder="自定义时间格式" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="默认显示 2025-01" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const dv1 = ref(new Date())
const dv2 = ref(new Date())
const dv3 = ref(null)
const defaultDate = new Date(2025, 0, 1)
<` + `/script>`

const tsNuxt = `<template>
  <div class="yh-demo-row">
    <yh-date-picker v-model="date" placeholder="Nuxt SSR Support" />
  </div>
</template>

<` + `script setup lang="ts">
// 在 Nuxt 中无需 import，直接定义响应式数据即可
const date = ref('')
<` + `/script>`

const dv1 = ref(new Date())
const dv2 = ref(new Date())
const dv3 = ref(null)
const d10 = ref(null)
const defaultDate = new Date(2025, 0, 1)

// 自定义渲染逻辑演示
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

const renderTS = `<template>
  <yh-date-picker 
    v-model="value" 
    :cell-render="cellRender" 
    placeholder="渲染节日与节气" 
  />
</template>

<` + `script setup lang="ts">
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
<` + `/script>
<` + `style>
.is-holiday { color: var(--yh-color-danger); font-weight: bold; }
.is-solar-term { color: #0ea5e9; }
<` + `/style>`

</script>

## 展示模式

DatePicker 支持多种时间单位的面板直接展示，这种模式常用于自定义布局或仪表盘中。

<DemoBlock title="全功能展示" :ts-code="showcaseTS">
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">选择模式:</span>
        <yh-radio-group v-model="demoType" size="small">
          <yh-radio-button v-for="t in demoTypes" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
      <div class="ctrl-row">
        <span class="label">单元格形状:</span>
        <yh-radio-group v-model="demoShape" size="small">
          <yh-radio-button value="round">圆形 (Round)</yh-radio-button>
          <yh-radio-button value="square">方形 (Square)</yh-radio-button>
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

通过 `type` 属性，可以快捷切换日期、月份、年份的选择模式。

<DemoBlock title="基础用法" :ts-code="baseTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="选择日期" />
    <yh-date-picker v-model="d2" type="month" placeholder="选择月份" />
    <yh-date-picker v-model="d3" type="year" placeholder="选择年份" />
  </div>
</DemoBlock>

## 高级配置

DatePicker 提供了丰富的属性来满足精细化的定制需求，如自定义图标、特殊显示格式等。

<DemoBlock title="高级配置项" :ts-code="customTS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="dv1" placeholder="自定义清除图标">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z"/></svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH时mm分ss秒" placeholder="自定义时间格式" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="默认显示 2025-01" />
  </div>
</DemoBlock>

## 单元格形状

外观样式不仅支持现代感十足的圆形（默认），还支持经典稳重的方形。

<DemoBlock title="形状切换" :ts-code="shapeTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="默认圆形" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="经典方形" />
  </div>
</DemoBlock>

## 自定义单元格内容

通过 `cell-render` 属性或 `date-cell` 插槽，可以自定义日期单元格的显示内容，例如添加农历、节日、节气或业务标记。

<DemoBlock title="节日与节气" :ts-code="renderTS">
  <div class="yh-demo-row">
    <yh-date-picker 
      v-model="d10" 
      :cell-render="cellRender" 
      placeholder="渲染节日与节气" 
      style="width: 280px"
    />
  </div>
</DemoBlock>

## 禁用与只读

使用 `disabled` 属性禁用组件，使用 `readonly` 属性设置为只读。

<DemoBlock title="状态演示" :ts-code="statusTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d4" disabled placeholder="禁用状态" />
    <yh-date-picker v-model="d5" readonly placeholder="只读状态" />
  </div>
</DemoBlock>

## 不同的尺寸

组件提供了 `large`、`default`、`small` 三种尺寸，以适应不同的页面空间。

<DemoBlock title="尺寸演示" :ts-code="sizeTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="s1" size="large" placeholder="Large 36px" />
    <yh-date-picker v-model="s2" placeholder="Default 32px" />
    <yh-date-picker v-model="s3" size="small" placeholder="Small 28px" />
  </div>
</DemoBlock>

## 快捷预设

通过 `presets` 属性可以配置快捷选项，极大提升用户选择效率。

<DemoBlock title="快捷选项" :ts-code="presetsTS">
  <yh-date-picker v-model="d6" :presets="presets" placeholder="点击查看预设" />
</DemoBlock>

## 禁用特定日期

通过 `disabled-date` 函数可以自定义哪些日期不可被选择。

<DemoBlock title="日期过滤" :ts-code="disabledTS">
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="今天之前不可选" />
</DemoBlock>

## 范围选择

设置 `type` 为 `*range` 即可开启范围选择模式。

<DemoBlock title="范围模式" :ts-code="rangeTS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

DatePicker 组件完美支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件及其依赖（如样式、Hooks）会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="Nuxt SSR Support" />
  </div>
</DemoBlock>

::: tip SSR 说明
DatePicker 内部已对 Hydration 进行了优化，确保在 SSR 场景下服务端与客户端生成的 DOM 结构完全一致。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / model-value | 绑定值 | `Date \| string \| number \| Array` | — |
| type | 显示类型 | `DatePickerType` | `'date'` |
| cell-shape | 单元格形状 | `'round' \| 'square'` | `'round'` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `true` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | 非范围选择时的占位内容 | `string` | `'请选择日期'` |
| start-placeholder | 范围选择时的开始占位内容 | `string` | `'开始日期'` |
| end-placeholder | 范围选择时的结束占位内容 | `string` | `'结束日期'` |
| format | 显示在输入框中的格式 | `string` | — |
| value-format | 绑定值的格式 | `string` | — |
| date-format | 面板显示的日期格式 | `string` | `'YYYY-MM-DD'` |
| time-format | 面板显示的时间格式 | `string` | `'HH:mm:ss'` |
| range-separator | 选择范围时的分隔符 | `string` | `'-'` |
| first-day-of-week | 第一天是星期几 (1-7) | `number` | `7` |
| disabled-date | 禁用日期函数 | `(date: Date) => boolean` | — |
| presets | 快捷选项 | `DatePickerPreset[]` | `[]` |
| preset-position | 快捷选项的位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'bottom'` |
| show-footer | 是否显示底部操作栏 | `boolean` | `true` |
| status | 输入框状态 | `'success' \| 'warning' \| 'error'` | — |
| order-on-confirm | 范围选择时是否自动排序 | `boolean` | `false` |
| prefix-icon | 自定义前缀图标 | `string \| Component` | — |
| clear-icon | 自定义清除图标 | `string \| Component` | — |
| default-value | 选择器打开时默认显示的日期 | `Date \| Date[]` | — |
| default-time | 默认时间（datetime 模式下） | `Date \| Date[]` | — |
| panel-only | 是否内联显示（只显示面板） | `boolean` | `false` |
| cell-render | 自定义单元格渲染函数 | `(date: Date) => string \| { text: string; className?: string }` | — |
| teleported | 是否将面板插入到 body | `boolean` | `true` |
| popper-class | 下拉框类名 | `string` | — |
| validate-event | 是否触发表单验证 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `(value: DateValue \| DateRangeValue) => void` |
| change | 值改变时触发 | `(value: DateValue \| DateRangeValue) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清空按钮时触发 | `() => void` |
| confirm | 点击确认按钮时触发 | `(value: DateValue \| DateRangeValue) => void` |
| panel-change | 面板视图切换时触发 | `(value: Date, mode: PanelView) => void` |
| visible-change | 面板显示/隐藏时触发 | `(visible: boolean) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix-icon | 自定义输入框前缀图标 |
| clear-icon | 自定义清除图标 |
| extra | 面板中的额外内容 |
| date-cell | 自定义日期单元格 (Scope: `{ cell: CalendarCell }`) |
| footer | 自定义底部区域 |

## 主题变量

所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-date-picker-width` | 普通输入框宽度 | `220px` |
| `--yh-date-picker-range-width` | 范围输入框宽度 | `400px` |
| `--yh-date-picker-primary` | 主题主颜色 | `var(--yh-color-primary)` |
| `--yh-date-picker-text-main` | 主要文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-date-picker-text-secondary` | 次要文字颜色 | `var(--yh-text-color-secondary)` |
| `--yh-date-picker-border` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-date-picker-panel-width` | 面板物理宽度 | `380px` |
| `--yh-date-picker-panel-bg` | 面板背景颜色 | `var(--yh-bg-color-overlay)` |
| `--yh-date-picker-panel-shadow` | 面板阴影 | `var(--yh-shadow-lg)` |
| `--yh-date-picker-item-hover` | 悬停背景颜色 | `var(--yh-fill-color-light)` |
| `--yh-date-picker-range-bg` | 范围选择背景 | `var(--yh-color-primary-light-9)` |

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
.ctrl-row { display: flex; align-items: center; gap: 12px; }
.ctrl-row .label { font-size: 13px; font-weight: 600; color: var(--yh-text-color-secondary); min-width: 80px; }

.demo-viewport {
  padding: 40px;
  background: var(--yh-fill-color-extra-light);
  border-radius: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);
}
.demo-result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fff;
  border-radius: 50px;
  border: 1px solid var(--yh-border-color-lighter);
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}
.demo-result .dot { width: 8px; height: 8px; background: var(--yh-color-primary); border-radius: 50%; animation: blink 2s infinite; }
.demo-result .label { color: var(--yh-text-color-secondary); font-size: 14px; font-weight: 500; }
.demo-result .val { color: var(--yh-color-primary); font-weight: 700; font-family: 'JetBrains Mono', monospace; }

.yh-demo-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
.yh-demo-column { display: flex; flex-direction: column; gap: 16px; width: 440px; }

@keyframes blink { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

/* 自定义渲染样式穿透 */
:deep(.is-holiday) {
  color: var(--yh-color-danger) !important;
  font-weight: bold;
}
:deep(.is-solar-term) {
  color: #0ea5e9 !important;
}
</style>
