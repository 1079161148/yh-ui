import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, markRaw, nextTick } from 'vue'
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

  it('should handle async and rejected beforeChange hooks', async () => {
    const allowed = mount(YhSwitch, {
      props: {
        modelValue: true,
        beforeChange: () => Promise.resolve(true)
      }
    })

    await allowed.trigger('click')
    await nextTick()
    expect(allowed.emitted('update:modelValue')?.[0]).toEqual([false])

    const rejected = mount(YhSwitch, {
      props: {
        modelValue: false,
        beforeChange: () => Promise.reject(new Error('blocked'))
      }
    })

    await rejected.trigger('click')
    await nextTick()
    expect(rejected.emitted('update:modelValue')).toBeFalsy()
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

  it('should render icon props and action slots for both states', async () => {
    const ActiveIcon = markRaw({ render: () => h('span', { class: 'active-icon' }, 'A') })
    const InactiveIcon = markRaw({ render: () => h('span', { class: 'inactive-icon' }, 'I') })

    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: true,
        activeIcon: ActiveIcon,
        inactiveIcon: InactiveIcon,
        activeActionIcon: ActiveIcon,
        inactiveActionIcon: InactiveIcon
      }
    })

    expect(wrapper.find('.active-icon').exists()).toBe(true)

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.find('.inactive-icon').exists()).toBe(true)

    const slotted = mount(YhSwitch, {
      props: { modelValue: true, activeText: 'On' },
      slots: {
        active: '<span class="active-slot">On</span>',
        'active-action': '<span class="active-action-slot">Action</span>'
      }
    })

    expect(slotted.find('.active-slot').exists()).toBe(true)
    expect(slotted.find('.active-action-slot').exists()).toBe(true)
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

    const focusSpy = vi.spyOn(HTMLInputElement.prototype, 'focus').mockImplementation(() => {})
    exposed?.focus()
    expect(focusSpy).toHaveBeenCalled()
    focusSpy.mockRestore()
  })

  it('supports string width and keyboard enter toggling', async () => {
    const wrapper = mount(YhSwitch, {
      props: {
        modelValue: false,
        width: '4rem',
        tabindex: 2
      }
    })

    expect(wrapper.find('.yh-switch__core').attributes('style')).toContain('4rem')
    expect(wrapper.find('input').attributes('tabindex')).toBe('2')

    await wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
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

  it('covers inline inactive content, action icons and validateEvent false branch', async () => {
    const ActiveIcon = markRaw({ render: () => h('span', { class: 'active-icon-extra' }, 'A') })
    const InactiveIcon = markRaw({
      render: () => h('span', { class: 'inactive-icon-extra' }, 'I')
    })

    const inlineInactive = mount(YhSwitch, {
      props: {
        modelValue: false,
        inlinePrompt: true,
        inactiveText: 'Disabled label',
        validateEvent: false
      }
    })
    expect(inlineInactive.find('.yh-switch__inner-text').text()).toBe('Dis')
    await inlineInactive.trigger('click')
    expect(inlineInactive.emitted('update:modelValue')?.[0]).toEqual([true])

    const inlineActiveIcon = mount(YhSwitch, {
      props: {
        modelValue: true,
        inlinePrompt: true,
        activeIcon: ActiveIcon
      }
    })
    expect(inlineActiveIcon.find('.active-icon-extra').exists()).toBe(true)

    const inactiveAction = mount(YhSwitch, {
      props: {
        modelValue: false,
        inactiveActionIcon: InactiveIcon
      }
    })
    expect(inactiveAction.find('.inactive-icon-extra').exists()).toBe(true)

    const promiseFalse = mount(YhSwitch, {
      props: {
        modelValue: false,
        beforeChange: () => Promise.resolve(false)
      }
    })
    await promiseFalse.trigger('click')
    await nextTick()
    expect(promiseFalse.emitted('update:modelValue')).toBeFalsy()
  })

  it('covers text-only labels, named slots and active action icon branches', () => {
    const ActionIcon = markRaw({
      render: () => h('span', { class: 'active-action-icon-extra' }, 'A')
    })

    const textOnly = mount(YhSwitch, {
      props: {
        modelValue: true,
        activeText: 'Enabled',
        inactiveText: 'Disabled'
      }
    })
    expect(textOnly.find('.yh-switch__label--right').text()).toBe('Enabled')
    expect(textOnly.find('.yh-switch__label--left').text()).toBe('Disabled')

    const slottedInactive = mount(YhSwitch, {
      props: {
        modelValue: false,
        inactiveText: 'Off',
        activeText: 'On'
      },
      slots: {
        inactive: '<span class="inactive-slot-extra">Inactive slot</span>'
      }
    })
    expect(slottedInactive.find('.inactive-slot-extra').exists()).toBe(true)

    const activeActionIcon = mount(YhSwitch, {
      props: {
        modelValue: true,
        activeActionIcon: ActionIcon
      }
    })
    expect(activeActionIcon.find('.active-action-icon-extra').exists()).toBe(true)
  })
})
