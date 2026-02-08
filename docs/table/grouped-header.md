# Table 表格 - 多级表头

当数据结构比较复杂时，可以使用多级表头来展现数据的层次关系。

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn } from '../../packages/components/src/table/src/table'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 1. 基础多级表头 ====================
const data1 = ref([
  { date: '2024-05-01', name: '张三', province: '广东', city: '深圳', address: '南山区', zip: 518000 },
  { date: '2024-05-02', name: '李四', province: '北京', city: '北京', address: '朝阳区', zip: 100000 },
  { date: '2024-05-03', name: '王五', province: '上海', city: '上海', address: '浦东新区', zip: 200120 },
  { date: '2024-05-04', name: '赵六', province: '广东', city: '广州', address: '天河区', zip: 510000 }
])

const columns1 = [
  { prop: 'date', label: '日期', width: 120, fixed: 'left' },
  {
    label: '配送信息',
    children: [
      { prop: 'name', label: '姓名', width: 100 },
      {
        label: '地址',
        children: [
          { prop: 'province', label: '省份', width: 100 },
          { prop: 'city', label: '市区', width: 100 },
          { prop: 'address', label: '详细地址', width: 150 },
          { prop: 'zip', label: '邮编', width: 100 }
        ]
      }
    ]
  }
]

// ==================== 2. 三级及以上表头 ====================
const data2 = ref([
  { project: '核心引擎', devProgress: 88, testProgress: 75, bugCount: 12, quality: 'A' },
  { project: 'UI 框架', devProgress: 95, testProgress: 90, bugCount: 3, quality: 'S' },
  { project: '数据中心', devProgress: 70, testProgress: 45, bugCount: 25, quality: 'B' }
])

const columns2 = [
  { prop: 'project', label: '项目名称', width: 120 },
  {
    label: '研发指标',
    children: [
      {
        label: '进度监控',
        children: [
          { prop: 'devProgress', label: '开发进度 (%)', width: 120 },
          { prop: 'testProgress', label: '测试进度 (%)', width: 120 }
        ]
      },
      {
        label: '质量保证',
        children: [
          { prop: 'bugCount', label: '缺陷数', width: 100 },
          { prop: 'quality', label: '质量等级', width: 100 }
        ]
      }
    ]
  }
]

// ==================== 3. 多级表头 + 行列合并 ====================
const data3 = ref([
  { category: '办公用品', type: '书写工具', name: '签字笔', price: 5, stock: 100 },
  { category: '办公用品', type: '书写工具', name: '圆珠笔', price: 2, stock: 200 },
  { category: '办公用品', type: '纸张', name: 'A4 纸', price: 25, stock: 50 },
  { category: '电子产品', type: '外设', name: '鼠标', price: 50, stock: 80 },
  { category: '电子产品', type: '外设', name: '键盘', price: 120, stock: 30 }
])

const columns3 = [
  {
    label: '商品分类',
    children: [
      { prop: 'category', label: '大类', width: 120 },
      { prop: 'type', label: '小类', width: 120 }
    ]
  },
  {
    label: '商品详情',
    children: [
      { prop: 'name', label: '名称', width: 120 },
      { prop: 'price', label: '单价 (元)', width: 100 },
      { prop: 'stock', label: '库存', width: 100 }
    ]
  }
]

const handleSpanMethod3 = ({ rowIndex, columnIndex }: {
  row: Record<string, unknown>
  column: TableColumn
  rowIndex: number
  columnIndex: number
}) => {
  if (columnIndex === 0) {
    if (rowIndex === 0) return { rowspan: 3, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 2 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    if (rowIndex === 0) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
}

// ==================== 4. 可折叠多级表头 ====================
const isExpanded4 = ref(false)
const data4 = ref([
  { name: '张三', base: 80, bonus: 10, penalty: 2, total: 88 },
  { name: '李四', base: 75, bonus: 15, penalty: 5, total: 85 },
  { name: '王五', base: 90, bonus: 5, penalty: 0, total: 95 }
])

const columns4 = computed<TableColumn[]>(() => [
  { prop: 'name', label: '员工姓名', width: 120 },
  {
    label: '绩效明细',
    prop: 'performance',
    children: [
      { prop: 'total', label: '总得分', width: 100 },
      ...(isExpanded4.value ? [
        { prop: 'base', label: '基础分', width: 100 },
        { prop: 'bonus', label: '奖励分', width: 100 },
        { prop: 'penalty', label: '扣分', width: 100 }
      ] : [])
    ]
  }
])

const toggleExpand4 = () => {
  isExpanded4.value = !isExpanded4.value
}

// ==================== 示例代码 ====================
const tsBasicGroup = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { date: '2024-05-01', name: '张三', province: '广东', city: '深圳', address: '南山区', zip: 518000 },
  { date: '2024-05-02', name: '李四', province: '北京', city: '北京', address: '朝阳区', zip: 100000 },
  { date: '2024-05-03', name: '王五', province: '上海', city: '上海', address: '浦东新区', zip: 200120 },
  { date: '2024-05-04', name: '赵六', province: '广东', city: '广州', address: '天河区', zip: 510000 }
])

