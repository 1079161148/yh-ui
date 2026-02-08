# Table 表格 - 合并与汇总

Table 组件支持合并行列和显示汇总行。

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// --- 1. 合并数据 ---
const tableSpanData = ref([
  { id: 1, date: '2024-01-01', name: '张三', province: '北京', city: '朝阳区', address: '建国路88号' },
  { id: 2, date: '2024-01-01', name: '张三', province: '北京', city: '海淀区', address: '中关村大街' },
  { id: 3, date: '2024-01-02', name: '李四', province: '上海', city: '浦东新区', address: '陆家嘴' },
  { id: 4, date: '2024-01-02', name: '李四', province: '上海', city: '静安区', address: '南京西路' },
  { id: 5, date: '2024-01-03', name: '王五', province: '广东', city: '天河区', address: '珠江新城' }
])

const tableSpanColumns = [
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'province', label: '省份', width: 100 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'address', label: '地址' }
]

interface SpanMethodParams {
  rowIndex: number
  columnIndex: number
}

const handleSpanMethod = ({ rowIndex, columnIndex }: SpanMethodParams) => {
  if (columnIndex === 0 || columnIndex === 1) {
    if (rowIndex === 0 || rowIndex === 2) {
      return { rowspan: 2, colspan: 1 }
    } else if (rowIndex === 1 || rowIndex === 3) {
      return { rowspan: 0, colspan: 0 }
    }
  }
}

// --- 2. 汇总数据 ---
const tableSummaryData = ref([
  { id: 1, name: '张三', amount1: 1000, amount2: 500 },
  { id: 2, name: '李四', amount1: 2000, amount2: 800 }
])

const tableSummaryColumns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'amount1', label: '金额1', width: 150 },
  { prop: 'amount2', label: '金额2', width: 150 }
]

interface SummaryColumn {
  prop?: string
}

interface SummaryParams {
  columns: SummaryColumn[]
  data: Record<string, unknown>[]
}

const handleSummaryMethod = ({ columns, data }: SummaryParams) => {
  return columns.map((col, index) => {
    if (index === 0) return '合计'
    const prop = col.prop
    if (prop && prop.startsWith('amount')) {
      const sum = data.reduce((total, row) => total + (Number(row[prop]) || 0), 0)
      return `¥${sum.toFixed(2)}`
    }
    return ''
  })
}

// --- 3. 合并表头数据 ---
const mergedHeaderData = ref([
  { id: 1, name: '张三', age: 28, province: '北京', city: '朝阳区', address: '建国路88号', zip: '100020' },
  { id: 2, name: '李四', age: 32, province: '上海', city: '浦东新区', address: '陆家嘴环路', zip: '200120' },
  { id: 3, name: '王五', age: 25, province: '广东', city: '天河区', address: '珠江新城', zip: '510623' },
  { id: 4, name: '赵六', age: 30, province: '浙江', city: '西湖区', address: '文三路', zip: '310012' }
])

