import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import SubmitBar from '../src/submit-bar.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('SubmitBar', () => {
  const props = {
    price: 3050,
    centUnit: true,
    buttonText: 'Submit Now',
    showCheckbox: true
  }

  it('renders correctly', () => {
    const wrapper = mount(SubmitBar, { props })
    expect(wrapper.text()).toContain('30')
    expect(wrapper.text()).toContain('50')
    expect(wrapper.text()).toContain('Submit Now')
  })

  it('handles button click', async () => {
    const wrapper = mount(SubmitBar, { props })
    const button = wrapper.find('.yh-submit-bar__btn')
    await button.trigger('click')
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('handles disabled state', async () => {
    const wrapper = mount(SubmitBar, { props: { ...props, disabled: true } })
    const button = wrapper.find('.yh-submit-bar__btn')
    await button.trigger('click')
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('handles checkbox toggle', async () => {
    const wrapper = mount(SubmitBar, { props })
    const checkInput = wrapper.find('input[type="checkbox"]')
    await checkInput.setValue(true)
    expect(wrapper.emitted('update:checked')![0]).toEqual([true])
    expect(wrapper.emitted('check-change')![0]).toEqual([true])
  })

  it('uses config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(SubmitBar, { price: 100, showCheckbox: true })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('Total')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(SubmitBar, {
      props: {
        ...props,
        themeOverrides: {
          'price-color': '#ff4d4f'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-submit-bar-price-color: #ff4d4f')
  })
})
