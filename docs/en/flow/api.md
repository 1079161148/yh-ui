# Flow API Reference

## Component

### `<yh-flow />`

The core component is exported as `Flow` and registered as `yh-flow` in docs.

## Props

From `packages/flow/src/Flow.vue`.

| Prop                  | Type                           | Description                                             |
| --------------------- | ------------------------------ | ------------------------------------------------------- |
| `nodes`               | `Node[]`                       | Node list (recommended with `width/height`)             |
| `edges`               | `Edge[]`                       | Edge list                                               |
| `modelValue`          | `ViewportTransform`            | Viewport (x/y/zoom)                                     |
| `minZoom`             | `number`                       | Minimum zoom                                            |
| `maxZoom`             | `number`                       | Maximum zoom                                            |
| `zoomStep`            | `number`                       | Zoom step                                               |
| `nodesDraggable`      | `boolean`                      | Whether nodes are draggable (disabled in readonly mode) |
| `edgesConnectable`    | `boolean`                      | Whether new connections are allowed                     |
| `selectable`          | `boolean`                      | Whether selection / box selection is enabled            |
| `background`          | `'none' \| 'dots' \| 'grid'`   | Background type                                         |
| `backgroundColor`     | `string`                       | Background color                                        |
| `gridSize`            | `number`                       | Grid size                                               |
| `snapToGrid`          | `boolean`                      | Snap to grid                                            |
| `snapGrid`            | `[number, number]`             | Snap granularity                                        |
| `readonly`            | `boolean`                      | Readonly mode                                           |
| `showControls`        | `boolean`                      | Show Controls                                           |
| `showMinimap`         | `boolean`                      | Show Minimap                                            |
| `minimapNodeColor`    | `string`                       | Minimap node color                                      |
| `history`             | `boolean`                      | Enable undo/redo history                                |
| `maxHistory`          | `number`                       | Max history size                                        |
| `keyboardShortcuts`   | `boolean`                      | Enable shortcuts                                        |
| `connectionValidator` | `(connection) => boolean`      | Custom connection validator                             |
| `noCycleValidation`   | `boolean`                      | Disable cycle validation                                |
| `showAlignmentLines`  | `boolean`                      | Show alignment lines                                    |
| `snapThreshold`       | `number`                       | Snap threshold (px)                                     |
| `nodeTypes`           | `NodeTypes`                    | Custom node type mapping                                |
| `edgeTypes`           | `EdgeTypes`                    | Custom edge type mapping                                |
| `customNodeTemplates` | `Record<string, any>`          | Node templates for quick creation                       |
| `interactiveMinimap`  | `boolean`                      | Enable interactive minimap                              |
| `showLayoutControls`  | `boolean`                      | Show layout buttons in minimap                          |
| `layoutType`          | `LayoutType`                   | Current layout algorithm (dagre/elk/force/grid)         |
| `layoutDirection`     | `'TB' \| 'BT' \| 'LR' \| 'RL'` | Layout direction                                        |
| `enableExport`        | `boolean`                      | Enable export feature                                   |
| `exportFileName`      | `string`                       | Default filename prefix for export                      |

## Events

| Event               | Payload                            | Description                          |
| ------------------- | ---------------------------------- | ------------------------------------ |
| `update:modelValue` | `(value: ViewportTransform)`       | Viewport changed (v-model)           |
| `update:nodes`      | `(nodes: Node[])`                  | Nodes changed (reserved)             |
| `update:edges`      | `(edges: Edge[])`                  | Edges changed (reserved)             |
| `nodeClick`         | `{ node, nativeEvent }`            | Node click                           |
| `nodeDblClick`      | `{ node, nativeEvent }`            | Node double click                    |
| `nodeDragStart`     | `{ node, nativeEvent }`            | Drag start                           |
| `nodeDrag`          | `{ node, nativeEvent, position }`  | Dragging                             |
| `nodeDragEnd`       | `{ node, nativeEvent }`            | Drag end                             |
| `nodeContextMenu`   | `{ node, nativeEvent }`            | Context menu                         |
| `edgeClick`         | `{ edge, nativeEvent }`            | Edge click                           |
| `edgeDblClick`      | `{ edge, nativeEvent }`            | Edge double click                    |
| `edgeContextMenu`   | `{ edge, nativeEvent }`            | Context menu                         |
| `edgeConnect`       | `Connection`                       | Connection created                   |
| `selectionChange`   | `{ selectedNodes, selectedEdges }` | Selection changed                    |
| `historyChange`     | `{ canUndo, canRedo }`             | History status changed               |
| `viewportChange`    | `ViewportTransform`                | Viewport changed                     |
| `edgeUpdate`        | `{ edge, connection }`             | Edge updated (source/target changed) |

