export const isString = (val) => typeof val === "string";
export const isNumber = (val) => typeof val === "number";
export const isBoolean = (val) => typeof val === "boolean";
export const isFunction = (val) => typeof val === "function";
export const isObject = (val) => val !== null && typeof val === "object";
export const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
export const isArray = Array.isArray;
export const isUndefined = (val) => val === void 0;
export const isNil = (val) => val == null;
export const isEmpty = (val) => {
  if (isNil(val)) return true;
  if (isArray(val)) return val.length === 0;
  if (isString(val)) return val.trim().length === 0;
  if (isObject(val)) return Object.keys(val).length === 0;
  return false;
};
export const isNumeric = (val) => !isNil(val) && !isNaN(parseFloat(String(val))) && isFinite(Number(val));
