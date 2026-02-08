# Table 表格 - 导入数据

通过内置的导入功能，可以将 CSV、JSON、TXT、XML、HTML、XLSX 等格式的文件数据导入到表格中，支持多种导入模式和数据校验。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 公共列配置 ====================
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

const baseRows = [
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
]

// ==================== 1. 导入数据（基础） ====================
const data1 = ref([...baseRows])
const tableRef1 = ref()
const importResult1 = ref('')

const handleImport1 = async () => {
  const rows = await tableRef1.value?.openImport({ type: 'csv', mode: 'insertBottom' })
  if (rows?.length) importResult1.value = '成功导入 ' + rows.length + ' 条数据'
}

const clearData1 = () => { data1.value = []; importResult1.value = '' }

// ==================== 2. 导入 TXT ====================
const data2 = ref([...baseRows])
const tableRef2 = ref()
const importResult2 = ref('')

const handleImport2 = async () => {
  const rows = await tableRef2.value?.openImport({ type: 'txt', mode: 'insertBottom' })
  if (rows?.length) importResult2.value = '成功导入 ' + rows.length + ' 条数据'
}

// ==================== 3. 导入 XML ====================
const data3 = ref([...baseRows])
const tableRef3 = ref()
const importResult3 = ref('')

const handleImport3 = async () => {
  const rows = await tableRef3.value?.openImport({ type: 'xml', mode: 'insertBottom' })
  if (rows?.length) importResult3.value = '成功导入 ' + rows.length + ' 条数据'
}

// ==================== 4. 导入 HTML ====================
const data4 = ref([...baseRows])
const tableRef4 = ref()
const importResult4 = ref('')

const handleImport4 = async () => {
  const rows = await tableRef4.value?.openImport({ type: 'html', mode: 'insertBottom' })
  if (rows?.length) importResult4.value = '成功导入 ' + rows.length + ' 条数据'
}

// ==================== 5. 导入 CSV ====================
const data5 = ref([...baseRows])
const tableRef5 = ref()
const importResult5 = ref('')

const handleImport5 = async () => {
  const rows = await tableRef5.value?.openImport({ type: 'csv', mode: 'insertBottom' })
  if (rows?.length) importResult5.value = '成功导入 ' + rows.length + ' 条数据'
}

// ==================== 6. 导入 JSON ====================
const data6 = ref([...baseRows])
const tableRef6 = ref()
const importResult6 = ref('')

const handleImport6 = async () => {
  const rows = await tableRef6.value?.openImport({ type: 'json', mode: 'insertBottom' })
  if (rows?.length) importResult6.value = '成功导入 ' + rows.length + ' 条数据'
}

// ==================== 7. 高级导入 ====================
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
        importResult7.value = '文件内容为空'
        return false
      }
      return rows
    },
    afterImport: (rows: Record<string, unknown>[], mode: string) => {
      importResult7.value = '已通过 ' + importType7.value.toUpperCase() + ' 格式以「' +
        (mode === 'covering' ? '覆盖' : mode === 'insertTop' ? '顶部追加' : '尾部追加') +
        '」模式导入 ' + rows.length + ' 条'
    }
  })
}

// ==================== 8. 导入 Excel ====================
const data8 = ref([...baseRows])
const tableRef8 = ref()
const importResult8 = ref('')

const handleImport8 = async () => {
  const rows = await tableRef8.value?.openImport({ type: 'xlsx', mode: 'insertBottom' })
  if (rows?.length) importResult8.value = '成功导入 ' + rows.length + ' 条数据'
}

// ==================== 9. 服务端导入 ====================
const data9 = ref([...baseRows])
const uploadLoading = ref(false)
const importResult9 = ref('')

