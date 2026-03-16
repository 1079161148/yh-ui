# Drag & Drop

A common requirement for visual editors is allowing users to drag node templates from a sidebar and drop them onto the canvas. `Flow` facilitates this by providing the `screenToCanvas` utility, which handles all coordinate transformations including zoom and pan offsets.

## Interactive Drag & Drop Demo

Drag any node block from the sidebar on the left and drop it into the gray canvas area on the right.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, Node, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="dnd-container">
    <div class="dnd-sidebar">
      <div class="sidebar-title">Templates:</div>
      <div 
        class="dnd-node input" 
        draggable="true" 
        @dragstart="onDragStart($event, 'input')"
      >
        Input Block
      </div>
      <div 
        class="dnd-node default" 
        draggable="true" 
        @dragstart="onDragStart($event, 'default')"
      >
        Standard Block
      </div>
      <div 
        class="dnd-node output" 
        draggable="true" 
        @dragstart="onDragStart($event, 'output')"
      >
        Output Block
      </div>
    </div>
    
    <div class="dnd-flowbox" @drop="onDrop" @dragover="onDragOver">
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
  { id: '1', type: 'input', position: { x: 250, y: 5 }, data: { label: 'Existing Node' } }
])
const edges = ref<Edge[]>([])

let id = 0
const getId = () => \`dndnode_\${id++}\`

const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/yhflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!flowRef.value) return
  
  const type = event.dataTransfer?.getData('application/yhflow')
  if (!type) return

  // screenToCanvas requires coordinates relative to the Flow container
  const el = (flowRef.value as any).$el
  const rect = el?.getBoundingClientRect()
  if (!rect) return
  const position = flowRef.value.screenToCanvas(event.clientX - rect.left, event.clientY - rect.top)
  
  const newNode: Node = {
    id: getId(),
    type,
    position,
    data: { label: \`New \${type} Node\` }
  }
  
  nodes.value.push(newNode)
}
<\/script>

<style scoped>
.dnd-container { display: flex; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.dnd-sidebar { width: 150px; border-right: 1px solid #eee; padding: 15px 10px; background: #f8fafc; display: flex; flex-direction: column; gap: 12px; }
.sidebar-title { font-size: 13px; color: #64748b; margin-bottom: 8px; }
.dnd-node { padding: 10px 12px; border: 1px solid #1a192b; border-radius: 4px; cursor: grab; background: white; font-size: 13px; text-align: center; transition: all 0.2s; }
.dnd-node:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.dnd-node.input { border-color: #3b82f6; color: #3b82f6; }
.dnd-node.output { border-color: #10b981; color: #10b981; }
.dnd-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 250, y: 5 }, data: { label: 'Existing Node' } }
])

let idCount = 0
const getId = () => `dndnode_${idCount++}`

const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/yhflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!flowRef.value) return
  const type = event.dataTransfer?.getData('application/yhflow')
  if (!type) return
  const el = (flowRef.value as any).$el
  const rect = el?.getBoundingClientRect()
  if (!rect) return
  const position = flowRef.value.screenToCanvas(event.clientX - rect.left, event.clientY - rect.top)
  nodes.value.push({
    id: getId(),
    type,
    position,
    data: { label: `New ${type} Node` }
  })
}
</script>

<DemoBlock title="Native HTML5 Drag & Drop" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="width: 150px; border-right: 1px solid #eee; padding: 15px 10px; background: #f8fafc; display: flex; flex-direction: column; gap: 12px; z-index: 2;">
      <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">Templates:</div>
      <div style="padding: 10px 12px; border: 1px solid #3b82f6; color: #3b82f6; border-radius: 4px; cursor: grab; background: white; font-size: 13px; text-align: center;" draggable="true" @dragstart="onDragStart($event, 'input')">Input Node</div>
      <div style="padding: 10px 12px; border: 1px solid #1a192b; color: #1a192b; border-radius: 4px; cursor: grab; background: white; font-size: 13px; text-align: center;" draggable="true" @dragstart="onDragStart($event, 'default')">Standard Node</div>
      <div style="padding: 10px 12px; border: 1px solid #10b981; color: #10b981; border-radius: 4px; cursor: grab; background: white; font-size: 13px; text-align: center;" draggable="true" @dragstart="onDragStart($event, 'output')">Output Node</div>
    </div>
    <div style="flex: 1; height: 100%;" @drop="onDrop" @dragover="onDragOver">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="[]"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## Implementation Details

The core of the drag-and-drop workflow is the `screenToCanvas` method. Standard browser mouse coordinates (`clientX`, `clientY`) are relative to the browser window, whereas the items inside `Flow` are offset by the current pan position and compressed/expanded by the current zoom level.

### Transformation Utility

| Method                 | Description                                                                                                                           | Signature                                            |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------- |
| `screenToCanvas(x, y)` | Takes coordinates relative to the Flow container (px) and returns the corresponding coordinates within the graph's coordinate system. | `(x: number, y: number) => { x: number, y: number }` |

### Step-by-Step Logic

1.  Attach `draggable="true"` and `@dragstart` to your sidebar elements to store the node type in `dataTransfer`.
2.  Enable `@dragover` on the container to allow dropping.
3.  In the `@drop` handler, calculate the relative offset by subtracting the container's `getBoundingClientRect()` from `clientX/Y`.
4.  Pass the relative coordinates to `flowInstance.screenToCanvas`.
5.  Push a new entry into your `nodes` array with the resulting position.
