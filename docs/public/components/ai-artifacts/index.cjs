"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiArtifacts: true
};
module.exports = exports.YhAiArtifacts = void 0;
var _utils = require("@yh-ui/utils");
var _aiArtifacts = _interopRequireDefault(require("./src/ai-artifacts.vue"));
var _aiArtifacts2 = require("./src/ai-artifacts.cjs");
Object.keys(_aiArtifacts2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiArtifacts2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiArtifacts2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiArtifacts = exports.YhAiArtifacts = (0, _utils.withInstall)(_aiArtifacts.default);
module.exports = YhAiArtifacts;