## Instance Methods (FlowInstance)

Methods accessible via the component `ref`:

| Method                   | Type                                        | Description                      |
| ------------------------ | ------------------------------------------- | -------------------------------- |
| `addNode`                | `(node: Node) => void`                      | Add a node                       |
| `removeNode`             | `(id: string) => void`                      | Remove a node                    |
| `updateNode`             | `(id: string, data: Partial<Node>) => void` | Update node data                 |
| `addEdge`                | `(edge: Edge) => void`                      | Add an edge                      |
| `removeEdge`             | `(id: string) => void`                      | Remove an edge                   |
| `updateEdge`             | `(id: string, data: Partial<Edge>) => void` | Update edge data                 |
| `fitView`                | `(options?: FitViewOptions) => void`        | Fit view to nodes                |
| `zoomIn`                 | `(factor?: number) => void`                 | Zoom in                          |
| `zoomOut`                | `(factor?: number) => void`                 | Zoom out                         |
| `setViewport`            | `(vp: ViewportTransform) => void`           | Set viewport transform           |
| `screenToCanvas`         | `(x, y) => {x, y}`                          | Screen to canvas coordinates     |
| `canvasToScreen`         | `(x, y) => {x, y}`                          | Canvas to screen coordinates     |
| `usePlugin`              | `(plugin: FlowPlugin) => void`              | Register a plugin                |
| `removePlugin`           | `(id: string) => void`                      | Unregister a plugin              |
| `getNode`                | `(id: string) => Node`                      | Get node instance by ID          |
| `getEdge`                | `(id: string) => Edge`                      | Get edge instance by ID          |
| `getNodes`               | `() => Node[]`                              | Get current nodes                |
| `getEdges`               | `() => Edge[]`                              | Get current edges                |
| `getViewport`            | `() => ViewportTransform`                   | Get current viewport transform   |
| `centerView`             | `() => void`                                | Center the view                  |
| `selectNode`             | `(id: string) => void`                      | Select a node                    |
| `selectEdge`             | `(id: string) => void`                      | Select an edge                   |
| `clearSelection`         | `() => void`                                | Clear all selections             |
| `on / off`               | `(event, callback) => void`                 | Event subscribe/unsubscribe      |
| `emit`                   | `(event, payload) => void`                  | Emit internal events             |
| `exportFlowData`         | `(vp?) => string`                           | Export canvas data               |
| `importFlowData`         | `(json: string) => void`                    | Import canvas data               |
| `isNestedNode`           | `(node: Node) => boolean`                   | Check if node is nested          |
| `getNodeChildren`        | `(node: Node) => Node[]`                    | Get child nodes                  |
| `getNodeParent`          | `(node: Node) => Node`                      | Get parent node                  |
| `isValidConnection`      | `(conn: Connection) => boolean`             | Validate connection              |
| `createNodeFromTemplate` | `(type, id, pos, data?) => Node`            | Create node from template        |
| `draggingNodeId`         | `Ref<string \| null>`                       | Current dragging node ID         |
| `draggingPosition`       | `Ref<{x, y} \| null>`                       | Current dragging canvas position |
| `$el`                    | `HTMLElement`                               | Get Flow container DOM element   |

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
