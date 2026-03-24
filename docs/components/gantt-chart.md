# Gantt-Chart 甘特图

支持 Tree Data、自动排程、虚拟列表及资源冲突检测的高性能甘特图组件。

---

> [!TIP]
> **YH-UI GanttChart** 专为复杂项目管理场景设计，支持数万级数据的虚拟滚动、动态树形展示、基于依赖关系的自动排程逻辑，以及里程碑展示。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const viewMode = ref('day')

// --- 核心演示数据 ---
const ganttData = ref([
  {
    id: 'p1', name: '系统研发中心 (Rollup)', startDate: '2024-03-01', endDate: '2024-03-31', status: 'info',
    children: [
      { id: 'm1', name: '立项评审 (里程碑)', startDate: '2024-03-01', endDate: '2024-03-01', status: 'success' },
      { 
        id: 'p2', name: '内核模块开发', startDate: '2024-03-02', endDate: '2024-03-20',
        children: [
          { id: 'c1', name: '内存管理器', startDate: '2024-03-02', endDate: '2024-03-10', progress: 80 },
          { id: 'c2', name: '任务调度器', startDate: '2024-03-11', endDate: '2024-03-20', progress: 20 }
        ]
      },
      { id: 'c3', name: '驱动适配层', startDate: '2024-03-21', endDate: '2024-03-30', progress: 0 }
    ]
  },
  { id: 't4', name: '回归测试', startDate: '2024-04-01', endDate: '2024-04-10', dependencies: ['p1'], status: 'warning' },
  { id: 'm2', name: '产品发布 (里程碑)', startDate: '2024-04-12', endDate: '2024-04-12', status: 'danger' }
])

const columns = [
  { prop: 'name', label: '任务名称', width: 180 },
  { prop: 'startDate', label: '开始日期', width: 110 },
  { prop: 'endDate', label: '结束日期', width: 110 }
]

// --- 树形结构数据 ---
const treeData = ref([
  {
    id: 'p1',
    name: '核心引擎开发 (Rollup)',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'info',
    children: [
      { id: 'c1', name: '解析器实现', startDate: '2024-03-01', endDate: '2024-03-10', progress: 100 },
      { id: 'c2', name: '执行上下文优化', startDate: '2024-03-12', endDate: '2024-03-25', progress: 30 }
    ]
  }
])

