# 节点缩放 (Node Resizer)

在很多业务场景中，用户可能需要手动调整某些节点（特别是分组节点或容器节点）的大小。`yh-flow` 提供了 `NodeResizer` 组件，它可以非常容易地嵌入到您的自定义节点中，为节点添加 8 个方向的缩放手柄。

## 节点缩放示例 (Node Resizer Example)

点击选中下方的节点，四周会出现蓝色的缩放手柄；拖拽手柄可实时调整节点尺寸。拖拽节点可移动位置。示例使用 `v-model:nodes`，使节点拖放与缩放后的数据同步到父组件。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      v-model:nodes="nodes"
      :edges="edges"
      background="dots"
    >
      <template #node="{ node }">
        <div class="resizable-node" :style="{ background: node.data.color }">
          {{ node.data.label }}
          
          <!-- 1. 引入并配置 NodeResizer -->
          <yh-node-resizer
            :node-id="node.id"
            :selected="node.selected"
            :min-width="100"
            :min-height="50"
            @resize="data => onNodeResize(node.id, data)"
          />
        <\/div>
      <\/template>
    <\/yh-flow>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { 
    id: 'resizer-1', 
    type: 'custom', 
    position: { x: 100, y: 100 }, 
    width: 200, height: 100, 
    data: { label: '可缩放节点', color: '#eff6ff' } 
  }
])
const edges = ref<Edge[]>([])

const onNodeResize = (nodeId: string, { width, height, x, y }) => {
  nodes.value = nodes.value.map(n => {
    if (n.id !== nodeId) return n
    const updated = { ...n, width, height, position: { ...n.position } }
    if (x !== undefined && x !== 0) updated.position.x += x
    if (y !== undefined && y !== 0) updated.position.y += y
    return updated
  })
}
<\/script>

<style scoped>
.resizable-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  font-size: 14px;
  color: #1e40af;
  position: relative; /* 核心：必须为 relative 才能准确定位缩放器 */
}
<\/style>`

const jsCode = toJs(tsCode)

const viewport = ref({ x: 50, y: 50, zoom: 1 })
const nodes = ref<Node[]>([
  { id: 'resizer-1', type: 'custom', position: { x: 100, y: 100 }, width: 220, height: 120, data: { label: '可缩放节点', color: '#eff6ff' } }
])

const onNodeResize = (nodeId: string, { width, height, x, y }: { width: number, height: number, x?: number, y?: number }) => {
  nodes.value = nodes.value.map(n => {
    if (n.id !== nodeId) return n
    const updated = { ...n, width, height, position: { ...n.position } }
    if (x !== undefined && x !== 0) updated.position.x += x
    if (y !== undefined && y !== 0) updated.position.y += y
    return updated
  })
}
</script>

<DemoBlock title="自定义节点缩放" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      v-model:nodes="nodes"
      :edges="[]"
      v-model="viewport"
      background="dots"
    >
      <template #node="{ node }">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid #3b82f6; border-radius: 4px; font-size: 14px; color: #1e40af; position: relative;">
          {{ node.data.label }}
          <yh-node-resizer
            :node-id="node.id"
            :selected="node.selected"
            :min-width="100"
            :min-height="50"
            @resize="data => onNodeResize(node.id, data)"
          />
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## API 概述 (API Reference)

### 属性 (Props)

| 参数名        | 类型            | 默认值   | 说明                                           |
| :------------ | :-------------- | :------- | :--------------------------------------------- |
| `nodeId`      | `string`        | **必填** | 目标节点的 ID。                                |
| `selected`    | `boolean`       | `false`  | 是否显示缩放手柄（通常绑定 `node.selected`）。 |
| `minWidth`    | `number`        | `50`     | 允许缩放的最小宽度。                           |
| `minHeight`   | `number`        | `30`     | 允许缩放的最小高度。                           |
| `handleStyle` | `CSSProperties` | `{}`     | 自定义手柄的样式。                             |

### 事件 (Events)

| 事件名         | 参数                      | 说明                                                           |
| :------------- | :------------------------ | :------------------------------------------------------------- |
| `@resize`      | `{ width, height, x, y }` | 缩放进行中。`x` 和 `y` 为从顶部/左侧方向推拉时带来的位置增量。 |
| `@resizeStart` | `MouseEvent`              | 缩放开始。                                                     |
| `@resizeEnd`   | `MouseEvent`              | 缩放结束。                                                     |

> [!IMPORTANT]
>
> 由于 `NodeResizer` 采用绝对定位，您的自定义节点容器样式必须包含 `position: relative` 或 `position: absolute`。否则手柄将漂移到节点之外。
