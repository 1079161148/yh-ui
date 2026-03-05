/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

// Use real markdown-it and highlight.js for better coverage
import AiBubble from '../src/ai-bubble.vue'

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

  // ─── Multimodal ──────────────────────────────────────────
  it('should render multimodal content - image', () => {
    const multimodal = [{ type: 'image' as const, url: 'img.png', title: 'test image' }]
    const wrapper = mount(AiBubble, { props: { content: '', multimodal } })
    expect(wrapper.find('.yh-ai-bubble__image-grid').exists()).toBe(true)
  })

  it('should render multimodal content - audio', async () => {
    const multimodal = [{ type: 'audio' as const, url: 'audio.mp3', title: 'test audio' }]
    const wrapper = mount(AiBubble, { props: { content: '', multimodal } })
    expect(wrapper.find('.yh-ai-bubble__audio-player').exists()).toBe(true)

    // Mock Audio
    const playMock = vi.fn().mockResolvedValue(undefined)
    const pauseMock = vi.fn()
    class MockAudio {
      play = playMock
      pause = pauseMock
      onended: any = null
    }
    vi.stubGlobal('Audio', MockAudio)

    await wrapper.find('.yh-ai-bubble__audio-player button').trigger('click')
    expect(playMock).toHaveBeenCalled()

    // toggle off
    await wrapper.find('.yh-ai-bubble__audio-player button').trigger('click')
    expect(pauseMock).toHaveBeenCalled()
  })

  it('should render multimodal content - file', () => {
    const multimodal = [{ type: 'file' as const, url: 'test.pdf', title: 'test.pdf', size: '10KB' }]
    const wrapper = mount(AiBubble, { props: { content: '', multimodal } })
    expect(wrapper.find('.yh-ai-bubble__file-card').exists()).toBe(true)
    expect(wrapper.html()).toContain('10KB')
  })

  // ─── Structured Data ─────────────────────────────────────
  it('should render JSON structured data', () => {
    const structuredData = { type: 'json' as const, data: { name: 'test' } }
    const wrapper = mount(AiBubble, { props: { content: '', structuredData } })
    expect(wrapper.find('.yh-ai-bubble__json-viewer').exists()).toBe(true)
  })

  it('should render thought-chain structured data', () => {
    const structuredData = { type: 'thought-chain' as const, data: [] }
    const wrapper = mount(AiBubble, { props: { content: '', structuredData } })
    expect(wrapper.findComponent({ name: 'YhAiThoughtChain' }).exists()).toBe(true)
  })

  // ─── Citations ───────────────────────────────────────────
  it('should handle citation click', async () => {
    const onCitationClick = vi.fn()
    const cita = { id: 1, title: 'link', url: 'http://x.com' }
    const wrapper = mount(AiBubble, {
      props: { content: 'test [1]', citations: [cita], onCitationClick }
    })

    await wrapper.find('.yh-ai-bubble__citation-item').trigger('click')
    expect(onCitationClick).toHaveBeenCalledWith(cita)

    // Test default window.open fallback if no callback
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const wrapper2 = mount(AiBubble, {
      props: { content: 'test', citations: [cita] }
    })
    await wrapper2.find('.yh-ai-bubble__citation-item').trigger('click')
    expect(openSpy).toHaveBeenCalledWith('http://x.com', '_blank')
  })

  it('should show citation tooltip on hover', async () => {
    vi.useFakeTimers()
    const cita = { id: '1', title: 'ref 1', content: 'detailed info' }
    const wrapper = mount(AiBubble, {
      props: { content: 'test', citations: [cita] }
    })

    const mockEvent = {
      target: {
        classList: { contains: (c: string) => c === 'yh-ai-citation' },
        getAttribute: (a: string) => (a === 'data-id' ? '1' : null),
        getBoundingClientRect: () => ({ top: 100, left: 100, width: 20 })
      }
    } as any

    ;(wrapper.vm as any).handleCitationHover(mockEvent)
    expect((wrapper.vm as any).hoveredCitation).toEqual(cita)
    ;(wrapper.vm as any).handleCitationLeave(mockEvent)
    vi.advanceTimersByTime(300)
    expect((wrapper.vm as any).hoveredCitation).toBeNull()
    vi.useRealTimers()
  })

  it('should handle code block actions - collapse', async () => {
    const wrapper = mount(AiBubble)
    const mockEvent = {
      target: {
        classList: { contains: (c: string) => c === 'collapse-btn' || c === 'code-action-btn' },
        getAttribute: (a: string) => (a === 'data-id' ? 'cb-1' : null)
      }
    } as any
    await (wrapper.vm as any).handleCodeBlockAction(mockEvent)
    expect((wrapper.vm as any).expandedCodeBlocks.has('cb-1')).toBe(true)
  })

  it('should trigger download on button click', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const multimodal = [{ type: 'file' as const, url: 'test.zip', title: 'test' }]
    const wrapper = mount(AiBubble, { props: { content: '', multimodal } })

    await wrapper.find('.yh-ai-bubble__file-card button').trigger('click')
    expect(openSpy).toHaveBeenCalledWith('test.zip', '_blank')
  })

  // ─── Utils ───────────────────────────────────────────────
  it('getFileIcon should return correct icons', () => {
    const wrapper = mount(AiBubble)
    const getFileIcon = (wrapper.vm as any).getFileIcon
    expect(getFileIcon('test.pdf')).toBe('file-pdf')
    expect(getFileIcon('test.xlsx')).toBe('file-excel')
    expect(getFileIcon('test.docx')).toBe('file-word')
    expect(getFileIcon('test.mp4')).toBe('file-video')
    expect(getFileIcon('test.mp3')).toBe('file-audio')
    expect(getFileIcon('test.txt')).toBe('file-txt')
    expect(getFileIcon('unknown')).toBe('document')
  })

  // ─── Code Actions ────────────────────────────────────────
  it('should handle code block actions - copy', async () => {
    const wrapper = mount(AiBubble, { props: { content: '```js\nconsole.log(1)\n```' } })
    const copySpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    // Simulate delegation event
    const mockEvent = {
      target: {
        classList: { contains: (c: string) => c === 'code-action-btn' || c === 'copy-btn' },
        getAttribute: (a: string) => {
          if (a === 'data-code') return encodeURIComponent('console.log(1)')
          if (a === 'data-id') return 'cb-1'
          return null
        }
      }
    } as any

    await (wrapper.vm as any).handleCodeBlockAction(mockEvent)
    expect(copySpy).toHaveBeenCalledWith('console.log(1)')
  })

  it('should handle code block actions - run', async () => {
    const onRunCode = vi.fn().mockResolvedValue({ output: 'done' })
    const wrapper = mount(AiBubble, { props: { content: '```js\n1+1\n```', onRunCode } })

    const mockEvent = {
      target: {
        classList: { contains: (c: string) => c === 'code-action-btn' || c === 'run-btn' },
        getAttribute: (a: string) => {
          if (a === 'data-code') return encodeURIComponent('1+1')
          if (a === 'data-lang') return 'js'
          if (a === 'data-id') return 'cb-1'
          return null
        }
      }
    } as any

    await (wrapper.vm as any).handleCodeBlockAction(mockEvent)
    expect(onRunCode).toHaveBeenCalled()
  })

  it('should toggle code block expansion', () => {
    const wrapper = mount(AiBubble)
    ;(wrapper.vm as any).toggleCodeBlock('cb-1')
    expect((wrapper.vm as any).expandedCodeBlocks.has('cb-1')).toBe(true)
    ;(wrapper.vm as any).toggleCodeBlock('cb-1')
    expect((wrapper.vm as any).expandedCodeBlocks.has('cb-1')).toBe(false)
  })

  it('should handle explain code block', async () => {
    const onExplainCode = vi.fn().mockResolvedValue('explanation')
    const wrapper = mount(AiBubble, { props: { onExplainCode } })
    const mockEvent = {
      target: {
        classList: { contains: (c: string) => c === 'explain-btn' || c === 'code-action-btn' },
        getAttribute: (a: string) => {
          if (a === 'data-code') return 'code'
          if (a === 'data-lang') return 'js'
          if (a === 'data-id') return 'cb-1'
          return null
        }
      }
    } as any
    await (wrapper.vm as any).handleCodeBlockAction(mockEvent)
    expect(onExplainCode).toHaveBeenCalled()
    expect((wrapper.vm as any).codeOutput['cb-1']).toEqual(['explanation'])
  })

  it('should handle code block actions - edit', async () => {
    // Mock monaco before action
    const mockEditor = {
      dispose: vi.fn(),
      getValue: vi.fn().mockReturnValue('edited code')
    }
    const mockMonaco = {
      editor: {
        create: vi.fn().mockReturnValue(mockEditor)
      }
    }
    // We need to intercept the dynamic import or mock it globally if possible
    // For now, let's just test the component method directly with mockedRefs
    const wrapper = mount(AiBubble)
    ;(wrapper.vm as any).monaco = mockMonaco

    const mockEvent = {
      target: {
        classList: { contains: (c: string) => c === 'code-action-btn' || c === 'edit-btn' },
        getAttribute: (a: string) => {
          if (a === 'data-code') return encodeURIComponent('raw context')
          if (a === 'data-lang') return 'javascript'
          if (a === 'data-id') return 'cb-1'
          return null
        }
      }
    } as any

    await (wrapper.vm as any).handleCodeBlockAction(mockEvent)
    expect((wrapper.vm as any).editingCodeBlock).toBe('cb-1')

    // Save edit
    await (wrapper.vm as any).saveEditCode('cb-1')
    expect((wrapper.vm as any).editingCodeBlock).toBeNull()
  })

  it('should handle onRunCode with async iterator', async () => {
    const mockGenerator = async function* () {
      yield { output: 'chunk 1' }
      yield { output: 'chunk 2' }
    }
    const onRunCode = vi.fn().mockResolvedValue(mockGenerator())
    const wrapper = mount(AiBubble, { props: { onRunCode } })

    const mockEvent = {
      target: {
        classList: { contains: (c: string) => c === 'run-btn' || c === 'code-action-btn' },
        getAttribute: (a: string) => {
          if (a === 'data-code') return 'code'
          if (a === 'data-lang') return 'js'
          if (a === 'data-id') return 'cb-1'
          return null
        }
      }
    } as any

    await (wrapper.vm as any).handleCodeBlockAction(mockEvent)
    expect(onRunCode).toHaveBeenCalled()
  })

  // ─── Streaming ───────────────────────────────────────────
  it('should support streaming increments', async () => {
    vi.useFakeTimers()
    const onStreamComplete = vi.fn()
    const wrapper = mount(AiBubble, {
      props: {
        content: 'hello world',
        typing: true,
        streaming: true,
        streamSpeed: 2,
        streamInterval: 10,
        onStreamComplete
      }
    })

    // Initially partial or empty depending on render timing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // speed 2, interval 10. 100ms -> 10 intervals -> 20 chars max. full is 11 chars.
    expect(onStreamComplete).toHaveBeenCalled()
    vi.useRealTimers()
  })

  // ─── Structured Data - Table ─────────────────────────────
  it('should render table structured data', () => {
    const structuredData = {
      type: 'table' as const,
      data: { headers: ['A', 'B'], rows: [['1', '2']] }
    }
    const wrapper = mount(AiBubble, { props: { content: '', structuredData } })
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('th').text()).toBe('A')
  })

  // ─── Edge Cases ──────────────────────────────────────────
  it('should handle markdown=true but no mdi initialized', async () => {
    const wrapper = mount(AiBubble, { props: { content: 'hi', markdown: true } })
    // mdi is initialized in watchEffect immediately
    expect(wrapper.find('.yh-ai-bubble__markdown').exists()).toBe(true)
  })

  it('should handle multimodal download', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const wrapper = mount(AiBubble)
    ;(wrapper.vm as any).handleDownload('test.zip')
    expect(openSpy).toHaveBeenCalledWith('test.zip', '_blank')
  })

  // ─── Additional Coverage ─────────────────────────────────
  it('should hit onBeforeUnmount', () => {
    const wrapper = mount(AiBubble, { props: { content: 'test' } })
    wrapper.unmount()
    // No error = success
  })

  it('should test escapeHtml utility', () => {
    const wrapper = mount(AiBubble)
    const escapeHtml = (wrapper.vm as any).escapeHtml
    expect(escapeHtml('<div>&"\'</div>')).toBe('&lt;div&gt;&amp;&quot;&#39;&lt;/div&gt;')
  })

  it('should support sentence stream mode', async () => {
    vi.useFakeTimers()
    const onStreamComplete = vi.fn()
    mount(AiBubble, {
      props: {
        content: 'Sentence one. Sentence two!',
        typing: true,
        streaming: true,
        streamMode: 'sentence',
        onStreamComplete
      }
    })
    vi.advanceTimersByTime(1000)
    expect(onStreamComplete).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('should support paragraph stream mode', async () => {
    vi.useFakeTimers()
    const onStreamComplete = vi.fn()
    mount(AiBubble, {
      props: {
        content: 'Para one\n\nPara two',
        typing: true,
        streaming: true,
        streamMode: 'paragraph',
        onStreamComplete
      }
    })
    vi.advanceTimersByTime(1000)
    expect(onStreamComplete).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
