"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCard: true
};
module.exports = exports.YhCard = void 0;
var _utils = require("@yh-ui/utils");
var _card = _interopRequireDefault(require("./src/card.vue"));
var _card2 = require("./src/card.cjs");
Object.keys(_card2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _card2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _card2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCard = exports.YhCard = (0, _utils.withInstall)(_card.default);
module.exports = YhCard;