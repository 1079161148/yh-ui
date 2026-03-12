# Flow API Reference

## Component

### `<yh-flow />`

The core component is exported as `Flow` and registered as `yh-flow` in docs.

## Props

From `packages/flow/src/Flow.vue`.

| Prop                  | Type                         | Description                                             |
| --------------------- | ---------------------------- | ------------------------------------------------------- |
| `nodes`               | `Node[]`                     | Node list (recommended with `width/height`)             |
| `edges`               | `Edge[]`                     | Edge list                                               |
| `modelValue`          | `ViewportTransform`          | Viewport (x/y/zoom)                                     |
| `minZoom`             | `number`                     | Minimum zoom                                            |
| `maxZoom`             | `number`                     | Maximum zoom                                            |
| `zoomStep`            | `number`                     | Zoom step                                               |
| `nodesDraggable`      | `boolean`                    | Whether nodes are draggable (disabled in readonly mode) |
| `edgesConnectable`    | `boolean`                    | Whether new connections are allowed                     |
| `selectable`          | `boolean`                    | Whether selection / box selection is enabled            |
| `background`          | `'none' \| 'dots' \| 'grid'` | Background type                                         |
| `backgroundColor`     | `string`                     | Background color                                        |
| `gridSize`            | `number`                     | Grid size                                               |
| `snapToGrid`          | `boolean`                    | Snap to grid                                            |
| `snapGrid`            | `[number, number]`           | Snap granularity                                        |
| `readonly`            | `boolean`                    | Readonly mode                                           |
| `showControls`        | `boolean`                    | Show Controls                                           |
| `showMinimap`         | `boolean`                    | Show Minimap                                            |
| `minimapNodeColor`    | `string`                     | Minimap node color                                      |
| `history`             | `boolean`                    | Enable undo/redo history                                |
| `maxHistory`          | `number`                     | Max history size                                        |
| `keyboardShortcuts`   | `boolean`                    | Enable shortcuts                                        |
| `connectionValidator` | `(connection) => boolean`    | Custom connection validator                             |
| `noCycleValidation`   | `boolean`                    | Disable cycle validation                                |
| `showAlignmentLines`  | `boolean`                    | Show alignment lines                                    |
| `snapThreshold`       | `number`                     | Snap threshold (px)                                     |

## Events

| Event               | Payload                            | Description                |
| ------------------- | ---------------------------------- | -------------------------- |
| `update:modelValue` | `(value: ViewportTransform)`       | Viewport changed (v-model) |
| `update:nodes`      | `(nodes: Node[])`                  | Nodes changed (reserved)   |
| `update:edges`      | `(edges: Edge[])`                  | Edges changed (reserved)   |
| `nodeClick`         | `{ node, nativeEvent }`            | Node click                 |
| `nodeDblClick`      | `{ node, nativeEvent }`            | Node double click          |
| `nodeDragStart`     | `{ node, nativeEvent }`            | Drag start                 |
| `nodeDrag`          | `{ node, nativeEvent, position }`  | Dragging                   |
| `nodeDragEnd`       | `{ node, nativeEvent }`            | Drag end                   |
| `nodeContextMenu`   | `{ node, nativeEvent }`            | Context menu               |
| `edgeClick`         | `{ edge, nativeEvent }`            | Edge click                 |
| `edgeDblClick`      | `{ edge, nativeEvent }`            | Edge double click          |
| `edgeContextMenu`   | `{ edge, nativeEvent }`            | Context menu               |
| `edgeConnect`       | `Connection`                       | Connection created         |
| `selectionChange`   | `{ selectedNodes, selectedEdges }` | Selection changed          |
| `historyChange`     | `{ canUndo, canRedo }`             | History status changed     |
| `viewportChange`    | `ViewportTransform`                | Viewport changed           |

## Composables

`@yh-ui/flow` exports core composables: `useViewport`, `useNodes`, `useEdges`, `useSelection`, `useHistory`, `useKeyboard`, etc.

## Plugin System (for plugin authors)

Flow provides a `FlowInstance` via `FlowContext` (see `packages/flow/src/plugins/plugin.ts`), including:

- **State**: `nodes / edges / viewport`
- **Actions**: `addNode/removeNode/updateNode/getNode`, `addEdge/removeEdge/updateEdge/getEdge`, `setViewport/fitView/zoomIn/zoomOut/centerView`
- **Events**: `on/off/emit`
- **Plugin management**: `usePlugin/removePlugin`

Common event keys (excerpt):

- `node:click` / `node:drag` / `node:selected`
- `edge:click` / `edge:connect` / `edge:selected`
- `viewport:change`
- `selection:change`

## Benchmark

- `Flow - Performance Benchmark`: `/en/flow/benchmark`
