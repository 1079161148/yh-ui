"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhPrice: true
};
module.exports = exports.YhPrice = void 0;
var _utils = require("@yh-ui/utils");
var _price = _interopRequireDefault(require("./src/price.vue"));
var _price2 = require("./src/price.cjs");
Object.keys(_price2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _price2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _price2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhPrice = exports.YhPrice = (0, _utils.withInstall)(_price.default);
module.exports = YhPrice;