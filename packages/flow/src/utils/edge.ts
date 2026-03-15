import type { Position, EdgeType } from '../types'

export interface EdgePathParams {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  /** 控制曲率，0~1，默认 0.25 */
  curvature?: number
}

/** 获取方向向量 */
function getDir(pos: Position): { x: number; y: number } {
  switch (pos) {
    case 'top':
      return { x: 0, y: -1 }
    case 'bottom':
      return { x: 0, y: 1 }
    case 'right':
      return { x: 1, y: 0 }
    case 'left':
      return { x: -1, y: 0 }
  }
}

/**
 * 获取从源位置到目标位置的偏移量（向后兼容）
 */
export function getEdgePosition(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  _sourcePosition: Position,
  _targetPosition: Position
): { sx: number; sy: number; tx: number; ty: number } {
  return { sx: sourceX, sy: sourceY, tx: targetX, ty: targetY }
}

/**
 * 生成高质量贝塞尔曲线路径（参考 vue-flow 实现）
 * 控制点偏移量基于两节点的距离动态计算，保证平滑
 */
export function getBezierPath(params: EdgePathParams): string {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature = 0.25
  } = params

  const srcDir = getDir(sourcePosition)
  const tgtDir = getDir(targetPosition)

  const dx = Math.abs(targetX - sourceX)
  const dy = Math.abs(targetY - sourceY)
  const dist = Math.sqrt(dx * dx + dy * dy)

  // 控制点偏移：动态，最小 20px，最大 dist/2
  const offset = Math.min(Math.max(dist * curvature, 20), dist / 2)

  const c1x = sourceX + srcDir.x * offset
  const c1y = sourceY + srcDir.y * offset
  const c2x = targetX + tgtDir.x * offset
  const c2y = targetY + tgtDir.y * offset

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
 * 生成阶梯线路径（水平/垂直直角转弯）
 */
export function getStepPath(params: EdgePathParams): string {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = params

  const srcIsHoriz = sourcePosition === 'left' || sourcePosition === 'right'
  const tgtIsHoriz = targetPosition === 'left' || targetPosition === 'right'

  if (srcIsHoriz && !tgtIsHoriz) {
    const midX = (sourceX + targetX) / 2
    return `M${sourceX},${sourceY} L${midX},${sourceY} L${midX},${targetY} L${targetX},${targetY}`
  } else if (!srcIsHoriz && tgtIsHoriz) {
    const midY = (sourceY + targetY) / 2
    return `M${sourceX},${sourceY} L${sourceX},${midY} L${targetX},${midY} L${targetX},${targetY}`
  } else if (srcIsHoriz && tgtIsHoriz) {
    const midX = (sourceX + targetX) / 2
    return `M${sourceX},${sourceY} L${midX},${sourceY} L${midX},${targetY} L${targetX},${targetY}`
  } else {
    const midY = (sourceY + targetY) / 2
    return `M${sourceX},${sourceY} L${sourceX},${midY} L${targetX},${midY} L${targetX},${targetY}`
  }
}

/**
 * 生成平滑阶梯线路径（带圆角转折的 step）
 */
export function getSmoothStepPath(params: EdgePathParams): string {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = params

  const srcDir = getDir(sourcePosition)
  const tgtDir = getDir(targetPosition)

  const dx = Math.abs(targetX - sourceX)
  const dy = Math.abs(targetY - sourceY)
  const r = Math.min(10, Math.min(dx, dy) / 2) // 圆角半径

  const srcIsHoriz = sourcePosition === 'left' || sourcePosition === 'right'

  if (srcIsHoriz) {
    const midX = (sourceX + targetX) / 2
    // 水平折弯
    const sign1X = srcDir.x
    const sign2Y = tgtDir.y || (targetY > sourceY ? 1 : -1)
    return [
      `M${sourceX},${sourceY}`,
      `L${midX - sign1X * r},${sourceY}`,
      `Q${midX},${sourceY} ${midX},${sourceY + sign2Y * r}`,
      `L${midX},${targetY - sign2Y * r}`,
      `Q${midX},${targetY} ${midX + sign1X * r},${targetY}`,
      `L${targetX},${targetY}`
    ].join(' ')
  } else {
    const midY = (sourceY + targetY) / 2
    const sign1Y = srcDir.y
    const sign2X = tgtDir.x || (targetX > sourceX ? 1 : -1)
    return [
      `M${sourceX},${sourceY}`,
      `L${sourceX},${midY - sign1Y * r}`,
      `Q${sourceX},${midY} ${sourceX + sign2X * r},${midY}`,
      `L${targetX - sign2X * r},${midY}`,
      `Q${targetX},${midY} ${targetX},${midY + sign1Y * r}`,
      `L${targetX},${targetY}`
    ].join(' ')
  }
}

/**
 * 根据类型获取连线路径
 */
export function getEdgePath(type: EdgeType | 'default', params: EdgePathParams): string {
  switch (type) {
    case 'bezier':
    case 'default':
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
 * 计算连线的中心点（用于标签放置）
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

/**
 * 计算给定方向需要缩短路径的终点（使箭头尖端落在 handle 边缘）
 * @param x 终点 x
 * @param y 终点 y
 * @param fromX 起点 x（用于计算方向）
 * @param fromY 起点 y
 * @param offset 回退距离（px）
 */
export function shortenEndpoint(
  x: number,
  y: number,
  fromX: number,
  fromY: number,
  offset: number
): { x: number; y: number } {
  const dx = x - fromX
  const dy = y - fromY
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist < offset * 2) return { x, y }
  const factor = offset / dist
  return { x: x - dx * factor, y: y - dy * factor }
}
