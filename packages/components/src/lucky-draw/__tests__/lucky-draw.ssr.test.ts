/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhLuckyDraw from '../src/lucky-draw.vue'

describe('YhLuckyDraw SSR', () => {
  const prizes = [
    { id: '1', name: 'Prize 1' },
    { id: '2', name: 'Prize 2' }
  ]

  it('renders wheel on server', async () => {
    const html = await renderToString(
      h(YhLuckyDraw, {
        prizes
      })
    )
    expect(html).toContain('yh-lucky-draw')
    expect(html).toContain('yh-lucky-draw--wheel')
    expect(html).toContain('Prize 1')
  })

  it('renders grid on server', async () => {
    const html = await renderToString(
      h(YhLuckyDraw, {
        type: 'grid',
        prizes
      })
    )
    expect(html).toContain('yh-lucky-draw')
    expect(html).toContain('yh-lucky-draw--grid')
    expect(html).toContain('Prize 1')
  })
})
