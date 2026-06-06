import { type Ref } from 'vue'
import type { ViewportTransform } from '../types'
import { screenToCanvas, canvasToScreen } from '../utils/transform'

export interface UseViewportOptions {
  minZoom?: number
  maxZoom?: number
  zoomStep?: number
  panZoomSpeed?: number
}

export interface UseViewportReturn {
  transform: Ref<ViewportTransform>
  setTransform: (transform: ViewportTransform) => void
  setViewport: (x: number, y: number, zoom: number) => void
  zoomIn: (factor?: number) => void
  zoomOut: (factor?: number) => void
  zoomTo: (zoom: number, point?: { x: number; y: number }) => void
  pan: (dx: number, dy: number) => void
  panTo: (x: number, y: number) => void
  fitView: (
    bounds: { width: number; height: number },
    nodes: { position: { x: number; y: number }; width?: number; height?: number }[],
    options?: { padding?: number }
  ) => void
  center: (
    bounds: { width: number; height: number },
    nodes: { position: { x: number; y: number }; width?: number; height?: number }[],
    options?: { padding?: number }
  ) => void
  screenToCanvas: (screenX: number, screenY: number) => { x: number; y: number }
  canvasToScreen: (canvasX: number, canvasY: number) => { x: number; y: number }
  isNodeVisible: (
    nodeBounds: { x: number; y: number; width: number; height: number },
    containerBounds: { width: number; height: number }
  ) => boolean
}

export function useViewport(
  initialTransform: Ref<ViewportTransform>,
  options: UseViewportOptions = {}
): UseViewportReturn {
  const { minZoom = 0.1, maxZoom = 5, zoomStep: _zoomStep = 0.1, panZoomSpeed = 1 } = options

  const transform = initialTransform

  const setTransform = (newTransform: ViewportTransform) => {
    transform.value = {
      x: newTransform.x,
      y: newTransform.y,
      zoom: Math.min(Math.max(newTransform.zoom, minZoom), maxZoom)
    }
  }

  const setViewport = (x: number, y: number, zoom: number) => {
    setTransform({ x, y, zoom })
  }

  const zoomIn = (factor: number = 1.2) => {
    const newZoom = Math.min(transform.value.zoom * factor, maxZoom)
    transform.value = { ...transform.value, zoom: newZoom }
  }

  const zoomOut = (factor: number = 1.2) => {
    const newZoom = Math.max(transform.value.zoom / factor, minZoom)
    transform.value = { ...transform.value, zoom: newZoom }
  }

  const zoomTo = (zoom: number, point?: { x: number; y: number }) => {
    const boundedZoom = Math.min(Math.max(zoom, minZoom), maxZoom)
    if (!point) {
      transform.value = { ...transform.value, zoom: boundedZoom }
      return
    }

    const canvasPoint = screenToCanvas(point.x, point.y, transform.value)
    const newTransform: ViewportTransform = {
      ...transform.value,
      zoom: boundedZoom
    }
    const screenPoint = canvasToScreen(canvasPoint.x, canvasPoint.y, newTransform)
    const dx = point.x - screenPoint.x
    const dy = point.y - screenPoint.y

    transform.value = {
      ...newTransform,
      x: newTransform.x + dx,
      y: newTransform.y + dy
    }
  }

  const pan = (dx: number, dy: number) => {
    transform.value = {
      ...transform.value,
      x: transform.value.x + dx * panZoomSpeed,
      y: transform.value.y + dy * panZoomSpeed
    }
  }

  const panTo = (x: number, y: number) => {
    transform.value = { ...transform.value, x, y }
  }

  const fitView = (
    bounds: { width: number; height: number },
    nodes: { position: { x: number; y: number }; width?: number; height?: number }[],
    options: { padding?: number } = {}
  ) => {
    if (nodes.length === 0) return

    const padding = options.padding ?? 50

    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    for (const node of nodes) {
      const w = node.width || 200
      const h = node.height || 50
      minX = Math.min(minX, node.position.x)
      minY = Math.min(minY, node.position.y)
      maxX = Math.max(maxX, node.position.x + w)
      maxY = Math.max(maxY, node.position.y + h)
    }

    const graphWidth = maxX - minX + padding * 2
    const graphHeight = maxY - minY + padding * 2

    const zoomX = bounds.width / graphWidth
    const zoomY = bounds.height / graphHeight
    const zoom = Math.min(zoomX, zoomY, 1)

    const x = (bounds.width - graphWidth * zoom) / 2 - minX * zoom + padding * zoom
    const y = (bounds.height - graphHeight * zoom) / 2 - minY * zoom + padding * zoom

    setTransform({ x, y, zoom })
  }

  const center = (
    bounds: { width: number; height: number },
    nodes: { position: { x: number; y: number }; width?: number; height?: number }[],
    options: { padding?: number } = {}
  ) => {
    if (nodes.length === 0) return

    const padding = options.padding ?? 50

    let centerX = 0
    let centerY = 0

    for (const node of nodes) {
      const w = node.width || 200
      const h = node.height || 50
      centerX += node.position.x + w / 2
      centerY += node.position.y + h / 2
    }

    centerX /= nodes.length
    centerY /= nodes.length

    const x = bounds.width / 2 - centerX * transform.value.zoom + padding
    const y = bounds.height / 2 - centerY * transform.value.zoom + padding

    panTo(x, y)
  }

  const _screenToCanvas = (screenX: number, screenY: number) => {
    return screenToCanvas(screenX, screenY, transform.value)
  }

  const _canvasToScreen = (canvasX: number, canvasY: number) => {
    return canvasToScreen(canvasX, canvasY, transform.value)
  }

  const isNodeVisible = (
    nodeBounds: { x: number; y: number; width: number; height: number },
    containerBounds: { width: number; height: number }
  ): boolean => {
    const padding = 100
    const visibleBounds = {
      x: -transform.value.x / transform.value.zoom - padding,
      y: -transform.value.y / transform.value.zoom - padding,
      width: containerBounds.width / transform.value.zoom + padding * 2,
      height: containerBounds.height / transform.value.zoom + padding * 2
    }

    return !(
      nodeBounds.x + nodeBounds.width < visibleBounds.x ||
      nodeBounds.x > visibleBounds.x + visibleBounds.width ||
      nodeBounds.y + nodeBounds.height < visibleBounds.y ||
      nodeBounds.y > visibleBounds.y + visibleBounds.height
    )
  }

  return {
    transform,
    setTransform,
    setViewport,
    zoomIn,
    zoomOut,
    zoomTo,
    pan,
    panTo,
    fitView,
    center,
    screenToCanvas: _screenToCanvas,
    canvasToScreen: _canvasToScreen,
    isNodeVisible
  }
}
