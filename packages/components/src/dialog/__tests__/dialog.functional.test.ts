import { describe, it, expect, beforeEach } from 'vitest'
import { createApp, defineComponent, h, inject, nextTick } from 'vue'
import { YhDialogMethod } from '../index'
import { setDialogDefaultAppContext } from '../src/method'

describe('Dialog Functional Call', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    setDialogDefaultAppContext(null)
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

  it('should inherit installed app context without manual appContext', async () => {
    const host = document.createElement('div')
    host.id = 'dialog-host'
    document.body.appendChild(host)

    const appRoot = document.createElement('div')
    document.body.appendChild(appRoot)

    const InjectedContent = defineComponent({
      name: 'InjectedContent',
      setup() {
        const injectedValue = inject('dialog-token', 'missing')
        return () => h('div', { class: 'dialog-injected-content' }, injectedValue)
      }
    })

    const app = createApp(
      defineComponent({
        name: 'DialogProviderRoot',
        setup: () => () => h('div')
      })
    )

    app.provide('dialog-token', 'from-app-context')
    app.use(YhDialogMethod)
    app.mount(appRoot)

    const promise = YhDialogMethod.show({
      title: 'Inherited Context',
      default: InjectedContent,
      teleportTo: '#dialog-host'
    })

    await nextTick()
    await nextTick()

    const dialogHost = document.querySelector('#dialog-host')
    expect(dialogHost?.querySelector('.yh-dialog')).toBeTruthy()
    expect(dialogHost?.querySelector('.dialog-injected-content')?.textContent).toBe(
      'from-app-context'
    )

    const confirmBtn = document.querySelector('.yh-button--primary') as HTMLElement
    confirmBtn.click()

    const res = await promise
    expect(res.action).toBe('confirm')

    app.unmount()
  })

  it('should teleport into config provider by default when available', async () => {
    const host = document.createElement('div')
    host.className = 'yh-config-provider'
    document.body.appendChild(host)

    const promise = YhDialogMethod.show({
      title: 'Config Provider Dialog',
      content: 'dialog body'
    })

    await nextTick()
    await nextTick()

    expect(host.querySelector('.yh-dialog')).toBeTruthy()

    const confirmBtn = host.querySelector('.yh-button--primary') as HTMLElement
    confirmBtn.click()

    const res = await promise
    expect(res.action).toBe('confirm')
  })
})
