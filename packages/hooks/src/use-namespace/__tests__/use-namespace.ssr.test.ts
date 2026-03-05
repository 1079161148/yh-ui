import { describe, it, expect } from 'vitest'
import { defineComponent, h, provide, ref } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useNamespace, namespaceContextKey } from '../index'

describe('useNamespace SSR', () => {
  it('should generate consistent BEM classes in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const ns = useNamespace('button')
        return () =>
          h(
            'button',
            {
              class: [ns.b(), ns.m('primary'), ns.is('disabled')]
            },
            'Button'
          )
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('yh-button')
    expect(html).toContain('yh-button--primary')
    expect(html).toContain('is-disabled')
  })

  it('should support custom namespace from context in SSR', async () => {
    const ChildComponent = defineComponent({
      setup() {
        const ns = useNamespace('card')
        return () => h('div', { class: ns.b() }, 'Card')
      }
    })

    const App = defineComponent({
      setup() {
        provide(namespaceContextKey, ref('custom'))
        return () => h(ChildComponent)
      }
    })

    const html = await renderSSR(App)
    expect(html).toContain('custom-card')
  })

  it('should correctly handle state labels in SSR', async () => {
    const StateComponent = defineComponent({
      setup() {
        const ns = useNamespace('test')
        return () =>
          h('div', {
            class: [ns.is('active', true), ns.is('visible', false), ns.is('loading')]
          })
      }
    })

    const html = await renderSSR(StateComponent)
    expect(html).toContain('is-active')
    expect(html).not.toContain('is-visible')
    expect(html).toContain('is-loading')
  })
})
