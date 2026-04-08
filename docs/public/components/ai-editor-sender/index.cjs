"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiEditorSender: true
};
module.exports = exports.YhAiEditorSender = void 0;
var _utils = require("@yh-ui/utils");
var _aiEditorSender = _interopRequireDefault(require("./src/ai-editor-sender.vue"));
var _aiEditorSender2 = require("./src/ai-editor-sender.cjs");
Object.keys(_aiEditorSender2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiEditorSender2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiEditorSender2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiEditorSender = exports.YhAiEditorSender = (0, _utils.withInstall)(_aiEditorSender.default);
module.exports = YhAiEditorSender;