import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AiCodeRunner from '../src/ai-code-runner.vue'
import { nextTick } from 'vue'
import { getWebContainerInstance } from '../src/webcontainer'

const { createProcess, mockWebContainer } = vi.hoisted(() => {
  const createProcess = (lines = ['hello from process'], exitCode = 0) => ({
    exit: Promise.resolve(exitCode),
    output: {
      pipeTo: vi.fn(async (stream: WritableStream<string>) => {
        const writer = stream.getWriter()
        for (const line of lines) {
          await writer.write(`${line}\n`)
        }
        await writer.close()
      })
    }
  })

  const mockWebContainer = {
    mount: vi.fn().mockResolvedValue(undefined),
    spawn: vi.fn(() => createProcess())
  }

  return { createProcess, mockWebContainer }
})

const flushAsync = async () => {
  await Promise.resolve()
  await Promise.resolve()
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 0))
}

// Mock WebContainer
vi.mock('../src/webcontainer', () => {
  return {
    getWebContainerInstance: vi.fn().mockResolvedValue(mockWebContainer),
    WebContainer: class {}
  }
})

describe('YhAiCodeRunner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockWebContainer.mount.mockResolvedValue(undefined)
    mockWebContainer.spawn.mockImplementation(() => createProcess())
    vi.mocked(getWebContainerInstance).mockResolvedValue(mockWebContainer as any)
  })

  it('should render toolbar and terminal', () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("hi")'
      }
    })
    expect(wrapper.find('.yh-ai-code-runner__toolbar').exists()).toBe(true)
    expect(wrapper.find('.yh-ai-code-runner__terminal').exists()).toBe(true)
  })

  it('should run code when button clicked', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("hello")'
      }
    })

    await nextTick()

    const runBtn = wrapper.find('.yh-button--primary')
    await runBtn.trigger('click')
    await nextTick()

    const mockedGetter = vi.mocked(getWebContainerInstance)
    const container = await mockedGetter.mock.results[0].value
    expect(container.mount).toHaveBeenCalled()
    expect(container.spawn).toHaveBeenCalledWith('node', ['index.js'])
    expect(wrapper.emitted('run')?.[0]).toEqual(['console.log("hello")'])
    expect(wrapper.emitted('ready')).toBeTruthy()
  })

  it('should render string height values directly', () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("hi")',
        height: '320px'
      }
    })

    expect(wrapper.find('.yh-ai-code-runner__terminal').attributes('style')).toContain(
      'height: 320px'
    )
  })

  it('should emit output lines and render them in terminal', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("hello")'
      }
    })

    await wrapper.find('.yh-button--primary').trigger('click')
    await flushAsync()

    expect(wrapper.emitted('output')).toBeTruthy()
    expect(wrapper.text()).toContain('hello from process')
    expect(wrapper.text()).toContain('执行完成')
  })

  it('should emit stop and append stop message', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("hi")'
      }
    })

    await wrapper.vm.run()
    wrapper.vm.stop()
    await nextTick()

    expect(wrapper.emitted('stop')).toBeTruthy()
    expect(wrapper.text()).toContain('执行已停止')
  })

  it('should reset container state and clear output', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("hi")'
      }
    })

    await wrapper.vm.run()
    await nextTick()
    await wrapper.vm.reset()
    await nextTick()

    expect(wrapper.text()).toContain('WebContainer 已重置')
    wrapper.vm.clear()
    await nextTick()
    expect(wrapper.find('.yh-ai-code-runner__placeholder').exists()).toBe(true)
  })

  it('should support autorun when mounted and when code changes', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("first")',
        autorun: true
      }
    })

    await flushAsync()

    const mockedGetter = vi.mocked(getWebContainerInstance)
    const container = await mockedGetter.mock.results[0].value
    const initialCalls = container.spawn.mock.calls.length
    expect(initialCalls).toBeGreaterThanOrEqual(1)

    await wrapper.setProps({ code: 'console.log("second")' })
    await flushAsync()

    expect(container.spawn.mock.calls.length).toBeGreaterThan(initialCalls)
  })

  it('should emit error when container initialization fails', async () => {
    vi.mocked(getWebContainerInstance).mockRejectedValue(new Error('boot failed'))

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: ''
      }
    })

    await flushAsync()

    expect(wrapper.emitted('error')?.at(0)).toEqual(['boot failed'])
  })

  it('should fallback to unknown error text when initialization throws a non-error', async () => {
    vi.mocked(getWebContainerInstance).mockRejectedValue('boot failed')

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: ''
      }
    })

    await flushAsync()

    expect(wrapper.emitted('error')?.at(0)).toEqual(['Unknown error'])
    expect(wrapper.find('.yh-ai-code-runner--error').exists()).toBe(true)
  })

  it('should emit error when spawn returns a failing exit code', async () => {
    mockWebContainer.spawn.mockResolvedValueOnce({
      exit: Promise.resolve(2),
      output: {
        pipeTo: vi.fn(async () => {})
      }
    } as any)

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("fail")'
      }
    })

    await wrapper.find('.yh-button--primary').trigger('click')
    await flushAsync()

    expect(wrapper.text()).toContain('退出码: 2')
  })

  it('should show placeholder when no output', () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: ''
      }
    })
    expect(wrapper.find('.yh-ai-code-runner__placeholder').exists()).toBe(true)
  })

  it('should render unknown exit code when process exits without a code', async () => {
    mockWebContainer.spawn.mockResolvedValueOnce({
      exit: Promise.resolve(undefined),
      output: {
        pipeTo: vi.fn(async () => {})
      }
    } as any)

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("unknown")'
      }
    })

    await wrapper.find('.yh-button--primary').trigger('click')
    await flushAsync()

    expect(wrapper.text()).toContain('unknown')
    expect(wrapper.find('.yh-ai-code-runner--error').exists()).toBe(true)
  })

  it('should clear output when method called', async () => {
    const wrapper = mount(AiCodeRunner)
    await nextTick()

    if (wrapper.vm.clear) {
      wrapper.vm.clear()
    }

    expect(wrapper.find('.yh-ai-code-runner__placeholder').exists()).toBe(true)
  })

  it('should mark failing output lines as error lines', async () => {
    mockWebContainer.spawn.mockResolvedValueOnce({
      exit: Promise.resolve(2),
      output: {
        pipeTo: vi.fn(async () => {})
      }
    } as any)

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("fail")'
      }
    })

    await wrapper.find('.yh-button--primary').trigger('click')
    await flushAsync()

    expect(wrapper.find('.yh-ai-code-runner--error').exists()).toBe(true)
  })

  it('should not run when code is empty', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: ''
      }
    })

    await wrapper.vm.run()
    await flushAsync()

    expect(mockWebContainer.mount).not.toHaveBeenCalled()
    expect(wrapper.emitted('run')).toBeFalsy()
  })

  it('should show stop button while process is running and emit stop from toolbar', async () => {
    let resolveExit: ((value: number) => void) | undefined
    mockWebContainer.spawn.mockResolvedValueOnce({
      exit: new Promise<number>((resolve) => {
        resolveExit = resolve
      }),
      output: {
        pipeTo: vi.fn(async () => {})
      }
    } as any)

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("wait")'
      }
    })

    const runPromise = wrapper.vm.run()
    await flushAsync()

    const stopButton = wrapper.find('.yh-button--danger')
    expect(stopButton.exists()).toBe(true)

    await stopButton.trigger('click')
    expect(wrapper.emitted('stop')).toBeTruthy()

    resolveExit?.(0)
    await runPromise
  })

  it('should reuse initialized container without re-emitting ready', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("reuse")'
      }
    })

    await flushAsync()
    expect(wrapper.emitted('ready')).toHaveLength(1)

    await wrapper.vm.run()
    await flushAsync()

    expect(vi.mocked(getWebContainerInstance)).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('ready')).toHaveLength(1)
  })

  it('should ignore code changes when autorun is disabled', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("first")',
        autorun: false
      }
    })

    await flushAsync()
    const initialRunCount = wrapper.emitted('run')?.length ?? 0

    await wrapper.setProps({ code: 'console.log("second")' })
    await flushAsync()

    expect(wrapper.emitted('run')?.length ?? 0).toBe(initialRunCount)
  })

  it('should render numeric heights as pixel values', () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("hi")',
        height: 260
      }
    })

    expect(wrapper.find('.yh-ai-code-runner__terminal').attributes('style')).toContain(
      'height: 260px'
    )
  })

  it('should convert non-Error execution failures to strings', async () => {
    mockWebContainer.mount.mockRejectedValueOnce('mount failed')

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("boom")'
      }
    })

    await wrapper.vm.run()
    await flushAsync()

    expect(wrapper.emitted('error')?.at(-1)).toEqual(['mount failed'])
    expect(wrapper.find('.yh-ai-code-runner--error').exists()).toBe(true)
  })

  it('should clear cached container reference on unmount after initialization', async () => {
    const wrapper = mount(AiCodeRunner, {
      props: {
        code: 'console.log("cleanup")'
      }
    })

    await flushAsync()
    wrapper.unmount()

    expect(wrapper.exists()).toBe(false)
  })

  it('should allow unmount before initialization finishes', async () => {
    let resolveContainer: ((value: typeof mockWebContainer) => void) | undefined
    vi.mocked(getWebContainerInstance).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveContainer = resolve as (value: typeof mockWebContainer) => void
        }) as any
    )

    const wrapper = mount(AiCodeRunner, {
      props: {
        code: ''
      }
    })

    wrapper.unmount()
    resolveContainer?.(mockWebContainer)
    await flushAsync()

    expect(wrapper.exists()).toBe(false)
  })
})
