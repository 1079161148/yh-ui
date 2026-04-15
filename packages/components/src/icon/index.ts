import { withInstall } from '@yh-ui/utils'
import Icon from './src/icon.vue'
import './src/icon.scss'

// 导出内置图标
export * from './src/icons'
export * from './src/icon'

export const YhIcon = withInstall(Icon)
export default YhIcon

export type IconInstance = InstanceType<typeof Icon>
export type YhIconInstance = IconInstance
export type YhIconProps = import('./src/icon').IconProps
export type YhIconSlots = import('./src/icon').IconSlots
export type YhIconData = import('./src/icon').IconData
export type YhIconSet = import('./src/icon').IconSet
