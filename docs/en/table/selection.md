# Table - Selection

The Table component supports single and multiple selection.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// --- 1. Basic Selection Data ---
const selectionData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Nanshan, Shenzhen' },
  { id: 5, date: '2024-01-05', name: 'Tom W.', address: 'Xihu, Hangzhou' }
])

const selectionColumns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]

// --- 2. Multiple Selection ---
const multipleTableRef = ref()
const multipleSelection = ref<Record<string, unknown>[]>([])
const handleSelectionChange = (rows: Record<string, unknown>[]) => {
  multipleSelection.value = rows
}

const toggleSelection = (rows?: Record<string, unknown>[]) => {
  if (rows) {
    rows.forEach(row => {
      multipleTableRef.value?.toggleRowSelection(row, true)
    })
  } else {
    multipleTableRef.value?.clearSelection()
  }
}

// --- 3. Single Selection ---
const radioTableRef = ref()
const currentRadioRow = ref<Record<string, unknown> | undefined>()
const handleRadioChange = (rows: Record<string, unknown>[]) => {
  currentRadioRow.value = rows[0] || undefined
}

// --- 4. Disabled Selection ---
const selectableRow = (row: Record<string, unknown>) => {
  return row.id !== 2 && row.id !== 4
}

// --- Sample Code ---

