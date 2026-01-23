/**
 * useZIndex Hook SSR Tests
 * @description 测试 useZIndex 在 SSR 环境下的行为，确保状态隔离
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { renderSSR } from '../../components/src/__tests__/utils/ssr'
import {
  useZIndex,
  createZIndexCounter,
  zIndexCounterKey,
  getNextZIndex,
  resetZIndex
} from '../src/use-z-index'

// 测试组件
const TestComponent = defineComponent({
  setup() {
    const { currentZIndex, nextZIndex } = useZIndex()

    return () =>
      h('div', { 'data-testid': 'test' }, [
        h('div', { 'data-current': currentZIndex.value }),
        h('div', { 'data-next': nextZIndex() })
      ])
  }
})

// 带 Provider 的组件
const TestComponentWithProvider = defineComponent({
  setup() {
    const counter = createZIndexCounter(3000)
    provide(zIndexCounterKey, counter)

    const { nextZIndex } = useZIndex()

    return () =>
      h('div', {}, [
        h('div', { 'data-z-index-1': nextZIndex() }),
        h('div', { 'data-z-index-2': nextZIndex() }),
        h('div', { 'data-z-index-3': nextZIndex() })
      ])
  }
})

describe('useZIndex SSR', () => {
  beforeEach(() => {
    // 重置全局状态
    if (typeof window !== 'undefined') {
      delete (window as any).__YH_Z_INDEX__
    }
  })

  afterEach(() => {
    resetZIndex()
  })

  it('should work in SSR environment', async () => {
    const html = await renderSSR(TestComponent)

    expect(html).toBeTruthy()
    expect(html).toContain('data-current')
  })

  it('should provide isolated counters in SSR', async () => {
    // 两次独立的 SSR 渲染应该有独立的计数器
    const html1 = await renderSSR(TestComponentWithProvider)
    const html2 = await renderSSR(TestComponentWithProvider)

    expect(html1).toBeTruthy()
    expect(html2).toBeTruthy()

    // 每次渲染都应该从初始值开始计数
    expect(html1).toContain('data-z-index-1="3001"')
    expect(html1).toContain('data-z-index-2="3002"')
    expect(html1).toContain('data-z-index-3="3003"')

    // 第二次渲染也应该从相同的初始值开始
    expect(html2).toContain('data-z-index-1="3001"')
    expect(html2).toContain('data-z-index-2="3002"')
    expect(html2).toContain('data-z-index-3="3003"')
  })

  it('should work with provide/inject pattern', () => {
    const wrapper = mount(TestComponentWithProvider)

    const div1 = wrapper.find('[data-z-index-1]')
    const div2 = wrapper.find('[data-z-index-2]')
    const div3 = wrapper.find('[data-z-index-3]')

    expect(div1.attributes('data-z-index-1')).toBe('3001')
    expect(div2.attributes('data-z-index-2')).toBe('3002')
    expect(div3.attributes('data-z-index-3')).toBe('3003')
  })

  it('should increment z-index correctly in client', () => {
    const wrapper = mount(TestComponent)

    const { nextZIndex } = useZIndex()

    const z1 = nextZIndex()
    const z2 = nextZIndex()
    const z3 = nextZIndex()

    expect(z2).toBe(z1 + 1)
    expect(z3).toBe(z2 + 1)
  })

  it('should use window storage in client environment', () => {
    if (typeof window === 'undefined') {
      return // 跳过非浏览器环境
    }

    // 第一次调用
    const z1 = getNextZIndex()
    expect(typeof z1).toBe('number')

    // 第二次调用应该递增
    const z2 = getNextZIndex()
    expect(z2).toBe(z1 + 1)

    // window 上应该有计数器
    expect((window as any).__YH_Z_INDEX__).toBe(z2)
  })

  it('should reset z-index counter', () => {
    if (typeof window === 'undefined') {
      return
    }

    getNextZIndex()
    getNextZIndex()

    resetZIndex(5000)

    const nextZ = getNextZIndex()
    expect(nextZ).toBe(5001)
  })

  it('should handle custom z-index override', () => {
    const customZIndex = { value: 9999 }
    const { nextZIndex } = useZIndex(customZIndex)

    const z = nextZIndex()
    expect(z).toBe(9999)
  })
})
