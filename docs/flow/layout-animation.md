# 动画与布局 (Layout & Animation)

当布局发生变化时（比如从垂直变为水平），直接瞬间跳转位置会给用户带来视觉上的割裂感。利用 `Flow` 的 DOM 高性能渲染特性，我们可以非常简单地通过 CSS 过渡来实现极致丝滑的布局动画。

## 布局动画示例

点击切换布局，观察节点是如何“游动”到新位置的。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'

const tsCode = `<template>
  <div class="layout-container">
    <div class="layout-toolbar">
      <button class="layout-btn" @click="onLayout('TB')">垂直切换</button>
      <button class="layout-btn" @click="onLayout('LR')">水平切换</button>
    </div>
    
    <div class="layout-flowbox">
      <!-- 重点：给 yh-flow 增加一个特定的类来控制动画开关 -->
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        background="grid"
        :class="{ 'layout-animating': isAnimating }"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'
import dagre from 'dagre'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Node 2' } },
  { id: '3', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 3' } },
  { id: '4', type: 'output', position: { x: 150, y: 250 }, data: { label: 'Node 4' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' }
])

const isAnimating = ref(false)

const onLayout = (direction: 'TB' | 'LR') => {
  // 1. 开启布局动画模式
  isAnimating.value = true

  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 })
  g.setDefaultEdgeLabel(() => ({}))
  nodes.value.forEach(n => g.setNode(n.id, { width: 150, height: 50 }))
  edges.value.forEach(e => g.setEdge(e.source, e.target))
  
  dagre.layout(g)

  // 2. 更新坐标
  nodes.value = nodes.value.map(n => {
    const { x, y } = g.node(n.id)
    return { ...n, position: { x: x - 75, y: y - 25 } }
  })

  // 3. 在过渡动画结束后（如 600ms）关闭动画模式，防止拖拽节点时也带着延迟
  setTimeout(() => {
    isAnimating.value = false
  }, 600)
}
<\/script>

<style scoped>
/* 核心：只在布局切换期间为 transform 增加过渡，防止日常拖拽手感迟钝 */
.layout-animating :deep(.yh-flow-node) {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.layout-animating :deep(.yh-flow-edge path) {
  transition: d 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.layout-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.layout-toolbar {
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 8px;
}

.layout-btn {
  padding: 6px 12px;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.layout-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.layout-flowbox {
  flex: 1;
  position: relative;
}
<\/style>
`

const jsCode = toJs(tsCode)

const nodes = ref([
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Node 2' } },
  { id: '3', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 3' } },
  { id: '4', type: 'output', position: { x: 150, y: 250 }, data: { label: 'Node 4' } }
])
const edges = ref([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])

const isAnimating = ref(false)

const onLayout = async (direction: 'TB' | 'LR') => {
  isAnimating.value = true
  const dagre = (await import('dagre')).default
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 })
  g.setDefaultEdgeLabel(() => ({}))
  nodes.value.forEach(n => g.setNode(n.id, { width: 150, height: 50 }))
  edges.value.forEach(e => g.setEdge(e.source, e.target))
  dagre.layout(g)
  nodes.value = nodes.value.map(n => {
    const { x, y } = g.node(n.id)
    return { ...n, position: { x: x - 75, y: y - 25 } }
  })
  setTimeout(() => { isAnimating.value = false }, 600)
}
</script>

<DemoBlock title="带阻尼动画的布局" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; z-index: 2;">
      <button @click="onLayout('TB')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">垂直布局 (TB)</button>
      <button @click="onLayout('LR')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">水平布局 (LR)</button>
    </div>
    <div style="flex: 1; position: relative;">
      <component :is="'style'">
        .layout-animating .yh-flow-node {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .layout-animating .yh-flow-edge path {
          transition: d 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      </component>
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        :model-value="{ x: 100, y: 50, zoom: 0.8 }"
        background="grid"
        :style="{ height: '100%' }"
        :class="{ 'layout-animating': isAnimating }"
      />
    </div>
  </div>
</DemoBlock>

## 实现细节

1. **临时绑定**：我们不推荐始终在节点上开启 `transition: transform`。这会导致用户在手动拖拽节点时，节点尝试由于过渡动画而产生“粘滞感”和“手感延迟”。
2. **逻辑开关**：如上例所示，在触发布局算法前，通过父组件状态增加一个 `.layout-animating` 类名。
3. **连线路径动画**：现代游览器（Chrome/Edge 等）已经支持对 SVG `<path>` 的 `d` 属性执行过过渡动画。如果路径点数量一致，连线也会非常自然地向新位置扭动。
4. **清理工作**：在预估的动画周期结束后，移除该类名，恢复爽快的拖拽手感。
