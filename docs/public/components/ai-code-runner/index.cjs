"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiCodeRunner: true
};
module.exports = exports.YhAiCodeRunner = void 0;
var _utils = require("@yh-ui/utils");
var _aiCodeRunner = _interopRequireDefault(require("./src/ai-code-runner.vue"));
var _aiCodeRunner2 = require("./src/ai-code-runner.cjs");
Object.keys(_aiCodeRunner2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiCodeRunner2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiCodeRunner2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiCodeRunner = exports.YhAiCodeRunner = (0, _utils.withInstall)(_aiCodeRunner.default);
module.exports = YhAiCodeRunner;