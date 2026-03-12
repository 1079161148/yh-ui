import { describe, it, expect } from 'vitest'
import {
  canvasToScreen,
  screenToCanvas,
  projectNodePosition,
  snapToGrid,
  snapPositionToGrid
} from '../utils/transform'

describe('flow/utils/transform', () => {
  it('screenToCanvas and canvasToScreen should be inverse (basic)', () => {
    const t = { x: 100, y: 50, zoom: 2 }
    const screen = { x: 300, y: 250 }

    const canvas = screenToCanvas(screen.x, screen.y, t)
    const back = canvasToScreen(canvas.x, canvas.y, t)

    expect(back.x).toBe(screen.x)
    expect(back.y).toBe(screen.y)
  })

  it('projectNodePosition should transform between viewports', () => {
    const from = { x: 10, y: 20, zoom: 2 }
    const to = { x: -5, y: 15, zoom: 1 }
    const p = { x: 110, y: 220 } // screen coords in "from"

    const projected = projectNodePosition(p, from, to)
    // Equivalent: screen->canvas (from), then canvas->screen (to)
    const canvas = screenToCanvas(p.x, p.y, from)
    const expected = canvasToScreen(canvas.x, canvas.y, to)

    expect(projected).toEqual(expected)
  })

  it('snapToGrid should round to nearest grid', () => {
    expect(snapToGrid(0, 10)).toBe(0)
    expect(snapToGrid(4, 10)).toBe(0)
    expect(snapToGrid(5, 10)).toBe(10)
    expect(snapToGrid(14, 10)).toBe(10)
    expect(snapToGrid(15, 10)).toBe(20)
  })

  it('snapPositionToGrid should snap x/y independently', () => {
    const p = snapPositionToGrid({ x: 17, y: 23 }, [10, 5])
    expect(p).toEqual({ x: 20, y: 25 })
  })
})
