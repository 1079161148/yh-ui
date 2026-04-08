"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSteps: true,
  YhStep: true
};
module.exports = exports.YhSteps = exports.YhStep = void 0;
var _utils = require("@yh-ui/utils");
var _steps = _interopRequireDefault(require("./src/steps.vue"));
var _step = _interopRequireDefault(require("./src/step.vue"));
var _steps2 = require("./src/steps.cjs");
Object.keys(_steps2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _steps2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _steps2[key];
    }
  });
});
var _step2 = require("./src/step.cjs");
Object.keys(_step2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _step2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _step2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSteps = exports.YhSteps = (0, _utils.withInstall)(_steps.default, {
  Step: _step.default
});
const YhStep = exports.YhStep = (0, _utils.withNoopInstall)(_step.default);
module.exports = YhSteps;