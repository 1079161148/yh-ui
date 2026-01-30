import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhDescriptions, YhDescriptionsItem } from '../index'
import { h } from 'vue'

describe('Descriptions', () => {
  it('should render basic descriptions', () => {
    const wrapper = mount(YhDescriptions, {
      props: {
        title: 'Title',
        extra: 'Extra'
      },
      slots: {
        default: [
          h(YhDescriptionsItem, { label: 'Label 1' }, () => 'Content 1'),
          h(YhDescriptionsItem, { label: 'Label 2' }, () => 'Content 2')
        ]
      }
    })

    expect(wrapper.find('.yh-descriptions__title').text()).toBe('Title')
    expect(wrapper.find('.yh-descriptions__extra').text()).toBe('Extra')
    expect(wrapper.findAll('.yh-descriptions__label').length).toBe(2)
    expect(wrapper.findAll('.yh-descriptions__content').length).toBe(2)
    expect(wrapper.find('.yh-descriptions__label').text()).toContain('Label 1')
    expect(wrapper.find('.yh-descriptions__content').text()).toBe('Content 1')
  })

  it('should support border', () => {
    const wrapper = mount(YhDescriptions, {
      props: { border: true }
    })
    expect(wrapper.classes()).toContain('is-bordered')
  })

  it('should support vertical direction', () => {
    const wrapper = mount(YhDescriptions, {
      props: { direction: 'vertical' }
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  it('should support custom column', () => {
    const wrapper = mount(YhDescriptions, {
      props: { column: 4 },
      slots: {
        default: [
          h(YhDescriptionsItem, { label: 'L1' }, () => 'C1'),
          h(YhDescriptionsItem, { label: 'L2' }, () => 'C2'),
          h(YhDescriptionsItem, { label: 'L3' }, () => 'C3'),
          h(YhDescriptionsItem, { label: 'L4' }, () => 'C4')
        ]
      }
    })
    // Check if they are in the same row
    expect(wrapper.findAll('tr').length).toBe(1)
  })

  it('should handle span correctly', () => {
    const wrapper = mount(YhDescriptions, {
      props: { column: 3 },
      slots: {
        default: [
          h(YhDescriptionsItem, { label: 'L1', span: 2 }, () => 'C1'),
          h(YhDescriptionsItem, { label: 'L2' }, () => 'C2')
        ]
      }
    })
    // Should still be in 1 row
    expect(wrapper.findAll('tr').length).toBe(1)
    expect(wrapper.findAll('.yh-descriptions__content')[0].attributes('colspan')).toBe('3') // span 2 * 2 - 1 = 3
  })
})
