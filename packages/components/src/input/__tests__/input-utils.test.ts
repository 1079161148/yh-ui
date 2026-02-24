/**
 * input/src/utils.ts - calcTextareaHeight 单元测试
 * 由于该函数依赖 DOM，使用 jsdom 环境测试
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { calcTextareaHeight } from '../src/utils'

describe('calcTextareaHeight', () => {
  let textarea: HTMLTextAreaElement

  beforeEach(() => {
    textarea = document.createElement('textarea')
    // mock getComputedStyle
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (prop: string) => {
        const map: Record<string, string> = {
          'box-sizing': 'border-box',
          'padding-top': '4',
          'padding-bottom': '4',
          'border-top-width': '1',
          'border-bottom-width': '1',
          'letter-spacing': 'normal',
          'line-height': '20px',
          'font-family': 'sans-serif',
          'font-weight': 'normal',
          'font-size': '14px',
          'text-rendering': 'auto',
          'text-transform': 'none',
          width: '200px',
          'text-indent': '0px',
          'padding-left': '8px',
          'padding-right': '8px'
        }
        return map[prop] ?? ''
      }
    } as any)

    // mock scrollHeight
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return 24
      }
    })

    document.body.appendChild(textarea)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('should return height string', () => {
    const result = calcTextareaHeight(textarea)
    expect(result).toHaveProperty('height')
    expect(typeof result.height).toBe('string')
    expect(result.height).toMatch(/px$/)
  })

  it('should return minHeight when minRows > 0', () => {
    const result = calcTextareaHeight(textarea, 2)
    expect(result).toHaveProperty('minHeight')
    expect(result.minHeight).toMatch(/px$/)
  })

  it('should handle maxRows constraint', () => {
    const result = calcTextareaHeight(textarea, 1, 3)
    expect(result.height).toMatch(/px$/)
  })

  it('should handle content-box sizing', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (prop: string) => {
        if (prop === 'box-sizing') return 'content-box'
        if (prop === 'padding-top') return '4'
        if (prop === 'padding-bottom') return '4'
        if (prop === 'border-top-width') return '1'
        if (prop === 'border-bottom-width') return '1'
        return ''
      }
    } as any)
    const result = calcTextareaHeight(textarea, 1)
    expect(result.height).toMatch(/px$/)
  })

  it('should handle minRows = 0 (no minHeight)', () => {
    const result = calcTextareaHeight(textarea, 0)
    // When minRows = 0, result.minHeight will be empty string (falsy)
    expect(result.height).toMatch(/px$/)
  })
})