const columns: TableColumn[] = [
  { prop: 'date', label: '日期', width: 120, fixed: 'left' },
  {
    label: '配送信息',
    children: [
      { prop: 'name', label: '姓名', width: 100 },
      {
        label: '地址',
        children: [
          { prop: 'province', label: '省份', width: 100 },
          { prop: 'city', label: '市区', width: 100 },
          { prop: 'address', label: '详细地址', width: 150 },
          { prop: 'zip', label: '邮编', width: 100 }
        ]
      }
    ]
  }
]
</${_S}>`
const jsBasicGroup = toJs(tsBasicGroup);

const tsMultiLevel = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { project: '核心引擎', devProgress: 88, testProgress: 75, bugCount: 12, quality: 'A' },
  { project: 'UI 框架', devProgress: 95, testProgress: 90, bugCount: 3, quality: 'S' },
  { project: '数据中心', devProgress: 70, testProgress: 45, bugCount: 25, quality: 'B' }
])

const columns: TableColumn[] = [
  { prop: 'project', label: '项目名称', width: 120 },
  {
    label: '研发指标',
    children: [
      {
        label: '进度监控',
        children: [
          { prop: 'devProgress', label: '开发进度 (%)', width: 120 },
          { prop: 'testProgress', label: '测试进度 (%)', width: 120 }
        ]
      },
      {
        label: '质量保证',
        children: [
          { prop: 'bugCount', label: '缺陷数', width: 100 },
          { prop: 'quality', label: '质量等级', width: 100 }
        ]
      }
    ]
  }
]
</${_S}>`
const jsMultiLevel = toJs(tsMultiLevel);

const tsSpanGroup = `<${_T}>
  <yh-table 
    :data="data" 
    :columns="columns" 
    :span-method="spanMethod"
    border 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'yh-ui'

const data = ref([
  { category: '办公用品', type: '书写工具', name: '签字笔', price: 5, stock: 100 },
  { category: '办公用品', type: '书写工具', name: '圆珠笔', price: 2, stock: 200 },
  { category: '办公用品', type: '纸张', name: 'A4 纸', price: 25, stock: 50 },
  { category: '电子产品', type: '外设', name: '鼠标', price: 50, stock: 80 },
  { category: '电子产品', type: '外设', name: '键盘', price: 120, stock: 30 }
])

const columns: TableColumn[] = [
  {
    label: '商品分类',
    children: [
      { prop: 'category', label: '大类', width: 120 },
      { prop: 'type', label: '小类', width: 120 }
    ]
  },
  {
    label: '商品详情',
    children: [
      { prop: 'name', label: '名称', width: 120 },
      { prop: 'price', label: '单价 (元)', width: 100 },
      { prop: 'stock', label: '库存', width: 100 }
    ]
  }
]

const spanMethod = ({ rowIndex, columnIndex }: {
  row: Record<string, unknown>
  column: TableColumn
  rowIndex: number
  columnIndex: number
}) => {
  if (columnIndex === 0) {
    if (rowIndex === 0) return { rowspan: 3, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 2 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    if (rowIndex === 0) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 3) return { rowspan: 2, colspan: 1 }
    if (rowIndex === 1 || rowIndex === 4) return { rowspan: 0, colspan: 0 }
  }
}
</${_S}>`
const jsSpanGroup = toJs(tsSpanGroup);

const tsDynamicGroup = `<${_T}>
  <div style="margin-bottom: 16px">
     <yh-button type="primary" @click="isExpanded = !isExpanded">
       {{ isExpanded ? '收起明细' : '展开绩效明细' }}
     </yh-button>
  </div>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn } from 'yh-ui'

const isExpanded = ref(false)
const data = ref([
  { name: '张三', base: 80, bonus: 10, penalty: 2, total: 88 },
  { name: '李四', base: 75, bonus: 15, penalty: 5, total: 85 },
  { name: '王五', base: 90, bonus: 5, penalty: 0, total: 95 }
])

const columns = computed<TableColumn[]>(() => [
  { prop: 'name', label: '员工姓名', width: 120 },
  {
    label: '绩效明细',
    children: [
      { prop: 'total', label: '总得分', width: 100 },
      ...(isExpanded.value ? [
        { prop: 'base', label: '基础分', width: 100 },
        { prop: 'bonus', label: '奖励分', width: 100 },
        { prop: 'penalty', label: '扣分', width: 100 }
      ] : [])
    ]
  }
])
</${_S}>`
const jsDynamicGroup = toJs(tsDynamicGroup);

