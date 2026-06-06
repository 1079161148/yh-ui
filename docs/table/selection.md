# Table 表格 - 选择功能

Table 组件支持单选和多选功能。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// --- 1. 基础选择数据 ---
const selectionData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区' },
  { id: 5, date: '2024-01-05', name: '钱七', address: '杭州市西湖区' }
])

const selectionColumns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

// --- 2. 多选功能 ---
const multipleTableRef = ref()
const multipleSelection = ref<Record<string, unknown>[]>([])
const handleSelectionChange = (rows: Record<string, unknown>[]) => {
  multipleSelection.value = rows
}

const toggleSelection = (rows?: Record<string, unknown>[]) => {
  if (rows) {
    rows.forEach(row => {
      multipleTableRef.value?.toggleRowSelection(row, true)
    })
  } else {
    multipleTableRef.value?.clearSelection()
  }
}

// --- 3. 单选功能 ---
const radioTableRef = ref()
const currentRadioRow = ref<Record<string, unknown> | undefined>()
const handleRadioChange = (rows: Record<string, unknown>[]) => {
  currentRadioRow.value = rows[0] || undefined
}

// --- 4. 禁用选择 ---
const selectableRow = (row: Record<string, unknown>) => {
  return row.id !== 2 && row.id !== 4
}

// --- 示例代码 ---

