/**
 * ConfigProvider Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import ConfigProvider from '../src/config-provider'
import { renderSSR, testHydration } from '../../__tests__/utils/ssr'
import Button from '../../button/src/button.vue'
import { h } from 'vue'

describe('YhConfigProvider SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      ConfigProvider,
      {
        size: 'large',
        zIndex: 3000
      },
      {
        default: () => h(Button, { type: 'primary' }, { default: () => 'SSR Button' })
      }
    )

    expect(html).toContain('yh-button')
    expect(html).toContain('yh-button--large')
    expect(html).toContain('SSR Button')
  })

  it('should inject CSS variables in SSR if global is true', async () => {
    const html = await renderSSR(ConfigProvider, {
      theme: '#ff0000',
      global: true
    })
    // In SSR, variables are usually injected via style tags or inline styles if handled by the component
    // ConfigProvider uses a style tag or div wrapper for theme variables
    expect(html).toContain('--yh-color-primary: #ff0000')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      ConfigProvider,
      {
        size: 'small',
        theme: 'purple'
      },
      {
        default: () => h(Button, {}, { default: () => 'Hydrated Button' })
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
