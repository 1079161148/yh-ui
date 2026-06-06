import { describe, it, expect } from 'vitest'
import { flowProps, flowEmits } from '../flow'

describe('flow/flow', () => {
  describe('flowProps', () => {
    it('should have all required prop definitions', () => {
      expect(flowProps.nodes).toBeDefined()
      expect(flowProps.edges).toBeDefined()
      expect(flowProps.modelValue).toBeDefined()
      expect(flowProps.minZoom).toBeDefined()
      expect(flowProps.maxZoom).toBeDefined()
      expect(flowProps.zoomStep).toBeDefined()
      expect(flowProps.nodesDraggable).toBeDefined()
      expect(flowProps.edgesConnectable).toBeDefined()
      expect(flowProps.selectable).toBeDefined()
      expect(flowProps.background).toBeDefined()
      expect(flowProps.gridSize).toBeDefined()
      expect(flowProps.snapToGrid).toBeDefined()
      expect(flowProps.readonly).toBeDefined()
      expect(flowProps.keyboardShortcuts).toBeDefined()
      expect(flowProps.showControls).toBeDefined()
      expect(flowProps.showMinimap).toBeDefined()
      expect(flowProps.history).toBeDefined()
      expect(flowProps.maxHistory).toBeDefined()
    })

    it('should have correct default values for numbers', () => {
      expect(flowProps.minZoom.default).toBe(0.1)
      expect(flowProps.maxZoom.default).toBe(5)
      expect(flowProps.zoomStep.default).toBe(0.1)
      expect(flowProps.panZoomSpeed.default).toBe(1)
      expect(flowProps.gridSize.default).toBe(20)
      expect(flowProps.maxHistory.default).toBe(50)
      expect(flowProps.virtualizationThreshold.default).toBe(100)
    })

    it('should have correct default values for booleans', () => {
      expect(flowProps.nodesDraggable.default).toBe(true)
      expect(flowProps.edgesConnectable.default).toBe(true)
      expect(flowProps.selectable.default).toBe(true)
      expect(flowProps.snapToGrid.default).toBe(false)
      expect(flowProps.readonly.default).toBe(false)
      expect(flowProps.keyboardShortcuts.default).toBe(true)
      expect(flowProps.showControls.default).toBe(true)
      expect(flowProps.showMinimap.default).toBe(false)
      expect(flowProps.history.default).toBe(true)
      expect(flowProps.showAlignmentGuides.default).toBe(true)
      expect(flowProps.virtualized.default).toBe(false)
    })

    it('should have correct default values for strings', () => {
      expect(flowProps.background.default).toBe('dots')
      expect(flowProps.backgroundColor.default).toBe('#f8f9fa')
      expect(flowProps.defaultNodeType.default).toBe('default')
      expect(flowProps.defaultEdgeType.default).toBe('bezier')
      expect(flowProps.multiSelectKey.default).toBe('Shift')
      expect(flowProps.minimapNodeColor.default).toBe('#b1b1b7')
    })

    it('should have isValidConnection defaulting to null', () => {
      expect(flowProps.isValidConnection.default).toBe(null)
    })

    it('should have themeOverrides defaulting to undefined', () => {
      expect(flowProps.themeOverrides.default).toBeUndefined()
    })
  })

  describe('flowEmits', () => {
    it('should have update:modelValue emit', () => {
      expect(flowEmits['update:modelValue']).toBeDefined()
    })

    it('should have update:nodes emit', () => {
      expect(flowEmits['update:nodes']).toBeDefined()
    })

    it('should have update:edges emit', () => {
      expect(flowEmits['update:edges']).toBeDefined()
    })

    it('should have node event emits', () => {
      expect(flowEmits.nodeClick).toBeDefined()
      expect(flowEmits.nodeDblClick).toBeDefined()
      expect(flowEmits.nodeDragStart).toBeDefined()
      expect(flowEmits.nodeDrag).toBeDefined()
      expect(flowEmits.nodeDragEnd).toBeDefined()
      expect(flowEmits.nodeContextMenu).toBeDefined()
    })

    it('should have edge event emits', () => {
      expect(flowEmits.edgeClick).toBeDefined()
      expect(flowEmits.edgeDblClick).toBeDefined()
      expect(flowEmits.edgeContextMenu).toBeDefined()
    })

    it('should have connection emits', () => {
      expect(flowEmits.edgeConnect).toBeDefined()
      expect(flowEmits.selectionChange).toBeDefined()
      expect(flowEmits.historyChange).toBeDefined()
      expect(flowEmits.viewportChange).toBeDefined()
    })
  })
})
