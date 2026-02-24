# Table 表格 - 动态列渲染

在很多业务场景中，表格的列配置并不是预先定义好的，而是根据业务逻辑或后端接口动态生成的。本章将展示如何结合响应式 API 实现灵活的动态列渲染。

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TableColumn } from '../../packages/components/src/table/src/table'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 1. 基础动态列 ====================
const dynamicData1 = ref([
  { id: 1, name: '张三', age: 28, city: '北京', hobby: '编程' },
  { id: 2, name: '李四', age: 24, city: '上海', hobby: '摄影' }
])

const dynamicColumns1 = ref<TableColumn[]>([
  { prop: 'name', label: '姓名', width: 120 }
])

const loading1 = ref(false)

const fetchColumns1 = async () => {
  loading1.value = true
  // 模拟接口延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  dynamicColumns1.value = [
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', width: 100 },
    { prop: 'city', label: '城市', width: 120 },
    { prop: 'hobby', label: '爱好' }
  ]
  loading1.value = false
}

// ==================== 2. 混合模式（固定列 + 动态列） ====================
// 固定列通常是业务主键或操作项
const fixedPart: TableColumn[] = [
  { type: 'selection', width: 50, fixed: 'left' },
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' }
]

const dynamicPart = ref<TableColumn[]>([])
const mixData = ref([
  { id: 101, title: '文章A', author: 'Admin', views: 1200, status: '已发布', date: '2024-02-01' },
  { id: 102, title: '文章B', author: 'Editor', views: 800, status: '草稿', date: '2024-02-02' }
])

const fetchMixColumns = async () => {
  // 模拟从接口配置获取列
  await new Promise(resolve => setTimeout(resolve, 500))
  dynamicPart.value = [
    { prop: 'title', label: '标题', minWidth: 200 },
    { prop: 'author', label: '作者', width: 120 },
    { prop: 'views', label: '查阅量', width: 100 },
    {
      label: '基础信息',
      children: [
        { prop: 'status', label: '状态', width: 100 },
        { prop: 'date', label: '日期', width: 120 }
      ]
    }
  ]
}

// ==================== 3. 复杂动态多级表头 ====================
const complexData = ref([
  { project: 'YH-UI', q1_val: 100, q1_inc: 10, q2_val: 120, q2_inc: 20 },
  { project: 'VitePress', q1_val: 200, q1_inc: 5, q2_val: 190, q2_inc: -10 }
])
const complexColumns = ref<TableColumn[]>([])

const generateComplexColumns = () => {
  const quarters = ['Q1', 'Q2']
  const dynamicCols: TableColumn[] = quarters.map(q => ({
    label: `${q} 季度数据`,
    children: [
      { prop: `${q.toLowerCase()}_val`, label: '数值', width: 100 },
      { prop: `${q.toLowerCase()}_inc`, label: '增量', width: 100 }
    ]
  }))
  
  complexColumns.value = [
    { prop: 'project', label: '项目名称', width: 150, fixed: 'left' },
    ...dynamicCols
  ]
}

onMounted(() => {
  generateComplexColumns()
})

// ==================== 4. 横向维度渲染（透视转换） ====================
const pivotData = ref([
  { category: '华东区', '2024-01': 1200, '2024-02': 1500, '2024-03': 1800 },
  { category: '华北区', '2024-01': 900, '2024-02': 1100, '2024-03': 1300 }
])
const pivotColumns = ref<TableColumn[]>([
  { prop: 'category', label: '区域', width: 120, fixed: 'left' }
])

const fetchPivotData = async () => {
  // 模拟后端返回动态的时间维度
  await new Promise(resolve => setTimeout(resolve, 600))
  const months = ['2024-01', '2024-02', '2024-03']
  const dynamicCols = months.map(m => ({ prop: m, label: m, width: 120 }))
  pivotColumns.value = [
    { prop: 'category', label: '销售区域', width: 120, fixed: 'left' },
    ...dynamicCols
  ]
}

