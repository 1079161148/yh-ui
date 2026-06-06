# History & Undo/Redo (HistoryPlugin)

`createHistoryPlugin` provides a complete **operation history** management system based on a **pure snapshot stack**. It supports **Ctrl+Z / Ctrl+Y** shortcuts and advanced **time travel** to jump directly to any historical step.

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

// ===========================
// Demo 1: Basic Undo/Redo
// ===========================
const tsBasic = `<template>
  <div style="display: flex; flex-direction: column; height: 460px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <!-- Toolbar -->
    <div style="padding: 9px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <button
        :disabled="!canUndo"
        :style="{ padding: '4px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canUndo ? 'pointer' : 'not-allowed', opacity: canUndo ? 1 : 0.4, fontSize: '12px' }"
        @click="undo"
      >↩ Undo (Ctrl+Z)</button>
      <button
        :disabled="!canRedo"
        :style="{ padding: '4px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canRedo ? 'pointer' : 'not-allowed', opacity: canRedo ? 1 : 0.4, fontSize: '12px' }"
        @click="redo"
      >↪ Redo (Ctrl+Y)</button>
      <button
        @click="saveSnap('Manual save')"
        style="padding: 4px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;"
      >📷 Save Snapshot</button>
      <span style="font-size: 11px; color: #94a3b8;">Steps: {{ historyLen }}</span>
    </div>

    <!-- Flow canvas -->
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="nodes" v-model:edges="edges" background="dots" />
    </div>
    <div style="padding: 6px 14px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">
      💡 Drag a node, click "Save Snapshot", then Undo/Redo
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createHistoryPlugin } from '@yh-ui/flow'
import type { Node, Edge } from '@yh-ui/flow'

const flowRef = ref()
const canUndo = ref(false)
const canRedo = ref(false)
const historyLen = ref(0)

const nodes = ref<Node[]>([
  { id: '1', type: 'input',   position: { x: 100, y: 120 }, data: { label: '📦 Drag me!' }, width: 130, height: 48 },
  { id: '2', type: 'default', position: { x: 320, y: 120 }, data: { label: '⚙️ And me!' }, width: 130, height: 48 }
])
const edges = ref<Edge[]>([{ id: 'e1-2', source: '1', target: '2' }])

onMounted(() => {
  // Create and install the history plugin
  const plugin = createHistoryPlugin({
    maxHistory: 50,
    enableKeyboard: true,  // Automatically bind Ctrl+Z / Ctrl+Y
    onHistoryChange: (u, r, len) => {
      canUndo.value = u
      canRedo.value = r
      historyLen.value = len
    }
  })
  flowRef.value?.usePlugin(plugin)
  // After install, saveSnapshot / undo / redo are available on flowRef.value
})

// Manually save snapshot after drag stop (Recommended for fine-grained control)
// Listen via @nodeDragEnd prop or flowRef.value.on('node:dragend', ...)
const onNodeDragEnd = () => {
  flowRef.value?.saveSnapshot?.('Drag node')
}

const undo = () => flowRef.value?.undo?.()
const redo = () => flowRef.value?.redo?.()
const saveSnap = (desc?: string) => flowRef.value?.saveSnapshot?.(desc)
<\/script>`

const jsBasic = toJs(tsBasic)

// ===========================
// Live Demo data
// ===========================
import { createHistoryPlugin } from '@yh-ui/flow'

const flowRef = ref()
const canUndo = ref(false)
const canRedo = ref(false)
const historyLen = ref(0)

const demoNodes = ref<Node[]>([
  { id: '1', type: 'input',   position: { x: 90, y: 110 }, data: { label: '📦 Drag me!' }, width: 125, height: 46 },
  { id: '2', type: 'default', position: { x: 300, y: 110 }, data: { label: '⚙️ And me!'  }, width: 125, height: 46 }
])
const demoEdges = ref<Edge[]>([{ id: 'e1-2', source: '1', target: '2' }])

onMounted(() => {
  const plugin = createHistoryPlugin({
    maxHistory: 50,
    enableKeyboard: true,
    onHistoryChange: (u, r, len) => {
      canUndo.value = u
      canRedo.value = r
      historyLen.value = len
    }
  })
  flowRef.value?.usePlugin(plugin)
})

const undoAction  = () => flowRef.value?.undo?.()
const redoAction  = () => flowRef.value?.redo?.()
const saveSnapAct = (desc?: string) => flowRef.value?.saveSnapshot?.(desc)
</script>

## Quick Start

