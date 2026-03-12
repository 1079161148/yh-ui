# Flow 对齐与分布

Flow 内置：网格对齐、对齐线吸附、节点分布（水平/垂直）。

<script setup lang="ts">
import { toJs } from '../.vitepress/theme/utils/demo-utils'

const tsAlignment = `<template>
  <div style="width: 100%; height: 520px;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      snap-to-grid
      :snap-grid="[20, 20]"
      show-controls
      background="grid"
      :grid-size="20"
      :show-alignment-lines="true"
      :snap-threshold="10"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'default', position: { x: 120, y: 120 }, data: { label: '拖拽吸附' }, width: 140, height: 50 },
  { id: '2', type: 'default', position: { x: 380, y: 120 }, data: { label: '对齐线' }, width: 140, height: 50 },
  { id: '3', type: 'default', position: { x: 640, y: 120 }, data: { label: '网格对齐' }, width: 140, height: 50 },
  { id: '4', type: 'default', position: { x: 380, y: 260 }, data: { label: '分布/对齐' }, width: 140, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e2-3', source: '2', target: '3', type: 'bezier' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' }
])
<\/script>`

const jsAlignment = toJs(tsAlignment)
</script>

## 示例：网格对齐 + 对齐线吸附

<DemoBlock title="Alignment & Snap" :ts-code="tsAlignment" :js-code="jsAlignment">
  <div style="width: 100%; height: 520px;">
    <yh-flow
      :nodes="[
        { id: '1', type: 'default', position: { x: 120, y: 120 }, data: { label: '拖拽吸附' }, width: 140, height: 50 },
        { id: '2', type: 'default', position: { x: 380, y: 120 }, data: { label: '对齐线' }, width: 140, height: 50 },
        { id: '3', type: 'default', position: { x: 640, y: 120 }, data: { label: '网格对齐' }, width: 140, height: 50 },
        { id: '4', type: 'default', position: { x: 380, y: 260 }, data: { label: '分布/对齐' }, width: 140, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
        { id: 'e2-3', source: '2', target: '3', type: 'bezier' },
        { id: 'e2-4', source: '2', target: '4', type: 'bezier' }
      ]"
      snap-to-grid
      :snap-grid="[20, 20]"
      show-controls
      background="grid"
      :grid-size="20"
      :show-alignment-lines="true"
      :snap-threshold="10"
    />
  </div>
</DemoBlock>

## 下一个

- [插件系统](./plugins)
- [API 参考](./api)
