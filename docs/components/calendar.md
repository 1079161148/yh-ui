# Calendar 日历

用于展示月视图日历，支持假日标记、范围选择、多选、自定义单元格内容以及组件级主题覆盖。

<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(new Date())
const holidayValue = ref(new Date())
const readonlyValue = ref(new Date())
const nuxtValue = ref(new Date())
const rangeValue = ref<[Date | undefined, Date | undefined]>([undefined, undefined])
const multipleValue = ref<Date[]>([])

const events = ['2026-02-14', '2026-02-20', '2026-03-08']
const memos: Record<string, string> = {
  '2026-02-14': '情人节',
  '2026-02-20': '项目评审',
  '2026-03-08': '妇女节'
}

const hasEvent = (day: string) => events.includes(day)
const getMemo = (day: string) => memos[day]

const minDate = new Date(2026, 1, 1)
const maxDate = new Date(2026, 1, 28)

const disabledDate = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

const rangeText = computed(() => {
  if (!rangeValue.value[0]) return '请选择开始日期'
  if (!rangeValue.value[1]) return `${dayjs(rangeValue.value[0]).format('YYYY-MM-DD')} ~ 请选择结束日期`
  return `${dayjs(rangeValue.value[0]).format('YYYY-MM-DD')} ~ ${dayjs(rangeValue.value[1]).format('YYYY-MM-DD')}`
})

const tsBasic = `<template>
  <yh-calendar v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(new Date())
<\/script>`

const tsHoliday = `<template>
  <yh-calendar v-model="value" show-holiday />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(new Date())
<\/script>`

const tsCustom = `<template>
  <yh-calendar>
    <template #date-cell="{ data }">
      <div v-if="hasEvent(data.day)" class="event-dot"></div>
      <div v-if="getMemo(data.day)" class="memo-text">
        {{ getMemo(data.day) }}
      </div>
    </template>
  </yh-calendar>
</template>

<script setup lang="ts">
const events = ['2026-02-14', '2026-02-20', '2026-03-08']
const memos: Record<string, string> = {
  '2026-02-14': '情人节',
  '2026-02-20': '项目评审',
  '2026-03-08': '妇女节'
}

const hasEvent = (day: string) => events.includes(day)
const getMemo = (day: string) => memos[day]
<\/script>

<style scoped>
.event-dot {
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  border-radius: 50%;
  margin-bottom: 4px;
}

.memo-text {
  font-size: 11px;
  color: #64748b;
  background: rgba(99, 102, 241, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
<\/style>`

const tsRange = `<template>
  <div>
    <yh-calendar selection-mode="range" v-model:range-value="rangeValue" />
    <p style="margin-top: 12px; color: #64748b;">
      {{ rangeText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const rangeValue = ref<[Date | undefined, Date | undefined]>([undefined, undefined])

const rangeText = computed(() => {
  if (!rangeValue.value[0]) return '请选择开始日期'
  if (!rangeValue.value[1]) return \`\${dayjs(rangeValue.value[0]).format('YYYY-MM-DD')} ~ 请选择结束日期\`
  return \`\${dayjs(rangeValue.value[0]).format('YYYY-MM-DD')} ~ \${dayjs(rangeValue.value[1]).format('YYYY-MM-DD')}\`
})
<\/script>`

const tsMultiple = `<template>
  <yh-calendar selection-mode="multiple" v-model:multiple-value="multipleValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const multipleValue = ref<Date[]>([])
<\/script>`

const tsDisabled = `<template>
  <yh-calendar :min-date="minDate" :max-date="maxDate" :disabled-date="disabledDate" />
</template>

<script setup lang="ts">
const minDate = new Date(2026, 1, 1)
const maxDate = new Date(2026, 1, 28)

const disabledDate = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
<\/script>`

const tsWeek = `<template>
  <yh-calendar show-week-number />
</template>`

const tsSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <yh-calendar size="small" />
    <yh-calendar />
    <yh-calendar size="large" />
  </div>
</template>`

const tsReadonly = `<template>
  <yh-calendar v-model="value" readonly />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(new Date())
<\/script>`

const tsNuxt = `<template>
  <yh-calendar v-model="value" show-holiday />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(new Date())
