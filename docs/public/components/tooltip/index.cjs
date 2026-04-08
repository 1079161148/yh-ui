"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTooltip: true
};
module.exports = exports.YhTooltip = void 0;
var _utils = require("@yh-ui/utils");
var _tooltip = _interopRequireDefault(require("./src/tooltip.vue"));
var _tooltip2 = require("./src/tooltip.cjs");
Object.keys(_tooltip2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tooltip2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tooltip2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTooltip = exports.YhTooltip = (0, _utils.withInstall)(_tooltip.default);
module.exports = YhTooltip;