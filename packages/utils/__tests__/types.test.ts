import { describe, it, expect } from 'vitest'
import {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isPromise,
  isArray,
  isUndefined,
  isNil,
  isEmpty,
  isNumeric
} from '../src/types'

describe('utils/types', () => {
  it('isString', () => {
    expect(isString('')).toBe(true)
    expect(isString('123')).toBe(true)
    expect(isString(123)).toBe(false)
  })

  it('isNumber', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(NaN)).toBe(true) // NaN is a number
    expect(isNumber('1')).toBe(false)
  })

  it('isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(1)).toBe(false)
  })

  it('isFunction', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(async () => {})).toBe(true)
    expect(isFunction({})).toBe(false)
  })

  it('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject('str')).toBe(false)
  })

  it('isPromise', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise({ then: () => {}, catch: () => {} })).toBe(true)
    expect(isPromise({ then: () => {} })).toBe(false)
    expect(isPromise(null)).toBe(false)
  })

  it('isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray({})).toBe(false)
  })

  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('')).toBe(false)
  })

  it('isNil', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil('')).toBe(false)
    expect(isNil(0)).toBe(false)
    expect(isNil(false)).toBe(false)
  })

  it('isEmpty', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('  ')).toBe(true) // wait, .trim().length === 0 is true for '  '
    expect(isEmpty('str')).toBe(false)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty(123)).toBe(false)
    expect(isEmpty(true)).toBe(false)
  })

  it('isNumeric', () => {
    expect(isNumeric('123')).toBe(true)
    expect(isNumeric(123)).toBe(true)
    expect(isNumeric('-123.45')).toBe(true)
    expect(isNumeric('0')).toBe(true)

    // not numeric
    expect(isNumeric(null)).toBe(false)
    expect(isNumeric(undefined)).toBe(false)
    expect(isNumeric('abc')).toBe(false)
    expect(isNumeric('123a')).toBe(false) // isNaN(parseFloat) is false, but isFinite is false for '123a' ... wait! isFinite(Number('123a')) is isFinite(NaN) = false.
    expect(isNumeric('')).toBe(false)
  })
})