<\/script>`

const toJs = (code: string) =>
  code
    .replace(/ lang="ts"/g, '')
    .replace(/: Record<string, string>/g, '')
    .replace(/<\[Date \| undefined, Date \| undefined\]>/g, '')
    .replace(/<Date\[]>/g, '')
    .replace(/\(day: string\)/g, '(day)')
    .replace(/\(date: Date\)/g, '(date)')

const jsBasic = toJs(tsBasic)
const jsHoliday = toJs(tsHoliday)
const jsCustom = toJs(tsCustom)
const jsRange = toJs(tsRange)
const jsMultiple = toJs(tsMultiple)
const jsDisabled = toJs(tsDisabled)
const jsWeek = toJs(tsWeek)
const jsSizes = toJs(tsSizes)
const jsReadonly = toJs(tsReadonly)
const jsNuxt = toJs(tsNuxt)
</script>

## 基础用法

通过 `v-model` 绑定当前选中的日期。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-calendar v-model="value" />
</DemoBlock>

## 假日标记

开启 `show-holiday` 后，组件会合并内置的 2026 中国节假日数据与传入的 `holidays`。

<DemoBlock title="假日标记" :ts-code="tsHoliday" :js-code="jsHoliday">
  <yh-calendar v-model="holidayValue" show-holiday />
</DemoBlock>

## 自定义日期单元格

使用 `date-cell` 插槽可在日期格中追加业务标记。

<DemoBlock title="自定义日期单元格" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-calendar>
    <template #date-cell="{ data }">
      <div v-if="hasEvent(data.day)" class="event-dot"></div>
      <div v-if="getMemo(data.day)" class="memo-text">
        {{ getMemo(data.day) }}
      </div>
    </template>
  </yh-calendar>
</DemoBlock>

## 范围选择

设置 `selection-mode="range"` 后，通过 `v-model:range-value` 接收起止日期。

<DemoBlock title="范围选择" :ts-code="tsRange" :js-code="jsRange">
  <div>
    <yh-calendar selection-mode="range" v-model:range-value="rangeValue" />
    <p style="margin-top: 12px; color: #64748b;">{{ rangeText }}</p>
  </div>
</DemoBlock>

## 多选

设置 `selection-mode="multiple"` 后，通过 `v-model:multiple-value` 维护多选日期数组。

<DemoBlock title="多选" :ts-code="tsMultiple" :js-code="jsMultiple">
  <yh-calendar selection-mode="multiple" v-model:multiple-value="multipleValue" />
</DemoBlock>

## 日期限制

可以组合 `min-date`、`max-date` 与 `disabled-date` 实现可选范围限制。

<DemoBlock title="日期限制" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-calendar :min-date="minDate" :max-date="maxDate" :disabled-date="disabledDate" />
</DemoBlock>

## 周数与尺寸

日历支持显示周数，也支持 `small`、`default`、`large` 三种尺寸。

<DemoBlock title="显示周数" :ts-code="tsWeek" :js-code="jsWeek">
  <yh-calendar show-week-number />
</DemoBlock>

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <yh-calendar size="small" />
    <yh-calendar />
    <yh-calendar size="large" />
  </div>
</DemoBlock>

## 只读模式

设置 `readonly` 后仍会保留展示能力，但不会响应日期选择。

<DemoBlock title="只读模式" :ts-code="tsReadonly" :js-code="jsReadonly">
  <yh-calendar v-model="readonlyValue" readonly />
</DemoBlock>

## 在 Nuxt 中使用

安装 `@yh-ui/nuxt` 后可直接使用 `YhCalendar`。首屏静态日历、假日标记和插槽内容都可在 SSR 阶段正常输出，交互状态如范围悬停会在客户端激活后生效。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-calendar v-model="nuxtValue" show-holiday />
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / model-value | 单选模式下的绑定值 | `Date` | `undefined` |
| default-value | 默认选中日期 | `Date` | `undefined` |
| mode | 日历模式 | `'month' \| 'year'` | `'month'` |
| first-day-of-week | 每周起始日，`1` 为周一，`7` 为周日 | `number` | `7` |
| min-date | 最小可选日期 | `Date` | `undefined` |
| max-date | 最大可选日期 | `Date` | `undefined` |
| readonly | 是否只读 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| month-header-format | 自定义标题格式 | `string` | `undefined` |
| show-holiday | 是否显示假日与补班标记 | `boolean` | `false` |
| holidays | 自定义假日数据 | `HolidayMap` | `{}` |
| show-week-number | 是否显示周数 | `boolean` | `false` |
| fullscreen | 是否占满父容器高度 | `boolean` | `false` |
| selection-mode | 选择模式 | `'single' \| 'range' \| 'multiple'` | `'single'` |
| range-value | 范围选择值 | `[Date \| undefined, Date \| undefined]` | `undefined` |
| multiple-value | 多选值 | `Date[]` | `[]` |
| disabled-date | 自定义禁用日期判断 | `(date: Date) => boolean` | `undefined` |
| cell-class-name | 单元格自定义类名 | `(date: Date) => string \| string[] \| Record<string, boolean>` | `undefined` |
| show-other-months | 是否显示非当月日期 | `boolean` | `true` |
| highlight-weekends | 是否高亮周末 | `boolean` | `true` |
| size | 日历尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| theme-overrides | 组件主题覆盖变量 | `CalendarThemeVars` | `undefined` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 单选值变化时触发 | `(value: Date) => void` |
| update:rangeValue | 范围选择完成时触发 | `(value: [Date \| undefined, Date \| undefined]) => void` |
| update:multipleValue | 多选值变化时触发 | `(value: Date[]) => void` |
| change | 单选值变化时触发 | `(value: Date) => void` |
| panel-change | 面板月份变化时触发 | `(date: Date, mode: 'month' \| 'year') => void` |
| select | 选择日期单元格时触发 | `(date: Date, cell: CalendarDateCell) => void` |
| range-change | 范围选择完成时触发 | `(value: [Date \| undefined, Date \| undefined]) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| header | 自定义头部标题 | `{ date: string }` |
| date-cell | 自定义日期单元格内容 | `{ data: CalendarCellSlotData }` |
| footer | 自定义底部区域 | - |

