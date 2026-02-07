# Table 表格 - 自定义模板

Table 组件支持自定义列内容和表头。

<script setup lang="ts">
import { ref, h } from 'vue'
import { YhTag } from '@yh-ui/components'

// --- 1. 自定义列数据 ---
const customData = ref([
  { id: 1, date: '2024-01-01', name: '张三', status: 'success', tag: '家', amount: 1000 },
  { id: 2, date: '2024-01-02', name: '李四', status: 'warning', tag: '公司', amount: 2500 },
  { id: 3, date: '2024-01-03', name: '王五', status: 'danger', tag: '学校', amount: 800 },
  { id: 4, date: '2024-01-04', name: '赵六', status: 'info', tag: '家', amount: 3200 }
])

const customColumns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'status', label: '状态' },
  { prop: 'tag', label: '标签' }
]

const customActionColumns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'actions', label: '操作', width: 200 }
]

interface CustomRowData {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const customFormatColumns = [
  { prop: 'name', label: '姓名', width: 120 },
  { 
    prop: 'amount', 
    label: '金额',
    formatter: (row: CustomRowData) => `¥${row.amount.toFixed(2)}`
  }
]

const customRenderColumns = [
  { prop: 'name', label: '姓名', width: 120 },
  { 
    prop: 'status', 
    label: '状态',
    render: ({ row }: { row: CustomRowData }) => h(YhTag, { type: row.status, size: 'small' }, () => row.status)
  }
]

const handleCustomEdit = (row: CustomRowData) => alert(`编辑: ${row.name}`)
const handleCustomDelete = (row: CustomRowData) => alert(`删除: ${row.name}`)

// --- 代码清洗工具 ---
const toJs = (tsCode: string) => {
  const lt = '\u003c'
  const gt = '\u003e'
  
  return tsCode
    .replace(/\s*lang="ts"/g, '')
    .replace(/interface\s+\w+\s*\{[\s\S]+?\}\n?/g, '')
    .replace(new RegExp(`(ref|computed|reactive|shallowRef)${lt}[^(]*${gt}\\(`, 'g'), '$1(')
    .replace(/\s+as\s+[A-Za-z0-9_|[\] ]+/g, '')
    .replace(/([\w})])\s*:\s*\{[^}]*\}/g, '$1')
    .replace(/:\s*([A-Za-z][A-Za-z0-9_|[\] ]*)(?=[,;)\n]|\s*=)/g, (match, type) => {
      const basicTypes = ['string', 'number', 'boolean', 'any', 'void', 'unknown', 'object', 'symbol', 'bigint', 'any[]']
      if (basicTypes.includes(type.trim()) || /^[A-Z]/.test(type.trim())) return ''
      return match
    })
    .trim()
}

// --- 标签辅助变量 (避免模板解析) ---
const _T = 'template'
const _S = 'script'

// --- 示例代码 ---

const tsCustomColumn = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border>
    <${_T} #status="{ row }">
      <yh-tag :type="row.status" size="small">{{ row.status }}</yh-tag>
    </${_T}>
    <${_T} #tag="{ row }">
      <yh-tag size="small" effect="plain">{{ row.tag }}</yh-tag>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', status: 'success', tag: '家', amount: 1000 },
  { id: 2, date: '2024-01-02', name: '李四', status: 'warning', tag: '公司', amount: 2500 },
  { id: 3, date: '2024-01-03', name: '王五', status: 'danger', tag: '学校', amount: 800 },
  { id: 4, date: '2024-01-04', name: '赵六', status: 'info', tag: '家', amount: 3200 }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'status', label: '状态' },
  { prop: 'tag', label: '标签' }
]
</${_S}>`

const jsCustomColumn = toJs(tsCustomColumn)

const tsCustomHeader = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border>
    <${_T} #header-name>
      <span style="color: var(--yh-color-primary); font-weight: bold">👤 姓名</span>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', status: 'success', tag: '家', amount: 1000 },
  { id: 2, date: '2024-01-02', name: '李四', status: 'warning', tag: '公司', amount: 2500 },
  { id: 3, date: '2024-01-03', name: '王五', status: 'danger', tag: '学校', amount: 800 },
  { id: 4, date: '2024-01-04', name: '赵六', status: 'info', tag: '家', amount: 3200 }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'status', label: '状态' },
  { prop: 'tag', label: '标签' }
]
</${_S}>`

const jsCustomHeader = toJs(tsCustomHeader)

