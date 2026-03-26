/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { createApp, h } from 'vue'
import ImageMagnifier from '../src/image-magnifier.vue'

const renderSSR = async (props: Record<string, unknown>) => {
  const app = createApp({ render: () => h(ImageMagnifier, props) })
  return renderToString(app)
}

describe('ImageMagnifier SSR', () => {
  it('renders basic image correctly', async () => {
    const html = await renderSSR({ src: 'https://test.com/small.jpg' })
    expect(html).toContain('https://test.com/small.jpg')
    expect(html).toContain('yh-image-magnifier')
  })

  it('renders alt attribute in SSR', async () => {
    const html = await renderSSR({ src: 'https://test.com/img.jpg', alt: 'Test Alt' })
    expect(html).toContain('Test Alt')
  })

  it('renders title in SSR', async () => {
    const html = await renderSSR({ src: 'https://test.com/img.jpg', title: 'hover me' })
    expect(html).toContain('hover me')
  })

  it('does not render preview panel in SSR (mouse events not fired)', async () => {
    const html = await renderSSR({ src: 'https://test.com/img.jpg' })
    expect(html).not.toContain('yh-image-magnifier__preview')
  })

  it('renders gallery thumbnails in SSR', async () => {
    const html = await renderSSR({
      src: 'https://test.com/img0.jpg',
      images: [{ src: 'https://test.com/img0.jpg' }, { src: 'https://test.com/img1.jpg' }]
    })
    expect(html).toContain('yh-image-magnifier__gallery')
    expect(html).toContain('https://test.com/img1.jpg')
  })
})
