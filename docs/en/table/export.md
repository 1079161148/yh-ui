# Table - Export Data

Through the built-in export feature, you can export table data to CSV, JSON, TXT, XML, HTML, XLSX and other formats, supporting custom columns, formatted content, excluded columns and other advanced configurations.

<script setup lang="ts">
import { ref, computed } from 'vue'
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

// ==================== 1. Export Data (Basic CSV) ====================
const tableRef1 = ref()
const handleExport1 = () => {
  tableRef1.value?.exportData({ type: 'csv', filename: 'Employees' })
}

// ==================== 2. Export TXT ====================
const tableRef2 = ref()
const handleExport2 = () => {
  tableRef2.value?.exportData({ type: 'txt', filename: 'Employees' })
}

// ==================== 3. Export XML ====================
const tableRef3 = ref()
const handleExport3 = () => {
  tableRef3.value?.exportData({ type: 'xml', filename: 'Employees' })
}

// ==================== 4. Export HTML ====================
const tableRef4 = ref()
const handleExport4 = () => {
  tableRef4.value?.exportData({ type: 'html', filename: 'Employees' })
}

// ==================== 5. Export CSV (Detailed) ====================
const tableRef5 = ref()
const handleExport5 = () => {
  tableRef5.value?.exportData({
    type: 'csv',
    filename: 'Employee Data',
    showIndex: true,
    indexTitle: 'No.'
  })
}

// ==================== 6. Export JSON ====================
const tableRef6 = ref()
const handleExport6 = () => {
  tableRef6.value?.exportData({ type: 'json', filename: 'Employee Data' })
}

// ==================== 6.5. Export Excel ====================
const tableRef6_5 = ref()
const handleExport6_5 = () => {
  tableRef6_5.value?.exportData({
    type: 'xlsx',
    filename: 'Employee Data',
    sheetName: 'Employees',
    autoWidth: true
  })
}

// ==================== 7. Custom Data Export ====================
const tableRef7 = ref()
const handleExport7 = () => {
  const customData = baseData.value.filter(row => row.status === 'Active')
  tableRef7.value?.exportData({
    type: 'csv',
    filename: 'Active Employees',
    data: customData
  })
}

// ==================== 8. Formatted Export ====================
const tableRef8 = ref()
const handleExport8 = () => {
  tableRef8.value?.exportData({
    type: 'csv',
    filename: 'Formatted Export',
    formatCell: (value: unknown, column: Record<string, unknown>) => {
      if (column.prop === 'salary') return '¥' + Number(value).toLocaleString()
      if (column.prop === 'status') return value === 'Active' ? '✓ Active' : '✗ Inactive'
      return String(value ?? '')
    }
  })
}

// ==================== 9. Advanced Export ====================
const tableRef9 = ref()
const exportType9 = ref('csv')
const exportFilename9 = ref('Advanced Export')
const exportShowIndex9 = ref(true)
const exportIncludeHeader9 = ref(true)
const exportResult9 = ref('')

const handleExport9 = () => {
  tableRef9.value?.exportData({
    type: exportType9.value,
    filename: exportFilename9.value,
    showIndex: exportShowIndex9.value,
    includeHeader: exportIncludeHeader9.value,
    afterExport: (type: string) => {
      exportResult9.value = 'Exported as ' + type.toUpperCase() + ' format'
    }
  })
}

// ==================== 10. Exclude Columns ====================
const tableRef10 = ref()
const handleExport10 = () => {
  tableRef10.value?.exportData({
    type: 'csv',
    filename: 'Export Excluding Columns',
    excludeColumns: ['salary', 'address']
  })
}

// ==================== 11. Specify Columns ====================
const tableRef11 = ref()
const handleExport11 = () => {
  tableRef11.value?.exportData({
    type: 'csv',
    filename: 'Export Specified Columns',
    columns: ['name', 'dept', 'status']
  })
}

// ==================== 12. Custom Column Titles ====================
const tableRef12 = ref()
const handleExport12 = () => {
  tableRef12.value?.exportData({
    type: 'csv',
    filename: 'Custom Column Titles',
    columnTitles: {
      name: 'Name',
      age: 'Age',
      dept: 'Department',
      salary: 'Salary',
      status: 'Status',
      address: 'Address'
    }
  })
}

// ==================== 13. Custom Export Type (Dropdown) ====================
const tableRef13 = ref()
const exportType13 = ref('csv')
const handleExport13 = () => {
  tableRef13.value?.exportData({
    type: exportType13.value,
    filename: 'Custom Export'
  })
}

// ==================== 14. Server-Side Export ====================
const serverLoading = ref(false)
const serverResult = ref('')
const handleServerExport = () => {
  serverLoading.value = true
  serverResult.value = ''
  setTimeout(() => {
    // Simulate server returning download link
    serverLoading.value = false
    serverResult.value = 'Server generated file, simulated download complete'
  }, 1500)
}

