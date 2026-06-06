# Table - Print

Through the built-in printing function, table data can be printed in a beautiful format, supporting custom titles, headers/footers, specific columns, pagination, printing multiple tables, and custom templates.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== Common Data ====================
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const baseData = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])

// ==================== 1. Print Table (Basic) ====================
const tableRef1 = ref()
const handlePrint1 = () => {
  tableRef1.value?.print({ title: 'Employee Information Table', showIndex: true })
}

// ==================== 2. Custom Header and Footer ====================
const tableRef2 = ref()
const handlePrint2 = () => {
  tableRef2.value?.print({
    title: 'Employee Information Table',
    showIndex: true,
    headerHtml: '<div style="display:flex;justify-content:space-between;font-size:12px;color:#909399"><span>XX Corporation HR Dept</span><span>Confidential</span></div>',
    footerHtml: '<div style="text-align:center;font-size:12px;color:#909399;margin-top:8px">This report is for internal use only. Unauthorized distribution is prohibited — Human Resources Department</div>'
  })
}

// ==================== 3. Advanced Print ====================
const tableRef3 = ref()
const printTitle3 = ref('Employee Information Table')
const printShowIndex3 = ref(true)
const printShowTime3 = ref(true)
const printShowCount3 = ref(true)
const printOrientation3 = ref('portrait')

const handlePrint3 = () => {
  tableRef3.value?.print({
    title: printTitle3.value,
    showIndex: printShowIndex3.value,
    showTime: printShowTime3.value,
    showCount: printShowCount3.value,
    orientation: printOrientation3.value
  })
}

// ==================== 4. Specify Columns ====================
const tableRef4 = ref()
const printCols4 = ref(columns.map(c => ({ ...c, checked: true })))

const handlePrint4 = () => {
  const selected = printCols4.value.filter(c => c.checked).map(c => c.prop)
  if (selected.length === 0) return
  tableRef4.value?.print({
    title: 'Print Specific Columns',
    columns: selected,
    showIndex: true
  })
}

// ==================== 5. Custom Header/Title ====================
const tableRef5 = ref()
const handlePrint5 = () => {
  tableRef5.value?.print({
    title: 'Quarterly Performance Report',
    headerHtml: [
      '<div style="text-align:center;margin-bottom:12px">',
      '<div style="font-size:20px;font-weight:700;color:#303133">XX Technology Co., Ltd.</div>',
      '<div style="font-size:14px;color:#606266;margin-top:4px">2026 Q1 Employee Performance Summary</div>',
      '<div style="font-size:12px;color:#909399;margin-top:4px">Report No.: HR-2026-Q1-001</div>',
      '</div>'
    ].join(''),
    showIndex: true
  })
}

// ==================== 6. Custom Footer/Page Number ====================
const tableRef6 = ref()
const handlePrint6 = () => {
  tableRef6.value?.print({
    title: 'Employee Information Table',
    showIndex: true,
    footerHtml: [
      '<div style="display:flex;justify-content:space-between;font-size:11px;color:#909399;border-top:1px solid #ebeef5;padding-top:8px;margin-top:12px">',
      '<span>Created by: Administrator</span>',
      '<span>Approved by: __________</span>',
      '<span>Date: ' + new Date().toLocaleDateString() + '</span>',
      '</div>'
    ].join('')
  })
}

// ==================== 7. Set Margins ====================
const tableRef7 = ref()
const marginTop = ref('15mm')
const marginRight = ref('10mm')
const marginBottom = ref('15mm')
const marginLeft = ref('10mm')

const handlePrint7 = () => {
  tableRef7.value?.print({
    title: 'Employee Information Table',
    showIndex: true,
    margin: {
      top: marginTop.value,
      right: marginRight.value,
      bottom: marginBottom.value,
      left: marginLeft.value
    }
  })
}

// ==================== 8. Pagination ====================
const tableRef8 = ref()

// Generate more data for pagination testing
const moreData = ref(Array.from({ length: 20 }, (_, i) => ({
  name: 'Employee ' + (i + 1),
  age: 22 + (i % 15),
  dept: ['Engineering', 'Product', 'Design', 'Operations', 'Marketing'][i % 5],
  salary: 12000 + i * 500,
  status: i % 4 === 0 ? 'Inactive' : 'Active',
  address: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou'][i % 5] + ' City'
})))

