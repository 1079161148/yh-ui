# TimeSelect

Use `YhTimeSelect` to choose from a predefined list of time slots. It fits appointment, scheduling, opening-hours, and other fixed-slot scenarios.


<script setup lang="ts">
import { ref } from 'vue'

const timeBasic = ref('')
const timeDisabled = ref('09:00')
const timeClearable = ref('10:30')
const startTime = ref('')
const endTime = ref('')
const timeRange = ref('')
const timeDisabledHours = ref('')
const timeMinMax = ref('')
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')
const timeFormat = ref('')
const timeCustom = ref('')
const timeFull = ref('')
const nuxtTime = ref('')

const customOptions = [
  { value: '08:00', label: 'Early Morning 08:00' },
  { value: '09:00', label: 'Morning 09:00' },
  { value: '12:00', label: 'Noon 12:00' },
  { value: '14:00', label: 'Afternoon 14:00' },
  { value: '18:00', label: 'Evening 18:00' },
  { value: '20:00', label: 'Night 20:00' }
]

const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="nuxtTime"
      start="08:30"
      step="00:15"
      end="18:30"
      placeholder="Nuxt auto-import"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nuxtTime = ref('09:00')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const tsBasic = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="00:00"
      end="23:30"
      step="00:30"
      placeholder="Select time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ value || 'Not selected' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" disabled placeholder="Disabled" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('09:00')
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsClearable = `<template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" clearable placeholder="Clearable" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ value || 'Not selected' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('10:30')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsTimeRange = `<template>
  <div style="display: flex; align-items: center; gap: 16px; max-width: 500px;">
    <yh-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="Start time"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
    <span style="color: #909399;">to</span>
    <yh-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="End time"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
  </div>
  <p style="margin-top: 8px; color: #909399; font-size: 12px;">
    Selected range: {{ startTime || '--' }} to {{ endTime || '--' }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const startTime = ref('')
const endTime = ref('')
<\/script>`

const jsTimeRange = tsTimeRange.replace('lang="ts"', '')

const tsFixedRange = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="Select treatment time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Hours: 09:00 - 21:00, with 30-minute intervals
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsFixedRange = tsFixedRange.replace('lang="ts"', '')

const tsDisabledHours = `<template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="08:00"
      end="20:00"
      step="00:30"
      :disabled-hours="[['12:00', '13:30'], ['18:00', '19:00']]"
      placeholder="Lunch and dinner unavailable"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Disabled: 12:00-13:30 and 18:00-19:00
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsDisabledHours = tsDisabledHours.replace('lang="ts"', '')

const tsMinMax = `<template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="06:00"
      end="22:00"
      step="00:30"
      min-time="09:00"
      max-time="18:00"
      placeholder="Work hours 09:00-18:00"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Selectable range: 09:00 - 18:00
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsMinMax = tsMinMax.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="large" size="large" placeholder="Large" />
    <yh-time-select v-model="defaultVal" placeholder="Default" />
    <yh-time-select v-model="small" size="small" placeholder="Small" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const tsFormat = `<template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="08:30"
      step="00:15"
      end="18:30"
      format="hh:mm A"
      placeholder="Custom format"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ value || 'Not selected' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
<\/script>`

const jsFormat = tsFormat.replace('lang="ts"', '')

const tsCustomOptions = `<template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" :options="options" placeholder="Select time period" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ value || 'Not selected' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: '08:00', label: 'Early Morning 08:00' },
  { value: '09:00', label: 'Morning 09:00' },
  { value: '12:00', label: 'Noon 12:00' },
  { value: '14:00', label: 'Afternoon 14:00' },
  { value: '18:00', label: 'Evening 18:00' },
  { value: '20:00', label: 'Night 20:00' }
]
<\/script>`

const jsCustomOptions = tsCustomOptions.replace('lang="ts"', '')

const tsFull = `<template>
  <div style="max-width: 320px;">
    <yh-time-select
      v-model="value"
      start="00:00"
      end="23:59"
      step="00:15"
      clearable
      editable
      include-end-time
      placeholder="Select any time (15-minute intervals)"
      @change="handleChange"
      @clear="handleClear"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current choice: {{ value || 'Not selected' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const handleChange = (val: string | undefined) => {
  console.log('Time changed:', val)
}

const handleClear = () => {
  console.log('Cleared')
}
<\/script>`

const jsFull = tsFull.replace('lang="ts"', '').replace(': string | undefined', '')
</script>

::: tip TimePicker vs TimeSelect
- **TimePicker**: Select any arbitrary time through a spinner panel.
- **TimeSelect**: Select from a predefined list of time options generated from rules or custom data.
:::

## Basic Usage

Configure the available options through `start`, `end`, and `step`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeBasic"
      start="00:00"
      end="23:30"
      step="00:30"
      placeholder="Select time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeBasic || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Disabled State

Use `disabled` to make the whole control non-interactive.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeDisabled" disabled placeholder="Disabled" />
  </div>
</DemoBlock>

## Clearable

Set `clearable` to display a clear icon when a value exists.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeClearable" clearable placeholder="Clearable" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeClearable || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Time Range Selection

Link two `YhTimeSelect` instances together with `min-time` and `max-time`.

<DemoBlock title="Time Range Selection" :ts-code="tsTimeRange" :js-code="jsTimeRange">
  <div style="display: flex; align-items: center; gap: 16px; max-width: 500px;">
    <yh-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="Start time"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
    <span style="color: #909399;">to</span>
    <yh-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="End time"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
  </div>
  <p style="margin-top: 8px; color: #909399; font-size: 12px;">
    Selected range: {{ startTime || '--' }} to {{ endTime || '--' }}
  </p>
</DemoBlock>

## Fixed Time Range

Define a fixed selectable range with `start`, `end`, and `step`.

<DemoBlock title="Fixed Time Range" :ts-code="tsFixedRange" :js-code="jsFixedRange">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeRange"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="Select treatment time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Hours: 09:00 - 21:00, with 30-minute intervals
    </p>
  </div>
</DemoBlock>

## Disabled Time Slots

Use `disabled-hours` to mark specific time ranges as unavailable.

<DemoBlock title="Disabled Time Slots" :ts-code="tsDisabledHours" :js-code="jsDisabledHours">
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="timeDisabledHours"
      start="08:00"
      end="20:00"
      step="00:30"
      :disabled-hours="[['12:00', '13:30'], ['18:00', '19:00']]"
      placeholder="Lunch and dinner unavailable"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Disabled: 12:00-13:30 and 18:00-19:00
    </p>
  </div>
</DemoBlock>

## minTime and maxTime Constraints

Use `min-time` and `max-time` to disable options outside the allowed range.

<DemoBlock title="minTime and maxTime Constraints" :ts-code="tsMinMax" :js-code="jsMinMax">
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="timeMinMax"
      start="06:00"
      end="22:00"
      step="00:30"
      min-time="09:00"
      max-time="18:00"
      placeholder="Work hours 09:00-18:00"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Selectable range: 09:00 - 18:00
    </p>
  </div>
</DemoBlock>

## Different Sizes

Use `size` to switch between `large`, default, and `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="timeLarge" size="large" placeholder="Large" />
    <yh-time-select v-model="timeDefault" placeholder="Default" />
    <yh-time-select v-model="timeSmall" size="small" placeholder="Small" />
  </div>
</DemoBlock>

## Time Format

Set `format` to control the displayed label text of generated options.

<DemoBlock title="Time Format" :ts-code="tsFormat" :js-code="jsFormat">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeFormat"
      start="08:30"
      step="00:15"
      end="18:30"
      format="hh:mm A"
      placeholder="Custom format"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeFormat || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Custom Time Options

Use `options` to provide a fully custom option list. When present, it takes precedence over `start`, `end`, and `step`.

<DemoBlock title="Custom Time Options" :ts-code="tsCustomOptions" :js-code="jsCustomOptions">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeCustom" :options="customOptions" placeholder="Select time period" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current value: {{ timeCustom || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Full Feature Demo

This example combines editable filtering, clearing, custom intervals, and end-time inclusion.

<DemoBlock title="Full Feature Demo" :ts-code="tsFull" :js-code="jsFull">
  <div style="max-width: 320px;">
    <yh-time-select
      v-model="timeFull"
      start="00:00"
      end="23:59"
      step="00:15"
      clearable
      editable
      include-end-time
      placeholder="Select any time (15-minute intervals)"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Current choice: {{ timeFull || 'Not selected' }}
    </p>
  </div>
</DemoBlock>

## Use in Nuxt

`YhTimeSelect` can be used directly in Nuxt after registering the YH-UI module. The generated option list and current value render during SSR, while popup positioning, input filtering, and scrolling continue on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="nuxtTime"
      start="08:30"
      step="00:15"
      end="18:30"
      placeholder="Nuxt auto-import"
    />
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Bound value | `string` | `undefined` |
| disabled | Whether the component is disabled | `boolean` | `false` |
| editable | Whether the input is editable and filterable | `boolean` | `true` |
| clearable | Whether the current value can be cleared | `boolean` | `true` |
| size | Input size | `'large' \| 'default' \| 'small'` | `undefined` |
| placeholder | Placeholder text | `string` | `''` |
| name | Native input name | `string` | `undefined` |
| effect | Dropdown visual theme | `'dark' \| 'light'` | `'light'` |
| prefix-icon | Declared prefix icon prop. The current template still renders the built-in clock icon and does not consume this prop | `string \| Component` | `undefined` |
| clear-icon | Declared clear icon prop. The current template still renders the built-in clear icon and does not consume this prop | `string \| Component` | `undefined` |
| start | Start time used to generate options | `string` | `'09:00'` |
| end | End time used to generate options | `string` | `'18:00'` |
| step | Time interval used to generate options | `string` | `'00:30'` |
| min-time | Minimum selectable time | `string` | `undefined` |
| max-time | Maximum selectable time | `string` | `undefined` |
| value-on-clear | Value emitted when cleared. Falls back to `undefined` when omitted | `string` | `undefined` |
| format | Display format for generated options | `string` | `'HH:mm'` |
| popper-class | Custom dropdown class name | `string` | `undefined` |
| popper-style | Declared dropdown style prop. The current implementation does not merge this prop into the dropdown styles | `string \| Record<string, string>` | `undefined` |
| teleported | Whether the dropdown is teleported to `body` | `boolean` | `true` |
| include-end-time | Compatibility prop for including the end option. The current implementation already includes the exact end time in generated lists | `boolean` | `false` |
| validate-event | Whether form validation is triggered on change and blur | `boolean` | `true` |
| options | Custom time option list | `YhTimeSelectOption[]` | `undefined` |
| disabled-hours | Disabled time ranges | `string[][]` | `undefined` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggered when the bound value updates | `(value: string \| undefined) => void` |
| change | Triggered when the selected value changes | `(value: string \| undefined) => void` |
| focus | Triggered when the input gains focus | `(event: FocusEvent) => void` |
| blur | Triggered when the input loses focus | `(event: FocusEvent) => void` |
| clear | Triggered when the clear icon is clicked | `() => void` |
| visible-change | Triggered when the dropdown visibility changes | `(visible: boolean) => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| prefix | Content rendered before the input | - |
| empty | Content rendered when no option is available | - |
| option | Custom option content | `{ option: YhTimeSelectOption }` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focuses the input | `() => void` |
| blur | Blurs the input | `() => void` |
| inputRef | Ref to the internal input element | `Ref<HTMLInputElement \| undefined>` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhTimeSelectProps` | Props type for `YhTimeSelect` |
| `YhTimeSelectEmits` | Emits type for `YhTimeSelect` |
| `YhTimeSelectSlots` | Slots type for `YhTimeSelect` |
| `YhTimeSelectExpose` | Public expose type for `YhTimeSelect` |
| `YhTimeSelectSize` | Size union type |
| `YhTimeSelectOption` | Time option item type |
| `YhTimeSelectInstance` | Component instance type |

### Theme Variables

`YhTimeSelect` supports `themeOverrides`. Its stylesheet directly consumes the following component-scoped CSS variables, while border, background, and text color tokens continue to come from the shared theme system.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-time-select-height` | Control height | `var(--yh-component-size-default, 32px)` |
| `--yh-time-select-font-size` | Input and option font size | `var(--yh-font-size-base, 14px)` |
| `--yh-time-select-icon-size` | Prefix and suffix icon size | `14px` |
| `--yh-time-select-prefix-margin` | Left spacing before the prefix icon | `12px` |
| `--yh-time-select-display-padding` | Left padding for the display label | `38px` |

## Use Cases

### Appointment System

```vue
<template>
  <yh-form :model="form">
    <yh-form-item label="Appointment Date">
      <yh-date-picker v-model="form.date" />
    </yh-form-item>
    <yh-form-item label="Appointment Time">
      <yh-time-select
        v-model="form.time"
        start="09:00"
        end="17:00"
        step="00:30"
        :disabled-hours="[['12:00', '13:00']]"
        placeholder="Select appointment time"
      />
    </yh-form-item>
  </yh-form>
</template>
```

### Business Hours Setup

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <yh-time-select
      v-model="openTime"
      :max-time="closeTime"
      start="00:00"
      end="23:59"
      step="00:30"
      placeholder="Opening time"
    />
    <span>-</span>
    <yh-time-select
      v-model="closeTime"
      :min-time="openTime"
      start="00:00"
      end="23:59"
      step="00:30"
      placeholder="Closing time"
    />
  </div>
</template>
```

### Scheduling System

```vue
<template>
  <yh-time-select
    v-model="shiftTime"
    :options="[
      { value: '08:00', label: 'Morning Shift (08:00-16:00)' },
      { value: '16:00', label: 'Afternoon Shift (16:00-00:00)' },
      { value: '00:00', label: 'Night Shift (00:00-08:00)' }
    ]"
    placeholder="Select shift"
  />
</template>
```

