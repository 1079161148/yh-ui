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
export * from './types';
export { createIconifyComponent, parseIconName, iconExists, getIconData } from './iconify';
export type { IconifyProps } from './iconify';
export * from './presets';
export * from './collections';
export * from './vue/icon';
//# sourceMappingURL=index.d.ts.map