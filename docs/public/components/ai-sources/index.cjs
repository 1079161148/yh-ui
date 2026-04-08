"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiSources: true
};
module.exports = exports.YhAiSources = void 0;
var _utils = require("@yh-ui/utils");
var _aiSources = _interopRequireDefault(require("./src/ai-sources.vue"));
var _aiSources2 = require("./src/ai-sources.cjs");
Object.keys(_aiSources2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiSources2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiSources2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiSources = exports.YhAiSources = (0, _utils.withInstall)(_aiSources.default);
module.exports = YhAiSources;