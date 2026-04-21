import { describe, it, expect } from 'vitest'
import {
  getViewportForBounds,
  project,
  unproject,
  isNodeVisible,
  type ViewportTransform,
  type ViewportOptions,
  type FitViewOptions,
  type ScreenToFlowPositionOptions
} from '../types/viewport'

describe('flow/types/viewport', () => {
  describe('ViewportTransform', () => {
    it('should define viewport with x, y, zoom', () => {
      const transform: ViewportTransform = { x: 100, y: 50, zoom: 1.5 }
      expect(transform.x).toBe(100)
      expect(transform.y).toBe(50)
      expect(transform.zoom).toBe(1.5)
    })

    it('should allow negative coordinates', () => {
      const transform: ViewportTransform = { x: -100, y: -50, zoom: 0.5 }
      expect(transform.x).toBe(-100)
      expect(transform.y).toBe(-50)
    })

    it('should allow zoom less than 1', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 0.1 }
      expect(transform.zoom).toBe(0.1)
    })

    it('should allow zoom greater than 1', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 5 }
      expect(transform.zoom).toBe(5)
    })
  })

  describe('ViewportOptions', () => {
    it('should define full viewport options', () => {
      const options: ViewportOptions = {
        minZoom: 0.1,
        maxZoom: 5,
        translateExtent: [[0, 0], [1000, 1000]],
        zoomStep: 0.1,
        panZoomSpeed: 1,
        zoomInMultiplier: 1.2,
        zoomOutMultiplier: 0.8,
        panning: true,
        zooming: true,
        zoomOnScroll: true,
        zoomOnPinch: true,
        panOnScroll: true,
        panOnDrag: true,
        fitViewOnInit: true,
        fitViewOnInitOptions: { padding: 0.2 }
      }
      expect(options.minZoom).toBe(0.1)
      expect(options.maxZoom).toBe(5)
      expect(options.fitViewOnInit).toBe(true)
    })

    it('should allow partial options', () => {
      const options: ViewportOptions = {
        minZoom: 0.2,
        maxZoom: 3
      }
      expect(options.minZoom).toBe(0.2)
      expect(options.maxZoom).toBe(3)
    })
  })

  describe('FitViewOptions', () => {
    it('should define fit view options', () => {
      const options: FitViewOptions = {
        padding: 0.3,
        includeHiddenNodes: false,
        minZoom: 0.5,
        maxZoom: 2
      }
      expect(options.padding).toBe(0.3)
      expect(options.includeHiddenNodes).toBe(false)
    })
  })

  describe('ScreenToFlowPositionOptions', () => {
    it('should define screen to flow position options', () => {
      const options: ScreenToFlowPositionOptions = {
        offset: { x: 10, y: 20 },
        snapToGrid: true,
        gridSize: 15
      }
      expect(options.offset?.x).toBe(10)
      expect(options.snapToGrid).toBe(true)
      expect(options.gridSize).toBe(15)
    })
  })

  describe('getViewportForBounds', () => {
    it('should calculate viewport to fit bounds within container', () => {
      const bounds = { x: 0, y: 0, width: 200, height: 200 }
      const viewport = getViewportForBounds(bounds, 800, 600, 0.1, 5, 0.2)
      expect(viewport).toHaveProperty('x')
      expect(viewport).toHaveProperty('y')
      expect(viewport).toHaveProperty('zoom')
      expect(viewport.zoom).toBeGreaterThanOrEqual(0.1)
      expect(viewport.zoom).toBeLessThanOrEqual(5)
    })

    it('should use default padding of 0.2', () => {
      const bounds = { x: 100, y: 100, width: 100, height: 100 }
      const viewport1 = getViewportForBounds(bounds, 400, 300, 0.1, 5)
      const viewport2 = getViewportForBounds(bounds, 400, 300, 0.1, 5, 0.2)
      expect(viewport1.zoom).toBe(viewport2.zoom)
    })

    it('should handle bounds at origin', () => {
      const bounds = { x: 0, y: 0, width: 100, height: 50 }
      const viewport = getViewportForBounds(bounds, 800, 400, 0.1, 5, 0.1)
      expect(viewport.zoom).toBeGreaterThan(0)
    })

    it('should respect minZoom constraint', () => {
      const bounds = { x: 0, y: 0, width: 10000, height: 10000 }
      const viewport = getViewportForBounds(bounds, 800, 600, 0.5, 5, 0.2)
      expect(viewport.zoom).toBeGreaterThanOrEqual(0.5)
    })

    it('should respect maxZoom constraint', () => {
      const bounds = { x: 0, y: 0, width: 10, height: 10 }
      const viewport = getViewportForBounds(bounds, 800, 600, 0.1, 2, 0.2)
      expect(viewport.zoom).toBeLessThanOrEqual(2)
    })
  })

  describe('project', () => {
    it('should project screen coordinates to canvas coordinates', () => {
      const transform: ViewportTransform = { x: 100, y: 50, zoom: 2 }
      const screenPos = { x: 300, y: 250 }
      const canvasPos = project(screenPos, transform)
      expect(canvasPos).toEqual({ x: 100, y: 100 })
    })

    it('should handle zoom of 1', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 1 }
      const screenPos = { x: 100, y: 200 }
      const canvasPos = project(screenPos, transform)
      expect(canvasPos).toEqual({ x: 100, y: 200 })
    })

    it('should handle negative viewport offset', () => {
      const transform: ViewportTransform = { x: -100, y: -50, zoom: 1 }
      const screenPos = { x: 0, y: 0 }
      const canvasPos = project(screenPos, transform)
      expect(canvasPos.x).toBe(100)
      expect(canvasPos.y).toBe(50)
    })

    it('should handle fractional zoom', () => {
      const transform: ViewportTransform = { x: 0, y: 0, zoom: 0.5 }
      const screenPos = { x: 100, y: 100 }
      const canvasPos = project(screenPos, transform)
      expect(canvasPos.x).toBe(200)
      expect(canvasPos.y).toBe(200)
    })
  })

  describe('unproject', () => {
    it('should unproject canvas coordinates to screen coordinates', () => {
      const transform: ViewportTransform = { x: 100, y: 50, zoom: 2 }
      const canvasPos = { x: 100, y: 100 }
      const screenPos = unproject(canvasPos, transform)
      expect(screenPos).toEqual({ x: 300, y: 250 })
    })

    it('should be inverse of project', () => {
      const transform: ViewportTransform = { x: 100, y: 50, zoom: 2 }
      const originalScreen = { x: 500, y: 300 }
      const canvas = project(originalScreen, transform)
      const restored = unproject(canvas, transform)
      expect(restored).toEqual(originalScreen)
    })
  })

  describe('isNodeVisible', () => {
    const transform: ViewportTransform = { x: 0, y: 0, zoom: 1 }
    const viewportWidth = 800
    const viewportHeight = 600

    it('should return true for node within viewport', () => {
      const node = {
        position: { x: 100, y: 100 },
        width: 100,
        height: 100
      }
      expect(isNodeVisible(node, transform, viewportWidth, viewportHeight)).toBe(true)
    })

    it('should return true for node at viewport edge', () => {
      const node = {
        position: { x: 0, y: 0 },
        width: 100,
        height: 100
      }
      expect(isNodeVisible(node, transform, viewportWidth, viewportHeight)).toBe(true)
    })

    it('should return false for node completely outside viewport', () => {
      const node = {
        position: { x: 2000, y: 2000 },
        width: 100,
        height: 100
      }
      expect(isNodeVisible(node, transform, viewportWidth, viewportHeight)).toBe(false)
    })

    it('should return true for node with zero dimensions', () => {
      const node = {
        position: { x: 100, y: 100 },
        width: 0,
        height: 0
      }
      expect(isNodeVisible(node, transform, viewportWidth, viewportHeight)).toBe(true)
    })

    it('should handle zoomed viewport', () => {
      const zoomedTransform: ViewportTransform = { x: 0, y: 0, zoom: 2 }
      const node = {
        position: { x: 100, y: 100 },
        width: 100,
        height: 100
      }
      expect(isNodeVisible(node, zoomedTransform, viewportWidth, viewportHeight)).toBe(true)
    })
  })
})