const tsActions = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border>
    <${_T} #actions="{ row }">
      <yh-button type="primary" size="small" @click="handleEdit(row)">编辑</yh-button>
      <yh-button type="danger" size="small" @click="handleDelete(row)" style="margin-left: 8px">删除</yh-button>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', status: 'success', tag: '家', amount: 1000 },
  { id: 2, date: '2024-01-02', name: '李四', status: 'warning', tag: '公司', amount: 2500 },
  { id: 3, date: '2024-01-03', name: '王五', status: 'danger', tag: '学校', amount: 800 },
  { id: 4, date: '2024-01-04', name: '赵六', status: 'info', tag: '家', amount: 3200 }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'actions', label: '操作', width: 200 }
]

interface RowItem {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const handleEdit = (row: RowItem) => alert('编辑: ' + row.name)
const handleDelete = (row: RowItem) => alert('删除: ' + row.name)
</${_S}>`

const jsActions = toJs(tsActions)

const tsFormatter = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface RowItem {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', status: 'success', tag: '家', amount: 1000 },
  { id: 2, date: '2024-01-02', name: '李四', status: 'warning', tag: '公司', amount: 2500 },
  { id: 3, date: '2024-01-03', name: '王五', status: 'danger', tag: '学校', amount: 800 },
  { id: 4, date: '2024-01-04', name: '赵六', status: 'info', tag: '家', amount: 3200 }
])

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { 
    prop: 'amount', 
    label: '金额',
    formatter: (row: RowItem) => '¥' + row.amount.toFixed(2)
  }
]
</${_S}>`

const jsFormatter = toJs(tsFormatter)

const tsRender = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { h, ref } from 'vue'
import { YhTag } from '@yh-ui/components'

interface RowItem {
  id: number
  date: string
  name: string
  status: string
  tag: string
  amount: number
}

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', status: 'success', tag: '家', amount: 1000 },
  { id: 2, date: '2024-01-02', name: '李四', status: 'warning', tag: '公司', amount: 2500 },
  { id: 3, date: '2024-01-03', name: '王五', status: 'danger', tag: '学校', amount: 800 },
  { id: 4, date: '2024-01-04', name: '赵六', status: 'info', tag: '家', amount: 3200 }
])

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { 
    prop: 'status', 
    label: '状态',
    render: ({ row }: { row: RowItem }) => h(YhTag, { type: row.status, size: 'small' }, () => row.status)
  }
]
</${_S}>`

const jsRender = toJs(tsRender)

</script>

## 自定义列模板

通过插槽自定义列的渲染内容，插槽名为列的 `prop` 值。

<DemoBlock title="自定义列模板" :ts-code="tsCustomColumn" :js-code="jsCustomColumn">
  <yh-table :data="customData" :columns="customColumns" border>
    <template #status="{ row }">
      <yh-tag :type="row.status" size="small">{{ row.status }}</yh-tag>
    </template>
    
    <template #tag="{ row }">
      <yh-tag size="small" effect="plain">{{ row.tag }}</yh-tag>
    </template>
  </yh-table>
</DemoBlock>

## 自定义表头

通过 `header-[prop]` 插槽自定义表头内容。

<DemoBlock title="自定义表头" :ts-code="tsCustomHeader" :js-code="jsCustomHeader">
  <yh-table :data="customData" :columns="customColumns" border>
    <template #header-name>
      <span style="color: var(--yh-color-primary); font-weight: bold">
        👤 姓名
      </span>
    </template>
  </yh-table>
</DemoBlock>

## 操作列

添加操作按钮列，用于编辑、删除等操作。

<DemoBlock title="操作列" :ts-code="tsActions" :js-code="jsActions">
  <yh-table :data="customData" :columns="customActionColumns" border>
    <template #actions="{ row }">
      <yh-button type="primary" size="small" @click="handleCustomEdit(row)">
        编辑
      </yh-button>
      <yh-button type="danger" size="small" @click="handleCustomDelete(row)" style="margin-left: 8px">
        删除
      </yh-button>
    </template>
  </yh-table>
</DemoBlock>

## 格式化显示

通过列的 `formatter` 函数格式化单元格内容。

<DemoBlock title="格式化显示" :ts-code="tsFormatter" :js-code="jsFormatter">
  <yh-table :data="customData" :columns="customFormatColumns" border />
</DemoBlock>

## render 函数

通过列的 `render` 函数使用 JSX/h 函数渲染自定义内容。

<DemoBlock title="render 函数" :ts-code="tsRender" :js-code="jsRender">
  <yh-table :data="customData" :columns="customRenderColumns" border />
</DemoBlock>
