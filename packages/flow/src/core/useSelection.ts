import { ref, computed, type Ref } from 'vue'
import type { Node, Edge, SelectionRect } from '../types'

export interface UseSelectionOptions {
  nodes: Ref<Node[]>
  edges: Ref<Edge[]>
  onSelectionChange?: (selectedNodes: Node[], selectedEdges: Edge[]) => void
}

export interface UseSelectionReturn {
  selectionRect: Ref<SelectionRect | null>
  isSelecting: Ref<boolean>
  selectedNodes: Ref<Node[]>
  selectedEdges: Ref<Edge[]>
  startSelection: (x: number, y: number) => void
  updateSelection: (x: number, y: number) => void
  endSelection: () => void
  clearSelection: () => void
}

export function useSelection(options: UseSelectionOptions): UseSelectionReturn {
  const { nodes, edges, onSelectionChange } = options

  const selectionRect = ref<SelectionRect | null>(null)
  const isSelecting = ref(false)
  const selectionStart = ref({ x: 0, y: 0 })

  const selectedNodes = computed(() => nodes.value.filter((n) => n.selected))
  const selectedEdges = computed(() => edges.value.filter((e) => e.selected))

  const startSelection = (x: number, y: number) => {
    selectionStart.value = { x, y }
    selectionRect.value = { x, y, width: 0, height: 0 }
    isSelecting.value = true
  }

  const updateSelection = (x: number, y: number) => {
    if (!isSelecting.value) return

    const minX = Math.min(selectionStart.value.x, x)
    const minY = Math.min(selectionStart.value.y, y)
    const maxX = Math.max(selectionStart.value.x, x)
    const maxY = Math.max(selectionStart.value.y, y)

    selectionRect.value = {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }

    // 选择范围内的节点
    nodes.value = nodes.value.map((node) => {
      const nodeWidth = node.width || 200
      const nodeHeight = node.height || 50

      // 节点在选择框内
      const isInside =
        node.position.x >= minX &&
        node.position.y >= minY &&
        node.position.x + nodeWidth <= maxX &&
        node.position.y + nodeHeight <= maxY

      return { ...node, selected: isInside }
    })
  }

  const endSelection = () => {
    isSelecting.value = false
    selectionRect.value = null
    onSelectionChange?.(selectedNodes.value, selectedEdges.value)
  }

  const clearSelection = () => {
    nodes.value = nodes.value.map((n) => ({ ...n, selected: false }))
    edges.value = edges.value.map((e) => ({ ...e, selected: false }))
    onSelectionChange?.([], [])
  }

  return {
    selectionRect,
    isSelecting,
    selectedNodes,
    selectedEdges,
    startSelection,
    updateSelection,
    endSelection,
    clearSelection
  }
}
