import { computed } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { en } from '@yh-ui/locale'
import { configProviderContextKey } from '@yh-ui/hooks'
import { YhGanttChart } from '../index'

describe('GanttChart', () => {
  const data = [
    {
      id: '1',
      name: 'Task 1',
      startDate: '2024-01-01',
      endDate: '2024-01-05',
      progress: 50
    }
  ]

  it('renders correctly', () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        data
      }
    })
    expect(wrapper.find('.yh-gantt-chart').exists()).toBe(true)
    expect(wrapper.find('.yh-gantt-chart__sidebar').exists()).toBe(true)
    expect(wrapper.find('.yh-gantt-chart__timeline').exists()).toBe(true)
  })

  it('renders task rows', () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        data
      }
    })
    const rows = wrapper.findAll('.yh-gantt-chart__row')
    expect(rows.length).toBe(data.length)
    expect(wrapper.html()).toContain('Task 1')
  })

  it('renders task bar in timeline', () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        data
      }
    })
    expect(wrapper.find('.yh-gantt-chart__task-wrapper').exists()).toBe(true)
  })

  it('emits task-click event', async () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        data
      }
    })
    const taskBar = wrapper.find('.yh-gantt-chart__task-inner')
    await taskBar.trigger('click')
    expect(wrapper.emitted('task-click')).toBeTruthy()
    expect(wrapper.emitted('task-click')![0][0]).toEqual(expect.objectContaining({ id: '1' }))
  })

  it('handles view mode changes', async () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        data,
        viewMode: 'day'
      }
    })

    const weekButton = wrapper.findAll('.yh-radio-button').find((b) => {
      const text = b.text()
      return text.includes('Week')
    })

    if (weekButton) {
      await weekButton.find('input').trigger('change')
      expect(wrapper.emitted('update:viewMode')).toBeTruthy()
      expect(wrapper.emitted('update:viewMode')![0][0]).toBe('week')
    }
  })

  it('filters tasks via search', async () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        data: [...data, { id: '2', name: 'Other', startDate: '2024-01-01', endDate: '2024-01-02' }]
      }
    })

    const input = wrapper.find('input[placeholder]')
    await input.setValue('Task 1')

    const rows = wrapper.findAll('.yh-gantt-chart__row')
    expect(rows.length).toBe(1)
    expect(wrapper.html()).toContain('Task 1')
    expect(wrapper.html()).not.toContain('Other')
  })

  it('supports themeOverrides css variables', () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        data,
        themeOverrides: {
          bgColor: '#101010',
          borderColor: '#222222'
        }
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--yh-gantt-bg-color: #101010')
    expect(style).toContain('--yh-gantt-border-color: #222222')
  })

  it('renders localized copy from config provider', () => {
    const wrapper = mount(YhGanttChart, {
      props: { data },
      global: {
        provide: {
          [configProviderContextKey as symbol]: computed(() => ({ locale: en }))
        }
      }
    })

    expect(wrapper.find('input[placeholder="Search tasks..."]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Zoom')
    expect(wrapper.text()).toContain('Day')
  })

  it('renders virtual mode with spacer rows', () => {
    const many = Array.from({ length: 30 }).map((_, i) => ({
      id: String(i + 1),
      name: `Task ${i + 1}`,
      startDate: '2024-01-01',
      endDate: '2024-01-05'
    }))
    const wrapper = mount(YhGanttChart, {
      props: {
        data: many,
        virtual: true,
        rowHeight: 32
      }
    })

    expect(wrapper.find('.yh-gantt-chart__timeline-body').exists()).toBe(true)
    expect(wrapper.findAll('.yh-gantt-chart__row').length).toBeGreaterThan(0)
  })

  it('renders dependency links when showDependencies is enabled', () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        showDependencies: true,
        data: [
          { id: '1', name: 'A', startDate: '2024-01-01', endDate: '2024-01-03' },
          {
            id: '2',
            name: 'B',
            startDate: '2024-01-04',
            endDate: '2024-01-06',
            dependencies: ['1']
          }
        ]
      }
    })

    expect(wrapper.findAll('.yh-gantt-chart__dependency-path').length).toBeGreaterThan(0)
  })

  it('detects resource conflict style branch', () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        showResourceLoad: true,
        data: [
          {
            id: '1',
            name: 'A',
            startDate: '2024-01-01',
            endDate: '2024-01-03',
            assignees: ['u1'],
            color: '#1890ff'
          },
          {
            id: '2',
            name: 'B',
            startDate: '2024-01-02',
            endDate: '2024-01-04',
            assignees: ['u1'],
            color: '#52c41a'
          }
        ]
      }
    })

    const bars = wrapper.findAll('.yh-gantt-chart__task-wrapper')
    expect(bars.length).toBeGreaterThan(0)
    expect(wrapper.html()).toContain('yh-gantt-chart__task-wrapper')
  })

  it('emits drag-end and progress-drag-end events', async () => {
    const wrapper = mount(YhGanttChart, {
      props: {
        draggable: true,
        progressDraggable: true,
        autoSchedule: true,
        data: [
          {
            id: '1',
            name: 'Task A',
            startDate: '2024-01-01',
            endDate: '2024-01-04',
            progress: 30
          }
        ]
      }
    })

    const task = wrapper.find('.yh-gantt-chart__task-inner')
    await task.trigger('mousedown', { clientX: 20 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 80, bubbles: true }))
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(wrapper.emitted('task-drag-end')).toBeTruthy()
    expect(wrapper.emitted('update:data')).toBeTruthy()
  })
})