const mergedHeaderColumns = [
  {
    label: '基本信息',
    children: [
      { prop: 'name', label: '姓名', width: 100 },
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

// --- 4. 权限管理表格（合并行实战案例） ---
interface PermissionRow {
  id: number
  module: string
  feature: string
  type: string
  permissions: string[]
}

const permissionData = ref<PermissionRow[]>([
  { id: 1, module: '账号管理', feature: '用户管理', type: '查看', permissions: ['用户列表'] },
  { id: 2, module: '账号管理', feature: '用户管理', type: '编辑', permissions: ['用户列表', '新增用户'] },
  { id: 3, module: '账号管理', feature: '用户管理', type: '操作', permissions: ['新增', '删除', '修改'] },
  { id: 4, module: '账号管理', feature: '角色管理', type: '查看', permissions: ['角色列表'] },
  { id: 5, module: '账号管理', feature: '角色管理', type: '编辑', permissions: ['角色列表', '新增角色'] },
  { id: 6, module: '账号管理', feature: '角色管理', type: '操作', permissions: ['新增', '删除', '修改'] },
  { id: 7, module: '内容管理', feature: '文章管理', type: '查看', permissions: ['文章列表'] },
  { id: 8, module: '内容管理', feature: '文章管理', type: '编辑', permissions: ['文章列表', '新增文章'] },
  { id: 9, module: '内容管理', feature: '文章管理', type: '操作', permissions: ['新增', '删除', '修改', '发布'] },
  { id: 10, module: '内容管理', feature: '分类管理', type: '查看', permissions: ['分类列表'] },
  { id: 11, module: '内容管理', feature: '分类管理', type: '编辑', permissions: ['分类列表', '新增分类'] },
  { id: 12, module: '内容管理', feature: '分类管理', type: '操作', permissions: ['新增', '删除', '修改'] }
])

// 选中状态: key = "rowId-permission", value = boolean
const checkedMap = ref<Record<string, boolean>>({})
const checkedTypeMap = ref<Record<string, boolean>>({})

const togglePermission = (rowId: number, permission: string) => {
  const key = `${rowId}-${permission}`
  checkedMap.value[key] = !checkedMap.value[key]
}

const toggleType = (rowId: number) => {
  const key = `type-${rowId}`
  const newVal = !checkedTypeMap.value[key]
  checkedTypeMap.value[key] = newVal
  // 联动：勾选/取消权限类型时，同步该行所有权限
  const row = permissionData.value.find(r => r.id === rowId)
  if (row) {
    row.permissions.forEach(p => {
      checkedMap.value[`${rowId}-${p}`] = newVal
    })
  }
}

const toggleFeature = (feature: string) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  const allChecked = rows.every(r => checkedTypeMap.value[`type-${r.id}`])
  rows.forEach(r => {
    checkedTypeMap.value[`type-${r.id}`] = !allChecked
    r.permissions.forEach(p => {
      checkedMap.value[`${r.id}-${p}`] = !allChecked
    })
  })
}

const toggleModule = (module: string) => {
  const rows = permissionData.value.filter(r => r.module === module)
  const allChecked = rows.every(r => checkedTypeMap.value[`type-${r.id}`])
  rows.forEach(r => {
    checkedTypeMap.value[`type-${r.id}`] = !allChecked
    r.permissions.forEach(p => {
      checkedMap.value[`${r.id}-${p}`] = !allChecked
    })
  })
}

const isModuleChecked = (module: string) => {
  const rows = permissionData.value.filter(r => r.module === module)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[`type-${r.id}`])
}

const isFeatureChecked = (feature: string) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[`type-${r.id}`])
}

const permissionColumns = [
  {
    prop: 'module',
    label: '功能模块',
    width: 180,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display: flex; align-items: center; gap: 8px; cursor: pointer;' }, [
        h('input', {
          type: 'checkbox',
          checked: isModuleChecked(row.module),
          onChange: () => toggleModule(row.module)
        }),
        h('span', row.module)
      ])
    }
  },
  {
    prop: 'feature',
    label: '详细功能',
    width: 180,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display: flex; align-items: center; gap: 8px; cursor: pointer;' }, [
        h('input', {
          type: 'checkbox',
          checked: isFeatureChecked(row.feature),
          onChange: () => toggleFeature(row.feature)
        }),
        h('span', row.feature)
      ])
    }
  },
  {
    prop: 'type',
    label: '权限类型',
    width: 150,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display: flex; align-items: center; gap: 8px; cursor: pointer;' }, [
        h('input', {
          type: 'checkbox',
          checked: !!checkedTypeMap.value[`type-${row.id}`],
          onChange: () => toggleType(row.id)
        }),
        h('span', row.type)
      ])
    }
  },
  {
    prop: 'permissions',
    label: '权限列表',
    render: ({ row }: { row: PermissionRow }) => {
      return h('div', { style: 'display: flex; flex-wrap: wrap; gap: 16px;' },
        row.permissions.map(p =>
          h('label', { style: 'display: flex; align-items: center; gap: 4px; cursor: pointer;' }, [
            h('input', {
              type: 'checkbox',
              checked: !!checkedMap.value[`${row.id}-${p}`],
              onChange: () => togglePermission(row.id, p)
            }),
            h('span', p)
          ])
        )
      )
    }
  }
]

interface PermSpanParams {
  row: PermissionRow
  rowIndex: number
  columnIndex: number
}

const handlePermissionSpan = ({ row, rowIndex, columnIndex }: PermSpanParams) => {
  const data = permissionData.value
  if (columnIndex === 0) {
    // 功能模块列：相同 module 合并
    if (rowIndex === 0 || data[rowIndex - 1].module !== row.module) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].module === row.module; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    // 详细功能列：相同 feature 合并
    if (rowIndex === 0 || data[rowIndex - 1].feature !== row.feature) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].feature === row.feature; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
}

// 已勾选的权限摘要
const checkedSummary = computed(() => {
  const result: string[] = []
  permissionData.value.forEach(row => {
    row.permissions.forEach(p => {
      if (checkedMap.value[`${row.id}-${p}`]) {
        result.push(`${row.feature}-${row.type}-${p}`)
      }
    })
  })
  return result
})

// --- 示例代码 ---

