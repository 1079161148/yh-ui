# Table 表格 - 列拖拽

通过 `drag-config` 配置列拖拽功能，支持拖拽调整列顺序、自定义拖拽样式、拖拽事件监听等能力。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 1. 拖拽调整列顺序 ====================

const colDragData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', position: '前端工程师', city: '北京' },
  { id: 2, name: '李四', age: 32, dept: '产品部', position: '产品经理', city: '上海' },
  { id: 3, name: '王五', age: 25, dept: '设计部', position: 'UI 设计师', city: '广州' },
  { id: 4, name: '赵六', age: 30, dept: '运营部', position: '运营总监', city: '深圳' },
  { id: 5, name: '钱七', age: 27, dept: '市场部', position: '市场经理', city: '杭州' }
])

const colDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 150 },
  { prop: 'city', label: '城市' }
])

const handleColDragEnd = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  console.log('列拖拽完成:', params)
}

// ==================== 2. 冻结列 + 列拖拽 ====================

const fixedColDragData = ref([
  { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000, city: '北京', phone: '13800001111' },
  { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000, city: '上海', phone: '13800002222' },
  { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000, city: '广州', phone: '13800003333' },
  { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000, city: '深圳', phone: '13800004444' }
])

const fixedColDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: '部门', width: 120, draggable: true },
  { prop: 'position', label: '职位', width: 150, draggable: true },
  { prop: 'salary', label: '薪资', width: 120, draggable: true },
  { prop: 'city', label: '城市', width: 120, draggable: true },
  { prop: 'phone', label: '手机号', width: 150, fixed: 'right' as const }
])

// ==================== 3. 个性化列（列显示/隐藏） ====================

const personalizeData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', position: '前端工程师', email: 'zhangsan@example.com', city: '北京' },
  { id: 2, name: '李四', age: 32, dept: '产品部', position: '产品经理', email: 'lisi@example.com', city: '上海' },
  { id: 3, name: '王五', age: 25, dept: '设计部', position: 'UI 设计师', email: 'wangwu@example.com', city: '广州' }
])

const allColumns = ref([
  { prop: 'id', label: 'ID', width: 80, visible: true },
  { prop: 'name', label: '姓名', width: 120, visible: true },
  { prop: 'age', label: '年龄', width: 80, visible: true },
  { prop: 'dept', label: '部门', width: 120, visible: true },
  { prop: 'position', label: '职位', width: 150, visible: true },
  { prop: 'email', label: '邮箱', width: 200, visible: false },
  { prop: 'city', label: '城市', visible: false }
])

const toggleColumnVisible = (col: { visible?: boolean }) => {
  col.visible = !col.visible
}

// ==================== 4. 拖拽事件 ====================

const eventColDragData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部' },
  { id: 2, name: '李四', age: 32, dept: '产品部' },
  { id: 3, name: '王五', age: 25, dept: '设计部' }
])

const eventColDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门' }
])

const colDragEventLog = ref<string[]>([])

const handleColDragStartEvent = (params: { type: string; data: unknown; index: number }) => {
  colDragEventLog.value.unshift(`[拖拽开始] 列索引: ${params.index}`)
  if (colDragEventLog.value.length > 8) colDragEventLog.value.pop()
}

const handleColDragEndEvent = (params: { oldIndex: number; newIndex: number; data: unknown[] }) => {
  colDragEventLog.value.unshift(`[拖拽结束] 从 ${params.oldIndex} 移到 ${params.newIndex}`)
  if (colDragEventLog.value.length > 8) colDragEventLog.value.pop()
}

// ==================== 5. 分组表头 + 列拖拽 ====================

const groupColDragData = ref([
  { id: 1, name: '张三', age: 28, province: '北京', city: '朝阳区', address: '建国路88号', zip: '100020' },
  { id: 2, name: '李四', age: 32, province: '上海', city: '浦东新区', address: '陆家嘴环路', zip: '200120' },
  { id: 3, name: '王五', age: 25, province: '广东', city: '天河区', address: '珠江新城', zip: '510623' }
])

const groupColDragColumns = ref([
  {
    label: '基本信息',
    children: [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'age', label: '年龄', width: 80 }
    ]
  },
  {
    label: '地址信息',
    children: [
      { prop: 'province', label: '省份', width: 100 },
      { prop: 'city', label: '城市', width: 120 },
      { prop: 'address', label: '详细地址' },
      { prop: 'zip', label: '邮编', width: 100 }
    ]
  }
])

// ==================== 6. 同时行与列拖拽 ====================

const bothDragData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', score: 92 },
  { id: 2, name: '李四', age: 32, dept: '产品部', score: 88 },
  { id: 3, name: '王五', age: 25, dept: '设计部', score: 95 },
  { id: 4, name: '赵六', age: 30, dept: '运营部', score: 85 },
  { id: 5, name: '钱七', age: 27, dept: '市场部', score: 90 }
])

const bothDragColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'score', label: '评分' }
])

// ==================== 示例代码 ====================

const tsBasicColDrag = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    拖拽表头列可调整列的顺序
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
  { id: 1, name: '张三', age: 28, dept: '技术部', position: '前端工程师', city: '北京' },
  { id: 2, name: '李四', age: 32, dept: '产品部', position: '产品经理', city: '上海' },
  { id: 3, name: '王五', age: 25, dept: '设计部', position: 'UI 设计师', city: '广州' },
  { id: 4, name: '赵六', age: 30, dept: '运营部', position: '运营总监', city: '深圳' },
  { id: 5, name: '钱七', age: 27, dept: '市场部', position: '市场经理', city: '杭州' }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 150 },
  { prop: 'city', label: '城市' }
])

interface DragEndParams {
  type: 'row' | 'column'
  oldIndex: number
  newIndex: number
  data: unknown[]
}

const handleDragEnd = (params: DragEndParams) => {
  console.log('列拖拽完成:', params)
}
</${_S}>`

const jsBasicColDrag = toJs(tsBasicColDrag)

const tsFixedColDrag = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    固定列不参与拖拽，仅中间非固定列可拖拽排序
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
  { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000, city: '北京', phone: '13800001111' },
  { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000, city: '上海', phone: '13800002222' },
  { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000, city: '广州', phone: '13800003333' },
  { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000, city: '深圳', phone: '13800004444' }
])

const columns = ref<ColumnType[]>([
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'dept', label: '部门', width: 120, draggable: true },
  { prop: 'position', label: '职位', width: 150, draggable: true },
  { prop: 'salary', label: '薪资', width: 120, draggable: true },
  { prop: 'city', label: '城市', width: 120, draggable: true },
  { prop: 'phone', label: '手机号', width: 150, fixed: 'right' }
])
</${_S}>`

const jsFixedColDrag = toJs(tsFixedColDrag)

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
  { id: 1, name: '张三', age: 28, dept: '技术部', position: '前端工程师', email: 'zhangsan@example.com', city: '北京' },
  { id: 2, name: '李四', age: 32, dept: '产品部', position: '产品经理', email: 'lisi@example.com', city: '上海' },
  { id: 3, name: '王五', age: 25, dept: '设计部', position: 'UI 设计师', email: 'wangwu@example.com', city: '广州' }
])

interface ColConfig {
  prop: string
  label: string
  width?: number
  visible: boolean
}

const allCols = ref<ColConfig[]>([
  { prop: 'id', label: 'ID', width: 80, visible: true },
  { prop: 'name', label: '姓名', width: 120, visible: true },
  { prop: 'age', label: '年龄', width: 80, visible: true },
  { prop: 'dept', label: '部门', width: 120, visible: true },
  { prop: 'position', label: '职位', width: 150, visible: true },
  { prop: 'email', label: '邮箱', width: 200, visible: false },
  { prop: 'city', label: '城市', visible: false }
])

const toggleVisible = (col: ColConfig) => {
  col.visible = !col.visible
}
</${_S}>`

const jsPersonalize = toJs(tsPersonalize)

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
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">事件日志：</p>
      <div v-for="(log, idx) in eventLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: #fff; border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="eventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">拖拽列以查看事件日志</p>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部' },
  { id: 2, name: '李四', age: 32, dept: '产品部' },
  { id: 3, name: '王五', age: 25, dept: '设计部' }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门' }
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
  eventLog.value.unshift(\`[拖拽开始] 列索引: \${params.index}\`)
  if (eventLog.value.length > 8) eventLog.value.pop()
}

const handleDragEnd = (params: DragEndParams) => {
  eventLog.value.unshift(\`[拖拽结束] 从 \${params.oldIndex} 移到 \${params.newIndex}\`)
  if (eventLog.value.length > 8) eventLog.value.pop()
}
</${_S}>`

const jsEventColDrag = toJs(tsEventColDrag)

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
  { id: 1, name: '张三', age: 28, province: '北京', city: '朝阳区', address: '建国路88号', zip: '100020' },
  { id: 2, name: '李四', age: 32, province: '上海', city: '浦东新区', address: '陆家嘴环路', zip: '200120' },
  { id: 3, name: '王五', age: 25, province: '广东', city: '天河区', address: '珠江新城', zip: '510623' }
])

const columns = ref([
  {
    label: '基本信息',
    children: [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'age', label: '年龄', width: 80 }
    ]
  },
  {
    label: '地址信息',
    children: [
      { prop: 'province', label: '省份', width: 100 },
      { prop: 'city', label: '城市', width: 120 },
      { prop: 'address', label: '详细地址' },
      { prop: 'zip', label: '邮编', width: 100 }
    ]
  }
])
</${_S}>`

const jsGroupColDrag = toJs(tsGroupColDrag)

const tsBothDrag = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    同时支持拖拽行和拖拽列。拖拽表头可调整列顺序，拖拽行体可调整行顺序。
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
  { id: 1, name: '张三', age: 28, dept: '技术部', score: 92 },
  { id: 2, name: '李四', age: 32, dept: '产品部', score: 88 },
  { id: 3, name: '王五', age: 25, dept: '设计部', score: 95 },
  { id: 4, name: '赵六', age: 30, dept: '运营部', score: 85 },
  { id: 5, name: '钱七', age: 27, dept: '市场部', score: 90 }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'score', label: '评分' }
])
</${_S}>`

