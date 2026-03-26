/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import SmartAddress from '../src/smart-address.vue'

describe('SmartAddress SSR', () => {
  const props = {
    modelValue: {
      name: '张三',
      phone: '13800138000',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      street: '',
      detail: '某某街道123号'
    }
  }

  it('renders correctly on server', async () => {
    const html = await renderToString(h(SmartAddress, props))
    expect(html).toContain('yh-smart-address')
    expect(html).toContain('张三')
    expect(html).toContain('13800138000')
    expect(html).toContain('北京市')
    expect(html).toContain('朝阳区')
  })
})
