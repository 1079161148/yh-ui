# Flow Chart

Flow is a high-performance general-purpose flow chart/node editor component using a hybrid rendering architecture (SVG + Canvas + Virtual Scrolling), supporting 10,000+ nodes.

## Features

- **High-performance rendering**: Supports 10,000+ nodes with virtual scrolling + incremental updates.
- **Hybrid rendering architecture**: Nodes are rendered as Vue components, edges are rendered with SVG, and the background with Canvas.
- **Rich interaction**: Node dragging, edge creation, box selection, and keyboard shortcuts.
- **Complete plugin system**: Built-in plugins like Minimap, Controls, Grid, Snap, Export, etc.
- **Flexible extension**: Support for custom nodes, custom edges, and nested nodes.
- **TypeScript Support**: Complete type definitions and generic support.

## Installation

```bash
npm install @yh-ui/flow
```

## Basic Usage

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<template>
  <div style="width: 100%; height: 500px;">
    <yh-flow
      v-model="viewport"
      :nodes="nodes"
      :edges="edges"
      @node-click="handleNodeClick"
      @edge-connect="handleEdgeConnect"
    />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { label: 'Input Node' }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 400, y: 100 },
    data: { label: 'Process Node' }
  },
  {
    id: '3',
    type: 'output',
    position: { x: 700, y: 100 },
    data: { label: 'Output Node' }
  }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e2-3', source: '2', target: '3', type: 'bezier' }
])

const handleNodeClick = (event: { node: Node; nativeEvent: MouseEvent }) => {
  console.log('Node clicked:', event.node)
}

const handleEdgeConnect = (connection: { source: string; target: string }) => {
  console.log('Edge connected:', connection)
}
<\/script>`

const jsBasic = toJs(tsBasic)

const tsControls = `<template>
  <div style="width: 100%; height: 500px;">
    <yh-flow
      v-model="viewport"
      :nodes="nodes"
      :edges="edges"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
    />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 150 }, data: { label: 'Start' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Process A' }, width: 120, height: 50 },
  { id: '3', type: 'default', position: { x: 300, y: 220 }, data: { label: 'Process B' }, width: 120, height: 50 },
  { id: '4', type: 'output', position: { x: 500, y: 160 }, data: { label: 'End' }, width: 120, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: 'Branch 1' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: 'Branch 2' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])
