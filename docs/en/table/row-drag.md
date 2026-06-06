# Table - Row Drag

Configure row drag functionality through `drag-config`, supporting drag sorting, drag handles, drag event listening, and more.

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== 1. Drag to Reorder Rows ====================

const dragData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design' },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations' },
  { id: 5, name: 'Tom W.', age: 27, dept: 'Marketing' },
  { id: 6, name: 'David S.', age: 35, dept: 'HR' }
])

const dragColumns = [
  { prop: 'id', label: 'Index', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department' }
]

const handleDragEnd1 = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  console.log('Drag complete:', params)
}

// ==================== 2. Drag Handle ====================

const handleData = ref([
  { id: 1, name: 'Requirement Review', priority: 'High', status: 'In Progress' },
  { id: 2, name: 'UI Design', priority: 'High', status: 'Completed' },
  { id: 3, name: 'Frontend Dev', priority: 'Medium', status: 'Pending' },
  { id: 4, name: 'Backend Dev', priority: 'Medium', status: 'Pending' },
  { id: 5, name: 'Testing', priority: 'Low', status: 'Pending' },
  { id: 6, name: 'Deployment', priority: 'Low', status: 'Pending' }
])

const handleColumns = [
  {
    prop: 'drag',
    label: '',
    width: 50,
    render: () => h('span', {
      style: 'cursor: grab; color: #909399; font-size: 16px; user-select: none;',
      class: 'drag-handle'
    }, '☰')
  },
  { prop: 'id', label: 'Index', width: 80 },
  { prop: 'name', label: 'Task Name', width: 160 },
  { prop: 'priority', label: 'Priority', width: 100 },
  { prop: 'status', label: 'Status' }
]

// ==================== 3. Frozen Columns + Drag ====================

const fixedDragData = ref([
  { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000, city: 'Beijing', phone: '13800001111' },
  { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000, city: 'Shanghai', phone: '13800002222' },
  { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000, city: 'Guangzhou', phone: '13800003333' },
  { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000, city: 'Shenzhen', phone: '13800004444' },
  { id: 5, name: 'Tom W.', dept: 'Marketing', position: 'Marketing Manager', salary: 16000, city: 'Hangzhou', phone: '13800005555' }
])

const fixedDragColumns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: 'Name', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'position', label: 'Position', width: 150 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'city', label: 'City', width: 120 },
  { prop: 'phone', label: 'Phone', width: 150, fixed: 'right' as const }
]

// ==================== 4. Drag Events ====================

const eventData = ref([
  { id: 1, name: 'Item 1', order: 1 },
  { id: 2, name: 'Item 2', order: 2 },
  { id: 3, name: 'Item 3', order: 3 },
  { id: 4, name: 'Item 4', order: 4 },
  { id: 5, name: 'Item 5', order: 5 }
])

const eventColumns = [
  { prop: 'order', label: 'Order', width: 80 },
  { prop: 'name', label: 'Name', width: 150 },
  { prop: 'id', label: 'ID' }
]

const dragEventLog = ref<string[]>([])

const handleDragStart = (params: { type: string; data: unknown; index: number }) => {
  dragEventLog.value.unshift(`[Drag Start] Index: ${params.index}`)
  if (dragEventLog.value.length > 8) dragEventLog.value.pop()
}

const handleDragEndEvent = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  dragEventLog.value.unshift(`[Drag End] From ${params.oldIndex} to ${params.newIndex}`)
  if (dragEventLog.value.length > 8) dragEventLog.value.pop()
  // Update order No.
  eventData.value.forEach((item, idx) => {
    item.order = idx + 1
  })
}

// ==================== 5. Tree Drag ====================

