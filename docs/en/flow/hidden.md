# Hidden State

In complex diagrams, users often need to implement advanced interactions such as "filtering" or "collapsing" specific views. Instead of destructive `splice` operations on your node/edge collections鈥攚hich would lose spatial coordinates and configurations鈥擿Flow`provides a non-destructive`hidden` attribute.

## Toggle Visibility Demo

Use the checkbox in the toolbar below to observe how specific elements vanish from the viewport while remaining part of the internal graph state.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsCode = `<template>
  <div style="display: flex; flex-direction: column; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 16px; align-items: center; z-index: 2;">
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">
        <input type="checkbox" v-model="isHidden" style="cursor: pointer;" />
        Toggle Hidden Elements (Red Borders)
      </label>
    </div>
    
    <div style="flex: 1; height: 100%;">
      <yh-flow
        :nodes="computedNodes"
        :edges="computedEdges"
        background="grid"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const isHidden = ref(false)

const baseNodes: Node[] = [
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Node 1' } },
  { 
    id: '2', 
    type: 'default', 
    position: { x: 100, y: 150 }, 
    data: { label: 'Node 2 (Hidable)' },
    style: { border: '2px solid #ef4444', color: '#ef4444' }
  },
  { id: '3', type: 'output', position: { x: 100, y: 250 }, data: { label: 'Node 3' } },
  { 
    id: '4', 
    type: 'default', 
    position: { x: 350, y: 150 }, 
    data: { label: 'Node 4 (Hidable)' },
    style: { border: '2px solid #ef4444', color: '#ef4444' }
  }
]

const baseEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight' },
  { id: 'e2-3', source: '2', target: '3', type: 'straight' },
  { 
    id: 'e1-4', 
    source: '1', 
    target: '4', 
    type: 'default',
    label: 'Hidable Edge',
    style: { stroke: '#ef4444' } 
  }
]

const computedNodes = computed(() => {
  return baseNodes.map(node => ({
    ...node,
    hidden: (node.id === '2' || node.id === '4') ? isHidden.value : false
  }))
})

const computedEdges = computed(() => {
  return baseEdges.map(edge => ({
    ...edge,
    hidden: edge.id === 'e1-4' ? isHidden.value : false
  }))
})
<\/script>
`

const jsCode = toJs(tsCode)

const isHidden = ref(false)

const baseNodes = [
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Node 1' } },
  { 
    id: '2', 
    type: 'default', 
    position: { x: 100, y: 150 }, 
    data: { label: 'Node 2' },
    style: { border: '1px solid #ef4444', color: '#ef4444' }
  },
  { id: '3', type: 'output', position: { x: 100, y: 250 }, data: { label: 'Node 3' } },
  { 
    id: '4', 
    type: 'default', 
    position: { x: 350, y: 150 }, 
    data: { label: 'Node 4' },
    style: { border: '1px solid #ef4444', color: '#ef4444' }
  }
]

const baseEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight' },
  { id: 'e2-3', source: '2', target: '3', type: 'straight' },
  { 
    id: 'e1-4', 
    source: '1', 
    target: '4', 
    type: 'default',
    label: 'Hidden Edge',
    style: { stroke: '#ef4444' } 
  }
]

const computedNodes = computed(() => {
  return baseNodes.map(node => {
    if (node.id === '2' || node.id === '4') {
      return { ...node, hidden: isHidden.value }
    }
    return node
  })
})

const computedEdges = computed(() => {
  return baseEdges.map(edge => {
    if (edge.id === 'e1-4') {
      return { ...edge, hidden: isHidden.value }
    }
    return edge
  })
})
</script>

<DemoBlock title="Basic Hiding Logic" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 16px; align-items: center; z-index: 2;">
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; user-select: none;">
        <input type="checkbox" v-model="isHidden" style="cursor: pointer;" />
        Toggle Hidden Elements (Red Borders)
      </label>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        :model-value="{ x: 100, y: 0, zoom: 1 }"
        :nodes="computedNodes"
        :edges="computedEdges"
        background="grid"
      />
    </div>
  </div>
</DemoBlock>

## Why use `hidden`?

Using a `hidden` flag is superior to deleting items from your state array. It preserves the mathematical integrity of the graph (positions, dimensions, relationships) allowing you to restore them instantly without re-calculating layouts.

| Field         | Target          | Description                                                                                 |
| :------------ | :-------------- | :------------------------------------------------------------------------------------------ |
| `Node.hidden` | **Single Node** | When `true`, the node is skipped during the render cycle. Its coordinates remain preserved. |
| `Edge.hidden` | **Single Edge** | When `true`, the standard SVG path is not drawn.                                            |

> [!TIP]
>
> **Cascading Visibility**: When a **Node** is hidden, every **Edge** connected to it (either as a source or a target) is automatically hidden by the engine. This prevents "ghost" connections from cluttering the viewport when their anchors are missing.
