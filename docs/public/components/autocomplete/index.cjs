"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhAutocomplete: true
};
module.exports = exports.YhAutocomplete = void 0;
var _utils = require("@yh-ui/utils");
var _autocomplete = _interopRequireDefault(require("./src/autocomplete.vue"));
var _autocomplete2 = require("./src/autocomplete.cjs");
Object.keys(_autocomplete2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _autocomplete2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _autocomplete2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhAutocomplete = exports.YhAutocomplete = (0, _utils.withInstall)(_autocomplete.default);
module.exports = YhAutocomplete;