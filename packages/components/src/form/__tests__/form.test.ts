/**
 * Form Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive, nextTick, defineComponent, h } from 'vue'
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

  it('should apply layout classes', () => {
    const layouts = ['horizontal', 'vertical', 'inline'] as const
    const model = reactive({})
    layouts.forEach((layout) => {
      const wrapper = mount(Form, {
        props: { model, layout }
      })
      expect(wrapper.classes()).toContain(`yh-form--${layout}`)
    })
  })

  it('should validate form fields correctly', async () => {
    const TestComponent = defineComponent({
      props: ['model', 'rules'],
      setup(props) {
        return () =>
          h(
            Form,
            { model: props.model, rules: props.rules, ref: 'formRef' },
            {
              default: () =>
                h(
                  FormItem,
                  { prop: 'name', label: 'Name', ref: 'itemRef' },
                  {
                    default: () =>
                      h('input', {
                        class: 'name-input',
                        value: props.model.name,
                        onInput: (e: any) => (props.model.name = e.target.value)
                      })
                  }
                )
            }
          )
      }
    })

    const model = reactive({ name: '' })
    const rules = {
      name: [{ required: true, message: 'Please input name', trigger: 'blur' }]
    }

    const wrapper = mount(TestComponent, {
      props: { model, rules }
    })

    const form = wrapper.findComponent({ name: 'YhForm' }).vm as any
    const item = wrapper.findComponent({ name: 'YhFormItem' })

    // 验证不通过
    try {
      await form.validate()
    } catch (e: unknown) {
      const errors = e as Record<string, any>
      expect(errors.name).toBeTruthy()
    }
    await nextTick()
    expect(item.classes()).toContain('is-error')
    expect(item.find('.yh-form-item__error').text()).toBe('Please input name')

    // 验证通过
    model.name = 'Antigravity'
    const result = await form.validate()
    expect(result).toBe(true)
    await nextTick()
    expect(item.classes()).toContain('is-success')
    expect(item.find('.yh-form-item__error').exists()).toBe(false)
  })

  it('should reset fields correctly', async () => {
    const TestComponent = defineComponent({
      props: ['model'],
      setup(props) {
        return () =>
          h(
            Form,
            { model: props.model },
            {
              default: () =>
                h(
                  FormItem,
                  { prop: 'name', label: 'Name' },
                  {
                    default: () =>
                      h('input', {
                        value: props.model.name,
                        onInput: (e: any) => (props.model.name = e.target.value)
                      })
                  }
                )
            }
          )
      }
    })

    const model = reactive({ name: 'Initial' })
    const wrapper = mount(TestComponent, {
      props: { model }
    })

    // 等待注册和初始值记录
    await nextTick()

    model.name = 'Changed'
    const form = wrapper.findComponent({ name: 'YhForm' }).vm as any
    form.resetFields()

    expect(model.name).toBe('Initial')
  })

  it('should clear validation results', async () => {
    const TestComponent = defineComponent({
      props: ['model', 'rules'],
      setup(props) {
        return () =>
          h(
            Form,
            { model: props.model, rules: props.rules },
            {
              default: () =>
                h(
                  FormItem,
                  { prop: 'name', label: 'Name' },
                  {
                    default: () => h('input')
                  }
                )
            }
          )
      }
    })

    const model = reactive({ name: '' })
    const rules = {
      name: [{ required: true, message: 'Required' }]
    }
    const wrapper = mount(TestComponent, {
      props: { model, rules }
    })

    const form = wrapper.findComponent({ name: 'YhForm' }).vm as any
    try {
      await form.validate()
    } catch (e) {}

    await nextTick()
    const item = wrapper.findComponent({ name: 'YhFormItem' })
    expect(item.classes()).toContain('is-error')

    form.clearValidate()
    await nextTick()
    expect(item.classes()).not.toContain('is-error')
    expect(item.find('.yh-form-item__error').exists()).toBe(false)
  })

  it('should provide size to all form items', () => {
    const model = reactive({})
    const wrapper = mount(Form, {
      props: { model, size: 'large' },
      slots: {
        default: () =>
          h(
            FormItem,
            { label: 'Name', class: 'target-item' },
            {
              default: () => h('input')
            }
          )
      }
    })

    expect(wrapper.find('.target-item').classes()).toContain('yh-form-item--large')
  })

  it('should show required asterisk', () => {
    const model = reactive({})
    const wrapper = mount(Form, {
      props: { model },
      slots: {
        default: () =>
          h(
            FormItem,
            { label: 'Name', required: true },
            {
              default: () => h('input')
            }
          )
      }
    })

    expect(wrapper.find('.yh-form-item').classes()).toContain('is-required')
  })
})
