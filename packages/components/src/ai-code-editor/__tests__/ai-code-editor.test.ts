import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AiCodeEditor from '../src/ai-code-editor.vue'
import * as monaco from 'monaco-editor'
import { nextTick } from 'vue'

// Mock monaco-editor
vi.mock('monaco-editor', () => {
  const editor = {
    dispose: vi.fn(),
    getValue: vi.fn(() => 'test content'),
    setValue: vi.fn(),
    onDidChangeModelContent: vi.fn((cb) => ({ dispose: vi.fn(), callback: cb })),
    layout: vi.fn(),
    focus: vi.fn(),
    updateOptions: vi.fn(),
    getModel: vi.fn(() => ({})),
    render: vi.fn()
  }
  return {
    editor: {
      create: vi.fn(() => editor),
      setModelLanguage: vi.fn(),
      setTheme: vi.fn()
    }
  }
})

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0) as unknown as number)
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id as unknown as NodeJS.Timeout))

// Mock ResizeObserver
global.ResizeObserver = class {
  constructor(public callback: ResizeObserverCallback) {}
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
} as any

const waitForEditor = () => new Promise((resolve) => setTimeout(resolve, 50))

describe('YhAiCodeEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(globalThis as any).self = globalThis
    ;(globalThis as any).MonacoEnvironment = undefined
    global.ResizeObserver = class {
      constructor(public callback: ResizeObserverCallback) {}
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    } as any
  })

  afterEach(() => {
    ;(globalThis as any).MonacoEnvironment = undefined
  })

  it('should render container', () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'hello'
      }
    })
    expect(wrapper.find('.yh-ai-code-editor__container').exists()).toBe(true)
  })

  it('should initialize monaco editor', async () => {
    mount(AiCodeEditor, {
      props: {
        modelValue: 'hello world',
        language: 'javascript'
      }
    })

    // Wait for nextTick and requestAnimationFrame
    await waitForEditor()

    expect(monaco.editor.create).toHaveBeenCalled()
  })

  it('should update value on prop change', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'first'
      }
    })

    await waitForEditor()

    // In our mock, create returns a mock editor object
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value

    await wrapper.setProps({ modelValue: 'second' })
    expect(editorInstance.setValue).toHaveBeenCalledWith('second')
  })

  it('should change language on prop change', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        language: 'javascript'
      }
    })

    await waitForEditor()
    await wrapper.setProps({ language: 'typescript' })
    expect(monaco.editor.setModelLanguage).toHaveBeenCalled()
  })

  it('should emit update:modelValue and change when editor content changes', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'first'
      }
    })

    await waitForEditor()

    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value
    const changeRegistration = editorInstance.onDidChangeModelContent.mock.results[0].value
    editorInstance.getValue.mockReturnValue('changed from editor')

    changeRegistration.callback()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['changed from editor'])
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['changed from editor'])
  })

  it('should update theme and readonly options when props change', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        theme: 'vs-dark',
        readonly: false
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value

    await wrapper.setProps({ theme: 'vs-light', readonly: true })

    expect(monaco.editor.setTheme).toHaveBeenCalledWith('vs-light')
    expect(editorInstance.updateOptions).toHaveBeenCalledWith({ readOnly: true })
  })

  it('should prefer initialValue over modelValue during initialization', async () => {
    mount(AiCodeEditor, {
      props: {
        initialValue: 'initial content',
        modelValue: 'model content'
      }
    })

    await waitForEditor()

    expect(vi.mocked(monaco.editor.create)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        value: 'initial content'
      })
    )
  })

  it('should expose focus, setValue and getValue methods', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'hello'
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value

    wrapper.vm.focus()
    wrapper.vm.setValue('updated')
    editorInstance.getValue.mockReturnValue('updated')

    expect(editorInstance.focus).toHaveBeenCalled()
    expect(editorInstance.setValue).toHaveBeenCalledWith('updated')
    expect(wrapper.vm.getValue()).toBe('updated')
  })

  it('should emit dispose and cleanup editor on unmount', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'bye'
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value

    wrapper.unmount()

    expect(editorInstance.dispose).toHaveBeenCalled()
    expect(wrapper.emitted('dispose')).toBeTruthy()
  })

  it('should render string height and disable autofocus when requested', async () => {
    mount(AiCodeEditor, {
      props: {
        modelValue: 'hello',
        height: '420px',
        autofocus: false
      }
    })

    await waitForEditor()

    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value
    const createOptions = vi.mocked(monaco.editor.create).mock.calls[0][1]
    expect(createOptions.value).toBe('hello')
    expect(editorInstance.focus).not.toHaveBeenCalled()
  })

  it('should not reapply the same model value', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'same-value'
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value
    editorInstance.getValue.mockReturnValue('same-value')

    await wrapper.setProps({ modelValue: 'same-value' })

    expect(editorInstance.setValue).not.toHaveBeenCalled()
  })

  it('should fallback to empty string when model value becomes nullish', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'filled'
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value
    editorInstance.getValue.mockReturnValue('filled')

    await wrapper.setProps({ modelValue: undefined as unknown as string })

    expect(editorInstance.setValue).toHaveBeenCalledWith('')
  })

  it('should skip language update when editor model is missing', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        language: 'javascript'
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value
    editorInstance.getModel.mockReturnValue(null)

    await wrapper.setProps({ language: 'typescript' })

    expect(monaco.editor.setModelLanguage).not.toHaveBeenCalled()
  })

  it('should not create ResizeObserver when unavailable', async () => {
    const originalResizeObserver = global.ResizeObserver
    ;(global as any).ResizeObserver = undefined

    mount(AiCodeEditor, {
      props: {
        modelValue: 'no observer'
      }
    })

    await waitForEditor()

    expect(monaco.editor.create).toHaveBeenCalled()
    ;(global as any).ResizeObserver = originalResizeObserver
  })

  it('should keep existing MonacoEnvironment and still mount editor', async () => {
    ;(globalThis as any).MonacoEnvironment = { getWorker: vi.fn() }

    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'preset env'
      }
    })

    await waitForEditor()

    expect(monaco.editor.create).toHaveBeenCalled()
    expect(wrapper.emitted('mount')).toBeTruthy()
  })

  it('should safely expose empty state after unmount', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'hello'
      }
    })

    await waitForEditor()
    wrapper.unmount()

    expect(wrapper.vm.getEditor()).toBeNull()
    expect(wrapper.vm.getValue()).toBe('')
  })

  it('should suppress change emission while applying external value', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'first'
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value
    const changeRegistration = editorInstance.onDidChangeModelContent.mock.results[0].value
    editorInstance.getValue.mockReturnValue('second')
    editorInstance.setValue.mockImplementation(() => {
      changeRegistration.callback()
    })

    await wrapper.setProps({ modelValue: 'second' })
    await nextTick()

    expect(wrapper.emitted('change')).toBeFalsy()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should use measured container size when available', async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'clientHeight'
    )

    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 640
    })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get: () => 360
    })

    mount(AiCodeEditor, {
      props: {
        modelValue: 'sized'
      }
    })

    await waitForEditor()
    const editorInstance = vi.mocked(monaco.editor.create).mock.results[0].value

    expect(editorInstance.layout).toHaveBeenCalledWith({ width: 640, height: 360 })

    if (originalClientWidth) {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
    }
    if (originalClientHeight) {
      Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })

  it('should create MonacoEnvironment workers for each supported label', async () => {
    const originalWorker = (globalThis as any).Worker
    ;(globalThis as any).Worker = class {
      constructor(..._args: unknown[]) {}
    }

    mount(AiCodeEditor, {
      props: {
        modelValue: 'workers'
      }
    })

    await waitForEditor()

    const workerFactory = (globalThis as any).MonacoEnvironment?.getWorker
    expect(workerFactory).toBeTypeOf('function')

    expect(() => workerFactory('1', 'json')).not.toThrow()
    expect(() => workerFactory('1', 'css')).not.toThrow()
    expect(() => workerFactory('1', 'html')).not.toThrow()
    expect(() => workerFactory('1', 'typescript')).not.toThrow()
    expect(() => workerFactory('1', 'other')).not.toThrow()

    ;(globalThis as any).Worker = originalWorker
  })

  it('should fall back to modelValue when initialValue is null', async () => {
    mount(AiCodeEditor, {
      props: {
        initialValue: null as unknown as string,
        modelValue: 'fallback model'
      }
    })

    await waitForEditor()

    expect(vi.mocked(monaco.editor.create)).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        value: 'fallback model'
      })
    )
  })
})
