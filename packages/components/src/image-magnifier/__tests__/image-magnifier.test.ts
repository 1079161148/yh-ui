import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import ImageMagnifier from '../src/image-magnifier.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

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

  it('computes smart position when position="auto" (right/left/inside)', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, position: 'auto', maskWidth: 100, scale: 2, offset: 10 }
    })

    const el = wrapper.element as HTMLElement
    // @ts-expect-error test stub
    el.getBoundingClientRect = () => ({
      left: 200,
      right: 300,
      width: 100,
      height: 100,
      top: 0,
      bottom: 0
    })

    // right space enough -> right
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__preview').attributes('style') || '').toContain(
      'left: calc(100%'
    )

    // force left
    await wrapper.trigger('mouseleave')
    Object.defineProperty(window, 'innerWidth', { value: 320, configurable: true })
    // leftSpace = 220 >= previewW+offset => left
    // @ts-expect-error test stub
    el.getBoundingClientRect = () => ({
      left: 220,
      right: 320,
      width: 100,
      height: 100,
      top: 0,
      bottom: 0
    })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.yh-image-magnifier__preview').attributes('style') || '').toContain(
      'right: calc(100%'
    )

    // force inside (no space on both sides)
    await wrapper.trigger('mouseleave')
    // @ts-expect-error test stub
    el.getBoundingClientRect = () => ({
      left: 5,
      right: 315,
      width: 310,
      height: 100,
      top: 0,
      bottom: 0
    })
    Object.defineProperty(window, 'innerWidth', { value: 320, configurable: true })
    await wrapper.trigger('mouseenter')
    // inside renders preview inside wrapper
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

  it('supports wheel zoom clamping and emits scale-change', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: {
        ...BASE_PROPS,
        wheelZoom: true,
        minScale: 1.2,
        maxScale: 2,
        scaleStep: 0.3,
        scale: 1.5
      }
    })

    await wrapper.trigger('mouseenter')
    await nextTick()

    // dispatch wheel up (deltaY < 0 => +step)
    wrapper.element.dispatchEvent(new WheelEvent('wheel', { deltaY: -1, cancelable: true }))
    expect(wrapper.emitted('scale-change')).toBeTruthy()

    // clamp to max
    wrapper.element.dispatchEvent(new WheelEvent('wheel', { deltaY: -1, cancelable: true }))
    wrapper.element.dispatchEvent(new WheelEvent('wheel', { deltaY: -1, cancelable: true }))
    const last = wrapper.emitted('scale-change')?.at(-1)?.[0] as number
    expect(last).toBeLessThanOrEqual(2)

    // clamp to min
    await wrapper.trigger('mouseleave')
    await wrapper.trigger('mouseenter')
    wrapper.element.dispatchEvent(new WheelEvent('wheel', { deltaY: 999, cancelable: true }))
    const last2 = wrapper.emitted('scale-change')?.at(-1)?.[0] as number
    expect(last2).toBeGreaterThanOrEqual(1.2)
  })

  it('preloads hd image on hover (load and error branches)', async () => {
    const OrigImage = globalThis.Image
    let created = 0
    // @ts-expect-error test stub
    globalThis.Image = class {
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      set src(_v: string) {
        created += 1
        if (created === 1) queueMicrotask(() => this.onload?.())
        else queueMicrotask(() => this.onerror?.())
      }
    }

    const wrapper = mount(ImageMagnifier, { props: BASE_PROPS })
    await wrapper.trigger('mouseenter')
    await nextTick()

    // after onload, loading bar should eventually not show
    expect(created).toBeGreaterThan(0)

    // change image index to reset hd state and hit error path
    await wrapper.setProps({
      images: [
        { src: 'a', zoomSrc: 'z1' },
        { src: 'b', zoomSrc: 'z2' }
      ],
      modelValue: 0
    })
    await nextTick()
    ;(wrapper.vm as any).switchImage(1)
    await nextTick()
    await wrapper.trigger('mouseenter')
    await nextTick()

    // restore
    globalThis.Image = OrigImage
  })

  it('opens fullscreen on click and closes on Escape / overlay click', async () => {
    const wrapper = mount(ImageMagnifier, {
      props: { ...BASE_PROPS, clickToFullscreen: true }
    })

    expect(document.documentElement.style.overflow).toBe('')
    await wrapper.find('.yh-image-magnifier__image-wrapper').trigger('click')
    await nextTick()
    expect(document.body.querySelector('.yh-image-magnifier__fullscreen-overlay')).toBeTruthy()
    expect(document.documentElement.style.overflow).toBe('hidden')

    // Escape
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(document.documentElement.style.overflow).toBe('')

    // reopen and close by clicking overlay self
    await wrapper.find('.yh-image-magnifier__image-wrapper').trigger('click')
    await nextTick()
    const overlay = document.body.querySelector(
      '.yh-image-magnifier__fullscreen-overlay'
    ) as HTMLElement
    overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('.yh-image-magnifier__fullscreen-overlay')).toBeFalsy()
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
          themeOverrides: { 'preview-shadow': '0 0 20px red' }
        }
      })
    ).not.toThrow()
  })

  it('uses config-provider locale gallery labels', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(ImageMagnifier, {
            src: 'https://test.com/img0.jpg',
            images: [{ src: 'https://test.com/img0.jpg' }, { src: 'https://test.com/img1.jpg' }]
          })
      }
    })

    await nextTick()
    expect(wrapper.findAll('.yh-image-magnifier__gallery-item img')[1].attributes('alt')).toBe(
      'Gallery 2'
    )
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(ImageMagnifier, {
      props: {
        ...BASE_PROPS,
        themeOverrides: {
          'preview-shadow': '0 0 20px red'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain(
      '--yh-image-magnifier-preview-shadow: 0 0 20px red'
    )
  })
})
