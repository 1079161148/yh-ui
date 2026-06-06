/**
 * Descriptions Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { YhDescriptions, YhDescriptionsItem } from '../index'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhDescriptions SSR', () => {
  it('should render basic descriptions in SSR', async () => {
    const html = await renderSSR(
      YhDescriptions,
      {
        title: 'System Info',
        extra: 'More'
      },
      {
        default: () => [
          h(YhDescriptionsItem, { label: 'OS' }, () => 'Linux'),
          h(YhDescriptionsItem, { label: 'Status' }, () => 'Active')
        ]
      }
    )

    expectSSRHasClass(html, 'yh-descriptions')
    expect(html).toContain('System Info')
    expect(html).toContain('More')
    expect(html).toContain('OS')
    expect(html).toContain('Linux')
    expect(html).toContain('Status')
    expect(html).toContain('Active')
  })

  it('should render bordered mode in SSR', async () => {
    const html = await renderSSR(YhDescriptions, {
      border: true
    })
    expectSSRHasClass(html, 'is-bordered')
  })

  it('should render vertical direction in SSR', async () => {
    const html = await renderSSR(
      YhDescriptions,
      {
        direction: 'vertical'
      },
      {
        default: () => h(YhDescriptionsItem, { label: 'L1' }, () => 'C1')
      }
    )
    // 根据描述列表组件实现，垂直布局时单元格会带有 is-vertical 类名
    expect(html).toContain('is-vertical')
  })

  it('should render correct colspan in SSR', async () => {
    const html = await renderSSR(
      YhDescriptions,
      { column: 2 },
      {
        default: () => h(YhDescriptionsItem, { label: 'L1', span: 2 }, () => 'C1')
      }
    )
    // 1 label + 1 content(span 2) in column 2 => colspan = 2*2 - 1 = 3
    expect(html).toContain('colspan="3"')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      YhDescriptions,
      {
        title: 'Hydration Test'
      },
      {
        default: () => [
          h(YhDescriptionsItem, { label: 'L1' }, () => 'C1'),
          h(YhDescriptionsItem, { label: 'L2' }, () => 'C2')
        ]
      }
    )
    expect(result.ssrHtml).toBe(result.csrHtml)
    expect(result.isMatch).toBe(true)
  })
})
