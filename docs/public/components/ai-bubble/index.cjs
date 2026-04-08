"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiBubble: true
};
module.exports = exports.YhAiBubble = void 0;
var _utils = require("@yh-ui/utils");
var _aiBubble = _interopRequireDefault(require("./src/ai-bubble.vue"));
var _aiBubble2 = require("./src/ai-bubble.cjs");
Object.keys(_aiBubble2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiBubble2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiBubble2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiBubble = exports.YhAiBubble = (0, _utils.withInstall)(_aiBubble.default);
module.exports = YhAiBubble;