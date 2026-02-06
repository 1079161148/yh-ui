# Calendar 日历

为用户提供导航、查看日期或记录日程的功能。支持假期显示、日期范围选择、多选、周数显示等高级特性。

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(new Date())
const holidayValue = ref(new Date())
const readonlyValue = ref(new Date())
const nuxtValue = ref(new Date())
const rangeValue = ref<[Date | undefined, Date | undefined]>([undefined, undefined])
const multipleValue = ref<Date[]>([])

// 基础用法示例
const tsBasic = `<template>
  <yh-calendar v-model="value" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

// 假期显示示例
const tsHoliday = `<template>
  <yh-calendar v-model="value" show-holiday />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
<\/script>`

const jsHoliday = tsHoliday.replace('lang="ts"', '')

// 自定义内容示例
const tsCustom = `<template>
  <yh-calendar>
    <template #date-cell="{ data }">
      <div v-if="hasEvent(data.day)" class="event-dot"></div>
      <div v-if="getMemo(data.day)" class="memo-text">
        {{ getMemo(data.day) }}
      </div>
    </template>
  </yh-calendar>
<\/template>

<script setup lang="ts">
const events = ['2026-02-14', '2026-02-20', '2026-03-08']
const memos: Record<string, string> = {
  '2026-02-14': '情人节',
  '2026-02-20': '会议',
  '2026-03-08': '妇女节',
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

const jsCustom = tsCustom.replace('lang="ts"', '')
  .replace(': Record<string, string>', '')
  .replace(/\(day: string\)/g, '(day)')

// 日期范围限制示例
const tsRange = `<template>
  <yh-calendar
    :min-date="minDate"
    :max-date="maxDate"
  />
<\/template>

<script setup lang="ts">
// 限制只能选择 2026年2月 的日期
const minDate = new Date(2026, 1, 1)  // 2026-02-01
const maxDate = new Date(2026, 1, 28) // 2026-02-28
<\/script>`

const jsRange = tsRange.replace('lang="ts"', '')

// 只读模式示例
const tsReadonly = `<template>
  <yh-calendar v-model="value" readonly />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
<\/script>`

const jsReadonly = tsReadonly.replace('lang="ts"', '')

// 范围选择示例
const tsRangeSelect = `<template>
  <div>
    <yh-calendar
      selection-mode="range"
      v-model:range-value="rangeValue"
    />
    <p style="margin-top: 12px; color: #64748b;">
      已选择：{{ formatRange }}
    </p>
  </div>
<\/template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const rangeValue = ref<[Date | undefined, Date | undefined]>([undefined, undefined])

const formatRange = computed(() => {
  if (!rangeValue.value[0]) return "请选择起始日期"
  if (!rangeValue.value[1]) return dayjs(rangeValue.value[0]).format("YYYY-MM-DD") + " ~ 请选择结束日期"
  return dayjs(rangeValue.value[0]).format("YYYY-MM-DD") + " ~ " + dayjs(rangeValue.value[1]).format("YYYY-MM-DD")
})
<\/script>`

const jsRangeSelect = tsRangeSelect.replace('lang="ts"', '')
  .replace(/<\[Date \| undefined, Date \| undefined\]>/g, '')

// 显示周数示例
const tsWeekNumber = `<template>
  <yh-calendar show-week-number />
<\/template>`

const jsWeekNumber = tsWeekNumber

// 全屏模式示例
const tsFullscreen = `<template>
  <div style="height: 600px;">
    <yh-calendar fullscreen show-holiday />
  </div>
<\/template>`

const jsFullscreen = tsFullscreen

// 尺寸示例
const tsSizes = `<template>
  <div class="size-demo">
    <p>Small 尺寸</p>
    <yh-calendar size="small" />
    
    <p>Default 尺寸</p>
    <yh-calendar size="default" />
    
    <p>Large 尺寸</p>
    <yh-calendar size="large" />
  </div>
<\/template>

<style scoped>
.size-demo {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.size-demo p {
  margin-bottom: 12px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
}
<\/style>`

const jsSizes = tsSizes

// 禁用指定日期示例
const tsDisabledDate = `<template>
  <yh-calendar :disabled-date="disabledDate" />
<\/template>

<script setup lang="ts">
// 禁用所有周末
const disabledDate = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
<\/script>`

const jsDisabledDate = tsDisabledDate.replace('lang="ts"', '')
  .replace(/\(date: Date\)/g, '(date)')

// Nuxt 使用示例
const tsNuxt = `<template>
  <yh-calendar v-model="value" show-holiday />
<\/template>

<script setup lang="ts">
// 在 Nuxt 中无需导入，直接使用
const value = ref(new Date())
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// --- 预览用数据 (保持不变) ---
const events = ['2026-02-14', '2026-02-20', '2026-03-08']
const memos: Record<string, string> = {
  '2026-02-14': '情人节',
  '2026-02-20': '会议',
  '2026-03-08': '妇女节',
}
const hasEvent = (day: string) => events.includes(day)
const getMemo = (day: string) => memos[day]
const minDate = new Date(2026, 1, 1)
const maxDate = new Date(2026, 1, 28)
const disabledDate = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

// --- 高级用法：日程管理数据 ---
const schedules = [
  { id: 1, date: '2026-02-06', content: '项目评审会议', type: 'warning' },
  { id: 2, date: '2026-02-06', content: '代码合并 PR', type: 'success' },
  { id: 3, date: '2026-02-14', content: '情人节聚餐', type: 'danger' },
  { id: 4, date: '2026-02-20', content: 'YH-UI 发布会', type: 'info' }
];
const getSchedules = (day: string) => schedules.filter(s => s.date === day);

const tsSchedule = `<template>
  <yh-calendar show-holiday>
    <template #date-cell="{ data }">
      <div class="custom-day-cell">
        <div v-for="item in getSchedules(data.day)" :key="item.id" 
             :class="['schedule-tag', item.type]">
          <span class="dot"></span>
          <span class="text">{{ item.content }}</span>
        </div>
      </div>
    </template>
  </yh-calendar>
<\/template>

<script setup lang="ts">
const schedules = [
  { id: 1, date: '2026-02-06', content: '项目评审会议', type: 'warning' },
  { id: 2, date: '2026-02-06', content: '代码合并 PR', type: 'success' },
  { id: 3, date: '2026-02-14', content: '情人节聚餐', type: 'danger' },
  { id: 4, date: '2026-02-20', content: 'YH-UI 发布会', type: 'info' }
];
const getSchedules = (day: string) => schedules.filter(s => s.date === day);
<\/script>

<style scoped>
.custom-day-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px;
  overflow: hidden;
  margin-top: 14px;
}
.schedule-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  background: rgba(0, 0, 0, 0.03);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.warning {
  background: #fff7ed;
  color: #ea580c;
  .dot { background: #ea580c; }
}
.success {
  background: #f0fdf4;
  color: #16a34a;
  .dot { background: #16a34a; }
}
.danger {
  background: #fef2f2;
  color: #dc2626;
  .dot { background: #dc2626; }
}
.info {
  background: #eff6ff;
  color: #2563eb;
  .dot { background: #2563eb; }
}
<\/style>`

const jsSchedule = tsSchedule.replace('lang="ts"', '')
  .replace(/\(day: string\)/g, '(day)')

// --- 高级用法：会议室预约数据 ---
const bookingRange = ref(['2026-02-08', '2026-02-12']);
const occupiedDates = ['2026-02-14', '2026-02-15', '2026-02-18'];
const isOccupied = (date: any) => occupiedDates.includes(dayjs(date).format('YYYY-MM-DD'));

const tsBooking = `<template>
  <yh-calendar
    selection-mode="range"
    v-model:range-value="dateRange"
    :disabled-date="isOccupied"
  >
    <template #date-cell="{ data }">
      <div v-if="isOccupied(data.day)" class="occupied-mask">
        <span class="occupied-label">已占满</span>
      </div>
    </template>
  </yh-calendar>
<\/template>

<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
const dateRange = ref(['2026-02-08', '2026-02-12']);
const occupiedDates = ['2026-02-14', '2026-02-15', '2026-02-18'];
const isOccupied = (date: Date) => {
  const str = dayjs(date).format('YYYY-MM-DD');
  return occupiedDates.includes(str);
};
<\/script>

<style scoped>
.occupied-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  pointer-events: none;
}
.occupied-label {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 10px;
}
<\/style>`

const jsBooking = tsBooking.replace('lang="ts"', '')
  .replace(/\(date: Date\)/g, '(date)')
</script>

## 基础用法

设置 `v-model` 来指定当前选中的日期，默认为今天。日历采用现代化设计，具有精美的动画效果和交互体验。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-calendar v-model="value" />
</DemoBlock>

## 假期显示

设置 `show-holiday` 开启中国法定节假日显示。假期会显示 "休" 标记，补班日显示 "班" 标记。

<DemoBlock title="假期显示" :ts-code="tsHoliday" :js-code="jsHoliday">
  <yh-calendar v-model="holidayValue" show-holiday />
</DemoBlock>

## 自定义内容

通过具名插槽 `date-cell` 来自定义日历单元格显示的内容。作用域参数 `data` 包含了丰富的日期信息。

<DemoBlock title="自定义内容" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-calendar>
    <template #date-cell="{ data }">
      <div v-if="hasEvent(data.day)" class="event-dot"></div>
      <div v-if="getMemo(data.day)" class="memo-text">
        {{ getMemo(data.day) }}
      </div>
    </template>
  </yh-calendar>
</DemoBlock>

## 日期范围限制

通过 `min-date` 和 `max-date` 限制可选择的日期范围。超出范围的日期将被禁用。

<DemoBlock title="日期范围限制" :ts-code="tsRange" :js-code="jsRange">
  <yh-calendar :min-date="minDate" :max-date="maxDate" />
</DemoBlock>

## 只读模式

设置 `readonly` 属性使日历进入只读模式，用户将无法选择日期。

<DemoBlock title="只读模式" :ts-code="tsReadonly" :js-code="jsReadonly">
  <yh-calendar v-model="readonlyValue" readonly />
</DemoBlock>

## 范围选择

设置 `selection-mode="range"` 开启日期范围选择模式，配合 `v-model:range-value` 使用。

<DemoBlock title="范围选择" :ts-code="tsRangeSelect" :js-code="jsRangeSelect">
  <div>
    <yh-calendar selection-mode="range" v-model:range-value="rangeValue" />
    <p style="margin-top: 12px; color: #64748b; font-size: 14px;">
      已选择：{{ rangeValue[0] && rangeValue[1] ? `${rangeValue[0].toLocaleDateString()} ~ ${rangeValue[1].toLocaleDateString()}` : '请选择日期范围' }}
    </p>
  </div>
</DemoBlock>

## 显示周数

设置 `show-week-number` 在日历左侧显示 ISO 周数。

<DemoBlock title="显示周数" :ts-code="tsWeekNumber" :js-code="jsWeekNumber">
  <yh-calendar show-week-number />
</DemoBlock>

## 禁用指定日期

通过 `disabled-date` 函数自定义禁用逻辑。以下示例禁用了所有周末。

<DemoBlock title="禁用指定日期" :ts-code="tsDisabledDate" :js-code="jsDisabledDate">
  <yh-calendar :disabled-date="disabledDate" />
</DemoBlock>

## 全屏模式

设置 `fullscreen` 使日历占满父容器高度，适合用于日程管理页面。

<DemoBlock title="全屏模式" :ts-code="tsFullscreen" :js-code="jsFullscreen">
  <div style="height: 600px; border-radius: 16px; overflow: hidden;">
    <yh-calendar fullscreen show-holiday />
  </div>
</DemoBlock>

## 尺寸

提供 `small`、`default`、`large` 三种尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin-bottom: 12px; color: #64748b; font-size: 13px; font-weight: 500;">Small 尺寸</p>
      <yh-calendar size="small" />
    </div>
    <div>
      <p style="margin-bottom: 12px; color: #64748b; font-size: 13px; font-weight: 500;">Default 尺寸（默认）</p>
      <yh-calendar />
    </div>
    <div>
      <p style="margin-bottom: 12px; color: #64748b; font-size: 13px; font-weight: 500;">Large 尺寸</p>
      <yh-calendar size="large" />
    </div>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Calendar 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-calendar v-model="nuxtValue" show-holiday />
</DemoBlock>

**SSR 注意事项**：

- ✅ 基础渲染和矩阵计算完全支持 SSR
- ✅ 假期数据在服务端完成计算
- ✅ 插槽内容在服务端生成，Hydration 表现优异
- ⚠️ 范围选择的 hover 效果为客户端行为

::: tip SSR 性能
Calendar 内部采用静态日期缓存逻辑，即使在 SSR 环境下频繁刷新，内存占用也极低。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值（单选模式） | `Date` | — |
| default-value | 默认选中的日期 | `Date` | — |
| mode | 视图模式 | `'month' \| 'year'` | `'month'` |
| first-day-of-week | 每周的第一天（1-7，1为周一） | `number` | `7` (周日) |
| min-date | 可选择的最小日期 | `Date` | — |
| max-date | 可选择的最大日期 | `Date` | — |
| readonly | 是否只读 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| disabled-date | 自定义禁用日期函数 | `(date: Date) => boolean` | — |
| show-holiday | 是否显示节假日标记 | `boolean` | `false` |
| holidays | 自定义假期数据 | `HolidayMap` | `{}` |
| show-week-number | 是否显示周数 | `boolean` | `false` |
| fullscreen | 是否全屏模式（占满容器） | `boolean` | `false` |
| selection-mode | 选择模式 | `'single' \| 'range' \| 'multiple'` | `'single'` |
| range-value | 范围选择值 | `[Date?, Date?]` | — |
| multiple-value | 多选值 | `Date[]` | `[]` |
| show-other-months | 是否显示非当月日期 | `boolean` | `true` |
| highlight-weekends | 是否高亮周末 | `boolean` | `true` |
| size | 日历尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| cell-class-name | 单元格自定义类名函数 | `(date: Date) => string \| string[] \| object` | — |
| month-header-format | 标题格式化 | `string` | `'YYYY 年 MM 月'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中日期发生变化时触发 | `(date: Date) => void` |
| select | 点击日期单元格时触发 | `(date: Date, cell: CalendarDateCell) => void` |
| panel-change | 面板显示的年月或模式发生变化时触发 | `(date: Date, mode: 'month' | 'year') => void` |
| range-change | 范围选择完成时触发 | `(range: [Date, Date]) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| header | 自定义日历头部 | `{ date: string }` |
| date-cell | 自定义日期单元格内容 | `{ data: CalendarDateCell }` |
| footer | 自定义日历底部 | — |

### Expose

通过 ref 可以访问到组件内部暴露的方法和属性：

| 方法/属性名 | 说明 | 类型 |
| --- | --- | --- |
| displayDate | 当前显示的视口日期对象 (Dayjs) | `Ref<Dayjs>` |
| selectedDate | 当前选中的日期（单选模式, Dayjs） | `Ref<Dayjs | undefined>` |
| moveMonth | 切换月份 (参数 delta 为 1 或 -1) | `(delta: number) => void` |
| goToday | 组件跳转至今天 | `() => void` |
| selectDate | 手动选中某个日期单元格 | `(cell: CalendarDateCell) => void` |

### CalendarDateCell 类型

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| day | 格式化的日期字符串（YYYY-MM-DD） | `string` |
| date | 原始 Date 对象 | `Date` |
| type | 日期类型 | `'prev-month' \| 'current-month' \| 'next-month'` |
| isSelected | 是否选中 | `boolean` |
| isToday | 是否今天 | `boolean` |
| isDisabled | 是否禁用 | `boolean` |
| isWeekend | 是否周末 | `boolean` |
| isHoliday | 是否假期 | `boolean` |
| holidayName | 假期名称 | `string \| undefined` |
| isWorkday | 是否补班日 | `boolean` |
| isInRange | 是否在范围内 | `boolean` |
| isRangeStart | 是否范围起始 | `boolean` |
| isRangeEnd | 是否范围结束 | `boolean` |

### HolidayMap 类型

```typescript
type HolidayMap = Record<string, {
  name: string      // 假期名称
  isOffDay: boolean // true=放假, false=补班
}>
```


## 主题变量

Calendar 组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-calendar-bg` | 日历基础背景 | `var(--yh-bg-color)` |
| `--yh-calendar-text` | 默认文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-calendar-primary` | 选中/今天主题色 | `var(--yh-color-primary)` |
| `--yh-calendar-primary-light` | 范围/悬浮背景色 | `var(--yh-color-primary-light-9)` |
| `--yh-calendar-primary-dark` | 选中悬浮加深色 | `var(--yh-color-primary-dark-2)` |
| `--yh-calendar-cell-height` | 单元格高度 | `100px` |
| `--yh-calendar-cell-radius` | 单元格圆角 | `14px` |
| `--yh-calendar-title-size` | 顶部标题字号 | `22px` |
| `--yh-calendar-weekday-color` | 星期表头颜色 | `#64748b` |
| `--yh-calendar-holiday-color` | 假期标记颜色 | `#ef4444` |
| `--yh-calendar-week-number-color` | 周数文字颜色 | `#94a3b8` |

## 样式兼容性说明

由于 Calendar 内部采用标准 `table` 布局，如果您在 **VitePress**、**Markdown** 或某些具有激进全局 Table 样式的后台系统中使用，可能因为全局样式的斑马纹（Zebra Line）或边框注入导致背景显示异常。

### 核心样式隔离

YH-UI 遵循**源码纯净原则**，组件 SCSS 中不包含任何针对特定文档环境的暴力 `!important` 补丁。如果您在自己的 Markdown 环境中发现背景消失或出现多余边距，可以尝试在项目中添加以下全局样式代码：

```css
/* 清理文档环境对日历表格的干扰 */
.your-container-class .yh-calendar__table,
.your-container-class .yh-calendar__table tr,
.your-container-class .yh-calendar__table td {
  background-color: transparent !important;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
```

::: tip 为什么使用 !important?
这是为了压制某些 Markdown 渲染器注入的高权重全局选择器（如 `.markdown-body table tr:nth-child(2n)`）。在普通的 Vue/Nuxt 业务项目中，您**无需**添加这些补丁。
:::

<style>
/* 仅用于文档站预览环境的补丁，不包含在组件库源码中 */
.vp-doc .yh-calendar__table, 
.markdown-body .yh-calendar__table {
  display: table !important; 
  width: 100% !important; 
  border-collapse: separate !important; 
  margin: 0 !important;
}

.vp-doc .yh-calendar__table tr, 
.vp-doc .yh-calendar__table td, 
.vp-doc .yh-calendar__table th {
  background-color: transparent !important; 
  border: none !important; 
  margin: 0 !important; 
  padding: 0 !important; 
  text-align: center !important; 
  vertical-align: middle !important;
}

.vp-doc .yh-calendar__table tr:nth-child(2n) { 
  background-color: transparent !important; 
}

/* 针对全屏模式在文档环境下的强制布局重写 */
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table {
  display: flex !important; 
  flex-direction: column !important; 
  height: 100% !important;
  min-height: 0 !important;
}

.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table thead { 
  display: flex !important; 
  flex-direction: column !important; 
  width: 100% !important; 
  flex: none !important;
}

.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table tbody { 
  display: flex !important; 
  flex-direction: column !important; 
  width: 100% !important; 
  flex: 1 !important; 
  min-height: 0 !important;
}

.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table tr { 
  display: flex !important; 
  flex-direction: row !important; 
  width: 100% !important; 
  flex: 1 !important;
  height: auto !important; 
  align-items: stretch !important;
  gap: 12px !important;
  margin: 0 !important;
}

.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table td { 
  display: flex !important; 
  flex: 1 !important; 
  align-items: stretch !important; 
  justify-content: center !important;
  height: auto !important; 
  padding: 0 !important;
  margin: 0 !important;
}

.yh-calendar.is-fullscreen .yh-calendar__day-inner {
  flex: 1 !important; 
  height: 100% !important;
  display: flex !important; 
  flex-direction: column !important;
  justify-content: center !important; /* 全屏下改为居中对齐，更显大气 */
  padding-top: 0 !important; /* 移除顶部固定间距 */
}

/* 强制覆盖全屏下的今日标志位置 */
.yh-calendar.is-fullscreen .is-today .yh-calendar__day-value::after {
  bottom: -4px !important;
}
</style>

## 高级用法示例

### 结合日程管理

展示如何在日历单元格中自定义内容，模拟真实的日程安排。

<DemoBlock title="结合日程管理" :ts-code="tsSchedule" :js-code="jsSchedule">
  <div class="calendar-demo-card">
    <yh-calendar show-holiday>
      <template #date-cell="{ data }">
        <div class="custom-day-cell">
          <div v-for="item in getSchedules(data.day)" :key="item.id" 
               :class="['schedule-tag', item.type]">
            <span class="dot"></span>
            <span class="text">{{ item.content }}</span>
          </div>
        </div>
      </template>
    </yh-calendar>
  </div>
</DemoBlock>

### 会议室预约系统

演示利用 `selection-mode="range"` 实现会议室预定逻辑，并限制不可选日期。

<DemoBlock title="会议室预约系统" :ts-code="tsBooking" :js-code="jsBooking">
  <div class="booking-container">
    <yh-calendar
      selection-mode="range"
      v-model:range-value="bookingRange"
      :disabled-date="isOccupied"
    >
      <template #date-cell="{ data }">
        <div v-if="isOccupied(data.day)" class="occupied-mask">
          <span class="label">已占满</span>
        </div>
      </template>
    </yh-calendar>
  </div>
</DemoBlock>

<style scoped>
/* 自定义内容示例样式 */
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

/* 预览样式同步 */
.custom-day-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px;
  overflow: hidden;
  margin-top: 14px;
}
.schedule-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  background: rgba(0, 0, 0, 0.03);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.warning { background: #fff7ed; color: #ea580c; .dot { background: #ea580c; } }
.success { background: #f0fdf4; color: #16a34a; .dot { background: #16a34a; } }
.danger { background: #fef2f2; color: #dc2626; .dot { background: #dc2626; } }
.info { background: #eff6ff; color: #2563eb; .dot { background: #2563eb; } }

.occupied-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  pointer-events: none;
}
.occupied-label {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 10px;
}
</style>
