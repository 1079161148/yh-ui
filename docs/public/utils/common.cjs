"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = exports.throttle = exports.sleep = exports.set = exports.retry = exports.kebabCase = exports.get = exports.generateId = exports.deepMerge = exports.deepClone = exports.debounce = exports.capitalize = exports.camelCase = void 0;
let idCounter = 0;
const generateId = (prefix = "yh") => {
  return `${prefix}-${Date.now()}-${++idCounter}`;
};
exports.generateId = generateId;
const debounce = (fn, delay) => {
  let timer = null;
  const debounced = (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
};
exports.debounce = debounce;
const throttle = (fn, delay) => {
  let lastTime = 0;
  let timer = null;
  const throttled = (...args) => {
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn(...args);
      lastTime = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        lastTime = Date.now();
        timer = null;
      }, remaining);
    }
  };
  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastTime = 0;
  };
  return throttled;
};
exports.throttle = throttle;
const deepClone = obj => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  if (obj instanceof Object) {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key]);
    });
    return copy;
  }
  return obj;
};
exports.deepClone = deepClone;
const deepMerge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (source === void 0) return target;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (typeof targetValue === "object" && targetValue !== null && typeof sourceValue === "object" && sourceValue !== null && !Array.isArray(targetValue) && !Array.isArray(sourceValue)) {
        target[key] = deepMerge({
          ...targetValue
        }, sourceValue);
      } else {
        target[key] = sourceValue;
      }
    }
  }
  return deepMerge(target, ...sources);
};
exports.deepMerge = deepMerge;
const toArray = val => {
  return Array.isArray(val) ? val : [val];
};
exports.toArray = toArray;
const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.capitalize = capitalize;
const kebabCase = str => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
};
exports.kebabCase = kebabCase;
const camelCase = str => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};
exports.camelCase = camelCase;
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const get = (obj, path, defaultValue) => {
  const result = path.split(".").reduce((res, key) => {
    if (res !== null && res !== void 0 && typeof res === "object") {
      return res[key];
    }
    return void 0;
  }, obj);
  return result === void 0 ? defaultValue : result;
};
exports.get = get;
const set = (obj, path, value) => {
  if (Object(obj) !== obj) return obj;
  const keys = path.split(".");
  const lastKey = keys.pop();
  const node = keys.reduce((res, key) => {
    if (res[key] === void 0) res[key] = {};
    return res[key];
  }, obj);
  node[lastKey] = value;
  return obj;
};
exports.set = set;
const retry = async (fn, retries = 3, delay = 1e3) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await sleep(delay);
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};
exports.retry = retry;