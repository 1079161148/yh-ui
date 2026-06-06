# Table 表格 - 树形数据与展开行

Table 组件支持树形数据展示和展开行功能。

<script setup lang="ts">
import { ref } from 'vue'

// --- 1. 树形数据 ---
const tableTreeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: '一级部门A',
    address: '北京市总部',
    children: [
      { id: 11, date: '2024-01-02', name: '二级部门A-1', address: '北京市朝阳区' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: '二级部门A-2', 
        address: '北京市海淀区',
        children: [
          { id: 121, date: '2024-01-04', name: '三级部门A-2-1', address: '中关村' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: '一级部门B',
    address: '上海市总部',
    children: [
      { id: 21, date: '2024-01-07', name: '二级部门B-1', address: '上海市浦东新区' }
    ]
  }
])

const tableTreeColumns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '部门名称', width: 200, treeNode: true },
  { prop: 'address', label: '地址' }
]

// --- 2. 展开行数据 ---
const tableExpandData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区', description: '这是张三的详细信息，包含更多的描述内容...' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区', description: '这是李四的详细信息，包含更多的描述内容...' }
])

const tableExpandColumns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

// --- 3. 选择功能 ---
const selectedTreeDataRows = ref<Record<string, unknown>[]>([])
const handleTreeDataSelectionChange = (rows: Record<string, unknown>[]) => {
  selectedTreeDataRows.value = rows
}

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

const tsTree = `<${_T}>
  <yh-table 
    :data="treeData" 
    :columns="columns"
    :tree-config="{ childrenKey: 'children' }"
    row-key="id"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: '一级部门A',
    address: '北京市总部',
    children: [
      { id: 11, date: '2024-01-02', name: '二级部门A-1', address: '北京市朝阳区' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: '二级部门A-2', 
        address: '北京市海淀区',
        children: [
          { id: 121, date: '2024-01-04', name: '三级部门A-2-1', address: '中关村' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: '一级部门B',
    address: '上海市总部',
    children: [
      { id: 21, date: '2024-01-07', name: '二级部门B-1', address: '上海市浦东新区' }
    ]
  }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '部门名称', width: 200, treeNode: true },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsTree = toJs(tsTree)

const tsTreeExpandAll = `<${_T}>
  <yh-table 
    :data="treeData" 
    :columns="columns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    row-key="id"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: '一级部门A',
    address: '北京市总部',
    children: [
      { id: 11, date: '2024-01-02', name: '二级部门A-1', address: '北京市朝阳区' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: '二级部门A-2', 
        address: '北京市海淀区',
        children: [
          { id: 121, date: '2024-01-04', name: '三级部门A-2-1', address: '中关村' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: '一级部门B',
    address: '上海市总部',
    children: [
      { id: 21, date: '2024-01-07', name: '二级部门B-1', address: '上海市浦东新区' }
    ]
  }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '部门名称', width: 200, treeNode: true },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsTreeExpandAll = toJs(tsTreeExpandAll)

const tsExpand = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns"
    :expand-config="{ showIcon: true }"
    row-key="id"
    border
  >
    <${_T} #expand="{ row }">
      <div style="padding: 20px; background: var(--yh-fill-color-lighter)">
        <p style="margin: 0"><strong>详细描述：</strong></p>
        <p style="margin: 8px 0 0; color: var(--yh-text-color-secondary)">{{ row.description }}</p>
      </div>
    </${_T}>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区', description: '这是张三的详细信息，包含更多的描述内容...' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区', description: '这是李四的详细信息，包含更多的描述内容...' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsExpand = toJs(tsExpand)

const tsSelectableTree = `<${_T}>
  <yh-table 
    :data="treeData" 
    :columns="columns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleSelectionChange"
    row-key="id"
    border
  />
  <div style="margin-top: 12px; color: var(--yh-text-color-secondary)">
    已选择: {{ selectedRows.map(row => row.name).join(', ') || '无' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const selectedRows = ref<RowItem[]>([])
const handleSelectionChange = (rows: RowItem[]) => {
  selectedRows.value = rows
}

const treeData = ref([
  {
    id: 1,
    date: '2024-01-01',
    name: '一级部门A',
    address: '北京市总部',
    children: [
      { id: 11, date: '2024-01-02', name: '二级部门A-1', address: '北京市朝阳区' },
      { 
        id: 12, 
        date: '2024-01-03', 
        name: '二级部门A-2', 
        address: '北京市海淀区',
        children: [
          { id: 121, date: '2024-01-04', name: '三级部门A-2-1', address: '中关村' }
        ]
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-06',
    name: '一级部门B',
    address: '上海市总部',
    children: [
      { id: 21, date: '2024-01-07', name: '二级部门B-1', address: '上海市浦东新区' }
    ]
  }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '部门名称', width: 200, treeNode: true },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsSelectableTree = toJs(tsSelectableTree)

</script>

## 树形数据

通过 `tree-config` 配置树形数据，设置列的 `treeNode: true` 指定哪列显示展开图标。

<DemoBlock title="树形数据" :ts-code="tsTree" :js-code="jsTree">
  <yh-table 
    :data="tableTreeData" 
    :columns="tableTreeColumns"
    :tree-config="{ childrenKey: 'children' }"
    row-key="id"
    border
  />
</DemoBlock>

## 默认展开所有

设置 `tree-config.expandAll` 为 `true` 默认展开所有节点。

<DemoBlock title="默认展开所有" :ts-code="tsTreeExpandAll" :js-code="jsTreeExpandAll">
  <yh-table 
    :data="tableTreeData" 
    :columns="tableTreeColumns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    row-key="id"
    border
  />
</DemoBlock>

## 展开行

通过 `expand-config` 和 `expand` 插槽实现展开行功能。

<DemoBlock title="展开行" :ts-code="tsExpand" :js-code="jsExpand">
  <yh-table 
    :data="tableExpandData" 
    :columns="tableExpandColumns"
    :expand-config="{ showIcon: true }"
    row-key="id"
    border
  >
    <template #expand="{ row }">
      <div style="padding: 20px; background: var(--yh-fill-color-lighter)">
        <p style="margin: 0"><strong>详细描述：</strong></p>
        <p style="margin: 8px 0 0; color: var(--yh-text-color-secondary)">{{ row.description }}</p>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## 可选择的树形数据

树形数据可以与选择功能结合使用。

<DemoBlock title="可选择的树形数据" :ts-code="tsSelectableTree" :js-code="jsSelectableTree">
  <yh-table 
    :data="tableTreeData" 
    :columns="tableTreeColumns"
    :tree-config="{ childrenKey: 'children', expandAll: true }"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleTreeDataSelectionChange"
    row-key="id"
    border
  />
  <div style="margin-top: 12px; color: var(--yh-text-color-secondary)">
    已选择: {{ selectedTreeDataRows.map(row => row.name).join(', ') || '无' }}
  </div>
</DemoBlock>
