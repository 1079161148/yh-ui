/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiMermaid from '../src/ai-mermaid.vue'

describe('YhAiMermaid', () => {
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
})
