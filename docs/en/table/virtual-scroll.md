# Table - Virtual Scroll

In scenarios with large data volumes, virtual scrolling technology only renders rows within the visible area, significantly improving table performance.

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== 1. Vertical Virtual Scroll ====================

const bigData = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 18 + (i % 50),
    email: `user${i + 1}@example.com`,
    address: `City ${(i % 100) + 1} · Street No. ${(i % 200) + 1}`,
    date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
  }))
)

const bigColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'email', label: 'Email', width: 220 },
  { prop: 'address', label: 'Address' },
  { prop: 'date', label: 'Date', width: 120 }
]

// ==================== 2. Custom Row Height ====================

const rowHeightData = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    content: i % 3 === 0
      ? 'This is a long piece of content used to test different row height scenarios.'
      : i % 3 === 1
        ? 'Short content'
        : 'This is a medium length Content Description.',
    status: ['In Progress', 'Completed', 'Pending Review'][i % 3]
  }))
)

const rowHeightColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'content', label: 'Content' },
  { prop: 'status', label: 'Status', width: 100 }
]

// ==================== 3. Frozen Columns + Virtual Scroll ====================

const fixedVirtualData = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    dept: ['Engineering', 'Product', 'Design', 'Operations', 'Marketing'][i % 5],
    position: ['Engineer', 'Manager', 'Designer', 'Operations', 'Marketing'][i % 5],
    salary: 8000 + (i % 20) * 1000,
    city: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou'][i % 5],
    phone: `138${String(i).padStart(8, '0')}`,
    action: ''
  }))
)

const fixedVirtualColumns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: 'Name', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'phone', label: 'Phone', width: 150 },
  {
    prop: 'action',
    label: 'Actions',
    width: 120,
    fixed: 'right' as const,
    render: () => h('a', { style: 'color: var(--yh-color-primary, #409eff); cursor: pointer;' }, 'View')
  }
]

// ==================== 4. Sort & Filter + Virtual Scroll ====================

const sortFilterVirtualData = ref(
  Array.from({ length: 8000 }, (_, i) => ({
    id: i + 1,
    name: `Staff ${i + 1}`,
    age: 20 + (i % 40),
    dept: ['Engineering', 'Product', 'Design', 'Operations'][i % 4],
    score: Math.round(60 + Math.random() * 40)
  }))
)

const sortFilterVirtualColumns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100, sortable: true },
  {
    prop: 'dept',
    label: 'Department',
    width: 130,
    filterable: true,
    filters: [
      { text: 'Engineering', value: 'Engineering' },
      { text: 'Product', value: 'Product' },
      { text: 'Design', value: 'Design' },
      { text: 'Operations', value: 'Operations' }
    ]
  },
  { prop: 'score', label: 'Rating', sortable: true }
]

// ==================== 5. Group Header + Virtual Scroll ====================

const groupHeaderVirtualData = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 40),
    province: ['Beijing', 'Shanghai', 'Guangdong', 'Zhejiang', 'Jiangsu'][i % 5],
    city: ['Chaoyang', 'Pudong', 'Tianhe', 'Xihu', 'Gulou District'][i % 5],
    address: `Street No. ${(i % 100) + 1}`,
    zip: `${100000 + i}`
  }))
)

