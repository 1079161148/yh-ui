# TimeSelect

Used for selecting or entering a fixed point in time, suitable for appointment, scheduling, and business hour scenarios.

<script setup lang="ts">
import { ref } from 'vue'

// Basic Usage
const timeBasic = ref('')

// Disabled State
const timeDisabled = ref('09:00')

// Clearable
const timeClearable = ref('10:30')

// Time Range Selection
const startTime = ref('')
const endTime = ref('')

// Fixed Time Range
const timeRange = ref('')

// Disabled Hours
const timeDisabledHours = ref('')

// minTime and maxTime
const timeMinMax = ref('')

// Different Sizes
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')
const timeFormat = ref('')

// Custom Time Options
const timeCustom = ref('')
const customOptions = [
  { value: '08:00', label: '🌅 Early Morning 8:00' },
  { value: '09:00', label: '☀️ Morning 9:00' },
  { value: '12:00', label: '🌞 Noon 12:00' },
  { value: '14:00', label: '🌤️ Afternoon 2:00' },
  { value: '18:00', label: '🌆 Evening 6:00' },
  { value: '20:00', label: '🌙 Night 8:00' }
]

// Full Functionality Demo
const timeFull = ref('')

// Nuxt Usage Example
const nuxtTime = ref('')

// Nuxt code sample
const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <!-- TimeSelect, auto-imported -->
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

// No manual import needed for YhTimeSelect
const nuxtTime = ref('09:00')
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Code samples
const tsBasic = `<template>
  <div style="max-width: 240px;">
    <yh-time-select 
      v-model="value" 
      start="00:00" 
      end="23:30" 
      step="00:30" 
      placeholder="Select time" 
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ value || 'Not selected' }}</p>
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
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ value || 'Not selected' }}</p>
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
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Hours: 09:00 - 21:00, with 30-min intervals</p>
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
      placeholder="Lunch and dinner times unavailable"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      Disabled: 12:00-13:30 (Lunch), 18:00-19:00 (Dinner)
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
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ value || 'Not selected' }}</p>
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
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ value || 'Not selected' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: '08:00', label: '🌅 Early Morning 8:00' },
  { value: '09:00', label: '☀️ Morning 9:00' },
  { value: '12:00', label: '🌞 Noon 12:00' },
  { value: '14:00', label: '🌤️ Afternoon 2:00' },
  { value: '18:00', label: '🌆 Evening 6:00' },
  { value: '20:00', label: '🌙 Night 8:00' }
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
      placeholder="Select any time (15-min intervals)"
      @change="handleChange"
      @clear="handleClear"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current choice: {{ value || 'Not selected' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const handleChange = (val: string) => {
  console.log('Time changed:', val)
}

const handleClear = () => {
  console.log('Cleared')
}
<\/script>`

const jsFull = tsFull.replace('lang="ts"', '').replace(': string', '')
</script>

::: tip TimePicker vs TimeSelect
- **TimePicker**: Free selection of any time point via spinner panels.
- **TimeSelect**: Selection from a predefined list of fixed time slots (this component), ideal for appointments, shifts, or business hours.
:::

## Basic Usage

The most fundamental time selector. You can customize the start time, end time, and step size.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 240px;">
    <yh-time-select 
      v-model="timeBasic" 
      start="00:00" 
      end="23:30" 
      step="00:30" 
      placeholder="Select time" 
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ timeBasic || 'Not selected' }}</p>
  </div>
</DemoBlock>

## Disabled State

Use the `disabled` property to disable the entire time selector.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeDisabled" disabled placeholder="Disabled" />
  </div>
</DemoBlock>

## Clearable

Set the `clearable` property to allow clearing the selected time.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeClearable" clearable placeholder="Clearable" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ timeClearable || 'Not selected' }}</p>
  </div>
</DemoBlock>

## Time Range Selection

Achieve time range linkage with `min-time` and `max-time`. The `max-time` of the start selector binds to the end value, and the `min-time` of the end selector binds to the start value.

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

Set the time range and intervals using `start`, `end`, and `step`.

<DemoBlock title="Fixed Time Range" :ts-code="tsFixedRange" :js-code="jsFixedRange">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeRange"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="Select treatment time"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Treatment time: 09:00 - 21:00, 30-min slots</p>
  </div>
</DemoBlock>

## Disabled Time Slots

Use the `disabled-hours` property to disable specific time ranges, such as lunch breaks or meal times.

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
      Disabled: 12:00-13:30 (Lunch), 18:00-19:00 (Dinner)
    </p>
  </div>
</DemoBlock>

## minTime and maxTime Constraints

Use `min-time` and `max-time` to restrict the selectable range. Options outside this range will be disabled.

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

Use the `size` property to change the picker's dimensions. Options: `large`, `default`, `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="timeLarge" size="large" placeholder="Large" />
    <yh-time-select v-model="timeDefault" placeholder="Default" />
    <yh-time-select v-model="timeSmall" size="small" placeholder="Small" />
  </div>