const handlePrint8 = () => {
  tableRef8.value?.print({
    title: 'Employee Roster',
    showIndex: true,
    pageSize: 8,          // 8 items per page
    showPageNumber: true,  // Show page number
    showTime: true,
    showCount: true
  })
}

// ==================== 9. Print Multiple Tables ====================
const tableRef9 = ref()
const techData = baseData.value.filter(r => r.dept === 'Engineering' || r.dept === 'Product')
const otherData = baseData.value.filter(r => r.dept !== 'Engineering' && r.dept !== 'Product')

const handlePrint9 = () => {
  tableRef9.value?.printMultiple([
    {
      title: 'Engineering & Product Staff',
      data: techData,
      config: { showIndex: true }
    },
    {
      title: 'Other Department Staff',
      data: otherData,
      config: { showIndex: true }
    }
  ], {
    showTime: true,
    showCount: true
  })
}

// ==================== 10. Print Shipping Order ====================
const tableRef10 = ref()

const handlePrint10 = () => {
  const orderHtml = [
    '<div style="text-align:center;margin-bottom:20px">',
    '<div style="font-size:22px;font-weight:700">XX Technology Co., Ltd.</div>',
    '<div style="font-size:18px;margin-top:6px;color:#606266">S H I P P I N G   O R D E R</div>',
    '</div>',
    '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:12px;color:#606266">',
    '<span>Order No.: SH-2026020701</span>',
    '<span>Date: ' + new Date().toLocaleDateString() + '</span>',
    '<span>Customer: Example Corp</span>',
    '</div>',
    '<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:16px">',
    '<thead><tr>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">No.</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Item Name</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Spec</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Qty</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Price</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Amount</th>',
    '</tr></thead>',
    '<tbody>',
    '<tr><td style="border:1px solid #333;padding:8px;text-align:center">1</td><td style="border:1px solid #333;padding:8px">Smart Watch Pro</td><td style="border:1px solid #333;padding:8px">Black/44mm</td><td style="border:1px solid #333;padding:8px;text-align:right">50</td><td style="border:1px solid #333;padding:8px;text-align:right">¥2,999</td><td style="border:1px solid #333;padding:8px;text-align:right">¥149,950</td></tr>',
    '<tr><td style="border:1px solid #333;padding:8px;text-align:center">2</td><td style="border:1px solid #333;padding:8px">Wireless Headphone Max</td><td style="border:1px solid #333;padding:8px">White</td><td style="border:1px solid #333;padding:8px;text-align:right">100</td><td style="border:1px solid #333;padding:8px;text-align:right">¥1,599</td><td style="border:1px solid #333;padding:8px;text-align:right">¥159,900</td></tr>',
    '<tr><td style="border:1px solid #333;padding:8px;text-align:center">3</td><td style="border:1px solid #333;padding:8px">Charger 65W</td><td style="border:1px solid #333;padding:8px">Type-C</td><td style="border:1px solid #333;padding:8px;text-align:right">200</td><td style="border:1px solid #333;padding:8px;text-align:right">¥199</td><td style="border:1px solid #333;padding:8px;text-align:right">¥39,800</td></tr>',
    '</tbody>',
    '<tfoot><tr><td colspan="5" style="border:1px solid #333;padding:8px;text-align:right;font-weight:700">T O T A L</td><td style="border:1px solid #333;padding:8px;text-align:right;font-weight:700;color:#e6a23c">¥349,650</td></tr></tfoot>',
    '</table>',
    '<div style="display:flex;justify-content:space-between;font-size:13px;color:#606266;margin-top:30px">',
    '<div>Shipped by: __________</div>',
    '<div>Received by: __________</div>',
    '<div>Handled by: __________</div>',
    '</div>'
  ].join('')

  tableRef10.value?.printTemplate(orderHtml, {
    title: 'Shipping Order',
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  })
}

// ==================== Code Examples ====================

const tsPrintBasic = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">Print Table</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  tableRef.value?.print({ title: 'Employee Information Table', showIndex: true })
}
</${_S}>`
const jsPrintBasic = toJs(tsPrintBasic)

const tsCustomHeaderFooter = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">Custom Header and Footer</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: 'Employee Information Table',
    showIndex: true,
    headerHtml: '<div style="display:flex;justify-content:space-between;font-size:12px;color:#909399"><span>XX Corporation HR Dept</span><span>Confidential</span></div>',
    footerHtml: '<div style="text-align:center;font-size:12px;color:#909399;margin-top:8px">This report is for internal use only — Human Resources Department</div>'
  })
}
</${_S}>`
const jsCustomHeaderFooter = toJs(tsCustomHeaderFooter)

