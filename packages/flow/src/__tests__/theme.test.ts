import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  flowTheme,
  flowThemeDark,
  createCustomTheme,
  applyFlowTheme,
  flowThemePresets,
  type FlowTheme
} from '../utils/theme'

describe('flow/utils/theme', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('flowTheme', () => {
    it('should have all required theme properties', () => {
      expect(flowTheme['flow-node-background']).toBe('#ffffff')
      expect(flowTheme['flow-node-border']).toBe('#dcdfe6')
      expect(flowTheme['flow-node-border-radius']).toBe('8px')
      expect(flowTheme['flow-node-padding']).toBe('10px')
    })

    it('should have node label styles', () => {
      expect(flowTheme['flow-node-label-color']).toBe('#303133')
      expect(flowTheme['flow-node-label-font-size']).toBe('14px')
      expect(flowTheme['flow-node-label-font-weight']).toBe('500')
      expect(flowTheme['flow-node-description-color']).toBe('#909399')
    })

    it('should have handle styles', () => {
      expect(flowTheme['flow-handle-background']).toBe('#ffffff')
      expect(flowTheme['flow-handle-border']).toBe('#409eff')
      expect(flowTheme['flow-handle-size']).toBe('12px')
    })

    it('should have edge styles', () => {
      expect(flowTheme['flow-edge-stroke']).toBe('#b1b3b8')
      expect(flowTheme['flow-edge-stroke-width']).toBe('2')
      expect(flowTheme['flow-edge-selected-stroke']).toBe('#409eff')
    })

    it('should have BPMN styles', () => {
      expect(flowTheme['flow-bpmn-start-fill']).toBe('#e6f7ed')
      expect(flowTheme['flow-bpmn-start-stroke']).toBe('#67c23a')
      expect(flowTheme['flow-bpmn-end-fill']).toBe('#fef0f0')
      expect(flowTheme['flow-bpmn-end-stroke']).toBe('#f56c6c')
    })

    it('should have AI node styles', () => {
      expect(flowTheme['flow-ai-node-background']).toBe('#f0f9ff')
      expect(flowTheme['flow-ai-node-border']).toBe('#0ea5e9')
      expect(flowTheme['flow-ai-node-accent']).toBe('#0284c7')
    })

    it('should have background styles', () => {
      expect(flowTheme['flow-background-color']).toBe('#fafafa')
      expect(flowTheme['flow-grid-color']).toBe('#e4e7ed')
      expect(flowTheme['flow-grid-size']).toBe('20')
    })

    it('should have alignment line styles', () => {
      expect(flowTheme['flow-alignment-line-color']).toBe('#c0c4cc')
      expect(flowTheme['flow-alignment-line-active-color']).toBe('#409eff')
    })

    it('should have selection box styles', () => {
      expect(flowTheme['flow-selection-box-border']).toBe('#409eff')
      expect(flowTheme['flow-selection-box-background']).toBe('rgba(64, 158, 255, 0.1)')
    })

    it('should have control button styles', () => {
      expect(flowTheme['flow-control-background']).toBe('#ffffff')
      expect(flowTheme['flow-control-border']).toBe('#dcdfe6')
      expect(flowTheme['flow-control-icon-color']).toBe('#606266')
    })

    it('should have minimap styles', () => {
      expect(flowTheme['flow-minimap-background']).toBe('#f5f7fa')
      expect(flowTheme['flow-minimap-mask-background']).toBe('rgba(255, 255, 255, 0.8)')
      expect(flowTheme['flow-minimap-node-color']).toBe('#c0c4cc')
    })

    it('should have panel styles', () => {
      expect(flowTheme['flow-panel-background']).toBe('#ffffff')
      expect(flowTheme['flow-panel-border']).toBe('#e4e7ed')
      expect(flowTheme['flow-panel-shadow']).toBe('0 4px 12px rgba(0, 0, 0, 0.15)')
    })

    it('should have toolbar styles', () => {
      expect(flowTheme['flow-toolbar-background']).toBe('#ffffff')
      expect(flowTheme['flow-toolbar-border']).toBe('#e4e7ed')
      expect(flowTheme['flow-toolbar-icon-color']).toBe('#606266')
    })
  })

  describe('flowThemeDark', () => {
    it('should have dark mode colors', () => {
      expect(flowThemeDark['flow-node-background']).toBe('#1f1f1f')
      expect(flowThemeDark['flow-node-border']).toBe('#3a3a3a')
      expect(flowThemeDark['flow-node-label-color']).toBe('#e5e5e5')
    })

    it('should have dark mode handle colors', () => {
      expect(flowThemeDark['flow-handle-background']).toBe('#262626')
    })

    it('should have dark mode edge colors', () => {
      expect(flowThemeDark['flow-edge-stroke']).toBe('#5c5c5c')
    })

    it('should have dark mode background', () => {
      expect(flowThemeDark['flow-background-color']).toBe('#141414')
      expect(flowThemeDark['flow-grid-color']).toBe('#2a2a2a')
    })

    it('should have dark mode minimap colors', () => {
      expect(flowThemeDark['flow-minimap-background']).toBe('#1a1a1a')
    })
  })

  describe('createCustomTheme', () => {
    it('should create theme with overrides', () => {
      const customTheme = createCustomTheme({
        'flow-node-background': '#ff0000',
        'flow-node-border': '#00ff00'
      })

      expect(customTheme['flow-node-background']).toBe('#ff0000')
      expect(customTheme['flow-node-border']).toBe('#00ff00')
      expect(customTheme['flow-node-label-color']).toBe(flowTheme['flow-node-label-color'])
    })

    it('should merge with base theme', () => {
      const customTheme = createCustomTheme({})
      expect(customTheme['flow-node-background']).toBe(flowTheme['flow-node-background'])
    })

    it('should allow multiple overrides', () => {
      const customTheme = createCustomTheme({
        'flow-edge-stroke': '#ff00ff',
        'flow-background-color': '#0000ff',
        'flow-grid-size': '25'
      })

      expect(customTheme['flow-edge-stroke']).toBe('#ff00ff')
      expect(customTheme['flow-background-color']).toBe('#0000ff')
      expect(customTheme['flow-grid-size']).toBe('25')
    })

    it('should not mutate original theme', () => {
      const originalBg = flowTheme['flow-node-background']
      createCustomTheme({ 'flow-node-background': '#ff0000' })
      expect(flowTheme['flow-node-background']).toBe(originalBg)
    })
  })

  describe('applyFlowTheme', () => {
    it('should apply theme to HTMLElement', () => {
      const setPropertyMock = vi.fn()
      const mockElement = {
        style: {
          setProperty: setPropertyMock
        }
      } as unknown as HTMLElement

      applyFlowTheme(flowTheme, mockElement)

      expect(setPropertyMock).toHaveBeenCalled()
      expect(setPropertyMock).toHaveBeenCalledWith('--flow-node-background', '#ffffff')
    })
  })

  describe('flowThemePresets', () => {
    it('should have default preset', () => {
      expect(flowThemePresets.default).toBe(flowTheme)
    })

    it('should have dark preset', () => {
      expect(flowThemePresets.dark).toBe(flowThemeDark)
    })

    it('should have blue preset with custom colors', () => {
      expect(flowThemePresets.blue['flow-node-background']).toBe('#e6f7ff')
      expect(flowThemePresets.blue['flow-node-border']).toBe('#91d5ff')
      expect(flowThemePresets.blue['flow-node-selected-border']).toBe('#1890ff')
    })

    it('should have green preset with custom colors', () => {
      expect(flowThemePresets.green['flow-node-background']).toBe('#f6ffed')
      expect(flowThemePresets.green['flow-node-border']).toBe('#b7eb8f')
      expect(flowThemePresets.green['flow-node-selected-border']).toBe('#52c41a')
    })

    it('should have purple preset with custom colors', () => {
      expect(flowThemePresets.purple['flow-node-background']).toBe('#f9f0ff')
      expect(flowThemePresets.purple['flow-node-border']).toBe('#d3adf7')
      expect(flowThemePresets.purple['flow-node-selected-border']).toBe('#722ed1')
    })

    it('should inherit base theme values in presets', () => {
      expect(flowThemePresets.blue['flow-node-label-color']).toBe(flowTheme['flow-node-label-color'])
      expect(flowThemePresets.green['flow-node-label-color']).toBe(flowTheme['flow-node-label-color'])
    })
  })

  describe('Theme consistency', () => {
    it('light and dark themes should have same keys', () => {
      const lightKeys = Object.keys(flowTheme).sort()
      const darkKeys = Object.keys(flowThemeDark).sort()
      expect(lightKeys).toEqual(darkKeys)
    })

    it('all presets should have same keys as base theme', () => {
      const baseKeys = Object.keys(flowTheme)
      Object.values(flowThemePresets).forEach((preset) => {
        const presetKeys = Object.keys(preset)
        baseKeys.forEach((key) => {
          expect(presetKeys).toContain(key)
        })
      })
    })
  })
})