const jsBothDrag = toJs(tsBothDrag)
</script>

## 拖拽调整列顺序

设置 `drag-config` 的 `column: true` 开启列拖拽排序。拖拽表头列即可调整列的显示顺序。

<DemoBlock title="拖拽调整列顺序" :ts-code="tsBasicColDrag" :js-code="jsBasicColDrag">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    拖拽表头列可调整列的顺序
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

## 冻结列

列拖拽与固定列 (`fixed`) 配合使用。固定列不参与拖拽，仅中间非固定列可拖拽排序。可通过列级别 `draggable` 属性精确控制。

<DemoBlock title="冻结列 + 列拖拽" :ts-code="tsFixedColDrag" :js-code="jsFixedColDrag">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    固定列不参与拖拽，仅中间非固定列可拖拽排序
  </p>
  <yh-table
    :data="fixedColDragData"
    :columns="fixedColDragColumns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</DemoBlock>

## 个性化列

结合列拖拽和列显隐功能，实现列的个性化配置。用户可以勾选要显示的列，并拖拽调整顺序。

<DemoBlock title="个性化列（显隐 + 拖拽）" :ts-code="tsPersonalize" :js-code="jsPersonalize">
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

## 拖拽事件

通过 `drag-config` 的 `onDragStart` 和 `onDragEnd` 回调监听列拖拽事件。

<DemoBlock title="列拖拽事件" :ts-code="tsEventColDrag" :js-code="jsEventColDrag">
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
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">事件日志：</p>
      <div v-for="(log, idx) in colDragEventLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: var(--yh-bg-color, #fff); border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="colDragEventLog.length === 0" style="color: #c0c4cc; font-size: 12px;">拖拽列以查看事件日志</p>
    </div>
  </div>
</DemoBlock>

## 分组表头

列拖拽可与分组表头 (`children`) 配合使用，拖拽分组表头可整体移动列组。

<DemoBlock title="分组表头 + 列拖拽" :ts-code="tsGroupColDrag" :js-code="jsGroupColDrag">
  <yh-table
    :data="groupColDragData"
    :columns="groupColDragColumns"
    :drag-config="{ column: true, animation: 300 }"
    border
    row-key="id"
  />
</DemoBlock>

## 同时行与列拖拽

设置 `drag-config` 的 `row: true` 和 `column: true` 可同时开启行和列拖拽。拖拽表头调整列顺序，拖拽数据行调整行顺序。

<DemoBlock title="同时行与列拖拽" :ts-code="tsBothDrag" :js-code="jsBothDrag">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    同时支持拖拽行和拖拽列。拖拽表头可调整列顺序，拖拽行体可调整行顺序。
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

### DragConfig 拖拽配置（列拖拽相关）

通过 `drag-config` 属性传入。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 是否可拖拽列 | `boolean` | `false` |
| row | 是否可拖拽行（可同时开启） | `boolean` | `false` |
| animation | 动画时长（毫秒） | `number` | `150` |
| onDragStart | 拖拽开始回调 | `({ type, data, index }) => void` | — |
| onDragEnd | 拖拽结束回调 | `({ type, oldIndex, newIndex, data }) => void` | — |
| dragClass | 拖拽时的样式类 | `string` | — |
| ghostClass | 幽灵元素样式类 | `string` | — |

### TableColumn Props（列拖拽相关）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| draggable | 该列是否可拖拽排序 | `boolean` | — |
| visible | 列是否可见 | `boolean` | `true` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| drag-end | 拖拽结束时触发 | `{ type: 'row' \| 'column', oldIndex: number, newIndex: number, data: unknown[] }` |
| column-visible-change | 列可见性变化时触发 | `columns: TableColumn[]` |

### 方法（通过 ref 调用）

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| getColumns | 获取当前列信息 | — |
| setColumnVisible | 设置列可见性 | `(prop: string, visible: boolean)` |
| resetColumns | 重置所有列为可见 | — |

### 注意事项

1. **固定列不可拖拽**：设置了 `fixed` 的列默认不参与拖拽排序。
2. **列级别控制**：通过列配置的 `draggable` 属性可以精确控制每一列是否可拖拽。
3. **响应式列配置**：使用 `ref` 包裹 `columns` 配置，拖拽后列顺序会自动更新。
4. **行列同时拖拽**：同时设置 `row: true` 和 `column: true` 即可同时支持行和列拖拽，表格会自动区分操作区域。

