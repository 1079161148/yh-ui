// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest'
import {
  addUnit,
  removeUnit,
  hexToRgb,
  rgbToHex,
  adjustColorBrightness,
  generateColorPalette,
  setCssVar,
  getCssVar,
  setCssVars
} from '../src/style'

describe('utils/style', () => {
  it('addUnit', () => {
    expect(addUnit(10)).toBe('10px')
    expect(addUnit('10')).toBe('10px')
    expect(addUnit('10px')).toBe('10px')
    expect(addUnit('10em')).toBe('10em') // isNumeric returns false for '10em', so it returns '10em'
    expect(addUnit(undefined)).toBeUndefined()
    expect(addUnit(null as unknown as string)).toBeUndefined()
    expect(addUnit('')).toBeUndefined()
  })

  it('removeUnit', () => {
    expect(removeUnit('10px')).toBe(10)
    expect(removeUnit('10.5em')).toBe(10.5)
    expect(removeUnit('abc')).toBe(0)
  })

  it('hexToRgb', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 })
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    expect(hexToRgb('invalid')).toBeNull()
  })

  it('rgbToHex', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
    expect(rgbToHex(10, 15, 20)).toBe('#0a0f14')
  })

  it('adjustColorBrightness', () => {
    expect(adjustColorBrightness('#102030', 10)).toBe('#1a2a3a')
    expect(adjustColorBrightness('#ffffff', 10)).toBe('#ffffff') // max 255
    expect(adjustColorBrightness('#000000', -10)).toBe('#000000') // min 0
    expect(adjustColorBrightness('invalid', 10)).toBe('invalid')
  })

  it('generateColorPalette', () => {
    const palette = generateColorPalette('#000000', [1, 5, 9])
    expect(palette[1]).toBe('#e6e6e6') // 90% white mixed in
    expect(palette[5]).toBe('#808080') // 50% mixed
    expect(palette[9]).toBe('#1a1a1a') // 10% mixed

    expect(generateColorPalette('invalid')).toEqual({})
  })

  it('cssVars', () => {
    const div = document.createElement('div')
    setCssVar('--my-var', '10px', div)
    expect(div.style.getPropertyValue('--my-var')).toBe('10px')

    // getCssVar
    // Need to insert into DOM for computed style or mock it somehow
    // Instead mock getComputedStyle
    vi.spyOn(window, 'getComputedStyle').mockImplementation(() => {
      return {
        getPropertyValue: (name: string) => (name === '--my-var' ? ' 10px ' : '')
      } as unknown as CSSStyleDeclaration
    })

    expect(getCssVar('--my-var', div)).toBe('10px')

    // setCssVars
    setCssVars({ '--a': '1', '--b': '2' }, div)
    expect(div.style.getPropertyValue('--a')).toBe('1')
    expect(div.style.getPropertyValue('--b')).toBe('2')

    vi.restoreAllMocks()
  })
})
