import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import YhTabs from '../src/tabs.vue'
import YhTabPane from '../src/tab-pane.vue'

describe('Tabs', () => {
  it('should render basic tabs', async () => {
    const wrapper = mount({
      components: { YhTabs, YhTabPane },
      template: `
        <yh-tabs v-model="active">
          <yh-tab-pane name="1" label="Tab 1">Content 1</yh-tab-pane>
          <yh-tab-pane name="2" label="Tab 2">Content 2</yh-tab-pane>
        </yh-tabs>
      `,
      setup() {
        const active = ref('1')
        return { active }
      }
    })

    await nextTick()
    expect(wrapper.find('.yh-tabs').exists()).toBe(true)
    expect(wrapper.findAll('.yh-tabs__item').length).toBe(2)
  })

  it('should switch tabs on click', async () => {
    const wrapper = mount({
      components: { YhTabs, YhTabPane },
      template: `
        <yh-tabs v-model="active">
          <yh-tab-pane name="1" label="Tab 1">Content 1</yh-tab-pane>
          <yh-tab-pane name="2" label="Tab 2">Content 2</yh-tab-pane>
        </yh-tabs>
      `,
      setup() {
        const active = ref('1')
        return { active }
      }
    })

    await nextTick()
    const tabs = wrapper.findAll('.yh-tabs__item')
    await tabs[1].trigger('click')
    expect(wrapper.vm.active).toBe('2')
  })

  it('should support card type', async () => {
    const wrapper = mount({
      components: { YhTabs, YhTabPane },
      template: `
        <yh-tabs type="card">
          <yh-tab-pane name="1" label="Tab 1">Content 1</yh-tab-pane>
        </yh-tabs>
      `
    })

    await nextTick()
    expect(wrapper.find('.yh-tabs--card').exists()).toBe(true)
  })

  it('should support closable tabs', async () => {
    const onRemove = vi.fn()
    const wrapper = mount({
      components: { YhTabs, YhTabPane },
      template: `
        <yh-tabs closable @tab-remove="onRemove">
          <yh-tab-pane name="1" label="Tab 1">Content 1</yh-tab-pane>
        </yh-tabs>
      `,
      setup() {
        return { onRemove }
      }
    })

    await nextTick()
    const closeBtn = wrapper.find('.yh-tabs__close')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(onRemove).toHaveBeenCalledWith('1')
  })

  it('should support disabled tab', async () => {
    const wrapper = mount({
      components: { YhTabs, YhTabPane },
      template: `
        <yh-tabs v-model="active">
          <yh-tab-pane name="1" label="Tab 1">Content 1</yh-tab-pane>
          <yh-tab-pane name="2" label="Tab 2" disabled>Content 2</yh-tab-pane>
        </yh-tabs>
      `,
      setup() {
        const active = ref('1')
        return { active }
      }
    })

    await nextTick()
    const tabs = wrapper.findAll('.yh-tabs__item')
    expect(tabs[1].classes()).toContain('is-disabled')
    await tabs[1].trigger('click')
    expect(wrapper.vm.active).toBe('1') // Should not change
  })

  it('should support before-leave hook', async () => {
    const beforeLeave = vi.fn().mockReturnValue(false)
    const wrapper = mount({
      components: { YhTabs, YhTabPane },
      template: `
        <yh-tabs v-model="active" :before-leave="beforeLeave">
          <yh-tab-pane name="1" label="Tab 1">Content 1</yh-tab-pane>
          <yh-tab-pane name="2" label="Tab 2">Content 2</yh-tab-pane>
        </yh-tabs>
      `,
      setup() {
        const active = ref('1')
        return { active, beforeLeave }
      }
    })

    await nextTick()
    const tabs = wrapper.findAll('.yh-tabs__item')
    await tabs[1].trigger('click')
    expect(beforeLeave).toHaveBeenCalled()
    expect(wrapper.vm.active).toBe('1') // Should not change due to beforeLeave returning false
  })

  it('should support lazy rendering', async () => {
    const wrapper = mount({
      components: { YhTabs, YhTabPane },
      template: `
        <yh-tabs v-model="active">
          <yh-tab-pane name="1" label="Tab 1">Content 1</yh-tab-pane>
          <yh-tab-pane name="2" label="Tab 2" lazy>Content 2</yh-tab-pane>
        </yh-tabs>
      `,
      setup() {
        const active = ref('1')
        return { active }
      }
    })

    await nextTick()
    // Lazy pane should not render initially
    const panes = wrapper.findAll('.yh-tab-pane')
    expect(panes.length).toBe(1)
  })
})
