"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCol: true
};
module.exports = exports.YhCol = void 0;
var _utils = require("@yh-ui/utils");
var _col = _interopRequireDefault(require("./src/col.vue"));
var _col2 = require("./src/col.cjs");
Object.keys(_col2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _col2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _col2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCol = exports.YhCol = (0, _utils.withInstall)(_col.default);
module.exports = YhCol;