/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

// Mock highlight.js
vi.mock('highlight.js', () => ({
  default: {
    getLanguage: (lang: string) => lang === 'xml' || lang === 'typescript',
    highlight: (code: string) => ({ value: `<span>${code}</span>` }),
    highlightAuto: (code: string) => ({ value: `<span>${code}</span>` })
  }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

// Mock Blob and URL
if (typeof window !== 'undefined') {
  global.URL.createObjectURL = vi.fn(() => 'blob:test-url')
}

// Import component
import AiArtifacts from '../src/ai-artifacts.vue'

const mockData = {
  id: 'a1',
  title: 'Test Artifact',
  type: 'html' as const,
  currentVersion: 1,
  versions: [
    { version: 1, content: '<h1>Ver 1</h1>', description: 'Initial' },
    { version: 2, content: '<h1>Ver 2</h1>', description: 'Updated' }
  ]
}

describe('YhAiArtifacts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when visible is true', () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: mockData
      }
    })
    expect(wrapper.find('.yh-ai-artifacts').exists()).toBe(true)
    expect(wrapper.find('.yh-ai-artifacts__title').text()).toBe('Test Artifact')
  })

  it('should not render when visible is false', () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: false,
        data: mockData
      }
    })
    expect(wrapper.find('.yh-ai-artifacts').exists()).toBe(false)
  })

  it('should apply custom width', () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: mockData,
        width: 800
      }
    })
    const root = wrapper.find('.yh-ai-artifacts')
    expect((root.element as HTMLElement).style.width).toBe('800px')
  })

  it('should toggle between preview and code mode', async () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: mockData,
        mode: 'preview'
      }
    })

    // Initially in preview mode
    expect(wrapper.find('.yh-ai-artifacts__sandbox').exists()).toBe(true)

    // Click code tab
    const tabs = wrapper.findAll('.yh-ai-artifacts__tab')
    await tabs[2].trigger('click')

    expect(wrapper.emitted('update:mode')?.[0]).toEqual(['code'])

    // In code mode, sandbox should be gone and code viewer shown
    await wrapper.setProps({ mode: 'code' })
    expect(wrapper.find('.yh-ai-artifacts__sandbox').exists()).toBe(false)
    expect(wrapper.find('.yh-ai-artifacts__code-viewer').exists()).toBe(true)
  })

  it('should handle version selection', async () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: mockData
      }
    })

    const versionItems = wrapper.findAll('.yh-ai-artifacts__version-item')
    expect(versionItems).toHaveLength(2)

    await versionItems[1].trigger('click')
    expect(wrapper.emitted('version-change')?.[0]).toEqual([mockData.versions[1]])
  })

  it('should emit close events', async () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: mockData
      }
    })

    const closeBtn = wrapper.find('.yh-button')
    await closeBtn.trigger('click')

    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should render icon based on type', async () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: { ...mockData, type: 'code' }
      }
    })

    // Check for code icon name (using internal knowledge of YhIcon name prop)
    const icon = wrapper.findComponent({ name: 'YhIcon' })
    expect(icon.props('name')).toBe('code')
  })
})