const tsSpan = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :span-method="spanMethod"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', province: '北京', city: '朝阳区', address: '建国路88号' },
  { id: 2, date: '2024-01-01', name: '张三', province: '北京', city: '海淀区', address: '中关村大街' },
  { id: 3, date: '2024-01-02', name: '李四', province: '上海', city: '浦东新区', address: '陆家嘴' },
  { id: 4, date: '2024-01-02', name: '李四', province: '上海', city: '静安区', address: '南京西路' },
  { id: 5, date: '2024-01-03', name: '王五', province: '广东', city: '天河区', address: '珠江新城' }
])

const columns = [
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'province', label: '省份', width: 100 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'address', label: '地址' }
]

interface SpanMethodParams {
  rowIndex: number
  columnIndex: number
}

const spanMethod = ({ rowIndex, columnIndex }: SpanMethodParams) => {
  if (columnIndex === 0 || columnIndex === 1) {
    if (rowIndex === 0 || rowIndex === 2) {
      return { rowspan: 2, colspan: 1 }
    } else if (rowIndex === 1 || rowIndex === 3) {
      return { rowspan: 0, colspan: 0 }
    }
  }
}
</${_S}>`

const jsSpan = toJs(tsSpan)

const tsMergedHeader = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', age: 28, province: '北京', city: '朝阳区', address: '建国路88号', zip: '100020' },
  { id: 2, name: '李四', age: 32, province: '上海', city: '浦东新区', address: '陆家嘴环路', zip: '200120' },
  { id: 3, name: '王五', age: 25, province: '广东', city: '天河区', address: '珠江新城', zip: '510623' },
  { id: 4, name: '赵六', age: 30, province: '浙江', city: '西湖区', address: '文三路', zip: '310012' }
])

const columns = [
  {
    label: '基本信息',
    children: [
      { prop: 'name', label: '姓名', width: 100 },
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

const jsMergedHeader = toJs(tsMergedHeader)

const tsSummary = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns"
    :summary-config="{
      text: '合计',
      method: summaryMethod
    }"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', amount1: 1000, amount2: 500 },
  { id: 2, name: '李四', amount1: 2000, amount2: 800 }
])

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'amount1', label: '金额1', width: 150 },
  { prop: 'amount2', label: '金额2', width: 150 }
]

interface SummaryColumn {
  prop?: string
}

interface SummaryParams {
  columns: SummaryColumn[]
  data: Record<string, unknown>[]
}

const summaryMethod = ({ columns, data }: SummaryParams) => {
  return columns.map((col, index) => {
    if (index === 0) return '合计'
    const prop = col.prop
    if (prop && prop.startsWith('amount')) {
      const sum = data.reduce((total, row) => total + (Number(row[prop]) || 0), 0)
      return \`¥\${sum.toFixed(2)}\`
    }
    return ''
  })
}
</${_S}>`

const jsSummary = toJs(tsSummary)

