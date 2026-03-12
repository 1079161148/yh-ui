import type { Position, EdgeType } from '../types'

export interface EdgePathParams {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
}

/**
 * 获取从源位置到目标位置的偏移量
 */
export function getEdgePosition(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: Position,
  targetPosition: Position
): { sx: number; sy: number; tx: number; ty: number } {
  const sourceDir = getDirection(sourcePosition)
  const targetDir = getDirection(targetPosition)

  return {
    sx: sourceX + sourceDir.x * 0,
    sy: sourceY + sourceDir.y * 0,
    tx: targetX + targetDir.x * 0,
    ty: targetY + targetDir.y * 0
  }
}

/**
 * 获取方向向量
 */
function getDirection(position: Position): { x: number; y: number } {
  switch (position) {
    case 'top':
      return { x: 0, y: -1 }
    case 'right':
      return { x: 1, y: 0 }
    case 'bottom':
      return { x: 0, y: 1 }
    case 'left':
      return { x: -1, y: 0 }
    default:
      return { x: 0, y: 0 }
  }
}

/**
 * 计算贝塞尔曲线的控制点
 */
function getBezierControlPoints(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: Position,
  targetPosition: Position
): { c1x: number; c1y: number; c2x: number; c2y: number } {
  const sourceDir = getDirection(sourcePosition)
  const targetDir = getDirection(targetPosition)

  const curvature = 0.5
  const gap = 50

  const c1x = sourceX + sourceDir.x * gap
  const c1y = sourceY + sourceDir.y * gap
  const c2x = targetX + targetDir.x * gap
  const c2y = targetY + targetDir.y * gap

  return {
    c1x: c1x + (c2x - c1x) * curvature * sourceDir.x,
    c1y: c1y + (c2y - c1y) * curvature * sourceDir.y,
    c2x: c2x + (c1x - c2x) * curvature * targetDir.x,
    c2y: c2y + (c1y - c2y) * curvature * targetDir.y
  }
}

/**
 * 生成贝塞尔曲线路径
 */
export function getBezierPath(params: EdgePathParams): string {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = params

  const { c1x, c1y, c2x, c2y } = getBezierControlPoints(
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  )

  return `M${sourceX},${sourceY} C${c1x},${c1y} ${c2x},${c2y} ${targetX},${targetY}`
}

/**
 * 生成直线路径
 */
export function getStraightPath(params: EdgePathParams): string {
  const { sourceX, sourceY, targetX, targetY } = params

  return `M${sourceX},${sourceY} L${targetX},${targetY}`
}

/**
 * 生成阶梯线路径（水平/垂直）
 */
export function getStepPath(params: EdgePathParams): string {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = params

  const isHorizontal = sourcePosition === 'left' || sourcePosition === 'right'
  const isTargetHorizontal = targetPosition === 'left' || targetPosition === 'right'

  if (isHorizontal && !isTargetHorizontal) {
    const midX = (sourceX + targetX) / 2
    return `M${sourceX},${sourceY} L${midX},${sourceY} L${midX},${targetY} L${targetX},${targetY}`
  } else if (!isHorizontal && isTargetHorizontal) {
    const midY = (sourceY + targetY) / 2
    return `M${sourceX},${sourceY} L${sourceX},${midY} L${targetX},${midY} L${targetX},${targetY}`
  } else {
    return `M${sourceX},${sourceY} L${targetX},${targetY}`
  }
}

/**
 * 生成平滑阶梯线路径
 */
export function getSmoothStepPath(params: EdgePathParams): string {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = params

  const sourceDir = getDirection(sourcePosition)
  const targetDir = getDirection(targetPosition)

  const controlOffset = Math.min(Math.abs(targetX - sourceX), Math.abs(targetY - sourceY)) / 2

  const c1x = sourceX + sourceDir.x * controlOffset
  const c1y = sourceY + sourceDir.y * controlOffset
  const c2x = targetX - targetDir.x * controlOffset
  const c2y = targetY - targetDir.y * controlOffset

  return `M${sourceX},${sourceY} L${c1x},${c1y} L${c2x},${c2y} L${targetX},${targetY}`
}

/**
 * 根据类型获取连线路径
 */
export function getEdgePath(type: EdgeType | 'default', params: EdgePathParams): string {
  switch (type) {
    case 'bezier':
      return getBezierPath(params)
    case 'straight':
      return getStraightPath(params)
    case 'step':
      return getStepPath(params)
    case 'smoothstep':
      return getSmoothStepPath(params)
    default:
      return getBezierPath(params)
  }
}

/**
 * 计算连线的中心点
 */
export function getEdgeCenter(params: EdgePathParams): {
  x: number
  y: number
  ox: number
  oy: number
} {
  const { sourceX, sourceY, targetX, targetY } = params

  return {
    x: (sourceX + targetX) / 2,
    y: (sourceY + targetY) / 2,
    ox: (targetX - sourceX) / 2,
    oy: (targetY - sourceY) / 2
  }
}
