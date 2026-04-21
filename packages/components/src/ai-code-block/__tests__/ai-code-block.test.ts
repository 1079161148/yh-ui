/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import hljs from '../../highlight'

vi.mock('../../highlight', () => ({
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

  it('should emit run event when run action is clicked', async () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'console.log(1)',
        showRun: true
      }
    })

    const buttons = wrapper.findAll('.yh-ai-code-block__actions .yh-button')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('run')).toBeTruthy()
    expect(wrapper.emitted('run')?.[0]).toEqual(['console.log(1)'])
  })

  it('should support collapse toggling when collapsible', async () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'line1\nline2',
        collapsible: true
      }
    })

    expect(wrapper.classes()).not.toContain('is-collapsed')
    await wrapper.find('.yh-ai-code-block__header').trigger('click')
    expect(wrapper.classes()).toContain('is-collapsed')
    await wrapper.find('.yh-ai-code-block__header').trigger('click')
    expect(wrapper.classes()).not.toContain('is-collapsed')
  })

  it('should enter edit mode and emit update after save', async () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const a = 1',
        showEdit: true
      }
    })

    const buttons = wrapper.findAll('.yh-ai-code-block__actions .yh-button')
    await buttons[0].trigger('click')

    expect(wrapper.classes()).toContain('is-editing')

    const editor = wrapper.findComponent({ name: 'YhAiCodeEditor' })
    await editor.vm.$emit('update:modelValue', 'const a = 2')
    await wrapper.vm.$nextTick()

    const saveButton = wrapper.find('.yh-ai-code-block__editor-actions .yh-button')
    await saveButton.trigger('click')

    expect(wrapper.emitted('edit')?.[0]).toEqual(['const a = 1'])
    expect(wrapper.emitted('update')?.[0]).toEqual(['const a = 2'])
    expect(wrapper.classes()).not.toContain('is-editing')
  })

  it('should cancel edit and restore normalized code', async () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const a = 1',
        showEdit: true
      }
    })

    await wrapper.findAll('.yh-ai-code-block__actions .yh-button')[0].trigger('click')
    const editor = wrapper.findComponent({ name: 'YhAiCodeEditor' })
    await editor.vm.$emit('update:modelValue', 'changed')
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('.yh-ai-code-block__editor-actions .yh-button')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('update')).toBeFalsy()
    expect(wrapper.classes()).not.toContain('is-editing')

    await wrapper.findAll('.yh-ai-code-block__actions .yh-button')[0].trigger('click')
    expect(wrapper.findComponent({ name: 'YhAiCodeEditor' }).props('modelValue')).toBe('const a = 1')
  })

  it('should fall back to auto highlight when language is not recognized', () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'SELECT * FROM users',
        language: 'sql',
        highlight: true
      }
    })

    expect(wrapper.find('code').html()).toContain('<span>auto</span>')
  })

  it('should render line numbers and active highlighted lines', () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'line1\nline2\nline3',
        showLineNumbers: true,
        highlightLines: [2]
      }
    })

    expect(wrapper.findAll('.yh-ai-code-block__line-number')).toHaveLength(3)
    expect(wrapper.find('.yh-ai-code-block__line-number.is-active').text()).toBe('2')
  })

  it('should start collapsed when defaultCollapsed is true', () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const x = 1',
        collapsible: true,
        defaultCollapsed: true
      }
    })

    expect(wrapper.classes()).toContain('is-collapsed')
  })

  it('should not toggle collapsed state when collapsible is false', async () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const x = 1',
        collapsible: false
      }
    })

    await wrapper.find('.yh-ai-code-block__header').trigger('click')
    expect(wrapper.classes()).not.toContain('is-collapsed')
  })

  it('should handle clipboard failure without emitting copy', async () => {
    navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error('copy failed'))
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const x = 1'
      }
    })

    await wrapper.find('.yh-ai-code-block__actions .yh-button').trigger('click')
    await nextTick()

    expect(wrapper.emitted('copy')).toBeFalsy()
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })

  it('should switch copy action text after a successful copy', async () => {
    vi.useFakeTimers()
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const copied = true'
      }
    })

    const copyButton = wrapper.find('.yh-ai-code-block__actions .yh-button')
    const initialText = copyButton.text()

    await copyButton.trigger('click')
    await nextTick()

    expect(copyButton.text()).not.toBe(initialText)

    vi.runAllTimers()
    await nextTick()

    expect(copyButton.text()).toBe(initialText)
    vi.useRealTimers()
  })

  it('should normalize slot code with escaped newlines', () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        highlight: false
      },
      slots: {
        default: 'const a = 1\\nconst b = 2'
      }
    })

    expect(wrapper.text()).toContain('const a = 1')
    expect(wrapper.text()).toContain('const b = 2')
  })

  it('should sync editor value when code prop changes outside edit mode', async () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const first = 1',
        showEdit: true
      }
    })

    await wrapper.setProps({ code: 'const second = 2' })
    await wrapper.findAll('.yh-ai-code-block__actions .yh-button')[0].trigger('click')

    expect(wrapper.findComponent({ name: 'YhAiCodeEditor' }).props('modelValue')).toBe(
      'const second = 2'
    )
  })

  it('should not emit run when showRun is hidden and only copy is available', async () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'console.log(1)',
        showRun: false
      }
    })

    expect(wrapper.findAll('.yh-ai-code-block__actions .yh-button')).toHaveLength(1)
    await wrapper.find('.yh-ai-code-block__actions .yh-button').trigger('click')
    expect(wrapper.emitted('run')).toBeFalsy()
    expect(wrapper.emitted('copy')).toBeTruthy()
  })

  it('should keep blank highlighted lines rendered as placeholders', () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'line1\n\nline3',
        showLineNumbers: true,
        highlight: false
      }
    })

    const lines = wrapper.findAll('.yh-ai-code-block__line')
    expect(lines).toHaveLength(3)
    expect(lines[1].element.innerHTML).toBe(' ')
  })

  it('should gracefully fall back when syntax highlight throws', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const highlight = vi.mocked(hljs.highlight)
    highlight.mockImplementationOnce(() => {
      throw new Error('broken highlight')
    })

    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'const fallback = true',
        language: 'typescript'
      }
    })

    expect(wrapper.text()).toContain('const fallback = true')
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })

  it('should extract text from complex slot nodes', () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        highlight: false
      },
      slots: {
        default: `
          <div>
            before
            <!---->
            <span>middle</span>
            <span>after</span>
          </div>
        `
      }
    })

    expect(wrapper.text()).toContain('before')
    expect(wrapper.text()).toContain('middle')
    expect(wrapper.text()).toContain('after')
  })
})
