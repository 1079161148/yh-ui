# Deep Recipe: Flow

Use this recipe for workflow editors, node graphs, BPMN-like diagrams, AI workflow canvases, and visual automation builders.

## Default Choice

Use `@yh-ui/flow` with `Flow`, `Controls`, `Minimap`, and `FlowBackground`.

Always set an explicit canvas height.

## Source-Aligned API Highlights

- Props: `nodes`, `edges`, `modelValue`, `minZoom`, `maxZoom`, `defaultNodeType`, `defaultEdgeType`, `nodesDraggable`, `edgesConnectable`, `selectable`, `background`, `snapToGrid`, `readonly`, `keyboardShortcuts`, `showControls`, `showMinimap`, `history`, `virtualized`, `isValidConnection`.
- Events: `update:modelValue`, `update:nodes`, `update:edges`, `nodeClick`, `nodeDragStart`, `nodeDrag`, `nodeDragEnd`, `edgeClick`, `edgeConnect`, `selectionChange`, `historyChange`, `viewportChange`.
- Slots: `node`, `edge`.
- Use AI workflow nodes: `AiLlmNode`, `AiPromptNode`, `AiAgentNode`, `AiToolNode`, `AiConditionNode`, `AiStartNode`, `AiEndNode`, `AiMemoryNode`.
- Use BPMN nodes: `BpmnStartEvent`, `BpmnEndEvent`, `BpmnTask`, `BpmnServiceTask`, `BpmnUserTask`, `BpmnExclusiveGateway`, `BpmnParallelGateway`, `BpmnInclusiveGateway`.

## Pattern: Nuxt AI Workflow

```vue
<script setup lang="ts">
import { Controls, Flow, FlowBackground, Minimap } from '@yh-ui/flow'
import type { Edge, Node } from '@yh-ui/flow'

const nodes: Node[] = [
  { id: 'start', type: 'ai-start', label: 'Start', position: { x: 80, y: 120 } },
  { id: 'llm', type: 'ai-llm', label: 'LLM', position: { x: 320, y: 120 } },
  { id: 'end', type: 'ai-end', label: 'End', position: { x: 560, y: 120 } }
]

const edges: Edge[] = [
  { id: 'e-start-llm', source: 'start', target: 'llm' },
  { id: 'e-llm-end', source: 'llm', target: 'end' }
]
</script>

<template>
  <ClientOnly>
    <Flow :nodes="nodes" :edges="edges" fit-view style="height: 640px">
      <Minimap />
      <Controls />
      <FlowBackground />
    </Flow>
  </ClientOnly>
</template>
```

## Agent Rules

- In Nuxt or SSR, wrap in `<ClientOnly>`.
- Use serializable node `data` for persistence.
- Use `isValidConnection` for business validation.
- Use `update:nodes` and `update:edges` for controlled editing.
- Use slots for custom node/edge rendering.
- Do not render Flow in a zero-height container.
