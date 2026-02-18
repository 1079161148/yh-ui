# Table - Merge & Summary

The Table component supports row/column merging and displaying summary rows.

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// --- 1. Merge Data ---
const tableSpanData = ref([
  { id: 1, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd' },
  { id: 2, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Haidian', address: 'Zhongguancun St' },
  { id: 3, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Pudong', address: 'Lujiazui' },
  { id: 4, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Jing\'an', address: 'Nanjing West Rd' },
  { id: 5, date: '2024-01-03', name: 'Mike', province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town' }
])

const tableSpanColumns = [
  { prop: 'date', label: 'Date', width: 120 },
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'province', label: 'Province', width: 100 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'address', label: 'Address' }
]

interface SpanMethodParams {
  rowIndex: number
  columnIndex: number
}

const handleSpanMethod = ({ rowIndex, columnIndex }: SpanMethodParams) => {
  if (columnIndex === 0 || columnIndex === 1) {
    if (rowIndex === 0 || rowIndex === 2) {
      return { rowspan: 2, colspan: 1 }
    } else if (rowIndex === 1 || rowIndex === 3) {
      return { rowspan: 0, colspan: 0 }
    }
  }
}

// --- 2. Summary Data ---
const tableSummaryData = ref([
  { id: 1, name: 'John', amount1: 1000, amount2: 500 },
  { id: 2, name: 'Jane', amount1: 2000, amount2: 800 }
])

const tableSummaryColumns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'amount1', label: 'Amount 1', width: 150 },
  { prop: 'amount2', label: 'Amount 2', width: 150 }
]

interface SummaryColumn {
  prop?: string
}

interface SummaryParams {
  columns: SummaryColumn[]
  data: Record<string, unknown>[]
}

const handleSummaryMethod = ({ columns, data }: SummaryParams) => {
  return columns.map((col, index) => {
    if (index === 0) return 'Total'
    const prop = col.prop
    if (prop && prop.startsWith('amount')) {
      const sum = data.reduce((total, row) => total + (Number(row[prop]) || 0), 0)
      return `¥${sum.toFixed(2)}`
    }
    return ''
  })
}

// --- 3. Merge Header Data ---
const mergedHeaderData = ref([
  { id: 1, name: 'John', age: 28, province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd', zip: '100020' },
  { id: 2, name: 'Jane', age: 32, province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Ring Rd', zip: '200120' },
  { id: 3, name: 'Mike', age: 25, province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town', zip: '510623' },
  { id: 4, name: 'Sarah', age: 30, province: 'Zhejiang', city: 'Xihu', address: 'Wensan Rd', zip: '310012' }
])

const mergedHeaderColumns = [
  {
    label: 'Basic Info',
    children: [
      { prop: 'name', label: 'Name', width: 100 },
      { prop: 'age', label: 'Age', width: 80 }
    ]
  },
  {
    label: 'Address Info',
    children: [
      { prop: 'province', label: 'Province', width: 100 },
      { prop: 'city', label: 'City', width: 120 },
      { prop: 'address', label: 'Detail Address' },
      { prop: 'zip', label: 'Zip', width: 100 }
    ]
  }
]

// --- 4. Permission Management Table (Row Merge Case Study) ---
interface PermissionRow {
  id: number
  module: string
  feature: string
  type: string
  permissions: string[]
}

const permissionData = ref<PermissionRow[]>([
  { id: 1, module: 'Account Management', feature: 'User Management', type: 'View', permissions: ['User List'] },
  { id: 2, module: 'Account Management', feature: 'User Management', type: 'Edit', permissions: ['User List', 'Add User'] },
  { id: 3, module: 'Account Management', feature: 'User Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify'] },
  { id: 4, module: 'Account Management', feature: 'Role Management', type: 'View', permissions: ['Role List'] },
  { id: 5, module: 'Account Management', feature: 'Role Management', type: 'Edit', permissions: ['Role List', 'Add Role'] },
  { id: 6, module: 'Account Management', feature: 'Role Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify'] },
  { id: 7, module: 'Content Management', feature: 'Article Management', type: 'View', permissions: ['Article List'] },
  { id: 8, module: 'Content Management', feature: 'Article Management', type: 'Edit', permissions: ['Article List', 'Add Article'] },
  { id: 9, module: 'Content Management', feature: 'Article Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify', 'Publish'] },
  { id: 10, module: 'Content Management', feature: 'Category Management', type: 'View', permissions: ['Category List'] },
  { id: 11, module: 'Content Management', feature: 'Category Management', type: 'Edit', permissions: ['Category List', 'Add Category'] },
  { id: 12, module: 'Content Management', feature: 'Category Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify'] }
])

