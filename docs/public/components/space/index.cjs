"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSpace: true
};
module.exports = exports.YhSpace = void 0;
var _utils = require("@yh-ui/utils");
var _space = _interopRequireDefault(require("./src/space.vue"));
var _space2 = require("./src/space.cjs");
Object.keys(_space2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _space2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _space2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSpace = exports.YhSpace = (0, _utils.withInstall)(_space.default);
module.exports = YhSpace;