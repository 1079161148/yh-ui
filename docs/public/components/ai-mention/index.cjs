"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiMention: true
};
module.exports = exports.YhAiMention = void 0;
var _utils = require("@yh-ui/utils");
var _aiMention = _interopRequireDefault(require("./src/ai-mention.vue"));
var _aiMention2 = require("./src/ai-mention.cjs");
Object.keys(_aiMention2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiMention2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiMention2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiMention = exports.YhAiMention = (0, _utils.withInstall)(_aiMention.default);
module.exports = YhAiMention;