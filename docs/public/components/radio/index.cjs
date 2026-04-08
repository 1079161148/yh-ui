"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhRadio: true,
  YhRadioGroup: true,
  YhRadioButton: true
};
module.exports = exports.YhRadioGroup = exports.YhRadioButton = exports.YhRadio = void 0;
var _utils = require("@yh-ui/utils");
var _radio = _interopRequireDefault(require("./src/radio.vue"));
var _radioGroup = _interopRequireDefault(require("./src/radio-group.vue"));
var _radioButton = _interopRequireDefault(require("./src/radio-button.vue"));
var _radio2 = require("./src/radio.cjs");
Object.keys(_radio2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _radio2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _radio2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhRadio = exports.YhRadio = (0, _utils.withInstall)(_radio.default);
const YhRadioGroup = exports.YhRadioGroup = (0, _utils.withInstall)(_radioGroup.default);
const YhRadioButton = exports.YhRadioButton = (0, _utils.withInstall)(_radioButton.default);
module.exports = YhRadio;