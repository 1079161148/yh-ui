import { describe, it, expect } from 'vitest'
import hljs from '../highlight'

describe('highlight (hljs shim)', () => {
  it('getLanguage normalizes and matches known languages', () => {
    expect(hljs.getLanguage('TS')).toBe('typescript')
    expect(hljs.getLanguage('vue')).toBe('html')
    expect(hljs.getLanguage('unknown-lang-xyz')).toBeUndefined()
  })

  it('highlight and highlightAuto escape HTML', () => {
    expect(hljs.highlight('<a>', {}).value).toBe('&lt;a&gt;')
    expect(hljs.highlightAuto('x & y').value).toBe('x &amp; y')
  })
})
