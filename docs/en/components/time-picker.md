# TimePicker

Use `YhTimePicker` to select or enter arbitrary points in time. It supports spinner panels, range selection, 12-hour formatting, disabled time rules, and footer actions.


<script setup lang="ts">
import { ref } from 'vue'

const timeBasic = ref('')
const timeDisabled = ref('14:30:00')
const timeClearable = ref('09:15:30')
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')
const time12Hours = ref('')
const timeNoSeconds = ref('')
const timeArrow = ref('')
const timeStep = ref('')
const timeDisabledTime = ref('')
const timeRange = ref<[string, string] | null>(null)
const timeRangeOrder = ref<[string, string] | null>(['10:00:00', '08:00:00'])
const timeFull = ref('')
const nuxtTime = ref('')

const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => (hour === 12 ? [0, 15, 30, 45] : []),
  disabledSeconds: () => []
}

const tsBasic = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" placeholder="Select time" />
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
    <yh-time-picker v-model="time" arrow-control placeholder="Arrow control" />
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
      Disabled: 00:00-05:59, 22:00-23:59, and specific minutes at 12:00
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')

const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => (hour === 12 ? [0, 15, 30, 45] : []),
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
    <yh-time-picker v-model="time" placeholder="Nuxt auto-import" />
  </div>
</template>

<script setup lang="ts">
const time = ref('')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

::: tip TimePicker vs TimeSelect
- **TimePicker**: Select any time through spinner panels.
- **TimeSelect**: Pick from a predefined list of fixed time slots.
:::

## Basic Usage

Click the input to open the panel and choose hours, minutes, and seconds.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeBasic" placeholder="Select time" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeBasic || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Disabled State

Use `disabled` to prevent interaction.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeDisabled" disabled placeholder="Disabled" />
  </div>
</DemoBlock>

## Clearable

Set `clearable` to show the clear icon when a value exists.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeClearable" clearable placeholder="Clearable" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeClearable || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Different Sizes

