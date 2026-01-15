import { withInstall } from '@yh-ui/utils'
import Icon from './src/icon.vue'
import './src/icon.scss'

// 导出内置图标
export * from './src/icons'
export * from './src/icon'

export const YhIcon = withInstall(Icon)
export default YhIcon

// 类型声明
declare module 'vue' {
  export interface GlobalComponents {
    YhIcon: typeof YhIcon
  }
}
