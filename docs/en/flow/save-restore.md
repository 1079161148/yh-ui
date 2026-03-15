# Save & Restore

In diagram editors, it is crucial to persist the graph's state (Nodes, Edges, and Viewport transformations) so users can resume their work later. `Flow` provides convenient instance methods to extract and rehydrate the entire board state.

## Basic Persistence Demo

Modify the graph below, then try the "Save" and "Restore" buttons. We use browser `localStorage` to simulate a persistent data layer.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="sr-container">
    <div class="sr-toolbar">
      <button class="sr-btn" @click="saveState">Save to LocalStorage</button>
      <button class="sr-btn restore" @click="restoreState">Restore State</button>
      <button class="sr-btn clear" @click="clearState">Clear Canvas</button>
      <div v-if="saveTime" class="sr-tip">Last Saved: {{ saveTime }}</div>
    </div>
    
    <div class="sr-flowbox">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform, FlowInstance } from '@yh-ui/flow'

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 2' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' }
])

const saveTime = ref('')
const STORAGE_KEY = 'yh-flow-persistence-demo'

const saveState = () => {
  if (!flowRef.value) return
  
  // Extract state directly from the engine instance
  const data = {
    nodes: flowRef.value.getNodes(),
    edges: flowRef.value.getEdges(),
    viewport: flowRef.value.getViewport()
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  saveTime.value = new Date().toLocaleTimeString()
}

const restoreState = () => {
  const dataStr = localStorage.getItem(STORAGE_KEY)
  if (dataStr) {
    const data = JSON.parse(dataStr)
    nodes.value = data.nodes || []
    edges.value = data.edges || []
    if (data.viewport) {
      flowRef.value?.setViewport(data.viewport)
    }
  }
}

const clearState = () => {
  nodes.value = []
  edges.value = []
}
<\/script>

<style scoped>
.sr-container {
  display: flex; flex-direction: column; height: 450px; width: 100%;
  border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;
}
.sr-toolbar {
  padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee;
  display: flex; gap: 8px; align-items: center;
}
.sr-btn {
  padding: 6px 12px; background: #3b82f6; color: white; border-radius: 4px;
  font-size: 13px; cursor: pointer; border: none;
}
.sr-btn.restore { background: #10b981; }
.sr-btn.clear { background: #ef4444; }
.sr-tip { font-size: 12px; color: #64748b; margin-left: auto; }
.sr-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 2' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' }
])

const saveTime = ref('')
const STORAGE_KEY = 'yh-flow-persistence-demo'

const saveState = () => {
  if (!flowRef.value) return
  const data = {
    nodes: flowRef.value.getNodes(),
    edges: flowRef.value.getEdges(),
    viewport: flowRef.value.getViewport()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  saveTime.value = new Date().toLocaleTimeString()
}

const restoreState = () => {
  const dataStr = localStorage.getItem(STORAGE_KEY)
  if (dataStr) {
    const data = JSON.parse(dataStr)
    nodes.value = data.nodes || []
    edges.value = data.edges || []
    if (data.viewport) {
      flowRef.value?.setViewport(data.viewport)
    }
  }
}

const clearState = () => { nodes.value = []; edges.value = [] }
</script>

<DemoBlock title="State Persist & Load" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; align-items: center; z-index: 2;">
      <button @click="saveState" style="padding: 6px 12px; background: #3b82f6; color: white; border-radius: 4px; font-size: 13px; border:none; cursor:pointer;">Save</button>
      <button @click="restoreState" style="padding: 6px 12px; background: #10b981; color: white; border-radius: 4px; font-size: 13px; border:none; cursor:pointer;">Restore</button>
      <button @click="clearState" style="padding: 6px 12px; background: #ef4444; color: white; border-radius: 4px; font-size: 13px; border:none; cursor:pointer;">Clear</button>
      <div v-if="saveTime" style="font-size: 12px; color: #64748b; margin-left: auto;">Saved at: {{ saveTime }}</div>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## Core Principles

There are two primary ways to capture the state of your diagram for persistence:

1.  **Pull from Engine Instance**: This is the most accurate method. Access the `FlowInstance` (via `ref`) and call methods like `getNodes()` and `getEdges()`. This retrieves the current internal state of all entities, including user-driven position changes.
2.  **External Reactive State**: If you are using a global state manager (like Pinia), you can synchronize your `nodes` and `edges` arrays whenever a change event (like `@nodes-drag-end`) is emitted by the component.

### Instance Methods Reference

| Method         | Return Type | Description                                                                                              |
| :------------- | :---------- | :------------------------------------------------------------------------------------------------------- |
| `getNodes()`   | `Node[]`    | Returns a deep snapshot of all nodes currently in the engine.                                            |
| `getEdges()`   | `Edge[]`    | Returns a deep snapshot of all edges currently in the engine.                                            |
| `exportJson()` | `string`    | [(Export Plugin required)] Wraps internal graph data into a serialized string for easy network transfer. |
