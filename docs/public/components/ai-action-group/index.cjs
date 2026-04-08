"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiActionGroup: true
};
module.exports = exports.YhAiActionGroup = void 0;
var _utils = require("@yh-ui/utils");
var _aiActionGroup = _interopRequireDefault(require("./src/ai-action-group.vue"));
var _aiActionGroup2 = require("./src/ai-action-group.cjs");
Object.keys(_aiActionGroup2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiActionGroup2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiActionGroup2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiActionGroup = exports.YhAiActionGroup = (0, _utils.withInstall)(_aiActionGroup.default);
module.exports = YhAiActionGroup;