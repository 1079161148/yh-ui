# Table 表格 - 行拖拽

通过 `drag-config` 配置行拖拽功能，支持拖拽排序、拖拽手柄、拖拽事件监听等能力。

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 1. 拖拽调整行顺序 ====================

const dragData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部' },
  { id: 2, name: '李四', age: 32, dept: '产品部' },
  { id: 3, name: '王五', age: 25, dept: '设计部' },
  { id: 4, name: '赵六', age: 30, dept: '运营部' },
  { id: 5, name: '钱七', age: 27, dept: '市场部' },
  { id: 6, name: '孙八', age: 35, dept: '人事部' }
])

const dragColumns = [
  { prop: 'id', label: '序号', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门' }
]

const handleDragEnd1 = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  console.log('拖拽完成:', params)
}

// ==================== 2. 拖拽手柄 ====================

const handleData = ref([
  { id: 1, name: '需求评审', priority: '高', status: '进行中' },
  { id: 2, name: 'UI 设计', priority: '高', status: '已完成' },
  { id: 3, name: '前端开发', priority: '中', status: '待开始' },
  { id: 4, name: '后端开发', priority: '中', status: '待开始' },
  { id: 5, name: '测试', priority: '低', status: '待开始' },
  { id: 6, name: '上线', priority: '低', status: '待开始' }
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
  { prop: 'id', label: '序号', width: 80 },
  { prop: 'name', label: '任务名称', width: 160 },
  { prop: 'priority', label: '优先级', width: 100 },
  { prop: 'status', label: '状态' }
]

// ==================== 3. 冻结列 + 拖拽 ====================

const fixedDragData = ref([
  { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000, city: '北京', phone: '13800001111' },
  { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000, city: '上海', phone: '13800002222' },
  { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000, city: '广州', phone: '13800003333' },
  { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000, city: '深圳', phone: '13800004444' },
  { id: 5, name: '钱七', dept: '市场部', position: '市场经理', salary: 16000, city: '杭州', phone: '13800005555' }
])

const fixedDragColumns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 150 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'phone', label: '手机号', width: 150, fixed: 'right' as const }
]

// ==================== 4. 拖拽事件 ====================

const eventData = ref([
  { id: 1, name: '第一项', order: 1 },
  { id: 2, name: '第二项', order: 2 },
  { id: 3, name: '第三项', order: 3 },
  { id: 4, name: '第四项', order: 4 },
  { id: 5, name: '第五项', order: 5 }
])

const eventColumns = [
  { prop: 'order', label: '排序', width: 80 },
  { prop: 'name', label: '名称', width: 150 },
  { prop: 'id', label: 'ID' }
]

const dragEventLog = ref<string[]>([])

const handleDragStart = (params: { type: string; data: unknown; index: number }) => {
  dragEventLog.value.unshift(`[拖拽开始] 索引: ${params.index}`)
  if (dragEventLog.value.length > 8) dragEventLog.value.pop()
}

const handleDragEndEvent = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  dragEventLog.value.unshift(`[拖拽结束] 从 ${params.oldIndex} 移到 ${params.newIndex}`)
  if (dragEventLog.value.length > 8) dragEventLog.value.pop()
  // 更新排序号
  eventData.value.forEach((item, idx) => {
    item.order = idx + 1
  })
}

// ==================== 5. 树形拖拽 ====================

const treeDragData = ref([
  {
    id: 1,
    name: '技术部',
    manager: '张总',
    children: [
      {
        id: 11,
        name: '前端组',
        manager: '李组长',
        children: [
          { id: 111, name: '张三', manager: '' },
          { id: 112, name: '李四', manager: '' }
        ]
      },
      {
        id: 12,
        name: '后端组',
        manager: '王组长',
        children: [
          { id: 121, name: '王五', manager: '' },
          { id: 122, name: '赵六', manager: '' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '产品部',
    manager: '刘总',
    children: [
      { id: 21, name: '产品一组', manager: '陈组长' },
      { id: 22, name: '产品二组', manager: '黄组长' }
    ]
  }
])

const treeDragColumns = [
  { prop: 'name', label: '名称', treeNode: true },
  { prop: 'manager', label: '负责人', width: 120 }
]

// ==================== 示例代码 ====================

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
  { id: 1, name: '张三', age: 28, dept: '技术部' },
  { id: 2, name: '李四', age: 32, dept: '产品部' },
  { id: 3, name: '王五', age: 25, dept: '设计部' },
  { id: 4, name: '赵六', age: 30, dept: '运营部' },
  { id: 5, name: '钱七', age: 27, dept: '市场部' },
  { id: 6, name: '孙八', age: 35, dept: '人事部' }
])

const columns = [
  { prop: 'id', label: '序号', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门' }
]

interface DragEndParams {
  type: 'row' | 'column'
  oldIndex: number
  newIndex: number
  data: unknown[]
}

const handleDragEnd = (params: DragEndParams) => {
  console.log('拖拽完成:', params)
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
  { id: 1, name: '需求评审', priority: '高', status: '进行中' },
  { id: 2, name: 'UI 设计', priority: '高', status: '已完成' },
  { id: 3, name: '前端开发', priority: '中', status: '待开始' },
  { id: 4, name: '后端开发', priority: '中', status: '待开始' },
  { id: 5, name: '测试', priority: '低', status: '待开始' },
  { id: 6, name: '上线', priority: '低', status: '待开始' }
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
  { prop: 'id', label: '序号', width: 80 },
  { prop: 'name', label: '任务名称', width: 160 },
  { prop: 'priority', label: '优先级', width: 100 },
  { prop: 'status', label: '状态' }
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
  { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000, city: '北京', phone: '13800001111' },
  { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000, city: '上海', phone: '13800002222' },
  { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000, city: '广州', phone: '13800003333' },
  { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000, city: '深圳', phone: '13800004444' },
  { id: 5, name: '钱七', dept: '市场部', position: '市场经理', salary: 16000, city: '杭州', phone: '13800005555' }
])

interface ColumnType {
  prop: string
  label: string
  width?: number
  fixed?: 'left' | 'right'
}

const columns: ColumnType[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 150 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'phone', label: '手机号', width: 150, fixed: 'right' }
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
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">事件日志：</p>
      <div v-for="(log, idx) in eventLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: #fff; border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="eventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">暂无事件</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '第一项', order: 1 },
  { id: 2, name: '第二项', order: 2 },
  { id: 3, name: '第三项', order: 3 },
  { id: 4, name: '第四项', order: 4 },
  { id: 5, name: '第五项', order: 5 }
])

