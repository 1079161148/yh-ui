import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubmitBar from '../src/submit-bar.vue'

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
})
