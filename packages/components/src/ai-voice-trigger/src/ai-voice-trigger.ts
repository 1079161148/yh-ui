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
