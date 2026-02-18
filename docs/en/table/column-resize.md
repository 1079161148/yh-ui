# Table - Column Width Resize

Enable column width drag-to-resize through the `resizable` property. Users can drag the column header edge to change column width.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== 1. Drag Mode ====================

const resizeData = ref([
  { id: 1, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd' },
  { id: 2, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Financial Center' },
  { id: 3, date: '2024-01-03', name: 'Mike', province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town' },
  { id: 4, date: '2024-01-04', name: 'Sarah', province: 'Zhejiang', city: 'Xihu', address: 'Wensan Road' },
  { id: 5, date: '2024-01-05', name: 'Tom', province: 'Jiangsu', city: 'Gulou', address: 'Zhongshan North Rd' }
])

const resizeColumns = [
  { prop: 'date', label: 'Date', width: 120 },
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'province', label: 'Province', width: 100 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'address', label: 'Address' }
]

const handleColumnResize = (column: { prop?: string; label?: string }, width: number) => {
  console.log(`Column "${column.label}" resized to: ${width}px`)
}

// ==================== 2. Grouped Headers ====================

const groupResizeData = ref([
  { id: 1, name: 'John', age: 28, province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd', zip: '100020' },
  { id: 2, name: 'Jane', age: 32, province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Loop', zip: '200120' },
  { id: 3, name: 'Mike', age: 25, province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town', zip: '510623' },
  { id: 4, name: 'Sarah', age: 30, province: 'Zhejiang', city: 'Xihu', address: 'Wensan Road', zip: '310012' }
])

const groupResizeColumns = [
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
      { prop: 'address', label: 'Address' },
      { prop: 'zip', label: 'Zip', width: 100 }
    ]
  }
]

// ==================== 3. Frozen Columns + Resize ====================

const fixedResizeData = ref([
  { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000, city: 'Beijing', phone: '13800001111' },
  { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000, city: 'Shanghai', phone: '13800002222' },
  { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000, city: 'Guangzhou', phone: '13800003333' },
  { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000, city: 'Shenzhen', phone: '13800004444' }
])

const fixedResizeColumns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: 'Name', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position', width: 150 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'phone', label: 'Phone', width: 150, fixed: 'right' as const }
]

// ==================== 4. Min Column Width Limit ====================

const minWidthData = ref([
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin', desc: 'System super admin with all permissions' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'Editor', desc: 'Content editor, responsible for article review and publishing' },
  { id: 3, name: 'Mike', email: 'mike@example.com', role: 'Viewer', desc: 'Read-only permission, can only view data' }
])

const minWidthColumns = [
  { prop: 'id', label: 'ID', width: 80, minWidth: 60 },
  { prop: 'name', label: 'Name', width: 120, minWidth: 80 },
  { prop: 'email', label: 'Email', width: 200, minWidth: 150 },
  { prop: 'role', label: 'Role', width: 120, minWidth: 80 },
  { prop: 'desc', label: 'Description', minWidth: 120 }
]

// ==================== 5. Per-Column Config ====================

const perColumnData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', position: 'Frontend Engineer' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', position: 'Product Manager' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', position: 'UI Designer' },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations', position: 'Operations Director' }
])

const perColumnColumns = [
  { prop: 'id', label: 'ID', width: 80, resizable: false },
  { prop: 'name', label: 'Name', width: 120, resizable: true },
  { prop: 'age', label: 'Age', width: 80, resizable: false },
  { prop: 'dept', label: 'Department', width: 120, resizable: true },
  { prop: 'position', label: 'Position', resizable: true }
]

// ==================== 6. Event Listening ====================

const eventResizeData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design' }
])

const eventResizeColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department' }
]

const resizeLog = ref<string[]>([])

const handleResizeEvent = (column: { label?: string }, width: number) => {
  resizeLog.value.unshift(`[Width Changed] ${column.label}: ${Math.round(width)}px`)
  if (resizeLog.value.length > 6) resizeLog.value.pop()
}

// ==================== Code Examples ====================

