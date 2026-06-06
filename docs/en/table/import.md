# Table - Import Data

Through the built-in import feature, you can import file data in CSV, JSON, TXT, XML, HTML, XLSX and other formats into the table, supporting multiple import modes and data validation.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== Common Column Config ====================
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

const baseRows = [
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
]

// ==================== 1. Import Data (Basic) ====================
const data1 = ref([...baseRows])
const tableRef1 = ref()
const importResult1 = ref('')

const handleImport1 = async () => {
  const rows = await tableRef1.value?.openImport({ type: 'csv', mode: 'insertBottom' })
  if (rows?.length) importResult1.value = 'Successfully imported ' + rows.length + ' records'
}

const clearData1 = () => { data1.value = []; importResult1.value = '' }

// ==================== 2. Import TXT ====================
const data2 = ref([...baseRows])
const tableRef2 = ref()
const importResult2 = ref('')

const handleImport2 = async () => {
  const rows = await tableRef2.value?.openImport({ type: 'txt', mode: 'insertBottom' })
  if (rows?.length) importResult2.value = 'Successfully imported ' + rows.length + ' records'
}

// ==================== 3. Import XML ====================
const data3 = ref([...baseRows])
const tableRef3 = ref()
const importResult3 = ref('')

const handleImport3 = async () => {
  const rows = await tableRef3.value?.openImport({ type: 'xml', mode: 'insertBottom' })
  if (rows?.length) importResult3.value = 'Successfully imported ' + rows.length + ' records'
}

// ==================== 4. Import HTML ====================
const data4 = ref([...baseRows])
const tableRef4 = ref()
const importResult4 = ref('')

const handleImport4 = async () => {
  const rows = await tableRef4.value?.openImport({ type: 'html', mode: 'insertBottom' })
  if (rows?.length) importResult4.value = 'Successfully imported ' + rows.length + ' records'
}

// ==================== 5. Import CSV ====================
const data5 = ref([...baseRows])
const tableRef5 = ref()
const importResult5 = ref('')

const handleImport5 = async () => {
  const rows = await tableRef5.value?.openImport({ type: 'csv', mode: 'insertBottom' })
  if (rows?.length) importResult5.value = 'Successfully imported ' + rows.length + ' records'
}

// ==================== 6. Import JSON ====================
const data6 = ref([...baseRows])
const tableRef6 = ref()
const importResult6 = ref('')

const handleImport6 = async () => {
  const rows = await tableRef6.value?.openImport({ type: 'json', mode: 'insertBottom' })
  if (rows?.length) importResult6.value = 'Successfully imported ' + rows.length + ' records'
}

// ==================== 7. Advanced Import ====================
const data7 = ref([...baseRows])
const tableRef7 = ref()
const importMode7 = ref<string>('insertBottom')
const importType7 = ref<string>('csv')
const importResult7 = ref('')
const maxRows7 = ref(100)

const handleAdvancedImport = async () => {
  const rows = await tableRef7.value?.openImport({
    type: importType7.value,
    mode: importMode7.value,
    maxRows: maxRows7.value,
    numberFields: ['age'],
    beforeImport: (rows: Record<string, unknown>[]) => {
      if (rows.length === 0) {
        importResult7.value = 'File content is empty'
        return false
      }
      return rows
    },
    afterImport: (rows: Record<string, unknown>[], mode: string) => {
      importResult7.value = 'Imported via ' + importType7.value.toUpperCase() + ' format in ' +
        (mode === 'covering' ? 'Covering' : mode === 'insertTop' ? 'Insert Top' : 'Insert Bottom') +
        ' mode imported ' + rows.length + ' records'
    }
  })
}

// ==================== 8. Import Excel ====================
const data8 = ref([...baseRows])
const tableRef8 = ref()
const importResult8 = ref('')

const handleImport8 = async () => {
  const rows = await tableRef8.value?.openImport({ type: 'xlsx', mode: 'insertBottom' })
  if (rows?.length) importResult8.value = 'Successfully imported ' + rows.length + ' records'
}

