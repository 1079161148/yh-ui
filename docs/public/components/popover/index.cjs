"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhPopover: true
};
module.exports = exports.YhPopover = void 0;
var _utils = require("@yh-ui/utils");
var _popover = _interopRequireDefault(require("./src/popover.vue"));
var _popover2 = require("./src/popover.cjs");
Object.keys(_popover2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _popover2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _popover2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhPopover = exports.YhPopover = (0, _utils.withInstall)(_popover.default);
module.exports = YhPopover;