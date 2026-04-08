"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhDialog: true,
  YhDialogMethod: true
};
module.exports = exports.YhDialogMethod = exports.YhDialog = void 0;
var _utils = require("@yh-ui/utils");
var _dialog = _interopRequireDefault(require("./src/dialog.vue"));
var _method = _interopRequireDefault(require("./src/method.cjs"));
var _dialog2 = require("./src/dialog.cjs");
Object.keys(_dialog2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dialog2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialog2[key];
    }
  });
});
var _useDialog = require("./src/use-dialog.cjs");
Object.keys(_useDialog).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useDialog[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useDialog[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhDialog = exports.YhDialog = (0, _utils.withInstall)(_dialog.default);
const YhDialogMethod = exports.YhDialogMethod = (0, _utils.withInstallFunction)(_method.default, "$dialog");
module.exports = YhDialog;