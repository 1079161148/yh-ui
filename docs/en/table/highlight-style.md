# Table - Highlight & Style

Through table properties and column configuration, implement row highlight, column highlight, header icons, content wrapping and overflow style control.

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== Common Data ====================

const baseData = [
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, address: '88 Jianguo Rd, SOHO Modern City, Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, address: '100 Century Ave, Shanghai World Financial Center, Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, address: '385 Tianhe Rd, Taikoo Hui Tower 1, Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, address: '9966 Shennan Blvd, VIA Technologies Building, Nanshan, Shenzhen' },
  { id: 5, name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, address: '398 Wensan Rd, Dongxin Building B, Xihu, Hangzhou' }
]

// ==================== 1. Highlight Row ====================

const highlightRowData = ref([...baseData])

const highlightRowColumns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'address', label: 'Address' }
]

// ==================== 2. Highlight Column ====================

const highlightColData = ref([...baseData])
const hoveredColumnProp = ref('')

const highlightColColumns = computed(() => [
  { prop: 'name', label: 'Name', width: 100, className: hoveredColumnProp.value === 'name' ? 'is-column-highlight' : '' },
  { prop: 'age', label: 'Age', width: 80, className: hoveredColumnProp.value === 'age' ? 'is-column-highlight' : '' },
  { prop: 'dept', label: 'Department', width: 120, className: hoveredColumnProp.value === 'dept' ? 'is-column-highlight' : '' },
  { prop: 'salary', label: 'Salary', width: 120, className: hoveredColumnProp.value === 'salary' ? 'is-column-highlight' : '' },
  { prop: 'address', label: 'Address', className: hoveredColumnProp.value === 'address' ? 'is-column-highlight' : '' }
])

const handleColCellClick = (row: Record<string, unknown>, column: Record<string, unknown>) => {
  hoveredColumnProp.value = (column as any).prop || ''
}

// ==================== 3. Header Prefix Icon ====================

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
  { prop: 'name', label: 'Name', width: 120, headerPrefixIcon: UserIcon },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120, headerPrefixIcon: CalendarIcon },
  { prop: 'address', label: 'Address', headerPrefixIcon: LocationIcon }
]

// ==================== 4. Header Suffix Icon ====================

