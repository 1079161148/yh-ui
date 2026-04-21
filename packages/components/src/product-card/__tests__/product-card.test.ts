import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import ProductCard from '../src/product-card.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('ProductCard', () => {
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

  it('renders sold-out/loading/readonly branches', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        soldOut: true,
        actionLoading: true,
        readonly: true
      }
    })

    expect(wrapper.classes()).toContain('is-sold-out')
    expect(wrapper.find('.yh-product-card__sold-out-mask').exists()).toBe(true)
    expect(wrapper.find('.yh-product-card__footer').exists()).toBe(false)

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('handles hover image + video overlay branches', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        hoverImage: 'https://test.com/hover.jpg',
        videoSrc: 'https://test.com/demo.mp4'
      }
    })

    const root = wrapper.find('.yh-product-card')
    await root.trigger('mouseenter')
    expect(wrapper.find('.yh-product-card__image').attributes('src')).toBe(
      'https://test.com/hover.jpg'
    )
    expect(wrapper.find('.yh-product-card__video-overlay').exists()).toBe(true)

    await root.trigger('mouseleave')
    expect(wrapper.find('.yh-product-card__image').attributes('src')).toBe(
      'https://test.com/image.jpg'
    )
  })

  it('renders badges and fallbacks on badge image error', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        tag: '新品',
        badgePosition: 'inline',
        badges: [
          { image: 'https://test.com/badge.png' },
          { text: 'HOT', type: 'danger', color: '#f00' }
        ]
      }
    })

    const badgeImg = wrapper.find('.yh-product-card__badge-img')
    expect(badgeImg.exists()).toBe(true)
    await badgeImg.trigger('error')
    await nextTick()
    expect(wrapper.find('.yh-product-card__badge-img').exists()).toBe(false)
    expect(wrapper.text()).toContain('HOT')
    expect(wrapper.text()).toContain('新品')
  })

  it('supports vip/market/stock style clamp branches', () => {
    const wrapper = mount(ProductCard, {
      props: {
        ...props,
        price: 'N/A',
        vipPrice: 88,
        marketPrice: 199,
        stockProgress: 120,
        stockColor: '#00aa00'
      }
    })

    expect(wrapper.text()).toContain('N/A')
    expect(wrapper.text()).toContain('88.00')
    expect(wrapper.text()).toContain('199.00')
    expect(wrapper.find('.yh-product-card__stock-bar-inner').attributes('style')).toContain(
      'width: 100%'
    )
  })
})
