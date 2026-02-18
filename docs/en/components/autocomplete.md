# Autocomplete

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// --- Basic Usage (Demo 1) ---
const value1 = ref('')
const suggestions1 = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]
const querySearch1 = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? suggestions1.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : suggestions1
  cb(results)
}

// --- Custom Template (Demo 2) ---
const value2 = ref('')
const restaurants2 = [
  { value: 'Fresh Foods', address: '144 Xinyu Road, Changning District' },
  { value: 'Haidilao Hotpot', address: '988 Zhenbei Road, Putuo District' },
  { value: 'KFC', address: '1 Hongqiao Road, Xuhui District' },
  { value: 'McDonald\'s', address: '1000 Lujiazui Ring Road, Pudong District' }
]
const querySearch2 = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? restaurants2.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : restaurants2
  cb(results)
}
const handleSelect2 = (item: any) => {
  console.log('Selected:', item)
}

// --- Remote Search (Demo 3) ---
const value3 = ref('')
const remoteSearch3 = (queryString: string, cb: (suggestions: any[]) => void) => {
  if (!queryString) {
    cb([])
    return
  }
  setTimeout(() => {
    const results = suggestions1.filter(item =>
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}

// --- Disabled State (Demo 4) ---
const value4 = ref('')

// --- Clearable (Demo 5) ---
const value5 = ref('YH-UI')

// --- Different Sizes (Demo 6) ---
const large6 = ref('Vue.js')
const default6 = ref('Svelte')
const small6 = ref('Solid')

// --- Custom Slots (Demo 7) ---
const value7 = ref('')
const querySearch7 = (queryString: string, cb: (suggestions: any[]) => void) => {
  setTimeout(() => cb([]), 1000)
}

// --- Code example strings ---
const tsBasic = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="Enter content"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const suggestions = [
  { value: 'Vue.js' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' }
]

const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? suggestions.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : suggestions
  cb(results)
}
</${_S}>`

const jsBasic = toJs(tsBasic)

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

const value = ref('')
const restaurants = [
  { value: 'Fresh Foods', address: '144 Xinyu Road, Changning District' },
  { value: 'Haidilao Hotpot', address: '988 Zhenbei Road, Putuo District' },
  { value: 'KFC', address: '1 Hongqiao Road, Xuhui District' },
  { value: 'McDonald\\'s', address: '1000 Lujiazui Ring Road, Pudong District' }
]

const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  const results = queryString
    ? restaurants.filter(item =>
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : restaurants
  cb(results)
}

const handleSelect = (item: any) => {
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

const jsCustom = toJs(tsCustom)

const tsRemote = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="remoteSearch"
    placeholder="Enter content (Remote Search)"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const remoteSearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  if (!queryString) {
    cb([])
    return
  }
  // Simulate remote search
  setTimeout(() => {
    const suggestions = [
      { value: 'Vue.js' },
      { value: 'React' },
      { value: 'Angular' },
      { value: 'Svelte' },
      { value: 'Solid' }
    ]
    const results = suggestions.filter(item => 
      item.value.toLowerCase().includes(queryString.toLowerCase())
    )
    cb(results)
  }, 500)
}
</${_S}>`

const jsRemote = toJs(tsRemote)

const tsDisabled = `<${_T}>
  <yh-autocomplete v-model="value" disabled placeholder="Disabled" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</${_S}>`

const jsDisabled = toJs(tsDisabled)

const tsClearable = `<${_T}>
  <yh-autocomplete v-model="value" clearable placeholder="Clearable" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('YH-UI')
</${_S}>`

const jsClearable = toJs(tsClearable)

const tsSizes = `<${_T}>
  <div class="flex-column gap-4">
    <yh-autocomplete 
      v-model="large" 
      :fetch-suggestions="querySearch"
      size="large" 
      placeholder="Large (40px)" 
    />
    <yh-autocomplete 
      v-model="defaultValue" 
      :fetch-suggestions="querySearch"
      placeholder="Default (32px)" 
    />
    <yh-autocomplete 
      v-model="small" 
      :fetch-suggestions="querySearch"
      size="small" 
      placeholder="Small (24px)" 
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const large = ref('Vue.js')
const defaultValue = ref('Svelte')
const small = ref('Solid')

const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  const suggestions = [
    { value: 'Vue.js' },
    { value: 'React' },
    { value: 'Angular' },
    { value: 'Svelte' },
    { value: 'Solid' }
  ]
  const results = queryString
    ? suggestions.filter(item => 
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : suggestions
  cb(results)
}
</${_S}>`

const jsSizes = toJs(tsSizes)

const tsSlots = `<${_T}>
  <yh-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    placeholder="Try searching for no matches"
  >
    <${_T} #loading>
      <div class="custom-loading">Loading...</div>
    </${_T}>
    <${_T} #empty>
      <div class="custom-empty">Oops, nothing found</div>
    </${_T}>
  </yh-autocomplete>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const querySearch = (queryString: string, cb: (suggestions: any[]) => void) => {
  // Simulate delayed empty data
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

const jsSlots = toJs(tsSlots)

// Nuxt usage example
const nuxtValue = ref('')
const nuxtSuggestions = (q: string, cb: any) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}

const tsNuxt = `<${_T}>
  <div style="max-width: 300px;">
    <!-- Auto-registered, use directly -->
    <yh-autocomplete
      v-model="nuxtValue"
      :fetch-suggestions="nuxtSuggestions"
      placeholder="Nuxt Auto-import Demo"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
// No need to manually import YhAutocomplete
const nuxtValue = ref('')
const nuxtSuggestions = (q: string, cb: any) => {
  cb([{ value: 'Nuxt 3' }, { value: 'Nuxt 4' }])
}
</${_S}>`

const jsNuxt = toJs(tsNuxt)
</script>

Provides input suggestions based on input content.

## Basic Usage

Use the `fetch-suggestions` prop to set the method for retrieving the suggestion list.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value1"
      :fetch-suggestions="querySearch1"
      placeholder="Enter content"
    />
  </div>
  <template #description>
    Bound variable: <code>{{ value1 }}</code>
  </template>
</DemoBlock>

## Custom Template

Use the `default` slot to customize the display content of suggestion items.

<DemoBlock title="Custom Template" :ts-code="tsCustom" :js-code="jsCustom">
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

Simulate fetching suggestion data from a server with delay.

<DemoBlock title="Remote Search" :ts-code="tsRemote" :js-code="jsRemote">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value3"
      :fetch-suggestions="remoteSearch3"
      placeholder="Enter content (Remote Search)"
    />
  </div>
</DemoBlock>

## Disabled State

Use the `disabled` prop to disable the input.

<DemoBlock title="Disabled" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value4" disabled placeholder="Disabled" />
  </div>
</DemoBlock>

## Clearable

Use the `clearable` prop to quickly clear the content.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 300px;">
    <yh-autocomplete v-model="value5" clearable placeholder="Clearable" />
  </div>
</DemoBlock>

## Different Sizes

Supports `large`, `default`, and `small` sizes.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 300px; display: flex; flex-direction: column; gap: 16px;">
    <yh-autocomplete v-model="large6" :fetch-suggestions="querySearch1" size="large" placeholder="Large (40px)" />
    <yh-autocomplete v-model="default6" :fetch-suggestions="querySearch1" placeholder="Default (32px)" />
    <yh-autocomplete v-model="small6" :fetch-suggestions="querySearch1" size="small" placeholder="Small (24px)" />
  </div>
</DemoBlock>

## Custom Slots

Use `loading` and `empty` slots to customize the content during loading and when there is no data.

<DemoBlock title="Custom Slots" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="value7"
      :fetch-suggestions="querySearch7"
      placeholder="Try searching for no matches"
    >
      <template #loading>
        <div style="padding: 10px; color: var(--yh-color-primary); text-align: center;">Loading...</div>
      </template>
      <template #empty>
        <div style="padding: 10px; color: var(--yh-color-danger); text-align: center;">Oops, nothing found</div>
      </template>
    </yh-autocomplete>
  </div>
</DemoBlock>

## Use in Nuxt

The Autocomplete component works well in Nuxt 3/4 environments. With auto-import support, you can simply use the component name directly.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 300px;">
    <yh-autocomplete
      v-model="nuxtValue"
      :fetch-suggestions="nuxtSuggestions"
      placeholder="Nuxt Auto-import Demo"
    />
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Initial state of the input (including `v-model` value) renders correctly on the server
- ✅ Size and placeholder support SSR
- ✅ Prefix and suffix slots generate HTML during the SSR phase
- ⚠️ The suggestion dropdown only appears during client-side interaction (input or focus), without affecting the initial HTML structure
- 💡 Debounce and dropdown positioning take effect after client-side activation (Hydration)

::: tip SSR Safety
The Autocomplete component internally wraps `YhInput` and the `Popper` system. It uses `useId` to ensure stability of the Input-to-dropdown association IDs during initial rendering, perfectly avoiding common ID conflict warnings under SSR.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string` | — |
| placeholder | Placeholder text | `string` | — |
| disabled | Whether disabled | `boolean` | `false` |
| clearable | Whether clearable | `boolean` | `false` |
| size | Input size | `'large' \| 'default' \| 'small'` | `'default'` |
| fetch-suggestions | Method to fetch suggestions | `(query: string, callback: (suggestions: any[]) => void) => void` | — |
| trigger-on-focus | Whether to trigger suggestions on focus | `boolean` | `true` |
| debounce | Debounce delay (ms) | `number` | `300` |
| placement | Dropdown position | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` |
| value-key | Key name used for display in suggestion objects | `string` | `'value'` |
| highlight-first-item | Whether to highlight the first item by default | `boolean` | `false` |
| teleported | Whether to append the dropdown to body | `boolean` | `true` |
| fit-input-width | Whether the dropdown width matches the input | `boolean` | `true` |
| prefix-icon | Prefix icon | `string \| Component` | — |
| suffix-icon | Suffix icon | `string \| Component` | — |
| name | Native name attribute | `string` | — |
| autofocus | Auto focus | `boolean` | `false` |
| autocomplete | Native autocomplete attribute | `string` | `'off'` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| input | Triggered when input value changes | `(value: string) => void` |
| change | Triggered when value changes | `(value: string) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered when clear button is clicked | `() => void` |
| select | Triggered when a suggestion item is selected | `(item: any) => void` |

### Slots

| Slot Name | Description | Scope |
| --- | --- | --- |
| default | Custom suggestion item content | `{ item: any }` |
| prefix | Input prefix content | — |
| suffix | Input suffix content | — |
| prepend | Input prepend content | — |
| append | Input append content | — |
| loading | Content while loading | — |
| empty | Content when no data matches | — |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |
| close | Close the suggestion list | `() => void` |
| highlight | Highlight a specified item | `(index: number) => void` |

## Theme Variables

The Autocomplete component uses the following CSS variables. You can customize styles by overriding these variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-autocomplete-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-autocomplete-hover-border-color` | Hover border color | `var(--yh-border-color-hover)` |
| `--yh-autocomplete-focus-border-color` | Focus border color | `var(--yh-color-primary)` |
| `--yh-autocomplete-disabled-bg-color` | Disabled background color | `var(--yh-fill-color-light)` |
