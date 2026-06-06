# Table - Column Drag

Configure column drag through `drag-config`, supporting drag to reorder columns, custom drag styles, drag event listening, and more.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== 1. Drag to Reorder Columns ====================

const colDragData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', position: 'Frontend Engineer', city: 'Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', position: 'Product Manager', city: 'Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', position: 'UI Designer', city: 'Guangzhou' },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations', position: 'Operations Director', city: 'Shenzhen' },
  { id: 5, name: 'Tom', age: 27, dept: 'Marketing', position: 'Marketing Manager', city: 'Hangzhou' }
])

const colDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position', width: 150 },
  { prop: 'city', label: 'City' }
])

const handleColDragEnd = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  console.log('Column drag completed:', params)
}

// ==================== 2. Frozen Columns + Column Drag ====================

const fixedColDragData = ref([
  { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000, city: 'Beijing', phone: '13800001111' },
  { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000, city: 'Shanghai', phone: '13800002222' },
  { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000, city: 'Guangzhou', phone: '13800003333' },
  { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000, city: 'Shenzhen', phone: '13800004444' }
])

const fixedColDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: 'Name', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: 'Department', width: 120, draggable: true },
  { prop: 'position', label: 'Position', width: 150, draggable: true },
  { prop: 'salary', label: 'Salary', width: 120, draggable: true },
  { prop: 'city', label: 'City', width: 120, draggable: true },
  { prop: 'phone', label: 'Phone', width: 150, fixed: 'right' as const }
])

// ==================== 3. Personalized Columns (Show/Hide) ====================

const personalizeData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', position: 'Frontend Engineer', email: 'john@example.com', city: 'Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', position: 'Product Manager', email: 'jane@example.com', city: 'Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', position: 'UI Designer', email: 'mike@example.com', city: 'Guangzhou' }
])

const allColumns = ref([
  { prop: 'id', label: 'ID', width: 80, visible: true },
  { prop: 'name', label: 'Name', width: 120, visible: true },
  { prop: 'age', label: 'Age', width: 80, visible: true },
  { prop: 'dept', label: 'Department', width: 120, visible: true },
  { prop: 'position', label: 'Position', width: 150, visible: true },
  { prop: 'email', label: 'Email', width: 200, visible: false },
  { prop: 'city', label: 'City', visible: false }
])

const toggleColumnVisible = (col: { visible?: boolean }) => {
  col.visible = !col.visible
}

// ==================== 4. Drag Events ====================

const eventColDragData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design' }
])

const eventColDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department' }
])

const colDragEventLog = ref<string[]>([])

const handleColDragStartEvent = (params: { type: string; data: unknown; index: number }) => {
  colDragEventLog.value.unshift(`[Drag Start] Column index: ${params.index}`)
  if (colDragEventLog.value.length > 8) colDragEventLog.value.pop()
}

const handleColDragEndEvent = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  colDragEventLog.value.unshift(`[Drag End] From ${params.oldIndex} to ${params.newIndex}`)
  if (colDragEventLog.value.length > 8) colDragEventLog.value.pop()
}

// ==================== 5. Grouped Header + Column Drag ====================

const groupColDragData = ref([
  { id: 1, name: 'John', age: 28, province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd', zip: '100020' },
  { id: 2, name: 'Jane', age: 32, province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Loop', zip: '200120' },
  { id: 3, name: 'Mike', age: 25, province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town', zip: '510623' }
])

const groupColDragColumns = ref([
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
      { prop: 'address', label: 'Address' },
      { prop: 'zip', label: 'Zip', width: 100 }
    ]
  }
])

// ==================== 6. Row & Column Drag Combined ====================

const bothDragData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', score: 92 },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', score: 88 },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', score: 95 },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations', score: 85 },
  { id: 5, name: 'Tom', age: 27, dept: 'Marketing', score: 90 }
])

const bothDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'score', label: 'Rating' }
])

// ==================== Code Examples ====================

const tsBasicColDrag = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Drag header columns to reorder them
  </p>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
    @drag-end="handleDragEnd"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', position: 'Frontend Engineer', city: 'Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', position: 'Product Manager', city: 'Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', position: 'UI Designer', city: 'Guangzhou' },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations', position: 'Operations Director', city: 'Shenzhen' },
  { id: 5, name: 'Tom', age: 27, dept: 'Marketing', position: 'Marketing Manager', city: 'Hangzhou' }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position', width: 150 },
  { prop: 'city', label: 'City' }
])

interface DragEndParams {
  type: 'row' | 'column'
  oldIndex: number
  newIndex: number
  data: unknown[]
}

