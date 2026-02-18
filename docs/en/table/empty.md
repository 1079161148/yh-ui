# Table - Empty Data Hint

When the table has no data, display an empty state placeholder hint, supporting custom text, images, and slots.

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== Common Column Config ====================

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'address', label: 'Address' }
]

// ==================== 1. Default Empty Data ====================
const emptyData1 = ref<Record<string, unknown>[]>([])

// ==================== 2. Custom Empty Text ====================
const emptyData2 = ref<Record<string, unknown>[]>([])

// ==================== 3. Custom Image and Description with emptyConfig ====================
const emptyImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100"><rect x="20" y="30" width="80" height="55" rx="6" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2"/><path d="M38 55h44M38 65h30" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round"/><circle cx="60" cy="42" r="5" fill="#c0c4cc"/></svg>')
const emptyData3 = ref<Record<string, unknown>[]>([])

// ==================== 4. Slot Custom Empty State ====================
const emptyData4 = ref<Record<string, unknown>[]>([])
const slotLoading = ref(false)

const refreshData = () => {
  slotLoading.value = true
  setTimeout(() => {
    emptyData4.value = [
      { name: 'John', age: 28, dept: 'Engineering', address: 'Chaoyang, Beijing' },
      { name: 'Jane', age: 32, dept: 'Product', address: 'Pudong, Shanghai' },
      { name: 'Mike', age: 25, dept: 'Design', address: 'Tianhe, Guangzhou' }
    ]
    slotLoading.value = false
  }, 1000)
}

// ==================== 5. Dynamic Data Toggle ====================
const dynamicData = ref<Record<string, unknown>[]>([])
const hasDynData = ref(false)

const toggleDynamicData = () => {
  if (hasDynData.value) {
    dynamicData.value = []
    hasDynData.value = false
  } else {
    dynamicData.value = [
      { name: 'John', age: 28, dept: 'Engineering', address: 'Chaoyang, Beijing' },
      { name: 'Jane', age: 32, dept: 'Product', address: 'Pudong, Shanghai' },
      { name: 'Mike', age: 25, dept: 'Design', address: 'Tianhe, Guangzhou' }
    ]
    hasDynData.value = true
  }
}

// ==================== Code Examples ====================

const tsDefaultEmpty = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsDefaultEmpty = toJs(tsDefaultEmpty)

const tsCustomText = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    empty-text="No matching data found"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsCustomText = toJs(tsCustomText)

const tsEmptyConfig = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :empty-config="{
      image: emptyImage,
      description: 'Nothing here yet~'
    }"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const emptyImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100"><rect x="20" y="30" width="80" height="55" rx="6" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2"/><path d="M38 55h44M38 65h30" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round"/><circle cx="60" cy="42" r="5" fill="#c0c4cc"/></svg>')

const data = ref<Record<string, unknown>[]>([])

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsEmptyConfig = toJs(tsEmptyConfig)

const tsSlotEmpty = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
  >
    <template #empty>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 40px 0; gap: 16px;">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="36" rx="4" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2" />
          <path d="M20 32h24M20 40h16" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round" />
          <circle cx="32" cy="24" r="4" fill="#c0c4cc" />
        </svg>
        <span style="color: #909399; font-size: 14px;">No Data, please try again later</span>
        <button style="padding: 6px 16px; border: 1px solid #dcdfe6; border-radius: 4px; background: #fff; color: #606266; cursor: pointer;"
          @click="refreshData">
          Refresh Data
        </button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])
const loading = ref(false)

const refreshData = () => {
  loading.value = true
  setTimeout(() => {
    data.value = [
      { name: 'John', age: 28, dept: 'Engineering', address: 'Chaoyang, Beijing' },
      { name: 'Jane', age: 32, dept: 'Product', address: 'Pudong, Shanghai' },
      { name: 'Mike', age: 25, dept: 'Design', address: 'Tianhe, Guangzhou' }
    ]
    loading.value = false
  }, 1000)
}

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsSlotEmpty = toJs(tsSlotEmpty)

