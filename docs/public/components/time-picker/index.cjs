"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTimePicker: true
};
module.exports = exports.YhTimePicker = void 0;
var _utils = require("@yh-ui/utils");
var _timePicker = _interopRequireDefault(require("./src/time-picker.vue"));
var _timePicker2 = require("./src/time-picker.cjs");
Object.keys(_timePicker2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _timePicker2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _timePicker2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTimePicker = exports.YhTimePicker = (0, _utils.withInstall)(_timePicker.default);
module.exports = YhTimePicker;