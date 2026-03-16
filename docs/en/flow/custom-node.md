# Custom Nodes

In `Flow`, a node is more than just a rectangle with a border; it is fundamentally a **scoped slot container** that can host any Vue component or HTML structure. This allows you can leverage CSS animations, complex gradients, and third-party UI libraries to create stunning node interfaces.

## Premium Custom Node Demo

The following example demonstrates a professional-grade node featuring a "glassmorphism" aesthetic, dynamic glow effects, and internal layout logic using slots.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #0f172a;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      background="none"
    >
      <!-- 1. Use the #node slot to access the node data object -->
      <template #node="{ node }">
        <div v-if="node.type === 'premium'" class="glass-node" :class="{ 'is-selected': node.selected }">
          <div class="node-glow"><\/div>
          <div class="node-inner">
             <div class="node-header">
                <span class="status-dot"><\/span>
                <span class="node-id">ID: {{ node.id }}<\/span>
             <\/div>
             <div class="node-body">
                <h3>{{ node.data.title }}<\/h3>
                <p>{{ node.data.description }}<\/p>
                <div class="node-footer">
                  <span class="tag">Production<\/span>
                  <span class="uptime">99.9%<\/span>
                <\/div>
             <\/div>
          <\/div>
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
    id: 'premium-1', 
    type: 'premium', 
    position: { x: 100, y: 100 }, 
    width: 280, height: 160,
    data: { 
      title: 'Cluster Core', 
      description: 'Manages aggregate request streams from edge computing nodes.' 
    } 
  }
])
const edges = ref<Edge[]>([])
<\/script>

<style scoped>
.glass-node {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
  border-radius: 12px;
  color: white;
  border: 1px solid rgba(255,255,255,0.1);
  overflow: visible;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.glass-node.is-selected {
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.node-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  z-index: -1;
  animation: pulse 3s infinite alternate;
}

.node-inner {
  height: 100%;
  backdrop-filter: blur(12px);
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
}
.node-id {
  font-size: 10px;
  color: rgba(255,255,255,0.5);
  font-family: monospace;
}
.node-body h3 {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}
.node-body p {
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.7);
  line-height: 1.5;
}
.node-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag {
  font-size: 10px;
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  padding: 2px 8px;
  border-radius: 100px;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
.uptime {
  font-size: 11px;
  color: #94a3b8;
}

@keyframes pulse {
  from { opacity: 0.3; transform: scale(0.95); }
  to { opacity: 0.7; transform: scale(1.05); }
}
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { 
    id: 'premium-1', 
    type: 'premium', 
    position: { x: 100, y: 100 }, 
    width: 280, height: 160,
    data: { 
      title: 'Cluster Core', 
      description: 'Manages aggregate request streams from edge computing nodes.' 
    } 
  }
])
</script>

<DemoBlock title="Glassmorphism Premium Node" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #0f172a;">
    <yh-flow
      :nodes="nodes"
      :edges="[]"
      :model-value="{ x: 50, y: 20, zoom: 1 }"
      background="none"
    >
      <template #node="{ node }">
        <div v-if="node.type === 'premium'" style="position: relative; width: 100%; height: 100%; padding: 1px; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%); border-radius: 12px; color: white; border: 1px solid rgba(255,255,255,0.1); overflow: visible; transition: border-color 0.2s, box-shadow 0.2s;"
             :style="node.selected ? { borderColor: 'rgba(59, 130, 246, 0.8)', boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)' } : {}">
          <div style="height: 100%; backdrop-filter: blur(12px); padding: 16px; display: flex; flex-direction: column;">
             <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981;"></span>
                <span style="font-size: 10px; color: rgba(255,255,255,0.5); font-family: monospace;">ID: {{ node.id }}</span>
             </div>
             <div style="flex: 1;">
                <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #fff;">{{ node.data.title }}</h3>
                <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.5;">{{ node.data.description }}</p>
             </div>
             <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 10px; background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 2px 8px; border-radius: 100px; border: 1px solid rgba(59, 130, 246, 0.3);">Production</span>
                <span style="font-size: 11px; color: #94a3b8;">Uptime: 99.9%</span>
             </div>
          </div>
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## Implementation Notes

When building custom nodes via slots, keep these core behaviors in mind:

1.  **Event Bubbling**: standard DOM events (click, mousedown) bubble to the `Flow` engine for selection; canvas interactions (click to select, drag to move, Ctrl+wheel to zoom, drag empty area to pan) are provided by default. Use `.stop` only when you need to prevent that (e.g. `@click.stop` on a node-internal button).
2.  **Selection Feedback**: Use the slot’s `node.selected` boolean to apply highlighted styles (e.g. border or glow). **The example above uses `node.selected` so the node border and shadow change when selected—click the node to see the highlight.**
3.  **Dimensions**: Always specify `width` and `height` in your node data if your internal layout is complex. This is mandatory for predictable virtualization and edge-routing calculations.

> [!TIP]
>
> Looking for multiple connection points on a single side? Check the **[Custom Handles](./nodes.md#custom-handle-configurations)** section under Node Types.
