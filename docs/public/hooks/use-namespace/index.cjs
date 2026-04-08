"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNamespace = exports.useGlobalNamespace = exports.namespaceContextKey = exports.defaultNamespace = void 0;
var _vue = require("vue");
const defaultNamespace = exports.defaultNamespace = "yh";
const statePrefix = "is-";
const namespaceContextKey = exports.namespaceContextKey = Symbol("namespaceContextKey");
const useGlobalNamespace = () => {
  return (0, _vue.inject)(namespaceContextKey, (0, _vue.ref)(defaultNamespace));
};
exports.useGlobalNamespace = useGlobalNamespace;
const useNamespace = block => {
  const namespace = useGlobalNamespace();
  const b = (blockSuffix = "") => {
    const ns = (0, _vue.unref)(namespace);
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`;
  };
  const e = element => {
    return element ? `${b()}__${element}` : "";
  };
  const m = modifier => {
    return modifier ? `${b()}--${modifier}` : "";
  };
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix);
    if (element) cls += `__${element}`;
    if (modifier) cls += `--${modifier}`;
    return cls;
  };
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : "";
  };
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`;
    }
    return value ? `${statePrefix}${state}` : "";
  }
  const cssVar = name => {
    return `--${(0, _vue.unref)(namespace)}-${block}-${name}`;
  };
  const cssVarObj = vars => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value;
    });
    return obj;
  };
  const cssVarBlock = name => {
    return `--${(0, _vue.unref)(namespace)}-${name}`;
  };
  const cssVarBlockObj = vars => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value;
    });
    return obj;
  };
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  };
};
exports.useNamespace = useNamespace;