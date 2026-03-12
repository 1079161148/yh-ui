import type { Ref } from 'vue'
import type { Node, NodeChange, NodePosition } from '../types'
import { snapPositionToGrid } from '../utils/transform'
import type { ViewportTransform } from '../types'

export interface UseNodesOptions {
  nodes: Ref<Node[]>
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onNodesChange?: (changes: NodeChange[]) => void
}

export interface UseNodesReturn {
  nodes: Ref<Node[]>
  addNode: (node: Node) => void
  removeNode: (nodeId: string) => void
  updateNode: (nodeId: string, data: Partial<Node>) => void
  updateNodePosition: (
    nodeId: string,
    position: NodePosition,
    options?: { dragging?: boolean }
  ) => void
  setNodes: (nodes: Node[]) => void
  getNode: (nodeId: string) => Node | undefined
  getSelectedNodes: () => Node[]
  selectNode: (nodeId: string, selected?: boolean, multi?: boolean) => void
  selectNodes: (nodeIds: string[], selected?: boolean) => void
  clearSelection: () => void
  findNode: (nodeId: string) => Node | undefined
}

export function useNodes(
  _viewport: Ref<ViewportTransform>,
  options: UseNodesOptions
): UseNodesReturn {
  const { nodes, snapToGrid = false, snapGrid = [15, 15], onNodesChange } = options

  const addNode = (node: Node) => {
    nodes.value = [...nodes.value, node]
    onNodesChange?.([{ type: 'select', id: node.id, item: node, selected: true }])
  }

  const removeNode = (nodeId: string) => {
    nodes.value = nodes.value.filter((n) => n.id !== nodeId)
    onNodesChange?.([{ type: 'remove', id: nodeId, item: {} as Node }])
  }

  const updateNode = (nodeId: string, data: Partial<Node>) => {
    nodes.value = nodes.value.map((node) => {
      if (node.id === nodeId) {
        return { ...node, ...data }
      }
      return node
    })
  }

  const updateNodePosition = (
    nodeId: string,
    position: NodePosition,
    options?: { dragging?: boolean }
  ) => {
    let finalPosition = position
    if (snapToGrid) {
      finalPosition = snapPositionToGrid(position, snapGrid)
    }

    nodes.value = nodes.value.map((node) => {
      if (node.id === nodeId) {
        return { ...node, position: finalPosition, dragging: options?.dragging ?? false }
      }
      return node
    })

    const node = nodes.value.find((n) => n.id === nodeId)
    if (node) {
      onNodesChange?.([
        {
          type: 'position',
          id: nodeId,
          item: node,
          position: finalPosition,
          drag: options?.dragging
        }
      ])
    }
  }

  const setNodes = (newNodes: Node[]) => {
    nodes.value = newNodes
  }

  const getNode = (nodeId: string) => {
    return nodes.value.find((n) => n.id === nodeId)
  }

  const getSelectedNodes = () => {
    return nodes.value.filter((n) => n.selected)
  }

  const selectNode = (nodeId: string, selected: boolean = true, multi: boolean = false) => {
    nodes.value = nodes.value.map((node) => {
      if (multi) {
        if (node.id === nodeId) {
          return { ...node, selected }
        }
        return node
      } else {
        if (node.id === nodeId) {
          return { ...node, selected }
        } else {
          return { ...node, selected: false }
        }
      }
    })

    const node = nodes.value.find((n) => n.id === nodeId)
    if (node) {
      onNodesChange?.([{ type: 'select', id: nodeId, item: node, selected }])
    }
  }

  const selectNodes = (nodeIds: string[], selected: boolean = true) => {
    nodes.value = nodes.value.map((node) => {
      if (nodeIds.includes(node.id)) {
        return { ...node, selected }
      }
      return node
    })
  }

  const clearSelection = () => {
    nodes.value = nodes.value.map((node) => ({ ...node, selected: false }))
  }

  const findNode = (nodeId: string) => {
    return nodes.value.find((n) => n.id === nodeId)
  }

  return {
    nodes,
    addNode,
    removeNode,
    updateNode,
    updateNodePosition,
    setNodes,
    getNode,
    getSelectedNodes,
    selectNode,
    selectNodes,
    clearSelection,
    findNode
  }
}
