# Table 表格 - 对齐方式

通过列配置中的 `align` 和 `headerAlign` 属性控制表格内容和表头的对齐方式。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 公共数据 ====================

const baseData = [
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, remark: '优秀员工' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, remark: '年度最佳' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, remark: '创意之星' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, remark: '管理能手' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, remark: '拓展先锋' }
]

// ==================== 1. 基础对齐 ====================

const basicAlignColumns = [
  { prop: 'name', label: '姓名（左对齐）', width: 140, align: 'left' as const },
  { prop: 'age', label: '年龄（居中）', width: 120, align: 'center' as const },
  { prop: 'salary', label: '薪资（右对齐）', width: 140, align: 'right' as const },
  { prop: 'dept', label: '部门（居中）', width: 120, align: 'center' as const },
  { prop: 'remark', label: '备注', align: 'left' as const }
]

// ==================== 2. 表头独立对齐 ====================

const headerAlignColumns = [
  { prop: 'name', label: '姓名', width: 120, align: 'left' as const, headerAlign: 'center' as const },
  { prop: 'age', label: '年龄', width: 100, align: 'center' as const, headerAlign: 'center' as const },
  { prop: 'salary', label: '薪资', width: 120, align: 'right' as const, headerAlign: 'right' as const },
  { prop: 'dept', label: '部门', width: 120, align: 'center' as const, headerAlign: 'left' as const },
  { prop: 'remark', label: '备注', align: 'left' as const, headerAlign: 'center' as const }
]

// ==================== 3. 全部居中 ====================

const centerColumns = [
  { prop: 'name', label: '姓名', width: 120, align: 'center' as const },
  { prop: 'age', label: '年龄', width: 100, align: 'center' as const },
  { prop: 'dept', label: '部门', width: 120, align: 'center' as const },
  { prop: 'salary', label: '薪资', width: 120, align: 'center' as const },
  { prop: 'remark', label: '备注', align: 'center' as const }
]

// ==================== 4. 数值右对齐 ====================

const numericData = [
  { id: 1, product: '笔记本电脑', quantity: 156, price: 5999.00, total: 935844.00 },
  { id: 2, product: '机械键盘', quantity: 342, price: 399.00, total: 136458.00 },
  { id: 3, product: '无线鼠标', quantity: 520, price: 129.00, total: 67080.00 },
  { id: 4, product: '显示器', quantity: 89, price: 2499.00, total: 222411.00 },
  { id: 5, product: '耳机', quantity: 267, price: 699.00, total: 186633.00 }
]

const numericColumns = [
  { prop: 'product', label: '产品名称', align: 'left' as const },
  { prop: 'quantity', label: '数量', width: 120, align: 'right' as const },
  { prop: 'price', label: '单价（元）', width: 140, align: 'right' as const },
  { prop: 'total', label: '总金额（元）', width: 160, align: 'right' as const }
]

// ==================== 5. 混合对齐 ====================

const mixedData = [
  { id: 1, status: '✅ 通过', name: '张三', score: 95, level: 'A+', comment: '表现优秀，多次获得好评' },
  { id: 2, status: '✅ 通过', name: '李四', score: 88, level: 'A', comment: '工作认真，有创新思维' },
  { id: 3, status: '❌ 未通过', name: '王五', score: 56, level: 'D', comment: '需要加强专业技能学习' },
  { id: 4, status: '✅ 通过', name: '赵六', score: 72, level: 'B', comment: '沟通协作能力较强' },
  { id: 5, status: '⚠️ 待审', name: '钱七', score: 65, level: 'C', comment: '有进步空间' }
]

const mixedColumns = [
  { prop: 'status', label: '状态', width: 100, align: 'center' as const },
  { prop: 'name', label: '姓名', width: 100, align: 'center' as const },
  { prop: 'score', label: '分数', width: 80, align: 'right' as const, headerAlign: 'center' as const },
  { prop: 'level', label: '等级', width: 80, align: 'center' as const },
  { prop: 'comment', label: '评语', align: 'left' as const }
]

