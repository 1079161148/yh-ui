<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ─── Basic Usage ─────────────────────────────────────────────────────────────
const sort = ref({ key: 'default', order: 'desc' })
const filterValue = ref({})
const sorts = [
  { key: 'default', label: 'Recommended' },
  { key: 'sales', label: 'Sales' },
  { key: 'price', label: 'Price' }
]
const filters = [
  {
    key: 'brand',
    label: 'Brand',
    type: 'checkbox',
    options: [
      { label: 'Huawei', value: 'huawei' },
      { label: 'Apple', value: 'apple' },
      { label: 'Xiaomi', value: 'xiaomi' }
    ]
  }
]

const tsBasic = `<${_T}>
  <yh-filter-bar
    v-model:sort="sort"
    v-model:filter-value="filterValue"
    :sorts="sorts"
    :filters="filters"
  />
<\/template>

<${_S} setup lang="ts">
import { ref } from 'vue'

const sort = ref({ key: 'default', order: 'desc' })
const filterValue = ref({})

const sorts = [
  { key: 'default', label: 'Recommended' },
  { key: 'sales', label: 'Sales' },
  { key: 'price', label: 'Price' }
]

const filters = [
  {
    key: 'brand',
    label: 'Brand',
    type: 'checkbox',
    options: [
      { label: 'Huawei', value: 'huawei' },
      { label: 'Apple', value: 'apple' },
      { label: 'Xiaomi', value: 'xiaomi' }
    ]
  }
]
<\/script>`

const jsBasic = toJs(tsBasic)

// ─── Inline Mode ─────────────────────────────────────────────────────────────
const inlineFilterValue = ref({ service: 'fast' })
const inlineFilters = [
  {
    key: 'service',
    label: 'Service',
    type: 'radio',
    options: [
      { label: 'Express', value: 'fast' },
      { label: 'Free Shipping', value: 'free' }
    ]
  }
]

const tsInline = `<${_T}>
  <yh-filter-bar
    v-model:filter-value="filterValue"
    :filters="filters"
    :filter-in-panel="false"
    :show-all="false"
  />
<\/template>

<${_S} setup lang="ts">
import { ref } from 'vue'

const filterValue = ref({ service: 'fast' })
const filters = [
  {
    key: 'service',
    label: 'Service',
    type: 'radio',
    options: [
      { label: 'Express', value: 'fast' },
      { label: 'Free Shipping', value: 'free' }
    ]
  }
]
<\/script>`

const jsInline = toJs(tsInline)

// ─── Advanced E-commerce Example ─────────────────────────────────────────────
const advSort = ref({ key: 'default', order: 'desc' })
const advFilter = ref({ minPrice: null, maxPrice: null })
const advViewType = ref<'list'|'grid'>('list')
const advSorts = [
  { key: 'default', label: 'Recommended' },
  { key: 'sales', label: 'Sales' }
]
const advFilters = [
  {
    key: 'price',
    label: 'Price Range',
    type: 'custom'
  }
]