const groupHeaderVirtualColumns = [
  {
    label: 'Basic Info',
    children: [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'name', label: 'Name', width: 120 },
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

// ==================== 6. Million-Level Data ====================

const millionLoading = ref(false)
const millionData = ref<Record<string, unknown>[]>([])
const millionCount = ref(0)

const generateMillionData = () => {
  millionLoading.value = true
  setTimeout(() => {
    const count = 1000000
    const arr = new Array(count)
    for (let i = 0; i < count; i++) {
      arr[i] = {
        id: i + 1,
        col1: `Data ${i + 1}-A`,
        col2: `Data ${i + 1}-B`,
        col3: Math.round(Math.random() * 10000),
        col4: ['Normal', 'Warning', 'Abnormal'][i % 3]
      }
    }
    millionData.value = arr
    millionCount.value = count
    millionLoading.value = false
  }, 100)
}

const millionColumns = [
  { prop: 'id', label: 'ID', width: 100 },
  { prop: 'col1', label: 'Column A', width: 160 },
  { prop: 'col2', label: 'Column B', width: 160 },
  { prop: 'col3', label: 'Value', width: 120 },
  { prop: 'col4', label: 'Status' }
]

// ==================== Code Examples ====================

const tsBasicVirtual = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399;">Total: {{ data.length.toLocaleString() }} records</p>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    age: 18 + (i % 50),
    email: \`user\${i + 1}@example.com\`,
    address: \`City \${(i % 100) + 1} · Street No. \${(i % 200) + 1}\`,
    date: \`2024-\${String((i % 12) + 1).padStart(2, '0')}-\${String((i % 28) + 1).padStart(2, '0')}\`
  }))
)

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'email', label: 'Email', width: 220 },
  { prop: 'address', label: 'Address' },
  { prop: 'date', label: 'Date', width: 120 }
]
</${_S}>`

const jsBasicVirtual = toJs(tsBasicVirtual)

const tsRowHeight = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 60 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    content: i % 3 === 0
      ? 'This is a long piece of content used to test different row height scenarios.'
      : i % 3 === 1 ? 'Short content' : 'This is a medium length Content Description.',
    status: ['In Progress', 'Completed', 'Pending Review'][i % 3]
  }))
)

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'content', label: 'Content' },
  { prop: 'status', label: 'Status', width: 100 }
]
</${_S}>`

const jsRowHeight = toJs(tsRowHeight)

const tsFixedVirtual = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const data = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    dept: ['Engineering', 'Product', 'Design', 'Operations', 'Marketing'][i % 5],
    position: ['Engineer', 'Manager', 'Designer', 'Operations', 'Marketing'][i % 5],
    salary: 8000 + (i % 20) * 1000,
    city: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou'][i % 5],
    phone: \`138\${String(i).padStart(8, '0')}\`,
    action: ''
  }))
)

interface ColumnType {
  prop: string
  label: string
  width?: number
  fixed?: 'left' | 'right'
  render?: () => ReturnType<typeof h>
}

const columns: ColumnType[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: 'Name', width: 120, fixed: 'left' },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'phone', label: 'Phone', width: 150 },
  {
    prop: 'action',
    label: 'Actions',
    width: 120,
    fixed: 'right',
    render: () => h('a', { style: 'color: var(--yh-color-primary, #409eff); cursor: pointer;' }, 'View')
  }
]
</${_S}>`

const jsFixedVirtual = toJs(tsFixedVirtual)

const tsSortFilterVirtual = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399;">Total: {{ data.length.toLocaleString() }} records (Supports sorting and filtering)</p>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 8000 }, (_, i) => ({
    id: i + 1,
    name: \`Staff \${i + 1}\`,
    age: 20 + (i % 40),
    dept: ['Engineering', 'Product', 'Design', 'Operations'][i % 4],
    score: Math.round(60 + Math.random() * 40)
  }))
)

const columns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100, sortable: true },
  {
    prop: 'dept',
    label: 'Department',
    width: 130,
    filterable: true,
    filters: [
      { text: 'Engineering', value: 'Engineering' },
      { text: 'Product', value: 'Product' },
      { text: 'Design', value: 'Design' },
      { text: 'Operations', value: 'Operations' }
    ]
  },
  { prop: 'score', label: 'Rating', sortable: true }
]
</${_S}>`

const jsSortFilterVirtual = toJs(tsSortFilterVirtual)

const tsGroupVirtual = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    age: 20 + (i % 40),
    province: ['Beijing', 'Shanghai', 'Guangdong', 'Zhejiang', 'Jiangsu'][i % 5],
    city: ['Chaoyang', 'Pudong', 'Tianhe', 'Xihu', 'Gulou District'][i % 5],
    address: \`Street No. \${(i % 100) + 1}\`,
    zip: \`\${100000 + i}\`
  }))
)

const columns = [
  {
    label: 'Basic Info',
    children: [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'name', label: 'Name', width: 120 },
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

const jsGroupVirtual = toJs(tsGroupVirtual)

const tsMillionVirtual = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
    <yh-button type="primary" @click="generate" :loading="loading">
      Generate 1 Million Rows
    </yh-button>
    <span v-if="count > 0" style="color: #67c23a; font-weight: 600;">
      ✓ Loaded {{ count.toLocaleString() }} records
    </span>
  </div>
  <yh-table
    v-if="data.length > 0"
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 44, buffer: 10 }"
    height="400px"
    border
    row-key="id"
  />
  <div v-else style="padding: 40px; text-align: center; color: #909399; border: 1px dashed #dcdfe6; border-radius: 8px;">
    Click the button to generate million-level data for virtual scroll testing
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const data = ref<Record<string, unknown>[]>([])
const count = ref(0)

const generate = () => {
  loading.value = true
  setTimeout(() => {
    const total = 1000000
    const arr = new Array(total)
    for (let i = 0; i < total; i++) {
      arr[i] = {
        id: i + 1,
        col1: \`Data \${i + 1}-A\`,
        col2: \`Data \${i + 1}-B\`,
        col3: Math.round(Math.random() * 10000),
        col4: ['Normal', 'Warning', 'Abnormal'][i % 3]
      }
    }
    data.value = arr
    count.value = total
    loading.value = false
  }, 100)
}

const columns = [
  { prop: 'id', label: 'ID', width: 100 },
  { prop: 'col1', label: 'Column A', width: 160 },
  { prop: 'col2', label: 'Column B', width: 160 },
  { prop: 'col3', label: 'Value', width: 120 },
  { prop: 'col4', label: 'Status' }
]
</${_S}>`

