# Tree

A commonly used tree display component, supporting advanced features such as virtual scrolling for massive data, search filtering, and drag-and-drop sorting.

<script setup lang="ts">
import { ref } from 'vue'
import type { TreeNode, TreeNodeData } from '@yh-ui/components'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

/** ---- 1. Unified Preview Data Definitions ---- **/

// Basic Usage
const basicProps = [
  { key: '1', label: 'Node 1', children: [{ key: '1-1', label: 'Node 1-1' }] },
  { key: '2', label: 'Node 2' }
]

// Data with disabled nodes (for checkbox demo)
const checkboxData = ref([
  { 
    key: '1', 
    label: 'Level one 1', 
    children: [
      { key: '1-1', label: 'Level two 1-1', disabled: true }, 
      { 
        key: '1-2', 
        label: 'Level two 1-2', 
        children: [{ key: '1-2-1', label: 'Level three 1-2-1' }] 
      }
    ] 
  },
  { 
    key: '2', 
    label: 'Level one 2', 
    children: [
      { key: '2-1', label: 'Level two 2-1' }, 
      { key: '2-2', label: 'Level two 2-2' }
    ] 
  }
])

const customClassData = [
  { key: '1', label: 'Important Node', class: 'is-important', children: [{ key: '1-1', label: 'Child Node' }] },
  { key: '2', label: 'Warning Node', class: 'is-warning' }
]

const mappingData = [
  { id: '1', name: 'Root A', subs: [{ id: '1-1', name: 'Child A-1' }] },
  { id: '2', name: 'Root B' }
]

const largeData = Array.from({ length: 1000 }).map((_, i) => ({
  id: `node-${i}`,
  label: `Virtual Node ${i}`,
  children: [{ id: `node-${i}-0`, label: `Child ${i}-0` }]
}))

/** ---- 2. Interaction Logic ---- **/

const query = ref('')
const tree = ref()
const onFilter = () => tree.value?.filter(query.value)

const advQuery = ref('')
const advTree = ref()
const onAdvFilter = () => advTree.value?.filter(advQuery.value)
const getAdvChecked = () => alert('Current checked count: ' + (advTree.value?.getCheckedKeys().length || 0))

const loadNode = (node: TreeNode) => {
  return new Promise<TreeNodeData[]>((resolve) => {
    setTimeout(() => {
      resolve([{ key: `${node.key}-1`, label: `Lazy Child of ${node.label}` }])
    }, 800)
  })
}

const handleDrop = (draggingNode: TreeNode, dropNode: TreeNode, type: 'before' | 'after' | 'inner') => {
  const findAndRemove = (nodes: TreeNodeData[], key: string | number): TreeNodeData | undefined => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) return nodes.splice(i, 1)[0]
      if (nodes[i].children) {
        const res = findAndRemove(nodes[i].children!, key)
        if (res) return res
      }
    }
  }
  const findAndInsert = (nodes: TreeNodeData[], targetKey: string | number, node: TreeNodeData, pos: 'before' | 'after' | 'inner') => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === targetKey) {
        if (pos === 'inner') {
          nodes[i].children = nodes[i].children || []; nodes[i].children!.push(node)
        } else if (pos === 'before') {
          nodes.splice(i, 0, node)
        } else {
          nodes.splice(i + 1, 0, node)
        }
        return true
      }
      if (nodes[i].children && findAndInsert(nodes[i].children!, targetKey, node, pos)) return true
    }
    return false
  }

  const dragObj = findAndRemove(checkboxData.value, draggingNode.key)
  if (dragObj) findAndInsert(checkboxData.value, dropNode.key, dragObj, type)
}

const selectionTreeRef = ref()
const handleGetChecked = () => {
  const keys = selectionTreeRef.value?.getCheckedKeys()
  alert('Selected Keys: ' + (keys?.join(', ') || 'None'))
}

const customProps = { label: 'name', children: 'subs' }

/** ---- 3. Demo Code Sample Definitions ---- **/

const tsBasic = `<${_T}>
  <yh-tree :data="data" />
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = [
  { key: '1', label: 'Node 1', children: [{ key: '1-1', label: 'Node 1-1' }] },
  { key: '2', label: 'Node 2' }
]
</${_S}>`

