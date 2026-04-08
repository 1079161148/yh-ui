"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhGanttChart: true
};
module.exports = exports.YhGanttChart = void 0;
var _utils = require("@yh-ui/utils");
var _ganttChart = _interopRequireDefault(require("./src/gantt-chart.vue"));
var _ganttChart2 = require("./src/gantt-chart.cjs");
Object.keys(_ganttChart2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ganttChart2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ganttChart2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhGanttChart = exports.YhGanttChart = (0, _utils.withInstall)(_ganttChart.default);
module.exports = YhGanttChart;