const tsDynamicEmpty = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="toggle">
      {{ hasData ? 'Clear Data' : 'Load Data' }}
    </yh-button>
  </div>
  <yh-table
    :data="data"
    :columns="columns"
    border
    empty-text="Data cleared, click the button to reload"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])
const hasData = ref(false)

const toggle = () => {
  if (hasData.value) {
    data.value = []
    hasData.value = false
  } else {
    data.value = [
      { name: 'John', age: 28, dept: 'Engineering', address: 'Chaoyang, Beijing' },
      { name: 'Jane', age: 32, dept: 'Product', address: 'Pudong, Shanghai' },
      { name: 'Mike', age: 25, dept: 'Design', address: 'Tianhe, Guangzhou' }
    ]
    hasData.value = true
  }
}

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsDynamicEmpty = toJs(tsDynamicEmpty)
</script>

## Default Empty State

When `data` is an empty array, the table automatically shows an empty data hint with default text "No Data".

<DemoBlock title="Default Empty Hint" :ts-code="tsDefaultEmpty" :js-code="jsDefaultEmpty">
  <yh-table
    :data="emptyData1"
    :columns="columns"
    border
  />
</DemoBlock>

## Custom Empty Text

Customize the empty data hint text through the `empty-text` property.

<DemoBlock title="Custom Text" :ts-code="tsCustomText" :js-code="jsCustomText">
  <yh-table
    :data="emptyData2"
    :columns="columns"
    empty-text="No matching data found"
    border
  />
</DemoBlock>

## Custom Image & Description

Set custom image and description text through the `empty-config` object.

<DemoBlock title="Image + Description" :ts-code="tsEmptyConfig" :js-code="jsEmptyConfig">
  <yh-table
    :data="emptyData3"
    :columns="columns"
    :empty-config="{
      image: emptyImage,
      description: 'Nothing here yet~'
    }"
    border
  />
</DemoBlock>

## Custom Empty Slot

Fully customize the empty state display content through the `#empty` slot, including icons, text, and action buttons.

<DemoBlock title="Custom Slot" :ts-code="tsSlotEmpty" :js-code="jsSlotEmpty">
  <yh-table
    :data="emptyData4"
    :columns="columns"
    :loading="slotLoading"
    border
  >
    <template #empty>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 40px 0; gap: 16px;">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="36" rx="4" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2" />
          <path d="M20 32h24M20 40h16" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round" />
          <circle cx="32" cy="24" r="4" fill="#c0c4cc" />
        </svg>
        <span style="color: #909399; font-size: 14px;">No Data, please try again later</span>
        <button style="padding: 6px 16px; border: 1px solid #dcdfe6; border-radius: 4px; background: #fff; color: #606266; cursor: pointer;"
          @click="refreshData">
          Refresh Data
        </button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## Dynamic Toggle

Toggle data state dynamically with buttons to experience switching between empty data and loaded data.

<DemoBlock title="Dynamic Data Toggle" :ts-code="tsDynamicEmpty" :js-code="jsDynamicEmpty">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="toggleDynamicData">
      {{ hasDynData ? 'Clear Data' : 'Load Data' }}
    </yh-button>
  </div>
  <yh-table
    :data="dynamicData"
    :columns="columns"
    border
    empty-text="Data cleared, click the button to reload"
  />
</DemoBlock>

## API

### Table Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| empty-text | Text shown when data is empty | `string` | `'No Data'` |
| empty-config | Empty state config object | `TableEmptyConfig` | — |

### TableEmptyConfig

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| image | Empty state image URL | `string` | — |
| description | Empty state description (higher priority than `empty-text`) | `string` | — |
| render | Custom render function | `() => VNode` | — |

### Slots

| Slot | Description |
| --- | --- |
| empty | Custom empty data content, highest priority |

### Priority

Empty state display content priority from high to low:

1. **`#empty` slot** — Fully custom content
2. **`emptyConfig.render`** — Render function
3. **`emptyConfig.image` + `emptyConfig.description`** — Image and description
4. **`empty-text`** — Simple text hint
5. **Default** — "No Data"
