import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import ProductCard from '../src/product-card.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('ProductCard', () => {
  const observe = vi.fn()
  const disconnect = vi.fn()

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function (this: any, callback: IntersectionObserverCallback) {
        this.observe = observe
        this.disconnect = disconnect
        this.trigger = (entries: IntersectionObserverEntry[]) => callback(entries, this)
      })
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    observe.mockReset()
    disconnect.mockReset()
  })

  const props = {
    title: 'Product Title',
    image: 'https://test.com/image.jpg',
    price: 99.0
  }

  it('renders product information', () => {
    const wrapper = mount(ProductCard, {
      props
    })
    expect(wrapper.text()).toContain('Product Title')
    expect(wrapper.text()).toContain('99.00')
    expect(wrapper.find('.yh-product-card__image').attributes('src')).toBe(
      'https://test.com/image.jpg'
    )
  })

  it('emits actions', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        actionText: 'Add to Cart'
      }
    })
    const btn = wrapper.find('.yh-product-card__action-btn')
    await btn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('action')

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('supports layout modes', () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        layout: 'horizontal'
      }
    })
    expect(wrapper.classes()).toContain('yh-product-card--horizontal')
  })

  it('renders stock progress', () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        stockProgress: 50,
        stockText: 'Only 5 left'
      }
    })
    expect(wrapper.find('.yh-product-card__stock-area').exists()).toBe(true)
    expect(wrapper.text()).toContain('Only 5 left')
  })

  it('uses config-provider locale action text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(ProductCard, {
            title: 'Product Title',
            image: 'https://test.com/image.jpg',
            price: 99
          })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('Buy Now')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        themeOverrides: {
          'price-color': '#fa541c'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-product-card-price-color: #fa541c')
  })

  it('switches hover media state on mouse enter and leave', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        hoverImage: 'https://test.com/hover.jpg',
        videoSrc: 'https://test.com/demo.mp4'
      }
    })

    await wrapper.trigger('mouseenter')
    await nextTick()
    expect(wrapper.find('.yh-product-card__image').attributes('src')).toBe(
      'https://test.com/hover.jpg'
    )
    expect(wrapper.find('.yh-product-card__video-overlay').exists()).toBe(true)

    await wrapper.trigger('mouseleave')
    await nextTick()
    expect(wrapper.find('.yh-product-card__image').attributes('src')).toBe(
      'https://test.com/image.jpg'
    )
    expect(wrapper.find('.yh-product-card__video-overlay').exists()).toBe(false)
  })

  it('prevents action emits when sold out or loading', async () => {
    const soldOutWrapper = mount(ProductCard, {
      props: {
        ...props,
        soldOut: true
      }
    })
    await soldOutWrapper.find('.yh-product-card__action-btn').trigger('click')
    expect(soldOutWrapper.emitted('action')).toBeFalsy()

    const loadingWrapper = mount(ProductCard, {
      props: {
        ...props,
        actionLoading: true
      }
    })
    await loadingWrapper.find('.yh-product-card__action-btn').trigger('click')
    expect(loadingWrapper.emitted('action')).toBeFalsy()
  })

  it('falls back after badge image errors and renders inline badges', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        badgePosition: 'inline',
        tag: 'HOT',
        badges: [
          {
            text: 'VIP',
            image: 'https://test.com/badge.png',
            color: '#fa8c16'
          }
        ]
      }
    })

    expect(wrapper.find('.yh-product-card__title .yh-product-card__badges').classes()).toContain(
      'is-inline'
    )
    expect(wrapper.find('.yh-product-card__badge-img').exists()).toBe(true)

    await wrapper.find('.yh-product-card__badge-img').trigger('error')
    await nextTick()

    expect(wrapper.find('.yh-product-card__badge-img').exists()).toBe(false)
    expect(wrapper.text()).toContain('VIP')
  })

  it('emits expose when the visibility threshold is reached', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        exposure: true,
        exposureThreshold: 0.6
      }
    })

    expect(observe).toHaveBeenCalledTimes(1)

    const instance = (IntersectionObserver as any).mock.instances[0]
    instance.trigger([
      {
        isIntersecting: true,
        intersectionRatio: 0.7
      } as IntersectionObserverEntry
    ])
    await nextTick()

    expect(wrapper.emitted('expose')).toHaveLength(1)
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
