import { ref, type Ref } from 'vue'
import type { Node } from '../types'

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

    const nodeWidth = node.width || 200
    const nodeHeight = node.height || 50

    const otherNodes = nodes.value.filter((n) => n.id !== nodeId)

    let snappedX = false
    let snappedY = false

    // Horizontal snap (top, center, bottom)
    const dragYPositions = [position.y, position.y + nodeHeight / 2, position.y + nodeHeight]
    for (const otherNode of otherNodes) {
      const otherHeight = otherNode.height || 50
      const otherYPositions = [
        otherNode.position.y,
        otherNode.position.y + otherHeight / 2,
        otherNode.position.y + otherHeight
      ]

      for (let i = 0; i < dragYPositions.length; i++) {
        for (const otherY of otherYPositions) {
          if (Math.abs(dragYPositions[i] - otherY) < snapThreshold) {
            if (i === 0) position.y = otherY
            else if (i === 1) position.y = otherY - nodeHeight / 2
            else position.y = otherY - nodeHeight
            snappedY = true
            break
          }
        }
        if (snappedY) break
      }
      if (snappedY) break
    }

    // Vertical snap (left, center, right)
    const dragXPositions = [position.x, position.x + nodeWidth / 2, position.x + nodeWidth]
    for (const otherNode of otherNodes) {
      const otherWidth = otherNode.width || 200
      const otherXPositions = [
        otherNode.position.x,
        otherNode.position.x + otherWidth / 2,
        otherNode.position.x + otherWidth
      ]

      for (let i = 0; i < dragXPositions.length; i++) {
        for (const otherX of otherXPositions) {
          if (Math.abs(dragXPositions[i] - otherX) < snapThreshold) {
            if (i === 0) position.x = otherX
            else if (i === 1) position.x = otherX - nodeWidth / 2
            else position.x = otherX - otherWidth
            snappedX = true
            break
          }
        }
        if (snappedX) break
      }
    }

    return { x: position.x, y: position.y, snappedX, snappedY }
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
