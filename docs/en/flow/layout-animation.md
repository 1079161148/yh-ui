# Layout & Animation

When a diagram's layout changes鈥攆or example, switching from a vertical to a horizontal hierarchical view鈥攊nstantly jumping nodes to new coordinates can be visually jarring. Leveraging `Flow`'s high-performance DOM-based rendering, you can easily implement smooth, professional-grade layout animations using native CSS transitions.

## Smooth Layout Transition Demo

Switch between layout directions below to see nodes and edges "swim" into their new positions with fluid, dampened motion.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="layout-container">
    <div class="layout-toolbar">
      <button class="layout-btn" @click="onLayout('TB')">Vertical (TB)</button>
      <button class="layout-btn" @click="onLayout('LR')">Horizontal (LR)</button>
    </div>
    
    <div class="layout-flowbox">
      <!-- Logic: Bind a class to toggle transitons only during layout calculation -->
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
  // 1. Enable animation mode
  isAnimating.value = true

  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 })
  g.setDefaultEdgeLabel(() => ({}))
  nodes.value.forEach(n => g.setNode(n.id, { width: 150, height: 50 }))
  edges.value.forEach(e => g.setEdge(e.source, e.target))
  
  dagre.layout(g)

  // 2. Update reactive positions
  nodes.value = nodes.value.map(n => {
    const { x, y } = g.node(n.id)
    return { ...n, position: { x: x - 75, y: y - 25 } }
  })

  // 3. Clear the animation class after the transition finishes (e.g. 600ms)
  // This prevents the "floaty" feeling when manually dragging nodes later
  setTimeout(() => {
    isAnimating.value = false
  }, 600)
}
<\/script>

<style scoped>
/* Core: Apply transition ONLY when layout-animating class is present */
.layout-animating :deep(.yh-flow-node) {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.layout-animating :deep(.yh-flow-edge path) {
  transition: d 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.layout-container { display: flex; flex-direction: column; height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.layout-toolbar { padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; }
.layout-btn { padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer; }
.layout-flowbox { flex: 1; position: relative; }
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Node 2' } },
  { id: '3', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 3' } },
  { id: '4', type: 'output', position: { x: 150, y: 250 }, data: { label: 'Node 4' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])

const isAnimating = ref(false)

const onLayout = async (direction: 'TB' | 'LR') => {
  isAnimating.value = true
  try {
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
  } catch (err) {
    console.warn(err)
  }
}
</script>

<DemoBlock title="Animated Layout Transition" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; z-index: 2;">
      <button @click="onLayout('TB')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">Vertical (TB)</button>
      <button @click="onLayout('LR')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">Horizontal (LR)</button>
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

## Implementation Best Practices

1.  **Transient Class Binding**: Do not leave `transition: transform` enabled permanently. This causes "input lag" when a user manually drags a node, as the node will try to transition to the mouse position rather than following it instantly.
2.  **Edge Path Animation**: Modern browsers (Chrome/Edge/Safari) support transitioning the `d` attribute of SVG `<path>` elements. As long as the number of path segments remains consistent, the edges will morph smoothly.
3.  **Cleanup**: Always use a `setTimeout` or transition events to remove the animation class once the layout shift is complete. This restores the snappy, direct response feel for user interactions.
