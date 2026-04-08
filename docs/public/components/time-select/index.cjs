"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTimeSelect: true
};
module.exports = exports.YhTimeSelect = void 0;
var _utils = require("@yh-ui/utils");
var _timeSelect = _interopRequireDefault(require("./src/time-select.vue"));
var _timeSelect2 = require("./src/time-select.cjs");
Object.keys(_timeSelect2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _timeSelect2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _timeSelect2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTimeSelect = exports.YhTimeSelect = (0, _utils.withInstall)(_timeSelect.default);
module.exports = YhTimeSelect;