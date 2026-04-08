"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCascader: true,
  YhCascaderPanel: true
};
module.exports = exports.YhCascaderPanel = exports.YhCascader = void 0;
var _utils = require("@yh-ui/utils");
var _cascader = _interopRequireDefault(require("./src/cascader.vue"));
var _cascaderPanel = _interopRequireDefault(require("./src/cascader-panel.vue"));
var _cascader2 = require("./src/cascader.cjs");
Object.keys(_cascader2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cascader2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cascader2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCascader = exports.YhCascader = (0, _utils.withInstall)(_cascader.default);
const YhCascaderPanel = exports.YhCascaderPanel = (0, _utils.withInstall)(_cascaderPanel.default);
module.exports = YhCascader;