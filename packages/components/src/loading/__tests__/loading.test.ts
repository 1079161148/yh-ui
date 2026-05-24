import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { YhLoading, vYhLoading } from '../index'
import { setLoadingDefaultAppContext } from '../src/service'

describe('Loading Service', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = ''
    setLoadingDefaultAppContext(null)
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

  it('should mount inside config provider by default when available', async () => {
    const host = document.createElement('div')
    host.className = 'yh-config-provider'
    document.body.appendChild(host)

    const loading = YhLoading.service()
    await nextTick()
    expect(host.querySelector('.yh-loading-mask')).toBeTruthy()

    loading.close()
    vi.advanceTimersByTime(500)
  })

  it('should not force relative class when target already has computed positioning', () => {
    const style = document.createElement('style')
    style.textContent = '.loading-positioned { position: absolute; }'
    document.head.appendChild(style)
    document.body.innerHTML = '<div id="target" class="loading-positioned"></div>'

    const target = document.querySelector('#target') as HTMLElement
    const loading = YhLoading.service({
      fullscreen: false,
      target
    })

    expect(getComputedStyle(target).position).toBe('absolute')
    expect(target.classList.contains('yh-loading-parent--relative')).toBe(false)

    loading.close()
    vi.advanceTimersByTime(500)
    expect(target.classList.contains('yh-loading-parent--relative')).toBe(false)
    style.remove()
  })

  it('should align mask to target rect when mounted on body', async () => {
    document.body.innerHTML = '<div id="target"></div>'
    const target = document.querySelector('#target') as HTMLElement
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      width: 180,
      height: 96,
      top: 24,
      left: 36,
      right: 216,
      bottom: 120,
      x: 36,
      y: 24,
      toJSON: () => ({})
    } as DOMRect)

    const loading = YhLoading.service({
      fullscreen: false,
      body: true,
      target
    })

    await nextTick()
    const mask = document.querySelector('.yh-loading-mask') as HTMLElement
    expect(mask).toBeTruthy()
    expect(mask.style.top).toBe('24px')
    expect(mask.style.left).toBe('36px')
    expect(mask.style.width).toBe('180px')
    expect(mask.style.height).toBe('96px')

    loading.close()
    vi.advanceTimersByTime(500)
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
