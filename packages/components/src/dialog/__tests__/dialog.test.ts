import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhDialog } from '../index'

describe('Dialog', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should render incorrectly when modelValue is false', () => {
    const wrapper = mount(YhDialog, {
      props: {
        modelValue: false,
        title: 'Test Dialog'
      }
    })
    expect(document.querySelector('.yh-dialog')).toBeFalsy()
  })

  it('should render title and content correctly when open', async () => {
    const wrapper = mount(YhDialog, {
      props: {
        modelValue: true,
        title: 'Hello Dialog'
      },
      slots: {
        default: () => h('div', { class: 'dialog-content' }, 'Content Here')
      }
    })

    await nextTick()
    const dialog = document.querySelector('.yh-dialog')
    expect(dialog).toBeTruthy()
    expect(dialog?.querySelector('.yh-dialog__title')?.textContent).toBe('Hello Dialog')
    expect(dialog?.querySelector('.dialog-content')).toBeTruthy()
  })

  it('should support center mode', async () => {
    mount(YhDialog, {
      props: {
        modelValue: true,
        center: true
      }
    })
    await nextTick()
    const dialog = document.querySelector('.yh-dialog')
    expect(dialog?.classList.contains('yh-dialog--center')).toBe(true)
  })

  it('should support glass mode', async () => {
    mount(YhDialog, {
      props: {
        modelValue: true,
        glass: true
      }
    })
    await nextTick()
    const dialog = document.querySelector('.yh-dialog')
    expect(dialog?.classList.contains('yh-dialog--glass')).toBe(true)
  })

  it('should call beforeClose when closing', async () => {
    const beforeClose = vi.fn((done) => done())
    const wrapper = mount(YhDialog, {
      props: {
        modelValue: true,
        beforeClose
      }
    })

    await nextTick()
    const closeBtn = document.querySelector('.yh-dialog__headerbtn') as HTMLElement
    closeBtn.click()

    expect(beforeClose).toHaveBeenCalled()
  })

  it('should support custom close icon', async () => {
    mount(YhDialog, {
      props: {
        modelValue: true,
        closeIcon: 'custom-close'
      }
    })
    await nextTick()
    const icon = document.querySelector('.yh-dialog__headerbtn .yh-icon')
    expect(icon).toBeTruthy()
  })

  it('should support headerAlign, contentAlign and footerAlign', async () => {
    mount(YhDialog, {
      props: {
        modelValue: true,
        headerAlign: 'right',
        contentAlign: 'center',
        footerAlign: 'left'
      }
    })
    await nextTick()
    const header = document.querySelector('.yh-dialog__header') as HTMLElement
    const body = document.querySelector('.yh-dialog__body') as HTMLElement
    const footer = document.querySelector('.yh-dialog__footer') as HTMLElement

    expect(header.style.justifyContent).toBe('flex-end')
    expect(body.style.textAlign).toBe('center')
    expect(footer.style.justifyContent).toBe('flex-start')
  })

  it('should support swapFooterButtons', async () => {
    mount(YhDialog, {
      props: {
        modelValue: true,
        swapFooterButtons: true,
        footerAlign: 'right'
      }
    })
    await nextTick()
    const footer = document.querySelector('.yh-dialog__footer') as HTMLElement
    expect(footer.style.flexDirection).toBe('row-reverse')
    // When swap + right align, it should use flex-start to stay visually on the right
    expect(footer.style.justifyContent).toBe('flex-start')
  })
})
