/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import AiAttachments from '../src/ai-attachments.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhAiAttachments', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiAttachments)
    expect(wrapper.find('.yh-ai-attachments').exists()).toBe(true)
  })

  it('should render upload button by default', () => {
    const wrapper = mount(AiAttachments)
    expect(wrapper.find('.yh-ai-attachments__upload').exists()).toBe(true)
  })

  // ─── File List ───────────────────────────────────────────
  it('should render file items', () => {
    const items = [
      { uid: 1, name: 'test1.pdf', type: 'file' },
      { uid: 2, name: 'test2.png', type: 'image' }
    ]
    const wrapper = mount(AiAttachments, {
      props: { items }
    })
    expect(wrapper.findAll('.yh-ai-attachments__item').length).toBe(2)
  })

  // ─── Overflow Modes ───────────────────────────────────────
  it('should render scrollX overflow mode', () => {
    const wrapper = mount(AiAttachments, {
      props: { overflow: 'scrollX' }
    })
    expect(wrapper.find('.yh-ai-attachments--overflow-scrollX').exists()).toBe(true)
  })

  it('should render scrollY overflow mode', () => {
    const wrapper = mount(AiAttachments, {
      props: { overflow: 'scrollY' }
    })
    expect(wrapper.find('.yh-ai-attachments--overflow-scrollY').exists()).toBe(true)
  })

  it('should render wrap overflow mode', () => {
    const wrapper = mount(AiAttachments, {
      props: { overflow: 'wrap' }
    })
    expect(wrapper.find('.yh-ai-attachments--overflow-wrap').exists()).toBe(true)
  })

  // ─── Hide Upload ──────────────────────────────────────────
  it('should hide upload button when hideUpload is true', () => {
    const wrapper = mount(AiAttachments, {
      props: { hideUpload: true }
    })
    expect(wrapper.find('.yh-ai-attachments__upload').exists()).toBe(false)
  })

  // ─── Disabled State ───────────────────────────────────────
  it('should apply disabled state', () => {
    const wrapper = mount(AiAttachments, {
      props: { disabled: true }
    })
    expect(wrapper.find('.yh-ai-attachments').exists()).toBe(true)
    expect(wrapper.find('input[type="file"]').attributes('disabled')).toBeDefined()
  })

  // ─── Max Count ───────────────────────────────────────────
  it('should hide upload when maxCount is reached', () => {
    const items = [
      { uid: 1, name: 'test1.pdf' },
      { uid: 2, name: 'test2.pdf' }
    ]
    const wrapper = mount(AiAttachments, {
      props: { items, maxCount: 2 }
    })
    expect(wrapper.find('.yh-ai-attachments__upload').exists()).toBe(false)
  })

  // ─── Drag and Drop ───────────────────────────────────────
  it('should handle drag events', async () => {
    const wrapper = mount(AiAttachments)

    await wrapper.find('.yh-ai-attachments').trigger('dragenter')
    expect(wrapper.find('.yh-ai-attachments__drop-mask').exists()).toBe(true)

    await wrapper.find('.yh-ai-attachments').trigger('dragleave')
    // After dragleave, mask should be hidden (implementation detail)
  })

  // ─── Props Validation ────────────────────────────────────
  it('should validate props defaults', async () => {
    const { aiAttachmentsProps } = await import('../src/ai-attachments')
    expect(aiAttachmentsProps.overflow.default).toBe('scrollX')
    expect(aiAttachmentsProps.hideUpload.default).toBe(false)
    expect(aiAttachmentsProps.disabled.default).toBe(false)
  })

  // ─── Emits Validation ────────────────────────────────────
  it('should validate emits', async () => {
    const { aiAttachmentsEmits } = await import('../src/ai-attachments')
    expect(aiAttachmentsEmits['update:items']([])).toBe(true)
    expect(aiAttachmentsEmits['delete-card']({ name: 'test' }, 0)).toBe(true)
  })

  it('should use config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(AiAttachments, {
            placeholder: () => ({})
          })
      }
    })

    await wrapper.find('.yh-ai-attachments').trigger('dragenter')
    await nextTick()
    expect(wrapper.text()).toContain('Drop files here to upload')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiAttachments, {
      props: {
        themeOverrides: {
          'upload-bg': '#101010'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-ai-attachments-upload-bg: #101010')
  })

  it('should process file selection with successful custom upload', async () => {
    const httpRequest = vi.fn().mockResolvedValue({ ok: true })
    const wrapper = mount(AiAttachments, {
      props: {
        httpRequest
      }
    })

    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file],
      configurable: true
    })

    await input.trigger('change')

    expect(httpRequest).toHaveBeenCalled()
    expect(wrapper.emitted('upload-change')).toBeTruthy()
    expect(wrapper.emitted('upload-success')).toBeTruthy()
    expect(wrapper.emitted('update:items')).toBeTruthy()
    expect(wrapper.text()).toContain('hello.txt')
    expect(wrapper.find('.yh-ai-attachments__progress-wrap').exists()).toBe(false)
  })

  it('should emit upload-error when custom upload fails', async () => {
    const httpRequest = vi.fn().mockRejectedValue(new Error('upload failed'))
    const wrapper = mount(AiAttachments, {
      props: {
        httpRequest
      }
    })

    const file = new File(['broken'], 'broken.txt', { type: 'text/plain' })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file],
      configurable: true
    })

    await input.trigger('change')

    expect(wrapper.emitted('upload-error')).toBeTruthy()
    expect(wrapper.text()).toContain('upload failed')
  })

  it('should stop processing files rejected by beforeUpload', async () => {
    const beforeUpload = vi.fn().mockResolvedValue(false)
    const wrapper = mount(AiAttachments, {
      props: {
        beforeUpload
      }
    })

    const file = new File(['noop'], 'noop.txt', { type: 'text/plain' })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file],
      configurable: true
    })

    await input.trigger('change')

    expect(beforeUpload).toHaveBeenCalledWith(file)
    expect(wrapper.emitted('update:items')?.at(-1)?.[0]).toEqual([])
    expect(wrapper.findAll('.yh-ai-attachments__item')).toHaveLength(0)
  })

  it('should emit upload-drop and update items when files are dropped', async () => {
    const wrapper = mount(AiAttachments)
    const file = new File(['drop'], 'drop.txt', { type: 'text/plain' })

    await wrapper.find('.yh-ai-attachments').trigger('drop', {
      dataTransfer: { files: [file] }
    })

    expect(wrapper.emitted('upload-drop')?.[0]?.[0]).toEqual([file])
    expect(wrapper.emitted('upload-change')).toBeTruthy()
    expect(wrapper.emitted('update:items')).toBeTruthy()
  })

  it('should delete items and emit delete-card', async () => {
    const wrapper = mount(AiAttachments, {
      props: {
        items: [{ uid: 1, name: 'remove.txt', status: 'done' }]
      }
    })

    await wrapper.find('.yh-ai-attachments__delete-btn').trigger('click')

    expect(wrapper.emitted('delete-card')?.[0]?.[0]).toMatchObject({ name: 'remove.txt' })
    expect(wrapper.emitted('update:items')?.[0]?.[0]).toEqual([])
  })

  it('should show and use scroll buttons in scrollX mode', async () => {
    const wrapper = mount(AiAttachments, {
      props: {
        overflow: 'scrollX',
        items: [
          { uid: 1, name: '1.txt' },
          { uid: 2, name: '2.txt' },
          { uid: 3, name: '3.txt' },
          { uid: 4, name: '4.txt' }
        ]
      }
    })

    const list = wrapper.find('.yh-ai-attachments__list').element as HTMLDivElement
    list.scrollLeft = 200

    await wrapper.find('.yh-ai-attachments__scroll-prev').trigger('click')
    expect(list.scrollLeft).toBe(0)

    await wrapper.find('.yh-ai-attachments__scroll-next').trigger('click')
    expect(list.scrollLeft).toBe(200)
  })

  it('should normalize string placeholder for upload and drop states', async () => {
    const wrapper = mount(AiAttachments, {
      props: {
        placeholder: 'Upload now'
      }
    })

    expect(wrapper.text()).toContain('Upload now')
    await wrapper.find('.yh-ai-attachments').trigger('dragenter')
    expect(wrapper.text()).toContain('Upload now')
  })

  it('should support placeholder function for inline and drop modes', async () => {
    const placeholder = vi.fn((type: 'inline' | 'drop') =>
      type === 'drop'
        ? { icon: 'folder', title: 'Drop custom title' }
        : { icon: 'upload', title: 'Inline title', description: 'Inline desc' }
    )
    const wrapper = mount(AiAttachments, {
      props: {
        placeholder
      }
    })

    expect(wrapper.text()).toContain('Inline title')
    expect(wrapper.text()).toContain('Inline desc')

    await wrapper.find('.yh-ai-attachments').trigger('dragenter')
    expect(wrapper.text()).toContain('Drop custom title')
    expect(placeholder).toHaveBeenCalledWith('drop')
  })

  it('should apply scroll max height in scrollY mode', () => {
    const wrapper = mount(AiAttachments, {
      props: {
        overflow: 'scrollY',
        scrollMaxHeight: '240px'
      }
    })

    expect(wrapper.attributes('style')).toContain('max-height: 240px')
  })

  it('should not process invalid files with empty type', async () => {
    const httpRequest = vi.fn()
    const wrapper = mount(AiAttachments, {
      props: {
        httpRequest
      }
    })

    const invalidFile = new File(['x'], 'mystery.bin', { type: '' })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [invalidFile],
      configurable: true
    })

    await input.trigger('change')

    expect(httpRequest).not.toHaveBeenCalled()
    expect(wrapper.emitted('upload-change')).toBeFalsy()
    expect(wrapper.emitted('update:items')).toBeFalsy()
  })

  it('should add items even without custom httpRequest', async () => {
    const wrapper = mount(AiAttachments)
    const file = new File(['plain'], 'plain.txt', { type: 'text/plain' })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [file],
      configurable: true
    })

    await input.trigger('change')

    expect(wrapper.emitted('upload-change')).toBeTruthy()
    expect(wrapper.emitted('upload-success')).toBeFalsy()
    expect(wrapper.emitted('update:items')?.at(-1)?.[0]).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'plain.txt', status: 'uploading' })])
    )
  })

  it('should keep drag mask visible until nested drag leaves are balanced', async () => {
    const wrapper = mount(AiAttachments)
    const root = wrapper.find('.yh-ai-attachments')

    await root.trigger('dragenter')
    await root.trigger('dragenter')
    await root.trigger('dragleave')
    expect(wrapper.find('.yh-ai-attachments__drop-mask').exists()).toBe(true)

    await root.trigger('dragleave')
    expect(wrapper.find('.yh-ai-attachments__drop-mask').exists()).toBe(false)
  })

  it('should not trigger hidden file input when upload is disabled', async () => {
    const wrapper = mount(AiAttachments, {
      props: {
        disabled: true
      }
    })

    const input = wrapper.find('input[type="file"]').element as HTMLInputElement
    const clickSpy = vi.spyOn(input, 'click')

    expect(wrapper.find('.yh-ai-attachments__upload').exists()).toBe(false)
    await wrapper.find('.yh-ai-attachments').trigger('click')

    expect(clickSpy).not.toHaveBeenCalled()
  })

  it('should prefer custom item icon and fallback unknown extensions to empty icon', () => {
    const wrapper = mount(AiAttachments, {
      props: {
        items: [
          { uid: 1, name: 'manual.bin', icon: 'python' },
          { uid: 2, name: 'mystery.abc' }
        ]
      }
    })

    const cards = wrapper.findAllComponents({ name: 'YhAiFileCard' })
    expect(cards[0].props('icon')).toBe('python')
    expect(cards[1].props('icon')).toBe('default')
  })

  it('should fallback placeholder object to empty values when null is provided', async () => {
    const wrapper = mount(AiAttachments, {
      props: {
        placeholder: null as unknown as object
      }
    })

    expect(wrapper.find('.yh-ai-attachments__upload-title').text()).toBe('')
    await wrapper.find('.yh-ai-attachments').trigger('dragenter')
    expect(wrapper.find('.yh-ai-attachments__drop-text').text()).not.toBe('')
  })

  it('should handle dropped empty file lists without emitting upload', async () => {
    const wrapper = mount(AiAttachments)

    await wrapper.find('.yh-ai-attachments').trigger('drop', {
      dataTransfer: { files: [] }
    })

    expect(wrapper.emitted('upload-drop')).toBeFalsy()
    expect(wrapper.emitted('upload-change')).toBeFalsy()
  })

  it('should fallback attachment type to file when mime prefix is empty', async () => {
    const wrapper = mount(AiAttachments)
    const strangeFile = new File(['raw'], 'raw.data', { type: '/' })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [strangeFile],
      configurable: true
    })

    await input.trigger('change')

    expect(wrapper.emitted('update:items')?.at(-1)?.[0]).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: 'file' })])
    )
  })
})
