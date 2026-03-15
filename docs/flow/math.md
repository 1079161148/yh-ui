# 动态计算 (Math Process)

这个示例展示了 `Flow` 的核心优势之一：它与 **Vue 响应式生态系统的无缝集成**。

不像许多图表库依赖于黑盒的 Canvas 渲染周期，`Flow` 节点本质上是由原生 HTML/Vue 组件驱动的作用域插槽容器。这意味着您的自定义节点拥有所有的“Vue 魔法”——状态管理、双向绑定和基于组件的逻辑流程自动生效。

## 计算演示

尝试拖动左侧“数值”节点中的滑块。观察右侧的“结果”节点如何像标准的 Vue 计算周期一样即时更新。

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 480px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      background="dots"
    >
      <!-- 使用 node 插槽完全自定义渲染和交互 -->
      <template #node="{ node }">
        <!-- 输入数值节点 -->
        <div v-if="node.type === 'value'" class="math-node value-node">
          <div class="node-title">{{ node.data?.label }}<\/div>
          <div class="slider-box">
             <input type="range" min="0" max="100" v-model.number="store[node.id]" />
             <span>{{ store[node.id] }}<\/span>
          <\/div>
        <\/div>
        
        <!-- 操作符节点 -->
        <div v-else-if="node.type === 'operator'" class="math-node operator-node">
          <div class="op-icon">➕<\/div>
        <\/div>

        <!-- 结果展示节点 -->
        <div v-else-if="node.type === 'result'" class="math-node result-node">
           <div class="node-title">计算结果<\/div>
           <div class="result-value">{{ resultValue }}<\/div>
        <\/div>
      <\/template>
    <\/yh-flow>
  <\/div>
<\/template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

// 1. 在流程组件外部维护标准的响应式状态
const store = reactive<Record<string, number>>({
  'val-1': 15,
  'val-2': 30
})

// 2. 利用 Vue 的 computed 属性进行实时计算
const resultValue = computed(() => store['val-1'] + store['val-2'])

const nodes: Node[] = [
  { id: 'val-1', type: 'value', position: { x: 50, y: 50 }, data: { label: '输入 A' }, width: 180, height: 70 },
  { id: 'val-2', type: 'value', position: { x: 50, y: 250 }, data: { label: '输入 B' }, width: 180, height: 70 },
  { id: 'op-1', type: 'operator', position: { x: 300, y: 150 }, data: {}, width: 60, height: 60 },
  { id: 'res-1', type: 'result', position: { x: 500, y: 140 }, data: {}, width: 180, height: 80 }
]

const edges: Edge[] = [
  { id: 'e1', source: 'val-1', target: 'op-1', type: 'smoothstep', animated: true },
  { id: 'e2', source: 'val-2', target: 'op-1', type: 'smoothstep', animated: true },
  { id: 'e3', source: 'op-1', target: 'res-1', type: 'smoothstep', markerEnd: 'url(#yh-arrow-default)' }
]
<\/script>

<style scoped>
.math-node {
  width: 100%; height: 100%; border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  display: flex; flex-direction: column; justify-content: center;
  font-family: monospace;
}
.value-node { background: white; border: 1px solid #e2e8f0; border-top: 4px solid #3b82f6; padding: 8px 12px; }
.node-title { font-size: 11px; color: #64748b; margin-bottom: 8px; font-weight: bold; text-transform: uppercase; }
.slider-box { display: flex; align-items: center; gap: 8px; }
.slider-box input { flex: 1; }
.slider-box span { font-weight: bold; font-size: 14px; }
.operator-node { background: #f8fafc; border: 2px dashed #94a3b8; border-radius: 50%; align-items: center; justify-content: center; font-size: 20px; }
.result-node { background: #1e293b; color: white; padding: 12px; border: none; }
.result-node .node-title { color: #94a3b8; }
.result-value { font-size: 28px; font-weight: bold; color: #10b981; }
<\/style>`

const jsCode = toJs(tsCode)

const store = reactive<Record<string, number>>({
  'val-1': 15,
  'val-2': 30
})

const resultValue = computed(() => store['val-1'] + store['val-2'])

const nodes = ref<Node[]>([
  { id: 'val-1', type: 'value', position: { x: 50, y: 50 }, data: { label: '输入 A' }, width: 180, height: 70 },
  { id: 'val-2', type: 'value', position: { x: 50, y: 250 }, data: { label: '输入 B' }, width: 180, height: 70 },
  { id: 'op-1', type: 'operator', position: { x: 300, y: 150 }, width: 60, height: 60 },
  { id: 'res-1', type: 'result', position: { x: 500, y: 140 }, width: 180, height: 80 }
])

const edges = ref<Edge[]>([
  { id: 'e1', source: 'val-1', target: 'op-1', type: 'smoothstep', animated: true },
  { id: 'e2', source: 'val-2', target: 'op-1', type: 'smoothstep', animated: true },
  { id: 'e3', source: 'op-1', target: 'res-1', type: 'smoothstep', markerEnd: 'url(#yh-arrow-default)' }
])

const viewport = ref({ x: 50, y: 50, zoom: 1 })
</script>

<DemoBlock title="响应式逻辑连线" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 480px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      v-model="viewport"
      background="dots"
    />
  </div>
</DemoBlock>

## 机制解析

因为 `#node` 插槽内的内容是您的 Vue 上下文中的标准组件：

1. **响应式**：任何绑定（例如 `v-model="store[node.id]"`）都能完美工作，无需中间的事件派发器。
2. **状态解耦**：您可以在 Pinia 或本地响应式对象中管理您的业务逻辑，将 `Flow` 纯粹作为一个视图层。

### 核心节点属性

| 属性          | 类型     | 说明                                                                                                         |
| :------------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| `Node.type`   | `string` | 自定义标识符。如果类型不是内置类型之一（`input`、`output`、`default`），组件将回退到使用您的自定义插槽逻辑。 |
| `Node.width`  | `number` | 自定义元素的静态宽度。用于虚拟化和碰撞检测数学计算。                                                         |
| `Node.height` | `number` | 自定义元素的静态高度。                                                                                       |
