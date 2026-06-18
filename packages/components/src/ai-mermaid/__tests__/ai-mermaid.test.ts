/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import AiMermaid from '../src/ai-mermaid.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

const { mockMermaidInitialize, mockMermaidRender } = vi.hoisted(() => ({
  mockMermaidInitialize: vi.fn(),
  mockMermaidRender: vi.fn()
}))

vi.mock('mermaid', () => ({
  default: {
    initialize: mockMermaidInitialize,
    render: mockMermaidRender
  }
}))

function getInitConfigFromRenderSource(source: string) {
  const [initLine] = source.split('\n')
  return JSON.parse(initLine.slice('%%{init: '.length, -3)) as Record<string, unknown>
}

async function waitForRender() {
  await new Promise<void>((resolve) => {
    const start = Date.now()
    const interval = setInterval(() => {
      if (mockMermaidRender.mock.calls.length > 0 || Date.now() - start > 2000) {
        clearInterval(interval)
        resolve()
      }
    }, 10)
  })
  await nextTick()
}

describe('YhAiMermaid', () => {
  beforeEach(() => {
    mockMermaidInitialize.mockReset()
    mockMermaidRender.mockReset()
    mockMermaidRender.mockResolvedValue({ svg: '<svg class="mermaid-rendered"></svg>' })
    document.documentElement.classList.remove('dark')
    document.documentElement.removeAttribute('style')
  })

  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiMermaid)
    expect(wrapper.find('.yh-ai-mermaid').exists()).toBe(true)
  })

  it('should render actions bar', () => {
    const wrapper = mount(AiMermaid)
    expect(wrapper.find('.yh-ai-mermaid__actions').exists()).toBe(true)
  })

  it('should render render tabs', () => {
    const wrapper = mount(AiMermaid)
    expect(wrapper.find('.yh-ai-mermaid__render-tabs').exists()).toBe(true)
  })

  // ─── Code Content ─────────────────────────────────────────
  it('should render code in code mode', () => {
    const code = 'graph TD\nA-->B'
    const wrapper = mount(AiMermaid, {
      props: { code }
    })
    // Initially in image mode, switch to code
    expect(wrapper.find('.yh-ai-mermaid').exists()).toBe(true)
  })

  // ─── Header ───────────────────────────────────────────────
  it('should render header slot', () => {
    const wrapper = mount(AiMermaid, {
      slots: { header: '<div class="custom-header">Header</div>' }
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
  })

  it('should render header prop', () => {
    const wrapper = mount(AiMermaid, {
      props: { header: 'Diagram Title' }
    })
    expect(wrapper.find('.yh-ai-mermaid__header-content').text()).toBe('Diagram Title')
  })

  // ─── Render Type Tabs ───────────────────────────────────
  it('should have image and code tabs', () => {
    const wrapper = mount(AiMermaid)
    const tabs = wrapper.findAll('.yh-ai-mermaid__render-tab')
    expect(tabs.length).toBe(2)
  })

  it('should switch to code view', async () => {
    const wrapper = mount(AiMermaid)
    const codeTab = wrapper.findAll('.yh-ai-mermaid__render-tab')[1]
    await codeTab.trigger('click')
    expect(wrapper.find('.yh-ai-mermaid__code').exists()).toBe(true)
  })

  // ─── Action Buttons ───────────────────────────────────────
  it('should render zoom buttons when enabled', () => {
    const wrapper = mount(AiMermaid, {
      props: {
        actions: {
          enableZoom: true,
          enableDownload: true,
          enableCopy: true
        }
      }
    })
    const buttons = wrapper.findAll('.yh-ai-mermaid__action-btn')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should hide zoom buttons when disabled', () => {
    const wrapper = mount(AiMermaid, {
      props: {
        actions: {
          enableZoom: false,
          enableDownload: false,
          enableCopy: false
        }
      }
    })
    expect(wrapper.find('.yh-ai-mermaid__action-buttons').exists()).toBe(false)
  })

  // ─── Props Validation ────────────────────────────────────
  it('should validate props defaults', async () => {
    const { aiMermaidProps } = await import('../src/ai-mermaid')
    expect(aiMermaidProps.code.default).toBe('')
    expect(aiMermaidProps.header.default).toBe(null)
    expect(aiMermaidProps.actions.default).toBeDefined()
  })

  it('should build strict mermaid render source from config', async () => {
    const { buildMermaidRenderSource } = await import('../src/ai-mermaid')
    expect(buildMermaidRenderSource('graph TD\nA-->B')).toContain('"securityLevel":"strict"')
    expect(buildMermaidRenderSource('graph TD\nA-->B', { theme: 'dark' })).toContain(
      '"theme":"dark"'
    )
  })

  // ─── Emits Validation ────────────────────────────────────
  it('should validate emits', async () => {
    const { aiMermaidEmits } = await import('../src/ai-mermaid')
    expect(aiMermaidEmits['render-type-change']('image')).toBe(true)
    expect(aiMermaidEmits['error'](new Error('test'))).toBe(true)
    expect(aiMermaidEmits.ready()).toBe(true)
  })

  // ─── Custom Actions ───────────────────────────────────────
  it('should render custom actions', () => {
    const customActions = [{ key: 'custom', label: 'Custom', icon: 'star', onClick: () => {} }]
    const wrapper = mount(AiMermaid, {
      props: { actions: { customActions } }
    })
    expect(wrapper.find('.yh-ai-mermaid__action-btn').exists()).toBe(true)
  })

  it('should use config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(AiMermaid)
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('Image')
    expect(wrapper.text()).toContain('Code')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiMermaid, {
      props: {
        themeOverrides: {
          'header-bg': '#f5f5f5'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-ai-mermaid-header-bg: #f5f5f5')
  })

  it('should sanitize rendered mermaid svg and enforce strict security level', async () => {
    mockMermaidRender.mockResolvedValueOnce({
      svg: '<svg><script>alert(1)</script><a xlink:href="javascript:alert(1)">bad</a><g onload="evil()"><text>Safe</text></g></svg>'
    })

    const wrapper = mount(AiMermaid, {
      props: {
        code: 'graph TD\nA-->B',
        config: {
          theme: 'dark'
        }
      }
    })

    await waitForRender()

    const html = wrapper.find('.yh-ai-mermaid__graph').html()
    expect(html).not.toContain('<script')
    expect(html).not.toContain('onload=')
    expect(html).not.toContain('javascript:')
  })

  it('should inject default theme variables into mermaid render config', async () => {
    document.documentElement.style.setProperty('--yh-bg-color', '#f8fafc')
    document.documentElement.style.setProperty('--yh-bg-color-overlay', '#ffffff')
    document.documentElement.style.setProperty('--yh-bg-color-page', '#eef2f7')
    document.documentElement.style.setProperty('--yh-color-primary', '#409eff')
    document.documentElement.style.setProperty('--yh-text-color-primary', '#111827')
    document.documentElement.style.setProperty('--yh-text-color-regular', '#374151')
    document.documentElement.style.setProperty('--yh-text-color-secondary', '#6b7280')
    document.documentElement.style.setProperty('--yh-border-color', '#d1d5db')
    document.documentElement.style.setProperty('--yh-border-color-light', '#e5e7eb')
    document.documentElement.style.setProperty('--yh-border-color-dark', '#9ca3af')

    mount(AiMermaid, {
      props: {
        code: 'graph TD\nA-->B',
        config: {
          theme: 'base'
        }
      }
    })

    await waitForRender()

    expect(mockMermaidRender).toHaveBeenCalled()
    const [, source] = mockMermaidRender.mock.calls.at(-1) as [string, string]
    const initConfig = getInitConfigFromRenderSource(source)
    const themeVariables = initConfig.themeVariables as Record<string, string | boolean>

    expect(initConfig.theme).toBe('base')
    expect(initConfig.htmlLabels).toBe(false)
    expect((initConfig.flowchart as Record<string, boolean>).useHtmlLabels).toBe(false)
    expect(themeVariables.darkMode).toBe(false)
    expect(themeVariables.nodeBkg).toBe('#ffffff')
    expect(themeVariables.edgeLabelBackground).toBe('#ffffff')
    expect(themeVariables.textColor).toBe('#111827')
  })

  it('should keep user provided mermaid theme variable overrides', async () => {
    mount(AiMermaid, {
      props: {
        code: 'graph TD\nA-->B',
        config: {
          themeVariables: {
            textColor: '#ff4d4f',
            nodeBkg: '#1f2937'
          }
        }
      }
    })

    await waitForRender()

    expect(mockMermaidRender).toHaveBeenCalled()
    const [, source] = mockMermaidRender.mock.calls.at(-1) as [string, string]
    const initConfig = getInitConfigFromRenderSource(source)
    const themeVariables = initConfig.themeVariables as Record<string, string>

    expect(themeVariables.textColor).toBe('#ff4d4f')
    expect(themeVariables.nodeBkg).toBe('#1f2937')
  })

  it('should support prefixCls, className, classNames, style and styles props', () => {
    const wrapper = mount(AiMermaid, {
      props: {
        header: 'Test Header',
        prefixCls: 'my-custom-prefix',
        className: 'my-custom-root-class',
        classNames: {
          root: 'root-class',
          header: 'header-class',
          content: 'content-class'
        },
        style: { border: '1px solid red' },
        styles: {
          root: { padding: '20px' },
          header: { color: 'blue' },
          content: { background: 'gray' }
        }
      }
    })

    const root = wrapper.find('.yh-ai-mermaid')
    expect(root.classes()).toContain('my-custom-prefix')
    expect(root.classes()).toContain('my-custom-root-class')
    expect(root.classes()).toContain('root-class')
    expect(root.attributes('style')).toContain('border: 1px solid red')
    expect(root.attributes('style')).toContain('padding: 20px')

    const header = wrapper.find('.yh-ai-mermaid__header')
    expect(header.classes()).toContain('header-class')
    expect(header.attributes('style')).toContain('color: blue')

    const content = wrapper.find('.yh-ai-mermaid__content')
    expect(content.classes()).toContain('content-class')
    expect(content.attributes('style')).toContain('background: gray')
  })
})
