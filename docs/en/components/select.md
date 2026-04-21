# Select

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const selectBasic = ref('')
const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]

const selectDisabledOption = ref('')
const disabledOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' }
]

const selectDisabled = ref('option1')
const selectClearable = ref('option1')
const selectMultiple = ref([])
const selectCollapse = ref(['option1', 'option2', 'option3'])
const selectFilterable = ref('')
const selectRemote = ref('')
const remoteOptions = ref([])
const remoteLoading = ref(false)
const selectCreate = ref([])
const selectVirtual = ref('')
const selectVirtualCustomValue1 = ref('')
const selectVirtualCustomValue2 = ref('')
const selectVirtualCustomValue3 = ref('')
const selectLarge = ref('')
const selectDefault = ref('')
const selectSmall = ref('')
const nuxtValue = ref('')

const remoteMethod = (query: string) => {
  if (query) {
    remoteLoading.value = true
    setTimeout(() => {
      remoteOptions.value = basicOptions.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      remoteLoading.value = false
    }, 500)
  } else {
    remoteOptions.value = []
  }
}

const virtualOptions = Array.from({ length: 10000 }, (_, i) => ({
  value: `option${i}`,
  label: `Option ${i + 1}`
}))

const nuxtOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
]

const tsNuxt = `<${_T}>
  <div style="max-width: 240px;">
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt Auto Import" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const nuxtValue = ref('')
const nuxtOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
]
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsBasic = `<${_T}>
  <yh-select v-model="value" :options="options" placeholder="Please select" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsDisabledOption = `<${_T}>
  <yh-select v-model="value" :options="options" placeholder="Please select" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsDisabledOption = toJs(tsDisabledOption)

const tsDisabled = `<${_T}>
  <yh-select v-model="value" :options="options" disabled placeholder="Please select" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsDisabled = toJs(tsDisabled)

const tsClearable = `<${_T}>
  <yh-select v-model="value" :options="options" clearable placeholder="Please select" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsClearable = toJs(tsClearable)

const tsMultiple = `<${_T}>
  <yh-select v-model="value" :options="options" multiple placeholder="Please select" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsMultiple = toJs(tsMultiple)

const tsCollapse = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    multiple
    collapse-tags
    :max-collapse-tags="2"
    placeholder="Please select"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref(['option1', 'option2', 'option3'])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsCollapse = toJs(tsCollapse)

const tsFilterable = `<${_T}>
  <yh-select v-model="value" :options="options" filterable placeholder="Please select" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsFilterable = toJs(tsFilterable)

const tsRemote = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="Enter keywords"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string; label: string }[]>([])
const loading = ref(false)

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
    setTimeout(() => {
      options.value = allOptions.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      loading.value = false
    }, 500)
  } else {
    options.value = []
  }
}
</${_S}>`

const jsRemote = toJs(tsRemote)