Use `size` to switch between `large`, default, and `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 220px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-picker v-model="timeLarge" size="large" placeholder="Large" />
    <yh-time-picker v-model="timeDefault" placeholder="Default" />
    <yh-time-picker v-model="timeSmall" size="small" placeholder="Small" />
  </div>
</DemoBlock>

## 12-Hour Format

Set `use12-hours` to render the displayed value with AM/PM formatting.

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

Set `show-seconds` to `false` to keep only the hour and minute columns.

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

Set `arrow-control` to switch the panel to up/down controls.

<DemoBlock title="Arrow Control Mode" :ts-code="tsArrow" :js-code="jsArrow">
  <div style="max-width: 200px;">
    <yh-time-picker v-model="timeArrow" arrow-control placeholder="Arrow control" />
  </div>
</DemoBlock>

## Step Settings

Use `hour-step`, `minute-step`, and `second-step` to control the available increments.

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

Use `disabled-time` to disable specific hours, minutes, or seconds.

<DemoBlock title="Disabled Time" :ts-code="tsDisabledTime" :js-code="jsDisabledTime">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeDisabledTime"
      :disabled-time="disabledTimeConfig"
      placeholder="Restricted time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Disabled: 00:00-05:59, 22:00-23:59, and specific minutes at 12:00
    </p>
  </div>
</DemoBlock>

## Time Range Selection

Set `is-range` to select start and end times in the same control.

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

Set `order-on-confirm` to swap the range values automatically when the end time is earlier than the start time.

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

This example combines clearable behavior, footer actions, and custom action labels.

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

## Use in Nuxt

After installing the YH-UI Nuxt module, `YhTimePicker` can be used directly. Inputs, initial values, and placeholders render during SSR, while popup positioning, panel scrolling, and imperative methods such as `focus` and `open` continue on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="nuxtTime" placeholder="Nuxt auto-import" />
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Bound value | `YhTimePickerValue \| YhTimePickerRangeValue` | `undefined` |
| disabled | Whether the picker is disabled | `boolean` | `false` |
| editable | Whether the input is editable | `boolean` | `true` |
| clearable | Whether the value can be cleared | `boolean` | `true` |
| size | Input size | `'large' \| 'default' \| 'small'` | `undefined` |
| placeholder | Placeholder text in single mode | `string` | `''` |
| start-placeholder | Placeholder text for the start input in range mode | `string` | `''` |
| end-placeholder | Placeholder text for the end input in range mode | `string` | `''` |
| name | Native `input` name | `string` | `undefined` |
| is-range | Whether range mode is enabled | `boolean` | `false` |
| format | Display format | `string` | `'HH:mm:ss'` |
| value-format | Format used when emitting string values. Falls back to `format` when omitted | `string` | `undefined` |
| prefix-icon | Declared prefix icon prop. The current template still renders the built-in clock icon and does not consume this prop | `string \| Component` | `undefined` |
| clear-icon | Declared clear icon prop. The current template still renders the built-in clear icon and does not consume this prop | `string \| Component` | `undefined` |
| use12-hours | Whether to use 12-hour format | `boolean` | `false` |
| show-seconds | Whether the seconds column is shown | `boolean` | `true` |
| hour-step | Hour step size | `number` | `1` |
| minute-step | Minute step size | `number` | `1` |
| second-step | Second step size | `number` | `1` |
| disabled-time | Disabled time configuration | `YhTimePickerDisabledTimeConfig` | `undefined` |
| popper-class | Custom panel class name | `string` | `undefined` |
| popper-style | Declared panel style prop. The current implementation does not merge this prop into the popup styles | `string \| Record<string, string>` | `undefined` |
| teleported | Whether the panel is teleported to `body` | `boolean` | `true` |
| validate-event | Whether form validation runs on change and blur | `boolean` | `true` |
| popper-offset | Offset between the input and popup panel | `number` | `4` |
| range-separator | Range separator text | `string` | `'-'` |
| default-value | Initial panel value used when the bound value is empty | `YhTimePickerValue \| YhTimePickerRangeValue` | `undefined` |
| hour-options | Custom hour options | `number[]` | `undefined` |
| minute-options | Custom minute options | `number[]` | `undefined` |
| second-options | Custom second options | `number[]` | `undefined` |
| hide-on-blur | Whether the panel closes on blur | `boolean` | `true` |
| confirm-text | Confirm button label. Falls back to locale text when empty | `string` | `''` |
| cancel-text | Cancel button label. Falls back to locale text when empty | `string` | `''` |
| now-text | Now button label. Falls back to locale text when empty | `string` | `''` |
| show-footer | Whether the footer action area is shown | `boolean` | `true` |
| show-now | Whether the now button is shown in the footer | `boolean` | `true` |
| arrow-control | Whether arrow control mode is enabled | `boolean` | `false` |
| tabindex | Native `tabindex` value | `number \| string` | `0` |
| id | Native `input` id in single mode. Range mode does not apply this prop to the start/end inputs | `string` | `undefined` |
| order-on-confirm | Whether range values are auto-sorted on confirm | `boolean` | `false` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggered when the bound value updates | `(value: YhTimePickerValue \| YhTimePickerRangeValue) => void` |
| change | Triggered when the confirmed value changes | `(value: YhTimePickerValue \| YhTimePickerRangeValue) => void` |
| focus | Triggered when the input gains focus | `(event: FocusEvent) => void` |
| blur | Triggered when the input loses focus | `(event: FocusEvent) => void` |
| clear | Triggered when the clear icon is clicked | `() => void` |
| visible-change | Triggered when panel visibility changes | `(visible: boolean) => void` |
| confirm | Triggered when the confirm button is clicked | `(value: YhTimePickerValue \| YhTimePickerRangeValue) => void` |
| cancel | Triggered when the cancel button is clicked | `() => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| prefix | Content rendered before the input | - |
| suffix | Declared in the slot type, but the current template does not render this slot | - |
| rangeSeparator | Custom range separator content | - |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focuses the input | `() => void` |
| blur | Blurs the input | `() => void` |
| open | Opens the panel | `() => void` |
| close | Closes the panel | `() => void` |
| inputRef | Ref to the single-mode input. In range mode it does not point to the start/end inputs | `Ref<HTMLInputElement \| undefined>` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhTimePickerProps` | Props type for `YhTimePicker` |
| `YhTimePickerEmits` | Emits type for `YhTimePicker` |
| `YhTimePickerSlots` | Slots type for `YhTimePicker` |
| `YhTimePickerExpose` | Public expose type for `YhTimePicker` |
| `YhTimePickerSize` | Size union type |
| `YhTimePickerValue` | Single time value type |
| `YhTimePickerRangeValue` | Time range value type |
| `YhTimePickerDisabledTimeConfig` | Disabled time configuration type |
| `YhTimePickerState` | Internal panel time state type |
| `YhTimePickerInstance` | Component instance type |

### Theme Variables

`YhTimePicker` supports `themeOverrides`. The stylesheet directly consumes the following component-scoped CSS variables, while borders, shadows, and text colors continue to inherit shared theme tokens.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-time-picker-width` | Width in single mode | `220px` |
| `--yh-time-picker-range-width` | Width in range mode | `360px` |
| `--yh-time-picker-active-color` | Active item text color | `var(--yh-color-primary)` |
| `--yh-time-picker-active-bg` | Active item background color | `var(--yh-color-primary-light-9)` |
| `--yh-time-picker-hover-bg` | Hover background color for spinner items | `var(--yh-fill-color-light)` |
| `--yh-time-picker-panel-bg` | Popup panel background color | `var(--yh-bg-color)` |
| `--yh-time-picker-border-radius` | Popup border radius | `var(--yh-radius-md)` |