// --- 自动排程数据 ---
const scheduleData = ref([
  { id: 't1', name: '前置任务 (拖我)', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success' },
  { id: 't2', name: '下游依赖任务', startDate: '2024-03-10', endDate: '2024-03-15', dependencies: ['t1'] }
])

// --- 虚拟滚动数据 ---
const largeData = ref(Array.from({ length: 1000 }).map((_, i) => ({
  id: `task-${i}`,
  name: `测试任务 #${i}`,
  startDate: '2024-03-01',
  endDate: '2024-03-05'
})))

// --- 资源冲突数据 ---
const resourceData = ref([
  { id: 'r1', name: '模块A开发', startDate: '2024-03-01', endDate: '2024-03-10', assignees: ['zhansan'] },
  { id: 'r2', name: '需求回顾 (冲突)', startDate: '2024-03-05', endDate: '2024-03-06', assignees: ['zhansan'] }
])

// --- 自定义渲染数据 ---
const customRenderData = ref([
  { id: 't1', name: '前端开发', startDate: '2024-03-01', endDate: '2024-03-10', progress: 75, status: 'success' },
  { id: 't2', name: '后端开发', startDate: '2024-03-05', endDate: '2024-03-15', progress: 50, status: 'info' },
  { id: 't3', name: '测试', startDate: '2024-03-12', endDate: '2024-03-20', progress: 30, status: 'warning' }
])

// --- 自定义单元格数据 ---
const customCellData = ref([
  { id: 't1', name: '需求分析', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success', assignee: '张三' },
  { id: 't2', name: '系统设计', startDate: '2024-03-06', endDate: '2024-03-10', status: 'info', assignee: '李四' },
  { id: 't3', name: '编码实现', startDate: '2024-03-11', endDate: '2024-03-20', status: 'warning', assignee: '王五' }
])

const customColumns = [
  { prop: 'name', label: '任务名称', width: 150 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'assignee', label: '负责人', width: 100 }
]

// --- 事件处理数据 ---
const eventData = ref([
  { id: 't1', name: '点击我试试', startDate: '2024-03-01', endDate: '2024-03-05', progress: 60 },
  { id: 't2', name: '拖动我试试', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 },
  { id: 't3', name: '双击我试试', startDate: '2024-03-11', endDate: '2024-03-15', progress: 80 }
])

const eventLog = ref<string[]>([])
const handleTaskClick = (task: any) => {
  eventLog.value.unshift(`✅ 点击了任务: ${task.name}`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}
const handleTaskDblClick = (task: any) => {
  eventLog.value.unshift(`🔔 双击了任务: ${task.name}`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}
const handleDragEnd = (task: any) => {
  eventLog.value.unshift(`🚀 拖动结束: ${task.name} (${task.startDate} ~ ${task.endDate})`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

// --- Nuxt 演示数据 ---
const nuxtData = ref([
  { id: 'n1', name: 'Nuxt SSR 渲染任务', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success' },
  { id: 'n2', name: '首屏状态同步', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 }
])
const nuxtViewMode = ref('week')

// --- 示例代码字符串 ---

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
  { id: '1', name: 'Nuxt SSR 渲染任务', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success' },
  { id: '2', name: '首屏状态同步', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 }
])

const viewMode = ref('week')
const columns = [
  { prop: 'name', label: '任务名称', width: 200 }
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
    id: 'p1', name: '系统研发中心 (Rollup)', startDate: '2024-03-01', endDate: '2024-03-31', status: 'info',
    children: [
      { id: 'm1', name: '立项评审 (里程碑)', startDate: '2024-03-01', endDate: '2024-03-01', status: 'success' },
      {
        id: 'p2', name: '内核模块开发', startDate: '2024-03-02', endDate: '2024-03-20',
        children: [
          { id: 'c1', name: '内存管理器', startDate: '2024-03-02', endDate: '2024-03-10', progress: 80 },
          { id: 'c2', name: '任务调度器', startDate: '2024-03-11', endDate: '2024-03-20', progress: 20 }
        ]
      },
      { id: 'c3', name: '驱动适配层', startDate: '2024-03-21', endDate: '2024-03-30', progress: 0 }
    ]
  },
  { id: 't4', name: '回归测试', startDate: '2024-04-01', endDate: '2024-04-10', dependencies: ['p1'], status: 'warning' },
  { id: 'm2', name: '产品发布 (里程碑)', startDate: '2024-04-12', endDate: '2024-04-12', status: 'danger' }
])

const columns = [
  { prop: 'name', label: '任务名称', width: 180 },
  { prop: 'startDate', label: '开始日期', width: 110 },
  { prop: 'endDate', label: '结束日期', width: 110 }
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
  { id: '1', name: '项目启动', startDate: '2024-03-01', endDate: '2024-03-05' },
  { id: '2', name: '依赖任务', startDate: '2024-03-06', endDate: '2024-03-15', dependencies: ['1'] }
])

const columns = [
  { prop: 'name', label: '任务名称', width: 180 },
  { prop: 'startDate', label: '开始日期', width: 110 },
  { prop: 'endDate', label: '结束日期', width: 110 }
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
    name: '核心引擎开发 (Rollup)',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    children: [
      { id: 'c1', name: '解析器实现', startDate: '2024-03-01', endDate: '2024-03-10' }
    ]
  }
])

const columns = [
  { prop: 'name', label: '任务名称', width: 250 }
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
  { id: 't1', name: '前置任务', startDate: '2024-03-01', endDate: '2024-03-05' },
  { id: 't2', name: '后置任务', startDate: '2024-03-10', endDate: '2024-03-15', dependencies: ['t1'] }
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
  name: \`测试任务 #\${i}\`,
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
  { id: 'r1', name: '模块A开发', startDate: '2024-03-01', endDate: '2024-03-10', assignees: ['zhansan'] },
  { id: 'r2', name: '需求回顾 (冲突)', startDate: '2024-03-05', endDate: '2024-03-06', assignees: ['zhansan'] }
])
</${_S}>`

// --- 自定义渲染代码 ---
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
  { id: 't1', name: '前端开发', startDate: '2024-03-01', endDate: '2024-03-10', progress: 75 },
  { id: 't2', name: '后端开发', startDate: '2024-03-05', endDate: '2024-03-15', progress: 50 },
  { id: 't3', name: '测试', startDate: '2024-03-12', endDate: '2024-03-20', progress: 30 }
])

