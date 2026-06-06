# Tree

`YhTree` displays hierarchical data and supports checkbox linkage, lazy loading, filtering, drag-and-drop, and virtual scrolling.

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

## Basic Usage

<DemoBlock title="Basic Usage" :ts-code="tsBasic">
  <yh-tree :data="basicData" />
</DemoBlock>

## Checkbox and Disabled Nodes

Enable `show-checkbox` to select multiple nodes. Disabled nodes remain visible but do not respond to click or checkbox interactions.

<DemoBlock title="Checkbox and Disabled Nodes" :ts-code="tsCheckbox">
  <yh-tree
    :data="checkboxData"
    show-checkbox
    :default-expanded-keys="['team-a']"
    :default-checked-keys="['team-b-1']"
  />
</DemoBlock>

## Lazy Loading

Enable `lazy` and provide `load` to fetch child nodes on demand when a branch expands.

<DemoBlock title="Lazy Loading" :ts-code="tsLazy">
  <yh-tree :data="lazyData" lazy :load="loadNode" />
</DemoBlock>

## Filtering

Use the exposed `filter` method with the built-in label matching logic, or combine it with `filter-method` for custom filtering behavior.

<DemoBlock title="Filtering" :ts-code="tsFilter">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <yh-input v-model="filterQuery" placeholder="Filter nodes" clearable @input="handleFilter" />
    <yh-tree ref="filterTreeRef" :data="checkboxData" />
  </div>
</DemoBlock>

## Virtual Scrolling

Enable `virtual` for large datasets, then control the rendering window with `height` and `item-height`.

<DemoBlock title="Virtual Scrolling" :ts-code="tsVirtual">
  <yh-tree :data="largeData" virtual :height="320" :item-height="30" />
</DemoBlock>

## Custom Rendering and Drag-and-Drop

`YhTree` exposes `default`, `icon`, `prefix`, `suffix`, and `empty` slots, and also supports `draggable` with the full drag lifecycle events. Use these capabilities when you need custom node layouts, action areas, or business-side sorting interactions.

## Use in Nuxt

