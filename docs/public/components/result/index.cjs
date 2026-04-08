"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhResult: true
};
module.exports = exports.YhResult = void 0;
var _utils = require("@yh-ui/utils");
var _result = _interopRequireDefault(require("./src/result.vue"));
var _result2 = require("./src/result.cjs");
Object.keys(_result2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _result2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _result2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhResult = exports.YhResult = (0, _utils.withInstall)(_result.default);
module.exports = YhResult;