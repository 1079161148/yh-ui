import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SmartAddress from '../src/smart-address.vue'

describe('SmartAddress', () => {
  const modelValue = {
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    street: '',
    detail: ''
  }

  it('renders correctly', () => {
    const wrapper = mount(SmartAddress, {
      props: { modelValue }
    })
    expect(wrapper.find('.yh-smart-address').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('parses address correctly', async () => {
    const wrapper = mount(SmartAddress, {
      props: { modelValue }
    })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('张三 13800138000 广东省深圳市南山区某某街道123号')

    const parseBtn = wrapper.find('.yh-smart-address__parse-btn')
    await parseBtn.trigger('click')

    // Check emitted values
    expect(wrapper.emitted('parsed')).toBeTruthy()
    const parsed = wrapper.emitted('parsed')![0][0] as any
    expect(parsed.name).toBe('张三')
    expect(parsed.phone).toBe('13800138000')
    expect(parsed.province).toBe('广东省')
    expect(parsed.city).toBe('深圳市')
    expect(parsed.district).toBe('南山区')

    // Check input fields
    const inputs = wrapper.findAll('.yh-smart-address__input')
    // name is the first input
    expect((inputs[0].element as HTMLInputElement).value).toBe('张三')
    // phone is the second input
    expect((inputs[1].element as HTMLInputElement).value).toBe('13800138000')
  })

  it('handles field changes', async () => {
    const wrapper = mount(SmartAddress, {
      props: { modelValue }
    })
    const nameInput = wrapper.findAll('.yh-smart-address__input')[0]
    await nameInput.setValue('李四')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect((wrapper.emitted('update:modelValue')![0][0] as any).name).toBe('李四')
  })

  it('applies top label placement correctly', () => {
    const wrapper = mount(SmartAddress, {
      props: { modelValue, labelPlacement: 'top' }
    })
    const fields = wrapper.find('.yh-smart-address__fields')
    expect(fields.classes()).toContain('is-top')
  })
})
