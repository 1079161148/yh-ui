import { withInstall, withNoopInstall } from '@yh-ui/utils'
import Carousel from './src/carousel.vue'
import CarouselItem from './src/carousel-item.vue'

export const YhCarousel = withInstall(Carousel, {
  CarouselItem
})
export default YhCarousel

export const YhCarouselItem = withNoopInstall(CarouselItem)

export * from './src/carousel'
export * from './src/carousel-item'

export type CarouselInstance = InstanceType<typeof Carousel>
export type CarouselItemInstance = InstanceType<typeof CarouselItem>
