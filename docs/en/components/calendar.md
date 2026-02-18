# Calendar

Provides navigation, date viewing, and schedule recording functionality. Supports holiday display, date range selection, multi-select, week number display, and more.

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(new Date())
const holidayValue = ref(new Date())
const readonlyValue = ref(new Date())
const nuxtValue = ref(new Date())
const rangeValue = ref<[Date | undefined, Date | undefined]>([undefined, undefined])
const multipleValue = ref<Date[]>([])

// Basic usage example
const tsBasic = `<template>
  <yh-calendar v-model="value" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

// Holiday display example
const tsHoliday = `<template>
  <yh-calendar v-model="value" show-holiday />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
<\/script>`

const jsHoliday = tsHoliday.replace('lang="ts"', '')

// Custom content example
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
  '2026-02-14': "Valentine's Day",
  '2026-02-20': 'Meeting',
  '2026-03-08': "Women's Day",
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

// Date range restriction example
const tsRange = `<template>
  <yh-calendar
    :min-date="minDate"
    :max-date="maxDate"
  />
<\/template>

<script setup lang="ts">
// Restrict to Feb 2026 only
const minDate = new Date(2026, 1, 1)  // 2026-02-01
const maxDate = new Date(2026, 1, 28) // 2026-02-28
<\/script>`

const jsRange = tsRange.replace('lang="ts"', '')

// Readonly mode example
const tsReadonly = `<template>
  <yh-calendar v-model="value" readonly />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
<\/script>`

const jsReadonly = tsReadonly.replace('lang="ts"', '')

// Range selection example
const tsRangeSelect = `<template>
  <div>
    <yh-calendar
      selection-mode="range"
      v-model:range-value="rangeValue"
    />
    <p style="margin-top: 12px; color: #64748b;">
      Selected: {{ formatRange }}
    </p>
  </div>
<\/template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const rangeValue = ref<[Date | undefined, Date | undefined]>([undefined, undefined])

const formatRange = computed(() => {
  if (!rangeValue.value[0]) return "Please select a start date"
  if (!rangeValue.value[1]) return dayjs(rangeValue.value[0]).format("YYYY-MM-DD") + " ~ Please select an end date"
  return dayjs(rangeValue.value[0]).format("YYYY-MM-DD") + " ~ " + dayjs(rangeValue.value[1]).format("YYYY-MM-DD")
})
<\/script>`

const jsRangeSelect = tsRangeSelect.replace('lang="ts"', '')
  .replace(/<\[Date \| undefined, Date \| undefined\]>/g, '')

// Week number example
const tsWeekNumber = `<template>
  <yh-calendar show-week-number />
<\/template>`

const jsWeekNumber = tsWeekNumber

// Fullscreen example
const tsFullscreen = `<template>
  <div style="height: 600px;">
    <yh-calendar fullscreen show-holiday />
  </div>
<\/template>`

const jsFullscreen = tsFullscreen

// Size example
const tsSizes = `<template>
  <div class="size-demo">
    <p>Small Size</p>
    <yh-calendar size="small" />
    
    <p>Default Size</p>
    <yh-calendar size="default" />
    
    <p>Large Size</p>
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

// Disabled date example
const tsDisabledDate = `<template>
  <yh-calendar :disabled-date="disabledDate" />
<\/template>

<script setup lang="ts">
// Disable all weekends
const disabledDate = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
<\/script>`

const jsDisabledDate = tsDisabledDate.replace('lang="ts"', '')
  .replace(/\(date: Date\)/g, '(date)')

