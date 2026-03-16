# Intersections

When building complex drag-and-drop interactions—such as dropping a node into a specific zone or detecting overlaps for auto-alignment—accurate geometric calculations are essential. `Flow` operates in a unified coordinate system, making it straightforward to implement spatial logic.

## Spatial Overlap Demo

Drag the "Mover" node below. When it overlaps with the central dashed area, both the status indicator and the container background will change to signal a collision.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="intersect-container">
    <div class="intersect-toolbar">
      Status:
      <span :class="['status-tag', isIntersecting ? 'danger' : 'safe']">
        {{ isIntersecting ? 'Collision Detected!' : 'Clear' }}
      <\/span>
    <\/div>
    
    <div class="intersect-flowbox">
      <yh-flow
        v-model:nodes="nodes"
        :edges="[]"
        @node-drag="onNodeDrag"
        background="grid"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node } from '@yh-ui/flow'

const isIntersecting = ref(false)

const nodes = ref<Node[]>([
  { 
    id: 'target', 
    type: 'default', 
    position: { x: 250, y: 150 }, 
    width: 200, height: 120, 
    draggable: false, 
    data: { label: 'Drop Zone (Static)' },
    style: { backgroundColor: '#f8fafc', borderStyle: 'dashed' }
  },
  { 
    id: 'mover', 
    type: 'default', 
    position: { x: 50, y: 50 }, 
    data: { label: 'Drag Me' },
    width: 150, height: 50
  }
])

const onNodeDrag = ({ node, position }) => {
  if (node.id === 'mover') {
    const target = nodes.value.find(n => n.id === 'target')!
    
    // Axis-Aligned Bounding Box (AABB) intersection logic
    const rect1 = {
      x: position.x,
      y: position.y,
      w: node.width || 150,
      h: node.height || 50
    }
    const rect2 = {
      x: target.position.x,
      y: target.position.y,
      w: target.width || 200,
      h: target.height || 120
    }

    isIntersecting.value = (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    )

    // Update target styles reactively
    target.style = {
      ...target.style,
      backgroundColor: isIntersecting.value ? '#fee2e2' : '#f8fafc',
      borderColor: isIntersecting.value ? '#ef4444' : '#cbd5e1'
    }
  }
}
<\/script>

<style scoped>
.intersect-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.intersect-toolbar {
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.status-tag.safe {
  background: #dcfce7;
  color: #166534;
}

.status-tag.danger {
  background: #fee2e2;
  color: #991b1b;
}

.intersect-flowbox {
  flex: 1;
}
<\/style>`

const jsCode = toJs(tsCode)

const isIntersecting = ref(false)
const nodes = ref<Node[]>([
  { 
    id: 'target', 
    type: 'default', 
    position: { x: 250, y: 120 }, 
    width: 200, height: 120, 
    draggable: false, 
    data: { label: 'Drop Zone (Static)' },
    style: { backgroundColor: '#f8fafc', borderStyle: 'dashed' }
  },
  { 
    id: 'mover', 
    type: 'default', 
    position: { x: 50, y: 50 }, 
    data: { label: 'Drag Me' },
    width: 151, height: 51
  }
])

const onNodeDrag = ({ node, position }: { node: Node, position: { x: number, y: number } }) => {
  if (node.id === 'mover') {
    const target = nodes.value.find(n => n.id === 'target')!
    const rect1 = { x: position.x, y: position.y, w: 151, h: 51 }
    const rect2 = { x: target.position.x, y: target.position.y, w: 200, h: 120 }

    isIntersecting.value = (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    )
    target.style = {
      ...target.style,
      backgroundColor: isIntersecting.value ? '#fee2e2' : '#f8fafc',
      borderColor: isIntersecting.value ? '#ef4444' : '#cbd5e1'
    }
  }
}
</script>

<DemoBlock title="Intersection Detection" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px; font-size: 13px; z-index: 2;">
      Status:
      <span :style="{ padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', background: isIntersecting ? '#fee2e2' : '#dcfce7', color: isIntersecting ? '#991b1b' : '#166534' }">
        {{ isIntersecting ? 'Collision Detected!' : 'Clear' }}
      </span>
    </div>
    <div style="flex: 1;">
      <yh-flow
        v-model:nodes="nodes"
        :edges="[]"
        :model-value="{ x: 0, y: 0, zoom: 1 }"
        @node-drag="onNodeDrag"
        background="grid"
      />
    </div>
  </div>
</DemoBlock>

## How it works

The demo uses `v-model:nodes` and `@node-drag`: while dragging, Flow emits the live `position` via `node-drag` and syncs nodes to the parent, so AABB comparison of the mover and target bounding boxes gives the intersection state.

Since `Flow` maps all nodes to a global coordinate system, you can directly compare a node's `position.x/y` and `width/height`.

The standard algorithm used for these rectangles is **AABB (Axis-Aligned Bounding Box)**:

```typescript
const isIntersecting = (rectA, rectB) => {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
  )
}
```

> [!TIP]
>
> Intersection detection is the foundational logic for implementing **Dynamic Nesting** (e.g., assigning a `parentId` when a node is dropped inside a group container).
