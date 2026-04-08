"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiThinking: true
};
module.exports = exports.YhAiThinking = void 0;
var _utils = require("@yh-ui/utils");
var _aiThinking = _interopRequireDefault(require("./src/ai-thinking.vue"));
var _aiThinking2 = require("./src/ai-thinking.cjs");
Object.keys(_aiThinking2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiThinking2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiThinking2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiThinking = exports.YhAiThinking = (0, _utils.withInstall)(_aiThinking.default);
module.exports = YhAiThinking;