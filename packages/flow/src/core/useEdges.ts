import { type Ref } from 'vue'
import type { Edge, EdgeChange } from '../types'
import type { Node } from '../types'

export interface UseEdgesOptions {
  edges: Ref<Edge[]>
  nodes: Ref<Node[]>
  onEdgesChange?: (changes: EdgeChange[]) => void
  isValidConnection?: (connection: {
    source: string
    target: string
    sourceHandle?: string | null
    targetHandle?: string | null
  }) => boolean
}

export interface UseEdgesReturn {
  edges: Ref<Edge[]>
  addEdge: (edge: Edge) => void
  removeEdge: (edgeId: string) => void
  updateEdge: (edgeId: string, data: Partial<Edge>) => void
  setEdges: (edges: Edge[]) => void
  getEdge: (edgeId: string) => Edge | undefined
  getSelectedEdges: () => Edge[]
  selectEdge: (edgeId: string, selected?: boolean, multi?: boolean) => void
  selectEdges: (edgeIds: string[], selected?: boolean) => void
  clearSelection: () => void
  getEdgesForNode: (nodeId: string) => Edge[]
  getConnectedEdges: (nodeId: string) => Edge[]
}

export function useEdges(options: UseEdgesOptions): UseEdgesReturn {
  const { edges, nodes: _nodes, onEdgesChange, isValidConnection } = options

  const addEdge = (edge: Edge) => {
    // 校验连接
    if (
      isValidConnection &&
      !isValidConnection({
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      })
    ) {
      return
    }

    // 检查是否已存在相同连接
    const exists = edges.value.some((e) => e.source === edge.source && e.target === edge.target)
    if (exists) return

    edges.value = [...edges.value, edge]
    onEdgesChange?.([{ type: 'select', id: edge.id, item: edge, selected: true }])
  }

  const removeEdge = (edgeId: string) => {
    edges.value = edges.value.filter((e) => e.id !== edgeId)
    onEdgesChange?.([{ type: 'remove', id: edgeId, item: {} as Edge }])
  }

  const updateEdge = (edgeId: string, data: Partial<Edge>) => {
    edges.value = edges.value.map((edge) => {
      if (edge.id === edgeId) {
        return { ...edge, ...data }
      }
      return edge
    })
  }

  const setEdges = (newEdges: Edge[]) => {
    edges.value = newEdges
  }

  const getEdge = (edgeId: string) => {
    return edges.value.find((e) => e.id === edgeId)
  }

  const getSelectedEdges = () => {
    return edges.value.filter((e) => e.selected)
  }

  const selectEdge = (edgeId: string, selected: boolean = true, multi: boolean = false) => {
    edges.value = edges.value.map((edge) => {
      if (multi) {
        if (edge.id === edgeId) {
          return { ...edge, selected }
        }
        return edge
      } else {
        if (edge.id === edgeId) {
          return { ...edge, selected }
        } else {
          return { ...edge, selected: false }
        }
      }
    })

    const edge = edges.value.find((e) => e.id === edgeId)
    if (edge) {
      onEdgesChange?.([{ type: 'select', id: edgeId, item: edge, selected }])
    }
  }

  const selectEdges = (edgeIds: string[], selected: boolean = true) => {
    edges.value = edges.value.map((edge) => {
      if (edgeIds.includes(edge.id)) {
        return { ...edge, selected }
      }
      return edge
    })
  }

  const clearSelection = () => {
    edges.value = edges.value.map((edge) => ({ ...edge, selected: false }))
  }

  const getEdgesForNode = (nodeId: string) => {
    return edges.value.filter((e) => e.source === nodeId || e.target === nodeId)
  }

  const getConnectedEdges = (nodeId: string) => {
    return edges.value.filter((e) => e.source === nodeId || e.target === nodeId)
  }

  return {
    edges,
    addEdge,
    removeEdge,
    updateEdge,
    setEdges,
    getEdge,
    getSelectedEdges,
    selectEdge,
    selectEdges,
    clearSelection,
    getEdgesForNode,
    getConnectedEdges
  }
}
