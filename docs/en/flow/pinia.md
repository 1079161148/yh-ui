# Pinia Store

In large-scale applications, managing complex graph data within a local component `ref` can become difficult to maintain and share across views. The recommended approach is to use [Pinia](https://pinia.vuejs.org/) to handle all flow-related states, treating it as a centralized, reactive database for your diagramming logic.

## Pinia Integration Demo

In this demo, all node positions, edge configurations, and viewport transformations are synchronized with a Pinia store. This ensures data persistence across page transitions and enables complex cross-component interactions.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="pinia-container">
    <div class="pinia-toolbar">
      <button class="pinia-btn" @click="flowStore.randomize">Randomize Positions</button>
      <button class="pinia-btn add" @click="flowStore.addNode">Add Dynamic Node</button>
      <div class="node-count">Total Nodes: {{ flowStore.nodes.length }}</div>
    </div>
    
    <div class="pinia-flowbox">
      <yh-flow
        v-model="flowStore.viewport"
        :nodes="flowStore.nodes"
        :edges="flowStore.edges"
        background="dots"
        @node-drag-end="flowStore.onNodeDragEnd"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

// 1. Define your Flow Logic Store
export const useFlowStore = defineStore('flow-logic', () => {
  const nodes = ref<Node[]>([
    { id: 'p1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Managed by Pinia' } }
  ])
  const edges = ref<Edge[]>([])
  const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

  const addNode = () => {
    const id = \node-\{nodes.value.length + 1}\
    nodes.value.push({
      id,
      type: 'default',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: \New \{id}\ }
    })
  }

  const randomize = () => {
    // Treat nodes as immutable or mutate selectively
    nodes.value = nodes.value.map(n => ({
      ...n,
      position: { x: Math.random() * 300, y: Math.random() * 200 }
    }))
  }

  const onNodeDragEnd = ({ node, position }: { node: Node, position: { x: number, y: number } }) => {
     const target = nodes.value.find(n => n.id === node.id)
     if (target) {
       target.position = position
     }
  }

  return { nodes, edges, viewport, addNode, randomize, onNodeDragEnd }
})

const flowStore = useFlowStore()
<\/script>

<style scoped>
.pinia-container {
  display: flex;
  flex-direction: column;
  height: 450px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.pinia-toolbar {
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 12px;
  align-items: center;
}

.pinia-btn {
  padding: 6px 14px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.pinia-btn.add {
  background: #10b981;
}

.node-count {
  font-size: 12px;
  color: #64748b;
  margin-left: auto;
}

.pinia-flowbox {
  flex: 1;
  height: 100%;
}
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: 'p1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Managed by Pinia' } }
])
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const addNode = () => {
  const id = `node-${nodes.value.length + 1}`
  nodes.value.push({
    id,
    type: 'default',
    position: { x: Math.random() * 200, y: Math.random() * 200 },
    data: { label: `New ${id}` }
  })
}

const randomize = () => {
  nodes.value = nodes.value.map(n => ({
    ...n,
    position: { x: Math.random() * 300, y: Math.random() * 200 }
  }))
}
</script>

<DemoBlock title="Centralized State Management" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; align-items: center; z-index: 2;">
      <button @click="randomize" style="padding: 6px 14px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer;">Randomize Positions</button>
      <button @click="addNode" style="padding: 6px 14px; background: #10b981; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer;">Add Dynamic Node</button>
      <div style="font-size: 12px; color: #64748b; margin-left: auto;">Total Nodes: {{ nodes.length }}</div>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        v-model="viewport"
        :nodes="nodes"
        :edges="[]"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## Best Practices

1.  **Setup Styles**: We strongly recommend using Pinia's "Setup Store" (functional syntax). This allows you to use standard Vue Composition API features like `computed` and `watch` inside your store, which aligns perfectly with `Flow`'s architecture.
2.  **Granular Updates**: For performance reasons, avoid large-scale array replacements unless necessary. Modifying specific properties deeper in the node object (e.g., `node.data.label = 'Value'`) is highly efficient as it leverages Vue's fine-grained reactivity.
3.  **Cross-Instance Syncing**: If your application uses multiple `Flow` instances, Pinia is the ideal choice for sharing logic and state (like a unified "clipboard") between them.
