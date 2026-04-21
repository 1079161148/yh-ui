import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AiCodeEditor from '../src/ai-code-editor.vue'
import * as monaco from 'monaco-editor'

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

async function waitForCondition(
  predicate: () => boolean,
  timeout = 5000,
  interval = 10
): Promise<void> {
  const start = Date.now()

  while (!predicate()) {
    if (Date.now() - start >= timeout) {
      throw new Error('Timed out waiting for condition')
    }

    await new Promise((resolve) => setTimeout(resolve, interval))
  }
}

describe('YhAiCodeEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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

    await waitForCondition(() => vi.mocked(monaco.editor.create).mock.calls.length > 0)

    expect(vi.mocked(monaco.editor.create).mock.calls.length).toBeGreaterThan(0)
  })

  it('should update value on prop change', async () => {
    const wrapper = mount(AiCodeEditor, {
      props: {
        modelValue: 'first'
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 50))

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

    await new Promise((resolve) => setTimeout(resolve, 50))
    await wrapper.setProps({ language: 'typescript' })
    expect(monaco.editor.setModelLanguage).toHaveBeenCalled()
  })
})
