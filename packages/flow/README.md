# @yh-ui/flow

YH-UI 的流程图和节点编辑包，适合搭建工作流编排、审批流、AI Agent 流程、BPMN 草图、数据处理链路和可视化配置平台。

[Documentation](https://1079161148.github.io/yh-ui/flow/) | [GitHub](https://github.com/1079161148/yh-ui)

## Highlights

- 可视化流程画布：节点、连线、缩放、拖拽、选择、视口适配和画布交互由核心组件统一管理。
- 内置节点类型：基础节点、输入节点、输出节点、分组节点、菱形节点、数据库节点，以及 BPMN 和 AI Workflow 节点库。
- 多种连线：基础线、平滑线、阶梯线、贝塞尔线和数据流连线，适合表达不同业务语义。
- 编辑器辅助组件：节点编辑面板、连线编辑面板、AI 节点编辑面板、MiniMap、Controls、Background 可按需组合。
- 可扩展架构：导出 types、core、utils、plugins，方便封装自己的节点库、连线策略和编辑侧栏。
- Vue 和 TypeScript 原生体验：节点可使用 Vue 组件表达，流程数据有类型约束。

## Install

```bash
pnpm add @yh-ui/flow
```

## Basic Usage

```vue
<script setup lang="ts">
import { Flow, Controls, FlowBackground, Minimap } from '@yh-ui/flow'
import type { FlowEdge, FlowNode } from '@yh-ui/flow'

const nodes: FlowNode[] = [
  { id: 'start', type: 'input', label: 'Start', position: { x: 80, y: 80 } },
  { id: 'task', label: 'Process order', position: { x: 280, y: 80 } },
  { id: 'done', type: 'output', label: 'Done', position: { x: 500, y: 80 } }
]

const edges: FlowEdge[] = [
  { id: 'e-start-task', source: 'start', target: 'task' },
  { id: 'e-task-done', source: 'task', target: 'done' }
]
</script>

<template>
  <Flow :nodes="nodes" :edges="edges" fit-view style="height: 560px">
    <Minimap />
    <Controls />
    <FlowBackground />
  </Flow>
</template>
```

## Built-In Exports

| Area    | Exports                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------- |
| Canvas  | `Flow`, `Minimap`, `Controls`, `FlowBackground`                                                 |
| Nodes   | `BaseNode`, `InputNode`, `OutputNode`, `GroupNode`, `CustomNode`, `DiamondNode`, `DatabaseNode` |
| Edges   | `BaseEdge`, `SmoothEdge`, `StepEdge`, `BezierEdge`, `DataFlowEdge`                              |
| Editing | `NodeEditPanel`, `EdgeEditPanel`, `AiNodeEditPanel`, `NodeToolbar`, `NodeResizer`               |
| Presets | BPMN nodes, AI workflow nodes, registration helpers                                             |

## Tips

- Give the canvas an explicit height; otherwise the editor cannot calculate the viewport.
- In Nuxt or SSR pages, render browser-only editing surfaces inside `<ClientOnly>` when they depend on pointer or canvas APIs.
- Keep node data serializable if you plan to persist workflows or send them to a backend.

## License

MIT
