/**
 * Form Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive, nextTick, defineComponent, h, ref } from 'vue'
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
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView')
    const wrapper = mount(Form, {
      props: { model },
      slots: {
        default: () => h(FormItem, { prop: 'name' }, { default: () => h('input') })
      },
      attachTo: document.body
    })

    wrapper.vm.scrollToField('name')
    expect(spy).toHaveBeenCalled()
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
})
