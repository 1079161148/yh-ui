# 自定义连线 (Custom Edge)

连线不仅仅是两个点之间的路径。在 `yh-flow` 中，您可以利用 `#edge` 插槽完全接管连线的渲染过程。这允许您在连线右上方添加复杂的交互按钮、实时状态标签，甚至是动态的流体特效。

## 高级自定义边示例 (Advanced Custom Edge Example)

在该示例中，我们向连线中心添加了一个功能按钮。点击按钮可以快速删除该连线或执行其它业务操作。示例使用 `v-model:edges`，删除后父组件与画布连线列表保持同步。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      :nodes="nodes"
      v-model:edges="edges"
      background="dots"
    >
      <template #edge="{ edge, path, labelX, labelY }">
        <g>
          <path
            :d="path"
            fill="none"
            :stroke="edge.selected ? '#3b82f6' : '#94a3b8'"
            :stroke-width="edge.selected ? 3 : 2"
            style="pointer-events: stroke; cursor: pointer;"
          />
          
          <!-- Tool center button -->
          <foreignObject
            :x="(labelX || 0) - 15"
            :y="(labelY || 0) - 15"
            width="30"
            height="30"
            style="overflow: visible; pointer-events: all; z-index: 100;"
          >
            <div 
              class="edge-remove-btn"
              @mousedown.stop.prevent="onRemoveEdge(edge.id)"
            >
              ×
            </div>
          </foreignObject>
        </g>
      </template>
    <\/yh-flow>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: 'ca', type: 'input', position: { x: 50, y: 150 }, data: { label: '节点 A' } },
  { id: 'cb', type: 'output', position: { x: 350, y: 150 }, data: { label: '节点 B' } }
])

const edges = ref<Edge[]>([
  { 
    id: 'e-ca-cb', 
    source: 'ca', 
    target: 'cb', 
    type: 'custom', 
    style: { strokeWidth: 2, stroke: '#94a3b8' } 
  }
])

const onRemoveEdge = (id: string) => {
  console.log('Removing edge:', id)
  edges.value = edges.value.filter(e => e.id !== id)
  // 强制同步以确保外部状态更新
  console.log('Remaining edges count:', edges.value.length)
}
<\/script>

<style scoped>
.custom-edge-group:hover path {
  stroke: #3b82f6 !important;
  stroke-width: 3px !important;
}

.edge-remove-btn {
  width: 24px;
  height: 24px;
  background: white;
  border: 1.5px solid #ef4444;
  border-radius: 50%;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.2s;
}
.edge-remove-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: 'ca', type: 'input', position: { x: 50, y: 150 }, data: { label: '节点 A' } },
  { id: 'cb', type: 'output', position: { x: 350, y: 150 }, data: { label: '节点 B' } }
])

const edges = ref<Edge[]>([
  { id: 'e-ca-cb', source: 'ca', target: 'cb', type: 'custom', style: { strokeWidth: 2, stroke: '#94a3b8' } }
])

const onRemoveEdge = (id: string) => {
  console.log('[Flow Demo] Removing edge triggered via mousedown:', id)
  const exists = edges.value.some(e => e.id === id)
  if (exists) {
    edges.value = edges.value.filter(e => e.id !== id)
    console.log('[Flow Demo] Edge removed. New count:', edges.value.length)
  }
}
</script>

<DemoBlock title="带移除工具的连线" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow
      :nodes="nodes"
      v-model:edges="edges"
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      background="dots"
    >
      <template #edge="{ edge, path, labelX, labelY }">
        <g>
          <path
            :d="path"
            fill="none"
            :stroke="edge.selected ? '#3b82f6' : '#94a3b8'"
            :stroke-width="edge.selected ? 3 : 2"
            style="pointer-events: stroke; cursor: pointer;"
          />
          <foreignObject
            :x="(labelX || 0) - 15"
            :y="(labelY || 0) - 15"
            width="30"
            height="30"
            style="overflow: visible; pointer-events: all; z-index: 100;"
          >
            <div 
              class="edge-remove-btn"
              @mousedown.stop.prevent="onRemoveEdge(edge.id)"
              @touchstart.stop.prevent="onRemoveEdge(edge.id)"
            >
              ×
            </div>
          </foreignObject>
        </g>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

<style scoped>
.edge-remove-btn {
  width: 24px;
  height: 24px;
  background: white;
  border: 1.5px solid #ef4444;
  border-radius: 50%;
  color: #ef4444;
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.2s;
  pointer-events: auto;
}
.edge-remove-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}
</style>

## 实现原理解析

1.  **插槽数据**：`#edge` 插槽暴露了 `edge` 数据对象（包括计算出的 `labelX` 和 `labelY` 坐标）以及一个预计算好的 SVG `path` 命令字符串。
2.  **SVG 上下文**：由于您是在 `<svg>` 元素内部进行渲染，因此应使用 `<g>`（分组）标签将路径和 UI 覆盖层包装在一起。
3.  **HTML 覆盖层 (foreignObject)**：要在 SVG 内部使用标准的 HTML 元素（如 `div` 或 `button`），必须将它们包装在定义了 `width` 和 `height` 的 `<foreignObject>` 中。
4.  **事件冒泡**：在覆盖层按钮上使用 `@click.stop`，以防止 `Flow` 引擎触发选择或其他边级别的点击处理程序。
