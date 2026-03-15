# Node Types

<script setup lang="ts">
import { toJs } from '../../.vitepress/theme/utils/demo-utils'

const tsNodes = `<template>
  <div style="width: 100%; height: 320px;">
    <yh-flow
      :model-value="{ x: 40, y: 40, zoom: 1 }"
      :nodes="[
        { id: 'input', type: 'input', position: { x: 50, y: 60 }, data: { label: 'Input' }, width: 150, height: 50 },
        { id: 'default', type: 'default', position: { x: 250, y: 60 }, data: { label: 'Default' }, width: 150, height: 50 },
        { id: 'output', type: 'output', position: { x: 450, y: 60 }, data: { label: 'Output' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1', source: 'input', target: 'default', type: 'bezier' },
        { id: 'e2', source: 'default', target: 'output', type: 'bezier' }
      ]"
    />
  </div>
<\/template>`

const jsNodes = toJs(tsNodes)
</script>

## Built-in nodes

- `input`
- `default`
- `output`
- `group`
- `custom`

<DemoBlock title="Built-in Nodes" :ts-code="tsNodes" :js-code="jsNodes">
  <div style="width: 100%; height: 320px;">
    <yh-flow
      :model-value="{ x: 40, y: 40, zoom: 1 }"
      :nodes="[
        { id: 'input', type: 'input', position: { x: 50, y: 60 }, data: { label: 'Input' }, width: 150, height: 50 },
        { id: 'default', type: 'default', position: { x: 250, y: 60 }, data: { label: 'Default' }, width: 150, height: 50 },
        { id: 'output', type: 'output', position: { x: 450, y: 60 }, data: { label: 'Output' }, width: 150, height: 50 }
      ]"
      :edges="[
        { id: 'e1', source: 'input', target: 'default', type: 'bezier' },
        { id: 'e2', source: 'default', target: 'output', type: 'bezier' }
      ]"
    />
  </div>
</DemoBlock>

## Next

- [Edge Types](./edges)
- [Interaction](./interaction)