const handleDragEnd = (params: DragEndParams) => {
  console.log('Column drag completed:', params)
}
</${_S}>`

const jsBasicColDrag = toJs(tsBasicColDrag);

const tsFixedColDrag = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Fixed columns do not participate in drag, only non-fixed columns in the middle can be reordered
  </p>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface ColumnType {
  prop: string
  label: string
  width?: number
  fixed?: 'left' | 'right'
  draggable?: boolean
}

const data = ref([
  { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000, city: 'Beijing', phone: '13800001111' },
  { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000, city: 'Shanghai', phone: '13800002222' },
  { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000, city: 'Guangzhou', phone: '13800003333' },
  { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000, city: 'Shenzhen', phone: '13800004444' }
])

const columns = ref<ColumnType[]>([
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: 'Name', width: 120, fixed: 'left' },
  { prop: 'dept', label: 'Department', width: 120, draggable: true },
  { prop: 'position', label: 'Position', width: 150, draggable: true },
  { prop: 'salary', label: 'Salary', width: 120, draggable: true },
  { prop: 'city', label: 'City', width: 120, draggable: true },
  { prop: 'phone', label: 'Phone', width: 150, fixed: 'right' }
])
</${_S}>`

const jsFixedColDrag = toJs(tsFixedColDrag);

const tsPersonalize = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
    <label v-for="col in allCols" :key="col.prop"
      style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 13px;">
      <input type="checkbox" :checked="col.visible" @change="toggleVisible(col)" />
      {{ col.label }}
    </label>
  </div>
  <yh-table
    :data="data"
    :columns="allCols.filter(c => c.visible)"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', position: 'Frontend Engineer', email: 'john@example.com', city: 'Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', position: 'Product Manager', email: 'jane@example.com', city: 'Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', position: 'UI Designer', email: 'mike@example.com', city: 'Guangzhou' }
])

interface ColConfig {
  prop: string
  label: string
  width?: number
  visible: boolean
}

const allCols = ref<ColConfig[]>([
  { prop: 'id', label: 'ID', width: 80, visible: true },
  { prop: 'name', label: 'Name', width: 120, visible: true },
  { prop: 'age', label: 'Age', width: 80, visible: true },
  { prop: 'dept', label: 'Department', width: 120, visible: true },
  { prop: 'position', label: 'Position', width: 150, visible: true },
  { prop: 'email', label: 'Email', width: 200, visible: false },
  { prop: 'city', label: 'City', visible: false }
])

const toggleVisible = (col: ColConfig) => {
  col.visible = !col.visible
}
</${_S}>`

const jsPersonalize = toJs(tsPersonalize);

const tsEventColDrag = `<${_T}>
  <div style="display: flex; gap: 24px;">
    <div style="flex: 1;">
      <yh-table
        :data="data"
        :columns="columns"
        :drag-config="{
          column: true,
          animation: 300,
          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd
        }"
        border
        row-key="id"
      />
    </div>
    <div style="width: 280px; padding: 12px; background: #f5f7fa; border-radius: 8px;">
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Event Log:</p>
      <div v-for="(log, idx) in eventLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: #fff; border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="eventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">Drag columns to see event log</p>
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

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department' }
])

const eventLog = ref<string[]>([])

interface DragStartParams {
  type: string
  data: unknown
  index: number
}

interface DragEndParams {
  type: 'row' | 'column'
  oldIndex: number
  newIndex: number
  data: unknown[]
}

const handleDragStart = (params: DragStartParams) => {
  eventLog.value.unshift(\`[Drag Start] Column index: \${params.index}\`)
  if (eventLog.value.length > 8) eventLog.value.pop()
}

const handleDragEnd = (params: DragEndParams) => {
  eventLog.value.unshift(\`[Drag End] From \${params.oldIndex} to \${params.newIndex}\`)
  if (eventLog.value.length > 8) eventLog.value.pop()
}
</${_S}>`

const jsEventColDrag = toJs(tsEventColDrag);

const tsGroupColDrag = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, province: 'Beijing', city: 'Chaoyang', address: '88 Jianguo Rd', zip: '100020' },
  { id: 2, name: 'Jane', age: 32, province: 'Shanghai', city: 'Pudong', address: 'Lujiazui Loop', zip: '200120' },
  { id: 3, name: 'Mike', age: 25, province: 'Guangdong', city: 'Tianhe', address: 'Zhujiang New Town', zip: '510623' }
])

const columns = ref([
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
      { prop: 'address', label: 'Address' },
      { prop: 'zip', label: 'Zip', width: 100 }
    ]
  }
])
</${_S}>`

const jsGroupColDrag = toJs(tsGroupColDrag);

const tsBothDrag = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Supports both row and column drag. Drag headers to reorder columns, drag rows to reorder rows.
  </p>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ row: true, column: true, animation: 300 }"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', score: 92 },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', score: 88 },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', score: 95 },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations', score: 85 },
  { id: 5, name: 'Tom', age: 27, dept: 'Marketing', score: 90 }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'score', label: 'Rating' }
])
</${_S}>`

const jsBothDrag = toJs(tsBothDrag);
</script>

## Drag to Reorder Columns

Set `drag-config` with `column: true` to enable column drag reordering. Drag header columns to adjust column display order.

