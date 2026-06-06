/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

// Mock WebContainer
vi.mock('../src/webcontainer', () => ({
  getWebContainerInstance: vi.fn()
}))

// Mock theme hook for SSR
vi.mock('@yh-ui/theme', () => ({
  useComponentTheme: () => ({
    themeStyle: {}
  })
}))

const { default: AiCodeRunner } = await import('../src/ai-code-runner.vue')

describe('YhAiCodeRunner SSR', () => {
  it('should render toolbar and terminal on server', async () => {
    const html = await renderToString(
      h(AiCodeRunner, {
        code: 'console.log("ssr")',
        height: 300
      })
    )
    expect(html).toContain('yh-ai-code-runner')
    expect(html).toContain('yh-ai-code-runner__toolbar')
    expect(html).toContain('yh-ai-code-runner__terminal')
    expect(html).toContain('height:300px')
  })
})
