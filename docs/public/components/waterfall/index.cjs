"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhWaterfall: true
};
module.exports = exports.YhWaterfall = void 0;
var _utils = require("@yh-ui/utils");
var _waterfall = _interopRequireDefault(require("./src/waterfall.vue"));
var _waterfall2 = require("./src/waterfall.cjs");
Object.keys(_waterfall2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _waterfall2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _waterfall2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhWaterfall = exports.YhWaterfall = (0, _utils.withInstall)(_waterfall.default);
module.exports = YhWaterfall;