// ==================== 示例代码 ====================

const tsBasicAlign = `<${_T}>
  <yh-table :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, salary: 15000, dept: '技术部', remark: '优秀员工' },
  { id: 2, name: '李四', age: 32, salary: 18000, dept: '产品部', remark: '年度最佳' },
  { id: 3, name: '王五', age: 25, salary: 14000, dept: '设计部', remark: '创意之星' },
  { id: 4, name: '赵六', age: 35, salary: 22000, dept: '运营部', remark: '管理能手' },
  { id: 5, name: '钱七', age: 29, salary: 16000, dept: '市场部', remark: '拓展先锋' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'name', label: '姓名（左对齐）', width: 140, align: 'left' as Align },
  { prop: 'age', label: '年龄（居中）', width: 120, align: 'center' as Align },
  { prop: 'salary', label: '薪资（右对齐）', width: 140, align: 'right' as Align },
  { prop: 'dept', label: '部门（居中）', width: 120, align: 'center' as Align },
  { prop: 'remark', label: '备注', align: 'left' as Align }
]
</${_S}>`

const jsBasicAlign = toJs(tsBasicAlign)

const tsHeaderAlign = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">表头和内容可以分别设置对齐方式。</p>
  <yh-table :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, salary: 15000, dept: '技术部', remark: '优秀员工' },
  { id: 2, name: '李四', age: 32, salary: 18000, dept: '产品部', remark: '年度最佳' },
  { id: 3, name: '王五', age: 25, salary: 14000, dept: '设计部', remark: '创意之星' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'name', label: '姓名', width: 120, align: 'left' as Align, headerAlign: 'center' as Align },
  { prop: 'age', label: '年龄', width: 100, align: 'center' as Align, headerAlign: 'center' as Align },
  { prop: 'salary', label: '薪资', width: 120, align: 'right' as Align, headerAlign: 'right' as Align },
  { prop: 'dept', label: '部门', width: 120, align: 'center' as Align, headerAlign: 'left' as Align },
  { prop: 'remark', label: '备注', align: 'left' as Align, headerAlign: 'center' as Align }
]
</${_S}>`

const jsHeaderAlign = toJs(tsHeaderAlign)

const tsCenterAlign = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, remark: '优秀员工' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, remark: '年度最佳' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, remark: '创意之星' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'name', label: '姓名', width: 120, align: 'center' as Align },
  { prop: 'age', label: '年龄', width: 100, align: 'center' as Align },
  { prop: 'dept', label: '部门', width: 120, align: 'center' as Align },
  { prop: 'salary', label: '薪资', width: 120, align: 'center' as Align },
  { prop: 'remark', label: '备注', align: 'center' as Align }
]
</${_S}>`

const jsCenterAlign = toJs(tsCenterAlign)

const tsNumericAlign = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">数值类数据推荐使用右对齐，方便按位数对比。</p>
  <yh-table :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, product: '笔记本电脑', quantity: 156, price: 5999.00, total: 935844.00 },
  { id: 2, product: '机械键盘', quantity: 342, price: 399.00, total: 136458.00 },
  { id: 3, product: '无线鼠标', quantity: 520, price: 129.00, total: 67080.00 },
  { id: 4, product: '显示器', quantity: 89, price: 2499.00, total: 222411.00 },
  { id: 5, product: '耳机', quantity: 267, price: 699.00, total: 186633.00 }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'product', label: '产品名称', align: 'left' as Align },
  { prop: 'quantity', label: '数量', width: 120, align: 'right' as Align },
  { prop: 'price', label: '单价（元）', width: 140, align: 'right' as Align },
  { prop: 'total', label: '总金额（元）', width: 160, align: 'right' as Align }
]
</${_S}>`

const jsNumericAlign = toJs(tsNumericAlign)

const tsMixedAlign = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, status: '✅ 通过', name: '张三', score: 95, level: 'A+', comment: '表现优秀，多次获得好评' },
  { id: 2, status: '✅ 通过', name: '李四', score: 88, level: 'A', comment: '工作认真，有创新思维' },
  { id: 3, status: '❌ 未通过', name: '王五', score: 56, level: 'D', comment: '需要加强专业技能学习' },
  { id: 4, status: '✅ 通过', name: '赵六', score: 72, level: 'B', comment: '沟通协作能力较强' },
  { id: 5, status: '⚠️ 待审', name: '钱七', score: 65, level: 'C', comment: '有进步空间' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'status', label: '状态', width: 100, align: 'center' as Align },
  { prop: 'name', label: '姓名', width: 100, align: 'center' as Align },
  { prop: 'score', label: '分数', width: 80, align: 'right' as Align, headerAlign: 'center' as Align },
  { prop: 'level', label: '等级', width: 80, align: 'center' as Align },
  { prop: 'comment', label: '评语', align: 'left' as Align }
]
</${_S}>`

