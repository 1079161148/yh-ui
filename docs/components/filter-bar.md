<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ─── 基础用法 ─────────────────────────────────────────────────────────────────
const sort = ref({ key: 'default', order: 'desc' })
const filterValue = ref({})
const sorts = [
  { key: 'default', label: '综合' },
  { key: 'sales', label: '销量' },
  { key: 'price', label: '价格' }
]
const filters = [
  {
    key: 'brand',
    label: '品牌',
    type: 'checkbox',
    options: [
      { label: '华为', value: 'huawei' },
      { label: '苹果', value: 'apple' },
      { label: '小米', value: 'xiaomi' }
    ]
  }
]

const tsBasic = `<${_T}>
  <yh-filter-bar
    v-model:sort="sort"
    v-model:filter-value="filterValue"
    :sorts="sorts"
    :filters="filters"
  />
<\/template>

<${_S} setup lang="ts">
import { ref } from 'vue'

const sort = ref({ key: 'default', order: 'desc' })
const filterValue = ref({})

const sorts = [
  { key: 'default', label: '综合' },
  { key: 'sales', label: '销量' },
  { key: 'price', label: '价格' }
]

const filters = [
  {
    key: 'brand',
    label: '品牌',
    type: 'checkbox',
    options: [
      { label: '华为', value: 'huawei' },
      { label: '苹果', value: 'apple' },
      { label: '小米', value: 'xiaomi' }
    ]
  }
]
<\/script>`

const jsBasic = toJs(tsBasic)

// ─── 内联模式 ─────────────────────────────────────────────────────────────────
const inlineFilterValue = ref({ service: 'fast' })
const inlineFilters = [
  {
    key: 'service',
    label: '服务',
    type: 'radio',
    options: [
      { label: '极速达', value: 'fast' },
      { label: '满包邮', value: 'free' }
    ]
  }
]

const tsInline = `<${_T}>
  <yh-filter-bar
    v-model:filter-value="filterValue"
    :filters="filters"
    :filter-in-panel="false"
    :show-all="false"
  />
<\/template>

<${_S} setup lang="ts">
import { ref } from 'vue'

const filterValue = ref({ service: 'fast' })
const filters = [
  {
    key: 'service',
    label: '服务',
    type: 'radio',
    options: [
      { label: '极速达', value: 'fast' },
      { label: '满包邮', value: 'free' }
    ]
  }
]
<\/script>`

const jsInline = toJs(tsInline)

// ─── 高级电商示例 ──────────────────────────────────────────────────────────────
const advSort = ref({ key: 'default', order: 'desc' })
const advFilter = ref({ minPrice: null, maxPrice: null })
const advViewType = ref<'list'|'grid'>('list')
const advSorts = [
  { key: 'default', label: '综合' },
  { key: 'sales', label: '销量' }
]
const advFilters = [
  {
    key: 'price',
    label: '价格区间',
    type: 'custom'
  }
]

