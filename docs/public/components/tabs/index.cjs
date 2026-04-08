"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTabs: true,
  YhTabPane: true
};
module.exports = exports.YhTabs = exports.YhTabPane = void 0;
var _utils = require("@yh-ui/utils");
var _tabs = _interopRequireDefault(require("./src/tabs.vue"));
var _tabPane = _interopRequireDefault(require("./src/tab-pane.vue"));
var _tabs2 = require("./src/tabs.cjs");
Object.keys(_tabs2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabs2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabs2[key];
    }
  });
});
var _tabPane2 = require("./src/tab-pane.cjs");
Object.keys(_tabPane2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabPane2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabPane2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTabs = exports.YhTabs = (0, _utils.withInstall)(_tabs.default, {
  TabPane: _tabPane.default
});
const YhTabPane = exports.YhTabPane = (0, _utils.withNoopInstall)(_tabPane.default);
module.exports = YhTabs;