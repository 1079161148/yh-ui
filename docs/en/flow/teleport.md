# Teleport Node

In complex diagramming applications, you often need to show floating toolbars, menus, or modal dialogs anchored to specific nodes. However, because the `Flow` engine uses intensive CSS transforms (pan/zoom) and `overflow: hidden` on its viewport, rendering large overlays directly inside a node's HTML will cause visual clipping and coordinate distortion.

The most elegant solution is to leverage Vue 3's built-in `<Teleport>` component. This allows you to logic-bind a dialog to a node while physically rendering it outside the transformed canvas area.

## Teleport Modal Demo

Click the "Configure Node" button inside the node below. Its internal state will trigger a `<Teleport>` to the root container, ensuring the modal is centered correctly and remains crisp regardless of canvas scale.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; position: relative;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      background="dots"
    >
      <template #node="{ node }">
        <div class="teleport-node">
          <div class="node-title">{{ node.data?.label }}<\/div>
          <button class="open-btn" @mousedown.stop @click.stop="isOpen = true">Configure Node<\/button>
          
          <!-- Use Teleport to move the dialog out of the transformed container -->
          <Teleport to="body" v-if="isOpen">
            <div class="teleport-modal-mask" @click="isOpen = false">
               <div class="teleport-modal-content" @click.stop>
                 <h3>Node Settings<\/h3>
                 <p class="modal-body">Active Node ID: {{ node.id }}<\/p>
                 <div class="modal-actions">
                   <button class="close-btn" @click="isOpen = false">Save & Close<\/button>
                 <\/div>
               <\/div>
            <\/div>
          <\/Teleport>
        <\/div>
      <\/template>
    <\/yh-flow>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const isOpen = ref(false)

const nodes: Node[] = [
  { id: '1', type: 'custom', position: { x: 100, y: 100 }, data: { label: 'Clickable Anchor' }, width: 140, height: 85 }
]
const edges: Edge[] = []
<\/script>

<style scoped>
.teleport-node {
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
.node-title {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}
.open-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
}
.teleport-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.teleport-modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
.teleport-modal-content h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #0f172a;
}
.modal-body {
  font-size: 14px;
  color: #475569;
  margin: 0;
}
.modal-actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}
.close-btn {
  background: #10b981;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
<\/style>`

const jsCode = toJs(tsCode)

const isOpen = ref(false)
const nodes = ref<Node[]>([
  { id: '1', type: 'custom', position: { x: 100, y: 100 }, data: { label: 'Clickable Anchor' }, width: 140, height: 85 }
])

const viewport = ref({ x: 50, y: 50, zoom: 1 })
</script>

<DemoBlock title="Context-Free Modal Overlay" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; position: relative;">
    <yh-flow
      :nodes="nodes"
      :edges="[]"
      v-model="viewport"
      background="dots"
    >
      <template #node="{ node }">
        <div style="width: 100%; height: 100%; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          <div style="font-size: 13px; font-weight: 600; text-align: center;">{{ node.data?.label }}</div>
          <button @mousedown.stop @click.stop="isOpen = true" style="background: #3b82f6; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">Configure Node</button>
          <Teleport to="body" v-if="isOpen">
            <div @click="isOpen = false" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; z-index: 9999;">
               <div @click.stop style="background: white; padding: 24px; border-radius: 12px; width: 320px; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
                 <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #000;">Node Settings</h3>
                 <p style="margin: 0; font-size: 14px; color: #475569;">Active Node ID: {{ node.id }}</p>
                 <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
                   <button @click="isOpen = false" style="background: #10b981; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Save & Close</button>
                 </div>
               </div>
            </div>
          </Teleport>
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## Why use Teleport?

1.  **Coordinate Escape**: The `Flow` content layer uses `transform: translate3d`. In most browsers, this creates a new containing block for all absolute/fixed children. By teleporting, you "bubble up" to a parent container that isn't transformed, keeping your UI standard.
2.  **Clipping Prevention**: The engine uses `overflow: hidden` on its viewport. Any child element that exceeds the node's bounds will be clipped. `Teleport` circumvents this entirely.
3.  **Z-Index Consistency**: It ensures your modals always appear above all nodes and edges—regardless of the node's internal stacking order or rendering priority.
