# Table - Custom Slot Templates

Insert custom content at different positions of the table through slots, such as toolbar above the table, left/right action areas, etc.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// ==================== Common Data ====================
const tableData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]

// ==================== 1. Left Template ====================
const searchText1 = ref('')

// ==================== 2. Left Prefix Template ====================

// ==================== 3. Left Suffix Template ====================

// ==================== 4. Right Template ====================
const tableRef4 = ref()

// ==================== 5. Right Prefix Template ====================

// ==================== 6. Right Suffix Template ====================

// ==================== Code Examples ====================

const tsToolbarLeft = `<${_T}>
  <yh-table :data="data" :columns="columns" border show-index>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; align-items: center;">
        <input v-model="searchText" placeholder="Search name..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 160px;" />
        <yh-button type="primary" size="small">Search</yh-button>
        <yh-button type="success" size="small">Add</yh-button>
        <yh-button type="danger" size="small">Batch Delete</yh-button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const searchText = ref('')

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsToolbarLeft = toJs(tsToolbarLeft)

const tsToolbarLeftPrefix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133; margin-right: 12px;">📋 Employee List</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px;">
        <yh-button type="primary" size="small">Add</yh-button>
        <yh-button size="small">Refresh</yh-button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsToolbarLeftPrefix = toJs(tsToolbarLeftPrefix)

const tsToolbarLeftSuffix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">Add</yh-button>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">Total {{ data.length }} records</span>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsToolbarLeftSuffix = toJs(tsToolbarLeftSuffix)

const tsToolbarRight = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px;">
        <yh-button size="small" title="Refresh">🔄 Refresh</yh-button>
        <yh-button size="small" title="Export">📥 Export</yh-button>
        <yh-button size="small" title="Print">🖨️ Print</yh-button>
        <yh-button size="small" title="Settings">⚙️ Settings</yh-button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsToolbarRight = toJs(tsToolbarRight)

const tsToolbarRightPrefix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">Add</yh-button>
    </template>
    <template #toolbar-right-prefix>
      <span style="color: #e6a23c; font-size: 12px; margin-right: 8px;">⚠️ 1 pending review</span>
    </template>
    <template #toolbar-right>
      <yh-button size="small">Export</yh-button>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsToolbarRightPrefix = toJs(tsToolbarRightPrefix)

const tsToolbarRightSuffix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-right>
      <yh-button size="small">Export</yh-button>
    </template>
    <template #toolbar-right-suffix>
      <span style="color: #67c23a; font-size: 12px; margin-left: 8px;">✅ Synced</span>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsToolbarRightSuffix = toJs(tsToolbarRightSuffix)

const tsFullToolbar = `<${_T}>
  <yh-table :data="data" :columns="columns" border show-index>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133;">📋 Employee Management</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; margin-left: 16px;">
        <yh-button type="primary" size="small">Add Employee</yh-button>
        <yh-button type="danger" size="small">Batch Delete</yh-button>
      </div>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">Total {{ data.length }} people</span>
    </template>
    <template #toolbar-right-prefix>
      <input placeholder="Search..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 140px; font-size: 12px;" />
    </template>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px; margin-left: 8px;">
        <yh-button size="small">🔄</yh-button>
        <yh-button size="small">📥</yh-button>
        <yh-button size="small">🖨️</yh-button>
      </div>
    </template>
    <template #toolbar-right-suffix>
      <yh-button size="small" style="margin-left: 8px;">⚙️</yh-button>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', status: 'Active', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', status: 'Active', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', status: 'Inactive', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', status: 'Active', address: 'Nanshan, Shenzhen' }
])