const tsCheckbox = `<${_T}>
  <yh-tree 
    :data="data" 
    show-checkbox 
    :default-checked-keys="['1-2-1']" 
    :default-expanded-keys="['1', '1-2']" 
  />
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsStrictly = `<${_T}>
  <yh-tree :data="data" show-checkbox check-strictly />
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsAccordion = `<${_T}>
  <yh-tree :data="data" accordion />
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsLine = `<${_T}>
  <yh-tree :data="data" show-line default-expand-all />
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsCheckboxPos = `<${_T}>
  <yh-tree :data="data" show-checkbox checkbox-position="right" />
</${_T}>

<${_S} setup lang="ts">
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsLazy = `<${_T}>
  <yh-tree :data="data" lazy :load="load" />
</${_T}>

<${_S} setup lang="ts">
import type { TreeNode, TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = [{ key: "lazy", label: "Lazy Root" }]

const load = (node: TreeNode): Promise<TreeNodeData[]> => {
  return new Promise<TreeNodeData[]>((resolve) => {
    setTimeout(() => {
      resolve([{ key: \`\${node.key}-1\`, label: \`Lazy Child of \${node.label}\` }])
    }, 800)
  })
}
</${_S}>`

const tsCustomClass = `<${_T}>
  <yh-tree :data="data" />
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(customClassData, null, 2)}
</${_S}>`

const tsCustomIcon = `<${_T}>
  <yh-tree :data="data">
    <${_T} #icon="{ node }">
       <yh-icon v-if="!node.isLeaf" :name="node.expanded ? 'folder-opened' : 'folder'" />
    </${_T}>
  </yh-tree>
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsCustomContent = `<${_T}>
  <yh-tree :data="data">
    <${_T} #default="{ node }">
      <span style="display: flex; align-items: center; gap: 8px">
        <span>{{ node.label }}</span>
        <yh-tag v-if="node.level === 0" size="small">Root</yh-tag>
      </span>
    </${_T}>
  </yh-tree>
</${_T}>

<${_S} setup lang="ts">
import type { TreeNodeData } from "@yh-ui/components"

const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsPrefixSuffix = `<${_T}>
  <yh-tree :data="data">
    <${_T} #prefix="{ node }">
       <yh-tag size="small" type="info" style="margin-right: 4px">{{ node.key }}</yh-tag>
    </${_T}>
    <${_T} #suffix>
       <yh-button size="small" text type="primary">Edit</yh-button>
    </${_T}>
  </yh-tree>
</${_T}>

<${_S} setup lang="ts">
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}
</${_S}>`

const tsVirtual = `<${_T}>
  <yh-tree :data="data" virtual :height="300" :item-height="30" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"

const data = ref<TreeNodeData[]>(Array.from({ length: 1000 }).map((_, i) => ({
  id: \`node-\${i}\`,
  label: \`Virtual Node \${i}\`,
  children: [
    { id: \`node-\${i}-0\`, label: \`Child \${i}-0\` }
  ]
})))
</${_S}>`

const tsFilter = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <yh-input v-model="query" placeholder="Filter..." @input="onFilter" clearable />
    <yh-tree ref="tree" :data="data" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"
import type YhTree from '@yh-ui/components/tree/src/tree.vue'

const query = ref<string>("")
const tree = ref<InstanceType<typeof YhTree>>()
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}

const onFilter = () => tree.value?.filter(query.value)
</${_S}>`

const tsDraggable = `<${_T}>
  <yh-tree :data="data" draggable @node-drop="handleDrop" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from "vue"
import type { TreeNode, TreeNodeData } from "@yh-ui/components"

const data = ref<TreeNodeData[]>([
  { key: '1', label: 'Node 1', children: [{ key: '1-1', label: 'Node 1-1' }] },
  { key: '2', label: 'Node 2' }
])

const handleDrop = (draggingNode: TreeNode, dropNode: TreeNode, type: 'before' | 'after' | 'inner') => {
  const findAndRemove = (nodesArr: TreeNodeData[], keyToFind: string | number): TreeNodeData | undefined => {
    for (let i = 0; i < nodesArr.length; i++) {
      if (nodesArr[i].key === keyToFind) return nodesArr.splice(i, 1)[0]
      if (nodesArr[i].children) {
        const res = findAndRemove(nodesArr[i].children!, keyToFind)
        if (res) return res
      }
    }
  }
  const findAndInsert = (nodesArr: TreeNodeData[], targetKey: string | number, nodeToInsert: TreeNodeData, pos: 'before' | 'after' | 'inner') => {
    for (let i = 0; i < nodesArr.length; i++) {
      if (nodesArr[i].key === targetKey) {
        if (pos === 'inner') {
          nodesArr[i].children = nodesArr[i].children || []; nodesArr[i].children!.push(nodeToInsert)
        } else if (pos === 'before') {
          nodesArr.splice(i, 0, nodeToInsert)
        } else {
          nodesArr.splice(i + 1, 0, nodeToInsert)
        }
        return true
      }
      if (nodesArr[i].children && findAndInsert(nodesArr[i].children!, targetKey, nodeToInsert, pos)) return true
    }
    return false
  }

  const dragObj = findAndRemove(data.value, draggingNode.key)
  if (dragObj) findAndInsert(data.value, dropNode.key, dragObj, type)
}
</${_S}>`

const tsSelection = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div><yh-button @click="handleGetChecked">Get Checked (Alert)</yh-button></div>
    <yh-tree ref="tree" :data="data" show-checkbox />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"
import type YhTree from '@yh-ui/components/tree/src/tree.vue'

const tree = ref<InstanceType<typeof YhTree>>()
const data: TreeNodeData[] = ${JSON.stringify(checkboxData.value, null, 2)}

const handleGetChecked = () => {
  alert(tree.value?.getCheckedKeys())
}
</${_S}>`

const tsCustomProps = `<${_T}>
  <yh-tree :data="data" :props="customProps" node-key="id" />
</${_T}>

<${_S} setup lang="ts">
interface CustomNode {
  id: string
  name: string
  subs?: CustomNode[]
}

const data: CustomNode[] = ${JSON.stringify(mappingData, null, 2)}
const customProps = { label: "name", children: "subs" }
</${_S}>`

const tsAdvancedVirtual = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px">
      <yh-input v-model="query" placeholder="Search..." @input="onFilter" clearable style="flex: 1" />
      <yh-button type="primary" @click="getChecked">Get Checked count</yh-button>
    </div>
    <yh-tree ref="treeRef" :data="data" virtual show-checkbox :height="400" :item-height="32" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { TreeNodeData } from "@yh-ui/components"

const query = ref('')
const treeRef = ref()
const onFilter = () => treeRef.value?.filter(query.value)
const getChecked = () => alert('Checked count: ' + (treeRef.value?.getCheckedKeys().length || 0))

const data: TreeNodeData[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: \`node-\${i}\`,
  label: \`Virtual Node \${i}\`,
  children: [{ id: \`node-\${i}-0\`, label: \`Child \${i}-0\` }]
}))
</${_S}>`

const tsNuxt = `<${_T}>
  <yh-tree :data="data" show-checkbox />
</${_T}>

<${_S} setup lang="ts">
import { ref } from "vue"
import type { TreeNodeData } from "@yh-ui/components"

const data = ref<TreeNodeData[]>([
  { key: '1', label: 'Nuxt SSR Node 1', children: [{ key: '1-1', label: 'Child 1-1' }] },
  { key: '2', label: 'Nuxt SSR Node 2' }
])
</${_S}>`

const jsBasic = toJs(tsBasic); const jsCheckbox = toJs(tsCheckbox); const jsLine = toJs(tsLine)
const jsLazy = toJs(tsLazy); const jsCustomClass = toJs(tsCustomClass); const jsCustomIcon = toJs(tsCustomIcon)
const jsCustomContent = toJs(tsCustomContent); const jsPrefixSuffix = toJs(tsPrefixSuffix)
const jsFilter = toJs(tsFilter); const jsVirtual = toJs(tsVirtual); const jsDraggable = toJs(tsDraggable)
const jsSelection = toJs(tsSelection); const jsCustomProps = toJs(tsCustomProps)
const jsAdvancedVirtual = toJs(tsAdvancedVirtual); const jsStrictly = toJs(tsStrictly); const jsAccordion = toJs(tsAccordion)
const jsCheckboxPos = toJs(tsCheckboxPos); const jsNuxt = toJs(tsNuxt)
</script>

## Basic Usage
<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-tree :data="basicProps" />
</DemoBlock>

## Selection and Disabling
Enable checkboxes via `show-checkbox`. Setting `disabled: true` in the data prohibits clicking and selecting that node.
<DemoBlock title="Checkboxes and Disabled Nodes" :ts-code="tsCheckbox" :js-code="jsCheckbox">
  <yh-tree :data="checkboxData" show-checkbox :default-checked-keys="['1-2-1']" :default-expanded-keys="['1', '1-2']" />
</DemoBlock>

## Parents Independent of Children
Setting `check-strictly=true` ensures that parent and child selection statuses do not influence each other.
<DemoBlock title="Independent Selection" :ts-code="tsStrictly" :js-code="jsStrictly">
  <yh-tree :data="checkboxData" show-checkbox check-strictly />
</DemoBlock>

## Accordion Mode
Set `accordion=true` to automatically collapse peer nodes when one is expanded.
<DemoBlock title="Accordion Mode" :ts-code="tsAccordion" :js-code="jsAccordion">
  <yh-tree :data="checkboxData" accordion />
</DemoBlock>

## Connection Lines
Use the `show-line` property to clearly display the hierarchy.
<DemoBlock title="Line Mode" :ts-code="tsLine" :js-code="jsLine">
  <yh-tree :data="checkboxData" show-line default-expand-all />
</DemoBlock>

## Checkbox Position
Move checkboxes to the right side via `checkbox-position`.
<DemoBlock title="Right Checkboxes" :ts-code="tsCheckboxPos" :js-code="jsCheckboxPos">
  <yh-tree :data="checkboxData" show-checkbox checkbox-position="right" />
</DemoBlock>

## Async Lazy Loading
<DemoBlock title="Lazy Loading Demo" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-tree :data="[{ key: 'lazy', label: 'Lazy Root' }]" lazy :load="loadNode" />
</DemoBlock>

## Custom Node Class Names
<DemoBlock title="Custom Class Names" :ts-code="tsCustomClass" :js-code="jsCustomClass">
  <yh-tree :data="customClassData" />
</DemoBlock>

## Custom Expansion Icons
<DemoBlock title="Custom Icons" :ts-code="tsCustomIcon" :js-code="jsCustomIcon">
  <yh-tree :data="checkboxData">
    <template #icon="{ node }">
       <yh-icon v-if="!node.isLeaf" :name="node.expanded ? 'folder-opened' : 'folder'" />
    </template>
  </yh-tree>
</DemoBlock>

## Custom Node Content
<DemoBlock title="Custom Content" :ts-code="tsCustomContent" :js-code="jsCustomContent">
  <yh-tree :data="checkboxData">
    <template #default="{ node }">
      <span style="display: flex; align-items: center; gap: 8px">
        <span>{{ node.label }}</span>
        <yh-tag v-if="node.level === 0" size="small">Root</yh-tag>
      </span>
    </template>
  </yh-tree>
</DemoBlock>

## Custom Prefix and Suffix
<DemoBlock title="Prefix and Suffix" :ts-code="tsPrefixSuffix" :js-code="jsPrefixSuffix">
  <yh-tree :data="checkboxData">
    <template #prefix="{ node }">
       <yh-tag size="small" type="info" style="margin-right: 4px">{{ node.key }}</yh-tag>
    </template>
    <template #suffix>
       <yh-button size="small" text type="primary">Edit</yh-button>
    </template>
  </yh-tree>
</DemoBlock>

## Virtual Scrolling (10k+ Data)
<DemoBlock title="Virtual Scrolling" :ts-code="tsVirtual" :js-code="jsVirtual">
  <yh-tree :data="largeData" virtual :height="300" :item-height="30" />
</DemoBlock>

## Node Filtering
<DemoBlock title="Tree Node Filtering" :ts-code="tsFilter" :js-code="jsFilter">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <yh-input v-model="query" placeholder="Filter..." @input="onFilter" clearable />
    <yh-tree ref="tree" :data="checkboxData" />
  </div>
</DemoBlock>

## Draggable Nodes
<DemoBlock title="Drag and Drop Demo" :ts-code="tsDraggable" :js-code="jsDraggable">
  <yh-tree :data="checkboxData" draggable @node-drop="handleDrop" />
</DemoBlock>

## Multi-selection and Node Retrieval
<DemoBlock title="Selection Retrieval" :ts-code="tsSelection" :js-code="jsSelection">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div><yh-button @click="handleGetChecked">Get Checked (Alert)</yh-button></div>
    <yh-tree ref="selectionTreeRef" :data="checkboxData" show-checkbox />
  </div>
</DemoBlock>

## Custom Field Mapping
<DemoBlock title="Field Mapping" :ts-code="tsCustomProps" :js-code="jsCustomProps">
  <yh-tree :data="mappingData" :props="customProps" node-key="id" />
</DemoBlock>

## Advanced Case: Massive Data Filtering and Selection
<DemoBlock title="Comprehensive Example" :ts-code="tsAdvancedVirtual" :js-code="jsAdvancedVirtual">
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px">
      <yh-input v-model="advQuery" placeholder="Search..." @input="onAdvFilter" clearable style="flex: 1" />
      <yh-button type="primary" @click="getAdvChecked">Get Checked numbers</yh-button>
    </div>
    <yh-tree ref="advTree" :data="largeData" virtual show-checkbox :height="400" :item-height="32" />
  </div>
</DemoBlock>

## Usage in Nuxt

The Tree component fully supports SSR in Nuxt 3/4. When used in a Nuxt project, it is auto-imported.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tree :data="[{ key: '1', label: 'Nuxt SSR Node 1', children: [{ key: '1-1', label: 'Child 1-1' }] }, { key: '2', label: 'Nuxt SSR Node 2' }]" show-checkbox />
</DemoBlock>

**SSR Considerations**:

- ✅ Data structures are perfectly serialized.
- ✅ Node expansion states are correctly generated in the SSR environment.
- ✅ Virtual scrolling is automatically activated on the client.
- ✅ Event bindings and reactive states work seamlessly.

::: tip SSR Safety
Internal virtual scrolling and DOM operations are handled to ensure no browser APIs are triggered on the server, ensuring a smooth transition upon client-side hydration.
:::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| data | Data source | `TreeNodeData[]` | `[]` |
| props | Configuration options | `object` | `{ label: 'label', children: 'children', disabled: 'disabled' }` |
| node-key | Attribute field name used as unique identifier for each tree node | `string` | `'id'` |
| show-checkbox | Whether nodes can be selected | `boolean` | `false` |
| checkbox-position | Position of checkbox relative to label | `'left' \| 'right'` | `'left'` |
| default-expand-all | Whether to expand all nodes by default | `boolean` | `false` |
| default-expanded-keys | Array of keys for nodes expanded by default | `(string \| number)[]` | `[]` |
| default-checked-keys | Array of keys for nodes checked by default | `(string \| number)[]` | `[]` |
| current-node-key | Key of currently selected node (supports v-model) | `string \| number` | `-` |
| highlight-current | Whether to highlight the currently selected node | `boolean` | `true` |
| accordion | Whether to allow only one peer node to expand at a time | `boolean` | `false` |
| indent | Horizontal indentation between adjacent levels in pixels | `number` | `18` |
| check-strictly | Whether to decouple parent and child checkbox statuses | `boolean` | `false` |
| expand-on-click-node | Whether to expand/collapse on node click | `boolean` | `true` |
| check-on-click-node | Whether to check checkbox on node click | `boolean` | `false` |
| empty-text | Text shown when data is empty | `string` | `'No Data'` |
| filter-method | Method executed when filtering tree nodes | `(query, node) => boolean` | `-` |
| lazy | Whether to lazy load child nodes (use with `load`) | `boolean` | `false` |
| load | Method to load sub-tree data (only for `lazy`) | `(node) => Promise` | `-` |
| virtual | Whether to enable virtual scrolling | `boolean` | `false` |
| height | Height of virtual scrolling window (px) | `number` | `400` |
| item-height | Height of each node (px) | `number` | `30` |
| show-line | Whether to show connection lines | `boolean` | `false` |
| draggable | Whether to enable drag-and-drop | `boolean` | `false` |

### Props Data Mapping

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| label | Specifies the node label property | `string` | `'label'` |
| children | Specifies the child nodes property | `string` | `'children'` |
| disabled | Specifies the checkbox disabled property | `string` | `'disabled'` |

### TreeNodeData Definition

| Name | Description | Type |
| --- | --- | --- |
| key | Unique identifier (Required) | `string \| number` |
| label | Display text (Required) | `string` |
| children | Array of child nodes | `TreeNodeData[]` |
| disabled | Whether to disable selection/clicking | `boolean` |
| isLeaf | Whether this is a leaf node (used in lazy load) | `boolean` |
| icon | Custom node icon class | `string` |
| class | Custom node style class | `string` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| node-click | Triggers when a node is clicked | `(node: TreeNode, e: MouseEvent)` |
| node-expand | Triggers when a node expands/collapses | `(node: TreeNode, expanded: boolean)` |
| check | Triggers when checkbox status changes | `(node: TreeNode, checked: boolean, checkedKeys: (string \| number)[])` |
| current-change | Triggers when selected node changes | `(node: TreeNode \| null)` |
| node-drag-start | Triggers when dragging starts | `(node: TreeNode, e: DragEvent)` |
| node-drag-end | Triggers when dragging ends | `(node: TreeNode, dropNode: TreeNode \| null, pos: 'before' \| 'after' \| 'inner', e: DragEvent)` |
| node-drag-over | Triggers during dragging | `(node: TreeNode, e: DragEvent)` |
| node-drag-enter | Triggers when entering a node | `(node: TreeNode, e: DragEvent)` |
| node-drag-leave | Triggers when leaving a node | `(node: TreeNode, e: DragEvent)` |
| node-drop | Triggers when dropping finishes | `(node: TreeNode, dropNode: TreeNode, type: 'before' \| 'after' \| 'inner', e: DragEvent)` |

### Slots

| Name | Description | Parameters |
| --- | --- | --- |
| default | Custom node content | `{ node, data }` |
| icon | Custom expansion icon | `{ node, data }` |
| prefix | Custom content prefix | `{ node, data }` |
| suffix | Custom content suffix | `{ node, data }` |
| empty | Content when no data | `-` |

> **Note**: The `node` object includes properties like `key`, `label`, `level`, `expanded`, `checked`, `indeterminate`, `loading`, `isLeaf`. `data` refers to the raw data item.

### Expose

| Name | Description | Parameters/Type |
| --- | --- | --- |
| filter | Filter tree nodes | `(query: string)` |
| getNode | Get node data by key | `(key: string \| number)` |
| getCheckedNodes | Returns array of currently checked nodes | `-` |
| getCheckedKeys | Returns array of currently checked keys | `-` |
| getHalfCheckedNodes | Returns array of currently half-checked nodes | `-` |
| getHalfCheckedKeys | Returns array of currently half-checked keys | `-` |
| getCurrentKey | Gets currently selected node's key | `-` |
| getCurrentNode | Gets currently selected node's data | `-` |
| setChecked | Set checked status via key | `(key: string \| number, checked: boolean, deep?: boolean)` |
| setCheckedKeys | Set checked status via keys | `(keys: (string \| number)[])` |
| setCheckedNodes | Set checked status via nodes | `(nodes: TreeNodeData[])` |
| setCurrentKey | Set current selected node via key | `(key: string \| number \| undefined)` |
| setExpandedKeys | Set expanded keys | `(keys: (string \| number)[])` |
| setData | Manually set tree data | `(data: TreeNodeData[])` |
| expandNode | Expand specific node | `(key: string \| number)` |
| collapseNode | Collapse specific node | `(key: string \| number)` |
| scrollTo | Scroll to position (virtual scroll only) | `(options: number \| ScrollToOptions)` |
| scrollToNode | Scroll to specific node | `(key: string \| number)` |
| expandedKeys | Set of currently expanded keys | `Ref<Set<string \| number>>` |
| checkedKeys | Set of currently checked keys | `Ref<Set<string \| number>>` |

### Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-tree-node-height` | Node height | `28px` |
| `--yh-tree-text-color` | Text color | `var(--yh-text-color-primary)` |
| `--yh-tree-hover-bg` | Hover background | `var(--yh-color-primary-light-9)` |
| `--yh-tree-current-bg` | Highlighted node background | `var(--yh-color-primary-light-8)` |

<style>
.is-important .yh-tree__label { color: var(--yh-color-danger); font-weight: bold; }
.is-warning .yh-tree__label { color: var(--yh-color-warning); }
</style>
