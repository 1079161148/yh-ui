# Simple Layout

When handling large sets of automatically generated data, manually specifying coordinates for every node is inefficient. While `Flow` remains lightweight by not bundling exhaustive layout algorithms, it is designed to integrate perfectly with industry-standard layout engines like [dagre](https://github.com/dagrejs/dagre) or [ELK](https://github.com/kieler/elkjs).

## Dagre Auto-Layout Demo

Click the buttons below to trigger the Dagre algorithm. It will calculate the optimal hierarchical structure for the nodes and batch-update their positions instantly.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="layout-container">
    <div class="layout-toolbar">
      <button class="layout-btn" @click="onLayout('TB')">Vertical (TB)</button>
      <button class="layout-btn" @click="onLayout('LR')">Horizontal (LR)</button>
    </div>
    
    <div class="layout-flowbox">
      <yh-flow
        ref="flowRef"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
// Requirement: npm install dagre
import dagre from 'dagre'

const flowRef = ref<FlowInstance>()

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 2' } },
  { id: '3', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 3' } },
  { id: '4', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 4' } },
  { id: '5', type: 'output', position: { x: 0, y: 0 }, data: { label: 'Node 5' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' }
])

const onLayout = (direction: 'TB' | 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  
  // 1. Configure layout parameters
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: 50,
    ranksep: 70 
  })

  // 2. Feed Flow data into Dagre
  nodes.value.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 })
  })

  edges.value.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // 3. Perform the heavy lifting (Calculation)
  dagre.layout(dagreGraph)

  // 4. Map calculated coordinates back to responsive Flow data
  nodes.value = nodes.value.map((node) => {
    const calculated = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: calculated.x - 75, // Adjust for center-pivot calculation
        y: calculated.y - 25
      }
    }
  })
}
<\/script>

<style scoped>
.layout-container { display: flex; flex-direction: column; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.layout-toolbar { padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; }
.layout-btn { padding: 6px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer; }
.layout-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Node 2' } },
  { id: '3', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 3' } },
  { id: '4', type: 'default', position: { x: 150, y: 250 }, data: { label: 'Node 4' } },
  { id: '5', type: 'output', position: { x: 150, y: 350 }, data: { label: 'Node 5' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' }
])

const onLayout = async (direction: 'TB' | 'LR') => {
  try {
    const dagre = (await import('dagre')).default
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 })
    nodes.value.forEach((node) => dagreGraph.setNode(node.id, { width: 150, height: 50 }))
    edges.value.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target))
    dagre.layout(dagreGraph)
    nodes.value = nodes.value.map((node) => {
      const calculated = dagreGraph.node(node.id)
      return { ...node, position: { x: calculated.x - 75, y: calculated.y - 25 } }
    })
  } catch (err) {
    console.warn('Dagre library missing.')
  }
}
</script>

<DemoBlock title="Dagre Hierarchical Layout" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; z-index: 2;">
      <button @click="onLayout('TB')" style="padding: 6px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">Vertical (TB)</button>
      <button @click="onLayout('LR')" style="padding: 6px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">Horizontal (LR)</button>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        :model-value="{ x: 100, y: 50, zoom: 0.8 }"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## Implementation Workflow

To apply an external layout to your flow, follow these steps:

1.  **Initialize the Engine**: Create an instance of your chosen layout library (e.g., Dagre).
2.  **Sync the Topology**: Loop through your `nodes` and `edges` arrays to mirror the structure in the layout engine. _Note: Most layout engines require you to provide node dimensions (width/height) to calculate spacing accurately._
3.  **Run Calculations**: Execute the layout command.
4.  **Rehydrate State**: Extract the resulting `x, y` values from the layout engine and batch-update your reactive `nodes` collection in Vue.

> [!TIP]
>
> For a more polished user experience, you can complement layout changes with CSS transitions to make nodes glide to their new positions. See the **[Layout & Animation](./layout-animation)** section for details.
