"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhInput: true
};
module.exports = exports.YhInput = void 0;
var _utils = require("@yh-ui/utils");
var _input = _interopRequireDefault(require("./src/input.vue"));
var _input2 = require("./src/input.cjs");
Object.keys(_input2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _input2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _input2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhInput = exports.YhInput = (0, _utils.withInstall)(_input.default);
module.exports = YhInput;