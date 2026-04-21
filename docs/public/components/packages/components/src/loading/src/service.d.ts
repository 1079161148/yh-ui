import { type AppContext, type VNode, type Component } from 'vue'
import { type LoadingSpinnerType } from '../../spin'
export interface LoadingOptions {
  target?: string | HTMLElement
  body?: boolean
  fullscreen?: boolean
  lock?: boolean
  text?: string
  spinner?: string | Component | VNode
  background?: string
  customClass?: string
  glass?: boolean
  color?: string | string[] | Record<string, string>
  dot?: boolean
  spinnerType?: LoadingSpinnerType
  /** 主题覆盖变量 */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}
export interface LoadingInstance {
  close: () => void
  readonly visible: boolean
}
export declare const Loading: {
  service: (options?: LoadingOptions, appContext?: AppContext) => LoadingInstance
}
