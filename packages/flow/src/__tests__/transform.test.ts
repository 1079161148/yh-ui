import { describe, it, expect } from 'vitest'
import {
  screenToCanvas,
  canvasToScreen,
  projectNodePosition,
  getElementPosition,
  getElementCanvasPosition,
  distanceBetweenPoints,
  getVector,
  getVectorMagnitude,
  normalizeVector,
  snapToGrid,
  snapPositionToGrid,
  type Coordinate,
  type ViewportTransform
} from '../utils/transform'

describe('flow/utils/transform', () => {
  describe('screenToCanvas', () => {
    it('should convert screen coordinates to canvas coordinates', () => {
      const transform: ViewportTransform = { x: 100, y: 50, zoom: 2 }
      const canvas = screenToCanvas(300, 250, transform)
      expect(canvas.x).toBe(100)
      expect(canvas.y).toBe(100)
    })

    it('should handle zoom of 1', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 1 }
      const canvas = screenToCanvas(100, 200, transform)
      expect(canvas.x).toBe(100)
      expect(canvas.y).toBe(200)
    })

    it('should handle negative transform offsets', () => {
      const transform: ViewportTransform = { x: -100, y: -50, zoom: 1 }
      const canvas = screenToCanvas(50, 100, transform)
      expect(canvas.x).toBe(150)
      expect(canvas.y).toBe(150)
    })

    it('should handle fractional zoom', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 0.5 }
      const canvas = screenToCanvas(100, 200, transform)
      expect(canvas.x).toBe(200)
      expect(canvas.y).toBe(400)
    })
  })

  describe('canvasToScreen', () => {
    it('should convert canvas coordinates to screen coordinates', () => {
      const transform: ViewportTransform = { x: 100, y: 50, zoom: 2 }
      const screen = canvasToScreen(100, 100, transform)
      expect(screen.x).toBe(300)
      expect(screen.y).toBe(250)
    })

    it('should handle zoom of 1', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 1 }
      const screen = canvasToScreen(100, 200, transform)
      expect(screen.x).toBe(100)
      expect(screen.y).toBe(200)
    })

    it('should be inverse of screenToCanvas', () => {
      const transform: ViewportTransform = { x: 100, y: 50, zoom: 2 }
      const original = { x: 300, y: 250 }
      const canvas = screenToCanvas(original.x, original.y, transform)
      const back = canvasToScreen(canvas.x, canvas.y, transform)
      expect(back.x).toBeCloseTo(original.x)
      expect(back.y).toBeCloseTo(original.y)
    })
  })

  describe('projectNodePosition', () => {
    it('should transform position between viewports', () => {
      const from: ViewportTransform = { x: 100, y: 50, zoom: 2 }
      const to: ViewportTransform = { x: -50, y: 100, zoom: 1 }
      const position: Coordinate = { x: 300, y: 250 }

      const projected = projectNodePosition(position, from, to)
      expect(projected).toHaveProperty('x')
      expect(projected).toHaveProperty('y')
    })

    it('should handle identical viewports', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 1 }
      const position: Coordinate = { x: 100, y: 200 }
      const projected = projectNodePosition(position, transform, transform)
      expect(projected).toEqual(position)
    })
  })

  describe('getElementPosition', () => {
    it('should calculate element position relative to container', () => {
      const mockElement = {
        getBoundingClientRect: () => ({ left: 100, top: 50 })
      } as unknown as HTMLElement
      const mockContainer = {
        getBoundingClientRect: () => ({ left: 50, top: 25 })
      } as unknown as HTMLElement

      const pos = getElementPosition(mockElement, mockContainer)
      expect(pos.x).toBe(50)
      expect(pos.y).toBe(25)
    })

    it('should handle element at container origin', () => {
      const mockElement = {
        getBoundingClientRect: () => ({ left: 100, top: 100 })
      } as unknown as HTMLElement
      const mockContainer = {
        getBoundingClientRect: () => ({ left: 100, top: 100 })
      } as unknown as HTMLElement

      const pos = getElementPosition(mockElement, mockContainer)
      expect(pos.x).toBe(0)
      expect(pos.y).toBe(0)
    })
  })

  describe('getElementCanvasPosition', () => {
    it('should get element position in canvas coordinates', () => {
      const mockElement = {
        getBoundingClientRect: () => ({ left: 200, top: 150 })
      } as unknown as HTMLElement
      const mockContainer = {
        getBoundingClientRect: () => ({ left: 100, y: 50 })
      } as unknown as HTMLElement
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 1 }

      const pos = getElementCanvasPosition(mockElement, mockContainer, transform)
      expect(pos).toHaveProperty('x')
      expect(pos).toHaveProperty('y')
    })
  })

  describe('distanceBetweenPoints', () => {
    it('should calculate distance between two points', () => {
      const p1: Coordinate = { x: 0, y: 0 }
      const p2: Coordinate = { x: 3, y: 4 }
      expect(distanceBetweenPoints(p1, p2)).toBe(5)
    })

    it('should return 0 for same point', () => {
      const p: Coordinate = { x: 100, y: 100 }
      expect(distanceBetweenPoints(p, p)).toBe(0)
    })

    it('should handle negative coordinates', () => {
      const p1: Coordinate = { x: -3, y: -4 }
      const p2: Coordinate = { x: 0, y: 0 }
      expect(distanceBetweenPoints(p1, p2)).toBe(5)
    })
  })

  describe('getVector', () => {
    it('should calculate vector from source to target', () => {
      const source: Coordinate = { x: 10, y: 20 }
      const target: Coordinate = { x: 30, y: 50 }
      const vector = getVector(source, target)
      expect(vector).toEqual({ x: 20, y: 30 })
    })

    it('should handle zero vector', () => {
      const source: Coordinate = { x: 100, y: 100 }
      const target: Coordinate = { x: 100, y: 100 }
      const vector = getVector(source, target)
      expect(vector).toEqual({ x: 0, y: 0 })
    })

    it('should handle negative results', () => {
      const source: Coordinate = { x: 50, y: 50 }
      const target: Coordinate = { x: 30, y: 20 }
      const vector = getVector(source, target)
      expect(vector).toEqual({ x: -20, y: -30 })
    })
  })

  describe('getVectorMagnitude', () => {
    it('should calculate magnitude of vector', () => {
      const vector: Coordinate = { x: 3, y: 4 }
      expect(getVectorMagnitude(vector)).toBe(5)
    })

    it('should return 0 for zero vector', () => {
      const vector: Coordinate = { x: 0, y: 0 }
      expect(getVectorMagnitude(vector)).toBe(0)
    })

    it('should handle negative components', () => {
      const vector: Coordinate = { x: -3, y: -4 }
      expect(getVectorMagnitude(vector)).toBe(5)
    })
  })

  describe('normalizeVector', () => {
    it('should normalize a unit vector', () => {
      const vector: Coordinate = { x: 3, y: 4 }
      const normalized = normalizeVector(vector)
      expect(normalized.x).toBeCloseTo(0.6)
      expect(normalized.y).toBeCloseTo(0.8)
    })

    it('should return zero vector for zero magnitude', () => {
      const vector: Coordinate = { x: 0, y: 0 }
      const normalized = normalizeVector(vector)
      expect(normalized).toEqual({ x: 0, y: 0 })
    })

    it('should produce unit magnitude vector', () => {
      const vector: Coordinate = { x: 5, y: 12 }
      const normalized = normalizeVector(vector)
      const magnitude = getVectorMagnitude(normalized)
      expect(magnitude).toBeCloseTo(1)
    })

    it('should handle negative components', () => {
      const vector: Coordinate = { x: -5, y: 0 }
      const normalized = normalizeVector(vector)
      expect(normalized.x).toBe(-1)
      expect(normalized.y).toBe(0)
    })
  })

  describe('snapToGrid', () => {
    it('should snap value to nearest grid point', () => {
      expect(snapToGrid(0, 10)).toBe(0)
      expect(snapToGrid(5, 10)).toBe(10)
      expect(snapToGrid(10, 10)).toBe(10)
      expect(snapToGrid(15, 10)).toBe(20)
    })

    it('should snap negative values toward zero', () => {
      // Happy-DOM's Math.round rounds .5 toward zero
      // snapToGrid(-15, 10) = Math.round(-1.5) * 10 = -10
      expect(snapToGrid(-15, 10)).toBe(-10)
      // snapToGrid(-25, 10) = Math.round(-2.5) * 10 = -20
      expect(snapToGrid(-25, 10)).toBe(-20)
      // snapToGrid(-55, 10) = Math.round(-5.5) * 10 = -50
      expect(snapToGrid(-55, 10)).toBe(-50)
    })

    it('should snap very small negative values to zero', () => {
      const result = snapToGrid(-5, 10)
      expect(Object.is(result, -0) || result === 0).toBe(true)
    })

    it('should handle fractional values', () => {
      expect(snapToGrid(2.5, 10)).toBe(0)
      expect(snapToGrid(7.5, 10)).toBe(10)
    })

    it('should handle non-10 grid size', () => {
      expect(snapToGrid(5, 5)).toBe(5)
      expect(snapToGrid(7, 5)).toBe(5)
      expect(snapToGrid(8, 5)).toBe(10)
    })
  })

  describe('snapPositionToGrid', () => {
    it('should snap x and y independently', () => {
      const pos: Coordinate = { x: 17, y: 23 }
      const grid: [number, number] = [10, 5]
      const snapped = snapPositionToGrid(pos, grid)
      expect(snapped).toEqual({ x: 20, y: 25 })
    })

    it('should handle zero coordinates', () => {
      const pos: Coordinate = { x: 0, y: 0 }
      const grid: [number, number] = [10, 5]
      const snapped = snapPositionToGrid(pos, grid)
      expect(snapped).toEqual({ x: 0, y: 0 })
    })

    it('should handle different grid sizes for x and y', () => {
      const pos: Coordinate = { x: 100, y: 200 }
      const grid: [number, number] = [20, 25]
      const snapped = snapPositionToGrid(pos, grid)
      expect(snapped).toEqual({ x: 100, y: 200 })
    })
  })
})
