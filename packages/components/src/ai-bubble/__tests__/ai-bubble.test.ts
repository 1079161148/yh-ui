/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

// Must mock before importing component to intercept module resolution
vi.mock('markdown-it', async () => {
  class MockMd {
    inline = {
      ruler: {
        after: vi.fn()
      }
    }
    render(content: string) {
      return `<p>${content}</p>`
    }
  }
  return { default: MockMd }
})
vi.mock('highlight.js', () => ({
  default: { getLanguage: () => false, highlight: vi.fn() }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

// Import AFTER mocking
const { default: AiBubble } = await import('../src/ai-bubble.vue')

describe('YhAiBubble', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hello', role: 'assistant' } })
    expect(wrapper.find('.yh-ai-bubble').exists()).toBe(true)
  })

  // ─── Role class ──────────────────────────────────────────
  it('should apply role class for user', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', role: 'user' } })
    expect(wrapper.classes()).toContain('yh-ai-bubble--user')
  })

  it('should apply role class for assistant', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', role: 'assistant' } })
    expect(wrapper.classes()).toContain('yh-ai-bubble--assistant')
  })

  it('should not render avatar for system role', () => {
    const wrapper = mount(AiBubble, { props: { content: 'sys msg', role: 'system' } })
    expect(wrapper.find('.yh-ai-bubble__avatar').exists()).toBe(false)
  })

  // ─── Placement ───────────────────────────────────────────
  it('should default placement to end for user role', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', role: 'user' } })
    expect(wrapper.classes()).toContain('yh-ai-bubble--placement-end')
  })

  it('should default placement to start for assistant role', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', role: 'assistant' } })
    expect(wrapper.classes()).toContain('yh-ai-bubble--placement-start')
  })

  it('should override placement via prop', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', role: 'user', placement: 'start' } })
    expect(wrapper.classes()).toContain('yh-ai-bubble--placement-start')
  })

  // ─── Shape & Variant ─────────────────────────────────────
  it('should apply shape class', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', shape: 'round' } })
    expect(wrapper.classes()).toContain('yh-ai-bubble--shape-round')
  })

  it('should apply variant class', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', variant: 'borderless' } })
    expect(wrapper.classes()).toContain('yh-ai-bubble--variant-borderless')
  })

  // ─── Loading state ───────────────────────────────────────
  it('should show loading indicator when loading=true and content is empty', () => {
    const wrapper = mount(AiBubble, { props: { loading: true, content: '' } })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.yh-ai-bubble__typing-indicator').exists()).toBe(true)
  })

  it('should not show typing indicator when content exists even if loading=true', () => {
    const wrapper = mount(AiBubble, { props: { loading: true, content: 'some text' } })
    expect(wrapper.find('.yh-ai-bubble__typing-indicator').exists()).toBe(false)
  })

  // ─── Content rendering ──────────────────────────────────
  it('should render plain text when markdown=false', () => {
    const wrapper = mount(AiBubble, { props: { content: 'plain text', markdown: false } })
    expect(wrapper.find('.yh-ai-bubble__text').text()).toBe('plain text')
    expect(wrapper.find('.yh-ai-bubble__markdown').exists()).toBe(false)
  })

  it('should render markdown container when markdown=true', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hello', markdown: true } })
    expect(wrapper.find('.yh-ai-bubble__markdown').exists()).toBe(true)
  })

  // ─── Time prop ───────────────────────────────────────────
  it('should render time when provided', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', time: '10:00' } })
    expect(wrapper.find('.yh-ai-bubble__time').text()).toBe('10:00')
  })

  it('should not render header without time and header slot', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi' } })
    expect(wrapper.find('.yh-ai-bubble__header').exists()).toBe(false)
  })

  // ─── Typing state ────────────────────────────────────────
  it('should apply is-typing class when typing=true', () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', typing: true } })
    expect(wrapper.classes()).toContain('is-typing')
  })

  // ─── Slots ───────────────────────────────────────────────
  it('should render content via default slot', () => {
    const wrapper = mount(AiBubble, {
      slots: { default: '<span class="custom-content">Custom</span>' }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  it('should render footer slot when provided', () => {
    const wrapper = mount(AiBubble, {
      props: { content: 'hi' },
      slots: { footer: '<div class="custom-footer">Actions</div>' }
    })
    expect(wrapper.find('.yh-ai-bubble__footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })

  it('should render header slot when provided', () => {
    const wrapper = mount(AiBubble, {
      props: { content: 'hi' },
      slots: { header: '<span class="custom-header">Header</span>' }
    })
    expect(wrapper.find('.yh-ai-bubble__header').exists()).toBe(true)
    expect(wrapper.find('.custom-header').exists()).toBe(true)
  })

  it('should render avatar slot when provided', () => {
    const wrapper = mount(AiBubble, {
      props: { content: 'hi', role: 'user' },
      slots: { avatar: '<img class="custom-avatar" src="test.png" />' }
    })
    expect(wrapper.find('.custom-avatar').exists()).toBe(true)
  })
})