const handleServerImport = async () => {
  uploadLoading.value = true
  importResult9.value = ''
  // 模拟上传到服务端处理后返回数据
  setTimeout(() => {
    const serverData = [
      { name: '孙八', age: 31, dept: '财务部', status: '在职', address: '成都市锦江区' },
      { name: '周九', age: 27, dept: '人事部', status: '在职', address: '武汉市武昌区' },
      { name: '吴十', age: 36, dept: '法务部', status: '在职', address: '南京市鼓楼区' }
    ]
    data9.value = [...data9.value, ...serverData]
    uploadLoading.value = false
    importResult9.value = '服务端返回 ' + serverData.length + ' 条数据已加载'
  }, 1500)
}

// ==================== 示例代码 ====================
const tsImportData = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">导入数据</yh-button>
    <yh-button @click="data = []">清空</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

const handleImport = async () => {
  // 调用组件内置 openImport 方法
  const rows = await tableRef.value?.openImport({
    type: 'csv',        // 导入格式
    mode: 'insertBottom' // 尾部追加
  })
  if (rows?.length) result.value = '成功导入 ' + rows.length + ' 条数据'
}
</${_S}>`
const jsImportData = toJs(tsImportData)

const tsImportTxt = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">导入 TXT</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

// TXT 文件以 Tab 键分隔列（TSV 格式）
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'txt', mode: 'insertBottom' })
  if (rows?.length) result.value = '成功导入 ' + rows.length + ' 条数据'
}
</${_S}>`
const jsImportTxt = toJs(tsImportTxt)

const tsImportXml = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">导入 XML</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

// XML 格式参见文档中的示例
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'xml', mode: 'insertBottom' })
  if (rows?.length) result.value = '成功导入 ' + rows.length + ' 条数据'
}
</${_S}>`
const jsImportXml = toJs(tsImportXml)

const tsImportHtml = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">导入 HTML</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

// HTML 文件需包含标准 table 结构，thead 为表头，tbody 为数据
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'html', mode: 'insertBottom' })
  if (rows?.length) result.value = '成功导入 ' + rows.length + ' 条数据'
}
</${_S}>`
const jsImportHtml = toJs(tsImportHtml)

const tsImportCsv = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">导入 CSV</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

const handleImport = async () => {
  const rows = await tableRef.value?.openImport({
    type: 'csv',
    mode: 'insertBottom',
    numberFields: ['age'] // 自动将 age 字段转为数字
  })
  if (rows?.length) result.value = '成功导入 ' + rows.length + ' 条'
}
</${_S}>`
const jsImportCsv = toJs(tsImportCsv)

const tsImportJson = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">导入 JSON</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

const handleImport = async () => {
  const rows = await tableRef.value?.openImport({ type: 'json', mode: 'insertBottom' })
  if (rows?.length) result.value = '成功导入 ' + rows.length + ' 条'
}
</${_S}>`
const jsImportJson = toJs(tsImportJson)

const tsImportExcel = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport">导入 Excel</yh-button>
    <span v-if="result" style="color: #67c23a; font-size: 13px;">{{ result }}</span>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index @update:data="data = $event" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

// Excel 文件需要包含表头行，列名对应表格列的 label 或 prop
const handleImport = async () => {
  const rows = await tableRef.value?.openImport({
    type: 'xlsx',
    mode: 'insertBottom',
    numberFields: ['age'] // 自动将 age 字段转为数字
  })
  if (rows?.length) result.value = '成功导入 ' + rows.length + ' 条'
}
</${_S}>`
const jsImportExcel = toJs(tsImportExcel)

const tsAdvancedImport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">格式：</span>
    <select v-model="importType" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">模式：</span>
    <select v-model="importMode" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="insertTop">顶部追加</option>
      <option value="insertBottom">尾部追加</option>
      <option value="covering">覆盖</option>
    </select>
    <span style="font-size: 13px; color: #606266;">最大行数：</span>
    <input v-model.number="maxRows" type="number" min="1" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 80px;" />
    <yh-button type="primary" @click="handleImport">高级导入</yh-button>
    <yh-button @click="data = []">清空</yh-button>
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
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

const handleImport = async () => {
  await tableRef.value?.openImport({
    type: importType.value,
    mode: importMode.value,
    maxRows: maxRows.value,
    numberFields: ['age'],
    beforeImport: (rows: Record<string, unknown>[]) => {
      if (rows.length === 0) {
        result.value = '文件内容为空'
        return false
      }
      return rows
    },
    afterImport: (rows: Record<string, unknown>[]) => {
      result.value = '成功导入 ' + rows.length + ' 条数据'
    }
  })
}
</${_S}>`
const jsAdvancedImport = toJs(tsAdvancedImport)

