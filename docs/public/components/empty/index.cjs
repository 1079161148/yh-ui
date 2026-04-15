"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhEmpty: true
};
module.exports = exports.YhEmpty = void 0;
var _utils = require("@yh-ui/utils");
var _empty = _interopRequireDefault(require("./src/empty.vue"));
var _empty2 = require("./src/empty.cjs");
Object.keys(_empty2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _empty2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _empty2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhEmpty = exports.YhEmpty = (0, _utils.withInstall)(_empty.default);
module.exports = YhEmpty;