"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhIcon: true
};
module.exports = exports.YhIcon = void 0;
var _utils = require("@yh-ui/utils");
var _icon = _interopRequireDefault(require("./src/icon.vue"));
require("./src/icon.css");
var _icons = require("./src/icons/index.cjs");
Object.keys(_icons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _icons[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _icons[key];
    }
  });
});
var _icon3 = require("./src/icon.cjs");
Object.keys(_icon3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _icon3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _icon3[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhIcon = exports.YhIcon = (0, _utils.withInstall)(_icon.default);
module.exports = YhIcon;