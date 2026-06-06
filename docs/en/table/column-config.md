# Table - Column Configuration

Dynamically control column visibility and fixed direction through the column configuration panel for personalized table display.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import { useClickOutside } from '@yh-ui/hooks'

// ==================== Common Data ====================
const tableData = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, phone: '13800001111', email: 'john@test.com', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, phone: '13800002222', email: 'jane@test.com', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, phone: '13800003333', email: 'mike@test.com', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, phone: '13800004444', email: 'sarah@test.com', address: 'Nanshan, Shenzhen' },
  { id: 5, name: 'Tom', age: 29, dept: 'Marketing', salary: 16000, phone: '13800005555', email: 'tom@test.com', address: 'West Lake, Hangzhou' }
])

// ==================== 1. Column Visibility Control ====================
interface ColumnItem {
  prop: string
  label: string
  width?: number
  visible: boolean
  fixed?: 'left' | 'right' | false
}

const allColumns1 = ref<ColumnItem[]>([
  { prop: 'name', label: 'Name', width: 100, visible: true, fixed: false },
  { prop: 'age', label: 'Age', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: 'Department', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: 'Salary', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: 'Phone', width: 130, visible: true, fixed: false },
  { prop: 'email', label: 'Email', width: 180, visible: true, fixed: false },
  { prop: 'address', label: 'Address', visible: true, fixed: false }
])

const visibleColumns1 = computed(() =>
  allColumns1.value
    .filter(c => c.visible)
    .map(c => ({
      prop: c.prop,
      label: c.label,
      width: c.width,
      fixed: c.fixed || undefined
    }))
)

const showPanel1 = ref(false)
const panelRef1 = ref<HTMLElement>()
useClickOutside(panelRef1, () => { showPanel1.value = false })

const toggleAll1 = (val: boolean) => {
  allColumns1.value.forEach(c => { c.visible = val })
}

const isAllVisible1 = computed(() => allColumns1.value.every(c => c.visible))
const isSomeVisible1 = computed(() => allColumns1.value.some(c => c.visible) && !isAllVisible1.value)

// ==================== 2. Fixed Column Config ====================
const allColumns2 = ref<ColumnItem[]>([
  { prop: 'name', label: 'Name', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: 'Age', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: 'Department', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: 'Salary', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: 'Phone', width: 130, visible: true, fixed: false },
  { prop: 'email', label: 'Email', width: 180, visible: true, fixed: false },
  { prop: 'address', label: 'Address', width: 200, visible: true, fixed: 'right' }
])

const visibleColumns2 = computed(() =>
  allColumns2.value
    .filter(c => c.visible)
    .map(c => ({
      prop: c.prop,
      label: c.label,
      width: c.width,
      fixed: c.fixed || undefined
    }))
)

const showPanel2 = ref(false)
const panelRef2 = ref<HTMLElement>()
useClickOutside(panelRef2, () => { showPanel2.value = false })

const setFixed2 = (col: ColumnItem, dir: 'left' | 'right' | false) => {
  col.fixed = col.fixed === dir ? false : dir
}

// ==================== 3. Full Column Config Panel ====================
const allColumns3 = ref<ColumnItem[]>([
  { prop: 'name', label: 'Name', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: 'Age', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: 'Department', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: 'Salary', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: 'Phone', width: 130, visible: true, fixed: false },
  { prop: 'email', label: 'Email', width: 180, visible: true, fixed: false },
  { prop: 'address', label: 'Address', width: 200, visible: true, fixed: 'right' }
])

const visibleColumns3 = computed(() =>
  allColumns3.value
    .filter(c => c.visible)
    .map(c => ({
      prop: c.prop,
      label: c.label,
      width: c.width,
      fixed: c.fixed || undefined
    }))
)

const showPanel3 = ref(false)
const panelRef3 = ref<HTMLElement>()
useClickOutside(panelRef3, () => { showPanel3.value = false })

const toggleAll3 = (val: boolean) => {
  allColumns3.value.forEach(c => { c.visible = val })
}

const isAllVisible3 = computed(() => allColumns3.value.every(c => c.visible))

const setFixed3 = (col: ColumnItem, dir: 'left' | 'right' | false) => {
  col.fixed = col.fixed === dir ? false : dir
}

const resetColumns3 = () => {
  allColumns3.value = [
    { prop: 'name', label: 'Name', width: 100, visible: true, fixed: 'left' },
    { prop: 'age', label: 'Age', width: 80, visible: true, fixed: false },
    { prop: 'dept', label: 'Department', width: 100, visible: true, fixed: false },
    { prop: 'salary', label: 'Salary', width: 100, visible: true, fixed: false },
    { prop: 'phone', label: 'Phone', width: 130, visible: true, fixed: false },
    { prop: 'email', label: 'Email', width: 180, visible: true, fixed: false },
    { prop: 'address', label: 'Address', width: 200, visible: true, fixed: 'right' }
  ]
}

