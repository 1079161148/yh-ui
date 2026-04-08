"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhPopconfirm: true
};
module.exports = exports.YhPopconfirm = void 0;
var _utils = require("@yh-ui/utils");
var _popconfirm = _interopRequireDefault(require("./src/popconfirm.vue"));
var _popconfirm2 = require("./src/popconfirm.cjs");
Object.keys(_popconfirm2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _popconfirm2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _popconfirm2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhPopconfirm = exports.YhPopconfirm = (0, _utils.withInstall)(_popconfirm.default);
module.exports = YhPopconfirm;