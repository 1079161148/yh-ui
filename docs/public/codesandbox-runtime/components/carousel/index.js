import { withInstall, withNoopInstall } from "../../utils/index.js";
import Carousel from "./src/carousel.js";
import CarouselItem from "./src/carousel-item.js";
const YhCarousel = withInstall(Carousel, {
  CarouselItem
});
var stdin_default = YhCarousel;
const YhCarouselItem = withNoopInstall(CarouselItem);
export * from "./src/carousel-meta.js";
export * from "./src/carousel-item-meta.js";
export {
  YhCarousel,
  YhCarouselItem,
  stdin_default as default
};
