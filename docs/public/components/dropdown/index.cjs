"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhDropdown: true,
  YhDropdownItem: true,
  YhDropdownMenu: true
};
module.exports = exports.YhDropdownMenu = exports.YhDropdownItem = exports.YhDropdown = void 0;
var _utils = require("@yh-ui/utils");
var _dropdown = _interopRequireDefault(require("./src/dropdown.vue"));
var _dropdownItem = _interopRequireDefault(require("./src/dropdown-item.vue"));
var _dropdownMenu = _interopRequireDefault(require("./src/dropdown-menu.vue"));
var _dropdown2 = require("./src/dropdown.cjs");
Object.keys(_dropdown2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dropdown2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dropdown2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhDropdown = exports.YhDropdown = (0, _utils.withInstall)(_dropdown.default);
const YhDropdownItem = exports.YhDropdownItem = (0, _utils.withInstall)(_dropdownItem.default);
const YhDropdownMenu = exports.YhDropdownMenu = (0, _utils.withInstall)(_dropdownMenu.default);
module.exports = YhDropdown;