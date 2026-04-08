"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhPagination: true
};
module.exports = exports.YhPagination = void 0;
var _utils = require("@yh-ui/utils");
var _pagination = _interopRequireDefault(require("./src/pagination.vue"));
var _pagination2 = require("./src/pagination.cjs");
Object.keys(_pagination2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _pagination2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pagination2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhPagination = exports.YhPagination = (0, _utils.withInstall)(_pagination.default);
module.exports = YhPagination;