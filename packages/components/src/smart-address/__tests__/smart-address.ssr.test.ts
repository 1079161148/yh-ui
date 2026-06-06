/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import SmartAddress from '../src/smart-address.vue'

describe('SmartAddress SSR', () => {
  it('renders the current address fields on server', async () => {
    const html = await renderToString(
      h(SmartAddress, {
        modelValue: {
          name: 'Zhang San',
          phone: '13800138000',
          province: 'Beijing',
          city: 'Beijing',
          district: 'Chaoyang',
          street: '',
          detail: 'Street 123'
        }
      })
    )

    expect(html).toContain('yh-smart-address')
    expect(html).toContain('Zhang San')
    expect(html).toContain('13800138000')
    expect(html).toContain('Beijing')
    expect(html).toContain('Chaoyang')
  })

  it('renders parser-disabled top-label layout on server', async () => {
    const html = await renderToString(
      h(SmartAddress, {
        modelValue: {
          name: 'Alice',
          phone: '13800138000',
          province: '330000',
          city: '330100',
          district: '330106',
          street: 'Gudun Road',
          detail: 'No. 1'
        },
        showParser: false,
        showStreet: true,
        labelPlacement: 'top',
        required: true,
        themeOverrides: {
          labelWidth: '140px'
        }
      })
    )

    expect(html).toContain('yh-smart-address')
    expect(html).toContain('is-top')
    expect(html).toContain('Gudun Road')
    expect(html).toContain('--yh-smart-address-label-width:140px')
    expect(html).not.toContain('yh-smart-address__parser')
  })
})
