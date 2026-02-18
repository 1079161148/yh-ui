# Table - Custom Templates

The Table component supports custom column content and headers.

<script setup lang="ts">
import { ref, h } from 'vue'
import { YhTag, YhButton } from '@yh-ui/components'

// --- 1. Custom Column Data ---
const customData = ref([
  { id: 1, date: '2024-01-01', name: 'John', status: 'success', tag: 'Home', amount: 1000 },
  { id: 2, date: '2024-01-02', name: 'Jane', status: 'warning', tag: 'Company', amount: 2500 },
  { id: 3, date: '2024-01-03', name: 'Mike', status: 'danger', tag: 'School', amount: 800 },
  { id: 4, date: '2024-01-04', name: 'Sarah', status: 'info', tag: 'Home', amount: 3200 }
])

const customColumns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'status', label: 'Status' },
  { prop: 'tag', label: 'Tag' }
]

const customActionColumns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'actions', label: 'Actions', width: 200 }
]

interface CustomRowData {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const customFormatColumns = [
  { prop: 'name', label: 'Name', width: 120 },
  { 
    prop: 'amount', 
    label: 'Amount',
    formatter: (row: CustomRowData) => `¥${row.amount.toFixed(2)}`
  }
]

const customRenderColumns = [
  { prop: 'name', label: 'Name', width: 120 },
  { 
    prop: 'status', 
    label: 'Status',
    render: ({ row }: { row: CustomRowData }) => {
      if (!row) return ''
      return h(YhTag, { type: row.status, size: 'small' }, () => row.status)
    }
  }
]

const handleCustomEdit = (row: CustomRowData) => alert(`Edit: ${row.name}`)
const handleCustomDelete = (row: CustomRowData) => alert(`Delete: ${row.name}`)

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

const tsCustomColumn = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border>
    <${_T} #status="{ row }">
      <yh-tag v-if="row" :type="row.status" size="small">{{ row.status }}</yh-tag>
    </${_T}>
    <${_T} #tag="{ row }">
      <yh-tag v-if="row" size="small" effect="plain">{{ row.tag }}</yh-tag>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', status: 'success', tag: 'Home', amount: 1000 },
  { id: 2, date: '2024-01-02', name: 'Jane', status: 'warning', tag: 'Company', amount: 2500 },
  { id: 3, date: '2024-01-03', name: 'Mike', status: 'danger', tag: 'School', amount: 800 },
  { id: 4, date: '2024-01-04', name: 'Sarah', status: 'info', tag: 'Home', amount: 3200 }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'status', label: 'Status' },
  { prop: 'tag', label: 'Tag' }
]
</${_S}>`

const jsCustomColumn = toJs(tsCustomColumn)

const tsCustomHeader = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border>
    <${_T} #header-name>
      <span style="color: var(--yh-color-primary); font-weight: bold">👤 Name</span>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', status: 'success', tag: 'Home', amount: 1000 },
  { id: 2, date: '2024-01-02', name: 'Jane', status: 'warning', tag: 'Company', amount: 2500 },
  { id: 3, date: '2024-01-03', name: 'Mike', status: 'danger', tag: 'School', amount: 800 },
  { id: 4, date: '2024-01-04', name: 'Sarah', status: 'info', tag: 'Home', amount: 3200 }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'status', label: 'Status' },
  { prop: 'tag', label: 'Tag' }
]
</${_S}>`

const jsCustomHeader = toJs(tsCustomHeader)

const tsActions = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border>
    <${_T} #actions="{ row }">
      <yh-button type="primary" size="small" @click="handleEdit(row)">Edit</yh-button>
      <yh-button type="danger" size="small" @click="handleDelete(row)" style="margin-left: 8px">Delete</yh-button>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', status: 'success', tag: 'Home', amount: 1000 },
  { id: 2, date: '2024-01-02', name: 'Jane', status: 'warning', tag: 'Company', amount: 2500 },
  { id: 3, date: '2024-01-03', name: 'Mike', status: 'danger', tag: 'School', amount: 800 },
  { id: 4, date: '2024-01-04', name: 'Sarah', status: 'info', tag: 'Home', amount: 3200 }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'actions', label: 'Actions', width: 200 }
]

