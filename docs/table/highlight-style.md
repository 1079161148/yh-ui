# Table 表格 - 高亮与样式

通过表格属性和列配置，实现行高亮、列高亮、表头图标、内容换行与溢出等样式控制。

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 公共数据 ====================

const baseData = [
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, address: '北京市朝阳区建国路88号SOHO现代城A座1205室' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, address: '上海市浦东新区世纪大道100号上海环球金融中心' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, address: '广州市天河区天河路385号太古汇一座' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, address: '深圳市南山区深南大道9966号威盛科技大厦' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, address: '杭州市西湖区文三路398号东信大厦B座' }
]

// ==================== 1. 高亮行 ====================

const highlightRowData = ref([...baseData])

const highlightRowColumns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'address', label: '地址' }
]

// ==================== 2. 高亮列 ====================

const highlightColData = ref([...baseData])
const hoveredColumnProp = ref('')

const highlightColColumns = computed(() => [
  { prop: 'name', label: '姓名', width: 100, className: hoveredColumnProp.value === 'name' ? 'is-column-highlight' : '' },
  { prop: 'age', label: '年龄', width: 80, className: hoveredColumnProp.value === 'age' ? 'is-column-highlight' : '' },
  { prop: 'dept', label: '部门', width: 120, className: hoveredColumnProp.value === 'dept' ? 'is-column-highlight' : '' },
  { prop: 'salary', label: '薪资', width: 120, className: hoveredColumnProp.value === 'salary' ? 'is-column-highlight' : '' },
  { prop: 'address', label: '地址', className: hoveredColumnProp.value === 'address' ? 'is-column-highlight' : '' }
])

const handleColCellClick = (row: Record<string, unknown>, column: Record<string, unknown>) => {
  hoveredColumnProp.value = (column as any).prop || ''
}

// ==================== 3. 标题前缀图标 ====================

const UserIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14' }, [
  h('path', { fill: 'currentColor', d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' })
])

const CalendarIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14' }, [
  h('path', { fill: 'currentColor', d: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z' })
])

const LocationIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14' }, [
  h('path', { fill: 'currentColor', d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' })
])

const prefixIconColumns = [
  { prop: 'name', label: '姓名', width: 120, headerPrefixIcon: UserIcon },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120, headerPrefixIcon: CalendarIcon },
  { prop: 'address', label: '地址', headerPrefixIcon: LocationIcon }
]

// ==================== 4. 标题后缀图标 ====================

const InfoIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14', style: 'color: #909399' }, [
  h('path', { fill: 'currentColor', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' })
])

const RequiredIcon = () => h('span', { style: 'color: #f56c6c; font-weight: bold; margin-left: 2px;' }, '*')

const suffixIconColumns = [
  { prop: 'name', label: '姓名', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'age', label: '年龄', width: 100, headerSuffixIcon: InfoIcon },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'salary', label: '薪资', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'address', label: '地址' }
]

// ==================== 5. 自动换行 ====================

const wrapData = [
  { id: 1, name: '张三', content: '这是一段非常长的文本内容，用来测试单元格自动换行的效果，可以看到文字会自动换行而不是被截断。实际项目中经常需要展示较长的描述信息。', status: '进行中' },
  { id: 2, name: '李四', content: '短文本', status: '已完成' },
  { id: 3, name: '王五', content: '这也是一段较长的内容，包含了各种细节描述，例如项目的需求分析文档、功能设计说明以及测试验收标准等信息。', status: '待审核' }
]

const wrapColumns = [
  { prop: 'name', label: '姓名', width: 80 },
  { prop: 'content', label: '内容描述' },
  { prop: 'status', label: '状态', width: 80 }
]

// ==================== 6. 溢出隐藏 ====================

const overflowColumns = [
  { prop: 'name', label: '姓名', width: 80 },
  { prop: 'address', label: '地址（溢出隐藏 + Tooltip）', showOverflowTooltip: true },
  { prop: 'dept', label: '部门', width: 100 }
]

// ==================== 示例代码 ====================

const tsHighlightRow = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">点击行可高亮选中，再次点击其他行会切换高亮。</p>
  <yh-table
    :data="data"
    :columns="columns"
    highlight-current-row
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, address: '北京市朝阳区建国路88号' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, address: '上海市浦东新区世纪大道100号' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, address: '广州市天河区天河路385号' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, address: '深圳市南山区深南大道9966号' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, address: '杭州市西湖区文三路398号' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsHighlightRow = toJs(tsHighlightRow)

