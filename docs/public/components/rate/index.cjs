"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhRate: true
};
module.exports = exports.YhRate = void 0;
var _utils = require("@yh-ui/utils");
var _rate = _interopRequireDefault(require("./src/rate.vue"));
var _rate2 = require("./src/rate.cjs");
Object.keys(_rate2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _rate2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rate2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhRate = exports.YhRate = (0, _utils.withInstall)(_rate.default);
module.exports = YhRate;