const tsAdv = `<${_T}>
  <div style="background: #f5f5f5; padding: 0; border-radius: 8px; height: 460px; position: relative; display: flex; flex-direction: column;">
    <!-- Top FilterBar -->
    <yh-filter-bar
      v-model:sort="sort"
      v-model:filter-value="filter"
      v-model:viewType="viewType"
      :sorts="sorts"
      :filters="filters"
      show-view-toggle
      @openFilter="onOpenFilter"
      @reset-panel="onResetPanel"
      style="flex-shrink: 0;"
    >
      <template #panel-content="{ filter: currentFilter, value }">
        <div v-if="currentFilter.key === 'price'" style="padding: 10px; display: flex; align-items: center;">
          <input type="number" placeholder="Min" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" 
            :value="value[currentFilter.key]?.minPrice ?? ''" 
            @input="e => { value[currentFilter.key] = value[currentFilter.key] || {}; value[currentFilter.key].minPrice = e.target.value === '' ? '' : Number(e.target.value) }" 
            @blur="validatePrice(value[currentFilter.key] || {})" />
          <span style="margin: 0 8px;">-</span>
          <input type="number" placeholder="Max" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" 
            :value="value[currentFilter.key]?.maxPrice ?? ''" 
            @input="e => { value[currentFilter.key] = value[currentFilter.key] || {}; value[currentFilter.key].maxPrice = e.target.value === '' ? '' : Number(e.target.value) }" 
            @blur="validatePrice(value[currentFilter.key] || {})" />
        </div>
      </template>
    </yh-filter-bar>

    <!-- Mock Product Area -->
    <div style="flex: 1; overflow-y: auto; padding: 12px;">
      <div :style="{ display: viewType === 'grid' ? 'grid' : 'flex', gridTemplateColumns: viewType === 'grid' ? '1fr 1fr' : 'none', flexDirection: viewType === 'list' ? 'column' : 'row', gap: '12px' }">
        <div v-for="i in 4" :key="i" :style="{ background: '#fff', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: viewType === 'grid' ? 'column' : 'row', alignItems: viewType === 'grid' ? 'flex-start' : 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }">
          <div :style="{ width: viewType === 'grid' ? '100%' : '60px', height: viewType === 'grid' ? '120px' : '60px', background: '#eee', borderRadius: '4px', flexShrink: 0 }"></div>
          <div style="flex: 1; width: 100%;">
            <div style="height: 14px; background: #e0e0e0; width: 80%; margin-bottom: 8px; border-radius: 2px;"></div>
            <div style="height: 12px; background: #f0f0f0; width: 50%; border-radius: 2px;"></div>
          </div>
        </div>
      </div>
      <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
        <p>Sort Status: {{ sort }} | Filter Status: {{ filter }}</p>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const sort = ref({ key: 'default', order: 'desc' })
const filter = ref({})
const viewType = ref('list')
const sorts = [{ key: 'default', label: 'Summary' }, { key: 'sales', label: 'Sales' }]
const filters = [{ key: 'price', label: 'Price Range', type: 'custom' }]

const validatePrice = (val: Record<string, number | null>) => {
  if (val.minPrice !== null && val.maxPrice !== null && val.minPrice > val.maxPrice) {
    const temp = val.minPrice
    val.minPrice = val.maxPrice
    val.maxPrice = temp
  }
}

const onResetPanel = (f: Record<string, unknown>, curr: Record<string, number | null>) => {
  if (f.key === 'price') {
    curr.minPrice = null
    curr.maxPrice = null
  }
}

const onOpenFilter = () => { alert('Open Professional Drawer Popup!') }
</${_S}>`

const jsAdv = toJs(tsAdv)
const validatePrice = (val: Record<string, number | null>) => {
  if (val.minPrice !== null && val.maxPrice !== null && val.minPrice > val.maxPrice) {
    const temp = val.minPrice
    val.minPrice = val.maxPrice
    val.maxPrice = temp
  }
}
const onOpenAdvancedFilter = () => { alert('此处可唤起高级侧边抽屉 (Drawer) 进行深层次全维筛选！') }

const onResetPanel = (filter: Record<string, unknown>, currentValues: Record<string, number | null>) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}

// --- Nuxt Demo 状态 (解耦避免干扰) ---
const nuxtSort = ref({ key: 'default', order: 'desc' })
const nuxtFilter = ref({ minPrice: null, maxPrice: null })
const nuxtSorts = JSON.parse(JSON.stringify(advSorts))
const nuxtFilters = JSON.parse(JSON.stringify(advFilters))
const onResetNuxtPanel = (filter: Record<string, unknown>, currentValues: Record<string, number | null>) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}
const tsNuxt = `<${_T}>
  <yh-filter-bar
    v-model:sort="nuxtSort"
    v-model:filter-value="nuxtFilter"
    :sorts="nuxtSorts"
    :filters="nuxtFilters"
    @reset-panel="onResetNuxtPanel"
  >
    <template #panel-content="{ filter, value }">
      <div v-if="filter.key === 'price'" style="padding: 15px; display: flex; align-items: center; justify-content: center;">
        <input type="number" placeholder="Min" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.minPrice" />
        <span style="margin: 0 10px;">-</span>
        <input type="number" placeholder="Max" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.maxPrice" />
      </div>
    </template>
  </yh-filter-bar>

  <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
    <p>当前排序: {{ nuxtSort }} | 当前筛选: {{ nuxtFilter }}</p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const nuxtSort = ref({ key: 'default', order: 'desc' })
const nuxtFilter = ref({})
const nuxtSorts = [
  { key: 'default', label: '综合' },
  { key: 'sales', label: '销量' }
]
const nuxtFilters = [
  { key: 'price', label: '价格区间', type: 'custom' }
]

const onResetNuxtPanel = (filter: Record<string, unknown>, currentValues: Record<string, number | null>) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}
</${_S}>`