const tsHighlightCol = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">点击单元格可高亮整列。</p>
  <yh-table
    :data="data"
    :columns="columns"
    border
    row-key="id"
    @cell-click="handleCellClick"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, address: '北京市朝阳区建国路88号' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, address: '上海市浦东新区世纪大道100号' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, address: '广州市天河区天河路385号' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, address: '深圳市南山区深南大道9966号' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, address: '杭州市西湖区文三路398号' }
])

const hoveredProp = ref('')

const columns = computed(() => [
  { prop: 'name', label: '姓名', width: 100, className: hoveredProp.value === 'name' ? 'is-column-highlight' : '' },
  { prop: 'age', label: '年龄', width: 80, className: hoveredProp.value === 'age' ? 'is-column-highlight' : '' },
  { prop: 'dept', label: '部门', width: 120, className: hoveredProp.value === 'dept' ? 'is-column-highlight' : '' },
  { prop: 'salary', label: '薪资', width: 120, className: hoveredProp.value === 'salary' ? 'is-column-highlight' : '' },
  { prop: 'address', label: '地址', className: hoveredProp.value === 'address' ? 'is-column-highlight' : '' }
])

const handleCellClick = (row: Record<string, unknown>, column: Record<string, unknown>) => {
  hoveredProp.value = (column as any).prop || ''
}
</${_S}>`

const jsHighlightCol = toJs(tsHighlightCol)

const tsPrefixIcon = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const UserIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14' }, [
  h('path', { fill: 'currentColor', d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' })
])

const CalendarIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14' }, [
  h('path', { fill: 'currentColor', d: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z' })
])

const LocationIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14' }, [
  h('path', { fill: 'currentColor', d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' })
])

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', address: '北京市朝阳区建国路88号' },
  { id: 2, name: '李四', age: 32, dept: '产品部', address: '上海市浦东新区世纪大道100号' },
  { id: 3, name: '王五', age: 25, dept: '设计部', address: '广州市天河区天河路385号' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 120, headerPrefixIcon: UserIcon },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120, headerPrefixIcon: CalendarIcon },
  { prop: 'address', label: '地址', headerPrefixIcon: LocationIcon }
]
</${_S}>`

const jsPrefixIcon = toJs(tsPrefixIcon)

const tsSuffixIcon = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const InfoIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14', style: 'color: #909399' }, [
  h('path', { fill: 'currentColor', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' })
])

const RequiredIcon = () => h('span', { style: 'color: #f56c6c; font-weight: bold; margin-left: 2px;' }, '*')

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, address: '北京市朝阳区建国路88号' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, address: '上海市浦东新区世纪大道100号' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, address: '广州市天河区天河路385号' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'age', label: '年龄', width: 100, headerSuffixIcon: InfoIcon },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'salary', label: '薪资', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsSuffixIcon = toJs(tsSuffixIcon)

const tsAutoWrap = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    border
    row-key="id"
    class="is-auto-wrap"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', content: '这是一段非常长的文本内容，用来测试单元格自动换行的效果，可以看到文字会自动换行而不是被截断。实际项目中经常需要展示较长的描述信息。', status: '进行中' },
  { id: 2, name: '李四', content: '短文本', status: '已完成' },
  { id: 3, name: '王五', content: '这也是一段较长的内容，包含了各种细节描述，例如项目的需求分析文档、功能设计说明以及测试验收标准等信息。', status: '待审核' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 80 },
  { prop: 'content', label: '内容描述' },
  { prop: 'status', label: '状态', width: 80 }
]
</${_S}>`

const jsAutoWrap = toJs(tsAutoWrap)

const tsOverflow = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', address: '北京市朝阳区建国路88号SOHO现代城A座1205室', dept: '技术部' },
  { id: 2, name: '李四', address: '上海市浦东新区世纪大道100号上海环球金融中心', dept: '产品部' },
  { id: 3, name: '王五', address: '广州市天河区天河路385号太古汇一座', dept: '设计部' },
  { id: 4, name: '赵六', address: '深圳市南山区深南大道9966号威盛科技大厦', dept: '运营部' },
  { id: 5, name: '钱七', address: '杭州市西湖区文三路398号东信大厦B座', dept: '市场部' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 80 },
  { prop: 'address', label: '地址（溢出隐藏 + Tooltip）', showOverflowTooltip: true },
  { prop: 'dept', label: '部门', width: 100 }
]
</${_S}>`

