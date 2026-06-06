# Table

A high-performance enterprise table component combining vxe-table, Element Plus, Naive UI, and Ant Design. Supports virtual scrolling, tree data, fixed columns/rows, summary rows and more.

<script setup lang="ts">
import { ref } from 'vue'

// --- 1. Basic Table Data ---
const basicData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Zhujiang New Town, Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Tech Park, Nanshan, Shenzhen' }
])
const basicColumns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]

// --- 2. Status Table ---
const statusData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing', state: 'success' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai', state: 'warning' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Tianhe, Guangzhou', state: 'danger' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Nanshan, Shenzhen', state: 'info' }
])
const statusRowClassName = ({ row }: { row: Record<string, string> }) => {
  if (row.state === 'success') return 'success-row'
  if (row.state === 'warning') return 'warning-row'
  if (row.state === 'danger') return 'danger-row'
  return ''
}

// --- 3. Overflow Tooltip ---
const overflowData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, SOHO Modern City Tower A, Rm 1001, Chaoyang, Beijing - This is a very long address for testing text overflow' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Intl Finance Tower 28F, Pudong, Shanghai - This is also a very long address' }
])
const overflowColumns = [
  { prop: 'date', label: 'Date', width: 120 },
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'address', label: 'Address', showOverflowTooltip: true }
]

// --- 4. Fixed Header ---
const heightData = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    name: ['John', 'Jane', 'Mike'][i % 3],
    address: 'Office Rd ' + (i + 1) + ''
  }))
)

