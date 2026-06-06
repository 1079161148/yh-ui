/**
 * Avatar Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Avatar from '../src/avatar.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhAvatar SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Avatar, {
      shape: 'circle',
      size: 'default'
    })

    expectSSRHasClass(html, 'yh-avatar')
    expectSSRHasClass(html, 'yh-avatar--circle')
  })

  it('should render square shape in SSR', async () => {
    const html = await renderSSR(Avatar, {
      shape: 'square'
    })
    expectSSRHasClass(html, 'yh-avatar--square')
  })

  it('should render with image in SSR', async () => {
    const html = await renderSSR(Avatar, {
      src: 'https://example.com/avatar.png',
      alt: 'User Avatar'
    })

    expect(html).toContain('src="https://example.com/avatar.png"')
    expect(html).toContain('alt="User Avatar"')
    expectSSRHasClass(html, 'yh-avatar__img')
  })

  it('should render with srcSet in SSR', async () => {
    const html = await renderSSR(Avatar, {
      src: 'https://example.com/avatar.png',
      srcSet: 'https://example.com/avatar-2x.png 2x'
    })

    expect(html).toContain('srcset="https://example.com/avatar-2x.png 2x"')
  })

  it('should render custom size in SSR', async () => {
    const html = await renderSSR(Avatar, {
      size: 80
    })

    expect(html).toMatch(/width:\s*80px/)
    expect(html).toMatch(/height:\s*80px/)
  })

  it('should render preset size in SSR', async () => {
    const html = await renderSSR(Avatar, {
      size: 'large'
    })

    expectSSRHasClass(html, 'yh-avatar--large')
  })

  it('should render with fit in SSR', async () => {
    const html = await renderSSR(Avatar, {
      src: 'https://example.com/avatar.png',
      fit: 'contain'
    })

    expect(html).toMatch(/object-fit:\s*contain/)
  })

  it('should render text content in SSR', async () => {
    const html = await renderSSR(
      Avatar,
      {},
      {
        default: () => 'YH'
      }
    )

    expect(html).toContain('YH')
  })

  it('should render custom background color in SSR', async () => {
    const html = await renderSSR(Avatar, {
      backgroundColor: '#F56C6C'
    })

    expect(html).toContain('background-color')
  })

  it('should have role=img in SSR', async () => {
    const html = await renderSSR(Avatar)
    expect(html).toContain('role="img"')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Avatar, {
      shape: 'circle',
      size: 'default'
    })
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with image without mismatch', async () => {
    const result = await testHydration(Avatar, {
      src: 'https://example.com/avatar.png',
      alt: 'Avatar'
    })
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with custom size without mismatch', async () => {
    const result = await testHydration(Avatar, {
      size: 60,
      shape: 'square'
    })
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate text content without mismatch', async () => {
    const result = await testHydration(
      Avatar,
      {
        size: 'large'
      },
      {
        default: () => 'AB'
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