const tsAdv = `<${_T}>
  <div style="background: #f5f5f5; padding: 0; border-radius: 8px; height: 460px; position: relative; display: flex; flex-direction: column;">
    <!-- FilterBar -->
    <yh-filter-bar
      v-model:sort="sort"
      v-model:filter-value="filter"
      v-model:viewType="viewType"
      :sorts="sorts"
      :filters="filters"
      show-view-toggle
      @openFilter="onOpenFilter"
      @reset-panel="onResetPanel"
      style="flex-shrink: 0;"
    >
      <template #panel-content="{ filter: currentFilter, value }">
        <div v-if="currentFilter.key === 'price'" style="padding: 10px; display: flex; align-items: center;">
          <input type="number" placeholder="Min" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" 
            :value="value[currentFilter.key]?.minPrice ?? ''" 
            @input="e => { value[currentFilter.key] = value[currentFilter.key] || {}; value[currentFilter.key].minPrice = e.target.value === '' ? '' : Number(e.target.value) }" 
            @blur="validatePrice(value[currentFilter.key] || {})" />
          <span style="margin: 0 8px;">-</span>
          <input type="number" placeholder="Max" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" 
            :value="value[currentFilter.key]?.maxPrice ?? ''" 
            @input="e => { value[currentFilter.key] = value[currentFilter.key] || {}; value[currentFilter.key].maxPrice = e.target.value === '' ? '' : Number(e.target.value) }" 
            @blur="validatePrice(value[currentFilter.key] || {})" />
        </div>
      </template>
    </yh-filter-bar>

    <!-- Mock Product Area -->
    <div style="flex: 1; overflow-y: auto; padding: 12px;">
      <div :style="{ display: viewType === 'grid' ? 'grid' : 'flex', gridTemplateColumns: viewType === 'grid' ? '1fr 1fr' : 'none', flexDirection: viewType === 'list' ? 'column' : 'row', gap: '12px' }">
        <div v-for="i in 4" :key="i" :style="{ background: '#fff', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: viewType === 'grid' ? 'column' : 'row', alignItems: viewType === 'grid' ? 'flex-start' : 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }">
          <div :style="{ width: viewType === 'grid' ? '100%' : '60px', height: viewType === 'grid' ? '120px' : '60px', background: '#eee', borderRadius: '4px', flexShrink: 0 }"></div>
          <div style="flex: 1; width: 100%;">
            <div style="height: 14px; background: #e0e0e0; width: 80%; margin-bottom: 8px; border-radius: 2px;"></div>
            <div style="height: 12px; background: #f0f0f0; width: 50%; border-radius: 2px;"></div>
          </div>
        </div>
      </div>
      <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
        <p>Sort Status: {{ sort }} | Filter Status: {{ filter }}</p>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const sort = ref({ key: 'default', order: 'desc' })
const filter = ref({})
const viewType = ref('list')
const sorts = [{ key: 'default', label: 'Recommended' }, { key: 'sales', label: 'Sales' }]
const filters = [{ key: 'price', label: 'Price Range', type: 'custom' }]

const validatePrice = (val: Record<string, number | null>) => {
  if (val.minPrice !== null && val.maxPrice !== null && val.minPrice > val.maxPrice) {
    const temp = val.minPrice
    val.minPrice = val.maxPrice
    val.maxPrice = temp
  }
}

const onResetPanel = (f: Record<string, unknown>, curr: Record<string, number | null>) => {
  if (f.key === 'price') {
    curr.minPrice = null
    curr.maxPrice = null
  }
}

const onOpenFilter = () => { alert('Open Professional Drawer Popup!') }
</${_S}>`

const jsAdv = toJs(tsAdv)
const validatePrice = (val: Record<string, number | null>) => {
  if (val.minPrice !== null && val.maxPrice !== null && val.minPrice > val.maxPrice) {
    const temp = val.minPrice
    val.minPrice = val.maxPrice
    val.maxPrice = temp
  }
}
const onOpenAdvancedFilter = () => { alert('Open a custom Drawer popup for advanced multi-dimensional filtering over here!') }

const onResetPanel = (filter: Record<string, unknown>, currentValues: Record<string, number | null>) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}

// --- Nuxt Demo State (Separated to avoid interference) ---
const nuxtSort = ref({ key: 'default', order: 'desc' })
const nuxtFilter = ref({ minPrice: null, maxPrice: null })
const nuxtSorts = JSON.parse(JSON.stringify(advSorts))
const nuxtFilters = JSON.parse(JSON.stringify(advFilters))
const onResetNuxtPanel = (filter: Record<string, unknown>, currentValues: Record<string, number | null>) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}

