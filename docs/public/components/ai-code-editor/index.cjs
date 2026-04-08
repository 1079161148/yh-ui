"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiCodeEditor: true
};
module.exports = exports.YhAiCodeEditor = void 0;
var _utils = require("@yh-ui/utils");
var _aiCodeEditor = _interopRequireDefault(require("./src/ai-code-editor.vue"));
var _aiCodeEditor2 = require("./src/ai-code-editor.cjs");
Object.keys(_aiCodeEditor2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiCodeEditor2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiCodeEditor2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiCodeEditor = exports.YhAiCodeEditor = (0, _utils.withInstall)(_aiCodeEditor.default);
module.exports = YhAiCodeEditor;