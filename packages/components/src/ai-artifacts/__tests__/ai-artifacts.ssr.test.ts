/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

// Mock highlight.js
vi.mock('highlight.js', () => ({
  default: {
    getLanguage: () => true,
    highlight: () => ({ value: '<code></code>' }),
    highlightAuto: () => ({ value: '<code></code>' })
  }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

// Import component
import AiArtifacts from '../src/ai-artifacts.vue'

const mockData = {
  id: 'a1',
  title: 'SSR Artifact',
  type: 'html' as const,
  currentVersion: 1,
  versions: [{ version: 1, content: '<h1>SSR Ver 1</h1>' }]
}

describe('YhAiArtifacts SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(
      h(AiArtifacts, {
        visible: true,
        data: mockData
      })
    )
    expect(html).toContain('yh-ai-artifacts')
    expect(html).toContain('SSR Artifact')
  })

  it('should render correct mode on server', async () => {
    const html = await renderToString(
      h(AiArtifacts, {
        visible: true,
        data: mockData,
        mode: 'code'
      })
    )
    expect(html).toContain('yh-ai-artifacts__code-viewer')
  })

  it('should render version bar when multiple versions exist', async () => {
    const multiVersionData = {
      ...mockData,
      versions: [
        { version: 1, content: 'v1' },
        { version: 2, content: 'v2' }
      ]
    }
    const html = await renderToString(
      h(AiArtifacts, {
        visible: true,
        data: multiVersionData
      })
    )
    expect(html).toContain('yh-ai-artifacts__version-bar')
    expect(html).toContain('v1')
    expect(html).toContain('v2')
  })

  it('should not render when visible is false on server', async () => {
    const html = await renderToString(
      h(AiArtifacts, {
        visible: false,
        data: mockData
      })
    )
    expect(html).not.toContain('yh-ai-artifacts')
  })
})
