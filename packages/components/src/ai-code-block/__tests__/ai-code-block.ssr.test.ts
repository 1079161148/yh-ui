/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

vi.mock('highlight.js', () => ({
  default: {
    getLanguage: (lang: string) => lang === 'typescript',
    highlight: vi.fn(() => ({ value: 'highlighted' })),
    highlightAuto: vi.fn(() => ({ value: 'auto' }))
  }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

const { default: AiCodeBlock } = await import('../src/ai-code-block.vue')

describe('YhAiCodeBlock SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(
      h(AiCodeBlock, { code: 'const x = 1', language: 'typescript' })
    )
    expect(html).toContain('yh-ai-code-block')
  })

  it('should render filename in header on server', async () => {
    const html = await renderToString(h(AiCodeBlock, { code: 'const x = 1', filename: 'utils.ts' }))
    expect(html).toContain('utils.ts')
    expect(html).toContain('yh-ai-code-block__lang')
  })

  it('should render language in header when no filename on server', async () => {
    const html = await renderToString(
      h(AiCodeBlock, { code: 'const x = 1', language: 'typescript' })
    )
    expect(html).toContain('typescript')
  })

  it('should render language class in code element on server', async () => {
    const html = await renderToString(
      h(AiCodeBlock, { code: 'const x = 1', language: 'typescript' })
    )
    expect(html).toContain('language-typescript')
  })

  it('should render code body on server', async () => {
    const html = await renderToString(
      h(AiCodeBlock, { code: 'sample code', language: 'text', highlight: false })
    )
    expect(html).toContain('sample code')
    expect(html).toContain('yh-ai-code-block__body')
  })

  it('should render copy button on server', async () => {
    const html = await renderToString(h(AiCodeBlock, { code: 'code' }))
    expect(html).toContain('yh-ai-code-block__actions')
  })
})
