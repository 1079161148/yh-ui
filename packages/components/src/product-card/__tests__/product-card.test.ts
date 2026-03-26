import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../src/product-card.vue'

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
})
