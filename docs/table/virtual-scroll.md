# Table 表格 - 虚拟滚动

超大数据量场景下，通过虚拟滚动技术只渲染可视区域内的行，大幅提升表格性能。

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 1. 纵向虚拟滚动 ====================

const bigData = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: 18 + (i % 50),
    email: `user${i + 1}@example.com`,
    address: `城市${(i % 100) + 1} · 街道${(i % 200) + 1}号`,
    date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
  }))
)

const bigColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱', width: 220 },
  { prop: 'address', label: '地址' },
  { prop: 'date', label: '日期', width: 120 }
]

// ==================== 2. 自定义行高 ====================

const rowHeightData = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    content: i % 3 === 0
      ? '这是一段较长的内容，用于测试不同行高的场景。'
      : i % 3 === 1
        ? '短内容'
        : '这是一段中等长度的内容描述。',
    status: ['进行中', '已完成', '待审核'][i % 3]
  }))
)

const rowHeightColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'content', label: '内容' },
  { prop: 'status', label: '状态', width: 100 }
]

// ==================== 3. 固定列 + 虚拟滚动 ====================

const fixedVirtualData = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    dept: ['技术部', '产品部', '设计部', '运营部', '市场部'][i % 5],
    position: ['工程师', '经理', '设计师', '运营', '市场'][i % 5],
    salary: 8000 + (i % 20) * 1000,
    city: ['北京', '上海', '广州', '深圳', '杭州'][i % 5],
    phone: `138${String(i).padStart(8, '0')}`,
    action: ''
  }))
)

const fixedVirtualColumns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' as const },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' as const },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 120 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'phone', label: '手机号', width: 150 },
  {
    prop: 'action',
    label: '操作',
    width: 120,
    fixed: 'right' as const,
    render: () => h('a', { style: 'color: var(--yh-color-primary, #409eff); cursor: pointer;' }, '查看')
  }
]

// ==================== 4. 排序 + 筛选 + 虚拟滚动 ====================

const sortFilterVirtualData = ref(
  Array.from({ length: 8000 }, (_, i) => ({
    id: i + 1,
    name: `员工${i + 1}`,
    age: 20 + (i % 40),
    dept: ['技术部', '产品部', '设计部', '运营部'][i % 4],
    score: Math.round(60 + Math.random() * 40)
  }))
)

const sortFilterVirtualColumns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  {
    prop: 'dept',
    label: '部门',
    width: 130,
    filterable: true,
    filters: [
      { text: '技术部', value: '技术部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' },
      { text: '运营部', value: '运营部' }
    ]
  },
  { prop: 'score', label: '评分', sortable: true }
]

// ==================== 5. 分组表头 + 虚拟滚动 ====================

const groupHeaderVirtualData = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: 20 + (i % 40),
    province: ['北京', '上海', '广东', '浙江', '江苏'][i % 5],
    city: ['朝阳区', '浦东新区', '天河区', '西湖区', '鼓楼区'][i % 5],
    address: `街道${(i % 100) + 1}号`,
    zip: `${100000 + i}`
  }))
)

const groupHeaderVirtualColumns = [
  {
    label: '基本信息',
    children: [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'age', label: '年龄', width: 80 }
    ]
  },
  {
    label: '地址信息',
    children: [
      { prop: 'province', label: '省份', width: 100 },
      { prop: 'city', label: '城市', width: 120 },
      { prop: 'address', label: '详细地址' },
      { prop: 'zip', label: '邮编', width: 100 }
    ]
  }
]

// ==================== 6. 百万级数据 ====================

const millionLoading = ref(false)
const millionData = ref<Record<string, unknown>[]>([])
const millionCount = ref(0)

const generateMillionData = () => {
  millionLoading.value = true
  setTimeout(() => {
    const count = 1000000
    const arr = new Array(count)
    for (let i = 0; i < count; i++) {
      arr[i] = {
        id: i + 1,
        col1: `数据${i + 1}-A`,
        col2: `数据${i + 1}-B`,
        col3: Math.round(Math.random() * 10000),
        col4: ['正常', '警告', '异常'][i % 3]
      }
    }
    millionData.value = arr
    millionCount.value = count
    millionLoading.value = false
  }, 100)
}

const millionColumns = [
  { prop: 'id', label: 'ID', width: 100 },
  { prop: 'col1', label: '列A', width: 160 },
  { prop: 'col2', label: '列B', width: 160 },
  { prop: 'col3', label: '数值', width: 120 },
  { prop: 'col4', label: '状态' }
]

// ==================== 示例代码 ====================

const tsBasicVirtual = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399;">共 {{ data.length.toLocaleString() }} 条数据</p>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: \`用户\${i + 1}\`,
    age: 18 + (i % 50),
    email: \`user\${i + 1}@example.com\`,
    address: \`城市\${(i % 100) + 1} · 街道\${(i % 200) + 1}号\`,
    date: \`2024-\${String((i % 12) + 1).padStart(2, '0')}-\${String((i % 28) + 1).padStart(2, '0')}\`
  }))
)

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱', width: 220 },
  { prop: 'address', label: '地址' },
  { prop: 'date', label: '日期', width: 120 }
]
</${_S}>`

