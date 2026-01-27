import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { YhDrawer } from '../index'
import { nextTick } from 'vue'

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
})
