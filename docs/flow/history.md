# 历史记录与撤销重做 (HistoryPlugin)

`createHistoryPlugin` 基于**纯快照栈**实现完整的操作历史管理，支持 **Ctrl+Z 撤销** / **Ctrl+Y 重做** 键盘快捷键，以及跳转到任意历史步骤的**时间旅行**功能。

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

// ===========================
// Demo 1: 基础撤销/重做
// ===========================
const tsBasic = `<template>
  <div style="display: flex; flex-direction: column; height: 460px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <!-- 工具栏 -->
    <div style="padding: 9px 14px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <button
        :disabled="!canUndo"
        :style="{ padding: '4px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canUndo ? 'pointer' : 'not-allowed', opacity: canUndo ? 1 : 0.4, fontSize: '12px' }"
        @click="undo"
      >↩ 撤销 (Ctrl+Z)</button>
      <button
        :disabled="!canRedo"
        :style="{ padding: '4px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canRedo ? 'pointer' : 'not-allowed', opacity: canRedo ? 1 : 0.4, fontSize: '12px' }"
        @click="redo"
      >↪ 重做 (Ctrl+Y)</button>
      <button
        @click="saveSnap('手动保存')"
        style="padding: 4px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;"
      >📷 保存快照</button>
      <span style="font-size: 11px; color: #94a3b8;">历史步骤: {{ historyLen }}</span>
    </div>

    <!-- 画布 -->
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="nodes" v-model:edges="edges" background="dots" />
    </div>
    <div style="padding: 6px 14px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">
      💡 拖动节点后点击"保存快照"，再撤销/重做
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
  { id: '1', type: 'input',   position: { x: 100, y: 120 }, data: { label: '📦 拖动我！' }, width: 130, height: 48 },
  { id: '2', type: 'default', position: { x: 320, y: 120 }, data: { label: '⚙️ 再拖我！' }, width: 130, height: 48 }
])
const edges = ref<Edge[]>([{ id: 'e1-2', source: '1', target: '2' }])

onMounted(() => {
  // 安装历史记录插件
  const plugin = createHistoryPlugin({
    maxHistory: 50,
    enableKeyboard: true,  // 启用 Ctrl+Z/Y 快捷键
    onHistoryChange: (u, r, len) => {
      canUndo.value = u
      canRedo.value = r
      historyLen.value = len
    }
  })
  flowRef.value?.usePlugin(plugin)
  // 插件安装后，saveSnapshot / undo / redo 已挂载到 flowRef.value 上
})

// 拖拽结束后手动保存快照（推荐：在业务关键时机精确控制历史粒度）
// 注意：监听内置事件使用 @nodeDragEnd prop，或通过 flowRef.value.on('node:dragend', ...)
const onNodeDragEnd = () => {
  flowRef.value?.saveSnapshot?.('拖动节点')
}

const undo = () => flowRef.value?.undo?.()
const redo = () => flowRef.value?.redo?.()
const saveSnap = (desc?: string) => flowRef.value?.saveSnapshot?.(desc)
<\/script>`

const jsBasic = toJs(tsBasic)

// ===========================
// 实时 Demo 数据
// ===========================
import { createHistoryPlugin } from '@yh-ui/flow'

const flowRef = ref()
const canUndo = ref(false)
const canRedo = ref(false)
const historyLen = ref(0)