`CalendarCellSlotData` 为运行时传入的插槽结构，包含以下字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| day | `string` | 格式化日期，如 `2026-02-14` |
| date | `Date` | 原生日期对象 |
| type | `'prev-month' \| 'current-month' \| 'next-month'` | 日期所属月份类型 |
| isSelected | `boolean` | 是否被选中 |
| isToday | `boolean` | 是否今天 |
| isDisabled | `boolean` | 是否禁用 |
| isWeekend | `boolean` | 是否周末 |
| isHoliday | `boolean` | 是否法定假日 |
| holidayName | `string \| undefined` | 假日名称 |
| isWorkday | `boolean` | 是否补班日 |
| isInRange | `boolean \| undefined` | 是否位于范围内部 |
| isRangeStart | `boolean \| undefined` | 是否为范围起点 |
| isRangeEnd | `boolean \| undefined` | 是否为范围终点 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| displayDate | 当前面板显示日期 | `Ref<Dayjs>` |
| selectedDate | 当前单选日期 | `Ref<Dayjs \| undefined>` |
| moveMonth | 切换月份 | `(delta: number) => void` |
| goToday | 跳转到今天 | `() => void` |
| selectDate | 手动选中某个日期单元格 | `(cell: CalendarDateCell) => void` |

### 类型导出

| 类型名 | 说明 |
| --- | --- |
| `YhCalendarProps` | 组件 Props 类型 |
| `YhCalendarEmits` | 组件 Emits 类型 |
| `YhCalendarSlots` | 组件 Slots 类型 |
| `YhCalendarExpose` | 组件 Expose 类型 |
| `YhCalendarDateCell` | 日期单元格类型 |
| `YhCalendarHolidayInfo` | 假日信息类型 |
| `YhCalendarHolidayMap` | 假日映射类型 |
| `YhCalendarRangeValue` | 范围选择值类型 |
| `YhCalendarMode` | 模式类型 |

### 主题变量

组件支持 `themeOverrides`，同时样式中实际消费以下 CSS 变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-calendar-primary` | 主色 | `var(--yh-color-primary)` |
| `--yh-calendar-primary-light` | 主色浅色背景 | `var(--yh-color-primary-light-9)` |
| `--yh-calendar-primary-dark` | 主色深色态 | `var(--yh-color-primary-dark-2)` |
| `--yh-calendar-bg` | 日历背景 | `var(--yh-bg-color)` |
| `--yh-calendar-text` | 主文字色 | `var(--yh-text-color-primary)` |
| `--yh-calendar-cell-height` | 日期格高度 | `100px` |
| `--yh-calendar-cell-radius` | 日期格圆角 | `var(--yh-radius-lg)` |
| `--yh-calendar-head-height` | 头部高度 | `80px` |
| `--yh-calendar-title-size` | 标题字号 | `22px` |
| `--yh-calendar-weekday-color` | 星期标题颜色 | `var(--yh-text-color-secondary)` |
| `--yh-calendar-week-number-color` | 周数字颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-calendar-holiday-color` | 假日标记颜色 | `var(--yh-color-danger)` |
| `--yh-calendar-disabled-bg` | 禁用态背景 | `var(--yh-fill-color-light)` |
| `--yh-calendar-disabled-text` | 禁用态文字色 | `var(--yh-text-color-placeholder)` |

`CalendarThemeVars` 对外暴露的组件级主题覆盖字段包括：
`headerBgColor`、`headerTextColor`、`titleFontSize`、`dayFontSize`、`dayTextColor`、`dayHoverBgColor`、`daySelectedBgColor`、`daySelectedTextColor`、`todayTextColor`、`weekendTextColor`。

<style scoped>
.event-dot {
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  border-radius: 50%;
  margin-bottom: 4px;
}

.memo-text {
  font-size: 11px;
  color: #64748b;
  background: rgba(99, 102, 241, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
