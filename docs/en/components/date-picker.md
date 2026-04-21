# DatePicker

`YhDatePicker` is a unified date input component for day, week, month, quarter, year, and range selection. It also supports inline panel rendering, custom cell content, presets, and token-based theming.

<script setup lang="ts">
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

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
  { label: 'Today', value: new Date() },
  { label: 'Yesterday', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: 'A week ago', value: () => dayjs().subtract(1, 'week').toDate() }
]

const disabledDate = (date: Date) => dayjs(date).isBefore(dayjs(), 'day')

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

const formatValue = (val: unknown, type: string) => {
  if (!val) return 'Not selected'

  const fmt = (v: unknown) => {
    const d = dayjs(v as string | number | Date)
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

const showcaseTS = `<${_T}>
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
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>`

const baseTS = `<${_T}>
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="Pick a date" />
    <yh-date-picker v-model="d2" type="month" placeholder="Pick a month" />
    <yh-date-picker v-model="d3" type="year" placeholder="Pick a year" />
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
    <yh-date-picker v-model="d4" disabled placeholder="Disabled" />
    <yh-date-picker v-model="d5" readonly placeholder="Readonly" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const d4 = ref('2026-01-24')
const d5 = ref('2026-01-24')
</${_S}>`

const sizeTS = `<${_T}>
  <div class="yh-demo-row">
    <yh-date-picker v-model="s1" size="large" placeholder="Large" />
    <yh-date-picker v-model="s2" placeholder="Default" />
    <yh-date-picker v-model="s3" size="small" placeholder="Small" />
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
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="Round cells" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="Square cells" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const d8 = ref('')
const d9 = ref('')
</${_S}>`

const rangeTS = `<${_T}>
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="Start date" end-placeholder="End date" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="Start month" end-placeholder="End month" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const r1 = ref(null)
const r2 = ref(null)
</${_S}>`

const presetsTS = `<${_T}>
  <yh-date-picker v-model="d6" :presets="presets" placeholder="Open to use presets" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const d6 = ref(null)
const presets = [
  { label: 'Today', value: new Date() },
  { label: 'Yesterday', value: () => dayjs().subtract(1, 'day').toDate() },
  { label: 'A week ago', value: () => dayjs().subtract(1, 'week').toDate() }
]
</${_S}>`

const disabledTS = `<${_T}>
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="Past dates are disabled" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const d7 = ref(null)
const disabledDate = (date: Date) => dayjs(date).isBefore(dayjs(), 'day')
</${_S}>`

const customTS = `<${_T}>
  <div class="yh-demo-column">
    <yh-date-picker v-model="dv1" placeholder="Custom clear icon">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z" />
        </svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH:mm:ss" placeholder="Date and time" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="Default panel anchor" />
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
    placeholder="Render holidays and solar terms"
  />
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>

<${_St} scoped>
.is-holiday { color: var(--yh-color-danger); font-weight: 700; }
.is-solar-term { color: #0ea5e9; }
</${_St}>`

const nuxtTS = `<${_T}>
  <yh-date-picker v-model="date" placeholder="Nuxt auto import" />
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

## Showcase

Set `panel-only` to render the calendar panel inline. This is useful for dashboards, side panels, or custom layouts that do not need the input shell.

<DemoBlock title="Showcase" :ts-code="showcaseTS" :js-code="showcaseJS">
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

Switch the picker mode with the `type` prop.

<DemoBlock title="Basic Usage" :ts-code="baseTS" :js-code="baseJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d1" placeholder="Pick a date" />
    <yh-date-picker v-model="d2" type="month" placeholder="Pick a month" />
    <yh-date-picker v-model="d3" type="year" placeholder="Pick a year" />
  </div>
</DemoBlock>

## Advanced Configuration

Use slots and auxiliary props to customize icons, default panel anchoring, and date-time formatting.

<DemoBlock title="Advanced Configuration" :ts-code="customTS" :js-code="customJS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="dv1" placeholder="Custom clear icon">
      <template #clear-icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 928C282.48 928 96 741.52 96 512S282.48 96 512 96s416 186.48 416 416-186.48 416-416 416zM691.072 332.928L512 512l-179.072-179.072-67.856 67.856L444.144 580l-179.072 179.072 67.856 67.856L512 648l179.072 179.072 67.856-67.856L580 580l179.072-179.072z" />
        </svg>
      </template>
    </yh-date-picker>
    <yh-date-picker v-model="dv2" type="datetime" time-format="HH:mm:ss" placeholder="Date and time" />
    <yh-date-picker v-model="dv3" :default-value="defaultDate" placeholder="Default panel anchor" />
  </div>
</DemoBlock>

## Cell Shape

Use `cell-shape` to switch between round and square cells.

<DemoBlock title="Cell Shape" :ts-code="shapeTS" :js-code="shapeJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d8" cell-shape="round" placeholder="Round cells" />
    <yh-date-picker v-model="d9" cell-shape="square" placeholder="Square cells" />
  </div>
</DemoBlock>

## Custom Cell Content

Use `cell-render` for lightweight label decoration, or the `date-cell` slot when you need full custom cell markup.

<DemoBlock title="Custom Cell Content" :ts-code="renderTS" :js-code="renderJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d10" :cell-render="cellRender" placeholder="Render holidays and solar terms" style="width: 280px" />
  </div>
</DemoBlock>

## Disabled and Readonly

`disabled` prevents interaction, while `readonly` keeps the current value visible but does not allow opening the panel.

<DemoBlock title="Disabled and Readonly" :ts-code="statusTS" :js-code="statusJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="d4" disabled placeholder="Disabled" />
    <yh-date-picker v-model="d5" readonly placeholder="Readonly" />
  </div>
</DemoBlock>

## Sizes

The component follows the shared size system: `large`, `default`, and `small`.

<DemoBlock title="Sizes" :ts-code="sizeTS" :js-code="sizeJS">
  <div class="yh-demo-row">
    <yh-date-picker v-model="s1" size="large" placeholder="Large" />
    <yh-date-picker v-model="s2" placeholder="Default" />
    <yh-date-picker v-model="s3" size="small" placeholder="Small" />
  </div>
</DemoBlock>

## Presets

Use `presets` to provide quick-pick actions in the panel footer area.

<DemoBlock title="Presets" :ts-code="presetsTS" :js-code="presetsJS">
  <yh-date-picker v-model="d6" :presets="presets" placeholder="Open to use presets" />
</DemoBlock>

## Disabled Dates

Control selectable dates with `disabled-date`.

<DemoBlock title="Disabled Dates" :ts-code="disabledTS" :js-code="disabledJS">
  <yh-date-picker v-model="d7" :disabled-date="disabledDate" placeholder="Past dates are disabled" />
</DemoBlock>

## Range Selection

Range-related types such as `daterange` and `monthrange` use a two-value model.

<DemoBlock title="Range Selection" :ts-code="rangeTS" :js-code="rangeJS">
  <div class="yh-demo-column">
    <yh-date-picker v-model="r1" type="daterange" start-placeholder="Start date" end-placeholder="End date" />
    <yh-date-picker v-model="r2" type="monthrange" start-placeholder="Start month" end-placeholder="End month" />
  </div>
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, `YhDatePicker` can be used directly in Nuxt 3/4 pages and components. The panel still relies on client interaction, but the input shell renders correctly in SSR.

<DemoBlock title="Use in Nuxt" :ts-code="nuxtTS" :js-code="nuxtJS">
  <yh-date-picker v-model="d1" placeholder="Nuxt auto import" />
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` / `v-model` | Bound value | `YhDatePickerValue \| YhDatePickerRangeValue` | `null` |
| `type` | Picker mode | `'date' \| 'datetime' \| 'year' \| 'month' \| 'week' \| 'quarter' \| 'daterange' \| 'datetimerange' \| 'monthrange' \| 'yearrange' \| 'quarterrange'` | `'date'` |
| `disabled` | Disable the component | `boolean` | `false` |
| `readonly` | Keep the input read-only and prevent opening the panel | `boolean` | `false` |
| `clearable` | Show the clear icon when a value exists | `boolean` | `true` |
| `size` | Component size | `'large' \| 'default' \| 'small'` | `'default'` |
| `placeholder` | Placeholder in non-range mode. When omitted, locale text is used | `string` | `undefined` |
| `start-placeholder` | Start placeholder in range mode. When omitted, locale text is used | `string` | `undefined` |
| `end-placeholder` | End placeholder in range mode. When omitted, locale text is used | `string` | `undefined` |
| `format` | Display format used in the input | `string` | `''` |
| `value-format` | Output format used for the bound value | `string` | `''` |
| `date-format` | Panel date format | `string` | `'YYYY-MM-DD'` |
| `time-format` | Panel and footer time format | `string` | `'HH:mm:ss'` |
| `range-separator` | Separator between range inputs | `string` | `'-'` |
| `first-day-of-week` | First day of the week, `1` to `7` | `number` | `7` |
| `disabled-date` | Disable specific dates | `(date: Date) => boolean` | `undefined` |
| `presets` | Preset actions shown in the panel | `YhDatePickerPreset[]` | `[]` |
| `preset-position` | Reserved preset position option. The current implementation still renders presets below the panel | `'left' \| 'right' \| 'top' \| 'bottom'` | `'bottom'` |
| `show-footer` | Control footer visibility | `boolean` | `true` |
| `status` | Visual status style | `'success' \| 'warning' \| 'error'` | `undefined` |
| `order-on-confirm` | Auto-order range values when the end date is earlier than the start date | `boolean` | `false` |
| `prefix-icon` | Custom prefix icon component or string | `string \| Component` | `''` |
| `clear-icon` | Custom clear icon component or string | `string \| Component` | `''` |
| `default-value` | Default panel anchor date when opening | `Date \| Date[]` | `undefined` |
| `panel-only` | Render the panel inline without the input shell | `boolean` | `false` |
| `default-time` | Default time value for datetime workflows | `Date \| Date[]` | `undefined` |
| `popper-class` | Extra class name for the floating panel | `string` | `''` |
| `teleported` | Teleport the panel to `body` | `boolean` | `true` |
| `validate-event` | Trigger form validation after value changes | `boolean` | `true` |
| `name` | Native form field name | `string` | `''` |
| `id` | Native form field id | `string` | `''` |
| `cell-shape` | Date cell shape | `'round' \| 'square'` | `'round'` |
| `cell-render` | Custom date cell text renderer | `(date: Date) => string \| { text: string; className?: string }` | `undefined` |
| `theme-overrides` | Component theme override variables | `ComponentThemeVars` | `undefined` |

### Events

The current implementation emits the following events at runtime:

| Event | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the bound value changes | `(value: YhDatePickerValue \| YhDatePickerRangeValue) => void` |
| `change` | Triggered after the value changes | `(value: YhDatePickerValue \| YhDatePickerRangeValue) => void` |
| `clear` | Triggered after the clear icon resets the value | `() => void` |
| `confirm` | Triggered when the confirm button is clicked | `(value: YhDatePickerValue \| YhDatePickerRangeValue) => void` |

### Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| `prefix-icon` | Custom prefix icon content | - |
| `clear-icon` | Custom clear icon content | - |
| `extra` | Extra content rendered above presets and footer | - |
| `date-cell` | Custom date cell content | `{ cell: CalendarCell }` |
| `footer` | Custom footer content | - |

### Expose

The current implementation does not expose public instance methods or properties.

### Type Exports

| Type | Description |
| --- | --- |
| `YhDatePickerProps` | Component props type |
| `YhDatePickerEmits` | Component emits type declaration |
| `YhDatePickerSlots` | Component slot type declaration |
| `YhDatePickerPreset` | Preset item type |
| `YhDatePickerValue` | Single value type |
| `YhDatePickerRangeValue` | Range value type |
| `YhDatePickerPanelView` | Panel view type |
| `YhDatePickerInstance` | Component instance type |

### Theme Variables

`YhDatePicker` consumes the following component-level CSS variables and also supports `themeOverrides`.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-date-picker-width` | Default width | `220px` |
| `--yh-date-picker-range-width` | Range width | `400px` |
| `--yh-date-picker-primary` | Primary color | `var(--yh-color-primary)` |
| `--yh-date-picker-primary-rgb` | Primary RGB token | `var(--yh-color-primary-rgb)` |
| `--yh-date-picker-text-main` | Main text color | `var(--yh-text-color-primary)` |
| `--yh-date-picker-text-secondary` | Secondary text color | `var(--yh-text-color-secondary)` |
| `--yh-date-picker-border` | Border color | `var(--yh-border-color)` |
| `--yh-date-picker-panel-shadow` | Panel shadow | `var(--yh-shadow-lg)` |
| `--yh-date-picker-item-hover` | Hover background | `var(--yh-fill-color-light)` |
| `--yh-date-picker-range-bg` | Range background | `var(--yh-color-primary-light-9)` |
| `--yh-date-picker-panel-width` | Panel width | `380px` |
| `--yh-date-picker-panel-bg` | Panel background | `var(--yh-bg-color-overlay)` |
| `--yh-date-picker-hover-bg` | Hover state background | `var(--yh-date-picker-item-hover)` |
| `--yh-date-picker-active-bg` | Active cell background | `var(--yh-date-picker-primary)` |
| `--yh-date-picker-active-color` | Active cell text color | `var(--yh-color-white)` |

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
  min-width: 80px;
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
