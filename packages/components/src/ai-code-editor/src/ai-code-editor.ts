import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentThemeVars } from '@yh-ui/theme'

export const aiCodeEditorProps = {
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
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * @description 打开时显示的初始代码（优先于 modelValue 用于首屏，避免 v-if 下首帧未到位导致空白）
   */
  initialValue: {
    type: String,
    default: undefined
  },
  /**
   * @description 是否只读
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 编辑器主题
   */
  theme: {
    type: String,
    default: 'vs-dark',
    validator: (value: string) => ['vs', 'vs-dark', 'hc-black'].includes(value)
  },
  /**
   * @description 编辑器高度
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: 300
  },
  /**
   * @description 是否显示 Minimap
   */
  minimap: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自动换行
   */
  wordWrap: {
    type: String,
    default: 'on',
    validator: (value: string) => ['on', 'off', 'wordWrapColumn', 'bounded'].includes(value)
  },
  /**
   * @description 字体大小
   */
  fontSize: {
    type: Number,
    default: 14
  },
  /**
   * @description 制表符宽度
   */
  tabSize: {
    type: Number,
    default: 2
  },
  /**
   * @description 是否自动聚焦
   */
  autofocus: {
    type: Boolean,
    default: true
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiCodeEditorProps = ExtractPropTypes<typeof aiCodeEditorProps>

export const aiCodeEditorEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
  mount: () => true,
  dispose: () => true
}

export type AiCodeEditorEmits = typeof aiCodeEditorEmits

export interface AiCodeEditorExpose {
  getEditor: () => import('monaco-editor').editor.IStandaloneCodeEditor | null
  focus: () => void
  setValue: (value: string) => void
  getValue: () => string
}
