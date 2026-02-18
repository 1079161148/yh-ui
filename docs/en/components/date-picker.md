# DatePicker

A control for selecting or inputting dates. It supports selection by day, week, month, year, quarter, and range, featuring exceptional aesthetic design and smooth interaction.

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import dayjs from 'dayjs'

// --- State Data ---
const demoType = ref('date')
const demoShape = ref('round')
const demoValue = ref(null)
const demoTypes = [
  { value: 'date', label: 'Date' },
  { value: 'datetime', label: 'DateTime' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'year', label: 'Year' },
  { value: 'daterange', label: 'Date Range' },
  { value: 'monthrange', label: 'Month Range' }
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
  { label: 'Today', value: new Date() },
  { label: 'Yesterday', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: 'A week ago', value: () => dayjs().subtract(1, 'week').toDate() }
]

const disabledDate = (date: Date) => {
  return dayjs(date).isBefore(dayjs(), 'day')
}

const formatValue = (val, type) => {
  if (!val) return 'Not Selected'
  const fmt = (v) => {
    const d = dayjs(v)
    if (!d.isValid()) return '...'
    if (type.includes('year')) return d.format('YYYY')
    if (type.includes('month')) return d.format('YYYY-MM')
    if (type.includes('quarter')) return `${d.year()} Q${Math.floor(d.month() / 3) + 1}`
    if (type === 'week') return d.format('YYYY [Week] w')
    if (type.includes('datetime')) return d.format('YYYY-MM-DD HH:mm:ss')
    return d.format('YYYY-MM-DD')
  }
  return Array.isArray(val) ? `${fmt(val[0])} to ${fmt(val[1])}` : fmt(val)
}

// --- Code Snippets ---
const showcaseTS = `<template>
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">Mode:</span>
        <yh-radio-group v-model="type" size="small">
          <yh-radio-button v-for="t in types" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
      <div class="ctrl-row">
        <span class="label">Cell Shape:</span>
        <yh-radio-group v-model="shape" size="small">
          <yh-radio-button value="round">Round</yh-radio-button>
          <yh-radio-button value="square">Square</yh-radio-button>
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
  { value: 'date', label: 'Date' },
  { value: 'datetime', label: 'DateTime' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'year', label: 'Year' },
  { value: 'daterange', label: 'Date Range' },
  { value: 'monthrange', label: 'Month Range' }
]
<` + `/script>`

const baseTS = `<template>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="Pick a day" />
    <yh-date-picker v-model="d2" type="month" placeholder="Pick a month" />
    <yh-date-picker v-model="d3" type="year" placeholder="Pick a year" />
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
    <yh-date-picker v-model="d4" disabled placeholder="Disabled" />
    <yh-date-picker v-model="d5" readonly placeholder="Readonly" />
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
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="Default Round" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="Classic Square" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const d8 = ref('')
const d9 = ref('')
<` + `/script>`

const rangeTS = `<template>
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="Start Date" end-placeholder="End Date" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="Start Month" end-placeholder="End Month" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const r1 = ref(null)
const r2 = ref(null)
<` + `/script>`

const presetsTS = `<template>
  <yh-date-picker v-model="d6" :presets="presets" placeholder="Click to see presets" />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
const d6 = ref(null)
const presets = [
  { label: 'Today', value: new Date() },
  { label: 'Yesterday', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: 'A week ago', value: () => dayjs().subtract(1, 'week').toDate() }
]
<` + `/script>`

const disabledTS = `<template>
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="Cannot select past dates" />
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
    <yh-date-picker v-model="dv1" placeholder="Custom Clear Icon">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z" /></svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH:mm:ss" placeholder="Custom Time Format" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="Default show 2025-01" />
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
// In Nuxt, no need to import, just define reactive data
const date = ref('')
<` + `/script>`

const dv1 = ref(new Date())
const dv2 = ref(new Date())
const dv3 = ref(null)
const d10 = ref(null)
const defaultDate = new Date(2025, 0, 1)

