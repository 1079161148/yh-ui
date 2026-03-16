# Viewport Transition

Want to create a cinematic "flying" effect between nodes or points of interest? By combining `Flow` instance methods (like `setViewport`, `zoomTo`, or `fitView`) with native CSS transitions, you can create smooth, high-performance viewport animations without external animation libraries.

## Smooth Panning Demo

Click the buttons below to see the camera glide smoothly to specific "Interest Points" (POI) within the diagram.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="vt-container">
    <div class="vt-toolbar">
      <button class="vt-btn" @click="panToNode('1')">Focus Node 1</button>
      <button class="vt-btn" @click="panToNode('2')">Focus Node 2</button>
      <button class="vt-btn" @click="panToNode('3')">Focus Node 3</button>
      <button class="vt-btn reset" @click="fitView">Fit View (Center)</button>
    </div>
    
    <div class="vt-flowbox">
      <!-- Add a specific class to apply CSS transitions to the content layer -->
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
        class="animated-flow"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform, FlowInstance } from '@yh-ui/flow'

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 400, y: 300 }, data: { label: 'Node 2' } },
  { id: '3', type: 'output', position: { x: -250, y: 400 }, data: { label: 'Node 3' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier' }
])

const panToNode = (id: string) => {
  if (!flowRef.value) return
  const node = nodes.value.find(n => n.id === id)
  if (!node) return
  
  const targetZoom = 1.5
  
  // Get container dimensions to calculate the center point
  const flowEl = (flowRef.value as any).$el
  const canvasW = flowEl.clientWidth || 800
  const canvasH = flowEl.clientHeight || 500
  
  const nodeW = node.width || 200
  const nodeH = node.height || 50
  
  const targetX = (canvasW / 2) - (node.position.x + nodeW / 2) * targetZoom
  const targetY = (canvasH / 2) - (node.position.y + nodeH / 2) * targetZoom
  
  flowRef.value.setViewport({ x: targetX, y: targetY, zoom: targetZoom })
}

const fitView = () => {
  flowRef.value?.fitView({ padding: 30 })
}
<\/script>

<style scoped>
.vt-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.vt-toolbar {
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 8px;
}

.vt-btn {
  padding: 6px 12px;
  background: white;
  border: 1px solid #cbd5e1;
  color: #334155;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.vt-btn.reset {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  margin-left: auto;
}

/* The Secret: Add CSS transition to the internal content wrapper */
:deep(.animated-flow .yh-flow__content) {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 })
const nodes = ref<Node[]>([{ id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } }, { id: '2', type: 'default', position: { x: 400, y: 300 }, data: { label: 'Node 2' } }, { id: '3', type: 'output', position: { x: -250, y: 400 }, data: { label: 'Node 3' } }])
const edges = ref<Edge[]>([{ id: 'e1-2', source: '1', target: '2', type: 'bezier' }, { id: 'e1-3', source: '1', target: '3', type: 'bezier' }])

const panToNode = (id: string) => {
  if (!flowRef.value) return
  const node = nodes.value.find(n => n.id === id)
  if (!node) return
  const targetZoom = 1.6
  const flowEl = (flowRef.value as any).$el
  const canvasW = flowEl.clientWidth || 800
  const canvasH = flowEl.clientHeight || 500
  const nodeW = node.width || 200
  const nodeH = node.height || 50
  const targetX = (canvasW / 2) - (node.position.x + nodeW / 2) * targetZoom
  const targetY = (canvasH / 2) - (node.position.y + nodeH / 2) * targetZoom
  flowRef.value.setViewport({ x: targetX, y: targetY, zoom: targetZoom })
}
const fitView = () => { flowRef.value?.fitView({ padding: 30 }) }
</script>

<DemoBlock title="Smooth POI Panning" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 500px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; flex-wrap: wrap; z-index: 2;">
      <button @click="panToNode('1')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">Focus Node 1</button>
      <button @click="panToNode('2')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">Focus Node 2</button>
      <button @click="panToNode('3')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">Focus Node 3</button>
      <button @click="fitView" style="padding: 6px 12px; background: #3b82f6; color: white; border-radius: 4px; font-size: 13px; cursor: pointer; border: none; margin-left: auto;">Fit View</button>
    </div>
    <div style="flex: 1; height: 100%;">
      <component :is="'style'">
        .animated-flow .yh-flow__content {
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
      </component>
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
        class="animated-flow"
      />
    </div>
  </div>
</DemoBlock>

## How it Works

The `setViewport` and `fitView` methods update the `transform` property of the internal `.yh-flow__content` layer. By simply adding a CSS `transition` to this specific selector, you enable hardware-accelerated animations for "free".

| Method          | Role            | Logic                                                                                                             |
| :-------------- | :-------------- | :---------------------------------------------------------------------------------------------------------------- |
| `setViewport`   | Position Update | Coordinates the direct translation and scale of the content stage.                                                |
| `fitView`       | Auto-Scaling    | Calculates the bounding box of all nodes and sets a viewport that encompasses them within the current container.  |
| CSS Transitions | Interpolation   | Handles the smooth delta between the old and new `matrix()` values using the browser's native compositing engine. |

> [!TIP]
>
> Using CSS transitions for viewport movement is generally smoother than JS-based libraries because it offloads the heavy lifting to the GPU and avoids main-thread congestion during high-frequency graph rendering.
