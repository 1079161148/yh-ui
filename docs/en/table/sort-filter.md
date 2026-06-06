# Table - Sort & Filter

The Table component supports sorting and filtering data.

<script setup lang="ts">
import { ref } from 'vue'

// --- 1. Basic Data ---
const sortFilterData = ref([
  { id: 1, date: '2024-01-01', name: 'John', age: 28, tag: 'Home' },
  { id: 2, date: '2024-01-02', name: 'Jane', age: 35, tag: 'Company' },
  { id: 3, date: '2024-01-03', name: 'Mike', age: 22, tag: 'Home' },
  { id: 4, date: '2024-01-04', name: 'Sarah', age: 45, tag: 'Company' },
  { id: 5, date: '2024-01-05', name: 'Tom', age: 31, tag: 'School' }
])

const sortFilterColumns = [
  { prop: 'date', label: 'Date', width: 150, sortable: true },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100, sortable: true },
  { prop: 'tag', label: 'Tag' }
]

const sortFilterColumnsOnly = [
  { prop: 'date', label: 'Date', width: 150, sortable: true },
  { prop: 'name', label: 'Name', width: 120 },
  { 
    prop: 'tag', 
    label: 'Tag',
    filterable: true,
    filters: [
      { text: 'Home', value: 'Home' },
      { text: 'Company', value: 'Company' },
      { text: 'School', value: 'School' }
    ]
  }
]

interface SortRowData {
  id: number
  date: string
  name: string
  age: number
  tag: string
}

const customSortLogic = (a: SortRowData, b: SortRowData, order: string | null) => {
  const nameA = a.name.length
  const nameB = b.name.length
  return order === 'asc' ? nameA - nameB : nameB - nameA
}

const customSortFilterColumns = [
  { prop: 'name', label: 'Name', width: 120, sortable: true, sortMethod: customSortLogic },
  { prop: 'age', label: 'Age', width: 100, sortable: true }
]

const multiSortFilterColumns = [
  { prop: 'date', label: 'Date', width: 150, sortable: true },
  { prop: 'age', label: 'Age', width: 100, sortable: true }
]

const sortFilterTableRef = ref()
const handleClearSort = () => sortFilterTableRef.value?.clearSort()

// --- Code Cleanup Utility ---
const toJs = (tsCode: string) => {
  const lt = '<'
  const gt = '>'
  
  return tsCode
    .replace(/\s*lang="ts"/g, '')
    .replace(/interface\s+\w+\s*\{[\s\S]+?\}\n?/g, '')
    .replace(new RegExp(`(ref|computed|reactive|shallowRef)${lt}[^(]*${gt}\\(`, 'g'), '$1(')
    .replace(/\s+as\s+[A-Za-z0-9_|[\] ]+/g, '')
    .replace(/([\w})])\s*:\s*\{[^}]*\}/g, '$1')
    .replace(/:\s*([A-Za-z][A-Za-z0-9_|[\] ]*)(?=[,;)\n]|\s*=)/g, (match, type) => {
      const basicTypes = ['string', 'number', 'boolean', 'any', 'void', 'unknown', 'object', 'symbol', 'bigint', 'any[]']
      if (basicTypes.includes(type.trim()) || /^[A-Z]/.test(type.trim())) return ''
      return match
    })
    .trim()
}

// --- Tag Helper Variables (avoid template parsing) ---
const _T = 'template'
const _S = 'script'

// --- Code Examples ---

const tsSort = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', age: 28, tag: 'Home' },
  { id: 2, date: '2024-01-02', name: 'Jane', age: 35, tag: 'Company' },
  { id: 3, date: '2024-01-03', name: 'Mike', age: 22, tag: 'Home' },
  { id: 4, date: '2024-01-04', name: 'Sarah', age: 45, tag: 'Company' },
  { id: 5, date: '2024-01-05', name: 'Tom', age: 31, tag: 'School' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150, sortable: true },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100, sortable: true },
  { prop: 'tag', label: 'Tag' }
]
</${_S}>`

const jsSort = toJs(tsSort)

const tsFilter = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', age: 28, tag: 'Home' },
  { id: 2, date: '2024-01-02', name: 'Jane', age: 35, tag: 'Company' },
  { id: 3, date: '2024-01-03', name: 'Mike', age: 22, tag: 'Home' },
  { id: 4, date: '2024-01-04', name: 'Sarah', age: 45, tag: 'Company' },
  { id: 5, date: '2024-01-05', name: 'Tom', age: 31, tag: 'School' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150, sortable: true },
  { prop: 'name', label: 'Name', width: 120 },
  { 
    prop: 'tag', 
    label: 'Tag',
    filterable: true,
    filters: [
      { text: 'Home', value: 'Home' },
      { text: 'Company', value: 'Company' },
      { text: 'School', value: 'School' }
    ]
  }
]
</${_S}>`