// ==================== Code Examples ====================

const tsVisibilityControl = `<${_T}>
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef">
    <yh-button size="small" @click="showPanel = !showPanel">⚙️ Column Settings</yh-button>
    <div v-if="showPanel" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 200px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" :checked="isAllVisible" :indeterminate.prop="isSomeVisible" @change="toggleAll(($event.target as HTMLInputElement).checked)" />
        <span style="font-size: 13px; font-weight: 600;">Select All</span>
      </div>
      <label v-for="col in allColumns" :key="col.prop" style="display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 13px; cursor: pointer;">
        <input type="checkbox" v-model="col.visible" />
        {{ col.label }}
      </label>
    </div>
  </div>
  <yh-table :data="data" :columns="visibleColumns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useClickOutside } from '@yh-ui/hooks'

interface ColumnItem {
  prop: string
  label: string
  width?: number
  visible: boolean
}

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, phone: '13800001111', email: 'john@test.com', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, phone: '13800002222', email: 'jane@test.com', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, phone: '13800003333', email: 'mike@test.com', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, phone: '13800004444', email: 'sarah@test.com', address: 'Nanshan, Shenzhen' },
  { id: 5, name: 'Tom', age: 29, dept: 'Marketing', salary: 16000, phone: '13800005555', email: 'tom@test.com', address: 'West Lake, Hangzhou' }
])

const allColumns = ref<ColumnItem[]>([
  { prop: 'name', label: 'Name', width: 100, visible: true },
  { prop: 'age', label: 'Age', width: 80, visible: true },
  { prop: 'dept', label: 'Department', width: 100, visible: true },
  { prop: 'salary', label: 'Salary', width: 100, visible: true },
  { prop: 'phone', label: 'Phone', width: 130, visible: true },
  { prop: 'email', label: 'Email', width: 180, visible: true },
  { prop: 'address', label: 'Address', visible: true }
])

const visibleColumns = computed(() =>
  allColumns.value.filter(c => c.visible).map(c => ({ prop: c.prop, label: c.label, width: c.width }))
)

const showPanel = ref(false)
const isAllVisible = computed(() => allColumns.value.every(c => c.visible))
const isSomeVisible = computed(() => allColumns.value.some(c => c.visible) && !isAllVisible.value)

const toggleAll = (val: boolean) => {
  allColumns.value.forEach(c => { c.visible = val })
}
</${_S}>`

const jsVisibilityControl = toJs(tsVisibilityControl);

const tsFixedConfig = `<${_T}>
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef">
    <yh-button size="small" @click="showPanel = !showPanel">📌 Fixed Column Settings</yh-button>
    <div v-if="showPanel" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 280px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <span style="font-size: 13px; font-weight: 600;">Fixed Column Config</span>
      </div>
      <div v-for="col in allColumns" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px;">
        <span>{{ col.label }}</span>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed(col, 'left')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#606266', cursor: 'pointer' }">
            Fix Left
          </button>
          <button @click="setFixed(col, 'right')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'right' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'right' ? '#ecf5ff' : '#fff', color: col.fixed === 'right' ? '#409eff' : '#606266', cursor: 'pointer' }">
            Fix Right
          </button>
        </div>
      </div>
    </div>
  </div>
  <yh-table :data="data" :columns="visibleColumns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useClickOutside } from '@yh-ui/hooks'

interface ColumnItem {
  prop: string
  label: string
  width?: number
  visible: boolean
  fixed: 'left' | 'right' | false
}

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, phone: '13800001111', email: 'john@test.com', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, phone: '13800002222', email: 'jane@test.com', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, phone: '13800003333', email: 'mike@test.com', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, phone: '13800004444', email: 'sarah@test.com', address: 'Nanshan, Shenzhen' },
  { id: 5, name: 'Tom', age: 29, dept: 'Marketing', salary: 16000, phone: '13800005555', email: 'tom@test.com', address: 'West Lake, Hangzhou' }
])

const allColumns = ref<ColumnItem[]>([
  { prop: 'name', label: 'Name', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: 'Age', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: 'Department', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: 'Salary', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: 'Phone', width: 130, visible: true, fixed: false },
  { prop: 'email', label: 'Email', width: 180, visible: true, fixed: false },
  { prop: 'address', label: 'Address', width: 200, visible: true, fixed: 'right' }
])

const visibleColumns = computed(() =>
  allColumns.value.filter(c => c.visible).map(c => ({
    prop: c.prop, label: c.label, width: c.width, fixed: c.fixed || undefined
  }))
)

const showPanel = ref(false)
const panelRef = ref<HTMLElement>()
useClickOutside(panelRef, () => { showPanel.value = false })

const setFixed = (col: ColumnItem, dir: 'left' | 'right' | false) => {
  col.fixed = col.fixed === dir ? false : dir
}
</${_S}>`

