# Table 表格 - 导出数据

通过内置的导出功能，可以将表格数据导出为 CSV、JSON、TXT、XML、HTML、XLSX 等多种格式，支持自定义列、格式化内容、排除列等高级配置。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 公共数据 ====================
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const baseData = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])

// ==================== 1. 导出数据（基础 CSV） ====================
const tableRef1 = ref()
const handleExport1 = () => {
  tableRef1.value?.exportData({ type: 'csv', filename: '员工表' })
}

// ==================== 2. 导出 TXT ====================
const tableRef2 = ref()
const handleExport2 = () => {
  tableRef2.value?.exportData({ type: 'txt', filename: '员工表' })
}

// ==================== 3. 导出 XML ====================
const tableRef3 = ref()
const handleExport3 = () => {
  tableRef3.value?.exportData({ type: 'xml', filename: '员工表' })
}

// ==================== 4. 导出 HTML ====================
const tableRef4 = ref()
const handleExport4 = () => {
  tableRef4.value?.exportData({ type: 'html', filename: '员工表' })
}

// ==================== 5. 导出 CSV（详细） ====================
const tableRef5 = ref()
const handleExport5 = () => {
  tableRef5.value?.exportData({
    type: 'csv',
    filename: '员工数据',
    showIndex: true,
    indexTitle: '序号'
  })
}

// ==================== 6. 导出 JSON ====================
const tableRef6 = ref()
const handleExport6 = () => {
  tableRef6.value?.exportData({ type: 'json', filename: '员工数据' })
}

// ==================== 6.5. 导出 Excel ====================
const tableRef6_5 = ref()
const handleExport6_5 = () => {
  tableRef6_5.value?.exportData({
    type: 'xlsx',
    filename: '员工数据',
    sheetName: '员工表',
    autoWidth: true
  })
}

// ==================== 7. 自定义数据导出 ====================
const tableRef7 = ref()
const handleExport7 = () => {
  const customData = baseData.value.filter(row => row.status === '在职')
  tableRef7.value?.exportData({
    type: 'csv',
    filename: '在职员工',
    data: customData
  })
}

// ==================== 8. 格式化导出 ====================
const tableRef8 = ref()
const handleExport8 = () => {
  tableRef8.value?.exportData({
    type: 'csv',
    filename: '格式化导出',
    formatCell: (value: unknown, column: Record<string, unknown>) => {
      if (column.prop === 'salary') return '¥' + Number(value).toLocaleString()
      if (column.prop === 'status') return value === '在职' ? '✓ 在职' : '✗ 离职'
      return String(value ?? '')
    }
  })
}

// ==================== 9. 高级导出 ====================
const tableRef9 = ref()
const exportType9 = ref('csv')
const exportFilename9 = ref('高级导出')
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
      exportResult9.value = '已导出为 ' + type.toUpperCase() + ' 格式'
    }
  })
}

// ==================== 10. 排除列 ====================
const tableRef10 = ref()
const handleExport10 = () => {
  tableRef10.value?.exportData({
    type: 'csv',
    filename: '排除列导出',
    excludeColumns: ['salary', 'address']
  })
}

// ==================== 11. 指定列 ====================
const tableRef11 = ref()
const handleExport11 = () => {
  tableRef11.value?.exportData({
    type: 'csv',
    filename: '指定列导出',
    columns: ['name', 'dept', 'status']
  })
}

// ==================== 12. 自定义列标题 ====================
const tableRef12 = ref()
const handleExport12 = () => {
  tableRef12.value?.exportData({
    type: 'csv',
    filename: '自定义列标题',
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

// ==================== 13. 自定义导出类型（下拉） ====================
const tableRef13 = ref()
const exportType13 = ref('csv')
const handleExport13 = () => {
  tableRef13.value?.exportData({
    type: exportType13.value,
    filename: '自定义导出'
  })
}

// ==================== 14. 服务端导出 ====================
const serverLoading = ref(false)
const serverResult = ref('')
const handleServerExport = () => {
  serverLoading.value = true
  serverResult.value = ''
  setTimeout(() => {
    // 模拟服务端返回下载链接
    serverLoading.value = false
    serverResult.value = '服务端已生成文件，模拟下载完成'
  }, 1500)
}

// ==================== 15. 导出模式（返回字符串） ====================
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

// ==================== 示例代码 ====================
const tsExportData = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">导出数据</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({ type: 'csv', filename: '员工表' })
}
</${_S}>`
const jsExportData = toJs(tsExportData)

const tsExportTxt = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">导出 TXT</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({ type: 'txt', filename: '员工表' })
}
</${_S}>`
const jsExportTxt = toJs(tsExportTxt)

const tsExportXml = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">导出 XML</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({ type: 'xml', filename: '员工表' })
}
</${_S}>`
const jsExportXml = toJs(tsExportXml)

const tsExportHtml = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">导出 HTML</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({ type: 'html', filename: '员工表' })
}
</${_S}>`
const jsExportHtml = toJs(tsExportHtml)

const tsExportCsv = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">导出 CSV（含序号）</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: '员工数据',
    showIndex: true,
    indexTitle: '序号'
  })
}
</${_S}>`
const jsExportCsv = toJs(tsExportCsv)

const tsExportJson = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">导出 JSON</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({ type: 'json', filename: '员工数据' })
}
</${_S}>`
const jsExportJson = toJs(tsExportJson)

