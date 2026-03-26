import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageMagnifier from '../src/image-magnifier.vue'

const BASE_PROPS = {
  src: 'https://test.com/small.jpg',
  zoomSrc: 'https://test.com/large.jpg'
}

describe('ImageMagnifier', () => {
  // ─── 基础渲染 ────────────────────────────────────────────────────────────
  it('renders main image correctly', () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, title: 'See Details' }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://test.com/small.jpg')
    expect(wrapper.text()).toContain('See Details')
  })

  it('renders with alt attribute', () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, alt: 'Product image' }
    })
    expect(wrapper.find('img').attributes('alt')).toBe('Product image')
  })

  // ─── 鼠标交互 ────────────────────────────────────────────────────────────
  it('shows mask and preview on mouseenter', async () => {
    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__mask').exists()).toBe(true)
    expect(wrapper.find('.yh-image-magnifier__preview').exists()).toBe(true)
  })

  it('hides content on mouseleave', async () => {
    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    await wrapper.trigger('mouseenter')
    await wrapper.trigger('mouseleave')
    expect(wrapper.find('.yh-image-magnifier__preview').exists()).toBe(false)
  })

  it('emits zoom-start on enter and zoom-end on leave', async () => {
    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    await wrapper.trigger('mouseenter')
    expect(wrapper.emitted('zoom-start')).toBeTruthy()
    await wrapper.trigger('mouseleave')
    expect(wrapper.emitted('zoom-end')).toBeTruthy()
  })

  it('emits enter / leave events', async () => {
    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    await wrapper.trigger('mouseenter')
    expect(wrapper.emitted('enter')).toBeTruthy()
    await wrapper.trigger('mouseleave')
    expect(wrapper.emitted('leave')).toBeTruthy()
  })

  // ─── 遮罩形状 ────────────────────────────────────────────────────────────
  it('supports circle mask shape', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, maskShape: 'circle' }
    })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__mask').classes()).toContain('is-circle')
  })

  it('supports square mask shape', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, maskShape: 'square' }
    })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__mask').classes()).toContain('is-square')
  })

  // ─── 边框与阴影 ──────────────────────────────────────────────────────────
  it('applies is-bordered class when border=true', () => {
    const wrapper = mount(ImageMagnifier, { props: { ...BASE_PROPS, border: true } })
    expect(wrapper.find('.yh-image-magnifier__image-wrapper').classes()).toContain('is-bordered')
  })

  it('applies is-shadow class when shadow=true', () => {
    const wrapper = mount(ImageMagnifier, { props: { ...BASE_PROPS, shadow: true } })
    expect(wrapper.find('.yh-image-magnifier__image-wrapper').classes()).toContain('is-shadow')
  })

  // ─── 功能1: 滚轮缩放 ─────────────────────────────────────────────────────
  it('initializes currentScale from props.scale', () => {
    const wrapper = mount(ImageMagnifier, { props: { ...BASE_PROPS, scale: 3 } })
    expect((wrapper.vm as InstanceType<typeof ImageMagnifier>).currentScale).toBe(3)
  })

  it('exposes currentScale via defineExpose', () => {
    const wrapper = mount(ImageMagnifier, { props: { ...BASE_PROPS, scale: 2.5 } })
    expect((wrapper.vm as InstanceType<typeof ImageMagnifier>).currentScale).toBe(2.5)
  })

  // ─── 功能2: 自适应定位 ────────────────────────────────────────────────────
  it('defaults resolvedPosition to right for position="right"', async () => {
    const wrapper = mount(ImageMagnifier, { props: { ...BASE_PROPS, position: 'right' } })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__preview').exists()).toBe(true)
  })

  it('renders inside mode correctly', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, position: 'inside' }
    })
    await wrapper.trigger('mouseenter')
    // Inside mode: no external mask
    expect(wrapper.find('.yh-image-magnifier__mask').exists()).toBe(false)
  })

  // ─── 功能4: 图片库 ────────────────────────────────────────────────────────
  it('renders gallery thumbnails when images array is provided', () => {
    const wrapper = mount(ImageMagnifier, {
      props: {
        src: 'https://test.com/img0.jpg',
        images: [
          { src: 'https://test.com/img0.jpg', zoomSrc: 'https://test.com/z0.jpg' },
          { src: 'https://test.com/img1.jpg', zoomSrc: 'https://test.com/z1.jpg' }
        ]
      }
    })
    expect(wrapper.findAll('.yh-image-magnifier__gallery-item')).toHaveLength(2)
  })

  it('switches image on gallery thumbnail click', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: {
        src: 'https://test.com/img0.jpg',
        images: [{ src: 'https://test.com/img0.jpg' }, { src: 'https://test.com/img1.jpg' }]
      }
    })
    const items = wrapper.findAll('.yh-image-magnifier__gallery-item')
    await items[1].trigger('click')
    expect(wrapper.emitted('image-change')?.[0]).toEqual([1])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  // ─── 功能5: 缩略导航 ─────────────────────────────────────────────────────
  it('renders minimap when showMinimap=true and visible', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, showMinimap: true }
    })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__minimap').exists()).toBe(true)
  })

  it('does not render minimap by default', async () => {
    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__minimap').exists()).toBe(false)
  })

  // ─── 功能6: 全屏预览 ─────────────────────────────────────────────────────
  it('shows cursor zoom-in when clickToFullscreen=true', () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, clickToFullscreen: true }
    })
    const imageWrapper = wrapper.find('.yh-image-magnifier__image-wrapper')
    expect(imageWrapper.attributes('style')).toContain('zoom-in')
  })

  it('does not apply zoom-in cursor when clickToFullscreen=false', () => {
    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    const imageWrapper = wrapper.find('.yh-image-magnifier__image-wrapper')
    expect(imageWrapper.attributes('style') ?? '').not.toContain('zoom-in')
  })

  // ─── 倍率徽章 ────────────────────────────────────────────────────────────
  it('shows scale-badge when wheelZoom=true and during hover', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, wheelZoom: true }
    })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__scale-badge').exists()).toBe(true)
  })

  it('hides scale-badge when wheelZoom=false', async () => {
    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__scale-badge').exists()).toBe(false)
  })

  // ─── 插槽 ────────────────────────────────────────────────────────────────
  it('renders default slot content', () => {
    const wrapper = mount(ImageMagnifier, {
      props: BASE_PROPS,
      slots: { default: '<div class="custom-image">CUSTOM</div>' }
    })
    expect(wrapper.find('.custom-image').exists()).toBe(true)
    expect(wrapper.text()).toContain('CUSTOM')
  })

  it('renders title slot', () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, title: 'fallback' },
      slots: { title: '<span class="slot-title">Custom Title</span>' }
    })
    expect(wrapper.find('.slot-title').text()).toBe('Custom Title')
  })

  // ─── 主题覆盖 ────────────────────────────────────────────────────────────
  it('accepts themeOverrides without error', () => {
    expect(() =>
      mount(ImageMagnifier, {
        props: {
          ...BASE_PROPS,
          themeOverrides: { '--yh-magnifier-preview-shadow': '0 0 20px red' }
        }
      })
    ).not.toThrow()
  })
})