```typescript
import { createHistoryPlugin } from '@yh-ui/flow'

onMounted(() => {
  // 1. Create and install plugin
  const plugin = createHistoryPlugin({
    maxHistory: 100, // Keep up to 100 steps
    enableKeyboard: true, // Bind Ctrl+Z / Ctrl+Y
    onHistoryChange: (canUndo, canRedo, length) => {
      // update UI states like disabled buttons
    }
  })
  flowRef.value?.usePlugin(plugin)

  // 2. Once installed, manually save snapshot on user actions
})

// 3. Call this on drag end, node connect, or delete
const handleDragEnd = () => flowRef.value?.saveSnapshot?.('Drag node')

// 4. Undo / Redo programmatically
const undo = () => flowRef.value?.undo?.()
const redo = () => flowRef.value?.redo?.()
```

> [!IMPORTANT]
> `saveSnapshot`, `undo`, `redo` methods are **dynamically mounted** to `flowRef.value` only **after `usePlugin`** is called.
> Only call these methods within or after the `onMounted` hook.

## Basic Usage Demo

<DemoBlock title="Save snaphots then Undo/Redo changes" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-direction: column; height: 380px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <button
        :disabled="!canUndo"
        :style="{ padding: '4px 13px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canUndo ? 'pointer' : 'not-allowed', opacity: canUndo ? 1 : 0.4, fontSize: '12px' }"
        @click="undoAction"
      >↩ Undo</button>
      <button
        :disabled="!canRedo"
        :style="{ padding: '4px 13px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canRedo ? 'pointer' : 'not-allowed', opacity: canRedo ? 1 : 0.4, fontSize: '12px' }"
        @click="redoAction"
      >↪ Redo</button>
      <button @click="saveSnapAct('Manual')" style="padding: 4px 13px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
        📷 Snapshot
      </button>
      <span style="font-size: 11px; color: #94a3b8;">Steps: {{ historyLen }}</span>
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="demoNodes" v-model:edges="demoEdges" background="dots" />
    </div>
    <div style="padding: 6px 12px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">💡 Drag nodes → click "Snapshot" → then "Undo"</div>
  </div>
</DemoBlock>

## API

### HistoryPluginOptions

| Prop              | Type                                 | Default | Description                             |
| ----------------- | ------------------------------------ | ------- | --------------------------------------- |
| `enabled`         | `boolean`                            | `true`  | Enable plugin                           |
| `maxHistory`      | `number`                             | `100`   | Maximum history steps                   |
| `enableKeyboard`  | `boolean`                            | `true`  | Enable Ctrl+Z/Y global window shortcuts |
| `onHistoryChange` | `(canUndo, canRedo, length) => void` | —       | Callback on history change              |

### FlowInstance Extended Methods

> Automatically mounted onto `flowRef.value` after `usePlugin` is called

| Method/Prop           | Type                             | Description                          |
| --------------------- | -------------------------------- | ------------------------------------ |
| `undo()`              | `() => void`                     | Undo to previous step                |
| `redo()`              | `() => void`                     | Redo to next step                    |
| `saveSnapshot(desc?)` | `(description?: string) => void` | Manually save current snapshot       |
| `clearHistory()`      | `() => void`                     | Clear all history                    |
| `jumpToStep(index)`   | `(index: number) => void`        | Jump to specific step (time travel)  |
| `getHistory()`        | `() => FlowHistorySnapshot[]`    | Get full history stack               |
| `canUndo`             | `Ref<boolean>`                   | Whether undo is available (reactive) |
| `canRedo`             | `Ref<boolean>`                   | Whether redo is available (reactive) |
| `historyLength`       | `Ref<number>`                    | Total step count (reactive)          |

### FlowHistorySnapshot

```typescript
interface FlowHistorySnapshot {
  nodes: Node[]
  edges: Edge[]
  timestamp: number
  description?: string
}
```

## Keyboard Shortcuts

| Shortcut                         | Action                   |
| -------------------------------- | ------------------------ |
| `Ctrl + Z` / `⌘ + Z`             | Undo                     |
| `Ctrl + Y` / `⌘ + Y`             | Redo                     |
| `Ctrl + Shift + Z` / `⌘ + ⇧ + Z` | Redo (macOS alternative) |

## Best Practices

> [!TIP]
> **Manual snapshot saving is recommended** over auto-capturing every tiny change. Calling `saveSnapshot` at key moments ensures meaningful steps for your users:
>
> ```typescript
> // ✅ Recommended: Save on drag complete
> flowRef.value?.on('node:dragend', () => flowRef.value?.saveSnapshot?.('Drag node'))
>
> // e.g. Call after connection established
> // e.g. Call before bulk delete
> ```

## Next Steps

- [Node Grouping](./node-group)
- [Data Flow Edge](./data-flow-edge)
- [Auto Layout](./layout)
