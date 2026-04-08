"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhMenu: true,
  YhMenuItem: true,
  YhMenuItemGroup: true,
  YhSubMenu: true
};
module.exports = exports.YhSubMenu = exports.YhMenuItemGroup = exports.YhMenuItem = exports.YhMenu = void 0;
var _utils = require("@yh-ui/utils");
var _menu = _interopRequireDefault(require("./src/menu.vue"));
var _menuItem = _interopRequireDefault(require("./src/menu-item.vue"));
var _menuItemGroup = _interopRequireDefault(require("./src/menu-item-group.vue"));
var _subMenu = _interopRequireDefault(require("./src/sub-menu.vue"));
var _menu2 = require("./src/menu.cjs");
Object.keys(_menu2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _menu2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _menu2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhMenu = exports.YhMenu = (0, _utils.withInstall)(_menu.default);
const YhMenuItem = exports.YhMenuItem = (0, _utils.withInstall)(_menuItem.default);
const YhMenuItemGroup = exports.YhMenuItemGroup = (0, _utils.withInstall)(_menuItemGroup.default);
const YhSubMenu = exports.YhSubMenu = (0, _utils.withInstall)(_subMenu.default);
module.exports = YhMenu;