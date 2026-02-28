/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AiSender from '../src/ai-sender.vue'

describe('YhAiSender', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiSender)
    expect(wrapper.find('.yh-ai-sender').exists()).toBe(true)
  })

  it('should render textarea', () => {
    const wrapper = mount(AiSender)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('should render send button', () => {
    const wrapper = mount(AiSender)
    expect(wrapper.find('.yh-ai-sender__send-btn').exists()).toBe(true)
  })

  // ─── v-model / modelValue ────────────────────────────────
  it('should display modelValue in textarea', () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'hello' } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('hello')
  })

  it('should emit update:modelValue on input', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: '' } })
    await wrapper.find('textarea').setValue('new text')
    const emitted = wrapper.emitted('update:modelValue') as string[][]
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1][0]).toBe('new text')
  })

  it('should emit change on input', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: '' } })
    await wrapper.find('textarea').setValue('changed')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // ─── Disabled ────────────────────────────────────────────
  it('should apply is-disabled class when disabled=true', () => {
    const wrapper = mount(AiSender, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('should disable textarea when disabled=true', () => {
    const wrapper = mount(AiSender, { props: { disabled: true } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
  })

  // ─── Loading ─────────────────────────────────────────────
  it('should apply is-loading class when loading=true', () => {
    const wrapper = mount(AiSender, { props: { loading: true } })
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('should disable textarea when loading=true', () => {
    const wrapper = mount(AiSender, { props: { loading: true } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
  })

  // ─── Send ────────────────────────────────────────────────
  it('should emit send when button clicked with text', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'Hello' } })
    await wrapper.find('.yh-ai-sender__send-btn').trigger('click')
    expect(wrapper.emitted('send')).toBeTruthy()
    expect((wrapper.emitted('send') as string[][])[0][0]).toBe('Hello')
  })

  it('should NOT emit send when textarea is empty', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: '' } })
    await wrapper.find('.yh-ai-sender__send-btn').trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('should NOT emit send when disabled', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'text', disabled: true } })
    await wrapper.find('.yh-ai-sender__send-btn').trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('should NOT emit send when loading', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'text', loading: true } })
    await wrapper.find('.yh-ai-sender__send-btn').trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  // ─── Enter key ───────────────────────────────────────────
  it('should emit send on Enter (without Shift)', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'Hello' } })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
    expect(wrapper.emitted('send')).toBeTruthy()
  })

  it('should NOT emit send on Shift+Enter', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'Hello' } })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: true })
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  // ─── Clear after send ────────────────────────────────────
  it('should clear value after send', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'Hello' } })
    await wrapper.find('.yh-ai-sender__send-btn').trigger('click')
    await nextTick()
    const emitted = wrapper.emitted('update:modelValue') as string[][]
    expect(emitted[emitted.length - 1][0]).toBe('')
  })

  // ─── Clearable ───────────────────────────────────────────
  it('should show clear button when clearable=true and has text', () => {
    const wrapper = mount(AiSender, {
      props: { modelValue: 'text', clearable: true }
    })
    expect(wrapper.find('.yh-ai-sender__clear-btn').exists()).toBe(true)
  })

  it('should NOT show clear button when clearable=true but empty', () => {
    const wrapper = mount(AiSender, {
      props: { modelValue: '', clearable: true }
    })
    expect(wrapper.find('.yh-ai-sender__clear-btn').exists()).toBe(false)
  })

  it('should emit clear when clear button clicked', async () => {
    const wrapper = mount(AiSender, {
      props: { modelValue: 'text', clearable: true }
    })
    await wrapper.find('.yh-ai-sender__clear-btn').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  // ─── Word limit ──────────────────────────────────────────
  it('should show word limit when showWordLimit=true and maxLength set', () => {
    const wrapper = mount(AiSender, {
      props: { modelValue: 'hi', showWordLimit: true, maxLength: 100 }
    })
    expect(wrapper.find('.yh-ai-sender__word-limit').exists()).toBe(true)
    expect(wrapper.find('.yh-ai-sender__word-limit').text()).toContain('100')
  })

  // ─── Focus state ─────────────────────────────────────────
  it('should apply is-focused on textarea focus', async () => {
    const wrapper = mount(AiSender)
    await wrapper.find('textarea').trigger('focus')
    expect(wrapper.classes()).toContain('is-focused')
  })

  it('should remove is-focused on textarea blur', async () => {
    const wrapper = mount(AiSender)
    await wrapper.find('textarea').trigger('focus')
    await wrapper.find('textarea').trigger('blur')
    expect(wrapper.classes()).not.toContain('is-focused')
  })

  // ─── Slots ───────────────────────────────────────────────
  it('should render prefix slot', () => {
    const wrapper = mount(AiSender, {
      slots: { prefix: '<div class="custom-prefix">P</div>' }
    })
    expect(wrapper.find('.custom-prefix').exists()).toBe(true)
  })

  it('should render actions slot', () => {
    const wrapper = mount(AiSender, {
      slots: { actions: '<button class="custom-action">Extra</button>' }
    })
    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })

  it('should render submit slot overriding default send button', () => {
    const wrapper = mount(AiSender, {
      slots: { submit: '<button class="custom-submit">Go</button>' }
    })
    expect(wrapper.find('.custom-submit').exists()).toBe(true)
  })

  // ─── modelValue reactivity ───────────────────────────────
  it('should update when modelValue prop changes', async () => {
    const wrapper = mount(AiSender, { props: { modelValue: 'old' } })
    await wrapper.setProps({ modelValue: 'new text' })
    await nextTick()
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('new text')
  })
})
