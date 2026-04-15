/**
 * Carousel Item Props
 */
import type { ExtractPropTypes } from 'vue'
export declare const carouselItemProps: {
  /** 名称，用于通过索引跳转 */
  readonly name: StringConstructor
}
export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>
export interface CarouselItemSlots {
  default?: () => unknown
}
