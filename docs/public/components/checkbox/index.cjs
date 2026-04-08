"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCheckbox: true,
  YhCheckboxGroup: true
};
module.exports = exports.YhCheckboxGroup = exports.YhCheckbox = void 0;
var _utils = require("@yh-ui/utils");
var _checkbox = _interopRequireDefault(require("./src/checkbox.vue"));
var _checkboxGroup = _interopRequireDefault(require("./src/checkbox-group.vue"));
var _checkbox2 = require("./src/checkbox.cjs");
Object.keys(_checkbox2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _checkbox2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _checkbox2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCheckbox = exports.YhCheckbox = (0, _utils.withInstall)(_checkbox.default);
const YhCheckboxGroup = exports.YhCheckboxGroup = (0, _utils.withInstall)(_checkboxGroup.default);
module.exports = YhCheckbox;