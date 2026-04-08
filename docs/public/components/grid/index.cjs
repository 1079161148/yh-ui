"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhGrid: true,
  YhGridItem: true
};
module.exports = exports.YhGridItem = exports.YhGrid = void 0;
var _utils = require("@yh-ui/utils");
var _grid = _interopRequireDefault(require("./src/grid.vue"));
var _gridItem = _interopRequireDefault(require("./src/grid-item.vue"));
var _grid2 = require("./src/grid.cjs");
Object.keys(_grid2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _grid2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _grid2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhGrid = exports.YhGrid = (0, _utils.withInstall)(_grid.default);
const YhGridItem = exports.YhGridItem = (0, _utils.withInstall)(_gridItem.default);
module.exports = YhGrid;