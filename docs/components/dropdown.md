<script setup lang="ts">
import { ref, computed } from 'vue'

const handleCommand = (command: string) => {
  console.log('点击了:', command)
}

const tsBasic = `<template>
  <yh-dropdown :show-arrow="false" @command="handleCommand">
    <span style="cursor: pointer; color: var(--yh-color-primary);">下拉菜单 <yh-icon name="arrow-down" /></span>
    <template #dropdown>
      <yh-dropdown-menu>
        <yh-dropdown-item command="edit">编辑</yh-dropdown-item>
        <yh-dropdown-item command="copy">复制</yh-dropdown-item>
        <yh-dropdown-item command="delete">删除</yh-dropdown-item>
      </yh-dropdown-menu>
    </template>
  </yh-dropdown>
</template>

<script setup lang="ts">
const handleCommand = (command: string) => {
  console.log('点击了:', command)
}
<\/script>`

const jsBasic = tsBasic
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsItems = `<template>
  <yh-dropdown :items="items" :show-arrow="false" @command="handleCommand">
    <span style="cursor: pointer;">快捷配置模式 <yh-icon name="arrow-down" /></span>
  </yh-dropdown>
</template>

<script setup lang="ts">
const items = [
  { key: 'edit', label: '编辑', icon: 'edit' },
  { key: 'copy', label: '复制', icon: 'copy' },
  { key: 'delete', label: '删除', icon: 'delete', divided: true }
]

const handleCommand = (command: string) => {
  console.log('点击了:', command)
}
<\/script>`

const jsItems = tsItems
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsTrigger = `<template>
  <div style="display: flex; gap: 80px;">
    <div>
      <div style="color: #909399; font-size: 12px; margin-bottom: 8px;">hover to trigger</div>
      <yh-dropdown trigger="hover" :items="items" :show-arrow="false">
        <span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
      </yh-dropdown>
    </div>
    
    <div>
      <div style="color: #909399; font-size: 12px; margin-bottom: 8px;">click to trigger</div>
      <yh-dropdown trigger="click" :items="items" :show-arrow="false">
        <span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
      </yh-dropdown>
    </div>
    
    <div>
      <div style="color: #909399; font-size: 12px; margin-bottom: 8px;">right click to trigger</div>
      <yh-dropdown trigger="contextmenu" :items="items" :show-arrow="false">
        <span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
      </yh-dropdown>
    </div>
  </div>
</template>`

const jsTrigger = tsTrigger
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsSplitButton = `<template>
  <div style="display: flex; gap: 16px;">
    <yh-dropdown 
      split-button 
      type="primary" 
      :items="splitItems"
      @click="handleClick"
      @command="handleCommand"
    >
      Dropdown List
    </yh-dropdown>
    <yh-dropdown 
      split-button 
      type="primary"
      plain
      :items="splitItems"
      @click="handleClick"
      @command="handleCommand"
    >
      Dropdown List
    </yh-dropdown>
  </div>
</template>

<script setup lang="ts">
const splitItems = [
  { key: 'save', label: '保存' },
  { key: 'saveAs', label: '另存为' },
  { key: 'export', label: '导出', divided: true }
]

const handleClick = () => {
  console.log('点击了主按钮')
}

const handleCommand = (command: string) => {
  console.log('选择了:', command)
}
<\/script>`

const jsSplitButton = tsSplitButton
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsDisabled = `<template>
  <yh-dropdown :items="disabledItems">
    <yh-button>包含禁用项</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
const disabledItems = [
  { key: 'edit', label: '编辑' },
  { key: 'copy', label: '复制', disabled: true },
  { key: 'delete', label: '删除' }
]
<\/script>`

const jsDisabled = tsDisabled
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsPlacement = `<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-dropdown placement="top-start" :items="items">
      <yh-button plain>topStart</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="top" :items="items">
      <yh-button plain>top</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="top-end" :items="items">
      <yh-button plain>topEnd</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="bottom-start" :items="items">
      <yh-button plain>bottomStart</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="bottom" :items="items">
      <yh-button plain>bottom</yh-button>
    </yh-dropdown>
    <yh-dropdown placement="bottom-end" :items="items">
      <yh-button plain>bottomEnd</yh-button>
    </yh-dropdown>
  </div>
</template>`

const jsPlacement = tsPlacement
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsNuxt = `<template>
  <yh-dropdown :items="menuItems" @command="handleCommand">
    <yh-button type="primary">Nuxt 完美支持</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
const menuItems = [
  { key: 'profile', label: '个人中心' },
  { key: 'settings', label: '设置' },
  { key: 'logout', label: '退出登录', divided: true }
]

const handleCommand = (command: string) => {
  navigateTo(\`/\${command}\`)
}
<\/script>`

