# Flow API 参考

## 组件

### `<yh-flow />`

核心组件导出为 `Flow`，在文档中注册为 `yh-flow`。

## Props

来自 `packages/flow/src/Flow.vue`。

| 属性                  | 类型                           | 说明                                    |
| --------------------- | ------------------------------ | --------------------------------------- |
| `nodes`               | `Node[]`                       | 节点列表（建议配合 `width/height`）     |
| `edges`               | `Edge[]`                       | 连线列表                                |
| `modelValue`          | `ViewportTransform`            | 视口（x/y/zoom）                        |
| `minZoom`             | `number`                       | 最小缩放                                |
| `maxZoom`             | `number`                       | 最大缩放                                |
| `zoomStep`            | `number`                       | 缩放步长                                |
| `nodesDraggable`      | `boolean`                      | 节点是否可拖拽（只读时自动禁用）        |
| `edgesConnectable`    | `boolean`                      | 是否允许创建连线                        |
| `selectable`          | `boolean`                      | 是否允许选择/框选                       |
| `background`          | `'none' \| 'dots' \| 'grid'`   | 背景类型                                |
| `backgroundColor`     | `string`                       | 背景颜色                                |
| `gridSize`            | `number`                       | 网格大小（也用于背景）                  |
| `snapToGrid`          | `boolean`                      | 是否吸附到网格                          |
| `snapGrid`            | `[number, number]`             | 网格吸附粒度                            |
| `readonly`            | `boolean`                      | 只读模式（禁用拖拽、连线等）            |
| `showControls`        | `boolean`                      | 显示 Controls                           |
| `showMinimap`         | `boolean`                      | 显示 Minimap                            |
| `minimapNodeColor`    | `string`                       | 小地图节点颜色                          |
| `history`             | `boolean`                      | 是否启用历史记录（撤销/重做）           |
| `maxHistory`          | `number`                       | 最大历史记录条数                        |
| `keyboardShortcuts`   | `boolean`                      | 是否启用快捷键                          |
| `connectionValidator` | `(connection) => boolean`      | 自定义连线校验（返回 `false` 表示禁止） |
| `noCycleValidation`   | `boolean`                      | 是否禁用“成环”校验                      |
| `showAlignmentLines`  | `boolean`                      | 是否显示对齐线                          |
| `snapThreshold`       | `number`                       | 对齐吸附阈值（px）                      |
| `nodeTypes`           | `NodeTypes`                    | 自定义节点类型映射                      |
| `edgeTypes`           | `EdgeTypes`                    | 自定义连线类型映射                      |
| `customNodeTemplates` | `Record<string, any>`          | 节点模板，用于快速创建节点              |
| `interactiveMinimap`  | `boolean`                      | 是否开启交互式小地图（点击跳转）        |
| `showLayoutControls`  | `boolean`                      | 是否在小地图显示布局控制按钮            |
| `layoutType`          | `LayoutType`                   | 当前布局算法（dagre/elk/force/grid）    |
| `layoutDirection`     | `'TB' \| 'BT' \| 'LR' \| 'RL'` | 布局方向                                |
| `enableExport`        | `boolean`                      | 是否启用导出功能                        |
| `exportFileName`      | `string`                       | 导出文件的名称前缀                      |

## Events

| 事件                | 参数                               | 说明                      |
| ------------------- | ---------------------------------- | ------------------------- |
| `update:modelValue` | `(value: ViewportTransform)`       | 视口变化（v-model）       |
| `update:nodes`      | `(nodes: Node[])`                  | 节点变化（预留）          |
| `update:edges`      | `(edges: Edge[])`                  | 连线变化（预留）          |
| `nodeClick`         | `{ node, nativeEvent }`            | 节点点击                  |
| `nodeDblClick`      | `{ node, nativeEvent }`            | 节点双击                  |
| `nodeDragStart`     | `{ node, nativeEvent }`            | 节点开始拖拽              |
| `nodeDrag`          | `{ node, nativeEvent, position }`  | 节点拖拽中                |
| `nodeDragEnd`       | `{ node, nativeEvent }`            | 节点结束拖拽              |
| `nodeContextMenu`   | `{ node, nativeEvent }`            | 节点右键菜单              |
| `edgeClick`         | `{ edge, nativeEvent }`            | 连线点击                  |
| `edgeDblClick`      | `{ edge, nativeEvent }`            | 连线双击                  |
| `edgeContextMenu`   | `{ edge, nativeEvent }`            | 连线右键菜单              |
| `edgeConnect`       | `Connection`                       | 新连线创建成功            |
| `selectionChange`   | `{ selectedNodes, selectedEdges }` | 选择变化                  |
| `historyChange`     | `{ canUndo, canRedo }`             | 历史记录状态变化          |
| `viewportChange`    | `ViewportTransform`                | 视口变化（事件）          |
| `edgeUpdate`        | `{ edge, connection }`             | 连线更新（改变起点/终点） |

