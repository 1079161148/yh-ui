# Flow 流程图

Flow 是一个高性能的通用流程图/节点编辑器组件，采用混合渲染架构（SVG + Canvas + 虚拟滚动），支持 10000+ 节点。

## 特性

- **高性能渲染**：支持 10000+ 节点，虚拟滚动 + 增量更新
- **混合渲染架构**：节点层采用 Vue 组件，连线层采用 SVG，背景采用 Canvas
- **丰富的交互**：节点拖拽、连线创建、框选多选、键盘快捷键
- **完整插件系统**：Minimap、Controls、Grid、Snap、Export 等内置插件
- **灵活扩展**：支持自定义节点、自定义连线、节点嵌套
- **TypeScript 支持**：完整的类型定义和泛型支持

## 安装

```bash
npm install @yh-ui/flow
```

## 基础用法

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'

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
    data: { label: '输入节点' }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 400, y: 100 },
    data: { label: '处理节点' }
  },
  {
    id: '3',
    type: 'output',
    position: { x: 700, y: 100 },
    data: { label: '输出节点' }
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
  { id: '1', type: 'input', position: { x: 100, y: 150 }, data: { label: '开始' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: '处理 A' }, width: 120, height: 50 },
  { id: '3', type: 'default', position: { x: 300, y: 220 }, data: { label: '处理 B' }, width: 120, height: 50 },
  { id: '4', type: 'output', position: { x: 500, y: 160 }, data: { label: '结束' }, width: 120, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: '分支1' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: '分支2' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])
<\/script>`

const jsControls = toJs(tsControls)

import { _T, _S } from '../.vitepress/theme/utils/demo-utils'

const _Ts = _T
const _Ss = _S
</script>

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: '输入节点' }, width: 150, height: 50 },
        { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: '处理节点' }, width: 150, height: 50 },
        { id: '3', type: 'output', position: { x: 700, y: 100 }, data: { label: '输出节点' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
        { id: 'e2-3', source: '2', target: '3', type: 'bezier' }
      ]"
    />
  </div>
</DemoBlock>

## 带有控制和小地图

<DemoBlock title="Controls & Minimap" :ts-code="tsControls" :js-code="jsControls">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 150 }, data: { label: '开始' }, width: 120, height: 50 },
        { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: '处理 A' }, width: 120, height: 50 },
        { id: '3', type: 'default', position: { x: 300, y: 220 }, data: { label: '处理 B' }, width: 120, height: 50 },
        { id: '4', type: 'output', position: { x: 500, y: 160 }, data: { label: '结束' }, width: 120, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: '分支1' },
        { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: '分支2' },
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

## 交互操作

- **平移视口**：鼠标左键点击空白区域拖动，或使用鼠标滚轮
- **缩放**：使用鼠标滚轮缩放，或 `Ctrl + 滚轮`
- **选择节点**：点击节点，或使用 Shift + 点击进行多选
- **框选**：按住 Alt/Option 键拖动框选
- **连接节点**：从节点边缘的连接点拖动到另一个节点
- **删除**：选中节点或连线后按 Delete 键删除
- **撤销/重做**：Ctrl + Z / Ctrl + Shift + Z

## Props

| 属性名             | 类型                         | 默认值                    | 说明               |
| ------------------ | ---------------------------- | ------------------------- | ------------------ |
| nodes              | `Node[]`                     | `[]`                      | 节点数据           |
| edges              | `Edge[]`                     | `[]`                      | 连线数据           |
| modelValue         | `ViewportTransform`          | `{ x: 0, y: 0, zoom: 1 }` | 视口变换           |
| minZoom            | `number`                     | `0.1`                     | 最小缩放比例       |
| maxZoom            | `number`                     | `5`                       | 最大缩放比例       |
| zoomStep           | `number`                     | `0.1`                     | 缩放步长           |
| nodesDraggable     | `boolean`                    | `true`                    | 节点是否可拖拽     |
| edgesConnectable   | `boolean`                    | `true`                    | 连线是否可连接     |
| selectable         | `boolean`                    | `true`                    | 是否可选中         |
| background         | `'none' \| 'dots' \| 'grid'` | `'dots'`                  | 背景类型           |
| backgroundColor    | `string`                     | -                         | 背景颜色           |
| gridSize           | `number`                     | `15`                      | 网格大小           |
| snapToGrid         | `boolean`                    | `false`                   | 是否对齐网格       |
| snapGrid           | `[number, number]`           | `[15, 15]`                | 网格对齐大小       |
| readonly           | `boolean`                    | `false`                   | 是否只读           |
| showControls       | `boolean`                    | `false`                   | 是否显示控制栏     |
| showMinimap        | `boolean`                    | `false`                   | 是否显示小地图     |
| minimapNodeColor   | `string`                     | -                         | 小地图节点颜色     |
| showAlignmentLines | `boolean`                    | `true`                    | 是否显示对齐线     |
| snapThreshold      | `number`                     | `10`                      | 节点吸附阈值       |
| history            | `boolean`                    | `true`                    | 是否启用历史记录   |
| maxHistory         | `number`                     | `50`                      | 最大历史记录数     |
| keyboardShortcuts  | `boolean`                    | `true`                    | 是否启用键盘快捷键 |

## Events

| 事件名            | 参数                                                                          | 说明           |
| ----------------- | ----------------------------------------------------------------------------- | -------------- |
| update:modelValue | `(value: ViewportTransform)`                                                  | 视口变化时触发 |
| update:nodes      | `(nodes: Node[])`                                                             | 节点变化时触发 |
| update:edges      | `(edges: Edge[])`                                                             | 连线变化时触发 |
| nodeClick         | `{ node: Node; nativeEvent: MouseEvent }`                                     | 节点点击       |
| nodeDblClick      | `{ node: Node; nativeEvent: MouseEvent }`                                     | 节点双击       |
| nodeDragStart     | `{ node: Node; nativeEvent: MouseEvent }`                                     | 节点开始拖拽   |
| nodeDrag          | `{ node: Node; nativeEvent: MouseEvent; position: { x: number; y: number } }` | 节点拖拽中     |
| nodeDragEnd       | `{ node: Node; nativeEvent: MouseEvent }`                                     | 节点结束拖拽   |
| nodeContextMenu   | `{ node: Node; nativeEvent: MouseEvent }`                                     | 节点右键菜单   |
| edgeClick         | `{ edge: Edge; nativeEvent: MouseEvent }`                                     | 连线点击       |
| edgeDblClick      | `{ edge: Edge; nativeEvent: MouseEvent }`                                     | 连线双击       |
| edgeContextMenu   | `{ edge: Edge; nativeEvent: MouseEvent }`                                     | 连线右键菜单   |
| edgeConnect       | `Connection`                                                                  | 连线连接成功   |
| selectionChange   | `{ selectedNodes: Node[]; selectedEdges: Edge[] }`                            | 选择变化       |
| historyChange     | `{ canUndo: boolean; canRedo: boolean }`                                      | 历史记录变化   |
| viewportChange    | `ViewportTransform`                                                           | 视口变化       |

> **说明**：若需实现「删除所选(N)」、工具栏根据选中项显隐等 UI，请监听 `@selection-change`，在回调中根据 `selectedNodes` / `selectedEdges` 更新本地状态（如选中 ID 集合），以便按钮禁用状态与计数与画布选择保持一致。

## 下一个

- [节点类型](./nodes) - 了解内置节点类型
- [连线类型](./edges) - 了解不同连线类型
- [交互操作](./interaction) - 了解更多交互功能
- [对齐与分布](./alignment) - 使用对齐和分布功能
- [插件系统](./plugins) - 使用和创建插件
