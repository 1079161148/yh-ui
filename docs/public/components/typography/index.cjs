"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTypographyTitle: true,
  YhTypographyText: true,
  YhTypographyParagraph: true,
  YhTypographyLink: true
};
module.exports = exports.YhTypographyTitle = exports.YhTypographyText = exports.YhTypographyParagraph = exports.YhTypographyLink = void 0;
var _utils = require("@yh-ui/utils");
var _title = _interopRequireDefault(require("./src/title.vue"));
var _text = _interopRequireDefault(require("./src/text.vue"));
var _paragraph = _interopRequireDefault(require("./src/paragraph.vue"));
var _link = _interopRequireDefault(require("./src/link.vue"));
var _typography = require("./src/typography.cjs");
Object.keys(_typography).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _typography[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typography[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhTypographyTitle = exports.YhTypographyTitle = (0, _utils.withInstall)(_title.default);
const YhTypographyText = exports.YhTypographyText = (0, _utils.withInstall)(_text.default);
const YhTypographyParagraph = exports.YhTypographyParagraph = (0, _utils.withInstall)(_paragraph.default);
const YhTypographyLink = exports.YhTypographyLink = (0, _utils.withInstall)(_link.default);
module.exports = YhTypographyTitle;