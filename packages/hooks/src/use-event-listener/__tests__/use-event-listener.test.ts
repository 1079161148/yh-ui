import { describe, it, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useEventListener } from '../../use-event-listener'

describe('useEventListener', () => {
  it('should add event listener on mount and remove on unmount', () => {
    const target = document.createElement('div')
    const handler = vi.fn()
    vi.spyOn(target, 'addEventListener')
    vi.spyOn(target, 'removeEventListener')

    const TestComp = {
      template: '<div></div>',
      setup() {
        useEventListener(target, 'click', handler)
      }
    }

    const wrapper = mount(TestComp)
    expect(target.addEventListener).toHaveBeenCalledWith('click', handler, undefined)

    wrapper.unmount()
    expect(target.removeEventListener).toHaveBeenCalledWith('click', handler, undefined)
  })

  it('should work with ref target and watch for changes', async () => {
    const target1 = document.createElement('div')
    const target2 = document.createElement('div')
    const targetRef = ref<HTMLElement | null>(null)
    const handler = vi.fn()
    vi.spyOn(target1, 'addEventListener')
    vi.spyOn(target1, 'removeEventListener')
    vi.spyOn(target2, 'addEventListener')
    vi.spyOn(target2, 'removeEventListener')

    const TestComp = {
      template: '<div></div>',
      setup() {
        useEventListener(targetRef, 'click', handler)
        return { targetRef }
      }
    }

    const wrapper = mount(TestComp)

    // initially null, no addEventListener should be called on target1/2
    expect(target1.addEventListener).not.toHaveBeenCalled()

    // change ref to target1
    targetRef.value = target1
    await nextTick()
    expect(target1.addEventListener).toHaveBeenCalledWith('click', handler, undefined)

    // change ref to target2
    targetRef.value = target2
    await nextTick()
    expect(target1.removeEventListener).toHaveBeenCalledWith('click', handler, undefined)
    expect(target2.addEventListener).toHaveBeenCalledWith('click', handler, undefined)

    wrapper.unmount()
  })

  it('should work with function target', () => {
    const target = document.createElement('div')
    const handler = vi.fn()
    vi.spyOn(target, 'addEventListener')

    const TestComp = {
      template: '<div></div>',
      setup() {
        useEventListener(() => target, 'click', handler)
      }
    }

    mount(TestComp)
    expect(target.addEventListener).toHaveBeenCalledWith('click', handler, undefined)
  })
})
