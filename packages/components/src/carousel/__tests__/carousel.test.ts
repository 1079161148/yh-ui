import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Carousel from '../src/carousel.vue'
import CarouselItem from '../src/carousel-item.vue'
import { nextTick, h } from 'vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('Carousel 组件', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('应该正确渲染基础结构', async () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: `
          <y-carousel-item>Slide 1</y-carousel-item>
          <y-carousel-item>Slide 2</y-carousel-item>
        `
      },
      global: {
        components: {
          'y-carousel-item': CarouselItem
        }
      }
    })

    await nextTick()
    expect(wrapper.find('.yh-carousel').exists()).toBe(true)
    expect(wrapper.findAll('.yh-carousel-item').length).toBe(2)
  })

  it('应该支持前进和后退导航', async () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: `
          <y-carousel-item>1</y-carousel-item>
          <y-carousel-item>2</y-carousel-item>
        `
      },
      global: {
        components: { 'y-carousel-item': CarouselItem }
      }
    })

    await nextTick()
    const nextBtn = wrapper.find('.yh-carousel__arrow--next')
    await nextBtn.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(1)

    const prevBtn = wrapper.find('.yh-carousel__arrow--prev')
    await prevBtn.trigger('click')
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('应该支持自动播放', async () => {
    const wrapper = mount(Carousel, {
      props: {
        autoplay: true,
        interval: 1000
      },
      slots: {
        default: `
          <y-carousel-item>1</y-carousel-item>
          <y-carousel-item>2</y-carousel-item>
        `
      },
      global: {
        components: { 'y-carousel-item': CarouselItem }
      }
    })

    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(0)

    vi.advanceTimersByTime(1100)
    expect(wrapper.vm.currentIndex).toBe(1)
  })

  it('应该支持不同切换效果类名', async () => {
    const effects = ['slide', 'fade', 'card'] as const
    for (const effect of effects) {
      const wrapper = mount(Carousel, {
        props: { effect },
        slots: { default: '<y-carousel-item>1</y-carousel-item>' },
        global: { components: { 'y-carousel-item': CarouselItem } }
      })
      await nextTick()
      expect(wrapper.find('.yh-carousel--' + effect).exists()).toBe(true)
    }
  })

  it('指示点点击应该能切换索引', async () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: `
          <y-carousel-item>1</y-carousel-item>
          <y-carousel-item>2</y-carousel-item>
        `
      },
      global: {
        components: { 'y-carousel-item': CarouselItem }
      }
    })

    await nextTick()
    const dots = wrapper.findAll('.yh-carousel__dots-item')
    await dots[1].trigger('click')
    expect(wrapper.vm.currentIndex).toBe(1)
  })

  it('should apply theme overrides as inline css vars', async () => {
    const wrapper = mount(Carousel, {
      props: {
        themeOverrides: {
          arrowColor: '#ff4d4f'
        }
      },
      slots: {
        default: '<y-carousel-item>1</y-carousel-item>'
      },
      global: {
        components: { 'y-carousel-item': CarouselItem }
      }
    })

    await nextTick()
    expect(wrapper.find('.yh-carousel').attributes('style')).toContain(
      '--yh-carousel-arrow-color: #ff4d4f'
    )
  })

  it('should use config-provider locale labels', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(
            Carousel,
            { showArrow: 'always' },
            {
              default: () => [
                h(CarouselItem, null, { default: () => 'Slide 1' }),
                h(CarouselItem, null, { default: () => 'Slide 2' })
              ]
            }
          )
      }
    })

    await nextTick()
    expect(wrapper.find('.yh-carousel__arrow--prev').attributes('aria-label')).toBe('Previous')
  })

  it('should expose navigation methods', async () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: `
          <y-carousel-item>1</y-carousel-item>
          <y-carousel-item>2</y-carousel-item>
        `
      },
      global: {
        components: { 'y-carousel-item': CarouselItem }
      }
    })

    await nextTick()
    const exposed = (wrapper.vm as any).$?.exposed
    expect(typeof exposed?.prev).toBe('function')
    expect(typeof exposed?.next).toBe('function')
    expect(typeof exposed?.jump).toBe('function')
  })
})
