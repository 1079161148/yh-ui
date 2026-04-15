/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiFileCard from '../src/ai-file-card.vue'

describe('YhAiFileCard', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf' }
    })
    expect(wrapper.find('.yh-ai-file-card').exists()).toBe(true)
  })

  it('should render file icon', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf' }
    })
    expect(wrapper.find('.yh-ai-file-card__icon-wrapper').exists()).toBe(true)
  })

  it('should render file name', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf' }
    })
    expect(wrapper.find('.yh-ai-file-card__name').text()).toBe('test.pdf')
  })

  it('should render file size', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf', byte: 1024 }
    })
    expect(wrapper.find('.yh-ai-file-card__size').exists()).toBe(true)
  })

  // ─── Sizes ──────────────────────────────────────────────
  it('should render small size', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf', size: 'small' }
    })
    expect(wrapper.find('.yh-ai-file-card--small').exists()).toBe(true)
  })

  it('should render default size', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf', size: 'default' }
    })
    expect(wrapper.find('.yh-ai-file-card--default').exists()).toBe(true)
  })

  it('should render large size', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf', size: 'large' }
    })
    expect(wrapper.find('.yh-ai-file-card--large').exists()).toBe(true)
  })

  // ─── File Types ──────────────────────────────────────────
  it('should render image type', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'image.png', type: 'image', src: 'http://example.com/image.png' }
    })
    expect(wrapper.find('.yh-ai-file-card__image-wrapper').exists()).toBe(true)
  })

  it('should render video type', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'video.mp4', type: 'video' }
    })
    expect(wrapper.find('.yh-ai-file-card__image-wrapper').exists()).toBe(true)
  })

  it('should render audio type', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'audio.mp3', type: 'audio' }
    })
    expect(wrapper.find('.yh-ai-file-card__image-wrapper').exists()).toBe(true)
  })

  it('should render video with src and native controls', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'video.mp4', type: 'video', src: 'https://example.com/video.mp4' }
    })
    const video = wrapper.find('video')
    expect(video.exists()).toBe(true)
    expect(video.attributes('controls')).toBeDefined()
  })

  it('should render audio with src and native controls', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'audio.mp3', type: 'audio', src: 'https://example.com/audio.mp3' }
    })
    const audio = wrapper.find('audio')
    expect(audio.exists()).toBe(true)
    expect(audio.attributes('controls')).toBeDefined()
  })

  // ─── Loading State ───────────────────────────────────────
  it('should show loading state', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf', loading: true }
    })
    expect(wrapper.find('.yh-ai-file-card__icon-wrapper').exists()).toBe(true)
  })

  // ─── Description ─────────────────────────────────────────
  it('should render description', () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf', description: 'Test file description' }
    })
    expect(wrapper.find('.yh-ai-file-card__description').text()).toBe('Test file description')
  })

  // ─── Click Event ─────────────────────────────────────────
  it('should emit click event', async () => {
    const wrapper = mount(AiFileCard, {
      props: { name: 'test.pdf' }
    })
    await wrapper.find('.yh-ai-file-card').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // ─── Props Validation ────────────────────────────────────
  it('should validate props', async () => {
    const { aiFileCardProps } = await import('../src/ai-file-card')
    expect(aiFileCardProps.name.required).toBe(true)
    expect(aiFileCardProps.size.default).toBe('default')
  })

  // ─── Emits Validation ────────────────────────────────────
  it('should validate emits', async () => {
    const { aiFileCardEmits } = await import('../src/ai-file-card')
    expect(aiFileCardEmits.click()).toBe(true)
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiFileCard, {
      props: {
        name: 'theme.pdf',
        themeOverrides: {
          'bg-color': '#f5f5f5'
        }
      }
    })

    expect(wrapper.find('.yh-ai-file-card').attributes('style')).toContain(
      '--yh-ai-file-card-bg-color: #f5f5f5'
    )
  })
})
