"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhImage: true,
  YhImageViewer: true
};
module.exports = exports.YhImageViewer = exports.YhImage = void 0;
var _utils = require("@yh-ui/utils");
var _image = _interopRequireDefault(require("./src/image.vue"));
var _imageViewer = _interopRequireDefault(require("./src/image-viewer.vue"));
var _image2 = require("./src/image.cjs");
Object.keys(_image2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _image2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _image2[key];
    }
  });
});
var _imageViewer2 = require("./src/image-viewer.cjs");
Object.keys(_imageViewer2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _imageViewer2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _imageViewer2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhImage = exports.YhImage = (0, _utils.withInstall)(_image.default);
const YhImageViewer = exports.YhImageViewer = (0, _utils.withInstall)(_imageViewer.default);
module.exports = YhImage;