const jsNuxt = `<${_T}>
  <yh-filter-bar
    v-model:sort="nuxtSort"
    v-model:filter-value="nuxtFilter"
    :sorts="nuxtSorts"
    :filters="nuxtFilters"
    @reset-panel="onResetNuxtPanel"
  >
    <template #panel-content="{ filter, value }">
      <div v-if="filter.key === 'price'" style="padding: 15px; display: flex; align-items: center; justify-content: center;">
        <input type="number" placeholder="Min" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.minPrice" />
        <span style="margin: 0 10px;">-</span>
        <input type="number" placeholder="Max" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.maxPrice" />
      </div>
    </template>
  </yh-filter-bar>

  <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
    <p>当前排序: {{ nuxtSort }} | 当前筛选: {{ nuxtFilter }}</p>
  </div>
</${_T}>

<${_S} setup>
import { ref } from 'vue'

const nuxtSort = ref({ key: 'default', order: 'desc' })
const nuxtFilter = ref({})
const nuxtSorts = [
  { key: 'default', label: '综合' },
  { key: 'sales', label: '销量' }
]
const nuxtFilters = [
  { key: 'price', label: '价格区间', type: 'custom' }
]

const onResetNuxtPanel = (filter, currentValues) => {
  if (filter.key === 'price') {
    currentValues.minPrice = null
    currentValues.maxPrice = null
  }
}
</${_S}>`
</script>

# FilterBar 筛选栏

电商列表页常用的筛选与排序工具栏，支持吸顶、排序切换、下拉筛选面板及内联筛选模式。

## 基础用法

设置 `sorts` 和 `filters` 即可开启基础的排序和筛选功能。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="background: #f5f5f5; padding: 0; border-radius: 8px; height: 360px; position: relative;">
    <yh-filter-bar
      v-model:sort="sort"
      v-model:filter-value="filterValue"
      :sorts="sorts"
      :filters="filters"
    />
    <div style="margin-top: 20px; padding: 0 16px; font-size: 14px; color: #666;">
      <p>当前排序: {{ sort }}</p>
      <p>当前筛选: {{ filterValue }}</p>
    </div>
  </div>
</DemoBlock>

## 内联筛选模式

如果不希望使用下拉面板，可以将 `filter-in-panel` 设置为 `false`。

<DemoBlock title="内联模式" :ts-code="tsInline" :js-code="jsInline">
  <yh-filter-bar
    v-model:filter-value="inlineFilterValue"
    :filters="inlineFilters"
    :filter-in-panel="false"
    :show-all="false"
  />
</DemoBlock>

## 高级电商布局 (自定义抽屉 & 视图切换)

在大型电商或商品密集型应用中，最右侧的按钮常抛出自定义弹窗事件，而且通常附带 **商品列表/网格切换按钮** 与 **价格输入框面板**。组件底层均已预留支持。

