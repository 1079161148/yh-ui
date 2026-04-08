"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAlert: true
};
module.exports = exports.YhAlert = void 0;
var _utils = require("@yh-ui/utils");
var _alert = _interopRequireDefault(require("./src/alert.vue"));
var _alert2 = require("./src/alert.cjs");
Object.keys(_alert2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _alert2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alert2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAlert = exports.YhAlert = (0, _utils.withInstall)(_alert.default);
module.exports = YhAlert;