const jsNuxt = tsNuxt
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const items = [
  { key: 'edit', label: '编辑', icon: 'edit' },
  { key: 'copy', label: '复制', icon: 'copy' },
  { key: 'delete', label: '删除', icon: 'delete', divided: true }
]

const splitItems = [
  { key: 'save', label: '保存' },
  { key: 'saveAs', label: '另存为' },
  { key: 'export', label: '导出', divided: true }
]

const disabledItems = [
  { key: 'edit', label: '编辑' },
  { key: 'copy', label: '复制', disabled: true },
  { key: 'delete', label: '删除' }
]

const menuItems = [
  { key: 'profile', label: '个人中心' },
  { key: 'settings', label: '设置' },
  { key: 'logout', label: '退出登录', divided: true }
]

// 危险项示例数据
const dangerItems = [
  { key: 'edit', label: '编辑', icon: 'edit' },
  { key: 'copy', label: '复制', icon: 'copy' },
  { key: 'delete', label: '删除', icon: 'delete', danger: true, divided: true }
]

// 加载状态
const loading = ref(false)
const loadingItems = ref<any[]>([])

const simulateLoading = async () => {
  loading.value = true
  loadingItems.value = []
  await new Promise(resolve => setTimeout(resolve, 1500))
  loadingItems.value = [
    { key: 'item1', label: '加载的数据 1' },
    { key: 'item2', label: '加载的数据 2' },
    { key: 'item3', label: '加载的数据 3' }
  ]
  loading.value = false
}

// 可勾选示例 - 筛选场景
const checkableItems = ref([
  { key: 'status1', label: '待处理', checked: true },
  { key: 'status2', label: '进行中', checked: false },
  { key: 'status3', label: '已完成', checked: true },
  { key: 'status4', label: '已取消', checked: false }
])

const checkedCount = computed(() => checkableItems.value.filter(i => i.checked).length)

const handleCheck = (key: string) => {
  const item = checkableItems.value.find(i => i.key === key)
  if (item) {
    item.checked = !item.checked
  }
}

// 示例代码
const tsDanger = `<template>
  <yh-dropdown :items="items" @command="handleCommand">
    <yh-button>操作</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
const items = [
  { key: 'edit', label: '编辑', icon: 'edit' },
  { key: 'copy', label: '复制', icon: 'copy' },
  { key: 'delete', label: '删除', icon: 'delete', danger: true, divided: true }
]

const handleCommand = (command: string) => {
  if (command === 'delete') {
    // 执行删除操作
  }
}
<\\/script>`

const jsDanger = tsDanger
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsLoading = `<template>
  <yh-dropdown 
    :items="items" 
    :loading="loading"
    trigger="click"
    @show="loadData"
  >
    <yh-button>点击加载数据</yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const items = ref([])

const loadData = async () => {
  loading.value = true
  // 模拟异步加载
  await new Promise(resolve => setTimeout(resolve, 1500))
  items.value = [
    { key: 'item1', label: '加载的数据 1' },
    { key: 'item2', label: '加载的数据 2' },
    { key: 'item3', label: '加载的数据 3' }
  ]
  loading.value = false
}
<\\/script>`

const jsLoading = tsLoading
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')

const tsCheckable = `<template>
  <yh-dropdown 
    :items="filterItems" 
    checkable
    :hide-on-click="false"
    @command="handleCheck"
  >
    <yh-button>
      状态筛选
      <yh-badge v-if="checkedCount > 0" :value="checkedCount" />
    </yh-button>
  </yh-dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const filterItems = ref([
  { key: 'status1', label: '待处理', checked: true },
  { key: 'status2', label: '进行中', checked: false },
  { key: 'status3', label: '已完成', checked: true },
  { key: 'status4', label: '已取消', checked: false }
])

// 统计已选数量
const checkedCount = computed(() => 
  filterItems.value.filter(i => i.checked).length
)

// 切换选中状态
const handleCheck = (key: string) => {
  const item = filterItems.value.find(i => i.key === key)
  if (item) {
    item.checked = !item.checked
  }
}
<\\/script>`

const jsCheckable = tsCheckable
  .replace('lang="ts"', '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')
</script>

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中，节省界面空间。

## 基础用法

通过插槽 `dropdown` 定义下拉菜单内容。该组件支持**插槽回退 (Slot Fallback)** 机制：当提供插槽时，将完全自定义菜单内容；未提供插槽时，将根据 `items` 数据自动生成菜单。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
<div style="padding: 10px 0;">
<yh-dropdown :show-arrow="false" @command="handleCommand">
<span style="cursor: pointer; color: var(--yh-color-primary);">下拉菜单 <yh-icon name="arrow-down" /></span>
<template #dropdown>
<yh-dropdown-menu>
<yh-dropdown-item command="edit">编辑</yh-dropdown-item>
<yh-dropdown-item command="copy">复制</yh-dropdown-item>
<yh-dropdown-item command="delete">删除</yh-dropdown-item>
</yh-dropdown-menu>
</template>
</yh-dropdown>
</div>
</DemoBlock>