// Selection state: key = "rowId-permission", value = boolean
const checkedMap = ref<Record<string, boolean>>({})
const checkedTypeMap = ref<Record<string, boolean>>({})

const togglePermission = (rowId: number, permission: string) => {
  const key = `${rowId}-${permission}`
  checkedMap.value[key] = !checkedMap.value[key]
}

const toggleType = (rowId: number) => {
  const key = `type-${rowId}`
  const newVal = !checkedTypeMap.value[key]
  checkedTypeMap.value[key] = newVal
  // Linkage: sync all row permissions when checking/unchecking permission type
  const row = permissionData.value.find(r => r.id === rowId)
  if (row) {
    row.permissions.forEach(p => {
      checkedMap.value[`${rowId}-${p}`] = newVal
    })
  }
}

const toggleFeature = (feature: string) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  const allChecked = rows.every(r => checkedTypeMap.value[`type-${r.id}`])
  rows.forEach(r => {
    checkedTypeMap.value[`type-${r.id}`] = !allChecked
    r.permissions.forEach(p => {
      checkedMap.value[`${r.id}-${p}`] = !allChecked
    })
  })
}

const toggleModule = (module: string) => {
  const rows = permissionData.value.filter(r => r.module === module)
  const allChecked = rows.every(r => checkedTypeMap.value[`type-${r.id}`])
  rows.forEach(r => {
    checkedTypeMap.value[`type-${r.id}`] = !allChecked
    r.permissions.forEach(p => {
      checkedMap.value[`${r.id}-${p}`] = !allChecked
    })
  })
}

const isModuleChecked = (module: string) => {
  const rows = permissionData.value.filter(r => r.module === module)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[`type-${r.id}`])
}

const isFeatureChecked = (feature: string) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[`type-${r.id}`])
}

const permissionColumns = [
  {
    prop: 'module',
    label: 'Module',
    width: 180,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display: flex; align-items: center; gap: 8px; cursor: pointer;' }, [
        h('input', {
          type: 'checkbox',
          checked: isModuleChecked(row.module),
          onChange: () => toggleModule(row.module)
        }),
        h('span', row.module)
      ])
    }
  },
  {
    prop: 'feature',
    label: 'Feature',
    width: 180,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display: flex; align-items: center; gap: 8px; cursor: pointer;' }, [
        h('input', {
          type: 'checkbox',
          checked: isFeatureChecked(row.feature),
          onChange: () => toggleFeature(row.feature)
        }),
        h('span', row.feature)
      ])
    }
  },
  {
    prop: 'type',
    label: 'Type',
    width: 150,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display: flex; align-items: center; gap: 8px; cursor: pointer;' }, [
        h('input', {
          type: 'checkbox',
          checked: !!checkedTypeMap.value[`type-${row.id}`],
          onChange: () => toggleType(row.id)
        }),
        h('span', row.type)
      ])
    }
  },
  {
    prop: 'permissions',
    label: 'Permissions',
    render: ({ row }: { row: PermissionRow }) => {
      return h('div', { style: 'display: flex; flex-wrap: wrap; gap: 16px;' },
        row.permissions.map(p =>
          h('label', { style: 'display: flex; align-items: center; gap: 4px; cursor: pointer;' }, [
            h('input', {
              type: 'checkbox',
              checked: !!checkedMap.value[`${row.id}-${p}`],
              onChange: () => togglePermission(row.id, p)
            }),
            h('span', p)
          ])
        )
      )
    }
  }
]

interface PermSpanParams {
  row: PermissionRow
  rowIndex: number
  columnIndex: number
}

const handlePermissionSpan = ({ row, rowIndex, columnIndex }: PermSpanParams) => {
  const data = permissionData.value
  if (columnIndex === 0) {
    if (rowIndex === 0 || data[rowIndex - 1].module !== row.module) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].module === row.module; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    if (rowIndex === 0 || data[rowIndex - 1].feature !== row.feature) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].feature === row.feature; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
}

