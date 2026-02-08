# Table 表格

高性能企业级表格组件，融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长。支持虚拟滚动、树形数据、固定列/行、汇总行等高级功能。

<script setup lang="ts">
import { ref } from 'vue'

// --- 1. 基础表格数据 ---
const basicData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区科技园' }
])
const basicColumns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

// --- 2. 带状态表格 ---
const statusData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区', state: 'success' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区', state: 'warning' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区', state: 'danger' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区', state: 'info' }
])
const statusRowClassName = ({ row }: { row: Record<string, string> }) => {
  if (row.state === 'success') return 'success-row'
  if (row.state === 'warning') return 'warning-row'
  if (row.state === 'danger') return 'danger-row'
  return ''
}

// --- 3. 溢出提示 ---
const overflowData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号SOHO现代城A座1001室，这是一个非常长的地址用于测试文本溢出效果' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心国际金融大厦28层，这里也是一个很长的地址' }
])
const overflowColumns = [
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'address', label: '地址', showOverflowTooltip: true }
]

// --- 4. 固定表头 ---
const heightData = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    name: ['张三', '李四', '王五'][i % 3],
    address: '办公地址路' + (i + 1) + '号'
  }))
)

// --- 5. 固定列 ---
const fixedColumns = [
  { prop: 'date', label: '日期', width: 150, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'province', label: '省份', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'address', label: '地址', width: 300 },
  { prop: 'zip', label: '邮编', width: 120, fixed: 'right' }
]
const fixedData = ref([
  { id: 1, date: '2024-01-01', name: '张三', province: '北京', city: '朝阳区', address: '北京市朝阳区建国路88号', zip: '100000' },
  { id: 2, date: '2024-01-02', name: '李四', province: '上海', city: '浦东新区', address: '上海市浦东新区陆家嘴金融中心', zip: '200000' },
  { id: 3, date: '2024-01-03', name: '王五', province: '广东', city: '天河区', address: '广州市天河区珠江新城', zip: '510000' },
  { id: 4, date: '2024-01-04', name: '赵六', province: '广东', city: '南山区', address: '深圳市南山区科技园', zip: '518000' }
])

// --- 6. 其他状态 ---
const tableSize = ref('default')
const highlightCurrentRowKey = ref<number>()
const handleCurrentChange = (val: Record<string, unknown>) => console.log(val)
const customIndexMethod = (index: number) => (index + 1) * 10

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
const _ST = 'style'

// --- 代码示例 ---
const tsBasic = `<${_T}>
  <yh-table :data="tableData" :columns="columns" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区科技园' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsBasic = toJs(tsBasic);

const tsStripe = `<${_T}>
  <yh-table :data="tableData" :columns="columns" stripe />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区科技园' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsStripe = toJs(tsStripe);

const tsBorder = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区科技园' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsBorder = toJs(tsBorder);

const tsStatus = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    :row-class-name="rowClassName" 
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区', state: 'success' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区', state: 'warning' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区', state: 'danger' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区', state: 'info' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]

const rowClassName = ({ row }: { row: Record<string, unknown> }) => {
  if (row.state === 'success') return 'success-row'
  if (row.state === 'warning') return 'warning-row'
  if (row.state === 'danger') return 'danger-row'
  return ''
}
</${_S}>

<${_ST}>
.success-row td { background-color: #f0f9eb !important; }
.warning-row td { background-color: #fdf6ec !important; }
.danger-row td { background-color: #fef0f0 !important; }
</${_ST}>`

const jsStatus = toJs(tsStatus);

const tsOverflow = `<${_T}>
  <yh-table :data="tableData" :columns="columns" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号SOHO现代城A座1001室，这是一个非常长的地址用于测试文本溢出效果' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心国际金融大厦28层，这里也是一个很长的地址' }
])

const columns = [
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'address', label: '地址', showOverflowTooltip: true }
]
</${_S}>`

const jsOverflow = toJs(tsOverflow);

const tsHeight = `<${_T}>
  <yh-table :data="tableData" :columns="columns" height="300" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    date: \`2024-01-\${String(i + 1).padStart(2, '0')}\`,
    name: ['张三', '李四', '王五'][i % 3],
    address: '办公地址路' + (i + 1) + '号'
  }))
)

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsHeight = toJs(tsHeight);

const tsFixed = `<${_T}>
  <yh-table :data="tableData" :columns="columns" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', province: '北京', city: '朝阳区', address: '建国路88号', zip: '100000' },
  { id: 2, date: '2024-01-02', name: '李四', province: '上海', city: '浦东新区', address: '陆家嘴金融中心', zip: '200000' },
  { id: 3, date: '2024-01-03', name: '王五', province: '广东', city: '天河区', address: '珠江新城', zip: '510000' },
  { id: 4, date: '2024-01-04', name: '赵六', province: '广东', city: '南山区', address: '科技园', zip: '518000' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'province', label: '省份', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'address', label: '地址', width: 300 },
  { prop: 'zip', label: '邮编', width: 120, fixed: 'right' }
]
</${_S}>`

const jsFixed = toJs(tsFixed);

const tsSize = `<${_T}>
  <yh-radio-group v-model="tableSize" style="margin-bottom: 16px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>
  <yh-table :data="tableData" :columns="columns" :size="tableSize" border />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableSize = ref('default')

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区科技园' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsSize = toJs(tsSize);

