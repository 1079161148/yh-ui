"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAiFileCard: true
};
module.exports = exports.YhAiFileCard = void 0;
var _utils = require("@yh-ui/utils");
var _aiFileCard = _interopRequireDefault(require("./src/ai-file-card.vue"));
var _aiFileCard2 = require("./src/ai-file-card.cjs");
Object.keys(_aiFileCard2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _aiFileCard2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _aiFileCard2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAiFileCard = exports.YhAiFileCard = (0, _utils.withInstall)(_aiFileCard.default);
module.exports = YhAiFileCard;