const tsPermission = `<${_T}>
  <yh-table
    :data="permissionData"
    :columns="columns"
    :span-method="spanMethod"
    border
    row-key="id"
  />

  <div v-if="checkedSummary.length" style="margin-top: 16px; padding: 12px 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <p style="margin: 0 0 8px; font-weight: 600;">已选权限 ({{ checkedSummary.length }} 项)：</p>
    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
      <yh-tag v-for="item in checkedSummary" :key="item" size="small">{{ item }}</yh-tag>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, computed, h } from 'vue'

interface PermissionRow {
  id: number
  module: string
  feature: string
  type: string
  permissions: string[]
}

const permissionData = ref<PermissionRow[]>([
  { id: 1, module: '账号管理', feature: '用户管理', type: '查看', permissions: ['用户列表'] },
  { id: 2, module: '账号管理', feature: '用户管理', type: '编辑', permissions: ['用户列表', '新增用户'] },
  { id: 3, module: '账号管理', feature: '用户管理', type: '操作', permissions: ['新增', '删除', '修改'] },
  { id: 4, module: '账号管理', feature: '角色管理', type: '查看', permissions: ['角色列表'] },
  { id: 5, module: '账号管理', feature: '角色管理', type: '编辑', permissions: ['角色列表', '新增角色'] },
  { id: 6, module: '账号管理', feature: '角色管理', type: '操作', permissions: ['新增', '删除', '修改'] },
  { id: 7, module: '内容管理', feature: '文章管理', type: '查看', permissions: ['文章列表'] },
  { id: 8, module: '内容管理', feature: '文章管理', type: '编辑', permissions: ['文章列表', '新增文章'] },
  { id: 9, module: '内容管理', feature: '文章管理', type: '操作', permissions: ['新增', '删除', '修改', '发布'] },
  { id: 10, module: '内容管理', feature: '分类管理', type: '查看', permissions: ['分类列表'] },
  { id: 11, module: '内容管理', feature: '分类管理', type: '编辑', permissions: ['分类列表', '新增分类'] },
  { id: 12, module: '内容管理', feature: '分类管理', type: '操作', permissions: ['新增', '删除', '修改'] }
])

// 选中状态
const checkedMap = ref<Record<string, boolean>>({})
const checkedTypeMap = ref<Record<string, boolean>>({})

const togglePermission = (rowId: number, permission: string) => {
  const key = \`\${rowId}-\${permission}\`
  checkedMap.value[key] = !checkedMap.value[key]
}

const toggleType = (rowId: number) => {
  const key = \`type-\${rowId}\`
  const newVal = !checkedTypeMap.value[key]
  checkedTypeMap.value[key] = newVal
  const row = permissionData.value.find(r => r.id === rowId)
  if (row) {
    row.permissions.forEach(p => {
      checkedMap.value[\`\${rowId}-\${p}\`] = newVal
    })
  }
}

const toggleFeature = (feature: string) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  const allChecked = rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
  rows.forEach(r => {
    checkedTypeMap.value[\`type-\${r.id}\`] = !allChecked
    r.permissions.forEach(p => {
      checkedMap.value[\`\${r.id}-\${p}\`] = !allChecked
    })
  })
}

const toggleModule = (module: string) => {
  const rows = permissionData.value.filter(r => r.module === module)
  const allChecked = rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
  rows.forEach(r => {
    checkedTypeMap.value[\`type-\${r.id}\`] = !allChecked
    r.permissions.forEach(p => {
      checkedMap.value[\`\${r.id}-\${p}\`] = !allChecked
    })
  })
}

const isModuleChecked = (module: string) => {
  const rows = permissionData.value.filter(r => r.module === module)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
}

const isFeatureChecked = (feature: string) => {
  const rows = permissionData.value.filter(r => r.feature === feature)
  return rows.length > 0 && rows.every(r => checkedTypeMap.value[\`type-\${r.id}\`])
}

const columns = [
  {
    prop: 'module',
    label: '功能模块',
    width: 180,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display:flex;align-items:center;gap:8px;cursor:pointer' }, [
        h('input', {
          type: 'checkbox',
          checked: isModuleChecked(row.module),
          onChange: () => toggleModule(row.module)
        }),
        h('span', row.module)
      ])
    }
  },
  {
    prop: 'feature',
    label: '详细功能',
    width: 180,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display:flex;align-items:center;gap:8px;cursor:pointer' }, [
        h('input', {
          type: 'checkbox',
          checked: isFeatureChecked(row.feature),
          onChange: () => toggleFeature(row.feature)
        }),
        h('span', row.feature)
      ])
    }
  },
  {
    prop: 'type',
    label: '权限类型',
    width: 150,
    render: ({ row }: { row: PermissionRow }) => {
      return h('label', { style: 'display:flex;align-items:center;gap:8px;cursor:pointer' }, [
        h('input', {
          type: 'checkbox',
          checked: !!checkedTypeMap.value[\`type-\${row.id}\`],
          onChange: () => toggleType(row.id)
        }),
        h('span', row.type)
      ])
    }
  },
  {
    prop: 'permissions',
    label: '权限列表',
    render: ({ row }: { row: PermissionRow }) => {
      return h('div', { style: 'display:flex;flex-wrap:wrap;gap:16px' },
        row.permissions.map(p =>
          h('label', { style: 'display:flex;align-items:center;gap:4px;cursor:pointer' }, [
            h('input', {
              type: 'checkbox',
              checked: !!checkedMap.value[\`\${row.id}-\${p}\`],
              onChange: () => togglePermission(row.id, p)
            }),
            h('span', p)
          ])
        )
      )
    }
  }
]

interface SpanParams {
  row: PermissionRow
  rowIndex: number
  columnIndex: number
}

/** 合并行: 相同模块 / 相同功能自动合并 */
const spanMethod = ({ row, rowIndex, columnIndex }: SpanParams) => {
  const data = permissionData.value
  if (columnIndex === 0) {
    if (rowIndex === 0 || data[rowIndex - 1].module !== row.module) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].module === row.module; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
  if (columnIndex === 1) {
    if (rowIndex === 0 || data[rowIndex - 1].feature !== row.feature) {
      let span = 1
      for (let i = rowIndex + 1; i < data.length && data[i].feature === row.feature; i++) span++
      return { rowspan: span, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
}

const checkedSummary = computed(() => {
  const result: string[] = []
  permissionData.value.forEach(row => {
    row.permissions.forEach(p => {
      if (checkedMap.value[\`\${row.id}-\${p}\`]) {
        result.push(\`\${row.feature}-\${row.type}-\${p}\`)
      }
    })
  })
  return result
})
</${_S}>`

