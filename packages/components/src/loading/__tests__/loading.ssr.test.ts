import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { vYhLoading } from '../index'
import { renderSSR, testHydration } from '../../__tests__/utils/ssr'

describe('Loading SSR', () => {
  it('should render correctly in SSR', async () => {
    const Comp = defineComponent({
      directives: { YhLoading: vYhLoading },
      setup() {
        return () => h('div', { 'v-yh-loading': true }, 'Content')
      }
    })

    const html = await renderSSR(Comp)
    // Directives without getSSRProps don't render anything in SSR
    expect(html).toContain('Content')
    expect(html).not.toContain('yh-loading-mask')
  })

  it('should hydrate without mismatch', async () => {
    const Comp = defineComponent({
      directives: { YhLoading: vYhLoading },
      setup() {
        return () => h('div', { 'v-yh-loading': true }, 'Content')
      }
    })

    // This will test if the client-side mounting (which creates the loading mask)
    // mismatches with the SSR output.
    // Vue 3 directives that manipulate DOM in mounted() usually don't cause hydration mismatches
    // because they run after the initial hydration of the stationary HTML.
    const result = await testHydration(Comp)
    expect(result.isMatch).toBe(true)
  })
})
