import { describe, it, expect, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp, h } from 'vue'
import TimePicker from '../src/time-picker.vue'

// Mock hooks
vi.mock('@yh-ui/hooks', () => ({
  useNamespace: (name: string) => ({
    b: (suffix?: string) => (suffix ? `yh-${name}-${suffix}` : `yh-${name}`),
    e: (element: string) => `yh-${name}__${element}`,
    m: (modifier: string) => `yh-${name}--${modifier}`,
    is: (state: string, value?: boolean) => (value !== false ? `is-${state}` : '')
  }),
  useFormItem: () => ({
    form: null,
    formItem: null,
    validate: vi.fn()
  }),
  useId: () => 'ssr-test-id'
}))

vi.mock('../../hooks/use-config', () => ({
  useConfig: () => ({
    globalSize: { value: 'default' }
  })
}))

describe('YhTimePicker SSR', () => {
  it('应该能正确进行服务端渲染', async () => {
    const app = createSSRApp({
      render: () =>
        h(TimePicker, {
          placeholder: '选择时间'
        })
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-time-picker')
    expect(html).toContain('选择时间')
  })

  it('SSR 渲染时应该包含正确的类名', async () => {
    const app = createSSRApp({
      render: () =>
        h(TimePicker, {
          size: 'large',
          disabled: true
        })
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-time-picker--large')
    expect(html).toContain('is-disabled')
  })

  it('SSR 渲染时应该正确处理范围选择模式', async () => {
    const app = createSSRApp({
      render: () =>
        h(TimePicker, {
          isRange: true,
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间'
        })
    })

    const html = await renderToString(app)

    expect(html).toContain('is-range')
    expect(html).toContain('开始时间')
    expect(html).toContain('结束时间')
  })

  it('SSR 渲染时应该正确显示已选值', async () => {
    const app = createSSRApp({
      render: () =>
        h(TimePicker, {
          modelValue: '14:30:00',
          format: 'HH:mm:ss'
        })
    })

    const html = await renderToString(app)

    expect(html).toContain('14:30:00')
  })

  it('SSR 渲染时不应该包含面板内容（默认隐藏）', async () => {
    const app = createSSRApp({
      render: () =>
        h(TimePicker, {
          teleported: false
        })
    })

    const html = await renderToString(app)

    // 面板应该存在但是隐藏的（v-show）
    expect(html).toContain('yh-time-picker__panel')
    expect(html).toContain('display: none')
  })
})