// ==================== 9. Server-Side Import ====================
const data9 = ref([...baseRows])
const uploadLoading = ref(false)
const importResult9 = ref('')

const handleServerImport = async () => {
  uploadLoading.value = true
  importResult9.value = ''
  // Simulate uploading to server for processing and returning data
  setTimeout(() => {
    const serverData = [
      { name: 'David S.', age: 31, dept: 'Finance', status: 'Active', address: 'Jinjiang, Chengdu' },
      { name: 'Kevin Z.', age: 27, dept: 'HR', status: 'Active', address: 'Wuchang, Wuhan' },
      { name: 'Frank W.', age: 36, dept: 'Legal', status: 'Active', address: 'Gulou, Nanjing' }
    ]
    data9.value = [...data9.value, ...serverData]
    uploadLoading.value = false
    importResult9.value = 'Server returned ' + serverData.length + ' records loaded'
  }, 1500)
}

// ==================== Code Examples ====================
const tsImportData = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">Import Data</yh-button>
    <yh-button @click="data = []">Clear</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

const handleImport = async () => {
  // Call built-in openImport method
  const rows = await tableRef.value?.openImport({
    type: 'csv',        // Import format
    mode: 'insertBottom' // Insert Bottom
  })
  if (rows?.length) result.value = 'Successfully imported ' + rows.length + ' records'
}
</${_S}>`
const jsImportData = toJs(tsImportData)

const tsImportTxt = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">Import TXT</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

// TXT file uses Tab-separated columns (TSV format)
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'txt', mode: 'insertBottom' })
  if (rows?.length) result.value = 'Successfully imported ' + rows.length + ' records'
}
</${_S}>`
const jsImportTxt = toJs(tsImportTxt)

const tsImportXml = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">Import XML</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

// See XML format examples in the documentation
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'xml', mode: 'insertBottom' })
  if (rows?.length) result.value = 'Successfully imported ' + rows.length + ' records'
}
</${_S}>`
const jsImportXml = toJs(tsImportXml)

const tsImportHtml = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">Import HTML</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

// HTML file must contain standard table structure, thead for headers, tbody for data
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'html', mode: 'insertBottom' })
  if (rows?.length) result.value = 'Successfully imported ' + rows.length + ' records'
}
</${_S}>`
const jsImportHtml = toJs(tsImportHtml)

const tsImportCsv = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">Import CSV</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

const handleImport = async () => {
  const rows = await tableRef.value?.openImport({
    type: 'csv',
    mode: 'insertBottom',
    numberFields: ['age'] // Auto convert age field to number
  })
  if (rows?.length) result.value = 'Successfully imported ' + rows.length + ' records'
}
</${_S}>`
const jsImportCsv = toJs(tsImportCsv)

const tsImportJson = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">Import JSON</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'json', mode: 'insertBottom' })
  if (rows?.length) result.value = 'Successfully imported ' + rows.length + ' records'
}
</${_S}>`
const jsImportJson = toJs(tsImportJson)

const tsImportExcel = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">Import Excel</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

