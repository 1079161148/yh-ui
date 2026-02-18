# Table - Grouped Header

When the data structure is complex, grouped headers can be used to display hierarchical relationships.

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn } from '../../../packages/components/src/table/src/table'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== 1. Basic Grouped Header ====================
const data1 = ref([
  { date: '2024-05-01', name: 'John', province: 'Guangdong', city: 'Shenzhen', address: 'Nanshan', zip: 518000 },
  { date: '2024-05-02', name: 'Jane', province: 'Beijing', city: 'Beijing', address: 'Chaoyang', zip: 100000 },
  { date: '2024-05-03', name: 'Mike', province: 'Shanghai', city: 'Shanghai', address: 'Pudong', zip: 200120 },
  { date: '2024-05-04', name: 'Sarah', province: 'Guangdong', city: 'Guangzhou', address: 'Tianhe', zip: 510000 }
])

const columns1 = [
  { prop: 'date', label: 'Date', width: 120, fixed: 'left' },
  {
    label: 'Delivery Info',
    children: [
      { prop: 'name', label: 'Name', width: 100 },
      {
        label: 'Address',
        children: [
          { prop: 'province', label: 'Province', width: 100 },
          { prop: 'city', label: 'City', width: 100 },
          { prop: 'address', label: 'Detail Address', width: 150 },
          { prop: 'zip', label: 'Zip', width: 100 }
        ]
      }
    ]
  }
]

// ==================== 2. Three or More Levels ====================
const data2 = ref([
  { project: 'Core Engine', devProgress: 88, testProgress: 75, bugCount: 12, quality: 'A' },
  { project: 'UI Framework', devProgress: 95, testProgress: 90, bugCount: 3, quality: 'S' },
  { project: 'Data Center', devProgress: 70, testProgress: 45, bugCount: 25, quality: 'B' }
])

const columns2 = [
  { prop: 'project', label: 'Project Name', width: 120 },
  {
    label: 'R&D Metrics',
    children: [
      {
        label: 'Progress Tracking',
        children: [
          { prop: 'devProgress', label: 'Dev Progress (%)', width: 120 },
          { prop: 'testProgress', label: 'Test Progress (%)', width: 120 }
        ]
      },
      {
        label: 'Quality Assurance',
        children: [
          { prop: 'bugCount', label: 'Bug Count', width: 100 },
          { prop: 'quality', label: 'Quality Level', width: 100 }
        ]
      }
    ]
  }
]

// ==================== 3. Grouped Header + Row/Column Merge ====================
const data3 = ref([
  { category: 'Office Supplies', type: 'Writing Tools', name: 'Pen', price: 5, stock: 100 },
  { category: 'Office Supplies', type: 'Writing Tools', name: 'Ballpoint Pen', price: 2, stock: 200 },
  { category: 'Office Supplies', type: 'Paper', name: 'A4 Paper', price: 25, stock: 50 },
  { category: 'Electronics', type: 'Peripherals', name: 'Mouse', price: 50, stock: 80 },
  { category: 'Electronics', type: 'Peripherals', name: 'Keyboard', price: 120, stock: 30 }
])

const columns3 = [
  {
    label: 'Product Category',
    children: [
      { prop: 'category', label: 'Category', width: 120 },
      { prop: 'type', label: 'Subcategory', width: 120 }
    ]
  },
  {
    label: 'Product Details',
    children: [
      { prop: 'name', label: 'Name', width: 120 },
      { prop: 'price', label: 'Price (USD)', width: 100 },
      { prop: 'stock', label: 'Stock', width: 100 }
    ]
  }
]

const handleSpanMethod3 = ({ rowIndex, columnIndex }: {
  row: Record<string, unknown>
  column: TableColumn
  rowIndex: number
  columnIndex: number
}) => {
  if (columnIndex === 0) {
    if (rowIndex === 0) return { rowspan: 3, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 2 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    if (rowIndex === 0) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
}

// ==================== 4. Collapsible Grouped Header ====================
const isExpanded4 = ref(false)
const data4 = ref([
  { name: 'John', base: 80, bonus: 10, penalty: 2, total: 88 },
  { name: 'Jane', base: 75, bonus: 15, penalty: 5, total: 85 },
  { name: 'Mike', base: 90, bonus: 5, penalty: 0, total: 95 }
])

const columns4 = computed<TableColumn[]>(() => [
  { prop: 'name', label: 'Employee Name', width: 120 },
  {
    label: 'Performance Details',
    prop: 'performance',
    children: [
      { prop: 'total', label: 'Total Score', width: 100 },
      ...(isExpanded4.value ? [
        { prop: 'base', label: 'Base Score', width: 100 },
        { prop: 'bonus', label: 'Bonus Score', width: 100 },
        { prop: 'penalty', label: 'Penalty', width: 100 }
      ] : [])
    ]
  }
])

const toggleExpand4 = () => {
  isExpanded4.value = !isExpanded4.value
}

// ==================== Code Examples ====================
const tsBasicGroup = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { date: '2024-05-01', name: 'John', province: 'Guangdong', city: 'Shenzhen', address: 'Nanshan', zip: 518000 },
  { date: '2024-05-02', name: 'Jane', province: 'Beijing', city: 'Beijing', address: 'Chaoyang', zip: 100000 },
  { date: '2024-05-03', name: 'Mike', province: 'Shanghai', city: 'Shanghai', address: 'Pudong', zip: 200120 },
  { date: '2024-05-04', name: 'Sarah', province: 'Guangdong', city: 'Guangzhou', address: 'Tianhe', zip: 510000 }
])

