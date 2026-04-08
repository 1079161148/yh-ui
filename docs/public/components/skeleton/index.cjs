"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhSkeleton: true,
  YhSkeletonItem: true
};
module.exports = exports.YhSkeletonItem = exports.YhSkeleton = void 0;
var _utils = require("@yh-ui/utils");
var _skeleton = _interopRequireDefault(require("./src/skeleton.vue"));
var _skeletonItem = _interopRequireDefault(require("./src/skeleton-item.vue"));
var _skeleton2 = require("./src/skeleton.cjs");
Object.keys(_skeleton2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeleton2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeleton2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhSkeleton = exports.YhSkeleton = (0, _utils.withInstall)(_skeleton.default);
const YhSkeletonItem = exports.YhSkeletonItem = (0, _utils.withInstall)(_skeletonItem.default);
module.exports = YhSkeleton;