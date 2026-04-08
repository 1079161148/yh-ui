"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhFilterBar: true
};
module.exports = exports.YhFilterBar = void 0;
var _utils = require("@yh-ui/utils");
var _filterBar = _interopRequireDefault(require("./src/filter-bar.vue"));
var _filterBar2 = require("./src/filter-bar.cjs");
Object.keys(_filterBar2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _filterBar2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filterBar2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhFilterBar = exports.YhFilterBar = (0, _utils.withInstall)(_filterBar.default);
module.exports = YhFilterBar;