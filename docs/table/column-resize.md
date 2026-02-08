# Table 表格 - 列宽调整

通过 `resizable` 属性开启列宽拖拽调整功能。用户可以在列头边缘拖拽改变列宽。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 1. 拖拽模式 ====================

const resizeData = ref([
  { id: 1, date: '2024-01-01', name: '张三', province: '北京', city: '朝阳区', address: '建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', province: '上海', city: '浦东新区', address: '陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', province: '广东', city: '天河区', address: '珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', province: '浙江', city: '西湖区', address: '文三路' },
  { id: 5, date: '2024-01-05', name: '钱七', province: '江苏', city: '鼓楼区', address: '中山北路' }
])

const resizeColumns = [
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'province', label: '省份', width: 100 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'address', label: '地址' }
]

const handleColumnResize = (column: { prop?: string; label?: string }, width: number) => {
  console.log(`列 "${column.label}" 宽度调整为: ${width}px`)
}

// ==================== 2. 分组列头 ====================

const groupResizeData = ref([
  { id: 1, name: '张三', age: 28, province: '北京', city: '朝阳区', address: '建国路88号', zip: '100020' },
  { id: 2, name: '李四', age: 32, province: '上海', city: '浦东新区', address: '陆家嘴环路', zip: '200120' },
  { id: 3, name: '王五', age: 25, province: '广东', city: '天河区', address: '珠江新城', zip: '510623' },
  { id: 4, name: '赵六', age: 30, province: '浙江', city: '西湖区', address: '文三路', zip: '310012' }
])

const groupResizeColumns = [
  {
    label: '基本信息',
    children: [
      { prop: 'name', label: '姓名', width: 100 },
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
]

// ==================== 3. 冻结列 + 调整 ====================

const fixedResizeData = ref([
  { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000, city: '北京', phone: '13800001111' },
  { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000, city: '上海', phone: '13800002222' },
  { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000, city: '广州', phone: '13800003333' },
  { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000, city: '深圳', phone: '13800004444' }
])

const fixedResizeColumns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 150 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'phone', label: '手机号', width: 150, fixed: 'right' as const }
]

// ==================== 4. 限制最小列宽 ====================

const minWidthData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', desc: '系统超级管理员，拥有所有权限' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', desc: '内容编辑，负责文章审核和发布' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '查看者', desc: '只读权限，仅可查看数据' }
])

const minWidthColumns = [
  { prop: 'id', label: 'ID', width: 80, minWidth: 60 },
  { prop: 'name', label: '姓名', width: 120, minWidth: 80 },
  { prop: 'email', label: '邮箱', width: 200, minWidth: 150 },
  { prop: 'role', label: '角色', width: 120, minWidth: 80 },
  { prop: 'desc', label: '描述', minWidth: 120 }
]

// ==================== 5. 列级别配置 ====================

const perColumnData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', position: '前端工程师' },
  { id: 2, name: '李四', age: 32, dept: '产品部', position: '产品经理' },
  { id: 3, name: '王五', age: 25, dept: '设计部', position: 'UI 设计师' },
  { id: 4, name: '赵六', age: 30, dept: '运营部', position: '运营总监' }
])

const perColumnColumns = [
  { prop: 'id', label: 'ID', width: 80, resizable: false },
  { prop: 'name', label: '姓名', width: 120, resizable: true },
  { prop: 'age', label: '年龄', width: 80, resizable: false },
  { prop: 'dept', label: '部门', width: 120, resizable: true },
  { prop: 'position', label: '职位', resizable: true }
]

// ==================== 6. 事件监听 ====================

const eventResizeData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部' },
  { id: 2, name: '李四', age: 32, dept: '产品部' },
  { id: 3, name: '王五', age: 25, dept: '设计部' }
])

const eventResizeColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门' }
]

const resizeLog = ref<string[]>([])