// Custom render logic demo
const cellRender = (date: Date) => {
  const day = dayjs(date).format('MM-DD')
  const holidays: Record<string, string> = {
    '01-01': 'New Year',
    '01-20': 'Major Cold',
    '02-16': "New Year's Eve",
    '02-17': 'Spring Festival',
    '02-14': "Valentine's Day"
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
    placeholder="Render holidays and solar terms" 
  />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(null)
const cellRender = (date: Date) => {
  const day = dayjs(date).format('MM-DD')
  const holidays = {
    '01-01': 'New Year',
    '01-20': 'Major Cold',
    '02-16': "New Year's Eve",
    '02-17': 'Spring Festival',
    '02-14': "Valentine's Day"
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

## Showcase

DatePicker supports multiple units of panel display directly, which is common for custom layouts or dashboards.

<DemoBlock title="Full Showcase" :ts-code="showcaseTS">
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">Mode:</span>
        <yh-radio-group v-model="demoType" size="small">
          <yh-radio-button v-for="t in demoTypes" :key="t.value" :value="t.value">
            {{ t.label }}
          </yh-radio-button>
        </yh-radio-group>
      </div>
      <div class="ctrl-row">
        <span class="label">Cell Shape:</span>
        <yh-radio-group v-model="demoShape" size="small">
          <yh-radio-button value="round">Round</yh-radio-button>
          <yh-radio-button value="square">Square</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="demo-viewport">
      <yh-date-picker :key="demoType + demoShape" v-model="demoValue" :type="demoType" :cell-shape="demoShape" panel-only />
    </div>
    <div class="demo-result">
      <span class="dot"></span>
      <span class="label">Selected:</span>
      <span class="val">{{ formatValue(demoValue, demoType) }}</span>
    </div>
  </div>
</DemoBlock>

## Basic Usage

With the `type` attribute, you can quickly switch between date, month, and year selection modes.

<DemoBlock title="Basic Usage" :ts-code="baseTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="Pick a day" />
    <yh-date-picker v-model="d2" type="month" placeholder="Pick a month" />
    <yh-date-picker v-model="d3" type="year" placeholder="Pick a year" />
  </div>
</DemoBlock>

## Advanced Configuration

DatePicker provides rich attributes to meet fine-tuned customization needs, such as custom icons and special display formats.

<DemoBlock title="Advanced Options" :ts-code="customTS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="dv1" placeholder="Custom Clear Icon">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z"/></svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH:mm:ss" placeholder="Custom Time Format" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="Default show 2025-01" />
  </div>
</DemoBlock>

## Cell Shape

The appearance style supports not only the modern round (default) but also the classic and stable square.

<DemoBlock title="Shape Switch" :ts-code="shapeTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="Default Round" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="Classic Square" />
  </div>
</DemoBlock>

## Custom Cell Content

Through the `cell-render` attribute or `date-cell` slot, you can customize the display content of date cells, such as adding lunar calendars, holidays, solar terms, or business markers.

<DemoBlock title="Holidays and Solar Terms" :ts-code="renderTS">
  <div class="yh-demo-row">
    <yh-date-picker 
      v-model="d10" 
      :cell-render="cellRender" 
      placeholder="Render holidays and solar terms" 
      style="width: 280px"
    />
  </div>
</DemoBlock>

## Disabled and Readonly

Use the `disabled` attribute to disable the component, and use the `readonly` attribute to set it to read-only.

<DemoBlock title="Status Demo" :ts-code="statusTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d4" disabled placeholder="Disabled" />
    <yh-date-picker v-model="d5" readonly placeholder="Readonly" />
  </div>
</DemoBlock>

## Sizes

The component provides three sizes: `large`, `default`, and `small`, to adapt to different page spaces.

<DemoBlock title="Sizes Demo" :ts-code="sizeTS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="s1" size="large" placeholder="Large 36px" />
    <yh-date-picker v-model="s2" placeholder="Default 32px" />
    <yh-date-picker v-model="s3" size="small" placeholder="Small 28px" />
  </div>
</DemoBlock>

## Presets

Through the `presets` attribute, quick selection options can be configured, greatly improving user selection efficiency.

<DemoBlock title="Presets" :ts-code="presetsTS">
  <yh-date-picker v-model="d6" :presets="presets" placeholder="Click to see presets" />
</DemoBlock>

## Disabled Dates

Through the `disabled-date` function, you can customize which dates should not be selectable.

<DemoBlock title="Date Filtering" :ts-code="disabledTS">
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="Cannot select past dates" />
</DemoBlock>

## Range Selection

Set `type` to `*range` to enable range selection mode.

<DemoBlock title="Range Mode" :ts-code="rangeTS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="Start Date" end-placeholder="End Date" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="Start Month" end-placeholder="End Month" />
  </div>
</DemoBlock>

## Use in Nuxt

DatePicker perfectly supports SSR rendering in Nuxt 3/4. In Nuxt projects, the component and its dependencies (styles, Hooks) are automatically imported, no manual registration required.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="Nuxt SSR Support" />
  </div>
</DemoBlock>

::: tip SSR Note
DatePicker has been optimized for Hydration internally, ensuring that the DOM structure generated on the server and client is completely consistent in SSR scenarios.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model / model-value | Binding value | `Date \| string \| number \| Array` | — |
| type | Display type | `DatePickerType` | `'date'` |
| cell-shape | Cell shape | `'round' \| 'square'` | `'round'` |
| disabled | Whether disabled | `boolean` | `false` |
| readonly | Whether readonly | `boolean` | `false` |
| clearable | Whether to show clear button | `boolean` | `true` |
| size | Size | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | Placeholder when not in range mode | `string` | `'Please select date'` |
| start-placeholder | Placeholder for start date in range mode | `string` | `'Start date'` |
| end-placeholder | Placeholder for end date in range mode | `string` | `'End date'` |
| format | Format displayed in the input box | `string` | — |
| value-format | Format of the binding value | `string` | — |
| date-format | Date format displayed on the panel | `string` | `'YYYY-MM-DD'` |
| time-format | Time format displayed on the panel | `string` | `'HH:mm:ss'` |
| range-separator | Separator when choosing range | `string` | `'-'` |
| first-day-of-week | First day of week (1-7) | `number` | `7` |
| disabled-date | Disabled dates function | `(date: Date) => boolean` | — |
| presets | Quick options | `DatePickerPreset[]` | `[]` |
| preset-position | Position of quick options | `'left' \| 'right' \| 'top' \| 'bottom'` | `'bottom'` |
| show-footer | Whether to show operation bar at bottom | `boolean` | `true` |
| status | Input box status | `'success' \| 'warning' \| 'error'` | — |
| order-on-confirm | Whether to auto-sort during range selection | `boolean` | `false` |
| prefix-icon | Custom prefix icon | `string \| Component` | — |
| clear-icon | Custom clear icon | `string \| Component` | — |
| default-value | Date shown by default when opening the picker | `Date \| Date[]` | — |
| default-time | Default time (in datetime mode) | `Date \| Date[]` | — |
| panel-only | Whether to display inline (panel only) | `boolean` | `false` |
| cell-render | Custom cell rendering function | `(date: Date) => string \| { text: string; className?: string }` | — |
| teleported | Whether to insert the panel into body | `boolean` | `true` |
| popper-class | Popover class name | `string` | — |
| validate-event | Whether to trigger form validation | `boolean` | `true` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggered when binding value is updated | `(value: DateValue \| DateRangeValue) => void` |
| change | Triggered when value changes | `(value: DateValue \| DateRangeValue) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered when clear button is clicked | `() => void` |
| confirm | Triggered when confirm button is clicked | `(value: DateValue \| DateRangeValue) => void` |
| panel-change | Triggered when panel view switches | `(value: Date, mode: PanelView) => void` |
| visible-change | Triggered when panel visibility changes | `(visible: boolean) => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| prefix-icon | Custom input prefix icon |
| clear-icon | Custom clear icon |
| extra | Extra content in the panel |
| date-cell | Custom date cell (Scope: `{ cell: CalendarCell }`) |
| footer | Custom footer area |

## Theme Variables

All color variables are connected to the global theme system and automatically support dark mode:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-date-picker-width` | Regular input box width | `220px` |
| `--yh-date-picker-range-width` | Range input box width | `400px` |
| `--yh-date-picker-primary` | Main theme color | `var(--yh-color-primary)` |
| `--yh-date-picker-text-main` | Main text color | `var(--yh-text-color-primary)` |
| `--yh-date-picker-text-secondary` | Secondary text color | `var(--yh-text-color-secondary)` |
| `--yh-date-picker-border` | Border color | `var(--yh-border-color)` |
| `--yh-date-picker-panel-width` | Panel physical width | `380px` |
| `--yh-date-picker-panel-bg` | Panel background color | `var(--yh-bg-color-overlay)` |
| `--yh-date-picker-panel-shadow` | Panel shadow | `var(--yh-shadow-lg)` |
| `--yh-date-picker-item-hover` | Hover background color | `var(--yh-fill-color-light)` |
| `--yh-date-picker-range-bg` | Range background color | `var(--yh-color-primary-light-9)` |

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

/* Custom rendering style penetration */
:deep(.is-holiday) {
  color: var(--yh-color-danger) !important;
  font-weight: bold;
}
:deep(.is-solar-term) {
  color: #0ea5e9 !important;
}
</style>