const checkedSummary = computed(() => {
  const result: string[] = []
  permissionData.value.forEach(row => {
    row.permissions.forEach(p => {
      if (checkedMap.value[`${row.id}-${p}`]) {
        result.push(`${row.feature}-${row.type}-${p}`)
      }
    })
  })
  return result
})

// --- Example Code ---

const tsSpan = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :span-method="spanMethod"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd' },
  { id: 2, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Haidian', address: 'Zhongguancun St' },
  { id: 3, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Pudong', address: 'Lujiazui' },
  { id: 4, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Jing\\'an', address: 'Nanjing West Rd' },
  { id: 5, date: '2024-01-03', name: 'Mike', province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 120 },
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'province', label: 'Province', width: 100 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'address', label: 'Address' }
]

const spanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 0 || columnIndex === 1) {
    if (rowIndex === 0 || rowIndex === 2) {
      return { rowspan: 2, colspan: 1 }
    } else if (rowIndex === 1 || rowIndex === 3) {
      return { rowspan: 0, colspan: 0 }
    }
  }
}
</${_S}>`

const jsSpan = toJs(tsSpan)

const tsMergedHeader = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: 'John', age: 28, province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd', zip: '100020' },
  { id: 2, name: 'Jane', age: 32, province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Ring Rd', zip: '200120' },
  { id: 3, name: 'Mike', age: 25, province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town', zip: '510623' },
  { id: 4, name: 'Sarah', age: 30, province: 'Zhejiang', city: 'Xihu', address: 'Wensan Rd', zip: '310012' }
])

const columns = [
  {
    label: 'Basic Info',
    children: [
      { prop: 'name', label: 'Name', width: 100 },
      { prop: 'age', label: 'Age', width: 80 }
    ]
  },
  {
    label: 'Address Info',
    children: [
      { prop: 'province', label: 'Province', width: 100 },
      { prop: 'city', label: 'City', width: 120 },
      { prop: 'address', label: 'Detail Address' },
      { prop: 'zip', label: 'Zip', width: 100 }
    ]
  }
]
</${_S}>`

const jsMergedHeader = toJs(tsMergedHeader)

const tsSummary = `<${_T}>
  <yh-table 
    :data="data" 
    :columns="columns"
    :summary-config="{
      text: 'Total',
      method: summaryMethod
    }"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', amount1: 1000, amount2: 500 },
  { id: 2, name: 'Jane', amount1: 2000, amount2: 800 }
])

const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'amount1', label: 'Amount 1', width: 150 },
  { prop: 'amount2', label: 'Amount 2', width: 150 }
]

const summaryMethod = ({ columns, data }) => {
  return columns.map((col, index) => {
    if (index === 0) return 'Total'
    const prop = col.prop
    if (prop && prop.startsWith('amount')) {
      const sum = data.reduce((total, row) => total + (Number(row[prop]) || 0), 0)
      return \`¥\${sum.toFixed(2)}\`
    }
    return ''
  })
}
</${_S}>`

const jsSummary = toJs(tsSummary)

