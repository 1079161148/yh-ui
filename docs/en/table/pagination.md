# Table Pagination

Table pagination feature, supporting client-side pagination (automatic slicing) and server-side pagination (remote request).

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// --- 1. Client-Side Pagination ---
const frontData = ref(
  Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 30),
    address: `Some City, Street ${i + 1}`
  }))
)
const pagination1 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 45,
  background: true
})
const handlePageChange1 = ({ currentPage, pageSize }) => {
  pagination1.value.currentPage = currentPage
  pagination1.value.pageSize = pageSize
}

// --- 2. Server-Side Pagination ---
const backData = ref([])
const loading = ref(false)
const pagination2 = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
  remote: true,
  background: true,
  layout: 'total, prev, pager, next, jumper'
})

// Simulate API Request
const fetchData = async (page: number, size: number) => {
  loading.value = true
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const total = 100 // Simulate total count
  const data = Array.from({ length: size }, (_, i) => ({
    id: (page - 1) * size + i + 1,
    name: `Remote User ${(page - 1) * size + i + 1}`,
    age: 18 + Math.floor(Math.random() * 40),
    address: `Remote Street ${Math.floor(Math.random() * 1000)}`
  }))
  
  backData.value = data
  pagination2.value.total = total
  loading.value = false
}

const handlePageChange2 = ({ currentPage, pageSize }) => {
  pagination2.value.currentPage = currentPage
  pagination2.value.pageSize = pageSize
  fetchData(currentPage, pageSize)
}

onMounted(() => {
  fetchData(pagination2.value.currentPage, pagination2.value.pageSize)
})

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 150 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'address', label: 'Address' }
]

// --- Code Utility ---
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

const _T = 'template'
const _S = 'script'

// --- Code Examples ---
const tsFront = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :pagination="pagination"
    @page-change="handlePageChange"
    border 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref(
  Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    age: 20 + (i % 30),
    address: \`Some City, Street \${i + 1}\`
  }))
)

// Client-Side Pagination: Pass full data, remote defaults to false
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 45,
  align: 'center', // Center align
  background: true
})

const handlePageChange = ({ currentPage, pageSize }) => {
  pagination.value.currentPage = currentPage
  pagination.value.pageSize = pageSize
}

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 150 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsFront = toJs(tsFront)

const tsBack = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :pagination="pagination"
    :loading="loading"
    @page-change="handlePageChange"
    border 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const tableData = ref([])
const loading = ref(false)

// Server-Side Pagination: set remote: true
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
  remote: true,
  align: 'right', // Right align
  background: true,
  layout: 'total, prev, pager, next, jumper'
})

// Simulate API Request
const fetchData = async (page: number, size: number) => {
  loading.value = true
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const total = 100 // Simulate total count
  const data = Array.from({ length: size }, (_, i) => ({
    id: (page - 1) * size + i + 1,
    name: \`Remote User \${(page - 1) * size + i + 1}\`,
    age: 18 + Math.floor(Math.random() * 40),
    address: \`Remote Street \${Math.floor(Math.random() * 1000)}\`
  }))
  
  tableData.value = data
  pagination.value.total = total
  loading.value = false
}

const handlePageChange = ({ currentPage, pageSize }) => {
  pagination.value.currentPage = currentPage
  pagination.value.pageSize = pageSize
  fetchData(currentPage, pageSize)
}

onMounted(() => {
  fetchData(pagination.value.currentPage, pagination.value.pageSize)
})

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 150 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsBack = toJs(tsBack)

</script>

## Client-Side Pagination

Pass **full data** to the table, which automatically slices and renders based on the pagination component state. Suitable for scenarios with small data volume (e.g., thousands of records).

<DemoBlock title="Client-Side Pagination" :ts-code="tsFront" :js-code="jsFront">
  <yh-table 
    :data="frontData" 
    :columns="columns" 
    :pagination="pagination1"
    @page-change="handlePageChange1"
    border 
  />
</DemoBlock>

## Server-Side Pagination

Set `pagination.remote` to `true` to disable automatic slicing. Users need to listen to the `page-change` event, manually call the API to fetch data and update `:data`.

<DemoBlock title="Server-Side Pagination (Remote Request)" :ts-code="tsBack" :js-code="jsBack">
  <yh-table 
    :data="backData" 
    :columns="columns" 
    :pagination="pagination2"
    :loading="loading"
    @page-change="handlePageChange2"
    border 
  />
</DemoBlock>

## API Reference

### PaginationConfig

Pagination configuration options:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| currentPage | Current page number | `number` | `1` |
| pageSize | Number of items per page | `number` | `10` |
| total | Total number of items | `number` | `0` |
| pageSizes | Items per page options | `number[]` | `[10, 20, 50, 100]` |
| layout | Pagination layout | `string` | `'total, sizes, prev, pager, next, jumper'` |
| remote | **Whether remote pagination** | `boolean` | `false` |
| align | **Alignment** | `'left' \| 'center' \| 'right'` | `'left'` |
| background | Show background | `boolean` | `false` |
| small | Use small pagination | `boolean` | `false` |
| hideOnSinglePage | Hide on single page | `boolean` | `false` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| page-change | Triggered when pagination parameters change | `(params: { currentPage: number, pageSize: number }) => void` |