const tsAdvancedPrint = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Title: </span>
    <input v-model="printTitle" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showIndex" /> No.
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showTime" /> Time
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showCount" /> Count
    </label>
    <select v-model="orientation" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="portrait">Portrait</option>
      <option value="landscape">Landscape</option>
    </select>
    <yh-button type="primary" @click="handlePrint">Print</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const printTitle = ref('Employee Information Table')
const showIndex = ref(true)
const showTime = ref(true)
const showCount = ref(true)
const orientation = ref('portrait')

const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: printTitle.value,
    showIndex: showIndex.value,
    showTime: showTime.value,
    showCount: showCount.value,
    orientation: orientation.value
  })
}
</${_S}>`
const jsAdvancedPrint = toJs(tsAdvancedPrint)

const tsSpecifyCols = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Print Columns: </span>
    <label v-for="col in printCols" :key="col.prop" style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="col.checked" /> {{ col.label }}
    </label>
    <yh-button type="primary" @click="handlePrint">Print</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
const printCols = ref(columns.map(c => ({ ...c, checked: true })))
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])

const handlePrint = () => {
  const selected = printCols.value.filter(c => c.checked).map(c => c.prop)
  if (selected.length === 0) return
  tableRef.value?.print({ title: 'Print Specific Columns', columns: selected, showIndex: true })
}
</${_S}>`
const jsSpecifyCols = toJs(tsSpecifyCols)

const tsCustomTitle = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">Custom Header/Title</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: 'Quarterly Performance Report',
    headerHtml: [
      '<div style="text-align:center;margin-bottom:12px">',
      '<div style="font-size:20px;font-weight:700">XX Technology Co., Ltd.</div>',
      '<div style="font-size:14px;color:#606266;margin-top:4px">2026 Q1 Employee Performance Summary</div>',
      '<div style="font-size:12px;color:#909399;margin-top:4px">Report No.: HR-2026-Q1-001</div>',
      '</div>'
    ].join(''),
    showIndex: true
  })
}
</${_S}>`
const jsCustomTitle = toJs(tsCustomTitle)

const tsCustomFooter = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">Custom Footer</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: 'Employee Information Table',
    showIndex: true,
    footerHtml: [
      '<div style="display:flex;justify-content:space-between;font-size:11px;color:#909399;border-top:1px solid #ebeef5;padding-top:8px;margin-top:12px">',
      '<span>Created by: Administrator</span>',
      '<span>Approved by: __________</span>',
      '<span>Date: ' + new Date().toLocaleDateString() + '</span>',
      '</div>'
    ].join('')
  })
}
</${_S}>`
const jsCustomFooter = toJs(tsCustomFooter)

const tsMargin = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Top: </span>
    <input v-model="mt" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">Right: </span>
    <input v-model="mr" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">Bottom: </span>
    <input v-model="mb" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">Left: </span>
    <input v-model="ml" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <yh-button type="primary" @click="handlePrint">Print</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const mt = ref('15mm')
const mr = ref('10mm')
const mb = ref('15mm')
const ml = ref('10mm')

const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' },
  { name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, status: 'Active', address: 'Xihu, Hangzhou' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: 'Employee Information Table',
    showIndex: true,
    margin: { top: mt.value, right: mr.value, bottom: mb.value, left: ml.value }
  })
}
</${_S}>`
const jsMargin = toJs(tsMargin)

const tsPageSplit = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">Pagination Print (8 items per page)</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref(Array.from({ length: 20 }, (_, i) => ({
  name: 'Employee ' + (i + 1),
  age: 22 + (i % 15),
  dept: ['Engineering', 'Product', 'Design', 'Operations', 'Marketing'][i % 5],
  salary: 12000 + i * 500,
  status: i % 4 === 0 ? 'Inactive' : 'Active',
  address: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou'][i % 5] + ' City'
})))
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: 'Employee Roster',
    showIndex: true,
    pageSize: 8,
    showPageNumber: true,
    showTime: true,
    showCount: true
  })
}
</${_S}>`
const jsPageSplit = toJs(tsPageSplit)

