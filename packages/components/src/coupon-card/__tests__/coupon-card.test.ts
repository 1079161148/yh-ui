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

  it('covers progress, rules, slots, badge and unavailable actions', async () => {
    const used = mount(CouponCard, {
      props: {
        ...props,
        status: 'used',
        threshold: 0,
        actionText: '',
        percent: 45,
        percentText: '45%',
        badge: 'HOT',
        badgeType: 'danger',
        rules: 'Rule text'
      },
      slots: {
        title: '<div class="title-slot">Title slot</div>',
        description: '<div class="desc-slot">Desc slot</div>',
        badge: '<div class="badge-slot">Badge slot</div>',
        seal: '<div class="seal-slot">Seal slot</div>'
      }
    })

    expect(used.find('.yh-coupon-card__threshold').exists()).toBe(true)
    expect(used.find('.yh-coupon-card__progress-inner').attributes('style')).toContain('45%')
    expect(used.find('.title-slot').exists()).toBe(true)
    expect(used.find('.desc-slot').exists()).toBe(true)
    expect(used.find('.badge-slot').exists()).toBe(true)
    expect(used.find('.seal-slot').exists()).toBe(true)

    await used.find('.yh-coupon-card__action-btn').trigger('click')
    expect(used.emitted('action')).toBeFalsy()

    await used.find('.yh-coupon-card__rules-trigger').trigger('click')
    expect(used.find('.yh-coupon-card__rules').classes()).toContain('is-expanded')
  })

  it('covers custom action and rules slots with string threshold fallback', async () => {
    const wrapper = mount(CouponCard, {
      props: {
        ...props,
        threshold: 'Any store',
        selectable: true,
        selected: true,
        variant: 'dashed',
        rules: ''
      },
      slots: {
        action: '<button class="action-slot">Custom</button>',
        rules: '<div class="rules-slot">Rules slot</div>'
      }
    })

    expect(wrapper.classes()).toContain('yh-coupon-card--dashed')
    expect(wrapper.classes()).toContain('is-selected')
    expect(wrapper.text()).toContain('Any store')
    expect(wrapper.find('.action-slot').exists()).toBe(true)
    expect(wrapper.find('.rules-slot').exists()).toBe(true)
  })
})
