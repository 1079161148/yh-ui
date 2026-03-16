# 节点和连线编辑 (Node and Edge Editing)

Flow 组件支持对节点和连线进行可视化编辑。通过双击节点或连线，可以打开编辑面板进行属性修改。

## 功能特性 (Features)

- **节点编辑**：双击节点打开编辑面板，支持修改标签、描述、尺寸、背景色、边框颜色、圆角等
- **连线编辑**：双击连线打开编辑面板，支持修改标签、连线类型、颜色、宽度、箭头样式、动画效果等
- **撤销/重做**：编辑操作支持撤销和重做

## 基础用法 (Basic Usage)

请双击下方流程图中的**节点**或**连线**，右侧会弹出对应的编辑面板，可修改标签、样式等属性。示例使用 `v-model:nodes` 与 `v-model:edges`，编辑后数据会同步到父组件。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
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
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 120 }, data: { label: '开始' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 320, y: 80 }, data: { label: '处理 A' }, width: 120, height: 50 },
  { id: '3', type: 'default', position: { x: 320, y: 200 }, data: { label: '处理 B' }, width: 120, height: 50 },
  { id: '4', type: 'output', position: { x: 540, y: 140 }, data: { label: '结束' }, width: 120, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: '分支1' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: '分支2' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])
<\/script>`

const jsCode = toJs(tsCode)

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 120 }, data: { label: '开始' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 320, y: 80 }, data: { label: '处理 A' }, width: 120, height: 50 },
  { id: '3', type: 'default', position: { x: 320, y: 200 }, data: { label: '处理 B' }, width: 120, height: 50 },
  { id: '4', type: 'output', position: { x: 540, y: 140 }, data: { label: '结束' }, width: 120, height: 50 }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', label: '分支1' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier', label: '分支2' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])
</script>

<DemoBlock title="节点与连线编辑" :ts-code="tsCode" :js-code="jsCode">
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

## 节点编辑面板 (Node Editing Panel)

双击节点后，会在右侧显示节点编辑面板，包含以下功能：

| 属性     | 说明             |
| -------- | ---------------- |
| 标签     | 节点显示的文本   |
| 描述     | 节点的描述信息   |
| 尺寸     | 节点的宽度和高度 |
| 背景色   | 节点背景颜色     |
| 边框颜色 | 节点边框颜色     |
| 圆角     | 节点边框圆角大小 |

## 连线编辑面板 (Edge Editing Panel)

双击连线后，会在右侧显示连线编辑面板，包含以下功能：

| 属性          | 说明                                                                         |
| ------------- | ---------------------------------------------------------------------------- |
| 标签          | 连线上显示的文本                                                             |
| 连线类型      | bezier（贝塞尔曲线）、smoothstep（平滑阶梯）、step（阶梯）、straight（直线） |
| 动画连线      | 是否启用连线流动动画                                                         |
| 线条颜色      | 连线颜色                                                                     |
| 线条宽度      | 连线粗细                                                                     |
| 起点/终点箭头 | 箭头样式：无、箭头、实心箭头                                                 |
| 显示标签背景  | 是否显示标签背景                                                             |
| 标签背景色    | 标签背景颜色                                                                 |

## 只读模式 (Readonly Mode)

在 `readonly` 模式下，双击节点或连线不会打开编辑面板。

```vue
<yh-flow :nodes="nodes" :edges="edges" readonly />
```

## 注意事项 (Notes)

1. 编辑功能默认启用，无需额外配置
2. 编辑操作会自动保存到历史记录，支持撤销/重做
3. 在只读模式下，编辑功能将被禁用
4. 编辑面板采用固定定位显示在页面右侧

## 相关文档

- [基础用法](./basic) - Flow 基础功能
- [节点类型](./nodes) - 了解内置节点类型
- [连线类型](./edges) - 了解不同连线类型