// ==================== 15. Export Mode (Return String) ====================
const tableRef15 = ref()
const stringResult = ref('')
const handleExportString = async () => {
  const content = await tableRef15.value?.exportData({
    type: 'csv',
    mode: 'string',
    filename: 'test'
  })
  stringResult.value = typeof content === 'string' ? content.substring(0, 200) + '...' : ''
}

// ==================== Code Examples ====================
const tsExportData = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export Data</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({ type: 'csv', filename: 'Employees' })
}
</${_S}>`
const jsExportData = toJs(tsExportData)

const tsExportTxt = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export TXT</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({ type: 'txt', filename: 'Employees' })
}
</${_S}>`
const jsExportTxt = toJs(tsExportTxt)

const tsExportXml = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export XML</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({ type: 'xml', filename: 'Employees' })
}
</${_S}>`
const jsExportXml = toJs(tsExportXml)

const tsExportHtml = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export HTML</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({ type: 'html', filename: 'Employees' })
}
</${_S}>`
const jsExportHtml = toJs(tsExportHtml)

const tsExportCsv = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export CSV (with Index)</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: 'Employee Data',
    showIndex: true,
    indexTitle: 'No.'
  })
}
</${_S}>`
const jsExportCsv = toJs(tsExportCsv)

const tsExportJson = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export JSON</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({ type: 'json', filename: 'Employee Data' })
}
</${_S}>`
const jsExportJson = toJs(tsExportJson)

const tsExportExcel = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export Excel</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'xlsx',
    filename: 'Employee Data',
    sheetName: 'Employees', // Sheet name
    autoWidth: true      // Auto calculate column width
  })
}
</${_S}>`
const jsExportExcel = toJs(tsExportExcel)

const tsCustomData = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px;">
    <yh-button type="primary" @click="handleExport">Export Active Employees Only</yh-button>
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

const handleExport = () => {
  // Custom export data: only export active employees
  const customData = data.value.filter(row => row.status === 'Active')
  tableRef.value?.exportData({
    type: 'csv',
    filename: 'Active Employees',
    data: customData
  })
}
</${_S}>`
const jsCustomData = toJs(tsCustomData)

const tsFormatExport = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Formatted Export</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: 'Formatted Export',
    formatCell: (value: unknown, column: Record<string, unknown>) => {
      // Add RMB symbol to Salary
      if (column.prop === 'salary') return '¥' + Number(value).toLocaleString()
      // Add icon for status
      if (column.prop === 'status') return value === 'Active' ? '✓ Active' : '✗ Inactive'
      return String(value ?? '')
    }
  })
}
</${_S}>`
const jsFormatExport = toJs(tsFormatExport)

const tsAdvancedExport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Format:</span>
    <select v-model="exportType" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">Filename:</span>
    <input v-model="filename" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showIndex" /> Include Index
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="includeHeader" /> Include Header
    </label>
    <yh-button type="primary" @click="handleExport">Export</yh-button>
  </div>
  <span v-if="result" style="display: block; margin-bottom: 8px; color: #67c23a; font-size: 13px;">{{ result }}</span>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const exportType = ref('csv')
const filename = ref('Advanced Export')
const showIndex = ref(true)
const includeHeader = ref(true)
const result = ref('')

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

const handleExport = () => {
  tableRef.value?.exportData({
    type: exportType.value,
    filename: filename.value,
    showIndex: showIndex.value,
    includeHeader: includeHeader.value,
    afterExport: (type: string) => {
      result.value = 'Exported as ' + type.toUpperCase() + ' format'
    }
  })
}
</${_S}>`
const jsAdvancedExport = toJs(tsAdvancedExport)

const tsExcludeCol = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export Excluding Salary and Address</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: 'Export Excluding Columns',
    excludeColumns: ['salary', 'address'] // Exclude these columns
  })
}
</${_S}>`
const jsExcludeCol = toJs(tsExcludeCol)

const tsSpecifyCol = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export Only Name, Department, Status</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: 'Export Specified Columns',
    columns: ['name', 'dept', 'status'] // Only export these columns
  })
}
</${_S}>`
const jsSpecifyCol = toJs(tsSpecifyCol)

const tsCustomCol = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">Export with Custom Column Titles</yh-button>
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

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: 'employees',
    columnTitles: {
      name: 'Name', age: 'Age', dept: 'Department',
      salary: 'Salary', status: 'Status', address: 'Address'
    }
  })
}
</${_S}>`
const jsCustomCol = toJs(tsCustomCol)

const tsCustomExportType = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Export Format:</span>
    <select v-model="exportType" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <yh-button type="primary" @click="handleExport">Export</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const exportType = ref('csv')
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

const handleExport = () => {
  tableRef.value?.exportData({ type: exportType.value, filename: 'Custom Export' })
}
</${_S}>`
const jsCustomExportType = toJs(tsCustomExportType)

