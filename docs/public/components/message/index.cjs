"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhMessage: true
};
module.exports = exports.YhMessage = void 0;
var _method = _interopRequireDefault(require("./src/method.cjs"));
var _message = require("./src/message.cjs");
Object.keys(_message).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _message[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _message[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhMessage = exports.YhMessage = _method.default;
module.exports = YhMessage;