// ==================== 5. 纵向数据渲染（对象转置） ====================
// 将单一对象的 Key-Value 转换为表格的行
const rawUser = { id: 'U001', nick: '程序员小王', email: 'wang@example.com', level: 'VIP' }
const verticalData = ref([
  { label: '用户 ID', value: rawUser.id },
  { label: '用户昵称', value: rawUser.nick },
  { label: '联系邮箱', value: rawUser.email },
  { label: '会员等级', value: rawUser.level }
])
const verticalColumns: TableColumn[] = [
  { prop: 'label', label: '属性名', width: 150, className: 'is-label-col' },
  { prop: 'value', label: '属性值' }
]

// ==================== 示例代码 ====================

// 1. 异步获取列示例
const tsFetchExample = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button type="primary" :loading="loading" @click="fetchColumns">
      获取列配置
    </yh-button>
  </div>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@yh-ui/yh-ui'

const data = ref([
  { id: 1, name: '张三', age: 28, city: '北京', hobby: '编程' },
  { id: 2, name: '李四', age: 24, city: '上海', hobby: '摄影' }
])

const columns = ref<TableColumn[]>([
  { prop: 'name', label: '姓名', width: 120 }
])

const loading = ref(false)

const fetchColumns = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  columns.value = [
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', width: 100 },
    { prop: 'city', label: '城市', width: 120 },
    { prop: 'hobby', label: '爱好' }
  ]
  loading.value = false
}
</${_S}>`
const jsFetchExample = toJs(tsFetchExample);

// 2. 混合模式示例 (固定 + 动态)
const tsMixExample = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchColumns">组合加载</yh-button>
  </div>
  <yh-table :data="data" :columns="[...fixedPart, ...dynamicPart]" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@yh-ui/yh-ui'

// 固定列
const fixedPart: TableColumn[] = [
  { type: 'selection', width: 50, fixed: 'left' },
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' }
]

// 动态列容器
const dynamicPart = ref<TableColumn[]>([])

const data = ref([
  { id: 101, title: '文章A', author: 'Admin', views: 1200, status: '已发布', date: '2024-02-01' },
  { id: 102, title: '文章B', author: 'Editor', views: 800, status: '草稿', date: '2024-02-02' }
])

const fetchColumns = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  dynamicPart.value = [
    { prop: 'title', label: '标题', minWidth: 200 },
    { prop: 'author', label: '作者', width: 120 },
    { prop: 'views', label: '查阅量', width: 100 },
    {
      label: '基础信息',
      children: [
        { prop: 'status', label: '状态', width: 100 },
        { prop: 'date', label: '日期', width: 120 }
      ]
    }
  ]
}
</${_S}>`
const jsMixExample = toJs(tsMixExample);

// 3. 动态生成多级表头示例
const tsComplexExample = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TableColumn } from '@yh-ui/yh-ui'

const data = ref([
  { project: 'YH-UI', q1_val: 100, q1_inc: 10, q2_val: 120, q2_inc: 20 },
  { project: 'VitePress', q1_val: 200, q1_inc: 5, q2_val: 190, q2_inc: -10 }
])

const columns = ref<TableColumn[]>([])

