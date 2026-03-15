# 节点工具栏 (Node Toolbar)

为了提升用户的交互效率，您可能希望在用户选中某个节点时，在节点附近（上方、下方等）弹出一个浮动的快捷工具栏。`yh-flow` 的 `NodeToolbar` 组件利用 Vue 的 `Teleport` 技术，确保工具栏在任何画布缩放级别下都能清晰、准确地定位。

## 节点工具栏示例

点击选中下方的节点，观察其上方出现的快捷操作按钮。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      :nodes="nodes"
      :edges="[]"
      background="dots"
    >
      <template #node="{ node }">
        <div class="toolbar-demo-node">
          {{ node.data.label }}

          <!-- 1. 声明 NodeToolbar。可选位置: top, bottom, left, right -->
          <yh-node-toolbar
            :node-id="node.id"
            :selected="node.selected"
            position="top"
          >
            <div class="custom-toolbar">
              <button class="t-btn edit" @click.stop="onEdit(node)">编辑<\/button>
              <button class="t-btn del" @click.stop="onRemove(node.id)">删除<\/button>
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
  { id: 't-1', type: 'custom', position: { x: 150, y: 150 }, data: { label: '点击我查看工具栏' } }
])

const onEdit = (node: Node) => alert('正在编辑节点: ' + node.data.label)
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
  { id: 't-1', type: 'custom', position: { x: 150, y: 150 }, data: { label: '点击我查看工具栏' } }
])

const onEdit = (node: Node) => alert('正在编辑节点: ' + node.data.label)
const onRemove = (id: string) => {
  nodes.value = nodes.value.filter(n => n.id !== id)
}
</script>

<DemoBlock title="浮动快捷工具栏" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      :nodes="nodes"
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
              <button @click.stop="onEdit(node)" style="padding: 4px 8px; font-size: 11px; border: none; border-radius: 4px; cursor: pointer; color: white; background: #3b82f6;">编辑</button>
              <button @click.stop="onRemove(node.id)" style="padding: 4px 8px; font-size: 11px; border: none; border-radius: 4px; cursor: pointer; color: white; background: #ef4444;">删除</button>
            </div>
          </yh-node-toolbar>
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## API 概述

### 属性 (Props)

| 参数名     | 类型      | 默认值   | 说明                                               |
| :--------- | :-------- | :------- | :------------------------------------------------- |
| `nodeId`   | `string`  | **必填** | 宿主节点 ID。                                      |
| `selected` | `boolean` | `false`  | 是否显示工具栏（通常绑定 `node.selected`）。       |
| `position` | `string`  | `'top'`  | 相对位置。可选：`top`, `bottom`, `left`, `right`。 |
| `offset`   | `number`  | `10`     | 工具栏距离节点边缘的像素偏移。                     |

> [!TIP]
>
> 工具栏支持任何自定义的 Vue 插槽内容。我们强烈建议在您的按钮点击事件上使用 `.stop` 修饰符，以防止 `Flow` 引擎在工具栏背后触发选择或平移逻辑。
