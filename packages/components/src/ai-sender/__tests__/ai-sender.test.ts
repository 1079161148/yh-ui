/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
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

  // ─── Slash Commands ──────────────────────────────────────
  describe('Slash Commands', () => {
    const commands = [
      { key: 'help', label: 'Help' },
      { key: 'settings', label: 'Settings', prompt: 'Show Settings ' }
    ]

    it('should show slash commands panel when triggering /', async () => {
      const wrapper = mount(AiSender, { props: { commands } })
      const textarea = wrapper.find('textarea')

      await textarea.setValue('/h')
      textarea.element.selectionStart = 2
      await textarea.trigger('input')

      expect(wrapper.find('.yh-ai-sender__command-panel').exists()).toBe(true)
      expect(wrapper.findAll('.yh-ai-sender__command-item').length).toBe(1)
    })

    it('should navigate and select command with keyboard', async () => {
      const wrapper = mount(AiSender, { props: { commands } })
      const textarea = wrapper.find('textarea')
      await textarea.setValue('/')
      textarea.element.selectionStart = 1
      await textarea.trigger('input')

      expect(wrapper.find('.yh-ai-sender__command-panel').exists()).toBe(true)

      await textarea.trigger('keydown', { key: 'ArrowDown' })
      await textarea.trigger('keydown', { key: 'ArrowUp' })
      await textarea.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('command')![0][0]).toEqual(commands[0])
      expect(textarea.element.value).toBe('/help ')
    })

    it('should select command via mouse click', async () => {
      const wrapper = mount(AiSender, { props: { commands } })
      const textarea = wrapper.find('textarea')
      await textarea.setValue('/')
      textarea.element.selectionStart = 1
      await textarea.trigger('input')

      await wrapper.find('.yh-ai-sender__command-item').trigger('click')
      expect(wrapper.emitted('command')).toBeTruthy()
    })

    it('should hide commands on Escape', async () => {
      const wrapper = mount(AiSender, { props: { commands } })
      const textarea = wrapper.find('textarea')
      await textarea.setValue('/')
      textarea.element.selectionStart = 1
      await textarea.trigger('input')

      await textarea.trigger('keydown', { key: 'Escape' })
      expect(wrapper.find('.yh-ai-sender__command-panel').exists()).toBe(false)
    })

    it('should hide commands on blur after delay', async () => {
      vi.useFakeTimers()
      const wrapper = mount(AiSender, { props: { commands } })
      const textarea = wrapper.find('textarea')
      await textarea.setValue('/')
      textarea.element.selectionStart = 1
      await textarea.trigger('input')

      await textarea.trigger('blur')
      vi.advanceTimersByTime(250)
      await nextTick()
      expect(wrapper.find('.yh-ai-sender__command-panel').exists()).toBe(false)
      vi.useRealTimers()
    })
  })

  // ─── Attachments ─────────────────────────────────────────
  describe('Attachments', () => {
    it('should render attachments and emit remove event', async () => {
      const attachments = [
        { id: '1', name: 'img.png', type: 'image/png', url: 'img.png' },
        {
          id: '2',
          name: 'doc.pdf',
          type: 'application/pdf',
          url: 'doc.pdf',
          status: 'uploading' as const,
          progress: 50
        }
      ]
      const wrapper = mount(AiSender, { props: { attachments } })

      const items = wrapper.findAll('.yh-ai-sender__attachment-item')
      expect(items.length).toBe(2)

      expect(wrapper.find('.yh-ai-sender__progress-bar').exists()).toBe(true)

      await wrapper.find('.yh-ai-sender__attachment-remove').trigger('click')
      expect(wrapper.emitted('remove-attachment')![0][0]).toEqual(attachments[0])
    })
  })

  // ─── Emits Validators ────────────────────────────────────
  describe('aiSenderEmits', () => {
    it('should validate send event', async () => {
      const { aiSenderEmits } = await import('../src/ai-sender')
      expect(aiSenderEmits.send('hello')).toBe(true)
      expect(aiSenderEmits.send('')).toBe(true)
    })
    it('should pass-through other event validators', async () => {
      const { aiSenderEmits } = await import('../src/ai-sender')
      expect(aiSenderEmits['update:modelValue']('text')).toBe(true)
      expect(aiSenderEmits.change('text')).toBe(true)
      expect(aiSenderEmits.command({ key: 'a', label: 'b' })).toBe(true)
      expect(aiSenderEmits.blur(new FocusEvent('blur'))).toBe(true)
      expect(aiSenderEmits.focus(new FocusEvent('focus'))).toBe(true)
      expect(aiSenderEmits.clear()).toBe(true)
      expect(
        aiSenderEmits['remove-attachment']({ id: '1', name: 'f', type: 'doc', url: 'doc' })
      ).toBe(true)
    })
  })
})
