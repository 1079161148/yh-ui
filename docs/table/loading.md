# Table 表格 - 加载状态

通过设置 `loading` 属性在表格上显示加载遮罩，适用于异步数据请求场景。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 1. 基础 loading ====================

const basicLoading = ref(true)

const basicData = [
  { id: 1, name: 'Test1', sex: 'Man', age: 28, address: 'test abc' },
  { id: 2, name: 'Test2', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 3, name: 'Test3', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 4, name: 'Test4', sex: 'Women', age: 23, address: 'test abc' },
  { id: 5, name: 'Test5', sex: 'Women', age: 30, address: 'Shanghai' }
]

const basicColumns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]

// ==================== 2. 自定义文字和图标 ====================

const customTextLoading = ref(true)

// ==================== 3. 自定义 loading 插槽 ====================

const slotLoading = ref(true)

// ==================== 4. 异步请求 loading ====================

const asyncLoading = ref(false)
const asyncData = ref<Record<string, unknown>[]>([])

const fetchData = () => {
  asyncLoading.value = true
  asyncData.value = []
  setTimeout(() => {
    asyncData.value = [
      { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000 },
      { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000 },
      { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000 },
      { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000 },
      { id: 5, name: '钱七', dept: '市场部', position: '市场经理', salary: 16000 }
    ]
    asyncLoading.value = false
  }, 2000)
}

const asyncColumns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位' },
  { prop: 'salary', label: '薪资', width: 120 }
]

// ==================== 示例代码 ====================

const tsBasicLoading = `<${_T}>
  <div style="margin-bottom: 12px;">
    <label>
      <input type="checkbox" v-model="loading" /> 显示 Loading
    </label>
  </div>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
    show-index
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

const data = [
  { id: 1, name: 'Test1', sex: 'Man', age: 28, address: 'test abc' },
  { id: 2, name: 'Test2', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 3, name: 'Test3', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 4, name: 'Test4', sex: 'Women', age: 23, address: 'test abc' },
  { id: 5, name: 'Test5', sex: 'Women', age: 30, address: 'Shanghai' }
]

const columns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsBasicLoading = toJs(tsBasicLoading)

const tsCustomTextLoading = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="{ visible: true, text: '正在拼命加载中...' }"
    border
    show-index
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data: Record<string, unknown>[] = []

const columns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsCustomTextLoading = toJs(tsCustomTextLoading)

const tsSlotLoading = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
    show-index
  >
    <template #loading>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px;">
        <svg width="40" height="40" viewBox="0 0 50 50" style="animation: rotate 1.5s linear infinite;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#409eff" stroke-width="3" stroke-dasharray="90 150" stroke-linecap="round" />
        </svg>
        <span style="color: #409eff; font-size: 14px;">自定义加载动画...</span>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

const data = [
  { id: 1, name: 'Test1', sex: 'Man', age: 28, address: 'test abc' },
  { id: 2, name: 'Test2', sex: 'Women', age: 22, address: 'Guangzhou' }
]

const columns = [
  { prop: 'name', label: 'Name', sortable: true },
  { prop: 'sex', label: 'Sex' },
  { prop: 'age', label: 'Age' },
  { prop: 'address', label: 'Address' }
]
</${_S}>`

const jsSlotLoading = toJs(tsSlotLoading)

const tsAsyncLoading = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="fetchData" :loading="loading">
      {{ loading ? '加载中...' : '请求数据' }}
    </yh-button>
  </div>
  <yh-table
    :data="data"
    :columns="columns"
    :loading="loading"
    border
    show-index
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const data = ref<Record<string, unknown>[]>([])

