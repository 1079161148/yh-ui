import type { ExtractPropTypes, PropType, Component } from 'vue'
export declare const alertTypes: readonly ['success', 'info', 'warning', 'error']
export type AlertType = (typeof alertTypes)[number]
export declare const alertEffects: readonly ['light', 'dark', 'outline', 'glass']
export type AlertEffect = (typeof alertEffects)[number]
export declare const alertProps: {
  /** 标题 */
  readonly title: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 描述文字 */
  readonly description: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 类型 */
  readonly type: {
    readonly type: PropType<AlertType>
    readonly default: 'info'
    readonly validator: (val: string) => boolean
  }
  /** 主题样式 */
  readonly effect: {
    readonly type: PropType<AlertEffect>
    readonly default: 'light'
    readonly validator: (val: string) => boolean
  }
  /** 是否可关闭 */
  readonly closable: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 关闭按钮自定义文字 */
  readonly closeText: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 关闭按钮自定义图标 */
  readonly closeIcon: {
    readonly type: PropType<string | Component>
    readonly default: ''
  }
  /** 是否显示图标 */
  readonly showIcon: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 自定义图标组件 */
  readonly icon: {
    readonly type: PropType<string | Component>
    readonly default: ''
  }
  /** 文字是否居中 */
  readonly center: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否开启文字滚动（跑马灯效果） */
  readonly scrollable: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 滚动速率（完成一次滚动所需的秒数） */
  readonly scrollSpeed: {
    readonly type: NumberConstructor
    readonly default: 15
  }
  /** 鼠标悬停时是否暂停滚动 */
  readonly pauseOnHover: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 自动关闭延迟时间（毫秒），0 为不自动关闭 */
  readonly duration: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 是否在自动关闭时显示倒计时进度条 */
  readonly showProgress: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type AlertProps = ExtractPropTypes<typeof alertProps>
export declare const alertEmits: {
  close: (evt: MouseEvent) => boolean
}
export type AlertEmits = typeof alertEmits
export interface AlertSlots {
  title?: () => unknown
  default?: () => unknown
  icon?: () => unknown
  close?: () => unknown
  action?: () => unknown
}
