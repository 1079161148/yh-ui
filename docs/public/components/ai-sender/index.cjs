"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiSender: true
};
module.exports = exports.YhAiSender = void 0;
var _utils = require("@yh-ui/utils");
var _aiSender = _interopRequireDefault(require("./src/ai-sender.vue"));
var _aiSender2 = require("./src/ai-sender.cjs");
Object.keys(_aiSender2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiSender2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiSender2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiSender = exports.YhAiSender = (0, _utils.withInstall)(_aiSender.default);
module.exports = YhAiSender;