interface RowItem {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const handleEdit = (row: RowItem) => alert('Edit: ' + row.name)
const handleDelete = (row: RowItem) => alert('Delete: ' + row.name)
</${_S}>`

const jsActions = toJs(tsActions)

const tsFormatter = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface RowItem {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', status: 'success', tag: 'Home', amount: 1000 },
  { id: 2, date: '2024-01-02', name: 'Jane', status: 'warning', tag: 'Company', amount: 2500 },
  { id: 3, date: '2024-01-03', name: 'Mike', status: 'danger', tag: 'School', amount: 800 },
  { id: 4, date: '2024-01-04', name: 'Sarah', status: 'info', tag: 'Home', amount: 3200 }
])

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { 
    prop: 'amount', 
    label: 'Amount',
    formatter: (row: RowItem) => '¥' + row.amount.toFixed(2)
  }
]
</${_S}>`

const jsFormatter = toJs(tsFormatter)

const tsRender = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { h, ref } from 'vue'
import { YhTag } from '@yh-ui/components'

interface RowItem {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', status: 'success', tag: 'Home', amount: 1000 },
  { id: 2, date: '2024-01-02', name: 'Jane', status: 'warning', tag: 'Company', amount: 2500 },
  { id: 3, date: '2024-01-03', name: 'Mike', status: 'danger', tag: 'School', amount: 800 },
  { id: 4, date: '2024-01-04', name: 'Sarah', status: 'info', tag: 'Home', amount: 3200 }
])

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { 
    prop: 'status', 
    label: 'Status',
    render: ({ row }: { row: RowItem }) => h(YhTag, { type: row.status, size: 'small' }, () => row.status)
  }
]
</${_S}>`

const jsRender = toJs(tsRender)

</script>

## Custom Column Template

Customize column rendering content through slots, where the slot name is the column's `prop` value.

<DemoBlock title="Custom Column Template" :ts-code="tsCustomColumn" :js-code="jsCustomColumn">
  <yh-table :data="customData" :columns="customColumns" border>
    <template #status="{ row }">
      <yh-tag v-if="row" :type="row.status" size="small">{{ row.status }}</yh-tag>
    </template>
    
    <template #tag="{ row }">
      <yh-tag v-if="row" size="small" effect="plain">{{ row.tag }}</yh-tag>
    </template>
  </yh-table>
</DemoBlock>

## Custom Header

Customize header content through the `header-[prop]` slot.

<DemoBlock title="Custom Header" :ts-code="tsCustomHeader" :js-code="jsCustomHeader">
  <yh-table :data="customData" :columns="customColumns" border>
    <template #header-name>
      <span style="color: var(--yh-color-primary); font-weight: bold">
        👤 Name
      </span>
    </template>
  </yh-table>
</DemoBlock>

## Action Column

Add action button columns for edit, delete, and other operations.

<DemoBlock title="Action Column" :ts-code="tsActions" :js-code="jsActions">
  <yh-table :data="customData" :columns="customActionColumns" border>
    <template #actions="{ row }">
      <yh-button v-if="row" type="primary" size="small" @click="handleCustomEdit(row)">
        Edit
      </yh-button>
      <yh-button v-if="row" type="danger" size="small" @click="handleCustomDelete(row)" style="margin-left: 8px">
        Delete
      </yh-button>
    </template>
  </yh-table>
</DemoBlock>

## Formatted Display

Format cell content through the column's `formatter` function.

<DemoBlock title="Formatted Display" :ts-code="tsFormatter" :js-code="jsFormatter">
  <yh-table :data="customData" :columns="customFormatColumns" border />
</DemoBlock>

## Render Function

Render custom content through the column's `render` function using JSX/h function.

<DemoBlock title="Render Function" :ts-code="tsRender" :js-code="jsRender">
  <yh-table :data="customData" :columns="customRenderColumns" border />
</DemoBlock>