// Excel files need to include Header row, column names should match table column label or prop
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({
    type: 'xlsx',
    mode: 'insertBottom',
    numberFields: ['age'] // Auto convert age field to number
  })
  if (rows?.length) result.value = 'Successfully imported ' + rows.length + ' records'
}
</${_S}>`
const jsImportExcel = toJs(tsImportExcel)

const tsAdvancedImport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Format:</span>
    <select v-model="importType" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">Mode:</span>
    <select v-model="importMode" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="insertTop">Insert Top</option>
      <option value="insertBottom">Insert Bottom</option>
      <option value="covering">Covering</option>
    </select>
    <span style="font-size: 13px; color: #606266;">Max Rows:</span>
    <input v-model.number="maxRows" type="number" min="1" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 80px;" />
    <yh-button type="primary" @click="handleImport">Advanced Import</yh-button>
    <yh-button @click="data = []">Clear</yh-button>
  </div>
  <span v-if="result" style="display: block; margin-bottom: 8px; color: #67c23a; font-size: 13px;">{{ result }}</span>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const importType = ref('csv')
const importMode = ref('insertBottom')
const maxRows = ref(100)

const data = ref([
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

const handleImport = async () => {
  await tableRef.value?.openImport({
    type: importType.value,
    mode: importMode.value,
    maxRows: maxRows.value,
    numberFields: ['age'],
    beforeImport: (rows: Record<string, unknown>[]) => {
      if (rows.length === 0) {
        result.value = 'File content is empty'
        return false
      }
      return rows
    },
    afterImport: (rows: Record<string, unknown>[]) => {
      result.value = 'Successfully imported ' + rows.length + ' records'
    }
  })
}
</${_S}>`
const jsAdvancedImport = toJs(tsAdvancedImport)

const tsServerImport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="loading" @click="handleServerImport">
      {{ loading ? 'Uploading...' : 'Server-Side Import' }}
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
  { name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' }
])
const columns = [
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
  { prop: 'address', label: 'Address' }
]

const handleServerImport = async () => {
  loading.value = true
  result.value = ''

  // Real scenario: select file, upload to server, server parses and returns data
  // const file = await selectFile()
  // const formData = new FormData()
  // formData.append('file', file)
  // const res = await fetch('/api/import', { method: 'POST', body: formData })
  // const serverData = await res.json()

  // Simulate server response
  setTimeout(() => {
    const serverData = [
      { name: 'David S.', age: 31, dept: 'Finance', status: 'Active', address: 'Jinjiang, Chengdu' },
      { name: 'Kevin Z.', age: 27, dept: 'HR', status: 'Active', address: 'Wuchang, Wuhan' }
    ]
    data.value = [...data.value, ...serverData]
    loading.value = false
    result.value = 'Server returned ' + serverData.length + ' records'
  }, 1500)
}
</${_S}>`
const jsServerImport = toJs(tsServerImport)
</script>

## Import Data

The most basic import method, opening the file picker through the component instance method `openImport()`.

<DemoBlock title="Import Data" :ts-code="tsImportData" :js-code="jsImportData">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport1">Import Data</yh-button>
    <yh-button @click="clearData1">Clear</yh-button>
    <span v-if="importResult1" style="color: #67c23a; font-size: 13px;">{{ importResult1 }}</span>
  </div>
  <yh-table ref="tableRef1" :data="data1" :columns="columns" border show-index @update:data="data1 = $event" />
</DemoBlock>

## Import TXT Format

TXT format uses Tab-separated columns (TSV format), consistent with the format of copying and pasting from Excel to Notepad.

**TXT file format:**

```
Name	Age	Department	Status	Address
Wang Wu	25	Design	Active	Guangzhou Tianhe
Zhao Liu	35	Operations	Active	Shenzhen Nanshan
```

<DemoBlock title="Import TXT" :ts-code="tsImportTxt" :js-code="jsImportTxt">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport2">Import TXT</yh-button>
    <span v-if="importResult2" style="color: #67c23a; font-size: 13px;">{{ importResult2 }}</span>
  </div>
  <yh-table ref="tableRef2" :data="data2" :columns="columns" border show-index @update:data="data2 = $event" />
</DemoBlock>

## Import XML Format

Supports importing standard XML format table data.

**XML file format:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<table>
  <columns>
    <column name="Name" />
    <column name="Age" />
    <column name="Department" />
    <column name="Status" />
    <column name="Address" />
  </columns>
  <rows>
    <row>
      <cell>Wang Wu</cell>
      <cell>25</cell>
      <cell>Design</cell>
      <cell>Active</cell>
      <cell>Guangzhou Tianhe</cell>
    </row>
  </rows>
</table>
```