## 快捷数据配置

通过 `items` 属性快速配置菜单项，无需使用插槽。

<DemoBlock title="快捷配置模式" :ts-code="tsItems" :js-code="jsItems">
<div style="padding: 10px 0;">
<yh-dropdown :items="items" :show-arrow="false" @command="handleCommand">
<span style="cursor: pointer;"> 快捷配置模式 <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
</DemoBlock>

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 `click` 即可，默认为 `hover`。

<DemoBlock title="触发方式" :ts-code="tsTrigger" :js-code="jsTrigger">
<div style="padding: 20px 0; display: flex; gap: 80px;">
<div>
<div style="color: #909399; font-size: 12px; margin-bottom: 8px;">hover to trigger</div>
<yh-dropdown trigger="hover" :items="items" :show-arrow="false">
<span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
<div>
<div style="color: #909399; font-size: 12px; margin-bottom: 8px;">click to trigger</div>
<yh-dropdown trigger="click" :items="items" :show-arrow="false">
<span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
<div>
<div style="color: #909399; font-size: 12px; margin-bottom: 8px;">right click to trigger</div>
<yh-dropdown trigger="contextmenu" :items="items" :show-arrow="false">
<span style="cursor: pointer;">Dropdown List <yh-icon name="arrow-down" /></span>
</yh-dropdown>
</div>
</div>
</DemoBlock>

## 分割按钮

设置 `split-button` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮。

<DemoBlock title="分割按钮" :ts-code="tsSplitButton" :js-code="jsSplitButton">
<div style="padding: 10px 0; display: flex; gap: 16px;">
<yh-dropdown split-button type="primary" :items="splitItems" @click="() => console.log('主按钮点击')">
Dropdown List
</yh-dropdown>
<yh-dropdown split-button type="primary" plain :items="splitItems" @click="() => console.log('主按钮点击')">
Dropdown List
</yh-dropdown>
</div>
</DemoBlock>

## 禁用菜单项

通过设置 `disabled` 属性禁用指定菜单项。

<DemoBlock title="禁用菜单项" :ts-code="tsDisabled" :js-code="jsDisabled">
<div style="padding: 10px 0;">
<yh-dropdown :items="disabledItems">
<yh-button>包含禁用项</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## 弹出位置

通过 `placement` 属性设置弹出位置。

<DemoBlock title="弹出位置" :ts-code="tsPlacement" :js-code="jsPlacement">
<div style="padding: 20px 0; display: flex; gap: 16px; flex-wrap: wrap;">
<yh-dropdown placement="top-start" :items="items">
<yh-button plain>topStart</yh-button>
</yh-dropdown>
<yh-dropdown placement="top" :items="items">
<yh-button plain>top</yh-button>
</yh-dropdown>
<yh-dropdown placement="top-end" :items="items">
<yh-button plain>topEnd</yh-button>
</yh-dropdown>
<yh-dropdown placement="bottom-start" :items="items">
<yh-button plain>bottomStart</yh-button>
</yh-dropdown>
<yh-dropdown placement="bottom" :items="items">
<yh-button plain>bottom</yh-button>
</yh-dropdown>
<yh-dropdown placement="bottom-end" :items="items">
<yh-button plain>bottomEnd</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## 危险项

通过设置 `danger: true` 使菜单项显示为红色危险样式，常用于删除等破坏性操作。

<DemoBlock title="危险项" :ts-code="tsDanger" :js-code="jsDanger">
<div style="padding: 10px 0;">
<yh-dropdown :items="dangerItems">
<yh-button>操作</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## 加载状态

通过 `loading` 属性显示加载状态，适用于异步加载菜单数据的场景。

<DemoBlock title="加载状态" :ts-code="tsLoading" :js-code="jsLoading">
<div style="padding: 10px 0;">
<yh-dropdown :items="loadingItems" :loading="loading" trigger="click" @show="simulateLoading">
<yh-button>点击加载数据</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## 可勾选模式

通过 `checkable` 属性启用勾选模式，配合 `hide-on-click="false"` 实现多选筛选场景。

<DemoBlock title="可勾选模式" :ts-code="tsCheckable" :js-code="jsCheckable">
<div style="padding: 10px 0;">
<yh-dropdown :items="checkableItems" checkable :hide-on-click="false" @command="handleCheck">
<yh-button>
状态筛选 <span v-if="checkedCount > 0" style="margin-left: 4px; background: var(--yh-color-primary); color: white; font-size: 12px; padding: 0 6px; border-radius: 10px;">{{ checkedCount }}</span>
</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

## 在 Nuxt 中使用