After enabling the YH-UI Nuxt module, `YhTree` can be used directly in pages and components. Tree data, default expanded state, and empty state can render during SSR, while DOM-dependent features such as virtual scrolling and drag-and-drop continue on the client after hydration.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt">
  <yh-tree :data="basicData" show-checkbox :default-expanded-keys="['guide']" />
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `data` | Tree data source | `TreeNodeData[]` | `[]` |
| `props` | Mapping config for label, children, and disabled fields | `{ label?: string; children?: string; disabled?: string }` | `{ label: 'label', children: 'children', disabled: 'disabled' }` |
| `node-key` | Field name used to read the node key from raw data | `string` | `'id'` |
| `show-checkbox` | Whether checkboxes are displayed | `boolean` | `false` |
| `checkbox-position` | Checkbox position relative to the label | `'left' \| 'right'` | `'left'` |
| `default-expand-all` | Whether all nodes are expanded initially | `boolean` | `false` |
| `default-expanded-keys` | Node keys expanded by default | `(string \| number)[]` | `[]` |
| `default-checked-keys` | Node keys checked by default | `(string \| number)[]` | `[]` |
| `current-node-key` | Current highlighted node key, usable with `v-model:current-node-key` | `string \| number \| undefined` | `undefined` |
| `highlight-current` | Whether the current node is highlighted | `boolean` | `true` |
| `accordion` | Whether only one sibling branch can remain expanded | `boolean` | `false` |
| `indent` | Horizontal indentation in pixels for each level | `number` | `18` |
| `check-strictly` | Whether parent and child checked states are decoupled | `boolean` | `false` |
| `expand-on-click-node` | Whether clicking a node toggles expansion | `boolean` | `true` |
| `check-on-click-node` | Whether clicking node content toggles checked state when checkboxes are enabled | `boolean` | `false` |
| `empty-text` | Empty-state text; falls back to locale `tree.emptyText` when empty | `string` | `''` |
| `filter-method` | Custom filter function | `(query: string, node: TreeNode) => boolean` | `undefined` |
| `load` | Lazy load function for child nodes | `(node: TreeNode) => Promise<TreeNodeData[]>` | `undefined` |
| `lazy` | Whether lazy loading is enabled | `boolean` | `false` |
| `draggable` | Whether drag-and-drop is enabled | `boolean` | `false` |
| `show-line` | Whether connector lines are shown | `boolean` | `false` |
| `virtual` | Whether virtual scrolling is enabled | `boolean` | `false` |
| `height` | Virtual list container height | `number` | `400` |
| `item-height` | Height of each node row in virtual mode | `number` | `30` |
| `theme-overrides` | Component-level theme variable overrides | `TreeThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| `node-click` | Triggered when a node is clicked | `(node: TreeNode, event: MouseEvent)` |
| `node-expand` | Triggered when a node expands or collapses | `(node: TreeNode, expanded: boolean)` |
| `check` | Triggered when checked state changes | `(node: TreeNode, checked: boolean, checkedKeys: (string \| number)[])` |
| `current-change` | Triggered when a node is clicked and becomes current. Updating `current-node-key` from the outside or via `setCurrentKey` does not emit it | `(node: TreeNode \| null)` |
| `node-drag-start` | Triggered when dragging starts | `(node: TreeNode, event: DragEvent)` |
| `node-drag-end` | Declared drag-end event. The current implementation resets drag state but does not emit this event | `(node: TreeNode, dropNode: TreeNode \| null, position: 'before' \| 'after' \| 'inner', event: DragEvent)` |
| `node-drag-over` | Triggered while dragging over a node | `(node: TreeNode, event: DragEvent)` |
| `node-drag-enter` | Triggered when a dragged node enters another node | `(node: TreeNode, event: DragEvent)` |
| `node-drag-leave` | Triggered when a dragged node leaves another node | `(node: TreeNode, event: DragEvent)` |
| `node-drop` | Triggered when dropping completes | `(draggingNode: TreeNode, dropNode: TreeNode, position: 'before' \| 'after' \| 'inner', event: DragEvent)` |
| `update:currentNodeKey` | Triggered when the current node key changes | `(key: string \| number \| undefined)` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| `default` | Custom node body content | `{ node: TreeNode; data: TreeNodeData }` |
| `icon` | Custom expand icon content | `{ node: TreeNode; data: TreeNodeData }` |
| `prefix` | Content rendered before the node label | `{ node: TreeNode; data: TreeNodeData }` |
| `suffix` | Content rendered after the node label | `{ node: TreeNode; data: TreeNodeData }` |
| `empty` | Empty-state content | `-` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| `filter` | Filters visible nodes by query | `(query: string) => void` |
| `getNode` | Gets a node by key | `(key: string \| number) => TreeNode \| undefined` |
| `getCheckedNodes` | Returns checked nodes | `() => TreeNode[]` |
| `getCheckedKeys` | Returns checked node keys | `() => (string \| number)[]` |
| `getHalfCheckedNodes` | Returns half-checked nodes | `() => TreeNode[]` |
| `getHalfCheckedKeys` | Returns half-checked node keys | `() => (string \| number)[]` |
| `getCurrentKey` | Returns the current node key | `() => string \| number \| undefined` |
| `getCurrentNode` | Returns the current node instance | `() => TreeNode \| undefined` |
| `setChecked` | Sets the checked state for a single node | `(key: string \| number, checked: boolean, deep?: boolean) => void` |
| `setCheckedKeys` | Sets checked node keys in batch | `(keys: (string \| number)[]) => void` |
| `setCheckedNodes` | Sets checked state based on raw node data | `(nodes: TreeNodeData[]) => void` |
| `setCurrentKey` | Sets the current node key only. It does not emit `current-change` | `(key: string \| number \| undefined) => void` |
| `setExpandedKeys` | Sets expanded node keys in batch | `(keys: (string \| number)[]) => void` |
| `setData` | Replaces the tree data source | `(data: TreeNodeData[]) => void` |
| `expandNode` | Expands a node | `(key: string \| number) => void` |
| `collapseNode` | Collapses a node | `(key: string \| number) => void` |
| `scrollTo` | Scrolls to a position in virtual mode | `(options: number \| ScrollToOptions) => void` |
| `scrollToNode` | Scrolls to a specific node in virtual mode | `(key: string \| number) => void` |
| `expandedKeys` | Reactive expanded node set | `Ref<Set<string \| number>>` |
| `checkedKeys` | Reactive checked node set | `Ref<Set<string \| number>>` |

### Theme Variables

`YhTree` supports `themeOverrides` and consumes the following component-scoped CSS variables.

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-tree-node-height` | Node row height | `28px` |
| `--yh-tree-text-color` | Tree text color | `var(--yh-text-color-primary, #1d1d1f)` |
| `--yh-tree-hover-bg` | Hover background for a node row | `var(--yh-color-primary-light-9, #ecf5ff)` |
| `--yh-tree-current-bg` | Background for the current node | `var(--yh-color-primary-light-8, #d9ecff)` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhTreeProps` | Props type for `YhTree` |
| `YhTreeEmits` | Emits type for `YhTree` |
| `YhTreeNodeData` | Raw tree node data type |
| `YhTreeNode` | Normalized node type exposed through events and slots |
| `YhTreeNodeSlotData` | Slot payload type for tree nodes |
| `YhTreeInstance` | Public tree instance type |
| `YhTreeNodeInstance` | Public tree-node instance type |
