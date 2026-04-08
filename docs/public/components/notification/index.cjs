"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhNotification: true
};
module.exports = exports.YhNotification = void 0;
var _method = _interopRequireDefault(require("./src/method.cjs"));
var _notification = require("./src/notification.cjs");
Object.keys(_notification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _notification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _notification[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhNotification = exports.YhNotification = _method.default;
module.exports = YhNotification;