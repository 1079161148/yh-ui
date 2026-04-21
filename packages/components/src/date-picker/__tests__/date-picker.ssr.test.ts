/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import DatePicker from '../src/date-picker.vue'

describe('YhDatePicker SSR', () => {
  it('renders the base structure without the panel by default', async () => {
    const app = createSSRApp({
      render: () => h(DatePicker)
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-date-picker')
    expect(html).toContain('input')
    expect(html).not.toContain('yh-date-picker__panel')
  })

  it('renders a formatted initial value on server', async () => {
    const app = createSSRApp(DatePicker, {
      modelValue: '2024-01-01',
      format: 'YYYY-MM-DD'
    })

    const html = await renderToString(app)
    expect(html).toContain('value="2024-01-01"')
  })

  it('renders range placeholders and theme overrides on server', async () => {
    const app = createSSRApp(DatePicker, {
      type: 'daterange',
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date',
      themeOverrides: {
        primary: '#1677ff'
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('Start date')
    expect(html).toContain('End date')
    expect(html).toContain('--yh-date-picker-primary:#1677ff')
  })
})