const columns = [
  { prop: 'order', label: '排序', width: 80 },
  { prop: 'name', label: '名称', width: 150 },
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
  eventLog.value.unshift(\`[拖拽开始] 索引: \${params.index}\`)
  if (eventLog.value.length > 8) eventLog.value.pop()
}

const handleDragEnd = (params: DragEndParams) => {
  eventLog.value.unshift(\`[拖拽结束] 从 \${params.oldIndex} 移到 \${params.newIndex}\`)
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
    name: '技术部',
    manager: '张总',
    children: [
      {
        id: 11,
        name: '前端组',
        manager: '李组长',
        children: [
          { id: 111, name: '张三', manager: '' },
          { id: 112, name: '李四', manager: '' }
        ]
      },
      {
        id: 12,
        name: '后端组',
        manager: '王组长',
        children: [
          { id: 121, name: '王五', manager: '' },
          { id: 122, name: '赵六', manager: '' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '产品部',
    manager: '刘总',
    children: [
      { id: 21, name: '产品一组', manager: '陈组长' },
      { id: 22, name: '产品二组', manager: '黄组长' }
    ]
  }
])

const columns = [
  { prop: 'name', label: '名称', treeNode: true },
  { prop: 'manager', label: '负责人', width: 120 }
]
</${_S}>`

const jsTreeDrag = toJs(tsTreeDrag)
</script>

## 拖拽调整行顺序

设置 `drag-config` 的 `row: true` 开启行拖拽排序。鼠标按住行即可拖动。

<DemoBlock title="拖拽调整行顺序" :ts-code="tsBasicDrag" :js-code="jsBasicDrag">
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

## 自定义拖拽手柄

通过 `drag-config.handle` 指定拖拽手柄的 CSS 选择器，仅在手柄区域拖动才能触发拖拽，避免误操作。

<DemoBlock title="拖拽手柄" :ts-code="tsHandleDrag" :js-code="jsHandleDrag">
  <yh-table
    :data="handleData"
    :columns="handleColumns"
    :drag-config="{ row: true, handle: '.drag-handle', animation: 300 }"
    border
    row-key="id"
    @update:data="handleData = $event"
  />
</DemoBlock>

## 冻结列 + 拖拽

行拖拽可以与固定列 (`fixed`) 配合使用。

<DemoBlock title="冻结列 + 行拖拽" :ts-code="tsFixedDrag" :js-code="jsFixedDrag">
  <yh-table
    :data="fixedDragData"
    :columns="fixedDragColumns"
    :drag-config="{ row: true, animation: 300 }"
    border
    row-key="id"
    @update:data="fixedDragData = $event"
  />
</DemoBlock>

## 拖拽事件

通过 `drag-config` 的 `onDragStart` 和 `onDragEnd` 回调，或监听 `drag-end` 事件，获取拖拽状态信息。

<DemoBlock title="拖拽事件" :ts-code="tsEventDrag" :js-code="jsEventDrag">
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
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">事件日志：</p>
      <div v-for="(log, idx) in dragEventLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: var(--yh-bg-color, #fff); border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="dragEventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">拖拽行以查看事件日志</p>
    </div>
  </div>
</DemoBlock>

## 树结构拖拽

行拖拽可以与树形数据 (`tree-config`) 配合使用，支持拖拽树节点调整顺序。

<DemoBlock title="树形数据拖拽" :ts-code="tsTreeDrag" :js-code="jsTreeDrag">
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

### DragConfig 拖拽配置

通过 `drag-config` 属性传入。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row | 是否可拖拽行 | `boolean` | `false` |
| column | 是否可拖拽列 | `boolean` | `false` |
| handle | 拖拽手柄 CSS 选择器 | `string` | — |
| animation | 动画时长（毫秒） | `number` | `150` |
| onDragStart | 拖拽开始回调 | `({ type, data, index }) => void` | — |
| onDragEnd | 拖拽结束回调 | `({ type, oldIndex, newIndex, data }) => void` | — |
| crossTable | 是否支持跨表格拖拽 | `boolean` | `false` |
| dragClass | 拖拽时的样式类 | `string` | — |
| ghostClass | 幽灵元素样式类 | `string` | — |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| drag-end | 拖拽结束时触发 | `{ type: 'row' \| 'column', oldIndex: number, newIndex: number, data: unknown[] }` |

### onDragStart 回调参数

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| type | 拖拽类型 | `'row' \| 'column'` |
| data | 被拖拽的数据 | `unknown` |
| index | 被拖拽的索引 | `number` |

### onDragEnd 回调参数

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| type | 拖拽类型 | `'row' \| 'column'` |
| oldIndex | 拖拽前索引 | `number` |
| newIndex | 拖拽后索引 | `number` |
| data | 拖拽后的数据 | `unknown[]` |