// Nuxt usage example
const tsNuxt = `<template>
  <yh-calendar v-model="value" show-holiday />
<\/template>

<script setup lang="ts">
// No import needed in Nuxt, use directly
const value = ref(new Date())
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// --- Preview data ---
const events = ['2026-02-14', '2026-02-20', '2026-03-08']
const memos: Record<string, string> = {
  '2026-02-14': "Valentine's Day",
  '2026-02-20': 'Meeting',
  '2026-03-08': "Women's Day",
}
const hasEvent = (day: string) => events.includes(day)
const getMemo = (day: string) => memos[day]
const minDate = new Date(2026, 1, 1)
const maxDate = new Date(2026, 1, 28)
const disabledDate = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

// --- Advanced: Schedule management data ---
const schedules = [
  { id: 1, date: '2026-02-06', content: 'Project Review Meeting', type: 'warning' },
  { id: 2, date: '2026-02-06', content: 'Code Merge PR', type: 'success' },
  { id: 3, date: '2026-02-14', content: "Valentine's Dinner", type: 'danger' },
  { id: 4, date: '2026-02-20', content: 'YH-UI Launch', type: 'info' }
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
  { id: 1, date: '2026-02-06', content: 'Project Review Meeting', type: 'warning' },
  { id: 2, date: '2026-02-06', content: 'Code Merge PR', type: 'success' },
  { id: 3, date: '2026-02-14', content: "Valentine's Dinner", type: 'danger' },
  { id: 4, date: '2026-02-20', content: 'YH-UI Launch', type: 'info' }
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

// --- Advanced: Room booking data ---
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
        <span class="occupied-label">Occupied</span>
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

## Basic Usage

Set `v-model` to specify the currently selected date, defaults to today. The calendar features modern design with beautiful animations and interactions.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-calendar v-model="value" />
</DemoBlock>

## Holiday Display

Set `show-holiday` to enable Chinese statutory holiday display. Holidays show a "Rest" tag, and make-up workdays show a "Work" tag.

<DemoBlock title="Holiday Display" :ts-code="tsHoliday" :js-code="jsHoliday">
  <yh-calendar v-model="holidayValue" show-holiday />
</DemoBlock>

## Custom Content

Use the named slot `date-cell` to customize calendar cell content. The scoped parameter `data` contains rich date information.

<DemoBlock title="Custom Content" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-calendar>
    <template #date-cell="{ data }">
      <div v-if="hasEvent(data.day)" class="event-dot"></div>
      <div v-if="getMemo(data.day)" class="memo-text">
        {{ getMemo(data.day) }}
      </div>
    </template>
  </yh-calendar>
</DemoBlock>

## Date Range Restriction

Use `min-date` and `max-date` to restrict selectable date range. Dates outside the range will be disabled.

<DemoBlock title="Date Range Restriction" :ts-code="tsRange" :js-code="jsRange">
  <yh-calendar :min-date="minDate" :max-date="maxDate" />
</DemoBlock>

## Readonly Mode

Set the `readonly` prop to make the calendar read-only. Users cannot select dates.

<DemoBlock title="Readonly Mode" :ts-code="tsReadonly" :js-code="jsReadonly">
  <yh-calendar v-model="readonlyValue" readonly />
</DemoBlock>

## Range Selection

Set `selection-mode="range"` to enable date range selection, used with `v-model:range-value`.

<DemoBlock title="Range Selection" :ts-code="tsRangeSelect" :js-code="jsRangeSelect">
  <div>
    <yh-calendar selection-mode="range" v-model:range-value="rangeValue" />
    <p style="margin-top: 12px; color: #64748b; font-size: 14px;">
      Selected: {{ rangeValue[0] && rangeValue[1] ? `${rangeValue[0].toLocaleDateString()} ~ ${rangeValue[1].toLocaleDateString()}` : 'Please select a date range' }}
    </p>
  </div>
</DemoBlock>

## Week Number Display

Set `show-week-number` to display ISO week numbers on the left side.

<DemoBlock title="Week Number" :ts-code="tsWeekNumber" :js-code="jsWeekNumber">
  <yh-calendar show-week-number />
</DemoBlock>

## Disable Specific Dates

Use the `disabled-date` function for custom disable logic. The example below disables all weekends.

<DemoBlock title="Disable Specific Dates" :ts-code="tsDisabledDate" :js-code="jsDisabledDate">
  <yh-calendar :disabled-date="disabledDate" />
</DemoBlock>

## Fullscreen Mode

Set `fullscreen` to make the calendar fill the parent container height, suitable for schedule management pages.

<DemoBlock title="Fullscreen Mode" :ts-code="tsFullscreen" :js-code="jsFullscreen">
  <div class="fullscreen-calendar-container">
    <yh-calendar fullscreen show-holiday />
  </div>
</DemoBlock>

## Sizes

Provides `small`, `default`, and `large` sizes.

<DemoBlock title="Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin-bottom: 12px; color: #64748b; font-size: 13px; font-weight: 500;">Small Size</p>
      <yh-calendar size="small" />
    </div>
    <div>
      <p style="margin-bottom: 12px; color: #64748b; font-size: 13px; font-weight: 500;">Default Size</p>
      <yh-calendar />
    </div>
    <div>
      <p style="margin-bottom: 12px; color: #64748b; font-size: 13px; font-weight: 500;">Large Size</p>
      <yh-calendar size="large" />
    </div>
  </div>
</DemoBlock>

## Use in Nuxt

The Calendar component fully supports SSR rendering in Nuxt 3/4. Components are auto-imported in Nuxt projects.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-calendar v-model="nuxtValue" show-holiday />
</DemoBlock>

**SSR Notes**:

- ✅ Basic rendering and matrix calculations fully support SSR
- ✅ Holiday data is computed on the server
- ✅ Slot content is generated on the server with excellent Hydration performance
- ⚠️ Range selection hover effects are client-side behavior

::: tip SSR Performance
Calendar uses static date caching internally, maintaining extremely low memory usage even with frequent SSR refreshes.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Binding value (single select mode) | `Date` | — |
| default-value | Default selected date | `Date` | — |
| mode | View mode | `'month' \| 'year'` | `'month'` |
| first-day-of-week | First day of week (1-7, 1=Monday) | `number` | `7` (Sunday) |
| min-date | Minimum selectable date | `Date` | — |
| max-date | Maximum selectable date | `Date` | — |
| readonly | Whether readonly | `boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| disabled-date | Custom disabled date function | `(date: Date) => boolean` | — |
| show-holiday | Whether to show holiday markers | `boolean` | `false` |
| holidays | Custom holiday data | `HolidayMap` | `{}` |
| show-week-number | Whether to show week numbers | `boolean` | `false` |
| fullscreen | Whether fullscreen (fill container) | `boolean` | `false` |
| selection-mode | Selection mode | `'single' \| 'range' \| 'multiple'` | `'single'` |
| range-value | Range selection value | `[Date?, Date?]` | — |
| multiple-value | Multi-select value | `Date[]` | `[]` |
| show-other-months | Whether to show non-current month dates | `boolean` | `true` |
| highlight-weekends | Whether to highlight weekends | `boolean` | `true` |
| size | Calendar size | `'small' \| 'default' \| 'large'` | `'default'` |
| cell-class-name | Cell custom class function | `(date: Date) => string \| string[] \| object` | — |
| month-header-format | Header format | `string` | `'YYYY MM'` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when selected date changes | `(date: Date) => void` |
| select | Triggered when a date cell is clicked | `(date: Date, cell: CalendarDateCell) => void` |
| panel-change | Triggered when displayed year/month or mode changes | `(date: Date, mode: 'month' | 'year') => void` |
| range-change | Triggered when range selection completes | `(range: [Date, Date]) => void` |

### Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| header | Custom calendar header | `{ date: string }` |
| date-cell | Custom date cell content | `{ data: CalendarDateCell }` |
| footer | Custom calendar footer | — |

### Expose

Access internal methods and properties via ref:

| Name | Description | Type |
| --- | --- | --- |
| displayDate | Current viewport date (Dayjs) | `Ref<Dayjs>` |
| selectedDate | Currently selected date (single, Dayjs) | `Ref<Dayjs \| undefined>` |
| moveMonth | Switch month (delta: 1 or -1) | `(delta: number) => void` |
| goToday | Jump to today | `() => void` |
| selectDate | Manually select a date cell | `(cell: CalendarDateCell) => void` |

### CalendarDateCell Type

| Property | Description | Type |
| --- | --- | --- |
| day | Formatted date string (YYYY-MM-DD) | `string` |
| date | Raw Date object | `Date` |
| type | Date type | `'prev-month' \| 'current-month' \| 'next-month'` |
| isSelected | Whether selected | `boolean` |
| isToday | Whether today | `boolean` |
| isDisabled | Whether disabled | `boolean` |
| isWeekend | Whether weekend | `boolean` |
| isHoliday | Whether holiday | `boolean` |
| holidayName | Holiday name | `string \| undefined` |
| isWorkday | Whether make-up workday | `boolean` |
| isInRange | Whether in range | `boolean` |
| isRangeStart | Whether range start | `boolean` |
| isRangeEnd | Whether range end | `boolean` |

