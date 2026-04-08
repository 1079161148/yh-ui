"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhImageMagnifier: true
};
module.exports = exports.YhImageMagnifier = void 0;
var _utils = require("@yh-ui/utils");
var _imageMagnifier = _interopRequireDefault(require("./src/image-magnifier.vue"));
var _imageMagnifier2 = require("./src/image-magnifier.cjs");
Object.keys(_imageMagnifier2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _imageMagnifier2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _imageMagnifier2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhImageMagnifier = exports.YhImageMagnifier = (0, _utils.withInstall)(_imageMagnifier.default);
module.exports = YhImageMagnifier;