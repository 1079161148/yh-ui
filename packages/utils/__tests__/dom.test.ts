/**
 * utils/src/dom.ts 单元测试
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  isClient,
  isServer,
  getStyle,
  setStyle,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  getScrollContainer,
  isInViewport
} from '../src/dom'

describe('utils/dom', () => {
  // ======================== isClient / isServer ========================
  describe('isClient / isServer', () => {
    it('should be true in jsdom environment', () => {
      expect(isClient).toBe(true)
      expect(isServer).toBe(false)
    })
  })

  // ======================== getStyle ========================
  describe('getStyle', () => {
    it('should return style value from element inline style', () => {
      const el = document.createElement('div')
      el.style.color = 'red'
      document.body.appendChild(el)
      const val = getStyle(el, 'color')
      expect(val).toBeTruthy()
      document.body.removeChild(el)
    })

    it('should return empty string when element is falsy', () => {
      expect(getStyle(null as unknown as HTMLElement, 'color')).toBe('')
    })

    it('should return empty string when styleName is falsy', () => {
      const el = document.createElement('div')
      expect(getStyle(el, null as unknown as keyof CSSStyleDeclaration)).toBe('')
    })
  })

  // ======================== setStyle ========================
  describe('setStyle', () => {
    let el: HTMLElement

    beforeEach(() => {
      el = document.createElement('div')
    })

    it('should set a string style', () => {
      setStyle(el, 'color', 'blue')
      expect(el.style.color).toBe('blue')
    })

    it('should set multiple styles via object', () => {
      setStyle(el, { color: 'green', fontSize: '16px' })
      expect(el.style.color).toBe('green')
      expect(el.style.fontSize).toBe('16px')
    })

    it('should set empty string when value is undefined', () => {
      el.style.color = 'red'
      setStyle(el, 'color', undefined)
      expect(el.style.color).toBe('')
    })

    it('should do nothing when element is falsy', () => {
      expect(() => setStyle(null as unknown as HTMLElement, 'color', 'red')).not.toThrow()
    })
  })

  // ======================== hasClass ========================
  describe('hasClass', () => {
    let el: HTMLElement

    beforeEach(() => {
      el = document.createElement('div')
      el.classList.add('foo', 'bar')
    })

    it('should return true if class exists', () => {
      expect(hasClass(el, 'foo')).toBe(true)
      expect(hasClass(el, 'bar')).toBe(true)
    })

    it('should return false if class does not exist', () => {
      expect(hasClass(el, 'baz')).toBe(false)
    })

    it('should return false when element is falsy', () => {
      expect(hasClass(null as unknown as HTMLElement, 'foo')).toBe(false)
    })

    it('should return false when cls is empty', () => {
      expect(hasClass(el, '')).toBe(false)
    })

    it('should throw when cls contains space', () => {
      expect(() => hasClass(el, 'foo bar')).toThrow()
    })
  })

  // ======================== addClass ========================
  describe('addClass', () => {
    let el: HTMLElement

    beforeEach(() => {
      el = document.createElement('div')
    })

    it('should add a single class', () => {
      addClass(el, 'active')
      expect(el.classList.contains('active')).toBe(true)
    })

    it('should add multiple classes (space separated)', () => {
      addClass(el, 'a b c')
      expect(el.classList.contains('a')).toBe(true)
      expect(el.classList.contains('b')).toBe(true)
      expect(el.classList.contains('c')).toBe(true)
    })

    it('should do nothing when cls is empty', () => {
      addClass(el, '')
      expect(el.className).toBe('')
    })

    it('should do nothing when element is falsy', () => {
      expect(() => addClass(null as unknown as HTMLElement, 'foo')).not.toThrow()
    })
  })

  // ======================== removeClass ========================
  describe('removeClass', () => {
    let el: HTMLElement

    beforeEach(() => {
      el = document.createElement('div')
      el.classList.add('a', 'b', 'c')
    })

    it('should remove a class', () => {
      removeClass(el, 'a')
      expect(el.classList.contains('a')).toBe(false)
      expect(el.classList.contains('b')).toBe(true)
    })

    it('should remove multiple classes', () => {
      removeClass(el, 'a b')
      expect(el.classList.contains('a')).toBe(false)
      expect(el.classList.contains('b')).toBe(false)
      expect(el.classList.contains('c')).toBe(true)
    })

    it('should do nothing when cls is empty', () => {
      removeClass(el, '')
      expect(el.classList.contains('a')).toBe(true)
    })
  })

  // ======================== toggleClass ========================
  describe('toggleClass', () => {
    let el: HTMLElement

    beforeEach(() => {
      el = document.createElement('div')
    })

    it('should toggle class on', () => {
      toggleClass(el, 'active')
      expect(el.classList.contains('active')).toBe(true)
    })

    it('should toggle class off', () => {
      el.classList.add('active')
      toggleClass(el, 'active')
      expect(el.classList.contains('active')).toBe(false)
    })

    it('should force add with force=true', () => {
      toggleClass(el, 'active', true)
      toggleClass(el, 'active', true)
      expect(el.classList.contains('active')).toBe(true)
    })

    it('should force remove with force=false', () => {
      el.classList.add('active')
      toggleClass(el, 'active', false)
      expect(el.classList.contains('active')).toBe(false)
    })

    it('should do nothing when element is falsy', () => {
      expect(() => toggleClass(null as unknown as HTMLElement, 'foo')).not.toThrow()
    })
  })

  // ======================== getScrollContainer ========================
  describe('getScrollContainer', () => {
    it('should return window for document.body child', () => {
      const el = document.createElement('div')
      document.body.appendChild(el)
      const container = getScrollContainer(el)
      expect(container).toBe(window)
      document.body.removeChild(el)
    })

    it('should return scrollable parent', () => {
      const parent = document.createElement('div')
      parent.style.overflow = 'scroll'
      const child = document.createElement('div')
      parent.appendChild(child)
      document.body.appendChild(parent)
      const container = getScrollContainer(child)
      expect(container).toBe(parent)
      document.body.removeChild(parent)
    })

    it('should detect vertical scroll container with overflowY', () => {
      const parent = document.createElement('div')
      parent.style.overflowY = 'auto'
      const child = document.createElement('div')
      parent.appendChild(child)
      document.body.appendChild(parent)
      const container = getScrollContainer(child, true)
      expect(container).toBe(parent)
      document.body.removeChild(parent)
    })
  })

  // ======================== isInViewport ========================
  describe('isInViewport', () => {
    it('should return false when element is falsy', () => {
      expect(isInViewport(null as unknown as HTMLElement)).toBe(false)
    })

    it('should return true for element in viewport (mocked getBoundingClientRect)', () => {
      const el = document.createElement('div')
      el.getBoundingClientRect = () => ({
        top: 10,
        left: 10,
        bottom: 100,
        right: 100,
        width: 90,
        height: 90,
        x: 10,
        y: 10,
        toJSON: () => {}
      })
      document.body.appendChild(el)
      expect(isInViewport(el)).toBe(true)
      document.body.removeChild(el)
    })

    it('should return false for element outside viewport', () => {
      const el = document.createElement('div')
      el.getBoundingClientRect = () => ({
        top: -100,
        left: -100,
        bottom: -10,
        right: -10,
        width: 90,
        height: 90,
        x: -100,
        y: -100,
        toJSON: () => {}
      })
      document.body.appendChild(el)
      expect(isInViewport(el)).toBe(false)
      document.body.removeChild(el)
    })
  })
})
