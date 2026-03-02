import type { ExtractPropTypes, PropType } from 'vue'

export const aiVoiceTriggerProps = {
  /**
   * 是否正在录音
   */
  recording: {
    type: Boolean,
    default: false
  },
  /**
   * 录音脉冲音频大小/音量数组，用于渲染动画
   */
  amplitudes: {
    type: Array as PropType<number[]>,
    default: () => Array(20).fill(5)
  },
  /**
   * 展示模式
   * - inline: 行内按钮
   * - floating: 悬浮按钮
   * - sphere: 拟物音量球
   */
  variant: {
    type: String as PropType<'inline' | 'floating' | 'sphere'>,
    default: 'inline'
  },
  /**
   * 悬浮位置（仅在 floating/sphere 模式有效）
   */
  position: {
    type: String as PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>,
    default: 'bottom-right'
  },
  /**
   * 偏移量
   */
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [24, 24]
  },
  /**
   * 是否挂载到 body (Teleport)
   * 仅在 floating/sphere 模式有效
   */
  teleport: {
    type: Boolean,
    default: true
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiVoiceTriggerProps = ExtractPropTypes<typeof aiVoiceTriggerProps>

export interface AiVoiceTriggerEmits {
  (e: 'update:recording', value: boolean): void
  (e: 'start'): void
  (e: 'stop'): void
  (e: 'cancel'): void
}

export const aiVoiceTriggerEmits = {
  'update:recording': (value: boolean) => typeof value === 'boolean',
  start: () => true,
  stop: () => true,
  cancel: () => true
}
