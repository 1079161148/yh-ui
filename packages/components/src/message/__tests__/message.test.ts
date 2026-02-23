import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import Message from '../src/method'
import { messageTypes, messagePlacements } from '../src/message'

describe('Message Constants Coverage', () => {
  it('should have constants defined', () => {
    expect(messageTypes).toContain('success')
    expect(messagePlacements).toContain('top')
  })
})

describe('Message 方法', () => {
  beforeEach(() => {
    // 清理 DOM
    document.body.innerHTML = ''
  })

  afterEach(() => {
    Message.closeAll()
  })

  it('应该能创建消息', async () => {
    const handler = Message('测试消息')
    await nextTick()

    const messageEl = document.querySelector('.yh-message')
    expect(messageEl).toBeTruthy()
    expect(messageEl?.textContent).toContain('测试消息')

    handler.close()
  })

  it('应该支持不同类型', async () => {
    const successHandler = Message.success('成功消息')
    await nextTick()

    const successEl = document.querySelector('.yh-message--success')
    expect(successEl).toBeTruthy()

    successHandler.close()

    const errorHandler = Message.error('错误消息')
    await nextTick()

    const errorEl = document.querySelector('.yh-message--error')
    expect(errorEl).toBeTruthy()

    errorHandler.close()
  })

  it('应该支持对象配置', async () => {
    const handler = Message({
      message: '自定义消息',
      type: 'warning',
      showClose: true
    })
    await nextTick()

    const messageEl = document.querySelector('.yh-message--warning')
    expect(messageEl).toBeTruthy()
    expect(messageEl?.querySelector('.yh-message__close')).toBeTruthy()

    handler.close()
  })

  it('应该能手动关闭消息', async () => {
    const handler = Message('测试关闭')
    await nextTick()

    let messageEl = document.querySelector('.yh-message')
    expect(messageEl).toBeTruthy()

    handler.close()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 300))

    messageEl = document.querySelector('.yh-message')
    expect(messageEl).toBeFalsy()
  })

  it('应该能关闭所有消息', async () => {
    Message('消息1')
    Message('消息2')
    Message('消息3')
    await nextTick()

    let messages = document.querySelectorAll('.yh-message')
    expect(messages.length).toBe(3)

    Message.closeAll()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 300))

    messages = document.querySelectorAll('.yh-message')
    expect(messages.length).toBe(0)
  })

  it('应该支持 onClose 回调', async () => {
    const onClose = vi.fn()
    const handler = Message({
      message: '测试回调',
      onClose
    })
    await nextTick()

    handler.close()
    await nextTick()

    expect(onClose).toHaveBeenCalled()
  })

  it('应该自动计算偏移量', async () => {
    Message('消息1')
    await nextTick()

    Message('消息2')
    await nextTick()

    const messages = document.querySelectorAll('.yh-message')
    expect(messages.length).toBe(2)

    const firstTop = parseInt((messages[0] as HTMLElement).style.top)
    const secondTop = parseInt((messages[1] as HTMLElement).style.top)

    expect(secondTop).toBeGreaterThan(firstTop)
  })

  it('应该支持分组合并', async () => {
    Message({
      message: '相同消息',
      grouping: true
    })
    await nextTick()

    Message({
      message: '相同消息',
      grouping: true
    })
    await nextTick()

    // 分组合并后应该只有一个消息
    const messages = document.querySelectorAll('.yh-message')
    expect(messages.length).toBe(1)
  })

  it('应该支持不同位置展示并独立计算偏移', async () => {
    // 顶部消息
    Message({
      message: '上',
      placement: 'top'
    })
    await nextTick()

    // 底部消息
    Message({
      message: '下',
      placement: 'bottom'
    })
    await nextTick()

    const messages = document.querySelectorAll('.yh-message')
    expect(messages.length).toBe(2)

    const topMsg = messages[0] as HTMLElement
    const bottomMsg = messages[1] as HTMLElement

    expect(topMsg.style.top).toBeTruthy()
    expect(bottomMsg.style.bottom).toBeTruthy()

    // 再次在底部增加一条消息
    Message({
      message: '下2',
      placement: 'bottom'
    })
    await nextTick()

    const updatedMessages = document.querySelectorAll('.yh-message')
    const bottomMsg2 = updatedMessages[2] as HTMLElement

    const b1Pos = parseInt(bottomMsg.style.bottom)
    const b2Pos = parseInt(bottomMsg2.style.bottom)

    expect(b2Pos).toBeGreaterThan(b1Pos)
  })

  it('应该覆盖 Message.vue 的剩余分支 (覆盖逻辑)', async () => {
    // 1. 自定义图标
    Message({ message: 'icon', icon: 'my-icon' })
    await nextTick()

    // 2. HTML 字符串
    Message({ message: '<b>html</b>', dangerouslyUseHTMLString: true })
    await nextTick()
    expect(document.body.innerHTML).toContain('<b>html</b>')

    // 3. 鼠标交互 (pause/resume timer)
    const handler = Message({ message: 'hover', duration: 1000 })
    await nextTick()
    const el = document.querySelector('.yh-message') as HTMLElement
    await el.dispatchEvent(new MouseEvent('mouseenter'))
    await el.dispatchEvent(new MouseEvent('mouseleave'))

    // 4. 重复关闭
    handler.close()
    handler.close() // should return early

    // 5. 监听 repeatNum (虽然是通过 method 自动触发的)
    Message({ message: 'repeat', grouping: true, repeatNum: 2 })
    await nextTick()
  })
})
