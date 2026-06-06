/**
 * GanttChart Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import GanttChart from '../src/gantt-chart.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhGanttChart SSR', () => {
  const data = [
    {
      id: '1',
      name: 'Launch Project',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      progress: 100,
      status: 'success'
    },
    {
      id: '2',
      name: 'Secondary Task',
      startDate: '2024-03-06',
      endDate: '2024-03-10',
      dependencies: ['1']
    }
  ]

  const columns = [
    { prop: 'name', label: 'Task Name', width: 200 },
    { prop: 'startDate', label: 'Start Date', width: 140 }
  ]

  it('should render correctly in SSR', async () => {
    const html = await renderSSR(GanttChart, {
      data,
      columns
    })

    expectSSRHasClass(html, 'yh-gantt-chart')
    expectSSRHasClass(html, 'yh-gantt-chart__sidebar')
    expectSSRHasClass(html, 'yh-gantt-chart__timeline')
    expect(html).toContain('Launch Project')
    expect(html).toContain('Task Name')
    expect(html).toContain('yh-gantt-chart__dependency-svg')
  })

  it('should render different view modes in SSR', async () => {
    const modes = ['day', 'week', 'month', 'year'] as const
    for (const mode of modes) {
      const html = await renderSSR(GanttChart, {
        data,
        viewMode: mode
      })
      expect(html).toBeTruthy()
      expect(html).toContain('yh-gantt-chart')
    }
  })

  it('should support virtual scrolling in SSR', async () => {
    const html = await renderSSR(GanttChart, {
      data,
      virtual: true,
      rowHeight: 50
    })
    expect(html).toContain('yh-gantt-chart')
    expect(html).toContain('Launch Project')
  })

  it('should render custom slots in SSR', async () => {
    const html = await renderSSR(
      GanttChart,
      {
        data
      },
      {
        'task-content': ({ task }: any) => h('span', `Custom-${task.name}`)
      }
    )
    expect(html).toContain('Custom-Secondary Task')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(GanttChart, {
      data,
      columns,
      virtual: true,
      showDependencies: true
    })

    if (!result.isMatch) {
      console.log('--- SSR HTML ---')
      console.log(result.ssrHtml.substring(0, 1000))
      console.log('--- CSR HTML ---')
      console.log(result.csrHtml.substring(0, 1000))

      // 找到第一个不同点的位置
      for (let i = 0; i < Math.min(result.ssrHtml.length, result.csrHtml.length); i++) {
        if (result.ssrHtml[i] !== result.csrHtml[i]) {
          console.log(
            `Mismatch at index ${i}: SSR="${result.ssrHtml.substring(i, i + 50)}", CSR="${result.csrHtml.substring(i, i + 50)}"`
          )
          break
        }
      }
    }

    expect(result.isMatch).toBe(true)
  })
})