const tsBasicResize = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    resizable
    border
    @column-resize="handleResize"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, date: '2024-01-01', name: 'John', province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd' },
  { id: 2, date: '2024-01-02', name: 'Jane', province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Financial Center' },
  { id: 3, date: '2024-01-03', name: 'Mike', province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town' },
  { id: 4, date: '2024-01-04', name: 'Sarah', province: 'Zhejiang', city: 'Xihu', address: 'Wensan Road' },
  { id: 5, date: '2024-01-05', name: 'Tom', province: 'Jiangsu', city: 'Gulou', address: 'Zhongshan North Rd' }
])

const columns = [
  { prop: 'date', label: 'Date', width: 120 },
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'province', label: 'Province', width: 100 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'address', label: 'Address' }
]

interface ColumnType {
  prop?: string
  label?: string
}

const handleResize = (column: ColumnType, width: number) => {
  console.log(\`Column "\${column.label}" resized to: \${width}px\`)
}
</${_S}>`

const jsBasicResize = toJs(tsBasicResize);

const tsGroupResize = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    resizable
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd', zip: '100020' },
  { id: 2, name: 'Jane', age: 32, province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Loop', zip: '200120' },
  { id: 3, name: 'Mike', age: 25, province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town', zip: '510623' },
  { id: 4, name: 'Sarah', age: 30, province: 'Zhejiang', city: 'Xihu', address: 'Wensan Road', zip: '310012' }
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
      { prop: 'address', label: 'Address' },
      { prop: 'zip', label: 'Zip', width: 100 }
    ]
  }
]
</${_S}>`

const jsGroupResize = toJs(tsGroupResize);

const tsFixedResize = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    resizable
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface ColumnType {
  prop: string
  label: string
  width?: number
  fixed?: 'left' | 'right'
}

const data = ref([
  { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000, city: 'Beijing', phone: '13800001111' },
  { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000, city: 'Shanghai', phone: '13800002222' },
  { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000, city: 'Guangzhou', phone: '13800003333' },
  { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000, city: 'Shenzhen', phone: '13800004444' }
])

const columns: ColumnType[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: 'Name', width: 120, fixed: 'left' },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position', width: 150 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'phone', label: 'Phone', width: 150, fixed: 'right' }
]
</${_S}>`

const jsFixedResize = toJs(tsFixedResize);

const tsMinWidth = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Hint: ID min 60px, Name min 80px, Email min 150px, Role min 80px, Description min 120px
  </p>
  <yh-table
    :data="data"
    :columns="columns"
    resizable
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin', desc: 'System super admin with all permissions' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'Editor', desc: 'Content editor, responsible for article review and publishing' },
  { id: 3, name: 'Mike', email: 'mike@example.com', role: 'Viewer', desc: 'Read-only permission, can only view data' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80, minWidth: 60 },
  { prop: 'name', label: 'Name', width: 120, minWidth: 80 },
  { prop: 'email', label: 'Email', width: 200, minWidth: 150 },
  { prop: 'role', label: 'Role', width: 120, minWidth: 80 },
  { prop: 'desc', label: 'Description', minWidth: 120 }
]
</${_S}>`

const jsMinWidth = toJs(tsMinWidth);

const tsPerColumn = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Hint: "ID" and "Age" columns are not resizable (resizable: false)
  </p>
  <yh-table
    :data="data"
    :columns="columns"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', position: 'Frontend Engineer' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', position: 'Product Manager' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', position: 'UI Designer' },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations', position: 'Operations Director' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80, resizable: false },
  { prop: 'name', label: 'Name', width: 120, resizable: true },
  { prop: 'age', label: 'Age', width: 80, resizable: false },
  { prop: 'dept', label: 'Department', width: 120, resizable: true },
  { prop: 'position', label: 'Position', resizable: true }
]
</${_S}>`

const jsPerColumn = toJs(tsPerColumn);

const tsEventResize = `<${_T}>
  <div style="display: flex; gap: 24px;">
    <div style="flex: 1;">
      <yh-table
        :data="data"
        :columns="columns"
        resizable
        border
        @column-resize="handleResize"
      />
    </div>
    <div style="width: 260px; padding: 12px; background: #f5f7fa; border-radius: 8px;">
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Column Width Change Log:</p>
      <div v-for="(log, idx) in resizeLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: #fff; border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="resizeLog.length === 0" style="color: #c0c4cc; font-size: 12px;">Drag column edge to see log</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department' }
]

const resizeLog = ref<string[]>([])

interface ColumnType {
  label?: string
}

const handleResize = (column: ColumnType, width: number) => {
  resizeLog.value.unshift(\`[Width Changed] \${column.label}: \${Math.round(width)}px\`)
  if (resizeLog.value.length > 6) resizeLog.value.pop()
}
</${_S}>`

