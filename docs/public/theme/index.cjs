"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _tokens = require("./tokens/index.cjs");
Object.keys(_tokens).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tokens[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tokens[key];
    }
  });
});
var _theme = require("./theme.cjs");
Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme[key];
    }
  });
});
var _componentTheme = require("./component-theme.cjs");
Object.keys(_componentTheme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _componentTheme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _componentTheme[key];
    }
  });
});