const tsHighlight = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    highlight-current-row
    v-model:current-row-key="currentRowKey"
    @current-change="handleCurrentChange"
  />
  <div style="margin-top: 12px">当前选中行 ID: {{ currentRowKey || '未选择' }}</div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const currentRowKey = ref<number>()

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区科技园' }
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

const handleCurrentChange = (row: RowItem) => {
  console.log('当前行:', row)
}
</${_S}>`

const jsHighlight = toJs(tsHighlight);

const tsIndex = `<${_T}>
  <yh-table 
    :data="tableData" 
    :columns="columns" 
    show-index 
    :index-config="{ method: indexMethod }" 
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const indexMethod = (index: number) => (index + 1) * 10

const tableData = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { id: 2, date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区珠江新城' },
  { id: 4, date: '2024-01-04', name: '赵六', address: '深圳市南山区科技园' }
])

const columns = [
  { prop: 'date', label: '日期', width: 150 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsIndex = toJs(tsIndex);

</script>

## 基础表格

最基础的表格展示用法。

<DemoBlock title="基础表格" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-table :data="basicData" :columns="basicColumns" />
</DemoBlock>

## 带斑马纹表格

使用 `stripe` 属性。

<DemoBlock title="带斑马纹表格" :ts-code="tsStripe" :js-code="jsStripe">
  <yh-table :data="basicData" :columns="basicColumns" stripe />
</DemoBlock>

## 带边框表格

使用 `border` 属性。

<DemoBlock title="带边框表格" :ts-code="tsBorder" :js-code="jsBorder">
  <yh-table :data="basicData" :columns="basicColumns" border />
</DemoBlock>

## 带状态表格

通过 `row-class-name` 添加自定义类名。

<DemoBlock title="带状态表格" :ts-code="tsStatus" :js-code="jsStatus">
  <yh-table 
    :data="statusData" 
    :columns="basicColumns" 
    :row-class-name="statusRowClassName" 
  />
</DemoBlock>

<style>
.success-row td { background-color: #f0f9eb !important; }
.warning-row td { background-color: #fdf6ec !important; }
.danger-row td { background-color: #fef0f0 !important; }
</style>

## 显示溢出工具提示

设置列的 `showOverflowTooltip` 属性。

<DemoBlock title="显示溢出工具提示" :ts-code="tsOverflow" :js-code="jsOverflow">
  <yh-table :data="overflowData" :columns="overflowColumns" />
</DemoBlock>

## 固定表头

设置 `height` 属性。

<DemoBlock title="固定表头" :ts-code="tsHeight" :js-code="jsHeight">
  <yh-table :data="heightData" :columns="basicColumns" height="300" border />
</DemoBlock>

## 固定列

设置列的 `fixed` 属性。

<DemoBlock title="固定列" :ts-code="tsFixed" :js-code="jsFixed">
  <yh-table :data="fixedData" :columns="fixedColumns" border />
</DemoBlock>

## 不同尺寸

提供 `large`、`default`、`small`。

<DemoBlock title="不同尺寸" :ts-code="tsSize" :js-code="jsSize">
  <yh-radio-group v-model="tableSize" style="margin-bottom: 16px">
    <yh-radio value="large">Large</yh-radio>
    <yh-radio value="default">Default</yh-radio>
    <yh-radio value="small">Small</yh-radio>
  </yh-radio-group>
  <yh-table :data="basicData" :columns="basicColumns" :size="tableSize" border />
</DemoBlock>

## 高亮当前行

使用 `highlight-current-row` 属性。

<DemoBlock title="高亮当前行" :ts-code="tsHighlight" :js-code="jsHighlight">
  <yh-table 
    :data="basicData" 
    :columns="basicColumns" 
    highlight-current-row
    v-model:current-row-key="highlightCurrentRowKey"
    @current-change="handleCurrentChange"
  />
  <div style="margin-top: 12px">当前选中行 ID: {{ highlightCurrentRowKey || '未选择' }}</div>
</DemoBlock>

## 自定义索引

使用 `show-index` 显示序号列。

<DemoBlock title="自定义索引" :ts-code="tsIndex" :js-code="jsIndex">
  <yh-table 
    :data="basicData" 
    :columns="basicColumns" 
    show-index 
    :index-config="{ method: customIndexMethod }" 
    border
  />
</DemoBlock>
