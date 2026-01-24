/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import DatePicker from '../src/date-picker.vue'

describe('YhDatePicker SSR', () => {
  it('服务端渲染不应报错且生成正确结构', async () => {
    const app = createSSRApp({
      render: () => {
        // 在 SSR 模式下使用 h 会更稳定，或者直接使用组件
        // 注意：由于我们 mock 了 useNamespace，这里需要确保 mock 在 node 环境也生效
        // 实际上 Vitest 已经处理了 hoisting
        return DatePicker
      }
    })

    const html = await renderToString(app)

    // 基本结构检查
    expect(html).toContain('yh-date-picker')
    expect(html).toContain('input')
    // 默认不渲染面板（因为 visible 为 false）
    expect(html).not.toContain('yh-date-picker__panel')
  })

  it('SSR 初始值渲染', async () => {
    const app = createSSRApp(DatePicker, {
      modelValue: '2024-01-01',
      format: 'YYYY-MM-DD'
    })

    const html = await renderToString(app)
    expect(html).toContain('value="2024-01-01"')
  })
})
