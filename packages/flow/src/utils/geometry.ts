/**
 * 判断点是否在矩形内
 */
export function isPointInRect(
  point: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  )
}

/**
 * 判断两个矩形是否相交
 */
export function rectIntersect(
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect2.x + rect2.width < rect1.x ||
    rect1.y + rect1.height < rect2.y ||
    rect2.y + rect2.height < rect1.y
  )
}

/**
 * 获取两个矩形的交集
 */
export function getRectIntersection(
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): { x: number; y: number; width: number; height: number } | null {
  if (!rectIntersect(rect1, rect2)) {
    return null
  }

  const x = Math.max(rect1.x, rect2.x)
  const y = Math.max(rect1.y, rect2.y)
  const width = Math.min(rect1.x + rect1.width, rect2.x + rect2.x) - x
  const height = Math.min(rect1.y + rect1.height, rect2.y + rect2.height) - y

  return { x, y, width, height }
}

/**
 * 获取包含多个点的最小矩形
 */
export function getBoundingBox(points: { x: number; y: number }[]): {
  x: number
  y: number
  width: number
  height: number
} {
  if (points.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 }
  }

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const point of points) {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

/**
 * 获取节点边界框
 */
export function getNodeBounds(
  nodes: { position: { x: number; y: number }; width?: number; height?: number }[]
): { x: number; y: number; width: number; height: number } {
  const points = nodes.flatMap((node) => {
    const w = node.width || 0
    const h = node.height || 0
    return [
      { x: node.position.x, y: node.position.y },
      { x: node.position.x + w, y: node.position.y + h }
    ]
  })

  return getBoundingBox(points)
}

/**
 * 计算点到直线的距离
 */
export function pointToLineDistance(
  point: { x: number; y: number },
  lineStart: { x: number; y: number },
  lineEnd: { x: number; y: number }
): number {
  const A = point.x - lineStart.x
  const B = point.y - lineStart.y
  const C = lineEnd.x - lineStart.x
  const D = lineEnd.y - lineStart.y

  const dot = A * C + B * D
  const lenSq = C * C + D * D
  let param = -1
  if (lenSq !== 0) {
    param = dot / lenSq
  }

  let xx: number
  let yy: number

  if (param < 0) {
    xx = lineStart.x
    yy = lineStart.y
  } else if (param > 1) {
    xx = lineEnd.x
    yy = lineEnd.y
  } else {
    xx = lineStart.x + param * C
    yy = lineStart.y + param * D
  }

  const dx = point.x - xx
  const dy = point.y - yy

  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * 计算点到点的距离
 */
export function pointToPointDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * 角度转弧度
 */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/**
 * 弧度转角度
 */
export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI
}

/**
 * 计算两条线的交点
 */
export function getLineIntersection(
  line1Start: { x: number; y: number },
  line1End: { x: number; y: number },
  line2Start: { x: number; y: number },
  line2End: { x: number; y: number }
): { x: number; y: number } | null {
  const d1x = line1End.x - line1Start.x
  const d1y = line1End.y - line1Start.y
  const d2x = line2End.x - line2Start.x
  const d2y = line2End.y - line2Start.y

  const cross = d1x * d2y - d1y * d2x

  if (Math.abs(cross) < 1e-10) {
    return null
  }

  const d = {
    x: line1Start.x - line2Start.x,
    y: line1Start.y - line2Start.y
  }

  const t = (d.x * d2y - d.y * d2x) / cross

  return {
    x: line1Start.x + t * d1x,
    y: line1Start.y + t * d1y
  }
}

/**
 * 获取角度
 */
export function getAngle(from: { x: number; y: number }, to: { x: number; y: number }): number {
  return Math.atan2(to.y - from.y, to.x - from.x)
}

/**
 * 获取从原点到目标点的角度
 */
export function getAngleBetweenPoints(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  origin: { x: number; y: number }
): number {
  return Math.atan2(p2.y - origin.y, p2.x - origin.x) - Math.atan2(p1.y - origin.y, p1.x - origin.x)
}

/**
 * 角度规范化到 [-PI, PI]
 */
export function angleToCanvasCoordinateSystem(angle: number): number {
  return -angle
}

/**
 * 判断点是否在多边形内
 */
export function isPointInPolygon(
  point: { x: number; y: number },
  polygon: { x: number; y: number }[]
): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y

    const intersect =
      yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi

    if (intersect) {
      inside = !inside
    }
  }

  return inside
}

/**
 * 点到矩形边缘的最短距离
 */
export function pointToRectDistance(
  point: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
): number {
  const rectRight = rect.x + rect.width
  const rectBottom = rect.y + rect.height

  const dx = Math.max(rect.x - point.x, 0, point.x - rectRight)
  const dy = Math.max(rect.y - point.y, 0, point.y - rectBottom)

  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * 检查视口是否与边界相交（用于虚拟滚动）
 */
export function viewportIntersectsBounds(
  viewport: { x: number; y: number; width: number; height: number },
  bounds: { x: number; y: number; width: number; height: number },
  zoom: number
): boolean {
  const scaledBounds = {
    x: bounds.x * zoom,
    y: bounds.y * zoom,
    width: bounds.width * zoom,
    height: bounds.height * zoom
  }

  return rectIntersect(viewport, scaledBounds)
}
