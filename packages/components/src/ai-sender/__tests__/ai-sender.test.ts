/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import AiSender from '../src/ai-sender.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhAiSender', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

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
    expect(wrapper.find('.yh-ai-sender').classes()).toContain('is-disabled')
  })

  it('should disable textarea when disabled=true', () => {
    const wrapper = mount(AiSender, { props: { disabled: true } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
  })

  // ─── Loading ─────────────────────────────────────────────
  it('should apply is-loading class when loading=true', () => {
    const wrapper = mount(AiSender, { props: { loading: true } })
    expect(wrapper.find('.yh-ai-sender').classes()).toContain('is-loading')
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
    expect(wrapper.find('.yh-ai-sender').classes()).toContain('is-focused')
  })

  it('should remove is-focused on textarea blur', async () => {
    const wrapper = mount(AiSender)
    await wrapper.get('textarea').trigger('focus')
    await wrapper.get('textarea').trigger('blur')
    vi.advanceTimersByTime(400)
    await nextTick()
    expect(wrapper.find('.yh-ai-sender').classes()).not.toContain('is-focused')
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
      const textarea = wrapper.get('textarea')

      await textarea.setValue('/h')
      textarea.element.selectionStart = 2
      await textarea.trigger('input')
      await nextTick()

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

    it('should ignore slash followed by space', async () => {
      const wrapper = mount(AiSender, { props: { commands } })
      const textarea = wrapper.find('textarea')
      await textarea.setValue('/ ')
      textarea.element.selectionStart = 2
      await textarea.trigger('input')

      expect(wrapper.find('.yh-ai-sender__command-panel').exists()).toBe(false)
    })

    it('should hide commands on blur after delay', async () => {
      const wrapper = mount(AiSender, { props: { commands } })
      const textarea = wrapper.find('textarea')
      await textarea.setValue('/')
      textarea.element.selectionStart = 1
      await textarea.trigger('input')

      await textarea.trigger('blur')
      vi.advanceTimersByTime(400)
      await nextTick()
      expect(wrapper.find('.yh-ai-sender__command-panel').exists()).toBe(false)
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

  // ─── Drag and Drop ───────────────────────────────────────
  describe('Drag and Drop', () => {
    it('should handle dragenter, dragover, dragleave and drop', async () => {
      const wrapper = mount(AiSender)
      const container = wrapper.find('.yh-ai-sender')

      await container.trigger('dragenter')
      expect(wrapper.find('.yh-ai-sender__drag-overlay').exists()).toBe(true)

      await container.trigger('dragover')
      expect(wrapper.find('.yh-ai-sender__drag-overlay').exists()).toBe(true)

      // Leave outside
      const leaveEvent = new DragEvent('dragleave', { clientX: -10, clientY: -10 } as any)
      Object.defineProperty(leaveEvent, 'currentTarget', {
        value: { getBoundingClientRect: () => ({ left: 0, right: 100, top: 0, bottom: 100 }) }
      })
      await container.trigger('dragleave', leaveEvent)

      await nextTick() // overlay fades out, but state is false

      // Drop
      await container.trigger('dragover')

      const file = new File([''], 'test.png', { type: 'image/png' })
      const dropEvent = { dataTransfer: { files: [file] }, preventDefault: vi.fn() }
      await container.trigger('drop', dropEvent)

      expect(wrapper.emitted('upload')).toBeTruthy()
      expect(wrapper.emitted('upload')![0][0]).toEqual([file])

      // Leave inside (isDragging stays true, so 61 NOT hit, but 60 else hit?)
      // To hit 61, we need to leave outside as we did above.
      // Maybe we need a different coordinate to hit specifically
      // Leave outside again to verify line 61
      const leaveOutside = new DragEvent('dragleave', { clientX: -10, clientY: -10 } as any)
      Object.defineProperty(leaveOutside, 'currentTarget', {
        value: { getBoundingClientRect: () => ({ left: 0, right: 100, top: 0, bottom: 100 }) }
      })
      await container.trigger('dragleave', leaveOutside)
      expect((wrapper.vm as any).isDragging).toBe(false)
    })

    it('should ignore drag events when disabled or loading', async () => {
      const wrapper = mount(AiSender, { props: { disabled: true } })
      const container = wrapper.find('.yh-ai-sender')

      await container.trigger('dragenter')
      expect(wrapper.find('.yh-ai-sender__drag-overlay').exists()).toBe(false)

      await container.trigger('dragover')
      expect(wrapper.find('.yh-ai-sender__drag-overlay').exists()).toBe(false)

      await container.trigger('drop')
      expect(wrapper.emitted('upload')).toBeFalsy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle Enter key scenarios', async () => {
      const wrapper = mount(AiSender)
      const textarea = wrapper.find('textarea')

      // Empty enter
      const preventDefault = vi.fn()
      await textarea.trigger('keydown', { key: 'Enter', preventDefault })
      expect(preventDefault).toHaveBeenCalled()
      expect(wrapper.emitted('send')).toBeFalsy()

      // Another empty enter test but with different state to hit line 193 again if needed
      // (Actually one call is enough for coverage if it hits the branch)
      const wrapper2 = mount(AiSender, { props: { modelValue: '   ' } })
      const preventDef2 = vi.fn()
      await wrapper2
        .find('textarea')
        .trigger('keydown', { key: 'Enter', preventDefault: preventDef2 })
      expect(preventDef2).toHaveBeenCalled()
    })

    it('should handle slash command boundary cases', async () => {
      const wrapper = mount(AiSender, { props: { modelValue: 'abc/' } })
      const textarea = wrapper.find('textarea')
      await textarea.trigger('input')
      // No space before slash, should not show commands
      expect((wrapper.vm as any).showCommands).toBe(false)
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
      expect(aiSenderEmits.upload([new File([''], 'test.png')])).toBe(true)
    })
  })

  it('should use config-provider locale placeholder', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(AiSender)
      }
    })

    await nextTick()
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Send a message...')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiSender, {
      props: {
        themeOverrides: {
          bg: '#fafafa'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-ai-sender-bg: #fafafa')
  })
})
