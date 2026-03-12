import type { NodePosition } from './node'

export interface ViewportTransform {
  x: number
  y: number
  zoom: number
}

export interface ViewportOptions {
  minZoom?: number
  maxZoom?: number
  translateExtent?: [[number, number], [number, number]]
  zoomStep?: number
  panZoomSpeed?: number
  zoomInMultiplier?: number
  zoomOutMultiplier?: number
  panning?: boolean
  zooming?: boolean
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnDrag?: boolean
  fitViewOnInit?: boolean
  fitViewOnInitOptions?: FitViewOptions
}

export interface FitViewOptions {
  padding?: number
  includeHiddenNodes?: boolean
  minZoom?: number
  maxZoom?: number
}

export interface ScreenToFlowPositionOptions {
  offset?: { x: number; y: number }
  snapToGrid?: boolean
  gridSize?: number
}

export function getViewportForBounds(
  bounds: { x: number; y: number; width: number; height: number },
  width: number,
  height: number,
  minZoom: number,
  maxZoom: number,
  padding = 0.2
): ViewportTransform {
  const x = width / 2 - (bounds.x + bounds.width / 2) * minZoom
  const y = height / 2 - (bounds.y + bounds.height / 2) * minZoom

  const zoom = Math.min(
    (width * (1 - padding * 2)) / bounds.width,
    (height * (1 - padding * 2)) / bounds.height
  )

  return {
    x,
    y,
    zoom: Math.min(Math.max(zoom, minZoom), maxZoom)
  }
}

export function project(
  position: { x: number; y: number },
  transform: ViewportTransform
): { x: number; y: number } {
  return {
    x: (position.x - transform.x) / transform.zoom,
    y: (position.y - transform.y) / transform.zoom
  }
}

export function unproject(
  position: { x: number; y: number },
  transform: ViewportTransform
): { x: number; y: number } {
  return {
    x: position.x * transform.zoom + transform.x,
    y: position.y * transform.zoom + transform.y
  }
}

export function isNodeVisible(
  node: { position: NodePosition; width?: number; height?: number },
  transform: ViewportTransform,
  width: number,
  height: number
): boolean {
  const nodeWidth = node.width ?? 0
  const nodeHeight = node.height ?? 0
  const paddedWidth = width * 1.5
  const paddedHeight = height * 1.5
  const nodeX = node.position.x * transform.zoom + transform.x
  const nodeY = node.position.y * transform.zoom + transform.y
  const scaledNodeWidth = nodeWidth * transform.zoom
  const scaledNodeHeight = nodeHeight * transform.zoom

  return (
    nodeX + scaledNodeWidth > -paddedWidth &&
    nodeX < paddedWidth + width &&
    nodeY + scaledNodeHeight > -paddedHeight &&
    nodeY < paddedHeight + height
  )
}
