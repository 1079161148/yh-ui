# Table - Alignment

Control the alignment of table content and headers through the `align` and `headerAlign` properties in column configuration.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== Common Data ====================

const baseData = [
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, remark: 'Outstanding Employee' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, remark: 'Best of Year' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, remark: 'Creative Star' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, remark: 'Management Expert' },
  { id: 5, name: 'Tom', age: 29, dept: 'Marketing', salary: 16000, remark: 'Pioneer' }
]

// ==================== 1. Basic Alignment ====================

const basicAlignColumns = [
  { prop: 'name', label: 'Name (Left)', width: 140, align: 'left' as const },
  { prop: 'age', label: 'Age (Center)', width: 120, align: 'center' as const },
  { prop: 'salary', label: 'Salary (Right)', width: 140, align: 'right' as const },
  { prop: 'dept', label: 'Dept (Center)', width: 120, align: 'center' as const },
  { prop: 'remark', label: 'Notes', align: 'left' as const }
]

// ==================== 2. Header Independent Alignment ====================

const headerAlignColumns = [
  { prop: 'name', label: 'Name', width: 120, align: 'left' as const, headerAlign: 'center' as const },
  { prop: 'age', label: 'Age', width: 100, align: 'center' as const, headerAlign: 'center' as const },
  { prop: 'salary', label: 'Salary', width: 120, align: 'right' as const, headerAlign: 'right' as const },
  { prop: 'dept', label: 'Department', width: 120, align: 'center' as const, headerAlign: 'left' as const },
  { prop: 'remark', label: 'Notes', align: 'left' as const, headerAlign: 'center' as const }
]

// ==================== 3. All Center ====================

const centerColumns = [
  { prop: 'name', label: 'Name', width: 120, align: 'center' as const },
  { prop: 'age', label: 'Age', width: 100, align: 'center' as const },
  { prop: 'dept', label: 'Department', width: 120, align: 'center' as const },
  { prop: 'salary', label: 'Salary', width: 120, align: 'center' as const },
  { prop: 'remark', label: 'Notes', align: 'center' as const }
]

// ==================== 4. Numeric Right Alignment ====================

const numericData = [
  { id: 1, product: 'Laptop', quantity: 156, price: 5999.00, total: 935844.00 },
  { id: 2, product: 'Mechanical Keyboard', quantity: 342, price: 399.00, total: 136458.00 },
  { id: 3, product: 'Wireless Mouse', quantity: 520, price: 129.00, total: 67080.00 },
  { id: 4, product: 'Monitor', quantity: 89, price: 2499.00, total: 222411.00 },
  { id: 5, product: 'Headphone', quantity: 267, price: 699.00, total: 186633.00 }
]

const numericColumns = [
  { prop: 'product', label: 'Product Name', align: 'left' as const },
  { prop: 'quantity', label: 'Quantity', width: 120, align: 'right' as const },
  { prop: 'price', label: 'Unit Price', width: 140, align: 'right' as const },
  { prop: 'total', label: 'Total Amount', width: 160, align: 'right' as const }
]

// ==================== 5. Mixed Alignment ====================

const mixedData = [
  { id: 1, status: '✅ Passed', name: 'John', score: 95, level: 'A+', comment: 'Excellent performance, received multiple praises' },
  { id: 2, status: '✅ Passed', name: 'Jane', score: 88, level: 'A', comment: 'Diligent work, innovative thinking' },
  { id: 3, status: '❌ Failed', name: 'Mike', score: 56, level: 'D', comment: 'Needs to improve professional skills' },
  { id: 4, status: '✅ Passed', name: 'Sarah', score: 72, level: 'B', comment: 'Strong communication and collaboration skills' },
  { id: 5, status: '⚠️ Pending', name: 'Tom', score: 65, level: 'C', comment: 'Room for improvement' }
]

const mixedColumns = [
  { prop: 'status', label: 'Status', width: 100, align: 'center' as const },
  { prop: 'name', label: 'Name', width: 100, align: 'center' as const },
  { prop: 'score', label: 'Score', width: 80, align: 'right' as const, headerAlign: 'center' as const },
  { prop: 'level', label: 'Level', width: 80, align: 'center' as const },
  { prop: 'comment', label: 'Comment', align: 'left' as const }
]