<DemoBlock title="Import XML" :ts-code="tsImportXml" :js-code="jsImportXml">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport3">Import XML</yh-button>
    <span v-if="importResult3" style="color: #67c23a; font-size: 13px;">{{ importResult3 }}</span>
  </div>
  <yh-table ref="tableRef3" :data="data3" :columns="columns" border show-index @update:data="data3 = $event" />
</DemoBlock>

## Import HTML Format

Supports importing HTML files containing `<table>`, automatically identifies `<thead>` as header and `<tbody>` as data.

**HTML file format:**

```html
<table>
  <thead>
    <tr><th>Name</th><th>Age</th><th>Department</th><th>Status</th><th>Address</th></tr>
  </thead>
  <tbody>
    <tr><td>Wang Wu</td><td>25</td><td>Design</td><td>Active</td><td>Guangzhou Tianhe</td></tr>
  </tbody>
</table>
```

<DemoBlock title="Import HTML" :ts-code="tsImportHtml" :js-code="jsImportHtml">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport4">Import HTML</yh-button>
    <span v-if="importResult4" style="color: #67c23a; font-size: 13px;">{{ importResult4 }}</span>
  </div>
  <yh-table ref="tableRef4" :data="data4" :columns="columns" border show-index @update:data="data4 = $event" />
</DemoBlock>

## Import CSV Format

CSV (Comma Separated Values) is the most common import format for tables, first row is the header.

**CSV file format:**

```csv
Name,Age,Department,Status,Address
Wang Wu,25,Design,Active,Guangzhou Tianhe
Zhao Liu,35,Operations,Active,Shenzhen Nanshan
```

> **Tip:** Import supports `numberFields` configuration to automatically convert specified field values to number type.

<DemoBlock title="Import CSV" :ts-code="tsImportCsv" :js-code="jsImportCsv">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport5">Import CSV</yh-button>
    <span v-if="importResult5" style="color: #67c23a; font-size: 13px;">{{ importResult5 }}</span>
  </div>
  <yh-table ref="tableRef5" :data="data5" :columns="columns" border show-index @update:data="data5 = $event" />
</DemoBlock>

## Import JSON Format

JSON format is the most precise import format, key automatically matches column's `prop` or `label`.

**JSON file format:**

```json
[
  { "name": "Wang Wu", "age": 25, "dept": "Design", "status": "Active", "address": "Guangzhou Tianhe" },
  { "name": "Zhao Liu", "age": 35, "dept": "Operations", "status": "Active", "address": "Shenzhen Nanshan" }
]
```

<DemoBlock title="Import JSON" :ts-code="tsImportJson" :js-code="jsImportJson">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport6">Import JSON</yh-button>
    <span v-if="importResult6" style="color: #67c23a; font-size: 13px;">{{ importResult6 }}</span>
  </div>
  <yh-table ref="tableRef6" :data="data6" :columns="columns" border show-index @update:data="data6 = $event" />
</DemoBlock>

## Import Excel Format

Supports importing `.xlsx`, `.xls`, `.xlsm` format Excel files. First row is header, column names should match table column `label` or `prop`.

> **Tip:** Excel import relies on the `xlsx` library for parsing, which is powerful and has good compatibility.

<DemoBlock title="Import Excel" :ts-code="tsImportExcel" :js-code="jsImportExcel">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport8">Import Excel</yh-button>
    <span v-if="importResult8" style="color: #67c23a; font-size: 13px;">{{ importResult8 }}</span>
  </div>
  <yh-table ref="tableRef8" :data="data8" :columns="columns" border show-index @update:data="data8 = $event" />
</DemoBlock>

## Advanced Import

Configure import format, import mode, maximum row limit, and perform data validation and callbacks through `beforeImport` / `afterImport`.

