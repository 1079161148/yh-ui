# Table - Dynamic Column Rendering

In many business scenarios, the table's column configuration is not predefined but dynamically generated based on business logic or backend API responses. This chapter demonstrates how to implement flexible dynamic column rendering using reactive APIs.

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TableColumn } from '../../../packages/components/src/table/src/table'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== 1. Basic Dynamic Columns ====================
const dynamicData1 = ref([
  { id: 1, name: 'John', age: 28, city: 'Beijing', hobby: 'Programming' },
  { id: 2, name: 'Jane', age: 24, city: 'Shanghai', hobby: 'Photography' }
])

const dynamicColumns1 = ref<TableColumn[]>([
  { prop: 'name', label: 'Name', width: 120 }
])

const loading1 = ref(false)

const fetchColumns1 = async () => {
  loading1.value = true
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  dynamicColumns1.value = [
    { prop: 'name', label: 'Name', width: 120 },
    { prop: 'age', label: 'Age', width: 100 },
    { prop: 'city', label: 'City', width: 120 },
    { prop: 'hobby', label: 'Hobby' }
  ]
  loading1.value = false
}

// ==================== 2. Mixed Mode (Fixed + Dynamic) ====================
// Fixed columns are typically business primary keys or action items
const fixedPart: TableColumn[] = [
  { type: 'selection', width: 50, fixed: 'left' },
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' }
]

const dynamicPart = ref<TableColumn[]>([])
const mixData = ref([
  { id: 101, title: 'Article A', author: 'Admin', views: 1200, status: 'Published', date: '2024-02-01' },
  { id: 102, title: 'Article B', author: 'Editor', views: 800, status: 'Draft', date: '2024-02-02' }
])

const fetchMixColumns = async () => {
  // Simulate fetching column config from API
  await new Promise(resolve => setTimeout(resolve, 500))
  dynamicPart.value = [
    { prop: 'title', label: 'Title', minWidth: 200 },
    { prop: 'author', label: 'Author', width: 120 },
    { prop: 'views', label: 'Views', width: 100 },
    {
      label: 'Basic Info',
      children: [
        { prop: 'status', label: 'Status', width: 100 },
        { prop: 'date', label: 'Date', width: 120 }
      ]
    }
  ]
}

// ==================== 3. Complex Dynamic Multi-level Headers ====================
const complexData = ref([
  { project: 'YH-UI', q1_val: 100, q1_inc: 10, q2_val: 120, q2_inc: 20 },
  { project: 'VitePress', q1_val: 200, q1_inc: 5, q2_val: 190, q2_inc: -10 }
])
const complexColumns = ref<TableColumn[]>([])

const generateComplexColumns = () => {
  const quarters = ['Q1', 'Q2']
  const dynamicCols: TableColumn[] = quarters.map(q => ({
    label: `${q} Quarter Data`,
    children: [
      { prop: `${q.toLowerCase()}_val`, label: 'Value', width: 100 },
      { prop: `${q.toLowerCase()}_inc`, label: 'Increment', width: 100 }
    ]
  }))
  
  complexColumns.value = [
    { prop: 'project', label: 'Project Name', width: 150, fixed: 'left' },
    ...dynamicCols
  ]
}

onMounted(() => {
  generateComplexColumns()
})

// ==================== 4. Horizontal Dimension Rendering (Pivot) ====================
const pivotData = ref([
  { category: 'East Region', '2024-01': 1200, '2024-02': 1500, '2024-03': 1800 },
  { category: 'North Region', '2024-01': 900, '2024-02': 1100, '2024-03': 1300 }
])
const pivotColumns = ref<TableColumn[]>([
  { prop: 'category', label: 'Region', width: 120, fixed: 'left' }
])

const fetchPivotData = async () => {
  // Simulate backend returning dynamic time dimensions
  await new Promise(resolve => setTimeout(resolve, 600))
  const months = ['2024-01', '2024-02', '2024-03']
  const dynamicCols = months.map(m => ({ prop: m, label: m, width: 120 }))
  pivotColumns.value = [
    { prop: 'category', label: 'Sales Region', width: 120, fixed: 'left' },
    ...dynamicCols
  ]
}

