"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhColorPicker: true
};
module.exports = exports.YhColorPicker = void 0;
var _utils = require("@yh-ui/utils");
var _colorPicker = _interopRequireDefault(require("./src/color-picker.vue"));
var _colorPicker2 = require("./src/color-picker.cjs");
Object.keys(_colorPicker2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _colorPicker2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colorPicker2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhColorPicker = exports.YhColorPicker = (0, _utils.withInstall)(_colorPicker.default);
module.exports = YhColorPicker;