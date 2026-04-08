"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhLuckyDraw: true
};
module.exports = exports.YhLuckyDraw = void 0;
var _utils = require("@yh-ui/utils");
var _luckyDraw = _interopRequireDefault(require("./src/lucky-draw.vue"));
var _luckyDraw2 = require("./src/lucky-draw.cjs");
Object.keys(_luckyDraw2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _luckyDraw2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _luckyDraw2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhLuckyDraw = exports.YhLuckyDraw = (0, _utils.withInstall)(_luckyDraw.default);
module.exports = YhLuckyDraw;