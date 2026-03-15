# 确认删除 (Confirm Delete)

在生产级编辑器或需要严谨性的业务场景中，仅仅因为误触了一个 `Delete` 或 `Backspace` 失去配置完备的整片节点集群往往是灾难性的。

默认情况下，`yh-flow` 的引擎搭载了快捷的键盘按键监听功能。要实现带有前置 UI 确认弹窗的删除拦截操作，我们可以干净利落地关停内置操作并接管控制流。

## 拦截删除示例

请选中下方的一个或者多个节点，按下删除按钮或键盘上的 `Backspace/Delete`（鼠标要在区域焦点内）。观察系统是如何弹出原生的窗口来安全提示的。

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'
import { YhMessageBox } from '@yh-ui/components/message-box'

const tsCode = `<template>
  <div class="cd-container" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="cd-toolbar">
      <button class="cd-btn danger" :disabled="!hasSelection" @click="requestDelete">
        删除所选 ({{ selectedNodeIds.size + selectedEdgeIds.size }})
      <\/button>
      <div v-if="!hasSelection" class="cd-tip">请先点击节点或连线进行选择<\/div>
    <\/div>
    
    <div class="cd-flowbox">
      <!-- 关键点：禁用内部快捷键以接管控制流 -->
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        :keyboard-shortcuts="false"
        background="dots"
        @selection-change="onSelectionChange"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { Node, Edge, ViewportTransform, FlowInstance } from '@yh-ui/flow'
import { YhMessageBox } from '@yh-ui/yh-ui'

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: '节点 2' } },
  { id: '3', type: 'output', position: { x: 50, y: 250 }, data: { label: '节点 3' } }
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
  // 只在鼠标悬浮于工作区且有选中项时拦截删除操作
  if (!isHovered.value || !hasSelection.value) return
  
  if (e.key === 'Delete' || e.key === 'Backspace') {
    // 避免删除输入框中的文本
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
  // 使用当前 UI 库的安全二次弹窗
  try {
    await YhMessageBox.confirm(
      \`警告：您即将永久删除 \${count} 个项目。确定吗？\`,
      '安全提示',
      { iconType: 'warning' }
    )
    nodes.value = nodes.value.filter(n => !selectedNodeIds.value.has(n.id))
    edges.value = edges.value.filter(e => !selectedEdgeIds.value.has(e.id))
    selectedNodeIds.value.clear()
    selectedEdgeIds.value.clear()
  } catch (e) {
    // 用户点击了取消
  }
}
<\/script>

<style scoped>
.cd-container {
  display: flex; flex-direction: column; height: 450px; width: 100%;
  border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; outline: none;
}
.cd-toolbar { padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; align-items: center; }
.cd-btn { padding: 6px 12px; background: white; border: 1px solid #cbd5e1; color: #334155; border-radius: 4px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.cd-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.cd-btn.danger { border-color: #ef4444; color: #ef4444; }
.cd-btn.danger:not(:disabled):hover { background: #ef4444; color: white; }
.cd-tip { font-size: 12px; color: #94a3b8; }
.cd-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: '节点 2' } },
  { id: '3', type: 'output', position: { x: 50, y: 250 }, data: { label: '节点 3' } }
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
    await YhMessageBox.confirm('警告：您即将永久删除 ' + count + ' 个项目。确定吗？', '安全提示', { iconType: 'warning' })
    nodes.value = nodes.value.filter(n => !selectedNodeIds.value.has(n.id))
    edges.value = edges.value.filter(e => !selectedEdgeIds.value.has(e.id))
    selectedNodeIds.value.clear()
    selectedEdgeIds.value.clear()
  } catch (e) {
    // 忽略取消
  }
}
</script>

<DemoBlock title="安全删除工作流" :ts-code="tsCode" :js-code="jsCode">
  <div @mouseenter="isHovered = true" @mouseleave="isHovered = false" style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; outline: none;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; align-items: center; z-index: 2;">
      <button :disabled="!hasSelection" @click="requestDelete" :style="{ padding: '6px 12px', border: '1px solid #ef4444', color: hasSelection ? 'white' : '#ef4444', background: hasSelection ? '#ef4444' : 'transparent', borderRadius: '4px', fontSize: '13px', cursor: hasSelection ? 'pointer' : 'not-allowed', opacity: hasSelection ? 1 : 0.5 }">
        删除所选 ({{ selectedNodeIds.size + selectedEdgeIds.size }})
      </button>
      <div v-if="!hasSelection" style="font-size: 12px; color: #94a3b8;">请先在画布上选择元素以启用删除功能</div>
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

## 实现策略

1.  **禁用内部处理**：向 `<yh-flow>` 组件传递 `:keyboard-shortcuts="false"`。这可以防止引擎自动处理 `Delete`、`Backspace`、`Ctrl+C` 等。
2.  **顶层拦截**：将流程组件包装在一个容器中，并添加 `@keydown` 监听器，以捕获您想要拦截的特定按键。确保容器是可聚焦的（例如，使用 `tabindex="0"`）。
3.  **过滤变动**：在验证用户意图后（例如，通过 Modal 弹窗），只需过滤您的 `nodes` 和 `edges` 数组以移除选中的 ID。响应式机制会自动处理余下的工作。
