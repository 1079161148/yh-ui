"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhInfiniteScroll: true,
  vYhInfiniteScroll: true
};
exports.vYhInfiniteScroll = exports.default = exports.YhInfiniteScroll = void 0;
var _utils = require("@yh-ui/utils");
var _infiniteScroll = _interopRequireDefault(require("./src/infinite-scroll.vue"));
var _directive = require("./src/directive.cjs");
Object.keys(_directive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _directive[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _directive[key];
    }
  });
});
var _infiniteScroll2 = require("./src/infinite-scroll.cjs");
Object.keys(_infiniteScroll2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _infiniteScroll2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _infiniteScroll2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhInfiniteScroll = exports.YhInfiniteScroll = (0, _utils.withInstall)(_infiniteScroll.default, {
  directive: _directive.vInfiniteScroll
});
const vYhInfiniteScroll = exports.vYhInfiniteScroll = (0, _utils.withInstallDirective)(_directive.vInfiniteScroll, "infinite-scroll");
module.exports = YhInfiniteScroll;