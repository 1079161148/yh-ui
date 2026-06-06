# Table - Loading State

Display a loading overlay on the table by setting the `loading` property, suitable for async data request scenarios.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== 1. Basic Loading ====================

const basicLoading = ref(true)

const basicData = [
  { id: 1, name: 'Test1', sex: 'Man', age: 28, address: 'test abc' },
  { id: 2, name: 'Test2', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 3, name: 'Test3', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 4, name: 'Test4', sex: 'Women', age: 23, address: 'test abc' },
  { id: 5, name: 'Test5', sex: 'Women', age: 30, address: 'Shanghai' }
]

const basicColumns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]

// ==================== 2. Custom Text and Icon ====================

const customTextLoading = ref(true)

// ==================== 3. Custom Loading Slot ====================

const slotLoading = ref(true)

// ==================== 4. Async Request Loading ====================

const asyncLoading = ref(false)
const asyncData = ref<Record<string, unknown>[]>([])

const fetchData = () => {
  asyncLoading.value = true
  asyncData.value = []
  setTimeout(() => {
    asyncData.value = [
      { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000 },
      { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000 },
      { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000 },
      { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000 },
      { id: 5, name: 'Tom', dept: 'Marketing', position: 'Marketing Manager', salary: 16000 }
    ]
    asyncLoading.value = false
  }, 2000)
}

const asyncColumns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position' },
  { prop: 'salary', label: 'Salary', width: 120 }
]

// ==================== Code Examples ====================

const tsBasicLoading = `<${_T}>
  <div style="margin-bottom: 12px;">
    <label>
      <input type="checkbox" v-model="loading" /> Show Loading
    </label>
  </div>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
    show-index
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

const data = [
  { id: 1, name: 'Test1', sex: 'Man', age: 28, address: 'test abc' },
  { id: 2, name: 'Test2', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 3, name: 'Test3', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 4, name: 'Test4', sex: 'Women', age: 23, address: 'test abc' },
  { id: 5, name: 'Test5', sex: 'Women', age: 30, address: 'Shanghai' }
]

const columns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsBasicLoading = toJs(tsBasicLoading)

const tsCustomTextLoading = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="{ visible: true, text: 'Loading hard...' }"
    border
    show-index
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data: Record<string, unknown>[] = []

const columns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsCustomTextLoading = toJs(tsCustomTextLoading)

const tsSlotLoading = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
    show-index
  >
    <template #loading>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px;">
        <svg width="40" height="40" viewBox="0 0 50 50" style="animation: rotate 1.5s linear infinite;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#409eff" stroke-width="3" stroke-dasharray="90 150" stroke-linecap="round" />
        </svg>
        <span style="color: #409eff; font-size: 14px;">Custom loading animation...</span>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

const data = [
  { id: 1, name: 'Test1', sex: 'Man', age: 28, address: 'test abc' },
  { id: 2, name: 'Test2', sex: 'Women', age: 22, address: 'Guangzhou' }
]

const columns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsSlotLoading = toJs(tsSlotLoading)

const tsAsyncLoading = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="fetchData" :loading="loading">
      {{ loading ? 'Loading...' : 'Fetch Data' }}
    </yh-button>
  </div>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
    show-index
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const data = ref<Record<string, unknown>[]>([])

const fetchData = () => {
  loading.value = true
  data.value = []
  // Simulate 2s API request
  setTimeout(() => {
    data.value = [
      { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000 },
      { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000 },
      { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000 },
      { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000 },
      { id: 5, name: 'Tom', dept: 'Marketing', position: 'Marketing Manager', salary: 16000 }
    ]
    loading.value = false
  }, 2000)
}

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position' },
  { prop: 'salary', label: 'Salary', width: 120 }
]
</${_S}>`

const jsAsyncLoading = toJs(tsAsyncLoading)
</script>

## Basic Usage

Set the `loading` property to use the built-in loading effect.

<DemoBlock title="Basic Loading" :ts-code="tsBasicLoading" :js-code="jsBasicLoading">
  <div style="margin-bottom: 12px;">
    <label style="cursor: pointer; user-select: none;">
      <input type="checkbox" v-model="basicLoading" /> Show Loading
    </label>
  </div>
  <yh-table
    :data="basicData"
    :columns="basicColumns"
    :loading="basicLoading"
    border
    show-index
  />
</DemoBlock>

## Custom Loading Icon and Text

Pass an object to `loading` to customize loading text. Set `{ visible: true, text: '...' }` to display custom text.

<DemoBlock title="Custom Text" :ts-code="tsCustomTextLoading" :js-code="jsCustomTextLoading">
  <yh-table
    :data="[]"
    :columns="basicColumns"
    :loading="{ visible: true, text: 'Loading hard...' }"
    border
    show-index
  />
</DemoBlock>

## Custom Loading Slot

Use the `#loading` slot to fully customize the loading display content.

<DemoBlock title="Custom Slot" :ts-code="tsSlotLoading" :js-code="jsSlotLoading">
  <yh-table
    :data="basicData.slice(0, 2)"
    :columns="basicColumns"
    :loading="slotLoading"
    border
    show-index
  >
    <template #loading>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px;">
        <svg width="40" height="40" viewBox="0 0 50 50" style="animation: yh-table-spin 1.5s linear infinite;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#409eff" stroke-width="3" stroke-dasharray="90 150" stroke-linecap="round" />
        </svg>
        <span style="color: #409eff; font-size: 14px;">Custom loading animation...</span>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## Async Request

In real-world scenarios, `loading` is typically used with async data requests. Set to `true` when the request starts, and `false` when it completes.

<DemoBlock title="Async Request Loading" :ts-code="tsAsyncLoading" :js-code="jsAsyncLoading">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="fetchData" :loading="asyncLoading">
      {{ asyncLoading ? 'Loading...' : 'Fetch Data' }}
    </yh-button>
  </div>
  <yh-table
    :data="asyncData"
    :columns="asyncColumns"
    :loading="asyncLoading"
    border
    show-index
  />
</DemoBlock>

## API

### Loading Properties

The `loading` property supports both `boolean` and object forms.

| Usage | Description | Type |
| --- | --- | --- |
| `:loading="true"` | Show default loading effect | `boolean` |
| `:loading="{ visible, text }"` | Object form, configurable text etc. | `TableLoadingConfig` |

### TableLoadingConfig

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| visible | Whether to show loading state | `boolean` | `false` |
| text | Loading hint text | `string` | — |
| icon | Custom loading icon component | `Component \| string` | — |
| background | Overlay background color | `string` | `rgba(255, 255, 255, 0.8)` |
| render | Fully custom render function | `() => VNode` | — |

### Slots

| Slot | Description |
| --- | --- |
| loading | Custom loading display content, takes priority over `loading` object config |

### Notes

1. **Shorthand**: `:loading="true"` is equivalent to `:loading="{ visible: true }"`.
2. **Slot Priority**: When both `#loading` slot and `loading` object config are used, slot content takes priority.
3. **Overlay Z-Index**: The loading overlay `z-index` is 20, ensuring it covers the table content.
4. **With Requests**: It's recommended to set `loading = true` before initiating async requests, and `loading = false` after completion (success or failure).
