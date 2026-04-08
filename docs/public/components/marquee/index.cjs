"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhMarquee: true
};
module.exports = exports.YhMarquee = void 0;
var _utils = require("@yh-ui/utils");
var _marquee = _interopRequireDefault(require("./src/marquee.vue"));
var _marquee2 = require("./src/marquee.cjs");
Object.keys(_marquee2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _marquee2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _marquee2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhMarquee = exports.YhMarquee = (0, _utils.withInstall)(_marquee.default);
module.exports = YhMarquee;