const tsNuxt = `<${_T}>
  <yh-filter-bar
    v-model:sort="nuxtSort"
    v-model:filter-value="nuxtFilter"
    :sorts="nuxtSorts"
    :filters="nuxtFilters"
    @reset-panel="onResetNuxtPanel"
  >
    <template #panel-content="{ filter, value }">
      <div v-if="filter.key === 'price'" style="padding: 15px; display: flex; align-items: center; justify-content: center;">
        <input type="number" placeholder="Min" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.minPrice" />
        <span style="margin: 0 10px;">-</span>
        <input type="number" placeholder="Max" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.maxPrice" />
      </div>
    </template>
  </yh-filter-bar>

  <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
    <p>Current Sort: {{ nuxtSort }} | Current Filter: {{ nuxtFilter }}</p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const nuxtSort = ref({ key: 'default', order: 'desc' })
const nuxtFilter = ref({})
const nuxtSorts = [
  { key: 'default', label: 'Summary' },
  { key: 'sales', label: 'Sales' }
]
const nuxtFilters = [
  { key: 'price', label: 'Price Range', type: 'custom' }
]

const onResetNuxtPanel = (filter: Record<string, unknown>, currentValues: Record<string, number | null>) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}
</${_S}>`

const jsNuxt = `<${_T}>
  <yh-filter-bar
    v-model:sort="nuxtSort"
    v-model:filter-value="nuxtFilter"
    :sorts="nuxtSorts"
    :filters="nuxtFilters"
    @reset-panel="onResetNuxtPanel"
  >
    <template #panel-content="{ filter, value }">
      <div v-if="filter.key === 'price'" style="padding: 15px; display: flex; align-items: center; justify-content: center;">
        <input type="number" placeholder="Min" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.minPrice" />
        <span style="margin: 0 10px;">-</span>
        <input type="number" placeholder="Max" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.maxPrice" />
      </div>
    </template>
  </yh-filter-bar>

  <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
    <p>Current Sort: {{ nuxtSort }} | Current Filter: {{ nuxtFilter }}</p>
  </div>
</${_T}>

<${_S} setup>
import { ref } from 'vue'

const nuxtSort = ref({ key: 'default', order: 'desc' })
const nuxtFilter = ref({})
const nuxtSorts = [
  { key: 'default', label: 'Summary' },
  { key: 'sales', label: 'Sales' }
]
const nuxtFilters = [
  { key: 'price', label: 'Price Range', type: 'custom' }
]

const onResetNuxtPanel = (filter, currentValues) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}
</${_S}>`
</script>

# FilterBar

A common filter and sort toolbar for e-commerce list pages, supporting sticky positioning, sort switching, pull-down filter panels, and inline filter modes.

## Basic Usage

Set `sorts` and `filters` to enable basic sorting and filtering functionalities.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="background: #f5f5f5; padding: 0; border-radius: 8px; height: 360px; position: relative;">
    <yh-filter-bar
      v-model:sort="sort"
      v-model:filter-value="filterValue"
      :sorts="sorts"
      :filters="filters"
    />
    <div style="margin-top: 20px; padding: 0 16px; font-size: 14px; color: #666;">
      <p>Current Sort: {{ sort }}</p>
      <p>Current Filter: {{ filterValue }}</p>
    </div>
  </div>
</DemoBlock>

## Inline Filter Mode

Set `filter-in-panel` to `false` if you want filters to be displayed directly in the toolbar.

<DemoBlock title="Inline Mode" :ts-code="tsInline" :js-code="jsInline">
  <yh-filter-bar
    v-model:filter-value="inlineFilterValue"
    :filters="inlineFilters"
    :filter-in-panel="false"
    :show-all="false"
  />
</DemoBlock>

## Advanced E-Commerce Layout (Custom Slot & View Switcher)

In standard major e-commerce websites, it is commonly expected to feature a **List/Grid View Toggle Button** and **Custom Price Range Inputs**.