const tsPermission = `<${_T}>
  <yh-table
    :data="permissionData"
    :columns="columns"
    :span-method="spanMethod"
    border
    row-key="id"
  />

  <div v-if="checkedSummary.length" style="margin-top: 16px; padding: 12px 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <p style="margin: 0 0 8px; font-weight: 600;">Selected Permissions ({{ checkedSummary.length }} items):</p>
    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
      <yh-tag v-for="item in checkedSummary" :key="item" size="small">{{ item }}</yh-tag>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed, h } from 'vue'

const permissionData = ref([
  { id: 1, module: 'Account Management', feature: 'User Management', type: 'View', permissions: ['User List'] },
  { id: 2, module: 'Account Management', feature: 'User Management', type: 'Edit', permissions: ['User List', 'Add User'] },
  { id: 3, module: 'Account Management', feature: 'User Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify'] },
  { id: 4, module: 'Account Management', feature: 'Role Management', type: 'View', permissions: ['Role List'] },
  { id: 5, module: 'Account Management', feature: 'Role Management', type: 'Edit', permissions: ['Role List', 'Add Role'] },
  { id: 6, module: 'Account Management', feature: 'Role Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify'] },
  { id: 7, module: 'Content Management', feature: 'Article Management', type: 'View', permissions: ['Article List'] },
  { id: 8, module: 'Content Management', feature: 'Article Management', type: 'Edit', permissions: ['Article List', 'Add Article'] },
  { id: 9, module: 'Content Management', feature: 'Article Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify', 'Publish'] },
  { id: 10, module: 'Content Management', feature: 'Category Management', type: 'View', permissions: ['Category List'] },
  { id: 11, module: 'Content Management', feature: 'Category Management', type: 'Edit', permissions: ['Category List', 'Add Category'] },
  { id: 12, module: 'Content Management', feature: 'Category Management', type: 'Operation', permissions: ['Create', 'Delete', 'Modify'] }
])

const checkedMap = ref({})
const checkedTypeMap = ref({})

const togglePermission = (rowId, permission) => {
  const key = \`\${rowId}-\${permission}\`
  checkedMap.value[key] = !checkedMap.value[key]
}

const toggleType = (rowId) => {
  const key = \`type-\${rowId}\`
  const newVal = !checkedTypeMap.value[key]
  checkedTypeMap.value[key] = newVal
  const row = permissionData.value.find(r => r.id === rowId)
  if (row) {
    row.permissions.forEach(p => { checkedMap.value[\`\${rowId}-\${p}\`] = newVal })
  }
}

const toggleFeature = (feature) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  const allChecked = rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
  rows.forEach(r => {
    checkedTypeMap.value[\`type-\${r.id}\`] = !allChecked
    r.permissions.forEach(p => { checkedMap.value[\`\${r.id}-\${p}\`] = !allChecked })
  })
}

const toggleModule = (module) => {
  const rows = permissionData.value.filter(r => r.module === module)
  const allChecked = rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
  rows.forEach(r => {
    checkedTypeMap.value[\`type-\${r.id}\`] = !allChecked
    r.permissions.forEach(p => { checkedMap.value[\`\${r.id}-\${p}\`] = !allChecked })
  })
}

const isModuleChecked = (module) => {
  const rows = permissionData.value.filter(r => r.module === module)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
}

const isFeatureChecked = (feature) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
}

const columns = [
  {
    prop: 'module',
    label: 'Module',
    width: 180,
    render: ({ row }) => h('label', { style: 'display:flex;align-items:center;gap:8px;cursor:pointer' }, [
      h('input', { type: 'checkbox', checked: isModuleChecked(row.module), onChange: () => toggleModule(row.module) }),
      h('span', row.module)
    ])
  },
  {
    prop: 'feature',
    label: 'Feature',
    width: 180,
    render: ({ row }) => h('label', { style: 'display:flex;align-items:center;gap:8px;cursor:pointer' }, [
      h('input', { type: 'checkbox', checked: isFeatureChecked(row.feature), onChange: () => toggleFeature(row.feature) }),
      h('span', row.feature)
    ])
  },
  {
    prop: 'type',
    label: 'Type',
    width: 150,
    render: ({ row }) => h('label', { style: 'display:flex;align-items:center;gap:8px;cursor:pointer' }, [
      h('input', { type: 'checkbox', checked: !!checkedTypeMap.value[\`type-\${row.id}\`], onChange: () => toggleType(row.id) }),
      h('span', row.type)
    ])
  },
  {
    prop: 'permissions',
    label: 'Permissions',
    render: ({ row }) => h('div', { style: 'display:flex;flex-wrap:wrap;gap:16px' },
      row.permissions.map(p => h('label', { style: 'display:flex;align-items:center;gap:4px;cursor:pointer' }, [
        h('input', { type: 'checkbox', checked: !!checkedMap.value[\`\${row.id}-\${p}\`], onChange: () => togglePermission(row.id, p) }),
        h('span', p)
      ]))
    )
  }
]

const spanMethod = ({ row, rowIndex, columnIndex }) => {
  const data = permissionData.value
  if (columnIndex === 0) {
    if (rowIndex === 0 || data[rowIndex - 1].module !== row.module) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].module === row.module; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    if (rowIndex === 0 || data[rowIndex - 1].feature !== row.feature) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].feature === row.feature; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
}

const checkedSummary = computed(() => {
  const result = []
  permissionData.value.forEach(row => {
    row.permissions.forEach(p => {
      if (checkedMap.value[\`\${row.id}-\${p}\`]) { result.push(\`\${row.feature}-\${row.type}-\${p}\`) }
    })
  })
  return result
})
</${_S}>`

