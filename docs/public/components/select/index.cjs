"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSelect: true,
  YhOption: true
};
module.exports = exports.YhSelect = exports.YhOption = void 0;
var _utils = require("@yh-ui/utils");
var _select = _interopRequireDefault(require("./src/select.vue"));
var _option = _interopRequireDefault(require("./src/option.vue"));
var _select2 = require("./src/select.cjs");
Object.keys(_select2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _select2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _select2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSelect = exports.YhSelect = (0, _utils.withInstall)(_select.default);
const YhOption = exports.YhOption = (0, _utils.withInstall)(_option.default);
module.exports = YhSelect;