<DemoBlock title="Advanced Customization" :ts-code="tsAdv" :js-code="jsAdv">
  <div style="background: #f5f5f5; padding: 0; border-radius: 8px; height: 460px; position: relative; display: flex; flex-direction: column;">
    <yh-filter-bar
      v-model:sort="advSort"
      v-model:filter-value="advFilter"
      v-model:viewType="advViewType"
      :sorts="advSorts"
      :filters="advFilters"
      show-view-toggle
      @openFilter="onOpenAdvancedFilter"
      @reset-panel="onResetPanel"
      style="flex-shrink: 0;"
    >
      <template #panel-content="{ filter, value }">
        <div v-if="filter.key === 'price'" style="padding: 10px; display: flex; align-items: center; justify-content: center;">
          <input type="number" placeholder="Min" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" v-model="value.minPrice" @blur="validatePrice(value)" />
          <span style="margin: 0 8px;">-</span>
          <input type="number" placeholder="Max" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" v-model="value.maxPrice" @blur="validatePrice(value)" />
        </div>
      </template>
    </yh-filter-bar>
    <div style="flex: 1; overflow-y: auto; padding: 12px;">
      <div :style="{ display: advViewType === 'grid' ? 'grid' : 'flex', gridTemplateColumns: advViewType === 'grid' ? '1fr 1fr' : 'none', flexDirection: advViewType === 'list' ? 'column' : 'row', gap: '12px' }">
        <div v-for="i in 4" :key="i" :style="{ background: '#fff', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: advViewType === 'grid' ? 'column' : 'row', alignItems: advViewType === 'grid' ? 'flex-start' : 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }">
          <div :style="{ width: advViewType === 'grid' ? '100%' : '60px', height: advViewType === 'grid' ? '120px' : '60px', background: '#eee', borderRadius: '4px', flexShrink: 0 }"></div>
          <div style="flex: 1; width: 100%;">
            <div style="height: 14px; background: #e0e0e0; width: 80%; margin-bottom: 8px; border-radius: 2px;"></div>
            <div style="height: 12px; background: #f0f0f0; width: 50%; border-radius: 2px;"></div>
          </div>
        </div>
      </div>
      <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
        <p>Current Sort: {{ advSort }} | Current Filter: {{ advFilter }}</p>
      </div>
    </div>
  </div>
</DemoBlock>

## Use in Nuxt

`YhFilterBar` can be used directly in Nuxt 3/4 after registering `@yh-ui/nuxt`. Its sorting, filtering, and slot rendering logic work in SSR and client hydration flows.

<DemoBlock title="Nuxt Usage" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="background: #fff; padding: 0; border-radius: 8px; height: 320px; box-shadow: 0 2px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
    <yh-filter-bar
      v-model:sort="nuxtSort"
      v-model:filter-value="nuxtFilter"
      :sorts="nuxtSorts"
      :filters="nuxtFilters"
      @reset-panel="onResetNuxtPanel"
    >
      <template #panel-content="{ filter, value }">
        <div v-if="filter.key === 'price'" style="padding: 15px; display: flex; align-items: center; justify-content: center;">
          <input type="number" placeholder="Min" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.minPrice" />
          <span style="margin: 0 10px;">-</span>
          <input type="number" placeholder="Max" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.maxPrice" />
        </div>
      </template>
    </yh-filter-bar>
    <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
      <p>Current Sort: {{ nuxtSort }} | Current Filter: {{ nuxtFilter }}</p>
    </div>
  </div>