const tsServerExport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="loading" @click="handleExport">
      {{ loading ? 'Exporting...' : 'Server-Side Export' }}
    </yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const result = ref('')
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

const handleExport = async () => {
  loading.value = true
  result.value = ''
  // Real scenario: send request to server, server generates file and returns download link
  // const res = await fetch('/api/export', {
  //   method: 'POST',
  //   body: JSON.stringify({ data: data.value, type: 'xlsx' })
  // })
  // const blob = await res.blob()
  // const url = URL.createObjectURL(blob)
  // const a = document.createElement('a')
  // a.href = url; a.download = 'export.xlsx'; a.click()
  setTimeout(() => {
    loading.value = false
    result.value = 'Server-side export complete'
  }, 1500)
}
</${_S}>`
const jsServerExport = toJs(tsServerExport)

const tsExportMode = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px;">
    <yh-button type="primary" @click="handleExport">Export as String (No Download)</yh-button>
  </div>
  <div v-if="result" style="background: #f5f7fa; padding: 12px; border-radius: 4px; font-size: 12px; max-height: 200px; overflow: auto; white-space: pre; font-family: monospace;">{{ result }}</div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
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

const handleExport = async () => {
  // mode: 'string' does not trigger download, returns content string instead
  const content = await tableRef.value?.exportData({
    type: 'csv',
    mode: 'string',
    filename: 'test'
  })
  result.value = content || ''
}
</${_S}>`
const jsExportMode = toJs(tsExportMode)
</script>

## Export Data

The most basic export method, export table data as a CSV file through the component instance method `exportData()`.

<DemoBlock title="Export Data" :ts-code="tsExportData" :js-code="jsExportData">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport1">Export Data</yh-button>
  </div>
  <yh-table ref="tableRef1" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Export TXT Format

TXT format uses Tab-separated columns, which can be directly pasted into Excel.

<DemoBlock title="Export TXT" :ts-code="tsExportTxt" :js-code="jsExportTxt">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport2">Export TXT</yh-button>
  </div>
  <yh-table ref="tableRef2" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Export XML Format

Export standard XML structure, suitable for data exchange with other systems.

<DemoBlock title="Export XML" :ts-code="tsExportXml" :js-code="jsExportXml">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport3">Export XML</yh-button>
  </div>
  <yh-table ref="tableRef3" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Export HTML Format

Export styled HTML table file, viewable directly in a browser.

<DemoBlock title="Export HTML" :ts-code="tsExportHtml" :js-code="jsExportHtml">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport4">Export HTML</yh-button>
  </div>
  <yh-table ref="tableRef4" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Export CSV Format

CSV export supports Include Index column, automatically adding BOM header to ensure correct Chinese display in Excel.

<DemoBlock title="Export CSV" :ts-code="tsExportCsv" :js-code="jsExportCsv">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport5">Export CSV (with Index)</yh-button>
  </div>
  <yh-table ref="tableRef5" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Export JSON Format

JSON format export that preserves original data types.

<DemoBlock title="Export JSON" :ts-code="tsExportJson" :js-code="jsExportJson">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport6">Export JSON</yh-button>
  </div>
  <yh-table ref="tableRef6" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Export Excel Format

Export as `.xlsx` format Excel file, supporting Auto calculate column width, custom Sheet name and other advanced features.

> **Tip:** Excel export relies on the `xlsx` library. Exported files can be opened directly with Microsoft Excel, WPS and other software.

<DemoBlock title="Export Excel" :ts-code="tsExportExcel" :js-code="jsExportExcel">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport6_5">Export Excel</yh-button>
  </div>
  <yh-table ref="tableRef6_5" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Custom Data

Specify export data through the `data` parameter to implement filtered export.

<DemoBlock title="Custom Data" :ts-code="tsCustomData" :js-code="jsCustomData">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport7">Export Active Employees Only</yh-button>
  </div>
  <yh-table ref="tableRef7" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Formatted Export Content

Customize cell export values through the `formatCell` callback function, such as adding currency symbols, status icons, etc.

<DemoBlock title="Formatted Export" :ts-code="tsFormatExport" :js-code="jsFormatExport">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport8">Formatted Export</yh-button>
  </div>
  <yh-table ref="tableRef8" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Advanced Export

Configure export format, filename, whether to include Index and header, and get export result through `afterExport` callback.

