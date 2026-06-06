# 传送节点 (Teleport Node)

在复杂的流程图应用中，您可能会在某个节点上放置复杂的悬浮工具栏或弹出层（Modal/Dialog）。由于 SVG 或者拖拽画布中存在各种 `overflow: hidden`、复杂的 `z-index` 堆栈，以及频繁刷新的 CSS Transforms，如果您直接在节点 HTML 内渲染浮层，不可避免地会遇到裁剪和坐标异常。

这时候，最优雅的解决方案是利用 Vue 的 `<Teleport>` 内置组件。这再一次彰显了 `yh-flow` 的节点即 Vue Template 的核心优势！

## Teleport 浮出层示例

点击下方的 "配置节点" 按钮，它会在节点内部修改状态，弹出一个全局层级的对话框。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <!-- 定义一个具有定位属性的容器作为 Teleport 的被选目标（也可直接传送至 body） -->
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
          <button class="open-btn" @mousedown.stop @click.stop="isOpen = true">配置节点<\/button>
          
          <!-- 使用 Teleport 将对话框移出变换后的容器，传送到最外层 -->
          <Teleport to="body" v-if="isOpen">
            <div class="teleport-modal-mask" @click="isOpen = false">
               <div class="teleport-modal-content" @click.stop>
                 <h3>节点设置<\/h3>
                 <p class="modal-body">当前激活节点 ID: {{ node.id }}<\/p>
                 <div class="modal-actions">
                   <button class="close-btn" @click="isOpen = false">保存并关闭<\/button>
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
  { id: '1', type: 'custom', position: { x: 100, y: 100 }, data: { label: '可点击锚点' }, width: 140, height: 85 }
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
const viewport = ref({ x: 50, y: 50, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'custom', position: { x: 100, y: 100 }, data: { label: '可点击锚点' }, width: 140, height: 85 }
])
</script>

<DemoBlock title="跨上下文弹窗" :ts-code="tsCode" :js-code="jsCode">
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
          <button @mousedown.stop @click.stop="isOpen = true" style="background: #3b82f6; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">配置节点</button>
          <Teleport to="body" v-if="isOpen">
            <div @click="isOpen = false" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; z-index: 9999;">
               <div @click.stop style="background: white; padding: 24px; border-radius: 12px; width: 320px; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
                 <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #000;">节点设置</h3>
                 <p style="margin: 0; font-size: 14px; color: #475569;">当前激活节点 ID: {{ node.id }}</p>
                 <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
                   <button @click="isOpen = false" style="background: #10b981; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">保存并关闭</button>
                 </div>
               </div>
            </div>
          </Teleport>
        </div>
      </template>
    </yh-flow>
  </div>
</DemoBlock>

## 为什么使用 Teleport？

1.  **坐标系逃逸**：`Flow` 数据层使用了 `transform: translate3d`。在大多数浏览器中，这会为所有绝对/固定定位的子元素创建一个新的包含块。通过传送，您可以“浮出”到一个没有变换的父容器中，保持 UI 标准。
2.  **防止裁剪**：引擎在视口上使用 `overflow: hidden`。任何超出节点边界的子元素都会被剪裁。`Teleport` 完全避开了这一点。
3.  **Z-Index 一致性**：它确保您的模态框始终出现在所有节点和连线之上，无论节点的内部堆叠顺序或渲染优先级如何。
