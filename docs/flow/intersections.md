# 碰撞检测 (Intersections)

在构建复杂的拖拽交互时——例如将节点放入特定区域或检测重叠以进行自动对齐——精确的几何计算至关重要。`Flow` 在统一的坐标系中运行，使得实现空间逻辑变得非常简单。

## 空间碰撞示例

拖动下方的 "拖动我" 节点。当它与中央虚线区域重叠时，状态指示器和容器背景会变化以信号碰撞。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="intersect-container">
    <div class="intersect-toolbar">
      状态:
      <span :class="['status-tag', isIntersecting ? 'danger' : 'safe']">
        {{ isIntersecting ? '检测到碰撞!' : '安全' }}
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
    data: { label: '目标区域 (静态)' },
    style: { backgroundColor: '#f8fafc', borderStyle: 'dashed' }
  },
  { 
    id: 'mover', 
    type: 'default', 
    position: { x: 50, y: 50 }, 
    data: { label: '拖动我' },
    width: 150, height: 50
  }
])

const onNodeDrag = ({ node, position }) => {
  if (node.id === 'mover') {
    const target = nodes.value.find(n => n.id === 'target')!
    
    // 轴对齐包围盒 (AABB) 碰撞检测逻辑
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

    // 响应式更新目标样式
    target.style = {
      ...target.style,
      backgroundColor: isIntersecting.value ? '#fee2e2' : '#f8fafc',
      borderColor: isIntersecting.value ? '#ef4444' : '#cbd5e1'
    }
  }
}
<\/script>

<style scoped>
.intersect-container { display: flex; flex-direction: column; height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.intersect-toolbar { padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px; font-size: 13px; }
.status-tag { padding: 2px 8px; border-radius: 4px; font-weight: bold; }
.status-tag.safe { background: #dcfce7; color: #166534; }
.status-tag.danger { background: #fee2e2; color: #991b1b; }
.intersect-flowbox { flex: 1; }
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
    data: { label: '目标区域 (静态)' },
    style: { backgroundColor: '#f8fafc', borderStyle: 'dashed' }
  },
  { 
    id: 'mover', 
    type: 'default', 
    position: { x: 50, y: 50 }, 
    data: { label: '拖动我' },
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

<DemoBlock title="碰撞检测" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px; font-size: 13px; z-index: 2;">
      状态:
      <span :style="{ padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', background: isIntersecting ? '#fee2e2' : '#dcfce7', color: isIntersecting ? '#991b1b' : '#166534' }">
        {{ isIntersecting ? '检测到碰撞!' : '安全' }}
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

## 工作原理

示例中使用 `v-model:nodes` 与 `@node-drag`：拖拽时 Flow 会通过 `node-drag` 传出实时 `position`，并同步节点到父组件，从而用 AABB 比较「拖动我」与「目标区域」的包围盒即可得到碰撞状态。

由于 `Flow` 将所有节点映射到全局坐标系，你可以直接比较节点的 `position.x/y` 和 `width/height`。

使用的标准算法是 **AABB（轴对齐包围盒）**：

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
> 碰撞检测是实现**动态嵌套**的基础逻辑（例如，当节点被放入组容器中时自动分配 `parentId`）。
