# Math Process

This example demonstrates one of the core strengths of `Flow`: its **seamless integration with the Vue reactive ecosystem**.

Unlike many graph libraries that rely on a black-box Canvas rendering cycle, `Flow` nodes are essentially scoped slot containers powered by native HTML/Vue components. This means your custom nodes possess all the "Vue Magic" — State management, two-way binding, and component-based logic flow automatically.

## Calculation Demo

Try dragging the value sliders in the "Value" nodes on the left. Watch as the "Result" node on the right updates instantly, just like a standard Vue compute-cycle.

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div style="height: 480px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      :model-value="{ x: 50, y: 50, zoom: 1 }"
      background="dots"
    >
      <!-- Use node slot to completely customize rendering and interaction -->
      <template #node="{ node }">
        <!-- Input Value Node -->
        <div v-if="node.type === 'value'" class="math-node value-node">
          <div class="node-title">{{ node.data?.label }}<\/div>
          <div class="slider-box">
             <input type="range" min="0" max="100" v-model.number="store[node.id]" />
             <span>{{ store[node.id] }}<\/span>
          <\/div>
        <\/div>
        
        <!-- Operator Node -->
        <div v-else-if="node.type === 'operator'" class="math-node operator-node">
          <div class="op-icon">➕<\/div>
        <\/div>

        <!-- Result Display Node -->
        <div v-else-if="node.type === 'result'" class="math-node result-node">
           <div class="node-title">Computed Result<\/div>
           <div class="result-value">{{ resultValue }}<\/div>
        <\/div>
      <\/template>
    <\/yh-flow>
  <\/div>
<\/template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

// 1. Maintain standard reactive state outside the flow component
const store = reactive<Record<string, number>>({
  'val-1': 15,
  'val-2': 30
})

// 2. Leverage Vue computed properties for live results
const resultValue = computed(() => store['val-1'] + store['val-2'])

const nodes: Node[] = [
  { id: 'val-1', type: 'value', position: { x: 50, y: 50 }, data: { label: 'Input A' }, width: 180, height: 70 },
  { id: 'val-2', type: 'value', position: { x: 50, y: 250 }, data: { label: 'Input B' }, width: 180, height: 70 },
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
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: monospace;
}

.value-node {
  background: white;
  border: 1px solid #e2e8f0;
  border-top: 4px solid #3b82f6;
  padding: 8px 12px;
}

.node-title {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 8px;
  font-weight: bold;
  text-transform: uppercase;
}

.slider-box {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slider-box input {
  flex: 1;
}

.slider-box span {
  font-weight: bold;
  font-size: 14px;
}

.operator-node {
  background: #f8fafc;
  border: 2px dashed #94a3b8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.result-node {
  background: #1e293b;
  color: white;
  padding: 12px;
  border: none;
}

.result-node .node-title {
  color: #94a3b8;
}

.result-value {
  font-size: 28px;
  font-weight: bold;
  color: #10b981;
}
<\/style>`

const jsCode = toJs(tsCode)

const store = reactive<Record<string, number>>({
  'val-1': 15,
  'val-2': 30
})

const resultValue = computed(() => store['val-1'] + store['val-2'])

const nodes = ref<Node[]>([
  { id: 'val-1', type: 'value', position: { x: 50, y: 50 }, data: { label: 'Input A' }, width: 180, height: 70 },
  { id: 'val-2', type: 'value', position: { x: 50, y: 250 }, data: { label: 'Input B' }, width: 180, height: 70 },
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

<DemoBlock title="Reactive Logic Wiring" :ts-code="tsCode" :js-code="jsCode">
  <div style="height: 480px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      v-model="viewport"
      background="dots"
    />
  </div>
</DemoBlock>

## Mechanics

Because the content within the `#node` slot is a standard component within your Vue context:

1.  **Reactivity**: Any bindings (e.g., `v-model="store[node.id]"`) work perfectly without intermediate event emitters.
2.  **State Decoupling**: You can manage your business logic in Pinia or local reactive objects and treat `Flow` purely as a view layer.

### Key Node Properties

| Prop          | Type     | Description                                                                                                                                              |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Node.type`   | `string` | Custom identifier. If the type is not one of the built-ins (`input`, `output`, `default`), the component will fall back to using your custom slot logic. |
| `Node.width`  | `number` | The static width of the custom element. This is used for virtualization and intersection math.                                                           |
| `Node.height` | `number` | The static height of the custom element.                                                                                                                 |
