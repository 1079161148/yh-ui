"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAffix: true
};
module.exports = exports.YhAffix = void 0;
var _utils = require("@yh-ui/utils");
var _affix = _interopRequireDefault(require("./src/affix.vue"));
var _affix2 = require("./src/affix.cjs");
Object.keys(_affix2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _affix2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _affix2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAffix = exports.YhAffix = (0, _utils.withInstall)(_affix.default);
module.exports = YhAffix;