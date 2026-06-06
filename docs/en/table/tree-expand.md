# Table - Tree Data & Expand Row

The Table component supports tree data display and expand row functionality.

<script setup lang="ts">
import { ref } from 'vue'

// --- 1. Tree Data ---
const tableTreeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: 'Level 1 Dept A',
    address: 'Beijing HQ',
    children: [
      { id: 11, date: '2024-01-02', name: 'Level 2 Dept A-1', address: 'Chaoyang, Beijing' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: 'Level 2 Dept A-2', 
        address: 'Haidian District, Beijing',
        children: [
          { id: 121, date: '2024-01-04', name: 'Level 3 Dept A-2-1', address: 'Zhongguancun' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: 'Level 1 Dept B',
    address: 'Shanghai HQ',
    children: [
      { id: 21, date: '2024-01-07', name: 'Level 2 Dept B-1', address: 'Pudong, Shanghai' }
    ]
  }
])

const tableTreeColumns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Department Name', width: 200, treeNode: true },
  { prop: 'address', label: 'Address' }
]

// --- 2. Expand Row Data ---
const tableExpandData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing', description: 'Details for John, containing more descriptive content...' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai', description: 'Details for Jane, containing more descriptive content...' }
])

const tableExpandColumns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]

// --- 3. Selection ---
const selectedTreeDataRows = ref<Record<string, unknown>[]>([])
const handleTreeDataSelectionChange = (rows: Record<string, unknown>[]) => {
  selectedTreeDataRows.value = rows
}

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

// --- Label Helper Variables (Prevent Template Parsing) ---
const _T = 'template'
const _S = 'script'

// --- Example Code ---

const tsTree = `<${_T}>
  <yh-table 
    :data="treeData" 
    :columns="columns"
    :tree-config="{ childrenKey: 'children' }"
    row-key="id"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: 'Level 1 Dept A',
    address: 'Beijing HQ',
    children: [
      { id: 11, date: '2024-01-02', name: 'Level 2 Dept A-1', address: 'Chaoyang, Beijing' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: 'Level 2 Dept A-2', 
        address: 'Haidian District, Beijing',
        children: [
          { id: 121, date: '2024-01-04', name: 'Level 3 Dept A-2-1', address: 'Zhongguancun' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: 'Level 1 Dept B',
    address: 'Shanghai HQ',
    children: [
      { id: 21, date: '2024-01-07', name: 'Level 2 Dept B-1', address: 'Pudong, Shanghai' }
    ]
  }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Department Name', width: 200, treeNode: true },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsTree = toJs(tsTree)

const tsTreeExpandAll = `<${_T}>
  <yh-table 
    :data="treeData" 
    :columns="columns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    row-key="id"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: 'Level 1 Dept A',
    address: 'Beijing HQ',
    children: [
      { id: 11, date: '2024-01-02', name: 'Level 2 Dept A-1', address: 'Chaoyang, Beijing' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: 'Level 2 Dept A-2', 
        address: 'Haidian District, Beijing',
        children: [
          { id: 121, date: '2024-01-04', name: 'Level 3 Dept A-2-1', address: 'Zhongguancun' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: 'Level 1 Dept B',
    address: 'Shanghai HQ',
    children: [
      { id: 21, date: '2024-01-07', name: 'Level 2 Dept B-1', address: 'Pudong, Shanghai' }
    ]
  }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Department Name', width: 200, treeNode: true },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsTreeExpandAll = toJs(tsTreeExpandAll)

const tsExpand = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns"
    :expand-config="{ showIcon: true }"
    row-key="id"
    border
  >
    <${_T} #expand="{ row }">
      <div style="padding: 20px; background: var(--yh-fill-color-lighter)">
        <p style="margin: 0"><strong>Detailed Description:</strong></p>
        <p style="margin: 8px 0 0; color: var(--yh-text-color-secondary)">{{ row.description }}</p>
      </div>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', address: 'Chaoyang, Beijing', description: 'Details for John, containing more descriptive content...' },
  { id: 2, date: '2024-01-02', name: 'Jane', address: 'Pudong, Shanghai', description: 'Details for Jane, containing more descriptive content...' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsExpand = toJs(tsExpand)

const tsSelectableTree = `<${_T}>
  <yh-table 
    :data="treeData" 
    :columns="columns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleSelectionChange"
    row-key="id"
    border
  />
  <div style="margin-top: 12px; color: var(--yh-text-color-secondary)">
    Selected: {{ selectedRows.map(row => row.name).join(', ') || 'None' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const selectedRows = ref<RowItem[]>([])
const handleSelectionChange = (rows: RowItem[]) => {
  selectedRows.value = rows
}

const treeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: 'Level 1 Dept A',
    address: 'Beijing HQ',
    children: [
      { id: 11, date: '2024-01-02', name: 'Level 2 Dept A-1', address: 'Chaoyang, Beijing' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: 'Level 2 Dept A-2', 
        address: 'Haidian District, Beijing',
        children: [
          { id: 121, date: '2024-01-04', name: 'Level 3 Dept A-2-1', address: 'Zhongguancun' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: 'Level 1 Dept B',
    address: 'Shanghai HQ',
    children: [
      { id: 21, date: '2024-01-07', name: 'Level 2 Dept B-1', address: 'Pudong, Shanghai' }
    ]
  }
])

const columns = [
  { prop: 'date', label: 'Date', width: 150 },
  { prop: 'name', label: 'Department Name', width: 200, treeNode: true },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsSelectableTree = toJs(tsSelectableTree)

</script>

## Tree Data

Configure tree data through `tree-config`, and set `treeNode: true` on the column to specify which column displays the expand icon.

<DemoBlock title="Tree Data" :ts-code="tsTree" :js-code="jsTree">
  <yh-table 
    :data="tableTreeData" 
    :columns="tableTreeColumns"
    :tree-config="{ childrenKey: 'children' }"
    row-key="id"
    border
  />
</DemoBlock>

## Default Expand All

Set `tree-config.expandAll` to `true` to expand all nodes by default.

<DemoBlock title="Expand All By Default" :ts-code="tsTreeExpandAll" :js-code="jsTreeExpandAll">
  <yh-table 
    :data="tableTreeData" 
    :columns="tableTreeColumns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    row-key="id"
    border
  />
</DemoBlock>

## Expandable Rows

Implement expand row functionality through `expand-config` and `expand` slot.

<DemoBlock title="Expand Row" :ts-code="tsExpand" :js-code="jsExpand">
  <yh-table 
    :data="tableExpandData" 
    :columns="tableExpandColumns"
    :expand-config="{ showIcon: true }"
    row-key="id"
    border
  >
    <template #expand="{ row }">
      <div style="padding: 20px; background: var(--yh-fill-color-lighter)">
        <p style="margin: 0"><strong>Detailed Description:</strong></p>
        <p style="margin: 8px 0 0; color: var(--yh-text-color-secondary)">{{ row.description }}</p>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## Selectable Tree Data

Tree data can be combined with selection functionality.

<DemoBlock title="Selectable Tree Data" :ts-code="tsSelectableTree" :js-code="jsSelectableTree">
  <yh-table 
    :data="tableTreeData" 
    :columns="tableTreeColumns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleTreeDataSelectionChange"
    row-key="id"
    border
  />
  <div style="margin-top: 12px; color: var(--yh-text-color-secondary)">
    Selected: {{ selectedTreeDataRows.map(row => row.name).join(', ') || 'None' }}
  </div>
</DemoBlock>