const jsFixedConfig = toJs(tsFixedConfig);

const tsFullConfig = `<${_T}>
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef">
    <yh-button size="small" @click="showPanel = !showPanel">⚙️ Column Config</yh-button>
    <div v-if="showPanel" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 16px; min-width: 340px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" :checked="isAllVisible" @change="toggleAll(($event.target as HTMLInputElement).checked)" />
          <span style="font-size: 13px; font-weight: 600;">Column Config</span>
        </div>
        <button @click="resetColumns" style="padding: 2px 8px; font-size: 12px; border: 1px solid #dcdfe6; border-radius: 3px; background: #fff; color: #409eff; cursor: pointer;">Reset</button>
      </div>
      <div v-for="col in allColumns" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #f5f7fa;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" v-model="col.visible" />
          {{ col.label }}
        </label>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed(col, 'left')" title="Fix Left"
            :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#c0c4cc', cursor: 'pointer', fontSize: '12px' }">
            ◀
          </button>
          <button @click="setFixed(col, 'right')" title="Fix Right"
            :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: col.fixed === 'right' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'right' ? '#ecf5ff' : '#fff', color: col.fixed === 'right' ? '#409eff' : '#c0c4cc', cursor: 'pointer', fontSize: '12px' }">
            ▶
          </button>
        </div>
      </div>
    </div>
  </div>
  <yh-table :data="data" :columns="visibleColumns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useClickOutside } from '@yh-ui/hooks'

interface ColumnItem {
  prop: string
  label: string
  width?: number
  visible: boolean
  fixed: 'left' | 'right' | false
}

const data = ref([
  { id: 1, name: 'John', age: 28, dept: 'Engineering', salary: 15000, phone: '13800001111', email: 'john@test.com', address: 'Chaoyang, Beijing' },
  { id: 2, name: 'Jane', age: 32, dept: 'Product', salary: 18000, phone: '13800002222', email: 'jane@test.com', address: 'Pudong, Shanghai' },
  { id: 3, name: 'Mike', age: 25, dept: 'Design', salary: 14000, phone: '13800003333', email: 'mike@test.com', address: 'Tianhe, Guangzhou' },
  { id: 4, name: 'Sarah', age: 35, dept: 'Operations', salary: 22000, phone: '13800004444', email: 'sarah@test.com', address: 'Nanshan, Shenzhen' },
  { id: 5, name: 'Tom', age: 29, dept: 'Marketing', salary: 16000, phone: '13800005555', email: 'tom@test.com', address: 'West Lake, Hangzhou' }
])

const allColumns = ref<ColumnItem[]>([
  { prop: 'name', label: 'Name', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: 'Age', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: 'Department', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: 'Salary', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: 'Phone', width: 130, visible: true, fixed: false },
  { prop: 'email', label: 'Email', width: 180, visible: true, fixed: false },
  { prop: 'address', label: 'Address', width: 200, visible: true, fixed: 'right' }
])

const visibleColumns = computed(() =>
  allColumns.value.filter(c => c.visible).map(c => ({
    prop: c.prop, label: c.label, width: c.width, fixed: c.fixed || undefined
  }))
)

const showPanel = ref(false)
const panelRef = ref<HTMLElement>()
useClickOutside(panelRef, () => { showPanel.value = false })

const toggleAll = (val: boolean) => {
  allColumns.value.forEach(c => { c.visible = val })
}

const setFixed = (col: ColumnItem, dir: 'left' | 'right' | false) => {
  col.fixed = col.fixed === dir ? false : dir
}

const resetColumns = () => {
  allColumns.value = [
    { prop: 'name', label: 'Name', width: 100, visible: true, fixed: 'left' },
    { prop: 'age', label: 'Age', width: 80, visible: true, fixed: false },
    { prop: 'dept', label: 'Department', width: 100, visible: true, fixed: false },
    { prop: 'salary', label: 'Salary', width: 100, visible: true, fixed: false },
    { prop: 'phone', label: 'Phone', width: 130, visible: true, fixed: false },
    { prop: 'email', label: 'Email', width: 180, visible: true, fixed: false },
    { prop: 'address', label: 'Address', width: 200, visible: true, fixed: 'right' }
  ]
}
</${_S}>`