const columns = [
  { prop: 'name', label: '任务名称', width: 180 }
]
</${_S}>`

// --- 自定义单元格代码 ---
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
            {{ row.status === 'success' ? '已完成' : row.status === 'warning' ? '进行中' : '计划中' }}
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
  { id: 't1', name: '需求分析', startDate: '2024-03-01', endDate: '2024-03-05', status: 'success', assignee: '张三' },
  { id: 't2', name: '系统设计', startDate: '2024-03-06', endDate: '2024-03-10', status: 'info', assignee: '李四' },
  { id: 't3', name: '编码实现', startDate: '2024-03-11', endDate: '2024-03-20', status: 'warning', assignee: '王五' }
])

const customColumns = [
  { prop: 'name', label: '任务名称', width: 150 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'assignee', label: '负责人', width: 100 }
]
</${_S}>`

// --- 事件处理代码 ---
const tsEventHandling = `<${_T}>
  <div style="height: 400px; width: 100%;">
    <div style="margin-bottom: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <div style="font-weight: 600; margin-bottom: 8px;">📝 事件日志：</div>
      <div v-for="(log, index) in eventLog" :key="index" style="font-size: 13px; color: #666; line-height: 1.6;">
        {{ log }}
      </div>
      <div v-if="eventLog.length === 0" style="font-size: 13px; color: #999;">
        点击、双击或拖动任务查看事件触发...
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
  { id: 't1', name: '点击我试试', startDate: '2024-03-01', endDate: '2024-03-05', progress: 60 },
  { id: 't2', name: '拖动我试试', startDate: '2024-03-06', endDate: '2024-03-10', progress: 40 },
  { id: 't3', name: '双击我试试', startDate: '2024-03-11', endDate: '2024-03-15', progress: 80 }
])

const eventLog = ref<string[]>([])

const handleTaskClick = (task: any) => {
  eventLog.value.unshift(\`✅ 点击了任务: \${task.name}\`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

const handleTaskDblClick = (task: any) => {
  eventLog.value.unshift(\`🔔 双击了任务: \${task.name}\`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

const handleDragEnd = (task: any) => {
  eventLog.value.unshift(\`🚀 拖动结束: \${task.name} (\${task.startDate} ~ \${task.endDate})\`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

const columns = [
  { prop: 'name', label: '任务名称', width: 180 }
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

## 基础用法

甘特图组件旨在通过直观的时间轴展示任务进度及依赖关系。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 400px; width: 100%;">
    <yh-gantt-chart
      v-model:data="ganttData"
      :columns="columns"
      draggable
      style="height: 100%"
    />
  </div>
</DemoBlock>

## 交互、搜索与缩放

内置一体化工具栏，支持**关键词搜索**、**无级缩放**（滑块调整）以及**视图模式**一键切换。开启 `draggable` 后，支持拖拽调整时间和进度。

<DemoBlock title="交互示例" :ts-code="tsDrag" :js-code="jsDrag">
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

## 里程碑 (Milestone)

当任务的开始日期和结束日期为同一天时，组件会自动将其渲染为**菱形象征物**，即里程碑。

::: tip 自动识别
您只需将 `startDate` 和 `endDate` 设置为同一个值（如同一天的零点），组件内部会自动转换为里程碑样式。
:::

## 树形结构与汇总 (Rollup)

支持任务层级嵌套。父任务的时间会自动汇总子任务的时间范围。此外，系统自动渲染 **树形导线 (Tree Lines)** 以便于观察复杂的从属关系。

### 摘要条样式 (Summary Bar)

汇总任务在时间轴上会以特殊的样式（摘要条）展示，其两端带有向下延伸的垂直标记（挂耳），符合工业界主流甘特图视觉规范。

<DemoBlock title="树形演示" :ts-code="tsTree" :js-code="jsTree">
  <div style="height: 300px; width: 100%;">
    <yh-gantt-chart
      v-model:data="treeData"
      :columns="columns"
      draggable
      style="height: 100%"
    />
  </div>
</DemoBlock>

## 自动排程

修改前置任务会导致后置任务自动联动。

<DemoBlock title="自动排程演示" :ts-code="tsSchedule" :js-code="jsSchedule">
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

## 大数量虚拟滚动

支持渲染海量数据而不卡顿。

<DemoBlock title="虚拟滚动演示" :ts-code="tsVirtual" :js-code="jsVirtual">
  <div style="height: 500px; width: 100%;">
    <yh-gantt-chart
      v-model:data="largeData"
      :columns="columns"
      virtual
      style="height: 100%"
    />
  </div>
</DemoBlock>

## 资源冲突检测

智能识别并高亮资源分配冲突。

<DemoBlock title="资源冲突演示" :ts-code="tsResource" :js-code="jsResource">
  <div style="height: 300px; width: 100%;">
    <yh-gantt-chart
      v-model:data="resourceData"
      :columns="columns"
      show-resource-load
      style="height: 100%"
    />
  </div>
</DemoBlock>

## 高级用法

### 自定义任务渲染

通过 `task-content` 插槽可以完全自定义任务块的显示内容，添加图标、进度百分比等元素。

<DemoBlock title="自定义任务渲染" :ts-code="tsCustomRender" :js-code="jsCustomRender">
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

### 自定义表格单元格

通过 `table-cell` 插槽可以为侧边栏的每个单元格自定义渲染，实现状态标签、头像等复杂展示。

<DemoBlock title="自定义表格单元格" :ts-code="tsCustomCell" :js-code="jsCustomCell">
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
            {{ row.status === 'success' ? '已完成' : row.status === 'warning' ? '进行中' : '计划中' }}
          </span>
        </div>
        <span v-else>{{ row[column.prop] }}</span>
      </template>
    </yh-gantt-chart>
  </div>
</DemoBlock>

### 事件处理

监听各种交互事件以实现自定义逻辑。支持点击、双击、拖拽等多种事件。

<DemoBlock title="事件处理示例" :ts-code="tsEventHandling" :js-code="jsEventHandling">
  <div style="height: 400px; width: 100%;">
    <div style="margin-bottom: 12px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <div style="font-weight: 600; margin-bottom: 8px;">📝 事件日志：</div>
      <div v-for="(log, index) in eventLog" :key="index" style="font-size: 13px; color: #666; line-height: 1.6;">
        {{ log }}
      </div>
      <div v-if="eventLog.length === 0" style="font-size: 13px; color: #999;">
        点击、双击或拖动任务查看事件触发...
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

## 最佳实践

### 性能优化

1. **大数据集使用虚拟滚动**：当任务数量超过 100 时，建议开启 `virtual` 属性
2. **合理设置视图模式**：对于跨度较长的项目，使用 `week` 或 `month` 视图
3. **按需加载子任务**：对于深层嵌套的树形结构，考虑懒加载子节点

```vue
<yh-gantt-chart v-model:data="tasks" :columns="columns" virtual view-mode="week" :row-height="40" />
```

### 数据结构建议

```typescript
// ✅ 推荐：使用 ISO 8601 日期格式
const task = {
  id: 'task-1',
  name: '开发任务',
  startDate: '2024-03-01',
  endDate: '2024-03-15',
  progress: 60
}

