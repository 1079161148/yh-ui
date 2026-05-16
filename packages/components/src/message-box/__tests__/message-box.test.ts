import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
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

  it('method entry accepts string shorthand', async () => {
    MessageBox('string message only').catch(() => {})
    await vi.dynamicImportSettled()
    await wait()
    expect(document.querySelector('.yh-message-box')).toBeTruthy()
  })

  it('mounts via appendTo selector', async () => {
    const host = document.createElement('div')
    host.id = 'msg-append-host'
    document.body.appendChild(host)
    MessageBox.alert('in-host', 'title', { appendTo: '#msg-append-host' }).catch(() => {})
    await vi.dynamicImportSettled()
    await wait()
    expect(host.querySelector('.yh-message-box')).toBeTruthy()
  })

  it('confirm invokes callback with action on confirm', async () => {
    const cb = vi.fn()
    MessageBox.confirm('ok?', 'q', { callback: cb }).catch(() => {})
    await vi.dynamicImportSettled()
    await wait()
    const confirmBtn = document.querySelectorAll('.yh-button--primary')[0] as HTMLElement
    confirmBtn?.click()
    await wait(200)
    expect(cb).toHaveBeenCalled()
  })

  it('renders html, vnode/function message and status icons in component mode', () => {
    const html = mount(MessageBoxComponent, {
      props: {
        title: 'HTML',
        message: '<strong class="html-msg">Trusted</strong>',
        dangerouslyUseHTMLString: true,
        iconType: 'success'
      }
    })
    expect(html.find('.html-msg').text()).toBe('Trusted')
    expect(html.find('.yh-message-box__status.is-success').exists()).toBe(true)

    const rendered = mount(MessageBoxComponent, {
      props: {
        title: 'VNode',
        message: () => h('span', { class: 'fn-msg' }, 'From function'),
        iconType: 'warning'
      }
    })
    expect(rendered.find('.fn-msg').text()).toBe('From function')
    expect(rendered.find('.yh-message-box__status.is-warning').exists()).toBe(true)
  })

  it('supports custom icon names, loading buttons and hidden buttons', () => {
    const wrapper = mount(MessageBoxComponent, {
      props: {
        title: 'Custom',
        message: 'content',
        icon: 'check',
        customClass: 'custom-message-box',
        width: '32rem',
        glass: true,
        center: true,
        roundButton: true,
        confirmButtonLoading: true,
        cancelButtonLoading: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'No'
      }
    })

    expect(wrapper.find('.custom-message-box').exists()).toBe(true)
    expect(wrapper.find('.yh-message-box--glass').exists()).toBe(true)
    expect(wrapper.find('.yh-message-box--center').exists()).toBe(true)
    expect(wrapper.find('.yh-message-box').attributes('style')).toContain('width: 32rem')
    expect(wrapper.find('.yh-message-box__status').exists()).toBe(true)

    const hidden = mount(MessageBoxComponent, {
      props: {
        title: 'Hidden',
        message: 'content',
        showClose: false,
        showCancelButton: false,
        showConfirmButton: false
      }
    })
    expect(hidden.find('.yh-message-box__close').exists()).toBe(false)
    expect(hidden.findAllComponents({ name: 'YhButton' })).toHaveLength(0)
  })

  it('confirms prompt values and validates false validators', async () => {
    const wrapper = mount(MessageBoxComponent, {
      props: {
        type: 'prompt',
        inputValue: 'ready',
        inputValidator: () => false,
        inputErrorMessage: 'try again'
      }
    })
    const exposed = (wrapper.vm as any).$?.exposed
    const cb = vi.fn()
    exposed.setCallback(cb)

    await wrapper.find('input').trigger('blur')
    expect(wrapper.find('.yh-message-box__err-msg').text()).toBe('try again')
    expect(cb).not.toHaveBeenCalled()

    await wrapper.setProps({ inputValidator: () => true })
    await wrapper.find('input').setValue('accepted')
    await wrapper.find('input').trigger('blur')
    expect(wrapper.find('.yh-message-box__err-msg').text()).toBe('')
  })

  it('handles modal close, cancel and draggable movement in component mode', async () => {
    const wrapper = mount(MessageBoxComponent, {
      attachTo: document.body,
      props: {
        title: 'Drag',
        message: 'content',
        draggable: true,
        closeOnClickModal: true,
        draggableBoundary: true
      }
    })
    const exposed = (wrapper.vm as any).$?.exposed
    const cb = vi.fn()
    exposed.setCallback(cb)

    const box = wrapper.find('.yh-message-box').element as HTMLElement
    box.getBoundingClientRect = () => ({ width: 200, height: 100 }) as DOMRect

    await wrapper.find('.yh-message-box__header').trigger('mousedown', { clientX: 10, clientY: 10 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 9999, clientY: 9999 }))
    await nextTick()
    expect(wrapper.find('.yh-message-box').classes()).toContain('is-dragging')
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    expect(wrapper.find('.yh-message-box').classes()).not.toContain('is-dragging')
    expect(wrapper.find('.yh-message-box').attributes('style')).toContain('translate')

    exposed.open({ title: 'Reopen', message: 'again', closeOnClickModal: true })
    await nextTick()
    const overlay = wrapper.find('.yh-message-box-wrapper')
    await overlay.trigger('mousedown')
    await overlay.trigger('click')
    expect(cb).toHaveBeenLastCalledWith({ action: 'close', value: '' })
  })
})