const jsPermission = toJs(tsPermission)

</script>

## 合并行或列

通过 `span-method` 属性实现合并行或列。

<DemoBlock title="合并行" :ts-code="tsSpan" :js-code="jsSpan">
  <yh-table 
    :data="tableSpanData" 
    :columns="tableSpanColumns" 
    :span-method="handleSpanMethod"
    border
  />
</DemoBlock>

## 合并表头

通过 `columns` 的 `children` 属性定义多级表头。父列设置 `label` 和 `children`，子列是实际的数据列。表格会自动计算 `colspan` 和 `rowspan`，生成分组表头。

<DemoBlock title="合并表头" :ts-code="tsMergedHeader" :js-code="jsMergedHeader">
  <yh-table
    :data="mergedHeaderData"
    :columns="mergedHeaderColumns"
    border
  />
</DemoBlock>

## 实战：权限管理表格

结合 `span-method` 行合并与列 `render` 渲染函数，实现常见的**权限配置矩阵**。功能模块和详细功能列自动合并相同值的行，权限类型和权限列表通过 `h()` 渲染勾选框，支持模块/功能/类型/权限四级联动勾选。

<DemoBlock title="权限管理表格" :ts-code="tsPermission" :js-code="jsPermission">
  <yh-table
    :data="permissionData"
    :columns="permissionColumns"
    :span-method="handlePermissionSpan"
    border
    row-key="id"
  />

  <div v-if="checkedSummary.length" style="margin-top: 16px; padding: 12px 16px; background: var(--yh-fill-color-light, #f5f7fa); border-radius: 8px;">
    <p style="margin: 0 0 8px; font-weight: 600;">已选权限 ({{ checkedSummary.length }} 项)：</p>
    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
      <yh-tag v-for="item in checkedSummary" :key="item" size="small">{{ item }}</yh-tag>
    </div>
  </div>
</DemoBlock>

## 表尾合计行

通过 `summary-config` 配置汇总行，设置 `method` 自定义汇总逻辑。

<DemoBlock title="表尾合计行" :ts-code="tsSummary" :js-code="jsSummary">
  <yh-table 
    :data="tableSummaryData" 
    :columns="tableSummaryColumns"
    :summary-config="{
      text: '合计',
      method: handleSummaryMethod
    }"
    border
  />
</DemoBlock>

## API

### 多级表头（合并表头）

通过列配置的 `children` 属性实现多级表头。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 分组表头的标题文本 | `string` | — |
| children | 子列配置（支持多层嵌套） | `TableColumn[]` | — |
| headerAlign | 表头对齐方式 | `'left' \| 'center' \| 'right'` | `'center'`（分组列默认居中） |
| headerClassName | 表头自定义类名 | `string` | — |
| headerStyle | 表头自定义样式 | `CSSProperties` | — |

> **注意**：父列（有 `children` 的列）只需要设置 `label`，不需要设置 `prop`。`colspan` 和 `rowspan` 由组件自动计算。

### span-method 合并方法

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| row | 当前行数据 | `Record<string, unknown>` |
| column | 当前列配置 | `TableColumn` |
| rowIndex | 当前行索引 | `number` |
| columnIndex | 当前列索引 | `number` |

**返回值**：`{ rowspan: number, colspan: number }` 或 `[rowspan, colspan]`

- `rowspan: 0, colspan: 0` 表示该单元格被合并（不渲染）
- `rowspan: n` 表示跨 n 行，`colspan: n` 表示跨 n 列

### SummaryConfig 汇总配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 汇总行第一列的文本 | `string` | `'合计'` |
| position | 汇总行位置 | `'top' \| 'bottom'` | `'bottom'` |
| fixed | 是否固定汇总行 | `boolean` | `false` |
| method | 汇总计算方法 | `({ columns, data }) => Array<string \| number \| VNode>` | — |
| className | 汇总行类名 | `string \| ((params) => string)` | — |
| style | 汇总行样式 | `CSSProperties \| ((params) => CSSProperties)` | — |

### Column render 渲染函数

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| row | 当前行数据 | `Record<string, unknown>` |
| column | 当前列配置 | `TableColumn` |
| rowIndex | 当前行索引 | `number` |
| cellValue | 当前单元格的值 | `unknown` |

**返回值**：`VNode`（使用 Vue `h()` 函数创建）
