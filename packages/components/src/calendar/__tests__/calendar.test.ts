import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { YhCalendar } from '../index'
import dayjs from 'dayjs'

describe('Calendar.vue', () => {
  // ===================== 基础功能 =====================
  describe('基础渲染', () => {
    it('应该正确渲染标题', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 1, 15) // Feb 2026
        }
      })
      const titleText = wrapper.find('.yh-calendar__title').text()
      expect(titleText).toContain('2026')
      expect(titleText).toMatch(/(02|2)/)
    })

    it('应该根据 monthHeaderFormat 格式化标题', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 1, 15),
          monthHeaderFormat: 'YYYY/MM'
        }
      })
      expect(wrapper.find('.yh-calendar__title').text()).toBe('2026/02')
    })

    it('应该渲染 6 行 7 列的日期矩阵', () => {
      const wrapper = mount(YhCalendar)
      const rows = wrapper.findAll('tbody tr')
      expect(rows.length).toBe(6)

      const firstRowCells = rows[0].findAll('td')
      expect(firstRowCells.length).toBe(7)
    })
  })

  // ===================== 交互功能 =====================
  describe('交互功能', () => {
    it('应该在点击单元格时触发 select 事件', async () => {
      const wrapper = mount(YhCalendar)
      const cell = wrapper.find('.yh-calendar__day')
      await cell.trigger('click')
      expect(wrapper.emitted('select')).toBeTruthy()
    })

    it('切换月份时应该触发 panel-change 事件', async () => {
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 1, 15)
        }
      })
      const prevBtn = wrapper.findAll('.yh-calendar__nav-btn')[0]
      const targetBtn = prevBtn.find('button').exists() ? prevBtn.find('button') : prevBtn
      await targetBtn.trigger('click')
      await nextTick()
      const titleText = wrapper.find('.yh-calendar__title').text()
      expect(titleText).toContain('2026')
      expect(titleText).toMatch(/(01|1)/)
      expect(wrapper.emitted('panel-change')).toBeTruthy()
    })

    it('点击"今天"按钮应该回到今天', async () => {
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2020, 0, 1) // 旧日期
        }
      })
      const todayBtn = wrapper.findAll('.yh-button').find((b) => b.text().includes('今天'))
      await todayBtn?.trigger('click')

      const now = dayjs()
      const titleText = wrapper.find('.yh-calendar__title').text()
      expect(titleText).include(now.format('YYYY'))
    })
  })

  // ===================== Props 测试 =====================
  describe('Props 功能', () => {
    it('应该支持 firstDayOfWeek 配置', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          firstDayOfWeek: 1 // Start with Monday
        }
      })
      expect(wrapper.find('thead th').text()).toBe('一')
    })

    it('只读模式应该禁止点击', async () => {
      const wrapper = mount(YhCalendar, {
        props: {
          readonly: true
        }
      })
      const cell = wrapper.find('.yh-calendar__day')
      await cell.trigger('click')
      expect(wrapper.emitted('change')).toBeUndefined()
    })

    it('禁用模式应该添加禁用类名', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          disabled: true
        }
      })
      expect(wrapper.find('.yh-calendar').classes()).include('is-disabled')
    })

    it('全屏模式应该添加全屏类名', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          fullscreen: true
        }
      })
      expect(wrapper.find('.yh-calendar').classes()).include('is-fullscreen')
    })

    it('应该支持不同尺寸', () => {
      const wrapperSmall = mount(YhCalendar, { props: { size: 'small' } })
      const wrapperLarge = mount(YhCalendar, { props: { size: 'large' } })

      expect(wrapperSmall.find('.yh-calendar').classes()).include('yh-calendar--small')
      expect(wrapperLarge.find('.yh-calendar').classes()).include('yh-calendar--large')
    })
  })

  // ===================== 日期范围限制 =====================
  describe('日期范围限制', () => {
    it('minDate 之前的日期应该被禁用', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 1, 15),
          minDate: new Date(2026, 1, 10)
        }
      })

      // 查找日期为 9 的单元格（应该被禁用）
      const cells = wrapper.findAll('.yh-calendar__day')
      const disabledCells = cells.filter(
        (cell) =>
          cell.classes().includes('is-disabled') &&
          cell.find('.yh-calendar__day-value').text() === '9' &&
          cell.classes().includes('is-current-month')
      )
      expect(disabledCells.length).toBeGreaterThan(0)
    })

    it('maxDate 之后的日期应该被禁用', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 1, 15),
          maxDate: new Date(2026, 1, 20)
        }
      })

      const cells = wrapper.findAll('.yh-calendar__day')
      const disabledCells = cells.filter(
        (cell) =>
          cell.classes().includes('is-disabled') &&
          cell.find('.yh-calendar__day-value').text() === '25' &&
          cell.classes().includes('is-current-month')
      )
      expect(disabledCells.length).toBeGreaterThan(0)
    })

    it('应该支持 disabledDate 自定义禁用函数', () => {
      const disabledDate = (date: Date) => date.getDay() === 0 // 禁用周日
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 1, 15),
          disabledDate
        }
      })

      // 周日应该被禁用
      const cells = wrapper.findAll('.yh-calendar__day')
      const sundayCells = cells.filter(
        (cell) => cell.classes().includes('is-weekend') && cell.classes().includes('is-disabled')
      )
      expect(sundayCells.length).toBeGreaterThan(0)
    })
  })

  // ===================== 假期显示 =====================
  describe('假期显示', () => {
    it('showHoliday 开启时应该显示假期标记', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 0, 1), // 2026年1月1日（元旦）
          showHoliday: true
        }
      })

      // 应该有假期标记
      const holidayBadges = wrapper.findAll('.yh-calendar__day-badge--holiday')
      expect(holidayBadges.length).toBeGreaterThan(0)
    })

    it('应该支持自定义假期数据', () => {
      const customHolidays = {
        '2026-02-14': { name: '情人节', isOffDay: true }
      }
      const wrapper = mount(YhCalendar, {
        props: {
          modelValue: new Date(2026, 1, 14),
          showHoliday: true,
          holidays: customHolidays
        }
      })

      const holidayCells = wrapper.findAll('.yh-calendar__day.is-holiday')
      expect(holidayCells.length).toBeGreaterThan(0)
    })
  })

  // ===================== 周数显示 =====================
  describe('周数显示', () => {
    it('showWeekNumber 开启时应该显示周数列', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          showWeekNumber: true
        }
      })

      expect(wrapper.find('.yh-calendar__week-number-header').exists()).toBe(true)
      const weekNumbers = wrapper.findAll('.yh-calendar__week-number')
      expect(weekNumbers.length).toBe(6) // 6 行
    })
  })

  // ===================== 插槽测试 =====================
  describe('插槽功能', () => {
    it('应该支持 date-cell 插槽自定义内容', () => {
      const wrapper = mount(YhCalendar, {
        slots: {
          'date-cell':
            '<template #date-cell="{ data }"><span class="custom-content">Custom-{{ data.day }}</span></template>'
        }
      })
      expect(wrapper.html()).include('Custom-20')
    })

    it('应该支持 header 插槽自定义标题', () => {
      const wrapper = mount(YhCalendar, {
        slots: {
          header:
            '<template #header="{ date }"><span class="custom-header">{{ date }}</span></template>'
        }
      })
      expect(wrapper.find('.custom-header').exists()).toBe(true)
    })

    it('应该支持 footer 插槽', () => {
      const wrapper = mount(YhCalendar, {
        slots: {
          footer: '<div class="custom-footer">Footer Content</div>'
        }
      })
      expect(wrapper.find('.yh-calendar__footer').exists()).toBe(true)
      expect(wrapper.find('.custom-footer').text()).toBe('Footer Content')
    })
  })

  // ===================== 范围选择 =====================
  describe('范围选择模式', () => {
    it('范围选择模式应该正确识别', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          selectionMode: 'range'
        }
      })
      expect(wrapper.props('selectionMode')).toBe('range')
    })

    it('范围选择应该触发 range-change 事件', async () => {
      const wrapper = mount(YhCalendar, {
        props: {
          selectionMode: 'range'
        }
      })

      const cells = wrapper.findAll('.yh-calendar__day.is-current-month')

      // 点击第一个日期（开始）
      await cells[5].trigger('click')
      // 点击第二个日期（结束）
      await cells[10].trigger('click')

      expect(wrapper.emitted('range-change')).toBeTruthy()
    })
  })

  // ===================== 其他月份显示 =====================
  describe('其他月份显示', () => {
    it('showOtherMonths 为 false 时应该隐藏其他月份日期', () => {
      const wrapper = mount(YhCalendar, {
        props: {
          showOtherMonths: false
        }
      })

      const hiddenCells = wrapper.findAll('.yh-calendar__day.is-hidden')
      expect(hiddenCells.length).toBeGreaterThan(0)
    })
  })
})
