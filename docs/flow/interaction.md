# Flow 交互操作

Flow 默认支持：节点拖拽、连线创建、框选/多选、键盘快捷键等。

<script setup lang="ts">
import { toJs } from '../.vitepress/theme/utils/demo-utils'

const tsInteraction = `<template>
  <div style="width: 100%; height: 520px;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
      keyboard-shortcuts
      @nodeClick="onNodeClick"
      @edgeConnect="onEdgeConnect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 140 }, data: { label: '开始' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 340, y: 80 }, data: { label: '拖拽我' }, width: 140, height: 50 },
  { id: '3', type: 'default', position: { x: 340, y: 220 }, data: { label: 'Shift 多选' }, width: 140, height: 50 },
  { id: '4', type: 'output', position: { x: 610, y: 150 }, data: { label: '结束' }, width: 120, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])

const onNodeClick = (e: any) => console.log('nodeClick', e.node?.id)
const onEdgeConnect = (c: any) => console.log('edgeConnect', c)
<\/script>`

const jsInteraction = toJs(tsInteraction)
</script>

## 快捷操作说明

- **平移**：鼠标拖动空白区域（或滚轮/触控板滚动）
- **缩放**：`Ctrl/Meta + 滚轮`
- **单选**：点击节点/连线
- **多选**：`Shift` + 点击
- **框选**：按住 `Alt/Option` 在画布上拖拽
- **删除**：选中后按 `Delete`
- **撤销/重做**：`Ctrl+Z` / `Ctrl+Shift+Z`

## 示例：带 Controls/Minimap 的交互画布

<DemoBlock title="Interaction" :ts-code="tsInteraction" :js-code="jsInteraction">
  <div style="width: 100%; height: 520px;">
    <yh-flow
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 140 }, data: { label: '开始' }, width: 120, height: 50 },
        { id: '2', type: 'default', position: { x: 340, y: 80 }, data: { label: '拖拽我' }, width: 140, height: 50 },
        { id: '3', type: 'default', position: { x: 340, y: 220 }, data: { label: 'Shift 多选' }, width: 140, height: 50 },
        { id: '4', type: 'output', position: { x: 610, y: 150 }, data: { label: '结束' }, width: 120, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
        { id: 'e1-3', source: '1', target: '3', type: 'bezier' },
        { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
        { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
      ]"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
      keyboard-shortcuts
    />
  </div>
</DemoBlock>

## 下一个

- [对齐与分布](./alignment)
- [插件系统](./plugins)
