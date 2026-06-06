/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h, defineComponent, inject } from 'vue'
import AiProvider from '../src/ai-provider.vue'
import { AI_PROVIDER_KEY } from '../src/ai-provider'

describe('YhAiProvider SSR', () => {
  it('should render to string and provide context on server', async () => {
    const Child = defineComponent({
      setup() {
        const config: any = inject(AI_PROVIDER_KEY)
        return () => h('div', { id: 'provider-test' }, config?.userName)
      }
    })

    const html = await renderToString(
      h(
        AiProvider,
        { userName: 'SSR Provider User' },
        {
          default: () => h(Child)
        }
      )
    )
    expect(html).toContain('id="provider-test"')
    expect(html).toContain('SSR Provider User')
  })

  it('should render slot content on server', async () => {
    const html = await renderToString(
      h(AiProvider, null, {
        default: () => h('div', 'SSR Provider Content')
      })
    )
    expect(html).toContain('SSR Provider Content')
  })
})
