/**
 * Icon Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Icon from '../src/icon.vue'
import { renderSSR, testHydration } from '../../__tests__/utils/ssr'
import { registerIcon } from '../src/icon'

describe('YhIcon SSR', () => {
  // 注册测试用的图标
  registerIcon({ name: 'user', svg: '<path d="user" />' })
  registerIcon({ name: 'star', svg: '<path d="star" />' })

  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Icon, {
      name: 'user',
      size: 20,
      color: 'red'
    })

    expect(html).toContain('yh-icon')
    expect(html).toContain('font-size:20px')
    expect(html).toContain('color:red')
    expect(html).toContain('d="user"')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Icon, {
      name: 'star',
      size: '2em'
    })
    expect(result.isMatch).toBe(true)
  })
})
