# Table 表格 - 空数据提示

当表格没有数据时，展示空状态占位提示，支持自定义文字、图片和插槽。

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 公共列配置 ====================

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'address', label: '地址' }
]

// ==================== 1. 默认空数据 ====================
const emptyData1 = ref<Record<string, unknown>[]>([])

// ==================== 2. 自定义空提示文字 ====================
const emptyData2 = ref<Record<string, unknown>[]>([])

// ==================== 3. 使用 emptyConfig 自定义图片和描述 ====================
const emptyImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100"><rect x="20" y="30" width="80" height="55" rx="6" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2"/><path d="M38 55h44M38 65h30" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round"/><circle cx="60" cy="42" r="5" fill="#c0c4cc"/></svg>')
const emptyData3 = ref<Record<string, unknown>[]>([])

// ==================== 4. 插槽自定义空状态 ====================
const emptyData4 = ref<Record<string, unknown>[]>([])
const slotLoading = ref(false)

const refreshData = () => {
  slotLoading.value = true
  setTimeout(() => {
    emptyData4.value = [
      { name: '张三', age: 28, dept: '技术部', address: '北京市朝阳区' },
      { name: '李四', age: 32, dept: '产品部', address: '上海市浦东新区' },
      { name: '王五', age: 25, dept: '设计部', address: '广州市天河区' }
    ]
    slotLoading.value = false
  }, 1000)
}

// ==================== 5. 动态数据切换 ====================
const dynamicData = ref<Record<string, unknown>[]>([])
const hasDynData = ref(false)

const toggleDynamicData = () => {
  if (hasDynData.value) {
    dynamicData.value = []
    hasDynData.value = false
  } else {
    dynamicData.value = [
      { name: '张三', age: 28, dept: '技术部', address: '北京市朝阳区' },
      { name: '李四', age: 32, dept: '产品部', address: '上海市浦东新区' },
      { name: '王五', age: 25, dept: '设计部', address: '广州市天河区' }
    ]
    hasDynData.value = true
  }
}

// ==================== 示例代码 ====================

const tsDefaultEmpty = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsDefaultEmpty = toJs(tsDefaultEmpty)

const tsCustomText = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    empty-text="没有找到匹配的数据"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsCustomText = toJs(tsCustomText)

const tsEmptyConfig = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :empty-config="{
      image: emptyImage,
      description: '这里空空如也~'
    }"
    border
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const emptyImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100"><rect x="20" y="30" width="80" height="55" rx="6" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2"/><path d="M38 55h44M38 65h30" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round"/><circle cx="60" cy="42" r="5" fill="#c0c4cc"/></svg>')

const data = ref<Record<string, unknown>[]>([])

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsEmptyConfig = toJs(tsEmptyConfig)

const tsSlotEmpty = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
  >
    <template #empty>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 40px 0; gap: 16px;">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="36" rx="4" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2" />
          <path d="M20 32h24M20 40h16" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round" />
          <circle cx="32" cy="24" r="4" fill="#c0c4cc" />
        </svg>
        <span style="color: #909399; font-size: 14px;">暂无数据，请稍后再试</span>
        <button style="padding: 6px 16px; border: 1px solid #dcdfe6; border-radius: 4px; background: #fff; color: #606266; cursor: pointer;"
          @click="refreshData">
          刷新数据
        </button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])
const loading = ref(false)

const refreshData = () => {
  loading.value = true
  setTimeout(() => {
    data.value = [
      { name: '张三', age: 28, dept: '技术部', address: '北京市朝阳区' },
      { name: '李四', age: 32, dept: '产品部', address: '上海市浦东新区' },
      { name: '王五', age: 25, dept: '设计部', address: '广州市天河区' }
    ]
    loading.value = false
  }, 1000)
}

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsSlotEmpty = toJs(tsSlotEmpty)

const tsDynamicEmpty = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="toggle">
      {{ hasData ? '清空数据' : '加载数据' }}
    </yh-button>
  </div>
  <yh-table
    :data="data"
    :columns="columns"
    border
    empty-text="数据已清空，点击按钮重新加载"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, unknown>[]>([])
