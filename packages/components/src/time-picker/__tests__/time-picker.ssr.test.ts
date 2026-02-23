/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderSSR, expectSSRHasClass } from '../../__tests__/utils/ssr'
import TimePicker from '../src/time-picker.vue'

describe('YhTimePicker SSR', () => {
  it('应该能正确进行服务端渲染', async () => {
    const html = await renderSSR(TimePicker, {
      placeholder: '选择时间'
    })

    expect(html).toContain('yh-time-picker')
    expect(html).toContain('选择时间')
  })

  it('SSR 渲染时应该包含正确的类名', async () => {
    const html = await renderSSR(TimePicker, {
      size: 'large',
      disabled: true
    })

    expectSSRHasClass(html, 'yh-time-picker--large')
    expectSSRHasClass(html, 'is-disabled')
  })

  it('SSR 渲染时应该正确处理范围选择模式', async () => {
    const html = await renderSSR(TimePicker, {
      isRange: true,
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    })

    expectSSRHasClass(html, 'is-range')
    expect(html).toContain('开始时间')
    expect(html).toContain('结束时间')
  })

  it('SSR 渲染时应该正确显示已选值', async () => {
    const html = await renderSSR(TimePicker, {
      modelValue: '14:30:00',
      format: 'HH:mm:ss'
    })

    expect(html).toContain('14:30:00')
  })

  it('SSR 渲染时不应该包含面板内容（默认隐藏）', async () => {
    const html = await renderSSR(TimePicker, {
      teleported: false
    })

    // 面板不应该渲染（因为 visible 为 false，且使用了 v-if）
    expect(html).not.toContain('yh-time-picker__panel')
  })
})