const tsMultiple = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="toggleSelection([tableData[1], tableData[2]])">
      Select Rows 2 & 3
    </yh-button>
    <yh-button size="small" @click="toggleSelection()" style="margin-left: 8px">
      Clear Selection
    </yh-button>
  </div>
  <yh-table
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleSelectionChange"
    border
  />
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    Selected: {{ multipleSelection.map(row => row.name).join(', ') || 'None' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Nanshan, Shenzhen' },
  { id: 5, date: '2024-01-05', name: 'Tom W.', address: 'Xihu, Hangzhou' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const multipleSelection = ref<RowItem[]>([])

const handleSelectionChange = (rows: RowItem[]) => {
  multipleSelection.value = rows
}

const toggleSelection = (rows?: RowItem[]) => {
  if (rows) {
    rows.forEach(row => {
      tableRef.value?.toggleRowSelection(row, true)
    })
  } else {
    tableRef.value?.clearSelection()
  }
}
</${_S}>`

const jsMultiple = toJs(tsMultiple)

const tsRadio = `<${_T}>
  <yh-table
    :data="tableData"
    :columns="columns"
    :selection-config="{ type: 'radio' }"
    @selection-change="handleRadioChange"
    border
  />
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    Current: {{ currentRow?.name || 'None' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Nanshan, Shenzhen' },
  { id: 5, date: '2024-01-05', name: 'Tom W.', address: 'Xihu, Hangzhou' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const currentRow = ref<RowItem | null>(null)

const handleRadioChange = (rows: RowItem[]) => {
  currentRow.value = rows[0] || null
}
</${_S}>`

const jsRadio = toJs(tsRadio)

const tsDisabled = `<${_T}>
  <yh-table
    :data="tableData"
    :columns="columns"
    :selection-config="{ 
      type: 'checkbox',
      checkable: selectable
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">Rows 2 and 4 are disabled from selection</p>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Nanshan, Shenzhen' },
  { id: 5, date: '2024-01-05', name: 'Tom W.', address: 'Xihu, Hangzhou' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const selectable = (row: RowItem) => {
  return row.id !== 2 && row.id !== 4
}
</${_S}>`

const jsDisabled = toJs(tsDisabled)

const tsReserve = `<${_T}>
  <yh-table
    :data="tableData"
    :columns="columns"
    :selection-config="{ 
      type: 'checkbox',
      reserve: true
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">When using with pagination, selection state is preserved after page change</p></${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Nanshan, Shenzhen' },
  { id: 5, date: '2024-01-05', name: 'Tom W.', address: 'Xihu, Hangzhou' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsReserve = toJs(tsReserve)

// --- 5. Practical Case: Cross-Page Selection + Online API ---
const practicalTableRef = ref()
const practicalData = ref<Record<string, unknown>[]>([])
const practicalLoading = ref(false)
const practicalPage = ref(1)
const practicalPageSize = 10
const practicalTotal = ref(0)
const practicalSelectedKeys = ref<number[]>([])
const practicalSelectedMap = ref(new Map<number, Record<string, unknown>>())

const practicalColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: 'Title' },
  { prop: 'userId', label: 'User ID', width: 100 }
]

const fetchPosts = async (page: number) => {
  practicalLoading.value = true
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${practicalPageSize}`
    )
    practicalData.value = await res.json()
    practicalTotal.value = 100
  } finally {
    practicalLoading.value = false
  }
}

const handlePracticalPageChange = (page: number) => {
  practicalPage.value = page
  fetchPosts(page)
}

const handlePracticalSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(practicalData.value.map(r => r.id as number))
  // Remove all items from current page
  currentIds.forEach(id => practicalSelectedMap.value.delete(id))
  // Add back selected items from current page
  rows.forEach(row => practicalSelectedMap.value.set(row.id as number, { ...row }))
  // Sync keys
  practicalSelectedKeys.value = Array.from(practicalSelectedMap.value.keys())
}

const removePracticalSelected = (id: number) => {
  practicalSelectedMap.value.delete(id)
  practicalSelectedKeys.value = Array.from(practicalSelectedMap.value.keys())
}

const clearAllPractical = () => {
  practicalSelectedMap.value.clear()
  practicalSelectedKeys.value = []
}

const practicalSelectedList = computed(() => Array.from(practicalSelectedMap.value.values()))

// Initial load
fetchPosts(1)

// --- 6. Practical Case: Initialize Echo Selected Data ---
const echoTableRef = ref()
const echoData = ref<Record<string, unknown>[]>([])
const echoLoading = ref(false)
const echoPage = ref(1)
const echoPageSize = 10
const echoTotal = ref(0)
const echoSelectedKeys = ref<number[]>([])
const echoSelectedMap = ref(new Map<number, Record<string, unknown>>())

const echoColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: 'Title' },
  { prop: 'userId', label: 'User ID', width: 100 }
]

// Simulate backend returned selected data (e.g., echo previously saved selections when editing form)
const mockSavedSelections = [
  { id: 3, title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut', userId: 1 },
  { id: 7, title: 'magnam facilis autem', userId: 1 },
  { id: 15, title: 'eveniet quod temporibus', userId: 2 },
  { id: 22, title: 'dolor sint quo a velit explicabo quia nam', userId: 3 },
  { id: 38, title: 'explicabo et eos deleniti nostrum ab id repellendus', userId: 4 }
]

const initEchoSelections = () => {
  // Write backend returned selected data to Map
  echoSelectedMap.value.clear()
  mockSavedSelections.forEach(item => {
    echoSelectedMap.value.set(item.id, { ...item })
  })
  // Sync keys to drive table selection state
  echoSelectedKeys.value = Array.from(echoSelectedMap.value.keys())
}

const fetchEchoPosts = async (page: number) => {
  echoLoading.value = true
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${echoPageSize}`
    )
    echoData.value = await res.json()
    echoTotal.value = 100
  } finally {
    echoLoading.value = false
  }
}

const handleEchoPageChange = (page: number) => {
  echoPage.value = page
  fetchEchoPosts(page)
}

const handleEchoSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(echoData.value.map(r => r.id as number))
  currentIds.forEach(id => echoSelectedMap.value.delete(id))
  rows.forEach(row => echoSelectedMap.value.set(row.id as number, { ...row }))
  echoSelectedKeys.value = Array.from(echoSelectedMap.value.keys())
}

const removeEchoSelected = (id: number) => {
  echoSelectedMap.value.delete(id)
  echoSelectedKeys.value = Array.from(echoSelectedMap.value.keys())
}

const clearAllEcho = () => {
  echoSelectedMap.value.clear()
  echoSelectedKeys.value = []
}

const echoSelectedList = computed(() => Array.from(echoSelectedMap.value.values()))

// Initialize: Load selected data first, then request first page
initEchoSelections()
fetchEchoPosts(1)

const tsPractical = `<${_T}>
  <yh-table
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: selectedKeys
    }"
    :loading="loading"
    @selection-change="handleSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      background
      @current-change="handlePageChange"
    />
  </div>

  <div v-if="selectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">Selected {{ selectedList.length }} items</span>
      <yh-button size="small" type="danger" plain @click="clearAll">Clear</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in selectedList"
        :key="item.id"
        closable
        @close="removeSelected(item.id)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 20) }}...
      </yh-tag>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'

const tableRef = ref()
const tableData = ref<Record<string, unknown>[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const selectedKeys = ref<number[]>([])
const selectedMap = ref(new Map<number, Record<string, unknown>>())

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: 'Title' },
  { prop: 'userId', label: 'User ID', width: 100 }
]

const fetchPosts = async (page: number) => {
  loading.value = true
  try {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${pageSize}\`
    )
    tableData.value = await res.json()
    total.value = 100
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchPosts(page)
}

const handleSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(tableData.value.map(r => r.id as number))
  currentIds.forEach(id => selectedMap.value.delete(id))
  rows.forEach(row => selectedMap.value.set(row.id as number, { ...row }))
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const removeSelected = (id: number) => {
  selectedMap.value.delete(id)
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const clearAll = () => {
  selectedMap.value.clear()
  selectedKeys.value = []
}

const selectedList = computed(() => Array.from(selectedMap.value.values()))

fetchPosts(1)
</${_S}>`

const jsPractical = toJs(tsPractical)

const tsEcho = `<${_T}>
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <yh-button size="small" type="primary" @click="initSelections">
      Simulate Init Echo
    </yh-button>
    <yh-button size="small" @click="clearAll">
      Clear All
    </yh-button>
  </div>

  <yh-table
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: selectedKeys
    }"
    :loading="loading"
    @selection-change="handleSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      background
      @current-change="handlePageChange"
    />
  </div>

  <div v-if="selectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">Selected {{ selectedList.length }} items (with cross-page data)</span>
      <yh-button size="small" type="danger" plain @click="clearAll">Clear</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in selectedList"
        :key="item.id"
        closable
        @close="removeSelected(item.id)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 15) }}...
      </yh-tag>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'

const tableRef = ref()
const tableData = ref<Record<string, unknown>[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const selectedKeys = ref<number[]>([])
const selectedMap = ref(new Map<number, Record<string, unknown>>())

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: 'Title' },
  { prop: 'userId', label: 'User ID', width: 100 }
]

// Simulate backend returned selected data (e.g., echo previously saved selections when editing form)
const mockSavedSelections = [
  { id: 3, title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut', userId: 1 },
  { id: 7, title: 'magnam facilis autem', userId: 1 },
  { id: 15, title: 'eveniet quod temporibus', userId: 2 },
  { id: 22, title: 'dolor sint quo a velit explicabo quia nam', userId: 3 },
  { id: 38, title: 'explicabo et eos deleniti nostrum ab id repellendus', userId: 4 }
]

/**
 * Initialize echo: Write backend selected data to Map → sync keys → table auto checks
 * Core principle: selectedRowKeys drives the table's selection state
 */
const initSelections = () => {
  selectedMap.value.clear()
  mockSavedSelections.forEach(item => {
    selectedMap.value.set(item.id, { ...item })
  })
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const fetchPosts = async (page: number) => {
  loading.value = true
  try {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${pageSize}\`
    )
    tableData.value = await res.json()
    total.value = 100
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchPosts(page)
}

const handleSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(tableData.value.map(r => r.id as number))
  currentIds.forEach(id => selectedMap.value.delete(id))
  rows.forEach(row => selectedMap.value.set(row.id as number, { ...row }))
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const removeSelected = (id: number) => {
  selectedMap.value.delete(id)
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const clearAll = () => {
  selectedMap.value.clear()
  selectedKeys.value = []
}

const selectedList = computed(() => Array.from(selectedMap.value.values()))

// Page load: Echo selected first, then request data
initSelections()
fetchPosts(1)
</${_S}>`

const jsEcho = toJs(tsEcho)

</script>

## Multiple Selection

Configure `selection-config` type as `checkbox` to enable multiple selection.

<DemoBlock title="Multiple Selection" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="toggleSelection([selectionData[1], selectionData[2]])">
      Select Rows 2 & 3
    </yh-button>
    <yh-button size="small" @click="toggleSelection()" style="margin-left: 8px">
      Clear Selection
    </yh-button>
  </div>
  
  <yh-table
    ref="multipleTableRef"
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleSelectionChange"
    border
  />
  
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    Selected: {{ multipleSelection.map(row => row.name).join(', ') || 'None' }}
  </div>
</DemoBlock>

## Single Selection

Configure `selection-config` type as `radio` to enable single selection.

<DemoBlock title="Single Selection" :ts-code="tsRadio" :js-code="jsRadio">
  <yh-table
    ref="radioTableRef"
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ type: 'radio' }"
    @selection-change="handleRadioChange"
    border
  />
  
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    Current: {{ currentRadioRow?.name || 'None' }}
  </div>
</DemoBlock>

## Disabled Selection

Use `selection-config.checkable` function to control whether a row can be selected.

<DemoBlock title="Disabled Selection" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-table
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ 
      type: 'checkbox',
      checkable: selectableRow
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">Rows 2 and 4 are disabled from selection</p>
</DemoBlock>

## Cross-Page Selection

Set `selection-config.reserve` to `true` to preserve selection state when switching pages.

<DemoBlock title="Cross-Page Selection" :ts-code="tsReserve" :js-code="jsReserve">
  <yh-table
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ 
      type: 'checkbox',
      reserve: true
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">When using with pagination, selection state is preserved after page change</p></DemoBlock>

## Practical: Cross-Page Selection & Echo

Combine with pagination component to request online API [JSONPlaceholder](https://jsonplaceholder.typicode.com/), demonstrating cross-page selection and selected data echo in real scenarios.

<DemoBlock title="Practical: Cross-Page Selection & Echo" :ts-code="tsPractical" :js-code="jsPractical">
  <yh-table
    ref="practicalTableRef"
    :data="practicalData"
    :columns="practicalColumns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: practicalSelectedKeys
    }"
    :loading="practicalLoading"
    @selection-change="handlePracticalSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="practicalPage"
      :page-size="practicalPageSize"
      :total="practicalTotal"
      layout="total, prev, pager, next"
      background
      @current-change="handlePracticalPageChange"
    />
  </div>

  <div v-if="practicalSelectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">Selected {{ practicalSelectedList.length }} items</span>
      <yh-button size="small" type="danger" plain @click="clearAllPractical">Clear</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in practicalSelectedList"
        :key="(item.id as number)"
        closable
        @close="removePracticalSelected(item.id as number)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 20) }}...
      </yh-tag>
    </div>
  </div>
</DemoBlock>

## Practical: Pagination Init Echo

Simulate editing scenario - get previously saved selection data from backend when page loads, automatically echo selection state via `selectedRowKeys`. When switching to the corresponding page, rows belonging to that page will be automatically checked; also supports continue checking/unchecking operations.

> **Core Principle**: Write backend returned selected data to `Map`, extract `keys` and pass to `selectedRowKeys`, the table will automatically mark matching rows as selected.

<DemoBlock title="Practical: Pagination Init Echo" :ts-code="tsEcho" :js-code="jsEcho">
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <yh-button size="small" type="primary" @click="initEchoSelections">
      Simulate Init Echo
    </yh-button>
    <yh-button size="small" @click="clearAllEcho">
      Clear All
    </yh-button>
  </div>

  <yh-table
    ref="echoTableRef"
    :data="echoData"
    :columns="echoColumns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: echoSelectedKeys
    }"
    :loading="echoLoading"
    @selection-change="handleEchoSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="echoPage"
      :page-size="echoPageSize"
      :total="echoTotal"
      layout="total, prev, pager, next"
      background
      @current-change="handleEchoPageChange"
    />
  </div>

  <div v-if="echoSelectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">Selected {{ echoSelectedList.length }} items (with cross-page data)</span>
      <yh-button size="small" type="danger" plain @click="clearAllEcho">Clear</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in echoSelectedList"
        :key="(item.id as number)"
        closable
        @close="removeEchoSelected(item.id as number)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 15) }}...
      </yh-tag>
    </div>
  </div>
</DemoBlock>
