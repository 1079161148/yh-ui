import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, inject } from 'vue'
import { YhConfigProvider, configProviderContextKey } from '../index'
import { en } from '@yh-ui/locale'
import { useConfig, useNamespace } from '@yh-ui/hooks'

const ChildComponent = defineComponent({
  setup() {
    const config = inject(configProviderContextKey)
    return { config }
  },
  template: '<div>{{ config?.size }}</div>'
})

const LocaleChildComponent = defineComponent({
  setup() {
    const config = inject(configProviderContextKey)
    return { config }
  },
  template: '<div class="locale-name">{{ config?.locale?.name }}</div>'
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

  it('should scope theme styles when global is false', () => {
    const wrapper = mount(YhConfigProvider, {
      props: {
        theme: '#ff6600',
        global: false
      },
      slots: {
        default: '<div class="test"></div>'
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-color-primary: #ff6600')
  })

  it('should provide locale through injection', () => {
    const wrapper = mount(YhConfigProvider, {
      props: {
        locale: en
      },
      slots: {
        default: LocaleChildComponent
      }
    })

    expect(wrapper.find('.locale-name').text()).toBe('en')
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
          components: { 'yh-config-provider': YhConfigProvider, 'deep-child': DeepChild },
          setup() {
            return {}
          },
          template: `
            <yh-config-provider size="small">
              <deep-child />
            </yh-config-provider>
          `
        })
      }
    })

    expect(wrapper.find('.size').text()).toBe('small')
  })

  it('YhConfigProvider and hooks should fall back to global options when props are not specified', () => {
    const Child = defineComponent({
      setup() {
        const { globalSize, globalZIndex } = useConfig()
        const ns = useNamespace('button')
        return { globalSize, globalZIndex, ns }
      },
      template:
        '<div class="size">{{ globalSize }}</div><div class="zindex">{{ globalZIndex }}</div><div class="class">{{ ns.b() }}</div>'
    })

    const wrapper = mount(YhConfigProvider, {
      global: {
        provide: {
          'yh-ui-options': {
            size: 'small',
            zIndex: 9999,
            namespace: 'custom-ns'
          }
        }
      },
      slots: {
        default: Child
      }
    })

    expect(wrapper.find('.size').text()).toBe('small')
    expect(wrapper.find('.zindex').text()).toBe('9999')
    expect(wrapper.find('.class').text()).toBe('custom-ns-button')
  })

  it('hooks should resolve options from globalOptions when rendered without ConfigProvider', () => {
    const Child = defineComponent({
      setup() {
        const { globalSize, globalZIndex } = useConfig()
        const ns = useNamespace('button')
        return { globalSize, globalZIndex, ns }
      },
      template:
        '<div class="size">{{ globalSize }}</div><div class="zindex">{{ globalZIndex }}</div><div class="class">{{ ns.b() }}</div>'
    })

    const wrapper = mount(Child, {
      global: {
        provide: {
          'yh-ui-options': {
            size: 'small',
            zIndex: 9999,
            namespace: 'custom-ns'
          }
        }
      }
    })

    expect(wrapper.find('.size').text()).toBe('small')
    expect(wrapper.find('.zindex').text()).toBe('9999')
    expect(wrapper.find('.class').text()).toBe('custom-ns-button')
  })
})
