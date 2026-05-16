/**
 * Form Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive, nextTick, defineComponent, h, ref, computed } from 'vue'
import { en } from '@yh-ui/locale'
import { configProviderContextKey } from '@yh-ui/hooks'
import Form from '../src/form.vue'
import FormItem from '../src/form-item.vue'

describe('YhForm', () => {
  it('should render correctly', () => {
    const model = reactive({ name: '' })
    const wrapper = mount(Form, {
      props: { model },
      slots: {
        default: () => h('div', { class: 'form-content' }, 'Content')
      }
    })
    expect(wrapper.classes()).toContain('yh-form')
    expect(wrapper.find('.form-content').exists()).toBe(true)
  })

  it('should validate form fields with callback', async () => {
    const model = reactive({ name: '' })
    const rules = { name: [{ required: true, message: 'Required' }] }
    const callback = vi.fn()

    const wrapper = mount(Form, {
      props: { model, rules },
      slots: {
        default: () => h(FormItem, { prop: 'name' }, { default: () => h('input') })
      }
    })

    const result = await wrapper.vm.validate(callback)
    expect(result).toBe(false)
    expect(callback).toHaveBeenCalledWith(false, expect.any(Object))
  })

  it('should validate specific fields', async () => {
    const model = reactive({ name: '', age: '' })
    const rules = {
      name: [{ required: true, message: 'N' }],
      age: [{ required: true, message: 'A' }]
    }

    const wrapper = mount(Form, {
      props: { model, rules },
      slots: {
        default: () => [
          h(FormItem, { prop: 'name', class: 'item-name' }, { default: () => h('input') }),
          h(FormItem, { prop: 'age', class: 'item-age' }, { default: () => h('input') })
        ]
      }
    })

    // Validate only 'name'
    try {
      await wrapper.vm.validate('name')
    } catch (e) {}

    await nextTick()
    expect(wrapper.find('.item-name').classes()).toContain('is-error')
    expect(wrapper.find('.item-age').classes()).not.toContain('is-error')
  })

  it('should clear validation for specific fields', async () => {
    const model = reactive({ name: '' })
    const rules = { name: [{ required: true, message: 'R' }] }
    const wrapper = mount(Form, {
      props: { model, rules },
      slots: {
        default: () => h(FormItem, { prop: 'name' }, { default: () => h('input') })
      }
    })

    try {
      await wrapper.vm.validate()
    } catch (e) {}
    await nextTick()
    expect(wrapper.find('.yh-form-item').classes()).toContain('is-error')

    wrapper.vm.clearValidate('name')
    await nextTick()
    expect(wrapper.find('.yh-form-item').classes()).not.toContain('is-error')
  })

  it('should scrollToField', async () => {
    const model = reactive({ name: '' })
    const wrapper = mount(Form, {
      props: { model },
      slots: {
        default: () => h(FormItem, { prop: 'name' }, { default: () => h('input') })
      },
      attachTo: document.body
    })

    await nextTick()
    const fieldEl = wrapper.get('[data-prop="name"]').element as HTMLElement
    const spy = vi.spyOn(fieldEl, 'scrollIntoView')

    wrapper.vm.scrollToField('name')
    expect(spy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' })
    wrapper.unmount()
  })

  it('should support label-suffix', () => {
    const wrapper = mount(Form, {
      props: { model: {}, labelSuffix: ':' },
      slots: {
        default: () => h(FormItem, { label: 'Name' })
      }
    })
    expect(wrapper.find('.yh-form-item__label').text()).toBe('Name:')
  })

  it('should remove field on unmount', async () => {
    const show = ref(true)
    const TestComponent = defineComponent({
      setup() {
        return { show }
      },
      template: `
            <yh-form :model="{}">
                <yh-form-item v-if="show" prop="name" />
            </yh-form>
        `
    })

    const wrapper = mount(TestComponent, {
      global: { components: { 'yh-form': Form, 'yh-form-item': FormItem } }
    })

    const form = wrapper.getComponent(Form).vm as any
    expect(form.fields.length).toBe(1)

    show.value = false
    await nextTick()
    expect(form.fields.length).toBe(0)
  })

  it('FormItem should use own label-width', () => {
    const wrapper = mount(Form, {
      props: { model: {}, labelWidth: '100px' },
      slots: {
        default: () => h(FormItem, { label: 'L', labelWidth: '200px' })
      }
    })
    const label = wrapper.find('.yh-form-item__label')
    expect(label.element.style.width).toBe('200px')
  })

  it('should render localized validation fallback from config provider', async () => {
    const model = reactive({ name: '' })
    const wrapper = mount(Form, {
      props: {
        model,
        rules: {
          name: [
            {
              validator: (_rule, _value, callback) => callback(new Error(''))
            }
          ]
        }
      },
      slots: {
        default: () => h(FormItem, { prop: 'name', label: 'Name' }, { default: () => h('input') })
      },
      global: {
        provide: {
          [configProviderContextKey as symbol]: computed(() => ({ locale: en }))
        }
      }
    })

    await expect(wrapper.vm.validate()).rejects.toBeTruthy()
    await nextTick()
    expect(wrapper.find('.yh-form-item__error').text()).toBe('Validation failed')
  })

  it('should support themeOverrides css variables', () => {
    const wrapper = mount(Form, {
      props: {
        model: {},
        themeOverrides: {
          itemHeight: '40px',
          labelFontSize: '16px'
        }
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--yh-form-item-height: 40px')
    expect(style).toContain('--yh-form-label-font-size: 16px')
  })

  it('covers reset, clear array props and scroll offset error handling', async () => {
    const model = reactive({ user: { name: 'initial' }, age: '' })
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    const wrapper = mount(Form, {
      props: {
        model,
        scrollToError: true,
        scrollToErrorOffset: 12,
        scrollIntoViewOptions: { behavior: 'auto' },
        rules: {
          'user.name': [{ required: true, message: 'Name needed' }],
          age: [{ required: true, message: 'Age needed' }]
        }
      },
      slots: {
        default: () => [
          h(FormItem, { prop: 'user.name', label: 'User' }, { default: () => h('input') }),
          h(FormItem, { prop: 'age', label: 'Age' }, { default: () => h('input') })
        ]
      },
      attachTo: document.body
    })

    await nextTick()
    const firstField = wrapper.get('[data-prop="user.name"]').element as HTMLElement
    firstField.getBoundingClientRect = () => ({ top: 40 }) as DOMRect

    model.user.name = ''
    await expect(wrapper.vm.validate(['user.name', 'age'])).rejects.toBeTruthy()
    expect(scrollTo).toHaveBeenCalledWith({ top: 28, behavior: 'auto' })

    wrapper.vm.clearValidate(['user.name', 'age'])
    await nextTick()
    expect(wrapper.findAll('.is-error')).toHaveLength(0)

    model.user.name = 'changed'
    wrapper.vm.resetFields('user.name')
    expect(model.user.name).toBe('initial')
    wrapper.unmount()
    vi.unstubAllGlobals()
  })

  it('covers form item status props, local rules and trigger filtering', async () => {
    const model = reactive({ email: '' })
    const wrapper = mount(Form, {
      props: {
        model,
        statusIcon: true,
        disabled: true,
        size: 'small',
        showMessage: false
      },
      slots: {
        default: () =>
          h(
            FormItem,
            {
              prop: 'email',
              label: 'Email',
              required: true,
              validateStatus: 'error',
              error: 'Forced',
              labelWidth: 120,
              rules: [
                { required: true, message: 'Blur needed', trigger: 'blur' },
                { required: true, message: 'Change needed', trigger: ['change'] }
              ],
              themeOverrides: { errorColor: '#f00' }
            },
            {
              label: () => h('span', 'Mail'),
              default: () => h('input')
            }
          )
      }
    })

    const item = wrapper.getComponent(FormItem)
    expect(wrapper.find('.yh-form-item').classes()).toContain('is-required')
    expect(wrapper.find('.yh-form-item').classes()).toContain('is-disabled')
    expect(wrapper.find('.yh-form-item').classes()).toContain('yh-form-item--small')
    expect(wrapper.find('.yh-form-item__label').text()).toBe('Mail')
    expect(wrapper.find('.yh-form-item__label').attributes('style')).toContain('120px')
    expect(wrapper.find('.yh-form-item__status-icon').exists()).toBe(true)
    expect(wrapper.find('.yh-form-item__error').exists()).toBe(false)
    expect(wrapper.find('.yh-form-item').attributes('style')).toContain(
      '--yh-form-item-error-color: #f00'
    )

    await expect((item.vm as any).validate('focus')).resolves.toBe(true)
    await expect((item.vm as any).validate('blur')).rejects.toBeTruthy()
  })
})
