import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, inject } from 'vue'
import { YhConfigProvider, configProviderContextKey } from '../index'
import { YhButton } from '../../button'

const ChildComponent = defineComponent({
  setup() {
    const config = inject(configProviderContextKey)
    return { config }
  },
  template: '<div>{{ config?.size }}</div>'
})

describe('ConfigProvider', () => {
  it('应该能正确提供配置', () => {
    const wrapper = mount(YhConfigProvider, {
      props: {
        size: 'small'
      },
      slots: {
        default: ChildComponent
      }
    })
    expect(wrapper.text()).toBe('small')
  })

  it('应该能触发主题更新', async () => {
    // 检查主题是否应用
    const root = document.documentElement
    const wrapper = mount(YhConfigProvider, {
      props: {
        theme: 'orange'
      },
      slots: {
        default: '<div class="test"></div>'
      }
    })

    // 主题管理器应该已经将主色变量写入 :root
    const primaryColor = root.style.getPropertyValue('--yh-color-primary')
    expect(primaryColor).toBeTruthy()
    expect(primaryColor.length).toBeGreaterThan(0)
  })

  it('多层嵌套时应遵循最近原则 (Vue Provide/Inject 原生支持)', () => {
    const DeepChild = defineComponent({
      setup() {
        const config = inject(configProviderContextKey)
        return { config }
      },
      template: '<span class="size">{{ config?.size }}</span>'
    })

    const wrapper = mount(YhConfigProvider, {
      props: { size: 'large' },
      slots: {
        default: defineComponent({
          setup() {
            return {}
          },
          template: `
            <yh-config-provider size="small">
              <deep-child />
            </yh-config-provider>
          `,
          components: { 'yh-config-provider': YhConfigProvider, 'deep-child': DeepChild }
        })
      }
    })

    expect(wrapper.find('.size').text()).toBe('small')
  })
})
