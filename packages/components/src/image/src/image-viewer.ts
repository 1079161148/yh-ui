/**
 * Image Viewer Types & Props
 * @description 图片预览组件类型定义
 */

import type { ExtractPropTypes, PropType } from 'vue'

export const imageViewerProps = {
  /**
   * @description 预览图片源列表
   */
  urlList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @description 预览的 z-index
   */
  zIndex: {
    type: Number,
    default: 2000
  },
  /**
   * @description 开启预览图片时，第一张显示的图片索引
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   * @description 无限循环预览
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   * @description 点击遮罩层是否关闭
   */
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  /**
   * @description 预览是否可以按 ESC 关闭
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description 缩放比例
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   * @description 是否展示操作栏
   */
  showProgress: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览容器渲染到的目标节点
   */
  teleported: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs
   */
  viewerMode: {
    type: String as PropType<'default' | 'viewerjs'>,
    default: 'default'
  },
  /**
   * @description 传递给 viewerjs 的配置项
   */
  viewerOptions: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({})
  }
} as const

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>

export const imageViewerEmits = {
  close: () => true,
  switch: (index: number) => typeof index === 'number'
}

export type ImageViewerEmits = typeof imageViewerEmits
