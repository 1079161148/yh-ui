# Gantt-Chart

A high-performance Gantt chart component supporting Tree Data, Auto-scheduling, Virtual scrolling and Resource conflict detection.

---

> [!TIP]
> **YH-UI GanttChart** is designed for complex project management scenarios, supporting virtual scrolling for tens of thousands of tasks, dynamic tree display, auto-scheduling based on dependencies, and milestone visualization.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

const viewMode = ref('day')

// --- Core Demo Data ---
const ganttData = ref([
  {
    id: 'p1', name: 'R&D Center (Rollup)', startDate: '2024-03-01', endDate: '2024-03-31', status: 'info',
    children: [
      { id: 'm1', name: 'Kickoff Review (Milestone)', startDate: '2024-03-01', endDate: '2024-03-01', status: 'success' },
      { 
        id: 'p2', name: 'Kernel Module Dev', startDate: '2024-03-02', endDate: '2024-03-20',
        children: [
          { id: 'c1', name: 'Memory Manager', startDate: '2024-03-02', endDate: '2024-03-10', progress: 80 },
          { id: 'c2', name: 'Task Scheduler', startDate: '2024-03-11', endDate: '2024-03-20', progress: 20 }
        ]
      },
      { id: 'c3', name: 'Driver Adapter', startDate: '2024-03-21', endDate: '2024-03-30', progress: 0 }
    ]
  },
  { id: 't4', name: 'Regression Testing', startDate: '2024-04-01', endDate: '2024-04-10', dependencies: ['p1'], status: 'warning' },
  { id: 'm2', name: 'Product Release (Milestone)', startDate: '2024-04-12', endDate: '2024-04-12', status: 'danger' }
])

const columns = [
  { prop: 'name', label: 'Task Name', width: 180 },
  { prop: 'startDate', label: 'Start Date', width: 110 },
  { prop: 'endDate', label: 'End Date', width: 110 }
]

// --- Tree Data ---
const treeData = ref([
  {
    id: 'p1',
    name: 'Core Engine Dev (Rollup)',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'info',
    children: [
      { id: 'c1', name: 'Parser Implementation', startDate: '2024-03-01', endDate: '2024-03-10', progress: 100 },
      { id: 'c2', name: 'Execution Context Opt', startDate: '2024-03-12', endDate: '2024-03-25', progress: 30 }
    ]
  }
])

