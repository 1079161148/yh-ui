"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCalendar: true
};
module.exports = exports.YhCalendar = void 0;
var _utils = require("@yh-ui/utils");
var _calendar = _interopRequireDefault(require("./src/calendar.vue"));
var _calendar2 = require("./src/calendar.cjs");
Object.keys(_calendar2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _calendar2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _calendar2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCalendar = exports.YhCalendar = (0, _utils.withInstall)(_calendar.default);
module.exports = YhCalendar;