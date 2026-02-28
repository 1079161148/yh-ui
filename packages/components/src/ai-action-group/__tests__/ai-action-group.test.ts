/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiActionGroup from '../src/ai-action-group.vue'

describe('YhAiActionGroup', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiActionGroup, { props: { items: [] } })
    expect(wrapper.find('.yh-ai-action-group').exists()).toBe(true)
  })

  it('should render empty when no items', () => {
    const wrapper = mount(AiActionGroup, { props: { items: [] } })
    expect(wrapper.findAll('.yh-ai-action-group__item').length).toBe(0)
  })

  // ─── String items ────────────────────────────────────────
  it('should render string items', () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: ['copy', 'regenerate'] }
    })
    expect(wrapper.findAll('.yh-ai-action-group__item').length).toBe(2)
  })

  it('should render object items with label', () => {
    const wrapper = mount(AiActionGroup, {
      props: {
        items: [{ key: 'share', icon: 'share', label: '分享' }]
      }
    })
    expect(wrapper.find('.yh-ai-action-group__item-label').text()).toBe('分享')
  })

  // ─── Direction ───────────────────────────────────────────
  it('should apply horizontal direction class by default', () => {
    const wrapper = mount(AiActionGroup, { props: { items: [] } })
    expect(wrapper.classes()).toContain('yh-ai-action-group--horizontal')
  })

  it('should apply vertical direction class', () => {
    const wrapper = mount(AiActionGroup, { props: { items: [], direction: 'vertical' } })
    expect(wrapper.classes()).toContain('yh-ai-action-group--vertical')
  })

  // ─── Size ────────────────────────────────────────────────
  it('should apply small size class by default', () => {
    const wrapper = mount(AiActionGroup, { props: { items: [] } })
    expect(wrapper.classes()).toContain('yh-ai-action-group--small')
  })

  it('should apply custom size class', () => {
    const wrapper = mount(AiActionGroup, { props: { items: [], size: 'large' } })
    expect(wrapper.classes()).toContain('yh-ai-action-group--large')
  })

  // ─── Click event ─────────────────────────────────────────
  it('should emit click event on item click', async () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: ['copy'] }
    })
    await wrapper.find('.yh-ai-action-group__item').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    const emitted = wrapper.emitted('click') as [string, unknown][][]
    expect(emitted[0][0]).toBe('copy')
  })

  it('should emit click with key for object item', async () => {
    const wrapper = mount(AiActionGroup, {
      props: {
        items: [{ key: 'my-action', icon: 'edit', label: 'Edit' }]
      }
    })
    await wrapper.find('.yh-ai-action-group__item').trigger('click')
    const emitted = wrapper.emitted('click') as [string, unknown][][]
    expect(emitted[0][0]).toBe('my-action')
  })

  // ─── Disabled ────────────────────────────────────────────
  it('should not emit click for disabled object item', async () => {
    const wrapper = mount(AiActionGroup, {
      props: {
        items: [{ key: 'delete', icon: 'delete', label: 'Delete', disabled: true }]
      }
    })
    await wrapper.find('.yh-ai-action-group__item').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('should apply is-disabled class to disabled item', () => {
    const wrapper = mount(AiActionGroup, {
      props: {
        items: [{ key: 'delete', icon: 'delete', disabled: true }]
      }
    })
    expect(wrapper.find('.yh-ai-action-group__item').classes()).toContain('is-disabled')
  })

  // ─── All preset string items ─────────────────────────────
  it('should render all preset string items', () => {
    const presets = [
      'copy',
      'refresh',
      'regenerate',
      'share',
      'thumb-up',
      'thumb-down',
      'edit',
      'delete'
    ]
    const wrapper = mount(AiActionGroup, {
      props: { items: presets }
    })
    expect(wrapper.findAll('.yh-ai-action-group__item').length).toBe(presets.length)
  })

  // ─── Default slot ────────────────────────────────────────
  it('should render default slot content', () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: [] },
      slots: {
        default: '<button class="extra-btn">Extra</button>'
      }
    })
    expect(wrapper.find('.extra-btn').exists()).toBe(true)
  })
})
