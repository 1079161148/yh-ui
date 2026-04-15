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
})