const columns: TableColumn[] = [
  { prop: 'date', label: 'Date', width: 120, fixed: 'left' },
  {
    label: 'Delivery Info',
    children: [
      { prop: 'name', label: 'Name', width: 100 },
      {
        label: 'Address',
        children: [
          { prop: 'province', label: 'Province', width: 100 },
          { prop: 'city', label: 'City', width: 100 },
          { prop: 'address', label: 'Detail Address', width: 150 },
          { prop: 'zip', label: 'Zip', width: 100 }
        ]
      }
    ]
  }
]
</${_S}>`
const jsBasicGroup = toJs(tsBasicGroup);

const tsMultiLevel = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { project: 'Core Engine', devProgress: 88, testProgress: 75, bugCount: 12, quality: 'A' },
  { project: 'UI Framework', devProgress: 95, testProgress: 90, bugCount: 3, quality: 'S' },
  { project: 'Data Center', devProgress: 70, testProgress: 45, bugCount: 25, quality: 'B' }
])

const columns: TableColumn[] = [
  { prop: 'project', label: 'Project Name', width: 120 },
  {
    label: 'R&D Metrics',
    children: [
      {
        label: 'Progress Tracking',
        children: [
          { prop: 'devProgress', label: 'Dev Progress (%)', width: 120 },
          { prop: 'testProgress', label: 'Test Progress (%)', width: 120 }
        ]
      },
      {
        label: 'Quality Assurance',
        children: [
          { prop: 'bugCount', label: 'Bug Count', width: 100 },
          { prop: 'quality', label: 'Quality Level', width: 100 }
        ]
      }
    ]
  }
]
</${_S}>`
const jsMultiLevel = toJs(tsMultiLevel);

const tsSpanGroup = `<${_T}>
  <yh-table 
    :data="data" 
    :columns="columns" 
    :span-method="spanMethod"
    border 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { category: 'Office Supplies', type: 'Writing Tools', name: 'Pen', price: 5, stock: 100 },
  { category: 'Office Supplies', type: 'Writing Tools', name: 'Ballpoint Pen', price: 2, stock: 200 },
  { category: 'Office Supplies', type: 'Paper', name: 'A4 Paper', price: 25, stock: 50 },
  { category: 'Electronics', type: 'Peripherals', name: 'Mouse', price: 50, stock: 80 },
  { category: 'Electronics', type: 'Peripherals', name: 'Keyboard', price: 120, stock: 30 }
])

const columns: TableColumn[] = [
  {
    label: 'Product Category',
    children: [
      { prop: 'category', label: 'Category', width: 120 },
      { prop: 'type', label: 'Subcategory', width: 120 }
    ]
  },
  {
    label: 'Product Details',
    children: [
      { prop: 'name', label: 'Name', width: 120 },
      { prop: 'price', label: 'Price (USD)', width: 100 },
      { prop: 'stock', label: 'Stock', width: 100 }
    ]
  }
]

const spanMethod = ({ rowIndex, columnIndex }: {
  row: Record<string, unknown>
  column: TableColumn
  rowIndex: number
  columnIndex: number
}) => {
  if (columnIndex === 0) {
    if (rowIndex === 0) return { rowspan: 3, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 2 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    if (rowIndex === 0) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
}
</${_S}>`
const jsSpanGroup = toJs(tsSpanGroup);