const tsCreate = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    multiple
    filterable
    allow-create
    placeholder="Select or enter"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' }
]
</${_S}>`

const jsCreate = toJs(tsCreate)

const tsVirtual = `<${_T}>
  <yh-select
    v-model="value"
    :options="options"
    virtual-scroll
    filterable
    placeholder="10,000 options"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = Array.from({ length: 10000 }, (_, i) => ({
  value: \`option\${i}\`,
  label: \`Option \${i + 1}\`
}))
</${_S}>`

const jsVirtual = toJs(tsVirtual)

const tsVirtualCustom = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 240px;">
    <yh-select v-model="value1" :options="options" placeholder="Normal Mode" />

    <yh-select
      v-model="value2"
      :options="largeOptions"
      virtual-scroll
      placeholder="Virtual Scroll (10,000 options)"
    />

    <yh-select
      v-model="value3"
      :options="largeOptions"
      virtual-scroll
      :item-height="40"
      :height="300"
      placeholder="Custom Params (item height 40px, height 300px)"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

const largeOptions = Array.from({ length: 10000 }, (_, i) => ({
  value: \`option\${i}\`,
  label: \`Option \${i + 1}\`
}))
</${_S}>`

const jsVirtualCustom = toJs(tsVirtualCustom)

const tsSizes = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-select v-model="large" :options="options" size="large" placeholder="Large" />
    <yh-select v-model="defaultVal" :options="options" placeholder="Default" />
    <yh-select v-model="small" :options="options" size="small" placeholder="Small" />
  </div>
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>`

const jsSizes = toJs(tsSizes)
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

Set the `disabled` field on an option item to make that option unavailable.

<DemoBlock title="Disabled Option" :ts-code="tsDisabledOption" :js-code="jsDisabledOption">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabledOption" :options="disabledOptions" placeholder="Please select" />
  </div>
</DemoBlock>

## Disabled State

Use `disabled` to disable the entire component.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-select v-model="selectDisabled" :options="basicOptions" disabled placeholder="Please select" />
  </div>
</DemoBlock>

## Clearable Single Select

Set `clearable` to allow the current value to be cleared.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectClearable" :options="basicOptions" clearable placeholder="Please select" />
  </div>
</DemoBlock>

## Multiple Select

Set `multiple` to enable multiple selection. In this mode, `v-model` becomes an array.

<DemoBlock title="Multiple Select" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="max-width: 360px;">
    <yh-select v-model="selectMultiple" :options="basicOptions" multiple placeholder="Please select" />
  </div>
</DemoBlock>

## Collapse Tags

In multiple mode, use `collapse-tags` to reduce the visible tag count.

<DemoBlock title="Collapse Tags" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCollapse" :options="basicOptions" multiple collapse-tags :max-collapse-tags="2" placeholder="Please select" />
  </div>
</DemoBlock>

## Filterable

Set `filterable` to enable keyword filtering inside the input.

<DemoBlock title="Filterable" :ts-code="tsFilterable" :js-code="jsFilterable">
  <div style="max-width: 240px;">
    <yh-select v-model="selectFilterable" :options="basicOptions" filterable placeholder="Please select" />
  </div>
</DemoBlock>

## Remote Search

Use `remote` together with `remote-method` to fetch options asynchronously.

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

Set `allow-create` to let users create temporary options from the current input. This is intended to be used together with `filterable`.

<DemoBlock title="Allow Create" :ts-code="tsCreate" :js-code="jsCreate">
  <div style="max-width: 360px;">
    <yh-select v-model="selectCreate" :options="basicOptions" multiple filterable allow-create placeholder="Select or enter" />
  </div>
</DemoBlock>

## Virtual Scroll

For large option sets, set `virtual-scroll` to improve rendering performance.

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

Use `item-height` and `height` to control the virtual list row height and viewport height.

- `item-height`: height of each option row, default `34`
- `height`: dropdown viewport height, default `274`

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

Use `size` to switch between `large`, default, and `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-select v-model="selectLarge" :options="basicOptions" size="large" placeholder="Large" />
    <yh-select v-model="selectDefault" :options="basicOptions" placeholder="Default" />
    <yh-select v-model="selectSmall" :options="basicOptions" size="small" placeholder="Small" />
  </div>
</DemoBlock>

## Use in Nuxt

`YhSelect` can be used directly in Nuxt after registering the YH-UI module. The selected text and option data render normally during SSR, while popup positioning, remote callbacks, and imperative focus helpers continue on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-select v-model="nuxtValue" :options="nuxtOptions" placeholder="Nuxt Auto Import" />
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Bound value | `YhSelectValue \| YhSelectValue[]` | `undefined` |
| options | Option data rendered by the component | `YhSelectOption[]` | `[]` |
| placeholder | Placeholder text | `string` | `''` |
| disabled | Whether the component is disabled | `boolean` | `false` |
| clearable | Whether the current value can be cleared | `boolean` | `false` |
| size | Input size | `'large' \| 'default' \| 'small'` | `'default'` |
| multiple | Whether multiple selection is enabled | `boolean` | `false` |
| multiple-limit | Maximum selected item count in multiple mode, `0` means unlimited | `number` | `0` |
| filterable | Whether keyword filtering is enabled | `boolean` | `false` |
| filter-method | Custom local filter method | `(query: string) => void` | `undefined` |
| remote | Whether remote filtering is enabled | `boolean` | `false` |
| remote-method | Remote search callback | `(query: string) => void` | `undefined` |
| loading | Whether the loading state is shown | `boolean` | `false` |
| loading-text | Custom loading text. Falls back to locale text when empty | `string` | `''` |
| no-match-text | Custom empty text shown for no matching results. Falls back to locale text when empty | `string` | `''` |
| no-data-text | Custom empty text shown when there is no option data. Falls back to locale text when empty | `string` | `''` |
| allow-create | Whether users can create options from the current query | `boolean` | `false` |
| collapse-tags | Whether selected tags are collapsed in multiple mode | `boolean` | `false` |
| collapse-tags-tooltip | Whether collapsed tags show a tooltip summary | `boolean` | `false` |
| max-collapse-tags | Maximum visible tag count when `collapse-tags` is enabled | `number` | `1` |
| popper-class | Custom dropdown class name | `string` | `undefined` |
| teleported | Whether the dropdown is teleported to `body` | `boolean` | `true` |
| fit-input-width | Whether the dropdown width follows the input width | `boolean` | `true` |
| tag-type | Tag type used in multiple mode | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''` |
| virtual-scroll | Whether virtual scrolling is enabled | `boolean` | `false` |
| item-height | Virtual list row height | `number` | `34` |
| height | Virtual list viewport height | `number` | `274` |
| validate-event | Whether form validation is triggered on change and blur | `boolean` | `true` |
| value-key | Property name used as the option value key | `string` | `'value'` |
| label-key | Property name used as the option label key | `string` | `'label'` |
| theme-overrides | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Types

#### Select Option

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| value | Option value | `string \| number \| boolean` | Yes |
| label | Option label | `string` | Yes |
| disabled | Whether the option is disabled | `boolean` | No |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when the selected value changes | `(value: YhSelectValue \| YhSelectValue[] \| undefined) => void` |
| focus | Triggered when the input gains focus | `(event: FocusEvent) => void` |
| blur | Triggered when the input loses focus | `(event: FocusEvent) => void` |
| clear | Triggered when the clear icon is clicked | `() => void` |
| visible-change | Triggered when the dropdown visibility changes | `(visible: boolean) => void` |
| remove-tag | Triggered when a selected tag is removed in multiple mode | `(value: YhSelectValue) => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Custom `YhOption` nodes rendered instead of the `options` prop | - |
| prefix | Content rendered before the input area | - |
| empty | Content rendered when there is no available option | - |
| option | Custom option content when using the `options` prop | `{ option: YhSelectOption }` |
| tag | Custom tag content in multiple mode | `{ value: YhSelectValue }` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focuses the input | `() => void` |
| blur | Blurs the input | `() => void` |
| inputRef | Ref to the internal input element | `Ref<HTMLInputElement \| undefined>` |

### Option Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| value | Option value | `YhSelectValue` | Required |
| label | Option label | `string` | `undefined` |
| disabled | Whether the option is disabled | `boolean` | `false` |

### Option Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Custom option content | - |

## Theme Variables

`YhSelect` supports `themeOverrides`. The component test suite verifies component-scoped override output such as `themeOverrides.borderColor`, which emits `--yh-select-border-color`. The visual styles of the input, tags, and dropdown still primarily inherit shared global tokens such as `--yh-border-color`, `--yh-fill-color`, and `--yh-text-color-*`.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-select-border-color` | Border color emitted by `themeOverrides.borderColor` | `undefined` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhSelectProps` | Select component props type |
| `YhSelectEmits` | Select component emits type |
| `YhSelectSlots` | Select component slots type |
| `YhSelectExpose` | Select component expose type |
| `YhSelectOption` | Option data type |
| `YhSelectValue` | Selected value type |
| `YhSelectSize` | Size union type |
| `YhSelectTagType` | Tag type union |
| `YhOptionProps` | Option component props type |
| `YhOptionSlots` | Option component slots type |
| `YhSelectInstance` | Select component instance type |
| `YhOptionInstance` | Option component instance type |