// ==================== 5. Vertical Data Rendering (Transpose) ====================
// Convert a single object's Key-Value pairs into table rows
const rawUser = { id: 'U001', nick: 'Dev Wang', email: 'wang@example.com', level: 'VIP' }
const verticalData = ref([
  { label: 'User ID', value: rawUser.id },
  { label: 'Nickname', value: rawUser.nick },
  { label: 'Contact Email', value: rawUser.email },
  { label: 'Member Level', value: rawUser.level }
])
const verticalColumns: TableColumn[] = [
  { prop: 'label', label: 'Property', width: 150, className: 'is-label-col' },
  { prop: 'value', label: 'Value' }
]

// ==================== Code Examples ====================

// 1. Async Column Fetching Example
const tsFetchExample = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button type="primary" :loading="loading" @click="fetchColumns">
      Fetch Column Config
    </yh-button>
  </div>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { id: 1, name: 'John', age: 28, city: 'Beijing', hobby: 'Programming' },
  { id: 2, name: 'Jane', age: 24, city: 'Shanghai', hobby: 'Photography' }
])

const columns = ref<TableColumn[]>([
  { prop: 'name', label: 'Name', width: 120 }
])

const loading = ref(false)

const fetchColumns = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  columns.value = [
    { prop: 'name', label: 'Name', width: 120 },
    { prop: 'age', label: 'Age', width: 100 },
    { prop: 'city', label: 'City', width: 120 },
    { prop: 'hobby', label: 'Hobby' }
  ]
  loading.value = false
}
</${_S}>`
const jsFetchExample = toJs(tsFetchExample);

// 2. Mixed Mode Example (Fixed + Dynamic)
const tsMixExample = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchColumns">Combined Load</yh-button>
  </div>
  <yh-table :data="data" :columns="[...fixedPart, ...dynamicPart]" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

// Fixed columns
const fixedPart: TableColumn[] = [
  { type: 'selection', width: 50, fixed: 'left' },
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' }
]

// Dynamic column container
const dynamicPart = ref<TableColumn[]>([])

const data = ref([
  { id: 101, title: 'Article A', author: 'Admin', views: 1200, status: 'Published', date: '2024-02-01' },
  { id: 102, title: 'Article B', author: 'Editor', views: 800, status: 'Draft', date: '2024-02-02' }
])

const fetchColumns = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  dynamicPart.value = [
    { prop: 'title', label: 'Title', minWidth: 200 },
    { prop: 'author', label: 'Author', width: 120 },
    { prop: 'views', label: 'Views', width: 100 },
    {
      label: 'Basic Info',
      children: [
        { prop: 'status', label: 'Status', width: 100 },
        { prop: 'date', label: 'Date', width: 120 }
      ]
    }
  ]
}
</${_S}>`
const jsMixExample = toJs(tsMixExample);

// 3. Dynamic Multi-level Header Example
const tsComplexExample = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { project: 'YH-UI', q1_val: 100, q1_inc: 10, q2_val: 120, q2_inc: 20 },
  { project: 'VitePress', q1_val: 200, q1_inc: 5, q2_val: 190, q2_inc: -10 }
])

const columns = ref<TableColumn[]>([])