const tsMultiple = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="toggleSelection([tableData[1], tableData[2]])">
      选中第2、3行
    </yh-button>
    <yh-button size="small" @click="toggleSelection()" style="margin-left: 8px">
      清除选择
    </yh-button>
  </div>
  <yh-table
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleSelectionChange"
    border
  />
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    已选择: {{ multipleSelection.map(row => row.name).join(', ') || '无' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区' },
  { id: 5, date: '2024-01-05', name: '钱七', address: '杭州市西湖区' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const multipleSelection = ref<RowItem[]>([])

const handleSelectionChange = (rows: RowItem[]) => {
  multipleSelection.value = rows
}

const toggleSelection = (rows?: RowItem[]) => {
  if (rows) {
    rows.forEach(row => {
      tableRef.value?.toggleRowSelection(row, true)
    })
  } else {
    tableRef.value?.clearSelection()
  }
}
</${_S}>`

const jsMultiple = toJs(tsMultiple)

const tsRadio = `<${_T}>
  <yh-table
    :data="tableData"
    :columns="columns"
    :selection-config="{ type: 'radio' }"
    @selection-change="handleRadioChange"
    border
  />
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    当前选中: {{ currentRow?.name || '无' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区' },
  { id: 5, date: '2024-01-05', name: '钱七', address: '杭州市西湖区' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const currentRow = ref<RowItem | null>(null)

const handleRadioChange = (rows: RowItem[]) => {
  currentRow.value = rows[0] || null
}
</${_S}>`

const jsRadio = toJs(tsRadio)

const tsDisabled = `<${_T}>
  <yh-table
    :data="tableData"
    :columns="columns"
    :selection-config="{ 
      type: 'checkbox',
      checkable: selectable
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">第2行和第4行被禁用选择</p>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区' },
  { id: 5, date: '2024-01-05', name: '钱七', address: '杭州市西湖区' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

interface RowItem {
  id: number
  date: string
  name: string
  address: string
}

const selectable = (row: RowItem) => {
  return row.id !== 2 && row.id !== 4
}
</${_S}>`

const jsDisabled = toJs(tsDisabled)

const tsReserve = `<${_T}>
  <yh-table
    :data="tableData"
    :columns="columns"
    :selection-config="{ 
      type: 'checkbox',
      reserve: true
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">配合分页使用时，切换页面后选择状态会保留</p>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区' },
  { id: 5, date: '2024-01-05', name: '钱七', address: '杭州市西湖区' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsReserve = toJs(tsReserve)

// --- 5. 实战案例: 跨页勾选 + 在线接口 ---
const practicalTableRef = ref()
const practicalData = ref<Record<string, unknown>[]>([])
const practicalLoading = ref(false)
const practicalPage = ref(1)
const practicalPageSize = 10
const practicalTotal = ref(0)
const practicalSelectedKeys = ref<number[]>([])
const practicalSelectedMap = ref(new Map<number, Record<string, unknown>>())

const practicalColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '标题' },
  { prop: 'userId', label: '用户ID', width: 100 }
]

const fetchPosts = async (page: number) => {
  practicalLoading.value = true
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${practicalPageSize}`
    )
    practicalData.value = await res.json()
    practicalTotal.value = 100
  } finally {
    practicalLoading.value = false
  }
}

const handlePracticalPageChange = (page: number) => {
  practicalPage.value = page
  fetchPosts(page)
}

const handlePracticalSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(practicalData.value.map(r => r.id as number))
  // 移除当前页所有项
  currentIds.forEach(id => practicalSelectedMap.value.delete(id))
  // 加回当前页被选中项
  rows.forEach(row => practicalSelectedMap.value.set(row.id as number, { ...row }))
  // 同步 keys
  practicalSelectedKeys.value = Array.from(practicalSelectedMap.value.keys())
}

const removePracticalSelected = (id: number) => {
  practicalSelectedMap.value.delete(id)
  practicalSelectedKeys.value = Array.from(practicalSelectedMap.value.keys())
}

const clearAllPractical = () => {
  practicalSelectedMap.value.clear()
  practicalSelectedKeys.value = []
}

const practicalSelectedList = computed(() => Array.from(practicalSelectedMap.value.values()))

// 初始加载
fetchPosts(1)

// --- 6. 实战案例: 初始化回显已选数据 ---
const echoTableRef = ref()
const echoData = ref<Record<string, unknown>[]>([])
const echoLoading = ref(false)
const echoPage = ref(1)
const echoPageSize = 10
const echoTotal = ref(0)
const echoSelectedKeys = ref<number[]>([])
const echoSelectedMap = ref(new Map<number, Record<string, unknown>>())

const echoColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '标题' },
  { prop: 'userId', label: '用户ID', width: 100 }
]

// 模拟后端返回的已选数据（例如编辑表单时回显之前保存的勾选项）
const mockSavedSelections = [
  { id: 3, title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut', userId: 1 },
  { id: 7, title: 'magnam facilis autem', userId: 1 },
  { id: 15, title: 'eveniet quod temporibus', userId: 2 },
  { id: 22, title: 'dolor sint quo a velit explicabo quia nam', userId: 3 },
  { id: 38, title: 'explicabo et eos deleniti nostrum ab id repellendus', userId: 4 }
]

const initEchoSelections = () => {
  // 将后端返回的已选数据写入 Map
  echoSelectedMap.value.clear()
  mockSavedSelections.forEach(item => {
    echoSelectedMap.value.set(item.id, { ...item })
  })
  // 同步 keys，驱动表格勾选状态
  echoSelectedKeys.value = Array.from(echoSelectedMap.value.keys())
}

const fetchEchoPosts = async (page: number) => {
  echoLoading.value = true
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${echoPageSize}`
    )
    echoData.value = await res.json()
    echoTotal.value = 100
  } finally {
    echoLoading.value = false
  }
}

const handleEchoPageChange = (page: number) => {
  echoPage.value = page
  fetchEchoPosts(page)
}

const handleEchoSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(echoData.value.map(r => r.id as number))
  currentIds.forEach(id => echoSelectedMap.value.delete(id))
  rows.forEach(row => echoSelectedMap.value.set(row.id as number, { ...row }))
  echoSelectedKeys.value = Array.from(echoSelectedMap.value.keys())
}

const removeEchoSelected = (id: number) => {
  echoSelectedMap.value.delete(id)
  echoSelectedKeys.value = Array.from(echoSelectedMap.value.keys())
}

const clearAllEcho = () => {
  echoSelectedMap.value.clear()
  echoSelectedKeys.value = []
}

const echoSelectedList = computed(() => Array.from(echoSelectedMap.value.values()))

// 初始化: 先加载已选数据, 再请求第一页
initEchoSelections()
fetchEchoPosts(1)

const tsPractical = `<${_T}>
  <yh-table
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: selectedKeys
    }"
    :loading="loading"
    @selection-change="handleSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      background
      @current-change="handlePageChange"
    />
  </div>

  <div v-if="selectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">已选 {{ selectedList.length }} 项</span>
      <yh-button size="small" type="danger" plain @click="clearAll">清空</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in selectedList"
        :key="item.id"
        closable
        @close="removeSelected(item.id)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 20) }}...
      </yh-tag>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'

const tableRef = ref()
const tableData = ref<Record<string, unknown>[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const selectedKeys = ref<number[]>([])
const selectedMap = ref(new Map<number, Record<string, unknown>>())

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '标题' },
  { prop: 'userId', label: '用户ID', width: 100 }
]

const fetchPosts = async (page: number) => {
  loading.value = true
  try {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${pageSize}\`
    )
    tableData.value = await res.json()
    total.value = 100
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchPosts(page)
}

const handleSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(tableData.value.map(r => r.id as number))
  currentIds.forEach(id => selectedMap.value.delete(id))
  rows.forEach(row => selectedMap.value.set(row.id as number, { ...row }))
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const removeSelected = (id: number) => {
  selectedMap.value.delete(id)
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const clearAll = () => {
  selectedMap.value.clear()
  selectedKeys.value = []
}

const selectedList = computed(() => Array.from(selectedMap.value.values()))

fetchPosts(1)
</${_S}>`

const jsPractical = toJs(tsPractical)

const tsEcho = `<${_T}>
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <yh-button size="small" type="primary" @click="initSelections">
      模拟初始化回显
    </yh-button>
    <yh-button size="small" @click="clearAll">
      清空所有选择
    </yh-button>
  </div>

  <yh-table
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: selectedKeys
    }"
    :loading="loading"
    @selection-change="handleSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      background
      @current-change="handlePageChange"
    />
  </div>

  <div v-if="selectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">已选 {{ selectedList.length }} 项（含跨页数据）</span>
      <yh-button size="small" type="danger" plain @click="clearAll">清空</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in selectedList"
        :key="item.id"
        closable
        @close="removeSelected(item.id)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 15) }}...
      </yh-tag>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'

const tableRef = ref()
const tableData = ref<Record<string, unknown>[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const selectedKeys = ref<number[]>([])
const selectedMap = ref(new Map<number, Record<string, unknown>>())

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '标题' },
  { prop: 'userId', label: '用户ID', width: 100 }
]

// 模拟后端返回的已选数据（如编辑表单时回显之前保存的勾选项）
const mockSavedSelections = [
  { id: 3, title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut', userId: 1 },
  { id: 7, title: 'magnam facilis autem', userId: 1 },
  { id: 15, title: 'eveniet quod temporibus', userId: 2 },
  { id: 22, title: 'dolor sint quo a velit explicabo quia nam', userId: 3 },
  { id: 38, title: 'explicabo et eos deleniti nostrum ab id repellendus', userId: 4 }
]

/**
 * 初始化回显: 将后端已选数据写入 Map → 同步 keys → 表格自动勾选
 * 核心原理: selectedRowKeys 驱动表格的勾选状态
 */
const initSelections = () => {
  selectedMap.value.clear()
  mockSavedSelections.forEach(item => {
    selectedMap.value.set(item.id, { ...item })
  })
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const fetchPosts = async (page: number) => {
  loading.value = true
  try {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${pageSize}\`
    )
    tableData.value = await res.json()
    total.value = 100
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchPosts(page)
}

const handleSelectionChange = (rows: Record<string, unknown>[]) => {
  const currentIds = new Set(tableData.value.map(r => r.id as number))
  currentIds.forEach(id => selectedMap.value.delete(id))
  rows.forEach(row => selectedMap.value.set(row.id as number, { ...row }))
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const removeSelected = (id: number) => {
  selectedMap.value.delete(id)
  selectedKeys.value = Array.from(selectedMap.value.keys())
}

const clearAll = () => {
  selectedMap.value.clear()
  selectedKeys.value = []
}

const selectedList = computed(() => Array.from(selectedMap.value.values()))

// 页面加载: 先回显已选, 再请求数据
initSelections()
fetchPosts(1)
</${_S}>`

const jsEcho = toJs(tsEcho)

</script>

## 多选

配置 `selection-config` 的 `type` 为 `checkbox` 启用多选功能。

<DemoBlock title="多选" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="toggleSelection([selectionData[1], selectionData[2]])">
      选中第2、3行
    </yh-button>
    <yh-button size="small" @click="toggleSelection()" style="margin-left: 8px">
      清除选择
    </yh-button>
  </div>
  
  <yh-table
    ref="multipleTableRef"
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ type: 'checkbox' }"
    @selection-change="handleSelectionChange"
    border
  />
  
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    已选择: {{ multipleSelection.map(row => row.name).join(', ') || '无' }}
  </div>
</DemoBlock>

## 单选

配置 `selection-config` 的 `type` 为 `radio` 启用单选功能。

<DemoBlock title="单选" :ts-code="tsRadio" :js-code="jsRadio">
  <yh-table
    ref="radioTableRef"
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ type: 'radio' }"
    @selection-change="handleRadioChange"
    border
  />
  
  <div style="margin-top: 16px; color: var(--yh-text-color-secondary)">
    当前选中: {{ currentRadioRow?.name || '无' }}
  </div>
</DemoBlock>

## 禁用选择

通过 `selection-config.checkable` 函数控制某行能否被选中。

<DemoBlock title="禁用选择" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-table
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ 
      type: 'checkbox',
      checkable: selectableRow
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">第2行和第4行被禁用选择</p>
</DemoBlock>

## 跨页保留选择

设置 `selection-config.reserve` 为 `true` 可在切换分页时保留选择状态。

<DemoBlock title="跨页保留选择" :ts-code="tsReserve" :js-code="jsReserve">
  <yh-table
    :data="selectionData"
    :columns="selectionColumns"
    :selection-config="{ 
      type: 'checkbox',
      reserve: true
    }"
    border
  />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary)">配合分页使用时，切换页面后选择状态会保留</p>
