"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhWatermark: true
};
module.exports = exports.YhWatermark = void 0;
var _utils = require("@yh-ui/utils");
var _watermark = _interopRequireDefault(require("./src/watermark.vue"));
var _watermark2 = require("./src/watermark.cjs");
Object.keys(_watermark2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _watermark2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _watermark2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhWatermark = exports.YhWatermark = (0, _utils.withInstall)(_watermark.default);
module.exports = YhWatermark;