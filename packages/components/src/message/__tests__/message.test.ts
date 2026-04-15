import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import MessageComponent from '../src/message.vue'
import Message from '../src/method'
import { messagePlacements, messageTypes } from '../src/message'

describe('Message constants', () => {
  it('should expose supported types and placements', () => {
    expect(messageTypes).toContain('success')
    expect(messagePlacements).toContain('top')
    expect(messagePlacements).toContain('bottom-right')
  })
})

describe('Message method', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    Message.closeAll()
  })

  it('should render a basic message', async () => {
    const handler = Message('test message')
    await nextTick()

    const messageEl = document.querySelector('.yh-message')
    expect(messageEl).toBeTruthy()
    expect(messageEl?.textContent).toContain('test message')

    handler.close()
  })

  it('should render different semantic types', async () => {
    const successHandler = Message.success('success message')
    await nextTick()
    expect(document.querySelector('.yh-message--success')).toBeTruthy()

    successHandler.close()

    const errorHandler = Message.error('error message')
    await nextTick()
    expect(document.querySelector('.yh-message--error')).toBeTruthy()

    errorHandler.close()
  })

  it('should support grouping', async () => {
    Message({ message: 'same message', grouping: true })
    await nextTick()
    Message({ message: 'same message', grouping: true })
    await nextTick()

    expect(document.querySelectorAll('.yh-message').length).toBe(1)
  })

  it('should support top and bottom placements independently', async () => {
    Message({ message: 'top message', placement: 'top' })
    await nextTick()
    Message({ message: 'bottom message', placement: 'bottom' })
    await nextTick()

    const messages = document.querySelectorAll('.yh-message')
    expect(messages.length).toBe(2)
    expect((messages[0] as HTMLElement).style.top).toBeTruthy()
    expect((messages[1] as HTMLElement).style.bottom).toBeTruthy()
  })

  it('should support html content and onClose', async () => {
    const onClose = vi.fn()
    const handler = Message({
      message: '<b>html</b>',
      showClose: true,
      duration: 0,
      dangerouslyUseHTMLString: true,
      onClose
    })
    await nextTick()

    expect(document.body.innerHTML).toContain('<b>html</b>')

    handler.close()
    await nextTick()
    expect(onClose).toHaveBeenCalled()
  })

  it('should close all message instances', async () => {
    Message('message 1')
    Message('message 2')
    Message('message 3')
    await nextTick()
    expect(document.querySelectorAll('.yh-message').length).toBe(3)

    Message.closeAll()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 300))

    expect(document.querySelectorAll('.yh-message').length).toBe(0)
  })
})

describe('Message component', () => {
  it('should apply theme overrides and expose instance api', async () => {
    const wrapper = mount(MessageComponent, {
      props: {
        message: 'component message',
        duration: 0,
        showClose: true,
        themeOverrides: {
          bgColor: 'rgb(1, 2, 3)'
        }
      }
    })
    await nextTick()

    const root = wrapper.find('.yh-message').element as HTMLElement
    const close = wrapper.find('.yh-message__close')
    const exposed = (wrapper.vm as any).$?.exposed

    expect(root.style.getPropertyValue('--yh-message-bg-color')).toBe('rgb(1, 2, 3)')
    expect(close.attributes('aria-label')).toBeTruthy()
    expect(exposed?.visible?.value).toBe(true)
    expect(typeof exposed?.close).toBe('function')
  })
})
