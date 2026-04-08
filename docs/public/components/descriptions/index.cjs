"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhDescriptions: true,
  YhDescriptionsItem: true
};
module.exports = exports.YhDescriptionsItem = exports.YhDescriptions = void 0;
var _utils = require("@yh-ui/utils");
var _descriptions = _interopRequireDefault(require("./src/descriptions.vue"));
var _descriptionItem = _interopRequireDefault(require("./src/description-item.vue"));
var _descriptions2 = require("./src/descriptions.cjs");
Object.keys(_descriptions2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _descriptions2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _descriptions2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhDescriptions = exports.YhDescriptions = (0, _utils.withInstall)(_descriptions.default, {
  DescriptionsItem: _descriptionItem.default
});
const YhDescriptionsItem = exports.YhDescriptionsItem = (0, _utils.withNoopInstall)(_descriptionItem.default);
module.exports = YhDescriptions;