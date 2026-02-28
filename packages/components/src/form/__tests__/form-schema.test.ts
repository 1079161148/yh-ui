import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import YhFormSchema from '../src/form-schema.vue'
import { nextTick, h } from 'vue'

// Mock components
const YhInput = {
  name: 'YhInput',
  props: ['modelValue', 'placeholder', 'disabled'],
  template:
    '<input class="yh-input" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" :placeholder="placeholder" :disabled="disabled" />'
}

const YhSelect = {
  name: 'YhSelect',
  props: ['modelValue', 'options', 'loading'],
  template:
    '<select class="yh-select" :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option v-for="opt in options" :key="opt.value" :value="opt.value">{{opt.label}}</option></select>'
}

const YhSwitch = {
  name: 'YhSwitch',
  props: ['modelValue'],
  template:
    '<input type="checkbox" class="yh-switch" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" />'
}

const globalComponents = {
  'yh-input': YhInput,
  'yh-select': YhSelect,
  'yh-switch': YhSwitch
}

describe('FormSchema', () => {
  it('基础渲染 - 按 schema 渲染表单项', async () => {
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
      props: { modelValue: model, schema },
      global: { components: globalComponents }
    })

    expect(wrapper.find('.yh-form').exists()).toBe(true)
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter username')
  })

  it('双向绑定 - v-model 同步更新', async () => {
    const model = { username: '' }
    const schema = [{ field: 'username', component: 'input' }]

    const wrapper = mount(YhFormSchema, {
      props: { modelValue: model, schema },
      global: { components: globalComponents }
    })

    const input = wrapper.find('input')
    await input.setValue('new_user')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const lastEmitted = wrapper.emitted('update:modelValue')!.slice(-1)[0][0] as any
    expect(lastEmitted.username).toBe('new_user')
  })

  it('change 事件 - 触发 change 并包含 field 和 val', async () => {
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { name: '' }, schema: [{ field: 'name', component: 'input' }] },
      global: { components: globalComponents }
    })
    await wrapper.find('input').setValue('test')
    const changeEvents = wrapper.emitted('change')!
    expect(changeEvents.length).toBeGreaterThan(0)
    expect(changeEvents[0][0]).toBe('name')
    expect(changeEvents[0][1]).toBe('test')
  })

  it('动态显隐 - hidden 函数支持联动', async () => {
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
      props: { modelValue: { showExtra: false, extra: '' }, schema },
      global: { components: globalComponents }
    })

    expect(wrapper.text()).not.toContain('Extra Label')

    await wrapper.setProps({ modelValue: { showExtra: true, extra: 'visible' } })
    await nextTick()

    expect(wrapper.text()).toContain('Extra Label')
  })

  it('分组渲染 - 展示 group title 并支持折叠', async () => {
    const schema = [
      {
        title: 'Basic Info',
        items: [{ field: 'name', component: 'input' }],
        collapsible: true
      }
    ]

    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { name: '' }, schema },
      global: { components: globalComponents }
    })

    expect(wrapper.find('.yh-form-schema__group-title').text()).toContain('Basic Info')

    // 点击折叠
    await wrapper.find('.yh-form-schema__group-title').trigger('click')
    expect(wrapper.find('.yh-form-schema__group').classes()).toContain('is-collapsed')
  })

  it('异步选项 - asyncOptions 自动加载并注入', async () => {
    const asyncOptions = vi.fn().mockResolvedValue([{ label: 'Option A', value: 'a' }])
    const schema = [{ field: 'type', component: 'select', asyncOptions }]

    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { type: '' }, schema },
      global: { components: globalComponents }
    })

    await nextTick()
    await nextTick()
    await nextTick()

    expect(asyncOptions).toHaveBeenCalled()
    const options = wrapper.findAll('option')
    expect(options.length).toBeGreaterThan(0)
  })

  it('render 函数 - 自定义渲染', () => {
    const schema = [
      {
        field: 'custom',
        render: (m: any) => h('div', { class: 'custom-render' }, `Val: ${m.custom}`)
      }
    ]

    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { custom: 'hello' }, schema },
      global: { components: globalComponents }
    })

    expect(wrapper.find('.custom-render').text()).toBe('Val: hello')
  })

  it('暴露 API - validate/resetFields/clearValidate/getModel/setFieldValue', () => {
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: {}, schema: [] },
      global: { components: globalComponents }
    })
    const vm = wrapper.vm as any
    expect(typeof vm.validate).toBe('function')
    expect(typeof vm.resetFields).toBe('function')
    expect(typeof vm.clearValidate).toBe('function')
    expect(typeof vm.getModel).toBe('function')
    expect(typeof vm.setFieldValue).toBe('function')
  })

  it('getModel - 返回当前完整 model 快照', async () => {
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { city: 'BJ' }, schema: [{ field: 'city', component: 'input' }] },
      global: { components: globalComponents }
    })
    const model = (wrapper.vm as any).getModel()
    expect(model.city).toBe('BJ')
  })

  it('setFieldValue - 动态更新单字段值', async () => {
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { city: '' }, schema: [{ field: 'city', component: 'input' }] },
      global: { components: globalComponents }
    })
    ;(wrapper.vm as any).setFieldValue('city', 'SH')
    await nextTick()

    const emitted = wrapper.emitted('update:modelValue')!
    const last = emitted[emitted.length - 1][0] as any
    expect(last.city).toBe('SH')
  })

  it('required 简写 - 自动添加必填规则并触发校验', async () => {
    const schema = [{ field: 'name', label: '姓名', component: 'input', required: true }]

    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { name: '' }, schema },
      global: { components: globalComponents }
    })

    // 触发校验
    let isValid = true
    try {
      isValid = await (wrapper.vm as any).validate()
    } catch (_) {
      isValid = false
    }

    expect(isValid).toBe(false)
  })

  it('type divider - 渲染分隔线', () => {
    const schema = [{ type: 'divider', label: '基本信息', field: '_d' }]
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: {}, schema },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.yh-form-schema__divider').exists()).toBe(true)
    expect(wrapper.find('.yh-form-schema__divider-label').text()).toBe('基本信息')
  })

  it('type text - 只读显示字段值', () => {
    const schema = [{ type: 'text', label: '姓名', field: 'name' }]
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { name: 'Alice' }, schema },
      global: { components: globalComponents }
    })
    expect(wrapper.find('.yh-form-schema__text-value').text()).toBe('Alice')
  })

  it('defaultValue - 未设置字段时填充默认值', async () => {
    const schema = [{ field: 'city', component: 'input', defaultValue: 'Beijing' }]
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: {}, schema },
      global: { components: globalComponents }
    })
    await nextTick()
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    const last = emitted![emitted!.length - 1][0] as any
    expect(last.city).toBe('Beijing')
  })

  it('disabled 函数 - 根据 model 动态禁用字段', async () => {
    const schema = [
      { field: 'toggle', component: 'switch' },
      { field: 'target', component: 'input', disabled: (m: any) => !m.toggle }
    ]
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { toggle: false, target: '' }, schema },
      global: { components: globalComponents }
    })

    const input = wrapper.find('input[type="text"], input:not([type="checkbox"])')
      .element as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('外部 modelValue 更新 - localModel 同步响应', async () => {
    const wrapper = mount(YhFormSchema, {
      props: { modelValue: { name: 'old' }, schema: [{ field: 'name', component: 'input' }] },
      global: { components: globalComponents }
    })

    await wrapper.setProps({ modelValue: { name: 'new' } })
    await nextTick()

    const input = wrapper.find('input')
    expect(input.element.value).toBe('new')
  })
})