<DemoBlock title="Drag to Reorder Columns" :ts-code="tsBasicColDrag" :js-code="jsBasicColDrag">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Drag header columns to reorder them
  </p>
  <yh-table
    :data="colDragData"
    :columns="colDragColumns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
    @drag-end="handleColDragEnd"
  />
</DemoBlock>

## Frozen Columns

Column drag works with fixed columns (`fixed`). Fixed columns do not participate in drag, only non-fixed columns in the middle can be reordered. Use column-level `draggable` property for precise control.

<DemoBlock title="Frozen Columns + Column Drag" :ts-code="tsFixedColDrag" :js-code="jsFixedColDrag">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Fixed columns do not participate in drag, only non-fixed columns in the middle can be reordered
  </p>
  <yh-table
    :data="fixedColDragData"
    :columns="fixedColDragColumns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</DemoBlock>

## Personalized Columns

Combine column drag with column visibility to implement personalized column configuration. Users can check columns to display and drag to adjust order.

<DemoBlock title="Personalized Columns (Visibility + Drag)" :ts-code="tsPersonalize" :js-code="jsPersonalize">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
    <label v-for="col in allColumns" :key="col.prop"
      style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 13px;">
      <input type="checkbox" :checked="col.visible" @change="toggleColumnVisible(col)" />
      {{ col.label }}
    </label>
  </div>
  <yh-table
    :data="personalizeData"
    :columns="allColumns.filter(c => c.visible)"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</DemoBlock>

## Drag Events

Listen to column drag events through `drag-config`'s `onDragStart` and `onDragEnd` callbacks.

<DemoBlock title="Column Drag Events" :ts-code="tsEventColDrag" :js-code="jsEventColDrag">
  <div style="display: flex; gap: 24px;">
    <div style="flex: 1;">
      <yh-table
        :data="eventColDragData"
        :columns="eventColDragColumns"
        :drag-config="{
          column: true,
          animation: 300,
          onDragStart: handleColDragStartEvent,
          onDragEnd: handleColDragEndEvent
        }"
        border
        row-key="id"
      />
    </div>
    <div style="width: 280px; padding: 12px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Event Log:</p>
      <div v-for="(log, idx) in colDragEventLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: var(--yh-bg-color, #fff); border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="colDragEventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">Drag columns to see event log</p>
    </div>
  </div>
</DemoBlock>

## Grouped Header

Column drag works with grouped headers (`children`). Dragging grouped headers moves the entire column group.

<DemoBlock title="Grouped Header + Column Drag" :ts-code="tsGroupColDrag" :js-code="jsGroupColDrag">
  <yh-table
    :data="groupColDragData"
    :columns="groupColDragColumns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</DemoBlock>

## Row & Column Drag Combined

Set `drag-config` with `row: true` and `column: true` to enable both row and column drag simultaneously. Drag headers to adjust column order, drag data rows to adjust row order.

<DemoBlock title="Row & Column Drag Combined" :ts-code="tsBothDrag" :js-code="jsBothDrag">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    Supports both row and column drag. Drag headers to reorder columns, drag rows to reorder rows.
  </p>
  <yh-table
    :data="bothDragData"
    :columns="bothDragColumns"
    :drag-config="{ row: true, column: true, animation: 300 }"
    border
    row-key="id"
    @update:data="bothDragData = $event"
  />
</DemoBlock>

## API

### DragConfig (Column Drag Related)

Passed through the `drag-config` property.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| column | Whether columns can be dragged | `boolean` | `false` |
| row | Whether rows can be dragged (can be enabled simultaneously) | `boolean` | `false` |
| animation | Animation duration (milliseconds) | `number` | `150` |
| onDragStart | Drag start callback | `({ type, data, index }) => void` | — |
| onDragEnd | Drag end callback | `({ type, oldIndex, newIndex, data }) => void` | — |
| dragClass | Style class during drag | `string` | — |
| ghostClass | Ghost element style class | `string` | — |

### TableColumn Props (Column Drag Related)

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| draggable | Whether this column can be drag-sorted | `boolean` | — |
| visible | Whether column is visible | `boolean` | `true` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| drag-end | Triggered when drag ends | `{ type: 'row' \| 'column', oldIndex: number, newIndex: number, data: unknown[] }` |

### Methods (via ref)

| Method | Description | Parameters |
| --- | --- | --- |
| getColumns | Get current column info | — |
| setColumnVisible | Set column visibility | `(prop: string, visible: boolean)` |
| resetColumns | Reset all columns to visible | — |

### Notes

1. **Fixed columns are not draggable**: Columns with `fixed` set do not participate in drag sorting by default.
2. **Column-level control**: Use the `draggable` property in column config to precisely control whether each column can be dragged.
3. **Reactive column config**: Wrap `columns` config with `ref`, column order updates automatically after drag.
4. **Row & column combined drag**: Set both `row: true` and `column: true` to support simultaneous row and column drag; the table automatically distinguishes operation areas.
