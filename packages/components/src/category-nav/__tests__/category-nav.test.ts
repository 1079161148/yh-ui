import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import CategoryNav from '../src/category-nav.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('CategoryNav', () => {
  const props = {
    modelValue: '1',
    categories: [
      { id: '1', name: '电子产品', children: [{ id: '1-1', name: '手机' }] },
      { id: '2', name: '服饰', children: [{ id: '2-1', name: '女装' }] }
    ]
  }

  it('renders correctly', () => {
    const wrapper = mount(CategoryNav, { props })
    expect(wrapper.text()).toContain('电子产品')
    expect(wrapper.text()).toContain('服饰')
    expect(wrapper.text()).toContain('手机')
    expect(wrapper.text()).toContain('女装')
  })

  it('triggers category click', async () => {
    const wrapper = mount(CategoryNav, { props })
    const items = wrapper.findAll('.yh-category-nav__side-item')
    // Click on item 2 (index 2 because index 0 is "All")
    await items[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
    expect(wrapper.emitted('categoryClick')![0][0].id).toBe('2')
  })

  it('triggers sub category click', async () => {
    const wrapper = mount(CategoryNav, { props })
    const subItems = wrapper.findAll('.yh-category-nav__sub-item')
    await subItems[0].trigger('click')
    expect(wrapper.emitted('update:subValue')![0]).toEqual(['1-1'])
    expect(wrapper.emitted('subCategoryClick')![0][0].id).toBe('1-1')
  })

  it('uses config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(CategoryNav, { categories: props.categories, modelValue: '1' })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('All')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(CategoryNav, {
      props: {
        ...props,
        themeOverrides: {
          'side-active-color': '#13c2c2'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-category-nav-side-active-color: #13c2c2')
  })

  it('supports anchor mode and updates by scrolling boundary', async () => {
    const oldRaf = globalThis.requestAnimationFrame
    const oldCancel = globalThis.cancelAnimationFrame
    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      cb(0)
      return 1
    }) as typeof requestAnimationFrame
    globalThis.cancelAnimationFrame = (() => {}) as typeof cancelAnimationFrame

    const wrapper = mount(CategoryNav, {
      props: {
        ...props,
        anchor: true,
        showAll: true,
        modelValue: '1'
      },
      attachTo: document.body
    })

    const content = wrapper.find('.yh-category-nav__content')
    const contentEl = content.element as HTMLElement
    Object.defineProperty(contentEl, 'clientHeight', { value: 200, configurable: true })
    Object.defineProperty(contentEl, 'scrollHeight', { value: 400, configurable: true })
    contentEl.scrollTop = 0
    await content.trigger('scroll')
    await nextTick()
    const emits = wrapper.emitted('update:modelValue') || []
    expect(emits.length).toBeGreaterThan(0)

    contentEl.scrollTop = 220
    await content.trigger('scroll')
    await nextTick()
    expect((wrapper.emitted('update:modelValue') || []).length).toBeGreaterThan(0)
    globalThis.requestAnimationFrame = oldRaf
    globalThis.cancelAnimationFrame = oldCancel
  })

  it('initializes activeId to first category when showAll=false and modelValue=null', async () => {
    const wrapper = mount(CategoryNav, {
      props: {
        categories: props.categories,
        modelValue: null,
        showAll: false,
        anchor: false
      }
    })
    await nextTick()
    expect(wrapper.find('.yh-category-nav__side-item.is-active').text()).toContain('电子产品')
  })

  it('covers IntersectionObserver syncing branch (anchor=true)', async () => {
    const ioObserve = vi.fn()
    const ioDisconnect = vi.fn()
    const ioUnobserve = vi.fn()
    let ioCallback: ((entries: any[]) => void) | null = null

    // @ts-expect-error test stub
    globalThis.IntersectionObserver = class {
      constructor(cb: any) {
        ioCallback = cb
      }
      observe = ioObserve
      unobserve = ioUnobserve
      disconnect = ioDisconnect
    }

    const wrapper = mount(CategoryNav, {
      props: {
        ...props,
        anchor: true,
        showAll: true,
        modelValue: '1'
      },
      attachTo: document.body
    })

    await nextTick()
    await nextTick()

    const sections = wrapper.findAll('.yh-category-nav__section')
    expect(sections.length).toBeGreaterThan(0)

    // Simulate intersection for second category section
    const section2 = sections.find((s) => s.attributes('data-id') === '2')!
    Object.defineProperty(section2.element, 'offsetTop', { value: 10, configurable: true })

    ioCallback?.([
      {
        target: section2.element,
        isIntersecting: true
      }
    ])

    expect((wrapper.emitted('update:modelValue') || []).length).toBeGreaterThan(0)
    wrapper.unmount()
    expect(ioDisconnect).toHaveBeenCalled()
  })

  it('renders loading skeleton and empty state branches', async () => {
    const w1 = mount(CategoryNav, {
      props: {
        categories: props.categories,
        loading: true
      }
    })
    expect(w1.findAll('.yh-category-nav__skeleton').length).toBeGreaterThan(0)
    w1.unmount()

    const w2 = mount(CategoryNav, {
      props: {
        categories: [],
        modelValue: 'missing-id',
        showAll: false
      }
    })
    expect(w2.findAll('.yh-category-nav__sub-item').length).toBe(0)
    expect(w2.find('.yh-category-nav__section').exists()).toBe(false)
    w2.unmount()
  })

  it('short-circuits when clicking already active category', async () => {
    const wrapper = mount(CategoryNav, { props })
    const before = (wrapper.emitted('update:modelValue') || []).length
    const activeBtn = wrapper.find('.yh-category-nav__side-item.is-active')
    await activeBtn.trigger('click')
    const after = (wrapper.emitted('update:modelValue') || []).length
    expect(after).toBe(before)
  })

  it('scroll bottom boundary highlights last category', async () => {
    const oldRaf = globalThis.requestAnimationFrame
    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      cb(0)
      return 1
    }) as typeof requestAnimationFrame

    const wrapper = mount(CategoryNav, {
      props: {
        ...props,
        anchor: true,
        showAll: true,
        modelValue: '1'
      },
      attachTo: document.body
    })

    const content = wrapper.find('.yh-category-nav__content')
    const contentEl = content.element as HTMLElement
    Object.defineProperty(contentEl, 'clientHeight', { value: 200, configurable: true })
    Object.defineProperty(contentEl, 'scrollHeight', { value: 400, configurable: true })
    contentEl.scrollTop = 210 // 210 + 200 >= 400 - 2
    await content.trigger('scroll')
    await nextTick()

    expect((wrapper.emitted('update:modelValue') || []).some((e) => e[0] === '2')).toBe(true)

    globalThis.requestAnimationFrame = oldRaf
  })
})