</DemoBlock>

## 实战：跨页勾选与回显

结合分页组件请求在线接口 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)，演示真实场景下的跨页勾选和已选回显功能。

<DemoBlock title="实战：跨页勾选与回显" :ts-code="tsPractical" :js-code="jsPractical">
  <yh-table
    ref="practicalTableRef"
    :data="practicalData"
    :columns="practicalColumns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: practicalSelectedKeys
    }"
    :loading="practicalLoading"
    @selection-change="handlePracticalSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="practicalPage"
      :page-size="practicalPageSize"
      :total="practicalTotal"
      layout="total, prev, pager, next"
      background
      @current-change="handlePracticalPageChange"
    />
  </div>

  <div v-if="practicalSelectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">已选 {{ practicalSelectedList.length }} 项</span>
      <yh-button size="small" type="danger" plain @click="clearAllPractical">清空</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in practicalSelectedList"
        :key="(item.id as number)"
        closable
        @close="removePracticalSelected(item.id as number)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 20) }}...
      </yh-tag>
    </div>
  </div>
</DemoBlock>

## 实战：分页初始化回显

模拟编辑场景——页面加载时从后端获取之前已保存的勾选数据，通过 `selectedRowKeys` 自动回显勾选状态。切换到对应页码时，属于该页的行会自动打勾；同时支持继续勾选/取消操作。