// ==================== Code Examples ====================

const tsBasicAlign = `<${_T}>
  <yh-table :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, salary: 15000, dept: 'Engineering', remark: 'Outstanding Employee' },
  { id: 2, name: 'Jane', age: 32, salary: 18000, dept: 'Product', remark: 'Best of Year' },
  { id: 3, name: 'Mike', age: 25, salary: 14000, dept: 'Design', remark: 'Creative Star' },
  { id: 4, name: 'Sarah', age: 35, salary: 22000, dept: 'Operations', remark: 'Management Expert' },
  { id: 5, name: 'Tom', age: 29, salary: 16000, dept: 'Marketing', remark: 'Pioneer' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'name', label: 'Name (Left)', width: 140, align: 'left' as Align },
  { prop: 'age', label: 'Age (Center)', width: 120, align: 'center' as Align },
  { prop: 'salary', label: 'Salary (Right)', width: 140, align: 'right' as Align },
  { prop: 'dept', label: 'Dept (Center)', width: 120, align: 'center' as Align },
  { prop: 'remark', label: 'Notes', align: 'left' as Align }
]
</${_S}>`

const jsBasicAlign = toJs(tsBasicAlign)

const tsHeaderAlign = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Header and content can have separate alignment settings.</p>
  <yh-table :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, salary: 15000, dept: 'Engineering', remark: 'Outstanding Employee' },
  { id: 2, name: 'Jane', age: 32, salary: 18000, dept: 'Product', remark: 'Best of Year' },
  { id: 3, name: 'Mike', age: 25, salary: 14000, dept: 'Design', remark: 'Creative Star' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'name', label: 'Name', width: 120, align: 'left' as Align, headerAlign: 'center' as Align },
  { prop: 'age', label: 'Age', width: 100, align: 'center' as Align, headerAlign: 'center' as Align },
  { prop: 'salary', label: 'Salary', width: 120, align: 'right' as Align, headerAlign: 'right' as Align },
  { prop: 'dept', label: 'Department', width: 120, align: 'center' as Align, headerAlign: 'left' as Align },
  { prop: 'remark', label: 'Notes', align: 'left' as Align, headerAlign: 'center' as Align }
]
</${_S}>`

const jsHeaderAlign = toJs(tsHeaderAlign)

const tsCenterAlign = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, remark: 'Outstanding Employee' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, remark: 'Best of Year' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, remark: 'Creative Star' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'name', label: 'Name', width: 120, align: 'center' as Align },
  { prop: 'age', label: 'Age', width: 100, align: 'center' as Align },
  { prop: 'dept', label: 'Department', width: 120, align: 'center' as Align },
  { prop: 'salary', label: 'Salary', width: 120, align: 'center' as Align },
  { prop: 'remark', label: 'Notes', align: 'center' as Align }
]
</${_S}>`

const jsCenterAlign = toJs(tsCenterAlign)

const tsNumericAlign = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Right alignment is recommended for numeric data to allow easy digit-by-digit comparison.</p>
  <yh-table :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, product: 'Laptop', quantity: 156, price: 5999.00, total: 935844.00 },
  { id: 2, product: 'Mechanical Keyboard', quantity: 342, price: 399.00, total: 136458.00 },
  { id: 3, product: 'Wireless Mouse', quantity: 520, price: 129.00, total: 67080.00 },
  { id: 4, product: 'Monitor', quantity: 89, price: 2499.00, total: 222411.00 },
  { id: 5, product: 'Headphone', quantity: 267, price: 699.00, total: 186633.00 }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'product', label: 'Product Name', align: 'left' as Align },
  { prop: 'quantity', label: 'Quantity', width: 120, align: 'right' as Align },
  { prop: 'price', label: 'Unit Price', width: 140, align: 'right' as Align },
  { prop: 'total', label: 'Total Amount', width: 160, align: 'right' as Align }
]
</${_S}>`

const jsNumericAlign = toJs(tsNumericAlign)

const tsMixedAlign = `<${_T}>
  <yh-table :data="data" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, status: '✅ Passed', name: 'John', score: 95, level: 'A+', comment: 'Excellent performance, received multiple praises' },
  { id: 2, status: '✅ Passed', name: 'Jane', score: 88, level: 'A', comment: 'Diligent work, innovative thinking' },
  { id: 3, status: '❌ Failed', name: 'Mike', score: 56, level: 'D', comment: 'Needs to improve professional skills' },
  { id: 4, status: '✅ Passed', name: 'Sarah', score: 72, level: 'B', comment: 'Strong communication and collaboration skills' },
  { id: 5, status: '⚠️ Pending', name: 'Tom', score: 65, level: 'C', comment: 'Room for improvement' }
])

