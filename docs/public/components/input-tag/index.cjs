"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhInputTag: true
};
module.exports = exports.YhInputTag = void 0;
var _utils = require("@yh-ui/utils");
var _inputTag = _interopRequireDefault(require("./src/input-tag.vue"));
var _inputTag2 = require("./src/input-tag.cjs");
Object.keys(_inputTag2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _inputTag2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inputTag2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhInputTag = exports.YhInputTag = (0, _utils.withInstall)(_inputTag.default);
module.exports = YhInputTag;