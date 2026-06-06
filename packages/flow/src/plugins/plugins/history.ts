import { ref, computed, type Ref } from 'vue'
import type { FlowInstance, FlowPlugin } from '../plugin'
import type { Node, Edge } from '../../types'

// ============================================================
// HistoryPlugin - 撤销/重做历史记录插件
// 基于纯快照栈实现，完全函数式，无副作用
// 支持：Ctrl+Z 撤销、Ctrl+Y / Ctrl+Shift+Z 重做
//       批量操作合并、最大历史长度限制
// ============================================================

export interface HistoryPluginOptions {
  enabled?: boolean
  /** 最大历史步骤数, 默认 100 */
  maxHistory?: number
  /** 是否启用键盘快捷键 (Ctrl+Z/Y), 默认 true */
  enableKeyboard?: boolean
  /** 历史变化回调 */
  onHistoryChange?: (canUndo: boolean, canRedo: boolean, historyLength: number) => void
  /** 启用自动捕获节点/边变化（注意性能影响），默认 false */
  autoCapture?: boolean
}

export interface HistorySnapshot {
  nodes: Node[]
  edges: Edge[]
  timestamp: number
  description?: string
}

export interface HistoryPluginReturn {
  /** 撤销 */
  undo: () => void
  /** 重做 */
  redo: () => void
  /** 手动保存当前状态快照 */
  saveSnapshot: (description?: string) => void
  /** 是否可撤销 */
  canUndo: Ref<boolean>
  /** 是否可重做 */
  canRedo: Ref<boolean>
  /** 历史记录数量 */
  historyLength: Ref<number>
  /** 清空历史 */
  clearHistory: () => void
  /** 获取历史列表（用于时间旅行功能） */
  getHistory: () => HistorySnapshot[]
  /** 跳转到指定历史步骤 */
  jumpToStep: (index: number) => void
}

const defaultOptions: Required<HistoryPluginOptions> = {
  enabled: true,
  maxHistory: 100,
  enableKeyboard: true,
  onHistoryChange: () => {},
  autoCapture: false
}

/**
 * 深克隆数据（避免引用共享导致历史污染）
 */
function snapshot<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export function createHistoryPlugin(options: HistoryPluginOptions = {}): FlowPlugin & {
  getHistory: () => HistorySnapshot[]
  undo: () => void
  redo: () => void
  saveSnapshot: (description?: string) => void
  canUndo: Ref<boolean>
  canRedo: Ref<boolean>
  historyLength: Ref<number>
  clearHistory: () => void
  jumpToStep: (index: number) => void
} {
  const opts = { ...defaultOptions, ...options }

  // 历史栈（纯数据快照）
  const historyStack = ref<HistorySnapshot[]>([])
  const pointer = ref<number>(-1)

  const canUndo = computed(() => pointer.value > 0)
  const canRedo = computed(() => pointer.value < historyStack.value.length - 1)
  const historyLength = computed(() => historyStack.value.length)

  let _flow: FlowInstance | null = null
  let _keydownHandler: ((e: KeyboardEvent) => void) | null = null

  const notifyChange = () => {
    opts.onHistoryChange(canUndo.value, canRedo.value, historyStack.value.length)
  }

  const saveSnapshot = (description?: string) => {
    if (!_flow) return

    // 截断当前位置之后的历史（新操作清空重做栈）
    const newStack = historyStack.value.slice(0, pointer.value + 1)
    newStack.push({
      nodes: snapshot(_flow.nodes.value),
      edges: snapshot(_flow.edges.value),
      timestamp: Date.now(),
      description
    })

    // 超出最大历史则移除最旧条目
    if (newStack.length > opts.maxHistory) {
      newStack.shift()
    }

    historyStack.value = newStack
    pointer.value = newStack.length - 1
    notifyChange()
  }

  const undo = () => {
    if (!_flow || !canUndo.value) return

    pointer.value--
    const prevState = historyStack.value[pointer.value]
    if (prevState) {
      _flow.nodes.value = snapshot(prevState.nodes)
      _flow.edges.value = snapshot(prevState.edges)
    }
    notifyChange()
  }

  const redo = () => {
    if (!_flow || !canRedo.value) return

    pointer.value++
    const nextState = historyStack.value[pointer.value]
    if (nextState) {
      _flow.nodes.value = snapshot(nextState.nodes)
      _flow.edges.value = snapshot(nextState.edges)
    }
    notifyChange()
  }

  const clearHistory = () => {
    historyStack.value = []
    pointer.value = -1
    notifyChange()
  }

  const getHistory = (): HistorySnapshot[] => historyStack.value

  const jumpToStep = (index: number) => {
    if (!_flow || index < 0 || index >= historyStack.value.length) return
    pointer.value = index
    const state = historyStack.value[index]
    if (state) {
      _flow.nodes.value = snapshot(state.nodes)
      _flow.edges.value = snapshot(state.edges)
    }
    notifyChange()
  }

  const plugin: FlowPlugin & HistoryPluginReturn = {
    id: 'history',
    name: 'History',
    version: '1.0.0',
    description: 'Provides undo/redo history for flow graph with keyboard shortcut support',

    // 将响应式状态和方法挂到插件上，方便外部访问
    canUndo,
    canRedo,
    historyLength,
    saveSnapshot,
    undo,
    redo,
    clearHistory,
    getHistory,
    jumpToStep,

    install(flow: FlowInstance) {
      if (!opts.enabled) return
      _flow = flow

      // 在 FlowInstance 上挂载方法，供模板和外部调用
      ;(
        flow as FlowInstance & {
          undo: () => void
          redo: () => void
          saveSnapshot: (description?: string) => void
          canUndo: Ref<boolean>
          canRedo: Ref<boolean>
          historyLength: Ref<number>
          clearHistory: () => void
          jumpToStep: (index: number) => void
          getHistory: () => HistorySnapshot[]
        }
      ).undo = undo
      ;(flow as FlowInstance & { redo: () => void }).redo = redo
      ;(flow as FlowInstance & { saveSnapshot: (description?: string) => void }).saveSnapshot =
        saveSnapshot
      ;(flow as FlowInstance & { canUndo: Ref<boolean> }).canUndo = canUndo
      ;(flow as FlowInstance & { canRedo: Ref<boolean> }).canRedo = canRedo
      ;(flow as FlowInstance & { historyLength: Ref<number> }).historyLength = historyLength
      ;(flow as FlowInstance & { clearHistory: () => void }).clearHistory = clearHistory
      ;(flow as FlowInstance & { getHistory: () => HistorySnapshot[] }).getHistory = getHistory
      ;(flow as FlowInstance & { jumpToStep: (index: number) => void }).jumpToStep = jumpToStep

      // 保存初始快照
      saveSnapshot('initial')

      // 注册键盘快捷键
      if (opts.enableKeyboard) {
        _keydownHandler = (e: KeyboardEvent) => {
          const isCtrl = e.ctrlKey || e.metaKey
          if (!isCtrl) return

          if (e.key === 'z' && !e.shiftKey) {
            e.preventDefault()
            undo()
          } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
            e.preventDefault()
            redo()
          }
        }
        window.addEventListener('keydown', _keydownHandler)
      }

      console.log('[History Plugin] Installed — Ctrl+Z to undo, Ctrl+Y to redo')
    },

    destroy() {
      if (_keydownHandler) {
        window.removeEventListener('keydown', _keydownHandler)
        _keydownHandler = null
      }
      _flow = null
      historyStack.value = []
      pointer.value = -1
    }
  }

  return plugin
}

/** 导出快照类型 */
export type { HistorySnapshot as FlowHistorySnapshot }