type Align = 'left' | 'center' | 'right'

const columns = [
  { prop: 'status', label: 'Status', width: 100, align: 'center' as Align },
  { prop: 'name', label: 'Name', width: 100, align: 'center' as Align },
  { prop: 'score', label: 'Score', width: 80, align: 'right' as Align, headerAlign: 'center' as Align },
  { prop: 'level', label: 'Level', width: 80, align: 'center' as Align },
  { prop: 'comment', label: 'Comment', align: 'left' as Align }
]
</${_S}>`

const jsMixedAlign = toJs(tsMixedAlign)
</script>

## Basic Alignment

Set content alignment via the column `align` property, supporting `left` (default), `center`, and `right`.

<DemoBlock title="Basic Alignment" :ts-code="tsBasicAlign" :js-code="jsBasicAlign">
  <yh-table :data="baseData" :columns="basicAlignColumns" border show-index />
</DemoBlock>

## Header Independent Alignment

Use the `headerAlign` property to set header alignment separately from content alignment. If `headerAlign` is not set, the header follows `align` by default.

<DemoBlock title="Header & Content Separate Alignment" :ts-code="tsHeaderAlign" :js-code="jsHeaderAlign">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Header and content can have separate alignment settings.</p>
  <yh-table :data="baseData.slice(0, 3)" :columns="headerAlignColumns" border show-index />
</DemoBlock>

## All Center

Set all columns' `align` to `center` to achieve full table center alignment.

<DemoBlock title="All Center" :ts-code="tsCenterAlign" :js-code="jsCenterAlign">
  <yh-table :data="baseData.slice(0, 3)" :columns="centerColumns" border />
</DemoBlock>

## Numeric Right Alignment

For numeric columns like quantities and amounts, right alignment is recommended for easy digit-by-digit comparison.

<DemoBlock title="Numeric Right Alignment" :ts-code="tsNumericAlign" :js-code="jsNumericAlign">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Right alignment is recommended for numeric data to allow easy digit-by-digit comparison.</p>
  <yh-table :data="numericData" :columns="numericColumns" border show-index />
</DemoBlock>

## Mixed Alignment

In real scenarios, different columns typically need different alignment — status columns centered, numeric columns right-aligned, text columns left-aligned.

<DemoBlock title="Mixed Alignment" :ts-code="tsMixedAlign" :js-code="jsMixedAlign">
  <yh-table :data="mixedData" :columns="mixedColumns" border />
</DemoBlock>

## API

### TableColumn Alignment Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| align | Column content alignment | `'left' \| 'center' \| 'right'` | `'left'` |
| headerAlign | Header alignment (follows `align` if not set) | `'left' \| 'center' \| 'right'` | `'left'` |

### Alignment Values

| Value | Description | Use Cases |
| --- | --- | --- |
| `left` | Left align (default) | Text content (name, address, description, etc.) |
| `center` | Center align | Status tags, levels, action buttons, etc. |
| `right` | Right align | Numeric content (amounts, quantities, scores, etc.) |

### Best Practices

1. **Right-align numeric columns**: Right-align amounts, quantities, and other numeric data for easy digit-by-digit comparison.
2. **Center-align status columns**: Short content like status tags and icons look better centered.
3. **Left-align text columns**: Long text like names and addresses should remain left-aligned for natural reading.
4. **Center-align headers**: Even when content columns have different alignments, centering all headers usually looks better — use `headerAlign: 'center'` with different `align` values.
