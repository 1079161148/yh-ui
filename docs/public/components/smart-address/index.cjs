"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSmartAddress: true
};
module.exports = exports.YhSmartAddress = void 0;
var _utils = require("@yh-ui/utils");
var _smartAddress = _interopRequireDefault(require("./src/smart-address.vue"));
var _smartAddress2 = require("./src/smart-address.cjs");
Object.keys(_smartAddress2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _smartAddress2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _smartAddress2[key];
    }
  });
});
var _useAddressParser = require("./src/use-address-parser.cjs");
Object.keys(_useAddressParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useAddressParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useAddressParser[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSmartAddress = exports.YhSmartAddress = (0, _utils.withInstall)(_smartAddress.default);
module.exports = YhSmartAddress;