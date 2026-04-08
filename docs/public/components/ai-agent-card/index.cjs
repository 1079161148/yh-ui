"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiAgentCard: true
};
module.exports = exports.YhAiAgentCard = void 0;
var _utils = require("@yh-ui/utils");
var _aiAgentCard = _interopRequireDefault(require("./src/ai-agent-card.vue"));
var _aiAgentCard2 = require("./src/ai-agent-card.cjs");
Object.keys(_aiAgentCard2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiAgentCard2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiAgentCard2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiAgentCard = exports.YhAiAgentCard = (0, _utils.withInstall)(_aiAgentCard.default);
module.exports = YhAiAgentCard;