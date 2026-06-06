import { describe, it, expect } from 'vitest'
import Title from '../src/title.vue'
import Text from '../src/text.vue'
import Paragraph from '../src/paragraph.vue'
import Link from '../src/link.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhTypography SSR', () => {
  it('Title should render h2 in SSR', async () => {
    const html = await renderSSR(Title, { level: 2 }, { default: () => 'SSR Title' })
    expect(html).toContain('<h2')
    expect(html).toContain('SSR Title')
    expectSSRHasClass(html, 'yh-typography__title')
  })

  it('Text should render span in SSR', async () => {
    const html = await renderSSR(Text, { type: 'success' }, { default: () => 'SSR Text' })
    expect(html).toContain('SSR Text')
    expectSSRHasClass(html, 'yh-typography__text--success')
  })

  it('Paragraph should render p in SSR', async () => {
    const html = await renderSSR(Paragraph, { align: 'center' }, { default: () => 'SSR Paragraph' })
    expect(html).toContain('<p')
    expect(html).toContain('SSR Paragraph')
    expectSSRHasClass(html, 'yh-typography__paragraph--center')
  })

  it('Link should render a in SSR', async () => {
    const html = await renderSSR(
      Link,
      { href: 'https://example.com', target: '_blank' },
      { default: () => 'Link' }
    )
    expect(html).toContain('<a')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('target="_blank"')
  })

  it('Title should hydrate without mismatch', async () => {
    const result = await testHydration(Title, { level: 3 }, { default: () => 'Hydrate Title' })
    expect(result.isMatch).toBe(true)
  })

  it('Text should hydrate without mismatch', async () => {
    const result = await testHydration(
      Text,
      { type: 'danger', bold: true },
      { default: () => 'Hydrate Text' }
    )
    expect(result.isMatch).toBe(true)
  })

  it('Paragraph should hydrate without mismatch', async () => {
    const result = await testHydration(
      Paragraph,
      { spacing: 'compact' },
      { default: () => 'Hydrate Paragraph' }
    )
    expect(result.isMatch).toBe(true)
  })

  it('Link should hydrate without mismatch', async () => {
    const result = await testHydration(
      Link,
      { href: '#', underline: true },
      { default: () => 'Hydrate Link' }
    )
    expect(result.isMatch).toBe(true)
  })
})
