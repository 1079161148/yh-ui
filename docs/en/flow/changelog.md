# Flow Changelog

This document records all important updates for YH-UI Flow component library.

---

## v1.0.0 (2024-03-17)

### New Features

#### 1. Node System

- **BPMN Node Library**: Complete BPMN process node support
  - `BpmnStartEvent` / `BpmnEndEvent` - Start/End events
  - `BpmnTask` / `BpmnServiceTask` / `BpmnUserTask` - Task nodes
  - `BpmnExclusiveGateway` - Exclusive gateway
  - `BpmnParallelGateway` - Parallel gateway
  - `BpmnInclusiveGateway` - Inclusive gateway

- **AI Workflow Node Library**: First Vue flow diagram component with native AI Agent workflow support
  - `AiLlmNode` - LLM call node
  - `AiPromptNode` - Prompt engineering node
  - `AiAgentNode` - Agent node
  - `AiToolNode` - Tool call node
  - `AiConditionNode` - Conditional branch node
  - `AiStartNode` / `AiEndNode` - Start/End nodes
  - `AiMemoryNode` - Memory storage node

- **Node Template System**: Quickly create business-specific nodes
  - `registerCustomNodeTemplate()` - Register custom node template
  - `createNodeFromTemplate()` - Create node from template
  - Support default data and size configuration

#### 2. Interaction Enhancements

- **Node Resizer**: Freely resize nodes
- **Node Toolbar**: Node operation quick menu
- **Smart Alignment Lines**: Auto-alignment hints
- **Delete Confirmation**: Confirm before deletion
- **Drag & Drop**: Drag nodes from sidebar

#### 3. View & Navigation

- **Interactive Minimap**: Thumbnail navigation
- **Viewport Smooth Transition**: Animated view switching
- **Teleport**: Cross-level node connections

#### 4. Export & Persistence

- **Screenshot Export**: Support PNG/SVG format
- **Data Persistence**: JSON format save/restore
- **Export Plugin**: Complete flow export functionality

#### 5. Layout Algorithms

- **Auto Layout (Dagre)**: Tree/Hierarchical layout
- **Layout Animation**: Transition effects during layout changes

#### 6. Editor Experience

- **Node Edit Panel**: Double-click to edit node properties
- **Edge Edit Panel**: Edit edge style and labels
- **AI Node Edit Panel**: Dedicated AI node configuration

### Architecture Updates

- **Pinia State Management**: State persistence and cross-component sharing
- **Multi-instance Collaboration**: Support multiple Flow instances
- **SSR Support**: Server-side rendering compatibility
- **Performance Optimization**:
  - Graph algorithm optimization (shortest path, cycle detection, topological sort)
  - Virtual rendering support
  - Performance stress testing validation

### Plugin System

- `Minimap` - Minimap
- `Controls` - Zoom controls
- `Grid` - Grid background
- `Snap` - Auto alignment
- `Keyboard` - Keyboard shortcuts
- `Export` - Export functionality
- `Layout` - Auto layout

---

## v0.x Versions

### Basic Features

- Core flow diagram rendering
- Basic nodes: Input / Output / Custom
- Basic edges: Bezier / Step / Smooth
- Viewport management: Pan/Zoom
- Box selection
- Undo/Redo history
- Custom node/edge rendering

---

## Migration Guide

### Upgrade from v0.x

1. Update dependency version
2. Check node/edge type compatibility
3. If using custom renderers, may need to adapt to new APIs

### BPMN Node Usage

```vue
<script setup lang="ts">
import { registerBpmnNodes } from '@yh-ui/flow'

// Register BPMN nodes
registerBpmnNodes()
</script>

<template>
  <yh-flow :nodes="bpmnNodes" :edges="bpmnEdges" />
</template>
```

### AI Workflow Node Usage

```vue
<script setup lang="ts">
import { registerAiWorkflowNodes } from '@yh-ui/flow'

// Register AI workflow nodes
registerAiWorkflowNodes()
</script>

<template>
  <yh-flow :nodes="aiNodes" :edges="aiEdges" />
</template>
```

---

## Roadmap

- [ ] BPMN 2.0 Process Execution Engine
- [ ] Real-time Collaboration (CRDT/WebSocket)
- [ ] React Version Adaptation
- [ ] Mobile Touch Optimization
- [ ] Enhanced Theme System

---

## Community Support

- GitHub: [https://github.com/1079161148/yh-ui](https://github.com/1079161148/yh-ui)
- Issues: [https://github.com/1079161148/yh-ui/issues](https://github.com/1079161148/yh-ui/issues)
