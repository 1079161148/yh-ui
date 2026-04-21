import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { YhCalendar } from '../index'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhCalendar', () => {
  it('renders the calendar grid', () => {
    const wrapper = mount(YhCalendar)

    expect(wrapper.find('.yh-calendar').exists()).toBe(true)
    expect(wrapper.findAll('tbody tr')).toHaveLength(6)
  })

  it('uses config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(YhCalendar)
      }
    })

    await nextTick()

    expect(wrapper.text()).toContain('Today')
  })

  it('emits select when clicking a day cell', async () => {
    const wrapper = mount(YhCalendar)

    await wrapper.find('.yh-calendar__day').trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(YhCalendar, {
      props: {
        themeOverrides: {
          primary: '#7c3aed'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-calendar-primary: #7c3aed')
  })

  it('exposes calendar control methods and refs', async () => {
    const wrapper = mount(YhCalendar)

    await nextTick()

    expect(typeof wrapper.vm.moveMonth).toBe('function')
    expect(typeof wrapper.vm.goToday).toBe('function')
    expect(wrapper.vm.displayDate).toBeTruthy()
  })

  it('supports range selection and emits range-change', async () => {
    const wrapper = mount(YhCalendar, {
      props: {
        selectionMode: 'range'
      }
    })
    const days = wrapper.findAll('.yh-calendar__day').filter((d) => !d.classes().includes('is-hidden'))
    await days[1].trigger('click')
    await days[3].trigger('click')
    expect(wrapper.emitted('range-change')).toBeTruthy()
    expect(wrapper.emitted('update:rangeValue')).toBeTruthy()
  })

  it('supports multiple mode and toggle selected day', async () => {
    const wrapper = mount(YhCalendar, {
      props: {
        selectionMode: 'multiple'
      }
    })
    const day = wrapper.findAll('.yh-calendar__day').find((d) => !d.classes().includes('is-hidden'))!
    await day.trigger('click')
    await day.trigger('click')
    expect(wrapper.emitted('update:multipleValue')).toBeTruthy()
  })

  it('respects readonly/disabled and hide other month behavior', async () => {
    const wrapper = mount(YhCalendar, {
      props: {
        readonly: true,
        showOtherMonths: false
      }
    })
    const hidden = wrapper.find('.yh-calendar__day.is-hidden')
    if (hidden.exists()) {
      await hidden.trigger('click')
    }
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('shows week number and custom cell class branch', () => {
    const wrapper = mount(YhCalendar, {
      props: {
        showWeekNumber: true,
        highlightWeekends: true,
        cellClassName: () => 'my-cell'
      }
    })
    expect(wrapper.find('.yh-calendar__week-number-header').exists()).toBe(true)
    expect(wrapper.find('.my-cell').exists()).toBe(true)
  })
})
