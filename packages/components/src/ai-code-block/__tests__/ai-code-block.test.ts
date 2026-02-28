/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('highlight.js', () => ({
  default: {
    getLanguage: (lang: string) =>
      lang === 'typescript' || lang === 'javascript' || lang === 'python',
    highlight: vi.fn((_code: string, _opts: object) => ({
      value: '<span class="hljs-keyword">const</span>'
    })),
    highlightAuto: vi.fn(() => ({ value: '<span>auto</span>' }))
  }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

const { default: AiCodeBlock } = await import('../src/ai-code-block.vue')

describe('YhAiCodeBlock', () => {
  beforeEach(() => {
    // Mock clipboard API - navigator.clipboard is read-only, use defineProperty
    const mockClipboard = { writeText: vi.fn().mockResolvedValue(undefined) }
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
      configurable: true
    })
  })

  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiCodeBlock, { props: { code: 'const x = 1' } })
    expect(wrapper.find('.yh-ai-code-block').exists()).toBe(true)
  })

  it('should render header and body', () => {
    const wrapper = mount(AiCodeBlock, { props: { code: 'const x = 1' } })
    expect(wrapper.find('.yh-ai-code-block__header').exists()).toBe(true)
    expect(wrapper.find('.yh-ai-code-block__body').exists()).toBe(true)
  })

  // ─── Language / Filename ─────────────────────────────────
  it('should show filename in lang label when filename provided', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'const x = 1', language: 'typescript', filename: 'utils.ts' }
    })
    expect(wrapper.find('.yh-ai-code-block__lang').text()).toBe('utils.ts')
  })

  it('should show language in lang label when filename not provided', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'const x = 1', language: 'typescript' }
    })
    expect(wrapper.find('.yh-ai-code-block__lang').text()).toBe('typescript')
  })

  it('should show text as default language', () => {
    const wrapper = mount(AiCodeBlock, { props: { code: 'plain text' } })
    expect(wrapper.find('.yh-ai-code-block__lang').text()).toBe('text')
  })

  // ─── Code rendering ──────────────────────────────────────
  it('should render code element with language class', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'const x = 1', language: 'typescript' }
    })
    const code = wrapper.find('code')
    expect(code.classes()).toContain('language-typescript')
  })

  it('should render code content', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'hello world', language: 'text', highlight: false }
    })
    expect(wrapper.html()).toContain('hello world')
  })

  it('should apply hljs class to code element', () => {
    const wrapper = mount(AiCodeBlock, { props: { code: 'const x = 1' } })
    expect(wrapper.find('code').classes()).toContain('hljs')
  })

  // ─── Highlight ───────────────────────────────────────────
  it('should render highlighted code when highlight=true and language recognized', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'const x = 1', language: 'typescript', highlight: true }
    })
    // The highlight mock returns a span - check html contains hljs markup
    expect(wrapper.find('code').html()).toContain('hljs-keyword')
  })

  it('should render raw code when highlight=false', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'raw code here', language: 'typescript', highlight: false }
    })
    expect(wrapper.find('code').html()).toContain('raw code here')
  })

  // ─── Copy button ─────────────────────────────────────────
  it('should show copy button', () => {
    const wrapper = mount(AiCodeBlock, { props: { code: 'const x = 1' } })
    expect(wrapper.find('.yh-ai-code-block__actions .yh-button').exists()).toBe(true)
  })

  it('should emit copy event and call clipboard on copy click', async () => {
    const code = 'const x = 1'
    const wrapper = mount(AiCodeBlock, { props: { code } })
    await wrapper.find('.yh-ai-code-block__actions .yh-button').trigger('click')
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code)
    expect(wrapper.emitted('copy')).toBeTruthy()
    expect((wrapper.emitted('copy') as string[][])[0][0]).toBe(code)
  })

  it('should NOT emit copy when code is empty', async () => {
    const wrapper = mount(AiCodeBlock, { props: { code: '' } })
    await wrapper.find('.yh-ai-code-block__actions .yh-button').trigger('click')
    expect(wrapper.emitted('copy')).toBeFalsy()
  })

  // ─── Default slot ────────────────────────────────────────
  it('should render default slot instead of code when slot provided', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'ignored code' },
      slots: { default: '<em class="custom-code">custom</em>' }
    })
    expect(wrapper.find('.custom-code').exists()).toBe(true)
  })

  // ─── Actions slot ────────────────────────────────────────
  it('should render actions slot', () => {
    const wrapper = mount(AiCodeBlock, {
      props: { code: 'code' },
      slots: { actions: '<button class="extra-action">Run</button>' }
    })
    expect(wrapper.find('.extra-action').exists()).toBe(true)
  })
})
