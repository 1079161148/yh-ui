import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import YhFormSchema from '../src/form-schema.vue'
import { nextTick, h } from 'vue'

// Mock components
const YhInput = {
  name: 'YhInput',
  props: ['modelValue', 'placeholder'],
  template:
    '<input class="yh-input" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" :placeholder="placeholder" />'
}

const YhSelect = {
  name: 'YhSelect',
  props: ['modelValue', 'options'],
  template:
    '<select class="yh-select" :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option v-for="opt in options" :key="opt.value" :value="opt.value">{{opt.label}}</option></select>'
}

describe('FormSchema', () => {
  it('basic rendering based on schema', async () => {
    const model = { username: 'ant', role: '' }
    const schema = [
      {
        field: 'username',
        label: 'Username',
        component: 'input',
        props: { placeholder: 'Enter username' }
      }
    ]

    const wrapper = mount(YhFormSchema, {
      props: {
        modelValue: model,
        schema
      },
      global: {
        components: {
          'yh-input': YhInput
        }
      }
    })

    expect(wrapper.find('.yh-form').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter username')
  })

  it('handles value updates and v-model synchronization', async () => {
    const model = { username: '' }
    const schema = [{ field: 'username', component: 'input' }]

    const wrapper = mount(YhFormSchema, {
      props: {
        modelValue: model,
        schema
      },
      global: { components: { 'yh-input': YhInput } }
    })

    const input = wrapper.find('input')
    await input.setValue('new_user')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const lastEmitted = wrapper.emitted('update:modelValue')!.slice(-1)[0][0] as any
    expect(lastEmitted.username).toBe('new_user')
  })

  it('supports dynamic visibility with hidden prop', async () => {
    const schema = [
      { field: 'showExtra', component: 'input' },
      {
        field: 'extra',
        label: 'Extra Label',
        component: 'input',
        hidden: (m: any) => !m.showExtra
      }
    ]

    const wrapper = mount(YhFormSchema, {
      props: {
        modelValue: { showExtra: false, extra: '' },
        schema
      },
      global: { components: { 'yh-input': YhInput } }
    })

    // Initially extra field is hidden (v-if on div or item)
    // In source line 213: <div v-if="!isItemHidden(item)">
    expect(wrapper.text()).not.toContain('Extra Label')

    // Update model to show extra
    await wrapper.setProps({
      modelValue: { showExtra: true, extra: 'visible' }
    })
    await nextTick() // Wait for watch to update localModel

    expect(wrapper.text()).toContain('Extra Label')
  })

  it('supports grouped schema with collapsible sections', async () => {
    const schema = [
      {
        title: 'Basic Info',
        items: [{ field: 'name', component: 'input' }],
        collapsible: true
      }
    ]

    const wrapper = mount(YhFormSchema, {
      props: {
        modelValue: { name: '' },
        schema
      }
    })

    expect(wrapper.find('.yh-form-schema__group-title').text()).toContain('Basic Info')

    // Test toggle
    await wrapper.find('.yh-form-schema__group-title').trigger('click')
    expect(wrapper.find('.yh-form-schema__group').classes()).toContain('is-collapsed')
  })

  it('supports asyncOptions for select components', async () => {
    const asyncOptions = vi.fn().mockResolvedValue([{ label: 'Option A', value: 'a' }])

    const schema = [
      {
        field: 'type',
        component: 'select',
        asyncOptions
      }
    ]

    const wrapper = mount(YhFormSchema, {
      props: {
        modelValue: { type: '' },
        schema
      },
      global: { components: { 'yh-select': YhSelect } }
    })

    await nextTick()
    await nextTick()
    await nextTick()

    const options = wrapper.findAll('option')
    expect(options.length).toBeGreaterThan(0)
  })

  it('supports render function', () => {
    const schema = [
      {
        field: 'custom',
        render: (m: any) => h('div', { class: 'custom-render' }, `Val: ${m.custom}`)
      }
    ]

    const wrapper = mount(YhFormSchema, {
      props: {
        modelValue: { custom: 'hello' },
        schema
      }
    })

    expect(wrapper.find('.custom-render').text()).toBe('Val: hello')
  })

  it('expose form methods', () => {
    const wrapper = mount(YhFormSchema, {
      props: {
        modelValue: {},
        schema: []
      }
    })
    expect(typeof wrapper.vm.validate).toBe('function')
    expect(typeof wrapper.vm.resetFields).toBe('function')
  })
})
