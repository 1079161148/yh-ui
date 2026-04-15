import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import CouponCard from '../src/coupon-card.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('CouponCard', () => {
  const props = {
    amount: '100',
    threshold: '500',
    title: 'New User Coupon'
  }

  it('renders coupon basic content', () => {
    const wrapper = mount(CouponCard, {
      props
    })
    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('满 500 元可用')
    expect(wrapper.text()).toContain('New User Coupon')
  })

  it('handles click event', async () => {
    const wrapper = mount(CouponCard, {
      props
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('handles action click', async () => {
    const wrapper = mount(CouponCard, {
      props
    })
    const btn = wrapper.find('.yh-coupon-card__action-btn')
    await btn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('action')
  })

  it('renders status modes', () => {
    const wrapperUsed = mount(CouponCard, {
      props: {
        ...props,
        status: 'used'
      }
    })
    expect(wrapperUsed.classes()).toContain('is-used')

    const wrapperExpired = mount(CouponCard, {
      props: {
        ...props,
        status: 'expired'
      }
    })
    expect(wrapperExpired.classes()).toContain('is-expired')
  })

  it('supports selected mode', async () => {
    const wrapper = mount(CouponCard, {
      props: {
        ...props,
        selectable: true,
        selected: false
      }
    })
    expect(wrapper.classes()).toContain('is-selectable')
    const checkbox = wrapper.find('input[type="checkbox"]')
    if (checkbox.exists()) {
      await checkbox.setValue(true)
      expect(wrapper.emitted('update:selected')).toBeTruthy()
    }
  })

  it('uses config-provider locale fallback texts', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(CouponCard, {
            amount: '100',
            title: 'New User Coupon'
          })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('No threshold')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(CouponCard, {
      props: {
        ...props,
        themeOverrides: {
          'amount-color': '#ff4d4f'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-coupon-card-amount-color: #ff4d4f')
  })
})