## 实例方法 (FlowInstance)

通过 `ref` 获取组件实例后可调用的方法：

| 方法                     | 类型                                        | 说明                    |
| ------------------------ | ------------------------------------------- | ----------------------- |
| `addNode`                | `(node: Node) => void`                      | 添加节点                |
| `removeNode`             | `(id: string) => void`                      | 删除节点                |
| `updateNode`             | `(id: string, data: Partial<Node>) => void` | 更新节点数据            |
| `addEdge`                | `(edge: Edge) => void`                      | 添加连线                |
| `removeEdge`             | `(id: string) => void`                      | 删除连线                |
| `updateEdge`             | `(id: string, data: Partial<Edge>) => void` | 更新连线数据            |
| `fitView`                | `(options?: FitViewOptions) => void`        | 自动缩放以适应视口      |
| `zoomIn`                 | `(factor?: number) => void`                 | 放大视图                |
| `zoomOut`                | `(factor?: number) => void`                 | 缩小视图                |
| `setViewport`            | `(vp: ViewportTransform) => void`           | 设置视口变换            |
| `screenToCanvas`         | `(x, y) => {x, y}`                          | 屏幕坐标转画布坐标      |
| `canvasToScreen`         | `(x, y) => {x, y}`                          | 画布坐标转屏幕坐标      |
| `usePlugin`              | `(plugin: FlowPlugin) => void`              | 注册插件                |
| `removePlugin`           | `(id: string) => void`                      | 卸载插件                |
| `getNode`                | `(id: string) => Node`                      | 获取指定节点实例        |
| `getEdge`                | `(id: string) => Edge`                      | 获取指定连线实例        |
| `getNodes`               | `() => Node[]`                              | 获取当前所有节点        |
| `getEdges`               | `() => Edge[]`                              | 获取当前所有连线        |
| `getViewport`            | `() => ViewportTransform`                   | 获取当前视口状态        |
| `centerView`             | `() => void`                                | 视图居中                |
| `selectNode`             | `(id: string) => void`                      | 选中指定节点            |
| `selectEdge`             | `(id: string) => void`                      | 选中指定连线            |
| `clearSelection`         | `() => void`                                | 清除所有选中            |
| `on / off`               | `(event, callback) => void`                 | 事件订阅与取消          |
| `emit`                   | `(event, payload) => void`                  | 手动触发内部事件        |
| `exportFlowData`         | `(vp?) => string`                           | 导出当前画布数据        |
| `importFlowData`         | `(json: string) => void`                    | 导入画布数据            |
| `isNestedNode`           | `(node: Node) => boolean`                   | 判断是否为嵌套节点      |
| `getNodeChildren`        | `(node: Node) => Node[]`                    | 获取子节点列表          |
| `getNodeParent`          | `(node: Node) => Node`                      | 获取父节点              |
| `isValidConnection`      | `(conn: Connection) => boolean`             | 校验连线是否合法        |
| `createNodeFromTemplate` | `(type, id, pos, data?) => Node`            | 从模板创建节点          |
| `draggingNodeId`         | `Ref<string \| null>`                       | 当前正在拖拽的节点 ID   |
| `draggingPosition`       | `Ref<{x, y} \| null>`                       | 当前拖拽的画布坐标      |
| `$el`                    | `HTMLElement`                               | 获取 Flow 容器 DOM 元素 |

## Composables

`@yh-ui/flow` 导出 core composables：`useViewport`、`useNodes`、`useEdges`、`useSelection`、`useHistory`、`useKeyboard` 等。

## 插件系统（面向插件开发者）

Flow 会通过 `FlowContext` 暴露一个 `FlowInstance`（见 `packages/flow/src/plugins/plugin.ts`），插件可以调用：

- **状态**：`nodes / edges / viewport`
- **操作**：`addNode/removeNode/updateNode/getNode`、`addEdge/removeEdge/updateEdge/getEdge`、`setViewport/fitView/zoomIn/zoomOut/centerView`
- **事件**：`on/off/emit`
- **插件管理**：`usePlugin/removePlugin`

常用事件 key（节选）：

- `node:click` / `node:drag` / `node:selected`
- `edge:click` / `edge:connect` / `edge:selected`
- `viewport:change`
- `selection:change`

## 性能基准

- `Flow - 性能基准压测`：`/flow/benchmark`