const generateColumns = () => {
  const quarters = ['Q1', 'Q2']
  const dynamicCols: TableColumn[] = quarters.map(q => ({
    label: \`\${q} 季度数据\`,
    children: [
      { prop: \`\${q.toLowerCase()}_val\`, label: '数值', width: 100 },
      { prop: \`\${q.toLowerCase()}_inc\`, label: '增量', width: 100 }
    ]
  }))
  
  columns.value = [
    { prop: 'project', label: '项目名称', width: 150, fixed: 'left' },
    ...dynamicCols
  ]
}

onMounted(generateColumns)
</${_S}>`
const jsComplexExample = toJs(tsComplexExample);

const tsPivotExample = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchPivot">生成横向月份列</yh-button>
  </div>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@yh-ui/yh-ui'

const columns = ref<TableColumn[]>([
  { prop: 'category', label: '区域', width: 120, fixed: 'left' }
])

const data = ref([
  { category: '华东区', '2024-01': 1200, '2024-02': 1500, '2024-03': 1800 },
  { category: '华北区', '2024-01': 900, '2024-02': 1100, '2024-03': 1300 }
])

const fetchPivot = async () => {
  const months = ['2024-01', '2024-02', '2024-03']
  const dynamicCols = months.map(m => ({ prop: m, label: m, width: 120 }))
  columns.value = [
    { prop: 'category', label: '销售区域', width: 120, fixed: 'left' },
    ...dynamicCols
  ]
}
</${_S}>`
const jsPivotExample = toJs(tsPivotExample);

// 5. 纵向渲染示例
const tsVerticalExample = `<${_T}>
  <yh-table :data="data" :columns="columns" border :show-header="false" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@yh-ui/yh-ui'

// 源数据通常是一个对象
const rawUser = { id: 'U001', nick: '程序员小王', email: 'wang@example.com', level: 'VIP' }

// 转换为纵向列表
const data = ref([
  { label: '用户 ID', value: rawUser.id },
  { label: '用户昵称', value: rawUser.nick },
  { label: '联系邮箱', value: rawUser.email },
  { label: '会员等级', value: rawUser.level }
])

const columns: TableColumn[] = [
  { prop: 'label', width: 150, className: 'is-label-col' },
  { prop: 'value' }
]
</${_S}>`
const jsVerticalExample = toJs(tsVerticalExample);

</script>

## 异步接口获取列

最常见的场景是进入页面后，先调用接口获取用户的个性化列配置，然后再渲染表格。

<DemoBlock title="异步加载列配置" :ts-code="tsFetchExample" :js-code="jsFetchExample">
  <div style="margin-bottom: 16px">
    <yh-button type="primary" :loading="loading1" @click="fetchColumns1">
      获取列配置
    </yh-button>
  </div>
  <yh-table :data="dynamicData1" :columns="dynamicColumns1" border />
</DemoBlock>

## 混用模式（固定 + 动态）

在复杂的后台管理系统中，通常会将“选择框”、“ID”、“操作栏”作为固定列写死在前端，而中间的业务数据列依据接口动态排列。

<DemoBlock title="固定列 + 动态多级表头" :ts-code="tsMixExample" :js-code="jsMixExample">
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchMixColumns">组合加载</yh-button>
  </div>
  <yh-table 
    :data="mixData" 
    :columns="[...fixedPart, ...dynamicPart]" 
    border 
  />
</DemoBlock>

## 动态生成多级表头

有时我们需要根据后端返回的结构化数据（如年份、季度列表）在前端循环生成复杂的嵌套表头。

<DemoBlock title="循环生成的嵌套表头" :ts-code="tsComplexExample" :js-code="jsComplexExample">
  <yh-table :data="complexData" :columns="complexColumns" border />
</DemoBlock>

## 横向维度渲染（透视）

横向渲染通常用于展示“时间轴”或“动态属性”。后端返回一系列维度（如日期列表），前端根据这些维度动态生成列，并配合数据对象中对应的动态 Key 进行展示。

<DemoBlock title="横向时间维度渲染" :ts-code="tsPivotExample" :js-code="jsPivotExample">
  <div style="margin-bottom: 16px">
    <yh-button type="primary" @click="fetchPivotData">生成横向列</yh-button>
  </div>
  <yh-table :data="pivotData" :columns="pivotColumns" border />
</DemoBlock>

## 纵向数据渲染（转置）

纵向渲染主要用于显示单条记录的详细信息。通过将对象的 `Key-Value` 转换为表格的 `Row-Column` 结构，可以在表格布局下实现类似“详情卡片”的效果。

<DemoBlock title="纵向属性视图" :ts-code="tsVerticalExample" :js-code="jsVerticalExample">
  <yh-table :data="verticalData" :columns="verticalColumns" border :show-header="false" />
</DemoBlock>

## 最佳实践建议

1. **Skeleton 骨架屏**：在异步获取列配置期间，建议使用骨架屏占位，避免表格结构跳动。
2. **Key 管理**：当动态改变 `columns` 数组时，如果遇到渲染不更新的情况，可以尝试给 `yh-table` 绑定一个基于列配置生成的 `key`。
3. **固定列冲突**：请确保动态生成的列中 `fixed` 属性与前端写死的固定列顺序逻辑一致，避免出现固定列被夹在中间的情况。
