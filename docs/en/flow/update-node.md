# Updating Nodes

In `Flow`, nodes are strictly reactive. This means when you modify the objects within the `nodes` array prop (such as changing coordinates, styles, labels, or business metadata), the canvas viewport synchronizes instantly. No manual `refresh()` or `render()` calls are required.

## Live Property Binding Demo

This example shows how to dynamically bind a node's label and color to external form inputs. Select a node in the graph below to enable the edit panel.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="update-container">
    <div class="update-toolbar">
      <div class="form-item">
        <label>Label:</label>
        <input v-model="selectedNodeLabel" :disabled="!selectedNodeId" placeholder="Select a node..." />
      </div>
      <div class="form-item">
        <label>Color:</label>
        <input type="color" v-model="selectedNodeColor" :disabled="!selectedNodeId" />
      </div>
    </div>
    
    <div class="update-flowbox">
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        @node-click="onNodeClick"
        @pane-click="onPaneClick"
        background="dots"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node A' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Node B' } }
])
const edges = ref<Edge[]>([])

const selectedNodeId = ref<string | null>(null)

const selectedNodeLabel = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.data?.label || '',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], data: { ...newNodes[index].data, label: val } }
      nodes.value = newNodes
    }
  }
})

const selectedNodeColor = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.style?.backgroundColor || '#ffffff',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], style: { ...newNodes[index].style, backgroundColor: val } }
      nodes.value = newNodes
    }
  }
})

const onNodeClick = ({ node }) => selectedNodeId.value = node.id
const onPaneClick = () => selectedNodeId.value = null
<\/script>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node A' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Node B' } }
])
const selectedNodeId = ref<string | null>(null)

const selectedNodeLabel = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.data?.label || '',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], data: { ...newNodes[index].data, label: val } }
      nodes.value = newNodes
    }
  }
})

const selectedNodeColor = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.style?.backgroundColor || '#ffffff',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], style: { ...newNodes[index].style, backgroundColor: val } }
      nodes.value = newNodes
    }
  }
})
</script>

<DemoBlock title="Reactive Property Update" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 24px; align-items: center; z-index: 2;">
      <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569;">
        <label>Label:</label>
        <input v-model="selectedNodeLabel" :disabled="!selectedNodeId" placeholder="Click node to edit" style="border: 1px solid #cbd5e1; padding: 4px 8px; border-radius: 4px;" />
      </div>
      <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569;">
        <label>Color:</label>
        <input type="color" v-model="selectedNodeColor" :disabled="!selectedNodeId" />
      </div>
      <div v-if="!selectedNodeId" style="font-size: 11px; color: #94a3b8;">➔ Select a node to begin editing</div>
    </div>
    <div style="flex: 1;">
      <yh-flow
        :nodes="nodes"
        :edges="[]"
        @node-click="({node}) => selectedNodeId = node.id"
        @pane-click="selectedNodeId = null"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## Implementation Best Practices

1.  **State Management**: For performance reasons, `yh-flow` avoids costly deep watches on large arrays. To trigger reactivity, **you must replace the entire parent array or object reference** (immutable updates). Example: `nodes.value = nodes.value.map(n => n.id === id ? { ...n, data: { ...n.data, label: 'Value' } } : n)`.
2.  **Position Shift**: To programmatically move nodes (e.g., for auto-layout or alignment), supply a new array with updated node positions.
3.  **High-Frequency Updates**: For large-scale graphs with thousands of nodes, we expose the internal `flowInstance.updateNode(nodeId, data)` method for highly frequent, granular property modifications to bypass full array diffing and Vue app-level re-rendering overhead.
