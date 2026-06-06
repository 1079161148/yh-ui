# Flow Editor

Use `@yh-ui/flow` for flow charts, node editors, BPMN sketches, and AI workflow diagrams.

## Basic Canvas

```vue
<script setup lang="ts">
import { Controls, Flow, FlowBackground, Minimap } from '@yh-ui/flow'
import type { FlowEdge, FlowNode } from '@yh-ui/flow'

const nodes: FlowNode[] = [
  { id: 'start', type: 'input', label: 'Start', position: { x: 80, y: 80 } },
  { id: 'task', label: 'Process', position: { x: 280, y: 80 } }
]

const edges: FlowEdge[] = [{ id: 'e-start-task', source: 'start', target: 'task' }]
</script>

<template>
  <Flow :nodes="nodes" :edges="edges" fit-view style="height: 560px">
    <Minimap />
    <Controls />
    <FlowBackground />
  </Flow>
</template>
```

## Nuxt SSR

```vue
<template>
  <ClientOnly>
    <Flow :nodes="nodes" :edges="edges" style="height: 560px" />
  </ClientOnly>
</template>
```

## Useful Exports

| Area    | Exports                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------- |
| Canvas  | `Flow`, `Minimap`, `Controls`, `FlowBackground`                                                 |
| Nodes   | `BaseNode`, `InputNode`, `OutputNode`, `GroupNode`, `CustomNode`, `DiamondNode`, `DatabaseNode` |
| Edges   | `BaseEdge`, `SmoothEdge`, `StepEdge`, `BezierEdge`, `DataFlowEdge`                              |
| Editing | `NodeEditPanel`, `EdgeEditPanel`, `AiNodeEditPanel`, `NodeToolbar`, `NodeResizer`               |
| Presets | BPMN nodes, AI workflow nodes, registration helpers                                             |

## Agent Rules

- Always give the canvas an explicit height.
- Use Vue components for custom node rendering.
- Keep workflow node data serializable when persistence is required.
- Use BPMN exports for BPMN-style diagrams and AI workflow exports for agent-like flows.
