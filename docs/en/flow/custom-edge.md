# Custom Edges

Edges are more than just paths between points. In `Flow`, you can utilize the `#edge` slot to fully hijack the rendering process. This enables you to attach complex interactive buttons, real-time status labels, or even dynamic fluid effects directly onto your connections.

## Interactive Edge Demo

In this example, we've added a functional "Delete" button to the center of the edge path. Clicking the button allows for immediate removal of the connection or execution of other business logic.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      background="dots"
    >
      <!-- 1. Use the #edge slot to override rendering -->
      <template #edge="{ edge, path, 'label-x': labelX, 'label-y': labelY }">
        <g style="pointer-events: auto;">
          <!-- Render the edge path -->
          <path
            :d="path"
            fill="none"
            :stroke="edge.selected ? '#3b82f6' : '#94a3b8'"
            :stroke-width="edge.selected ? 3 : 2"
          />
          
          <!-- Tool center button -->
          <foreignObject
            :x="(labelX || 0) - 15"
            :y="(labelY || 0) - 15"
            width="30"
            height="30"
          >
            <div 
              class="edge-remove-btn"
              @mousedown.stop
              @click.stop="onRemoveEdge(edge.id)"
            >
              ×
            </div>
          </foreignObject>
        </g>
      </template>
    </yh-flow>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: 'ca', type: 'input', position: { x: 50, y: 150 }, data: { label: 'Node A' } },
  { id: 'cb', type: 'output', position: { x: 350, y: 150 }, data: { label: 'Node B' } }
])

const edges = ref<Edge[]>([
  { 
    id: 'e-ca-cb', 
    source: 'ca', 
    target: 'cb', 
    type: 'custom', 
    style: { strokeWidth: 2, stroke: '#94a3b8' } 
  }
])

const onRemoveEdge = (id: string) => {
  console.log('Removing edge:', id)
  edges.value = edges.value.filter(e => e.id !== id)
}
<\/script>

<style scoped>
.custom-edge-group:hover path {
  stroke: #3b82f6 !important;
  stroke-width: 3px !important;
}

.edge-remove-btn {
  width: 24px;
  height: 24px;
  background: white;
  border: 1.5px solid #ef4444;
  border-radius: 50%;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.2s;
}
.edge-remove-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: 'ca', type: 'input', position: { x: 50, y: 150 }, data: { label: 'Node A' } },
  { id: 'cb', type: 'output', position: { x: 350, y: 150 }, data: { label: 'Node B' } }
])

const edges = ref<Edge[]>([
  { id: 'e-ca-cb', source: 'ca', target: 'cb', type: 'custom', style: { strokeWidth: 2, stroke: '#94a3b8' } }
])

const onRemoveEdge = (id: string) => {
  console.log('Removing edge:', id)
  edges.value = edges.value.filter(e => e.id !== id)
}
</script>

<DemoBlock title="Edge with Removal Tool" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      background="dots"
    >
      <template #edge="{ edge, path, 'label-x': labelX, 'label-y': labelY }">
        <g style="pointer-events: auto;">
          <path
            :d="path"
            fill="none"
            :style="{ stroke: '#94a3b8', strokeWidth: 2 }"
          />
          <foreignObject
            :x="(labelX || 0) - 15"
            :y="(labelY || 0) - 15"
            width="30"
            height="30"
            style="pointer-events: auto; overflow: visible;"
          >
            <div 
              @mousedown.stop
              @click.stop="onRemoveEdge(edge.id)"
              style="width: 24px; height: 24px; background: #fff; border: 1.5px solid #ef4444; border-radius: 50%; color: #ef4444; font-size: 16px; font-weight: bold; display: flex; align-items: center; justify-content: center; cursor: pointer; pointer-events: auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); transition: all 0.2s ease;"
            >
              ×
            </div>
          </foreignObject>
        </g>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## Mechanics

1.  **Slot Data**: The `#edge` slot exposes the `edge` data object (including computed `labelX` and `labelY` coordinates) and a pre-calculated SVG `path` command string.
2.  **SVG Context**: Since you are rendering inside an `<svg>` element, you should use `<g>` (group) tags to wrap your path and UI overlays together.
3.  **HTML Overlays (foreignObject)**: To use standard HTML elements (like `div` or `button`) inside the SVG, they must be wrapped in a `<foreignObject>` with defined `width` and `height`.
4.  **Event Bubbling**: Use `@click.stop` on your overlay buttons to prevent the `Flow` engine from triggering selection or other edge-level click handlers.