<DemoBlock title="高级布局与定制" :ts-code="tsAdv" :js-code="jsAdv">
  <div style="background: #f5f5f5; padding: 0; border-radius: 8px; height: 460px; position: relative; display: flex; flex-direction: column;">
    <yh-filter-bar
      v-model:sort="advSort"
      v-model:filter-value="advFilter"
      v-model:viewType="advViewType"
      :sorts="advSorts"
      :filters="advFilters"
      show-view-toggle
      @openFilter="onOpenAdvancedFilter"
      @reset-panel="onResetPanel"
      style="flex-shrink: 0;"
    >
      <template #panel-content="{ filter, value }">
        <div v-if="filter.key === 'price'" style="padding: 10px; display: flex; align-items: center; justify-content: center;">
          <input type="number" placeholder="最低价" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" v-model="value.minPrice" @blur="validatePrice(value)" />
          <span style="margin: 0 8px;">-</span>
          <input type="number" placeholder="最高价" style="border: 1px solid #ccc; outline: none; border-radius: 4px; padding: 4px 8px; width: 80px;" v-model="value.maxPrice" @blur="validatePrice(value)" />
        </div>
      </template>
    </yh-filter-bar>
    <div style="flex: 1; overflow-y: auto; padding: 12px;">
      <div :style="{ display: advViewType === 'grid' ? 'grid' : 'flex', gridTemplateColumns: advViewType === 'grid' ? '1fr 1fr' : 'none', flexDirection: advViewType === 'list' ? 'column' : 'row', gap: '12px' }">
        <div v-for="i in 4" :key="i" :style="{ background: '#fff', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: advViewType === 'grid' ? 'column' : 'row', alignItems: advViewType === 'grid' ? 'flex-start' : 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }">
          <div :style="{ width: advViewType === 'grid' ? '100%' : '60px', height: advViewType === 'grid' ? '120px' : '60px', background: '#eee', borderRadius: '4px', flexShrink: 0 }"></div>
          <div style="flex: 1; width: 100%;">
            <div style="height: 14px; background: #e0e0e0; width: 80%; margin-bottom: 8px; border-radius: 2px;"></div>
            <div style="height: 12px; background: #f0f0f0; width: 50%; border-radius: 2px;"></div>
          </div>
        </div>
      </div>
      <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
        <p>当前排序: {{ advSort }} | 当前筛选: {{ advFilter }}</p>
      </div>
    </div>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

本组件完美支持 Nuxt 3/4 SSR 数据在服务端的预渲染。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="background: #fff; padding: 0; border-radius: 8px; height: 320px; box-shadow: 0 2px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
    <yh-filter-bar
      v-model:sort="nuxtSort"
       v-model:filter-value="nuxtFilter"
      :sorts="nuxtSorts"
      :filters="nuxtFilters"
      @reset-panel="onResetNuxtPanel"
    >
      <template #panel-content="{ filter, value }">
        <div v-if="filter.key === 'price'" style="padding: 15px; display: flex; align-items: center; justify-content: center;">
          <input type="number" placeholder="Min" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.minPrice" />
          <span style="margin: 0 10px;">-</span>
          <input type="number" placeholder="Max" style="border: 1px solid #ddd; padding: 4px 8px; width: 80px; border-radius: 4px;" v-model="value.maxPrice" />
        </div>
      </template>
    </yh-filter-bar>
    <div style="margin-top: 16px; font-size: 12px; color: #999; text-align: center;">
      <p>当前排序: {{ nuxtSort }} | 当前筛选: {{ nuxtFilter }}</p>
    </div>
  </div>
