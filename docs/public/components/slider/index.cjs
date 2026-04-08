"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSlider: true
};
module.exports = exports.YhSlider = void 0;
var _utils = require("@yh-ui/utils");
var _slider = _interopRequireDefault(require("./src/slider.vue"));
var _slider2 = require("./src/slider.cjs");
Object.keys(_slider2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _slider2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _slider2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSlider = exports.YhSlider = (0, _utils.withInstall)(_slider.default);
module.exports = YhSlider;