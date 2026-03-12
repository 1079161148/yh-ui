import { ref, computed, type Ref, shallowRef } from 'vue'
import type { Node, Edge, HistoryState } from '../types'

export interface UseHistoryOptions {
  maxHistory?: number
  onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void
}

export interface UseHistoryReturn {
  canUndo: Ref<boolean>
  canRedo: Ref<boolean>
  undo: () => void
  redo: () => void
  push: (state: HistoryState) => void
  clear: () => void
}

export function useHistory(
  nodes: Ref<Node[]>,
  edges: Ref<Edge[]>,
  options: UseHistoryOptions = {}
): UseHistoryReturn {
  const { maxHistory = 50, onHistoryChange } = options

  const history = shallowRef<HistoryState[]>([])
  const historyPointer = ref(-1)

  const canUndo = computed(() => historyPointer.value > 0)
  const canRedo = computed(() => historyPointer.value < history.value.length - 1)

  const push = (state: HistoryState) => {
    // 移除当前位置之后的所有历史
    const newHistory = history.value.slice(0, historyPointer.value + 1)

    // 添加新状态
    newHistory.push({
      nodes: JSON.parse(JSON.stringify(state.nodes)),
      edges: JSON.parse(JSON.stringify(state.edges))
    })

    // 限制历史长度
    if (newHistory.length > maxHistory) {
      newHistory.shift()
    }

    history.value = newHistory
    historyPointer.value = newHistory.length - 1

    onHistoryChange?.(canUndo.value, canRedo.value)
  }

  const undo = () => {
    if (!canUndo.value) return

    historyPointer.value--
    const prevState = history.value[historyPointer.value]

    if (prevState) {
      nodes.value = JSON.parse(JSON.stringify(prevState.nodes))
      edges.value = JSON.parse(JSON.stringify(prevState.edges))
    }

    onHistoryChange?.(canUndo.value, canRedo.value)
  }

  const redo = () => {
    if (!canRedo.value) return

    historyPointer.value++
    const nextState = history.value[historyPointer.value]

    if (nextState) {
      nodes.value = JSON.parse(JSON.stringify(nextState.nodes))
      edges.value = JSON.parse(JSON.stringify(nextState.edges))
    }

    onHistoryChange?.(canUndo.value, canRedo.value)
  }

  const clear = () => {
    history.value = []
    historyPointer.value = -1
    onHistoryChange?.(false, false)
  }

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    push,
    clear
  }
}
