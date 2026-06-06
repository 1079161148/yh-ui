/**
 * useFormItem Hook Tests
 * @description 测试 useFormItem hook 在不同场景下的行为
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, provide, nextTick } from 'vue'
import { useFormItem, FormContextKey, FormItemContextKey } from '../../use-form-item'

describe('useFormItem', () => {
  const TestComponent = defineComponent({
    setup() {
      return useFormItem()
    },
    render() {
      return h('div')
    }
  })

  it('should return undefined when not in form context', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any

    await nextTick()

    expect(vm.form).toBeUndefined()
    expect(vm.formItem).toBeUndefined()
  })

  it('should inject form context when provided', async () => {
    const mockFormContext = {
      model: { name: 'test' },
      rules: {},
      labelWidth: '100px',
      labelPosition: 'left',
      labelSuffix: ':',
      showMessage: true,
      scrollToError: false,
      disabled: false,
      size: 'default',
      addField: vi.fn(),
      removeField: vi.fn()
    }

    const Child = defineComponent({
      setup() {
        return useFormItem()
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(FormContextKey, mockFormContext as any)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    await nextTick()
    expect(childVm.form).toEqual(mockFormContext)
  })

  it('should inject formItem context when provided', async () => {
    const mockFormItemContext = {
      prop: 'name',
      validate: vi.fn().mockResolvedValue(true),
      resetField: vi.fn(),
      clearValidate: vi.fn(),
      validateStatus: 'success',
      validateMessage: '',
      label: '用户名',
      size: 'default',
      disabled: false
    }

    const Child = defineComponent({
      setup() {
        return useFormItem()
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(FormItemContextKey, mockFormItemContext as any)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    await nextTick()
    expect(childVm.formItem).toEqual(mockFormItemContext)
  })

  it('should return validate function', async () => {
    const mockValidate = vi.fn().mockResolvedValue(true)
    const mockFormItemContext = {
      prop: 'name',
      validate: mockValidate,
      resetField: vi.fn(),
      clearValidate: vi.fn(),
      validateStatus: '',
      validateMessage: '',
      label: '用户名'
    }

    const Child = defineComponent({
      setup() {
        const { validate } = useFormItem()
        return { validate }
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(FormItemContextKey, mockFormItemContext as any)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    await nextTick()
    await childVm.validate('blur')

    expect(mockValidate).toHaveBeenCalledWith('blur')
  })

  it('validate function should resolve true when no formItem context', async () => {
    const TestComponentNoContext = defineComponent({
      setup() {
        const { validate } = useFormItem()
        return { validate }
      },
      render() {
        return h('div')
      }
    })

    const wrapper = mount(TestComponentNoContext)
    const vm = wrapper.vm as any

    await nextTick()
    const result = await vm.validate('blur')

    expect(result).toBe(true)
  })

  it('validate function should return false when formItem validate rejects', async () => {
    const mockValidate = vi.fn().mockRejectedValue(new Error('validation failed'))
    const mockFormItemContext = {
      prop: 'name',
      validate: mockValidate,
      resetField: vi.fn(),
      clearValidate: vi.fn(),
      validateStatus: '',
      validateMessage: '',
      label: '用户名'
    }

    const Child = defineComponent({
      setup() {
        const { validate } = useFormItem()
        return { validate }
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(FormItemContextKey, mockFormItemContext as any)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    const result = await childVm.validate('blur')
    expect(result).toBe(false)
  })
})
