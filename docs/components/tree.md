# Tree 树形控件

`YhTree` 用于展示层级数据，支持复选联动、懒加载、过滤、拖拽和虚拟滚动等能力。

<script setup lang="ts">
import { ref } from 'vue'
import type { TreeNode, TreeNodeData, YhTreeInstance } from '@yh-ui/components'

const scriptClose = '</' + 'script>'

const basicData: TreeNodeData[] = [
  {
    key: 'guide',
    label: 'Guides',
    children: [
      { key: 'guide-install', label: 'Installation' },
      { key: 'guide-theme', label: 'Theme' }
    ]
  },
  {
    key: 'components',
    label: 'Components',
    children: [{ key: 'components-tree', label: 'Tree' }]
  }
]

const checkboxData = ref<TreeNodeData[]>([
  {
    key: 'team-a',
    label: 'Team A',
    children: [
      { key: 'team-a-1', label: 'Member A-1' },
      { key: 'team-a-2', label: 'Member A-2', disabled: true }
    ]
  },
  {
    key: 'team-b',
    label: 'Team B',
    children: [
      { key: 'team-b-1', label: 'Member B-1' },
      { key: 'team-b-2', label: 'Member B-2' }
    ]
  }
])

const lazyData: TreeNodeData[] = [{ key: 'async-root', label: 'Async Root' }]

const filterQuery = ref('')
const filterTreeRef = ref<YhTreeInstance>()
const handleFilter = () => filterTreeRef.value?.filter(filterQuery.value)

const largeData: TreeNodeData[] = Array.from({ length: 300 }).map((_, index) => ({
  key: `virtual-${index}`,
  label: `Virtual Node ${index}`,
  children: [{ key: `virtual-${index}-child`, label: `Child ${index}` }]
}))

const loadNode = (node: TreeNode) =>
  new Promise<TreeNodeData[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: `${node.key}-child`,
          label: `Lazy child of ${node.label}`
        }
      ])
    }, 400)
  })

const tsBasic = [
  `<template>`,
  `  <yh-tree :data="data" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import type { TreeNodeData } from '@yh-ui/components'`,
  ``,
  `const data: TreeNodeData[] = [`,
  `  {`,
  `    key: 'guide',`,
  `    label: 'Guides',`,
  `    children: [`,
  `      { key: 'guide-install', label: 'Installation' },`,
  `      { key: 'guide-theme', label: 'Theme' }`,
  `    ]`,
  `  },`,
  `  { key: 'components', label: 'Components' }`,
  `]`,
  scriptClose
].join('\n')

const tsCheckbox = [
  `<template>`,
  `  <yh-tree`,
  `    :data="data"`,
  `    show-checkbox`,
  `    :default-expanded-keys="['team-a']"`,
  `    :default-checked-keys="['team-b-1']"`,
  `  />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import type { TreeNodeData } from '@yh-ui/components'`,
  ``,
  `const data: TreeNodeData[] = [`,
  `  {`,
  `    key: 'team-a',`,
  `    label: 'Team A',`,
  `    children: [`,
  `      { key: 'team-a-1', label: 'Member A-1' },`,
  `      { key: 'team-a-2', label: 'Member A-2', disabled: true }`,
  `    ]`,
  `  },`,
  `  {`,
  `    key: 'team-b',`,
  `    label: 'Team B',`,
  `    children: [{ key: 'team-b-1', label: 'Member B-1' }]`,
  `  }`,
  `]`,
  scriptClose
].join('\n')

const tsLazy = [
  `<template>`,
  `  <yh-tree :data="data" lazy :load="loadNode" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import type { TreeNode, TreeNodeData } from '@yh-ui/components'`,
  ``,
  `const data: TreeNodeData[] = [{ key: 'async-root', label: 'Async Root' }]`,
  ``,
  `const loadNode = (node: TreeNode) =>`,
  `  new Promise<TreeNodeData[]>((resolve) => {`,
  `    setTimeout(() => {`,
  `      resolve([{ key: node.key + '-child', label: 'Lazy child of ' + node.label }])`,
  `    }, 400)`,
  `  })`,
  scriptClose
].join('\n')

