# Flow

<script setup lang="ts">
import { toJs } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<template>
  <div style="width: 100%; height: 500px;">
    <yh-flow
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Input' }, width: 150, height: 50 },
        { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Process' }, width: 150, height: 50 },
        { id: '3', type: 'output', position: { x: 700, y: 100 }, data: { label: 'Output' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
        { id: 'e2-3', source: '2', target: '3', type: 'bezier' }
      ]"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
    />
  </div>
<\/template>`

const jsBasic = toJs(tsBasic)
</script>

Flow is a high-performance flowchart / node editor component.

## Basic Usage

<DemoBlock title="Basic" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Input' }, width: 150, height: 50 },
        { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Process' }, width: 150, height: 50 },
        { id: '3', type: 'output', position: { x: 700, y: 100 }, data: { label: 'Output' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
        { id: 'e2-3', source: '2', target: '3', type: 'bezier' }
      ]"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
    />
  </div>
</DemoBlock>

> **Note:** To implement UI that depends on selection (e.g. "Remove selected (N)" button, toolbar visibility), listen to `@selection-change` and update local state from `selectedNodes` / `selectedEdges` so the button state and count stay in sync with the canvas selection.

## Next

- [Node Types](./nodes)
- [Edge Types](./edges)
- [Interaction](./interaction)