const jsFullConfig = toJs(tsFullConfig);
</script>

## Column Visibility Control

Control each column's show/hide through checkboxes in the panel, supporting select all / deselect all operations.

<DemoBlock title="Column Visibility Control" :ts-code="tsVisibilityControl" :js-code="jsVisibilityControl">
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef1">
    <yh-button size="small" @click="showPanel1 = !showPanel1">⚙️ Column Settings</yh-button>
    <div v-if="showPanel1" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 200px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" :checked="isAllVisible1" :indeterminate.prop="isSomeVisible1" @change="toggleAll1(($event.target as HTMLInputElement).checked)" />
        <span style="font-size: 13px; font-weight: 600;">Select All</span>
      </div>
      <label v-for="col in allColumns1" :key="col.prop" style="display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 13px; cursor: pointer;">
        <input type="checkbox" v-model="col.visible" />
        {{ col.label }}
      </label>
    </div>
  </div>
  <yh-table :data="tableData" :columns="visibleColumns1" border show-index />
</DemoBlock>

## Fixed Column Config

Dynamically set whether each column is fixed to the left or right through the config panel. Click an already selected direction to unfix.

<DemoBlock title="Fixed Column Config" :ts-code="tsFixedConfig" :js-code="jsFixedConfig">
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef2">
    <yh-button size="small" @click="showPanel2 = !showPanel2">📌 Fixed Column Settings</yh-button>
    <div v-if="showPanel2" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 280px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <span style="font-size: 13px; font-weight: 600;">Fixed Column Config</span>
      </div>
      <div v-for="col in allColumns2" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px;">
        <span>{{ col.label }}</span>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed2(col, 'left')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#606266', cursor: 'pointer' }">
            Fix Left
          </button>
          <button @click="setFixed2(col, 'right')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'right' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'right' ? '#ecf5ff' : '#fff', color: col.fixed === 'right' ? '#409eff' : '#606266', cursor: 'pointer' }">
            Fix Right
          </button>
        </div>
      </div>
    </div>
  </div>
  <yh-table :data="tableData" :columns="visibleColumns2" border show-index />
</DemoBlock>

## Full Column Config Panel

Combines visibility control and fixed column config, with a reset button to restore default settings.

<DemoBlock title="Full Column Config Panel" :ts-code="tsFullConfig" :js-code="jsFullConfig">
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef3">
    <yh-button size="small" @click="showPanel3 = !showPanel3">⚙️ Column Config</yh-button>
    <div v-if="showPanel3" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 16px; min-width: 340px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" :checked="isAllVisible3" @change="toggleAll3(($event.target as HTMLInputElement).checked)" />
          <span style="font-size: 13px; font-weight: 600;">Column Config</span>
        </div>
        <button @click="resetColumns3" style="padding: 2px 8px; font-size: 12px; border: 1px solid #dcdfe6; border-radius: 3px; background: #fff; color: #409eff; cursor: pointer;">Reset</button>
      </div>
      <div v-for="col in allColumns3" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #f5f7fa;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" v-model="col.visible" />
          {{ col.label }}
        </label>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed3(col, 'left')" title="Fix Left"
            :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#c0c4cc', cursor: 'pointer', fontSize: '12px' }">
            ◀
          </button>
          <button @click="setFixed3(col, 'right')" title="Fix Right"
            :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: col.fixed === 'right' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'right' ? '#ecf5ff' : '#fff', color: col.fixed === 'right' ? '#409eff' : '#c0c4cc', cursor: 'pointer', fontSize: '12px' }">
            ▶
          </button>
        </div>
      </div>
    </div>
  </div>
  <yh-table :data="tableData" :columns="visibleColumns3" border show-index />
</DemoBlock>

## API

### ColumnItem Configuration

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| prop | Column field name | `string` | — |
| label | Column title | `string` | — |
| width | Column width | `number` | — |
| visible | Whether to show | `boolean` | `true` |
| fixed | Fixed direction | `'left' \| 'right' \| false` | `false` |

### Implementation Details

1. **Column Visibility:** Maintain a column config array with `visible` property, use `computed` to filter `visible: true` columns for the table
2. **Column Fixing:** Set the `fixed` property in column config, mapped to the table column's `fixed` property
3. **Reactivity:** Config changes automatically trigger table re-rendering, no manual refresh needed

### Usage Tips

1. Column config data can be stored in `localStorage` for persistence
2. It's recommended to provide a "Reset" function for users to restore default settings
3. When configuring fixed columns, ensure the total width of left and right fixed columns doesn't exceed the table width
4. Combined with column drag feature for more flexible column order adjustment
