"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhDivider: true
};
module.exports = exports.YhDivider = void 0;
var _utils = require("@yh-ui/utils");
var _divider = _interopRequireDefault(require("./src/divider.vue"));
var _divider2 = require("./src/divider.cjs");
Object.keys(_divider2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _divider2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _divider2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhDivider = exports.YhDivider = (0, _utils.withInstall)(_divider.default);
module.exports = YhDivider;