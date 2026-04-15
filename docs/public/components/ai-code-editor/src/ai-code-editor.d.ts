import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentThemeVars } from '@yh-ui/theme'
export declare const aiCodeEditorProps: {
  /**
   * @description 代码语言
   */
  readonly language: {
    readonly type: StringConstructor
    readonly default: 'javascript'
  }
  /**
   * @description 代码内容
   */
  readonly modelValue: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /**
   * @description 打开时显示的初始代码（优先于 modelValue 用于首屏，避免 v-if 下首帧未到位导致空白）
   */
  readonly initialValue: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /**
   * @description 是否只读
   */
  readonly readonly: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * @description 编辑器主题
   */
  readonly theme: {
    readonly type: StringConstructor
    readonly default: 'vs-dark'
    readonly validator: (value: string) => boolean
  }
  /**
   * @description 编辑器高度
   */
  readonly height: {
    readonly type: PropType<string | number>
    readonly default: 300
  }
  /**
   * @description 是否显示 Minimap
   */
  readonly minimap: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * @description 自动换行
   */
  readonly wordWrap: {
    readonly type: StringConstructor
    readonly default: 'on'
    readonly validator: (value: string) => boolean
  }
  /**
   * @description 字体大小
   */
  readonly fontSize: {
    readonly type: NumberConstructor
    readonly default: 14
  }
  /**
   * @description 制表符宽度
   */
  readonly tabSize: {
    readonly type: NumberConstructor
    readonly default: 2
  }
  /**
   * @description 是否自动聚焦
   */
  readonly autofocus: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * @description 主题覆盖变量
   */
  readonly themeOverrides: {
    readonly type: PropType<ComponentThemeVars>
    readonly default: undefined
  }
}
export type AiCodeEditorProps = ExtractPropTypes<typeof aiCodeEditorProps>
export declare const aiCodeEditorEmits: {
  'update:modelValue': (value: string) => boolean
  change: (value: string) => boolean
  mount: () => boolean
  dispose: () => boolean
}
export type AiCodeEditorEmits = typeof aiCodeEditorEmits
export interface AiCodeEditorSlots {}
export interface AiCodeEditorExpose {
  getEditor: () => import('monaco-editor').editor.IStandaloneCodeEditor | null
  focus: () => void
  setValue: (value: string) => void
  getValue: () => string
}
