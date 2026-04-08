"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSpin: true
};
module.exports = exports.YhSpin = void 0;
var _utils = require("@yh-ui/utils");
var _spin = _interopRequireDefault(require("./src/spin.vue"));
var _spin2 = require("./src/spin.cjs");
Object.keys(_spin2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _spin2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spin2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSpin = exports.YhSpin = (0, _utils.withInstall)(_spin.default);
module.exports = YhSpin;