"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhInputNumber: true
};
module.exports = exports.YhInputNumber = void 0;
var _utils = require("@yh-ui/utils");
var _inputNumber = _interopRequireDefault(require("./src/input-number.vue"));
var _inputNumber2 = require("./src/input-number.cjs");
Object.keys(_inputNumber2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _inputNumber2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inputNumber2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhInputNumber = exports.YhInputNumber = (0, _utils.withInstall)(_inputNumber.default);
module.exports = YhInputNumber;