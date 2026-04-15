import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MessageBox from '../src/method'
import MessageBoxComponent from '../src/message-box.vue'

describe('MessageBox (Most Complete Version)', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const wait = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms))

  it('should support prompt validation (regex)', async () => {
    const res = MessageBox.prompt('prompt', 'title', {
      inputPattern: /^\d+$/,
      inputErrorMessage: 'invalid number'
    })
    res.catch(() => {})
    await vi.dynamicImportSettled()
    await wait()

    const input = document.querySelector('input') as HTMLInputElement
    input.value = 'abc'
    input.dispatchEvent(new Event('input'))
    await nextTick()

    // 点击确认
    const confirmBtn = document.querySelectorAll('.yh-button--primary')[0] as HTMLElement
    confirmBtn?.click()
    await wait(100)

    // 弹窗应依然存在（校验失败）
    expect(document.querySelector('.yh-message-box-wrapper')).toBeTruthy()
    const errorMsg = document.querySelector('.yh-message-box__err-msg')
    expect(errorMsg?.textContent?.trim()).toBe('invalid number')
  })

  it('should support custom validator function', async () => {
    const res = MessageBox.prompt('validate', 'title', {
      inputValidator: (val) => val.length >= 3 || 'too short'
    })
    res.catch(() => {})
    await vi.dynamicImportSettled()
    await wait()

    const input = document.querySelector('input') as HTMLInputElement
    input.value = '12'
    input.dispatchEvent(new Event('input'))
    await nextTick()

    const confirmBtn = document.querySelectorAll('.yh-button--primary')[0] as HTMLElement
    confirmBtn?.click()
    await wait(100)

    expect(document.querySelector('.yh-message-box__err-msg')?.textContent?.trim()).toBe(
      'too short'
    )
  })

  it('should close on ESC key', async () => {
    const promise = MessageBox.alert('esc', 'title', { closeOnPressEscape: true })
    await vi.dynamicImportSettled()
    await wait()

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }))

    const res = await promise.catch((action) => action)
    expect(res).toBe('close')
  })

  it('should lock scroll when opened', async () => {
    document.body.style.overflow = 'visible'
    MessageBox.alert('lock', 'title', { lockScroll: true }).catch(() => {})
    await vi.dynamicImportSettled()
    await wait()

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should support global default settings', async () => {
    MessageBox.setDefaults({ glass: true, center: true })
    MessageBox.alert('defaults').catch(() => {})
    await vi.dynamicImportSettled()
    await wait()

    const box = document.querySelector('.yh-message-box')
    expect(box?.classList.contains('yh-message-box--glass')).toBe(true)
    expect(box?.classList.contains('yh-message-box--center')).toBe(true)
  })

  it('should handle beforeClose with loading', async () => {
    vi.useFakeTimers()
    const res = MessageBox.confirm('wait', 'title', {
      beforeClose: (action, instance, done) => {
        setTimeout(done, 100)
      }
    })
    res.catch(() => {})
    await vi.dynamicImportSettled()

    const confirmBtn = document.querySelectorAll('.yh-button--primary')[0] as HTMLElement
    confirmBtn?.click()

    vi.advanceTimersByTime(101)
    await Promise.resolve()

    vi.useRealTimers()
  })

  it('should render locale-backed close label and theme overrides in component mode', () => {
    const wrapper = mount(MessageBoxComponent, {
      props: {
        title: 'title',
        message: 'message',
        showClose: true,
        themeOverrides: {
          bgColor: '#111111',
          titleColor: '#eeeeee'
        }
      }
    })

    const closeButton = wrapper.get('button[aria-label]')
    expect(closeButton.attributes('aria-label')).toBeTruthy()
    expect(wrapper.get('.yh-message-box').attributes('style')).toContain(
      '--yh-message-box-bg-color: #111111'
    )
    expect(wrapper.get('.yh-message-box').attributes('style')).toContain(
      '--yh-message-box-title-color: #eeeeee'
    )
  })
})