const InfoIcon = () => h('svg', { viewBox: '0 0 24 24', width: '14', height: '14', style: 'color: #909399' }, [
  h('path', { fill: 'currentColor', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' })
])

const RequiredIcon = () => h('span', { style: 'color: #f56c6c; font-weight: bold; margin-left: 2px;' }, '*')

const suffixIconColumns = [
  { prop: 'name', label: 'Name', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'age', label: 'Age', width: 100, headerSuffixIcon: InfoIcon },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'address', label: 'Address' }
]

// ==================== 5. Auto Wrap ====================

const wrapData = [
  { id: 1, name: 'John', content: 'This is a very long text content used to test the auto-wrap effect of cells. You can see that the text wraps automatically instead of being truncated. Long descriptions are often needed in real projects.', status: 'In Progress' },
  { id: 2, name: 'Jane', content: 'Short text', status: 'Completed' },
  { id: 3, name: 'Mike', content: 'This is also a longer content with various detail descriptions, such as project requirements analysis, feature design specs, and testing acceptance criteria.', status: 'Pending Review' }
]

const wrapColumns = [
  { prop: 'name', label: 'Name', width: 80 },
  { prop: 'content', label: 'Content Description' },
  { prop: 'status', label: 'Status', width: 80 }
]

// ==================== 6. Overflow Hidden ====================

const overflowColumns = [
  { prop: 'name', label: 'Name', width: 80 },
  { prop: 'address', label: 'Address (Overflow Hidden + Tooltip)', showOverflowTooltip: true },
  { prop: 'dept', label: 'Department', width: 100 }
]

// ==================== Code Examples ====================

const tsHighlightRow = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Click a row to highlight it. Clicking another row switches the highlight.</p>
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
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, address: '100 Century Ave, Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, address: '385 Tianhe Rd, Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, address: '9966 Shennan Ave, Nanshan, Shenzhen' },
  { id: 5, name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, address: '398 Wensan Rd, Xihu, Hangzhou' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsHighlightRow = toJs(tsHighlightRow)

const tsHighlightCol = `<${_T}>
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Click a cell to highlight the entire column.</p>
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
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, address: '100 Century Ave, Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, address: '385 Tianhe Rd, Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, address: '9966 Shennan Ave, Nanshan, Shenzhen' },
  { id: 5, name: 'Tom W.', age: 29, dept: 'Marketing', salary: 16000, address: '398 Wensan Rd, Xihu, Hangzhou' }
])

const hoveredProp = ref('')

const columns = computed(() => [
  { prop: 'name', label: 'Name', width: 100, className: hoveredProp.value === 'name' ? 'is-column-highlight' : '' },
  { prop: 'age', label: 'Age', width: 80, className: hoveredProp.value === 'age' ? 'is-column-highlight' : '' },
  { prop: 'dept', label: 'Department', width: 120, className: hoveredProp.value === 'dept' ? 'is-column-highlight' : '' },
  { prop: 'salary', label: 'Salary', width: 120, className: hoveredProp.value === 'salary' ? 'is-column-highlight' : '' },
  { prop: 'address', label: 'Address', className: hoveredProp.value === 'address' ? 'is-column-highlight' : '' }
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
  { id: 1, name: 'John', age: 28, dept: 'Engineering', address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', address: '100 Century Ave, Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', address: '385 Tianhe Rd, Tianhe, Guangzhou' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 120, headerPrefixIcon: UserIcon },
  { prop: 'age', label: 'Age', width: 100 },
  { prop: 'dept', label: 'Department', width: 120, headerPrefixIcon: CalendarIcon },
  { prop: 'address', label: 'Address', headerPrefixIcon: LocationIcon }
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
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, address: '88 Jianguo Rd, Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, address: '100 Century Ave, Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, address: '385 Tianhe Rd, Tianhe, Guangzhou' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'age', label: 'Age', width: 100, headerSuffixIcon: InfoIcon },
  { prop: 'dept', label: 'Department', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120, headerSuffixIcon: RequiredIcon },
  { prop: 'address', label: 'Address' }
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
  { id: 1, name: 'John', content: 'This is a very long text content used to test the auto-wrap effect of cells. You can see that the text wraps automatically instead of being truncated. Long descriptions are often needed in real projects.', status: 'In Progress' },
  { id: 2, name: 'Jane', content: 'Short text', status: 'Completed' },
  { id: 3, name: 'Mike', content: 'This is also a longer content with various detail descriptions, such as project requirements analysis, feature design specs, and testing acceptance criteria.', status: 'Pending Review' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 80 },
  { prop: 'content', label: 'Content Description' },
  { prop: 'status', label: 'Status', width: 80 }
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
  { id: 1, name: 'John', address: '88 Jianguo Rd, SOHO Modern City, Chaoyang, Beijing', dept: 'Engineering' },
  { id: 2, name: 'Jane', address: '100 Century Ave, Shanghai World Financial Center, Pudong, Shanghai', dept: 'Product' },
  { id: 3, name: 'Mike', address: '385 Tianhe Rd, Taikoo Hui Tower 1, Tianhe, Guangzhou', dept: 'Design' },
  { id: 4, name: 'Sarah', address: '9966 Shennan Blvd, VIA Technologies Building, Nanshan, Shenzhen', dept: 'Operations' },
  { id: 5, name: 'Tom W.', address: '398 Wensan Rd, Dongxin Building B, Xihu, Hangzhou', dept: 'Marketing' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 80 },
  { prop: 'address', label: 'Address (Overflow Hidden + Tooltip)', showOverflowTooltip: true },
  { prop: 'dept', label: 'Department', width: 100 }
]
</${_S}>`

const jsOverflow = toJs(tsOverflow)
</script>

## Highlight Row

After setting `highlight-current-row`, clicking a table row will highlight it.

<DemoBlock title="Highlight Current Row" :ts-code="tsHighlightRow" :js-code="jsHighlightRow">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Click a row to highlight it. Clicking another row switches the highlight.</p>
  <yh-table
    :data="highlightRowData"
    :columns="highlightRowColumns"
    highlight-current-row
    border
    row-key="id"
  />
</DemoBlock>

## Highlight Column

Dynamically set column `className` to `is-column-highlight` through the `cell-click` event to highlight the entire column when clicking a cell.

<DemoBlock title="Highlight Column" :ts-code="tsHighlightCol" :js-code="jsHighlightCol">
  <p style="margin-bottom: 8px; color: #909399; font-size: 13px;">Click a cell to highlight the entire column.</p>
  <yh-table
    :data="highlightColData"
    :columns="highlightColColumns"
    border
    row-key="id"
    @cell-click="handleColCellClick"
  />
</DemoBlock>

## Header Prefix Icon

Add icons before header text through column config `headerPrefixIcon` property. Supports passing Vue components (such as SVG icon components).

<DemoBlock title="Header Prefix Icon" :ts-code="tsPrefixIcon" :js-code="jsPrefixIcon">
  <yh-table
    :data="baseData.slice(0, 3)"
    :columns="prefixIconColumns"
    border
    row-key="id"
  />
</DemoBlock>

## Header Suffix Icon

Add icons after header text through column config `headerSuffixIcon` property, commonly used to mark required fields or hint information.

<DemoBlock title="Header Suffix Icon" :ts-code="tsSuffixIcon" :js-code="jsSuffixIcon">
  <yh-table
    :data="baseData.slice(0, 3)"
    :columns="suffixIconColumns"
    border
    row-key="id"
  />
</DemoBlock>

## Auto Wrap

Add `class="is-auto-wrap"` to `yh-table` to enable automatic cell content wrapping, suitable for scenarios displaying long text.

<DemoBlock title="Auto Wrap" :ts-code="tsAutoWrap" :js-code="jsAutoWrap">
  <yh-table
    :data="wrapData"
    :columns="wrapColumns"
    border
    row-key="id"
    class="is-auto-wrap"
  />
</DemoBlock>

## Overflow Hidden

Configure column with `showOverflowTooltip: true` to automatically ellipsis content that exceeds column width, showing a full content Tooltip on hover.

<DemoBlock title="Overflow Hidden + Tooltip" :ts-code="tsOverflow" :js-code="jsOverflow">
  <yh-table
    :data="baseData"
    :columns="overflowColumns"
    border
    row-key="id"
  />
</DemoBlock>

## API

### Highlight Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| highlight-current-row | Whether to highlight the currently clicked row | `boolean` | `false` |
| current-row-key / v-model:current-row-key | Key value of the currently highlighted row | `string \| number` | — |

### Highlight Events

| Event | Description | Parameters |
| --- | --- | --- |
| current-change | Triggered when the current row changes | `(currentRow, oldRow)` |

### Column Highlight

Implement column highlight by dynamically setting the `is-column-highlight` class name through the column `className` property.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | Custom class name for the column | `string` | — |

### Header Icon Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| headerPrefixIcon | Header prefix icon (Vue component or string) | `string \| Component` | — |
| headerSuffixIcon | Header suffix icon (Vue component or string) | `string \| Component` | — |

### Wrapping & Overflow

| Usage | Description | Type |
| --- | --- | --- |
| `class="is-auto-wrap"` | Table-level auto wrap (add to `yh-table`) | `string` |
| `showOverflowTooltip` | Column-level overflow hidden, show tooltip on hover | `boolean \| TooltipConfig` |
| `ellipsis` | Column-level ellipsis | `boolean \| EllipsisConfig` |

### showOverflowTooltip Config (TooltipConfig)

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| effect | Tooltip theme | `'dark' \| 'light'` | `'dark'` |
| placement | Tooltip placement | `string` | `'top'` |
| offset | Tooltip offset | `number` | — |

### ellipsis Config (EllipsisConfig)

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| tooltip | Whether to show tooltip when truncated | `boolean` | `false` |
| lineClamp | Limit the number of displayed rows | `number` | — |