</DemoBlock>

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    // Auto-imported by default
  }
})
```

## API

### Props

| Parameter          | Description                                            | Type                 | Default                      |
| ------------------ | ------------------------------------------------------ | -------------------- | ---------------------------- |
| sorts              | Sort option list                                       | `YhFilterSortItem[]` | `[]`                         |
| filters            | Filter definition list                                 | `YhFilterItem[]`     | `[]`                         |
| sort               | Current sort state (`v-model:sort`)                    | `YhFilterSort`       | `{ key: null, order: null }` |
| filter-value       | Current filter state (`v-model:filterValue`)           | `YhFilterValue`      | `{}`                         |
| show-all           | Whether to render the built-in "All" tab               | `boolean`            | `true`                       |
| sticky             | Whether to enable sticky positioning                   | `boolean`            | `false`                      |
| sticky-offset      | Sticky top offset in pixels                            | `number`             | `0`                          |
| filter-in-panel    | Whether to render filters in the built-in popup panel  | `boolean`            | `true`                       |
| theme-overrides    | Component-level theme variable overrides               | `Record<string, string>` | `{}`                     |
| show-global-filter | Whether to show the global filter button               | `boolean`            | `true`                       |
| show-view-toggle   | Whether to show the list/grid view toggle button       | `boolean`            | `false`                      |
| view-type          | Current layout mode (`v-model:viewType`)               | `'list' \| 'grid'`   | `'list'`                     |

### Events

| Event Name    | Description                                                | Callback Parameters                         |
| ------------- | ---------------------------------------------------------- | ------------------------------------------- |
| sort-change   | Triggered after the current sort state changes             | `(sort: YhFilterSort)`                      |
| filter-change | Triggered after the current filter value changes           | `(value: YhFilterValue)`                    |
| view-change   | Triggered after the list/grid view mode changes            | `(viewType: 'list' \| 'grid')`              |
| reset         | Triggered when the built-in global reset action is used    | `-`                                         |
| confirm       | Triggered when the built-in panel confirm action is used   | `(value: YhFilterValue)`                    |
| reset-panel   | Triggered when resetting a single built-in filter panel    | `(filter: YhFilterItem, value: YhFilterValue)` |
| open-filter   | Triggered when the built-in global filter button is clicked | `-`                                        |

### Slots

| Slot Name     | Description                                  | Parameters                                                |
| ------------- | -------------------------------------------- | --------------------------------------------------------- |
| filter-icon   | Custom content for the built-in global filter icon | `-`                                                   |
| view-icon     | Custom content for the view toggle icon      | `{ viewType: 'list' \| 'grid' }`                          |
| extra         | Custom content rendered in the trailing area | `-`                                                       |
| panel-content | Custom content for the active popup filter panel | `{ filter: YhFilterItem, value: YhFilterValue, toggle: (filter: YhFilterItem, option: YhFilterOption) => void }` |

### Expose

This component does not expose public instance methods or properties.

### Theme Variables

| Variable Name                            | Default Value                     | Description                            |
| ---------------------------------------- | --------------------------------- | -------------------------------------- |
| `--yh-filter-bar-bg`                     | `var(--yh-bg-color)`              | Root background                        |
| `--yh-filter-bar-border`                 | `var(--yh-border-color-lighter)`  | Root border color                      |
| `--yh-filter-bar-height`                 | `44px`                            | Toolbar height                         |
| `--yh-filter-bar-tab-color`              | `var(--yh-text-color-regular)`    | Inactive tab text color                |
| `--yh-filter-bar-tab-active-color`       | `var(--yh-color-primary)`         | Active tab text color                  |
| `--yh-filter-bar-tab-active-bg`          | `var(--yh-color-primary-light-9)` | Active tab background token            |
| `--yh-filter-bar-tab-radius`             | `var(--yh-radius-base)`           | Tab radius token                       |
| `--yh-filter-bar-badge-bg`               | `var(--yh-color-danger)`          | Badge background                       |
| `--yh-filter-bar-panel-bg`               | `var(--yh-bg-color)`              | Panel background                       |
| `--yh-filter-bar-panel-shadow`           | `0 4px 20px var(--yh-shadow-color)` | Panel shadow                         |
| `--yh-filter-bar-panel-opt-bg`           | `var(--yh-fill-color-light)`      | Panel option background                |
| `--yh-filter-bar-panel-opt-active-bg`    | `var(--yh-color-primary-light-9)` | Active panel option background         |
| `--yh-filter-bar-panel-opt-active-color` | `var(--yh-color-primary)`         | Active panel option text color         |
| `--yh-filter-bar-panel-opt-active-border` | `var(--yh-color-primary)`        | Active panel option border token       |
| `--yh-filter-bar-z-index`                | `100`                             | Root stacking context                  |

### Type Exports

| Name | Description |
| --- | --- |
| `YhFilterBarProps` | Component props type |
| `YhFilterBarEmits` | Component emits type |
| `YhFilterBarSlots` | Component slots type |
| `YhFilterSortOrder` | Sort order union type |
| `YhFilterSortItem` | Sort item type |
| `YhFilterType` | Filter type union |
| `YhFilterOption` | Filter option type |
| `YhFilterItem` | Filter item type |
| `YhFilterValue` | Filter value shape |
| `YhFilterSort` | Sort state type |
| `YhFilterBarInstance` | Component instance type |
