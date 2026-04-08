"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhUpload: true
};
module.exports = exports.YhUpload = void 0;
var _utils = require("@yh-ui/utils");
var _upload = _interopRequireDefault(require("./src/upload.vue"));
var _upload2 = require("./src/upload.cjs");
Object.keys(_upload2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _upload2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _upload2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhUpload = exports.YhUpload = (0, _utils.withInstall)(_upload.default);
module.exports = YhUpload;