const tsDynamicGroup = `<${_T}>
  <div style="margin-bottom: 16px">
     <yh-button type="primary" @click="isExpanded = !isExpanded">
       {{ isExpanded ? 'Collapse Details' : 'Expand Performance Details' }}
     </yh-button>
  </div>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn } from 'yh-ui'

const isExpanded = ref(false)
const data = ref([
  { name: 'John', base: 80, bonus: 10, penalty: 2, total: 88 },
  { name: 'Jane', base: 75, bonus: 15, penalty: 5, total: 85 },
  { name: 'Mike', base: 90, bonus: 5, penalty: 0, total: 95 }
])

const columns = computed<TableColumn[]>(() => [
  { prop: 'name', label: 'Employee Name', width: 120 },
  {
    label: 'Performance Details',
    children: [
      { prop: 'total', label: 'Total Score', width: 100 },
      ...(isExpanded.value ? [
        { prop: 'base', label: 'Base Score', width: 100 },
        { prop: 'bonus', label: 'Bonus Score', width: 100 },
        { prop: 'penalty', label: 'Penalty', width: 100 }
      ] : [])
    ]
  }
])
</${_S}>`
const jsDynamicGroup = toJs(tsDynamicGroup);

</script>

## Basic Grouped Header

Simply add the `children` property in column configuration to easily implement grouped headers. The underlying layer automatically calculates `rowspan` and `colspan` based on data nesting depth.

<DemoBlock title="Basic Grouped Header" :ts-code="tsBasicGroup" :js-code="jsBasicGroup">
  <yh-table :data="data1" :columns="columns1" border />
</DemoBlock>

## Multi-Level Header (3+)

`children` supports unlimited nesting levels for extremely complex header structures. The table uses a high-performance recursive restructuring algorithm internally, ensuring smooth rendering performance even with deep nesting.

<DemoBlock title="Multi-Level Nested Header" :ts-code="tsMultiLevel" :js-code="jsMultiLevel">
  <yh-table :data="data2" :columns="columns2" border />
</DemoBlock>

## Grouped Header with Row/Column Merge

Grouped headers work perfectly with `span-method`. Often used to display categorized data with hierarchical relationships, making reports more readable through header grouping and cell merging.

<DemoBlock title="Grouped Header with Row Merge" :ts-code="tsSpanGroup" :js-code="jsSpanGroup">
  <yh-table :data="data3" :columns="columns3" :span-method="handleSpanMethod3" border />
</DemoBlock>

## Collapsible Grouped Header

Using Vue reactive features and `computed` properties, you can implement dynamically expandable/collapsible grouped headers. This is very useful for reports that need to display many detailed metrics while keeping the interface clean.

<DemoBlock title="Dynamic Expand/Collapse Header" :ts-code="tsDynamicGroup" :js-code="jsDynamicGroup">
  <div style="margin-bottom: 16px">
     <yh-button type="primary" @click="toggleExpand4">
       {{ isExpanded4 ? 'Collapse Details' : 'Expand Performance Details' }}
     </yh-button>
  </div>
  <yh-table :data="data4" :columns="columns4" border />
</DemoBlock>

## API Reference

The following properties are supported in the `TableColumn` interface:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| key | Column unique identifier | `string` | — |
| prop | Column field name | `string` | — |
| label | Column title | `string` | — |
| width | Column width | `number \| string` | — |
| minWidth | Min column width | `number \| string` | — |
| maxWidth | Max column width | `number \| string` | — |
| align | Content alignment | `'left' \| 'center' \| 'right'` | `'left'` |
| headerAlign | Header alignment | `'left' \| 'center' \| 'right'` | — |
| fixed | Fixed column | `'left' \| 'right' \| true` | — |
| sortable | Whether sortable | `boolean \| 'custom'` | `false` |
| resizable | Whether column width is resizable | `boolean` | `true` |
| showOverflowTooltip | Whether to show overflow tooltip | `boolean \| object` | `false` |
| className | Column class name | `string` | — |
| headerClassName | Header class name | `string` | — |
| style | Column style | `CSSProperties` | — |
| headerStyle | Header style | `CSSProperties` | — |
| visible | Whether visible | `boolean` | `true` |
| children | Sub-column configuration (for grouped headers) | `TableColumn[]` | — |
| type | Column type | `'selection' \| 'index' \| 'expand' \| 'radio'` | — |
| render | Custom cell render | `(params) => VNode` | — |
| headerRender | Custom header render | `(params) => VNode` | — |
| indexMethod | Custom method for index column | `(index: number) => number \| string` | — |
| selectable | Checkbox selectable function | `(row, index) => boolean` | — |
| sortBy | Specify sort field | `string \| ((row) => unknown)` | — |
| sortMethod | Custom sort method | `(a, b, order) => number` | — |
| ellipsis | Ellipsis configuration | `boolean \| EllipsisConfig` | `false` |
| formatter | Cell formatter method | `(row, column, cellValue, index) => string \| VNode` | — |

> **Notes:**
> 1. Columns with `children` set will have their `prop` property ignored, as the column only serves as a grouping container.
> 2. The `fixed` property is recommended to be set on the outermost layer (e.g., "Date" column in the example) or the bottom-most data columns; do not repeat the fixed property for middle grouping columns.
