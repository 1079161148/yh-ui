/**
 * Image Types & Props
 * @description 图片组件类型定义
 */

import type { ExtractPropTypes, PropType } from 'vue'

export const imageFits = ['', 'contain', 'cover', 'fill', 'none', 'scale-down'] as const
export type ImageFit = (typeof imageFits)[number]

export const imageProps = {
  /**
   * @description 图片源地址
   */
  src: {
    type: String,
    default: ''
  },
  /**
   * @description 确定图片如何适应容器框
   */
  fit: {
    type: String as PropType<ImageFit>,
    default: ''
  },
  /**
   * @description 是否使用懒加载
   */
  lazy: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否开启预览
   */
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @description 预览的 z-index
   */
  zIndex: {
    type: Number
  },
  /**
   * @description 开启预览图片时，第一张显示的图片索引
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   * @description 预览是否可以按 ESC 关闭
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览是否在点击遮罩层时关闭
   */
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  /**
   * @description 预览模式下是否展示操作栏
   */
  showProgress: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览模式下是否可以缩放
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   * @description 无限循环预览
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   * @description 跨域设置
   */
  crossorigin: {
    type: String as PropType<'' | 'anonymous' | 'use-credentials'>
  },
  /**
   * @description 原生 alt 属性
   */
  alt: String,
  /**
   * @description 原生 loading 属性
   */
  loading: String as PropType<'eager' | 'lazy'>,
  /**
   * @description 预览容器渲染到的目标节点
   */
  previewTeleported: {
    type: Boolean,
    default: true
  },
  /**
   * @description 开启懒加载后，指定滚动的容器
   */
  scrollContainer: {
    type: [String, Object] as PropType<string | HTMLElement | undefined>
  },
  /**
   * @description 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs (需自行安装依赖)
   */
  viewerMode: {
    type: String as PropType<'default' | 'viewerjs'>,
    default: 'default'
  },
  /**
   * @description 传递给 viewerjs 的配置项
   */
  viewerOptions: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type ImageProps = ExtractPropTypes<typeof imageProps>

export interface ImageEmits {
  (e: 'load', event: Event): void
  // img.onerror 的类型是 OnErrorEventHandler，参数可能是 Event 或 string
  (e: 'error', event: Event | string): void
  (e: 'switch', index: number): void
  (e: 'close'): void
  (e: 'show'): void
}
