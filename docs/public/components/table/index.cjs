"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTable: true,
  YhTableColumn: true
};
module.exports = exports.YhTableColumn = exports.YhTable = void 0;
var _utils = require("@yh-ui/utils");
var _table = _interopRequireDefault(require("./src/table.vue"));
var _tableColumn = _interopRequireDefault(require("./src/table-column.vue"));
var _table2 = require("./src/table.cjs");
Object.keys(_table2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _table2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _table2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTable = exports.YhTable = (0, _utils.withInstall)(_table.default, {
  TableColumn: _tableColumn.default
});
const YhTableColumn = exports.YhTableColumn = (0, _utils.withNoopInstall)(_tableColumn.default);
module.exports = YhTable;