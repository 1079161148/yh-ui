# Table 表格 - 列配置

通过列配置面板可以动态控制列的显示/隐藏和固定方向，实现个性化的表格展示。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'
import { useClickOutside } from '@yh-ui/hooks'

// ==================== 公共数据 ====================
const tableData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, phone: '13800001111', email: 'zhangsan@test.com', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, phone: '13800002222', email: 'lisi@test.com', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, phone: '13800003333', email: 'wangwu@test.com', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, phone: '13800004444', email: 'zhaoliu@test.com', address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, phone: '13800005555', email: 'qianqi@test.com', address: '杭州市西湖区' }
])

// ==================== 1. 列显隐控制 ====================
interface ColumnItem {
  prop: string
  label: string
  width?: number
  visible: boolean
  fixed?: 'left' | 'right' | false
}

const allColumns1 = ref<ColumnItem[]>([
  { prop: 'name', label: '姓名', width: 100, visible: true, fixed: false },
  { prop: 'age', label: '年龄', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: '部门', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: '薪资', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: '电话', width: 130, visible: true, fixed: false },
  { prop: 'email', label: '邮箱', width: 180, visible: true, fixed: false },
  { prop: 'address', label: '地址', visible: true, fixed: false }
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

// ==================== 2. 固定列配置 ====================
const allColumns2 = ref<ColumnItem[]>([
  { prop: 'name', label: '姓名', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: '部门', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: '薪资', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: '电话', width: 130, visible: true, fixed: false },
  { prop: 'email', label: '邮箱', width: 180, visible: true, fixed: false },
  { prop: 'address', label: '地址', width: 200, visible: true, fixed: 'right' }
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

// ==================== 3. 完整列配置面板 ====================
const allColumns3 = ref<ColumnItem[]>([
  { prop: 'name', label: '姓名', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: '部门', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: '薪资', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: '电话', width: 130, visible: true, fixed: false },
  { prop: 'email', label: '邮箱', width: 180, visible: true, fixed: false },
  { prop: 'address', label: '地址', width: 200, visible: true, fixed: 'right' }
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
    { prop: 'name', label: '姓名', width: 100, visible: true, fixed: 'left' },
    { prop: 'age', label: '年龄', width: 80, visible: true, fixed: false },
    { prop: 'dept', label: '部门', width: 100, visible: true, fixed: false },
    { prop: 'salary', label: '薪资', width: 100, visible: true, fixed: false },
    { prop: 'phone', label: '电话', width: 130, visible: true, fixed: false },
    { prop: 'email', label: '邮箱', width: 180, visible: true, fixed: false },
    { prop: 'address', label: '地址', width: 200, visible: true, fixed: 'right' }
  ]
}

// ==================== 示例代码 ====================

const tsVisibilityControl = `<${_T}>
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef">
    <yh-button size="small" @click="showPanel = !showPanel">⚙️ 列设置</yh-button>
    <div v-if="showPanel" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 200px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" :checked="isAllVisible" :indeterminate.prop="isSomeVisible" @change="toggleAll(($event.target as HTMLInputElement).checked)" />
        <span style="font-size: 13px; font-weight: 600;">全选</span>
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
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, phone: '13800001111', email: 'zhangsan@test.com', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, phone: '13800002222', email: 'lisi@test.com', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, phone: '13800003333', email: 'wangwu@test.com', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, phone: '13800004444', email: 'zhaoliu@test.com', address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, phone: '13800005555', email: 'qianqi@test.com', address: '杭州市西湖区' }
])

const allColumns = ref<ColumnItem[]>([
  { prop: 'name', label: '姓名', width: 100, visible: true },
  { prop: 'age', label: '年龄', width: 80, visible: true },
  { prop: 'dept', label: '部门', width: 100, visible: true },
  { prop: 'salary', label: '薪资', width: 100, visible: true },
  { prop: 'phone', label: '电话', width: 130, visible: true },
  { prop: 'email', label: '邮箱', width: 180, visible: true },
  { prop: 'address', label: '地址', visible: true }
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
    <yh-button size="small" @click="showPanel = !showPanel">📌 固定列设置</yh-button>
    <div v-if="showPanel" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 280px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <span style="font-size: 13px; font-weight: 600;">固定列配置</span>
      </div>
      <div v-for="col in allColumns" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px;">
        <span>{{ col.label }}</span>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed(col, 'left')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#606266', cursor: 'pointer' }">
            固定左侧
          </button>
          <button @click="setFixed(col, 'right')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'right' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'right' ? '#ecf5ff' : '#fff', color: col.fixed === 'right' ? '#409eff' : '#606266', cursor: 'pointer' }">
            固定右侧
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
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, phone: '13800001111', email: 'zhangsan@test.com', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, phone: '13800002222', email: 'lisi@test.com', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, phone: '13800003333', email: 'wangwu@test.com', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, phone: '13800004444', email: 'zhaoliu@test.com', address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, phone: '13800005555', email: 'qianqi@test.com', address: '杭州市西湖区' }
])

const allColumns = ref<ColumnItem[]>([
  { prop: 'name', label: '姓名', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: '部门', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: '薪资', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: '电话', width: 130, visible: true, fixed: false },
  { prop: 'email', label: '邮箱', width: 180, visible: true, fixed: false },
  { prop: 'address', label: '地址', width: 200, visible: true, fixed: 'right' }
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
    <yh-button size="small" @click="showPanel = !showPanel">⚙️ 列配置</yh-button>
    <div v-if="showPanel" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 16px; min-width: 340px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" :checked="isAllVisible" @change="toggleAll(($event.target as HTMLInputElement).checked)" />
          <span style="font-size: 13px; font-weight: 600;">列配置</span>
        </div>
        <button @click="resetColumns" style="padding: 2px 8px; font-size: 12px; border: 1px solid #dcdfe6; border-radius: 3px; background: #fff; color: #409eff; cursor: pointer;">重置</button>
      </div>
      <div v-for="col in allColumns" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #f5f7fa;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" v-model="col.visible" />
          {{ col.label }}
        </label>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed(col, 'left')" title="固定左侧"
            :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#c0c4cc', cursor: 'pointer', fontSize: '12px' }">
            ◀
          </button>
          <button @click="setFixed(col, 'right')" title="固定右侧"
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
  { id: 1, name: '张三', age: 28, dept: '技术部', salary: 15000, phone: '13800001111', email: 'zhangsan@test.com', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', salary: 18000, phone: '13800002222', email: 'lisi@test.com', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', salary: 14000, phone: '13800003333', email: 'wangwu@test.com', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', salary: 22000, phone: '13800004444', email: 'zhaoliu@test.com', address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 29, dept: '市场部', salary: 16000, phone: '13800005555', email: 'qianqi@test.com', address: '杭州市西湖区' }
])

const allColumns = ref<ColumnItem[]>([
  { prop: 'name', label: '姓名', width: 100, visible: true, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 80, visible: true, fixed: false },
  { prop: 'dept', label: '部门', width: 100, visible: true, fixed: false },
  { prop: 'salary', label: '薪资', width: 100, visible: true, fixed: false },
  { prop: 'phone', label: '电话', width: 130, visible: true, fixed: false },
  { prop: 'email', label: '邮箱', width: 180, visible: true, fixed: false },
  { prop: 'address', label: '地址', width: 200, visible: true, fixed: 'right' }
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
    { prop: 'name', label: '姓名', width: 100, visible: true, fixed: 'left' },
    { prop: 'age', label: '年龄', width: 80, visible: true, fixed: false },
    { prop: 'dept', label: '部门', width: 100, visible: true, fixed: false },
    { prop: 'salary', label: '薪资', width: 100, visible: true, fixed: false },
    { prop: 'phone', label: '电话', width: 130, visible: true, fixed: false },
    { prop: 'email', label: '邮箱', width: 180, visible: true, fixed: false },
    { prop: 'address', label: '地址', width: 200, visible: true, fixed: 'right' }
  ]
}
</${_S}>`

const jsFullConfig = toJs(tsFullConfig);
</script>

## 列显隐控制

通过面板中的复选框可以控制每列的显示/隐藏，支持全选/取消全选操作。

<DemoBlock title="列显隐控制" :ts-code="tsVisibilityControl" :js-code="jsVisibilityControl">
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef1">
    <yh-button size="small" @click="showPanel1 = !showPanel1">⚙️ 列设置</yh-button>
    <div v-if="showPanel1" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 200px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" :checked="isAllVisible1" :indeterminate.prop="isSomeVisible1" @change="toggleAll1(($event.target as HTMLInputElement).checked)" />
        <span style="font-size: 13px; font-weight: 600;">全选</span>
      </div>
      <label v-for="col in allColumns1" :key="col.prop" style="display: flex; align-items: center; gap: 8px; padding: 4px 0; font-size: 13px; cursor: pointer;">
        <input type="checkbox" v-model="col.visible" />
        {{ col.label }}
      </label>
    </div>
  </div>
  <yh-table :data="tableData" :columns="visibleColumns1" border show-index />
</DemoBlock>

## 固定列配置

通过配置面板可以动态设置每列是否固定到左侧或右侧。点击已选中的固定方向可取消固定。

<DemoBlock title="固定列配置" :ts-code="tsFixedConfig" :js-code="jsFixedConfig">
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef2">
    <yh-button size="small" @click="showPanel2 = !showPanel2">📌 固定列设置</yh-button>
    <div v-if="showPanel2" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 12px; min-width: 280px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <span style="font-size: 13px; font-weight: 600;">固定列配置</span>
      </div>
      <div v-for="col in allColumns2" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px;">
        <span>{{ col.label }}</span>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed2(col, 'left')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#606266', cursor: 'pointer' }">
            固定左侧
          </button>
          <button @click="setFixed2(col, 'right')"
            :style="{ padding: '2px 8px', fontSize: '12px', border: '1px solid', borderColor: col.fixed === 'right' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'right' ? '#ecf5ff' : '#fff', color: col.fixed === 'right' ? '#409eff' : '#606266', cursor: 'pointer' }">
            固定右侧
          </button>
        </div>
      </div>
    </div>
  </div>
  <yh-table :data="tableData" :columns="visibleColumns2" border show-index />
</DemoBlock>

## 完整列配置面板

组合显隐控制和固定列配置，提供重置按钮可一键恢复默认配置。

<DemoBlock title="完整列配置面板" :ts-code="tsFullConfig" :js-code="jsFullConfig">
  <div style="margin-bottom: 12px; position: relative; display: inline-block;" ref="panelRef3">
    <yh-button size="small" @click="showPanel3 = !showPanel3">⚙️ 列配置</yh-button>
    <div v-if="showPanel3" style="position: absolute; top: 36px; left: 0; z-index: 100; background: #fff; border: 1px solid #dcdfe6; border-radius: 6px; padding: 16px; min-width: 340px; box-shadow: 0 2px 12px rgba(0,0,0,.12);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ebeef5; padding-bottom: 8px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" :checked="isAllVisible3" @change="toggleAll3(($event.target as HTMLInputElement).checked)" />
          <span style="font-size: 13px; font-weight: 600;">列配置</span>
        </div>
        <button @click="resetColumns3" style="padding: 2px 8px; font-size: 12px; border: 1px solid #dcdfe6; border-radius: 3px; background: #fff; color: #409eff; cursor: pointer;">重置</button>
      </div>
      <div v-for="col in allColumns3" :key="col.prop" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #f5f7fa;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" v-model="col.visible" />
          {{ col.label }}
        </label>
        <div style="display: flex; gap: 4px;">
          <button @click="setFixed3(col, 'left')" title="固定左侧"
            :style="{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: col.fixed === 'left' ? '#409eff' : '#dcdfe6', borderRadius: '3px', background: col.fixed === 'left' ? '#ecf5ff' : '#fff', color: col.fixed === 'left' ? '#409eff' : '#c0c4cc', cursor: 'pointer', fontSize: '12px' }">
            ◀
          </button>
          <button @click="setFixed3(col, 'right')" title="固定右侧"
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

### ColumnItem 配置

| 属性    | 说明     | 类型                         | 默认值  |
| ------- | -------- | ---------------------------- | ------- |
| prop    | 列字段名 | `string`                     | —       |
| label   | 列标题   | `string`                     | —       |
| width   | 列宽度   | `number`                     | —       |
| visible | 是否显示 | `boolean`                    | `true`  |
| fixed   | 固定方向 | `'left' \| 'right' \| false` | `false` |

### 实现原理

1. **列显隐：** 维护一个包含 `visible` 属性的列配置数组，通过 `computed` 过滤出 `visible: true` 的列传给表格
2. **列固定：** 在列配置中设置 `fixed` 属性，映射为表格列的 `fixed` 属性
3. **响应式：** 配置变更后自动触发表格重新渲染，无需手动刷新

### 使用建议

1. 列配置数据可以存储到 `localStorage` 实现持久化
2. 建议提供"重置"功能让用户恢复默认配置
3. 固定列配置时注意左右固定列的宽度之和不要超过表格总宽度
4. 结合列拖拽功能可以实现更灵活的列顺序调整