const columns = [
  { prop: 'name', label: 'Name', width: 100 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Department', width: 100 },
  { prop: 'status', label: 'Status', width: 80 },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsFullToolbar = toJs(tsFullToolbar)
</script>

## Custom Left Template

Place action buttons and search boxes in the left area above the table through the `#toolbar-left` slot. This is the most commonly used toolbar slot.

<DemoBlock title="Custom Left Template" :ts-code="tsToolbarLeft" :js-code="jsToolbarLeft">
  <yh-table :data="tableData" :columns="columns" border show-index>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; align-items: center;">
        <input v-model="searchText1" placeholder="Search name..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 160px;" />
        <yh-button type="primary" size="small">Search</yh-button>
        <yh-button type="success" size="small">Add</yh-button>
        <yh-button type="danger" size="small">Batch Delete</yh-button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## Custom Left Prefix Template

Insert content **before** the left action buttons through the `#toolbar-left-prefix` slot, such as titles, icons, etc.

<DemoBlock title="Custom Left Prefix Template" :ts-code="tsToolbarLeftPrefix" :js-code="jsToolbarLeftPrefix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133; margin-right: 12px;">📋 Employee List</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px;">
        <yh-button type="primary" size="small">Add</yh-button>
        <yh-button size="small">Refresh</yh-button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## Custom Left Suffix Template

Append content **after** the left action buttons through the `#toolbar-left-suffix` slot, such as data statistics.

<DemoBlock title="Custom Left Suffix Template" :ts-code="tsToolbarLeftSuffix" :js-code="jsToolbarLeftSuffix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">Add</yh-button>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">Total {{ tableData.length }} records</span>
    </template>
  </yh-table>
</DemoBlock>

## Custom Right Template

Place action buttons on the right side above the table through the `#toolbar-right` slot, such as refresh, export, print, settings, etc.

<DemoBlock title="Custom Right Template" :ts-code="tsToolbarRight" :js-code="jsToolbarRight">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px;">
        <yh-button size="small" title="Refresh">🔄 Refresh</yh-button>
        <yh-button size="small" title="Export">📥 Export</yh-button>
        <yh-button size="small" title="Print">🖨️ Print</yh-button>
        <yh-button size="small" title="Settings">⚙️ Settings</yh-button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## Custom Right Prefix Template

Insert content **before** the right action buttons through the `#toolbar-right-prefix` slot, such as status hints.

<DemoBlock title="Custom Right Prefix Template" :ts-code="tsToolbarRightPrefix" :js-code="jsToolbarRightPrefix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">Add</yh-button>
    </template>
    <template #toolbar-right-prefix>
      <span style="color: #e6a23c; font-size: 12px; margin-right: 8px;">⚠️ 1 pending review</span>
    </template>
    <template #toolbar-right>
      <yh-button size="small">Export</yh-button>
    </template>
  </yh-table>
</DemoBlock>

## Custom Right Suffix Template

Append content **after** the right action buttons through the `#toolbar-right-suffix` slot, such as sync status.

<DemoBlock title="Custom Right Suffix Template" :ts-code="tsToolbarRightSuffix" :js-code="jsToolbarRightSuffix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-right>
      <yh-button size="small">Export</yh-button>
    </template>
    <template #toolbar-right-suffix>
      <span style="color: #67c23a; font-size: 12px; margin-left: 8px;">✅ Synced</span>
    </template>
  </yh-table>
</DemoBlock>

## Full Toolbar Example

Combine all 6 toolbar slots to build a complete table toolbar layout.

<DemoBlock title="Full Toolbar" :ts-code="tsFullToolbar" :js-code="jsFullToolbar">
  <yh-table :data="tableData" :columns="columns" border show-index>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133;">📋 Employee Management</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; margin-left: 16px;">
        <yh-button type="primary" size="small">Add Employee</yh-button>
        <yh-button type="danger" size="small">Batch Delete</yh-button>
      </div>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">Total {{ tableData.length }} people</span>
    </template>
    <template #toolbar-right-prefix>
      <input placeholder="Search..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 140px; font-size: 12px;" />
    </template>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px; margin-left: 8px;">
        <yh-button size="small">🔄</yh-button>
        <yh-button size="small">📥</yh-button>
        <yh-button size="small">🖨️</yh-button>
      </div>
    </template>
    <template #toolbar-right-suffix>
      <yh-button size="small" style="margin-left: 8px;">⚙️</yh-button>
    </template>
  </yh-table>
</DemoBlock>

## Slot Layout Description

The toolbar area is divided into left and right sections, each with 3 slot positions:

```
┌──────────────────────────────────────────────────────────────────┐
│ [left-prefix] [left] [left-suffix]   [right-prefix] [right] [right-suffix] │
├──────────────────────────────────────────────────────────────────┤
│                        Table Content Area                             │
└──────────────────────────────────────────────────────────────────┘
```

## API

### Toolbar Slots

| Slot | Description | Position |
| --- | --- | --- |
| `toolbar-left` | Left toolbar main content | Left |
| `toolbar-left-prefix` | Left toolbar prefix (e.g., title) | Left start |
| `toolbar-left-suffix` | Left toolbar suffix (e.g., statistics) | Left end |
| `toolbar-right` | Right toolbar main content | Right |
| `toolbar-right-prefix` | Right toolbar prefix (e.g., hints) | Right start |
| `toolbar-right-suffix` | Right toolbar suffix (e.g., status) | Right end |
| `empty` | Custom empty data state content | Inside table |

### Usage Tips

1. **Left side** typically holds action buttons: add, batch delete, search, etc.
2. **Right side** typically holds tool buttons: refresh, export, print, column settings, etc.
3. **Prefix** is suitable for static content like titles and icons
4. **Suffix** is suitable for auxiliary info like statistics and status indicators
5. All slots can be freely combined; unused slots won't render extra space
