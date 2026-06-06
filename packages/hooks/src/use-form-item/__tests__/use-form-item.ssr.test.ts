import { describe, it, expect } from 'vitest'
import { defineComponent, h, provide } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useFormItem, FormContextKey } from '../index'

describe('useFormItem SSR', () => {
  it('should be safe to inject form in SSR', async () => {
    const Child = defineComponent({
      setup() {
        const { form } = useFormItem()
        return () => h('div', `Form size: ${form?.size || 'none'}`)
      }
    })

    const App = defineComponent({
      setup() {
        provide(FormContextKey, { size: 'small' } as any)
        return () => h(Child)
      }
    })

    const html = await renderSSR(App)
    expect(html).toContain('Form size: small')
  })

  it('should handle missing context in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { form, formItem } = useFormItem()
        return () => h('div', `Available: ${!!form}/${!!formItem}`)
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Available: false/false')
  })
})
