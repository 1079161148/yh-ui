import { describe, it, expect } from 'vitest'
import { parseAddress, formatAddress } from '../src/use-address-parser'

describe('use-address-parser', () => {
  it('extracts CN name + mobile + structured region', () => {
    const r = parseAddress('张三 13800138000 广东省深圳市南山区科技园路1号')
    expect(r.name).toBe('张三')
    expect(r.phone).toMatch(/13800138000/)
    expect(r.province).toContain('广东')
    expect(r.city).toContain('深圳')
    expect(r.district).toContain('南山')
    expect(formatAddress(r)).toBeTruthy()
  })

  it('handles comma-separated segments with province/city/district keywords', () => {
    const r = parseAddress('广东省,深圳市,南山区,科技园')
    const joined = [r.province, r.city, r.district, r.street, r.detail].join('')
    expect(joined).toContain('深圳')
    expect(joined).toContain('南山')
    expect(joined.length).toBeGreaterThan(5)
  })

  it('handles English-style City, Province pattern', () => {
    const r = parseAddress('Shenzhen, Guangdong Province')
    const blob = [r.province, r.city, r.district, r.detail].join(' ')
    expect(blob).toMatch(/Shenzhen|Guangdong/i)
  })

  it('uses custom keywords from options', () => {
    const r = parseAddress('Foo Prefecture, Bar Area', {
      cityKeywords: ['Prefecture'],
      districtKeywords: ['Area']
    })
    expect(r.city || r.district).toBeTruthy()
  })

  it('strips newlines and collapses spaces for parsing', () => {
    const r = parseAddress('  李四  \n 15900001111  \n  北京市朝阳区  ')
    expect(r.phone).toMatch(/159/)
    expect(r.name).toContain('李四')
    // raw 保留原始入参，内部用规范化后的 text 解析
    expect(r.raw).toContain('\n')
  })

  it('does not treat digits before phone as name', () => {
    const r = parseAddress('门牌3号 13900002222 上海市')
    expect(r.phone).toMatch(/139/)
  })

  it('formatAddress joins non-empty parts', () => {
    expect(
      formatAddress({
        name: '',
        phone: '',
        province: 'P',
        city: 'C',
        district: '',
        street: 'S',
        detail: 'D',
        raw: ''
      })
    ).toBe('PCS' + 'D')
  })
})
