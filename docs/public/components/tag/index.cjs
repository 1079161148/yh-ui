"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTag: true
};
module.exports = exports.YhTag = void 0;
var _utils = require("@yh-ui/utils");
var _tag = _interopRequireDefault(require("./src/tag.vue"));
var _tag2 = require("./src/tag.cjs");
Object.keys(_tag2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tag2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tag2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTag = exports.YhTag = (0, _utils.withInstall)(_tag.default);
module.exports = YhTag;