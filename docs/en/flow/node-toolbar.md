# Node Toolbar

To enhance user interaction efficiency, you may want a floating shortcut toolbar to appear near a node (above, below, etc.) when it is selected. The `yh-flow` `NodeToolbar` component uses Vue Teleport so the toolbar stays correctly positioned at any canvas zoom level.

## Node Toolbar Example

Click the node below to see the shortcut buttons above it. The demo uses `v-model:nodes` so selection syncs to the parent and the toolbar visibility (which depends on `node.selected`) works correctly.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      v-model:nodes="nodes"
      :edges="[]"
      background="dots"
    >
      <template #node="{ node }">
        <div class="toolbar-demo-node">
          {{ node.data.label }}

          <!-- 1. Declare NodeToolbar. Positions: top, bottom, left, right -->
          <yh-node-toolbar
            :node-id="node.id"
            :selected="node.selected"
            position="top"
          >
            <div class="custom-toolbar">
              <button class="t-btn edit" @click.stop="onEdit(node)">Edit<\/button>
              <button class="t-btn del" @click.stop="onRemove(node.id)">Delete<\/button>
            <\/div>
          <\/yh-node-toolbar>
        <\/div>
      <\/template>
    <\/yh-flow>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: 't-1', type: 'custom', position: { x: 150, y: 150 }, data: { label: 'Click Me for Tools' } }
])

const onEdit = (node: Node) => alert('Editing node: ' + node.data.label)
const onRemove = (id: string) => {
  nodes.value = nodes.value.filter(n => n.id !== id)
}
<\/script>

<style scoped>
.toolbar-demo-node {
  width: 160px;
  height: 60px;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
.custom-toolbar {
  display: flex;
  gap: 4px;
  padding: 2px;
}
.t-btn {
  padding: 4px 8px;
  font-size: 11px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
.t-btn.edit { background: #3b82f6; }
.t-btn.del { background: #ef4444; }
<\/style>`

const jsCode = toJs(tsCode)

const viewport = ref({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([
  { id: 't-1', type: 'custom', position: { x: 150, y: 150 }, data: { label: 'Click Me for Tools' } }
])

const onEdit = (node: Node) => alert('Editing node: ' + node.data.label)
const onRemove = (id: string) => {
  nodes.value = nodes.value.filter(n => n.id !== id)
}
</script>

<DemoBlock title="Floating Shortcut Toolbar" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      v-model:nodes="nodes"
      :edges="[]"
      v-model="viewport"
      background="dots"
    >
      <template #node="{ node }">
        <div style="width: 160px; height: 60px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px;">
          {{ node.data.label }}
          <yh-node-toolbar
            :node-id="node.id"
            :selected="node.selected"
            position="top"
          >
            <div style="display: flex; gap: 4px; padding: 2px;">
              <button @click.stop="onEdit(node)" style="padding: 4px 8px; font-size: 11px; border: none; border-radius: 4px; cursor: pointer; color: white; background: #3b82f6;">Edit</button>
              <button @click.stop="onRemove(node.id)" style="padding: 4px 8px; font-size: 11px; border: none; border-radius: 4px; cursor: pointer; color: white; background: #ef4444;">Delete</button>
            </div>
          </yh-node-toolbar>
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## API Reference

### Props

| Name       | Type      | Default      | Description                                                        |
| :--------- | :-------- | :----------- | :----------------------------------------------------------------- |
| `nodeId`   | `string`  | **Required** | The ID of the parent node.                                         |
| `selected` | `boolean` | `false`      | Whether to display the toolbar (usually bound to `node.selected`). |
| `position` | `string`  | `'top'`      | Relative position: `top`, `bottom`, `left`, `right`.               |
| `offset`   | `number`  | `10`         | Pixel distance from the node edge.                                 |

> [!TIP]
>
> The toolbar supports any custom Vue slot content. We strongly recommend using the `.stop` modifier on your buttons' `@click` events to prevent the `Flow` engine from triggering selection or pan logic behind the toolbar.
