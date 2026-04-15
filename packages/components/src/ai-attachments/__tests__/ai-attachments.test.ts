/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
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
})
