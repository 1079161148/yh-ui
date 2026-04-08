"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhProgress: true
};
module.exports = exports.YhProgress = void 0;
var _utils = require("@yh-ui/utils");
var _progress = _interopRequireDefault(require("./src/progress.vue"));
var _progress2 = require("./src/progress.cjs");
Object.keys(_progress2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _progress2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _progress2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhProgress = exports.YhProgress = (0, _utils.withInstall)(_progress.default);
module.exports = YhProgress;