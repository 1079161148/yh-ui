import { describe, it, expect } from 'vitest'
import {
  getEdgePath,
  getStraightPath,
  getBezierPath,
  getStepPath,
  getSmoothStepPath,
  getEdgeCenter,
  getEdgePosition
} from '../utils/edge'

const params = {
  sourceX: 0,
  sourceY: 0,
  targetX: 100,
  targetY: 80,
  sourcePosition: 'right' as const,
  targetPosition: 'left' as const
}

describe('flow/utils/edge', () => {
  it('getStraightPath should return M and L', () => {
    const d = getStraightPath(params)
    expect(d).toMatch(/^M\d+,\d+\s+L\d+,\d+$/)
    expect(d).toContain('M0,0')
    expect(d).toContain('L100,80')
  })

  it('getBezierPath should return M and C', () => {
    const d = getBezierPath(params)
    expect(d).toMatch(/^M\d+,\d+\s+C[\d.,\s]+$/)
    expect(d).toContain('M0,0')
    expect(d).toContain('C')
  })

  it('getStepPath should return path with L segments', () => {
    const d = getStepPath(params)
    expect(d).toMatch(/^M[\d.,]+(?:\s+L[\d.,]+)+$/)
  })

  it('getSmoothStepPath should return path with M and L', () => {
    const d = getSmoothStepPath(params)
    expect(d).toContain('M')
    expect(d).toContain('L')
  })

  it('getEdgePath should dispatch by type', () => {
    expect(getEdgePath('straight', params)).toContain('L')
    expect(getEdgePath('bezier', params)).toContain('C')
    expect(getEdgePath('step', params)).toContain('M')
    expect(getEdgePath('smoothstep', params)).toContain('M')
    expect(getEdgePath('default', params)).toContain('C')
  })

  it('getEdgeCenter should return midpoint', () => {
    const c = getEdgeCenter(params)
    expect(c.x).toBe(50)
    expect(c.y).toBe(40)
    expect(c.ox).toBe(50)
    expect(c.oy).toBe(40)
  })

  it('getEdgePosition should return source/target with direction offset', () => {
    const pos = getEdgePosition(
      params.sourceX,
      params.sourceY,
      params.targetX,
      params.targetY,
      params.sourcePosition,
      params.targetPosition
    )
    expect(pos).toHaveProperty('sx')
    expect(pos).toHaveProperty('sy')
    expect(pos).toHaveProperty('tx')
    expect(pos).toHaveProperty('ty')
  })
})
