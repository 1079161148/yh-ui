"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSubmitBar: true
};
module.exports = exports.YhSubmitBar = void 0;
var _utils = require("@yh-ui/utils");
var _submitBar = _interopRequireDefault(require("./src/submit-bar.vue"));
var _submitBar2 = require("./src/submit-bar.cjs");
Object.keys(_submitBar2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _submitBar2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _submitBar2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSubmitBar = exports.YhSubmitBar = (0, _utils.withInstall)(_submitBar.default);
module.exports = YhSubmitBar;