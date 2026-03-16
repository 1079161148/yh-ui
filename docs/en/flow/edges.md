# Edge Types

<script setup lang="ts">
import { toJs } from '../../.vitepress/theme/utils/demo-utils'

const tsEdgeTypes = `<template>
  <div style="width: 100%; height: 420px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Start' }, width: 120, height: 40 },
        { id: '2', type: 'default', position: { x: 320, y: 50 }, data: { label: 'bezier' }, width: 120, height: 40 },
        { id: '3', type: 'default', position: { x: 100, y: 160 }, data: { label: 'straight' }, width: 120, height: 40 },
        { id: '4', type: 'default', position: { x: 320, y: 160 }, data: { label: 'step' }, width: 120, height: 40 },
        { id: '5', type: 'default', position: { x: 540, y: 160 }, data: { label: 'smoothstep' }, width: 120, height: 40 },
        { id: '6', type: 'output', position: { x: 320, y: 300 }, data: { label: 'End' }, width: 120, height: 40 }
      ]"
      :edges="[
        { id: 'e1', source: '1', target: '2', type: 'bezier' },
        { id: 'e2', source: '1', target: '3', type: 'straight' },
        { id: 'e3', source: '3', target: '4', type: 'step' },
        { id: 'e4', source: '4', target: '5', type: 'smoothstep' },
        { id: 'e5', source: '2', target: '6', type: 'bezier', label: 'label', labelShowBg: true },
        { id: 'e6', source: '5', target: '6', type: 'straight', animated: true, style: { stroke: '#67c23a', strokeWidth: 2 } }
      ]"
      background="dots"
    />
  </div>
<\/template>`

const jsEdgeTypes = toJs(tsEdgeTypes)
</script>

## Edge Types

- **bezier**: Bezier curve (default recommendation)
- **straight**: Straight line
- **step**: Step line
- **smoothstep**: Smooth step line

## Example: Multiple Edge Types, Labels, and Animations

<DemoBlock title="Edge Types" :ts-code="tsEdgeTypes" :js-code="jsEdgeTypes">
  <div style="width: 100%; height: 420px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 1 }"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Start' }, width: 120, height: 40 },
        { id: '2', type: 'default', position: { x: 320, y: 50 }, data: { label: 'bezier' }, width: 120, height: 40 },
        { id: '3', type: 'default', position: { x: 100, y: 160 }, data: { label: 'straight' }, width: 120, height: 40 },
        { id: '4', type: 'default', position: { x: 320, y: 160 }, data: { label: 'step' }, width: 120, height: 40 },
        { id: '5', type: 'default', position: { x: 540, y: 160 }, data: { label: 'smoothstep' }, width: 120, height: 40 },
        { id: '6', type: 'output', position: { x: 320, y: 300 }, data: { label: 'End' }, width: 120, height: 40 }
      ]"
      :edges="[
        { id: 'e1', source: '1', target: '2', type: 'bezier' },
        { id: 'e2', source: '1', target: '3', type: 'straight' },
        { id: 'e3', source: '3', target: '4', type: 'step' },
        { id: 'e4', source: '4', target: '5', type: 'smoothstep' },
        { id: 'e5', source: '2', target: '6', type: 'bezier', label: 'label', labelShowBg: true },
        { id: 'e6', source: '5', target: '6', type: 'straight', animated: true, style: { stroke: '#67c23a', strokeWidth: 2 } }
      ]"
      background="dots"
    />
  </div>
</DemoBlock>

## Next

- [Interaction](./interaction)
- [Alignment](./alignment)
- [Plugin System](./plugins)
