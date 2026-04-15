import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { YhLoading, vYhLoading } from '../index'

describe('Loading Service', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should open and close loading service', async () => {
    const loading = YhLoading.service({
      text: 'Loading...',
      customClass: 'my-loading'
    })

    const mask = document.querySelector('.yh-loading-mask')
    expect(mask).toBeTruthy()
    expect(mask?.classList.contains('my-loading')).toBe(true)
    expect(document.body.innerHTML).toContain('Loading...')

    loading.close()
    vi.advanceTimersByTime(500)
    expect(document.querySelector('.yh-loading-mask')).toBeFalsy()
  })

  it('should handle glass mode', () => {
    const loading = YhLoading.service({ glass: true })
    const mask = document.querySelector('.yh-loading-mask')
    expect(mask?.classList.contains('is-glass')).toBe(true)
    loading.close()
  })

  it('should apply theme overrides on service mask', () => {
    const loading = YhLoading.service({
      themeOverrides: {
        zIndex: '3200'
      }
    })

    const mask = document.querySelector('.yh-loading-mask')
    expect(mask?.getAttribute('style')).toContain('--yh-loading-z-index: 3200')
    loading.close()
  })
})

describe('v-yh-loading Directive', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = '<div id="app"></div>'
  })

  it('should render directive loading', async () => {
    const wrapper = mount(
      {
        template: '<div v-yh-loading="true" yh-loading-text="test"></div>',
        directives: { YhLoading: vYhLoading }
      },
      {
        attachTo: '#app'
      }
    )

    await nextTick()
    const mask = document.querySelector('.yh-loading-mask')
    expect(mask).toBeTruthy()
    expect(mask?.innerHTML).toContain('test')
    wrapper.unmount()
  })

  it('should toggle directive loading', async () => {
    const Comp = defineComponent({
      directives: { YhLoading: vYhLoading },
      props: { loading: { type: Boolean, default: false } },
      template: '<div v-yh-loading="loading"></div>'
    })

    const wrapper = mount(Comp, {
      props: { loading: false },
      attachTo: '#app'
    })

    expect(document.querySelector('.yh-loading-mask')).toBeFalsy()

    await wrapper.setProps({ loading: true })
    await nextTick()
    expect(document.querySelector('.yh-loading-mask')).toBeTruthy()

    await wrapper.setProps({ loading: false })
    await nextTick()
    vi.advanceTimersByTime(500)
    expect(document.querySelector('.yh-loading-mask')).toBeFalsy()
    wrapper.unmount()
  })

  it('should expose directive alias on plugin export', () => {
    expect(YhLoading.directive).toBe(vYhLoading)
  })
})
