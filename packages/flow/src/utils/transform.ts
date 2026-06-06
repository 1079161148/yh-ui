import type { Coordinate, ViewportTransform } from '../types'

/**
 * 屏幕坐标转换为画布坐标
 */
export function screenToCanvas(
  screenX: number,
  screenY: number,
  transform: ViewportTransform
): Coordinate {
  return {
    x: (screenX - transform.x) / transform.zoom,
    y: (screenY - transform.y) / transform.zoom
  }
}

/**
 * 画布坐标转换为屏幕坐标
 */
export function canvasToScreen(
  canvasX: number,
  canvasY: number,
  transform: ViewportTransform
): Coordinate {
  return {
    x: canvasX * transform.zoom + transform.x,
    y: canvasY * transform.zoom + transform.y
  }
}

/**
 * 将节点坐标从一个视口转换到另一个视口
 */
export function projectNodePosition(
  position: Coordinate,
  fromTransform: ViewportTransform,
  toTransform: ViewportTransform
): Coordinate {
  const canvasPos = screenToCanvas(position.x, position.y, fromTransform)
  return canvasToScreen(canvasPos.x, canvasPos.y, toTransform)
}

/**
 * 获取元素在屏幕上的位置
 */
export function getElementPosition(element: HTMLElement, container: HTMLElement): Coordinate {
  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  return {
    x: elementRect.left - containerRect.left,
    y: elementRect.top - containerRect.top
  }
}

/**
 * 获取元素在画布上的位置
 */
export function getElementCanvasPosition(
  element: HTMLElement,
  container: HTMLElement,
  transform: ViewportTransform
): Coordinate {
  const screenPos = getElementPosition(element, container)
  return screenToCanvas(screenPos.x, screenPos.y, transform)
}

/**
 * 计算两个位置之间的距离
 */
export function distanceBetweenPoints(p1: Coordinate, p2: Coordinate): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

/**
 * 计算从源位置到目标位置的向量
 */
export function getVector(source: Coordinate, target: Coordinate): Coordinate {
  return {
    x: target.x - source.x,
    y: target.y - source.y
  }
}

/**
 * 获取向量的模（长度）
 */
export function getVectorMagnitude(vector: Coordinate): number {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}

/**
 * 归一化向量
 */
export function normalizeVector(vector: Coordinate): Coordinate {
  const magnitude = getVectorMagnitude(vector)
  if (magnitude === 0) return { x: 0, y: 0 }
  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude
  }
}

/**
 * 将值吸附到网格
 */
export function snapToGrid(value: number, grid: number): number {
  return Math.round(value / grid) * grid
}

/**
 * 将坐标吸附到网格
 */
export function snapPositionToGrid(position: Coordinate, grid: [number, number]): Coordinate {
  return {
    x: snapToGrid(position.x, grid[0]),
    y: snapToGrid(position.y, grid[1])
  }
}
