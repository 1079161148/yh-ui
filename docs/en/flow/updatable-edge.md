# Updatable Edges

`yh-flow` provides an "Updatable Edge" feature that allows users to reassign the endpoints of an existing connection.

### How it Works

When an edge is marked as `updatable: true` and is **selected** in the view, blue circular handles appear at both ends (source and target). Drag a handle to another node to update the connection. If you don’t see handles, **click the edge** first to select it.

## Basic Usage

In the demo below the edge is selected by default, so blue handles are visible at both ends. Try dragging the target from **Node B** to **Node C**. If you click the pane and the edge is deselected, click the edge again to show the handles.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform, Connection } from '@yh-ui/flow'

const tsCode = `<template>
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
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform, Connection } from '@yh-ui/flow'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  {
    id: 'A',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { label: 'Node A' },
    width: 150,
    height: 50,
    style: { border: '2px solid #3b82f6', color: '#1e3a8a' }
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 100, y: 150 },
    data: { label: 'Node B' },
    width: 150,
    height: 50
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 400, y: 150 },
    data: { label: 'Node C' },
    width: 150,
    height: 50,
    style: { backgroundColor: '#f1f5f9', color: '#475569' }
  }
])

const edges = ref<Edge[]>([
  {
    id: 'eA-B',
    source: 'A',
    target: 'B',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'bezier',
    label: 'UPDATEABLE EDGE',
    updatable: true,
    selected: true,
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
    position: { x: 250, y: 0 },
    data: { label: 'Node A' },
    width: 150,
    height: 50,
    style: { border: '2px solid #3b82f6', color: '#1e3a8a' }
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 100, y: 150 },
    data: { label: 'Node B' },
    width: 150,
    height: 50
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 400, y: 150 },
    data: { label: 'Node C' },
    width: 150,
    height: 50,
    style: { backgroundColor: '#f1f5f9', color: '#475569' }
  }
])

const edges = ref<Edge[]>([
  {
    id: 'eA-B',
    source: 'A',
    target: 'B',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'bezier',
    label: 'UPDATEABLE EDGE',
    updatable: true,
    selected: true,
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

## API Configuration

### Edge Properties

Set the following properties in your `Edge` object:

| Property      | Type                              | Default | Description                                                                                                                 |
| :------------ | :-------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `updatable`   | `boolean \| 'source' \| 'target'` | `false` | Whether to enable reconnection handles. If set to `'source'` or `'target'`, only that end can be updated.                   |
| `selected`    | `boolean`                         | `false` | Handles are shown only when the edge is **selected**. Set `selected: true` on the edge if you want handles visible on load. |
| `curvature`   | `number`                          | `0.25`  | Curvature of the bezier path (0.0 to 1.0).                                                                                  |
| `labelShowBg` | `boolean`                         | `false` | Whether to show the background color for the label (used with `labelBgColor`).                                              |

### Events

| Event          | Payload                                  | Description                                                        |
| :------------- | :--------------------------------------- | :----------------------------------------------------------------- |
| `@edge-update` | `{ edge: Edge, connection: Connection }` | Emitted when a user finishes dragging an endpoint to a new anchor. |
