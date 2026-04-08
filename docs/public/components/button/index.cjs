"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhButton: true
};
module.exports = exports.YhButton = void 0;
var _utils = require("@yh-ui/utils");
var _button = _interopRequireDefault(require("./src/button.vue"));
var _button2 = require("./src/button.cjs");
Object.keys(_button2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _button2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _button2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhButton = exports.YhButton = (0, _utils.withInstall)(_button.default);
module.exports = YhButton;