</script>

## 基础多级表头

只需在列配置中添加 `children` 属性，即可轻松实现多级表头。底层会自动根据数据嵌套深度计算 `rowspan` 和 `colspan`。

<DemoBlock title="基础多级表头" :ts-code="tsBasicGroup" :js-code="jsBasicGroup">
  <yh-table :data="data1" :columns="columns1" border />
</DemoBlock>

## 三级及以上表头

`children` 可以无限级嵌套，从而支持极为复杂的表头结构。表格内部采用高性能递归重构算法，确保即使在深层嵌套下也能保持丝滑的渲染性能。

<DemoBlock title="多级嵌套表头" :ts-code="tsMultiLevel" :js-code="jsMultiLevel">
  <yh-table :data="data2" :columns="columns2" border />
</DemoBlock>

## 多级表头与行列合并

多级表头可以与 `span-method` 完美配合。通常用于展示具有归属关系的分类数据，通过表头分组和单元格合并，使报表更具可读性。

<DemoBlock title="多级表头合并行" :ts-code="tsSpanGroup" :js-code="jsSpanGroup">
  <yh-table :data="data3" :columns="columns3" :span-method="handleSpanMethod3" border />
</DemoBlock>

## 可折叠多级表头

利用 Vue 的响应式特性和 `computed` 属性，可以实现动态展开/收起的多级表头。这对于需要展示大量详细指标、但又希望保持界面简洁的报表非常有用。

<DemoBlock title="动态展开/收起表头" :ts-code="tsDynamicGroup" :js-code="jsDynamicGroup">
  <div style="margin-bottom: 16px">
     <yh-button type="primary" @click="toggleExpand4">
       {{ isExpanded4 ? '收起明细' : '展开绩效明细' }}
     </yh-button>
  </div>
  <yh-table :data="data4" :columns="columns4" border />
</DemoBlock>

## API 补充

在 `TableColumn` 接口中，支持以下属性配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 列唯一标识 | `string` | — |
| prop | 列字段名 | `string` | — |
| label | 列标题 | `string` | — |
| width | 列宽 | `number \| string` | — |
| minWidth | 最小列宽 | `number \| string` | — |
| maxWidth | 最大列宽 | `number \| string` | — |
| align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| headerAlign | 表头对齐方式 | `'left' \| 'center' \| 'right'` | — |
| fixed | 固定列 | `'left' \| 'right' \| true` | — |
| sortable | 是否可排序 | `boolean \| 'custom'` | `false` |
| resizable | 是否可调整列宽 | `boolean` | `true` |
| showOverflowTooltip | 是否显示溢出提示 | `boolean \| object` | `false` |
| className | 列类名 | `string` | — |
| headerClassName | 表头类名 | `string` | — |
| style | 列样式 | `CSSProperties` | — |
| headerStyle | 表头样式 | `CSSProperties` | — |
| visible | 是否可见 | `boolean` | `true` |
| children | 子列配置（实现多级表头） | `TableColumn[]` | — |
| type | 列类型 | `'selection' \| 'index' \| 'expand' \| 'radio'` | — |
| render | 自定义单元格渲染 | `(params) => VNode` | — |
| headerRender | 自定义表头渲染 | `(params) => VNode` | — |
| indexMethod | 序号列自定义方法 | `(index: number) => number \| string` | — |
| selectable | 勾选框是否可选判断函数 | `(row, index) => boolean` | — |
| sortBy | 指定排序字段 | `string \| ((row) => unknown)` | — |
| sortMethod | 自定义排序方法 | `(a, b, order) => number` | — |
| ellipsis | 省略号配置 | `boolean \| EllipsisConfig` | `false` |
| formatter | 单元格格式化方法 | `(row, column, cellValue, index) => string \| VNode` | — |

> **注意事项：**
> 1. 设置了 `children` 的列，其 `prop` 属性通常会被忽略，因为该列仅作为分组容器。
> 2. `fixed` 属性建议设置在最外层（如示例中的“日期”列）或是最底层的具体数据列，中间的分组列不要重复设置固定属性。
