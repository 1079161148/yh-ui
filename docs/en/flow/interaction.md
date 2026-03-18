# Interaction

Common interactions:

- Pan: drag empty area / wheel
- Zoom: Ctrl/Meta + wheel
- Multi-select: Shift + click
- Box select: Alt/Option + drag
- Delete: Delete key
- Undo/Redo: Ctrl+Z / Ctrl+Shift+Z

<script setup lang="ts">
import { toJs } from '../../.vitepress/theme/utils/demo-utils'

const tsInteraction = `<template>
  <div style="width: 100%; height: 520px;">
    <yh-flow
      :nodes="nodes"
      :edges="edges"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
      keyboard-shortcuts
    />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 140 }, data: { label: 'Start' }, width: 120, height: 50 },
  { id: '2', type: 'default', position: { x: 340, y: 80 }, data: { label: 'Drag me' }, width: 140, height: 50 },
  { id: '3', type: 'default', position: { x: 340, y: 220 }, data: { label: 'Shift select' }, width: 140, height: 50 },
  { id: '4', type: 'output', position: { x: 610, y: 150 }, data: { label: 'End' }, width: 120, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
])
<\/script>`

const jsInteraction = toJs(tsInteraction)
</script>

<DemoBlock title="Interaction" :ts-code="tsInteraction" :js-code="jsInteraction">
  <div style="width: 100%; height: 520px;">
    <yh-flow
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 140 }, data: { label: 'Start' }, width: 120, height: 50 },
        { id: '2', type: 'default', position: { x: 340, y: 80 }, data: { label: 'Drag me' }, width: 140, height: 50 },
        { id: '3', type: 'default', position: { x: 340, y: 220 }, data: { label: 'Shift select' }, width: 140, height: 50 },
        { id: '4', type: 'output', position: { x: 610, y: 150 }, data: { label: 'End' }, width: 120, height: 50 }
      ]"
      :edges="[
        { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
        { id: 'e1-3', source: '1', target: '3', type: 'bezier' },
        { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
        { id: 'e3-4', source: '3', target: '4', type: 'bezier' }
      ]"
      show-controls
      show-minimap
      background="grid"
      :grid-size="20"
      keyboard-shortcuts
    />
  </div>
</DemoBlock>

## Next

- [Alignment](./alignment)
- [Plugin System](./plugins)
