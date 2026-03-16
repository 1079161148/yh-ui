# Node Resizer (节点缩放)

In many diagramming scenarios, users need to manually adjust the dimensions of nodes, especially container nodes or text-heavy blocks. `yh-flow` provides a dedicated `NodeResizer` component that can be easily embedded into your custom node templates, providing 8-directional scaling handles.

## Node Resizer Example (节点缩放示例)

Select the node below; blue resize handles will appear around it. Drag the handles to resize, or drag the node to move it. The demo uses `v-model:nodes` so that node drag and resize stay in sync with the parent.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      v-model:nodes="nodes"
      :edges="edges"
      background="dots"
    >
      <template #node="{ node }">
        <div class="resizable-node" :style="{ background: node.data.color }">
          {{ node.data.label }}
          
          <!-- 1. Include and configure NodeResizer -->
          <yh-node-resizer
            :node-id="node.id"
            :selected="node.selected"
            :min-width="100"
            :min-height="50"
            @resize="data => onNodeResize(node.id, data)"
          />
        </div>
      <\/template>
    </yh-flow>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { 
    id: 'resizer-1', 
    type: 'custom', 
    position: { x: 100, y: 100 }, 
    width: 200, height: 100, 
    data: { label: 'Resizable Node', color: '#eff6ff' } 
  }
])
const edges = ref<Edge[]>([])

const onNodeResize = (nodeId: string, { width, height, x, y }) => {
  nodes.value = nodes.value.map(n => {
    if (n.id !== nodeId) return n
    const updated = { ...n, width, height, position: { ...n.position } }
    if (x !== undefined && x !== 0) updated.position.x += x
    if (y !== undefined && y !== 0) updated.position.y += y
    return updated
  })
}
<\/script>

<style scoped>
.resizable-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  font-size: 14px;
  color: #1e40af;
  position: relative; /* Must be relative for resizer layout */
}
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: 'resizer-1', type: 'custom', position: { x: 100, y: 100 }, width: 220, height: 120, data: { label: 'Resizable Node', color: '#eff6ff' } }
])

interface ResizePayload { width: number; height: number; x?: number; y?: number }

const onNodeResize = (nodeId: string, { width, height, x, y }: ResizePayload) => {
  nodes.value = nodes.value.map(n => {
    if (n.id !== nodeId) return n
    const updated = { ...n, width, height, position: { ...n.position } }
    if (x !== undefined && x !== 0) updated.position.x += x
    if (y !== undefined && y !== 0) updated.position.y += y
    return updated
  })
}
</script>

<DemoBlock title="Custom Node Resizing" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      v-model:nodes="nodes"
      :edges="[]"
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      background="dots"
    >
      <template #node="{ node }">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid #3b82f6; border-radius: 4px; font-size: 14px; color: #1e40af; position: relative;">
          {{ node.data.label }}
          <yh-node-resizer
            :node-id="node.id"
            :selected="node.selected"
            :min-width="100"
            :min-height="50"
            @resize="data => onNodeResize(node.id, data)"
          />
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## API Reference (API 概述)

### Props (属性)

| Name          | Type            | Default      | Description                                                        |
| :------------ | :-------------- | :----------- | :----------------------------------------------------------------- |
| `nodeId`      | `string`        | **Required** | The ID of the node being resized.                                  |
| `selected`    | `boolean`       | `false`      | Whether to display the handles (usually bound to `node.selected`). |
| `minWidth`    | `number`        | `50`         | Minimum width allowed.                                             |
| `minHeight`   | `number`        | `30`         | Minimum height allowed.                                            |
| `handleStyle` | `CSSProperties` | `{}`         | Custom CSS for the grab handles.                                   |

### Events (事件)

| Event          | Params                    | Detail                                                                                                          |
| :------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `@resize`      | `{ width, height, x, y }` | Fired continuously during dragging. `x` and `y` represent coordinate deltas when scaling from top/left borders. |
| `@resizeStart` | `MouseEvent`              | Fired when the user starts dragging a handle.                                                                   |
| `@resizeEnd`   | `MouseEvent`              | Fired when the resizing is completed.                                                                           |

> [!IMPORTANT]
>
> Because `NodeResizer` utilizes absolute positioning, your custom node container must have `position: relative` or `position: absolute` defined in its styles. Otherwise, the handles will float incorrectly outside the node boundaries.
