# Table 表格分页

表格分页功能，支持前端分页（自动切片）和后端分页（远程请求）。

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// --- 1. 前端分页 ---
const frontData = ref(
  Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    name: `用户 ${i + 1}`,
    age: 20 + (i % 30),
    address: `某某市某某路 ${i + 1} 号`
  }))
)
const pagination1 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 45,
  background: true
})
const handlePageChange1 = ({ currentPage, pageSize }) => {
  pagination1.value.currentPage = currentPage
  pagination1.value.pageSize = pageSize
}

// --- 2. 后端分页 ---
const backData = ref([])
const loading = ref(false)
const pagination2 = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
  remote: true,
  background: true,
  layout: 'total, prev, pager, next, jumper'
})

// 模拟 API 请求
const fetchData = async (page: number, size: number) => {
  loading.value = true
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const total = 100 // 模拟总数
  const data = Array.from({ length: size }, (_, i) => ({
    id: (page - 1) * size + i + 1,
    name: `远程用户 ${(page - 1) * size + i + 1}`,
    age: 18 + Math.floor(Math.random() * 40),
    address: `远程数据库路 ${Math.floor(Math.random() * 1000)} 号`
  }))
  
  backData.value = data
  pagination2.value.total = total
  loading.value = false
}

const handlePageChange2 = ({ currentPage, pageSize }) => {
  pagination2.value.currentPage = currentPage
  pagination2.value.pageSize = pageSize
  fetchData(currentPage, pageSize)
}

onMounted(() => {
  fetchData(pagination2.value.currentPage, pagination2.value.pageSize)
})

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 150 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址' }
]

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

const _T = 'template'
const _S = 'script'

// --- 代码示例 ---
const tsFront = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :pagination="pagination"
    @page-change="handlePageChange"
    border 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref(
  Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    name: \`用户 \${i + 1}\`,
    age: 20 + (i % 30),
    address: \`某某市某某路 \${i + 1} 号\`
  }))
)

// 前端分页：传入全量数据，remote 默认为 false
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 45,
  align: 'center', // 居中显示
  background: true
})

const handlePageChange = ({ currentPage, pageSize }) => {
  pagination.value.currentPage = currentPage
  pagination.value.pageSize = pageSize
}

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 150 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsFront = toJs(tsFront)

const tsBack = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :pagination="pagination"
    :loading="loading"
    @page-change="handlePageChange"
    border 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const tableData = ref([])
const loading = ref(false)

// 后端分页：set remote: true
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
  remote: true,
  align: 'right', // 居右显示
  background: true,
  layout: 'total, prev, pager, next, jumper'
})

// 模拟 API 请求
const fetchData = async (page: number, size: number) => {
  loading.value = true
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const total = 100 // 模拟总数
  const data = Array.from({ length: size }, (_, i) => ({
    id: (page - 1) * size + i + 1,
    name: \`远程用户 \${(page - 1) * size + i + 1}\`,
    age: 18 + Math.floor(Math.random() * 40),
    address: \`远程数据库路 \${Math.floor(Math.random() * 1000)} 号\`
  }))
  
  tableData.value = data
  pagination.value.total = total
  loading.value = false
}

const handlePageChange = ({ currentPage, pageSize }) => {
  pagination.value.currentPage = currentPage
  pagination.value.pageSize = pageSize
  fetchData(currentPage, pageSize)
}

onMounted(() => {
  fetchData(pagination.value.currentPage, pagination.value.pageSize)
})

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 150 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsBack = toJs(tsBack)

</script>

## 前端分页

表格传入**全量数据**，根据分页组件的状态进行自动切片渲染。适用于数据量较小（如千件级）的场景。

<DemoBlock title="前端分页" :ts-code="tsFront" :js-code="jsFront">
  <yh-table 
    :data="frontData" 
    :columns="columns" 
    :pagination="pagination1"
    @page-change="handlePageChange1"
    border 
  />
</DemoBlock>

## 后端分页

设置 `pagination.remote` 为 `true`，表格不再自动切片。用户需监听 `page-change` 事件，手动调用接口获取数据并更新 `:data`。

<DemoBlock title="后端分页 (远程请求)" :ts-code="tsBack" :js-code="jsBack">
  <yh-table 
    :data="backData" 
    :columns="columns" 
    :pagination="pagination2"
    :loading="loading"
    @page-change="handlePageChange2"
    border 
  />
</DemoBlock>

## API 说明

### PaginationConfig

分页配置项：

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| currentPage | 当前页码 | `number` | `1` |
| pageSize | 每页条数 | `number` | `10` |
| total | 总条数 | `number` | `0` |
| pageSizes | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| layout | 分页布局 | `string` | `'total, sizes, prev, pager, next, jumper'` |
| remote | **是否远程分页** | `boolean` | `false` |
| align | **对齐方式** | `'left' \| 'center' \| 'right'` | `'left'` |
| background | 是否显示背景 | `boolean` | `false` |
| small | 是否使用小型分页 | `boolean` | `false` |
| hideOnSinglePage | 单页时是否隐藏 | `boolean` | `false` |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| page-change | 分页参数变化时触发 | `(params: { currentPage: number, pageSize: number }) => void` |
