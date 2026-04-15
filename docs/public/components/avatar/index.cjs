"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAvatar: true
};
module.exports = exports.YhAvatar = void 0;
var _utils = require("@yh-ui/utils");
var _avatar = _interopRequireDefault(require("./src/avatar.vue"));
var _avatar2 = require("./src/avatar.cjs");
Object.keys(_avatar2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _avatar2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _avatar2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAvatar = exports.YhAvatar = (0, _utils.withInstall)(_avatar.default);
module.exports = YhAvatar;