const fetchData = () => {
  loading.value = true
  data.value = []
  // 模拟 2s 接口请求
  setTimeout(() => {
    data.value = [
      { id: 1, name: '张三', dept: '技术部', position: '前端工程师', salary: 15000 },
      { id: 2, name: '李四', dept: '产品部', position: '产品经理', salary: 18000 },
      { id: 3, name: '王五', dept: '设计部', position: 'UI 设计师', salary: 14000 },
      { id: 4, name: '赵六', dept: '运营部', position: '运营总监', salary: 22000 },
      { id: 5, name: '钱七', dept: '市场部', position: '市场经理', salary: 16000 }
    ]
    loading.value = false
  }, 2000)
}

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'position', label: '职位' },
  { prop: 'salary', label: '薪资', width: 120 }
]
</${_S}>`

const jsAsyncLoading = toJs(tsAsyncLoading)
</script>

## 基础用法

通过设置 `loading` 属性可以使用自带的加载效果。

<DemoBlock title="基础 Loading" :ts-code="tsBasicLoading" :js-code="jsBasicLoading">
  <div style="margin-bottom: 12px;">
    <label style="cursor: pointer; user-select: none;">
      <input type="checkbox" v-model="basicLoading" /> 显示 Loading
    </label>
  </div>
  <yh-table
    :data="basicData"
    :columns="basicColumns"
    :loading="basicLoading"
    border
    show-index
  />
</DemoBlock>

## 修改加载中图标及文字

通过对象形式传入 `loading`，可自定义加载文字。设置 `{ visible: true, text: '...' }` 即可显示自定义文字。

<DemoBlock title="自定义文字" :ts-code="tsCustomTextLoading" :js-code="jsCustomTextLoading">
  <yh-table
    :data="[]"
    :columns="basicColumns"
    :loading="{ visible: true, text: '正在拼命加载中...' }"
    border
    show-index
  />
</DemoBlock>

## 自定义加载中插槽

通过 `#loading` 插槽可以完全自定义加载中的展示内容。

<DemoBlock title="自定义插槽" :ts-code="tsSlotLoading" :js-code="jsSlotLoading">
  <yh-table
    :data="basicData.slice(0, 2)"
    :columns="basicColumns"
    :loading="slotLoading"
    border
    show-index
  >
    <template #loading>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px;">
        <svg width="40" height="40" viewBox="0 0 50 50" style="animation: yh-table-spin 1.5s linear infinite;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#409eff" stroke-width="3" stroke-dasharray="90 150" stroke-linecap="round" />
        </svg>
        <span style="color: #409eff; font-size: 14px;">自定义加载动画...</span>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## 异步请求

实际业务中，`loading` 通常与异步数据请求配合使用。请求开始时设为 `true`，请求结束后设为 `false`。

<DemoBlock title="异步请求 Loading" :ts-code="tsAsyncLoading" :js-code="jsAsyncLoading">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="fetchData" :loading="asyncLoading">
      {{ asyncLoading ? '加载中...' : '请求数据' }}
    </yh-button>
  </div>
  <yh-table
    :data="asyncData"
    :columns="asyncColumns"
    :loading="asyncLoading"
    border
    show-index
  />
</DemoBlock>

## API

### Loading 属性

`loading` 属性支持 `boolean` 或对象两种传入方式。

| 用法 | 说明 | 类型 |
| --- | --- | --- |
| `:loading="true"` | 显示默认加载效果 | `boolean` |
| `:loading="{ visible, text }"` | 对象形式，可配置文字等 | `TableLoadingConfig` |

### TableLoadingConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示加载状态 | `boolean` | `false` |
| text | 加载提示文字 | `string` | — |
| icon | 自定义加载图标组件 | `Component \| string` | — |
| background | 遮罩背景色 | `string` | `rgba(255, 255, 255, 0.8)` |
| render | 完全自定义渲染函数 | `() => VNode` | — |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| loading | 自定义加载中的展示内容，优先级高于 `loading` 对象配置 |

### 注意事项

1. **简写用法**：`:loading="true"` 等价于 `:loading="{ visible: true }"`。
2. **插槽优先**：当同时使用 `#loading` 插槽和 `loading` 对象配置时，插槽的内容优先展示。
3. **遮罩层级**：加载遮罩的 `z-index` 为 20，确保覆盖在表格内容之上。
4. **配合请求**：建议在发起异步请求前设置 `loading = true`，在请求完成（成功或失败）后设置 `loading = false`。

