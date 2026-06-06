import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref, h } from 'vue'
import YhSteps from '../src/steps.vue'
import YhStep from '../src/step.vue'

describe('Steps', () => {
  it('should render basic steps', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps :active="1">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
          <yh-step title="Step 3" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(wrapper.find('.yh-steps').exists()).toBe(true)
    expect(wrapper.findAll('.yh-step').length).toBe(3)
  })

  it('should show correct status based on active', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps :active="1">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
          <yh-step title="Step 3" />
        </yh-steps>
      `
    })

    await nextTick()
    const steps = wrapper.findAll('.yh-step')
    expect(steps[0].classes()).toContain('is-finish')
    expect(steps[1].classes()).toContain('is-process')
    expect(steps[2].classes()).toContain('is-wait')
  })

  it('should support vertical direction', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps direction="vertical" :active="0">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(wrapper.find('.yh-steps--vertical').exists()).toBe(true)
  })

  it('should support simple mode', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps simple :active="0">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(wrapper.find('.yh-steps.is-simple').exists()).toBe(true)
  })

  it('should support description', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps :active="0">
          <yh-step title="Step 1" description="Description 1" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(wrapper.find('.yh-step__description').text()).toBe('Description 1')
  })

  it('should support custom status', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps :active="1">
          <yh-step title="Step 1" status="error" />
          <yh-step title="Step 2" />
        </yh-steps>
      `
    })

    await nextTick()
    const steps = wrapper.findAll('.yh-step')
    expect(steps[0].classes()).toContain('is-error')
  })

  it('should support clickable steps', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps clickable :active="0" @change="onChange">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
        </yh-steps>
      `,
      setup() {
        return { onChange }
      }
    })

    await nextTick()
    const steps = wrapper.findAll('.yh-step')
    await steps[1].trigger('click')
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('should not emit change when step is disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps clickable :active="0" @change="onChange">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" disabled />
        </yh-steps>
      `,
      setup() {
        return { onChange }
      }
    })

    await nextTick()
    const steps = wrapper.findAll('.yh-step')
    await steps[1].trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should support dot progress style', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps progress-dot :active="0">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(wrapper.find('.yh-steps.is-dot').exists()).toBe(true)
  })

  it('should render progress line width when showProgress enabled', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps :active="0" show-progress>
          <yh-step title="Step 1" :progress="33" />
          <yh-step title="Step 2" />
        </yh-steps>
      `
    })

    await nextTick()
    // first step is active, should show progress width
    const firstLine = wrapper.findAll('.yh-step__line-inner')[0]
    expect(firstLine.attributes('style')).toContain('width: 33%')
  })

  it('should support lazy step content rendering and activate on change', async () => {
    const active = ref(0)
    const wrapper = mount({
      setup() {
        return { active }
      },
      render() {
        return h(
          YhSteps,
          {
            active: active.value
          },
          () => [
            h(
              YhStep,
              { title: 'A', lazy: true },
              {
                default: () => h('div', { class: 'lazy-a' }, 'A-content')
              }
            ),
            h(
              YhStep,
              { title: 'B', lazy: true },
              {
                default: () => h('div', { class: 'lazy-b' }, 'B-content')
              }
            )
          ]
        )
      }
    })

    await nextTick()
    expect(wrapper.find('.lazy-a').exists()).toBe(true)
    expect(wrapper.find('.lazy-b').exists()).toBe(false)

    active.value = 1
    await nextTick()
    await nextTick()
    expect(wrapper.find('.lazy-b').exists()).toBe(true)
  })

  it('should support responsive direction switching on resize', async () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    Object.defineProperty(window, 'innerWidth', { value: 500, configurable: true, writable: true })

    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps responsive :responsive-breakpoint="768">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(addSpy).toHaveBeenCalled()
    expect(wrapper.find('.yh-steps--vertical').exists()).toBe(true)

    Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true, writable: true })
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(wrapper.find('.yh-steps--horizontal').exists()).toBe(true)

    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalled()

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })

  it('should render builtin status icon svg for finish and error', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps :active="1">
          <yh-step title="Finish step" />
          <yh-step title="Error step" status="error" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(wrapper.findAll('svg.yh-step__icon-inner').length).toBeGreaterThan(0)
  })

  it('should apply theme overrides as inline css vars', async () => {
    const wrapper = mount({
      components: { YhSteps, YhStep },
      template: `
        <yh-steps :theme-overrides="{ 'icon-size': '32px' }">
          <yh-step title="Step 1" />
          <yh-step title="Step 2" />
        </yh-steps>
      `
    })

    await nextTick()
    expect(wrapper.find('.yh-steps').attributes('style')).toContain('--yh-steps-icon-size: 32px')
  })
})
