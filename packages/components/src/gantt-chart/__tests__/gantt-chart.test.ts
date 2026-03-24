import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
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
    expect(rows[0].text()).toContain('Task 1')
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
    // 触发内部具体的交互容器
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

    // 查找并模拟点击切换模式按钮
    const weekButton = wrapper.findAll('.yh-radio-button').find((b) => b.text().includes('周'))
    if (weekButton) {
      await weekButton.find('input').trigger('change')
      // 检查是否触发了 update:viewMode
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

    const input = wrapper.find('input[placeholder="搜索任务..."]')
    await input.setValue('Task 1')

    // 检查渲染的任务行数量（搜索后只剩一个）
    const rows = wrapper.findAll('.yh-gantt-chart__row')
    expect(rows.length).toBe(1)
    expect(rows[0].text()).toContain('Task 1')
  })
})
