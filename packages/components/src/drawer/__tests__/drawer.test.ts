import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { YhDrawer } from '../index'
import { h, nextTick } from 'vue'

describe('Drawer', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('render test', async () => {
    mount(YhDrawer, {
      props: {
        modelValue: true,
        title: 'Test Title'
      },
      slots: {
        default: 'Test Content'
      }
    })

    await nextTick()
    const drawer = document.querySelector('.yh-drawer')
    expect(drawer).toBeTruthy()
    expect(document.querySelector('.yh-drawer__title')?.textContent).toContain('Test Title')
    expect(document.querySelector('.yh-drawer__body')?.textContent).toContain('Test Content')
  })

  it('placement test', async () => {
    mount(YhDrawer, {
      props: {
        modelValue: true,
        placement: 'left'
      }
    })
    await nextTick()
    expect(document.querySelector('.yh-drawer--left')).toBeTruthy()
  })

  it('close test', async () => {
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true
      }
    })

    await nextTick()
    const closeBtn = document.querySelector('.yh-drawer__close') as HTMLElement
    closeBtn.click()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('modal click test', async () => {
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        closeOnClickModal: true
      }
    })

    await nextTick()
    const wrapperEl = document.querySelector('.yh-drawer__wrapper') as HTMLElement
    wrapperEl.click()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not close when clicking modal if disabled', async () => {
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        closeOnClickModal: false
      }
    })

    await nextTick()
    const wrapperEl = document.querySelector('.yh-drawer__wrapper') as HTMLElement
    wrapperEl.click()

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('closes on escape only when enabled', async () => {
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        closeOnPressEscape: true
      }
    })

    await nextTick()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

    const disabledWrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        closeOnPressEscape: false
      }
    })
    await nextTick()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(disabledWrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('resizable test', async () => {
    mount(YhDrawer, {
      props: {
        modelValue: true,
        resizable: true,
        placement: 'right'
      }
    })

    await nextTick()
    expect(document.querySelector('.yh-drawer__handle')).toBeTruthy()
  })

  it('emits resize while dragging horizontal handles', async () => {
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        resizable: true,
        placement: 'right',
        minSize: 100,
        maxSize: 500
      }
    })

    await nextTick()
    const drawer = document.querySelector('.yh-drawer') as HTMLElement
    drawer.getBoundingClientRect = () => ({ width: 300, height: 200 }) as DOMRect

    const handle = document.querySelector('.yh-drawer__handle') as HTMLElement
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 300 }))
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 250 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper.emitted('resize')?.[0]).toEqual([350])
    expect(document.body.style.cursor).toBe('')
  })

  it('supports vertical size and resize guards', async () => {
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        placement: 'bottom',
        size: '30%',
        resizable: true,
        minSize: 120,
        maxSize: 360
      }
    })

    await nextTick()
    const drawer = document.querySelector('.yh-drawer') as HTMLElement
    expect(drawer.style.height).toBe('30%')

    drawer.getBoundingClientRect = () => null as unknown as DOMRect
    const handle = document.querySelector('.yh-drawer__handle') as HTMLElement
    handle.dispatchEvent(new MouseEvent('mousedown', { clientY: 300 }))
    window.dispatchEvent(new MouseEvent('mousemove', { clientY: 100 }))

    expect(wrapper.emitted('resize')).toBeFalsy()
  })

  it('beforeClose test', async () => {
    const beforeClose = vi.fn((done) => done())
    const wrapper = mount(YhDrawer, {
      props: {
        modelValue: true,
        beforeClose
      }
    })

    await nextTick()
    const closeBtn = document.querySelector('.yh-drawer__close') as HTMLElement
    closeBtn.click()
    expect(beforeClose).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('size test', async () => {
    mount(YhDrawer, {
      props: { modelValue: true, size: 400, placement: 'right' }
    })
    await nextTick()
    const drawer = document.querySelector('.yh-drawer') as HTMLElement
    expect(drawer.style.width).toBe('400px')
  })

  it('header visibility and close button test', async () => {
    mount(YhDrawer, {
      props: { modelValue: true, showHeader: false }
    })
    await nextTick()
    expect(document.querySelector('.yh-drawer__header')).toBeFalsy()

    mount(YhDrawer, {
      props: { modelValue: true, showClose: false }
    })
    await nextTick()
    expect(document.querySelector('.yh-drawer__close')).toBeFalsy()
  })

  it('renders component titles and named slots', async () => {
    mount(YhDrawer, {
      props: {
        modelValue: true,
        title: h('strong', { class: 'component-title' }, 'Component Title'),
        showFooter: true
      },
      slots: {
        header: '<div class="custom-header">Header Slot</div>',
        footer: '<button class="custom-footer">Save</button>',
        default: '<main class="custom-body">Body</main>'
      }
    })

    await nextTick()

    expect(document.querySelector('.custom-header')?.textContent).toContain('Header Slot')
    expect(document.querySelector('.custom-footer')?.textContent).toContain('Save')
    expect(document.querySelector('.custom-body')?.textContent).toContain('Body')
  })

  it('zIndex and customClass test', async () => {
    mount(YhDrawer, {
      props: { modelValue: true, zIndex: 3000, customClass: 'my-drawer' }
    })
    await nextTick()
    const wrapper = document.querySelector('.yh-drawer__wrapper') as HTMLElement
    // wrapper z-index is drawerZIndex - 1
    expect(wrapper.style.zIndex).toBe('2999')
    expect(document.querySelector('.my-drawer')).toBeTruthy()
  })

  it('destroyOnClose test', async () => {
    const wrapper = mount(YhDrawer, {
      props: { modelValue: true, destroyOnClose: true },
      slots: { default: '<div class="content">Content</div>' }
    })
    await nextTick()
    expect(document.querySelector('.content')).toBeTruthy()

    await wrapper.setProps({ modelValue: false })
    await nextTick()
  })

  it('should apply locale close label and themeOverrides', async () => {
    mount(YhDrawer, {
      props: {
        modelValue: true,
        showClose: true,
        themeOverrides: {
          bgColor: 'rgb(250, 250, 250)'
        }
      }
    })

    await nextTick()
    const drawer = document.querySelector('.yh-drawer') as HTMLElement
    const closeBtn = document.querySelector('.yh-drawer__close') as HTMLElement

    expect(closeBtn.getAttribute('aria-label')).toBeTruthy()
    expect(drawer.style.getPropertyValue('--yh-drawer-bg-color')).toBe('rgb(250, 250, 250)')
  })

  it('should expose drawer instance methods and refs', async () => {
    const wrapper = mount(YhDrawer, {
      props: { modelValue: true, title: 'Expose drawer' }
    })

    await nextTick()
    const exposed = (wrapper.vm as any).$?.exposed

    expect(exposed?.drawerRef?.value).toBeInstanceOf(HTMLElement)
    expect(typeof exposed?.handleClose).toBe('function')
  })
})
