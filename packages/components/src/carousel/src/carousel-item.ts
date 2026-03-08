/**
 * Carousel Item Props
 */
import type { ExtractPropTypes } from 'vue'

export const carouselItemProps = {
  /** 名称，用于通过索引跳转 */
  name: String
} as const

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>