const tsFilter = [
  `<template>`,
  `  <div style="display: flex; flex-direction: column; gap: 12px">`,
  `    <yh-input v-model="query" placeholder="Filter nodes" clearable @input="handleFilter" />`,
  `    <yh-tree ref="treeRef" :data="data" />`,
  `  </div>`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TreeNodeData, YhTreeInstance } from '@yh-ui/components'`,
  ``,
  `const query = ref('')`,
  `const treeRef = ref<YhTreeInstance>()`,
  `const data: TreeNodeData[] = [`,
  `  { key: '1', label: 'Alpha' },`,
  `  { key: '2', label: 'Beta', children: [{ key: '2-1', label: 'Beta Child' }] }`,
  `]`,
  ``,
  `const handleFilter = () => treeRef.value?.filter(query.value)`,
  scriptClose
].join('\n')

const tsVirtual = [
  `<template>`,
  `  <yh-tree :data="data" virtual :height="320" :item-height="30" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import type { TreeNodeData } from '@yh-ui/components'`,
  ``,
  `const data: TreeNodeData[] = Array.from({ length: 300 }).map((_, index) => ({`,
  `  key: 'virtual-' + index,`,
  `  label: 'Virtual Node ' + index,`,
  `  children: [{ key: 'virtual-' + index + '-child', label: 'Child ' + index }]`,
  `}))`,
  scriptClose
].join('\n')

const tsNuxt = [
  `<template>`,
  `  <yh-tree :data="data" show-checkbox :default-expanded-keys="['guide']" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TreeNodeData } from '@yh-ui/components'`,
  ``,
  `const data = ref<TreeNodeData[]>([`,
  `  {`,
  `    key: 'guide',`,
  `    label: 'Guide',`,
  `    children: [{ key: 'guide-install', label: 'Installation' }]`,
  `  }`,
  `])`,
  scriptClose
].join('\n')
</script>

## 基础用法

<DemoBlock title="基础用法" :ts-code="tsBasic">
  <yh-tree :data="basicData" />
</DemoBlock>

## 复选与禁用节点

启用 `show-checkbox` 后可以对节点进行多选；禁用节点会保留展示，但不会响应点击和勾选操作。

<DemoBlock title="复选与禁用节点" :ts-code="tsCheckbox">
  <yh-tree
    :data="checkboxData"
    show-checkbox
    :default-expanded-keys="['team-a']"
    :default-checked-keys="['team-b-1']"
  />
</DemoBlock>

## 懒加载

启用 `lazy` 并传入 `load` 后，组件会在展开节点时按需请求子节点数据。

<DemoBlock title="懒加载" :ts-code="tsLazy">
  <yh-tree :data="lazyData" lazy :load="loadNode" />
</DemoBlock>

## 过滤

调用实例方法 `filter` 可配合默认的标签匹配逻辑，或与 `filter-method` 一起实现自定义过滤。

<DemoBlock title="过滤" :ts-code="tsFilter">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <yh-input v-model="filterQuery" placeholder="Filter nodes" clearable @input="handleFilter" />
    <yh-tree ref="filterTreeRef" :data="checkboxData" />
  </div>
</DemoBlock>

## 虚拟滚动

当节点数量较多时，可启用 `virtual`，并配合 `height` 与 `item-height` 控制渲染窗口。

<DemoBlock title="虚拟滚动" :ts-code="tsVirtual">
  <yh-tree :data="largeData" virtual :height="320" :item-height="30" />
</DemoBlock>

## 自定义渲染与拖拽

`YhTree` 支持 `default`、`icon`、`prefix`、`suffix`、`empty` 插槽，也支持 `draggable` 与完整的拖拽事件链路。需要自定义节点内容、前后缀操作区或拖放排序时，可基于这些插槽与事件扩展业务交互。

## 在 Nuxt 中使用

启用 YH-UI Nuxt 模块后，可直接在页面与组件中使用 `YhTree`。树数据、默认展开状态和空状态可在 SSR 阶段完成首屏渲染；依赖 DOM 的虚拟滚动与拖拽交互会在客户端 hydration 后继续工作。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt">
  <yh-tree :data="basicData" show-checkbox :default-expanded-keys="['guide']" />
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | 树形数据源 | `TreeNodeData[]` | `[]` |
| `props` | 标签、子节点、禁用字段映射配置 | `{ label?: string; children?: string; disabled?: string }` | `{ label: 'label', children: 'children', disabled: 'disabled' }` |
| `node-key` | 从原始数据中读取节点唯一标识的字段名 | `string` | `'id'` |
| `show-checkbox` | 是否显示复选框 | `boolean` | `false` |
| `checkbox-position` | 复选框相对标签的位置 | `'left' \| 'right'` | `'left'` |
| `default-expand-all` | 是否默认展开所有节点 | `boolean` | `false` |
| `default-expanded-keys` | 默认展开的节点 key 列表 | `(string \| number)[]` | `[]` |
| `default-checked-keys` | 默认选中的节点 key 列表 | `(string \| number)[]` | `[]` |
| `current-node-key` | 当前高亮节点 key，可与 `v-model:current-node-key` 配合使用 | `string \| number \| undefined` | `undefined` |
| `highlight-current` | 是否高亮当前节点 | `boolean` | `true` |
| `accordion` | 是否保持同级仅一个分支展开 | `boolean` | `false` |
| `indent` | 每级节点的缩进像素值 | `number` | `18` |
| `check-strictly` | 是否开启父子节点勾选状态不联动模式 | `boolean` | `false` |
| `expand-on-click-node` | 点击节点时是否切换展开状态 | `boolean` | `true` |
| `check-on-click-node` | 开启复选框时，点击节点内容是否直接切换勾选状态 | `boolean` | `false` |
| `empty-text` | 空数据时的占位文案；为空时回退到 locale 中的 `tree.emptyText` | `string` | `''` |
| `filter-method` | 自定义过滤方法 | `(query: string, node: TreeNode) => boolean` | `undefined` |
| `load` | 懒加载子节点的方法 | `(node: TreeNode) => Promise<TreeNodeData[]>` | `undefined` |
| `lazy` | 是否开启懒加载 | `boolean` | `false` |
| `draggable` | 是否开启拖拽 | `boolean` | `false` |
| `show-line` | 是否显示连接线 | `boolean` | `false` |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` |
| `height` | 虚拟滚动容器高度 | `number` | `400` |
| `item-height` | 虚拟列表中单个节点的高度 | `number` | `30` |
| `theme-overrides` | 组件级主题变量覆盖 | `TreeThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `node-click` | 点击节点时触发 | `(node: TreeNode, event: MouseEvent)` |
| `node-expand` | 节点展开或收起时触发 | `(node: TreeNode, expanded: boolean)` |
| `check` | 勾选状态变化时触发 | `(node: TreeNode, checked: boolean, checkedKeys: (string \| number)[])` |
| `current-change` | 点击节点并切换当前节点时触发。外部更新 `current-node-key` 或通过 `setCurrentKey` 设置时不会触发 | `(node: TreeNode \| null)` |
| `node-drag-start` | 开始拖拽节点时触发 | `(node: TreeNode, event: DragEvent)` |
| `node-drag-end` | 已声明的拖拽结束事件。当前实现只会重置内部拖拽状态，不会实际触发该事件 | `(node: TreeNode, dropNode: TreeNode \| null, position: 'before' \| 'after' \| 'inner', event: DragEvent)` |
| `node-drag-over` | 拖拽经过节点时触发 | `(node: TreeNode, event: DragEvent)` |
| `node-drag-enter` | 拖拽进入节点时触发 | `(node: TreeNode, event: DragEvent)` |
| `node-drag-leave` | 拖拽离开节点时触发 | `(node: TreeNode, event: DragEvent)` |
| `node-drop` | 节点完成放置时触发 | `(draggingNode: TreeNode, dropNode: TreeNode, position: 'before' \| 'after' \| 'inner', event: DragEvent)` |
| `update:currentNodeKey` | 当前节点 key 更新时触发 | `(key: string \| number \| undefined)` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义节点主体内容 | `{ node: TreeNode; data: TreeNodeData }` |
| `icon` | 自定义展开图标区域 | `{ node: TreeNode; data: TreeNodeData }` |
| `prefix` | 节点标签前的扩展内容 | `{ node: TreeNode; data: TreeNodeData }` |
| `suffix` | 节点标签后的扩展内容 | `{ node: TreeNode; data: TreeNodeData }` |
| `empty` | 空状态内容 | `-` |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `filter` | 按关键字过滤节点 | `(query: string) => void` |
| `getNode` | 根据 key 获取节点 | `(key: string \| number) => TreeNode \| undefined` |
| `getCheckedNodes` | 获取所有已选中的节点 | `() => TreeNode[]` |
| `getCheckedKeys` | 获取所有已选中的节点 key | `() => (string \| number)[]` |
| `getHalfCheckedNodes` | 获取半选节点 | `() => TreeNode[]` |
| `getHalfCheckedKeys` | 获取半选节点 key | `() => (string \| number)[]` |
| `getCurrentKey` | 获取当前节点 key | `() => string \| number \| undefined` |
| `getCurrentNode` | 获取当前节点实例 | `() => TreeNode \| undefined` |
| `setChecked` | 设置单个节点的勾选状态 | `(key: string \| number, checked: boolean, deep?: boolean) => void` |
| `setCheckedKeys` | 批量设置勾选节点 key | `(keys: (string \| number)[]) => void` |
| `setCheckedNodes` | 根据原始节点数据批量设置勾选状态 | `(nodes: TreeNodeData[]) => void` |
| `setCurrentKey` | 仅设置当前节点 key，不会触发 `current-change` | `(key: string \| number \| undefined) => void` |
| `setExpandedKeys` | 批量设置展开节点 key | `(keys: (string \| number)[]) => void` |
| `setData` | 替换整棵树的数据源 | `(data: TreeNodeData[]) => void` |
| `expandNode` | 展开指定节点 | `(key: string \| number) => void` |
| `collapseNode` | 收起指定节点 | `(key: string \| number) => void` |
| `scrollTo` | 在虚拟滚动模式下滚动到指定位置 | `(options: number \| ScrollToOptions) => void` |
| `scrollToNode` | 在虚拟滚动模式下滚动到指定节点 | `(key: string \| number) => void` |
| `expandedKeys` | 当前展开节点集合 | `Ref<Set<string \| number>>` |
| `checkedKeys` | 当前勾选节点集合 | `Ref<Set<string \| number>>` |

### 主题变量

`YhTree` 支持 `themeOverrides`，并消费以下组件级 CSS 变量。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-tree-node-height` | 节点行高 | `28px` |
| `--yh-tree-text-color` | 树文本颜色 | `var(--yh-text-color-primary, #1d1d1f)` |
| `--yh-tree-hover-bg` | 节点 hover 背景色 | `var(--yh-color-primary-light-9, #ecf5ff)` |
| `--yh-tree-current-bg` | 当前节点背景色 | `var(--yh-color-primary-light-8, #d9ecff)` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhTreeProps` | `YhTree` props 类型 |
| `YhTreeEmits` | `YhTree` emits 类型 |
| `YhTreeNodeData` | 原始树节点数据类型 |
| `YhTreeNode` | 组件内部归一化后的节点类型，对事件和插槽可见 |
| `YhTreeNodeSlotData` | 节点插槽参数类型 |
| `YhTreeInstance` | 树组件实例类型 |
| `YhTreeNodeInstance` | 树节点组件实例类型 |