const jsPermission = toJs(tsPermission)

</script>

## Merge Rows or Columns

Implement row or column merging via the `span-method` property.

<DemoBlock title="Merge Rows" :ts-code="tsSpan" :js-code="jsSpan">
  <yh-table 
    :data="tableSpanData" 
    :columns="tableSpanColumns" 
    :span-method="handleSpanMethod"
    border
  />
</DemoBlock>

## Merge Header

Define multi-level headers via the `children` property of `columns`. Set `label` and `children` for parent columns, while leaf children are the actual data columns. The table automatically calculates `colspan` and `rowspan` to generate grouped headers.

<DemoBlock title="Merge Header" :ts-code="tsMergedHeader" :js-code="jsMergedHeader">
  <yh-table
    :data="mergedHeaderData"
    :columns="mergedHeaderColumns"
    border
  />
</DemoBlock>

## Case Study: Permission Management Table

Combine `span-method` row merging with the column `render` function to implement a common **Permission Configuration Matrix**. The Module and Feature columns automatically merge rows with identical values. Selection for types and specific permissions are implemented via checkboxes rendered with `h()`, supporting four-level selection linkage across modules, features, types, and permissions.

<DemoBlock title="Permission Management Table" :ts-code="tsPermission" :js-code="jsPermission">
  <yh-table
    :data="permissionData"
    :columns="permissionColumns"
    :span-method="handlePermissionSpan"
    border
    row-key="id"
  />

  <div v-if="checkedSummary.length" style="margin-top: 16px; padding: 12px 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <p style="margin: 0 0 8px; font-weight: 600;">Selected Permissions ({{ checkedSummary.length }} items):</p>
    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
      <yh-tag v-for="item in checkedSummary" :key="item" size="small">{{ item }}</yh-tag>
    </div>
  </div>
</DemoBlock>

## Summary Footer Row

Configure the summary row via `summary-config` and set `method` for custom summary logic.

<DemoBlock title="Summary Footer Row" :ts-code="tsSummary" :js-code="jsSummary">
  <yh-table 
    :data="tableSummaryData" 
    :columns="tableSummaryColumns"
    :summary-config="{
      text: 'Total',
      method: handleSummaryMethod
    }"
    border
  />
</DemoBlock>

## API

### Multi-level Header (Merge Header)

Implement multi-level headers via the `children` property of column configurations.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| label | Title text of the grouped header | `string` | — |
| children | Child column configurations (supports nested multi-layers) | `TableColumn[]` | — |
| headerAlign | Header alignment | `'left' \| 'center' \| 'right'` | `'center'` (Grouped columns default to center) |
| headerClassName | Custom header class name | `string` | — |
| headerStyle | Custom header style | `CSSProperties` | — |

> **Note**: Parent columns (those with `children`) only need a `label` and do not require a `prop`. `colspan` and `rowspan` are automatically calculated by the component.

### span-method

| Parameter | Description | Type |
| --- | --- | --- |
| row | Current row data | `Record<string, unknown>` |
| column | Current column configuration | `TableColumn` |
| rowIndex | Current row index | `number` |
| columnIndex | Current column index | `number` |

**Return Value**: `{ rowspan: number, colspan: number }` or `[rowspan, colspan]`

- `rowspan: 0, colspan: 0` indicates the cell is merged (not rendered)
- `rowspan: n` means spanning n rows, `colspan: n` means spanning n columns

### SummaryConfig

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| text | Text of the first column in the summary row | `string` | `'Total'` |
| position | Summary row position | `'top' \| 'bottom'` | `'bottom'` |
| fixed | Whether to fix the summary row | `boolean` | `false` |
| method | Summary calculation method | `({ columns, data }) => Array<string \| number \| VNode>` | — |
| className | Summary row class name | `string \| ((params) => string)` | — |
| style | Summary row style | `CSSProperties \| ((params) => CSSProperties)` | — |

### Column render Function

| Parameter | Description | Type |
| --- | --- | --- |
| row | Current row data | `Record<string, unknown>` |
| column | Current column configuration | `TableColumn` |
| rowIndex | Current row index | `number` |
| cellValue | Current cell value | `unknown` |

**Return Value**: `VNode` (Create via Vue `h()` function)
