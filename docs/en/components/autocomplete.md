# Autocomplete

`YhAutocomplete` provides suggestion candidates based on the current input value. It is suitable for search boxes, address completion, quick command search, and similar flows.

<script setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const value1 = ref('')
const suggestions1: YhAutocompleteSuggestion[] = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]
const querySearch1 = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? suggestions1.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : suggestions1
  cb(results)
}

const value2 = ref('')
const restaurants2: YhAutocompleteSuggestion[] = [
  { value: 'Fresh Foods', address: '144 Xinyu Road, Changning District' },
  { value: 'Haidilao Hotpot', address: '988 Zhenbei Road, Putuo District' },
  { value: 'KFC', address: '1 Hongqiao Road, Xuhui District' },
  { value: "McDonald's", address: '1000 Lujiazui Ring Road, Pudong District' }
]
const querySearch2 = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? restaurants2.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : restaurants2
  cb(results)
}
const handleSelect2 = (item: YhAutocompleteSuggestion) => {
  console.log('Selected:', item)
}

const value3 = ref('')
const remoteSearch3 = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  if (!queryString) {
    cb([])
    return
  }
  setTimeout(() => {
    const results = suggestions1.filter((item) =>
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}

const value4 = ref('')
const value5 = ref('YH-UI')
const large6 = ref('Vue.js')
const default6 = ref('Svelte')
const small6 = ref('Solid')

const value7 = ref('')
const querySearch7 = (
  _queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  setTimeout(() => cb([]), 1000)
}

const nuxtValue = ref('')
const nuxtSuggestions = (_q: string, cb: (suggestions: YhAutocompleteSuggestion[]) => void) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}

const tsBasic = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="Enter content"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const suggestions: YhAutocompleteSuggestion[] = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]

const querySearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? suggestions.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : suggestions
  cb(results)
}
</${_S}>`

const tsCustom = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="Enter restaurant name"
    @select="handleSelect"
  >
    <${_T} #default="{ item }">
      <div class="custom-item">
        <span class="name">{{ item.value }}</span>
        <span class="addr">{{ item.address }}</span>
      </div>
    </${_T}>
  </yh-autocomplete>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const restaurants: YhAutocompleteSuggestion[] = [
  { value: 'Fresh Foods', address: '144 Xinyu Road, Changning District' },
  { value: 'Haidilao Hotpot', address: '988 Zhenbei Road, Putuo District' },
  { value: 'KFC', address: '1 Hongqiao Road, Xuhui District' },
  { value: "McDonald's", address: '1000 Lujiazui Ring Road, Pudong District' }
]

const querySearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const results = queryString
    ? restaurants.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : restaurants
  cb(results)
}

const handleSelect = (item: YhAutocompleteSuggestion) => {
  console.log('Selected:', item)
}
</${_S}>

<${_St} scoped>
.custom-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  font-size: 14px;
}
.addr {
  font-size: 12px;
  color: #999;
}
</${_St}>`

const tsRemote = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="remoteSearch"
    placeholder="Remote search"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')

const remoteSearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  if (!queryString) {
    cb([])
    return
  }
  setTimeout(() => {
    const suggestions: YhAutocompleteSuggestion[] = [
      { value: 'Vue.js' },
      { value: 'React' },
      { value: 'Angular' },
      { value: 'Svelte' },
      { value: 'Solid' }
    ]
    const results = suggestions.filter((item) =>
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}
</${_S}>`

const tsDisabled = `<${_T}>
  <yh-autocomplete v-model="value" disabled placeholder="Disabled" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</${_S}>`

const tsClearable = `<${_T}>
  <yh-autocomplete v-model="value" clearable placeholder="Clearable" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('YH-UI')
</${_S}>`

const tsSizes = `<${_T}>
  <div class="flex-column gap-4">
    <yh-autocomplete
      v-model="large"
      :fetch-suggestions="querySearch"
      size="large"
      placeholder="Large"
    />
    <yh-autocomplete
      v-model="defaultValue"
      :fetch-suggestions="querySearch"
      placeholder="Default"
    />
    <yh-autocomplete
      v-model="small"
      :fetch-suggestions="querySearch"
      size="small"
      placeholder="Small"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const large = ref('Vue.js')
const defaultValue = ref('Svelte')
const small = ref('Solid')

const querySearch = (
  queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  const suggestions: YhAutocompleteSuggestion[] = [
    { value: 'Vue.js' },
    { value: 'React' },
    { value: 'Angular' },
    { value: 'Svelte' },
    { value: 'Solid' }
  ]
  const results = queryString
    ? suggestions.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : suggestions
  cb(results)
}
</${_S}>`

const tsSlots = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="Try a missing keyword"
  >
    <${_T} #loading>
      <div class="custom-loading">Loading...</div>
    </${_T}>
    <${_T} #empty>
      <div class="custom-empty">No matching result</div>
    </${_T}>
  </yh-autocomplete>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const querySearch = (
  _queryString: string,
  cb: (suggestions: YhAutocompleteSuggestion[]) => void
) => {
  setTimeout(() => cb([]), 1000)
}
</${_S}>

<${_St} scoped>
.custom-loading, .custom-empty {
  padding: 10px;
  text-align: center;
}
.custom-loading { color: var(--yh-color-primary); }
.custom-empty { color: var(--yh-color-danger); }
</${_St}>`

const tsNuxt = `<${_T}>
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value"
      :fetch-suggestions="suggestions"
      placeholder="Nuxt auto-import demo"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { YhAutocompleteSuggestion } from '@yh-ui/components'

const value = ref('')
const suggestions = (_q: string, cb: (suggestions: YhAutocompleteSuggestion[]) => void) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsCustom = toJs(tsCustom)
const jsRemote = toJs(tsRemote)
const jsDisabled = toJs(tsDisabled)
const jsClearable = toJs(tsClearable)
const jsSizes = toJs(tsSizes)
const jsSlots = toJs(tsSlots)
const jsNuxt = toJs(tsNuxt)
</script>

## Basic Usage

Provide a suggestion fetcher through `fetch-suggestions`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value1"
      :fetch-suggestions="querySearch1"
      placeholder="Enter content"
    />
  </div>
  <template #description>
    Bound value: <code>{{ value1 }}</code>
  </template>
</DemoBlock>

## Custom Suggestion Template

Use the default slot to customize each suggestion row.

<DemoBlock title="Custom Suggestion Template" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value2"
      :fetch-suggestions="querySearch2"
      placeholder="Enter restaurant name"
      @select="handleSelect2"
    >
      <template #default="{ item }">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>{{ item.value }}</span>
          <span style="color: #999; font-size: 12px;">{{ item.address }}</span>
        </div>
      </template>
    </yh-autocomplete>
  </div>
</DemoBlock>

## Remote Search

Asynchronous requests can be handled inside `fetch-suggestions`, and the dropdown updates after the callback resolves.

<DemoBlock title="Remote Search" :ts-code="tsRemote" :js-code="jsRemote">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value3"
      :fetch-suggestions="remoteSearch3"
      placeholder="Remote search"
    />
  </div>
</DemoBlock>

## Disabled State

Set `disabled` to block input and panel interaction.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value4" disabled placeholder="Disabled" />
  </div>
</DemoBlock>

## Clearable

When `clearable` is enabled, the clear icon appears while the field has a value and is hovered or focused.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value5" clearable placeholder="Clearable" />
  </div>
</DemoBlock>

## Different Sizes

Supports `large`, `default`, and `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 300px; display: flex; flex-direction: column; gap: 16px;">
    <yh-autocomplete
      v-model="large6"
      :fetch-suggestions="querySearch1"
      size="large"
      placeholder="Large"
    />
    <yh-autocomplete
      v-model="default6"
      :fetch-suggestions="querySearch1"
      placeholder="Default"
    />
    <yh-autocomplete
      v-model="small6"
      :fetch-suggestions="querySearch1"
      size="small"
      placeholder="Small"
    />
  </div>
</DemoBlock>

## Loading and Empty Slots

Use `loading` and `empty` to customize the non-data states of the dropdown panel.

<DemoBlock title="Loading and Empty Slots" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value7"
      :fetch-suggestions="querySearch7"
      placeholder="Try a missing keyword"
    >
      <template #loading>
        <div style="padding: 10px; color: var(--yh-color-primary); text-align: center;">
          Loading...
        </div>
      </template>
      <template #empty>
        <div style="padding: 10px; color: var(--yh-color-danger); text-align: center;">
          No matching result
        </div>
      </template>
    </yh-autocomplete>
  </div>
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, `YhAutocomplete` can be used directly. The input element itself participates in SSR, while the dropdown panel mounts on the client during interaction. When `teleported` is enabled, the panel is moved into `body`.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="nuxtValue"
      :fetch-suggestions="nuxtSuggestions"
      placeholder="Nuxt auto-import demo"
    />
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value / v-model` | Bound input value | `string` | `undefined` |
| `placeholder` | Placeholder text | `string` | `undefined` |
| `disabled` | Whether the component is disabled | `boolean` | `false` |
| `clearable` | Whether the value can be cleared | `boolean` | `false` |
| `size` | Input size | `'large' \| 'default' \| 'small'` | `undefined` |
| `fetch-suggestions` | Suggestion fetcher | `(query: string, callback: (suggestions: AutocompleteSuggestion[]) => void) => void` | `undefined` |
| `trigger-on-focus` | Whether suggestions should be fetched on focus | `boolean` | `true` |
| `debounce` | Suggestion fetch debounce in milliseconds | `number` | `300` |
| `placement` | Dropdown placement | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` |
| `value-key` | Field used as the display value inside a suggestion object | `string` | `'value'` |
| `popper-class` | Custom class name for the dropdown panel | `string` | `undefined` |
| `teleported` | Whether the dropdown is teleported to `body` | `boolean` | `true` |
| `fit-input-width` | Whether the dropdown width follows the input width | `boolean` | `true` |
| `highlight-first-item` | Whether the first suggestion is highlighted by default | `boolean` | `false` |
| `prefix-icon` | Prefix icon component or icon name | `string \| Component` | `undefined` |
| `suffix-icon` | Suffix icon component or icon name | `string \| Component` | `undefined` |
| `validate-event` | Whether form validation is triggered | `boolean` | `true` |
| `autofocus` | Whether the input autofocuses | `boolean` | `false` |
| `name` | Native `name` attribute | `string` | `undefined` |
| `autocomplete` | Native `autocomplete` attribute | `string` | `'off'` |
| `theme-overrides` | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| `update:modelValue` | Triggered when the bound value changes | `(value: string) => void` |
| `input` | Triggered while typing | `(value: string) => void` |
| `change` | Triggered after the input change is committed | `(value: string) => void` |
| `focus` | Triggered when the input gains focus | `(event: FocusEvent) => void` |
| `blur` | Triggered when the input loses focus | `(event: FocusEvent) => void` |
| `clear` | Triggered when the clear icon is clicked | `() => void` |
| `select` | Triggered when a suggestion item is selected | `(item: AutocompleteSuggestion) => void` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| `default` | Custom suggestion item content | `{ item: AutocompleteSuggestion }` |
| `prefix` | Input prefix content | `-` |
| `suffix` | Input suffix content | `-` |
| `prepend` | Content before the input wrapper | `-` |
| `append` | Content after the input wrapper | `-` |
| `loading` | Custom loading content | `-` |
| `empty` | Custom empty-state content | `-` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| `focus` | Focuses the input | `() => void` |
| `blur` | Blurs the input | `() => void` |
| `close` | Closes the dropdown panel | `() => void` |
| `highlight` | Highlights a suggestion item by index | `(index: number) => void` |
| `inputRef` | Native input element reference | `HTMLInputElement \| undefined` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhAutocompleteSize` | Size union type |
| `YhAutocompletePlacement` | Dropdown placement union type |
| `YhAutocompleteSuggestion` | Suggestion item type |
| `YhAutocompleteProps` | Props type for `YhAutocomplete` |
| `YhAutocompleteEmits` | Emits type for `YhAutocomplete` |
| `YhAutocompleteSlots` | Slots type for `YhAutocomplete` |
| `YhAutocompleteExpose` | Public expose type |
| `YhAutocompleteInstance` | Component instance type |

### Theme Variables

`YhAutocomplete` does not currently expose dedicated component-scoped CSS variables. It mainly consumes shared input, border, fill, and text tokens, and can still be adjusted through `themeOverrides` together with global theme variables.
