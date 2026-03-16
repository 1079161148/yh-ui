# Confirm Delete

In production-grade editors, accidentally pressing `Delete` or `Backspace` and losing a complex cluster of nodes can be catastrophic. By default, `Flow` includes built-in keyboard listeners for immediate deletion. To implement a confirmation dialog (or any interception logic), you can disable the default shortcuts and take control of the deletion flow yourself.

## Intersection & Confirmation Demo

Select one or more nodes below and press the `Delete` key on your keyboard. Observe how the system intercepts the action and prompts for confirmation before proceeding with the removal.

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'
import { YhMessageBox } from '@yh-ui/components/message-box'

const tsCode = `<template>
  <div class="cd-container" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="cd-toolbar">
      <button class="cd-btn danger" :disabled="!hasSelection" @click="requestDelete">
        Remove Selection ({{ selectedNodeIds.size + selectedEdgeIds.size }})
      </button>
      <div v-if="!hasSelection" class="cd-tip">Click on a node or edge to select it first</div>
    </div>
    
    <div class="cd-flowbox">
      <!-- CRITICAL: Disable internal shortcuts to take over the control flow -->
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        :keyboard-shortcuts="false"
        background="dots"
        @selection-change="onSelectionChange"
      />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { Node, Edge, ViewportTransform, FlowInstance } from '@yh-ui/flow'
import { YhMessageBox } from '@yh-ui/yh-ui'

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 2' } },
  { id: '3', type: 'output', position: { x: 50, y: 250 }, data: { label: 'Node 3' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' }
])

const selectedNodeIds = ref<Set<string>>(new Set())
const selectedEdgeIds = ref<Set<string>>(new Set())

const hasSelection = computed(() => selectedNodeIds.value.size > 0 || selectedEdgeIds.value.size > 0)
const isHovered = ref(false)

const onSelectionChange = ({ selectedNodes, selectedEdges }) => {
  selectedNodeIds.value = new Set(selectedNodes.map(n => n.id))
  selectedEdgeIds.value = new Set(selectedEdges.map(e => e.id))
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isHovered.value || !hasSelection.value) return
  
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return
    e.preventDefault() 
    requestDelete()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const requestDelete = async () => {
  if (!hasSelection.value) return
  
  const count = selectedNodeIds.value.size + selectedEdgeIds.value.size
  // Use built-in message box
  try {
    await YhMessageBox.confirm(
      \`Warning: You are about to permanently delete \${count} items. Are you sure?\`,
      'Confirm Deletion',
      { 
        iconType: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }
    )
    nodes.value = nodes.value.filter(n => !selectedNodeIds.value.has(n.id))
    edges.value = edges.value.filter(e => !selectedEdgeIds.value.has(e.id))
    selectedNodeIds.value.clear()
    selectedEdgeIds.value.clear()
  } catch (e) {
    // cancelled
  }
}
<\/script>

<style scoped>
.cd-container {
  display: flex;
  flex-direction: column;
  height: 450px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
}

.cd-toolbar {
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 12px;
  align-items: center;
}

.cd-btn {
  padding: 6px 12px;
  background: white;
  border: 1px solid #cbd5e1;
  color: #334155;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.cd-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cd-btn.danger {
  border-color: #ef4444;
  color: #ef4444;
}

.cd-btn.danger:not(:disabled):hover {
  background: #ef4444;
  color: white;
}

.cd-tip {
  font-size: 12px;
  color: #94a3b8;
}

.cd-flowbox {
  flex: 1;
  height: 100%;
}
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 2' } },
  { id: '3', type: 'output', position: { x: 50, y: 250 }, data: { label: 'Node 3' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' }
])

const selectedNodeIds = ref<Set<string>>(new Set())
const selectedEdgeIds = ref<Set<string>>(new Set())
const hasSelection = computed(() => selectedNodeIds.value.size > 0 || selectedEdgeIds.value.size > 0)
const isHovered = ref(false)

const onSelectionChange = ({ selectedNodes, selectedEdges }: { selectedNodes: Node[], selectedEdges: Edge[] }) => {
  selectedNodeIds.value = new Set(selectedNodes.map(n => n.id))
  selectedEdgeIds.value = new Set(selectedEdges.map(e => e.id))
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isHovered.value || !hasSelection.value) return
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return
    e.preventDefault() 
    requestDelete()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown))

const requestDelete = async () => {
  if (!hasSelection.value) return
  const count = selectedNodeIds.value.size + selectedEdgeIds.value.size
  try {
    await YhMessageBox.confirm('Warning: You are about to permanently delete ' + count + ' items. Confirm?', 'Confirm Deletion', { 
      iconType: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    })
    nodes.value = nodes.value.filter(n => !selectedNodeIds.value.has(n.id))
    edges.value = edges.value.filter(e => !selectedEdgeIds.value.has(e.id))
    selectedNodeIds.value.clear()
    selectedEdgeIds.value.clear()
  } catch (e) {
    // cancelled
  }
}
</script>

<DemoBlock title="Safe Deletion Workflow" :ts-code="tsCode" :js-code="jsCode">
  <div @mouseenter="isHovered = true" @mouseleave="isHovered = false" style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; outline: none;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; align-items: center; z-index: 2;">
      <button :disabled="!hasSelection" @click="requestDelete" :style="{ padding: '6px 12px', border: '1px solid #ef4444', color: hasSelection ? 'white' : '#ef4444', background: hasSelection ? '#ef4444' : 'transparent', borderRadius: '4px', fontSize: '13px', cursor: hasSelection ? 'pointer' : 'not-allowed', opacity: hasSelection ? 1 : 0.5 }">
        Delete Selected ({{ selectedNodeIds.size + selectedEdgeIds.size }})
      </button>
      <div v-if="!hasSelection" style="font-size: 12px; color: #94a3b8;">Select elements on the canvas to enable deletion</div>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        :keyboard-shortcuts="false"
        background="dots"
        @selection-change="onSelectionChange"
      />
    </div>
  </div>
</DemoBlock>

## Implementation Strategy

1.  **Disable Internal Handling**: Pass `:keyboard-shortcuts="false"` to the `<yh-flow>` component. This prevents the engine from automatically handling `Delete`, `Backspace`, `Ctrl+C`, etc.
2.  **Top-Level Interception**: Wrap the flow component in a container with `@keydown` listeners to capture the specific keys you want to intercept. Ensure the container is focusable (e.g., using `tabindex="0"`).
3.  **Filtered Mutation**: After verifying the user's intent (e.g., via a Modal), simply filter your `nodes` and `edges` arrays to remove the selected IDs. Reactivity takes care of the rest.
