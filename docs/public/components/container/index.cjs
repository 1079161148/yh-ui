"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhContainer: true,
  YhHeader: true,
  YhAside: true,
  YhMain: true,
  YhFooter: true
};
module.exports = exports.YhMain = exports.YhHeader = exports.YhFooter = exports.YhContainer = exports.YhAside = void 0;
var _utils = require("@yh-ui/utils");
var _container = _interopRequireDefault(require("./src/container.vue"));
var _header = _interopRequireDefault(require("./src/header.vue"));
var _aside = _interopRequireDefault(require("./src/aside.vue"));
var _main = _interopRequireDefault(require("./src/main.vue"));
var _footer = _interopRequireDefault(require("./src/footer.vue"));
var _container2 = require("./src/container.cjs");
Object.keys(_container2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _container2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _container2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhContainer = exports.YhContainer = (0, _utils.withInstall)(_container.default);
const YhHeader = exports.YhHeader = (0, _utils.withInstall)(_header.default);
const YhAside = exports.YhAside = (0, _utils.withInstall)(_aside.default);
const YhMain = exports.YhMain = (0, _utils.withInstall)(_main.default);
const YhFooter = exports.YhFooter = (0, _utils.withInstall)(_footer.default);
module.exports = YhContainer;