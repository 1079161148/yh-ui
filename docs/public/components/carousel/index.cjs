"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhCarousel: true,
  YhCarouselItem: true
};
module.exports = exports.YhCarouselItem = exports.YhCarousel = void 0;
var _utils = require("@yh-ui/utils");
var _carousel = _interopRequireDefault(require("./src/carousel.vue"));
var _carouselItem = _interopRequireDefault(require("./src/carousel-item.vue"));
var _carousel2 = require("./src/carousel.cjs");
Object.keys(_carousel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _carousel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _carousel2[key];
    }
  });
});
var _carouselItem2 = require("./src/carousel-item.cjs");
Object.keys(_carouselItem2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _carouselItem2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _carouselItem2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhCarousel = exports.YhCarousel = (0, _utils.withInstall)(_carousel.default, {
  CarouselItem: _carouselItem.default
});
module.exports = YhCarousel;
const YhCarouselItem = exports.YhCarouselItem = (0, _utils.withNoopInstall)(_carouselItem.default);