// --- Auto-scheduling Data ---
const scheduleData = ref([
  { id: 't1', name: 'Predecessor (Drag me)', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success' },
  { id: 't2', name: 'Successor Task', startDate: '2024-03-10', endDate: '2024-03-15', dependencies: ['t1'] }
])

// --- Virtual Scrolling Data ---
const largeData = ref(Array.from({ length: 1000 }).map((_, i) => ({
  id: `task-${i}`,
  name: `Test Task #${i}`,
  startDate: '2024-03-01',
  endDate: '2024-03-05'
})))

// --- Resource Conflict Data ---
const resourceData = ref([
  { id: 'r1', name: 'Module A Dev', startDate: '2024-03-01', endDate: '2024-03-10', assignees: ['john'] },
  { id: 'r2', name: 'Req Review (Conflict)', startDate: '2024-03-05', endDate: '2024-03-06', assignees: ['john'] }
])

// --- Custom Render Data ---
const customRenderData = ref([
  { id: 't1', name: 'Frontend Dev', startDate: '2024-03-01', endDate: '2024-03-10', progress: 75, status: 'success' },
  { id: 't2', name: 'Backend Dev', startDate: '2024-03-05', endDate: '2024-03-15', progress: 50, status: 'info' },
  { id: 't3', name: 'Testing', startDate: '2024-03-12', endDate: '2024-03-20', progress: 30, status: 'warning' }
])

// --- Custom Cell Data ---
const customCellData = ref([
  { id: 't1', name: 'Requirements Analysis', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success', assignee: 'John' },
  { id: 't2', name: 'System Design', startDate: '2024-03-06', endDate: '2024-03-10', status: 'info', assignee: 'Jane' },
  { id: 't3', name: 'Coding Implementation', startDate: '2024-03-11', endDate: '2024-03-20', status: 'warning', assignee: 'Bob' }
])

const customColumns = [
  { prop: 'name', label: 'Task Name', width: 150 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'assignee', label: 'Assignee', width: 100 }
]

// --- Event Handling Data ---
const eventData = ref([
  { id: 't1', name: 'Try clicking me', startDate: '2024-03-01', endDate: '2024-03-05', progress: 60 },
  { id: 't2', name: 'Try dragging me', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 },
  { id: 't3', name: 'Try double-clicking me', startDate: '2024-03-11', endDate: '2024-03-15', progress: 80 }
])

const eventLog = ref<string[]>([])
const handleTaskClick = (task: any) => {
  eventLog.value.unshift(`✅ Task Clicked: ${task.name}`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}
const handleTaskDblClick = (task: any) => {
  eventLog.value.unshift(`🔔 Task Double-Clicked: ${task.name}`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}
const handleDragEnd = (task: any) => {
  eventLog.value.unshift(`🚀 Drag Ended: ${task.name} (${task.startDate} ~ ${task.endDate})`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

// --- Nuxt Demo Data ---
const nuxtData = ref([
  { id: 'n1', name: 'Nuxt SSR Task', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success' },
  { id: 'n2', name: 'State Syncing', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 }
])
const nuxtViewMode = ref('week')

// --- Demo Code Strings ---

const tsNuxt = `<${_T}>
  <yh-gantt-chart
    v-model:data="nuxtData"
    v-model:view-mode="viewMode"
    :columns="columns"
    draggable
    style="height: 300px"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const nuxtData = ref([
  { id: '1', name: 'Nuxt SSR Task', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success' },
  { id: '2', name: 'State Syncing', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 }
])

const viewMode = ref('week')
const columns = [
  { prop: 'name', label: 'Task Name', width: 200 }
]
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsBasic = `<${_T}>
  <div style="height: 400px; width: 100%;">
    <yh-gantt-chart
      v-model:data="ganttData"
      :columns="columns"
      draggable
      style="height: 100%"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const ganttData = ref([
  {
    id: 'p1', name: 'R&D Center (Rollup)', startDate: '2024-03-01', endDate: '2024-03-31', status: 'info',
    children: [
      { id: 'm1', name: 'Kickoff Review (Milestone)', startDate: '2024-03-01', endDate: '2024-03-01', status: 'success' },
      {
        id: 'p2', name: 'Kernel Module Dev', startDate: '2024-03-02', endDate: '2024-03-20',
        children: [
          { id: 'c1', name: 'Memory Manager', startDate: '2024-03-02', endDate: '2024-03-10', progress: 80 },
          { id: 'c2', name: 'Task Scheduler', startDate: '2024-03-11', endDate: '2024-03-20', progress: 20 }
        ]
      },
      { id: 'c3', name: 'Driver Adapter', startDate: '2024-03-21', endDate: '2024-03-30', progress: 0 }
    ]
  },
  { id: 't4', name: 'Regression Testing', startDate: '2024-04-01', endDate: '2024-04-10', dependencies: ['p1'], status: 'warning' },
  { id: 'm2', name: 'Product Release (Milestone)', startDate: '2024-04-12', endDate: '2024-04-12', status: 'danger' }
])

const columns = [
  { prop: 'name', label: 'Task Name', width: 180 },
  { prop: 'startDate', label: 'Start Date', width: 110 },
  { prop: 'endDate', label: 'End Date', width: 110 }
]
</${_S}>`

const tsDrag = `<${_T}>
  <div style="height: 400px; width: 100%;">
    <yh-gantt-chart
      v-model:data="ganttData"
      :columns="columns"
      draggable
      progress-draggable
      auto-schedule
      style="height: 100%"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const ganttData = ref([
  { id: '1', name: 'Project Start', startDate: '2024-03-01', endDate: '2024-03-05' },
  { id: '2', name: 'Dependency Task', startDate: '2024-03-06', endDate: '2024-03-15', dependencies: ['1'] }
])

const columns = [
  { prop: 'name', label: 'Task Name', width: 180 },
  { prop: 'startDate', label: 'Start Date', width: 110 },
  { prop: 'endDate', label: 'End Date', width: 110 }
]
</${_S}>`

const tsTree = `<${_T}>
  <div style="height: 300px; width: 100%;">
    <yh-gantt-chart
      v-model:data="treeData"
      :columns="columns"
      draggable
      style="height: 100%"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 'p1',
    name: 'Core Engine Dev (Rollup)',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    children: [
      { id: 'c1', name: 'Parser Implementation', startDate: '2024-03-01', endDate: '2024-03-10' }
    ]
  }
])

const columns = [
  { prop: 'name', label: 'Task Name', width: 250 }
]
</${_S}>`

const tsSchedule = `<${_T}>
  <div style="height: 250px; width: 100%;">
    <yh-gantt-chart
      v-model:data="scheduleData"
      :columns="columns"
      draggable
      auto-schedule
      style="height: 100%"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const scheduleData = ref([
  { id: 't1', name: 'Predecessor Task', startDate: '2024-03-01', endDate: '2024-03-05' },
  { id: 't2', name: 'Successor Task', startDate: '2024-03-10', endDate: '2024-03-15', dependencies: ['t1'] }
])
</${_S}>`

const tsVirtual = `<${_T}>
  <div style="height: 500px; width: 100%;">
    <yh-gantt-chart
      v-model:data="largeData"
      :columns="columns"
      virtual
      style="height: 100%"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const largeData = ref(Array.from({ length: 1000 }).map((_, i) => ({
  id: \`task-\${i}\`,
  name: \`Test Task #\${i}\`,
  startDate: '2024-03-01',
  endDate: '2024-03-05'
})))
</${_S}>`

const tsResource = `<${_T}>
  <div style="height: 300px; width: 100%;">
    <yh-gantt-chart
      v-model:data="resourceData"
      :columns="columns"
      show-resource-load
      style="height: 100%"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const resourceData = ref([
  { id: 'r1', name: 'Module A Dev', startDate: '2024-03-01', endDate: '2024-03-10', assignees: ['john'] },
  { id: 'r2', name: 'Req Review (Conflict)', startDate: '2024-03-05', endDate: '2024-03-06', assignees: ['john'] }
])
</${_S}>`

// --- Custom Render Code ---
const tsCustomRender = `<${_T}>
  <div style="height: 350px; width: 100%;">
    <yh-gantt-chart
      v-model:data="customRenderData"
      :columns="columns"
      style="height: 100%"
    >
      <template #task-content="{ task }">
        <div style="display: flex; align-items: center; gap: 4px; padding: 0 8px; height: 100%;">
          <span style="font-size: 16px;">📋</span>
          <span style="font-weight: 500;">{{ task.name }}</span>
          <span style="margin-left: auto; font-size: 12px; opacity: 0.8;">{{ task.progress }}%</span>
        </div>
      </template>
    </yh-gantt-chart>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const customRenderData = ref([
  { id: 't1', name: 'Frontend Dev', startDate: '2024-03-01', endDate: '2024-03-10', progress: 75 },
  { id: 't2', name: 'Backend Dev', startDate: '2024-03-05', endDate: '2024-03-15', progress: 50 },
  { id: 't3', name: 'Testing', startDate: '2024-03-12', endDate: '2024-03-20', progress: 30 }
])

const columns = [
  { prop: 'name', label: 'Task Name', width: 180 }
]
</${_S}>`

// --- Custom Cell Code ---
const tsCustomCell = `<${_T}>
  <div style="height: 350px; width: 100%;">
    <yh-gantt-chart
      v-model:data="customCellData"
      :columns="customColumns"
      style="height: 100%"
    >
      <template #table-cell="{ row, column }">
        <div v-if="column.prop === 'status'" style="text-align: center;">
          <span :style="{
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            backgroundColor: row.status === 'success' ? '#f0f9ff' : row.status === 'warning' ? '#fffbeb' : '#f0fdf4',
            color: row.status === 'success' ? '#0369a1' : row.status === 'warning' ? '#d97706' : '#15803d'
          }">
            {{ row.status === 'success' ? 'Completed' : row.status === 'warning' ? 'In Progress' : 'Planned' }}
          </span>
        </div>
        <span v-else>{{ row[column.prop] }}</span>
      </template>
    </yh-gantt-chart>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const customCellData = ref([
  { id: 't1', name: 'Requirements Analysis', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success', assignee: 'John' },
  { id: 't2', name: 'System Design', startDate: '2024-03-06', endDate: '2024-03-10', status: 'info', assignee: 'Jane' },
  { id: 't3', name: 'Coding Implementation', startDate: '2024-03-11', endDate: '2024-03-20', status: 'warning', assignee: 'Bob' }
])

const customColumns = [
  { prop: 'name', label: 'Task Name', width: 150 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'assignee', label: 'Assignee', width: 100 }
]
</${_S}>`

// --- Event Handling Code ---
const tsEventHandling = `<${_T}>
  <div style="height: 400px; width: 100%;">
    <div style="margin-bottom: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <div style="font-weight: 600; margin-bottom: 8px;">📝 Event Log:</div>
      <div v-for="(log, index) in eventLog" :key="index" style="font-size: 13px; color: #666; line-height: 1.6;">
        {{ log }}
      </div>
      <div v-if="eventLog.length === 0" style="font-size: 13px; color: #999;">
        Click, double-click or drag tasks to see event triggers...
      </div>
    </div>
    <yh-gantt-chart
      v-model:data="eventData"
      :columns="columns"
      draggable
      @task-click="handleTaskClick"
      @task-dblclick="handleTaskDblClick"
      @task-drag-end="handleDragEnd"
      style="height: calc(100% - 100px);"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const eventData = ref([
  { id: 't1', name: 'Try clicking me', startDate: '2024-03-01', endDate: '2024-03-05', progress: 60 },
  { id: 't2', name: 'Try dragging me', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 },
  { id: 't3', name: 'Try double-clicking me', startDate: '2024-03-11', endDate: '2024-03-15', progress: 80 }
])

const eventLog = ref<string[]>([])

const handleTaskClick = (task: any) => {
  eventLog.value.unshift(\`✅ Task Clicked: \${task.name}\`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

const handleTaskDblClick = (task: any) => {
  eventLog.value.unshift(\`🔔 Task Double-Clicked: \${task.name}\`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

const handleDragEnd = (task: any) => {
  eventLog.value.unshift(\`🚀 Drag Ended: \${task.name} (\${task.startDate} ~ \${task.endDate})\`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

const columns = [
  { prop: 'name', label: 'Task Name', width: 180 }
]
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsDrag = toJs(tsDrag)
const jsTree = toJs(tsTree)
const jsSchedule = toJs(tsSchedule)
const jsVirtual = toJs(tsVirtual)
const jsResource = toJs(tsResource)
const jsCustomRender = toJs(tsCustomRender)
const jsCustomCell = toJs(tsCustomCell)
const jsEventHandling = toJs(tsEventHandling)

</script>

## Basic Usage

The Gantt chart component aims to provide an intuitive timeline view of task progress and dependency relationships.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 400px; width: 100%;">
    <yh-gantt-chart
      v-model:data="ganttData"
      :columns="columns"
      draggable
      style="height: 100%"
    />
  </div>
</DemoBlock>

## Interaction, Search & Zoom

Built-in integrated toolbar supports **keyword search**, **stepless zooming** (slider adjustment), and one-click **view mode** switching. With `draggable` enabled, users can adjust task time and progress via drag-and-drop.

<DemoBlock title="Interaction Example" :ts-code="tsDrag" :js-code="jsDrag">
  <div style="height: 400px; width: 100%;">
    <yh-gantt-chart
      v-model:data="ganttData"
      :columns="columns"
      draggable
      progress-draggable
      auto-schedule
      style="height: 100%"
    />
  </div>
</DemoBlock>

## Milestone

When a task's start and end dates are the same, the component automatically renders it as a **diamond-shaped symbol**, which is a Milestone.

::: tip Auto Recognition
You only need to set `startDate` and `endDate` to the same value (e.g., midnight of the same day), and the component will internally convert it to milestone style.
:::

## Tree Structure & Rollup

Supports task hierarchy nesting. The parent task's time range is automatically rolled up from its children. Additionally, **Tree Lines** are automatically rendered in the table to facilitate observation of complex relationships.

### Summary Bar Style

Summary tasks are displayed with a special "Summary Bar" on the timeline, featuring downward vertical marks (ears) at both ends, conforming to industrial Gantt chart visual standards.

<DemoBlock title="Tree View Demo" :ts-code="tsTree" :js-code="jsTree">
  <div style="height: 300px; width: 100%;">
    <yh-gantt-chart
      v-model:data="treeData"
      :columns="columns"
      draggable
      style="height: 100%"
    />
  </div>
</DemoBlock>

## Auto-scheduling

Modifying a predecessor task will cause successor tasks to automatically shift accordingly.

<DemoBlock title="Auto-scheduling Demo" :ts-code="tsSchedule" :js-code="jsSchedule">
  <div style="height: 250px; width: 100%;">
    <yh-gantt-chart
      v-model:data="scheduleData"
      :columns="columns"
      draggable
      auto-schedule
      style="height: 100%"
    />
  </div>
</DemoBlock>

## Large Data Virtual Scrolling

Supports rendering massive amounts of data without performance lag.

<DemoBlock title="Virtual Scrolling Demo" :ts-code="tsVirtual" :js-code="jsVirtual">
  <div style="height: 500px; width: 100%;">
    <yh-gantt-chart
      v-model:data="largeData"
      :columns="columns"
      virtual
      style="height: 100%"
    />
  </div>
</DemoBlock>

## Resource Conflict Detection

Intelligently identifies and highlights resource allocation conflicts.

<DemoBlock title="Resource Conflict Demo" :ts-code="tsResource" :js-code="jsResource">
  <div style="height: 300px; width: 100%;">
    <yh-gantt-chart
      v-model:data="resourceData"
      :columns="columns"
      show-resource-load
      style="height: 100%"
    />
  </div>
</DemoBlock>

## Advanced Usage

### Custom Task Rendering

The `task-content` slot allows full customization of the task block content, adding icons, progress percentages, etc.

<DemoBlock title="Custom Task Rendering" :ts-code="tsCustomRender" :js-code="jsCustomRender">
  <div style="height: 350px; width: 100%;">
    <yh-gantt-chart
      v-model:data="customRenderData"
      :columns="columns"
      style="height: 100%"
    >
      <template #task-content="{ task }">
        <div style="display: flex; align-items: center; gap: 4px; padding: 0 8px; height: 100%;">
          <span style="font-size: 16px;">📋</span>
          <span style="font-weight: 500;">{{ task.name }}</span>
          <span style="margin-left: auto; font-size: 12px; opacity: 0.8;">{{ task.progress }}%</span>
        </div>
      </template>
    </yh-gantt-chart>
  </div>
</DemoBlock>

### Custom Table Cells

The `table-cell` slot provides custom rendering for each cell in the sidebar table, enabling status tags, avatars, and other complex displays.

<DemoBlock title="Custom Table Cells" :ts-code="tsCustomCell" :js-code="jsCustomCell">
  <div style="height: 350px; width: 100%;">
    <yh-gantt-chart
      v-model:data="customCellData"
      :columns="customColumns"
      style="height: 100%"
    >
      <template #table-cell="{ row, column }">
        <div v-if="column.prop === 'status'" style="text-align: center;">
          <span :style="{
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            backgroundColor: row.status === 'success' ? '#f0f9ff' : row.status === 'warning' ? '#fffbeb' : '#f0fdf4',
            color: row.status === 'success' ? '#0369a1' : row.status === 'warning' ? '#d97706' : '#15803d'
          }">
            {{ row.status === 'success' ? 'Completed' : row.status === 'warning' ? 'In Progress' : 'Planned' }}
          </span>
        </div>
        <span v-else>{{ row[column.prop] }}</span>
      </template>
    </yh-gantt-chart>
  </div>
</DemoBlock>

### Event Handling

Listen to various interaction events to implement custom logic. Supports click, double-click, drag, etc.

<DemoBlock title="Event Handling Example" :ts-code="tsEventHandling" :js-code="jsEventHandling">
  <div style="height: 400px; width: 100%;">
    <div style="margin-bottom: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <div style="font-weight: 600; margin-bottom: 8px;">📝 Event Log:</div>
      <div v-for="(log, index) in eventLog" :key="index" style="font-size: 13px; color: #666; line-height: 1.6;">
        {{ log }}
      </div>
      <div v-if="eventLog.length === 0" style="font-size: 13px; color: #999;">
        Click, double-click or drag tasks to see event triggers...
      </div>
    </div>
    <yh-gantt-chart
      v-model:data="eventData"
      :columns="columns"
      draggable
      @task-click="handleTaskClick"
      @task-dblclick="handleTaskDblClick"
      @task-drag-end="handleDragEnd"
      style="height: calc(100% - 100px);"
    />
  </div>
</DemoBlock>

## Best Practices

### Performance Optimization

1. **Use Virtual Scrolling for Large Data**: When the number of tasks exceeds 100, it is recommended to enable the `virtual` property.
2. **Set Appropriate View Mode**: For long-duration projects, use `week` or `month` views.
3. **On-demand Loading**: For deep tree structures, consider lazy loading child nodes.

```vue
<yh-gantt-chart v-model:data="tasks" :columns="columns" virtual view-mode="week" :row-height="40" />
```

### Data Structure Recommendations

```typescript
// ✅ Recommended: Use ISO 8601 date format
const task = {
  id: 'task-1',
  name: 'Dev Task',
  startDate: '2024-03-01',
  endDate: '2024-03-15',
  progress: 60
}

// ✅ Recommended: Explicit dependency relationships
const tasks = [
  { id: 't1', name: 'Req Analysis', startDate: '2024-03-01', endDate: '2024-03-05' },
  {
    id: 't2',
    name: 'Design',
    startDate: '2024-03-06',
    endDate: '2024-03-10',
    dependencies: ['t1']
  },
  { id: 't3', name: 'Dev', startDate: '2024-03-11', endDate: '2024-03-20', dependencies: ['t2'] }
]
```

### Resource Management

Allocate resources rationally to avoid conflicts:

```typescript
const tasks = [
  {
    id: 'task-1',
    name: 'Frontend Dev',
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    assignees: ['developer-1', 'developer-2']
  },
  {
    id: 'task-2',
    name: 'Backend Dev',
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    assignees: ['developer-3'] // Avoid resource conflict with task-1
  }
]
```

## FAQ

### How to export Gantt chart as an image?

You can use the [`html2canvas`](https://html2canvas.hertzen.com/) library:

```typescript
import html2canvas from 'html2canvas'

const exportGanttChart = async () => {
  const ganttElement = document.querySelector('.yh-gantt-chart')
  if (ganttElement) {
    const canvas = await html2canvas(ganttElement)
    const link = document.createElement('a')
    link.download = 'gantt-chart.png'
    link.href = canvas.toDataURL()
    link.click()
  }
}
```

### How to implement batch operations on tasks?

```typescript
// Batch update task status
const updateTasksStatus = (taskIds: string[], status: string) => {
  tasks.value = tasks.value.map((task) => {
    if (taskIds.includes(task.id)) {
      return { ...task, status }
    }
    return task
  })
}

// Batch delete tasks
const deleteTasks = (taskIds: string[]) => {
  tasks.value = tasks.value.filter((task) => !taskIds.includes(task.id))
}
```

### How to customize timeline scale?

Adjust the timeline display via `view-mode` and zoom:

```vue
<yh-gantt-chart v-model:data="tasks" v-model:view-mode="viewMode" :columns="columns" />

<!-- Toolbar will automatically show view switcher buttons -->
```

### How to handle cross-timezone tasks?

Uniformly use UTC time or explicitly specify the timezone:

```typescript
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const task = {
  id: 'task-1',
  name: 'Global Meeting',
  startDate: dayjs.tz('2024-03-01 09:00', 'America/New_York').toISOString(),
  endDate: dayjs.tz('2024-03-01 10:00', 'America/New_York').toISOString()
}
```

## Use in Nuxt

GanttChart components fully support Nuxt 3/4 SSR (Server-Side Rendering). Components will be automatically imported when using YH-UI in a Nuxt project.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="height: 300px; border: 1px solid var(--yh-border-color-light); border-radius: 4px; overflow: hidden;">
    <yh-gantt-chart
      v-model:data="nuxtData"
      v-model:view-mode="nuxtViewMode"
      :columns="columns"
      draggable
    />
  </div>
</DemoBlock>

**SSR Compatibility Notes**:

- ✅ **First Screen Rendering**: The initial structure, task list, and timeline scales support SSR, improving SEO and speed.
- ✅ **State Sync**: Supports two-way binding for `v-model:data` and `v-model:view-mode`, ensuring perfect hydration.
- ✅ **Auto-import**: All components and types are directly usable after enabling YH-UI in Nuxt config.
- ⚠️ **Browser APIs**: Dragging interaction and scroll monitoring only work in the client environment; environment isolation is already handled.

::: tip Production Choice
For large projects with thousands of tasks, it is recommended to enable the `virtual` attribute in Nuxt to obtain ultimate scrolling performance.
:::

## API

### Props

| Name               | Description                              | Type                                   | Default                                              |
| ------------------ | ---------------------------------------- | -------------------------------------- | ---------------------------------------------------- |
| data               | Task data, supports tree structure       | `GanttTask[]`                          | `[]`                                                 |
| columns            | Left table column definitions            | `GanttColumn[]`                        | `[{ prop: 'name', label: 'Task Name', width: 200 }]` |
| view-mode          | View mode, controls timeline granularity | `'day' \| 'week' \| 'month' \| 'year'` | `'day'`                                              |
| start-date         | Forced Gantt chart start date            | `Date \| string`                       | Auto-calculated                                      |
| end-date           | Forced Gantt chart end date              | `Date \| string`                       | Auto-calculated                                      |
| draggable          | Whether to allow task timing dragging    | `boolean`                              | `false`                                              |
| progress-draggable | Whether to allow progress dragging       | `boolean`                              | `false`                                              |
| auto-schedule      | Whether to enable auto-scheduling        | `boolean`                              | `true`                                               |
| virtual            | Enable virtual scrolling                 | `boolean`                              | `false`                                              |
| show-resource-load | Show resource load detection             | `boolean`                              | `true`                                               |
| show-dependencies  | Show task dependency lines               | `boolean`                              | `true`                                               |
| row-height         | Row height (px)                          | `number`                               | `40`                                                 |
| header-height      | Header height (px)                       | `number`                               | `60`                                                 |
| bordered           | Whether to show borders                  | `boolean`                              | `true`                                               |
| loading            | Whether to show loading status           | `boolean`                              | `false`                                              |
| theme-overrides    | Theme variable overrides                 | `ComponentThemeVars`                   | —                                                    |

### Events

| Name              | Description                                   | Parameters                                            |
| ----------------- | --------------------------------------------- | ----------------------------------------------------- |
| update:data       | Triggered when task data is updated           | `(data: GanttTask[])`                                 |
| update:view-mode  | Triggered when view mode changes              | `(mode: GanttViewMode)`                               |
| task-click        | Triggered when a task block is clicked        | `(task: GanttTask, event: MouseEvent)`                |
| task-dblclick     | Triggered when a task block is double-clicked | `(task: GanttTask, event: MouseEvent)`                |
| task-drag-end     | Triggered when task dragging ends             | `(task: GanttTask)`                                   |
| progress-drag-end | Triggered when progress dragging ends         | `(task: GanttTask)`                                   |
| dependency-click  | Triggered when a dependency line is clicked   | `(from: GanttTask, to: GanttTask, event: MouseEvent)` |

### Slots

| Name         | Description                      | Parameters                                               |
| ------------ | -------------------------------- | -------------------------------------------------------- |
| task-content | Custom content inside task block | `{ task: GanttTask }`                                    |
| table-cell   | Custom sidebar table cell        | `{ row: GanttTask, column: GanttColumn, index: number }` |
| tooltip      | Custom hover tooltip content     | `{ task: GanttTask }`                                    |

### GanttTask Type

| Name         | Description                | Type                                                        | Required |
| ------------ | -------------------------- | ----------------------------------------------------------- | -------- |
| id           | Unique ID                  | `string \| number`                                          | ✅       |
| name         | Task Name                  | `string`                                                    | ✅       |
| startDate    | Start Date                 | `string \| number \| Date`                                  | ✅       |
| endDate      | End Date                   | `string \| number \| Date`                                  | ✅       |
| progress     | Progress (0-100)           | `number`                                                    | ❌       |
| dependencies | List of dependent task IDs | `(string \| number)[]`                                      | ❌       |
| children     | List of child tasks        | `GanttTask[]`                                               | ❌       |
| assignees    | List of resource IDs       | `string[]`                                                  | ❌       |
| status       | Preset status (color)      | `'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | ❌       |
| color        | Custom background color    | `string`                                                    | ❌       |
| textColor    | Custom text color          | `string`                                                    | ❌       |
| parentId     | Parent task ID             | `string \| number`                                          | ❌       |
| expanded     | Expanded state             | `boolean`                                                   | ❌       |

### GanttColumn Type

| Name  | Description   | Type                            | Default  |
| ----- | ------------- | ------------------------------- | -------- |
| prop  | Field name    | `string`                        | —        |
| label | Column header | `string`                        | —        |
| width | Column width  | `string \| number`              | `auto`   |
| align | Alignment     | `'left' \| 'center' \| 'right'` | `'left'` |

## Theme Variables

| Name                         | Description              | Default                          |
| ---------------------------- | ------------------------ | -------------------------------- |
| `--yh-gantt-border-color`    | Border color             | `var(--yh-border-color-light)`   |
| `--yh-gantt-bg-color`        | Background color         | `var(--yh-bg-color)`             |
| `--yh-gantt-header-bg-color` | Header background color  | `var(--yh-fill-color-light)`     |
| `--yh-gantt-task-color`      | Task block primary color | `var(--yh-color-primary)`        |
| `--yh-gantt-line-color`      | Grid line color          | `var(--yh-border-color-lighter)` |
