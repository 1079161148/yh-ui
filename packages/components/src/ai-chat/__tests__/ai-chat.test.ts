/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('markdown-it', async () => {
  class MockMd {
    render(content: string) {
      return `<p>${content}</p>`
    }
  }
  return { default: MockMd }
})
vi.mock('highlight.js', () => ({
  default: {
    getLanguage: () => false,
    highlight: vi.fn(),
    highlightAuto: vi.fn(() => ({ value: '' }))
  }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

const { default: AiChat } = await import('../src/ai-chat.vue')

const makeMsg = (
  id: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  status?: 'loading' | 'success' | 'error'
) => ({ id, role, content, ...(status ? { status } : {}) })

describe('YhAiChat', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiChat)
    expect(wrapper.find('.yh-ai-chat').exists()).toBe(true)
  })

  it('should render content area', () => {
    const wrapper = mount(AiChat)
    expect(wrapper.find('.yh-ai-chat__content').exists()).toBe(true)
  })

  it('should render footer with sender by default', () => {
    const wrapper = mount(AiChat)
    expect(wrapper.find('.yh-ai-chat__footer').exists()).toBe(true)
  })

  // ─── Header (messages required) ──────────────────────────
  it('should not render header when no messages and no header slot', () => {
    const wrapper = mount(AiChat, { props: { messages: [] } })
    expect(wrapper.find('.yh-ai-chat__header').exists()).toBe(false)
  })

  it('should render header with clear button when messages exist', () => {
    const wrapper = mount(AiChat, {
      props: { messages: [makeMsg('1', 'user', 'hello')] }
    })
    expect(wrapper.find('.yh-ai-chat__header').exists()).toBe(true)
  })

  // ─── Suggestions ─────────────────────────────────────────
  it('should render suggestions when messages are empty', () => {
    const wrapper = mount(AiChat, {
      props: { messages: [], suggestions: ['Help me', 'Write code'] }
    })
    const buttons = wrapper.findAll('.yh-ai-chat__suggestions .yh-button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].text()).toBe('Help me')
  })

  it('should not render suggestions when messages exist', () => {
    const wrapper = mount(AiChat, {
      props: {
        messages: [makeMsg('1', 'user', 'hi')],
        suggestions: ['Suggestion']
      }
    })
    expect(wrapper.find('.yh-ai-chat__suggestions').exists()).toBe(false)
  })

  // ─── Loading ─────────────────────────────────────────────
  it('should show loading bubble when loading=true and no messages', () => {
    const wrapper = mount(AiChat, { props: { loading: true, messages: [] } })
    expect(wrapper.html()).toContain('is-loading')
  })

  // ─── Events ──────────────────────────────────────────────
  it('should emit send when suggestion clicked', async () => {
    const wrapper = mount(AiChat, {
      props: { messages: [], suggestions: ['Write me code'] }
    })
    await wrapper.find('.yh-ai-chat__suggestions .yh-button').trigger('click')
    expect(wrapper.emitted('send')).toBeTruthy()
    expect((wrapper.emitted('send') as string[][])[0][0]).toBe('Write me code')
  })

  it('should emit clear and update:messages on clear button click', async () => {
    const wrapper = mount(AiChat, {
      props: { messages: [makeMsg('1', 'user', 'hello')] }
    })
    await wrapper.find('.yh-ai-chat__header .yh-button').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:messages')).toBeTruthy()
    expect((wrapper.emitted('update:messages') as unknown[][][])[0][0]).toEqual([])
  })

  // ─── Message rendering ───────────────────────────────────
  it('should render message content from messages prop', () => {
    const wrapper = mount(AiChat, {
      props: { messages: [makeMsg('1', 'user', 'test message content')] }
    })
    expect(wrapper.html()).toContain('test message content')
  })

  it('should render multiple messages', () => {
    const messages = [makeMsg('1', 'user', 'Hello'), makeMsg('2', 'assistant', 'Hi there')]
    const wrapper = mount(AiChat, { props: { messages } })
    expect(wrapper.html()).toContain('Hello')
    expect(wrapper.html()).toContain('Hi there')
  })

  // ─── Slots ───────────────────────────────────────────────
  it('should render header slot', () => {
    const wrapper = mount(AiChat, {
      props: { messages: [makeMsg('1', 'user', 'hi')] },
      slots: { header: '<div class="custom-header">Custom Header</div>' }
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
  })

  it('should render sender slot', () => {
    const wrapper = mount(AiChat, {
      slots: { sender: '<div class="custom-sender">Custom Sender</div>' }
    })
    expect(wrapper.find('.custom-sender').exists()).toBe(true)
  })

  it('should render custom message via message slot', () => {
    const wrapper = mount(AiChat, {
      props: { messages: [makeMsg('1', 'user', 'any')] },
      slots: {
        message: '<div class="custom-msg">Custom Message</div>'
      }
    })
    expect(wrapper.find('.custom-msg').exists()).toBe(true)
  })
})