const treeDragData = ref([
  {
    id: 1,
    name: 'Engineering',
    manager: 'CEO Zhang',
    children: [
      {
        id: 11,
        name: 'Frontend Team',
        manager: 'Team Leader Li',
        children: [
          { id: 111, name: 'John', manager: '' },
          { id: 112, name: 'Jane', manager: '' }
        ]
      },
      {
        id: 12,
        name: 'Backend Team',
        manager: 'Team Leader Wang',
        children: [
          { id: 121, name: 'Mike', manager: '' },
          { id: 122, name: 'Sarah', manager: '' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Product',
    manager: 'CEO Liu',
    children: [
      { id: 21, name: 'Product Team 1', manager: 'Team Leader Chen' },
      { id: 22, name: 'Product Team 2', manager: 'Team Leader Huang' }
    ]
  }
])

const treeDragColumns = [
  { prop: 'name', label: 'Name', treeNode: true },
  { prop: 'manager', label: 'Owner', width: 120 }
]

// ==================== Code Examples ====================

const tsBasicDrag = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ row: true, animation: 300 }"
    border
    row-key="id"
    @drag-end="handleDragEnd"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design' },
  { id: 4, name: 'Sarah', age: 30, dept: 'Operations' },
  { id: 5, name: 'Tom W.', age: 27, dept: 'Marketing' },
  { id: 6, name: 'David S.', age: 35, dept: 'HR' }
])

const columns = [
  { prop: 'id', label: 'Index', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department' }
]

interface DragEndParams {
  type: 'row' | 'column'
  oldIndex: number
  newIndex: number
  data: unknown[]
}

const handleDragEnd = (params: DragEndParams) => {
  console.log('Drag complete:', params)
}
</${_S}>`

const jsBasicDrag = toJs(tsBasicDrag)

const tsHandleDrag = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ row: true, handle: '.drag-handle', animation: 300 }"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const data = ref([
  { id: 1, name: 'Requirement Review', priority: 'High', status: 'In Progress' },
  { id: 2, name: 'UI Design', priority: 'High', status: 'Completed' },
  { id: 3, name: 'Frontend Dev', priority: 'Medium', status: 'Pending' },
  { id: 4, name: 'Backend Dev', priority: 'Medium', status: 'Pending' },
  { id: 5, name: 'Testing', priority: 'Low', status: 'Pending' },
  { id: 6, name: 'Deployment', priority: 'Low', status: 'Pending' }
])

const columns = [
  {
    prop: 'drag',
    label: '',
    width: 50,
    render: () => h('span', {
      style: 'cursor: grab; color: #909399; font-size: 16px; user-select: none;',
      class: 'drag-handle'
    }, '☰')
  },
  { prop: 'id', label: 'Index', width: 80 },
  { prop: 'name', label: 'Task Name', width: 160 },
  { prop: 'priority', label: 'Priority', width: 100 },
  { prop: 'status', label: 'Status' }
]
</${_S}>`

const jsHandleDrag = toJs(tsHandleDrag)

const tsFixedDrag = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ row: true, animation: 300 }"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', dept: 'Engineering', position: 'Frontend Engineer', salary: 15000, city: 'Beijing', phone: '13800001111' },
  { id: 2, name: 'Jane', dept: 'Product', position: 'Product Manager', salary: 18000, city: 'Shanghai', phone: '13800002222' },
  { id: 3, name: 'Mike', dept: 'Design', position: 'UI Designer', salary: 14000, city: 'Guangzhou', phone: '13800003333' },
  { id: 4, name: 'Sarah', dept: 'Operations', position: 'Operations Director', salary: 22000, city: 'Shenzhen', phone: '13800004444' },
  { id: 5, name: 'Tom W.', dept: 'Marketing', position: 'Marketing Manager', salary: 16000, city: 'Hangzhou', phone: '13800005555' }
])

interface ColumnType {
  prop: string
  label: string
  width?: number
  fixed?: 'left' | 'right'
}

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

const jsFixedDrag = toJs(tsFixedDrag)

const tsEventDrag = `<${_T}>
  <div style="display: flex; gap: 24px;">
    <div style="flex: 1;">
      <yh-table
        :data="data"
        :columns="columns"
        :drag-config="{
          row: true,
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
      <p v-if="eventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">No Events</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'Item 1', order: 1 },
  { id: 2, name: 'Item 2', order: 2 },
  { id: 3, name: 'Item 3', order: 3 },
  { id: 4, name: 'Item 4', order: 4 },
  { id: 5, name: 'Item 5', order: 5 }
])

const columns = [
  { prop: 'order', label: 'Order', width: 80 },
  { prop: 'name', label: 'Name', width: 150 },
  { prop: 'id', label: 'ID' }
]

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
  eventLog.value.unshift(\`[Drag Start] Index: \${params.index}\`)
  if (eventLog.value.length > 8) eventLog.value.pop()
}

const handleDragEnd = (params: DragEndParams) => {
  eventLog.value.unshift(\`[Drag End] From \${params.oldIndex} to \${params.newIndex}\`)
  if (eventLog.value.length > 8) eventLog.value.pop()
  data.value.forEach((item, idx) => { item.order = idx + 1 })
}
</${_S}>`

const jsEventDrag = toJs(tsEventDrag)

