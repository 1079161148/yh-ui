/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import YhImage from '../src/image.vue'
import YhImageViewer from '../src/image-viewer.vue'

// Mock viewerjs for SSR environment
vi.mock('viewerjs', () => {
  return {
    default: class Viewer {
      destroy() {}
      show() {}
    }
  }
})

describe('SSR for YhImage', () => {
  it('should render correct markup in SSR', async () => {
    const app = createSSRApp(YhImage, {
      src: 'https://foo.com/bar.jpg',
      alt: 'test-alt',
      fit: 'cover',
      loading: 'lazy'
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-image')
  })

  it('renders placeholder slot on server', async () => {
    const app = createSSRApp({
      render() {
        return h(
          YhImage,
          { src: 'foo.jpg' },
          {
            placeholder: () => h('div', 'SSR Placeholder')
          }
        )
      }
    })
    const html = await renderToString(app)
    expect(html).toContain('SSR Placeholder')
  })

  it('handles styles properly', async () => {
    const app = createSSRApp(YhImage, {
      src: 'foo.jpg',
      style: { color: 'red' }
    })
    const html = await renderToString(app)
    // Use regex to match style attribute flexibly (different SSR engines might format differently)
    expect(html).toMatch(/color:\s*red/)
  })
})

describe('SSR for YhImageViewer', () => {
  it('should render without crashing', async () => {
    const app = createSSRApp(YhImageViewer, {
      urlList: ['https://foo.com/bar.jpg'],
      teleported: false // Disable teleport for easier server string checking or to avoid body lookup issues
    })
    const html = await renderToString(app)
    // Even if teleport is disabled, it should render the mask and content
    // Based on the template: <div :class="ns.b()" ...>
    expect(html).toContain('yh-viewer')
    expect(html).toContain('yh-viewer__mask')
    expect(html).toContain('https://foo.com/bar.jpg')
  })

  it('should handle multiple images', async () => {
    const app = createSSRApp(YhImageViewer, {
      urlList: ['img1.jpg', 'img2.jpg'],
      teleported: false
    })
    const html = await renderToString(app)
    // Check for arrows
    expect(html).toContain('yh-viewer__prev')
    expect(html).toContain('yh-viewer__next')
  })
})