const jsMixedAlign = toJs(tsMixedAlign)
</script>

## 基础对齐

通过列配置的 `align` 属性设置内容对齐方式，支持 `left`（默认）、`center`、`right` 三种。

<DemoBlock title="基础对齐" :ts-code="tsBasicAlign" :js-code="jsBasicAlign">
  <yh-table :data="baseData" :columns="basicAlignColumns" border show-index />
</DemoBlock>

## 表头独立对齐

通过 `headerAlign` 属性可以单独设置表头的对齐方式，使其与内容对齐方式不同。如果不设置 `headerAlign`，表头默认跟随 `align`。

<DemoBlock title="表头与内容分别对齐" :ts-code="tsHeaderAlign" :js-code="jsHeaderAlign">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">表头和内容可以分别设置对齐方式。</p>
  <yh-table :data="baseData.slice(0, 3)" :columns="headerAlignColumns" border show-index />
</DemoBlock>

## 全部居中

将所有列的 `align` 设为 `center` 即可实现全表居中对齐。

<DemoBlock title="全部居中" :ts-code="tsCenterAlign" :js-code="jsCenterAlign">
  <yh-table :data="baseData.slice(0, 3)" :columns="centerColumns" border />
</DemoBlock>

## 数值右对齐

对于数量、金额等数值列，推荐使用右对齐，便于按位数对比大小。

<DemoBlock title="数值右对齐" :ts-code="tsNumericAlign" :js-code="jsNumericAlign">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">数值类数据推荐使用右对齐，方便按位数对比。</p>
  <yh-table :data="numericData" :columns="numericColumns" border show-index />
</DemoBlock>

## 混合对齐

实际场景中，不同列通常需要不同的对齐方式——状态列居中、数值列右对齐、文本列左对齐。

<DemoBlock title="混合对齐" :ts-code="tsMixedAlign" :js-code="jsMixedAlign">
  <yh-table :data="mixedData" :columns="mixedColumns" border />
</DemoBlock>

## API

### TableColumn 对齐属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 列内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| headerAlign | 表头对齐方式（不设置时跟随 `align`） | `'left' \| 'center' \| 'right'` | `'left'` |

### 对齐方式说明

| 值 | 说明 | 适用场景 |
| --- | --- | --- |
| `left` | 左对齐（默认） | 文本类内容（姓名、地址、描述等） |
| `center` | 居中对齐 | 状态标签、等级、操作按钮等 |
| `right` | 右对齐 | 数值类内容（金额、数量、分数等） |

### 最佳实践

1. **数值列右对齐**：金额、数量等数值数据右对齐，方便用户按位数快速对比。
2. **状态列居中**：状态标签、图标等短内容居中显示更美观。
3. **文本列左对齐**：姓名、地址等长文本保持左对齐，符合阅读习惯。
4. **表头居中**：即使内容列有不同对齐，表头统一居中通常视觉效果更好——可使用 `headerAlign: 'center'` 搭配不同 `align`。