const jsBasicVirtual = toJs(tsBasicVirtual)

const tsRowHeight = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 60 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: \`用户\${i + 1}\`,
    content: i % 3 === 0
      ? '这是一段较长的内容，用于测试不同行高的场景。'
      : i % 3 === 1 ? '短内容' : '这是一段中等长度的内容描述。',
    status: ['进行中', '已完成', '待审核'][i % 3]
  }))
)

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'content', label: '内容' },
  { prop: 'status', label: '状态', width: 100 }
]
</${_S}>`

const jsRowHeight = toJs(tsRowHeight)

const tsFixedVirtual = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const data = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: \`用户\${i + 1}\`,
    dept: ['技术部', '产品部', '设计部', '运营部', '市场部'][i % 5],
    position: ['工程师', '经理', '设计师', '运营', '市场'][i % 5],
    salary: 8000 + (i % 20) * 1000,
    city: ['北京', '上海', '广州', '深圳', '杭州'][i % 5],
    phone: \`138\${String(i).padStart(8, '0')}\`,
    action: ''
  }))
)

interface ColumnType {
  prop: string
  label: string
  width?: number
  fixed?: 'left' | 'right'
  render?: () => ReturnType<typeof h>
}

const columns: ColumnType[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 120 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'phone', label: '手机号', width: 150 },
  {
    prop: 'action',
    label: '操作',
    width: 120,
    fixed: 'right',
    render: () => h('a', { style: 'color: var(--yh-color-primary, #409eff); cursor: pointer;' }, '查看')
  }
]
</${_S}>`

const jsFixedVirtual = toJs(tsFixedVirtual)

const tsSortFilterVirtual = `<${_T}>
  <p style="margin-bottom: 12px; color: #909399;">共 {{ data.length.toLocaleString() }} 条数据（支持排序和筛选）</p>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 8000 }, (_, i) => ({
    id: i + 1,
    name: \`员工\${i + 1}\`,
    age: 20 + (i % 40),
    dept: ['技术部', '产品部', '设计部', '运营部'][i % 4],
    score: Math.round(60 + Math.random() * 40)
  }))
)

const columns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  {
    prop: 'dept',
    label: '部门',
    width: 130,
    filterable: true,
    filters: [
      { text: '技术部', value: '技术部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' },
      { text: '运营部', value: '运营部' }
    ]
  },
  { prop: 'score', label: '评分', sortable: true }
]
</${_S}>`

const jsSortFilterVirtual = toJs(tsSortFilterVirtual)

const tsGroupVirtual = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: \`用户\${i + 1}\`,
    age: 20 + (i % 40),
    province: ['北京', '上海', '广东', '浙江', '江苏'][i % 5],
    city: ['朝阳区', '浦东新区', '天河区', '西湖区', '鼓楼区'][i % 5],
    address: \`街道\${(i % 100) + 1}号\`,
    zip: \`\${100000 + i}\`
  }))
)

const columns = [
  {
    label: '基本信息',
    children: [
      { prop: 'id', label: 'ID', width: 80 },
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'age', label: '年龄', width: 80 }
    ]
  },
  {
    label: '地址信息',
    children: [
      { prop: 'province', label: '省份', width: 100 },
      { prop: 'city', label: '城市', width: 120 },
      { prop: 'address', label: '详细地址' },
      { prop: 'zip', label: '邮编', width: 100 }
    ]
  }
]
</${_S}>`

const jsGroupVirtual = toJs(tsGroupVirtual)

const tsMillionVirtual = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
    <yh-button type="primary" @click="generate" :loading="loading">
      生成 100 万行数据
    </yh-button>
    <span v-if="count > 0" style="color: #67c23a; font-weight: 600;">
      ✓ 已加载 {{ count.toLocaleString() }} 条数据
    </span>
  </div>
  <yh-table
    v-if="data.length > 0"
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 44, buffer: 10 }"
    height="400px"
    border
    row-key="id"
  />
  <div v-else style="padding: 40px; text-align: center; color: #909399; border: 1px dashed #dcdfe6; border-radius: 8px;">
    点击按钮生成百万级数据进行虚拟滚动测试
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const data = ref<Record<string, unknown>[]>([])
const count = ref(0)

