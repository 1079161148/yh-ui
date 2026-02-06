import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhCountdown } from '../index'
import { nextTick } from 'vue'
import {
  parseTimeUnits,
  createFormatContext,
  formatCountdown,
  isTargetTimestamp
} from '../src/countdown'

describe('Countdown.vue', () => {
  // 设置一个固定的基准时间
  const BASE_TIME = 1700000000000 // 2023-11-14

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(BASE_TIME)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  // ===================== 工具函数测试（纯函数，不依赖组件挂载） =====================
  describe('工具函数', () => {
    it('parseTimeUnits 应该正确解析时间', () => {
      const result = parseTimeUnits(3661000) // 1小时1分1秒
      expect(result.hours).toBe(1)
      expect(result.minutes).toBe(1)
      expect(result.seconds).toBe(1)
    })

    it('createFormatContext 应该正确创建格式化上下文', () => {
      const ctx = createFormatContext(3661000)
      expect(ctx.HH).toBe('01')
      expect(ctx.mm).toBe('01')
      expect(ctx.ss).toBe('01')
    })

    it('formatCountdown 应该正确格式化时间', () => {
      const ctx = createFormatContext(3661000)
      const result = formatCountdown('HH:mm:ss', ctx)
      expect(result).toBe('01:01:01')
    })

    it('isTargetTimestamp 应该正确判断值类型', () => {
      // 小值应该被视为持续时间
      expect(isTargetTimestamp(3600000)).toBe(false)
      expect(isTargetTimestamp(90000000)).toBe(false)

      // 大值应该被视为时间戳
      expect(isTargetTimestamp(1700000000000)).toBe(true)

      // Date 对象始终视为时间戳
      expect(isTargetTimestamp(new Date())).toBe(true)
    })

    it('应该正确解析复杂时间单位', () => {
      // 1天2小时3分4秒5毫秒 = 93784005ms
      const ctx = createFormatContext(93784005)
      expect(ctx.DD).toBe('01')
      expect(ctx.HH).toBe('02')
      expect(ctx.mm).toBe('03')
      expect(ctx.ss).toBe('04')
      expect(ctx.SSS).toBe('005')
    })
  })

  // ===================== 基础渲染 =====================
  describe('基础渲染', () => {
    it('应该正确渲染组件', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 3600000
        }
      })
      await nextTick()
      expect(wrapper.find('.yh-countdown').exists()).toBe(true)
    })

    it('应该根据默认格式显示时间（持续时间模式）', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 3661000,
          autoStart: false
        }
      })
      await nextTick()
      // 等待组件完成初始化
      await nextTick()
      expect(wrapper.find('.yh-countdown__value').text()).toBe('01:01:01')
    })

    it('应该支持自定义格式', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 90061000,
          format: 'DD天HH时mm分ss秒',
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.yh-countdown__value').text()).toBe('01天01时01分01秒')
    })

    it('应该支持自定义格式化函数', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 3600000,
          format: (ctx) => `剩余 ${ctx.HH} 小时`,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.yh-countdown__value').text()).toBe('剩余 01 小时')
    })
  })

  // ===================== 值类型测试 =====================
  describe('值类型', () => {
    it('应该支持毫秒持续时间', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 5000,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.yh-countdown__value').text()).toBe('00:00:05')
    })

    it('应该支持 Date 对象作为目标时间', async () => {
      const futureDate = new Date(BASE_TIME + 60000)
      const wrapper = mount(YhCountdown, {
        props: {
          value: futureDate,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.yh-countdown__value').text()).toBe('00:01:00')
    })

    it('应该支持时间戳作为目标时间', async () => {
      const futureTimestamp = BASE_TIME + 120000
      const wrapper = mount(YhCountdown, {
        props: {
          value: futureTimestamp,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.yh-countdown__value').text()).toBe('00:02:00')
    })
  })

  // ===================== 控制方法测试 =====================
  describe('控制方法', () => {
    it('应该暴露 start 方法', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('pending')

      wrapper.vm.start()
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('running')
    })

    it('应该暴露 pause 方法', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: true
        }
      })
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('running')

      wrapper.vm.pause()
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('paused')
    })

    it('应该暴露 resume 方法', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: true
        }
      })
      await nextTick()
      wrapper.vm.pause()
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('paused')

      wrapper.vm.resume()
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('running')
    })

    it('应该暴露 reset 方法', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()

      wrapper.vm.start()
      await nextTick()

      wrapper.vm.reset()
      await nextTick()

      expect(wrapper.emitted('reset')).toBeTruthy()
    })

    it('应该暴露 getRemain 方法', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.vm.getRemain()).toBe(10000)
    })

    it('应该暴露 getStatus 方法', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('pending')
    })
  })

  // ===================== 事件测试 =====================
  describe('事件', () => {
    it('应该在开始时触发 start 事件', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()

      wrapper.vm.start()
      await nextTick()
      expect(wrapper.emitted('start')).toBeTruthy()
    })

    it('应该在暂停时触发 pause 事件', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: true
        }
      })
      await nextTick()
      wrapper.vm.pause()
      await nextTick()
      expect(wrapper.emitted('pause')).toBeTruthy()
    })

    it('应该在恢复时触发 resume 事件', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: true
        }
      })
      await nextTick()
      wrapper.vm.pause()
      await nextTick()
      wrapper.vm.resume()
      await nextTick()
      expect(wrapper.emitted('resume')).toBeTruthy()
    })

    it('应该在状态变化时触发 statusChange 事件', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()

      wrapper.vm.start()
      await nextTick()

      const statusChanges = wrapper.emitted('statusChange')
      expect(statusChanges).toBeTruthy()
      expect(statusChanges![0]).toEqual(['running'])
    })

    it('应该在结束时触发 finish 事件', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 0,
          autoStart: true
        }
      })
      await nextTick()
      expect(wrapper.emitted('finish')).toBeTruthy()
    })
  })

  // ===================== Props 测试 =====================
  describe('Props', () => {
    it('autoStart 为 false 时不应自动开始', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('pending')
    })

    it('应该支持 title prop', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          title: '倒计时：',
          autoStart: false
        }
      })
      await nextTick()
      expect(wrapper.find('.yh-countdown__title').text()).toBe('倒计时：')
    })

    it('应该支持 suffix prop', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          suffix: '剩余',
          autoStart: false
        }
      })
      await nextTick()
      expect(wrapper.find('.yh-countdown__suffix').text()).toBe('剩余')
    })

    it('应该支持 useMonospaceFont prop', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          useMonospaceFont: true,
          autoStart: false
        }
      })
      await nextTick()
      expect(wrapper.find('.yh-countdown').classes()).toContain('is-monospace')
    })

    it('应该支持 flipAnimation prop', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          flipAnimation: true,
          autoStart: false
        }
      })
      await nextTick()
      expect(wrapper.find('.yh-countdown').classes()).toContain('is-flip')
    })

    it('flipAnimation 模式应该显示时间块', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 3661000,
          flipAnimation: true,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      const blocks = wrapper.findAll('.yh-countdown__block')
      expect(blocks.length).toBe(3)
    })

    it('应该支持 labels prop', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 3661000,
          flipAnimation: true,
          labels: { hours: '时', minutes: '分', seconds: '秒' },
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      const labels = wrapper.findAll('.yh-countdown__label')
      expect(labels.length).toBe(3)
      expect(labels[0].text()).toBe('时')
    })

    it('应该支持 showDays prop', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 90000000,
          flipAnimation: true,
          showDays: true,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      const blocks = wrapper.findAll('.yh-countdown__block')
      expect(blocks.length).toBe(4)
    })

    it('应该支持 serverTimeOffset prop', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: BASE_TIME + 7200000,
          serverTimeOffset: 3600000,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      const remain = wrapper.vm.getRemain()
      expect(remain).toBeLessThanOrEqual(3600100)
      expect(remain).toBeGreaterThanOrEqual(3599000)
    })
  })

  // ===================== 预警测试 =====================
  describe('预警状态', () => {
    it('应该在剩余时间小于阈值时添加 warning 类', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 5000,
          warningThreshold: 10000,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.yh-countdown').classes()).toContain('is-warning')
    })

    it('应该在超出阈值时不显示 warning 类', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 20000,
          warningThreshold: 10000,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.yh-countdown').classes()).not.toContain('is-warning')
    })
  })

  // ===================== 插槽测试 =====================
  describe('插槽', () => {
    it('应该支持 prefix 插槽', async () => {
      const wrapper = mount(YhCountdown, {
        props: { value: 10000, autoStart: false },
        slots: {
          prefix: '<span class="custom-prefix">前缀</span>'
        }
      })
      await nextTick()
      expect(wrapper.find('.custom-prefix').exists()).toBe(true)
    })

    it('应该支持 suffix 插槽', async () => {
      const wrapper = mount(YhCountdown, {
        props: { value: 10000, autoStart: false },
        slots: {
          suffix: '<span class="custom-suffix">后缀</span>'
        }
      })
      await nextTick()
      expect(wrapper.find('.custom-suffix').exists()).toBe(true)
    })

    it('应该支持 separator 插槽', async () => {
      const wrapper = mount(YhCountdown, {
        props: { value: 3661000, flipAnimation: true, autoStart: false },
        slots: {
          separator: '<span class="custom-sep">-</span>'
        }
      })
      await nextTick()
      await nextTick()
      expect(wrapper.find('.custom-sep').exists()).toBe(true)
    })
  })

  // ===================== 状态测试 =====================
  describe('状态', () => {
    it('初始时间为 0 应该直接进入 finished 状态', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 0,
          autoStart: true
        }
      })
      await nextTick()
      expect(wrapper.vm.getStatus()).toBe('finished')
      expect(wrapper.find('.yh-countdown').classes()).toContain('is-finished')
    })

    it('暂停状态应该添加 paused 类', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: true
        }
      })
      await nextTick()
      wrapper.vm.pause()
      await nextTick()
      expect(wrapper.find('.yh-countdown').classes()).toContain('is-paused')
    })
  })

  // ===================== value 变化测试 =====================
  describe('value 变化', () => {
    it('value 变化时应该重置倒计时', async () => {
      const wrapper = mount(YhCountdown, {
        props: {
          value: 10000,
          autoStart: false
        }
      })
      await nextTick()
      await nextTick()

      await wrapper.setProps({ value: 20000 })
      await nextTick()
      await nextTick()

      expect(wrapper.vm.getRemain()).toBe(20000)
      expect(wrapper.emitted('reset')).toBeTruthy()
    })
  })
})
