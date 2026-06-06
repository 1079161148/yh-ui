# 嵌套节点 (Nested Nodes)

嵌套节点（或称分组节点）允许您将一个节点物理上放置在另一个节点内部。在 `yh-flow` 中，这通过 `parentId` 属性实现。子节点的坐标是相对于父节点左上角的**相对坐标**，这使得您可以轻松地整体移动一整组节点。

## 节点嵌套示例

拖动外部的“父容器”节点，您会发现内部的子节点会跟随移动。您也可以在父容器内部独立拖拽子节点。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #f8fafc;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      background="grid"
    >
      <template #node="{ node }">
        <div v-if="node.type === 'group'" class="parent-node">
          <div class="group-label">{{ node.data.label }}<\/div>
        <\/div>
        <div v-else class="child-node">
          {{ node.data.label }}
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
    id: 'parent-1', 
    type: 'group', 
    position: { x: 20, y: 30 }, 
    width: 360, height: 250, 
    data: { label: '项目资源' } 
  },
  { 
    id: 'child-1', 
    parentId: 'parent-1', 
    position: { x: 20, y: 60 }, 
    data: { label: 'Web 开发' },
    width: 140, height: 50
  },
  { 
    id: 'child-2', 
    parentId: 'parent-1', 
    position: { x: 200, y: 60 }, 
    data: { label: 'API 服务' },
    width: 140, height: 50
  },
  { 
    id: 'child-3', 
    parentId: 'parent-1', 
    position: { x: 110, y: 160 }, 
    data: { label: '系统集成' },
    width: 140, height: 50
  }
])
const edges = ref<Edge[]>([
  { id: 'e-c1-c3', source: 'child-1', target: 'child-3' },
  { id: 'e-c2-c3', source: 'child-2', target: 'child-3' }
])
<\/script>

<style scoped>
.parent-node {
  width: 100%;
  height: 100%;
  background: rgba(59, 130, 246, 0.05);
  border: 2px dashed #94a3b8;
  border-radius: 12px;
  position: relative;
}

.group-label {
  position: absolute;
  top: 12px;
  left: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #475569;
}

.child-node {
  width: 140px;
  height: 50px;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #1e293b;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: 'parent-1', type: 'group', position: { x: 20, y: 30 }, width: 360, height: 250, data: { label: '项目资源' } },
  { id: 'child-1', parentId: 'parent-1', position: { x: 20, y: 60 }, data: { label: 'Web 开发' }, width: 140, height: 50 },
  { id: 'child-2', parentId: 'parent-1', position: { x: 200, y: 60 }, data: { label: 'API 服务' }, width: 140, height: 50 },
  { id: 'child-3', parentId: 'parent-1', position: { x: 110, y: 160 }, data: { label: '系统集成' }, width: 140, height: 50 }
])
const edges = ref<Edge[]>([
  { id: 'e-c1-c3', source: 'child-1', target: 'child-3' },
  { id: 'e-c2-c3', source: 'child-2', target: 'child-3' }
])
</script>

<DemoBlock title="逻辑层级" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #f8fafc;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :model-value="{ x: 50, y: 20, zoom: 1 }"
      background="grid"
    >
      <template #node="{ node }">
        <div v-if="node.type === 'group'" style="width: 100%; height: 100%; background: rgba(59, 130, 246, 0.05); border: 2px dashed #94a3b8; border-radius: 12px; position: relative;">
          <div style="position: absolute; top: 12px; left: 16px; font-size: 14px; font-weight: bold; color: #475569;">{{ node.data.label }}</div>
        </div>
        <div v-else style="width: 140px; height: 50px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #1e293b; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          {{ node.data.label }}
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## 机制解析

1.  **层级定义**：通过将节点的 `parentId` 指向父节点的 `id` 来建立关系。
2.  **坐标继承**：子节点的 `position` 值是相对于父节点左上角（0,0）的。当父节点移动时，子节点会自动随之移动。
3.  **渲染顺序**：引擎优化了堆叠上下文。父节点以较低的 `z-index` 值渲染，以确保它们始终位于子节点之后。

> [!TIP]
>
> **动态嵌套**：您可以使用拖拽结束事件来计算空间碰撞，并动态分配/移除 `parentId` 以实现“拖放到分组”功能。