const tsServerImport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="loading" @click="handleServerImport">
      {{ loading ? '上传中...' : '服务端导入' }}
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
  { name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' }
]

const handleServerImport = async () => {
  loading.value = true
  result.value = ''

  // 实际场景：先选择文件上传到服务器，服务器解析后返回数据
  // const file = await selectFile()
  // const formData = new FormData()
  // formData.append('file', file)
  // const res = await fetch('/api/import', { method: 'POST', body: formData })
  // const serverData = await res.json()

  // 模拟服务端响应
  setTimeout(() => {
    const serverData = [
      { name: '孙八', age: 31, dept: '财务部', status: '在职', address: '成都市锦江区' },
      { name: '周九', age: 27, dept: '人事部', status: '在职', address: '武汉市武昌区' }
    ]
    data.value = [...data.value, ...serverData]
    loading.value = false
    result.value = '服务端返回 ' + serverData.length + ' 条数据'
  }, 1500)
}
</${_S}>`
const jsServerImport = toJs(tsServerImport)
</script>

## 导入数据

最基础的导入方式，通过组件实例方法 `openImport()` 打开文件选择器。

<DemoBlock title="导入数据" :ts-code="tsImportData" :js-code="jsImportData">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport1">导入数据</yh-button>
    <yh-button @click="clearData1">清空</yh-button>
    <span v-if="importResult1" style="color: #67c23a; font-size: 13px;">{{ importResult1 }}</span>
  </div>
  <yh-table ref="tableRef1" :data="data1" :columns="columns" border show-index @update:data="data1 = $event" />
</DemoBlock>

## 导入 TXT 格式

TXT 格式采用 Tab 分隔列（TSV 格式），与从 Excel 复制粘贴到记事本的格式一致。

**TXT 文件格式：**

```
姓名	年龄	部门	状态	地址
王五	25	设计部	在职	广州市天河区
赵六	35	运营部	在职	深圳市南山区
```

<DemoBlock title="导入 TXT" :ts-code="tsImportTxt" :js-code="jsImportTxt">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport2">导入 TXT</yh-button>
    <span v-if="importResult2" style="color: #67c23a; font-size: 13px;">{{ importResult2 }}</span>
  </div>
  <yh-table ref="tableRef2" :data="data2" :columns="columns" border show-index @update:data="data2 = $event" />
</DemoBlock>

## 导入 XML 格式

支持导入标准 XML 格式的表格数据。

**XML 文件格式：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<table>
  <columns>
    <column name="姓名" />
    <column name="年龄" />
    <column name="部门" />
    <column name="状态" />
    <column name="地址" />
  </columns>
  <rows>
    <row>
      <cell>王五</cell>
      <cell>25</cell>
      <cell>设计部</cell>
      <cell>在职</cell>
      <cell>广州市天河区</cell>
    </row>
  </rows>
</table>
```

<DemoBlock title="导入 XML" :ts-code="tsImportXml" :js-code="jsImportXml">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport3">导入 XML</yh-button>
    <span v-if="importResult3" style="color: #67c23a; font-size: 13px;">{{ importResult3 }}</span>
  </div>
  <yh-table ref="tableRef3" :data="data3" :columns="columns" border show-index @update:data="data3 = $event" />
</DemoBlock>