</DemoBlock>

## Time Format

Customize the time display format using the `format` property.

<DemoBlock title="Time Format" :ts-code="tsFormat" :js-code="jsFormat">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeFormat"
      start="08:30"
      step="00:15"
      end="18:30"
      format="HH:mm"
      placeholder="Custom format"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ timeFormat || 'Not selected' }}</p>
  </div>
</DemoBlock>

## Custom Time Options

Use the `options` property to provide a custom list of time slots, which takes precedence over `start`/`end`/`step` configurations.

<DemoBlock title="Custom Time Options" :ts-code="tsCustomOptions" :js-code="jsCustomOptions">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeCustom" :options="customOptions" placeholder="Select time period" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current value: {{ timeCustom || 'Not selected' }}</p>
  </div>
</DemoBlock>

## Full Feature Demo

Showing searchability, clearability, and custom time intervals.

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
      placeholder="Any time (15-min interval)"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">Current selection: {{ timeFull || 'Not selected' }}</p>
  </div>
</DemoBlock>

## Usage in Nuxt

The TimeSelect component fully supports SSR in Nuxt 3/4. When used in a Nuxt project, it is auto-imported.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
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

**SSR Considerations**:

- ✅ Time option lists and initial values are fully supported.
- ✅ Formatting (`format`) renders correctly on the server.
- ✅ Disabled slots and range limits are supported during SSR.
- ✅ Dropdown lists use Teleport but remain SSR-compatible for the initial load.
- ⚠️ Scroll positioning and search matching become active after client-side hydration.

::: tip SSR Safety
TimeSelect's list of options is pre-generated on the server based on `start`/`end`/`step` parameters, ensuring the dropdown is fully populated on initial load, providing excellent SEO and interaction.
:::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string` | — |
| disabled | Whether to disable the picker | `boolean` | `false` |
| editable | Whether the input is editable (searchable) | `boolean` | `true` |
| clearable | Whether the value can be cleared | `boolean` | `true` |
| size | Input box size | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | Placeholder text | `string` | `'Select time'` |
| name | Native name attribute | `string` | — |
| effect | Dropdown theme | `'dark' \| 'light'` | `'light'` |
| prefix-icon | Prefix icon | `string \| Component` | Clock icon |
| clear-icon | Clear icon | `string \| Component` | Close circle icon |
| start | Start time | `string` | `'09:00'` |
| end | End time | `string` | `'18:00'` |
| step | Time interval | `string` | `'00:30'` |
| min-time | Minimum selectable time | `string` | — |
| max-time | Maximum selectable time | `string` | — |
| value-on-clear | Value returned on clear | `string` | `undefined` |
| format | Display format | `string` | `'HH:mm'` |
| popper-class | Dropdown class name | `string` | — |
| popper-style | Dropdown custom styles | `string \| object` | — |
| teleported | Whether to insert the dropdown into body | `boolean` | `true` |
| include-end-time | Whether to include the end time in the list | `boolean` | `false` |
| validate-event | Whether to trigger form validation | `boolean` | `true` |
| options | Custom list of time options | `TimeOption[]` | — |
| disabled-hours | Disabled time spans | `string[][]` | — |

### TimeOption

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| value | Time value | `string` | ✅ |
| label | Display label | `string` | ✅ |
| disabled | Whether disabled | `boolean` | — |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| change | Triggers when the value changes | `(value: string \| undefined) => void` |
| focus | Triggers on focus | `(event: FocusEvent) => void` |
| blur | Triggers on blur | `(event: FocusEvent) => void` |
| clear | Triggers when cleared | `() => void` |
| visible-change | Triggers when the dropdown shows/hides | `(visible: boolean) => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| prefix | Custom prefix icon | — |
| empty | Content when no data is available | — |
| option | Custom content for options | `{ option: TimeOption }` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the component | `() => void` |
| blur | Blur the component | `() => void` |
| inputRef | Reference to the native input element | `HTMLInputElement \| undefined` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-time-select-height-large` | Large size height | `40px` |
| `--yh-time-select-height-default` | Default size height | `32px` |
| `--yh-time-select-height-small` | Small size height | `24px` |
| `--yh-time-select-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-time-select-border-color-hover` | Hover border color | `var(--yh-border-color-hover)` |
| `--yh-time-select-bg-color` | Background color | `var(--yh-fill-color-blank)` |
| `--yh-time-select-text-color` | Text color | `var(--yh-text-color-primary)` |
| `--yh-time-select-placeholder-color` | Placeholder text color | `var(--yh-text-color-placeholder)` |
| `--yh-time-select-disabled-bg-color` | Disabled background color | `var(--yh-fill-color-light)` |
| `--yh-time-select-disabled-text-color` | Disabled text color | `var(--yh-text-color-disabled)` |

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
