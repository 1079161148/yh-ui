/**
 * Empty Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import Empty from '../src/empty.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhEmpty SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Empty, {
      description: '暂无数据'
    })

    expectSSRHasClass(html, 'yh-empty')
    expect(html).toContain('暂无数据')
  })

  it('should render default SVG illustration in SSR', async () => {
    const html = await renderSSR(Empty)

    expectSSRHasClass(html, 'yh-empty__svg')
    expect(html).toContain('<svg')
    expect(html).toContain('viewBox')
  })

  it('should render custom image in SSR', async () => {
    const html = await renderSSR(Empty, {
      image: 'https://example.com/empty.png',
      description: 'No Data'
    })

    expect(html).toContain('src="https://example.com/empty.png"')
    expect(html).toContain('alt="No Data"')
  })

  it('should render custom image size in SSR', async () => {
    const html = await renderSSR(Empty, {
      imageSize: 200
    })

    expect(html).toMatch(/width:\s*200px/)
    expect(html).toMatch(/height:\s*200px/)
  })

  it('should render default image size (100) in SSR', async () => {
    const html = await renderSSR(Empty)

    expect(html).toMatch(/width:\s*100px/)
    expect(html).toMatch(/height:\s*100px/)
  })

  it('should render description in SSR', async () => {
    const html = await renderSSR(Empty, {
      description: 'No results found'
    })

    expectSSRHasClass(html, 'yh-empty__description')
    expect(html).toContain('No results found')
  })

  it('should render default slot (bottom content) in SSR', async () => {
    const html = await renderSSR(
      Empty,
      {
        description: 'Empty'
      },
      {
        default: () => h('button', { class: 'action-btn' }, 'Refresh')
      }
    )

    expectSSRHasClass(html, 'yh-empty__bottom')
    expect(html).toContain('Refresh')
  })

  it('should not render bottom when no default slot in SSR', async () => {
    const html = await renderSSR(Empty, {
      description: 'Empty'
    })

    expect(html).not.toContain('yh-empty__bottom')
  })

  it('should have role=status in SSR', async () => {
    const html = await renderSSR(Empty)
    expect(html).toContain('role="status"')
  })

  it('should have aria-label=empty in SSR', async () => {
    const html = await renderSSR(Empty)
    expect(html).toContain('aria-label="empty"')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Empty, {
      description: '暂无数据'
    })
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with custom image without mismatch', async () => {
    const result = await testHydration(Empty, {
      image: 'https://example.com/empty.png',
      description: 'No Data',
      imageSize: 150
    })
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with bottom slot without mismatch', async () => {
    const result = await testHydration(
      Empty,
      {
        description: '暂无数据'
      },
      {
        default: () => h('button', 'Action')
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
