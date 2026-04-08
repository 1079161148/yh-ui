"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhBackTop: true
};
module.exports = exports.YhBackTop = void 0;
var _utils = require("@yh-ui/utils");
var _backTop = _interopRequireDefault(require("./src/back-top.vue"));
var _backTop2 = require("./src/back-top.cjs");
Object.keys(_backTop2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _backTop2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _backTop2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhBackTop = exports.YhBackTop = (0, _utils.withInstall)(_backTop.default);
module.exports = YhBackTop;