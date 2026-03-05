import { describe, it, expect } from 'vitest'
import { defineComponent, h, provide, computed } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useLocale } from '../index'
import { configProviderContextKey } from '../../use-config'
import { en } from '@yh-ui/locale'

describe('useLocale SSR', () => {
  it('should translate correctly in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { t } = useLocale()
        return () => h('div', t('datepicker.now'))
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('此刻') // zh-cn default
  })

  it('should support custom locale in SSR context', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { t } = useLocale()
        return () => h('div', t('datepicker.now'))
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(
          configProviderContextKey,
          computed(() => ({
            locale: en
          }))
        )
        return () => h(TestComponent)
      }
    })

    const html = await renderSSR(Parent)
    expect(html).toContain('Now') // en
  })
})
