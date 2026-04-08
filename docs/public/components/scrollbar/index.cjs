"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhScrollbar: true
};
module.exports = exports.YhScrollbar = void 0;
var _utils = require("@yh-ui/utils");
var _scrollbar = _interopRequireDefault(require("./src/scrollbar.vue"));
var _scrollbar2 = require("./src/scrollbar.cjs");
Object.keys(_scrollbar2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scrollbar2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scrollbar2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhScrollbar = exports.YhScrollbar = (0, _utils.withInstall)(_scrollbar.default);
module.exports = YhScrollbar;