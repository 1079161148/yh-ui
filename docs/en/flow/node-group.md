# Node Grouping & Subflow

`createNodeGroupPlugin` lets you **group multiple selected nodes** into a parent-child container with a single call, supporting **collapse/expand** and **ungroup** operations.
Perfect for AI Agent orchestration, BPMN subgraphs, and complex multi-stage pipelines.

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import { createNodeGroupPlugin } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

const tsGroup = `<template>
  <div style="display: flex; flex-direction: column; height: 460px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <span style="font-size: 12px; color: #94a3b8;">Select 2+ nodes:</span>
      <button @click="groupSelected" style="padding: 4px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">📦 Group</button>
      <button @click="ungroupLast" style="padding: 4px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-size: 12px;">✂️ Ungroup</button>
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="nodes" v-model:edges="edges" background="dots" />
    </div>
    <div style="padding: 6px 14px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">
      💡 Click to select, Shift for multi-select, then click "Group"
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createNodeGroupPlugin } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

const flowRef = ref()
let lastGroupId: string | null = null

const nodes = ref<Node[]>([
  { id: '1', type: 'input',   position: { x: 80,  y: 80  }, data: { label: 'Node A' }, width: 120, height: 45 },
  { id: '2', type: 'default', position: { x: 80,  y: 180 }, data: { label: 'Node B' }, width: 120, height: 45 },
  { id: '3', type: 'default', position: { x: 260, y: 80  }, data: { label: 'Node C' }, width: 120, height: 45 },
  { id: '4', type: 'default', position: { x: 260, y: 180 }, data: { label: 'Node D' }, width: 120, height: 45 },
  { id: '5', type: 'output',  position: { x: 450, y: 130 }, data: { label: 'Output' }, width: 120, height: 45 }
])

const edges = ref<Edge[]>([
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' }
])

onMounted(() => {
  // usePlugin installs the plugin, which mounts groupSelectedNodes etc. on flowRef.value
  flowRef.value?.usePlugin(
    createNodeGroupPlugin({ groupIdPrefix: 'grp', paddingX: 30, paddingY: 40 })
  )
})

const groupSelected = () => {
  const id = flowRef.value?.groupSelectedNodes('My Group')
  if (id) lastGroupId = id
}

const ungroupLast = () => {
  if (lastGroupId) {
    flowRef.value?.ungroupNodes(lastGroupId)
    lastGroupId = null
  }
}
<\/script>`

const jsGroup = toJs(tsGroup)

const flowRef = ref()
let lastGroupId: string | null = null

const demoNodes = ref<Node[]>([
  { id: '1', type: 'input',   position: { x: 80,  y: 80  }, data: { label: 'Node A' }, width: 110, height: 42 },
  { id: '2', type: 'default', position: { x: 80,  y: 170 }, data: { label: 'Node B' }, width: 110, height: 42 },
  { id: '3', type: 'default', position: { x: 250, y: 80  }, data: { label: 'Node C' }, width: 110, height: 42 },
  { id: '4', type: 'default', position: { x: 250, y: 170 }, data: { label: 'Node D' }, width: 110, height: 42 },
  { id: '5', type: 'output',  position: { x: 430, y: 125 }, data: { label: 'Output'  }, width: 110, height: 42 }
])
const demoEdges = ref<Edge[]>([
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' }
])

onMounted(() => {
  flowRef.value?.usePlugin(
    createNodeGroupPlugin({ groupIdPrefix: 'grp', paddingX: 30, paddingY: 40 })
  )
})

const groupSelected = () => {
  const id = flowRef.value?.groupSelectedNodes('My Group')
  if (id) lastGroupId = id
}
const ungroupLast = () => {
  if (lastGroupId) { flowRef.value?.ungroupNodes(lastGroupId); lastGroupId = null }
}
</script>

## Quick Start

```typescript
import { createNodeGroupPlugin } from '@yh-ui/flow'

onMounted(() => {
  // Install the plugin; it mounts groupSelectedNodes / ungroupNodes etc. onto flowRef.value
  flowRef.value?.usePlugin(
    createNodeGroupPlugin({
      groupIdPrefix: 'grp', // ID prefix for auto-generated group IDs
      paddingX: 40, // Horizontal padding around child nodes (px)
      paddingY: 50 // Vertical padding around child nodes (px)
    })
  )
})

// After install, call group methods on flowRef.value:
flowRef.value?.groupSelectedNodes('My Group') // → group and return groupId
flowRef.value?.ungroupNodes(groupId) // → ungroup
flowRef.value?.toggleGroupCollapse(groupId) // → toggle collapse/expand
```

## Group / Ungroup Nodes

<DemoBlock title="Select nodes then group or ungroup with one click" :ts-code="tsGroup" :js-code="jsGroup">
  <div style="display: flex; flex-direction: column; height: 380px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <span style="font-size: 11px; color: #94a3b8;">Select 2+ nodes:</span>
      <button @click="groupSelected" style="padding: 4px 13px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">📦 Group</button>
      <button @click="ungroupLast" style="padding: 4px 13px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-size: 12px;">✂️ Ungroup</button>
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="demoNodes" v-model:edges="demoEdges" background="dots" />
    </div>
    <div style="padding: 6px 12px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">💡 Click to select, Shift for multi-select, then click "Group"</div>
  </div>
</DemoBlock>

## API

### Install Plugin

```typescript
import { createNodeGroupPlugin } from '@yh-ui/flow'

onMounted(() => {
  flowRef.value?.usePlugin(createNodeGroupPlugin(options))
})
```

### FlowInstance Extended Methods

> Automatically mounted onto `flowRef.value` after `usePlugin` is called

| Method                | Signature                            | Description                                                               |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| `groupSelectedNodes`  | `(label?: string) => string \| null` | Groups all **selected** nodes; returns group ID or `null` if < 2 selected |
| `ungroupNodes`        | `(groupId: string) => void`          | Ungroup: restore children to absolute coordinates as top-level nodes      |
| `toggleGroupCollapse` | `(groupId: string) => void`          | Toggle group collapse/expand (also hides/shows connected edges)           |
| `isGroupCollapsed`    | `(groupId: string) => boolean`       | Check if a group is currently collapsed                                   |
| `getGroupChildren`    | `(groupId: string) => Node[]`        | Get all child nodes of a group                                            |
| `getGroupRegistry`    | `() => Map<string, GroupInfo>`       | Get full group registry (for debugging)                                   |

### NodeGroupOptions

| Prop            | Type      | Default   | Description                                                    |
| --------------- | --------- | --------- | -------------------------------------------------------------- |
| `enabled`       | `boolean` | `true`    | Enable plugin                                                  |
| `groupNodeType` | `string`  | `'group'` | Render type for group node                                     |
| `paddingX`      | `number`  | `40`      | Horizontal padding inside the group container (px)             |
| `paddingY`      | `number`  | `50`      | Vertical padding inside the group container (px)               |
| `groupIdPrefix` | `string`  | `'group'` | Prefix for auto-generated group IDs (e.g. `'grp'` → `'grp-1'`) |
