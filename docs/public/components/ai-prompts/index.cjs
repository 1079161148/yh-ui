"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiPrompts: true
};
module.exports = exports.YhAiPrompts = void 0;
var _utils = require("@yh-ui/utils");
var _aiPrompts = _interopRequireDefault(require("./src/ai-prompts.vue"));
var _aiPrompts2 = require("./src/ai-prompts.cjs");
Object.keys(_aiPrompts2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiPrompts2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiPrompts2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiPrompts = exports.YhAiPrompts = (0, _utils.withInstall)(_aiPrompts.default);
module.exports = YhAiPrompts;