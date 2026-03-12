import { describe, it, expect } from 'vitest'
import {
  isPointInRect,
  rectIntersect,
  getRectIntersection,
  getBoundingBox,
  getNodeBounds,
  pointToLineDistance,
  pointToPointDistance,
  degToRad,
  radToDeg,
  getLineIntersection,
  getAngle,
  pointToRectDistance,
  viewportIntersectsBounds
} from '../utils/geometry'

describe('flow/utils/geometry', () => {
  it('isPointInRect', () => {
    expect(isPointInRect({ x: 50, y: 50 }, { x: 0, y: 0, width: 100, height: 100 })).toBe(true)
    expect(isPointInRect({ x: 150, y: 50 }, { x: 0, y: 0, width: 100, height: 100 })).toBe(false)
  })

  it('rectIntersect', () => {
    expect(
      rectIntersect({ x: 0, y: 0, width: 50, height: 50 }, { x: 25, y: 25, width: 50, height: 50 })
    ).toBe(true)
    expect(
      rectIntersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 20, y: 20, width: 10, height: 10 })
    ).toBe(false)
  })

  it('getRectIntersection', () => {
    const r = getRectIntersection(
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 50, y: 50, width: 100, height: 100 }
    )
    expect(r).not.toBeNull()
    expect(r!.x).toBe(50)
    expect(r!.y).toBe(50)
    expect(r!.width).toBe(50)
    expect(r!.height).toBe(50)
  })

  it('getBoundingBox empty returns zeros', () => {
    const box = getBoundingBox([])
    expect(box).toEqual({ x: 0, y: 0, width: 0, height: 0 })
  })

  it('getBoundingBox multiple points', () => {
    const box = getBoundingBox([
      { x: 10, y: 20 },
      { x: 30, y: 5 }
    ])
    expect(box.x).toBe(10)
    expect(box.y).toBe(5)
    expect(box.width).toBe(20)
    expect(box.height).toBe(15)
  })

  it('getNodeBounds', () => {
    const nodes = [
      { position: { x: 0, y: 0 }, width: 50, height: 50 },
      { position: { x: 100, y: 100 }, width: 50, height: 50 }
    ]
    const bounds = getNodeBounds(nodes)
    expect(bounds.x).toBe(0)
    expect(bounds.y).toBe(0)
    expect(bounds.width).toBe(150)
    expect(bounds.height).toBe(150)
  })

  it('pointToLineDistance', () => {
    const d = pointToLineDistance({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 })
    expect(d).toBeGreaterThanOrEqual(0)
  })

  it('pointToPointDistance', () => {
    expect(pointToPointDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5)
  })

  it('degToRad and radToDeg', () => {
    expect(degToRad(180)).toBeCloseTo(Math.PI)
    expect(radToDeg(Math.PI)).toBeCloseTo(180)
  })

  it('getLineIntersection', () => {
    const p = getLineIntersection(
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
      { x: 10, y: 0 }
    )
    expect(p).not.toBeNull()
    expect(typeof p!.x).toBe('number')
    expect(typeof p!.y).toBe('number')
  })

  it('getAngle', () => {
    const a = getAngle({ x: 0, y: 0 }, { x: 1, y: 0 })
    expect(a).toBe(0)
  })

  it('pointToRectDistance', () => {
    const d = pointToRectDistance({ x: -10, y: 50 }, { x: 0, y: 0, width: 100, height: 100 })
    expect(d).toBe(10)
  })

  it('viewportIntersectsBounds', () => {
    expect(
      viewportIntersectsBounds(
        { x: 0, y: 0, width: 800, height: 600 },
        { x: 0, y: 0, width: 1000, height: 1000 },
        1
      )
    ).toBe(true)
  })
})
