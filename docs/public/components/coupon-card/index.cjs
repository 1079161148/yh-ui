"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCouponCard: true
};
module.exports = exports.YhCouponCard = void 0;
var _utils = require("@yh-ui/utils");
var _couponCard = _interopRequireDefault(require("./src/coupon-card.vue"));
var _couponCard2 = require("./src/coupon-card.cjs");
Object.keys(_couponCard2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _couponCard2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _couponCard2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCouponCard = exports.YhCouponCard = (0, _utils.withInstall)(_couponCard.default);
module.exports = YhCouponCard;