# Select

<script setup lang="ts">
import { ref } from 'vue'

// Basic Usage
const selectBasic = ref('')
const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]

// Disabled Option
const selectDisabledOption = ref('')
const disabledOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' }
]

// Disabled State
const selectDisabled = ref('option1')

// Clearable
const selectClearable = ref('option1')

// Multiple
const selectMultiple = ref([])

// Collapse Tags
const selectCollapse = ref(['option1', 'option2', 'option3'])

// Filterable
const selectFilterable = ref('')

// Remote Search
const selectRemote = ref('')
const remoteOptions = ref([])
const remoteLoading = ref(false)
const remoteMethod = (query: string) => {
  if (query) {
    remoteLoading.value = true
    setTimeout(() => {
      remoteOptions.value = basicOptions.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      remoteLoading.value = false
    }, 500)
  } else {
    remoteOptions.value = []
  }
}

// Allow Create
const selectCreate = ref([])

// Virtual Scroll
const selectVirtual = ref('')
const virtualOptions = Array.from({ length: 10000 }, (_, i) => ({
  value: `option${i}`,
  label: `Option ${i + 1}`
}))

// Custom Virtual Scroll Props
const selectVirtualCustomValue1 = ref('')
const selectVirtualCustomValue2 = ref('')
const selectVirtualCustomValue3 = ref('')

// Different Sizes
const selectLarge = ref('')
const selectDefault = ref('')
const selectSmall = ref('')

// Nuxt Usage Example
const nuxtValue = ref('')
const nuxtOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
]

const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <!-- Components are auto-imported in Nuxt -->
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt Auto Import" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhSelect
const nuxtValue = ref('')
const nuxtOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
]
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Code Snippets
const tsBasic = `<template>
  <yh-select v-model="value" :options="options" placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabledOption = `<template>
  <yh-select v-model="value" :options="options" placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsDisabledOption = tsDisabledOption.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-select v-model="value" :options="options" disabled placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsClearable = `<template>
  <yh-select v-model="value" :options="options" clearable placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsMultiple = `<template>
  <yh-select v-model="value" :options="options" multiple placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsMultiple = tsMultiple.replace('lang="ts"', '')

const tsCollapse = `<template>
  <yh-select
    v-model="value"
    :options="options"
    multiple
    collapse-tags
    :max-collapse-tags="2"
    placeholder="Please select"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['option1', 'option2', 'option3'])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsCollapse = tsCollapse.replace('lang="ts"', '')

const tsFilterable = `<template>
  <yh-select v-model="value" :options="options" filterable placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsFilterable = tsFilterable.replace('lang="ts"', '')

const tsRemote = `<template>
  <yh-select
    v-model="value"
    :options="options"
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="Enter keywords"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string; label: string }[]>([])
const loading = ref(false)

// Mock remote data source
const allOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    // Mock network request delay
    setTimeout(() => {
      options.value = allOptions.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      loading.value = false
    }, 500)
  } else {
    options.value = []
  }
}
<\/script>`

const jsRemote = `<template>
  <yh-select
    v-model="value"
    :options="options"
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="Enter keywords"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([])
const loading = ref(false)

// Mock remote data source
const allOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]

const remoteMethod = (query) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      options.value = allOptions.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      loading.value = false
    }, 500)
  } else {
    options.value = []
  }
}
<\/script>`

