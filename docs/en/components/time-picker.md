# TimePicker

A time picker for selecting or entering arbitrary points in time. It supports hour/minute/second spinner selection, 12/24-hour formats, time disabling, and other advanced features.

<script setup lang="ts">
import { ref } from 'vue'

// Basic Usage
const timeBasic = ref('')

// Disabled State
const timeDisabled = ref('14:30:00')

// Clearable
const timeClearable = ref('09:15:30')

// Different Sizes
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')

// 12-Hour Format
const time12Hours = ref('')

// Hide Seconds
const timeNoSeconds = ref('')

// Arrow Control
const timeArrow = ref('')

// Step Setting
const timeStep = ref('')

// Disabled Time
const timeDisabledTime = ref('')

// Time Range
const timeRangeStart = ref('')
const timeRangeEnd = ref('')

// Range Selection
const timeRange = ref<[string, string] | null>(null)
const timeRangeOrder = ref<[string, string] | null>(['10:00:00', '08:00:00'])

// Full Functionality
const timeFull = ref('')

// Nuxt Example
const nuxtTime = ref('')

// Disabled time config
const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => hour === 12 ? [0, 15, 30, 45] : [],
  disabledSeconds: () => []
}

// Code samples
const tsBasic = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      placeholder="Select time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ time || 'Not selected' }}
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
    <yh-time-picker v-model="time" disabled placeholder="Disabled" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('14:30:00')
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsClearable = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" clearable placeholder="Clearable" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ time || 'Not selected' }}
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
    <yh-time-picker v-model="large" size="large" placeholder="Large" />
    <yh-time-picker v-model="defaultVal" placeholder="Default" />
    <yh-time-picker v-model="small" size="small" placeholder="Small" />
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
      placeholder="12-hour format"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ time || 'Not selected' }}
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
      placeholder="HH:mm"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ time || 'Not selected' }}
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
    <yh-time-picker
      v-model="time"
      arrow-control
      placeholder="Arrow control"
    />
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
      placeholder="Custom steps"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Hour step: 2, Minute step: 15, Second step: 30
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
      placeholder="Restricted time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Disabled: 0-5h, 22-23h, and specific minutes at 12h
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')

const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => hour === 12 ? [0, 15, 30, 45] : [],
  disabledSeconds: () => []
}
<\/script>`

const jsDisabledTime = tsDisabledTime.replace('lang="ts"', '').replace(': number', '')

const tsRange = `<template>
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      start-placeholder="Start time"
      end-placeholder="End time"
      range-separator="to"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeRange ? timeRange.join(' - ') : 'Not selected' }}
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
      start-placeholder="Start time"
      end-placeholder="End time"
      range-separator="to"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeRange ? timeRange.join(' - ') : 'Not selected' }}
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
      now-text="Now"
      confirm-text="OK"
      cancel-text="Cancel"
      placeholder="Full features demo"
      @change="handleChange"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')

const handleChange = (value: string) => {
  console.log('Time changed:', value)
}

const handleConfirm = (value: string) => {
  console.log('Time confirmed:', value)
}
<\/script>`

const jsFull = tsFull.replace('lang="ts"', '').replace(': string', '')

const tsNuxt = `<template>
  <div style="max-width: 220px;">
    <!-- TimePicker, auto-imported in Nuxt -->
    <yh-time-picker
      v-model="time"
      placeholder="Nuxt auto-import"
    />
  </div>
</template>

<script setup lang="ts">
// No manual import needed for YhTimePicker
const time = ref('')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

::: tip TimePicker vs TimeSelect
- **TimePicker**: Free selection of any time point via spinner panels (this component).
- **TimeSelect**: Selection from a predefined list of fixed time slots, ideal for appointment scenarios.

Choose the component that best fits your business needs.
:::

## Basic Usage

Click the input area to open the time selection panel. Scroll or click to select hours, minutes, and seconds.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeBasic"
      placeholder="Select time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeBasic || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Disabled State

Use the `disabled` property to disable the entire time picker.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeDisabled" disabled placeholder="Disabled" />
  </div>
</DemoBlock>

## Clearable

Set the `clearable` property to allow clearing the selected time.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeClearable" clearable placeholder="Clearable" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeClearable || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Different Sizes