// ✅ 推荐：明确的依赖关系
const tasks = [
  { id: 't1', name: '需求分析', startDate: '2024-03-01', endDate: '2024-03-05' },
  { id: 't2', name: '设计', startDate: '2024-03-06', endDate: '2024-03-10', dependencies: ['t1'] },
  { id: 't3', name: '开发', startDate: '2024-03-11', endDate: '2024-03-20', dependencies: ['t2'] }
]
```

### 资源管理

合理分配资源以避免冲突：

```typescript
const tasks = [
  {
    id: 'task-1',
    name: '前端开发',
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    assignees: ['developer-1', 'developer-2']
  },
  {
    id: 'task-2',
    name: '后端开发',
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    assignees: ['developer-3'] // 避免与 task-1 的资源冲突
  }
]
```

## 常见问题

### 如何导出甘特图为图片？

可以使用 [`html2canvas`](https://html2canvas.hertzen.com/) 库：

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

### 如何实现任务的批量操作？

```typescript
// 批量更新任务状态
const updateTasksStatus = (taskIds: string[], status: string) => {
  tasks.value = tasks.value.map((task) => {
    if (taskIds.includes(task.id)) {
      return { ...task, status }
    }
    return task
  })
}

// 批量删除任务
const deleteTasks = (taskIds: string[]) => {
  tasks.value = tasks.value.filter((task) => !taskIds.includes(task.id))
}
```

### 如何自定义时间轴刻度？

通过 `view-mode` 和缩放功能可以调整时间轴显示：

```vue
<yh-gantt-chart v-model:data="tasks" v-model:view-mode="viewMode" :columns="columns" />

