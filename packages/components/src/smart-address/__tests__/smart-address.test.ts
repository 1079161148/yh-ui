import { computed, defineComponent } from 'vue'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { en } from '@yh-ui/locale'
import { configProviderContextKey } from '@yh-ui/hooks'
import SmartAddress from '../src/smart-address.vue'

describe('SmartAddress', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

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

  it('supports themeOverrides css variables', () => {
    const wrapper = mount(SmartAddress, {
      props: {
        modelValue,
        themeOverrides: {
          labelWidth: '120px',
          inputBorder: '#123456'
        } as Record<string, string>
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--yh-smart-address-label-width: 120px')
    expect(style).toContain('--yh-smart-address-input-border: #123456')
  })

  it('renders localized smart-address copy from config provider', () => {
    const wrapper = mount(SmartAddress, {
      props: { modelValue },
      global: {
        provide: {
          [configProviderContextKey as symbol]: computed(() => ({ locale: en }))
        }
      }
    })

    expect(wrapper.find('textarea').attributes('placeholder')).toBe(
      'Paste address here, auto-detect name, phone, location'
    )
    expect(wrapper.find('.yh-smart-address__parse-btn').text()).toContain('Smart Parse')
    expect(wrapper.find('.yh-smart-address__label').text()).toContain('Recipient')
  })

  it('maps parsed region labels into configured option values', async () => {
    const wrapper = mount(SmartAddress, {
      props: {
        modelValue,
        parser: () => ({
          name: 'Alice',
          phone: '13800138000',
          province: 'Zhejiang',
          city: 'Hangzhou',
          district: 'Xihu',
          street: 'Gudun Road',
          detail: 'No. 1'
        }),
        regionOptions: [
          {
            label: 'Zhejiang',
            value: '330000',
            children: [
              {
                label: 'Hangzhou',
                value: '330100',
                children: [
                  {
                    label: 'Xihu',
                    value: '330106'
                  }
                ]
              }
            ]
          }
        ]
      }
    })

    await wrapper.find('textarea').setValue('Alice 13800138000 Zhejiang Hangzhou Xihu No. 1')
    await wrapper.find('.yh-smart-address__parse-btn').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const latestValue = wrapper.emitted('update:modelValue')!.at(-1)![0] as any
    expect(latestValue.province).toBe('330000')
    expect(latestValue.city).toBe('330100')
    expect(latestValue.district).toBe('330106')
    expect(latestValue.street).toBe('Gudun Road')
  })

  it('shows error feedback when parsing returns no usable address fields', async () => {
    vi.useFakeTimers()
    const wrapper = mount(SmartAddress, {
      props: {
        modelValue,
        parser: () => ({
          name: '',
          phone: '',
          province: '',
          city: '',
          district: '',
          street: '',
          detail: ''
        })
      }
    })

    await wrapper.find('textarea').setValue('not an address')
    await wrapper.find('.yh-smart-address__parse-btn').trigger('click')

    const tip = wrapper.find('.yh-smart-address__parser-tip')
    expect(tip.exists()).toBe(true)
    expect(tip.classes()).toContain('is-error')
    expect(wrapper.emitted('parsed')).toBeFalsy()
  })

  it('supports cascader mode updates through v-model', async () => {
    const CascaderStub = defineComponent({
      name: 'YhCascader',
      props: {
        modelValue: {
          type: Array,
          default: () => []
        }
      },
      emits: ['update:modelValue'],
      template: '<button class="cascader-stub" @click="$emit(\'update:modelValue\', [\'330000\', \'330100\', \'330106\'])">pick</button>'
    })

    const wrapper = mount(SmartAddress, {
      props: {
        modelValue,
        regionType: 'cascader',
        regionOptions: [
          {
            label: 'Zhejiang',
            value: '330000',
            children: [
              {
                label: 'Hangzhou',
                value: '330100',
                children: [
                  {
                    label: 'Xihu',
                    value: '330106'
                  }
                ]
              }
            ]
          }
        ]
      },
      global: {
        stubs: {
          YhCascader: CascaderStub
        }
      }
    })

    await wrapper.find('.cascader-stub').trigger('click')

    const events = wrapper.emitted('update:modelValue') || []
    expect(events.at(-3)?.[0]).toMatchObject({ province: '330000' })
    expect(events.at(-2)?.[0]).toMatchObject({ city: '330100' })
    expect(events.at(-1)?.[0]).toMatchObject({ district: '330106' })
  })
})
