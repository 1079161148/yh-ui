"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = exports.isString = exports.isPromise = exports.isObject = exports.isNumeric = exports.isNumber = exports.isNil = exports.isFunction = exports.isEmpty = exports.isBoolean = exports.isArray = void 0;
const isString = val => typeof val === "string";
exports.isString = isString;
const isNumber = val => typeof val === "number";
exports.isNumber = isNumber;
const isBoolean = val => typeof val === "boolean";
exports.isBoolean = isBoolean;
const isFunction = val => typeof val === "function";
exports.isFunction = isFunction;
const isObject = val => val !== null && typeof val === "object";
exports.isObject = isObject;
const isPromise = val => isObject(val) && isFunction(val.then) && isFunction(val.catch);
exports.isPromise = isPromise;
const isArray = exports.isArray = Array.isArray;
const isUndefined = val => val === void 0;
exports.isUndefined = isUndefined;
const isNil = val => val == null;
exports.isNil = isNil;
const isEmpty = val => {
  if (isNil(val)) return true;
  if (isArray(val)) return val.length === 0;
  if (isString(val)) return val.trim().length === 0;
  if (isObject(val)) return Object.keys(val).length === 0;
  return false;
};
exports.isEmpty = isEmpty;
const isNumeric = val => !isNil(val) && !isNaN(parseFloat(String(val))) && isFinite(Number(val));
exports.isNumeric = isNumeric;