## 导入 HTML 格式

支持导入包含 `<table>` 的 HTML 文件，自动识别 `<thead>` 为表头、`<tbody>` 为数据。

**HTML 文件格式：**

```html
<table>
  <thead>
    <tr><th>姓名</th><th>年龄</th><th>部门</th><th>状态</th><th>地址</th></tr>
  </thead>
  <tbody>
    <tr><td>王五</td><td>25</td><td>设计部</td><td>在职</td><td>广州市天河区</td></tr>
  </tbody>
</table>
```

<DemoBlock title="导入 HTML" :ts-code="tsImportHtml" :js-code="jsImportHtml">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport4">导入 HTML</yh-button>
    <span v-if="importResult4" style="color: #67c23a; font-size: 13px;">{{ importResult4 }}</span>
  </div>
  <yh-table ref="tableRef4" :data="data4" :columns="columns" border show-index @update:data="data4 = $event" />
</DemoBlock>

## 导入 CSV 格式

CSV（逗号分隔值）是最通用的表格导入格式，第一行为表头。

**CSV 文件格式：**

```csv
姓名,年龄,部门,状态,地址
王五,25,设计部,在职,广州市天河区
赵六,35,运营部,在职,深圳市南山区
```

> **提示：** 导入时支持 `numberFields` 配置自动将指定字段的值转为数字类型。

<DemoBlock title="导入 CSV" :ts-code="tsImportCsv" :js-code="jsImportCsv">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport5">导入 CSV</yh-button>
    <span v-if="importResult5" style="color: #67c23a; font-size: 13px;">{{ importResult5 }}</span>
  </div>
  <yh-table ref="tableRef5" :data="data5" :columns="columns" border show-index @update:data="data5 = $event" />
</DemoBlock>

## 导入 JSON 格式

JSON 格式是最精确的导入格式，key 自动匹配列的 `prop` 或 `label`。

**JSON 文件格式：**

```json
[
  { "name": "王五", "age": 25, "dept": "设计部", "status": "在职", "address": "广州市天河区" },
  { "name": "赵六", "age": 35, "dept": "运营部", "status": "在职", "address": "深圳市南山区" }
]
```

<DemoBlock title="导入 JSON" :ts-code="tsImportJson" :js-code="jsImportJson">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport6">导入 JSON</yh-button>
    <span v-if="importResult6" style="color: #67c23a; font-size: 13px;">{{ importResult6 }}</span>
  </div>
  <yh-table ref="tableRef6" :data="data6" :columns="columns" border show-index @update:data="data6 = $event" />
</DemoBlock>

## 导入 Excel 格式

支持导入 `.xlsx`、`.xls`、`.xlsm` 格式的 Excel 文件，第一行为表头，列名需与表格列的 `label` 或 `prop` 对应。

> **提示：** Excel 导入依赖 `xlsx` 库进行解析，功能强大且兼容性好。

<DemoBlock title="导入 Excel" :ts-code="tsImportExcel" :js-code="jsImportExcel">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" @click="handleImport8">导入 Excel</yh-button>
    <span v-if="importResult8" style="color: #67c23a; font-size: 13px;">{{ importResult8 }}</span>
  </div>
  <yh-table ref="tableRef8" :data="data8" :columns="columns" border show-index @update:data="data8 = $event" />
</DemoBlock>

## 高级导入

可配置导入格式、导入模式、最大行数限制，并通过 `beforeImport` / `afterImport` 进行数据校验和回调。

