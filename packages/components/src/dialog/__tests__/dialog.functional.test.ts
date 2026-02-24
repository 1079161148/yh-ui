import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { YhDialogMethod } from '../index'

describe('Dialog Functional Call', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    // 清理可能残留在 body 上的 teleport 内容
    const wrappers = document.querySelectorAll('.yh-dialog__wrapper')
    wrappers.forEach((el) => el.parentElement?.remove())
  })

  it('should show dialog using YhDialogMethod.show', async () => {
    const promise = YhDialogMethod.show({
      title: 'Functional Dialog',
      content: 'This is a funtional call'
    })

    await nextTick()
    await nextTick() // Teleport might need an extra tick
    const dialog = document.querySelector('.yh-dialog')
    expect(dialog).toBeTruthy()
    expect(dialog?.querySelector('.yh-dialog__title')?.textContent).toBe('Functional Dialog')
    expect(dialog?.querySelector('.yh-dialog__body')?.textContent).toContain(
      'This is a funtional call'
    )

    // Click confirm
    const confirmBtn = document.querySelector('.yh-button--primary') as HTMLElement
    confirmBtn.click()

    const res = await promise
    expect(res.action).toBe('confirm')
  })

  it('should show success dialog using YhDialogMethod.success', async () => {
    YhDialogMethod.success('Success message', 'Success Title')

    await nextTick()
    await nextTick()
    const dialog = document.querySelector('.yh-dialog')
    expect(dialog).toBeTruthy()
    expect(dialog?.querySelector('.yh-dialog__title')?.textContent).toBe('Success Title')
    expect(dialog?.classList.contains('yh-dialog--success')).toBe(true)
  })

  it('should handle cancel action', async () => {
    const promise = YhDialogMethod.show({
      title: 'Cancel Test',
      content: 'Testing cancel'
    })

    await nextTick()
    const dialog = document.querySelector('.yh-dialog')
    const cancelBtn = dialog?.querySelectorAll('.yh-button')[0] as HTMLElement
    cancelBtn.click()

    const res = await promise
    expect(res.action).toBe('cancel')
  })
})
