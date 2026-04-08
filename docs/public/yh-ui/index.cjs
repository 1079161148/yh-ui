'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const components = require('@yh-ui/components');
const hooks = require('@yh-ui/hooks');
const utils = require('@yh-ui/utils');
const theme = require('@yh-ui/theme');
const locale = require('@yh-ui/locale');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const components__default = /*#__PURE__*/_interopDefaultCompat(components);

const createYhUI = (options = {}) => {
  return {
    install(app) {
      app.use(components__default);
      app.provide("yh-ui-options", options);
    }
  };
};
const install = (app, options) => {
  app.use(createYhUI(options));
};
const index = {
  install,
  createYhUI
};
const version = "0.1.10";

exports.hexToRgb = utils.hexToRgb;
exports.rgbToHex = utils.rgbToHex;
exports.en = locale.en;
exports.zhCn = locale.zhCn;
exports.createYhUI = createYhUI;
exports.default = index;
exports.install = install;
exports.version = version;
Object.prototype.hasOwnProperty.call(components, '__proto__') &&
  !Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
  Object.defineProperty(exports, '__proto__', {
    enumerable: true,
    value: components['__proto__']
  });

Object.keys(components).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = components[k];
});
Object.prototype.hasOwnProperty.call(hooks, '__proto__') &&
  !Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
  Object.defineProperty(exports, '__proto__', {
    enumerable: true,
    value: hooks['__proto__']
  });

Object.keys(hooks).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = hooks[k];
});
Object.prototype.hasOwnProperty.call(utils, '__proto__') &&
  !Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
  Object.defineProperty(exports, '__proto__', {
    enumerable: true,
    value: utils['__proto__']
  });

Object.keys(utils).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = utils[k];
});
Object.prototype.hasOwnProperty.call(theme, '__proto__') &&
  !Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
  Object.defineProperty(exports, '__proto__', {
    enumerable: true,
    value: theme['__proto__']
  });

Object.keys(theme).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = theme[k];
});
Object.prototype.hasOwnProperty.call(locale, '__proto__') &&
  !Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
  Object.defineProperty(exports, '__proto__', {
    enumerable: true,
    value: locale['__proto__']
  });

Object.keys(locale).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = locale[k];
});