`Dropdown` 组件完全支持 Nuxt 3/4 的 SSR 渲染。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
<div style="padding: 10px 0;">
<yh-dropdown :items="menuItems">
<yh-button type="primary">Nuxt 完美支持</yh-button>
</yh-dropdown>
</div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 完美支持服务端渲染 (SSR)，无水合错误
- ✅ 支持键盘导航
- ✅ 弹出层自动 Teleport 至 body
- ✅ 毛玻璃效果自动适配

## API

### Dropdown Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `'hover' \| 'click' \| 'contextmenu'` | `'hover'` |
| placement | 弹出位置 | `Placement` | `'bottom'` |
| visible | 是否显示（支持 v-model） | `boolean \| null` | `null` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-after | 延迟显示时间 (ms) | `number` | `0` |
| hide-after | 延迟隐藏时间 (ms) | `number` | `150` |
| z-index | 弹出层层级 | `number` | `2000` |
| hide-on-click | 是否在点击菜单项后隐藏 | `boolean` | `true` |
| items | 菜单项数据（快捷配置模式） | `DropdownItemData[]` | `[]` |
| loading | 是否加载中 | `boolean` | `false` |
| empty-text | 空状态文本 | `string` | `'暂无数据'` |
| checkable | 是否可勾选 | `boolean` | `false` |
| max-height | 菜单最大高度 | `string \| number` | `''` |
| teleported | 是否挂载至 body | `boolean` | `true` |
| popper-class | 弹出层自定义类名 | `string` | `''` |
| popper-style | 弹出层自定义样式 | `CSSProperties` | `{}` |
| split-button | 分割按钮模式 | `boolean` | `false` |
| type | 按钮类型（splitButton 模式） | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| ''` | `''` |
| size | 按钮尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| plain | 朴素按钮样式（splitButton 模式） | `boolean` | `false` |
| show-arrow | 是否显示下拉箭头图标 | `boolean` | `true` |
| popper-arrow | 是否显示弹出框小三角 | `boolean` | `true` |
| offset | 偏移量 | `[number, number]` | `[0, 8]` |
| loop | Tab 键循环导航 | `boolean` | `true` |
| tabindex | Tab 索引 | `number \| string` | `0` |

### DropdownItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| command | 指令/命令值 | `string \| number \| object` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| divided | 是否显示分割线 | `boolean` | `false` |
| icon | 图标 | `string` | `''` |
| danger | 是否为危险项 | `boolean` | `false` |
| checked | 是否选中（需开启 checkable） | `boolean` | `false` |

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| command | 点击菜单项 | `(command: string \| number \| object)` |
| update:visible | 可见性变化 | `(visible: boolean)` |
| show | 菜单显示 | - |
| hide | 菜单隐藏 | - |
| click | 点击触发器（splitButton 模式） | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| dropdown | 下拉菜单内容（使用 DropdownMenu/DropdownItem） |
| empty | 空状态内容（无菜单项时显示） |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| show | 手动显示下拉菜单 | `() => void` |
| hide | 手动隐藏下拉菜单 | `() => void` |
| visible | 当前可见状态 | `Ref<boolean>` |

### DropdownItemData 类型

```typescript
interface DropdownItemData {
  key: string | number
  label: string
  icon?: string
  disabled?: boolean
  divided?: boolean
  class?: string
  children?: DropdownItemData[]
  danger?: boolean    // 是否为危险项（红色样式）
  checked?: boolean   // 是否选中（checkable 模式）
}
```

### 主题变量 (CSS Variables)

所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| `--yh-dropdown-text-color` | `var(--yh-text-color-primary)` | 菜单文字颜色 |
| `--yh-dropdown-bg-color` | `var(--yh-bg-color-overlay)` | 弹出层背景色 |
| `--yh-dropdown-border-color` | `var(--yh-border-color-light)` | 边框/分割线颜色 |
| `--yh-dropdown-hover-bg` | `var(--yh-color-primary-light-9)` | 菜单项 hover 背景 |
| `--yh-dropdown-active-bg` | `var(--yh-color-primary-light-8)` | 菜单项 active 背景 |
| `--yh-dropdown-disabled-color` | `var(--yh-text-color-placeholder)` | 禁用项文字颜色 |
| `--yh-dropdown-danger-color` | `var(--yh-color-danger)` | 危险项文字颜色 |
| `--yh-dropdown-danger-hover-bg` | `var(--yh-color-danger-light-9)` | 危险项 hover 背景 |
| `--yh-dropdown-shadow` | `var(--yh-shadow-lg)` | 弹出层阴影 |
| `--yh-dropdown-radius` | `var(--yh-radius-md)` | 弹出层圆角 |

---

**提示**: `Dropdown` 组件融合了 Element Plus、Ant Design 和 Naive UI 的优秀设计，支持快捷数据配置、分割按钮、键盘导航、危险项样式、加载状态、可勾选模式等丰富功能。
