/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

// Mock monaco-editor and workers
vi.mock('monaco-editor', () => ({
  editor: {
    create: vi.fn(),
    setModelLanguage: vi.fn(),
    setTheme: vi.fn()
  }
}))

vi.mock('monaco-editor/esm/vs/editor/editor.worker?worker', () => ({ default: class {} }))
vi.mock('monaco-editor/esm/vs/language/json/json.worker?worker', () => ({ default: class {} }))
vi.mock('monaco-editor/esm/vs/language/css/css.worker?worker', () => ({ default: class {} }))
vi.mock('monaco-editor/esm/vs/language/html/html.worker?worker', () => ({ default: class {} }))
vi.mock('monaco-editor/esm/vs/language/typescript/ts.worker?worker', () => ({ default: class {} }))

// Mock theme hook for SSR
vi.mock('@yh-ui/theme', () => ({
  useComponentTheme: () => ({
    themeStyle: {}
  })
}))

const { default: AiCodeEditor } = await import('../src/ai-code-editor.vue')

describe('YhAiCodeEditor SSR', () => {
  it('should render container on server', async () => {
    const html = await renderToString(
      h(AiCodeEditor, {
        modelValue: 'const a = 1;',
        height: 400
      })
    )
    expect(html).toContain('yh-ai-code-editor')
    expect(html).toContain('yh-ai-code-editor__container')
    expect(html).toContain('height:400px')
  })
})