const generate = () => {
  loading.value = true
  setTimeout(() => {
    const total = 1000000
    const arr = new Array(total)
    for (let i = 0; i < total; i++) {
      arr[i] = {
        id: i + 1,
        col1: \`数据\${i + 1}-A\`,
        col2: \`数据\${i + 1}-B\`,
        col3: Math.round(Math.random() * 10000),
        col4: ['正常', '警告', '异常'][i % 3]
      }
    }
    data.value = arr
    count.value = total
    loading.value = false
  }, 100)
}

const columns = [
  { prop: 'id', label: 'ID', width: 100 },
  { prop: 'col1', label: '列A', width: 160 },
  { prop: 'col2', label: '列B', width: 160 },
  { prop: 'col3', label: '数值', width: 120 },
  { prop: 'col4', label: '状态' }
]
</${_S}>`

const jsMillionVirtual = toJs(tsMillionVirtual)
</script>

## 纵向虚拟滚动

设置 `virtual-config` 的 `enabled: true` 即可开启虚拟滚动，配合 `height` 固定表格高度。默认数据量超过 100 条时自动生效。

<DemoBlock title="纵向虚拟滚动（10,000 条数据）" :ts-code="tsBasicVirtual" :js-code="jsBasicVirtual">
  <p style="margin-bottom: 12px; color: #909399;">共 {{ bigData.length.toLocaleString() }} 条数据</p>
  <yh-table
    :data="bigData"
    :columns="bigColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## 设置行高

通过 `virtual-config.rowHeight` 设置虚拟滚动的行高，确保滚动条计算准确。支持设置为固定数值或函数（动态行高）。

<DemoBlock title="自定义行高" :ts-code="tsRowHeight" :js-code="jsRowHeight">
  <yh-table
    :data="rowHeightData"
    :columns="rowHeightColumns"
    :virtual-config="{ enabled: true, rowHeight: 60 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## 冻结列 + 虚拟滚动

虚拟滚动可与固定列 (`fixed`) 同时使用，确保左右两侧的关键列始终可见。

<DemoBlock title="固定列 + 虚拟滚动" :ts-code="tsFixedVirtual" :js-code="jsFixedVirtual">
  <yh-table
    :data="fixedVirtualData"
    :columns="fixedVirtualColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## 排序与筛选

虚拟滚动与排序、筛选功能完全兼容。排序和筛选在内存中完成，虚拟滚动仅负责渲染优化。

<DemoBlock title="排序 + 筛选 + 虚拟滚动" :ts-code="tsSortFilterVirtual" :js-code="jsSortFilterVirtual">
  <p style="margin-bottom: 12px; color: #909399;">共 {{ sortFilterVirtualData.length.toLocaleString() }} 条数据（支持排序和筛选）</p>
  <yh-table
    :data="sortFilterVirtualData"
    :columns="sortFilterVirtualColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## 使用分组表头

虚拟滚动可以与多级表头 (`children`) 配合使用，支持分组列头的大数据渲染。

<DemoBlock title="分组表头 + 虚拟滚动" :ts-code="tsGroupVirtual" :js-code="jsGroupVirtual">
  <yh-table
    :data="groupHeaderVirtualData"
    :columns="groupHeaderVirtualColumns"
    :virtual-config="{ enabled: true, rowHeight: 48 }"
    height="400px"
    border
    row-key="id"
  />
</DemoBlock>

## 百万级数据量

通过虚拟滚动，即使是百万级别的数据量也能保持流畅的滚动体验。

<DemoBlock title="百万级数据" :ts-code="tsMillionVirtual" :js-code="jsMillionVirtual">
  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
    <yh-button type="primary" @click="generateMillionData" :loading="millionLoading">
      生成 100 万行数据
    </yh-button>
    <span v-if="millionCount > 0" style="color: #67c23a; font-weight: 600;">
      ✓ 已加载 {{ millionCount.toLocaleString() }} 条数据
    </span>
  </div>
  <yh-table
    v-if="millionData.length > 0"
    :data="millionData"
    :columns="millionColumns"
    :virtual-config="{ enabled: true, rowHeight: 44, buffer: 10 }"
    height="400px"
    border
    row-key="id"
  />
  <div v-else style="padding: 40px; text-align: center; color: #909399; border: 1px dashed #dcdfe6; border-radius: 8px;">
    点击按钮生成百万级数据进行虚拟滚动测试
  </div>
</DemoBlock>

## API

### VirtualConfig 虚拟滚动配置

通过 `virtual-config` 属性传入。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enabled | 是否启用虚拟滚动 | `boolean` | `false` |
| rowHeight | 行高（固定值或函数） | `number \| ((row, rowIndex) => number)` | `48` |
| buffer | 缓冲区行数（上下各多渲染的行数） | `number` | `5` |
| overscan | 预渲染行数 | `number` | `3` |
| columnVirtual | 是否启用列虚拟化 | `boolean` | `false` |
| columnBuffer | 列缓冲区数量 | `number` | `3` |

### 方法（通过 ref 调用）

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollTo | 滚动到指定位置 | `({ top?, left?, row?, rowIndex? })` |
| refresh | 刷新虚拟滚动（数据变化后调用） | — |
| doLayout | 重新计算表格布局 | — |

### 注意事项

1. **必须设置 `height`**：虚拟滚动需要固定的容器高度来计算可见区域。
2. **必须设置 `row-key`**：虚拟滚动依赖行唯一标识来追踪渲染。
3. **`rowHeight` 要准确**：虚拟滚动根据行高计算滚动位置和可见范围，设置不准确可能导致滚动条跳动。
4. **数据量阈值**：默认数据量超过 100 条才会真正启用虚拟渲染，少于 100 条时正常渲染。
5. **兼容性**：虚拟滚动与排序、筛选、固定列、分组表头等功能完全兼容。

