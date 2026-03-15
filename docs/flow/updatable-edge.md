# 可更新连线 (Updatable Edges)

`yh-flow` 提供了“可更新连线”功能，允许用户重新指定现有连接的端点。当连线被标记为 `updatable: true` 后，当连线被选中时，两端会出现交互式手柄，允许用户拖拽并将其吸附到不同的节点上。

## 基础用法

点击下方的 "UPDATEABLE EDGE" 连线。您会看到起点和终点出现了手柄。拖动其中一个手柄到另一个节点——例如，将终点从节点 B 拖动到节点 C。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'

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
  <\/div>
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
    data: { label: '节点 A' },
    style: { border: '2px solid #3b82f6', color: '#1e3a8a', width: '150px' }
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 100, y: 200 },
    data: { label: '节点 B' },
    style: { width: '150px' }
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 400, y: 200 },
    data: { label: '节点 C' },
    style: { backgroundColor: '#f1f5f9', color: '#475569', width: '150px' }
  }
])

const edges = ref<Edge[]>([
  {
    id: 'eA-B',
    source: 'A',
    target: 'B',
    type: 'bezier',
    label: '可更新连线',
    updatable: true,
    style: { strokeWidth: 2, stroke: '#3b82f6' }
  }
])

const handleEdgeUpdate = ({ edge, connection }: { edge: Edge; connection: Connection }) => {
  console.log('连线已更新:', edge.id, '新连接:', connection)
}
<\/script>`

const jsCode = toJs(tsCode)
</script>

<DemoBlock title="交互式连线更新" :ts-code="tsCode" :js-code="jsCode">
  <div style="width: 100%; height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        {
          id: 'A',
          type: 'default',
          position: { x: 250, y: 50 },
          data: { label: '节点 A' },
          style: { border: '1px solid #3b82f6', color: '#1e3a8a', width: '150px' }
        },
        {
          id: 'B',
          type: 'default',
          position: { x: 100, y: 200 },
          data: { label: '节点 B' },
          style: { width: '150px' }
        },
        {
          id: 'C',
          type: 'default',
          position: { x: 400, y: 200 },
          data: { label: '节点 C' },
          style: { backgroundColor: '#f1f5f9', color: '#475569', width: '150px' }
        }
      ]"
      :edges="[
        {
          id: 'eA-B',
          source: 'A',
          target: 'B',
          type: 'bezier',
          label: '可更新连线',
          updatable: true,
          labelStyle: { fill: '#333', fontSize: 12 },
          style: { strokeWidth: 1.5, stroke: '#666' }
        }
      ]"
      :edges-connectable="true"
      background="dots"
    />
  </div>
</DemoBlock>

## 配置

### `Edge.updatable`

在连线元数据中设置 `updatable: true` 以启用拖拽重新连接手柄：

```ts
const edge = {
  id: 'edge-1',
  source: 'node-1',
  target: 'node-2',
  updatable: true // 选中时启用端点手柄
}
```

### `@edge-update` 事件

当用户成功将端点拖动到新锚点时，会发出 `@edge-update` 事件。引擎会自动同步视口，但您应该使用此钩子来更新您的后端状态。

| 事件载荷                                 | 说明                             |
| :--------------------------------------- | :------------------------------- |
| `{ edge: Edge, connection: Connection }` | 用户成功完成连线重连手势时发出。 |
