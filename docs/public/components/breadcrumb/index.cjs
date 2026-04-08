"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhBreadcrumb: true,
  YhBreadcrumbItem: true
};
module.exports = exports.YhBreadcrumbItem = exports.YhBreadcrumb = void 0;
var _utils = require("@yh-ui/utils");
var _breadcrumb = _interopRequireDefault(require("./src/breadcrumb.vue"));
var _breadcrumbItem = _interopRequireDefault(require("./src/breadcrumb-item.vue"));
var _breadcrumb2 = require("./src/breadcrumb.cjs");
Object.keys(_breadcrumb2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _breadcrumb2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _breadcrumb2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhBreadcrumb = exports.YhBreadcrumb = (0, _utils.withInstall)(_breadcrumb.default, {
  BreadcrumbItem: _breadcrumbItem.default
});
const YhBreadcrumbItem = exports.YhBreadcrumbItem = (0, _utils.withNoopInstall)(_breadcrumbItem.default);
module.exports = YhBreadcrumb;