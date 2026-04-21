# Calendar

Displays a month-view calendar with holiday markers, range selection, multiple selection, custom cell content, and component-level theme overrides.

<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(new Date())
const holidayValue = ref(new Date())
const readonlyValue = ref(new Date())
const nuxtValue = ref(new Date())
const rangeValue = ref([undefined, undefined])
const multipleValue = ref([])

const events = ['2026-02-14', '2026-02-20', '2026-03-08']
const memos = {
  '2026-02-14': "Valentine's Day",
  '2026-02-20': 'Project Review',
  '2026-03-08': "Women's Day"
}

const hasEvent = (day) => events.includes(day)
const getMemo = (day) => memos[day]

const minDate = new Date(2026, 1, 1)
const maxDate = new Date(2026, 1, 28)

const disabledDate = date => {
  const day = date.getDay()
  return day === 0 || day === 6
}

const rangeText = computed(() => {
  if (!rangeValue.value[0]) return 'Please select a start date'
  if (!rangeValue.value[1]) return `${dayjs(rangeValue.value[0]).format('YYYY-MM-DD')} ~ Please select an end date`
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
  '2026-02-14': "Valentine's Day",
  '2026-02-20': 'Project Review',
  '2026-03-08': "Women's Day"
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
  if (!rangeValue.value[0]) return 'Please select a start date'
  if (!rangeValue.value[1]) return \`\${dayjs(rangeValue.value[0]).format('YYYY-MM-DD')} ~ Please select an end date\`
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

const toJs = code =>
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

## Basic Usage

Bind the current selected date through `v-model`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-calendar v-model="value" />
</DemoBlock>

## Holiday Markers

Enable `show-holiday` to merge the built-in China 2026 holiday data with the custom `holidays` prop.

<DemoBlock title="Holiday Markers" :ts-code="tsHoliday" :js-code="jsHoliday">
  <yh-calendar v-model="holidayValue" show-holiday />
</DemoBlock>

## Custom Date Cell

Use the `date-cell` slot to render extra business information inside a day cell.

<DemoBlock title="Custom Date Cell" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-calendar>
    <template #date-cell="{ data }">
      <div v-if="hasEvent(data.day)" class="event-dot"></div>
      <div v-if="getMemo(data.day)" class="memo-text">
        {{ getMemo(data.day) }}
      </div>
    </template>
  </yh-calendar>
</DemoBlock>

## Range Selection

Set `selection-mode="range"` and bind `v-model:range-value` to receive the start and end dates.

<DemoBlock title="Range Selection" :ts-code="tsRange" :js-code="jsRange">
  <div>
    <yh-calendar selection-mode="range" v-model:range-value="rangeValue" />
    <p style="margin-top: 12px; color: #64748b;">{{ rangeText }}</p>
  </div>
</DemoBlock>

## Multiple Selection

Set `selection-mode="multiple"` and bind `v-model:multiple-value` to manage the selected dates array.

<DemoBlock title="Multiple Selection" :ts-code="tsMultiple" :js-code="jsMultiple">
  <yh-calendar selection-mode="multiple" v-model:multiple-value="multipleValue" />
</DemoBlock>

## Date Constraints

You can combine `min-date`, `max-date`, and `disabled-date` to control the selectable range.

<DemoBlock title="Date Constraints" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-calendar :min-date="minDate" :max-date="maxDate" :disabled-date="disabledDate" />
</DemoBlock>

## Week Number and Sizes

The calendar supports week numbers and three size presets: `small`, `default`, and `large`.

<DemoBlock title="Week Number" :ts-code="tsWeek" :js-code="jsWeek">
  <yh-calendar show-week-number />
</DemoBlock>

<DemoBlock title="Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <yh-calendar size="small" />
    <yh-calendar />
    <yh-calendar size="large" />
  </div>
</DemoBlock>

## Readonly

When `readonly` is enabled, the component keeps its display behavior but no longer reacts to date selection.

<DemoBlock title="Readonly" :ts-code="tsReadonly" :js-code="jsReadonly">
  <yh-calendar v-model="readonlyValue" readonly />
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, you can use `YhCalendar` directly. The static calendar grid, holiday markers, and slot content render correctly during SSR, while interactive states such as range hovering activate on the client.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-calendar v-model="nuxtValue" show-holiday />
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model / model-value | Bound value in single mode | `Date` | `undefined` |
| default-value | Default selected date | `Date` | `undefined` |
| mode | Calendar mode | `'month' \| 'year'` | `'month'` |
| first-day-of-week | First day of week, `1` for Monday and `7` for Sunday | `number` | `7` |
| min-date | Minimum selectable date | `Date` | `undefined` |
| max-date | Maximum selectable date | `Date` | `undefined` |
| readonly | Whether readonly | `boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| month-header-format | Custom title format | `string` | `undefined` |
| show-holiday | Whether to show holiday and workday markers | `boolean` | `false` |
| holidays | Custom holiday map | `HolidayMap` | `{}` |
| show-week-number | Whether to show week numbers | `boolean` | `false` |
| fullscreen | Whether to fill the parent height | `boolean` | `false` |
| selection-mode | Selection mode | `'single' \| 'range' \| 'multiple'` | `'single'` |
| range-value | Range selection value | `[Date \| undefined, Date \| undefined]` | `undefined` |
| multiple-value | Multiple selection value | `Date[]` | `[]` |
| disabled-date | Custom disabled date predicate | `(date: Date) => boolean` | `undefined` |
| cell-class-name | Custom class name generator for date cells | `(date: Date) => string \| string[] \| Record<string, boolean>` | `undefined` |
| show-other-months | Whether to show dates outside the current month | `boolean` | `true` |
| highlight-weekends | Whether to highlight weekends | `boolean` | `true` |
| size | Calendar size | `'small' \| 'default' \| 'large'` | `'default'` |
| theme-overrides | Component theme override variables | `CalendarThemeVars` | `undefined` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggered when the single value changes | `(value: Date) => void` |
| update:rangeValue | Triggered when range selection completes | `(value: [Date \| undefined, Date \| undefined]) => void` |
| update:multipleValue | Triggered when the multiple value changes | `(value: Date[]) => void` |
| change | Triggered when the single value changes | `(value: Date) => void` |
| panel-change | Triggered when the visible month changes | `(date: Date, mode: 'month' \| 'year') => void` |
| select | Triggered when a date cell is selected | `(date: Date, cell: CalendarDateCell) => void` |
| range-change | Triggered when range selection completes | `(value: [Date \| undefined, Date \| undefined]) => void` |

### Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| header | Custom header title | `{ date: string }` |
| date-cell | Custom date cell content | `{ data: CalendarCellSlotData }` |
| footer | Custom footer area | - |

`CalendarCellSlotData` is the runtime slot payload and contains:

| Field | Type | Description |
| --- | --- | --- |
| day | `string` | Formatted date string such as `2026-02-14` |
| date | `Date` | Native date object |
| type | `'prev-month' \| 'current-month' \| 'next-month'` | Month classification |
| isSelected | `boolean` | Whether selected |
| isToday | `boolean` | Whether today |
| isDisabled | `boolean` | Whether disabled |
| isWeekend | `boolean` | Whether weekend |
| isHoliday | `boolean` | Whether a holiday |
| holidayName | `string \| undefined` | Holiday name |
| isWorkday | `boolean` | Whether a make-up workday |
| isInRange | `boolean \| undefined` | Whether inside the current range |
| isRangeStart | `boolean \| undefined` | Whether the range start |
| isRangeEnd | `boolean \| undefined` | Whether the range end |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| displayDate | Currently displayed panel date | `Ref<Dayjs>` |
| selectedDate | Currently selected date in single mode | `Ref<Dayjs \| undefined>` |
| moveMonth | Change the current month | `(delta: number) => void` |
| goToday | Jump to today | `() => void` |
| selectDate | Select a specific date cell manually | `(cell: CalendarDateCell) => void` |

### Type Exports

| Type | Description |
| --- | --- |
| `YhCalendarProps` | Props type |
| `YhCalendarEmits` | Emits type |
| `YhCalendarSlots` | Slots type |
| `YhCalendarExpose` | Expose type |
| `YhCalendarDateCell` | Date cell type |
| `YhCalendarHolidayInfo` | Holiday info type |
| `YhCalendarHolidayMap` | Holiday map type |
| `YhCalendarRangeValue` | Range value type |
| `YhCalendarMode` | Mode type |

### Theme Variables

The component supports `themeOverrides` and consumes the following CSS variables in styles:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-calendar-primary` | Primary color | `var(--yh-color-primary)` |
| `--yh-calendar-primary-light` | Light primary background | `var(--yh-color-primary-light-9)` |
| `--yh-calendar-primary-dark` | Dark primary state | `var(--yh-color-primary-dark-2)` |
| `--yh-calendar-bg` | Calendar background | `var(--yh-bg-color)` |
| `--yh-calendar-text` | Primary text color | `var(--yh-text-color-primary)` |
| `--yh-calendar-cell-height` | Day cell height | `100px` |
| `--yh-calendar-cell-radius` | Day cell radius | `var(--yh-radius-lg)` |
| `--yh-calendar-head-height` | Header height | `80px` |
| `--yh-calendar-title-size` | Title font size | `22px` |
| `--yh-calendar-weekday-color` | Weekday title color | `var(--yh-text-color-secondary)` |
| `--yh-calendar-week-number-color` | Week number color | `var(--yh-text-color-placeholder)` |
| `--yh-calendar-holiday-color` | Holiday badge color | `var(--yh-color-danger)` |
| `--yh-calendar-disabled-bg` | Disabled background | `var(--yh-fill-color-light)` |
| `--yh-calendar-disabled-text` | Disabled text color | `var(--yh-text-color-placeholder)` |

The exported `CalendarThemeVars` fields are:
`headerBgColor`, `headerTextColor`, `titleFontSize`, `dayFontSize`, `dayTextColor`, `dayHoverBgColor`, `daySelectedBgColor`, `daySelectedTextColor`, `todayTextColor`, and `weekendTextColor`.

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
