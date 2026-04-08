"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhDatePicker: true
};
module.exports = exports.YhDatePicker = void 0;
var _utils = require("@yh-ui/utils");
var _datePicker = _interopRequireDefault(require("./src/date-picker.vue"));
var _datePicker2 = require("./src/date-picker.cjs");
Object.keys(_datePicker2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _datePicker2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _datePicker2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhDatePicker = exports.YhDatePicker = (0, _utils.withInstall)(_datePicker.default);
module.exports = YhDatePicker;