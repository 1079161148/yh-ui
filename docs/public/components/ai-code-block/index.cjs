"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiCodeBlock: true
};
module.exports = exports.YhAiCodeBlock = void 0;
var _utils = require("@yh-ui/utils");
var _aiCodeBlock = _interopRequireDefault(require("./src/ai-code-block.vue"));
var _aiCodeBlock2 = require("./src/ai-code-block.cjs");
Object.keys(_aiCodeBlock2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiCodeBlock2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiCodeBlock2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiCodeBlock = exports.YhAiCodeBlock = (0, _utils.withInstall)(_aiCodeBlock.default);
module.exports = YhAiCodeBlock;