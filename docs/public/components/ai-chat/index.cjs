"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiChat: true
};
module.exports = exports.YhAiChat = void 0;
var _utils = require("@yh-ui/utils");
var _aiChat = _interopRequireDefault(require("./src/ai-chat.vue"));
var _aiChat2 = require("./src/ai-chat.cjs");
Object.keys(_aiChat2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiChat2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiChat2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiChat = exports.YhAiChat = (0, _utils.withInstall)(_aiChat.default);
module.exports = YhAiChat;