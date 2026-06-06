# Table 表格 - 排序与筛选

Table 组件支持对数据进行排序和筛选。

<script setup lang="ts">
import { ref } from 'vue'

// --- 1. 基础数据 ---
const sortFilterData = ref([
  { id: 1, date: '2024-01-01', name: '张三', age: 28, tag: '家' },
  { id: 2, date: '2024-01-02', name: '李四', age: 35, tag: '公司' },
  { id: 3, date: '2024-01-03', name: '王五', age: 22, tag: '家' },
  { id: 4, date: '2024-01-04', name: '赵六', age: 45, tag: '公司' },
  { id: 5, date: '2024-01-05', name: '钱七', age: 31, tag: '学校' }
])

const sortFilterColumns = [
  { prop: 'date', label: '日期', width: 150, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'tag', label: '标签' }
]

const sortFilterColumnsOnly = [
  { prop: 'date', label: '日期', width: 150, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { 
    prop: 'tag', 
    label: '标签',
    filterable: true,
    filters: [
      { text: '家', value: '家' },
      { text: '公司', value: '公司' },
      { text: '学校', value: '学校' }
    ]
  }
]

interface SortRowData {
  id: number
  date: string
  name: string
  age: number
  tag: string
}

const customSortLogic = (a: SortRowData, b: SortRowData, order: string | null) => {
  const nameA = a.name.length
  const nameB = b.name.length
  return order === 'asc' ? nameA - nameB : nameB - nameA
}

const customSortFilterColumns = [
  { prop: 'name', label: '姓名', width: 120, sortable: true, sortMethod: customSortLogic },
  { prop: 'age', label: '年龄', width: 100, sortable: true }
]

const multiSortFilterColumns = [
  { prop: 'date', label: '日期', width: 150, sortable: true },
  { prop: 'age', label: '年龄', width: 100, sortable: true }
]

const sortFilterTableRef = ref()
const handleClearSort = () => sortFilterTableRef.value?.clearSort()

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

const tsSort = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', age: 28, tag: '家' },
  { id: 2, date: '2024-01-02', name: '李四', age: 35, tag: '公司' },
  { id: 3, date: '2024-01-03', name: '王五', age: 22, tag: '家' },
  { id: 4, date: '2024-01-04', name: '赵六', age: 45, tag: '公司' },
  { id: 5, date: '2024-01-05', name: '钱七', age: 31, tag: '学校' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'tag', label: '标签' }
]
</${_S}>`

const jsSort = toJs(tsSort)

const tsFilter = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', age: 28, tag: '家' },
  { id: 2, date: '2024-01-02', name: '李四', age: 35, tag: '公司' },
  { id: 3, date: '2024-01-03', name: '王五', age: 22, tag: '家' },
  { id: 4, date: '2024-01-04', name: '赵六', age: 45, tag: '公司' },
  { id: 5, date: '2024-01-05', name: '钱七', age: 31, tag: '学校' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { 
    prop: 'tag', 
    label: '标签',
    filterable: true,
    filters: [
      { text: '家', value: '家' },
      { text: '公司', value: '公司' },
      { text: '学校', value: '学校' }
    ]
  }
]
</${_S}>`

const jsFilter = toJs(tsFilter)

const tsCustomSort = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">姓名列按字符长度排序</p>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface RowItem {
  id: number
  date: string
  name: string
  age: number
  tag: string
}

const customSortMethod = (a: RowItem, b: RowItem, order: string | null) => {
  const nameA = a.name.length
  const nameB = b.name.length
  return order === 'asc' ? nameA - nameB : nameB - nameA
}

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', age: 28, tag: '家' },
  { id: 2, date: '2024-01-02', name: '李四', age: 35, tag: '公司' },
  { id: 3, date: '2024-01-03', name: '王五', age: 22, tag: '家' },
  { id: 4, date: '2024-01-04', name: '赵六', age: 45, tag: '公司' },
  { id: 5, date: '2024-01-05', name: '钱七', age: 31, tag: '学校' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 120, sortable: true, sortMethod: customSortMethod },
  { prop: 'age', label: '年龄', width: 100, sortable: true }
]
</${_S}>`

const jsCustomSort = toJs(tsCustomSort)

const tsMultiSort = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :sort-config="{ multiple: true }"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', age: 28, tag: '家' },
  { id: 2, date: '2024-01-02', name: '李四', age: 35, tag: '公司' },
  { id: 3, date: '2024-01-03', name: '王五', age: 22, tag: '家' },
  { id: 4, date: '2024-01-04', name: '赵六', age: 45, tag: '公司' },
  { id: 5, date: '2024-01-05', name: '钱七', age: 31, tag: '学校' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150, sortable: true },
  { prop: 'age', label: '年龄', width: 100, sortable: true }
]
</${_S}>`

const jsMultiSort = toJs(tsMultiSort)

const tsClearSort = `<${_T}>
  <yh-button size="small" @click="clearSort" style="margin-bottom: 16px">清除排序</yh-button>
  <yh-table ref="tableRef" :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', age: 28, tag: '家' },
  { id: 2, date: '2024-01-02', name: '李四', age: 35, tag: '公司' },
  { id: 3, date: '2024-01-03', name: '王五', age: 22, tag: '家' },
  { id: 4, date: '2024-01-04', name: '赵六', age: 45, tag: '公司' },
  { id: 5, date: '2024-01-05', name: '钱七', age: 31, tag: '学校' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'tag', label: '标签' }
]

const clearSort = () => tableRef.value?.clearSort()
</${_S}>`

const jsClearSort = toJs(tsClearSort)

</script>

## 排序

设置列的 `sortable` 属性为 `true` 即可启用排序功能。

<DemoBlock title="排序" :ts-code="tsSort" :js-code="jsSort">
  <yh-table :data="sortFilterData" :columns="sortFilterColumns" border />
</DemoBlock>

## 筛选

设置列的 `filterable` 属性为 `true` 并提供 `filters` 选项即可启用筛选。

<DemoBlock title="筛选" :ts-code="tsFilter" :js-code="jsFilter">
  <yh-table :data="sortFilterData" :columns="sortFilterColumnsOnly" border />
</DemoBlock>

## 自定义排序

通过 `sortMethod` 属性可以自定义排序逻辑。

<DemoBlock title="自定义排序" :ts-code="tsCustomSort" :js-code="jsCustomSort">
  <yh-table :data="sortFilterData" :columns="customSortFilterColumns" border />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">姓名列按字符长度排序</p>
</DemoBlock>

## 多列排序

配置 `sort-config.multiple` 为 `true` 可启用多列排序。

<DemoBlock title="多列排序" :ts-code="tsMultiSort" :js-code="jsMultiSort">
  <yh-table 
    :data="sortFilterData" 
    :columns="multiSortFilterColumns" 
    :sort-config="{ multiple: true }"
    border
  />
</DemoBlock>

## 清除排序

通过表格实例的 `clearSort` 方法清除排序状态。

<DemoBlock title="清除排序" :ts-code="tsClearSort" :js-code="jsClearSort">
  <yh-button size="small" @click="handleClearSort" style="margin-bottom: 16px">清除排序</yh-button>
  <yh-table 
    ref="sortFilterTableRef"
    :data="sortFilterData" 
    :columns="sortFilterColumns" 
    border
  />
</DemoBlock>
