"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCategoryNav: true
};
module.exports = exports.YhCategoryNav = void 0;
var _utils = require("@yh-ui/utils");
var _categoryNav = _interopRequireDefault(require("./src/category-nav.vue"));
var _categoryNav2 = require("./src/category-nav.cjs");
Object.keys(_categoryNav2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _categoryNav2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _categoryNav2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCategoryNav = exports.YhCategoryNav = (0, _utils.withInstall)(_categoryNav.default);
module.exports = YhCategoryNav;