# 可更新连线 (Updatable Edges)

`yh-flow` 提供了“可更新连线”功能，允许用户重新指定现有连线的端点。

### 工作原理

当连线被标记为 `updatable: true` 并在视图中被**选中**时，其两端（起点和终点）会出现蓝色圆点手柄。拖拽任一手柄到其他节点即可更新连接。若未看到手柄，请先**点击该连线**以选中。

## 基础用法

下方示例中连线已默认选中，两端会显示蓝色圆点手柄。尝试将终点从 **节点 B** 拖到 **节点 C**。若点击了画布空白导致连线取消选中，再次点击连线即可重新显示手柄。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
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
    data: { label: 'NODE <STRONG>A</STRONG>' },
    width: 150,
    height: 50,
    style: { border: '2px solid #3b82f6', color: '#1e3a8a' }
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 100, y: 150 },
    data: { label: 'NODE <STRONG>B</STRONG>' },
    width: 150,
    height: 50
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 400, y: 150 },
    data: { label: 'NODE <STRONG>C</STRONG>' },
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
    style: { strokeWidth: 1.5, stroke: '#b1b1b7' }
  }
])

const handleEdgeUpdate = ({ edge, connection }: { edge: Edge; connection: Connection }) => {
  console.log('连线已更新:', edge.id, '新连接:', connection)
}
<\/script>`

const jsCode = tsCode // Simplified for this example

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  {
    id: 'A',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { label: 'NODE <STRONG>A</STRONG>' },
    width: 150,
    height: 50,
    style: { border: '2px solid #3b82f6', color: '#1e3a8a' }
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 100, y: 150 },
    data: { label: 'NODE <STRONG>B</STRONG>' },
    width: 150,
    height: 50
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 400, y: 150 },
    data: { label: 'NODE <STRONG>C</STRONG>' },
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
    style: { strokeWidth: 1.5, stroke: '#b1b1b7' }
  }
])

const handleEdgeUpdate = ({ edge, connection }: { edge: Edge; connection: Connection }) => {
  console.log('连线已更新:', edge.id, '新连接:', connection)
}
</script>

<DemoBlock title="交互式连线更新" :ts-code="tsCode" :js-code="jsCode">
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

## API 配置

### Edge 属性

在 `Edge` 对象中设置以下属性：

| 属性          | 类型                              | 默认值  | 说明                                                                                  |
| :------------ | :-------------------------------- | :------ | :------------------------------------------------------------------------------------ |
| `updatable`   | `boolean \| 'source' \| 'target'` | `false` | 是否启用重连手柄。若设为 `'source'` 或 `'target'` 则只允许更新单端。                  |
| `selected`    | `boolean`                         | `false` | 手柄仅在连线**选中**时显示。若希望一加载就显示手柄，可将该连线设为 `selected: true`。 |
| `curvature`   | `number`                          | `0.25`  | 贝塞尔曲线的曲率（0.0 到 1.0）。                                                      |
| `labelShowBg` | `boolean`                         | `false` | 是否显示标签背景色（配合 `labelBgColor` 使用）。                                      |

### 事件

| 事件名         | 参数                                     | 说明                         |
| :------------- | :--------------------------------------- | :--------------------------- |
| `@edge-update` | `{ edge: Edge, connection: Connection }` | 用户完成连线端点重连时触发。 |
