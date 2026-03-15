# Multi Flow

In complex management systems, you may need to display multiple independent flow charts on a single page鈥攆or example, a source process on the left and a transformed target process on the right.

`Flow` is designed with an isolated architecture. Each component instance operates within its own coordinate system, maintains its own selection state, and manages its own undo/redo stacks and plugin ecosystem.

## Multi-Instance Interaction Demo

The following demo features two completely distinct `Flow` instances. You can move nodes from the "Source" board to the "Target" board by selecting them and clicking the transfer button in the middle.

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="multi-container">
    <div class="flow-panel">
      <div class="panel-header">Source Flow</div>
      <yh-flow
        v-model="viewport1"
        :nodes="nodes1"
        :edges="edges1"
        background="dots"
        @selection-change="s => selection1 = s.selectedNodes"
      />
    </div>

    <div class="action-bar">
      <button 
        class="move-btn" 
        :disabled="selection1.length === 0"
        @click="transferToRight"
      >
        Transfer Selected 猱?
      </button>
    </div>

    <div class="flow-panel">
      <div class="panel-header">Target Flow</div>
      <yh-flow
        v-model="viewport2"
        :nodes="nodes2"
        :edges="edges2"
        background="grid"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const viewport1 = ref<ViewportTransform>({ x: 0, y: 0, zoom: 0.8 })
const viewport2 = ref<ViewportTransform>({ x: 0, y: 0, zoom: 0.8 })

const nodes1 = ref<Node[]>([
  { id: 'S1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Source A' } },
  { id: 'S2', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Source B' } }
])
const edges1 = ref<Edge[]>([])

const nodes2 = ref<Node[]>([
  { id: 'T1', type: 'output', position: { x: 50, y: 100 }, data: { label: 'Target Root' } }
])
const edges2 = ref<Edge[]>([])

const selection1 = ref<Node[]>([])

const transferToRight = () => {
  selection1.value.forEach(node => {
    // 1. Remove from source
    nodes1.value = nodes1.value.filter(n => n.id !== node.id)
    
    // 2. Inject into target with a unique ID
    nodes2.value.push({
      ...node,
      id: \moved-\{node.id}-\{Date.now()}\,
      selected: false,
      position: { x: 50, y: nodes2.value.length * 80 + 50 }
    })
  })
  selection1.value = []
}
<\/script>

<style scoped>
.multi-container { display: flex; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white; }
.flow-panel { flex: 1; display: flex; flex-direction: column; border: 1px solid #f1f5f9; }
.panel-header { padding: 8px; background: #f8fafc; font-size: 12px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9; text-align: center; }
.action-bar { width: 120px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; }
.move-btn { padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer; }
.move-btn:disabled { background: #cbd5e1; cursor: not-allowed; }
<\/style>`

const jsCode = toJs(tsCode)

const viewport1 = ref<ViewportTransform>({ x: 20, y: 20, zoom: 0.8 })
const viewport2 = ref<ViewportTransform>({ x: 20, y: 20, zoom: 0.8 })
const nodes1 = ref<Node[]>([{ id: 'S1', type: 'input', position: { x: 20, y: 50 }, data: { label: 'Source A' } }, { id: 'S2', type: 'default', position: { x: 20, y: 150 }, data: { label: 'Source B' } }])
const nodes2 = ref<Node[]>([{ id: 'T1', type: 'output', position: { x: 20, y: 20 }, data: { label: 'Target Root' } }])
const selection1 = ref<Node[]>([])

const transferToRight = () => {
  selection1.value.forEach(node => {
    nodes1.value = nodes1.value.filter(n => n.id !== node.id)
    nodes2.value.push({
      ...node,
      id: `moved-${node.id}-${Date.now()}`,
      selected: false,
      position: { x: 20, y: nodes2.value.length * 80 + 20 }
    })
  })
  selection1.value = []
}
</script>

<DemoBlock title="Concurrent Instances" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <div style="flex: 1; display: flex; flex-direction: column; position: relative;">
      <div style="padding: 8px; background: #f8fafc; font-size: 12px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9; text-align: center;">Source Flow</div>
      <yh-flow
        v-model="viewport1"
        :nodes="nodes1"
        :edges="[]"
        background="dots"
        @selection-change="s => selection1 = s.selectedNodes"
      />
    </div>
    <div style="width: 120px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; z-index: 5;">
      <button 
        style="padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
        :disabled="selection1.length === 0"
        @click="transferToRight"
      >
        Transfer Selected 猱?
      </button>
    </div>
    <div style="flex: 1; display: flex; flex-direction: column; position: relative;">
      <div style="padding: 8px; background: #f8fafc; font-size: 12px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9; text-align: center;">Target Flow</div>
      <yh-flow
        v-model="viewport2"
        :nodes="nodes2"
        :edges="[]"
        background="grid"
      />
    </div>
  </div>
</DemoBlock>

## Key Concepts

1.  **State Isolation**: Viewport transforms, selection states, and history stacks (undo/redo) are strictly local to each instance. You don't need to worry about cross-contamination.
2.  **Parent-Driven Sync**: Multi-instance communication is best handled through parent component state (as shown in this demo) or a global store like Pinia.
3.  **Performance Scalability**: While multiple instances can be active, each adds its own event listeners and rendering overhead. For most desktop browsers, showing 3-5 concurrent flows (with <100 nodes each) is highly performant.
