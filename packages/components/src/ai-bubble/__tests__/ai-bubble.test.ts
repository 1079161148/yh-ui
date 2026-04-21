/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import hljs from 'highlight.js'

// Use real markdown-it and highlight.js for better coverage
import AiBubble from '../src/ai-bubble.vue'

const { mockWebContainerBoot } = vi.hoisted(() => {
  return {
    mockWebContainerBoot: vi.fn()
  }
})

vi.mock('@webcontainer/api', () => ({
  WebContainer: {
    boot: mockWebContainerBoot
  }
}))

describe('YhAiBubble', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockWebContainerBoot.mockReset()
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

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: 'theme test',
        themeOverrides: {
          'assistant-bg': '#f0f9ff'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-ai-bubble-assistant-bg: #f0f9ff')
  })

  it('should ignore citation hover when target is not a citation', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: 'test',
        citations: [{ id: '1', title: 'ref' }]
      }
    })

    ;(wrapper.vm as any).handleCitationHover({
      target: {
        classList: { contains: () => false }
      }
    })

    expect((wrapper.vm as any).hoveredCitation).toBeNull()
  })

  it('should keep tooltip visible when entering the tooltip itself', () => {
    vi.useFakeTimers()
    const wrapper = mount(AiBubble, {
      props: {
        content: 'test',
        citations: [{ id: '1', title: 'ref' }]
      }
    })

    ;(wrapper.vm as any).hoveredCitation = { id: '1', title: 'ref' }
    ;(wrapper.vm as any).handleTooltipEnter()
    vi.advanceTimersByTime(500)

    expect((wrapper.vm as any).hoveredCitation).not.toBeNull()
    vi.useRealTimers()
  })

  it('should clear hovered citation after tooltip leave delay', () => {
    vi.useFakeTimers()
    const wrapper = mount(AiBubble, {
      props: {
        content: 'test',
        citations: [{ id: '1', title: 'ref' }]
      }
    })

    ;(wrapper.vm as any).hoveredCitation = { id: '1', title: 'ref' }
    ;(wrapper.vm as any).handleTooltipLeave()
    vi.advanceTimersByTime(300)

    expect((wrapper.vm as any).hoveredCitation).toBeNull()
    vi.useRealTimers()
  })

  it('should reset playing state when audio playback fails', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    class MockAudio {
      onended: any = null
      play = vi.fn().mockRejectedValue(new Error('play failed'))
      pause = vi.fn()
      constructor(_url: string) {}
    }
    vi.stubGlobal('Audio', MockAudio as any)

    const wrapper = mount(AiBubble, {
      props: { content: '', multimodal: [{ type: 'audio', url: 'bad.mp3', title: 'bad' }] }
    })

    await wrapper.find('.yh-ai-bubble__audio-player button').trigger('click')
    await Promise.resolve()

    expect((wrapper.vm as any).playingAsset).toBeNull()
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })

  it('should handle unsupported language execution in browser runtime', async () => {
    const wrapper = mount(AiBubble)

    await (wrapper.vm as any).runCode('puts 1', 'ruby', 'cb-ruby')

    expect((wrapper.vm as any).codeOutput['cb-ruby'][0]).toContain('not supported')
  })

  it('should return empty explanation without callback', async () => {
    const wrapper = mount(AiBubble)
    await expect((wrapper.vm as any).explainCode('const a = 1', 'js')).resolves.toBe('')
  })

  it('should reset playing state when audio playback ends', async () => {
    let latestAudio: {
      onended: null | (() => void)
      play: () => Promise<void>
      pause: () => void
    } | null = null
    class MockAudio {
      onended: null | (() => void) = null
      play = vi.fn().mockResolvedValue(undefined)
      pause = vi.fn()
      constructor(_url: string) {
        latestAudio = { onended: this.onended, play: this.play, pause: this.pause }
      }
    }
    vi.stubGlobal('Audio', MockAudio as any)

    const wrapper = mount(AiBubble, {
      props: { content: '', multimodal: [{ type: 'audio', url: 'done.mp3', title: 'done' }] }
    })

    await wrapper.find('.yh-ai-bubble__audio-player button').trigger('click')
    latestAudio?.onended?.()

    expect((wrapper.vm as any).playingAsset).toBeNull()
  })

  it('should cover remaining file icon variants', () => {
    const wrapper = mount(AiBubble)
    const getFileIcon = (wrapper.vm as any).getFileIcon

    expect(getFileIcon()).toBe('document')
    expect(getFileIcon('sheet.csv')).toBe('file-excel')
    expect(getFileIcon('clip.webm')).toBe('file-video')
    expect(getFileIcon('clip.mov')).toBe('file-video')
    expect(getFileIcon('voice.ogg')).toBe('file-audio')
  })

  it('should run browser code without console output and keep success message', async () => {
    vi.useFakeTimers()
    const wrapper = mount(AiBubble)

    ;(wrapper.vm as any).runCodeInBrowser('const x = 1', 'cb-no-output')
    vi.runAllTimers()

    expect(
      ((wrapper.vm as any).codeOutput['cb-no-output'] as string[]).some((line) =>
        line.includes('Executed successfully')
      )
    ).toBe(true)
    vi.useRealTimers()
  })

  it('should capture browser runtime errors', () => {
    const wrapper = mount(AiBubble)

    ;(wrapper.vm as any).runCodeInBrowser('throw new Error("boom")', 'cb-error')

    expect((wrapper.vm as any).codeOutput['cb-error'].at(-1)).toContain('boom')
  })

  it('should pause previous audio when switching to another asset', async () => {
    const audios: any[] = []
    class MockAudio {
      onended: any = null
      play = vi.fn().mockResolvedValue(undefined)
      pause = vi.fn()
      constructor(public url: string) {
        audios.push(this)
      }
    }
    vi.stubGlobal('Audio', MockAudio as any)

    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        multimodal: [
          { type: 'audio', url: 'a.mp3', title: 'a' },
          { type: 'audio', url: 'b.mp3', title: 'b' }
        ]
      }
    })

    const buttons = wrapper.findAll('.yh-ai-bubble__audio-player button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(audios[0].pause).toHaveBeenCalled()
    expect((wrapper.vm as any).playingAsset).toBe('b.mp3')
  })

  it('should render chart structured data with fallback pre block', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        structuredData: { type: 'chart', data: { series: [1, 2, 3] } as any }
      }
    })

    expect(wrapper.find('.yh-ai-bubble__chart-viewer').exists()).toBe(true)
    expect(wrapper.text()).toContain('series')
  })

  it('should return empty jsonHtml when json serialization fails', () => {
    const circular: any = {}
    circular.self = circular
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        structuredData: { type: 'json', data: circular }
      }
    })

    expect((wrapper.vm as any).jsonHtml).toBe('')
    expect(warnSpy).toHaveBeenCalled()
  })

  it('should not open a citation without url when no callback is provided', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const wrapper = mount(AiBubble)

    ;(wrapper.vm as any).handleCitationClick({ id: '1', title: 'no url' })

    expect(openSpy).not.toHaveBeenCalled()
  })

  it('should merge markdown options and render editable runnable code actions', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        enablePythonRuntime: true,
        markdownOptions: {
          codeBlock: {
            editable: true,
            lineNumbers: true,
            collapseLinesThreshold: 1
          }
        }
      }
    })

    const md = (wrapper.vm as any).getMarkdownInstance()
    const html = md.render('```python\nprint(1)\nprint(2)\n```')

    expect(html).toContain('line-number')
    expect(html).toContain('edit-btn')
    expect(html).toContain('run-btn')
    expect(html).toContain('collapse-btn')
  })

  it('should render mermaid blocks through markdown instance', () => {
    const wrapper = mount(AiBubble, {
      props: { content: '' }
    })

    const md = (wrapper.vm as any).getMarkdownInstance()
    const html = md.render('```mermaid\ngraph TD\nA-->B\n```')

    expect(html).toContain('mermaid-block')
    expect(html).toContain('<pre class="mermaid">')
  })

  it('should run python in browser with mocked pyodide', async () => {
    const loadPyodide = vi.fn().mockResolvedValue({
      setStdout: ({ batched }: { batched: (text: string) => void }) => batched('py-out'),
      runPythonAsync: vi.fn().mockResolvedValue('done')
    })
    ;(window as any).loadPyodide = loadPyodide

    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        enablePythonRuntime: true
      }
    })

    await (wrapper.vm as any).runCode('print(1)', 'python', 'cb-py')
    await Promise.resolve()
    await Promise.resolve()

    expect(loadPyodide).toHaveBeenCalled()
    expect((wrapper.vm as any).codeOutput['cb-py'].join('\n')).toContain('py-out')
    expect((wrapper.vm as any).codeOutput['cb-py'].join('\n')).toContain(
      'Python execution complete'
    )
    delete (window as any).loadPyodide
  })

  it('should capture python remote output and error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ output: 'remote ok', error: 'remote warn' })
      })
    )

    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        enablePythonRuntime: true,
        pythonRuntime: 'remote',
        pythonApiUrl: '/python-api'
      }
    })

    await (wrapper.vm as any).runCode('print(2)', 'python', 'cb-remote')
    await Promise.resolve()
    await Promise.resolve()

    const output = (wrapper.vm as any).codeOutput['cb-remote'].join('\n')
    expect(output).toContain('remote ok')
    expect(output).toContain('remote warn')
    expect(output).toContain('Remote Python execution complete')
  })

  it('should fall back from webcontainer runtime to browser runtime when unsupported', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        markdownOptions: {
          codeBlock: {
            runtime: 'webcontainer'
          }
        }
      }
    })

    ;(window as any).isSecureContext = false
    await (wrapper.vm as any).runCode('console.log("wc fallback")', 'js', 'cb-wc-fallback')

    const output = (wrapper.vm as any).codeOutput['cb-wc-fallback'].join('\n')
    expect(output).toContain('wc fallback')
    expect(warnSpy).toHaveBeenCalled()
  })

  it('should use final error result when custom run callback returns error payload', async () => {
    const onRunCode = vi.fn().mockResolvedValue({ error: 'failed custom run' })
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        onRunCode
      }
    })

    await (wrapper.vm as any).runCode('bad()', 'js', 'cb-custom-error')

    expect((wrapper.vm as any).codeOutput['cb-custom-error']).toEqual(['Error: failed custom run'])
  })

  it('should handle custom run callback throwing an error', async () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        onRunCode: vi.fn().mockRejectedValue(new Error('runner boom'))
      }
    })

    await (wrapper.vm as any).runCode('bad()', 'js', 'cb-custom-throw')

    expect((wrapper.vm as any).codeOutput['cb-custom-throw']).toContain('Error: runner boom')
  })

  it('should render code output for copied and disabled actions branches', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        markdownOptions: {
          codeBlock: {
            copyable: false,
            languageTag: false,
            explainable: false,
            runnable: false,
            collapsible: false
          }
        }
      }
    })

    const getCodeBlockId = (wrapper.vm as any).getCodeBlockId
    const codeId = getCodeBlockId('console.error(1)\n', 'ruby')
    ;(wrapper.vm as any).copiedCodeBlocks.add(codeId)
    ;(wrapper.vm as any).codeOutput[codeId] = ['> prompt', 'Error: failed']

    const md = (wrapper.vm as any).getMarkdownInstance()
    const html = md.render('```ruby\nconsole.error(1)\n```')

    expect(html).toContain('code-output')
    expect(html).not.toContain('copy-btn')
    expect(html).not.toContain('code-lang')
    expect(html).not.toContain('explain-btn')
    expect(html).not.toContain('run-btn')
    expect(html).toContain('output-prefix')
    expect(html).toContain('output-error')
  })

  it('should render string code output fallback branch', () => {
    const wrapper = mount(AiBubble, {
      props: { content: '' }
    })

    const getCodeBlockId = (wrapper.vm as any).getCodeBlockId
    const codeId = getCodeBlockId('plain output\n', 'text')
    ;(wrapper.vm as any).codeOutput[codeId] = 'plain output' as any

    const md = (wrapper.vm as any).getMarkdownInstance()
    const html = md.render('```text\nplain output\n```')

    expect(html).toContain('code-output')
    expect(html).toContain('plain output')
  })

  it('should expose structured data mapping for all supported types and fallback default', () => {
    for (const type of ['json', 'table', 'chart', 'mindmap', 'thought-chain'] as const) {
      const data = type === 'thought-chain' ? [] : ({ value: type } as any)
      const wrapper = mount(AiBubble, {
        props: {
          content: '',
          structuredData: { type, data }
        }
      })

      expect((wrapper.vm as any)._renderStructuredData).toMatchObject({ type })
      wrapper.unmount()
    }

    const unknownWrapper = mount(AiBubble, {
      props: {
        content: '',
        structuredData: { type: 'unknown', data: {} } as any
      }
    })

    expect((unknownWrapper.vm as any)._renderStructuredData).toBeNull()
  })

  it('should return null structured mapping and empty json html without structured data', () => {
    const wrapper = mount(AiBubble, {
      props: { content: '' }
    })

    expect((wrapper.vm as any)._renderStructuredData).toBeNull()
    expect((wrapper.vm as any).jsonHtml).toBe('')
  })

  it('should return raw json text when highlight.js json language is unavailable', () => {
    vi.spyOn(hljs, 'getLanguage').mockReturnValue(undefined as any)
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        structuredData: { type: 'json', data: { answer: 42 } }
      }
    })

    expect((wrapper.vm as any).jsonHtml).toContain('&quot;answer&quot;: 42')
    expect((wrapper.vm as any).jsonHtml).not.toContain('<span class="hljs-')
  })

  it('should preserve raw json string input without stringifying again', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        structuredData: { type: 'json', data: '{"raw":true}' }
      }
    })

    expect((wrapper.vm as any).jsonHtml).toContain('&quot;raw&quot;:true')
  })

  it('should ignore citation hover when citation id is missing from props', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: 'test',
        citations: [{ id: '1', title: 'known' }]
      }
    })

    ;(wrapper.vm as any).handleCitationHover({
      target: {
        classList: { contains: (c: string) => c === 'yh-ai-citation' },
        getAttribute: () => '999',
        getBoundingClientRect: () => ({ top: 0, left: 0, width: 0 })
      }
    })

    expect((wrapper.vm as any).hoveredCitation).toBeNull()
  })

  it('should clear tooltip after leave timer from tooltip wrapper', () => {
    vi.useFakeTimers()
    const wrapper = mount(AiBubble, {
      props: {
        content: 'test',
        citations: [{ id: '1', title: 'ref' }]
      }
    })

    ;(wrapper.vm as any).hoveredCitation = { id: '1', title: 'ref' }
    ;(wrapper.vm as any).handleTooltipLeave()
    vi.advanceTimersByTime(250)

    expect((wrapper.vm as any).hoveredCitation).toBeNull()
    vi.useRealTimers()
  })

  it('should clear hovered citation after citation leave timer', () => {
    vi.useFakeTimers()
    const wrapper = mount(AiBubble, {
      props: {
        content: 'test',
        citations: [{ id: '1', title: 'ref' }]
      }
    })

    ;(wrapper.vm as any).hoveredCitation = { id: '1', title: 'ref' }
    ;(wrapper.vm as any).handleCitationLeave({
      target: {
        classList: { contains: (c: string) => c === 'yh-ai-citation' }
      }
    })

    vi.advanceTimersByTime(250)
    expect((wrapper.vm as any).hoveredCitation).toBeNull()
    vi.useRealTimers()
  })

  it('should open citation url in new window when no click callback is provided', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const wrapper = mount(AiBubble, {
      props: { content: 'test' }
    })

    ;(wrapper.vm as any).handleCitationClick({ id: '1', title: 'doc', url: 'https://example.com' })

    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank')
  })

  it('should render citation fallback index and tooltip defaults', async () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: 'test',
        citations: [{ title: 'Untitled ref' } as any]
      }
    })

    expect(wrapper.find('.yh-ai-bubble__citation-index').text()).toBe('1')
    ;(wrapper.vm as any).hoveredCitation = { title: 'Untitled ref' }
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Untitled ref')
  })

  it('should render avatar image when avatar prop is provided', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: 'hello',
        avatar: 'https://example.com/avatar.png'
      }
    })

    expect(wrapper.find('.yh-avatar img').attributes('src')).toBe('https://example.com/avatar.png')
  })

  it('should support webcontainer runtime branch with mocked container', async () => {
    vi.useFakeTimers()
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        markdownOptions: {
          codeBlock: {
            runtime: 'webcontainer'
          }
        }
      }
    })

    ;(window as any).isSecureContext = true
    ;(window as any).crossOriginIsolated = true
    vi.stubGlobal('SharedArrayBuffer', class SharedArrayBufferMock {} as any)

    const wc = {
      mount: vi.fn().mockResolvedValue(undefined),
      spawn: vi.fn().mockResolvedValue({
        output: {
          getReader: () => {
            let done = false
            return {
              read: vi.fn().mockImplementation(async () => {
                if (done) return { done: true, value: undefined }
                done = true
                return { done: false, value: new TextEncoder().encode('wc line\n') }
              })
            }
          }
        }
      })
    }

    mockWebContainerBoot.mockResolvedValue(wc)
    await (wrapper.vm as any).runCode('console.log("wc")', 'js', 'cb-wc-success')
    vi.runAllTimers()
    await Promise.resolve()

    const output = (wrapper.vm as any).codeOutput['cb-wc-success'].join('\n')
    expect(output).toContain('wc line')
    expect(output).toContain('WebContainer execution complete')
    vi.useRealTimers()
  })

  it('should cancel edit code without monaco editor instance', () => {
    const wrapper = mount(AiBubble, {
      props: { content: '' }
    })

    ;(wrapper.vm as any).editingCodeBlock = 'cb-x'
    ;(wrapper.vm as any).editCodeContent = 'abc'
    ;(wrapper.vm as any).cancelEditCode()

    expect((wrapper.vm as any).editingCodeBlock).toBeNull()
    expect((wrapper.vm as any).editCodeContent).toBe('')
  })

  it('should save edited code without monaco instance by copying textarea content', async () => {
    const copySpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
    const wrapper = mount(AiBubble, {
      props: { content: '' }
    })

    ;(wrapper.vm as any).editingCodeBlock = 'cb-textarea'
    ;(wrapper.vm as any).editCodeContent = 'textarea value'
    await (wrapper.vm as any).saveEditCode('cb-textarea')

    expect(copySpy).toHaveBeenCalledWith('textarea value')
    expect((wrapper.vm as any).editingCodeBlock).toBeNull()
  })

  it('should render textarea fallback when edit modal is open without monaco', async () => {
    const wrapper = mount(AiBubble, {
      props: { content: '' },
      attachTo: document.body
    })

    ;(wrapper.vm as any).editingCodeBlock = 'cb-modal'
    ;(wrapper.vm as any).editCodeContent = 'editable text'
    await wrapper.vm.$nextTick()

    const textarea = document.body.querySelector('.code-edit-modal textarea') as HTMLTextAreaElement
    expect(textarea).not.toBeNull()
    expect(textarea.value).toBe('editable text')

    wrapper.unmount()
  })

  it('should initialize mermaid and render fallback when renderer is unavailable', async () => {
    const wrapper = mount(AiBubble, {
      props: { content: '' }
    })

    const result = await (wrapper.vm as any)._renderMermaid('graph TD\nA-->B')
    expect(result).toContain('mermaid')
  })

  it('should detect supported webcontainer environment', () => {
    const wrapper = mount(AiBubble, {
      props: { content: '' }
    })

    ;(window as any).isSecureContext = true
    ;(window as any).crossOriginIsolated = true
    vi.stubGlobal('SharedArrayBuffer', class SharedArrayBufferMock {} as any)

    expect((wrapper.vm as any).isWebContainerSupported()).toBe(true)
  })

  it('should render typing updates without requestAnimationFrame fallback', async () => {
    const originalRaf = global.requestAnimationFrame
    // @ts-expect-error test override
    delete global.requestAnimationFrame

    const wrapper = mount(AiBubble, {
      props: {
        content: 'before',
        typing: true
      }
    })

    await wrapper.setProps({ content: 'after' })
    expect((wrapper.vm as any).parsedContent).toContain('after')

    global.requestAnimationFrame = originalRaf
  })

  it('should clear parsed content immediately when stream render content is empty', () => {
    const wrapper = mount(AiBubble, {
      props: { content: 'seed', markdown: false }
    })

    ;(wrapper.vm as any).parsedContent = 'existing'
    ;(wrapper.vm as any).streamRender('', 'word', 2, 10)

    expect((wrapper.vm as any).parsedContent).toBe('')
  })

  it('should restart stream render when called again before completion', () => {
    vi.useFakeTimers()
    const onStreamComplete = vi.fn()
    const wrapper = mount(AiBubble, {
      props: {
        content: '',
        markdown: false,
        onStreamComplete
      }
    })

    ;(wrapper.vm as any).streamRender('abcdef', 'word', 2, 20)
    vi.advanceTimersByTime(20)
    expect((wrapper.vm as any).parsedContent).toBe('ab')
    ;(wrapper.vm as any).streamRender('XYZ', 'word', 1, 20)
    vi.advanceTimersByTime(80)

    expect((wrapper.vm as any).parsedContent).toBe('XYZ')
    expect(onStreamComplete).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