const tsTreeDrag = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :drag-config="{ row: true, animation: 300 }"
    :tree-config="{ childrenKey: 'children', expandAll: true, indent: 20 }"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    id: 1,
    name: 'Engineering',
    manager: 'CEO Zhang',
    children: [
      {
        id: 11,
        name: 'Frontend Team',
        manager: 'Team Leader Li',
        children: [
          { id: 111, name: 'John', manager: '' },
          { id: 112, name: 'Jane', manager: '' }
        ]
      },
      {
        id: 12,
        name: 'Backend Team',
        manager: 'Team Leader Wang',
        children: [
          { id: 121, name: 'Mike', manager: '' },
          { id: 122, name: 'Sarah', manager: '' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Product',
    manager: 'CEO Liu',
    children: [
      { id: 21, name: 'Product Team 1', manager: 'Team Leader Chen' },
      { id: 22, name: 'Product Team 2', manager: 'Team Leader Huang' }
    ]
  }
])

const columns = [
  { prop: 'name', label: 'Name', treeNode: true },
  { prop: 'manager', label: 'Owner', width: 120 }
]
</${_S}>`

const jsTreeDrag = toJs(tsTreeDrag)
</script>

## Drag to Reorder Rows

Set `row: true` in `drag-config` to enable row drag sorting. Press and hold the row with the mouse to drag.

<DemoBlock title="Drag to Reorder Rows" :ts-code="tsBasicDrag" :js-code="jsBasicDrag">
  <yh-table
    :data="dragData"
    :columns="dragColumns"
    :drag-config="{ row: true, animation: 300 }"
    border
    row-key="id"
    @update:data="dragData = $event"
    @drag-end="handleDragEnd1"
  />
</DemoBlock>

## Custom Drag Handle

Specify the CSS selector of the drag handle via `drag-config.handle`. Dragging is only triggered within the handle area to prevent accidental operations.

<DemoBlock title="Drag Handle" :ts-code="tsHandleDrag" :js-code="jsHandleDrag">
  <yh-table
    :data="handleData"
    :columns="handleColumns"
    :drag-config="{ row: true, handle: '.drag-handle', animation: 300 }"
    border
    row-key="id"
    @update:data="handleData = $event"
  />
</DemoBlock>

## Frozen Columns + Drag

Row dragging can be used in conjunction with frozen columns (`fixed`).

<DemoBlock title="Frozen Columns + Row Drag" :ts-code="tsFixedDrag" :js-code="jsFixedDrag">
  <yh-table
    :data="fixedDragData"
    :columns="fixedDragColumns"
    :drag-config="{ row: true, animation: 300 }"
    border
    row-key="id"
    @update:data="fixedDragData = $event"
  />
</DemoBlock>

## Drag Events

Obtain drag state information through the `onDragStart` and `onDragEnd` callbacks of `drag-config`, or by listening to the `drag-end` event.

<DemoBlock title="Drag Events" :ts-code="tsEventDrag" :js-code="jsEventDrag">
  <div style="display: flex; gap: 24px;">
    <div style="flex: 1;">
      <yh-table
        :data="eventData"
        :columns="eventColumns"
        :drag-config="{
          row: true,
          animation: 300,
          onDragStart: handleDragStart,
          onDragEnd: handleDragEndEvent
        }"
        border
        row-key="id"
        @update:data="eventData = $event"
      />
    </div>
    <div style="width: 280px; padding: 12px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Event Log:</p>
      <div v-for="(log, idx) in dragEventLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: var(--yh-bg-color, #fff); border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="dragEventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">Drag a row to view the event log</p>
    </div>
  </div>
</DemoBlock>

## Tree Data Drag

Row dragging can be used with tree data (`tree-config`), supporting drag-and-drop tree nodes to adjust the order.

<DemoBlock title="Tree Data Drag" :ts-code="tsTreeDrag" :js-code="jsTreeDrag">
  <yh-table
    :data="treeDragData"
    :columns="treeDragColumns"
    :drag-config="{ row: true, animation: 300 }"
    :tree-config="{ childrenKey: 'children', expandAll: true, indent: 20 }"
    border
    row-key="id"
    @update:data="treeDragData = $event"
  />
</DemoBlock>

## API

### DragConfig

Passed through the `drag-config` property.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| row | Whether row dragging is enabled | `boolean` | `false` |
| column | Whether column dragging is enabled | `boolean` | `false` |
| handle | CSS selector for the drag handle | `string` | — |
| animation | Animation duration (ms) | `number` | `150` |
| onDragStart | Drag start callback | `({ type, data, index }) => void` | — |
| onDragEnd | Drag end callback | `({ type, oldIndex, newIndex, data }) => void` | — |
| crossTable | Whether cross-table dragging is supported | `boolean` | `false` |
| dragClass | Style class during dragging | `string` | — |
| ghostClass | Ghost element style class | `string` | — |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| drag-end | Triggered when dragging ends | `{ type: 'row' \| 'column', oldIndex: number, newIndex: number, data: unknown[] }` |

### onDragStart Parameters

| Parameter | Description | Type |
| --- | --- | --- |
| type | Drag type | `'row' \| 'column'` |
| data | Dragged record | `unknown` |
| index | Dragged index | `number` |

### onDragEnd Parameters

| Parameter | Description | Type |
| --- | --- | --- |
| type | Drag type | `'row' \| 'column'` |
| oldIndex | Original index | `number` |
| newIndex | New index | `number` |
| data | Data after drag (reordered array) | `unknown[]` |
