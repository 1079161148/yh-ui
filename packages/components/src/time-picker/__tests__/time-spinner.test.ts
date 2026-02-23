import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TimeSpinner from '../src/time-spinner.vue'

// Mock hooks
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

  it('应该正确渲染滚轮并包含所有时间项', () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 }
      }
    })

    const columns = wrapper.findAll('.yh-time-spinner__column')
    expect(columns.length).toBe(3) // 小时，分钟，秒
    // 小时应渲染24项，分钟60项，秒60项
    expect(columns[0].findAll('.yh-time-spinner__item').length).toBe(24)
    expect(columns[1].findAll('.yh-time-spinner__item').length).toBe(60)
    expect(columns[2].findAll('.yh-time-spinner__item').length).toBe(60)
  })

  it('使用 arrowControl 时该渲染箭头控制', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 },
        arrowControl: true
      }
    })

    const arrows = wrapper.findAll('.yh-time-spinner__arrow')
    expect(arrows.length).toBe(6) // 3列 * 2个箭头 (上下)

    // 点击小时向上箭头（向上减少值，12 -> 11）
    await arrows[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const updateEvent = wrapper.emitted('update:modelValue')![0] as any
    expect(updateEvent[0].hours).toBe(11)

    // 点击小时向下箭头（向下增加值，12 -> 13）
    await arrows[1].trigger('click')
    const updateEvent2 = wrapper.emitted('update:modelValue')![1] as any
    expect(updateEvent2[0].hours).toBe(13)
  })

  it('使用 12 小时制时应该正确计算及交互', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 14, minutes: 30, seconds: 45 },
        use12Hours: true
      }
    })

    // AM/PM 列
    const columns = wrapper.findAll('.yh-time-spinner__column')
    expect(columns.length).toBe(4) // 小时，分，秒，AM/PM
    const ampmItems = columns[3].findAll('.yh-time-spinner__item')
    // 由于 hours 是 14，PM 应选中
    expect(ampmItems[1].classes()).toContain('is-selected')

    // 点击 AM 切换到上午
    await ampmItems[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(2)

    // 点击小时 12 (对应真实时间为 PM, 但如果选中了 1)
    const hoursItems = columns[0].findAll('.yh-time-spinner__item') // 对应 12, 1, 2, ...
    // 点击 1
    await hoursItems[1].trigger('click')
    expect((wrapper.emitted('update:modelValue')![1] as any)[0].hours).toBe(13) // 因为当前是 PM 13
  })

  it('处理箭头交互并且支持 12 小时制', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 14, minutes: 30, seconds: 45 },
        use12Hours: true,
        arrowControl: true
      }
    })

    const arrows = wrapper.findAll('.yh-time-spinner__arrow')
    // 点击小时向上箭头 (当前小时 14 -> 12小时制显示 2，减 1 就是显示 1，真实 13)
    await arrows[0].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(13)
  })

  it('禁用时间应该不可点击和滚动跳过', async () => {
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

    const hoursItems = wrapper
      .findAll('.yh-time-spinner__column')[0]
      .findAll('.yh-time-spinner__item')
    expect(hoursItems[13].classes()).toContain('is-disabled')

    // 点击被禁用的项不应触发更新
    await hoursItems[13].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    // 测试使用 arrowControl 跳过禁用的项
    await wrapper.setProps({ arrowControl: true })
    const arrows = wrapper.findAll('.yh-time-spinner__arrow')
    // 当前是12，向下箭头加1，应为13（禁用），再加应为14（禁用），最后选15
    await arrows[1].trigger('click')
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(15)
  })

  it('通过滚动改变时间应该防抖触发', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 12, minutes: 30, seconds: 45 }
      }
    })

    const list = wrapper.findAll('.yh-time-spinner__list')[0] // 小时列表
    // 模拟 scrollTop 为 384 (12 * 32 = 384)，滚动到索引 13 (416)
    Object.defineProperty(list.element, 'scrollTop', {
      get: () => 416,
      set: () => {},
      configurable: true
    })

    await list.trigger('scroll')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    // 时间推移使防抖定时器执行
    vi.advanceTimersByTime(150)
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(13)
  })

  it('AM/PM 的滚动逻辑正常触发', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 10, minutes: 30, seconds: 45 },
        use12Hours: true
      }
    })

    const apList = wrapper.findAll('.yh-time-spinner__list')[3] // AM/PM列表
    Object.defineProperty(apList.element, 'scrollTop', {
      get: () => 32,
      set: () => {},
      configurable: true
    }) // 滚动到 PM

    await apList.trigger('scroll')
    vi.advanceTimersByTime(150)
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(22)
  })

  it('AM 切换到 PM', async () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        modelValue: { hours: 14, minutes: 30, seconds: 45 },
        use12Hours: true
      }
    })

    // 从 PM -> AM
    const apList = wrapper.findAll('.yh-time-spinner__list')[3]
    Object.defineProperty(apList.element, 'scrollTop', {
      get: () => 0,
      set: () => {},
      configurable: true
    }) // 滚动到 AM

    await apList.trigger('scroll')
    vi.advanceTimersByTime(150)
    await nextTick()

    expect((wrapper.emitted('update:modelValue')![0] as any)[0].hours).toBe(2)
  })
})
