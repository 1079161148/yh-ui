import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import YhSwitch from '../src/switch.vue'

describe('YhSwitch', () => {
  it('should render basic states', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })

    expect(wrapper.classes()).toContain('yh-switch')
    expect(wrapper.classes()).not.toContain('is-checked')
    expect(wrapper.attributes('role')).toBe('switch')
    expect(wrapper.attributes('aria-checked')).toBe('false')

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.classes()).toContain('is-checked')
    expect(wrapper.attributes('aria-checked')).toBe('true')
  })

  it('should respect size, disabled and loading states', () => {
    const large = mount(YhSwitch, {
      props: { modelValue: false, size: 'large' }
    })
    expect(large.classes()).toContain('yh-switch--large')

    const disabled = mount(YhSwitch, {
      props: { modelValue: false, disabled: true }
    })
    expect(disabled.classes()).toContain('is-disabled')

    const loading = mount(YhSwitch, {
      props: { modelValue: false, loading: true }
    })
    expect(loading.classes()).toContain('is-loading')
    expect(loading.find('.yh-switch__loading-icon').exists()).toBe(true)
  })

  it('should emit update and change on click', async () => {
    const wrapper = mount(YhSwitch, {
      props: { modelValue: false }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('should support custom values and beforeChange hook', async () => {
    const customValue = mount(YhSwitch, {
      props: {
        modelValue: '0',
        activeValue: '1',
        inactiveValue: '0'
      }
    })

    await customValue.trigger('click')
    expect(customValue.emitted('update:modelValue')?.[0]).toEqual(['1'])

    const blocked = mount(YhSwitch, {
      props: {
        modelValue: false,
        beforeChange: () => false
      }
    })

    await blocked.trigger('click')
    expect(blocked.emitted('update:modelValue')).toBeFalsy()
  })

  it('should render labels and inline prompt content', () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: true,
        activeText: '开',
        inactiveText: '关'
      }
    })

    expect(wrapper.text()).toContain('开')
    expect(wrapper.text()).toContain('关')

    const inline = mount(YhSwitch, {
      props: {
        modelValue: true,
        activeText: '开启',
        inlinePrompt: true
      }
    })

    expect(inline.find('.yh-switch__inner').exists()).toBe(true)
  })

  it('should forward input attributes', () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: false,
        name: 'test-switch',
        id: 'my-switch',
        ariaLabel: 'toggle switch'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('name')).toBe('test-switch')
    expect(input.attributes('id')).toBe('my-switch')
    expect(input.attributes('aria-label')).toBe('toggle switch')
  })

  it('should apply width and theme overrides and expose instance api', async () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: true,
        width: 60,
        themeOverrides: {
          onColor: 'rgb(1, 2, 3)'
        }
      }
    })
    await nextTick()

    const core = wrapper.find('.yh-switch__core')
    const exposed = (wrapper.vm as any).$?.exposed

    expect(core.attributes('style')).toContain('60px')
    expect((wrapper.element as HTMLElement).style.getPropertyValue('--yh-switch-on-color')).toBe(
      'rgb(1, 2, 3)'
    )
    expect(typeof exposed?.focus).toBe('function')
    expect(exposed?.checked?.value).toBe(true)
  })

  it('should not toggle when disabled or loading', async () => {
    const disabled = mount(YhSwitch, {
      props: { modelValue: false, disabled: true }
    })
    await disabled.trigger('click')
    expect(disabled.emitted('update:modelValue')).toBeFalsy()

    const loading = mount(YhSwitch, {
      props: { modelValue: false, loading: true }
    })
    await loading.trigger('click')
    expect(loading.emitted('update:modelValue')).toBeFalsy()
  })
})
