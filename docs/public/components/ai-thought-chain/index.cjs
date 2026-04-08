"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiThoughtChain: true
};
module.exports = exports.YhAiThoughtChain = void 0;
var _utils = require("@yh-ui/utils");
var _aiThoughtChain = _interopRequireDefault(require("./src/ai-thought-chain.vue"));
var _aiThoughtChain2 = require("./src/ai-thought-chain.cjs");
Object.keys(_aiThoughtChain2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiThoughtChain2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiThoughtChain2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiThoughtChain = exports.YhAiThoughtChain = (0, _utils.withInstall)(_aiThoughtChain.default);
module.exports = YhAiThoughtChain;