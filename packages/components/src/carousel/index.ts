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
export type YhCarouselInstance = CarouselInstance

export type CarouselItemInstance = InstanceType<typeof CarouselItem>
export type YhCarouselItemInstance = CarouselItemInstance

export type { CarouselProps } from './src/carousel'
export type YhCarouselProps = import('./src/carousel').CarouselProps
export type { CarouselItemProps } from './src/carousel-item'
export type YhCarouselItemProps = import('./src/carousel-item').CarouselItemProps
