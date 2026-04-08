"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiBubbleList: true
};
module.exports = exports.YhAiBubbleList = void 0;
var _utils = require("@yh-ui/utils");
var _aiBubbleList = _interopRequireDefault(require("./src/ai-bubble-list.vue"));
var _aiBubbleList2 = require("./src/ai-bubble-list.cjs");
Object.keys(_aiBubbleList2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiBubbleList2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiBubbleList2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiBubbleList = exports.YhAiBubbleList = (0, _utils.withInstall)(_aiBubbleList.default);
module.exports = YhAiBubbleList;