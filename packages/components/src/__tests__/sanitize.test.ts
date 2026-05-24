/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import { sanitizeSvgMarkup } from '../sanitize'

describe('sanitizeSvgMarkup', () => {
  it('preserves mermaid foreignObject labels and svg attributes', () => {
    const rawSvg = `
      <svg viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
        <foreignObject x="10" y="10" width="120" height="40">
          <div xmlns="http://www.w3.org/1999/xhtml" class="nodeLabel">
            <span>开始</span>
          </div>
        </foreignObject>
      </svg>
    `

    const sanitized = sanitizeSvgMarkup(rawSvg)

    expect(sanitized).toContain('开始')
    expect(sanitized.toLowerCase()).toContain('foreignobject')
    expect(sanitized.toLowerCase()).toContain('viewbox')
  })

  it('removes unsafe svg links', () => {
    const rawSvg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <a xlink:href="javascript:alert(1)">
          <text>unsafe</text>
        </a>
      </svg>
    `

    const sanitized = sanitizeSvgMarkup(rawSvg)

    expect(sanitized).not.toContain('javascript:alert(1)')
    expect(sanitized).toContain('unsafe')
  })
})
