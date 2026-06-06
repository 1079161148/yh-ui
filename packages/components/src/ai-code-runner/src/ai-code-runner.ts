import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentThemeVars } from '@yh-ui/theme'
import type { WebContainer } from '@webcontainer/api'

export const aiCodeRunnerProps = {
  /**
   * @description 代码语言
   */
  language: {
    type: String,
    default: 'javascript'
  },
  /**
   * @description 代码内容
   */
  code: {
    type: String,
    default: ''
  },
  /**
   * @description 终端高度
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: 200
  },
  /**
   * @description 是否自动运行
   */
  autorun: {
    type: Boolean,
    default: false
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiCodeRunnerProps = ExtractPropTypes<typeof aiCodeRunnerProps>

export const aiCodeRunnerEmits = {
  run: (code: string) => typeof code === 'string',
  stop: () => true,
  output: (data: string) => typeof data === 'string',
  error: (error: string) => typeof error === 'string',
  ready: (instance: WebContainer) => !!instance
}

export type AiCodeRunnerEmits = typeof aiCodeRunnerEmits

export interface AiCodeRunnerSlots {}

export interface AiCodeRunnerExpose {
  run: () => Promise<void>
  stop: () => void
  reset: () => Promise<void>
  clear: () => void
}
