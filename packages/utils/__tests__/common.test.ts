/**
 * utils/src/common.ts 单元测试
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  generateId,
  debounce,
  throttle,
  deepClone,
  deepMerge,
  toArray,
  capitalize,
  kebabCase,
  camelCase,
  sleep,
  get,
  set,
  retry
} from '../src/common'

describe('utils/common', () => {
  // ======================== generateId ========================
  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('should use default prefix yh', () => {
      const id = generateId()
      expect(id).toMatch(/^yh-/)
    })

    it('should use custom prefix', () => {
      const id = generateId('custom')
      expect(id).toMatch(/^custom-/)
    })
  })

  // ======================== debounce ========================
  describe('debounce', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('should delay invocation', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)
      debounced()
      debounced()
      debounced()
      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should reset delay on repeated calls', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)
      debounced()
      vi.advanceTimersByTime(50)
      debounced()
      vi.advanceTimersByTime(50)
      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should support cancel', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)
      debounced()
      debounced.cancel()
      vi.advanceTimersByTime(200)
      expect(fn).not.toHaveBeenCalled()
    })

    it('should pass arguments correctly', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)
      debounced('a', 'b')
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledWith('a', 'b')
    })
  })

  // ======================== throttle ========================
  describe('throttle', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('should call function immediately on first call', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled()
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should skip calls within delay window but fire the trailing call', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled()
      throttled()
      throttled()
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(2) // 尾部调用会被触发
    })

    it('should allow call after delay', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled()
      vi.advanceTimersByTime(150)
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('should support cancel and clear pending timer', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled() // call immediately
      throttled() // register timer
      throttled.cancel() // clear timer and reset lastTime
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1) // the trailing call shouldn't fire

      // after cancel, should allow immediate call
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('should handle remaining <= 0 with active timer', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled() // fn called, lastTime = 0
      throttled() // timer set to fire in 100ms
      vi.setSystemTime(Date.now() + 150)
      throttled() // remaining <= 0, timer exists
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('cancel should do nothing if no timer', () => {
      const throttled = throttle(vi.fn(), 100)
      expect(() => throttled.cancel()).not.toThrow()
    })
  })

  // ======================== deepClone ========================
  describe('deepClone', () => {
    it('should clone primitives', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('str')).toBe('str')
      expect(deepClone(null)).toBeNull()
      expect(deepClone(true)).toBe(true)
    })

    it('should clone Date objects', () => {
      const date = new Date('2024-01-01')
      const cloned = deepClone(date)
      expect(cloned.getTime()).toBe(date.getTime())
      expect(cloned).not.toBe(date)
    })

    it('should deep clone arrays', () => {
      const arr = [1, [2, 3], { a: 4 }]
      const cloned = deepClone(arr)
      expect(cloned).toEqual(arr)
      expect(cloned).not.toBe(arr)
    })

    it('should deep clone objects', () => {
      const obj = { a: 1, b: { c: 2 }, d: [3, 4] }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned).not.toBe(obj)
      expect(cloned.b).not.toBe(obj.b)
    })

    it('should not share references', () => {
      const obj = { nested: { val: 1 } }
      const cloned = deepClone(obj)
      cloned.nested.val = 999
      expect(obj.nested.val).toBe(1)
    })

    it('should handle Object.create(null) or other objects', () => {
      const obj = Object.create(null)
      obj.a = 1
      const cloned = deepClone(obj)
      expect(cloned.a).toBe(1)
    })
  })

  // ======================== deepMerge ========================
  describe('deepMerge', () => {
    it('should merge flat objects', () => {
      const a: Record<string, unknown> = { a: 1 }
      const result = deepMerge(a, { b: 2 })
      expect(result).toEqual({ a: 1, b: 2 })
    })

    it('should deep merge nested objects', () => {
      const target: Record<string, unknown> = { a: { x: 1, y: 2 } }
      const result = deepMerge(target, { a: { y: 99, z: 3 } })
      expect(result['a']).toEqual({ x: 1, y: 99, z: 3 })
    })

    it('should override arrays (not merge)', () => {
      const result = deepMerge({ a: [1, 2] } as Record<string, unknown>, { a: [3] })
      expect(result.a).toEqual([3])
    })

    it('should return target unchanged when no sources', () => {
      const target: Record<string, unknown> = { a: 1 }
      const result = deepMerge(target)
      expect(result).toBe(target)
    })

    it('should handle multiple sources', () => {
      const a: Record<string, unknown> = { a: 1 }
      const result = deepMerge(a, { b: 2 }, { c: 3 })
      expect(result).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  // ======================== toArray ========================
  describe('toArray', () => {
    it('should wrap non-array value', () => {
      expect(toArray(1)).toEqual([1])
      expect(toArray('str')).toEqual(['str'])
    })

    it('should return array as-is', () => {
      const arr = [1, 2, 3]
      expect(toArray(arr)).toBe(arr)
    })
  })

  // ======================== capitalize ========================
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('world')).toBe('World')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should handle already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })
  })

  // ======================== kebabCase ========================
  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world')
      expect(kebabCase('myComponentName')).toBe('my-component-name')
    })

    it('should handle leading capital', () => {
      expect(kebabCase('HelloWorld')).toBe('hello-world')
    })

    it('should handle already kebab', () => {
      expect(kebabCase('hello')).toBe('hello')
    })
  })

  // ======================== camelCase ========================
  describe('camelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld')
      expect(camelCase('my-component-name')).toBe('myComponentName')
    })

    it('should handle no hyphens', () => {
      expect(camelCase('hello')).toBe('hello')
    })
  })

  // ======================== sleep ========================
  describe('sleep', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('should resolve after given ms', async () => {
      const p = sleep(100)
      vi.advanceTimersByTime(100)
      await expect(p).resolves.toBeUndefined()
    })
  })

  // ======================== get ========================
  describe('get', () => {
    const obj = { a: { b: { c: 42 } }, arr: [1, 2, 3] }

    it('should get nested value by dot path', () => {
      expect(get(obj as Record<string, unknown>, 'a.b.c')).toBe(42)
    })

    it('should return defaultValue when path not found', () => {
      expect(get(obj as Record<string, unknown>, 'a.b.d', 'fallback')).toBe('fallback')
    })

    it('should return undefined when path not found and no default', () => {
      expect(get(obj as Record<string, unknown>, 'x.y.z')).toBeUndefined()
    })

    it('should handle shallow path', () => {
      expect(get(obj as Record<string, unknown>, 'arr')).toEqual([1, 2, 3])
    })
  })

  // ======================== set ========================
  describe('set', () => {
    it('should set nested value by dot path', () => {
      const obj: Record<string, unknown> = { a: { b: 1 } }
      set(obj, 'a.b', 99)
      expect((obj.a as Record<string, unknown>).b).toBe(99)
    })

    it('should create nested path if not exists', () => {
      const obj: Record<string, unknown> = {}
      set(obj, 'x.y.z', 42)
      expect(((obj.x as Record<string, unknown>).y as Record<string, unknown>).z).toBe(42)
    })

    it('should return the original object', () => {
      const obj: Record<string, unknown> = { a: 1 }
      const result = set(obj, 'b', 2)
      expect(result).toBe(obj)
    })
  })

  // ======================== retry ========================
  describe('retry', () => {
    it('should return result on first success', async () => {
      const fn = vi.fn().mockResolvedValue('ok')
      const result = await retry(fn, 3, 0)
      expect(result).toBe('ok')
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should retry on failure and succeed eventually', async () => {
      const fn = vi.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValue('ok')
      const result = await retry(fn, 3, 0)
      expect(result).toBe('ok')
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('should throw when all retries exhausted', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('always fail'))
      await expect(retry(fn, 0, 0)).rejects.toThrow('always fail')
    })
  })
})