const jsOverflow = toJs(tsOverflow)
</script>

## 高亮行

设置 `highlight-current-row` 后，点击表格某行会高亮该行。

<DemoBlock title="高亮当前行" :ts-code="tsHighlightRow" :js-code="jsHighlightRow">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">点击行可高亮选中，再次点击其他行会切换高亮。</p>
  <yh-table
    :data="highlightRowData"
    :columns="highlightRowColumns"
    highlight-current-row
    border
    row-key="id"
  />
</DemoBlock>

## 高亮列

通过 `cell-click` 事件动态设置列的 `className` 属性为 `is-column-highlight`，实现点击单元格高亮整列。

<DemoBlock title="高亮列" :ts-code="tsHighlightCol" :js-code="jsHighlightCol">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">点击单元格可高亮整列。</p>
  <yh-table
    :data="highlightColData"
    :columns="highlightColColumns"
    border
    row-key="id"
    @cell-click="handleColCellClick"
  />
</DemoBlock>

## 标题前缀图标

通过列配置 `headerPrefixIcon` 属性可在表头文字前添加图标。支持传入 Vue 组件（如 SVG 图标组件）。

<DemoBlock title="表头前缀图标" :ts-code="tsPrefixIcon" :js-code="jsPrefixIcon">
  <yh-table
    :data="baseData.slice(0, 3)"
    :columns="prefixIconColumns"
    border
    row-key="id"
  />
</DemoBlock>

## 标题后缀图标

通过列配置 `headerSuffixIcon` 属性可在表头文字后添加图标，常用于标记必填字段或提示信息。

<DemoBlock title="表头后缀图标" :ts-code="tsSuffixIcon" :js-code="jsSuffixIcon">
  <yh-table
    :data="baseData.slice(0, 3)"
    :columns="suffixIconColumns"
    border
    row-key="id"
  />
</DemoBlock>

## 自动换行

在 `yh-table` 上添加 `class="is-auto-wrap"` 可以让单元格内容自动换行，适用于需要展示长文本的场景。

<DemoBlock title="自动换行" :ts-code="tsAutoWrap" :js-code="jsAutoWrap">
  <yh-table
    :data="wrapData"
    :columns="wrapColumns"
    border
    row-key="id"
    class="is-auto-wrap"
  />
</DemoBlock>

## 溢出隐藏

通过列配置 `showOverflowTooltip: true` 使超出列宽的内容自动省略，鼠标悬浮时显示完整内容的 Tooltip。

<DemoBlock title="溢出隐藏 + Tooltip" :ts-code="tsOverflow" :js-code="jsOverflow">
  <yh-table
    :data="baseData"
    :columns="overflowColumns"
    border
    row-key="id"
  />
</DemoBlock>

## API

### 高亮属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| highlight-current-row | 是否高亮当前点击行 | `boolean` | `false` |
| current-row-key / v-model:current-row-key | 当前高亮行的 key 值 | `string \| number` | — |

### 高亮事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| current-change | 当前行变化时触发 | `(currentRow, oldRow)` |

### 列高亮

通过列的 `className` 属性动态设置 `is-column-highlight` 类名实现列高亮。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 列的自定义类名 | `string` | — |

### 表头图标属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| headerPrefixIcon | 表头前缀图标（Vue 组件或字符串） | `string \| Component` | — |
| headerSuffixIcon | 表头后缀图标（Vue 组件或字符串） | `string \| Component` | — |

### 换行与溢出

| 用法 | 说明 | 类型 |
| --- | --- | --- |
| `class="is-auto-wrap"` | 表格级别的自动换行（添加到 `yh-table`） | `string` |
| `showOverflowTooltip` | 列级别的溢出隐藏，悬浮显示 Tooltip | `boolean \| TooltipConfig` |
| `ellipsis` | 列级别的省略号 | `boolean \| EllipsisConfig` |

### showOverflowTooltip 配置 (TooltipConfig)

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| effect | Tooltip 主题 | `'dark' \| 'light'` | `'dark'` |
| placement | Tooltip 位置 | `string` | `'top'` |
| offset | Tooltip 偏移 | `number` | — |

### ellipsis 配置 (EllipsisConfig)

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tooltip | 是否在省略时显示 Tooltip | `boolean` | `false` |
| lineClamp | 限制显示的行数 | `number` | — |