<DemoBlock title="高级导入" :ts-code="tsAdvancedImport" :js-code="jsAdvancedImport">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">格式：</span>
    <select v-model="importType7" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">模式：</span>
    <select v-model="importMode7" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="insertTop">顶部追加</option>
      <option value="insertBottom">尾部追加</option>
      <option value="covering">覆盖</option>
    </select>
    <span style="font-size: 13px; color: #606266;">最大行数：</span>
    <input v-model.number="maxRows7" type="number" min="1" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 80px;" />
    <yh-button type="primary" @click="handleAdvancedImport">高级导入</yh-button>
    <yh-button @click="data7 = []">清空</yh-button>
  </div>
  <span v-if="importResult7" style="display: block; margin-bottom: 8px; color: #67c23a; font-size: 13px;">{{ importResult7 }}</span>
  <yh-table ref="tableRef7" :data="data7" :columns="columns" border show-index @update:data="data7 = $event" />
</DemoBlock>

## 服务端导入

对于大文件或需要后端校验的场景，建议将文件上传到服务端处理，服务端解析后返回标准 JSON 数据再加载到表格中。

<DemoBlock title="服务端导入" :ts-code="tsServerImport" :js-code="jsServerImport">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="uploadLoading" @click="handleServerImport">
      {{ uploadLoading ? '上传中...' : '服务端导入' }}
    </yh-button>
    <span v-if="importResult9" style="color: #67c23a; font-size: 13px;">{{ importResult9 }}</span>
  </div>
  <yh-table :data="data9" :columns="columns" border show-index />
</DemoBlock>

## 导入模式说明

| 模式 | 值 | 说明 |
| --- | --- | --- |
| 顶部追加 | `'insertTop'` | 将导入数据插入到表格最**前面** |
| 尾部追加 | `'insertBottom'` | 将导入数据追加到表格**末尾**（默认） |
| 覆盖 | `'covering'` | 清空原有数据，用导入数据完全**替换** |

## 支持的导入格式

| 格式 | 扩展名 | 说明 |
| --- | --- | --- |
| CSV | `.csv` | 逗号分隔值，第一行为表头 |
| JSON | `.json` | 对象数组，key 对应列 `prop` |
| TXT | `.txt` | Tab 分隔值（TSV），第一行为表头 |
| XML | `.xml` | 标准 XML 格式，含 `<columns>` 和 `<rows>` |
| HTML | `.html` | 标准 `<table>` 结构，含 `<thead>` 和 `<tbody>` |
| XLSX | `.xlsx` | Excel 格式，支持 `.xlsx`、`.xls`、`.xlsm` |

## 数据映射规则

导入时按以下优先级匹配列：
1. 自定义 `fieldMapping` 配置（最高优先）
2. 文件字段名与列 `prop` 完全一致
3. 文件字段名与列 `label` 完全一致

> **提示：** 无法匹配的字段将被忽略。通过 `numberFields` 可指定需要自动转为数字的列。

## API

### openImport(config?) 方法

通过表格实例调用，打开文件选择器并导入数据。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 导入格式 | `'csv' \| 'json' \| 'txt' \| 'xml' \| 'html' \| 'xlsx'` | 自动推断 |
| mode | 导入模式 | `'covering' \| 'insertTop' \| 'insertBottom'` | `'insertBottom'` |
| separator | CSV 分隔符 | `string` | `','` |
| fieldMapping | 字段映射：文件列名 → prop | `Record<string, string>` | — |
| autoMapping | 是否自动映射 label/prop | `boolean` | `true` |
| numberFields | 数值类型字段列表 | `string[]` | — |
| maxRows | 最大导入行数 | `number` | — |
| encoding | 文件编码 | `string` | `'utf-8'` |
| beforeImport | 导入前校验 | `(rows) => boolean \| rows[]` | — |
| afterImport | 导入后回调 | `(rows, mode) => void` | — |
| sheetIndex | 读取的工作表索引（仅 XLSX） | `number` | `0` |
| sheetName | 读取的工作表名称（仅 XLSX，优先于 sheetIndex） | `string` | — |
| headerRow | 是否将第一行作为表头（仅 XLSX） | `boolean` | `true` |

### importFile(file, config?) 方法

从 `File` 对象导入数据。

### importData(content, config?) 方法

从文本字符串或对象数组导入数据。

