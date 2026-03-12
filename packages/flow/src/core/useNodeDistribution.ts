import { type Ref } from 'vue'
import type { Node } from '../types'

export interface UseNodeDistributionOptions {
  nodes: Ref<Node[]>
}

export interface UseNodeDistributionReturn {
  distributeHorizontally: (nodeIds?: string[], gap?: number) => void
  distributeVertically: (nodeIds?: string[], gap?: number) => void
  alignNodesHorizontal: (nodeIds?: string[], alignment?: 'left' | 'center' | 'right') => void
  alignNodesVertical: (nodeIds?: string[], alignment?: 'top' | 'middle' | 'bottom') => void
}

export function useNodeDistribution(
  options: UseNodeDistributionOptions
): UseNodeDistributionReturn {
  const { nodes } = options

  const distributeHorizontally = (nodeIds?: string[], gap: number = 50) => {
    const targetNodeIds = nodeIds || nodes.value.filter((n) => n.selected).map((n) => n.id)
    if (targetNodeIds.length < 3) return

    // Get all target nodes
    const targetNodes = nodes.value.filter((n) => targetNodeIds.includes(n.id))
    // Sort by X position
    targetNodes.sort((a, b) => a.position.x - b.position.x)

    // Get the minimum X position
    const firstNode = targetNodes[0]
    const lastNode = targetNodes[targetNodes.length - 1]

    const lastWidth = lastNode.width || 200

    const totalWidth = targetNodes.reduce((sum, n) => sum + (n.width || 200), 0)
    const totalGap = gap * (targetNodes.length - 1)
    const availableSpace =
      lastNode.position.x + lastWidth - firstNode.position.x - totalWidth - totalGap

    if (availableSpace <= 0) {
      // Nodes are too close, spread them out evenly
      let currentX = firstNode.position.x
      targetNodes.forEach((node) => {
        const nodeIndex = nodes.value.findIndex((n) => n.id === node.id)
        if (nodeIndex >= 0) {
          nodes.value[nodeIndex] = {
            ...nodes.value[nodeIndex],
            position: { ...nodes.value[nodeIndex].position, x: currentX }
          }
        }
        currentX += (node.width || 200) + gap
      })
    } else {
      // Distribute with gaps
      let currentX = firstNode.position.x
      targetNodes.forEach((node) => {
        const nodeIndex = nodes.value.findIndex((n) => n.id === node.id)
        if (nodeIndex >= 0) {
          nodes.value[nodeIndex] = {
            ...nodes.value[nodeIndex],
            position: { ...nodes.value[nodeIndex].position, x: currentX }
          }
        }
        currentX += (node.width || 200) + gap
      })
    }
  }

  const distributeVertically = (nodeIds?: string[], gap: number = 50) => {
    const targetNodeIds = nodeIds || nodes.value.filter((n) => n.selected).map((n) => n.id)
    if (targetNodeIds.length < 3) return

    const targetNodes = nodes.value.filter((n) => targetNodeIds.includes(n.id))
    targetNodes.sort((a, b) => a.position.y - b.position.y)

    const firstNode = targetNodes[0]
    const lastNode = targetNodes[targetNodes.length - 1]

    const lastHeight = lastNode.height || 50

    const totalHeight = targetNodes.reduce((sum, n) => sum + (n.height || 50), 0)
    const totalGap = gap * (targetNodes.length - 1)
    const availableSpace =
      lastNode.position.y + lastHeight - firstNode.position.y - totalHeight - totalGap

    if (availableSpace <= 0) {
      let currentY = firstNode.position.y
      targetNodes.forEach((node) => {
        const nodeIndex = nodes.value.findIndex((n) => n.id === node.id)
        if (nodeIndex >= 0) {
          nodes.value[nodeIndex] = {
            ...nodes.value[nodeIndex],
            position: { ...nodes.value[nodeIndex].position, y: currentY }
          }
        }
        currentY += (node.height || 50) + gap
      })
    } else {
      let currentY = firstNode.position.y
      targetNodes.forEach((node) => {
        const nodeIndex = nodes.value.findIndex((n) => n.id === node.id)
        if (nodeIndex >= 0) {
          nodes.value[nodeIndex] = {
            ...nodes.value[nodeIndex],
            position: { ...nodes.value[nodeIndex].position, y: currentY }
          }
        }
        currentY += (node.height || 50) + gap
      })
    }
  }

  const alignNodesHorizontal = (
    nodeIds?: string[],
    alignment: 'left' | 'center' | 'right' = 'left'
  ) => {
    const targetNodeIds = nodeIds || nodes.value.filter((n) => n.selected).map((n) => n.id)
    if (targetNodeIds.length < 2) return

    const targetNodes = nodes.value.filter((n) => targetNodeIds.includes(n.id))

    let referenceX: number
    if (alignment === 'left') {
      referenceX = Math.min(...targetNodes.map((n) => n.position.x))
    } else if (alignment === 'right') {
      referenceX = Math.max(...targetNodes.map((n) => n.position.x + (n.width || 200)))
    } else {
      // center - use average
      const centers = targetNodes.map((n) => n.position.x + (n.width || 200) / 2)
      referenceX = centers.reduce((a, b) => a + b, 0) / centers.length
    }

    targetNodes.forEach((node) => {
      const nodeIndex = nodes.value.findIndex((n) => n.id === node.id)
      if (nodeIndex >= 0) {
        let newX: number
        if (alignment === 'left') {
          newX = referenceX
        } else if (alignment === 'right') {
          newX = referenceX - (node.width || 200)
        } else {
          newX = referenceX - (node.width || 200) / 2
        }

        nodes.value[nodeIndex] = {
          ...nodes.value[nodeIndex],
          position: { ...nodes.value[nodeIndex].position, x: newX }
        }
      }
    })
  }

  const alignNodesVertical = (
    nodeIds?: string[],
    alignment: 'top' | 'middle' | 'bottom' = 'top'
  ) => {
    const targetNodeIds = nodeIds || nodes.value.filter((n) => n.selected).map((n) => n.id)
    if (targetNodeIds.length < 2) return

    const targetNodes = nodes.value.filter((n) => targetNodeIds.includes(n.id))

    let referenceY: number
    if (alignment === 'top') {
      referenceY = Math.min(...targetNodes.map((n) => n.position.y))
    } else if (alignment === 'bottom') {
      referenceY = Math.max(...targetNodes.map((n) => n.position.y + (n.height || 50)))
    } else {
      // middle
      const middles = targetNodes.map((n) => n.position.y + (n.height || 50) / 2)
      referenceY = middles.reduce((a, b) => a + b, 0) / middles.length
    }

    targetNodes.forEach((node) => {
      const nodeIndex = nodes.value.findIndex((n) => n.id === node.id)
      if (nodeIndex >= 0) {
        let newY: number
        if (alignment === 'top') {
          newY = referenceY
        } else if (alignment === 'bottom') {
          newY = referenceY - (node.height || 50)
        } else {
          newY = referenceY - (node.height || 50) / 2
        }

        nodes.value[nodeIndex] = {
          ...nodes.value[nodeIndex],
          position: { ...nodes.value[nodeIndex].position, y: newY }
        }
      }
    })
  }

  return {
    distributeHorizontally,
    distributeVertically,
    alignNodesHorizontal,
    alignNodesVertical
  }
}