<\/script>`

const jsControls = toJs(tsControls)
</script>

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Input Node' }, width: 150, height: 50 },
        { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Process Node' }, width: 150, height: 50 },
        { id: '3', type: 'output', position: { x: 700, y: 100 }, data: { label: 'Output Node' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
        { id: 'e2-3', source: '2', target: '3', type: 'bezier' }
      ]"
    />
  </div>
</DemoBlock>

## With Controls and Minimap

<DemoBlock title="Controls & Minimap" :ts-code="tsControls" :js-code="jsControls">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 150 }, data: { label: 'Start' }, width: 120, height: 50 },
        { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Process A' }, width: 120, height: 50 },
        { id: '3', type: 'default', position: { x: 300, y: 220 }, data: { label: 'Process B' }, width: 120, height: 50 },
        { id: '4', type: 'output', position: { x: 500, y: 160 }, data: { label: 'End' }, width: 120, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: 'Branch 1' },
        { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: 'Branch 2' },
        { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
        { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
      ]"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
    />
  </div>
</DemoBlock>

## Interaction

- **Pan Viewport**: Click and drag on empty space, or use the mouse wheel.
- **Zoom**: Use the mouse wheel or `Ctrl + wheel`.
- **Select Nodes**: Click a node, or use `Shift + click` for multiple selection.
- **Box Selection**: Press `Alt/Option` and drag to box select.
- **Connect Nodes**: Drag from a handle on one node to another.
- **Delete**: Press the `Delete` key when a node or edge is selected.
- **Undo/Redo**: `Ctrl + Z` / `Ctrl + Shift + Z`.

## Props

| Prop               | Type                         | Default                   | Description                          |
| ------------------ | ---------------------------- | ------------------------- | ------------------------------------ |
| nodes              | `Node[]`                     | `[]`                      | Node data                            |
| edges              | `Edge[]`                     | `[]`                      | Edge data                            |
| modelValue         | `ViewportTransform`          | `{ x: 0, y: 0, zoom: 1 }` | Viewport transform                   |
| minZoom            | `number`                     | `0.1`                     | Minimum zoom level                   |
| maxZoom            | `number`                     | `5`                       | Maximum zoom level                   |
| zoomStep           | `number`                     | `0.1`                     | Zoom step size                       |
| nodesDraggable     | `boolean`                    | `true`                    | Whether nodes can be dragged         |
| edgesConnectable   | `boolean`                    | `true`                    | Whether edges can be connected       |
| selectable         | `boolean`                    | `true`                    | Whether items are selectable         |
| background         | `'none' \| 'dots' \| 'grid'` | `'dots'`                  | Background type                      |
| backgroundColor    | `string`                     | -                         | Background color                     |
| gridSize           | `number`                     | `15`                      | Grid size                            |
| snapToGrid         | `boolean`                    | `false`                   | Whether to snap to grid              |
| snapGrid           | `[number, number]`           | `[15, 15]`                | Grid snap size                       |
| readonly           | `boolean`                    | `false`                   | Whether the editor is read-only      |
| showControls       | `boolean`                    | `false`                   | Whether to show control bar          |
| showMinimap        | `boolean`                    | `false`                   | Whether to show minimap              |
| minimapNodeColor   | `string`                     | -                         | Node color in minimap                |
| showAlignmentLines | `boolean`                    | `true`                    | Whether to show alignment lines      |
| snapThreshold      | `number`                     | `10`                      | Node snapping threshold              |
| history            | `boolean`                    | `true`                    | Whether to enable history            |
| maxHistory         | `number`                     | `50`                      | Maximum history items                |
| keyboardShortcuts  | `boolean`                    | `true`                    | Whether to enable keyboard shortcuts |

## Events

| Event             | Parameters                                                                    | Description                     |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | `(value: ViewportTransform)`                                                  | Triggered when viewport changes |
| update:nodes      | `(nodes: Node[])`                                                             | Triggered when nodes change     |
| update:edges      | `(edges: Edge[])`                                                             | Triggered when edges change     |
| nodeClick         | `{ node: Node; nativeEvent: MouseEvent }`                                     | Node clicked                    |
| nodeDblClick      | `{ node: Node; nativeEvent: MouseEvent }`                                     | Node double-clicked             |
| nodeDragStart     | `{ node: Node; nativeEvent: MouseEvent }`                                     | Node drag start                 |
| nodeDrag          | `{ node: Node; nativeEvent: MouseEvent; position: { x: number; y: number } }` | Node dragging                   |
| nodeDragEnd       | `{ node: Node; nativeEvent: MouseEvent }`                                     | Node drag end                   |
| nodeContextMenu   | `{ node: Node; nativeEvent: MouseEvent }`                                     | Node context menu               |
| edgeClick         | `{ edge: Edge; nativeEvent: MouseEvent }`                                     | Edge clicked                    |
| edgeDblClick      | `{ edge: Edge; nativeEvent: MouseEvent }`                                     | Edge double-clicked             |
| edgeContextMenu   | `{ edge: Edge; nativeEvent: MouseEvent }`                                     | Edge context menu               |
| edgeConnect       | `Connection`                                                                  | Edge connected successfully     |
| selectionChange   | `{ selectedNodes: Node[]; selectedEdges: Edge[] }`                            | Selection changed               |
| historyChange     | `{ canUndo: boolean; canRedo: boolean }`                                      | History change                  |
| viewportChange    | `ViewportTransform`                                                           | Viewport transform change       |

> **Note**: If you need to implement "Delete Selected", toolbars that show based on selection, etc., please listen to `@selection-change` and update local state (like selected ID sets) based on `selectedNodes` / `selectedEdges`.

## Next

- [Node Types](./nodes) - Understand built-in node types
- [Edge Types](./edges) - Understand different edge types
- [Interaction](./interaction) - Learn more about interactive features
- [Alignment](./alignment) - Use alignment and distribution
- [Plugin System](./plugins) - Use and create plugins
