"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiWelcome: true
};
module.exports = exports.YhAiWelcome = void 0;
var _utils = require("@yh-ui/utils");
var _aiWelcome = _interopRequireDefault(require("./src/ai-welcome.vue"));
var _aiWelcome2 = require("./src/ai-welcome.cjs");
Object.keys(_aiWelcome2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiWelcome2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiWelcome2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiWelcome = exports.YhAiWelcome = (0, _utils.withInstall)(_aiWelcome.default);
module.exports = YhAiWelcome;