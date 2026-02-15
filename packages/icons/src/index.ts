/**
 * @yh-ui/icons - High Performance Icon Library
 *
 * 集成 Iconify 图标库，支持 100+ 图标集，按需加载，零运行时开销
 *
 * 使用方式：
 * 1. 通过 unplugin-icons 自动按需导入（如：<Icon icon="mdi:home" />）
 * 2. 直接使用 YhIcon 组件并传入图标名称（如：<YhIcon name="mdi:home" />）
 * 3. 使用预注册的图标简写（如：<YhIcon name="home" />）
 */

// 导出类型
export * from './types'

// 导出 Iconify 集成（使用别名避免与 Vue 组件冲突）
export { createIconifyComponent, parseIconName, iconExists, getIconData } from './iconify'
export type { IconifyProps } from './iconify'

// 导出预设图标集
export * from './presets'

// 导出图标集配置
export * from './collections'

// 导出 Vue 组件
export * from './vue/icon'
