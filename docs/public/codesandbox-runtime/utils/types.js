const isString = (val) => typeof val === 'string'
const isNumber = (val) => typeof val === 'number'
const isBoolean = (val) => typeof val === 'boolean'
const isFunction = (val) => typeof val === 'function'
const isObject = (val) => val !== null && typeof val === 'object'
const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch)
const isArray = Array.isArray
const isUndefined = (val) => val === void 0
const isNil = (val) => val == null
const isEmpty = (val) => {
  if (isNil(val)) return true
  if (isArray(val)) return val.length === 0
  if (isString(val)) return val.trim().length === 0
  if (isObject(val)) return Object.keys(val).length === 0
  return false
}
const isNumeric = (val) => !isNil(val) && !isNaN(parseFloat(String(val))) && isFinite(Number(val))
export {
  isArray,
  isBoolean,
  isEmpty,
  isFunction,
  isNil,
  isNumber,
  isNumeric,
  isObject,
  isPromise,
  isString,
  isUndefined
}
