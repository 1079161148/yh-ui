import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, h } from 'vue'
import NotificationComponent from '../src/notification.vue'
import Notification from '../src/method'
import { notificationPositions, notificationTypes } from '../src/notification'

describe('Notification constants', () => {
  it('should expose supported types and positions', () => {
    expect(notificationTypes).toContain('success')
    expect(notificationPositions).toContain('top-right')
    expect(notificationPositions).toContain('bottom-center')
  })
})

describe('Notification method', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    Notification.closeAll()
  })

  it('should render a basic notification', async () => {
    const handler = Notification({
      title: 'Title',
      message: 'Notification body'
    })
    await nextTick()

    const notificationEl = document.querySelector('.yh-notification')
    expect(notificationEl).toBeTruthy()
    expect(notificationEl?.textContent).toContain('Title')
    expect(notificationEl?.textContent).toContain('Notification body')

    handler.close()
  })

  it('should support semantic types and positions', async () => {
    const successHandler = Notification.success('Success', 'Operation completed')
    await nextTick()
    expect(document.querySelector('.yh-notification--success')).toBeTruthy()
    successHandler.close()

    const positionHandler = Notification({
      title: 'Bottom left',
      position: 'bottom-left'
    })
    await nextTick()
    expect(document.querySelector('.yh-notification--bottom-left')).toBeTruthy()
    positionHandler.close()
  })

  it('should support click and close callbacks', async () => {
    const onClick = vi.fn()
    const onClose = vi.fn()
    const handler = Notification({
      title: 'Callbacks',
      message: 'Check callbacks',
      duration: 0,
      onClick,
      onClose
    })
    await nextTick()
    ;(document.querySelector('.yh-notification') as HTMLElement).click()
    handler.close()
    await nextTick()

    expect(onClick).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })

  it('should support vnodes and html content', async () => {
    const vnodeHandler = Notification({
      title: 'VNode',
      message: h('span', null, 'VNode content')
    })
    await nextTick()
    expect(document.querySelector('.yh-notification')?.textContent).toContain('VNode content')
    vnodeHandler.close()

    Notification({
      title: 'HTML',
      message: '<b>bold</b>',
      dangerouslyUseHTMLString: true
    })
    await nextTick()
    expect(document.body.innerHTML).toContain('<b>bold</b>')
  })

  it('should respect max notification count', async () => {
    Notification({ title: '1', position: 'top-right', max: 2 })
    await nextTick()
    Notification({ title: '2', position: 'top-right', max: 2 })
    await nextTick()
    Notification({ title: '3', position: 'top-right', max: 2 })
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(document.querySelectorAll('.yh-notification--top-right').length).toBeLessThanOrEqual(2)
  })

  it('should close all notification instances', async () => {
    Notification({ title: 'n1' })
    Notification({ title: 'n2' })
    await nextTick()
    expect(document.querySelectorAll('.yh-notification').length).toBe(2)

    Notification.closeAll()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 500))

    expect(document.querySelectorAll('.yh-notification').length).toBe(0)
  })

  it('accepts string shorthand for message-only notification', async () => {
    const handler = Notification('plain string body')
    await nextTick()
    expect(document.body.textContent).toContain('plain string body')
    handler.close()
  })

  it('merges options object in semantic helpers', async () => {
    const h = Notification.warning('Warn title', { message: 'Merged body', duration: 0 })
    await nextTick()
    expect(document.querySelector('.yh-notification--warning')).toBeTruthy()
    expect(document.body.textContent).toContain('Merged body')
    h.close()
  })

  it('error helper accepts title and string message', async () => {
    const h = Notification.error('Err title', 'Err detail')
    await nextTick()
    expect(document.querySelector('.yh-notification--error')).toBeTruthy()
    expect(document.body.textContent).toContain('Err detail')
    h.close()
  })
})

describe('Notification component', () => {
  it('should apply theme overrides and expose instance api', async () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        title: 'Themed',
        message: 'Notification',
        duration: 0,
        showClose: true,
        themeOverrides: {
          bgColor: 'rgb(4, 5, 6)'
        }
      }
    })
    await nextTick()

    const root = wrapper.find('.yh-notification').element as HTMLElement
    const close = wrapper.find('.yh-notification__close')
    const exposed = (wrapper.vm as any).$?.exposed

    expect(root.style.getPropertyValue('--yh-notification-bg-color')).toBe('rgb(4, 5, 6)')
    expect(close.attributes('aria-label')).toBeTruthy()
    expect(exposed?.visible?.value).toBe(true)
    expect(typeof exposed?.close).toBe('function')
  })
})
