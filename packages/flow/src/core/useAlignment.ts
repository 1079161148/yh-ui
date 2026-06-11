import { ref, type Ref } from 'vue'
import type { Node } from '../types'
import { getNodeAbsolutePosition } from '../utils/custom-types'

export interface UseAlignmentOptions {
  nodes: Ref<Node[]>
  snapThreshold?: number
}

export interface UseAlignmentReturn {
  snapToAlignment: (nodeId: string, position: { x: number; y: number }) => { x: number; y: number }
  getAlignmentSnap: (
    nodeId: string,
    position: { x: number; y: number }
  ) => { x: number; y: number; snappedX: boolean; snappedY: boolean }
  horizontalSnapLines: Ref<{ y: number; active: boolean }[]>
  verticalSnapLines: Ref<{ x: number; active: boolean }[]>
}

export function useAlignment(options: UseAlignmentOptions): UseAlignmentReturn {
  const { nodes, snapThreshold = 10 } = options

  const horizontalSnapLines = ref<{ y: number; active: boolean }[]>([])
  const verticalSnapLines = ref<{ x: number; active: boolean }[]>([])

  const getAlignmentSnap = (nodeId: string, position: { x: number; y: number }) => {
    const node = nodes.value.find((n) => n.id === nodeId)
    if (!node) {
      return { x: position.x, y: position.y, snappedX: false, snappedY: false }
    }

    const nodeWidth = node.measured?.width ?? node.width ?? 200
    const nodeHeight = node.measured?.height ?? node.height ?? 50

    const otherNodes = nodes.value.filter((n) => n.id !== nodeId)

    let snappedX = false
    let snappedY = false

    const nodeMap = new Map(nodes.value.map((n) => [n.id, n]))

    // If dragging a nested node, position is passed in relative coordinates.
    // We convert it to absolute coordinates for guide line matching.
    const absPosOffset = { x: 0, y: 0 }
    if (node.parentId) {
      const parent = nodeMap.get(node.parentId)
      if (parent) {
        const parentAbsPos = getNodeAbsolutePosition(parent, nodeMap)
        absPosOffset.x = parentAbsPos.x
        absPosOffset.y = parentAbsPos.y
      }
    }

    const proposedAbsPos = {
      x: position.x + absPosOffset.x,
      y: position.y + absPosOffset.y
    }

    // Horizontal snap (top, center, bottom)
    const dragYPositions = [
      proposedAbsPos.y,
      proposedAbsPos.y + nodeHeight / 2,
      proposedAbsPos.y + nodeHeight
    ]
    for (const otherNode of otherNodes) {
      const otherHeight = otherNode.measured?.height ?? otherNode.height ?? 50
      const otherAbsPos = getNodeAbsolutePosition(otherNode, nodeMap)
      const otherYPositions = [
        otherAbsPos.y,
        otherAbsPos.y + otherHeight / 2,
        otherAbsPos.y + otherHeight
      ]

      for (let i = 0; i < dragYPositions.length; i++) {
        for (const otherY of otherYPositions) {
          if (Math.abs(dragYPositions[i] - otherY) < snapThreshold) {
            if (i === 0) proposedAbsPos.y = otherY
            else if (i === 1) proposedAbsPos.y = otherY - nodeHeight / 2
            else proposedAbsPos.y = otherY - nodeHeight
            snappedY = true
            break
          }
        }
        if (snappedY) break
      }
      if (snappedY) break
    }

    // Vertical snap (left, center, right)
    const dragXPositions = [
      proposedAbsPos.x,
      proposedAbsPos.x + nodeWidth / 2,
      proposedAbsPos.x + nodeWidth
    ]
    for (const otherNode of otherNodes) {
      const otherWidth = otherNode.measured?.width ?? otherNode.width ?? 200
      const otherAbsPos = getNodeAbsolutePosition(otherNode, nodeMap)
      const otherXPositions = [
        otherAbsPos.x,
        otherAbsPos.x + otherWidth / 2,
        otherAbsPos.x + otherWidth
      ]

      for (let i = 0; i < dragXPositions.length; i++) {
        for (const otherX of otherXPositions) {
          if (Math.abs(dragXPositions[i] - otherX) < snapThreshold) {
            if (i === 0) proposedAbsPos.x = otherX
            else if (i === 1) proposedAbsPos.x = otherX - nodeWidth / 2
            else proposedAbsPos.x = otherX - nodeWidth
            snappedX = true
            break
          }
        }
        if (snappedX) break
      }
    }

    return {
      x: proposedAbsPos.x - absPosOffset.x,
      y: proposedAbsPos.y - absPosOffset.y,
      snappedX,
      snappedY
    }
  }

  const snapToAlignment = (nodeId: string, position: { x: number; y: number }) => {
    const snapResult = getAlignmentSnap(nodeId, position)
    return { x: snapResult.x, y: snapResult.y }
  }

  return {
    snapToAlignment,
    getAlignmentSnap,
    horizontalSnapLines,
    verticalSnapLines
  }
}