const tsCreate = `<template>
  <yh-select
    v-model="value"
    :options="options"
    multiple
    filterable
    allow-create
    placeholder="Select or enter"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsCreate = tsCreate.replace('lang="ts"', '')

const tsVirtual = `<template>
  <yh-select
    v-model="value"
    :options="options"
    virtual-scroll
    filterable
    placeholder="10,000 options"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = Array.from({ length: 10000 }, (_, i) => ({
  value: \`option\${i}\`,
  label: \`Option \${i + 1}\`
}))
<\/script>`

const jsVirtual = tsVirtual.replace('lang="ts"', '')

const tsVirtualCustom = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 240px;">
    <!-- Normal Mode -->
    <yh-select v-model="value1" :options="options" placeholder="Normal Mode" />

    <!-- Virtual Scroll Mode -->
    <yh-select
      v-model="value2"
      :options="largeOptions"
      virtual-scroll
      placeholder="Virtual Scroll (10,000 options)"
    />

    <!-- Custom Virtual Scroll Props -->
    <yh-select
      v-model="value3"
      :options="largeOptions"
      virtual-scroll
      :item-height="40"
      :height="300"
      placeholder="Custom Params (item height 40px, height 300px)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

// Basic options
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

// Massive data options
const largeOptions = Array.from({ length: 10000 }, (_, i) => ({
  value: \`option\${i}\`,
  label: \`Option \${i + 1}\`
}))
<\/script>`

const jsVirtualCustom = tsVirtualCustom.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-select v-model="large" :options="options" size="large" placeholder="Large" />
    <yh-select v-model="defaultVal" :options="options" placeholder="Default" />
    <yh-select v-model="small" :options="options" size="small" placeholder="Small" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')
</script>

Use drop-down menus to display and select content from many options.

## Basic Usage

Standard single select for a wide variety of scenarios.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 240px;">
    <yh-select v-model="selectBasic" :options="basicOptions" placeholder="Please select" />
  </div>
</DemoBlock>

## Disabled Option

Set the `disabled` property in an option to disable it.

<DemoBlock title="Disabled Option" :ts-code="tsDisabledOption" :js-code="jsDisabledOption">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabledOption" :options="disabledOptions" placeholder="Please select" />
  </div>
</DemoBlock>

## Disabled State

Use the `disabled` property to disable the entire select component.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabled" :options="basicOptions" disabled placeholder="Please select" />
  </div>
</DemoBlock>

## Clearable Single Select

Set the `clearable` property to allow clearing the selected value.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectClearable" :options="basicOptions" clearable placeholder="Please select" />
  </div>
</DemoBlock>

## Multiple Select

Set the `multiple` property to enable multiple selection. In this case, `v-model` will be an array of selected values.

<DemoBlock title="Multiple Select" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="max-width: 360px;">
    <yh-select v-model="selectMultiple" :options="basicOptions" multiple placeholder="Please select" />
  </div>
</DemoBlock>

## Collapse Tags

When in multiple selection mode, use the `collapse-tags` property to collapse tags.

<DemoBlock title="Collapse Tags" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCollapse" :options="basicOptions" multiple collapse-tags :max-collapse-tags="2" placeholder="Please select" />
  </div>
</DemoBlock>

## Filterable

Set the `filterable` property to enable the search feature.

<DemoBlock title="Filterable" :ts-code="tsFilterable" :js-code="jsFilterable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectFilterable" :options="basicOptions" filterable placeholder="Please select" />
  </div>
</DemoBlock>

## Remote Search

Set the `remote` and `remote-method` properties to search for data from a server.

<DemoBlock title="Remote Search" :ts-code="tsRemote" :js-code="jsRemote">
  <div style="max-width: 240px;">
    <yh-select
      v-model="selectRemote"
      :options="remoteOptions"
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="remoteLoading"
      placeholder="Enter keywords"
    />
  </div>
</DemoBlock>

## Allow Create

Set the `allow-create` property to allow users to create new items. Must be used with `filterable`.

<DemoBlock title="Allow Create" :ts-code="tsCreate" :js-code="jsCreate">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCreate" :options="basicOptions" multiple filterable allow-create placeholder="Select or enter" />
  </div>
</DemoBlock>

## Virtual Scroll

When dealing with a large number of options, use virtual scrolling to optimize performance. Set the `virtual-scroll` property to enable it.

<DemoBlock title="Virtual Scroll" :ts-code="tsVirtual" :js-code="jsVirtual">
  <div style="max-width: 240px;">
    <yh-select
      v-model="selectVirtual"
      :options="virtualOptions"
      virtual-scroll
      filterable
      placeholder="10,000 options"
    />
  </div>
</DemoBlock>

## Full Virtual Scroll Configuration

Customize row height and container height for virtual scrolling using `item-height` and `height` properties.

- `virtual-scroll`: Enable virtual scrolling.
- `item-height`: Height for each option (default 34px).
- `height`: Height for the dropdown container (default 274px).

<DemoBlock title="Full Virtual Scroll Configuration" :ts-code="tsVirtualCustom" :js-code="jsVirtualCustom">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 240px;">
    <yh-select v-model="selectVirtualCustomValue1" :options="basicOptions" placeholder="Normal Mode" />
    <yh-select
      v-model="selectVirtualCustomValue2"
      :options="virtualOptions"
      virtual-scroll
      placeholder="Virtual Scroll (10,000 options)"
    />
    <yh-select
      v-model="selectVirtualCustomValue3"
      :options="virtualOptions"
      virtual-scroll
      :item-height="40"
      :height="300"
      placeholder="Custom Params (item height 40px, height 300px)"
    />
  </div>
</DemoBlock>

## Different Sizes

Use the `size` property to change the size of the select input.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-select v-model="selectLarge" :options="basicOptions" size="large" placeholder="Large" />
    <yh-select v-model="selectDefault" :options="basicOptions" placeholder="Default" />
    <yh-select v-model="selectSmall" :options="basicOptions" size="small" placeholder="Small" />
  </div>
</DemoBlock>

## Use in Nuxt

The Select component fully supports Nuxt 3/4 SSR rendering. In Nuxt projects, the component is auto-imported.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt Auto Import" />
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Basic selection functionality is fully supported.
- ✅ Multiple selection and tag collapsing are supported.
- ✅ Option grouping and searching are supported.
- ✅ Remote search is supported.
- ✅ Virtual scrolling (initializes in basic mode on the server, optimizes automatically upon client activation).
- ⚠️ DOM methods like `focus()` and `blur()` must be called inside `onMounted`.

::: tip SSR Safety
The Select component has passed comprehensive SSR tests, ensuring that server-side and client-side rendered HTML structures are consistent, maintaining compatibility with Nuxt's hydration process.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string \| number \| boolean \| array` | — |
| options | Option data | `SelectOption[]` | `[]` |
| placeholder | Placeholder text | `string` | — |
| disabled | Whether to disable | `boolean` | `false` |
| clearable | Whether it is clearable | `boolean` | `false` |
| size | Input size | `'large' \| 'default' \| 'small'` | `'default'` |
| multiple | Whether multiple selection is enabled | `boolean` | `false` |
| multiple-limit | Max number of labels in multiple selection, 0 for unlimited | `number` | `0` |
| filterable | Whether search is enabled | `boolean` | `false` |
| filter-method | Custom filter method | `(query: string) => void` | — |
| remote | Whether to load options from a remote server | `boolean` | `false` |
| remote-method | Remote search method | `(query: string) => void` | — |
| loading | Whether data is loading | `boolean` | `false` |
| loading-text | Loading text | `string` | `'Loading...'` |
| no-match-text | Text displayed when no data matches the search | `string` | `'No matching data'` |
| no-data-text | Text displayed when there is no data | `string` | `'No data'` |
| allow-create | Whether to allow creating new options | `boolean` | `false` |
| collapse-tags | Whether to collapse tags in multiple selection | `boolean` | `false` |
| max-collapse-tags | Max number of visible tags before collapsing | `number` | `1` |
| virtual-scroll | Whether to enable virtual scrolling | `boolean` | `false` |
| item-height | Height for each virtual scroll item | `number` | `34` |
| height | Height for the virtual scroll container | `number` | `274` |
| teleported | Whether to insert the dropdown into body | `boolean` | `true` |
| fit-input-width | Whether the dropdown width matches the input width | `boolean` | `true` |
| tag-type | Type of tags | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''` |
| value-key | Key name for the value | `string` | `'value'` |
| label-key | Key name for the label | `string` | `'label'` |

### SelectOption

| Prop | Description | Type | Required |
| --- | --- | --- | --- |
| value | Option value | `string \| number \| boolean` | Yes |
| label | Option label | `string` | Yes |
| disabled | Whether the option is disabled | `boolean` | No |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when the selected value changes | `(value: any) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered when the clear button is clicked | `() => void` |
| visible-change | Triggered when the dropdown visibility changes | `(visible: boolean) => void` |
| remove-tag | Triggered when a tag is removed in multiple selection | `(value: any) => void` |

### Slots

| Slot Name | Description | Scope |
| --- | --- | --- |
| default | Custom option content | `{ option: SelectOption }` |
| prefix | Content before the input | — |
| empty | Content when there is no data | — |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the Select input | `() => void` |
| blur | Blur the Select input | `() => void` |

## Theme Variables

The Select component uses the following CSS variables, which can be overridden for custom styling:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-select-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-select-hover-border-color` | Hover border color | `var(--yh-border-color-hover)` |
| `--yh-select-focus-border-color` | Focus border color | `var(--yh-color-primary)` |
| `--yh-select-disabled-bg-color` | Disabled background color | `var(--yh-fill-color-light)` |
| `--yh-select-tag-bg-color` | Tag background color | `var(--yh-fill-color)` |