const tsExportExcel = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">导出 Excel</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'xlsx',
    filename: '员工数据',
    sheetName: '员工表', // 工作表名称
    autoWidth: true      // 自动计算列宽
  })
}
</${_S}>`
const jsExportExcel = toJs(tsExportExcel)

const tsCustomData = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px;">
    <yh-button type="primary" @click="handleExport">仅导出在职员工</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  // 自定义导出数据：仅导出在职员工
  const customData = data.value.filter(row => row.status === '在职')
  tableRef.value?.exportData({
    type: 'csv',
    filename: '在职员工',
    data: customData
  })
}
</${_S}>`
const jsCustomData = toJs(tsCustomData)

const tsFormatExport = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">格式化导出</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: '格式化导出',
    formatCell: (value: unknown, column: Record<string, unknown>) => {
      // 薪资加人民币符号
      if (column.prop === 'salary') return '¥' + Number(value).toLocaleString()
      // 状态加图标
      if (column.prop === 'status') return value === '在职' ? '✓ 在职' : '✗ 离职'
      return String(value ?? '')
    }
  })
}
</${_S}>`
const jsFormatExport = toJs(tsFormatExport)

const tsAdvancedExport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">格式：</span>
    <select v-model="exportType" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">文件名：</span>
    <input v-model="filename" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showIndex" /> 含序号
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="includeHeader" /> 含表头
    </label>
    <yh-button type="primary" @click="handleExport">导出</yh-button>
  </div>
  <span v-if="result" style="display: block; margin-bottom: 8px; color: #67c23a; font-size: 13px;">{{ result }}</span>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const exportType = ref('csv')
const filename = ref('高级导出')
const showIndex = ref(true)
const includeHeader = ref(true)
const result = ref('')

const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({
    type: exportType.value,
    filename: filename.value,
    showIndex: showIndex.value,
    includeHeader: includeHeader.value,
    afterExport: (type: string) => {
      result.value = '已导出为 ' + type.toUpperCase() + ' 格式'
    }
  })
}
</${_S}>`
const jsAdvancedExport = toJs(tsAdvancedExport)

const tsExcludeCol = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">排除「薪资」和「地址」列导出</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: '排除列导出',
    excludeColumns: ['salary', 'address'] // 排除这些列
  })
}
</${_S}>`
const jsExcludeCol = toJs(tsExcludeCol)

const tsSpecifyCol = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">仅导出「姓名」「部门」「状态」</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({
    type: 'csv',
    filename: '指定列导出',
    columns: ['name', 'dept', 'status'] // 仅导出这些列
  })
}
</${_S}>`
const jsSpecifyCol = toJs(tsSpecifyCol)

const tsCustomCol = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport">自定义列标题（英文）导出</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
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
    <span style="font-size: 13px; color: #606266;">导出格式：</span>
    <select v-model="exportType" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <yh-button type="primary" @click="handleExport">导出</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const exportType = ref('csv')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = () => {
  tableRef.value?.exportData({ type: exportType.value, filename: '自定义导出' })
}
</${_S}>`
const jsCustomExportType = toJs(tsCustomExportType)

const tsServerExport = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="loading" @click="handleExport">
      {{ loading ? '导出中...' : '服务端导出' }}
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
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = async () => {
  loading.value = true
  result.value = ''
  // 实际场景：发送请求到服务端，服务端生成文件后返回下载链接
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
    result.value = '服务端导出完成'
  }, 1500)
}
</${_S}>`
const jsServerExport = toJs(tsServerExport)