</DemoBlock>

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    // 默认已自动按需引入，无需特殊配置
  }
})
```

## API

### Props

| 参数               | 说明                              | 类型                     | 默认值                       |
| ------------------ | --------------------------------- | ------------------------ | ---------------------------- |
| sorts              | 排序配置列表                      | `FilterSortItem[]`       | `[]`                         |
| filters            | 筛选器配置列表                    | `FilterItem[]`           | `[]`                         |
| sort               | 当前排序状态                      | `FilterSort`             | `{ key: null, order: null }` |
| filter-value       | 当前筛选值                        | `FilterValue`            | `{}`                         |
| view-type          | 视图网格布局 (`v-model:viewType`) | `'list' \| 'grid'`       | `'list'`                     |
| show-all           | 是否展示「全部」tab               | `boolean`                | `true`                       |
| sticky             | 是否吸顶                          | `boolean`                | `false`                      |
| filter-in-panel    | 是否在弹出面板中展示筛选器        | `boolean`                | `true`                       |
| show-global-filter | 是否展示最右侧全局筛选漏斗按钮    | `boolean`                | `true`                       |
| show-view-toggle   | 是否展示列表/网格视图切换图标     | `boolean`                | `false`                      |
| sticky-offset      | 吸顶时的偏移距离 (px)             | `number`                 | `0`                          |
| theme-overrides    | 自定义主题 CSS 变量覆盖           | `Record<string, string>` | `{}`                         |

### Events (事件)

| 事件名        | 说明                         | 回调参数                                 |
| ------------- | ---------------------------- | ---------------------------------------- |
| sort-change   | 排序状态变化时触发           | `(sort: FilterSort)`                     |
| filter-change | 筛选值变化时触发             | `(val: FilterValue)`                     |
| view-change   | 视图模式切换时触发           | `(val: 'list' \| 'grid')`                |
| reset         | 面板点击全局重置时触发       | `-`                                      |
| reset-panel   | 单个筛选面板内点击重置时触发 | `(filter: FilterItem, val: FilterValue)` |
| confirm       | 点击确认筛选时触发           | `(val: FilterValue)`                     |
| open-filter   | 点击最右侧漏斗图标触发       | `-`                                      |

### Slots (插槽)

| 插槽名        | 说明                     | 参数                        |
| ------------- | ------------------------ | --------------------------- |
| panel-content | 完全自定义筛选面板内容   | `{ filter, value, toggle }` |
| view-icon     | 自定义列表/网格切换图标  | `{ viewType }`              |
| filter-icon   | 自定义最右侧筛选漏斗图标 | `-`                         |
| extra         | 自定义右侧扩展区域内容   | `-`                         |

### Expose

当前组件未暴露公开实例方法或属性。

### 主题变量 (CSS Variables)

| 变量名                                   | 默认值                              | 说明                 |
| ---------------------------------------- | ----------------------------------- | -------------------- |
| `--yh-filter-bar-bg`                     | `var(--yh-bg-color)`                | 根节点背景色         |
| `--yh-filter-bar-border`                 | `var(--yh-border-color-lighter)`    | 根节点边框颜色       |
| `--yh-filter-bar-height`                 | `44px`                              | 工具栏高度           |
| `--yh-filter-bar-tab-color`              | `var(--yh-text-color-regular)`      | 未激活标签文字颜色   |
| `--yh-filter-bar-tab-active-color`       | `var(--yh-color-primary)`           | 激活标签文字颜色     |
| `--yh-filter-bar-tab-active-bg`          | `var(--yh-color-primary-light-9)`   | 激活标签背景         |
| `--yh-filter-bar-tab-radius`             | `var(--yh-radius-base)`             | 标签圆角             |
| `--yh-filter-bar-badge-bg`               | `var(--yh-color-danger)`            | 角标背景色           |
| `--yh-filter-bar-panel-bg`               | `var(--yh-bg-color)`                | 面板背景色           |
| `--yh-filter-bar-panel-shadow`           | `0 4px 20px var(--yh-shadow-color)` | 面板阴影             |
| `--yh-filter-bar-panel-opt-bg`           | `var(--yh-fill-color-light)`        | 面板选项默认背景     |
| `--yh-filter-bar-panel-opt-active-bg`    | `var(--yh-color-primary-light-9)`   | 面板选项激活背景     |
| `--yh-filter-bar-panel-opt-active-color` | `var(--yh-color-primary)`           | 面板选项激活文字颜色 |
| `--yh-filter-bar-panel-opt-active-border` | `var(--yh-color-primary)`          | 面板选项激活边框颜色 |
| `--yh-filter-bar-z-index`                | `100`                               | 根节点层级           |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhFilterBarProps` | 组件 Props 类型 |
| `YhFilterBarEmits` | 组件事件类型 |
| `YhFilterBarSlots` | 组件插槽类型 |
| `YhFilterSortOrder` | 排序方向联合类型 |
| `YhFilterSortItem` | 排序项类型 |
| `YhFilterType` | 筛选类型联合类型 |
| `YhFilterOption` | 筛选选项类型 |
| `YhFilterItem` | 筛选项类型 |
| `YhFilterValue` | 筛选值类型 |
| `YhFilterSort` | 排序状态类型 |
| `YhFilterBarInstance` | 组件实例类型 |
