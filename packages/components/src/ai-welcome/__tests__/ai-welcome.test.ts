/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiWelcome from '../src/ai-welcome.vue'

describe('YhAiWelcome', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiWelcome)
    expect(wrapper.find('.yh-ai-welcome').exists()).toBe(true)
  })

  it('should render title when provided', () => {
    const wrapper = mount(AiWelcome, {
      props: { title: 'Hello AI' }
    })
    expect(wrapper.find('.yh-ai-welcome__title').text()).toBe('Hello AI')
  })

  it('should render description when provided', () => {
    const wrapper = mount(AiWelcome, {
      props: { description: 'Ask me anything.' }
    })
    expect(wrapper.find('.yh-ai-welcome__description').text()).toBe('Ask me anything.')
  })

  it('should not render description when not provided', () => {
    const wrapper = mount(AiWelcome)
    expect(wrapper.find('.yh-ai-welcome__description').exists()).toBe(false)
  })

  // ─── Icon ─────────────────────────────────────────────────
  it('should render icon wrapper when showIcon=true (default)', () => {
    const wrapper = mount(AiWelcome, { props: { showIcon: true } })
    expect(wrapper.find('.yh-ai-welcome__icon-wrapper').exists()).toBe(true)
  })

  it('should not render icon wrapper when showIcon=false', () => {
    const wrapper = mount(AiWelcome, { props: { showIcon: false } })
    expect(wrapper.find('.yh-ai-welcome__icon-wrapper').exists()).toBe(false)
  })

  // ─── Suggestions ─────────────────────────────────────────
  it('should not render body without suggestions', () => {
    const wrapper = mount(AiWelcome, { props: { suggestions: [] } })
    expect(wrapper.find('.yh-ai-welcome__body').exists()).toBe(false)
  })

  it('should render suggestions cards', () => {
    const suggestions = [
      {
        title: 'Write code',
        description: 'Help me write code',
        icon: 'edit',
        prompt: 'write code'
      },
      { title: 'Translate', description: 'Translate text', icon: 'document', prompt: 'translate' }
    ]
    const wrapper = mount(AiWelcome, { props: { suggestions } })
    expect(wrapper.findAll('.yh-ai-welcome__card').length).toBe(2)
  })

  it('should render suggestion titles', () => {
    const suggestions = [{ title: 'Test Title', icon: 'edit', prompt: 'test' }]
    const wrapper = mount(AiWelcome, { props: { suggestions } })
    expect(wrapper.find('.yh-ai-welcome__card-title').text()).toBe('Test Title')
  })

  it('should render suggestion description when provided', () => {
    const suggestions = [{ title: 'Title', description: 'Some description', prompt: 'test' }]
    const wrapper = mount(AiWelcome, { props: { suggestions } })
    expect(wrapper.find('.yh-ai-welcome__card-description').text()).toBe('Some description')
  })

  it('should not render card icon when suggestion has no icon', () => {
    const suggestions = [{ title: 'No Icon', prompt: 'test' }]
    const wrapper = mount(AiWelcome, { props: { suggestions } })
    expect(wrapper.find('.yh-ai-welcome__card-icon').exists()).toBe(false)
  })

  // ─── Select event ─────────────────────────────────────────
  it('should emit select event when suggestion clicked', async () => {
    const suggestion = { title: 'Write code', icon: 'edit', prompt: 'write code' }
    const wrapper = mount(AiWelcome, {
      props: { suggestions: [suggestion] }
    })
    await wrapper.find('.yh-ai-welcome__card').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    const emitted = wrapper.emitted('select') as [[typeof suggestion]]
    expect(emitted[0][0]).toEqual(suggestion)
  })

  // ─── Slots ───────────────────────────────────────────────
  it('should render icon slot', () => {
    const wrapper = mount(AiWelcome, {
      slots: {
        icon: '<svg class="custom-icon"></svg>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('should render title slot', () => {
    const wrapper = mount(AiWelcome, {
      slots: {
        title: '<span class="custom-title">Custom Title</span>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('should render description slot', () => {
    const wrapper = mount(AiWelcome, {
      props: { description: 'desc' },
      slots: {
        description: '<em class="custom-desc">Custom Desc</em>'
      }
    })
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
  })

  it('should render default slot in footer', () => {
    const wrapper = mount(AiWelcome, {
      slots: {
        default: '<button class="extra-btn">Extra</button>'
      }
    })
    expect(wrapper.find('.yh-ai-welcome__footer').exists()).toBe(true)
    expect(wrapper.find('.extra-btn').exists()).toBe(true)
  })

  it('should not render footer when no default slot', () => {
    const wrapper = mount(AiWelcome)
    expect(wrapper.find('.yh-ai-welcome__footer').exists()).toBe(false)
  })
})
