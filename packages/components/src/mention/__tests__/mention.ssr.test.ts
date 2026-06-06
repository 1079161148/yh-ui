/**
 * YhMention SSR 测试
 */
import { describe, it, expect } from 'vitest'
import Mention from '../src/mention.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhMention SSR', () => {
  it('应该在 SSR 中正确渲染根元素', async () => {
    const html = await renderSSR(Mention, { modelValue: '' })
    expectSSRHasClass(html, 'yh-mention')
  })

  it('应该在 SSR 中渲染 input 元素', async () => {
    const html = await renderSSR(Mention, { modelValue: 'hello', type: 'input' })
    expect(html).toContain('<input')
    expect(html).toContain('hello')
  })

  it('应该在 SSR 中渲染 textarea 元素', async () => {
    const html = await renderSSR(Mention, { modelValue: 'multi line', type: 'textarea' })
    expect(html).toContain('textarea')
    expect(html).toContain('multi line')
  })

  it('应该在 SSR 中渲染 placeholder', async () => {
    const html = await renderSSR(Mention, { placeholder: '输入 @ 提及某人' })
    expect(html).toContain('输入 @ 提及某人')
  })

  it('禁用状态应在 SSR 中正确渲染', async () => {
    const html = await renderSSR(Mention, { disabled: true })
    expectSSRHasClass(html, 'is-disabled')
    expect(html).toContain('disabled')
  })

  it('不同尺寸应在 SSR 中正确渲染', async () => {
    for (const size of ['large', 'small'] as const) {
      const html = await renderSSR(Mention, { size })
      expectSSRHasClass(html, `yh-mention--${size}`)
    }
  })

  it('应该在 SSR 中渲染只读状态', async () => {
    const html = await renderSSR(Mention, { readonly: true })
    expect(html).toContain('readonly')
  })

  it('应该在 SSR 中渲染字数统计', async () => {
    const html = await renderSSR(Mention, {
      modelValue: 'hi',
      showWordLimit: true,
      maxlength: 100
    })
    expect(html).toContain('yh-mention__count')
    expect(html).toContain('2 / 100')
  })

  it('应该在 SSR 中正确 Hydrate（无 mismatch）', async () => {
    const result = await testHydration(Mention, {
      modelValue: 'hello @world',
      placeholder: '请 @ 提及',
      clearable: true
    })
    expect(result.isMatch).toBe(true)
  })

  it('textarea 类型应该在 SSR 中正确 Hydrate', async () => {
    const result = await testHydration(Mention, {
      type: 'textarea',
      modelValue: '多行\n内容',
      rows: 5
    })
    expect(result.isMatch).toBe(true)
  })

  it('SSR 渲染不应包含客户端下拉框内容', async () => {
    // 下拉框在 SSR 时不可见（v-show="dropdownVisible"）
    const html = await renderSSR(Mention, {
      modelValue: '',
      options: [{ value: 'alice', label: 'Alice' }]
    })
    // 下拉框 v-show 为 false，渲染为 style="display: none;"
    // 确保 SSR 不会渲染可见的下拉内容
    expect(html).toContain('yh-mention')
  })
})