> **核心思路**：将后端返回的已选数据写入 `Map`，提取 `keys` 传给 `selectedRowKeys`，表格会自动将匹配的行标记为选中。

<DemoBlock title="实战：分页初始化回显" :ts-code="tsEcho" :js-code="jsEcho">
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <yh-button size="small" type="primary" @click="initEchoSelections">
      模拟初始化回显
    </yh-button>
    <yh-button size="small" @click="clearAllEcho">
      清空所有选择
    </yh-button>
  </div>

  <yh-table
    ref="echoTableRef"
    :data="echoData"
    :columns="echoColumns"
    :selection-config="{
      type: 'checkbox',
      reserve: true,
      selectedRowKeys: echoSelectedKeys
    }"
    :loading="echoLoading"
    @selection-change="handleEchoSelectionChange"
    border
  />

  <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
    <yh-pagination
      :current-page="echoPage"
      :page-size="echoPageSize"
      :total="echoTotal"
      layout="total, prev, pager, next"
      background
      @current-change="handleEchoPageChange"
    />
  </div>

  <div v-if="echoSelectedList.length" style="margin-top: 20px; padding: 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="font-weight: 600;">已选 {{ echoSelectedList.length }} 项（含跨页数据）</span>
      <yh-button size="small" type="danger" plain @click="clearAllEcho">清空</yh-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-tag
        v-for="item in echoSelectedList"
        :key="(item.id as number)"
        closable
        @close="removeEchoSelected(item.id as number)"
      >
        #{{ item.id }} {{ (item.title as string).slice(0, 15) }}...
      </yh-tag>
    </div>
  </div>
</DemoBlock>
