"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiAttachments: true
};
module.exports = exports.YhAiAttachments = void 0;
var _utils = require("@yh-ui/utils");
var _aiAttachments = _interopRequireDefault(require("./src/ai-attachments.vue"));
var _aiAttachments2 = require("./src/ai-attachments.cjs");
Object.keys(_aiAttachments2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiAttachments2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiAttachments2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiAttachments = exports.YhAiAttachments = (0, _utils.withInstall)(_aiAttachments.default);
module.exports = YhAiAttachments;