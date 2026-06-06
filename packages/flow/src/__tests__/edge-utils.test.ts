import { describe, it, expect } from 'vitest'
import {
  getHandlePosition,
  getBezierPath,
  getStraightPath,
  getStepPath,
  getSmoothStepPath,
  getEdgePath,
  getEdgeCenter,
  shortenEndpoint
} from '../utils/edge'
import type { Node, NodeStyle } from '../types'

function createMockNode(
  x: number,
  y: number,
  width = 150,
  height = 80,
  style?: NodeStyle
): Node & { position: { x: number; y: number }; width?: number; height?: number; style?: NodeStyle } {
  return {
    id: 'test',
    type: 'default',
    position: { x, y },
    width,
    height,
    style,
    data: {},
    selected: false,
    dragging: false
  }
}

describe('flow/utils/edge', () => {
  describe('getHandlePosition', () => {
    it('should return center for unknown position', () => {
      const node = createMockNode(0, 0, 100, 50)
      const result = getHandlePosition(node, 'unknown' as never)
      expect(result.x).toBe(50)
      expect(result.y).toBe(25)
    })

    it('should return top handle position', () => {
      const node = createMockNode(10, 20, 100, 50)
      const result = getHandlePosition(node, 'top')
      expect(result.x).toBe(60) // 10 + 100/2
      expect(result.y).toBe(20)
    })

    it('should return bottom handle position', () => {
      const node = createMockNode(10, 20, 100, 50)
      const result = getHandlePosition(node, 'bottom')
      expect(result.x).toBe(60)
      expect(result.y).toBe(70) // 20 + 50
    })

    it('should return left handle position', () => {
      const node = createMockNode(10, 20, 100, 50)
      const result = getHandlePosition(node, 'left')
      expect(result.x).toBe(10)
      expect(result.y).toBe(45) // 20 + 50/2
    })

    it('should return right handle position', () => {
      const node = createMockNode(10, 20, 100, 50)
      const result = getHandlePosition(node, 'right')
      expect(result.x).toBe(110) // 10 + 100
      expect(result.y).toBe(45)
    })

    it('should fallback to default dimensions when width/height are undefined', () => {
      const node = {
        position: { x: 0, y: 0 },
        data: {},
        selected: false,
        dragging: false
      } as Node & { position: { x: number; y: number }; width?: number; height?: number }
      const result = getHandlePosition(node, 'right')
      expect(result.x).toBe(150) // 0 + 150 (default)
      expect(result.y).toBe(20) // 0 + 40/2 (default)
    })

    it('should use right as default position', () => {
      const node = createMockNode(0, 0, 100, 50)
      const result = getHandlePosition(node)
      expect(result.x).toBe(100)
      expect(result.y).toBe(25)
    })
  })

  describe('getBezierPath', () => {
    it('should generate bezier path', () => {
      const result = getBezierPath({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toContain('M0,0')
      expect(result).toContain('100,50')
      expect(result).toContain('C') // Cubic bezier
    })

    it('should use custom curvature', () => {
      const result = getBezierPath({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left',
        curvature: 0.5
      })
      expect(result).toContain('M0,0')
      expect(result).toContain('100,50')
    })

    it('should handle vertical movement', () => {
      const result = getBezierPath({
        sourceX: 50,
        sourceY: 0,
        targetX: 50,
        targetY: 100,
        sourcePosition: 'bottom',
        targetPosition: 'top'
      })
      expect(result).toContain('M50,0')
      expect(result).toContain('50,100')
    })

    it('should handle top to bottom direction', () => {
      const result = getBezierPath({
        sourceX: 50,
        sourceY: 0,
        targetX: 50,
        targetY: 100,
        sourcePosition: 'top',
        targetPosition: 'bottom'
      })
      expect(result).toContain('M50,0')
    })
  })

  describe('getStraightPath', () => {
    it('should generate straight line path', () => {
      const result = getStraightPath({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toBe('M0,0 L100,50')
    })

    it('should handle diagonal line', () => {
      const result = getStraightPath({
        sourceX: 10,
        sourceY: 20,
        targetX: 300,
        targetY: 400,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toBe('M10,20 L300,400')
    })
  })

  describe('getStepPath', () => {
    it('should generate step path when source is horizontal and target is vertical', () => {
      const result = getStepPath({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'top'
      })
      expect(result).toContain('M0,0')
      expect(result).toContain('L')
      expect(result).toContain('100,50')
    })

    it('should generate step path when source is vertical and target is horizontal', () => {
      const result = getStepPath({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'top',
        targetPosition: 'right'
      })
      expect(result).toContain('M0,0')
      expect(result).toContain('L')
    })

    it('should handle both horizontal', () => {
      const result = getStepPath({
        sourceX: 0,
        sourceY: 50,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toContain('M0,50')
      expect(result).toContain('L')
    })

    it('should handle both vertical', () => {
      const result = getStepPath({
        sourceX: 50,
        sourceY: 0,
        targetX: 50,
        targetY: 100,
        sourcePosition: 'bottom',
        targetPosition: 'top'
      })
      expect(result).toContain('M50,0')
      expect(result).toContain('L')
    })
  })

  describe('getSmoothStepPath', () => {
    it('should generate smooth step path for horizontal source', () => {
      const result = getSmoothStepPath({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'top'
      })
      expect(result).toContain('M0,0')
      expect(result).toContain('Q') // Quadratic bezier for rounded corners
      expect(result).toContain('100,50')
    })

    it('should generate smooth step path for vertical source', () => {
      const result = getSmoothStepPath({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'bottom',
        targetPosition: 'right'
      })
      expect(result).toContain('M0,0')
      expect(result).toContain('Q')
    })
  })

  describe('getEdgePath', () => {
    it('should return bezier path for bezier type', () => {
      const result = getEdgePath('bezier', {
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toContain('C')
    })

    it('should return straight path for straight type', () => {
      const result = getEdgePath('straight', {
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toBe('M0,0 L100,50')
    })

    it('should return step path for step type', () => {
      const result = getEdgePath('step', {
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'top'
      })
      expect(result).toContain('L')
    })

    it('should return smooth step path for smoothstep type', () => {
      const result = getEdgePath('smoothstep', {
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'top'
      })
      expect(result).toContain('Q')
    })

    it('should default to bezier for unknown type', () => {
      const result = getEdgePath('unknown' as never, {
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toContain('C')
    })

    it('should default to bezier for default type', () => {
      const result = getEdgePath('default', {
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toContain('C')
    })
  })

  describe('getEdgeCenter', () => {
    it('should return center for bezier type', () => {
      const result = getEdgeCenter({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'bezier'
      })
      expect(result).toHaveProperty('x')
      expect(result).toHaveProperty('y')
      expect(result).toHaveProperty('ox')
      expect(result).toHaveProperty('oy')
    })

    it('should return center for straight type', () => {
      const result = getEdgeCenter({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'straight'
      })
      expect(result.x).toBe(50)
      expect(result.y).toBe(25)
    })

    it('should return center for step type', () => {
      const result = getEdgeCenter({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'step'
      })
      expect(result.x).toBe(50)
      expect(result.y).toBe(25)
    })

    it('should default to bezier when type is undefined', () => {
      const result = getEdgeCenter({
        sourceX: 0,
        sourceY: 0,
        targetX: 100,
        targetY: 50,
        sourcePosition: 'right',
        targetPosition: 'left'
      })
      expect(result).toHaveProperty('x')
    })
  })

  describe('shortenEndpoint', () => {
    it('should shorten endpoint in the direction of source', () => {
      const result = shortenEndpoint(100, 50, 0, 0, 10)
      expect(result.x).toBeLessThan(100)
      expect(result.y).toBeLessThan(50)
    })

    it('should not shorten when distance is too small', () => {
      const result = shortenEndpoint(5, 5, 0, 0, 10)
      expect(result.x).toBe(5)
      expect(result.y).toBe(5)
    })

    it('should shorten towards source', () => {
      const result = shortenEndpoint(200, 100, 100, 50, 10)
      const dx = 200 - 100
      const dy = 100 - 50
      const dist = Math.sqrt(dx * dx + dy * dy)
      const factor = 10 / dist
      expect(result.x).toBeCloseTo(200 - dx * factor, 5)
      expect(result.y).toBeCloseTo(100 - dy * factor, 5)
    })

    it('should handle vertical movement', () => {
      const result = shortenEndpoint(50, 100, 50, 0, 10)
      expect(result.x).toBe(50)
      expect(result.y).toBeCloseTo(90, 0)
    })
  })
})
