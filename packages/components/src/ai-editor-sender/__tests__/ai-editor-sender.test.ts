/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AiEditorSender from '../src/ai-editor-sender.vue'

describe('YhAiEditorSender', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiEditorSender)
    expect(wrapper.find('.yh-ai-editor-sender').exists()).toBe(true)
  })

  it('should render textarea', () => {
    const wrapper = mount(AiEditorSender)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('should render with placeholder', () => {
    const wrapper = mount(AiEditorSender, {
      props: { placeholder: 'Type here...' }
    })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type here...')
  })

  // ─── v-model / modelValue ────────────────────────────────
  it('should render modelValue in textarea', () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'initial text' }
    })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('initial text')
  })

  it('should emit update:modelValue on input', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: '' }
    })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('hello')
    const emitted = wrapper.emitted('update:modelValue') as string[][]
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1][0]).toBe('hello')
  })

  it('should emit change on input', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: '' }
    })
    await wrapper.find('textarea').setValue('changed')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // ─── Disabled state ──────────────────────────────────────
  it('should apply is-disabled class when disabled=true', () => {
    const wrapper = mount(AiEditorSender, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('should disable textarea when disabled=true', () => {
    const wrapper = mount(AiEditorSender, { props: { disabled: true } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
  })

  // ─── Loading state ───────────────────────────────────────
  it('should apply is-loading class when loading=true', () => {
    const wrapper = mount(AiEditorSender, { props: { loading: true } })
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('should disable textarea when loading=true', () => {
    const wrapper = mount(AiEditorSender, { props: { loading: true } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
  })

  // ─── Send event ──────────────────────────────────────────
  it('should emit send event when send button clicked with text', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'Hello' }
    })
    // Find the send button and click it
    const sendBtn = wrapper.find('.yh-ai-editor-sender__send-btn')
    await sendBtn.trigger('click')
    expect(wrapper.emitted('send')).toBeTruthy()
    const emitted = wrapper.emitted('send') as string[][]
    expect(emitted[0][0]).toBe('Hello')
  })

  it('should NOT emit send if textarea is empty', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: '' }
    })
    const sendBtn = wrapper.find('.yh-ai-editor-sender__send-btn')
    await sendBtn.trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('should NOT emit send if disabled', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'some text', disabled: true }
    })
    const sendBtn = wrapper.find('.yh-ai-editor-sender__send-btn')
    await sendBtn.trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('should NOT emit send if loading', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'some text', loading: true }
    })
    const sendBtn = wrapper.find('.yh-ai-editor-sender__send-btn')
    await sendBtn.trigger('click')
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  // ─── Enter key ───────────────────────────────────────────
  it('should emit send on Enter key (without Shift)', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'Hello' }
    })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
    expect(wrapper.emitted('send')).toBeTruthy()
  })

  it('should NOT emit send on Shift+Enter', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'Hello' }
    })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: true })
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('should NOT emit send on Enter key when empty (prevents default)', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: '   ' }
    })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  // ─── Clear after send ────────────────────────────────────
  it('should clear value after send', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'Hello' }
    })
    const sendBtn = wrapper.find('.yh-ai-editor-sender__send-btn')
    await sendBtn.trigger('click')
    await nextTick()
    // After send, update:modelValue should be called with empty string
    const emitted = wrapper.emitted('update:modelValue') as string[][]
    const lastEmit = emitted[emitted.length - 1][0]
    expect(lastEmit).toBe('')
  })

  // ─── Attachments ─────────────────────────────────────────
  it('should render attachments header when attachments provided', () => {
    const wrapper = mount(AiEditorSender, {
      props: {
        attachments: [{ name: 'file.ts', type: 'document' }]
      }
    })
    expect(wrapper.find('.yh-ai-editor-sender__header').exists()).toBe(true)
    expect(wrapper.find('.yh-ai-editor-sender__attachment').exists()).toBe(true)
  })

  it('should not render attachments header when empty', () => {
    const wrapper = mount(AiEditorSender, {
      props: { attachments: [] }
    })
    expect(wrapper.find('.yh-ai-editor-sender__header').exists()).toBe(false)
  })

  it('should emit remove-attachment when remove icon clicked', async () => {
    const attachments = [{ name: 'file.ts', type: 'document' }]
    const wrapper = mount(AiEditorSender, {
      props: { attachments }
    })
    const removeBtn = wrapper.find('.yh-ai-editor-sender__attachment-remove')
    await removeBtn.trigger('click')
    expect(wrapper.emitted('remove-attachment')).toBeTruthy()
    const emitted = wrapper.emitted('remove-attachment') as [number, unknown][][]
    expect(emitted[0][0]).toBe(0) // index
  })

  // ─── Word limit ──────────────────────────────────────────
  it('should render word limit when showWordLimit=true and maxLength provided', () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'hi', showWordLimit: true, maxLength: 100 }
    })
    expect(wrapper.find('.yh-ai-editor-sender__word-limit').exists()).toBe(true)
    expect(wrapper.find('.yh-ai-editor-sender__word-limit').text()).toContain('100')
  })

  it('should not render word limit without maxLength', () => {
    const wrapper = mount(AiEditorSender, {
      props: { showWordLimit: true }
    })
    expect(wrapper.find('.yh-ai-editor-sender__word-limit').exists()).toBe(false)
  })

  // ─── Focus state ─────────────────────────────────────────
  it('should apply is-focused class on textarea focus', async () => {
    const wrapper = mount(AiEditorSender)
    await wrapper.find('textarea').trigger('focus')
    expect(wrapper.classes()).toContain('is-focused')
  })

  it('should remove is-focused class on textarea blur', async () => {
    const wrapper = mount(AiEditorSender)
    await wrapper.find('textarea').trigger('focus')
    await wrapper.find('textarea').trigger('blur')
    expect(wrapper.classes()).not.toContain('is-focused')
  })

  // ─── Slots ───────────────────────────────────────────────
  it('should render toolbar slot', () => {
    const wrapper = mount(AiEditorSender, {
      slots: {
        toolbar: '<button class="toolbar-btn">Tool</button>'
      }
    })
    expect(wrapper.find('.toolbar-btn').exists()).toBe(true)
  })

  it('should render actions slot', () => {
    const wrapper = mount(AiEditorSender, {
      slots: {
        actions: '<span class="custom-action">Model</span>'
      }
    })
    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })

  it('should render header slot as attachment override', () => {
    const wrapper = mount(AiEditorSender, {
      props: { attachments: [{ name: 'f.ts', type: 'document' }] },
      slots: {
        header: '<div class="custom-header">Header</div>'
      }
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
  })

  // ─── Rows prop ───────────────────────────────────────────
  it('should set rows attribute on textarea', () => {
    const wrapper = mount(AiEditorSender, { props: { rows: 5 } })
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  // ─── modelValue reactivity ───────────────────────────────
  it('should update textarea when modelValue prop changes', async () => {
    const wrapper = mount(AiEditorSender, {
      props: { modelValue: 'old text' }
    })
    await wrapper.setProps({ modelValue: 'new text' })
    await nextTick()
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('new text')
  })

  // ─── Emits Validators ────────────────────────────────────
  describe('aiEditorSenderEmits', () => {
    it('should validate send event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits.send('hello')).toBe(true)
      expect(aiEditorSenderEmits.send('')).toBe(false)
    })
    it('should pass-through other event validators', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits['update:modelValue']('text')).toBe(true)
      expect(aiEditorSenderEmits.change('text')).toBe(true)
      expect(aiEditorSenderEmits['remove-attachment'](0, { name: 'f' })).toBe(true)
      expect(aiEditorSenderEmits.clear()).toBe(true)
    })
  })
})