<DemoBlock title="Advanced Import" :ts-code="tsAdvancedImport" :js-code="jsAdvancedImport">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">Format:</span>
    <select v-model="importType7" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">Mode:</span>
    <select v-model="importMode7" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="insertTop">Insert Top</option>
      <option value="insertBottom">Insert Bottom</option>
      <option value="covering">Covering</option>
    </select>
    <span style="font-size: 13px; color: #606266;">Max Rows:</span>
    <input v-model.number="maxRows7" type="number" min="1" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 80px;" />
    <yh-button type="primary" @click="handleAdvancedImport">Advanced Import</yh-button>
    <yh-button @click="data7 = []">Clear</yh-button>
  </div>
  <span v-if="importResult7" style="display: block; margin-bottom: 8px; color: #67c23a; font-size: 13px;">{{ importResult7 }}</span>
  <yh-table ref="tableRef7" :data="data7" :columns="columns" border show-index @update:data="data7 = $event" />
</DemoBlock>

## Server-Side Import

For large files or scenarios requiring backend validation, it is recommended to upload the file to the server for processing. The server parses it and returns standard JSON data for loading into the table.

<DemoBlock title="Server-Side Import" :ts-code="tsServerImport" :js-code="jsServerImport">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="uploadLoading" @click="handleServerImport">
      {{ uploadLoading ? 'Uploading...' : 'Server-Side Import' }}
    </yh-button>
    <span v-if="importResult9" style="color: #67c23a; font-size: 13px;">{{ importResult9 }}</span>
  </div>
  <yh-table :data="data9" :columns="columns" border show-index />
</DemoBlock>

## Import Mode Description

| Mode | Value | Description |
| --- | --- | --- |
| Insert Top | `'insertTop'` | Insert imported data at the **top** of the table |
| Insert Bottom | `'insertBottom'` | Append imported data to the **bottom** of the table (default) |
| Covering | `'covering'` | Clear existing data and **replace** with imported data |

## Supported Import Formats

| Format | Extension | Description |
| --- | --- | --- |
| CSV | `.csv` | Comma-separated values, first row as header |
| JSON | `.json` | Object array, key corresponds to column `prop` |
| TXT | `.txt` | Tab-separated values (TSV), first row as header |
| XML | `.xml` | Standard XML format, with `<columns>` and `<rows>` |
| HTML | `.html` | Standard `<table>` structure, with `<thead>` and `<tbody>` |
| XLSX | `.xlsx` | Excel format, supports `.xlsx`, `.xls`, `.xlsm` |

## Data Mapping Rules

Columns are matched with the following priority during import:
1. Custom `fieldMapping` configuration (highest priority)
2. File field name exactly matches column `prop`
3. File field name exactly matches column `label`

> **Tip:** Unmatched fields will be ignored. Use `numberFields` to specify columns that should be automatically converted to numbers.

## API

### openImport(config?) Method

Call through table instance to open file picker and import data.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| type | Import format | `'csv' \| 'json' \| 'txt' \| 'xml' \| 'html' \| 'xlsx'` | Auto-detect |
| mode | Import mode | `'covering' \| 'insertTop' \| 'insertBottom'` | `'insertBottom'` |
| separator | CSV separator | `string` | `','` |
| fieldMapping | Field mapping: file column name → prop | `Record<string, string>` | — |
| autoMapping | Whether to auto-map label/prop | `boolean` | `true` |
| numberFields | Numeric type field list | `string[]` | — |
| maxRows | Max import rows | `number` | — |
| encoding | File encoding | `string` | `'utf-8'` |
| beforeImport | Before import validation | `(rows) => boolean \| rows[]` | — |
| afterImport | After import callback | `(rows, mode) => void` | — |
| sheetIndex | Sheet index to read (XLSX only) | `number` | `0` |
| sheetName | Sheet name to read (XLSX only, takes priority over sheetIndex) | `string` | — |
| headerRow | Whether to use first row as header (XLSX only) | `boolean` | `true` |

### importFile(file, config?) Method

Import data from a `File` object.

### importData(content, config?) Method

Import data from text string or object array.

