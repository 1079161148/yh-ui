/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import AiEditorSender from '../src/ai-editor-sender.vue'
import type { AiCommandItem, AiEditorAttachmentItem } from '../src/ai-editor-sender'

// 测试用的命令数据
const mockCommands: AiCommandItem[] = [
  {
    id: 'cmd1',
    label: 'Help Command',
    keywords: ['help', 'question'],
    description: 'Get help information',
    icon: 'help'
  },
  {
    id: 'cmd2',
    label: 'Image Generator',
    keywords: ['image', 'photo', 'picture'],
    description: 'Generate images with AI',
    icon: 'image'
  },
  {
    id: 'cmd3',
    label: 'Code Assistant',
    keywords: ['code', 'programming'],
    description: 'Help with coding tasks',
    icon: 'code',
    disabled: true
  },
  {
    id: 'cmd4',
    label: 'Parent Command',
    children: [
      { id: 'sub1', label: 'Sub Command 1', description: 'First sub option' },
      { id: 'sub2', label: 'Sub Command 2', description: 'Second sub option' }
    ]
  }
]

// 测试用的附件数据
const mockAttachments: AiEditorAttachmentItem[] = [
  { name: 'document.pdf', url: '/files/doc.pdf', status: 'success' },
  { name: 'image.png', url: '/files/img.png', status: 'uploading', percentage: 50 },
  { name: 'failed.jpg', status: 'error' }
]

// 创建带 Teleport 支持的包装组件
const createWrapper = (options: Parameters<typeof mount>[1] = {}) => {
  return mount(AiEditorSender, {
    attachTo: document.body,
    ...options
  })
}

