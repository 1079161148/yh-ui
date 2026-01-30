import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
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
})
