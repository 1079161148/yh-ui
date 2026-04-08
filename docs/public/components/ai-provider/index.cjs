"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiProvider: true
};
module.exports = exports.YhAiProvider = void 0;
var _utils = require("@yh-ui/utils");
var _aiProvider = _interopRequireDefault(require("./src/ai-provider.vue"));
var _aiProvider2 = require("./src/ai-provider.cjs");
Object.keys(_aiProvider2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiProvider2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiProvider2[key];
    }
  });
});
var _useAiProvider = require("./src/use-ai-provider.cjs");
Object.keys(_useAiProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useAiProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useAiProvider[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiProvider = exports.YhAiProvider = (0, _utils.withInstall)(_aiProvider.default);
module.exports = YhAiProvider;