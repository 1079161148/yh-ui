"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSkuSelector: true
};
module.exports = exports.YhSkuSelector = void 0;
var _utils = require("@yh-ui/utils");
var _skuSelector = _interopRequireDefault(require("./src/sku-selector.vue"));
var _skuSelector2 = require("./src/sku-selector.cjs");
Object.keys(_skuSelector2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skuSelector2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skuSelector2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSkuSelector = exports.YhSkuSelector = (0, _utils.withInstall)(_skuSelector.default);
module.exports = YhSkuSelector;