const handleResizeEvent = (column: { label?: string }, width: number) => {
  resizeLog.value.unshift(`[列宽变化] ${column.label}: ${Math.round(width)}px`)
  if (resizeLog.value.length > 6) resizeLog.value.pop()
}

// ==================== 示例代码 ====================

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
  { id: 1, date: '2024-01-01', name: '张三', province: '北京', city: '朝阳区', address: '建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', province: '上海', city: '浦东新区', address: '陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', province: '广东', city: '天河区', address: '珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', province: '浙江', city: '西湖区', address: '文三路' },
  { id: 5, date: '2024-01-05', name: '钱七', province: '江苏', city: '鼓楼区', address: '中山北路' }
])

const columns = [
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'province', label: '省份', width: 100 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'address', label: '地址' }
]

interface ColumnType {
  prop?: string
  label?: string
}

const handleResize = (column: ColumnType, width: number) => {
  console.log(\`列 "\${column.label}" 宽度调整为: \${width}px\`)
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
  { id: 1, name: '张三', age: 28, province: '北京', city: '朝阳区', address: '建国路88号', zip: '100020' },
  { id: 2, name: '李四', age: 32, province: '上海', city: '浦东新区', address: '陆家嘴环路', zip: '200120' },
  { id: 3, name: '王五', age: 25, province: '广东', city: '天河区', address: '珠江新城', zip: '510623' },
  { id: 4, name: '赵六', age: 30, province: '浙江', city: '西湖区', address: '文三路', zip: '310012' }
])

const columns = [
  {
    label: '基本信息',
    children: [
      { prop: 'name', label: '姓名', width: 100 },
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
  { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000, city: '北京', phone: '13800001111' },
  { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000, city: '上海', phone: '13800002222' },
  { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000, city: '广州', phone: '13800003333' },
  { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000, city: '深圳', phone: '13800004444' }
])

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

const jsFixedResize = toJs(tsFixedResize);

const tsMinWidth = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    提示: ID 最小 60px，姓名最小 80px，邮箱最小 150px，角色最小 80px，描述最小 120px
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
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', desc: '系统超级管理员，拥有所有权限' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', desc: '内容编辑，负责文章审核和发布' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '查看者', desc: '只读权限，仅可查看数据' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80, minWidth: 60 },
  { prop: 'name', label: '姓名', width: 120, minWidth: 80 },
  { prop: 'email', label: '邮箱', width: 200, minWidth: 150 },
  { prop: 'role', label: '角色', width: 120, minWidth: 80 },
  { prop: 'desc', label: '描述', minWidth: 120 }
]
</${_S}>`

const jsMinWidth = toJs(tsMinWidth);

const tsPerColumn = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    提示: "ID" 和 "年龄" 列不可调整宽度（resizable: false）
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
  { id: 1, name: '张三', age: 28, dept: '技术部', position: '前端工程师' },
  { id: 2, name: '李四', age: 32, dept: '产品部', position: '产品经理' },
  { id: 3, name: '王五', age: 25, dept: '设计部', position: 'UI 设计师' },
  { id: 4, name: '赵六', age: 30, dept: '运营部', position: '运营总监' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80, resizable: false },
  { prop: 'name', label: '姓名', width: 120, resizable: true },
  { prop: 'age', label: '年龄', width: 80, resizable: false },
  { prop: 'dept', label: '部门', width: 120, resizable: true },
  { prop: 'position', label: '职位', resizable: true }
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
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">列宽变化日志：</p>
      <div v-for="(log, idx) in resizeLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: #fff; border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="resizeLog.length === 0" style="color: #c0c4cc; font-size: 12px;">拖拽列边缘以查看日志</p>
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

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门' }
]

const resizeLog = ref<string[]>([])

interface ColumnType {
  label?: string
}

const handleResize = (column: ColumnType, width: number) => {
  resizeLog.value.unshift(\`[列宽变化] \${column.label}: \${Math.round(width)}px\`)
  if (resizeLog.value.length > 6) resizeLog.value.pop()
}
</${_S}>`

const jsEventResize = toJs(tsEventResize);
</script>

## 拖拽模式

设置 `resizable` 属性为 `true` 即可开启列宽调整功能。用户可在列头右侧边缘拖拽调整列宽。

<DemoBlock title="基本列宽调整" :ts-code="tsBasicResize" :js-code="jsBasicResize">
  <yh-table
    :data="resizeData"
    :columns="resizeColumns"
    resizable
    border
    @column-resize="handleColumnResize"
  />
</DemoBlock>

## 分组列头

列宽调整与分组表头 (`children`) 兼容，可以调整分组表头下的子列宽度。

<DemoBlock title="分组列头 + 列宽调整" :ts-code="tsGroupResize" :js-code="jsGroupResize">
  <yh-table
    :data="groupResizeData"
    :columns="groupResizeColumns"
    resizable
    border
  />
</DemoBlock>

## 冻结列

列宽调整可以与固定列 (`fixed`) 配合使用。

<DemoBlock title="冻结列 + 列宽调整" :ts-code="tsFixedResize" :js-code="jsFixedResize">
  <yh-table
    :data="fixedResizeData"
    :columns="fixedResizeColumns"
    resizable
    border
  />
</DemoBlock>

## 限制拖拽最小列宽

通过列配置的 `minWidth` 限制列的最小宽度，防止列被拖拽过窄。

<DemoBlock title="限制最小列宽" :ts-code="tsMinWidth" :js-code="jsMinWidth">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    提示: ID 最小 60px，姓名最小 80px，邮箱最小 150px，角色最小 80px，描述最小 120px
  </p>
  <yh-table
    :data="minWidthData"
    :columns="minWidthColumns"
    resizable
    border
  />
</DemoBlock>

## 列级别配置

通过列配置的 `resizable` 属性，可以单独控制某一列是否可调整宽度。

<DemoBlock title="列级别 resizable 控制" :ts-code="tsPerColumn" :js-code="jsPerColumn">
  <p style="margin-bottom: 12px; color: #909399; font-size: 13px;">
    提示: "ID" 和 "年龄" 列不可调整宽度（resizable: false）
  </p>
  <yh-table
    :data="perColumnData"
    :columns="perColumnColumns"
    border
  />
</DemoBlock>

## 事件监听

通过 `column-resize` 事件监听列宽变化，获取当前列和新的宽度值。

<DemoBlock title="列宽变化事件" :ts-code="tsEventResize" :js-code="jsEventResize">
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
      <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">列宽变化日志：</p>
      <div v-for="(log, idx) in resizeLog" :key="idx"
        style="padding: 4px 8px; margin-bottom: 4px; font-size: 12px; background: var(--yh-bg-color, #fff); border-radius: 4px; color: #606266;">
        {{ log }}
      </div>
      <p v-if="resizeLog.length === 0" style="color: #c0c4cc; font-size: 12px;">拖拽列边缘以查看日志</p>
    </div>
  </div>
</DemoBlock>

## API

### Table Props（列宽调整相关）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| resizable | 全局开启列宽调整 | `boolean` | `false` |

### TableColumn Props（列宽调整相关）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 列宽度（像素或百分比） | `number \| string` | — |
| minWidth | 最小列宽（拖拽时最小不低于 40px） | `number \| string` | — |
| maxWidth | 最大列宽 | `number \| string` | — |
| resizable | 该列是否可调整宽度（优先级高于全局 resizable） | `boolean` | — |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| column-resize | 列宽变化时触发 | `(column: TableColumn, width: number)` |

### 注意事项

1. **建议设置 `border`**：带边框的表格可以更清晰地看到列边界和拖拽区域。
2. **设置初始宽度**：建议每一列都设置 `width`，以确保列宽调整的计算准确。
3. **`minWidth` 优先**：拖拽时如果列宽小于 `minWidth`，将被限制在最小宽度。
4. **列级别覆盖**：列配置中的 `resizable` 会覆盖全局 `resizable` 设置。

