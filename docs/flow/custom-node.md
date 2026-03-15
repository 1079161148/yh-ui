# 自定义节点 (Custom Node)

在 `yh-flow` 中，节点不仅仅是一个带边框的矩形，它本质上是一个可以容纳任何 Vue 组件或 HTML 元素的 **作用域插槽容器**。这意味着您可以利用 CSS 动画、渐变、以及任何第三方 UI 组件来构建极致精美的节点。

## 高级自定义节点示例

下方展示了如何通过插槽方案实现一个具有“玻璃态”质感、动态呼吸灯效果以及内部交互逻辑的专业级自定义节点。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #0f172a;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      background="none"
    >
      <!-- 1. 使用 #node 插槽访问节点数据对象 -->
      <template #node="{ node }">
        <div v-if="node.type === 'premium'" class="glass-node">
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
      title: '核心集群', 
      description: '管理来自边缘计算节点的聚合请求流。' 
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
      title: '核心集群', 
      description: '管理来自边缘计算节点的聚合请求流。' 
    } 
  }
])
</script>

<DemoBlock title="玻璃态高级节点" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #0f172a;">
    <yh-flow
      :nodes="nodes"
      :edges="[]"
      :model-value="{ x: 50, y: 20, zoom: 1 }"
      background="none"
    >
      <template #node="{ node }">
        <div v-if="node.type === 'premium'" style="position: relative; width: 100%; height: 100%; padding: 1px; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%); border-radius: 12px; color: white; border: 1px solid rgba(255,255,255,0.1); overflow: visible;">
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

## 实现注意事项

在通过插槽构建自定义节点时，请牢记以下核心行为：

1.  **事件冒泡**：标准的 DOM 事件（click、mousedown）将冒泡到 `Flow` 引擎，用于选择逻辑，除非您明确使用 `.stop`（例如，在节点内部按钮上使用 `@click.stop`）。
2.  **选择反馈**：使用插槽传递的 `node.selected` 布尔值来应用高亮样式（例如，更改边框颜色）。
3.  **尺寸**：如果内部布局复杂，请始终在节点数据中指定 `width` 和 `height`。这对于可预测的虚拟化和边路由计算是强制性的。

> [!TIP]
>
> 想要在单个侧边设置多个连接点？请查看节点类型下的 **[自定义连接点配置](./nodes.md#custom-handle-configurations)** 部分。