const jsFilter = toJs(tsFilter)

const tsCustomSort = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">Name column sorted by character length</p>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface RowItem {
  id: number
  date: string
  name: string
  age: number
  tag: string
}

const customSortMethod = (a: RowItem, b: RowItem, order: string | null) => {
  const nameA = a.name.length
  const nameB = b.name.length
  return order === 'asc' ? nameA - nameB : nameB - nameA
}

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', age: 28, tag: 'Home' },
  { id: 2, date: '2024-01-02', name: 'Jane', age: 35, tag: 'Company' },
  { id: 3, date: '2024-01-03', name: 'Mike', age: 22, tag: 'Home' },
  { id: 4, date: '2024-01-04', name: 'Sarah', age: 45, tag: 'Company' },
  { id: 5, date: '2024-01-05', name: 'Tom', age: 31, tag: 'School' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 120, sortable: true, sortMethod: customSortMethod },
  { prop: 'age', label: 'Age', width: 100, sortable: true }
]
</${_S}>`

const jsCustomSort = toJs(tsCustomSort)

const tsMultiSort = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :sort-config="{ multiple: true }"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', age: 28, tag: 'Home' },
  { id: 2, date: '2024-01-02', name: 'Jane', age: 35, tag: 'Company' },
  { id: 3, date: '2024-01-03', name: 'Mike', age: 22, tag: 'Home' },
  { id: 4, date: '2024-01-04', name: 'Sarah', age: 45, tag: 'Company' },
  { id: 5, date: '2024-01-05', name: 'Tom', age: 31, tag: 'School' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150, sortable: true },
  { prop: 'age', label: 'Age', width: 100, sortable: true }
]
</${_S}>`

const jsMultiSort = toJs(tsMultiSort)

const tsClearSort = `<${_T}>
  <yh-button size="small" @click="clearSort" style="margin-bottom: 16px">Clear Sort</yh-button>
  <yh-table ref="tableRef" :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', age: 28, tag: 'Home' },
  { id: 2, date: '2024-01-02', name: 'Jane', age: 35, tag: 'Company' },
  { id: 3, date: '2024-01-03', name: 'Mike', age: 22, tag: 'Home' },
  { id: 4, date: '2024-01-04', name: 'Sarah', age: 45, tag: 'Company' },
  { id: 5, date: '2024-01-05', name: 'Tom', age: 31, tag: 'School' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150, sortable: true },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100, sortable: true },
  { prop: 'tag', label: 'Tag' }
]

const clearSort = () => tableRef.value?.clearSort()
</${_S}>`

const jsClearSort = toJs(tsClearSort)

</script>

## Sort

Set the column `sortable` property to `true` to enable sorting.

<DemoBlock title="Sort" :ts-code="tsSort" :js-code="jsSort">
  <yh-table :data="sortFilterData" :columns="sortFilterColumns" border />
</DemoBlock>

## Filter

Set the column `filterable` property to `true` and provide `filters` options to enable filtering.

<DemoBlock title="Filter" :ts-code="tsFilter" :js-code="jsFilter">
  <yh-table :data="sortFilterData" :columns="sortFilterColumnsOnly" border />
</DemoBlock>

## Custom Sort

Use the `sortMethod` property to customize sort logic.

<DemoBlock title="Custom Sort" :ts-code="tsCustomSort" :js-code="jsCustomSort">
  <yh-table :data="sortFilterData" :columns="customSortFilterColumns" border />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">Name column sorted by character length</p>
</DemoBlock>

## Multi-Column Sort

Set `sort-config.multiple` to `true` to enable multi-column sorting.

<DemoBlock title="Multi-Column Sort" :ts-code="tsMultiSort" :js-code="jsMultiSort">
  <yh-table 
    :data="sortFilterData" 
    :columns="multiSortFilterColumns" 
    :sort-config="{ multiple: true }"
    border
  />
</DemoBlock>

## Clear Sort

Use the table instance's `clearSort` method to clear sort state.

<DemoBlock title="Clear Sort" :ts-code="tsClearSort" :js-code="jsClearSort">
  <yh-button size="small" @click="handleClearSort" style="margin-bottom: 16px">Clear Sort</yh-button>
  <yh-table 
    ref="sortFilterTableRef"
    :data="sortFilterData" 
    :columns="sortFilterColumns" 
    border
  />
</DemoBlock>
