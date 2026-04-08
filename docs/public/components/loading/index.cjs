"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhLoading: true,
  vYhLoading: true
};
exports.vYhLoading = exports.default = exports.YhLoading = void 0;
var _service = require("./src/service.cjs");
Object.keys(_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _service[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _service[key];
    }
  });
});
var _directive = require("./src/directive.cjs");
Object.keys(_directive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _directive[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _directive[key];
    }
  });
});
require("./src/loading.css");
const YhLoading = exports.YhLoading = {
  ..._service.Loading,
  directive: _directive.vLoading,
  install(app) {
    app.config.globalProperties.$loading = _service.Loading.service;
    app.directive("yh-loading", _directive.vLoading);
  }
};
const vYhLoading = exports.vYhLoading = _directive.vLoading;
module.exports = YhLoading;