import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TimeSpinner from '../src/time-spinner.vue'

vi.mock('@yh-ui/hooks', async () => {
  const actual = await vi.importActual<any>('@yh-ui/hooks')
  return {
    ...actual,
    useNamespace: (name: string) => ({
      b: (suffix?: string) => (suffix ? `yh-${name}-${suffix}` : `yh-${name}`),
      e: (element: string) => `yh-${name}__${element}`,
      m: (modifier: string) => `yh-${name}--${modifier}`,
      is: (state: string, value?: boolean) => (value !== false ? `is-${state}` : '')
    })
  }
})

describe('YhTimeSpinner', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders hour, minute and second columns with complete default options', () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 }
      }
    })

    const columns = wrapper.findAll('.yh-time-spinner__column')
    expect(columns).toHaveLength(3)
    expect(columns[0].findAll('.yh-time-spinner__item')).toHaveLength(24)
    expect(columns[1].findAll('.yh-time-spinner__item')).toHaveLength(60)
    expect(columns[2].findAll('.yh-time-spinner__item')).toHaveLength(60)
  })

  it('renders arrow controls and updates hours in both directions', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 },
        arrowControl: true
      }
    })

    const arrows = wrapper.findAll('.yh-time-spinner__arrow')
    expect(arrows).toHaveLength(6)

    await arrows[0].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(11)

    await arrows[1].trigger('click')
    expect((wrapper.emitted('update:modelValue')![1] as any)[0].hours).toBe(13)
  })

  it('supports 12-hour item clicks and AM/PM conversion', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 14, minutes: 30, seconds: 45 },
        use12Hours: true
      }
    })

    const columns = wrapper.findAll('.yh-time-spinner__column')
    expect(columns).toHaveLength(4)
    const ampmItems = columns[3].findAll('.yh-time-spinner__item')
    expect(ampmItems[1].classes()).toContain('is-selected')

    await ampmItems[0].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(2)

    const hourItems = columns[0].findAll('.yh-time-spinner__item')
    await hourItems[1].trigger('click')
    expect((wrapper.emitted('update:modelValue')![1] as any)[0].hours).toBe(13)
  })

  it('supports arrow controls in 12-hour mode', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 14, minutes: 30, seconds: 45 },
        use12Hours: true,
        arrowControl: true
      }
    })

    await wrapper.findAll('.yh-time-spinner__arrow')[0].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(13)
  })

  it('skips disabled options for clicks and arrow navigation', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 },
        disabledTime: {
          disabledHours: () => [13, 14],
          disabledMinutes: () => [31],
          disabledSeconds: () => [46]
        }
      }
    })

    const hourItems = wrapper
      .findAll('.yh-time-spinner__column')[0]
      .findAll('.yh-time-spinner__item')
    expect(hourItems[13].classes()).toContain('is-disabled')

    await hourItems[13].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    await wrapper.setProps({ arrowControl: true })
    await wrapper.findAll('.yh-time-spinner__arrow')[1].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(15)
  })

  it('debounces scroll selection before emitting time changes', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 }
      }
    })

    const list = wrapper.findAll('.yh-time-spinner__list')[0]
    Object.defineProperty(list.element, 'scrollTop', {
      get: () => 416,
      set: () => {},
      configurable: true
    })

    await list.trigger('scroll')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    vi.advanceTimersByTime(150)
    await nextTick()

    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(13)
  })

  it('updates AM/PM from scroll positions', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 10, minutes: 30, seconds: 45 },
        use12Hours: true
      }
    })

    const apList = wrapper.findAll('.yh-time-spinner__list')[3]
    Object.defineProperty(apList.element, 'scrollTop', {
      get: () => 32,
      set: () => {},
      configurable: true
    })

    await apList.trigger('scroll')
    vi.advanceTimersByTime(150)
    await nextTick()

    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(22)
  })

  it('updates PM to AM from scroll positions', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 14, minutes: 30, seconds: 45 },
        use12Hours: true
      }
    })

    const apList = wrapper.findAll('.yh-time-spinner__list')[3]
    Object.defineProperty(apList.element, 'scrollTop', {
      get: () => 0,
      set: () => {},
      configurable: true
    })

    await apList.trigger('scroll')
    vi.advanceTimersByTime(150)
    await nextTick()

    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(2)
  })

  it('supports hiding seconds and custom option lists', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 8, minutes: 10, seconds: 20 },
        showSeconds: false,
        hourOptions: [8, 6, 8, 30],
        minuteOptions: [10, 20],
        secondOptions: [20, 40],
        disabledTime: {
          disabledHours: () => [6]
        }
      }
    })

    const columns = wrapper.findAll('.yh-time-spinner__column')
    expect(columns).toHaveLength(2)
    const hourItems = columns[0].findAll('.yh-time-spinner__item')
    expect(hourItems.map((item) => item.text())).toEqual(['06', '08'])
    expect(hourItems[0].classes()).toContain('is-disabled')

    await columns[1].findAll('.yh-time-spinner__item')[1].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].minutes).toBe(20)
  })

  it('wraps arrow controls and updates minute and second columns', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 0, minutes: 0, seconds: 59 },
        arrowControl: true
      }
    })

    const arrows = wrapper.findAll('.yh-time-spinner__arrow')
    await arrows[0].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(23)

    await wrapper.setProps({ modelValue: { hours: 23, minutes: 0, seconds: 59 } })
    await arrows[1].trigger('click')
    expect((wrapper.emitted('update:modelValue')![1] as any)[0].hours).toBe(0)

    await arrows[3].trigger('click')
    expect((wrapper.emitted('update:modelValue')![2] as any)[0].minutes).toBe(1)

    await arrows[4].trigger('click')
    expect((wrapper.emitted('update:modelValue')![3] as any)[0].seconds).toBe(58)
  })

  it('uses smooth scroll when modelValue changes and no-ops same AM/PM selection', async () => {
    const scrollTo = vi.fn()
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 10, minutes: 30, seconds: 45 },
        use12Hours: true
      },
      attachTo: document.body
    })

    for (const list of wrapper.findAll('.yh-time-spinner__list')) {
      Object.defineProperty(list.element, 'scrollTo', {
        value: scrollTo,
        configurable: true
      })
    }

    await wrapper.setProps({ modelValue: { hours: 11, minutes: 31, seconds: 46 } })
    await nextTick()
    await nextTick()
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }))

    const emittedBefore = wrapper.emitted('update:modelValue')?.length ?? 0
    await wrapper
      .findAll('.yh-time-spinner__list')[3]
      .findAll('.yh-time-spinner__item')[0]
      .trigger('click')
    expect(wrapper.emitted('update:modelValue')?.length ?? 0).toBe(emittedBefore)
  })

  it('ignores disabled scroll targets and out-of-range scroll positions', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 },
        disabledTime: {
          disabledMinutes: () => [31]
        }
      }
    })

    const minuteList = wrapper.findAll('.yh-time-spinner__list')[1]
    Object.defineProperty(minuteList.element, 'scrollTop', {
      get: () => 31 * 32,
      set: () => {},
      configurable: true
    })
    await minuteList.trigger('scroll')
    vi.advanceTimersByTime(150)
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    Object.defineProperty(minuteList.element, 'scrollTop', {
      get: () => 9999,
      set: () => {},
      configurable: true
    })
    await minuteList.trigger('scroll')
    vi.advanceTimersByTime(150)
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