const jsMillionVirtual = toJs(tsMillionVirtual)
</script>

## Vertical Virtual Scroll

Set `virtual-config` with `enabled: true` to enable virtual scroll, together with `height` to fix the table height. It automatically takes effect when data exceeds 100 records.

<DemoBlock title="Vertical Virtual Scroll (10,000 records)" :ts-code="tsBasicVirtual" :js-code="jsBasicVirtual">
  <p style="margin-bottom: 12px; color: #909399;">Total: {{ bigData.length.toLocaleString() }} records</p>
  <yh-table
    :data="bigData"
    :columns="bigColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## Custom Row Height

Set `virtual-config.rowHeight` to set the row height for virtual scroll, ensuring accurate scrollbar calculation. Supports fixed number or function (dynamic row height).

<DemoBlock title="Custom Row Height" :ts-code="tsRowHeight" :js-code="jsRowHeight">
  <yh-table
    :data="rowHeightData"
    :columns="rowHeightColumns"
    :virtual-config="{ enabled: true, rowHeight: 60 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## Frozen Columns + Virtual Scroll

Virtual scroll can work together with fixed columns (`fixed`), ensuring key columns on both sides are always visible.

<DemoBlock title="Fixed Columns + Virtual Scroll" :ts-code="tsFixedVirtual" :js-code="jsFixedVirtual">
  <yh-table
    :data="fixedVirtualData"
    :columns="fixedVirtualColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## Sort & Filter

Virtual scroll is fully compatible with sorting and filtering. Sorting and filtering are done in memory, virtual scroll is only responsible for rendering optimization.

<DemoBlock title="Sort + Filter + Virtual Scroll" :ts-code="tsSortFilterVirtual" :js-code="jsSortFilterVirtual">
  <p style="margin-bottom: 12px; color: #909399;">Total: {{ sortFilterVirtualData.length.toLocaleString() }} records (Supports sorting and filtering)</p>
  <yh-table
    :data="sortFilterVirtualData"
    :columns="sortFilterVirtualColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## With Grouped Header

Virtual scroll can work with multi-level headers (`children`) to support large data rendering with grouped headers.

<DemoBlock title="Group Header + Virtual Scroll" :ts-code="tsGroupVirtual" :js-code="jsGroupVirtual">
  <yh-table
    :data="groupHeaderVirtualData"
    :columns="groupHeaderVirtualColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## Million-Row Data

With virtual scroll, even million-level data volume can maintain smooth scrolling experience.

<DemoBlock title="Million-Level Data" :ts-code="tsMillionVirtual" :js-code="jsMillionVirtual">
  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
    <yh-button type="primary" @click="generateMillionData" :loading="millionLoading">
      Generate 1 Million Rows
    </yh-button>
    <span v-if="millionCount > 0" style="color: #67c23a; font-weight: 600;">
      ✓ Loaded {{ millionCount.toLocaleString() }} records
    </span>
  </div>
  <yh-table
    v-if="millionData.length > 0"
    :data="millionData"
    :columns="millionColumns"
    :virtual-config="{ enabled: true, rowHeight: 44, buffer: 10 }"
    height="400px"
    border
    row-key="id"
  />
  <div v-else style="padding: 40px; text-align: center; color: #909399; border: 1px dashed #dcdfe6; border-radius: 8px;">
    Click the button to generate million-level data for virtual scroll testing
  </div>
</DemoBlock>

## API

### VirtualConfig

Passed through `virtual-config` property.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| enabled | Enable virtual scroll | `boolean` | `false` |
| rowHeight | Row height (fixed or function) | `number \| ((row, rowIndex) => number)` | `48` |
| buffer | Buffer rows (extra rows rendered above/below) | `number` | `5` |
| overscan | Overscan rows | `number` | `3` |
| columnVirtual | Enable column virtualization | `boolean` | `false` |
| columnBuffer | Column buffer count | `number` | `3` |

### Methods (Called via ref)

| Method | Description | Parameters |
| --- | --- | --- |
| scrollTo | Scroll to position | `({ top?, left?, row?, rowIndex? })` |
| refresh | Refresh virtual scroll (call after data changes) | — |
| doLayout | Recalculate table layout | — |

### Notes

1. **Must set `height`**: Virtual scroll requires a fixed container height to calculate the visible area.
2. **Must set `row-key`**: Virtual scroll relies on unique row identifiers for rendering tracking.
3. **`rowHeight` must be accurate**: Virtual scroll calculates scroll position and visible range based on row height; inaccurate settings may cause scrollbar jumping.
4. **Data volume threshold**: Virtual rendering is only enabled when data exceeds 100 records by default; normal rendering when less than 100.
5. **Compatibility**: Virtual scroll is fully compatible with sorting, filtering, fixed columns, grouped headers, and other features.
