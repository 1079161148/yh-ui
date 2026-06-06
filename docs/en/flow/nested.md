# Nested Nodes

Nested nodes (often called Group Nodes) allow you to physically place one node inside another. In `yh-flow`, this is achieved via the `parentId` attribute. A child node's coordinates are **relative** to the top-left corner of its parent, making it easy to move groups of nodes as a single unit.

## Nesting Example

Try dragging the outer "Parent Container" node; you'll notice the inner child nodes follow its movement naturally. You can also independently drag the children within the parent's boundaries.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
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
          <div class="group-label">{{ node.data.label }}</div>
        </div>
        <div v-else class="child-node">
          {{ node.data.label }}
        </div>
      <\/template>
    </yh-flow>
  </div>
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
    data: { label: 'Project Resources' } 
  },
  { 
    id: 'child-1', 
    parentId: 'parent-1', 
    position: { x: 20, y: 60 }, 
    data: { label: 'Web Development' },
    width: 140, height: 50
  },
  { 
    id: 'child-2', 
    parentId: 'parent-1', 
    position: { x: 200, y: 60 }, 
    data: { label: 'API Services' },
    width: 140, height: 50
  },
  { 
    id: 'child-3', 
    parentId: 'parent-1', 
    position: { x: 110, y: 160 }, 
    data: { label: 'Integration' },
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
  { id: 'parent-1', type: 'group', position: { x: 20, y: 30 }, width: 360, height: 250, data: { label: 'Project Resources' } },
  { id: 'child-1', parentId: 'parent-1', position: { x: 20, y: 60 }, data: { label: 'Web Development' }, width: 140, height: 50 },
  { id: 'child-2', parentId: 'parent-1', position: { x: 200, y: 60 }, data: { label: 'API Services' }, width: 140, height: 50 },
  { id: 'child-3', parentId: 'parent-1', position: { x: 110, y: 160 }, data: { label: 'Integration' }, width: 140, height: 50 }
])
const edges = ref<Edge[]>([
  { id: 'e-c1-c3', source: 'child-1', target: 'child-3' },
  { id: 'e-c2-c3', source: 'child-2', target: 'child-3' }
])
</script>

<DemoBlock title="Logical Hierarchy" :ts-code="tsCode" :js-code="jsCode">
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

## Mechanics

1.  **Hierarchy Definition**: Establish relationships by pointing a node's `parentId` to a parent's `id`.
2.  **Coordinate Inheritance**: Child `position` values are relative to the parent's top-left origin (0,0). When the parent moves, children move along with it automatically.
3.  **Rendering Order**: The engine optimizes stacking context. Parent nodes are rendered with lower `z-index` values to ensure they stay behind their children.

> [!TIP]
>
> **Dynamic Nesting**: You can use drag-end events to calculate spatial intersections and dynamically assign/remove `parentId` to implement "drag-and-drop into group" functionality.
