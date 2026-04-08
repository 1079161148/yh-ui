"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTree: true,
  YhTreeNode: true
};
module.exports = exports.YhTreeNode = exports.YhTree = void 0;
var _utils = require("@yh-ui/utils");
var _tree = _interopRequireDefault(require("./src/tree.vue"));
var _treeNode = _interopRequireDefault(require("./src/tree-node.vue"));
var _tree2 = require("./src/tree.cjs");
Object.keys(_tree2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tree2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tree2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTree = exports.YhTree = (0, _utils.withInstall)(_tree.default);
const YhTreeNode = exports.YhTreeNode = (0, _utils.withInstall)(_treeNode.default);
module.exports = YhTree;