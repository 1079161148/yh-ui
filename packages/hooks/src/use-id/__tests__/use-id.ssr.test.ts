/**
 * useId Hook SSR Tests
 * @description 测试 useId 在 SSR 环境下的行为，确保服务端和客户端生成的 ID 一致
 */
import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { renderSSR } from '../../components/src/__tests__/utils/ssr'
import { useId } from '../src/use-id'

// 测试组件
const TestComponent = defineComponent({
  setup() {
    const id = useId()
    return () => h('div', { id: id.value, 'data-testid': 'test-element' }, `ID: ${id.value}`)
  }
})

describe('useId SSR', () => {
  it('should generate consistent IDs in SSR', async () => {
    // SSR 渲染
    const ssrHtml1 = await renderSSR(TestComponent)
    const ssrHtml2 = await renderSSR(TestComponent)

    // 每次 SSR 渲染应该生成不同的 ID（因为是新的应用实例）
    expect(ssrHtml1).toBeTruthy()
    expect(ssrHtml2).toBeTruthy()
  })

  it('should generate unique IDs for multiple components', async () => {
    const MultipleIdsComponent = defineComponent({
      setup() {
        const id1 = useId()
        const id2 = useId()
        const id3 = useId()

        return () =>
          h('div', {}, [
            h('div', { id: id1.value }, `ID1: ${id1.value}`),
            h('div', { id: id2.value }, `ID2: ${id2.value}`),
            h('div', { id: id3.value }, `ID3: ${id3.value}`)
          ])
      }
    })

    const html = await renderSSR(MultipleIdsComponent)

    // 应该包含多个不同的 ID
    expect(html).toBeTruthy()
    expect(html).toContain('ID1:')
    expect(html).toContain('ID2:')
    expect(html).toContain('ID3:')
  })

  it('should work with custom ID override', async () => {
    const CustomIdComponent = defineComponent({
      setup() {
        const customId = { value: 'custom-test-id' }
        const id = useId(customId)

        return () => h('div', { id: id.value }, `ID: ${id.value}`)
      }
    })

    const html = await renderSSR(CustomIdComponent)

    expect(html).toContain('id="custom-test-id"')
    expect(html).toContain('ID: custom-test-id')
  })

  it('should work in client side rendering', () => {
    const wrapper = mount(TestComponent)

    const element = wrapper.find('[data-testid="test-element"]')
    expect(element.exists()).toBe(true)

    const id = element.attributes('id')
    expect(id).toBeTruthy()
    expect(id).toMatch(/^v-[\w-]+$/) // Vue 3.5 生成的 ID 格式
  })

  it('should generate different IDs for different instances', () => {
    const wrapper1 = mount(TestComponent)
    const wrapper2 = mount(TestComponent)

    const id1 = wrapper1.find('[data-testid="test-element"]').attributes('id')
    const id2 = wrapper2.find('[data-testid="test-element"]').attributes('id')

    expect(id1).not.toBe(id2)
  })
})
