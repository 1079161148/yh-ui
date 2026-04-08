"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiVoiceTrigger: true
};
module.exports = exports.YhAiVoiceTrigger = void 0;
var _utils = require("@yh-ui/utils");
var _aiVoiceTrigger = _interopRequireDefault(require("./src/ai-voice-trigger.vue"));
var _aiVoiceTrigger2 = require("./src/ai-voice-trigger.cjs");
Object.keys(_aiVoiceTrigger2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiVoiceTrigger2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiVoiceTrigger2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiVoiceTrigger = exports.YhAiVoiceTrigger = (0, _utils.withInstall)(_aiVoiceTrigger.default);
module.exports = YhAiVoiceTrigger;