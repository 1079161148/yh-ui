"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTreeSelect: true
};
module.exports = exports.YhTreeSelect = void 0;
var _utils = require("@yh-ui/utils");
var _treeSelect = _interopRequireDefault(require("./src/tree-select.vue"));
var _treeSelect2 = require("./src/tree-select.cjs");
Object.keys(_treeSelect2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _treeSelect2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _treeSelect2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTreeSelect = exports.YhTreeSelect = (0, _utils.withInstall)(_treeSelect.default);
module.exports = YhTreeSelect;