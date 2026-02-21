/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import DatePicker from '../src/date-picker.vue'

describe('YhDatePicker SSR', () => {
  it('服务端渲染不应报错且生成正确结构', async () => {
    const app = createSSRApp({
      render: () => h(DatePicker)
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