// --- 5. Fixed Columns ---
const fixedColumns = [
  { prop: 'date', label: 'Date', width: 150, fixed: 'left' },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'province', label: 'Province', width: 120 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'address', label: 'Address', width: 300 },
  { prop: 'zip', label: 'Zip', width: 120, fixed: 'right' }
]
const fixedData = ref([
  { id: 1, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd, Chaoyang, Beijing', zip: '100000' },
  { id: 2, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Financial Center, Pudong, Shanghai', zip: '200000' },
  { id: 3, date: '2024-01-03', name: 'Mike', province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town, Tianhe, Guangzhou', zip: '510000' },
  { id: 4, date: '2024-01-04', name: 'Sarah', province: 'Guangdong', city: 'Nanshan', address: 'Tech Park, Nanshan, Shenzhen', zip: '518000' }
])

// --- 6. Other States ---
const tableSize = ref('default')
const highlightCurrentRowKey = ref<number>()
const handleCurrentChange = (val: Record<string, unknown>) => console.log(val)
const customIndexMethod = (index: number) => (index + 1) * 10

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
const _ST = 'style'

// --- Code Examples ---
const tsBasic = `<${_T}>
  <yh-table :data="tableData" :columns="columns" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Zhujiang New Town, Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Tech Park, Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsBasic = toJs(tsBasic);

const tsStripe = `<${_T}>
  <yh-table :data="tableData" :columns="columns" stripe />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Zhujiang New Town, Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Tech Park, Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsStripe = toJs(tsStripe);

const tsBorder = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Zhujiang New Town, Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Tech Park, Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsBorder = toJs(tsBorder);

const tsStatus = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :row-class-name="rowClassName" 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing', state: 'success' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai', state: 'warning' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Tianhe, Guangzhou', state: 'danger' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Nanshan, Shenzhen', state: 'info' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]

const rowClassName = ({ row }: { row: Record<string, unknown> }) => {
  if (row.state === 'success') return 'success-row'
  if (row.state === 'warning') return 'warning-row'
  if (row.state === 'danger') return 'danger-row'
  return ''
}
</${_S}>

<${_ST}>
.success-row td { background-color: #f0f9eb !important; }
.warning-row td { background-color: #fdf6ec !important; }
.danger-row td { background-color: #fef0f0 !important; }
</${_ST}>`

const jsStatus = toJs(tsStatus);

const tsOverflow = `<${_T}>
  <yh-table :data="tableData" :columns="columns" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, SOHO Modern City Tower A, Rm 1001, Chaoyang, Beijing - This is a very long address for testing text overflow' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Intl Finance Tower 28F, Pudong, Shanghai - This is also a very long address' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 120 },
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'address', label: 'Address', showOverflowTooltip: true }
]
</${_S}>`

const jsOverflow = toJs(tsOverflow);

const tsHeight = `<${_T}>
  <yh-table :data="tableData" :columns="columns" height="300" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    date: \`2024-01-\${String(i + 1).padStart(2, '0')}\`,
    name: ['John', 'Jane', 'Mike'][i % 3],
    address: 'Office Rd ' + (i + 1) + ''
  }))
)

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsHeight = toJs(tsHeight);

const tsFixed = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd', zip: '100000' },
  { id: 2, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Financial Center', zip: '200000' },
  { id: 3, date: '2024-01-03', name: 'Mike', province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town', zip: '510000' },
  { id: 4, date: '2024-01-04', name: 'Sarah', province: 'Guangdong', city: 'Nanshan', address: 'Tech Park', zip: '518000' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150, fixed: 'left' },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'province', label: 'Province', width: 120 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'address', label: 'Address', width: 300 },
  { prop: 'zip', label: 'Zip', width: 120, fixed: 'right' }
]
</${_S}>`

const jsFixed = toJs(tsFixed);

const tsSize = `<${_T}>
  <yh-radio-group v-model="tableSize" style="margin-bottom: 16px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>
  <yh-table :data="tableData" :columns="columns" :size="tableSize" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableSize = ref('default')

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Zhujiang New Town, Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Tech Park, Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsSize = toJs(tsSize);

const tsHighlight = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    highlight-current-row
    v-model:current-row-key="currentRowKey"
    @current-change="handleCurrentChange"
  />
  <div style="margin-top: 12px">Current row ID: {{ currentRowKey || 'None' }}</div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const currentRowKey = ref<number>()

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Zhujiang New Town, Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Tech Park, Nanshan, Shenzhen' }
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

const handleCurrentChange = (row: RowItem) => {
  console.log('Current row:', row)
}
</${_S}>`

const jsHighlight = toJs(tsHighlight);

const tsIndex = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    show-index 
    :index-config="{ method: indexMethod }" 
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const indexMethod = (index: number) => (index + 1) * 10

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Lujiazui Financial Center, Pudong, Shanghai' },
  { id: 3, date: '2024-01-03', name: 'Mike', address: 'Zhujiang New Town, Tianhe, Guangzhou' },
  { id: 4, date: '2024-01-04', name: 'Sarah', address: 'Tech Park, Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsIndex = toJs(tsIndex);

</script>

## Basic Table

The most basic table display usage.

<DemoBlock title="Basic Table" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-table :data="basicData" :columns="basicColumns" />
</DemoBlock>

## Striped Table

Use the `stripe` property.

<DemoBlock title="Striped Table" :ts-code="tsStripe" :js-code="jsStripe">
  <yh-table :data="basicData" :columns="basicColumns" stripe />
</DemoBlock>

## Bordered Table

Use the `border` property.

<DemoBlock title="Bordered Table" :ts-code="tsBorder" :js-code="jsBorder">
  <yh-table :data="basicData" :columns="basicColumns" border />
</DemoBlock>

## Status Table

Add custom class names via `row-class-name`.

<DemoBlock title="Status Table" :ts-code="tsStatus" :js-code="jsStatus">
  <yh-table 
    :data="statusData" 
    :columns="basicColumns" 
    :row-class-name="statusRowClassName" 
  />
</DemoBlock>

<style>
.success-row td { background-color: #f0f9eb !important; }
.warning-row td { background-color: #fdf6ec !important; }
.danger-row td { background-color: #fef0f0 !important; }
</style>

## Overflow Tooltip

Set the column `showOverflowTooltip` property.

<DemoBlock title="Overflow Tooltip" :ts-code="tsOverflow" :js-code="jsOverflow">
  <yh-table :data="overflowData" :columns="overflowColumns" />
</DemoBlock>

## Fixed Header

Set the `height` property.

<DemoBlock title="Fixed Header" :ts-code="tsHeight" :js-code="jsHeight">
  <yh-table :data="heightData" :columns="basicColumns" height="300" border />
</DemoBlock>

## Fixed Columns

Set the column `fixed` property.

<DemoBlock title="Fixed Columns" :ts-code="tsFixed" :js-code="jsFixed">
  <yh-table :data="fixedData" :columns="fixedColumns" border />
</DemoBlock>

## Different Sizes

Available sizes: `large`, `default`, `small`.

<DemoBlock title="Different Sizes" :ts-code="tsSize" :js-code="jsSize">
  <yh-radio-group v-model="tableSize" style="margin-bottom: 16px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>
  <yh-table :data="basicData" :columns="basicColumns" :size="tableSize" border />
</DemoBlock>

## Highlight Current Row

Use the `highlight-current-row` property.

<DemoBlock title="Highlight Current Row" :ts-code="tsHighlight" :js-code="jsHighlight">
  <yh-table 
    :data="basicData" 
    :columns="basicColumns" 
    highlight-current-row
    v-model:current-row-key="highlightCurrentRowKey"
    @current-change="handleCurrentChange"
  />
  <div style="margin-top: 12px">Current row ID: {{ highlightCurrentRowKey || 'None' }}</div>
</DemoBlock>

## Custom Index

Use `show-index` to show the index column.

<DemoBlock title="Custom Index" :ts-code="tsIndex" :js-code="jsIndex">
  <yh-table 
    :data="basicData" 
    :columns="basicColumns" 
    show-index 
    :index-config="{ method: customIndexMethod }" 
    border
  />
</DemoBlock>
