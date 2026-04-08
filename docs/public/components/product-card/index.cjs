"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhProductCard: true
};
module.exports = exports.YhProductCard = void 0;
var _utils = require("@yh-ui/utils");
var _productCard = _interopRequireDefault(require("./src/product-card.vue"));
var _productCard2 = require("./src/product-card.cjs");
Object.keys(_productCard2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _productCard2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _productCard2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhProductCard = exports.YhProductCard = (0, _utils.withInstall)(_productCard.default);
module.exports = YhProductCard;