const generateColumns = () => {
  const quarters = ['Q1', 'Q2']
  const dynamicCols: TableColumn[] = quarters.map(q => ({
    label: \`\${q} Quarter Data\`,
    children: [
      { prop: \`\${q.toLowerCase()}_val\`, label: 'Value', width: 100 },
      { prop: \`\${q.toLowerCase()}_inc\`, label: 'Increment', width: 100 }
    ]
  }))
  
  columns.value = [
    { prop: 'project', label: 'Project Name', width: 150, fixed: 'left' },
    ...dynamicCols
  ]
}

onMounted(generateColumns)
</${_S}>`
const jsComplexExample = toJs(tsComplexExample);

const tsPivotExample = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchPivot">Generate Horizontal Month Columns</yh-button>
  </div>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const columns = ref<TableColumn[]>([
  { prop: 'category', label: 'Region', width: 120, fixed: 'left' }
])

const data = ref([
  { category: 'East Region', '2024-01': 1200, '2024-02': 1500, '2024-03': 1800 },
  { category: 'North Region', '2024-01': 900, '2024-02': 1100, '2024-03': 1300 }
])

const fetchPivot = async () => {
  const months = ['2024-01', '2024-02', '2024-03']
  const dynamicCols = months.map(m => ({ prop: m, label: m, width: 120 }))
  columns.value = [
    { prop: 'category', label: 'Sales Region', width: 120, fixed: 'left' },
    ...dynamicCols
  ]
}
</${_S}>`
const jsPivotExample = toJs(tsPivotExample);

// 5. Vertical Rendering Example
const tsVerticalExample = `<${_T}>
  <yh-table :data="data" :columns="columns" border :show-header="false" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

// Source data is typically a single object
const rawUser = { id: 'U001', nick: 'Dev Wang', email: 'wang@example.com', level: 'VIP' }

// Convert to vertical list
const data = ref([
  { label: 'User ID', value: rawUser.id },
  { label: 'Nickname', value: rawUser.nick },
  { label: 'Contact Email', value: rawUser.email },
  { label: 'Member Level', value: rawUser.level }
])

const columns: TableColumn[] = [
  { prop: 'label', width: 150, className: 'is-label-col' },
  { prop: 'value' }
]
</${_S}>`
const jsVerticalExample = toJs(tsVerticalExample);

</script>

## Async Column Fetching

The most common scenario is entering a page, first calling an API to get the user's personalized column configuration, then rendering the table.

<DemoBlock title="Async Column Config Loading" :ts-code="tsFetchExample" :js-code="jsFetchExample">
  <div style="margin-bottom: 16px">
    <yh-button type="primary" :loading="loading1" @click="fetchColumns1">
      Fetch Column Config
    </yh-button>
  </div>
  <yh-table :data="dynamicData1" :columns="dynamicColumns1" border />
</DemoBlock>

## Mixed Mode (Fixed + Dynamic)

In complex admin systems, "selection checkbox", "ID", and "action column" are typically hardcoded as fixed columns on the frontend, while the middle business data columns are dynamically arranged based on API responses.

<DemoBlock title="Fixed Columns + Dynamic Multi-level Headers" :ts-code="tsMixExample" :js-code="jsMixExample">
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchMixColumns">Combined Load</yh-button>
  </div>
  <yh-table 
    :data="mixData" 
    :columns="[...fixedPart, ...dynamicPart]" 
    border 
  />
</DemoBlock>

## Dynamic Grouped Header

Sometimes we need to dynamically generate complex nested headers on the frontend based on structured data (e.g., years, quarter lists) returned from the backend.

<DemoBlock title="Loop-Generated Nested Headers" :ts-code="tsComplexExample" :js-code="jsComplexExample">
  <yh-table :data="complexData" :columns="complexColumns" border />
</DemoBlock>

## Horizontal Dimension Rendering (Pivot)

Horizontal rendering is typically used to display "timelines" or "dynamic attributes". The backend returns a series of dimensions (e.g., date lists), and the frontend dynamically generates columns based on these dimensions, paired with corresponding dynamic keys in data objects.

<DemoBlock title="Horizontal Time Dimension Rendering" :ts-code="tsPivotExample" :js-code="jsPivotExample">
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchPivotData">Generate Horizontal Columns</yh-button>
  </div>
  <yh-table :data="pivotData" :columns="pivotColumns" border />
</DemoBlock>

## Vertical Data Rendering (Transpose)

Vertical rendering is primarily used to display detailed information for a single record. By converting an object's `Key-Value` pairs into a table's `Row-Column` structure, you can achieve a "detail card" effect within a table layout.

<DemoBlock title="Vertical Property View" :ts-code="tsVerticalExample" :js-code="jsVerticalExample">
  <yh-table :data="verticalData" :columns="verticalColumns" border :show-header="false" />
</DemoBlock>

## Best Practices

1. **Skeleton Screen**: During async column config fetching, it is recommended to use a skeleton screen as placeholder to avoid table structure jumping.
2. **Key Management**: When dynamically changing the `columns` array, if you encounter rendering not updating, try binding a `key` generated based on column config to `yh-table`.
3. **Fixed Column Conflicts**: Ensure the `fixed` property in dynamically generated columns has consistent order logic with hardcoded fixed columns on the frontend, avoiding fixed columns being sandwiched in the middle.
