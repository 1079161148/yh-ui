/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import Alert from '../src/alert.vue'

describe('YhAlert SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(
      h(Alert, {
        title: 'SSR Alert',
        type: 'error',
        showIcon: true
      })
    )
    expect(html).toContain('yh-alert')
    expect(html).toContain('yh-alert--error')
    expect(html).toContain('SSR Alert')
    expect(html).toContain('yh-alert__icon')
  })

  it('should render description as well', async () => {
    const html = await renderToString(
      h(Alert, {
        title: 'Title',
        description: 'Detail message'
      })
    )
    expect(html).toContain('yh-alert__description')
    expect(html).toContain('Detail message')
  })
})