const demoNodes = ref<Node[]>([
  { id: '1', type: 'input',   position: { x: 90, y: 110 }, data: { label: '📦 拖动我！' }, width: 125, height: 46 },
  { id: '2', type: 'default', position: { x: 300, y: 110 }, data: { label: '⚙️ 再拖我！' }, width: 125, height: 46 }
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

## 快速上手

```typescript
import { createHistoryPlugin } from '@yh-ui/flow'

onMounted(() => {
  // 1. 创建并安装插件
  const plugin = createHistoryPlugin({
    maxHistory: 100, // 最多保存 100 步历史
    enableKeyboard: true, // 启用 Ctrl+Z / Ctrl+Y 快捷键
    onHistoryChange: (canUndo, canRedo, length) => {
      // 根据状态更新 UI（按钮禁/启用）
    }
  })
  flowRef.value?.usePlugin(plugin)

  // 2. 插件安装后，在关键操作时机手动保存快照
  //    （推荐：精确控制历史粒度，性能最优）
})

// 3. 在合适的时机调用（拖拽结束 / 连线创建 / 删除等）
const handleDragEnd = () => flowRef.value?.saveSnapshot?.('拖动节点')

// 4. 撤销/重做（也可以直接按 Ctrl+Z / Ctrl+Y）
const undo = () => flowRef.value?.undo?.()
const redo = () => flowRef.value?.redo?.()
```

> [!IMPORTANT]
> `saveSnapshot`、`undo`、`redo` 等方法是在 **`usePlugin` 安装插件后** 动态挂载到 `flowRef.value` 上的。
> 因此必须在 `onMounted` 后才能调用这些方法（组件 ref 及插件均已就绪）。

## 基础用法演示

<DemoBlock title="撤销/重做 — 保存快照后可撤销/重做节点位置" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-direction: column; height: 400px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 9px 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 9px; align-items: center; flex-wrap: wrap;">
      <button
        :disabled="!canUndo"
        :style="{ padding: '4px 13px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canUndo ? 'pointer' : 'not-allowed', opacity: canUndo ? 1 : 0.4, fontSize: '12px' }"
        @click="undoAction"
      >↩ 撤销</button>
      <button
        :disabled="!canRedo"
        :style="{ padding: '4px 13px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: canRedo ? 'pointer' : 'not-allowed', opacity: canRedo ? 1 : 0.4, fontSize: '12px' }"
        @click="redoAction"
      >↪ 重做</button>
      <button @click="saveSnapAct('手动保存')" style="padding: 4px 13px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">
        📷 保存快照
      </button>
      <span style="font-size: 11px; color: #94a3b8;">步骤: {{ historyLen }}</span>
    </div>
    <div style="flex: 1;">
      <yh-flow ref="flowRef" v-model:nodes="demoNodes" v-model:edges="demoEdges" background="dots" />
    </div>
    <div style="padding: 6px 12px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-top: 1px solid #eee;">💡 拖动节点 → 点击"保存快照" → 再点击撤销</div>
  </div>
</DemoBlock>

## API

### HistoryPluginOptions

| 属性              | 类型                                 | 默认值 | 说明                                           |
| ----------------- | ------------------------------------ | ------ | ---------------------------------------------- |
| `enabled`         | `boolean`                            | `true` | 是否启用插件                                   |
| `maxHistory`      | `number`                             | `100`  | 最大历史记录步数（超出则自动丢弃最旧步骤）     |
| `enableKeyboard`  | `boolean`                            | `true` | 是否注册 Ctrl+Z/Y 键盘快捷键（全局 window 级） |
| `onHistoryChange` | `(canUndo, canRedo, length) => void` | —      | 历史变化时的回调，用于更新按钮状态             |

### 插件安装后的 FlowInstance 扩展方法

> 通过 `flowRef.value?.usePlugin(plugin)` 安装后，以下方法/属性自动挂载到 `flowRef.value`

| 方法/属性             | 类型                             | 说明                            |
| --------------------- | -------------------------------- | ------------------------------- |
| `undo()`              | `() => void`                     | 撤销到上一快照                  |
| `redo()`              | `() => void`                     | 重做到下一快照                  |
| `saveSnapshot(desc?)` | `(description?: string) => void` | 手动保存当前 nodes + edges 快照 |
| `clearHistory()`      | `() => void`                     | 清空所有历史记录                |
| `jumpToStep(index)`   | `(index: number) => void`        | 跳转到指定历史步骤（时间旅行）  |
| `getHistory()`        | `() => FlowHistorySnapshot[]`    | 获取完整历史列表                |
| `canUndo`             | `Ref<boolean>`                   | 是否可撤销（响应式）            |
| `canRedo`             | `Ref<boolean>`                   | 是否可重做（响应式）            |
| `historyLength`       | `Ref<number>`                    | 当前历史条数（响应式）          |

### FlowHistorySnapshot 类型

```typescript
interface FlowHistorySnapshot {
  nodes: Node[]
  edges: Edge[]
  timestamp: number
  description?: string
}
```

## 键盘快捷键

| 快捷键                           | 说明               |
| -------------------------------- | ------------------ |
| `Ctrl + Z` / `⌘ + Z`             | 撤销               |
| `Ctrl + Y` / `⌘ + Y`             | 重做               |
| `Ctrl + Shift + Z` / `⌘ + ⇧ + Z` | 重做（macOS 兼容） |

## 最佳实践

> [!TIP]
> **不推荐**开启 `autoCapture`（自动捕获所有变化），建议在业务操作的**关键时机**手动调用 `saveSnapshot`：
>
> ```typescript
> // ✅ 推荐：在关键时机手动保存，精确控制历史粒度
> flowRef.value?.on('node:dragend', () => flowRef.value?.saveSnapshot?.('拖动节点'))
>
> // 连线创建后保存
> // 删除操作前保存
> // 用户手动点击"保存"按钮时保存
> ```

## 下一步

- [节点成组](./node-group)
- [数据流光效边](./data-flow-edge)
- [自动布局](./layout)