<DemoBlock title="Advanced Export" :ts-code="tsAdvancedExport" :js-code="jsAdvancedExport">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Format:</span>
    <select v-model="exportType9" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">Filename:</span>
    <input v-model="exportFilename9" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="exportShowIndex9" /> Include Index
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="exportIncludeHeader9" /> Include Header
    </label>
    <yh-button type="primary" @click="handleExport9">Export</yh-button>
  </div>
  <span v-if="exportResult9" style="display: block; margin-bottom: 8px; color: #67c23a; font-size: 13px;">{{ exportResult9 }}</span>
  <yh-table ref="tableRef9" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Exclude Columns

Specify columns not to be exported through `excludeColumns`.

<DemoBlock title="Exclude Columns" :ts-code="tsExcludeCol" :js-code="jsExcludeCol">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport10">Export Excluding Salary and Address</yh-button>
  </div>
  <yh-table ref="tableRef10" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Specify Columns

Specify which columns to export through `columns`.

<DemoBlock title="Specify Columns" :ts-code="tsSpecifyCol" :js-code="jsSpecifyCol">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport11">Export Only Name, Department, Status</yh-button>
  </div>
  <yh-table ref="tableRef11" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Custom Column Titles

Use `columnTitles` to customize column titles when exporting, e.g., export English headers.

<DemoBlock title="Custom Column Titles" :ts-code="tsCustomCol" :js-code="jsCustomCol">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport12">Export with Custom Column Titles</yh-button>
  </div>
  <yh-table ref="tableRef12" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Custom Export Type

Select export format through a dropdown menu.

<DemoBlock title="Custom Export Type" :ts-code="tsCustomExportType" :js-code="jsCustomExportType">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Export Format:</span>
    <select v-model="exportType13" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <yh-button type="primary" @click="handleExport13">Export</yh-button>
  </div>
  <yh-table ref="tableRef13" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Server-Side Export

For very large datasets or scenarios requiring XLSX/PDF format generation, server-side export is recommended.

<DemoBlock title="Server-Side Export" :ts-code="tsServerExport" :js-code="jsServerExport">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="serverLoading" @click="handleServerExport">
      {{ serverLoading ? 'Exporting...' : 'Server-Side Export' }}
    </yh-button>
    <span v-if="serverResult" style="color: #67c23a; font-size: 13px;">{{ serverResult }}</span>
  </div>
  <yh-table :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## Custom Export Mode

Setting `mode: 'string'` returns the export content string without triggering download, suitable for copying to clipboard or further processing.

<DemoBlock title="Custom Export Mode" :ts-code="tsExportMode" :js-code="jsExportMode">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExportString">Export as String (No Download)</yh-button>
  </div>
  <pre v-if="stringResult" style="background: #f5f7fa; padding: 12px; border-radius: 4px; font-size: 12px; max-height: 200px; overflow: auto;">{{ stringResult }}</pre>
  <yh-table ref="tableRef15" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## API

### exportData(config?) Method

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| type | Export format | `'csv' \| 'json' \| 'txt' \| 'xml' \| 'html' \| 'xlsx'` | `'csv'` |
| filename | Filename (without extension) | `string` | `'export'` |
| includeHeader | Whether to include Header | `boolean` | `true` |
| showIndex | Whether to include Index column | `boolean` | `false` |
| indexTitle | Index column title | `string` | `'No.'` |
| columns | Specify export columns (prop array) | `string[]` | All visible columns |
| excludeColumns | Exclude columns (prop array) | `string[]` | — |
| visibleOnly | Whether to export only visible columns | `boolean` | `true` |
| data | Custom Export Data | `Record<string, unknown>[]` | Current table data |
| columnTitles | Custom Column Titles mapping | `Record<string, string>` | — |
| formatCell | Format cell content | `(value, column, row) => string` | — |
| separator | CSV separator | `string` | `','` |
| bom | Whether to add BOM header | `boolean` | `true` |
| mode | Export mode | `'download' \| 'string'` | `'download'` |
| beforeExport | Before export callback | `() => boolean` | — |
| afterExport | After export callback | `(type) => void` | — |
| sheetName | Sheet name (XLSX only) | `string` | `'Sheet1'` |
| columnWidths | Column width config (XLSX only), e.g. `{ name: 15, address: 30 }` | `Record<string, number>` | — |
| defaultColWidth | Default column width (XLSX only) | `number` | `12` |
| autoWidth | Whether to auto-adjust column width (XLSX only) | `boolean` | `true` |

### Format Descriptions

| Format | Extension | MIME | Features |
| --- | --- | --- | --- |
| CSV | `.csv` | `text/csv` | Universal format, Excel can open directly, auto BOM |
| JSON | `.json` | `application/json` | Preserves original data types, suitable for inter-program exchange |
| TXT | `.txt` | `text/plain` | Tab-separated, can be pasted directly into Excel |
| XML | `.xml` | `application/xml` | Standard XML structure, suitable for system integration |
| HTML | `.html` | `text/html` | Styled table, viewable directly in browser |
| XLSX | `.xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | Excel format, supports auto column width, multiple sheets |

