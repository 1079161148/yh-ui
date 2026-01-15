/**
 * InputTag Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputTag from '../src/input-tag.vue'

describe('YhInputTag', () => {
  it('should render correctly', () => {
    const wrapper = mount(InputTag, {
      props: {
        modelValue: ['Tag1', 'Tag2']
      }
    })
    expect(wrapper.get('.yh-input-tag').classes()).toContain('yh-input-tag')
    const tags = wrapper.findAll('.yh-input-tag__tag')
    expect(tags.length).toBe(2)
    expect(tags[0].text()).toContain('Tag1')
    expect(tags[1].text()).toContain('Tag2')
  })

  it('should add tag on Enter', async () => {
    const wrapper = mount(InputTag, {
      props: {
        modelValue: []
      }
    })
    const input = wrapper.find('input')
    await input.setValue('NewTag')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['NewTag']])
  })

  it('should remove tag on close button click', async () => {
    const wrapper = mount(InputTag, {
      props: {
        modelValue: ['Tag1', 'Tag2']
      }
    })
    const closeBtn = wrapper.find('.yh-input-tag__tag-close')
    await closeBtn.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['Tag2']])
  })

  it('should remove last tag on Backspace when input is empty', async () => {
    const wrapper = mount(InputTag, {
      props: {
        modelValue: ['Tag1', 'Tag2']
      }
    })
    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'Backspace' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['Tag1']])
  })

  it('should handle clearable correctly', async () => {
    const wrapper = mount(InputTag, {
      props: {
        modelValue: ['Tag1'],
        clearable: true
      }
    })
    // Hover to show clear button
    await wrapper.trigger('mouseenter')
    const clearBtn = wrapper.find('.yh-input-tag__clear')
    expect(clearBtn.exists()).toBe(true)

    await clearBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
  })

  it('should handle collapse-tags correctly', () => {
    const wrapper = mount(InputTag, {
      props: {
        modelValue: ['Tag1', 'Tag2', 'Tag3'],
        collapseTags: true,
        maxCollapseTags: 1
      }
    })
    const tags = wrapper.findAll('.yh-input-tag__tag')
    const collapsed = wrapper.find('.yh-input-tag__collapsed')
    expect(tags.length).toBe(1)
    expect(collapsed.exists()).toBe(true)
    expect(collapsed.text()).toContain('+ 2')
  })

  it('should respect disabled prop', async () => {
    const wrapper = mount(InputTag, {
      props: {
        disabled: true,
        modelValue: ['Tag1']
      }
    })
    expect(wrapper.get('.yh-input-tag').classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()

    const closeBtn = wrapper.find('.yh-input-tag__tag-close')
    expect(closeBtn.exists()).toBe(false)
  })
})