const tsMultiTable = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">Print Multiple Tables</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', salary: 15000, status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', salary: 18000, status: 'Active', address: 'Pudong, Shanghai' },
  { name: 'Mike', age: 25, dept: 'Design', salary: 14000, status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, status: 'Active', address: 'Nanshan, Shenzhen' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'salary', label: 'Salary', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

const handlePrint = () => {
  const techData = data.value.filter(r => r.dept === 'Engineering' || r.dept === 'Product')
  const otherData = data.value.filter(r => r.dept !== 'Engineering' && r.dept !== 'Product')

  // printMultiple can print multiple tables with different titles/data, each table automatically paginated
  tableRef.value?.printMultiple([
    { title: 'Engineering & Product Staff', data: techData, config: { showIndex: true } },
    { title: 'Other Department Staff', data: otherData, config: { showIndex: true } }
  ], { showTime: true })
}
</${_S}>`
const jsMultiTable = toJs(tsMultiTable)

const tsOrderPrint = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">Print Shipping Order</yh-button>
  </div>
  <p style="font-size: 13px; color: #909399;">Use the printTemplate method to print completely custom HTML templates, such as shipping orders, invoices, etc.</p>
  <yh-table ref="tableRef" :data="[]" :columns="[]" style="display:none" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()

const handlePrint = () => {
  // Build Shipping Order HTML
  const orderHtml = '<div style="text-align:center;margin-bottom:20px">'
    + '<div style="font-size:22px;font-weight:700">XX Technology Co., Ltd.</div>'
    + '<div style="font-size:18px;margin-top:6px;color:#606266">S H I P P I N G   O R D E R</div>'
    + '</div>'
    + '<table style="width:100%;border-collapse:collapse;font-size:13px">'
    + '<thead><tr>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">No.</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Item Name</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Qty</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Price</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">Amount</th>'
    + '</tr></thead><tbody>'
    + '<tr><td style="border:1px solid #333;padding:8px;text-align:center">1</td><td style="border:1px solid #333;padding:8px">Smart Watch Pro</td><td style="border:1px solid #333;padding:8px;text-align:right">50</td><td style="border:1px solid #333;padding:8px;text-align:right">¥2,999</td><td style="border:1px solid #333;padding:8px;text-align:right">¥149,950</td></tr>'
    + '</tbody></table>'
    + '<div style="display:flex;justify-content:space-between;margin-top:30px;font-size:13px"><div>Shipped by: __________</div><div>Received by: __________</div></div>'

  tableRef.value?.printTemplate(orderHtml, {
    title: 'Shipping Order',
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  })
}
</${_S}>`
const jsOrderPrint = toJs(tsOrderPrint)
</script>

## Print Table

The most basic printing method, using the component instance method `print()` to generate a print preview in a new window.

<DemoBlock title="Print Table" :ts-code="tsPrintBasic" :js-code="jsPrintBasic">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint1">Print Table</yh-button>
  </div>
  <yh-table ref="tableRef1" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Custom Header and Footer

Custom the top and bottom content of the printed page via `headerHtml` and `footerHtml`.

<DemoBlock title="Custom Header and Footer" :ts-code="tsCustomHeaderFooter" :js-code="jsCustomHeaderFooter">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint2">Custom Header and Footer</yh-button>
  </div>
  <yh-table ref="tableRef2" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Advanced Print

Multiple options can be configured such as Title, No., Time, Count, and Paper orientation.

<DemoBlock title="Advanced Print" :ts-code="tsAdvancedPrint" :js-code="jsAdvancedPrint">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Title: </span>
    <input v-model="printTitle3" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="printShowIndex3" /> No.
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="printShowTime3" /> Time
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="printShowCount3" /> Count
    </label>
    <select v-model="printOrientation3" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="portrait">Portrait</option>
      <option value="landscape">Landscape</option>
    </select>
    <yh-button type="primary" @click="handlePrint3">Print</yh-button>
  </div>
  <yh-table ref="tableRef3" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Specify Columns

Control the columns to be printed by checking/unchecking.

<DemoBlock title="Specify Columns" :ts-code="tsSpecifyCols" :js-code="jsSpecifyCols">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Print Columns: </span>
    <label v-for="col in printCols4" :key="col.prop" style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="col.checked" /> {{ col.label }}
    </label>
    <yh-button type="primary" @click="handlePrint4">Print</yh-button>
  </div>
  <yh-table ref="tableRef4" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Custom Header/Title

Build complex company headers, including company name, report name, and report number via `headerHtml`.

<DemoBlock title="Custom Header/Title" :ts-code="tsCustomTitle" :js-code="jsCustomTitle">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint5">Custom Header/Title</yh-button>
  </div>
  <yh-table ref="tableRef5" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Custom Footer/Page Number

Add signature lines such as created by, approved by, and date via `footerHtml`.

<DemoBlock title="Custom Footer" :ts-code="tsCustomFooter" :js-code="jsCustomFooter">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint6">Custom Footer</yh-button>
  </div>
  <yh-table ref="tableRef6" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Set Margins

Configure the top, right, bottom, and left margins of the printed page via `margin`.

<DemoBlock title="Set Margins" :ts-code="tsMargin" :js-code="jsMargin">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Top: </span>
    <input v-model="marginTop" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">Right: </span>
    <input v-model="marginRight" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">Bottom: </span>
    <input v-model="marginBottom" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">Left: </span>
    <input v-model="marginLeft" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <yh-button type="primary" @click="handlePrint7">Print</yh-button>
  </div>
  <yh-table ref="tableRef7" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Paginate the Table for Printing

Set the maximum number of rows per page via `pageSize` for automatic pagination. Use `showPageNumber` to display page numbers.

<DemoBlock title="Pagination Print" :ts-code="tsPageSplit" :js-code="jsPageSplit">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint8">Pagination Print (8 items per page)</yh-button>
  </div>
  <yh-table ref="tableRef8" :data="moreData" :columns="columns" border show-index />
</DemoBlock>

## Print Multiple Tables

Print multiple tables with different data at once using the `printMultiple` method, with each table automatically paginated.

<DemoBlock title="Print Multiple Tables" :ts-code="tsMultiTable" :js-code="jsMultiTable">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint9">Print Multiple Tables</yh-button>
  </div>
  <yh-table ref="tableRef9" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Print Shipping Order

The `printTemplate` method allows for the printing of completely custom HTML templates, such as shipping orders, invoices, reports, etc.

<DemoBlock title="Print Shipping Order" :ts-code="tsOrderPrint" :js-code="jsOrderPrint">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint10">Print Shipping Order</yh-button>
  </div>
  <p style="font-size: 13px; color: #909399;">Use the <code>printTemplate</code> method to print completely custom HTML templates, such as shipping orders, invoices, etc.</p>
  <yh-table ref="tableRef10" :data="[]" :columns="[]" style="display: none" />
</DemoBlock>

## API

### print(config?) Method

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Print title | `string` | — |
| showIndex | Whether to show the index (No.) column | `boolean` | `false` |
| indexTitle | Index column title | `string` | `'No.'` |
| columns | Specify columns to print (prop array) | `string[]` | All visible columns |
| excludeColumns | Exclude columns | `string[]` | — |
| data | Custom print data | `Record<string, unknown>[]` | Current data |
| formatCell | Format cell content | `(value, column, row) => string` | — |
| headerHtml | Custom header HTML | `string` | — |
| footerHtml | Custom footer HTML | `string` | — |
| margin | Page margins | `{ top?, right?, bottom?, left? }` | `10mm` |
| orientation | Page orientation | `'portrait' \| 'landscape'` | `'portrait'` |
| showTime | Whether to show print time | `boolean` | `true` |
| showCount | Whether to show record count | `boolean` | `true` |
| columnTitles | Custom Column Titles | `Record<string, string>` | — |
| pageSize | Maximum rows per page | `number` | — |
| showPageNumber | Whether to show page numbers | `boolean` | `false` |
| tableStyle | Custom table style | `string` | — |
| extraCss | Extra CSS | `string` | — |
| autoPrint | Automatically pop up print dialog | `boolean` | `false` |
| beforePrint | Callback before print | `() => boolean` | — |
| afterPrint | Callback after print | `() => void` | — |

### printMultiple(tables, config?) Method

Print multiple tables at once; each table is automatically paginated.

| Parameter | Description | Type |
| --- | --- | --- |
| tables | Table configuration array | `Array<{ title?, data, columns?, config? }>` |
| config | Global configuration | Same as `print(config)` |

### printTemplate(html, config?) Method

Print a completely custom HTML template.

| Parameter | Description | Type |
| --- | --- | --- |
| html | Custom HTML content | `string` |
| config | Print configuration | Same as `print(config)` |

### Notes

- Printing depends on `window.open()`; ensure the browser allows popups.
- Print styles are implemented via inline CSS to ensure correct rendering in the print preview.
- Use the `@page` CSS rule to control page orientation and margins.
- Pagination is implemented using `page-break-after: always`.
- `autoPrint: true` automatically pops up the print dialog after the window opens.
