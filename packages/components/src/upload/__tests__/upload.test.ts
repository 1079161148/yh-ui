import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { YhUpload } from '../index'
import { nextTick } from 'vue'

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:test-url')
global.URL.revokeObjectURL = vi.fn()

describe('Upload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock XMLHttpRequest correctly as a constructor
    const xhrMock: any = {
      open: vi.fn(),
      send: vi.fn(),
      setRequestHeader: vi.fn(),
      upload: { onprogress: null },
      readyState: 4,
      status: 200,
      responseText: '{"status":"success"}',
      onload: null,
      onerror: null
    }

    // Create a constructor function
    function MockXHR() {
      return xhrMock
    }
    vi.stubGlobal('XMLHttpRequest', MockXHR)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('render test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        fileList: []
      }
    })
    expect(wrapper.find('.yh-upload').exists()).toBe(true)
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
  })

  it('trigger input click when trigger area clicked', async () => {
    const wrapper = mount(YhUpload)
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement
    const spy = vi.spyOn(input, 'click')

    await wrapper.find('.yh-upload__trigger').trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it('handle file change and auto upload', async () => {
    const file = new File(['test content'], 'test.png', { type: 'image/png' })
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [],
        autoUpload: true,
        action: '/upload'
      }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    expect(wrapper.emitted('update:fileList')).toBeTruthy()
  })

  it('validate file with accept prop', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [],
        accept: 'image/*'
      }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    expect(wrapper.emitted('update:fileList')).toBeFalsy()
    warnSpy.mockRestore()
  })

  it('validate file size with maxSize prop', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const file = new File(['test content'], 'big.png', { type: 'image/png' })
    // In happy-dom/test env, we might need to mock size property if it's not correctly set from content
    Object.defineProperty(file, 'size', { value: 2000000, configurable: true })

    const wrapper = mount(YhUpload, {
      props: {
        fileList: [],
        maxSize: 1024 // 1MB limit
      }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    expect(wrapper.emitted('update:fileList')).toBeFalsy()
    warnSpy.mockRestore()
  })

  it('handle limit and exceed event', async () => {
    const file1 = new File(['1'], '1.png', { type: 'image/png' })
    const file2 = new File(['2'], '2.png', { type: 'image/png' })
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [{ name: 'existing.png', uid: 99, status: 'success' } as any],
        limit: 2
      }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file1, file2]
    })
    await input.trigger('change')

    expect(wrapper.emitted('exceed')).toBeTruthy()
    expect(wrapper.emitted('update:fileList')).toBeFalsy()
  })

  it('beforeUpload returning false should cancel upload', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const beforeUpload = vi.fn().mockReturnValue(false)
    const wrapper = mount(YhUpload, {
      props: { fileList: [], beforeUpload }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')
    await nextTick()

    expect(beforeUpload).toHaveBeenCalled()
    expect(wrapper.emitted('update:fileList')).toBeFalsy()
  })

  it('beforeUpload throwing error should cancel upload', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const beforeUpload = vi.fn().mockRejectedValue(new Error('error'))
    const wrapper = mount(YhUpload, {
      props: { fileList: [], beforeUpload }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('update:fileList')).toBeFalsy()
  })

  it('beforeUpload can transform files', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const newBlob = new Blob(['transformed-content'], { type: 'image/png' })
    const beforeUpload = vi.fn().mockResolvedValue(newBlob)

    const wrapper = mount(YhUpload, {
      props: { fileList: [], beforeUpload, action: '/upload' }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')

    await nextTick()
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('update:fileList')).toBeTruthy()
    const emitted = (wrapper.emitted('update:fileList')![0] as any)[0]
    // Check if raw is the transformed blob
    expect(emitted[0].raw.size).toBe(newBlob.size)
  })

  it('handle file removal with beforeRemove', async () => {
    const file = { name: 'test.png', uid: 1, status: 'success', url: 'blob:test' } as any
    const beforeRemove = vi.fn().mockResolvedValue(false)
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [file],
        beforeRemove
      }
    })

    await wrapper.find('.yh-upload__delete-btn').trigger('click')
    expect(beforeRemove).toHaveBeenCalled()
    expect(wrapper.emitted('update:fileList')).toBeFalsy()

    // Test allowing removal
    await wrapper.setProps({ beforeRemove: () => true })
    await wrapper.find('.yh-upload__delete-btn').trigger('click')
    expect(wrapper.emitted('update:fileList')).toBeTruthy()
  })

  it('picture-card actions work', async () => {
    const file = { name: 'test.png', uid: 1, status: 'success', url: 'blob:test' } as any
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [file],
        listType: 'picture-card',
        showDownload: true
      }
    })

    const actions = wrapper.find('.yh-upload__actions')
    const actionIcons = actions.findAll('span')

    await actionIcons[0].trigger('click') // preview
    expect(wrapper.emitted('preview')).toBeTruthy()

    await actionIcons[2].trigger('click') // delete
    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  it('retry upload when status is fail', async () => {
    const rawFile = new File(['fail'], 'fail.png', { type: 'image/png' })
    const file = { name: 'fail.png', uid: 123, status: 'fail', raw: rawFile } as any
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [file],
        action: '/upload',
        autoUpload: false
      }
    })

    const retryBtn = wrapper.find('.yh-upload__retry-btn')
    await retryBtn.trigger('click')
    expect(file.status).toBe('uploading')
  })

  it('drag and drop events', async () => {
    const wrapper = mount(YhUpload, {
      props: { drag: true }
    })
    const dragger = wrapper.find('.yh-upload__dragger')

    await dragger.trigger('dragover')
    expect(dragger.classes()).toContain('is-dragover')

    const file = new File(['drag test'], 'drag.png', { type: 'image/png' })
    const dropEvent = {
      dataTransfer: {
        items: [
          {
            webkitGetAsEntry: () => ({
              isFile: true,
              isDirectory: false,
              file: (cb: any) => cb(file)
            })
          }
        ]
      }
    }

    await dragger.trigger('drop', dropEvent)
    await nextTick()
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('update:fileList')).toBeTruthy()
  })

  it('custom httpRequest support', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const httpRequest = vi.fn()
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [],
        httpRequest,
        autoUpload: true,
        action: '/upload'
      }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')

    await nextTick()
    await nextTick()

    expect(httpRequest).toHaveBeenCalled()
  })

  it('custom fileIcon prop', async () => {
    const file = { name: 'test.zip', uid: 1, status: 'success' } as any

    const wrapper = mount(YhUpload, {
      props: { fileList: [file], fileIcon: 'custom-icon' }
    })
    const icon = wrapper.findComponent({ name: 'YhIcon' })
    expect(icon.props('name')).toBe('custom-icon')
  })

  it('slots test', () => {
    const wrapper = mount(YhUpload, {
      props: { fileList: [{ name: 'test.png', uid: 1, status: 'success' }] },
      slots: {
        tip: '<div class="custom-tip">Help</div>'
      }
    })
    expect(wrapper.find('.custom-tip').text()).toBe('Help')
  })

  it('expose methods', async () => {
    const rawFile = new File(['ready'], 'ready.png', { type: 'image/png' })
    const file = { name: 'ready.png', uid: 1, status: 'ready', raw: rawFile } as any
    const httpRequest = vi.fn()
    const wrapper = mount(YhUpload, {
      props: { fileList: [file], httpRequest, autoUpload: false, action: '/upload' }
    })

    wrapper.vm.submit()
    expect(httpRequest).toHaveBeenCalled()
  })

  it('handle upload progress and error', async () => {
    let onProgressCb: any
    let onErrorCb: any
    let onSuccessCb: any

    const httpRequest = (options: any) => {
      onProgressCb = options.onProgress
      onErrorCb = options.onError
      onSuccessCb = options.onSuccess
    }

    const file = { name: 'test.png', uid: 1, status: 'ready', raw: new File([], 'test.png') } as any
    const wrapper = mount(YhUpload, {
      props: { fileList: [file], httpRequest, action: '/upload' }
    })

    wrapper.vm.submit()

    onProgressCb({ percent: 50 })
    expect(file.percentage).toBe(50)
    expect(wrapper.emitted('progress')).toBeTruthy()

    onErrorCb(new Error('fail'))
    expect(file.status).toBe('fail')
    expect(wrapper.emitted('error')).toBeTruthy()

    file.status = 'ready'
    wrapper.vm.submit()
    onSuccessCb({ data: 'ok' })
    expect(file.status).toBe('success')
    expect(wrapper.emitted('success')).toBeTruthy()
  })

  it('handle download', async () => {
    const file = { name: 'test.png', uid: 1, status: 'success', url: 'blob:test' } as any
    const wrapper = mount(YhUpload, {
      props: { fileList: [file], showDownload: true }
    })

    const spy = vi.spyOn(document, 'createElement')
    await wrapper.find('.yh-upload__download-btn').trigger('click')
    expect(wrapper.emitted('download')).toBeTruthy()
    expect(spy).toHaveBeenCalledWith('a')
  })

  it('support thumbnailRequest', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' })
    const thumbnailRequest = vi.fn().mockResolvedValue('custom-thumb')
    const wrapper = mount(YhUpload, {
      props: { fileList: [], listType: 'picture', thumbnailRequest }
    })

    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')
    await nextTick()
    await nextTick()
    await nextTick()

    const emitted = (wrapper.emitted('update:fileList')![0] as any)[0]
    expect(emitted[0].url).toBe('custom-thumb')
  })

  it('support fileIcon as function', () => {
    const file = { name: 'test.txt', uid: 1, status: 'success' } as any
    const fileIcon = vi.fn().mockReturnValue('func-icon')
    mount(YhUpload, {
      props: { fileList: [file], fileIcon }
    })
    expect(fileIcon).toHaveBeenCalled()
  })
})
