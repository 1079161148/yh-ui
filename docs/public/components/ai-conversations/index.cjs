"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiConversations: true
};
module.exports = exports.YhAiConversations = void 0;
var _utils = require("@yh-ui/utils");
var _aiConversations = _interopRequireDefault(require("./src/ai-conversations.vue"));
var _aiConversations2 = require("./src/ai-conversations.cjs");
Object.keys(_aiConversations2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiConversations2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiConversations2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiConversations = exports.YhAiConversations = (0, _utils.withInstall)(_aiConversations.default);
module.exports = YhAiConversations;