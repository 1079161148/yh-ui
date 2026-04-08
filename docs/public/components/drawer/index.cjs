"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhDrawer: true
};
module.exports = exports.YhDrawer = void 0;
var _utils = require("@yh-ui/utils");
var _drawer = _interopRequireDefault(require("./src/drawer.vue"));
var _drawer2 = require("./src/drawer.cjs");
Object.keys(_drawer2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _drawer2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _drawer2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhDrawer = exports.YhDrawer = (0, _utils.withInstall)(_drawer.default);
module.exports = YhDrawer;