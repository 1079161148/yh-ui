# Deep Recipe: Flow Editor

Use this recipe when building visual workflow editors, node graph layouts, BPMN diagram canvases, AI agent workflow charts, or visual automation tools.

## Default Choice

Use `@yh-ui/flow` with the core `Flow` canvas, complemented by helper components like `Controls`, `Minimap`, and `FlowBackground`.

## Custom Node & Edge Types

- **BPMN Nodes**: Call `registerBpmnNodes()` to enable elements like `BpmnStartEvent`, `BpmnEndEvent`, `BpmnTask`, `BpmnServiceTask`, `BpmnUserTask`, `BpmnExclusiveGateway`, and gateway routes.
- **AI Workflow Nodes**: Call `registerAiWorkflowNodes()` to enable AI building blocks like `AiLlmNode`, `AiPromptNode`, `AiAgentNode`, `AiToolNode`, `AiConditionNode`, `AiStartNode`, and `AiMemoryNode`.
- **Custom Editor Helpers**: Use `NodeResizer` (for interactive sizing anchors), `NodeToolbar` (message actions above nodes), and `NodeEditPanel` for sidebar updates.

## Pattern: Interactive AI Agent Flow Editor

This example showcases a full-featured flow editor with auto-alignment guides, grid snap, interactive node resizing, history management (undo/redo), and AI workflow preset registration:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Flow,
  Controls,
  Minimap,
  FlowBackground,
  registerAiWorkflowNodes,
  NodeResizer,
  NodeToolbar,
  type FlowNode,
  type FlowEdge
} from '@yh-ui/flow'
import { YhButton, YhMessage } from '@yh-ui/components'

// 1. Register AI Workflow node presets on the engine
registerAiWorkflowNodes()

// 2. Setup nodes state
const nodes = ref<FlowNode[]>([
  {
    id: 'node-start',
    type: 'ai-start',
    label: 'Trigger Prompt',
    position: { x: 100, y: 150 }
  },
  {
    id: 'node-llm',
    type: 'ai-llm',
    label: 'Process text (DeepSeek)',
    position: { x: 350, y: 150 },
    // Custom data parameters
    data: { model: 'deepseek-chat', temperature: 0.7 }
  },
  {
    id: 'node-end',
    type: 'ai-end',
    label: 'Output Result',
    position: { x: 600, y: 150 }
  }
])

// 3. Setup edges state
const edges = ref<FlowEdge[]>([
  { id: 'e-start-llm', source: 'node-start', target: 'node-llm', type: 'smooth' },
  { id: 'e-llm-end', source: 'node-llm', target: 'node-end', type: 'bezier' }
])

const flowRef = ref<any>(null)

// History management helpers
function triggerUndo() {
  if (flowRef.value?.history) {
    flowRef.value.history.undo()
    YhMessage.info('Action undone')
  }
}

function triggerRedo() {
  if (flowRef.value?.history) {
    flowRef.value.history.redo()
    YhMessage.info('Action redone')
  }
}

function handleNodeClick(node: FlowNode) {
  console.log('Clicked node config:', node.data)
}
</script>

<template>
  <div class="editor-layout">
    <div class="editor-header">
      <YhButton size="small" icon="mdi:undo" @click="triggerUndo">Undo</YhButton>
      <YhButton size="small" icon="mdi:redo" @click="triggerRedo">Redo</YhButton>
    </div>

    <!-- Explicit container dimensions are mandatory for Flow to compute sizes -->
    <div class="canvas-container" style="height: 600px; border: 1px solid var(--yh-border-color)">
      <Flow
        ref="flowRef"
        v-model:nodes="nodes"
        v-model:edges="edges"
        snap-to-grid
        show-alignment-guides
        :min-zoom="0.2"
        :max-zoom="4"
        :history="true"
        @nodeClick="handleNodeClick"
      >
        <Minimap />
        <Controls />
        <FlowBackground color="#ccc" :grid-size="15" />

        <!-- Custom slot overriding for customized node presentation -->
        <template #node="{ node }">
          <div class="custom-node-body">
            <!-- NodeToolbar renders edit controls above the active node -->
            <NodeToolbar :visible="node.selected" position="top">
              <button class="node-action-btn">Configure</button>
            </NodeToolbar>

            <!-- NodeResizer renders adjustment handles around the box -->
            <NodeResizer :min-width="100" :min-height="40" />

            <div class="node-label">{{ node.label }}</div>
          </div>
        </template>
      </Flow>
    </div>
  </div>
</template>

<style scoped>
.canvas-container {
  background-color: var(--yh-bg-color-page);
}
.custom-node-body {
  padding: 10px;
  border-radius: var(--yh-border-radius-base);
  border: 1px solid var(--yh-border-color);
  background: var(--yh-bg-color);
  box-shadow: var(--yh-box-shadow-light);
  min-width: 150px;
}
.node-action-btn {
  background: var(--yh-color-primary);
  color: #fff;
  border: none;
  font-size: 11px;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px 6px;
}
</style>
```

## Agent Rules

- **Explicit Height**: Always wrap the `Flow` canvas inside a container element with an explicit CSS height (e.g. `style="height: 600px"`). Flow cannot render inside collapsed grid elements.
- **ClientOnly in Nuxt**: Because flow editors heavily access browser SVG methods, always wrap `Flow` in `<ClientOnly>` when building Nuxt SSR applications.
- **Controlled Models**: Bind canvas state using Vue 3 two-way models `v-model:nodes` and `v-model:edges` to guarantee changes propagate between component nodes and state.
- **Durable data properties**: Save custom node parameter fields (like database queries, API targets) inside the serializable `node.data` object.