const hasData = ref(false)

const toggle = () => {
  if (hasData.value) {
    data.value = []
    hasData.value = false
  } else {
    data.value = [
      { name: '张三', age: 28, dept: '技术部', address: '北京市朝阳区' },
      { name: '李四', age: 32, dept: '产品部', address: '上海市浦东新区' },
      { name: '王五', age: 25, dept: '设计部', address: '广州市天河区' }
    ]
    hasData.value = true
  }
}

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsDynamicEmpty = toJs(tsDynamicEmpty)
</script>

## 默认空状态

当 `data` 为空数组时，表格自动展示空数据提示，默认文字为 "暂无数据"。

<DemoBlock title="默认空提示" :ts-code="tsDefaultEmpty" :js-code="jsDefaultEmpty">
  <yh-table
    :data="emptyData1"
    :columns="columns"
    border
  />
</DemoBlock>

## 自定义空提示文字

通过 `empty-text` 属性自定义空数据时的提示文字。

<DemoBlock title="自定义文字" :ts-code="tsCustomText" :js-code="jsCustomText">
  <yh-table
    :data="emptyData2"
    :columns="columns"
    empty-text="没有找到匹配的数据"
    border
  />
</DemoBlock>

## 自定义图片和描述

通过 `empty-config` 对象可设置自定义图片和描述文字。

<DemoBlock title="图片 + 描述" :ts-code="tsEmptyConfig" :js-code="jsEmptyConfig">
  <yh-table
    :data="emptyData3"
    :columns="columns"
    :empty-config="{
      image: emptyImage,
      description: '这里空空如也~'
    }"
    border
  />
</DemoBlock>

## 自定义空状态插槽

通过 `#empty` 插槽可以完全自定义空状态的展示内容，包括图标、文字和操作按钮等。

<DemoBlock title="自定义插槽" :ts-code="tsSlotEmpty" :js-code="jsSlotEmpty">
  <yh-table
    :data="emptyData4"
    :columns="columns"
    :loading="slotLoading"
    border
  >
    <template #empty>
      <div style="display: flex; flex-direction: column; align-items: center; padding: 40px 0; gap: 16px;">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="36" rx="4" fill="#f0f2f5" stroke="#dcdfe6" stroke-width="2" />
          <path d="M20 32h24M20 40h16" stroke="#c0c4cc" stroke-width="2" stroke-linecap="round" />
          <circle cx="32" cy="24" r="4" fill="#c0c4cc" />
        </svg>
        <span style="color: #909399; font-size: 14px;">暂无数据，请稍后再试</span>
        <button style="padding: 6px 16px; border: 1px solid #dcdfe6; border-radius: 4px; background: #fff; color: #606266; cursor: pointer;"
          @click="refreshData">
          刷新数据
        </button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## 动态切换

配合按钮动态切换数据状态，体验空数据提示与有数据之间的切换效果。

<DemoBlock title="动态数据切换" :ts-code="tsDynamicEmpty" :js-code="jsDynamicEmpty">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="toggleDynamicData">
      {{ hasDynData ? '清空数据' : '加载数据' }}
    </yh-button>
  </div>
  <yh-table
    :data="dynamicData"
    :columns="columns"
    border
    empty-text="数据已清空，点击按钮重新加载"
  />
</DemoBlock>

## API

### Table 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| empty-text | 空数据时显示的文字 | `string` | `'暂无数据'` |
| empty-config | 空状态配置对象 | `TableEmptyConfig` | — |

### TableEmptyConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 空状态图片 URL | `string` | — |
| description | 空状态描述文字（优先级高于 `empty-text`） | `string` | — |
| render | 自定义渲染函数 | `() => VNode` | — |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| empty | 自定义空数据内容，优先级最高 |

### 优先级

空状态展示内容的优先级从高到低：

1. **`#empty` 插槽** — 完全自定义内容
2. **`emptyConfig.render`** — 渲染函数
3. **`emptyConfig.image` + `emptyConfig.description`** — 图片和描述
4. **`empty-text`** — 简单文字提示
5. **默认值** — "暂无数据"