const jsEventResize = toJs(tsEventResize);
</script>

## Drag Mode

Set the `resizable` property to `true` to enable column width adjustment. Users can drag on the right edge of column headers to adjust column width.

<DemoBlock title="Basic Column Width Resize" :ts-code="tsBasicResize" :js-code="jsBasicResize">
  <yh-table
    :data="resizeData"
    :columns="resizeColumns"
    resizable
    border
    @column-resize="handleColumnResize"
  />
</DemoBlock>

## Grouped Headers

Column width adjustment is compatible with grouped headers (`children`), allowing sub-column width adjustment under grouped headers.

<DemoBlock title="Grouped Headers + Column Resize" :ts-code="tsGroupResize" :js-code="jsGroupResize">
  <yh-table
    :data="groupResizeData"
    :columns="groupResizeColumns"
    resizable
    border
  />
</DemoBlock>

## Frozen Columns

Column width adjustment can work with fixed columns (`fixed`).

<DemoBlock title="Frozen Columns + Column Resize" :ts-code="tsFixedResize" :js-code="jsFixedResize">
  <yh-table
    :data="fixedResizeData"
    :columns="fixedResizeColumns"
    resizable
    border
  />
</DemoBlock>

## Min Column Width Limit

Limit the minimum column width through the column config's `minWidth` to prevent columns from being dragged too narrow.

<DemoBlock title="Min Column Width Limit" :ts-code="tsMinWidth" :js-code="jsMinWidth">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Hint: ID min 60px, Name min 80px, Email min 150px, Role min 80px, Description min 120px
  </p>
  <yh-table
    :data="minWidthData"
    :columns="minWidthColumns"
    resizable
    border
  />
</DemoBlock>

## Per-Column Config

Control whether a specific column is resizable through the column config's `resizable` property.

<DemoBlock title="Per-Column Resizable Control" :ts-code="tsPerColumn" :js-code="jsPerColumn">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Hint: "ID" and "Age" columns are not resizable (resizable: false)
  </p>
  <yh-table
    :data="perColumnData"
    :columns="perColumnColumns"
    border
  />
</DemoBlock>

## Event Listening

Listen to column width changes through the `column-resize` event to get the current column and new width value.

<DemoBlock title="Column Width Change Event" :ts-code="tsEventResize" :js-code="jsEventResize">
  <div style="display: flex; gap: 24px;">
    <div style="flex: 1;">
      <yh-table
        :data="eventResizeData"
        :columns="eventResizeColumns"
        resizable
        border
        @column-resize="handleResizeEvent"
      />
    </div>
    <div style="width: 260px; padding: 12px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Column Width Change Log:</p>
      <div v-for="(log, idx) in resizeLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: var(--yh-bg-color, #fff); border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="resizeLog.length === 0" style="color: #c0c4cc; font-size: 12px;">Drag column edge to see log</p>
    </div>
  </div>
</DemoBlock>

## API

### Table Props (Column Resize Related)

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| resizable | Globally enable column width adjustment | `boolean` | `false` |

### TableColumn Props (Column Resize Related)

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | Column width (pixels or percentage) | `number \| string` | — |
| minWidth | Minimum column width (minimum 40px during drag) | `number \| string` | — |
| maxWidth | Maximum column width | `number \| string` | — |
| resizable | Whether this column is resizable (higher priority than global resizable) | `boolean` | — |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| column-resize | Triggered when column width changes | `(column: TableColumn, width: number)` |

### Notes

1. **Recommended to set `border`**: Tables with borders show column boundaries and drag areas more clearly.
2. **Set initial width**: It is recommended to set `width` for each column to ensure accurate column width calculation.
3. **`minWidth` priority**: If column width is less than `minWidth` during drag, it will be limited to the minimum width.
4. **Column-level override**: The `resizable` in column config overrides the global `resizable` setting.
