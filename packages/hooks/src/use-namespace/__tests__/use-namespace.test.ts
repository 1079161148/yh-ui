import { describe, it, expect } from 'vitest'
import { defineComponent, h, provide, ref, unref } from 'vue'
import { mount } from '@vue/test-utils'
import { useNamespace, namespaceContextKey, defaultNamespace } from '../index'

describe('useNamespace', () => {
  it('should use default namespace', () => {
    const TestComp = defineComponent({
      setup() {
        return useNamespace('button')
      },
      render() {
        return h('div')
      }
    })
    const wrapper = mount(TestComp)
    const ns = wrapper.vm as any
    // Vue 3 will unwrap the ref on vm
    expect(unref(ns.namespace)).toBe(defaultNamespace)
    expect(ns.b()).toBe('yh-button')
    expect(ns.e('icon')).toBe('yh-button__icon')
    expect(ns.m('primary')).toBe('yh-button--primary')
    expect(ns.is('disabled')).toBe('is-disabled')
    expect(ns.is('active', true)).toBe('is-active')
    expect(ns.is('active', false)).toBe('')
  })

  it('should use custom namespace via provider', () => {
    const Child = defineComponent({
      setup() {
        const ns = useNamespace('card')
        return { ns }
      },
      render() {
        return h('div', { class: this.ns.b() }, this.ns.e('header'))
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(namespaceContextKey, ref('custom'))
        return () => h(Child)
      }
    })

    const wrapper = mount(Parent)
    const child = wrapper.findComponent(Child)
    expect(child.classes()).toContain('custom-card')
    expect(child.text()).toBe('custom-card__header')
  })

  it('should generate complex BEM classes', () => {
    const TestComp = defineComponent({
      setup() {
        return { ns: useNamespace('input') }
      },
      render() {
        return h('div')
      }
    })
    const { ns } = mount(TestComp).vm as any
    expect(ns.bem('wrapper', 'inner', 'large')).toBe('yh-input-wrapper__inner--large')
    expect(ns.em('input', 'loading')).toBe('yh-input__input--loading')
  })

  it('should generate CSS variables', () => {
    const TestComp = defineComponent({
      setup() {
        return { ns: useNamespace('button') }
      },
      render() {
        return h('div')
      }
    })
    const { ns } = mount(TestComp).vm as any
    expect(ns.cssVar('color')).toBe('--yh-button-color')
    expect(ns.cssVarBlock('bg-color')).toBe('--yh-bg-color')

    const vars = ns.cssVarObj({
      color: 'red',
      'font-size': '14px'
    })
    expect(vars).toEqual({
      '--yh-button-color': 'red',
      '--yh-button-font-size': '14px'
    })

    const blockVars = ns.cssVarBlockObj({
      primary: '#409eff'
    })
    expect(blockVars).toEqual({
      '--yh-primary': '#409eff'
    })
  })
})
