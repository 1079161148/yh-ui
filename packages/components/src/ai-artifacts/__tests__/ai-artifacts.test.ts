/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

const { highlightMock, highlightAutoMock } = vi.hoisted(() => ({
  highlightMock: vi.fn((code: string) => ({ value: `<span>${code}</span>` })),
  highlightAutoMock: vi.fn((code: string) => ({ value: `<span>${code}</span>` }))
}))

// Mock highlight.js
vi.mock('highlight.js', () => ({
  default: {
    getLanguage: (lang: string) => lang === 'xml' || lang === 'typescript',
    highlight: highlightMock,
    highlightAuto: highlightAutoMock
  }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

// Mock Blob and URL
if (typeof window !== 'undefined') {
  global.URL.createObjectURL = vi.fn(() => 'blob:test-url')
  global.URL.revokeObjectURL = vi.fn()
}

// Import component
import AiArtifacts from '../src/ai-artifacts.vue'
import hljs from '../../highlight'

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

  it('should use config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(AiArtifacts, {
            visible: true,
            data: { ...mockData, type: 'chart' }
          })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('Preview')
    expect(wrapper.text()).toContain('Rendering chart...')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: mockData,
        themeOverrides: {
          'bg-color': '#ffffff'
        }
      }
    })

    expect(wrapper.find('.yh-ai-artifacts').attributes('style')).toContain(
      '--yh-ai-artifacts-bg-color: #ffffff'
    )
  })

  it('should sanitize highlighted code output before rendering it', () => {
    vi.spyOn(hljs, 'highlight').mockReturnValueOnce({
      value:
        '<img src=x onerror="alert(1)"><span class="token">safe</span><script>alert(1)</script>'
    })

    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        mode: 'code',
        data: {
          ...mockData,
          type: 'typescript',
          versions: [{ version: 1, content: 'const safe = true', description: 'Initial' }]
        }
      }
    })

    const html = wrapper.find('.yh-ai-artifacts__code-viewer code').html()
    expect(html).toContain('token')
    expect(html).not.toContain('<script')
    expect(html).not.toContain('onerror=')
  })

  it('should revoke object URL when version/visibility changes, and on unmount', async () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL')
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL')

    const wrapper = mount(AiArtifacts, {
      props: {
        visible: true,
        data: mockData,
        mode: 'preview'
      }
    })

    await nextTick()
    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(revokeSpy).toHaveBeenCalledTimes(0)

    // Trigger update of version
    await wrapper.setProps({
      data: {
        ...mockData,
        currentVersion: 2
      }
    })
    await nextTick()

    // Old URL should be revoked, new URL created
    expect(revokeSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledTimes(2)

    // Unmount while visible
    wrapper.unmount()
    expect(revokeSpy).toHaveBeenCalledTimes(2)
  })
})