Use the `size` property to change the picker's dimensions. Options: `large`, `default`, `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 220px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-picker v-model="timeLarge" size="large" placeholder="Large" />
    <yh-time-picker v-model="timeDefault" placeholder="Default" />
    <yh-time-picker v-model="timeSmall" size="small" placeholder="Small" />
  </div>
</DemoBlock>

## 12-Hour Format

Set the `use12-hours` property to enable the 12-hour format (AM/PM).

<DemoBlock title="12-Hour Format" :ts-code="ts12Hours" :js-code="js12Hours">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time12Hours"
      use12-hours
      format="hh:mm:ss A"
      placeholder="12-hour format"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ time12Hours || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Hide Seconds

Set `show-seconds` to `false` to hide the seconds selection column.

<DemoBlock title="Hide Seconds" :ts-code="tsNoSeconds" :js-code="jsNoSeconds">
  <div style="max-width: 180px;">
    <yh-time-picker
      v-model="timeNoSeconds"
      :show-seconds="false"
      format="HH:mm"
      placeholder="HH:mm"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeNoSeconds || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Arrow Control Mode

Set the `arrow-control` property to use up/down arrows for time adjustment instead of scrolling lists.

<DemoBlock title="Arrow Control Mode" :ts-code="tsArrow" :js-code="jsArrow">
  <div style="max-width: 200px;">
    <yh-time-picker
      v-model="timeArrow"
      arrow-control
      placeholder="Arrow control"
    />
  </div>
</DemoBlock>

## Step Settings

Use `hour-step`, `minute-step`, and `second-step` properties to set the intervals for time selection.

<DemoBlock title="Step Settings" :ts-code="tsStep" :js-code="jsStep">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeStep"
      :hour-step="2"
      :minute-step="15"
      :second-step="30"
      placeholder="Custom steps"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Hour step: 2, Minute step: 15, Second step: 30
    </p>
  </div>
</DemoBlock>

## Disabled Time

Use the `disabled-time` property to restrict selectable times. You can independently disable specific hours, minutes, and seconds.

<DemoBlock title="Disabled Time" :ts-code="tsDisabledTime" :js-code="jsDisabledTime">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeDisabledTime"
      :disabled-time="disabledTimeConfig"
      placeholder="Restricted time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Disabled: 0-5h, 22-23h, and specific minutes at 12h
    </p>
  </div>
</DemoBlock>

## Time Range Selection

Set the `is-range` property to enable time range selection mode.

<DemoBlock title="Time Range Selection" :ts-code="tsRange" :js-code="jsRange">
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      start-placeholder="Start time"
      end-placeholder="End time"
      range-separator="to"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeRange ? timeRange.join(' - ') : 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Automatic Range Sorting

By setting `order-on-confirm` to `true`, the system will no longer enforce strict disabling constraints (you can pick any time), but will automatically swap the values if the end time is earlier than the start time upon clicking "OK".

<DemoBlock title="Automatic Range Sorting" :ts-code="tsRangeOrder" :js-code="jsRangeOrder">
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRangeOrder"
      is-range
      order-on-confirm
      start-placeholder="Start time"
      end-placeholder="End time"
      range-separator="to"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeRangeOrder ? timeRangeOrder.join(' - ') : 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Full Feature Demo

A demonstration of common TimePicker features: clearable, footer actions, "Now" button, etc.

<DemoBlock title="Full Feature Demo" :ts-code="tsFull" :js-code="jsFull">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeFull"
      clearable
      :show-seconds="true"
      :show-footer="true"
      :show-now="true"
      now-text="Now"
      confirm-text="OK"
      cancel-text="Cancel"
      placeholder="Full features demo"
    />
  </div>
</DemoBlock>

## Usage in Nuxt

The TimePicker component fully supports SSR in Nuxt 3/4. When used in a Nuxt project, it is auto-imported.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="nuxtTime"
      placeholder="Nuxt auto-import"
    />
  </div>
</DemoBlock>

**SSR Considerations**:

- ✅ Component structure and styles fully support SSR.
- ✅ Initial values render correctly on the server.
- ✅ Panel uses Teleport but is SSR-compatible for the initial load.
- ⚠️ Spinner scroll positioning becomes active after client-side hydration.
- ⚠️ DOM-direct operations (like `focus`) only execute on the client.

