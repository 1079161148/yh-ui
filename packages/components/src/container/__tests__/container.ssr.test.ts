import { describe, it, expect } from 'vitest'
import Container from '../src/container.vue'
import Header from '../src/header.vue'
import Aside from '../src/aside.vue'
import Main from '../src/main.vue'
import Footer from '../src/footer.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhContainer SSR', () => {
  it('Container should render section in SSR', async () => {
    const html = await renderSSR(Container, {}, { default: () => 'Content' })
    expect(html).toContain('<section')
    expectSSRHasClass(html, 'yh-container')
  })

  it('Header should render with default height in SSR', async () => {
    const html = await renderSSR(Header, {}, { default: () => 'Header' })
    expect(html).toContain('<header')
    expect(html).toMatch(/height:\s*60px/)
  })

  it('Aside should render with default width in SSR', async () => {
    const html = await renderSSR(Aside, {}, { default: () => 'Aside' })
    expect(html).toContain('<aside')
    expect(html).toMatch(/width:\s*200px/)
  })

  it('Main should render in SSR', async () => {
    const html = await renderSSR(Main, {}, { default: () => 'Main Content' })
    expect(html).toContain('<main')
    expect(html).toContain('Main Content')
  })

  it('Footer should render in SSR', async () => {
    const html = await renderSSR(Footer, {}, { default: () => 'Footer' })
    expect(html).toContain('<footer')
    expect(html).toMatch(/height:\s*60px/)
  })

  it('Container should hydrate without mismatch', async () => {
    const result = await testHydration(
      Container,
      { direction: 'vertical' },
      { default: () => 'Hydrate' }
    )
    expect(result.isMatch).toBe(true)
  })

  it('Header should hydrate without mismatch', async () => {
    const result = await testHydration(Header, { height: '80px' }, { default: () => 'Header' })
    expect(result.isMatch).toBe(true)
  })

  it('Footer should hydrate without mismatch', async () => {
    const result = await testHydration(Footer, { height: '100px' }, { default: () => 'Footer' })
    expect(result.isMatch).toBe(true)
  })
})
