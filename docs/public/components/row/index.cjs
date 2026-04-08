"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhRow: true
};
module.exports = exports.YhRow = void 0;
var _utils = require("@yh-ui/utils");
var _row = _interopRequireDefault(require("./src/row.vue"));
var _row2 = require("./src/row.cjs");
Object.keys(_row2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _row2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _row2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhRow = exports.YhRow = (0, _utils.withInstall)(_row.default);
module.exports = YhRow;