::: tip SSR Best Practices
TimePicker's core logic is optimized for SSR. All operations that could cause hydration mismatches (like timestamp generation or direct DOM access) are safely deferred to the client side.
:::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| Date \| number \| [string, string]` | — |
| disabled | Whether to disable the picker | `boolean` | `false` |
| editable | Whether the input is editable | `boolean` | `true` |
| clearable | Whether the selected value can be cleared | `boolean` | `true` |
| size | Input size | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | Placeholder text | `string` | `'Select time'` |
| start-placeholder | Placeholder for the start time in range mode | `string` | `'Start time'` |
| end-placeholder | Placeholder for the end time in range mode | `string` | `'End time'` |
| is-range | Whether to enable range selection | `boolean` | `false` |
| format | Time display format | `string` | `'HH:mm:ss'` |
| value-format | Format for the bound value | `string` | `'HH:mm:ss'` |
| use12-hours | Whether to use 12-hour format | `boolean` | `false` |
| show-seconds | Whether to show the seconds column | `boolean` | `true` |
| hour-step | Interval between selectable hours | `number` | `1` |
| minute-step | Interval between selectable minutes | `number` | `1` |
| second-step | Interval between selectable seconds | `number` | `1` |
| disabled-time | Config for disabled times | `DisabledTimeConfig` | — |
| popper-class | Class name for the dropdown | `string` | — |
| teleported | Whether to insert the dropdown into body | `boolean` | `true` |
| range-separator | Separator for range display | `string` | `'-'` |
| arrow-control | Whether to use arrows for control | `boolean` | `false` |
| order-on-confirm | Whether to auto-swap range values if end < start | `boolean` | `false` |
| show-footer | Whether to show the bottom footer | `boolean` | `true` |
| show-now | Whether to show the "Now" button | `boolean` | `true` |
| confirm-text | Text for the OK button | `string` | `'OK'` |
| cancel-text | Text for the Cancel button | `string` | `'Cancel'` |
| now-text | Text for the Now button | `string` | `'Now'` |
| validate-event | Whether to trigger form validation | `boolean` | `true` |

### DisabledTimeConfig

| Name | Description | Type |
| --- | --- | --- |
| disabledHours | Disabled hours | `() => number[]` |
| disabledMinutes | Disabled minutes (based on selected hour) | `(hour: number) => number[]` |
| disabledSeconds | Disabled seconds (based on selected hour and minute) | `(hour: number, minute: number) => number[]` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| change | Triggers when time changes | `(value: TimeValue \| TimeRangeValue) => void` |
| focus | Triggers on focus | `(event: FocusEvent) => void` |
| blur | Triggers on blur | `(event: FocusEvent) => void` |
| clear | Triggers when cleared | `() => void` |
| visible-change | Triggers when the panel shows/hides | `(visible: boolean) => void` |
| confirm | Triggers when the OK button is clicked | `(value: TimeValue \| TimeRangeValue) => void` |
| cancel | Triggers when the Cancel button is clicked | `() => void` |

### Slots

| Name | Description |
| --- | --- |
| prefix | Custom prefix icon |
| suffix | Custom suffix icon |
| range-separator | Custom range separator content |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the picker | `() => void` |
| blur | Blur the picker | `() => void` |
| open | Open the selection panel | `() => void` |
| close | Close the selection panel | `() => void` |

## Theme Variables

All colors support dark mode via the global theme system:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-time-picker-width` | Picker width | `220px` |
| `--yh-time-picker-range-width` | Range picker width | `360px` |
| `--yh-time-picker-active-color` | Highlighted text color | `var(--yh-color-primary)` |
| `--yh-time-picker-active-bg` | Highlighted background color | `var(--yh-color-primary-light-9)` |
| `--yh-time-picker-hover-bg` | Hover background color | `var(--yh-fill-color-light)` |
| `--yh-time-picker-panel-bg` | Panel background color | `var(--yh-bg-color-overlay)` |
| `--yh-time-picker-panel-shadow` | Panel shadow | `var(--yh-shadow-lg)` |
| `--yh-time-picker-text-color` | Text color | `var(--yh-text-color-primary)` |
| `--yh-time-picker-text-secondary` | Secondary text color | `var(--yh-text-color-secondary)` |
| `--yh-time-picker-border` | Border color | `var(--yh-border-color-light)` |
| `--yh-time-picker-item-height` | Option item height | `32px` |
| `--yh-time-picker-spinner-height` | Spinner height | `192px` |
| `--yh-time-picker-border-radius` | Border radius | `var(--yh-border-radius-base)` |