### HolidayMap Type

```typescript
type HolidayMap = Record<string, {
  name: string      // Holiday name
  isOffDay: boolean // true=day off, false=make-up workday
}>
```

## Theme Variables

The Calendar component supports customizing styles by overriding the following CSS variables. All color variables are integrated with the global theme system, automatically supporting dark mode:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-calendar-bg` | Calendar background | `var(--yh-bg-color)` |
| `--yh-calendar-text` | Default text color | `var(--yh-text-color-primary)` |
| `--yh-calendar-primary` | Selected/today theme color | `var(--yh-color-primary)` |
| `--yh-calendar-primary-light` | Range/hover background | `var(--yh-color-primary-light-9)` |
| `--yh-calendar-primary-dark` | Selected hover darkened | `var(--yh-color-primary-dark-2)` |
| `--yh-calendar-cell-height` | Cell height | `100px` |
| `--yh-calendar-cell-radius` | Cell border radius | `var(--yh-radius-lg)` |
| `--yh-calendar-head-height` | Header height | `80px` |
| `--yh-calendar-title-size` | Title font size | `22px` |
| `--yh-calendar-weekday-color` | Weekday header color | `var(--yh-text-color-secondary)` |
| `--yh-calendar-holiday-color` | Holiday marker color | `var(--yh-color-danger)` |
| `--yh-calendar-week-number-color` | Week number text | `var(--yh-text-color-placeholder)` |

## Style Compatibility Notes

Since Calendar uses standard `table` layout internally, if used in **VitePress**, **Markdown**, or backend systems with aggressive global table styles, zebra-stripe or border injection may cause display issues.

### Core Style Isolation

YH-UI follows the **source purity principle** — component SCSS contains no `!important` patches for specific doc environments. If you find background disappearing or extra margins in your Markdown environment, try adding the following global styles:

```css
/* Clean doc environment table interference */
.your-container-class .yh-calendar__table,
.your-container-class .yh-calendar__table tr,
.your-container-class .yh-calendar__table td {
  background-color: transparent !important;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
```

::: tip Why use !important?
This overrides high-specificity global selectors injected by some Markdown renderers (e.g., `.markdown-body table tr:nth-child(2n)`). In normal Vue/Nuxt business projects, you **don't need** these patches.
:::

## Advanced Usage Examples

### Schedule Management

Demonstrates how to customize content within calendar cells to simulate real schedule arrangements.

<DemoBlock title="Schedule Management" :ts-code="tsSchedule" :js-code="jsSchedule">
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

### Meeting Room Booking System

Demonstrates using `selection-mode="range"` to implement room booking logic with disabled date restrictions.

<DemoBlock title="Meeting Room Booking" :ts-code="tsBooking" :js-code="jsBooking">
  <div class="booking-container">
    <yh-calendar
      selection-mode="range"
      v-model:range-value="bookingRange"
      :disabled-date="isOccupied"
    >
      <template #date-cell="{ data }">
        <div v-if="isOccupied(data.day)" class="occupied-mask">
          <span class="label">Occupied</span>
        </div>
      </template>
    </yh-calendar>
  </div>
</DemoBlock>

<style scoped>
.event-dot { width: 6px; height: 6px; background: linear-gradient(135deg, #f97316, #fb923c); border-radius: 50%; margin-bottom: 4px; }
.memo-text { font-size: 11px; color: #64748b; background: rgba(99, 102, 241, 0.1); padding: 2px 6px; border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.custom-day-cell { height: 100%; display: flex; flex-direction: column; gap: 4px; padding: 2px; overflow: hidden; margin-top: 14px; }
.schedule-tag { display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 4px; font-size: 11px; background: rgba(0, 0, 0, 0.03); }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.warning { background: #fff7ed; color: #ea580c; .dot { background: #ea580c; } }
.success { background: #f0fdf4; color: #16a34a; .dot { background: #16a34a; } }
.danger { background: #fef2f2; color: #dc2626; .dot { background: #dc2626; } }
.info { background: #eff6ff; color: #2563eb; .dot { background: #2563eb; } }
.occupied-mask { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.03); display: flex; align-items: flex-end; justify-content: center; padding-bottom: 10px; pointer-events: none; }
.occupied-label { font-size: 11px; color: #94a3b8; font-weight: 600; background: #f1f5f9; padding: 2px 8px; border-radius: 10px; }
</style>

<style>
.fullscreen-calendar-container { height: 600px; border-radius: 16px; overflow: hidden !important; }
.vp-doc .yh-calendar__table, .markdown-body .yh-calendar__table { display: table !important; width: 100% !important; border-collapse: separate !important; margin: 0 !important; }
.vp-doc .yh-calendar__table tr, .vp-doc .yh-calendar__table td, .vp-doc .yh-calendar__table th { background-color: transparent !important; border: none !important; margin: 0 !important; padding: 0 !important; text-align: center !important; vertical-align: middle !important; }
.vp-doc .yh-calendar__table tbody tr { height: auto !important; }
.vp-doc .yh-calendar__table tbody td.yh-calendar__day { height: var(--yh-calendar-cell-height, 100px) !important; min-height: var(--yh-calendar-cell-height, 100px) !important; max-height: var(--yh-calendar-cell-height, 100px) !important; }
.vp-doc .yh-calendar__table tbody td.yh-calendar__day.is-hidden { visibility: hidden !important; pointer-events: none !important; }
.vp-doc .yh-calendar__table tbody td.yh-calendar__day.is-other-month { opacity: 0.4 !important; }
.vp-doc .yh-calendar__table tr:nth-child(2n) { background-color: transparent !important; }
.vp-doc .yh-calendar.is-fullscreen { overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__body { overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table { display: flex !important; flex-direction: column !important; height: 100% !important; min-height: 0 !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table thead { display: flex !important; flex-direction: column !important; width: 100% !important; flex: none !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table tbody { display: flex !important; flex-direction: column !important; width: 100% !important; flex: 1 !important; min-height: 0 !important; gap: 6px !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table thead tr { display: flex !important; flex-direction: row !important; width: 100% !important; flex: none !important; height: 48px !important; min-height: 50px !important; align-items: stretch !important; gap: 12px !important; margin: 0 !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table tbody tr { display: flex !important; flex-direction: row !important; width: 100% !important; flex: 1 !important; height: auto !important; min-height: 0 !important; align-items: stretch !important; gap: 10px !important; margin: 0 !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__weekday { height: 48px !important; min-height: 48px !important; display: flex !important; align-items: center !important; justify-content: center !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table thead th { display: flex !important; align-items: center !important; justify-content: center !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__table td.yh-calendar__day { display: flex !important; flex: 1 !important; align-items: stretch !important; justify-content: center !important; height: auto !important; min-height: 0 !important; max-height: none !important; padding: 0 !important; margin: 0 !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__day { height: 100% !important; min-height: 0 !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__day-inner, .yh-calendar.is-fullscreen .yh-calendar__day-inner { flex: 1 !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: center !important; padding: 6px 4px !important; overflow: hidden !important; }
.vp-doc .yh-calendar.is-fullscreen .yh-calendar__day-content, .yh-calendar.is-fullscreen .yh-calendar__day-content { display: none !important; }
.yh-calendar.is-fullscreen .is-today .yh-calendar__day-value::after { bottom: -4px !important; }
</style>