const tsExportMode = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; gap: 8px;">
    <yh-button type="primary" @click="handleExport">导出为字符串（不下载）</yh-button>
  </div>
  <div v-if="result" style="background: #f5f7fa; padding: 12px; border-radius: 4px; font-size: 12px; max-height: 200px; overflow: auto; white-space: pre; font-family: monospace;">{{ result }}</div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const result = ref('')
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleExport = async () => {
  // mode: 'string' 不会触发下载，而是返回内容字符串
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

## 导出数据

最基础的导出方式，通过组件实例方法 `exportData()` 将表格数据导出为 CSV 文件。

<DemoBlock title="导出数据" :ts-code="tsExportData" :js-code="jsExportData">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport1">导出数据</yh-button>
  </div>
  <yh-table ref="tableRef1" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 导出 TXT 格式

TXT 格式采用 Tab 分隔列，可以直接粘贴到 Excel 中。

<DemoBlock title="导出 TXT" :ts-code="tsExportTxt" :js-code="jsExportTxt">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport2">导出 TXT</yh-button>
  </div>
  <yh-table ref="tableRef2" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 导出 XML 格式

导出标准 XML 结构，适用于与其他系统的数据交换。

<DemoBlock title="导出 XML" :ts-code="tsExportXml" :js-code="jsExportXml">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport3">导出 XML</yh-button>
  </div>
  <yh-table ref="tableRef3" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 导出 HTML 格式

导出带样式的 HTML 表格文件，可直接在浏览器中打开查看。

<DemoBlock title="导出 HTML" :ts-code="tsExportHtml" :js-code="jsExportHtml">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport4">导出 HTML</yh-button>
  </div>
  <yh-table ref="tableRef4" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 导出 CSV 格式

CSV 导出支持含序号列，自动添加 BOM 头确保 Excel 正确显示中文。

<DemoBlock title="导出 CSV" :ts-code="tsExportCsv" :js-code="jsExportCsv">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport5">导出 CSV（含序号）</yh-button>
  </div>
  <yh-table ref="tableRef5" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 导出 JSON 格式

保持原始数据类型不变的 JSON 格式导出。

<DemoBlock title="导出 JSON" :ts-code="tsExportJson" :js-code="jsExportJson">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport6">导出 JSON</yh-button>
  </div>
  <yh-table ref="tableRef6" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 导出 Excel 格式

导出为 `.xlsx` 格式的 Excel 文件，支持自动计算列宽、自定义工作表名称等高级功能。

> **提示：** Excel 导出依赖 `xlsx` 库，导出的文件可直接用 Microsoft Excel、WPS 等软件打开。

<DemoBlock title="导出 Excel" :ts-code="tsExportExcel" :js-code="jsExportExcel">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport6_5">导出 Excel</yh-button>
  </div>
  <yh-table ref="tableRef6_5" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 自定义数据

通过 `data` 参数指定导出的数据，可以实现筛选导出。

<DemoBlock title="自定义数据" :ts-code="tsCustomData" :js-code="jsCustomData">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport7">仅导出在职员工</yh-button>
  </div>
  <yh-table ref="tableRef7" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 格式化导出内容

通过 `formatCell` 回调函数自定义单元格导出值，如添加货币符号、状态图标等。

<DemoBlock title="格式化导出" :ts-code="tsFormatExport" :js-code="jsFormatExport">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport8">格式化导出</yh-button>
  </div>
  <yh-table ref="tableRef8" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 高级导出

可配置导出格式、文件名、是否含序号和表头，并通过 `afterExport` 回调获取导出结果。

<DemoBlock title="高级导出" :ts-code="tsAdvancedExport" :js-code="jsAdvancedExport">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">格式：</span>
    <select v-model="exportType9" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <span style="font-size: 13px; color: #606266;">文件名：</span>
    <input v-model="exportFilename9" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="exportShowIndex9" /> 含序号
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="exportIncludeHeader9" /> 含表头
    </label>
    <yh-button type="primary" @click="handleExport9">导出</yh-button>
  </div>
  <span v-if="exportResult9" style="display: block; margin-bottom: 8px; color: #67c23a; font-size: 13px;">{{ exportResult9 }}</span>
  <yh-table ref="tableRef9" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 排除列

通过 `excludeColumns` 指定不需要导出的列。

<DemoBlock title="排除列" :ts-code="tsExcludeCol" :js-code="jsExcludeCol">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport10">排除「薪资」和「地址」列导出</yh-button>
  </div>
  <yh-table ref="tableRef10" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 指定列

通过 `columns` 指定只导出哪些列。

<DemoBlock title="指定列" :ts-code="tsSpecifyCol" :js-code="jsSpecifyCol">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport11">仅导出「姓名」「部门」「状态」</yh-button>
  </div>
  <yh-table ref="tableRef11" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 自定义列标题

通过 `columnTitles` 自定义导出时的列标题，如导出英文表头。

<DemoBlock title="自定义列标题" :ts-code="tsCustomCol" :js-code="jsCustomCol">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExport12">自定义列标题（英文）导出</yh-button>
  </div>
  <yh-table ref="tableRef12" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 自定义导出类型

通过下拉菜单选择导出格式。

<DemoBlock title="自定义导出类型" :ts-code="tsCustomExportType" :js-code="jsCustomExportType">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">导出格式：</span>
    <select v-model="exportType13" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
      <option value="txt">TXT</option>
      <option value="xml">XML</option>
      <option value="html">HTML</option>
      <option value="xlsx">Excel</option>
    </select>
    <yh-button type="primary" @click="handleExport13">导出</yh-button>
  </div>
  <yh-table ref="tableRef13" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 服务端导出

对于超大数据或需要生成 XLSX / PDF 格式的场景，建议在服务端处理导出。

<DemoBlock title="服务端导出" :ts-code="tsServerExport" :js-code="jsServerExport">
  <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
    <yh-button type="primary" :loading="serverLoading" @click="handleServerExport">
      {{ serverLoading ? '导出中...' : '服务端导出' }}
    </yh-button>
    <span v-if="serverResult" style="color: #67c23a; font-size: 13px;">{{ serverResult }}</span>
  </div>
  <yh-table :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 自定义导出模式

设置 `mode: 'string'` 可以获取导出内容字符串而不触发下载，适用于复制到剪贴板或二次处理。

<DemoBlock title="自定义导出模式" :ts-code="tsExportMode" :js-code="jsExportMode">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handleExportString">导出为字符串（不下载）</yh-button>
  </div>
  <pre v-if="stringResult" style="background: #f5f7fa; padding: 12px; border-radius: 4px; font-size: 12px; max-height: 200px; overflow: auto;">{{ stringResult }}</pre>
  <yh-table ref="tableRef15" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## API

### exportData(config?) 方法

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 导出格式 | `'csv' \| 'json' \| 'txt' \| 'xml' \| 'html' \| 'xlsx'` | `'csv'` |
| filename | 文件名（不含扩展名） | `string` | `'export'` |
| includeHeader | 是否包含表头 | `boolean` | `true` |
| showIndex | 是否包含序号列 | `boolean` | `false` |
| indexTitle | 序号列标题 | `string` | `'序号'` |
| columns | 指定导出列（prop 数组） | `string[]` | 全部可见列 |
| excludeColumns | 排除列（prop 数组） | `string[]` | — |
| visibleOnly | 是否只导出可见列 | `boolean` | `true` |
| data | 自定义导出数据 | `Record<string, unknown>[]` | 当前表格数据 |
| columnTitles | 自定义列标题映射 | `Record<string, string>` | — |
| formatCell | 格式化单元格内容 | `(value, column, row) => string` | — |
| separator | CSV 分隔符 | `string` | `','` |
| bom | 是否添加 BOM 头 | `boolean` | `true` |
| mode | 导出模式 | `'download' \| 'string'` | `'download'` |
| beforeExport | 导出前回调 | `() => boolean` | — |
| afterExport | 导出后回调 | `(type) => void` | — |
| sheetName | 工作表名称（仅 XLSX） | `string` | `'Sheet1'` |
| columnWidths | 列宽配置（仅 XLSX），如 `{ name: 15, address: 30 }` | `Record<string, number>` | — |
| defaultColWidth | 默认列宽（仅 XLSX） | `number` | `12` |
| autoWidth | 是否自动调整列宽（仅 XLSX） | `boolean` | `true` |

### 各格式说明

| 格式 | 扩展名 | MIME | 特点 |
| --- | --- | --- | --- |
| CSV | `.csv` | `text/csv` | 通用格式，Excel 可直接打开，自动添加 BOM |
| JSON | `.json` | `application/json` | 保持原始数据类型，适合程序间交换 |
| TXT | `.txt` | `text/plain` | Tab 分隔，可直接粘贴到 Excel |
| XML | `.xml` | `application/xml` | 标准 XML 结构，适合系统集成 |
| HTML | `.html` | `text/html` | 带样式的表格，浏览器可直接查看 |
| XLSX | `.xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | Excel 格式，支持自动列宽、多工作表 |