<!-- 工具栏中会自动显示视图切换按钮 -->
```

### 如何处理跨时区的任务？

建议统一使用 UTC 时间或明确指定时区：

```typescript
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const task = {
  id: 'task-1',
  name: '全球会议',
  startDate: dayjs.tz('2024-03-01 09:00', 'America/New_York').toISOString(),
  endDate: dayjs.tz('2024-03-01 10:00', 'America/New_York').toISOString()
}
```

## 在 Nuxt 中使用

GanttChart 组件完全支持 Nuxt 3/4 的 SSR（服务端渲染）。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="height: 300px; border: 1px solid var(--yh-border-color-light); border-radius: 4px; overflow: hidden;">
    <yh-gantt-chart
      v-model:data="nuxtData"
      v-model:view-mode="nuxtViewMode"
      :columns="columns"
      draggable
    />
  </div>
</DemoBlock>

**SSR 兼容性说明**：

- ✅ **首屏渲染**：甘特图的初始结构、任务列表和时间轴刻度均支持服务端渲染，提升 SEO 和首屏速度。
- ✅ **状态同步**：支持 `v-model:data` 和 `v-model:view-mode` 的双向绑定，确保 SSR 状态在客户端完美激活（Hydrate）。
- ✅ **自动导入**：在 Nuxt 配置文件中启用 YH-UI 后，所有相关组件及类型均可直接使用。
- ⚠️ **浏览器 API**：拖拽交互和滚动监听仅在客户端环境生效，已做好环境隔离处理。

::: tip 生产环境建议
对于包含上千条任务的大型项目，在 Nuxt 环境中建议开启 `virtual` 属性以获得极致的滚动性能。
:::

## API

### Props

| 属性名             | 说明                             | 类型                                   | 默认值                                              |
| ------------------ | -------------------------------- | -------------------------------------- | --------------------------------------------------- |
| data               | 任务数据，支持树形结构           | `GanttTask[]`                          | `[]`                                                |
| columns            | 左侧表格列定义                   | `GanttColumn[]`                        | `[{ prop: 'name', label: '任务名称', width: 200 }]` |
| view-mode          | 视图模式，控制时间轴粒度         | `'day' \| 'week' \| 'month' \| 'year'` | `'day'`                                             |
| start-date         | 强制指定甘特图开始日期           | `Date \| string`                       | 自动计算                                            |
| end-date           | 强制指定甘特图结束日期           | `Date \| string`                       | 自动计算                                            |
| draggable          | 是否允许拖拽调整任务时间         | `boolean`                              | `false`                                             |
| progress-draggable | 是否允许拖拽调整进度             | `boolean`                              | `false`                                             |
| auto-schedule      | 是否开启自动排程（依赖任务联动） | `boolean`                              | `true`                                              |
| virtual            | 是否开启虚拟滚动（大数据优化）   | `boolean`                              | `false`                                             |
| show-resource-load | 是否显示资源负荷检测             | `boolean`                              | `true`                                              |
| show-dependencies  | 是否显示任务依赖连线             | `boolean`                              | `true`                                              |
| row-height         | 行高（像素）                     | `number`                               | `40`                                                |
| header-height      | 头部高度（像素）                 | `number`                               | `60`                                                |
| bordered           | 是否显示边框                     | `boolean`                              | `true`                                              |
| loading            | 是否显示加载状态                 | `boolean`                              | `false`                                             |
| theme-overrides    | 主题变量覆盖                     | `ComponentThemeVars`                   | —                                                   |

### Events

| 事件名            | 说明                   | 回调参数                                              |
| ----------------- | ---------------------- | ----------------------------------------------------- |
| update:data       | 任务数据更新时触发     | `(data: GanttTask[])`                                 |
| update:view-mode  | 视图模式变化时触发     | `(mode: GanttViewMode)`                               |
| task-click        | 点击任务块时触发       | `(task: GanttTask, event: MouseEvent)`                |
| task-dblclick     | 双击任务块时触发       | `(task: GanttTask, event: MouseEvent)`                |
| task-drag-end     | 结束任务时间拖拽时触发 | `(task: GanttTask)`                                   |
| progress-drag-end | 结束进度拖拽时触发     | `(task: GanttTask)`                                   |
| dependency-click  | 点击依赖连线时触发     | `(from: GanttTask, to: GanttTask, event: MouseEvent)` |

### Slots

| 插槽名       | 说明                   | 参数                                                     |
| ------------ | ---------------------- | -------------------------------------------------------- |
| task-content | 自定义任务块内部内容   | `{ task: GanttTask }`                                    |
| table-cell   | 自定义侧边栏表格单元格 | `{ row: GanttTask, column: GanttColumn, index: number }` |
| tooltip      | 自定义悬浮提示内容     | `{ task: GanttTask }`                                    |

### GanttTask 类型

| 属性名       | 说明                   | 类型                                                        | 必填 |
| ------------ | ---------------------- | ----------------------------------------------------------- | ---- |
| id           | 唯一标识               | `string \| number`                                          | ✅   |
| name         | 任务名称               | `string`                                                    | ✅   |
| startDate    | 开始日期               | `string \| number \| Date`                                  | ✅   |
| endDate      | 结束日期               | `string \| number \| Date`                                  | ✅   |
| progress     | 进度 (0-100)           | `number`                                                    | ❌   |
| dependencies | 依赖的任务 ID 列表     | `(string \| number)[]`                                      | ❌   |
| children     | 子任务列表 (Tree Data) | `GanttTask[]`                                               | ❌   |
| assignees    | 资源负责人 ID 列表     | `string[]`                                                  | ❌   |
| status       | 状态预设（影响颜色）   | `'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | ❌   |
| color        | 自定义背景色           | `string`                                                    | ❌   |
| textColor    | 自定义文字颜色         | `string`                                                    | ❌   |
| parentId     | 父任务 ID              | `string \| number`                                          | ❌   |
| expanded     | 是否展开（树形结构）   | `boolean`                                                   | ❌   |

### GanttColumn 类型

| 属性名 | 说明     | 类型                            | 默认值   |
| ------ | -------- | ------------------------------- | -------- |
| prop   | 字段名   | `string`                        | —        |
| label  | 列标题   | `string`                        | —        |
| width  | 列宽度   | `string \| number`              | `auto`   |
| align  | 对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |

## 主题变量

| 变量名                       | 说明       | 默认值                           |
| ---------------------------- | ---------- | -------------------------------- |
| `--yh-gantt-border-color`    | 边框颜色   | `var(--yh-border-color-light)`   |
| `--yh-gantt-bg-color`        | 背景颜色   | `var(--yh-bg-color)`             |
| `--yh-gantt-header-bg-color` | 头部背景色 | `var(--yh-fill-color-light)`     |
| `--yh-gantt-task-color`      | 任务块主色 | `var(--yh-color-primary)`        |
| `--yh-gantt-line-color`      | 网格线颜色 | `var(--yh-border-color-lighter)` |