describe('YhAiEditorSender', () => {
  // ─── 基础渲染测试 ─────────────────────────────────────────
  describe('基础渲染', () => {
    it('should render with base class', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.yh-ai-editor-sender').exists()).toBe(true)
    })

    it('should render textarea element', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('should render body, footer sections', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.yh-ai-editor-sender__body').exists()).toBe(true)
      expect(wrapper.find('.yh-ai-editor-sender__footer').exists()).toBe(true)
    })

    it('should render toolbar and actions sections', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.yh-ai-editor-sender__toolbar').exists()).toBe(true)
      expect(wrapper.find('.yh-ai-editor-sender__actions').exists()).toBe(true)
    })

    it('should render send button', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.yh-ai-editor-sender__send-btn').exists()).toBe(true)
    })
  })

  // ─── Props 默认值测试 ────────────────────────────────────
  describe('Props 默认值', () => {
    it('should have default placeholder', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type a message...')
    })

    it('should have default modelValue as empty string', () => {
      const wrapper = createWrapper()
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('')
    })

    it('should have default disabled as false', () => {
      const wrapper = createWrapper()
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(false)
      expect(wrapper.classes()).not.toContain('is-disabled')
    })

    it('should have default loading as false', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).not.toContain('is-loading')
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(false)
    })

    it('should have default attachments as empty array', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.yh-ai-editor-sender__header').exists()).toBe(false)
    })

    it('should have default showWordLimit as true', () => {
      const wrapper = createWrapper({ props: { maxLength: 100 } })
      expect(wrapper.find('.yh-ai-editor-sender__word-limit').exists()).toBe(true)
    })

    it('should have default rows as 1', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('textarea').attributes('rows')).toBe('1')
    })

    it('should have default enableCommands as true', () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      expect(wrapper.props('enableCommands')).toBe(true)
    })

    it('should have default commandTrigger as "/"', () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      expect(wrapper.props('commandTrigger')).toBe('/')
    })

    it('should have default commandPanelPosition as bottom', () => {
      const wrapper = createWrapper({ props: { commandPanelPosition: 'bottom' } })
      expect(wrapper.props('commandPanelPosition')).toBe('bottom')
    })

    it('should have default commandPanelAlign as start', () => {
      const wrapper = createWrapper({ props: { commandPanelAlign: 'start' } })
      expect(wrapper.props('commandPanelAlign')).toBe('start')
    })

    it('should have default commandPanelWidth as 320', () => {
      const wrapper = createWrapper({ props: { commandPanelWidth: 320 } })
      expect(wrapper.props('commandPanelWidth')).toBe(320)
    })

    it('should have default commandPanelMaxHeight as 400', () => {
      const wrapper = createWrapper({ props: { commandPanelMaxHeight: 400 } })
      expect(wrapper.props('commandPanelMaxHeight')).toBe(400)
    })

    it('should have default showCommandDescription as true', () => {
      const wrapper = createWrapper({ props: { showCommandDescription: true } })
      expect(wrapper.props('showCommandDescription')).toBe(true)
    })

    it('should have default showCommandIcon as true', () => {
      const wrapper = createWrapper({ props: { showCommandIcon: true } })
      expect(wrapper.props('showCommandIcon')).toBe(true)
    })

    it('should have default commandSearchDelay as 150', () => {
      const wrapper = createWrapper({ props: { commandSearchDelay: 150 } })
      expect(wrapper.props('commandSearchDelay')).toBe(150)
    })

    it('should have default enableCommandCascade as true', () => {
      const wrapper = createWrapper({ props: { enableCommandCascade: true } })
      expect(wrapper.props('enableCommandCascade')).toBe(true)
    })

    it('should have default cascadeOffset as 4', () => {
      const wrapper = createWrapper({ props: { cascadeOffset: 4 } })
      expect(wrapper.props('cascadeOffset')).toBe(4)
    })
  })

  // ─── Props 不同值测试 ────────────────────────────────────
  describe('Props 不同值', () => {
    it('should render custom placeholder', () => {
      const wrapper = createWrapper({ props: { placeholder: 'Ask me anything...' } })
      expect(wrapper.find('textarea').attributes('placeholder')).toBe('Ask me anything...')
    })

    it('should render with custom modelValue', () => {
      const wrapper = createWrapper({ props: { modelValue: 'Custom initial text' } })
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe(
        'Custom initial text'
      )
    })

    it('should apply disabled state correctly', () => {
      const wrapper = createWrapper({ props: { disabled: true } })
      expect(wrapper.classes()).toContain('is-disabled')
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
    })

    it('should apply loading state correctly', () => {
      const wrapper = createWrapper({ props: { loading: true } })
      expect(wrapper.classes()).toContain('is-loading')
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
    })

    it('should apply custom rows', () => {
      const wrapper = createWrapper({ props: { rows: 5 } })
      expect(wrapper.find('textarea').attributes('rows')).toBe('5')
    })

    it('should apply custom maxLength attribute', () => {
      const wrapper = createWrapper({ props: { maxLength: 500, showWordLimit: true } })
      expect(wrapper.find('textarea').attributes('maxlength')).toBe('500')
    })

    it('should hide word limit when showWordLimit is false', () => {
      const wrapper = createWrapper({ props: { maxLength: 100, showWordLimit: false } })
      expect(wrapper.find('.yh-ai-editor-sender__word-limit').exists()).toBe(false)
    })

    it('should hide word limit when maxLength is not provided', () => {
      const wrapper = createWrapper({ props: { showWordLimit: true } })
      expect(wrapper.find('.yh-ai-editor-sender__word-limit').exists()).toBe(false)
    })

    it('should apply custom commandTrigger', () => {
      const wrapper = createWrapper({ props: { commandTrigger: '@' } })
      expect(wrapper.props('commandTrigger')).toBe('@')
    })

    it('should not show command panel when enableCommands is false', () => {
      const wrapper = createWrapper({ props: { enableCommands: false, commands: mockCommands } })
      wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeFalsy()
    })

    it('should apply custom commandPanelWidth as number', () => {
      const wrapper = createWrapper({ props: { commandPanelWidth: 400 } })
      expect(wrapper.props('commandPanelWidth')).toBe(400)
    })

    it('should apply custom commandPanelWidth as string', () => {
      const wrapper = createWrapper({ props: { commandPanelWidth: '50%' } })
      expect(wrapper.props('commandPanelWidth')).toBe('50%')
    })

    it('should apply custom commandPanelMaxHeight', () => {
      const wrapper = createWrapper({ props: { commandPanelMaxHeight: 300 } })
      expect(wrapper.props('commandPanelMaxHeight')).toBe(300)
    })

    it('should hide command description when showCommandDescription is false', () => {
      const wrapper = createWrapper({ props: { showCommandDescription: false } })
      expect(wrapper.props('showCommandDescription')).toBe(false)
    })

    it('should hide command icon when showCommandIcon is false', () => {
      const wrapper = createWrapper({ props: { showCommandIcon: false } })
      expect(wrapper.props('showCommandIcon')).toBe(false)
    })

    it('should apply theme overrides', () => {
      const wrapper = createWrapper({
        props: {
          themeOverrides: {
            '--yh-ai-editor-sender-border-color': '#ff0000'
          }
        }
      })
      expect(wrapper.attributes('style')).toContain('--yh-ai-editor-sender-border-color')
    })
  })

  // ─── v-model 测试 ─────────────────────────────────────────
  describe('v-model 绑定', () => {
    it('should render modelValue in textarea', () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello World' } })
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Hello World')
    })

    it('should emit update:modelValue on input', async () => {
      const wrapper = createWrapper({ props: { modelValue: '' } })
      await wrapper.find('textarea').setValue('test input')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      const emitted = wrapper.emitted('update:modelValue') as string[][]
      expect(emitted[emitted.length - 1][0]).toBe('test input')
    })

    it('should emit change event on input', async () => {
      const wrapper = createWrapper({ props: { modelValue: '' } })
      await wrapper.find('textarea').setValue('changed text')
      expect(wrapper.emitted('change')).toBeTruthy()
      const emitted = wrapper.emitted('change') as string[][]
      expect(emitted[emitted.length - 1][0]).toBe('changed text')
    })

    it('should update textarea when modelValue prop changes externally', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'initial' } })
      await wrapper.setProps({ modelValue: 'external update' })
      await nextTick()
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe(
        'external update'
      )
    })

    it('should sync with v-model two-way binding', async () => {
      const wrapper = createWrapper({
        props: {
          modelValue: 'initial',
          'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
        }
      })
      await wrapper.find('textarea').setValue('updated')
      expect(wrapper.props('modelValue')).toBe('updated')
    })
  })

  // ─── 状态组合测试 ──────────────────────────────────────────
  describe('状态组合', () => {
    it('should have is-disabled class when disabled', () => {
      const wrapper = createWrapper({ props: { disabled: true } })
      expect(wrapper.classes()).toContain('is-disabled')
    })

    it('should have is-loading class when loading', () => {
      const wrapper = createWrapper({ props: { loading: true } })
      expect(wrapper.classes()).toContain('is-loading')
    })

    it('should have is-focused class when focused', async () => {
      const wrapper = createWrapper()
      await wrapper.find('textarea').trigger('focus')
      expect(wrapper.classes()).toContain('is-focused')
    })

    it('should remove is-focused on blur', async () => {
      const wrapper = createWrapper()
      await wrapper.find('textarea').trigger('focus')
      await wrapper.find('textarea').trigger('blur')
      expect(wrapper.classes()).not.toContain('is-focused')
    })

    it('should disable textarea when disabled=true', () => {
      const wrapper = createWrapper({ props: { disabled: true } })
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
    })

    it('should disable textarea when loading=true', () => {
      const wrapper = createWrapper({ props: { loading: true } })
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
    })

    it('should disable textarea when both disabled and loading', () => {
      const wrapper = createWrapper({ props: { disabled: true, loading: true } })
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).disabled).toBe(true)
    })
  })

  // ─── Send 事件测试 ─────────────────────────────────────────
  describe('Send 事件', () => {
    it('should emit send event when send button clicked with text', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello' } })
      const sendBtn = wrapper.find('.yh-ai-editor-sender__send-btn')
      await sendBtn.trigger('click')
      expect(wrapper.emitted('send')).toBeTruthy()
      const emitted = wrapper.emitted('send') as string[][]
      expect(emitted[0][0]).toBe('Hello')
    })

    it('should NOT emit send if textarea is empty', async () => {
      const wrapper = createWrapper({ props: { modelValue: '' } })
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should NOT emit send if only whitespace', async () => {
      const wrapper = createWrapper({ props: { modelValue: '   ' } })
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should NOT emit send if disabled', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'some text', disabled: true } })
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should NOT emit send if loading', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'some text', loading: true } })
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should clear value after send', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello' } })
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      await nextTick()
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('')
    })

    it('should emit update:modelValue with empty string after send', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello' } })
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      await nextTick()
      const emitted = wrapper.emitted('update:modelValue') as string[][]
      const lastEmit = emitted[emitted.length - 1][0]
      expect(lastEmit).toBe('')
    })
  })

  // ─── 键盘事件测试 ─────────────────────────────────────────
  describe('键盘事件', () => {
    it('should emit send on Enter key (without Shift)', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello' } })
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
      expect(wrapper.emitted('send')).toBeTruthy()
    })

    it('should NOT emit send on Shift+Enter', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello' } })
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: true })
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should NOT emit send on Enter when empty', async () => {
      const wrapper = createWrapper({ props: { modelValue: '' } })
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should NOT emit send on Enter when disabled', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello', disabled: true } })
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should NOT emit send on Enter when loading', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'Hello', loading: true } })
      await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
      expect(wrapper.emitted('send')).toBeFalsy()
    })

    it('should emit command-panel-show when command trigger is typed', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      await wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeTruthy()
    })

    it('should emit command-panel-hide on Escape', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      await wrapper.find('textarea').setValue('/')
      await wrapper.find('textarea').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('command-panel-hide')).toBeTruthy()
    })

    it('should hide command panel on Escape', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      await wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeTruthy()
      await wrapper.find('textarea').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('command-panel-hide')).toBeTruthy()
    })

    it('should emit command-panel-hide when space is typed after trigger', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      await wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeTruthy()
      await wrapper.find('textarea').setValue('/help ')
      expect(wrapper.emitted('command-panel-hide')).toBeTruthy()
    })

    it('should emit command-panel-hide on Backspace when no search text', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      await wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeTruthy()
      await wrapper.find('textarea').trigger('keydown', { key: 'Backspace' })
      expect(wrapper.emitted('command-panel-hide')).toBeTruthy()
    })
  })

  // ─── 附件测试 ─────────────────────────────────────────────
  describe('附件功能', () => {
    it('should render attachments header when attachments provided', () => {
      const wrapper = createWrapper({ props: { attachments: mockAttachments } })
      expect(wrapper.find('.yh-ai-editor-sender__header').exists()).toBe(true)
    })

    it('should render multiple attachments', () => {
      const wrapper = createWrapper({ props: { attachments: mockAttachments } })
      const attachmentItems = wrapper.findAll('.yh-ai-editor-sender__attachment')
      expect(attachmentItems.length).toBe(3)
    })

    it('should not render header when attachments is empty', () => {
      const wrapper = createWrapper({ props: { attachments: [] } })
      expect(wrapper.find('.yh-ai-editor-sender__header').exists()).toBe(false)
    })

    it('should display attachment name', () => {
      const wrapper = createWrapper({ props: { attachments: [{ name: 'test.pdf' }] } })
      expect(wrapper.find('.yh-ai-editor-sender__attachment').text()).toContain('test.pdf')
    })

    it('should emit remove-attachment when remove icon clicked', async () => {
      const wrapper = createWrapper({ props: { attachments: mockAttachments } })
      await wrapper.find('.yh-ai-editor-sender__attachment-remove').trigger('click')
      expect(wrapper.emitted('remove-attachment')).toBeTruthy()
      const emitted = wrapper.emitted('remove-attachment') as [number, AiEditorAttachmentItem][][]
      expect(emitted[0][0]).toBe(0)
      expect(emitted[0][1].name).toBe('document.pdf')
    })

    it('should emit remove-attachment with correct index', async () => {
      const wrapper = createWrapper({ props: { attachments: mockAttachments } })
      const removeButtons = wrapper.findAll('.yh-ai-editor-sender__attachment-remove')
      await removeButtons[1].trigger('click')
      const emitted = wrapper.emitted('remove-attachment') as [number, AiEditorAttachmentItem][][]
      expect(emitted[0][0]).toBe(1)
    })

    it('should use image icon for attachments with url', () => {
      const wrapper = createWrapper({
        props: { attachments: [{ name: 'image.png', url: '/img.png' }] }
      })
      expect(wrapper.find('.yh-ai-editor-sender__attachment').exists()).toBe(true)
    })

    it('should use document icon for attachments without url', () => {
      const wrapper = createWrapper({ props: { attachments: [{ name: 'doc.pdf' }] } })
      expect(wrapper.find('.yh-ai-editor-sender__attachment').exists()).toBe(true)
    })
  })

  // ─── 命令菜单功能测试 ──────────────────────────────────────
  describe('命令菜单功能', () => {
    it('should emit command-panel-show when trigger is typed', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      await wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeTruthy()
    })

    it('should not show command panel when enableCommands is false', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands, enableCommands: false } })
      await wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeFalsy()
    })

    it('should use custom command trigger', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands, commandTrigger: '@' } })
      await wrapper.find('textarea').setValue('@')
      expect(wrapper.emitted('command-panel-show')).toBeTruthy()
    })

    it('should hide command panel when space is typed after trigger', async () => {
      const wrapper = createWrapper({ props: { commands: mockCommands } })
      await wrapper.find('textarea').setValue('/')
      expect(wrapper.emitted('command-panel-show')).toBeTruthy()
      await wrapper.find('textarea').setValue('/help ')
      expect(wrapper.emitted('command-panel-hide')).toBeTruthy()
    })
  })

  // ─── 暴露方法测试 ─────────────────────────────────────────
  describe('暴露方法', () => {
    it('should expose focus method', () => {
      const wrapper = createWrapper()
      const vm = wrapper.vm as unknown as { focus: () => void }
      expect(typeof vm.focus).toBe('function')
    })

    it('should expose blur method', () => {
      const wrapper = createWrapper()
      const vm = wrapper.vm as unknown as { blur: () => void }
      expect(typeof vm.blur).toBe('function')
    })

    it('should expose clear method', () => {
      const wrapper = createWrapper({ props: { modelValue: 'test' } })
      const vm = wrapper.vm as unknown as { clear: () => void }
      expect(typeof vm.clear).toBe('function')
    })

    it('should clear content when clear method is called', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'test content' } })
      const vm = wrapper.vm as unknown as { clear: () => void }
      vm.clear()
      await nextTick()
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('')
    })

    it('should call focus on textarea when focus method is called', async () => {
      const wrapper = createWrapper()
      const vm = wrapper.vm as unknown as { focus: () => void }
      const textarea = wrapper.find('textarea').element as HTMLTextAreaElement
      const focusSpy = vi.spyOn(textarea, 'focus')
      vm.focus()
      expect(focusSpy).toHaveBeenCalled()
    })

    it('should call blur on textarea when blur method is called', async () => {
      const wrapper = createWrapper()
      const vm = wrapper.vm as unknown as { blur: () => void }
      const textarea = wrapper.find('textarea').element as HTMLTextAreaElement
      const blurSpy = vi.spyOn(textarea, 'blur')
      vm.blur()
      expect(blurSpy).toHaveBeenCalled()
    })
  })

  // ─── 插槽测试 ──────────────────────────────────────────────
  describe('插槽功能', () => {
    it('should render toolbar slot', () => {
      const wrapper = createWrapper({
        slots: {
          toolbar: h('button', { class: 'toolbar-btn' }, 'Toolbar')
        }
      })
      expect(wrapper.find('.toolbar-btn').exists()).toBe(true)
    })

    it('should render actions slot', () => {
      const wrapper = createWrapper({
        slots: {
          actions: h('span', { class: 'custom-action' }, 'Model')
        }
      })
      expect(wrapper.find('.custom-action').exists()).toBe(true)
    })

    it('should render header slot', () => {
      const wrapper = createWrapper({
        slots: {
          header: h('div', { class: 'custom-header' }, 'Header Content')
        }
      })
      expect(wrapper.find('.custom-header').exists()).toBe(true)
    })

    it('should render header slot over attachments', () => {
      const wrapper = createWrapper({
        props: { attachments: mockAttachments },
        slots: {
          header: h('div', { class: 'custom-header' }, 'Custom Header')
        }
      })
      expect(wrapper.find('.custom-header').exists()).toBe(true)
    })

    it('should render submit slot', () => {
      const wrapper = createWrapper({
        props: { modelValue: 'test' },
        slots: {
          submit: h('button', { class: 'custom-submit' }, 'Submit')
        }
      })
      expect(wrapper.find('.custom-submit').exists()).toBe(true)
    })
  })

  // ─── 边界条件测试 ──────────────────────────────────────────
  describe('边界条件', () => {
    it('should handle very long text', async () => {
      const longText = 'a'.repeat(10000)
      const wrapper = createWrapper({ props: { modelValue: longText } })
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toHaveLength(10000)
    })

    it('should handle special characters', async () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~'
      const wrapper = createWrapper()
      await wrapper.find('textarea').setValue(specialChars)
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe(specialChars)
    })

    it('should handle unicode characters', async () => {
      const unicode = '你好世界 🌍 مرحبا'
      const wrapper = createWrapper()
      await wrapper.find('textarea').setValue(unicode)
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe(unicode)
    })

    it('should handle rapid input', async () => {
      const wrapper = createWrapper()
      const textarea = wrapper.find('textarea')
      await textarea.setValue('a')
      await textarea.setValue('ab')
      await textarea.setValue('abc')
      await nextTick()
      expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('abc')
    })

    it('should handle rapid send attempts', async () => {
      const wrapper = createWrapper({ props: { modelValue: 'test' } })
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      await wrapper.find('.yh-ai-editor-sender__send-btn').trigger('click')
      const sendEvents = wrapper.emitted('send')
      expect(sendEvents?.length).toBe(1) // Only first should emit
    })

    it('should handle attachments with special characters in name', () => {
      const wrapper = createWrapper({
        props: { attachments: [{ name: 'file with spaces & symbols.pdf' }] }
      })
      expect(wrapper.find('.yh-ai-editor-sender__attachment').text()).toContain(
        'file with spaces & symbols.pdf'
      )
    })
  })

  // ─── Emits 验证器测试 ──────────────────────────────────────
  describe('Emits 验证器', () => {
    it('should validate send event - non-empty value', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits.send('hello')).toBe(true)
      expect(aiEditorSenderEmits.send('test message')).toBe(true)
    })

    it('should validate send event - empty value returns false', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits.send('')).toBe(false)
    })

    it('should validate update:modelValue event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits['update:modelValue']('text')).toBe(true)
      expect(aiEditorSenderEmits['update:modelValue']('')).toBe(true)
    })

    it('should validate change event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits.change('text')).toBe(true)
    })

    it('should validate remove-attachment event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits['remove-attachment'](0, { name: 'file.pdf' })).toBe(true)
    })

    it('should validate clear event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits.clear()).toBe(true)
    })

    it('should validate command-select event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      const command: AiCommandItem = { id: '1', label: 'Test' }
      expect(aiEditorSenderEmits['command-select'](command)).toBe(true)
    })

    it('should validate command-search event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits['command-search']('keyword')).toBe(true)
    })

    it('should validate command-panel-show event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits['command-panel-show']()).toBe(true)
    })

    it('should validate command-panel-hide event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits['command-panel-hide']()).toBe(true)
    })

    it('should validate command-cascade event', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      const parent: AiCommandItem = { id: 'parent', label: 'Parent' }
      const child: AiCommandItem = { id: 'child', label: 'Child' }
      expect(aiEditorSenderEmits['command-cascade'](child, parent)).toBe(true)
    })
  })

  // ─── Props 定义测试 ────────────────────────────────────────
  describe('Props 定义和常量', () => {
    it('should export valid aiEditorSenderProps', async () => {
      const { aiEditorSenderProps } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderProps).toBeDefined()
      expect(aiEditorSenderProps.modelValue).toBeDefined()
      expect(aiEditorSenderProps.placeholder).toBeDefined()
      expect(aiEditorSenderProps.disabled).toBeDefined()
      expect(aiEditorSenderProps.loading).toBeDefined()
      expect(aiEditorSenderProps.attachments).toBeDefined()
      expect(aiEditorSenderProps.showWordLimit).toBeDefined()
      expect(aiEditorSenderProps.maxLength).toBeDefined()
      expect(aiEditorSenderProps.rows).toBeDefined()
    })

    it('should export aiEditorSenderEmits', async () => {
      const { aiEditorSenderEmits } = await import('../src/ai-editor-sender')
      expect(aiEditorSenderEmits).toBeDefined()
      expect(typeof aiEditorSenderEmits.send).toBe('function')
      expect(typeof aiEditorSenderEmits['update:modelValue']).toBe('function')
    })
  })
})
