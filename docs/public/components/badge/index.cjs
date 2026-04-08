"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhBadge: true
};
module.exports = exports.YhBadge = void 0;
var _utils = require("@yh-ui/utils");
var _badge = _interopRequireDefault(require("./src/badge.vue"));
var _badge2 = require("./src/badge.cjs");
Object.keys(_badge2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _badge2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _badge2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhBadge = exports.YhBadge = (0, _utils.withInstall)(_badge.default);
module.exports = YhBadge;