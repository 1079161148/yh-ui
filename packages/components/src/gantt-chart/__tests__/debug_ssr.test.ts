import { describe, it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { mount } from '@vue/test-utils'
import GanttChart from '../src/gantt-chart.vue'
import { normalizeHtml } from '../../__tests__/utils/ssr'

describe('DEBUG SSR', () => {
  it('shows diff', async () => {
    const data = [{ id: '1', name: 'Task 1', startDate: '2024-03-01', endDate: '2024-03-05' }]
    const props = { data, virtual: true, showDependencies: true }

    // SSR
    const app = createSSRApp({
      render() {
        return h(GanttChart, props)
      }
    })
    const ssrHtml = await renderToString(app)
    const ssrNorm = normalizeHtml(ssrHtml)

    // CSR
    const wrapper = mount(GanttChart, { props })
    const csrHtml = wrapper.html()
    const csrNorm = normalizeHtml(csrHtml)

    if (ssrNorm !== csrNorm) {
      console.log('--- SSR ---')
      console.log(ssrNorm)
      console.log('--- CSR ---')
      console.log(csrNorm)
      for (let i = 0; i < Math.max(ssrNorm.length, csrNorm.length); i++) {
        if (ssrNorm[i] !== csrNorm[i]) {
          console.log(`DIFF AT ${i}:`)
          console.log(`SSR substring: ${ssrNorm.substring(i, i + 50)}`)
          console.log(`CSR substring: ${csrNorm.substring(i, i + 50)}`)
          break
        }
      }
    }
    expect(ssrNorm).toBe(csrNorm)
  })
})
