# Updatable Edges

`Flow` provides an "Updatable Edge" feature that allows users to reassign the endpoints of an existing connection. When an edge is marked as `updatable: true`, interactive handles appear at both ends when selected, enabling users to drag and snap them to different nodes.

## Basic Usage

Click the "UPDATEABLE EDGE" connector below. You will see handles appear at the source and target. Drag one of these handles to another node鈥攆or example, moving the target from Node B to Node C.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform, Connection } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="width: 100%; height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      v-model="viewport"
      :nodes="nodes"
      :edges="edges"
      :edges-connectable="true"
      background="dots"
      @edge-update="handleEdgeUpdate"
    />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform, Connection } from '@yh-ui/flow'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  {
    id: 'A',
    type: 'default',
    position: { x: 250, y: 50 },
    data: { label: 'Node A' },
    style: { border: '2px solid #3b82f6', color: '#1e3a8a', width: '150px' }
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 100, y: 200 },
    data: { label: 'Node B' },
    style: { width: '150px' }
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 400, y: 200 },
    data: { label: 'Node C' },
    style: { backgroundColor: '#f1f5f9', color: '#475569', width: '150px' }
  }
])

const edges = ref<Edge[]>([
  {
    id: 'eA-B',
    source: 'A',
    target: 'B',
    type: 'bezier',
    label: 'UPDATEABLE EDGE',
    updatable: true,
    style: { strokeWidth: 2, stroke: '#3b82f6' }
  }
])

const handleEdgeUpdate = ({ edge, connection }: { edge: Edge; connection: Connection }) => {
  console.log('Edge updated:', edge.id, 'to:', connection)
}
<\/script>`

const jsCode = toJs(tsCode)

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  {
    id: 'A',
    type: 'default',
    position: { x: 250, y: 50 },
    data: { label: 'Node A' },
    style: { border: '2px solid #3b82f6', color: '#1e3a8a', width: '150px' }
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 100, y: 200 },
    data: { label: 'Node B' },
    style: { width: '150px' }
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 400, y: 200 },
    data: { label: 'Node C' },
    style: { backgroundColor: '#f1f5f9', color: '#475569', width: '150px' }
  }
])

const edges = ref<Edge[]>([
  {
    id: 'eA-B',
    source: 'A',
    target: 'B',
    type: 'bezier',
    label: 'UPDATEABLE EDGE',
    updatable: true,
    style: { strokeWidth: 2, stroke: '#3b82f6' }
  }
])

const handleEdgeUpdate = ({ edge, connection }: { edge: Edge; connection: Connection }) => {
  console.log('Edge updated:', edge.id, 'to:', connection)
}
</script>

<DemoBlock title="Interactive Edge Update" :ts-code="tsCode" :js-code="jsCode">
  <div style="width: 100%; height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      v-model="viewport"
      :nodes="nodes"
      v-model:edges="edges"
      :edges-connectable="true"
      background="dots"
      @edge-update="handleEdgeUpdate"
    />
  </div>
</DemoBlock>

## Configuration

### `Edge.updatable`

Set `updatable: true` in your edge metadata to enable the drag-to-reconnect handles:

```ts
const edge = {
  id: 'edge-1',
  source: 'node-1',
  target: 'node-2',
  updatable: true // Enables endpoint handles on selection
}
```

### `@edge-update` Event

When a user successfully finishes dragging an endpoint to a new anchor, the `@edge-update` event is emitted. The engine automatically synchronizes the viewport, but you should use this hook to update your backend state.

| Event Payload                            | Description                                                              |
| :--------------------------------------- | :----------------------------------------------------------------------- |
| `{ edge: Edge, connection: Connection }` | Emitted when a user successfully completes an edge reconnection gesture. |
