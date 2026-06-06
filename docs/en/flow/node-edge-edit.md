# Node and Edge Editing

Flow supports visual editing of nodes and edges. Double-click a node or an edge to open the editing panel and modify its properties.

## Features

- **Node editing**: Double-click a node to open the panel; edit label, description, size, background color, border color, border radius, etc.
- **Edge editing**: Double-click an edge to open the panel; edit label, edge type, color, width, animation, etc.
- **Undo/Redo**: Editing changes are recorded in history.

## Basic Usage

Double-click any **node** or **edge** in the flowchart below. The editing panel will open on the right where you can change labels, styles, and other properties. The demo uses `v-model:nodes` and `v-model:edges` so that edits stay in sync with the parent.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="width: 100%; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      v-model="viewport"
      v-model:nodes="nodes"
      v-model:edges="edges"
      show-controls
      background="dots"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 120 }, data: { label: 'Start' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 320, y: 80 }, data: { label: 'Process A' }, width: 120, height: 50 },
  { id: '3', type: 'default', position: { x: 320, y: 200 }, data: { label: 'Process B' }, width: 120, height: 50 },
  { id: '4', type: 'output', position: { x: 540, y: 140 }, data: { label: 'End' }, width: 120, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: 'Branch 1' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: 'Branch 2' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])
<\/script>`

const jsCode = toJs(tsCode)

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 120 }, data: { label: 'Start' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 320, y: 80 }, data: { label: 'Process A' }, width: 120, height: 50 },
  { id: '3', type: 'default', position: { x: 320, y: 200 }, data: { label: 'Process B' }, width: 120, height: 50 },
  { id: '4', type: 'output', position: { x: 540, y: 140 }, data: { label: 'End' }, width: 120, height: 50 }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: 'Branch 1' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: 'Branch 2' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])
</script>

<DemoBlock title="Node & Edge Editing" :ts-code="tsCode" :js-code="jsCode">
  <div style="width: 100%; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      v-model="viewport"
      v-model:nodes="nodes"
      v-model:edges="edges"
      show-controls
      background="dots"
    />
  </div>
</DemoBlock>

## Node Editing Panel

After double-clicking a node, the node editing panel appears on the right with:

| Property         | Description                |
| ---------------- | -------------------------- |
| Label            | Text displayed on the node |
| Description      | Node description           |
| Size             | Width and height           |
| Background Color | Node background color      |
| Border Color     | Node border color          |
| Border Radius    | Corner radius              |

## Edge Editing Panel

After double-clicking an edge, the edge editing panel appears on the right with:

| Property      | Description                        |
| ------------- | ---------------------------------- |
| Label         | Text on the edge                   |
| Edge Type     | bezier, smoothstep, step, straight |
| Animated Edge | Enable flow animation              |
| Stroke Color  | Edge color                         |
| Stroke Width  | Edge thickness                     |

| Show Label Background  | Toggle label background |
| ---------------------- | ----------------------- |
| Label Background Color | Label background color  |

## Readonly Mode

In `readonly` mode, double-clicking nodes or edges does not open the editing panel.

```vue
<yh-flow :nodes="nodes" :edges="edges" readonly />
```

## Notes

1. Editing is enabled by default; no extra configuration is required.
2. Changes are stored in history and support undo/redo.
3. Editing is disabled when the flow is readonly.
4. The editing panel is fixed on the right side of the page.

## Related

- [Quick Start](./basic) - Flow basics
- [Built-in Nodes](./nodes) - Node types
- [Edges & Connections](./edges) - Edge types
