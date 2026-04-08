"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSwitch: true
};
module.exports = exports.YhSwitch = void 0;
var _utils = require("@yh-ui/utils");
var _switch = _interopRequireDefault(require("./src/switch.vue"));
var _switch2 = require("./src/switch.cjs");
Object.keys(_switch2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _switch2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _switch2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSwitch = exports.YhSwitch = (0, _utils.withInstall)(_switch.default);
module.exports = YhSwitch;