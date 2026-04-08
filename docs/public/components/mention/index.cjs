"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhMention: true
};
module.exports = exports.YhMention = void 0;
var _utils = require("@yh-ui/utils");
var _mention = _interopRequireDefault(require("./src/mention.vue"));
var _mention2 = require("./src/mention.cjs");
Object.keys(_mention2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mention2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mention2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhMention = exports.YhMention = (0, _utils.withInstall)(_mention.default);
module.exports = YhMention;