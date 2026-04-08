"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiMermaid: true
};
module.exports = exports.YhAiMermaid = void 0;
var _utils = require("@yh-ui/utils");
var _aiMermaid = _interopRequireDefault(require("./src/ai-mermaid.vue"));
var _aiMermaid2 = require("./src/ai-mermaid.cjs");
Object.keys(_aiMermaid2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiMermaid2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiMermaid2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiMermaid = exports.YhAiMermaid = (0, _utils.withInstall)(_aiMermaid.default);
module.exports = YhAiMermaid;