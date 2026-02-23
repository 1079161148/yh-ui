/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import YhCheckbox from '../src/checkbox.vue'
import YhCheckboxGroup from '../src/checkbox-group.vue'

describe('YhCheckbox', () => {
  it('renders properly with label', () => {
    const wrapper = mount(YhCheckbox, {
      props: { modelValue: false, label: 'Option 1' }
    })
    expect(wrapper.find('.yh-checkbox__label').text()).toBe('Option 1')
  })

  it('supports custom true/false values', async () => {
    const wrapper = mount(YhCheckbox, {
      props: {
        modelValue: 'no',
        trueValue: 'yes',
        falseValue: 'no'
      }
    })

    expect(wrapper.classes()).not.toContain('is-checked')

    // Use setValue to ensure state change and event trigger
    const input = wrapper.find('input')
    await (input as any).setChecked(true)

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['yes'])
  })

  it('supports indeterminate state', () => {
    const wrapper = mount(YhCheckbox, {
      props: { indeterminate: true }
    })
    expect(wrapper.classes()).toContain('is-indeterminate')
  })

  it('handles focus and blur and exposes methods', async () => {
    const wrapper = mount(YhCheckbox)
    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.classes()).toContain('is-focused')

    await input.trigger('blur')
    expect(wrapper.classes()).not.toContain('is-focused')

    // test exposed methods
    const vm = wrapper.vm as any
    vm.focus()
    await nextTick()
    // In happy-dom/test-utils, focusing might not trigger the class if not handled via event
    // But we check if the method is hit.

    vm.blur()
    await nextTick()
  })

  it('watches checked prop', async () => {
    const wrapper = mount(YhCheckbox, {
      props: { modelValue: false }
    })
    await wrapper.setProps({ checked: true })
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('renders slot content', () => {
    const wrapper = mount(YhCheckbox, {
      slots: { default: 'Custom Label' }
    })
    expect(wrapper.find('.yh-checkbox__label').text()).toBe('Custom Label')
  })
})

describe('YhCheckboxGroup', () => {
  it('should work with v-model and change event', async () => {
    const wrapper = mount(YhCheckboxGroup, {
      props: {
        modelValue: ['a']
      },
      slots: {
        default: () => [
          h(YhCheckbox, { value: 'a', label: 'A' }),
          h(YhCheckbox, { value: 'b', label: 'B' })
        ]
      },
      global: { components: { YhCheckbox } }
    })

    const checkboxes = wrapper.findAllComponents(YhCheckbox)
    expect(checkboxes[0].classes()).toContain('is-checked')

    // Uncheck A
    await (checkboxes[0].find('input') as any).setChecked(false)
    await nextTick()
    const emissions1 = wrapper.emitted('update:modelValue')
    expect(emissions1).toBeTruthy()
    expect(emissions1?.[emissions1.length - 1]).toEqual([[]])

    // Manual sync for test (since props don't auto-update in vitest mount)
    await wrapper.setProps({ modelValue: [] })

    // Check B
    await (checkboxes[1].find('input') as any).setChecked(true)
    await nextTick()
    const emissions2 = wrapper.emitted('update:modelValue')
    // Now it should be exactly ['b']
    expect(emissions2?.[emissions2.length - 1]).toEqual([['b']])
  })

  it('should respect min and max limitations', async () => {
    const wrapper = mount(YhCheckboxGroup, {
      props: {
        modelValue: ['a', 'b'],
        min: 1,
        max: 2
      },
      slots: {
        default: () => [
          h(YhCheckbox, { value: 'a', label: 'A' }),
          h(YhCheckbox, { value: 'b', label: 'B' }),
          h(YhCheckbox, { value: 'c', label: 'C' })
        ]
      },
      global: { components: { YhCheckbox } }
    })

    await nextTick()
    const checkboxes = wrapper.findAllComponents(YhCheckbox)

    // Max reached (2): 'c' should be disabled
    expect(checkboxes[2].classes()).toContain('is-disabled')

    // Clicking 'c' should do nothing
    const count1 = wrapper.emitted('update:modelValue')?.length || 0
    await checkboxes[2].find('input').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.length || 0).toBe(count1)

    // Change to 1 selected
    await wrapper.setProps({ modelValue: ['a'] })
    await nextTick()

    // Now 'a' is min-disabled (cannot uncheck)
    expect(checkboxes[0].classes()).toContain('is-disabled')
    expect(checkboxes[1].classes()).not.toContain('is-disabled')

    // Clicking 'a' should do nothing
    const count2 = wrapper.emitted('update:modelValue')?.length || 0
    await checkboxes[0].find('input').trigger('click')
    // modelValue should still be ['a'] (no new emission)
    expect(wrapper.emitted('update:modelValue')?.length || 0).toBe(count2)
  })

  it('should use size and disabled from group', async () => {
    const wrapper = mount(YhCheckboxGroup, {
      props: {
        size: 'large',
        disabled: true
      },
      slots: {
        default: () => [h(YhCheckbox, { value: 'a' })]
      },
      global: { components: { YhCheckbox } }
    })

    await nextTick()
    const checkbox = wrapper.findComponent(YhCheckbox)
    expect(checkbox.classes()).toContain('yh-checkbox--large')
    expect(checkbox.classes()).toContain('is-disabled')
  })
})
