/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiActionGroup from '../src/ai-action-group.vue'
import { YhIcon } from '../../icon'

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

  // ─── Branch Coverage ─────────────────────────────────────
  it('should handle unknown string item', () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: ['unknown-action'] }
    })
    // Should fallback to 'more' icon
    expect(wrapper.findComponent(YhIcon).props('name')).toBe('more')
  })

  it('should handle object item without icon', () => {
    // case 1: in defaultIcons
    const wrapper1 = mount(AiActionGroup, {
      props: { items: [{ key: 'copy' }] }
    })
    expect(wrapper1.findComponent(YhIcon).props('name')).toBe('copy')

    // case 2: not in defaultIcons
    const wrapper2 = mount(AiActionGroup, {
      props: { items: [{ key: 'random' }] }
    })
    expect(wrapper2.findComponent(YhIcon).props('name')).toBe('more')
  })

  it('should render object item with label but no tooltip', () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: [{ key: 'edit', label: 'Edit', tooltip: '' }] }
    })
    expect(wrapper.find('.yh-ai-action-group__item-label').text()).toBe('Edit')
    expect(wrapper.findComponent({ name: 'YhTooltip' }).exists()).toBe(false)
  })

  it('should render object item with label and tooltip', () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: [{ key: 'edit', label: 'Edit', tooltip: 'Edit Tip' }] }
    })
    expect(wrapper.find('.yh-ai-action-group__item-label').text()).toBe('Edit')
  })

  it('should render object item without label and without tooltip', () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: [{ key: 'edit', tooltip: '' }] }
    })
    expect(wrapper.find('.yh-ai-action-group__item-label').exists()).toBe(false)
  })

  it('should handle click with string item', async () => {
    const wrapper = mount(AiActionGroup, {
      props: { items: ['refresh'] }
    })
    await wrapper.find('.yh-ai-action-group__item').trigger('click')
    expect(wrapper.emitted('click')![0][0]).toBe('refresh')
  })

  it('covers aiActionGroupEmits validators', async () => {
    const { aiActionGroupEmits } = await import('../src/ai-action-group')
    expect(aiActionGroupEmits.click('test', 'test')).toBe(true)
  })

  it('handleClick covers string input branch', () => {
    const wrapper = mount(AiActionGroup)
    const vm = wrapper.vm as any
    vm.handleClick('direct-string')
    expect(wrapper.emitted('click')![0][0]).toBe('direct-string')
  })
})
