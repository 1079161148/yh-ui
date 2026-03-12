import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import type { ViewportTransform } from '../types'
import { useViewport } from '../core/useViewport'

describe('flow/core/useViewport', () => {
  it('should set viewport and clamp zoom to min/max', () => {
    const transform = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const v = useViewport(transform, { minZoom: 0.2, maxZoom: 4 })

    v.setViewport(10, 20, 2)
    expect(transform.value).toEqual({ x: 10, y: 20, zoom: 2 })

    v.setViewport(0, 0, 0.1)
    expect(transform.value.zoom).toBe(0.2)

    v.setViewport(0, 0, 10)
    expect(transform.value.zoom).toBe(4)
  })

  it('should zoom in and out', () => {
    const transform = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const v = useViewport(transform, { minZoom: 0.1, maxZoom: 5 })

    v.zoomIn(2)
    expect(transform.value.zoom).toBe(2)

    v.zoomOut(2)
    expect(transform.value.zoom).toBe(1)
  })

  it('should pan', () => {
    const transform = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const v = useViewport(transform)

    v.pan(50, 30)
    expect(transform.value.x).toBe(50)
    expect(transform.value.y).toBe(30)
  })

  it('should panTo', () => {
    const transform = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const v = useViewport(transform)

    v.panTo(100, 200)
    expect(transform.value.x).toBe(100)
    expect(transform.value.y).toBe(200)
  })

  it('should fitView to contain nodes', () => {
    const transform = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const v = useViewport(transform, { minZoom: 0.1, maxZoom: 5 })

    const nodes = [
      { position: { x: 0, y: 0 }, width: 100, height: 50 },
      { position: { x: 200, y: 100 }, width: 100, height: 50 }
    ]

    v.fitView({ width: 400, height: 300 }, nodes, { padding: 20 })

    expect(transform.value.zoom).toBeLessThanOrEqual(1)
    expect(typeof transform.value.x).toBe('number')
    expect(typeof transform.value.y).toBe('number')
  })

  it('should not fitView when nodes empty', () => {
    const transform = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 })
    const v = useViewport(transform)

    v.fitView({ width: 400, height: 300 }, [], { padding: 20 })

    expect(transform.value).toEqual({ x: 50, y: 50, zoom: 1 })
  })

  it('screenToCanvas and canvasToScreen should be inverse', () => {
    const transform = ref<ViewportTransform>({ x: 100, y: 50, zoom: 2 })
    const v = useViewport(transform)

    const screen = { x: 300, y: 250 }
    const canvas = v.screenToCanvas(screen.x, screen.y)
    const back = v.canvasToScreen(canvas.x, canvas.y)

    expect(back.x).toBe(screen.x)
    expect(back.y).toBe(screen.y)
  })

  it('isNodeVisible should return true when node in view', () => {
    const transform = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
    const v = useViewport(transform)

    const visible = v.isNodeVisible(
      { x: 50, y: 50, width: 100, height: 50 },
      { width: 800, height: 600 }
    )
    expect(visible).toBe(true)
  })

  it('isNodeVisible should return false when node outside view', () => {
    const transform = ref<ViewportTransform>({ x: -2000, y: 0, zoom: 1 })
    const v = useViewport(transform)

    const visible = v.isNodeVisible(
      { x: 50, y: 50, width: 100, height: 50 },
      { width: 800, height: 600 }
    )
    expect(visible).toBe(false)
  })
})
